#!/usr/bin/env python3
"""Build/check an isolated theologian candidate registry; never imports production data."""
import argparse, hashlib, json, re, unicodedata
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
HERE=Path(__file__).resolve().parent
SOURCE=HERE/'source.json'; OUTPUT=HERE/'authors.json'; REVIEWS=HERE/'reviews.json'; PRODUCTION=HERE.parent/'catalogue.json'
EXPECTED={'II':242,'III':406,'IV':210}
REVIEW_FIELDS=('identityVerification','lifespanVerification','theologicalAttributionVerification','pre1901TheologicalWorkVerification','rightsReview','collisionResolution','proposedEditions')
def normalize(value):
    value=value.translate(str.maketrans({'ø':'o','Ø':'O','ł':'l','Ł':'L','æ':'ae','Æ':'AE','œ':'oe','Œ':'OE','đ':'d','Đ':'D','ð':'d','Ð':'D','þ':'th','Þ':'TH','ß':'ss'}))
    value=unicodedata.normalize('NFKD',value).casefold()
    value=''.join(c for c in value if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+',' ',value).strip()
def source_records():
    raw=json.loads(SOURCE.read_text(encoding='utf-8'))
    if not isinstance(raw,list): raise ValueError('source must be an array')
    seen=set()
    for row in raw:
        if set(row)!={'category','era','tradition','name','status','tradition_family'}: raise ValueError('unexpected source record fields')
        if row['category'] not in EXPECTED or row['status']!='candidate_for_bibliographic_verification': raise ValueError(f"invalid source category/status: {row['name']}")
        key=normalize(row['name'])
        if not key or key in seen: raise ValueError(f"empty or duplicate normalized source name: {row['name']!r}")
        seen.add(key)
    if Counter(r['category'] for r in raw)!=Counter(EXPECTED): raise ValueError('source category counts mismatch')
    return raw
def valid_iso_date(value):
    try: return len(value)==10 and date.fromisoformat(value).isoformat()==value
    except (ValueError,TypeError): return False
def evidence_ok(evidence, required):
    return isinstance(evidence,list) and bool(evidence) and all(isinstance(e,dict) and all(e.get(k) for k in required) and isinstance(e.get('authority'),str) and e['authority'].startswith(('https://','http://')) and valid_iso_date(e.get('reviewedAt')) for e in evidence)
def eligible(author):
    """Evidence completeness gate only; never claims historical facts are true."""
    iv=author.get('identityVerification',{}); lv=author.get('lifespanVerification',{}); av=author.get('theologicalAttributionVerification',{}); wv=author.get('pre1901TheologicalWorkVerification',{})
    if iv.get('status')!='verified' or not evidence_ok(iv.get('evidence'),('authority','reviewer','claim','personIdentity')): return False
    if lv.get('status')!='verified' or not evidence_ok(lv.get('evidence'),('authority','reviewer','claim','birthEarliest','birthLatest','deathEarliest','deathLatest','uncertainty')): return False
    life=lv['evidence'][0]
    try:
        if not (int(life['birthEarliest'])<=int(life['birthLatest'])<=int(life['deathEarliest'])<=int(life['deathLatest'])): return False
    except (ValueError,TypeError): return False
    if av.get('status')!='verified' or not evidence_ok(av.get('evidence'),('authority','reviewer','claim','attributedAuthorIdentity')): return False
    person_identity=iv['evidence'][0]['personIdentity']
    if av['evidence'][0]['attributedAuthorIdentity'] != person_identity: return False
    if wv.get('status')!='verified' or not evidence_ok(wv.get('evidence'),('authority','reviewer','claim','workTitle','attributedAuthorIdentity','compositionDateUpperBound')): return False
    works=wv['evidence']
    if not any(e['attributedAuthorIdentity']==av['evidence'][0]['attributedAuthorIdentity'] and valid_cutoff(e['compositionDateUpperBound']) for e in works): return False
    collision=author.get('collisionReview',{})
    if collision.get('requiresManualResolution') and author.get('collisionResolution') not in {'same_person','distinct_person','alias'}: return False
    # Bibliographic author review can proceed independently of edition clearance.
    # If text is ingested in a proposed edition, require explicit edition-level rights evidence.
    for edition in author.get('proposedEditions',[]):
        if edition.get('ingested') and (edition.get('rightsVerified') is not True or not edition.get('licence') or not edition.get('sourceUrl')): return False
    return True
def valid_cutoff(value):
    if isinstance(value,int) and not isinstance(value,bool): return value<=1900
    if isinstance(value,str):
        if re.fullmatch(r'-?\d{1,4}',value): return int(value)<=1900
        if valid_iso_date(value): return int(value[:4])<=1900
    return False
def make_data():
    rows=source_records(); prod=json.loads(PRODUCTION.read_text(encoding='utf-8')); reviews=json.loads(REVIEWS.read_text(encoding='utf-8')) if REVIEWS.exists() else {}
    existing=defaultdict(list)
    for a in prod['authors']: existing[normalize(a['name'])].append({'id':a['id'],'name':a['name']})
    norm_candidates=defaultdict(list)
    for r in rows: norm_candidates[normalize(r['name'])].append(r['name'])
    out=[]
    for row in rows:
        key=normalize(row['name']); slug=re.sub(r'[^a-z0-9]+','-',key).strip('-'); cid=f'candidate-{slug}'
        matches=existing.get(key,[]); peer=[n for n in norm_candidates[key] if n!=row['name']]
        author={'id':cid,**row,'normalizedName':key,
          'identityVerification':{'status':'pending','evidence':[]},'lifespanVerification':{'status':'pending','evidence':[]},
          'theologicalAttributionVerification':{'status':'pending','evidence':[]},'pre1901TheologicalWorkVerification':{'status':'pending','evidence':[]},
          'rightsReview':{'status':'pending','notes':'Edition and translation rights are separate; no text is included.'},'proposedEditions':[],'productionImport':'not_eligible_pending_review',
          'collisionReview':{'currentAuthorMatches':matches,'candidateMatches':sorted(peer),'requiresManualResolution':bool(matches or peer)}}
        author.update({k:reviews.get(cid,{}).get(k,author.get(k)) for k in REVIEW_FIELDS if k in reviews.get(cid,{})})
        author['productionImport']='passes_evidence_completeness_gate' if eligible(author) else 'not_eligible_pending_review'
        out.append(author)
    return {'schemaVersion':1,'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'counts':EXPECTED,'candidateCount':len(out),'authors':out}
def build():
    data=make_data(); OUTPUT.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8'); return data
def check():
    data=make_data(); current=json.loads(OUTPUT.read_text(encoding='utf-8'))
    if current!=data: raise ValueError('authors.json is stale or differs from source/reviews; run build_candidates.py')
    if len({a['id'] for a in data['authors']})!=len(data['authors']): raise ValueError('candidate IDs are not unique')
    return data
def main():
    p=argparse.ArgumentParser(); p.add_argument('--check',action='store_true'); p.add_argument('--eligible',action='store_true'); args=p.parse_args()
    data=check() if args.check or args.eligible else build()
    if args.eligible: print('\n'.join(a['id'] for a in data['authors'] if eligible(a)) or 'No candidates pass the evidence-completeness gate.')
    elif args.check: print(f"Valid: {data['candidateCount']} candidates; source SHA-256 matches; check mode did not write the production catalogue.")
    else: print(f"Built {data['candidateCount']} candidates; no production authors or works imported.")
if __name__=='__main__': main()
