import importlib.util, json, subprocess, sys, unittest
from pathlib import Path
SCRIPT=Path(__file__).resolve().parents[1]/'build_candidates.py'
spec=importlib.util.spec_from_file_location('candidate_build',SCRIPT); mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
class CandidateGateTests(unittest.TestCase):
    def valid_candidate(self):
        def ev(**extra): return {'authority':'https://example.org/record','reviewer':'reviewer-id','reviewedAt':'2026-11-07','claim':'Claim checked against cited authority',**extra}
        identity={'status':'verified','evidence':[ev(personIdentity='candidate person')]}
        lifespan={'status':'verified','evidence':[ev(birthEarliest=1200,birthLatest=1201,deathEarliest=1270,deathLatest=1271,uncertainty='Approximate dates')]}
        attribution={'status':'verified','evidence':[ev(attributedAuthorIdentity='candidate person')]}
        work={'status':'verified','evidence':[ev(workTitle='A theological work',attributedAuthorIdentity='candidate person',compositionDateUpperBound='1290-01-01')]}
        return {'identityVerification':identity,'lifespanVerification':lifespan,'theologicalAttributionVerification':attribution,'pre1901TheologicalWorkVerification':work,'rightsReview':{'status':'pending'},'collisionReview':{'requiresManualResolution':False},'proposedEditions':[]}
    def test_pending_reviews_fail(self):
        self.assertFalse(mod.eligible({'identityVerification':{'status':'pending','evidence':[]}}))
    def test_complete_evidence_passes_author_bibliography_gate(self):
        self.assertTrue(mod.eligible(self.valid_candidate()))
    def test_fake_or_incomplete_evidence_rejected(self):
        c=self.valid_candidate(); c['identityVerification']['evidence'][0]={'authority':'made up','reviewer':'reviewer','claim':'true','personIdentity':'candidate person','reviewedAt':'2026-11-07'}
        self.assertFalse(mod.eligible(c))
    def test_malformed_iso_review_date_rejected(self):
        c=self.valid_candidate(); c['identityVerification']['evidence'][0]['reviewedAt']='2026-13-40'
        self.assertFalse(mod.eligible(c))
    def test_invalid_lifespan_bounds_rejected(self):
        c=self.valid_candidate(); c['lifespanVerification']['evidence'][0]['deathLatest']='before birth'
        self.assertFalse(mod.eligible(c))
    def test_pre1901_cutoff_enforced(self):
        for date in ('1901','1901-01-01','not a date'):
            c=self.valid_candidate(); c['pre1901TheologicalWorkVerification']['evidence'][0]['compositionDateUpperBound']=date
            self.assertFalse(mod.eligible(c),date)
    def test_attributed_author_identity_must_match(self):
        c=self.valid_candidate(); c['pre1901TheologicalWorkVerification']['evidence'][0]['attributedAuthorIdentity']='someone else'
        self.assertFalse(mod.eligible(c))
    def test_identity_attribution_must_match(self):
        c=self.valid_candidate(); c['theologicalAttributionVerification']['evidence'][0]['attributedAuthorIdentity']='different person'
        self.assertFalse(mod.eligible(c))
    def test_boolean_is_not_a_composition_year(self):
        self.assertFalse(mod.valid_cutoff(True))
    def test_ingested_edition_requires_separate_rights_evidence(self):
        c=self.valid_candidate(); c['proposedEditions']=[{'ingested':True,'licence':'PD'}]
        self.assertFalse(mod.eligible(c))
    def test_restricted_rights_do_not_block_bibliographic_candidate(self):
        c=self.valid_candidate(); c['rightsReview']={'status':'reviewed_restricted'}
        self.assertTrue(mod.eligible(c))
    def test_accent_and_ligature_search_normalization(self):
        self.assertEqual(mod.normalize('Søren Kierkegaard'),'soren kierkegaard')
        self.assertEqual(mod.normalize('Łaski'),'laski')
        self.assertEqual(mod.normalize('Æneas'),'aeneas')
        self.assertEqual(mod.normalize('François de Sales'),'francois de sales')
    def test_category_counts_and_verbatim_source_representation(self):
        source=mod.source_records(); generated=json.loads((SCRIPT.parent/'authors.json').read_text())['authors']
        self.assertEqual(len(generated),858)
        self.assertEqual({k:sum(a['category']==k for a in generated) for k in mod.EXPECTED},mod.EXPECTED)
        self.assertEqual([a['name'] for a in generated],[a['name'] for a in source])
        self.assertTrue(all(not any(k in a for k in ('works','text','editions')) for a in generated))
    def test_check_mode_is_read_only_and_passes(self):
        before=(SCRIPT.parent/'authors.json').read_bytes()
        result=subprocess.run([sys.executable,str(SCRIPT),'--check'],capture_output=True,text=True,check=True)
        self.assertIn('did not write the production catalogue',result.stdout)
        self.assertEqual(before,(SCRIPT.parent/'authors.json').read_bytes())
if __name__=='__main__': unittest.main()
