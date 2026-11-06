import{c as e,d as t,l as n,s as r,u as i}from"./shared-D9wXEFyu.js";import{a,o}from"./index-DRjGlota.js";var s=new Set(`bilde.bildet.bilder.bildene.stolen.stolene.sykkel.sykkelen.ballett.fjern.kjæreste.kjæresten.kjærester.bukse.buksen.busker.buss.bussen.ansikt.ansiktet.barnet.barnebarn.mannen.menn.sted.stedet.forstå.forstår.forsto.bestemme.bestemt.beslutte.tallerken.tallerkenen.kirken.kirkegård.mandag.tirsdag.onsdag.torsdag.fredag.lørdag.søndag.hverdag.imidlertid.likevel.allikevel.fordi.derfor.dessuten.altså.bortsett.blant.ennå.allerede.nettopp.fortsatt.forresten.ganske.hjelpe.spørsmål.arbeide.arbeider.biskop.teater.butikken.søsken.kjeller.kjelleren.finger.fingeren.sommer.sommeren.vinteren.hovedstad`.split(`.`)),c=new Set([`bok`,`hus`,`bil`,`tid`,`dag`,`sted`,`mann`,`by`,`rom`,`øye`,`tre`,`vei`,`sal`,`ord`,`dør`,`hår`,`land`,`ben`]),l=new Set([`by`,`øy`,`sø`,`tå`,`ku`,`ås`,`ei`,`sjø`,`bo`,`gud`,`lys`,`sol`,`hav`,`ild`,`tro`]),u=new Set([`het`,`ing`,`else`,`skap`,`dom`,`lig`,`sjon`,`tet`,`sk`,`isk`,`som`,`bar`,`ende`,`ning`,`inne`,`ske`,`sel`]),d=e=>e.normalize(`NFC`).toLocaleLowerCase(`nb`),f=new WeakMap;function p(e,t,n){let r=e.get(t);r?r.some(e=>e.lemma===n.lemma&&e.link===n.link&&e.pos===n.pos)||r.push(n):e.set(t,[n])}function m(e){let t=new Map,n=new Map,r=new Set;for(let t of e.words)([`ADP`,`CONJ`,`SCONJ`,`PRON`,`DET`,`PART`,`AUX`,`INTJ`].includes(t.pos)||t.pos===`ADV`&&t.form.length<=3)&&r.add(d(t.form));for(let n of e.nouns){let e=d(n.lemma);if(!(n.pluralOnly||e.length<3&&!l.has(e))&&!u.has(e)){for(let r of[``,`s`,`e`])r===`s`&&/[sxz]$/.test(e)||r===`e`&&/e$/.test(e)||p(t,e+r,{base:e,link:r,lemma:n.lemma,pos:`NOUN`});/e$/.test(e)&&e.length>=5&&p(t,e.slice(0,-1),{base:e.slice(0,-1),link:``,lemma:n.lemma,pos:`NOUN`})}}for(let n of e.verbs){if(n.deponent||n.lemma.length<5)continue;let e=n.lemma.replace(/e$/,``);e.length<3||(p(t,`${e}e`,{base:e,link:`e`,lemma:n.lemma,pos:`VERB`}),p(t,e,{base:e,link:``,lemma:n.lemma,pos:`VERB`}))}for(let n of e.adjectives){let e=d(n.lemma);e.length<3||u.has(e)||n.invariable||p(t,e,{base:e,link:``,lemma:n.lemma,pos:`ADJ`})}for(let t of e.nouns){if(t.proper)continue;let e=[t.lemma,...t.plural,...t.defSg.map(e=>e.form),...t.defPl];for(let r of e){let e=d(r),i=n.get(e)??[];i.some(e=>e.lemma===t.lemma)||i.push({lemma:t.lemma,gender:t.gender}),n.set(e,i)}}return{first:t,heads:n,stop:r}}function h(e){let t=f.get(e);return t||(t=m(e),f.set(e,t)),t}var g=(e,t)=>e.comps===t.comps?e.headLen===t.headLen?e.links===t.links?e.verbs<t.verbs:e.links<t.links:e.headLen>t.headLen:e.comps<t.comps;function _(e,t,n){let r=new Map,i=(a,o,s)=>{if(!o){let e=r.get(a);if(e!==void 0)return e}let u=e.slice(a),d=null,f=e=>{(!d||g(e,d))&&(d=e)};if(!(o&&n)&&u.length>=3&&!t.stop.has(u)){let n=t.heads.get(u);n&&(u.length>=4||c.has(u))&&f({segs:[{start:a,end:e.length,kind:`head`,lemma:n[0].lemma,pos:`NOUN`}],comps:1,headLen:u.length,links:0,verbs:0})}if(s<2)for(let e=2;e<=u.length-3;e++){let n=u.slice(0,e);if(t.stop.has(n)&&!l.has(n))continue;let r=t.first.get(n);if(!r||e<3&&!l.has(n))continue;let o=i(a+e,!1,s+1);if(!o)continue;let c=[...r].sort((e,t)=>+!!e.link-!!t.link||(e.pos===`NOUN`?0:1)-(t.pos===`NOUN`?0:1))[0],d=a+c.base.length,p=[{start:a,end:d,kind:`component`,lemma:c.lemma,pos:c.pos}];c.link&&p.push({start:d,end:a+e,kind:`link`}),f({segs:[...p,...o.segs],comps:1+o.comps,headLen:o.headLen,links:+!!c.link+o.links,verbs:(c.pos===`NOUN`?0:1)+o.verbs})}return o||r.set(a,d),d};return i(0,!0,0)??void 0}function v(e,t){let n=e.normalize(`NFC`);if(n.length<7||!/^\p{L}+$/u.test(n))return;let r=d(n);if(r.length!==n.length||s.has(r))return;let i=h(t),a=t.has(r),o=_(r,i,a);if(!o||o.comps<2||o.comps>3)return;let c=o.segs.length-1,l=o.segs.map((e,t)=>{let r=n.slice(e.start,e.end);if(e.kind===`link`)return{text:r,start:e.start,end:e.end,kind:`link`,role:`linking element`};let i=t===c,a={text:r,start:e.start,end:e.end,kind:i?`head`:`component`,lemma:e.lemma,pos:e.pos};return a.role=i?`head: decides the gender and the kind of thing`:e.pos===`VERB`?`first part (verb stem)`:e.pos===`ADJ`?`first part (adjective)`:`first part`,a}),u=o.segs[c],f=o.segs.slice(0,-1).map(e=>n.slice(e.start,e.end)).join(``);return{parts:l,headLemma:u.lemma,headForm:n.slice(u.start),prefix:f,confidence:a?.8:Math.max(.4,.55-.05*(o.comps-2)),lexical:a,fuge:o.segs.filter(e=>e.kind===`link`).map(e=>n.slice(e.start,e.end))}}var y=e=>(e??``).split(`,`).filter(Boolean),b=(e,t,n)=>y(e.morph[t]).includes(n),x=e=>e.pos===`VERB`||e.pos===`AUX`,S=e=>x(e)&&b(e,`VerbForm`,`Fin`)&&!b(e,`VerbForm`,`Inf`)&&!b(e,`VerbForm`,`Part`)&&!b(e,`Mood`,`Imp`),C=e=>x(e)&&b(e,`VerbForm`,`Fin`)&&!b(e,`Mood`,`Imp`),w=new Set([`kunne`,`skulle`,`ville`,`måtte`,`burde`,`tørre`,`tore`]),T=new Set(`ikke.ikkje.aldri.alltid.ofte.også.òg.bare.berre.jo.nok.vel.allerede.allereie.snart.nå.no.da.då.sikkert.kanskje.visst.heller.veldig.nesten.ennå.enno.sjelden.sjeldan.gjerne.fortsatt`.split(`.`)),ee=new Set([`jeg`,`du`,`han`,`hun`,`vi`,`dere`,`de`,`man`,`eg`,`ho`,`dei`,`me`,`ein`,`den`,`det`]),te=new Set(`en.ei.et.eit.ein.den.det.de.dei.denne.dette.disse.desse.min.din.sin.vår.hans.hennes.hennar.deres.deira.dykkar.dens.dets.ingen.noen.noe.nokon.noko.hver.kvar.all.alle.begge.hele.heile.hvilken.mange.slik.sånn.annen.annan.samme.same.mye.mykje.lite.litt.få.flere.fleire.mer.meir.hvilket.hvilke`.split(`.`)),E=(e,t)=>!!e&&e.cands.some(t),ne=(e,t)=>!!e&&!!e.cands[0]&&t(e.cands[0]),D=e=>E(e,e=>e.pos===`PRON`&&(b(e,`Case`,`Nom`)||ee.has(e.lemma))&&!b(e,`PronType`,`Rel`)&&!b(e,`PronType`,`Int`)),O=e=>!!e&&e.word&&e.cands.length>0&&e.cands.every(e=>e.pos===`ADV`),k=new Set([`vinter`,`sommer`,`høst`,`vår`,`kveld`,`morgen`,`natt`,`dag`,`uke`,`måned`,`år`,`ettermiddag`,`formiddag`,`sommar`,`haust`,`morgon`,`veke`,`månad`]),A=e=>E(e,e=>e.pos===`PRON`&&b(e,`Case`,`Nom`)),j=e=>e.pos===`NOUN`||e.pos===`PROPN`||e.pos===`ADJ`||e.pos===`NUM`;function M(e){if(!e||!e.word||!e.cands.length||!e.cands.some(j))return!1;let t=e.cands[0];return!(x(t)&&S(t))}function re(e,t,n){let r=e[t-1],i=r?.word?r:void 0,a=i&&e[t-2]?.word?e[t-2]:void 0,o=e[t+1],s=o?.word?o:void 0,c=s&&e[t+2]?.word?e[t+2]:void 0,l=r&&!r.word?r.tok.surface:``;return{i:t,slots:e,std:n,pw:i,ppw:a,nw:s,nnw:c,punctBefore:l,clauseStart:!r||!!l&&/[.!?;:,—–"»«“”(]/.test(l)||!!i&&E(i,e=>e.pos===`CONJ`&&[`og`,`men`,`eller`,`for`,`så`].includes(e.lemma))}}function ie(e,t){let{pw:n,ppw:r,nw:i,nnw:a}=t,o=t.slots[t.i].tok.normalized,s=0;n?.cands[0];let c=!!n&&(E(n,e=>e.pos===`PART`&&e.lemma===`å`)||E(n,e=>e.pos===`AUX`&&w.has(e.lemma)&&C(e))||E(n,e=>e.pos===`VERB`&&[`la`,`late`,`få`].includes(e.lemma)&&C(e))),l=!!n&&E(n,e=>e.pos===`DET`&&y(e.morph.Poss).includes(`Yes`))&&!!r&&ne(r,e=>e.pos===`NOUN`&&b(e,`Definite`,`Def`)),u=l||!!n&&(D(n)||T.has(n.tok.normalized)&&D(r)||ne(n,e=>(e.pos===`NOUN`||e.pos===`PROPN`)&&(b(e,`Definite`,`Def`)||e.pos===`PROPN`))),d=!l&&!!n&&E(n,e=>(e.pos===`DET`||e.pos===`ADJ`&&(b(e,`Definite`,`Def`)||e.lemma===`annen`))&&(te.has(e.lemma)||e.pos===`ADJ`)),f=!!n&&ne(n,e=>e.pos===`ADJ`),p=!!n&&ne(n,e=>e.pos===`ADP`),m=!!n&&E(n,e=>e.pos===`AUX`&&[`ha`,`bli`,`hava`,`verte`].includes(e.lemma)&&(C(e)||b(e,`VerbForm`,`Inf`))),h=!!n&&E(n,e=>e.pos===`AUX`&&[`være`,`vere`].includes(e.lemma)),g=!!n&&(T.has(n.tok.normalized)||O(n))&&E(r,e=>e.pos===`AUX`&&[`ha`,`bli`,`hava`,`verte`].includes(e.lemma)),_=!!n&&n.tok.normalized===`ut`&&E(r,e=>[`se`,`sjå`].includes(e.lemma)&&e.pos===`VERB`),v=!!n&&E(n,e=>e.pos===`AUX`&&[`være`,`bli`,`vere`,`verte`].includes(e.lemma)),S=M(i);if(x(e)){let n=b(e,`VerbForm`,`Inf`),r=b(e,`VerbForm`,`Part`),a=b(e,`VerbForm`,`Fin`)&&!b(e,`Mood`,`Imp`),o=b(e,`Mood`,`Imp`);c?n?s+=3:s-=1.5:n&&!r&&!a&&--s,(m||g)&&r?s+=3:h&&r?s+=E(t.slots[t.i],e=>e.pos===`ADJ`)?-.5:1.5:r&&--s,u&&a&&(s+=2.5),a&&i&&i.tok.normalized===`å`&&E(i,e=>e.pos===`PART`)&&(s+=2.5),a&&t.clauseStart&&D(i)&&(s+=2.5),(d||p)&&(s-=2.5),o&&(s+=t.slots[t.i].initial&&!D(i)?.5:-2,u&&(s-=1.5)),e.pos===`AUX`&&!r&&!o&&!n&&(s+=.5),b(e,`Voice`,`Pass`)&&(s-=.5)}else e.pos===`NOUN`?(d&&(s+=2.5),f&&(s+=1.5),p&&(s+=2),c&&(s-=2),u&&!d&&(s-=.5),(m||g)&&--s,n&&E(n,e=>e.pos===`DET`&&y(e.morph.Poss).includes(`Yes`))&&(s+=1),t.clauseStart&&D(i)&&!t.pw&&--s):e.pos===`ADJ`?((v||_)&&(s+=3.5),d&&S&&(s+=1.5),d&&!S&&!f&&(s+=.5),p&&(s-=.5),c&&(s-=2),!v&&!_&&!d&&!S&&!f&&!h&&--s):e.pos===`ADV`&&i&&E(i,e=>e.pos===`ADJ`)&&!N(i)&&(s+=.5);return e.pos===`PROPN`&&t.slots[t.i].tok.surface===e.lemma&&(s+=t.slots[t.i].initial?1:3),s+=P(e,t,{afterSubject:u,afterDet:d,afterAdp:p,afterMarker:c,beforeNominal:S,surface:o,afterHa:m}),s}function N(e){return e.cands.some(e=>e.pos===`NOUN`)}function P(e,t,n){let{nw:r,nnw:i,pw:a}=t,{surface:o}=n,s=E(r,e=>C(e)),c=D(r),l=n.beforeNominal&&!s,u=E(r,e=>e.pos===`NOUN`&&b(e,`Number`,`Plur`)&&b(e,`Definite`,`Ind`));if(e.pos===`NUM`&&u)return 3;if(e.pos===`NOUN`&&e.lemma===`tre`&&u)return-3;if(e.pos===`VERB`&&o===`så`&&e.lemma===`se`)return n.afterSubject&&!t.clauseStart&&!c?2.5:-3;if(e.pos===`VERB`&&o===`for`&&e.lemma===`fare`)return l?-6:n.afterSubject?0:-4;let d=`denne.dette.disse.desse.noen.noe.nokon.noko.ingen.mange.mye.mykje.lite.alt.all.alle.begge.hver.kvar.mer.meir.mest.flere.fleire.flest.få.litt`.split(`.`);if(e.pos===`PRON`&&[`dette`,`disse`,`desse`].includes(e.lemma))return l?-2.5:1.5;if(e.pos===`DET`&&d.includes(e.lemma))return l?1.5:-1.5;if(e.pos===`PRON`&&d.includes(e.lemma))return l?-1.5:1.5;if(e.pos===`ADV`&&[`mer`,`meir`,`mest`,`mye`,`mykje`,`litt`].includes(e.lemma))return l?-1:.5;switch(e.lemma){case`den`:case`det`:case`de`:case`dei`:if(e.pos===`DET`){let t=E(r,e=>e.pos===`ADJ`)&&(E(i,e=>e.pos===`NOUN`)||E(i,e=>e.pos===`ADJ`)),n=E(r,e=>e.pos===`NOUN`&&b(e,`Definite`,`Def`))&&!s;return(t||n)&&!(e.lemma===`det`&&E(r,e=>e.pos===`AUX`))?2.5:-2.5}if(e.pos===`PRON`){let e=E(r,e=>e.pos===`ADJ`)&&E(i,e=>e.pos===`NOUN`),t=E(r,e=>e.pos===`NOUN`&&b(e,`Definite`,`Def`))&&!s,n=!!a&&E(a,e=>C(e));return e||t?-2.5:n?2.5:1.5}return 0;case`en`:case`ein`:{let t=!!r&&r.tok.normalized===`av`;return e.pos===`DET`?t||s&&!n.beforeNominal?-2:1.5:e.pos===`NUM`?t?1:-1:e.pos===`PRON`?t?1:n.beforeNominal?-2:s?1:-1:0}case`ha`:case`hava`:{let n=e=>x(e)&&b(e,`VerbForm`,`Part`),o=i&&t.slots[i.i+1]?.word?t.slots[i.i+1]:void 0,s=E(r,n)||!!r&&(T.has(r.tok.normalized)||O(r))&&E(i,n)||D(r)&&(E(i,n)||!!i&&(T.has(i.tok.normalized)||O(i))&&E(o,n)),c=a&&E(a,e=>e.pos===`AUX`&&w.has(e.lemma));return e.pos===`AUX`?s||c&&s?2.5:-2:e.pos===`VERB`?s?-2:1.5:0}case`bli`:case`verte`:{let t=E(r,e=>x(e)&&b(e,`VerbForm`,`Part`)&&e.lemma!==`bli`)||r&&(T.has(r.tok.normalized)||O(r))&&E(i,e=>x(e)&&b(e,`VerbForm`,`Part`));return e.pos===`AUX`?t?2:-1:e.pos===`VERB`?t?-2:1:0}case`så`:return e.pos===`VERB`?n.afterSubject&&!t.clauseStart&&!c?2.5:-3:e.pos===`CONJ`?t.punctBefore===`,`||a&&E(a,e=>e.pos===`CONJ`&&e.lemma===`og`)?c?2:-1:-2:e.pos===`ADV`?.5:0;case`for`:return e.pos===`CONJ`?A(r)&&(t.punctBefore===`,`||!t.clauseStart||1)&&!t.clauseStart||t.clauseStart&&A(r)&&t.punctBefore===`,`?3:-1.5:e.pos===`ADV`?E(r,e=>e.pos===`ADJ`||e.pos===`ADV`)&&!N(r)?3:-2:e.pos===`ADP`?A(r)?-2:.5:e.pos===`VERB`?l?-6:n.afterSubject?0:-4:0;case`om`:return E(r,e=>e.pos===`NOUN`&&k.has(e.lemma)&&b(e,`Definite`,`Def`))&&!A(r)?e.pos===`ADP`?3:e.pos===`SCONJ`?-3:0:e.pos===`SCONJ`?A(r)||E(r,e=>e.pos===`NOUN`)&&E(i,e=>C(e)||e.pos===`ADV`&&T.has(e.lemma))?3:-2:e.pos===`ADP`?A(r)?-2:.5:0;case`når`:return e.pos===`ADV`?s&&!c&&!E(r,e=>e.pos===`NOUN`)&&t.clauseStart?3:-2:e.pos===`SCONJ`?s&&!c&&t.clauseStart?-2:1.5:0;case`da`:case`då`:return e.pos===`ADV`?s&&!c?2.5:r?n.afterDet?0:c||E(r,e=>e.pos===`NOUN`||e.pos===`PROPN`)?-1.5:0:1:e.pos===`SCONJ`?c||E(r,e=>e.pos===`NOUN`||e.pos===`PROPN`)&&!s?2.5:-2:0;case`takk`:return e.pos===`INTJ`?3:0;case`takke`:return e.pos===`VERB`&&o===`takk`?A(r)?0:-3:0;case`før`:case`siden`:case`sidan`:return e.pos===`ADV`&&e.lemma===`før`?!r||!M(r)&&!A(r)&&!E(r,e=>e.pos===`DET`||e.pos===`PRON`)?3:-3:e.pos===`SCONJ`?A(r)?2.5:-1.5:e.pos===`ADP`?A(r)?-2:r?.5:-2:0;case`som`:return e.pos===`SCONJ`?a&&E(a,e=>[`samme`,`same`,`slik`,`sånn`,`like`,`så`,`ikke`].includes(e.lemma))?1.5:-.5:0;case`hvis`:return e.pos===`SCONJ`?1:-1;case`nå`:return e.pos===`VERB`&&o===`når`?n.afterSubject?1:-4:0;case`enn`:return 0;case`alle`:return 0;case`rett`:return 0;case`på`:case`av`:case`over`:case`under`:case`etter`:case`før `:return e.pos===`ADV`?!r||!l&&!A(r)&&!E(r,e=>e.pos===`DET`||e.pos===`PRON`)?1:-2:e.pos===`ADP`?r?0:-1.5:0}return 0}function F(e,t,n){let r=e.map(e=>({...e,cands:e.cands})),i=new Map;for(let t of e){if(!t.word||t.cands.length===0)continue;let e=re(r,t.i,n),a=t.cands.map((t,n)=>-(n*.01)-t.order/1e7+ie(t,e));i.set(t.i,a)}for(let t of e){let e=i.get(t.i);e&&(t.cands=t.cands.map((t,n)=>({c:t,v:e[n]})).sort((e,t)=>t.v-e.v).map(e=>({...e.c,score:e.v})),t.cands.length>1&&t.cands[0].score-t.cands[1].score>=1.5&&(t.cands[0].context=I(t.cands[0])))}}function I(e){return`the neighbouring words fit ${e.lemma} as ${e.pos.toLowerCase()}`}var ae=[{period:`nb-pre1907`,variety:`nb-dano`,rule:`Danish-based spelling: soft consonants and Danish forms, written differently since 1907`,pairs:[[`bog`,`bok`],[`gik`,`gikk`],[`bøger`,`bøker`],[`gade`,`gate`],[`gader`,`gater`],[`hvad`,`hva`],[`mig`,`meg`],[`dig`,`deg`],[`sig`,`seg`],[`mand`,`mann`],[`mænd`,`menn`],[`kvinde`,`kvinne`],[`kvinder`,`kvinner`],[`børn`,`barn`],[`nogen`,`noen`],[`noget`,`noe`],[`nogle`,`noen`],[`kjøbe`,`kjøpe`],[`købe`,`kjøpe`],[`kjøbt`,`kjøpt`],[`kjøbmand`,`kjøpmann`],[`øje`,`øye`],[`øjne`,`øyne`],[`næse`,`nese`],[`bruge`,`bruke`],[`tage`,`ta`],[`give`,`gi`],[`sige`,`si`],[`siger`,`sier`],[`sagde`,`sa`],[`blive`,`bli`],[`bliver`,`blir`],[`blev`,`ble`],[`været`,`vært`],[`forældre`,`foreldre`],[`moder`,`mor`],[`fader`,`far`],[`broder`,`bror`],[`søn`,`sønn`],[`hænder`,`hender`],[`fod`,`fot`],[`fødder`,`føtter`],[`hoved`,`hode`],[`ansigt`,`ansikt`],[`mund`,`munn`],[`tand`,`tann`],[`ryg`,`rygg`],[`nat`,`natt`],[`uge`,`uke`],[`vand`,`vann`],[`skov`,`skog`],[`vej`,`vei`],[`præst`,`prest`],[`kjærlighed`,`kjærlighet`],[`frihed`,`frihet`],[`sandhed`,`sannhet`],[`glæde`,`glede`],[`imellem`,`mellom`],[`vindue`,`vindu`],[`bedste`,`beste`],[`hjælpe`,`hjelpe`],[`hjælp`,`hjelp`],[`sæt`,`sett`],[`sætte`,`sette`],[`læse`,`lese`],[`læser`,`leser`],[`skrive`,`skrive`],[`pige`,`pike`],[`spørge`,`spørre`],[`spørger`,`spør`],[`tænke`,`tenke`],[`tænker`,`tenker`],[`længe`,`lenge`],[`længer`,`lenger`],[`lidt`,`litt`]]},{period:`nb-1917`,variety:`nb-riksmal`,rule:`Riksmål spelling kept after 1917 (still written by Riksmål writers; not valid Bokmål today)`,pairs:[[`efter`,`etter`],[`nu`,`nå`],[`sprog`,`språk`],[`sne`,`snø`],[`sneen`,`snøen`],[`saadan`,`sånn`],[`aldrig`,`aldri`],[`gjennem`,`gjennom`]]}],L=[{period:`nn-1917`,variety:`nn-hognorsk`,rule:`Høgnorsk or older Nynorsk form, written otherwise in the standard of 2012`,pairs:[[`hev`,`har`],[`segjer`,`seier`],[`so`,`så`],[`sanningi`,`sanninga`],[`verdi`,`verda`],[`synderne`,`syndene`],[`elska`,`elskar`],[`hava`,`ha`]]}],R=new Map;for(let e of[...ae,...L])for(let[t,n]of e.pairs){let r=R.get(t)??[];r.push({modern:n,period:e.period,rule:e.rule,variety:e.variety}),R.set(t,r)}[...R.values()].reduce((e,t)=>e+t.length,0);function z(e){let t=[];for(let[n,r]of R)r.some(t=>t.modern===e)&&t.push(n);return t}var B=`aeiouyæøå`,oe=[{id:`aa`,period:`nb-1907`,variety:`nb-riksmal`,rule:`aa was written for å before 1917`,confidence:.7,apply:e=>e.includes(`aa`)?[e.replace(/aa/g,`å`)]:[]},{id:`hed`,period:`nb-pre1907`,variety:`nb-dano`,rule:`-hed was written for -het`,confidence:.7,apply:e=>/hed(en|er|erne)?$/.test(e)?[e.replace(/hed(en|er|erne)?$/,(e,t)=>`het${t??``}`)]:[]},{id:`soft`,period:`nb-pre1907`,variety:`nb-dano`,rule:`a soft consonant (b, d, g after a vowel) was written where hard p, t, k are written since 1907`,confidence:.6,apply:e=>{let t=[],n={b:`p`,d:`t`,g:`k`};for(let r of e.matchAll(RegExp(`([${B}])([bdg])(?=$|e$|er$|en$|et$|ene$)`,`g`))){let i=r.index+1;t.push(e.slice(0,i)+n[r[2]]+e.slice(i+1))}return t}},{id:`ae`,period:`nb-pre1907`,variety:`nb-dano`,rule:`æ before a consonant cluster was written where e is written since 1907`,confidence:.6,apply:e=>/æ[a-z]/.test(e)?[e.replace(/æ(?=[bcdfgklmnprstv])/g,`e`)]:[]}],se=[{id:`aa`,period:`nn-1901`,variety:`nn-landsmal`,rule:`aa was written for å before 1917`,confidence:.7,apply:e=>e.includes(`aa`)?[e.replace(/aa/g,`å`)]:[]}];function ce(e,t,n,r={}){let i=e.normalize(`NFC`);if(!/^\p{L}+$/u.test(i))return;let a=i.toLocaleLowerCase(`nb`);if(n.isWord(a))return;let o=R.get(a);if(o){let e=o.find(e=>(t===`nb`?e.period.startsWith(`nb`):e.period.startsWith(`nn`))&&e.modern.split(` `).every(e=>n.isWord(e)));if(e)return{modern:e.modern,period:e.period,confidence:.9,rule:e.rule,variety:e.variety}}let s=t===`nb`?oe:se,c=[];for(let e of s)for(let t of e.apply(a))t!==a&&n.isWord(t)&&c.push({modern:t,period:e.period,confidence:e.confidence,rule:e.rule,variety:e.variety});if(c.length)return c.sort((e,t)=>t.confidence-e.confidence)[0];if(s.length>1){let e=s[0].apply(a)[0]??a;if(e!==a){for(let t of s.slice(1))for(let r of t.apply(e))if(r!==e&&n.isWord(r))return{modern:r,period:t.period,confidence:.5,rule:`${s[0].rule}; ${t.rule}`,variety:t.variety}}}if(t===`nb`&&r.midSentence&&/^\p{Lu}/u.test(i)&&i.slice(1)===i.slice(1).toLocaleLowerCase(`nb`)&&r.isCommonNoun?.(a))return{modern:a,period:`nb-pre1907`,confidence:.5,rule:`a common noun written with a capital letter (the custom of Danish and early Norwegian print)`,variety:`nb-dano`}}var V=`
stå opp = get up
stå igjen = remain
stå over = skip
finne ut = find out
finne frem = find the way
gå ut = go out
gå inn = go in
gå opp = go up
gå ned = go down
gå bort = go away; pass away
gå videre = go on
komme tilbake = come back
komme inn = come in
komme ut = come out
komme fram = arrive; emerge
komme frem = arrive; emerge
komme opp = come up
komme med = bring; come along
komme igjen = come again
gi opp = give up
gi ut = publish
gi tilbake = give back
slå på = switch on
slå av = switch off
slå opp = look up
slå ned = strike down
slå sammen = combine
slå til = strike; accept
ta på = put on
ta på seg = put on (clothes)
ta av = take off
ta av seg = take off (clothes)
ta med = bring along
ta imot = receive
ta opp = take up; record
ta ut = take out
ta over = take over
ta ned = take down
skrive ned = write down
skrive opp = write down
skrive under = sign
skrive ut = print
se ut = look; appear
se opp = look out
se etter = look after
holde opp = stop
holde på = be busy; keep on
holde fast = hold on
holde ut = endure
sette seg ned = sit down
sette fram = put out
sette opp = put up
sette på = put on
sette inn = insert
legge ned = shut down; lay down
legge til = add
legge igjen = leave behind
legge fra seg = put down
legge ut = post; lay out
legge opp = plan
hente ut = pick up (collect)
kjøre bort = drive away
kjøre inn = drive in
kjøre ut = drive out
løpe bort = run away
sende inn = send in
sende ut = send out
sende tilbake = send back
sende bort = send away
ringe opp = phone
ringe på = ring (a bell)
vaske opp = wash up
vaske av = wash off
vaske ned = wash down
rydde opp = tidy up
rydde bort = clear away
lage til = prepare
bli med = come along
falle ned = fall down
falle av = fall off
falle ut = fall out
stenge av = switch off; close off
åpne opp = open up
lukke igjen = close
låse opp = unlock
låse inn = lock in
kle på = dress
kle av = undress
kle på seg = get dressed
kle av seg = get undressed
pakke ut = unpack
pakke inn = wrap
pakke ned = pack
trekke av = pull off
trekke fra = deduct
snu om = turn round
våkne opp = wake up
gjøre om = redo; convert
gjøre opp = settle
gjøre ferdig = finish
møte opp = turn up
møte fram = turn up
dra av = pull off; leave
dra bort = go away
dra ut = go out
dra hjem = go home
reise bort = travel away
reise hjem = travel home
bringe med = bring along
slippe inn = let in
slippe ut = let out
tenke ut = think up
tenke etter = think carefully
tenke over = think over
skru på = turn on
skru av = turn off
stille inn = set; adjust
stille opp = turn up; line up
stille ut = exhibit
bære inn = carry in
bære ut = carry out
hjelpe til = help
kaste ut = throw out
kaste bort = waste
vise fram = show
vise frem = show
spise opp = eat up
drikke opp = drink up
lese opp = read aloud
lese inn = record
bruke opp = use up
betale tilbake = pay back
hoppe over = skip
henge opp = hang up
sitte igjen = remain
sitte fast = be stuck
`,le=`
stå opp = get up
finne ut = find out
gå ut = go out
gå inn = go in
kome tilbake = come back
kome inn = come in
kome ut = come out
gje opp = give up
slå på = switch on
slå av = switch off
ta på seg = put on (clothes)
ta av seg = take off (clothes)
ta med = bring along
ta imot = receive
skrive ned = write down
sjå ut = look; appear
sjå opp = look out
sjå etter = look after
halde opp = stop
halde på = be busy; keep on
setje seg ned = sit down
leggje ned = shut down; lay down
leggje til = add
sende inn = send in
sende ut = send out
vaske opp = wash up
rydde opp = tidy up
bli med = come along
dra bort = go away
`,ue=new Set([`seg`,`meg`,`deg`,`oss`,`dem`]);function de(e){let t=[];for(let n of e.split(`
`)){let e=n.trim();if(!e)continue;let[r,i]=e.split(`=`).map(e=>e.trim()),a=r.split(/\s+/),o=a.includes(`seg`),s=a.filter((e,t)=>t>0&&e!==`seg`)[0];t.push({verb:a[0],particle:s,reflexive:o,display:r,gloss:i})}return t}var fe=de(V),pe=de(le),H=new Set([`på`,`av`,`over`,`under`,`til`,`i`,`med`,`om`,`etter`,`fra`,`for`]),me=4;function U(e,t){let n=[],r=new Map;for(let e of t)r.set(e.verb,[...r.get(e.verb)??[],e]);let i=new Set;for(let t=0;t<e.length;t++){let a=e[t];if(!a.isWord||!a.verbLemmas.length)continue;let o=a.verbLemmas.flatMap(e=>r.get(e)??[]);if(o.length){o.sort((e,t)=>t.display.length-e.display.length);for(let r of o){let a=-1,o=-1,s=!1;for(let n=t+1;n<e.length&&n<=t+1+me;n++){let t=e[n];if(!t.isWord){if(/[,.;:!?…]/.test(t.punct??``))break;continue}if(t.conj&&t.normalized!==r.particle||t.finite&&!t.verbLemmas.includes(r.verb)||(a<0&&t.normalized===r.particle&&!i.has(n)?a=n:r.reflexive&&o<0&&ue.has(t.normalized)&&!i.has(n)?o=n:a<0&&t.nominal&&(s=!0),a>=0&&(!r.reflexive||o>=0)))break}if(a<0||r.reflexive&&o<0)continue;let c=[t,a,o].filter(e=>e>=0).sort((e,t)=>e-t);if(c.some(e=>e!==t&&i.has(e)))continue;let l=a-t-1,u=.85;(l>2||s)&&(u=.7),s&&H.has(r.particle)&&l>=1&&(u=.6),n.push({unit:r,head:t,pieces:c,confidence:u}),c.forEach(e=>i.add(e));break}}}return n}var he=[`be`,`for`,`mis`,`er`],ge=(e,t)=>{let n=`adapter-${e}@${t}`;return{hand:`${n}:hand`,phrases:`${n}:phrases`,constructions:`${n}:constructions`,rules:`${n}:rules`}},_e=e=>e.normalize(`NFC`).toLocaleLowerCase(`nb`),ve=e=>/^\p{Lu}/u.test(e);function ye(e){let t={},n=new Set(e.flatMap(e=>Object.keys(e)));for(let r of n)t[r]=[...new Set(e.flatMap(e=>e[r]===void 0?[]:e[r].split(`,`)))].sort().join(`,`);return t}function be(e,t={}){let n=new Map;for(let t of e){let e=`${t.lemma}|${t.pos}`;n.set(e,[...n.get(e)??[],t])}let r=[];for(let e of n.values()){let n=e[0];r.push({lemma:n.lemma,pos:n.pos,morph:ye(e.map(e=>e.morph)),gloss:n.gloss,rules:[...new Set(e.map(e=>e.rule))],order:Math.min(...e.map(e=>e.order)),base:Math.min(...e.map(e=>e.confidence)),register:n.register,varieties:n.varieties,unverified:e.some(e=>e.unverified)||void 0,score:0,origin:`hand`,gender:n.gender,...t})}return r.sort((e,t)=>e.order-t.order)}function xe(e,t){let n=e.normalized;if(n.length<3||!n.endsWith(`s`))return[];let r=n.slice(0,-1),i=t.lex.lookup(r).filter(t=>(t.pos===`NOUN`||t.pos===`PROPN`)&&(t.pos===`NOUN`||ve(e.surface)));if(!i.length)return[];let a=i.map(e=>({...e,morph:{...e.morph,Case:`Gen`},rule:`${e.rule}, with the genitive -s`,confidence:.75})),o=e.surface.slice(0,-1);return be(a,{parts:[{text:o,start:0,end:o.length,kind:`stem`,lemma:i[0].lemma,pos:i[0].pos},{text:`s`,start:o.length,end:e.surface.length,kind:`clitic`,role:`genitive -s`}],origin:`rule`,base:.75})}function Se(e,t,n){let r=v(e.surface,t.lex);if(!r)return{cands:[]};if(n)return{cands:[],parts:r.parts};let i=t.lex.lookup(_e(r.headForm)).filter(e=>e.pos===`NOUN`&&e.lemma===r.headLemma);if(!i.length)return{cands:[]};let a=_e(r.prefix)+r.headLemma;return{cands:be(i.map(e=>({...e,lemma:a,gloss:void 0,rule:`compound ${r.parts.filter(e=>e.kind!==`link`).map(e=>e.text).join(` + `)}${r.fuge.length?` (linking -${r.fuge.join(`-`)}-)`:``}; the head ${r.headLemma} decides gender and inflection`,confidence:r.confidence})),{parts:r.parts,unconfirmed:!0,origin:`rule`,base:r.confidence,gender:t.lex.noun(r.headLemma)?.gender})}}function Ce(e,t){let n=e.surface;if(/-$/.test(n)){let e=n.slice(0,-1),r=t.lex.lookup(_e(e)).filter(e=>e.pos===`NOUN`||e.pos===`ADJ`);if(r.length){let e=be(r.map(e=>({...e,rule:`${e.rule}; the first part of a coordinated compound (sjø- og landtransport)`,confidence:.7})),{origin:`rule`,base:.7});for(let t of e)t.notes={ellipsis:`first part of a compound whose second part is shared with a later word`};return e}return[]}let r=n.lastIndexOf(`-`),i=n.slice(0,r),a=n.slice(r+1);if(!i||!a)return[];if(/^\d+$/.test(i)&&/^årige?$/.test(a))return[{lemma:`${i}-årig`,pos:`ADJ`,morph:{Degree:`Pos`},rules:[`a number + -årig`],order:0,base:.6,score:0,origin:`rule`,unconfirmed:!0}];if(/^\d+$/.test(i)&&/^åring(en|er|ene)?$/.test(a))return[{lemma:`${i}-åring`,pos:`NOUN`,morph:{Gender:`Masc`},rules:[`a number + -åring`],order:0,base:.6,score:0,origin:`rule`,unconfirmed:!0,gender:`m`}];let o=t.lex.lookup(_e(a)).filter(e=>e.pos===`NOUN`||e.pos===`ADJ`||e.pos===`VERB`);if(!o.length){let n=Se({...e,surface:a,normalized:_e(a)},t,!1).cands;if(!n.length)return[];o=n.map(e=>({lemma:e.lemma,pos:e.pos,morph:e.morph,rule:e.rules.join(`; `),confidence:.5,order:0}))}let s=o[0].lemma,c=`${i}-${s}`,l=[{text:i,start:0,end:i.length,kind:`component`,role:`first part (name, abbreviation or number)`},{text:`-`,start:i.length,end:i.length+1,kind:`link`,role:`hyphen`},{text:a,start:i.length+1,end:n.length,kind:`head`,lemma:s,pos:o[0].pos,role:`head: decides the gender and the kind of thing`}];return be(o.map(e=>({...e,lemma:c,gloss:void 0,rule:`hyphenated compound ${i} + ${a}; the head ${s} decides the inflection`,confidence:.6})),{parts:l,unconfirmed:!0,origin:`rule`,base:.6,hyphen:!0})}function we(e,t,n){let{lex:r,std:i}=t,a=e.normalized,o=ve(e.surface);if(/[-‐‑–]/.test(e.surface)){let n=Ce(e,t);if(n.length)return n}let s=r.lookup(a).filter(e=>e.pos!==`PROPN`||o);if(s.length){let n=be(s),i=n.find(e=>e.pos===`NOUN`);if(i&&e.surface.length>=8){let n=Se(e,t,!0);n.parts&&(i.parts=n.parts)}for(let t of n){if(t.pos!==`VERB`||t.unit)continue;let n=he.find(n=>t.lemma.startsWith(n)&&t.lemma.length-n.length>=3&&r.hasLemma(t.lemma.slice(n.length),`VERB`)&&e.surface.toLocaleLowerCase(`nb`).startsWith(n));n&&(t.parts=[{text:e.surface.slice(0,n.length),start:0,end:n.length,kind:`prefix`,role:`inseparable prefix: the verb never splits`},{text:e.surface.slice(n.length),start:n.length,end:e.surface.length,kind:`stem`,lemma:t.lemma.slice(n.length),pos:`VERB`}])}return n}let c=xe(e,t);if(c.length)return c;let l=ce(e.surface,i,{isWord:e=>r.has(e)},{midSentence:o&&!n,isCommonNoun:e=>r.lookup(e).some(e=>e.pos===`NOUN`)});if(l){let e=l.modern.split(` `);if(e.length===1){let t=r.lookup(e[0]).filter(e=>e.pos!==`PROPN`);if(t.length){let e=be(t.map(e=>({...e,rule:`${e.rule}; written in older spelling (${l.rule})`,confidence:l.confidence})),{orthography:{modern:l.modern,period:l.period,confidence:l.confidence},varieties:[l.variety],origin:`rule`,base:l.confidence});if(l.confidence<.9)for(let t of e)t.unconfirmed=!1;return e}}}if(!o||n){let n=Se(e,t,!1);if(n.cands.length)return n.cands}return o?[{lemma:e.surface,pos:`PROPN`,morph:{},rules:[`a capitalised word the word list does not know: probably a name`],order:0,base:n?.4:.5,score:0,origin:`rule`,unconfirmed:!0,notes:{nameGuess:`true`}}]:[]}function Te(e,t,n){let r={...e.notes??{}};e.rules.length&&(r.rule=e.rules.join(`; `)),e.unverified&&(r.unverified=`true`),e.context&&(r.context=e.context);let i={lemma:e.lemma,pos:e.pos,morph:e.morph,confidence:Math.round(Math.min(t,e.unverified?.8:1)*100)/100,origin:e.origin,sourceId:e.origin===`hand`?n.ids.hand:n.ids.rules};return Object.keys(r).length&&(i.notes=r),e.gloss&&(i.gloss=e.gloss),e.register?.length&&(i.register=e.register),e.varieties?.length&&(i.varieties=e.varieties),e.parts?.length&&(i.parts=e.parts),e.orthography&&(i.orthography=e.orthography),e.unconfirmed&&(i.unconfirmed=!0),e.role&&(i.role=e.role),e.unit&&(i.unit=e.unit),i}function Ee(e){return e.map((t,n)=>{if(e.length===1)return t.base>=.9?.9:t.base;if(n===0){let n=t.score-e[1].score,r=n>=3?.88:n>=1.5?.8:.7;return Math.min(t.base,r)}return Math.min(t.base,n===1?.5:.4)})}function De(e,t,n){let r=e.map((e,n)=>{let r=t[n],i=e.cands[0]?.score??0,a=e.cands.filter(e=>(e.pos===`VERB`||e.pos===`AUX`)&&!e.unit&&e.score>=i-1.5);return{normalized:r.normalized,isWord:r.isWord,verbLemmas:[...new Set(a.map(e=>e.lemma))],finite:a.some(e=>/Fin/.test(e.morph.VerbForm??``)&&!/Inf/.test(e.morph.VerbForm??``)),nominal:!!e.cands[0]&&[`NOUN`,`PROPN`,`DET`,`ADJ`,`NUM`].includes(e.cands[0].pos),conj:!!e.cands[0]&&(e.cands[0].pos===`CONJ`||e.cands[0].pos===`SCONJ`),punct:r.isWord?void 0:r.surface}});for(let i of U(r,n.units)){let n=i.unit.display,r=(e,t,r,a)=>({lemma:n,pos:t,morph:a?{...a.morph}:{},gloss:r,rules:[`the particle verb ${n}: the particle follows the verb (${e})`],order:0,base:i.confidence,score:100,origin:`rule`,role:e,unit:{head:i.head,pieces:i.pieces,role:e,display:n},notes:{unit:n,...e===`head`?{}:{particleOf:String(i.head)}}});for(let a of i.pieces){let o=e[a];if(a===i.head){let e=o.cands.filter(e=>(e.pos===`VERB`||e.pos===`AUX`)&&e.lemma===i.unit.verb).slice(0,2).map(e=>({...r(`head`,`VERB`,i.unit.gloss,e),gender:void 0}));for(let t of e)t.rules.push();o.cands=[...e,...o.cands.map(e=>({...e,score:Math.min(e.score,0)}))],o.cands.forEach((t,r)=>{r>=e.length&&(t.pos===`VERB`||t.pos===`AUX`)&&t.lemma===i.unit.verb&&(t.context=`part of the particle verb ${n}`)})}else{let e=t[a].normalized;o.cands=[[`seg`,`meg`,`deg`,`oss`,`dem`].includes(e)?r(`reflexive pronoun of the unit`,`PRON`,i.unit.gloss):r(`particle`,`ADV`,i.unit.gloss),...o.cands.map(e=>({...e,score:Math.min(e.score,0)}))]}}}}function Oe(e,t,n){if(n.std!==`nb`)return;let r=e.filter(e=>e.word&&!e.initial&&ve(t[e.i].surface)&&t[e.i].surface.slice(1)===t[e.i].surface.slice(1).toLocaleLowerCase(`nb`)&&e.cands.length>0&&e.cands.every(e=>e.pos===`NOUN`)&&!e.cands.some(e=>e.orthography));if(!(r.length<2))for(let e of r)for(let n of e.cands)n.orthography={modern:t[e.i].normalized,period:`nb-pre1907`,confidence:.5},n.varieties=[`nb-dano`]}function ke(e,t){let n=!1,r=e.map((e,r)=>{let i=!n&&e.isWord;return e.isWord&&(n=!0),{i:r,tok:e,cands:e.isWord?we(e,t,i):[],initial:i,word:e.isWord}});return F(r,e,t.std),Oe(r,e,t),De(r,e,t),r.forEach((t,n)=>{let r=e[n+1];t.word&&r&&!r.isWord&&/^['’]$/.test(r.surface)&&r.start===e[n].end&&t.cands[0]&&(t.cands[0].pos===`PROPN`||t.cands[0].pos===`NOUN`)&&(t.cands[0]={...t.cands[0],morph:{...t.cands[0].morph,Case:`Gen`},notes:{...t.cands[0].notes??{},genitive:`apostrophe after a name or noun ending in s`}})}),r.map(e=>{let n=Ee(e.cands);return{token:e.tok,candidates:e.cands.map((e,r)=>Te(e,e.unit?Math.max(n[r],e.base):n[r],t)),analyzer:t.analyzer}})}var Ae=e=>n(e).toLocaleLowerCase(`nb`),je=`bl.a.,f.eks.,m.fl.,m.a.o.,o.l.,o.a.,m.m.,t.o.m.,f.o.m.,e.kr.,f.kr.,d.v.s.,m.v.,dvs.,osv.,ca.,mv.,nr.,kl.,jf.,pga.,ifm.,mht.,evt.,mfl.,dr.,prof.,kr.,tlf.,mob.`.split(`,`).sort((e,t)=>t.length-e.length),Me=`bl.f.eks.m.fl.dvs.osv.ca.mv.nr.kl.jf.pga.ifm.mht.evt.mfl.bla.hr.dr.prof.st.kr.tlf.mob.o.l.a.v.t.kr.sr.jr.resp`.split(`.`),Ne=new Intl.Segmenter(`nb`,{granularity:`word`}),Pe=/^[\s​﻿]+$/u,Fe=/^[-‐‑–]$/u;function Ie(e,t){let n=e.slice(t,t+8).toLowerCase();for(let r of je){if(!n.startsWith(r))continue;let i=e[t+r.length];if((i===void 0||!/\p{L}/u.test(i)||r.endsWith(`.`))&&!(t>0&&/\p{L}/u.test(e[t-1])))return e.slice(t,t+r.length)}}function Le(e){let t=[...Ne.segment(e)],n=[],r=(t,r,i)=>{let a=e.slice(t,r);n.push({surface:a,start:t,end:r,isWord:i,normalized:Ae(a)})};for(let n=0;n<t.length;){let i=t[n];if(Pe.test(i.segment)){n++;continue}let a=Ie(e,i.index);if(a){let e=i.index+a.length;for(r(i.index,e,!0);n<t.length&&t[n].index<e;)n++;continue}let o=e=>!!e&&e.isWordLike===!0&&/[\p{L}\p{N}]/u.test(e.segment);if(o(i)){let a=i.index+i.segment.length,s=n+1;for(;s+1<t.length&&Fe.test(t[s].segment)&&t[s].index===a&&o(t[s+1])&&t[s+1].index===a+t[s].segment.length;)a=t[s+1].index+t[s+1].segment.length,s+=2;s<t.length&&Fe.test(t[s].segment)&&t[s].index===a&&s+1<t.length&&/^\s+(og|eller)\s/u.test(e.slice(a+t[s].segment.length,a+t[s].segment.length+8)+` `)&&(a=t[s].index+t[s].segment.length,s+=1);let c=e.slice(i.index,a),l=/\p{L}/u.test(c);r(i.index,a,l),n=s;continue}r(i.index,i.index+i.segment.length,!1),n++}return n}function Re(e){return t(e,{terminators:`.!?…`,abbreviations:Me,ordinalDot:!1})}var ze={"v2-main-clause":{title:`Verb second: the verb is the second element`,explanation:`In a main clause the conjugated verb comes second: "Jeg bor i Oslo." The subject normally comes first, but another element can come first (see inversion).`},"inversion-after-adverbial":{title:`Something else first: the subject follows the verb`,explanation:`When a time or place word starts the sentence, the verb still comes second and the subject moves behind it: "I morgen kommer jeg" (tomorrow come I).`},"subordinate-ikke-before-verb":{title:`Subordinate clause: ikke before the verb`,explanation:`In a clause started by at, fordi, hvis, når and similar words, the subject and then ikke come before the verb: "Jeg vet at han ikke kommer." In a main clause ikke comes after the verb.`},"yes-no-question":{title:`Yes/no question: the verb comes first`,explanation:`A question that wants ja or nei starts with the conjugated verb: "Kommer du i morgen?"`},"wh-question":{title:`Question word first, then the verb`,explanation:`A question with hvem, hva, hvor, hvorfor, hvordan or når starts with the question word and the verb comes second: "Hvorfor kommer du ikke?"`},"double-definiteness":{title:`Double definiteness: den store bilen`,explanation:`With an adjective the noun keeps its definite ending and a word (den, det, de) comes in front as well: "den store bilen", "det nye huset", "de gamle husene".`},"postposed-possessive":{title:`The possessive after the noun: bilen min`,explanation:`The usual way to say "my car" is the definite noun followed by the possessive: "bilen min", "mora mi". Before the noun the noun is indefinite: "min bil". Never "min bilen".`},"sin-reflexive":{title:`sin, si, sitt, sine: his own, her own`,explanation:`Sin/si/sitt/sine point back to the subject of the same clause: "Han tok bilen sin" (his own car). "Han tok bilen hans" means someone else's. They agree with the thing owned, not with the owner.`},"perfect-har":{title:`Perfect tense: har + participle`,explanation:`The perfect is made with har (hadde for the past perfect) and the participle: "Jeg har spist." For a few verbs of movement er is also possible (er kommet), but har is the default.`},"modal-bare-infinitive":{title:`Modal verb + infinitive without å`,explanation:`After kan, skal, vil, må, bør the infinitive stands without å: "Jeg kan svømme", "Du må komme."`},"infinitive-marker-aa":{title:`å + infinitive`,explanation:`The infinitive marker å goes before the infinitive after most other verbs and in phrases such as "for å": "Jeg liker å lese." Not to be confused with og (and).`},"s-passive":{title:`The s-passive: leses, finnes`,explanation:`A verb with -s says what is done to something: "Boka leses av mange." Some -s verbs are not passive at all (synes, finnes, trives).`},"bli-passive":{title:`The bli-passive: blir + participle`,explanation:`"Boken blir lest" (is being read), "Huset ble bygd" (was built). Bli + participle is the usual passive for single events.`},"da-vs-naar":{title:`da or når?`,explanation:`Da is used for one event in the past ("Da jeg var liten …"); når for repeated events, the present, the future and in questions ("Når jeg er trøtt, sover jeg").`},comparison:{title:`Comparison: -ere, -est, mer, mest`,explanation:`Most adjectives add -ere and -est ("større", "størst"); long adjectives and participles use mer and mest. "enn" means than: "større enn deg".`},"particle-verb":{title:`Particle verb: stå opp, finne ut`,explanation:`Many verbs have a particle that follows them and changes the meaning: "stå opp" (get up). With a pronoun object the pronoun comes before the particle: "Jeg slår den på."`}},W=e=>e?.candidates[0]?.pos,Be=e=>(e??``).split(`,`).filter(Boolean),G=(e,t,n)=>Be(e?.morph[t]).includes(n),K=e=>e?.candidates[0],Ve=e=>!!e&&(e.pos===`VERB`||e.pos===`AUX`)&&G(e,`VerbForm`,`Fin`)&&!G(e,`VerbForm`,`Inf`)&&!G(e,`Mood`,`Imp`)&&!G(e,`Voice`,`Pass`),He=e=>!!e&&(e.pos===`VERB`||e.pos===`AUX`)&&G(e,`VerbForm`,`Inf`)&&!G(e,`VerbForm`,`Fin`)&&!G(e,`Voice`,`Pass`),Ue=e=>!!e&&(e.pos===`VERB`||e.pos===`AUX`)&&G(e,`VerbForm`,`Part`)&&!G(e,`VerbForm`,`Fin`),We=e=>!!e&&e.pos===`PRON`&&G(e,`Case`,`Nom`)&&e.morph.Case===`Nom`,Ge=new Set([`hvem`,`hva`,`hvilken`,`hvilket`,`hvilke`,`hvor`,`hvordan`,`hvorfor`,`når`,`kven`,`kva`,`kvifor`,`korleis`,`kvar`,`kor`]),Ke=new Set([`at`,`fordi`,`hvis`,`viss`,`dersom`,`mens`,`medan`,`når`,`da`,`då`,`siden`,`sidan`,`om`,`før`,`idet`,`ettersom`,`som`]),qe=new Set([`ikke`,`ikkje`,`aldri`,`alltid`,`ofte`,`også`,`òg`,`bare`,`berre`,`jo`,`nok`,`vel`,`heller`,`sjelden`,`sjeldan`,`allerede`,`allereie`]),Je=new Set([`min`,`mi`,`mitt`,`mine`,`din`,`di`,`ditt`,`dine`,`vår`,`vårt`,`våre`,`sin`,`si`,`sitt`,`sine`,`hans`,`hennes`,`hennar`,`deres`,`deira`,`dykkar`,`dens`,`dets`]);function Ye(e,t,n){let r=[],i=(e,t,n)=>{if(r.some(n=>n.key===e&&n.tokenIndexes.join()===t.join()))return;let i=ze[e];r.push({key:e,title:i.title,explanation:i.explanation,tokenIndexes:t,confidence:Math.round(n*100)/100})},a=[];if(e.forEach((e,t)=>{e.isWord&&a.push(t)}),!a.length)return r;let o=e[e.length-1],s=/\?$/.test(o.surface)||e.some(e=>e.surface===`?`),c=a[0],l=t[c],u=e[c].normalized,d=Ke.has(u)&&W(l)===`SCONJ`;if(s){if(Ge.has(u)&&[`PRON`,`ADV`,`DET`].includes(W(l)??``)){let e=a.find(e=>e>c&&Ve(K(t[e])));i(`wh-question`,e===void 0?[c]:[c,e],e===void 0?.75:.9)}else(Ve(K(l))||l.candidates.some(e=>Ve(e))&&[`VERB`,`AUX`].includes(W(l)??``))&&i(`yes-no-question`,[c],.85)}if(!s&&!d){let n=a.findIndex(e=>Ve(K(t[e])));if(n>=0){let r=a[n],o=a.slice(0,n),s=o.length>0&&o.every(e=>[`PRON`,`NOUN`,`PROPN`,`DET`,`ADJ`,`NUM`,`ADV`,`ADP`].includes(W(t[e])??``)),c=a[n+1]===void 0?-1:a[n+1],l=t[c],u=qe.has(e[c]?.normalized??``)?a[n+2]:void 0;s&&n===1&&(We(K(t[o[0]]))||[`NOUN`,`PROPN`].includes(W(t[o[0]])??``))?i(`v2-main-clause`,[o[0],r],.85):s&&n>=1&&o.every(e=>!We(K(t[e]))||!1)&&o.length>=1&&(We(K(l))||u!==void 0&&We(K(t[u])))?(i(`inversion-after-adverbial`,[o[0],r,u??c],.85),i(`v2-main-clause`,[o[0],r],.8)):s&&n>=2&&o.every(e=>[`DET`,`ADJ`,`NOUN`,`PROPN`,`NUM`,`PRON`].includes(W(t[e])??``))&&i(`v2-main-clause`,[o[0],r],.75)}}return a.forEach((n,r)=>{let o=t[n];if(!Ke.has(e[n].normalized)||!o.candidates.some(e=>e.pos===`SCONJ`)||W(o)!==`SCONJ`)return;let s=a[r+1],c=a[r+2],l=a[r+3];s!==void 0&&c!==void 0&&l!==void 0&&(We(K(t[s]))||[`NOUN`,`PROPN`].includes(W(t[s])??``))&&qe.has(e[c].normalized)&&Ve(K(t[l]))&&i(`subordinate-ikke-before-verb`,[n,c,l],.85)}),a.forEach((n,r)=>{let o=K(t[n]),s=t[a[r+1]],c=t[a[r+2]];o?.pos===`DET`&&[`den`,`det`,`de`,`dei`].includes(o.lemma??``)&&K(s)?.pos===`ADJ`&&K(c)?.pos===`NOUN`&&G(K(c),`Definite`,`Def`)&&i(`double-definiteness`,[n,a[r+1],a[r+2]],.85),o?.pos===`NOUN`&&G(o,`Definite`,`Def`)&&K(s)?.pos===`DET`&&Je.has(e[a[r+1]]?.normalized??``)&&e[a[r+1]].start===e[n].end+1&&i(`postposed-possessive`,[n,a[r+1]],.85),o?.pos===`DET`&&o.lemma===`sin`&&i(`sin-reflexive`,[n],.9)}),a.forEach((n,r)=>{let o=K(t[n]);if(!o)return;let s=[a[r+1],a[r+2],a[r+3]].filter(e=>e!==void 0);if(o.pos===`AUX`&&o.lemma===`ha`||o.pos===`AUX`&&[`ha`,`hava`].includes(o.lemma??``)){if(!Ve(o)&&!He(o))return;let c=s.find(e=>Ue(K(t[e]))&&!G(K(t[e]),`Voice`,`Pass`)),l=c===void 0?[]:a.slice(r+1,a.indexOf(c));c!==void 0&&l.every(n=>qe.has(e[n].normalized)||[`PRON`,`NOUN`,`PROPN`,`DET`].includes(W(t[n])??``))&&i(`perfect-har`,[n,c],.85)}if(o.pos===`AUX`&&[`kunne`,`skulle`,`ville`,`måtte`,`burde`,`tørre`,`tore`].includes(o.lemma??``)&&Ve(o)){let o=s.find(e=>He(K(t[e]))),c=o===void 0?[]:a.slice(r+1,a.indexOf(o));o!==void 0&&c.every(n=>qe.has(e[n].normalized)||We(K(t[n]))||[`PRON`,`ADV`].includes(W(t[n])??``))&&i(`modal-bare-infinitive`,[n,o],.85)}if(o.pos===`PART`&&o.lemma===`å`){let e=a[r+1];e!==void 0&&He(K(t[e]))&&i(`infinitive-marker-aa`,[n,e],.9)}if((o.pos===`VERB`||o.pos===`AUX`)&&G(o,`Voice`,`Pass`)&&i(`s-passive`,[n],.75),(o.pos===`AUX`||o.pos===`VERB`)&&[`bli`,`verte`].includes(o.lemma??``)&&(Ve(o)||He(o)||Ue(o))){let e=s.find(e=>Ue(K(t[e]))&&K(t[e])?.lemma!==`bli`);e!==void 0&&i(`bli-passive`,[n,e],.8)}o.pos===`SCONJ`&&[`da`,`då`,`når`].includes(o.lemma??``)&&i(`da-vs-naar`,[n],.8);let c=o.morph.Degree===`Cmp`||o.morph.Degree===`Sup`;(o.pos===`ADJ`||o.pos===`ADV`)&&c&&i(`comparison`,[n],.8),(o.lemma===`mer`||o.lemma===`meir`||o.lemma===`mest`)&&K(t[a[r+1]])?.pos===`ADJ`&&i(`comparison`,[n,a[r+1]],.8),o.unit&&o.unit.head===n&&o.pos===`VERB`&&i(`particle-verb`,o.unit.pieces,o.confidence)}),r.sort((e,t)=>e.tokenIndexes[0]-t.tokenIndexes[0]||e.key.localeCompare(t.key))}var Xe=[{words:[`i`,`dag`],gloss:`today`,kind:`formula`},{words:[`i`,`morgen`],gloss:`tomorrow`,kind:`formula`},{words:[`i`,`går`],gloss:`yesterday`,kind:`formula`},{words:[`i`,`kveld`],gloss:`tonight, this evening`,kind:`formula`},{words:[`i`,`natt`],gloss:`tonight; last night`,kind:`formula`},{words:[`i`,`morges`],gloss:`this morning`,kind:`formula`},{words:[`i`,`år`],gloss:`this year`,kind:`formula`},{words:[`i`,`fjor`],gloss:`last year`,kind:`formula`},{words:[`i`,`ettermiddag`],gloss:`this afternoon`,kind:`formula`},{words:[`for`,`å`],gloss:`in order to`,kind:`frame`},{words:[`på`,`grunn`,`av`],gloss:`because of`,kind:`collocation`},{words:[`blant`,`annet`],gloss:`among other things`,kind:`collocation`},{words:[`for`,`eksempel`],gloss:`for example`,kind:`collocation`},{words:[`hva`,`slags`],gloss:`what kind of`,kind:`collocation`},{words:[`selv`,`om`],gloss:`even though`,kind:`collocation`},{words:[`slik`,`at`],gloss:`so that`,kind:`collocation`},{words:[`så`,`fort`],gloss:`as soon as`,kind:`collocation`},{words:[`til`,`og`,`med`],gloss:`even`,kind:`collocation`},{words:[`i`,`tillegg`],gloss:`in addition`,kind:`collocation`},{words:[`til`,`slutt`],gloss:`finally, in the end`,kind:`collocation`},{words:[`på`,`vei`],gloss:`on the way`,kind:`collocation`},{words:[`for`,`det`,`meste`],gloss:`for the most part`,kind:`collocation`},{words:[`ved`,`siden`,`av`],gloss:`beside; in addition to`,kind:`collocation`},{words:[`noen`,`ganger`],gloss:`sometimes`,kind:`collocation`},{words:[`hver`,`dag`],gloss:`every day`,kind:`collocation`},{words:[`hele`,`tiden`],gloss:`all the time`,kind:`collocation`},{words:[`god`,`morgen`],gloss:`good morning`,kind:`formula`},{words:[`god`,`natt`],gloss:`good night`,kind:`formula`},{words:[`god`,`dag`],gloss:`hello (good day)`,kind:`formula`},{words:[`ha`,`det`,`bra`],gloss:`goodbye (take care)`,kind:`formula`},{words:[`vær`,`så`,`snill`],gloss:`please`,kind:`formula`},{words:[`takk`,`for`,`maten`],gloss:`thanks for the meal`,kind:`formula`},{words:[`det`,`vil`,`si`],gloss:`that is to say`,kind:`collocation`},{words:[`i`,`stedet`,`for`],gloss:`instead of`,kind:`collocation`},{words:[`på`,`nytt`],gloss:`again, anew`,kind:`collocation`},{words:[`i`,`hvert`,`fall`],gloss:`at any rate`,kind:`collocation`},{words:[`i`,`alle`,`fall`],gloss:`in any case`,kind:`collocation`},{words:[`en`,`gang`],gloss:`once; one day`,kind:`collocation`},{words:[`nå`,`og`,`da`],gloss:`now and then`,kind:`collocation`},{words:[`om`,`morgenen`],gloss:`in the morning`,kind:`collocation`},{words:[`om`,`kvelden`],gloss:`in the evening`,kind:`collocation`},{words:[`om`,`natten`],gloss:`at night`,kind:`collocation`},{words:[`om`,`sommeren`],gloss:`in summer`,kind:`collocation`},{words:[`helt`,`til`],gloss:`all the way to; until`,kind:`collocation`},{words:[`på`,`den`,`måten`],gloss:`in that way`,kind:`collocation`},{words:[`så`,`mye`],gloss:`so much`,kind:`collocation`},{words:[`så`,`mange`],gloss:`so many`,kind:`collocation`},{words:[`som`,`regel`],gloss:`as a rule`,kind:`collocation`},{words:[`for`,`lenge`,`siden`],gloss:`a long time ago`,kind:`collocation`},{words:[`for`,`ikke`,`lenge`,`siden`],gloss:`not long ago`,kind:`collocation`},{words:[`hjertelig`,`velkommen`],gloss:`a warm welcome`,kind:`formula`},{words:[`i`,`Jesu`,`navn`],gloss:`in Jesus' name`,kind:`formula`},{words:[`Gud`,`være`,`lovet`],gloss:`praise be to God`,kind:`formula`}],Ze=[{words:[`i`,`dag`],gloss:`today`,kind:`formula`},{words:[`i`,`morgon`],gloss:`tomorrow`,kind:`formula`},{words:[`i`,`går`],gloss:`yesterday`,kind:`formula`},{words:[`i`,`kveld`],gloss:`tonight, this evening`,kind:`formula`},{words:[`for`,`å`],gloss:`in order to`,kind:`frame`},{words:[`på`,`grunn`,`av`],gloss:`because of`,kind:`collocation`},{words:[`mellom`,`anna`],gloss:`among other things`,kind:`collocation`},{words:[`til`,`dømes`],gloss:`for example`,kind:`collocation`},{words:[`sjølv`,`om`],gloss:`even though`,kind:`collocation`},{words:[`slik`,`at`],gloss:`so that`,kind:`collocation`},{words:[`til`,`slutt`],gloss:`finally, in the end`,kind:`collocation`},{words:[`kva`,`slags`],gloss:`what kind of`,kind:`collocation`},{words:[`god`,`morgon`],gloss:`good morning`,kind:`formula`},{words:[`ha`,`det`,`bra`],gloss:`goodbye (take care)`,kind:`formula`}],Qe={nb:[{pattern:[`da`,`_`,`være`,`ung`],display:`da … var ung`,gloss:`when (someone) was young`,kind:`frame`,variants:[[`da`,{slot:!0},`være`,`ung`]]},{pattern:[`begynne`,`å`,`forstå`],display:`begynne å forstå`,gloss:`begin to understand`,kind:`frame`,variants:[[`begynne`,{gap:3},`å`,`forstå`]]},{pattern:[`tro`,`på`,`_`],display:`tro på …`,gloss:`believe in (someone or something)`,kind:`frame`,variants:[[`tro`,{gap:2},`på`,{slot:!0}]]}],nn:[{pattern:[`då`,`_`,`vere`,`ung`],display:`då … var ung`,gloss:`when (someone) was young`,kind:`frame`,variants:[[`då`,{slot:!0},`vere`,`ung`]]},{pattern:[`byrje`,`å`,`forstå`],display:`byrje å forstå`,gloss:`begin to understand`,kind:`frame`,variants:[[`byrje`,{gap:3},`å`,`forstå`]]},{pattern:[`tru`,`på`,`_`],display:`tru på …`,gloss:`believe in (someone or something)`,kind:`frame`,variants:[[`tru`,{gap:2},`på`,{slot:!0}]]}]};function $e(t,n,r){let i=[...e(t,n,Qe[r],Ae)],a=r===`nb`?Xe:Ze,o=t.map((e,t)=>e.isWord?t:-1).filter(e=>e>=0);for(let e of a){let n=e.words.map(e=>e.toLocaleLowerCase(`nb`));for(let r=0;r+n.length<=o.length;r++){let a=o.slice(r,r+n.length);a.every((e,r)=>t[e].normalized===n[r])&&(a.some((e,n)=>n>0&&/[.,;:!?]/.test(t.slice(a[n-1]+1,e).map(e=>e.surface).join(``)))||i.push({pattern:n,display:e.words.join(` `),kind:e.kind,tokenIndexes:a,confidence:.9,gloss:e.gloss}))}}return i.sort((e,t)=>e.tokenIndexes[0]-t.tokenIndexes[0]||e.pattern.join(`_`).localeCompare(t.pattern.join(`_`)))}var et={N:`NOUN`,PN:`PROPN`,V:`VERB`,AUX:`AUX`,ADJ:`ADJ`,ADV:`ADV`,PRON:`PRON`,DET:`DET`,ADP:`ADP`,CONJ:`CONJ`,SCONJ:`SCONJ`,PART:`PART`,NUM:`NUM`,INTJ:`INTJ`},tt={sg:{Number:`Sing`},pl:{Number:`Plur`},m:{Gender:`Masc`},f:{Gender:`Fem`},n:{Gender:`Neut`},mf:{Gender:`Fem,Masc`},def:{Definite:`Def`},ind:{Definite:`Ind`},nom:{Case:`Nom`},acc:{Case:`Acc`},gen:{Case:`Gen`},1:{Person:`1`},2:{Person:`2`},3:{Person:`3`},pres:{VerbForm:`Fin`,Tense:`Pres`},past:{VerbForm:`Fin`,Tense:`Past`},inf:{VerbForm:`Inf`},ptcp:{VerbForm:`Part`,Tense:`Past`},imp:{VerbForm:`Fin`,Mood:`Imp`},pass:{Voice:`Pass`},pos:{Degree:`Pos`},cmp:{Degree:`Cmp`},supl:{Degree:`Sup`},refl:{Reflex:`Yes`},prs:{PronType:`Prs`},dem:{PronType:`Dem`},rel:{PronType:`Rel`},int:{PronType:`Int`},art:{PronType:`Art`},indef:{PronType:`Ind`},tot:{PronType:`Tot`},negp:{PronType:`Neg`},poss:{Poss:`Yes`},neg:{Polarity:`Neg`},ord:{NumType:`Ord`},card:{NumType:`Card`},rec:{PronType:`Rcp`}};function nt(e){let t={};for(let n of e.split(/\s+/).filter(Boolean)){let e=n.indexOf(`=`),r=e>0?{[n.slice(0,e)]:n.slice(e+1)}:tt[n];if(!r)throw Error(`unknown Norwegian morph tag "${n}"`);for(let[e,n]of Object.entries(r))t[e]=t[e]===void 0?n:[...new Set([...t[e].split(`,`),...n.split(`,`)])].sort().join(`,`)}return t}function rt(e){let t=[],n=[],r=!1,i=[];for(let a of e.split(/\s+/).filter(Boolean))a===`^`?r=!0:a.startsWith(`#`)?t.push(a.slice(1)):a.startsWith(`@`)?n.push(a.slice(1)):i.push(a);return{morph:nt(i.join(` `)),register:t.length?t:void 0,unverified:r||void 0,varieties:n.length?n:void 0}}function it(e,t={}){let n=[],r=t.rank??0;for(let t of e.split(`
`)){let e=t.trim();if(!e||e.startsWith(`//`))continue;let[i,a,o,s=``]=e.split(`|`).map(e=>e.trim()),c=et[a];if(!c)throw Error(`unknown POS code "${a}" in row "${e}"`);r++;let l=s?s.split(`,`).map(e=>e.trim()).filter(Boolean):[i];for(let e of l){let t=e.indexOf(`:`),a=t<0?e:e.slice(0,t),s=t<0?{morph:{}}:rt(e.slice(t+1));n.push({form:a,lemma:i,pos:c,gloss:o,morph:s.morph,register:s.register,varieties:s.varieties,unverified:s.unverified,source:`machine-draft`,rank:r})}}return n}var at=it(`
// ── personal pronouns (object forms share the subject form's lemma) ──
jeg|PRON|I; me|jeg:prs 1 sg nom, meg:prs 1 sg acc
du|PRON|you (sg)|du:prs 2 sg nom, deg:prs 2 sg acc
han|PRON|he; him|han:prs 3 m sg nom, ham:prs 3 m sg acc
hun|PRON|she; her|hun:prs 3 f sg nom, henne:prs 3 f sg acc
vi|PRON|we; us|vi:prs 1 pl nom, oss:prs 1 pl acc
dere|PRON|you (pl)|dere:prs 2 pl
de|PRON|they; them|de:prs 3 pl nom, dem:prs 3 pl acc
seg|PRON|oneself (reflexive)|seg:prs refl 3 acc
man|PRON|one, you (generic)|man:prs 3 indef
// ── articles and demonstratives ──
en|DET|a, an (the indefinite article)|en:art ind mf sg, ei:art ind f sg, et:art ind n sg
den|DET|that, the (before an adjective)|den:dem mf sg
det|DET|that, the (before an adjective)|det:dem n sg
de|DET|those, the (before an adjective)|de:dem pl
den|PRON|it (en/ei noun); that|den:prs 3 mf sg
det|PRON|it; that; there (dummy subject)|det:prs 3 n sg
denne|DET|this, these|denne:dem sg mf, dette:dem sg n, disse:dem pl
dette|PRON|this (thing)|dette:dem n sg
disse|PRON|these|disse:dem pl
// ── possessives (the form agrees with the thing possessed) ──
min|DET|my|min:poss 1 sg mf, mi:poss 1 sg f, mitt:poss 1 sg n, mine:poss 1 pl
din|DET|your (sg)|din:poss 2 sg mf, di:poss 2 sg f, ditt:poss 2 sg n, dine:poss 2 pl
vår|DET|our|vår:poss 1 pl sg mf, vårt:poss 1 pl sg n, våre:poss 1 pl pl
sin|DET|his/her/its/their own (reflexive)|sin:poss refl 3 sg mf, si:poss refl 3 f sg, sitt:poss refl 3 n sg, sine:poss refl 3 pl
hans|DET|his|hans:poss 3 m
hennes|DET|her|hennes:poss 3 f
deres|DET|their; your (pl)|deres:poss
dens|DET|its (en/ei noun)|dens:poss 3
dets|DET|its (et noun)|dets:poss 3
// ── other determiners and quantifiers ──
all|DET|all|all:tot sg mf, alt:tot sg n, alle:tot pl
alle|PRON|everyone|alle:tot pl
alt|PRON|everything|alt:tot n sg
hele|DET|the whole|hele:def
begge|DET|both|begge:tot pl
hver|DET|each, every|hver:tot sg mf, hvert:tot sg n
noen|DET|some, any|noen:indef sg mf, noen:indef pl
noen|PRON|someone, anyone|noen:indef
noe|DET|some, any (neuter)|noe:indef n sg
noe|PRON|something, anything|noe:indef n sg
ingen|DET|no, none|ingen:negp sg mf, ingen:negp pl, intet:negp n sg
ingenting|PRON|nothing|ingenting:negp
mange|DET|many|mange:indef pl
mange|PRON|many (people)|mange:indef pl
mye|DET|much, a lot of|mye:indef n sg
mye|ADV|much, a lot|mye
lite|ADV|little|lite
litt|ADV|a little|litt
få|DET|few|få:indef pl
flere|DET|more (several)|flere:cmp indef pl
flest|DET|most (of countable things)|flest:supl indef pl
mer|ADV|more|mer:cmp
mer|DET|more|mer:cmp indef
mest|ADV|most|mest:supl
mest|DET|most|mest:supl indef
slik|DET|such|slik:dem sg mf, slikt:dem sg n, slike:dem pl
sånn|DET|such, like that|sånn:dem sg mf, sånt:dem sg n, sånne:dem pl
selv|PRON|self|selv:prs refl, selve:prs refl def
samme|ADJ|same|samme
annen|ADJ|other, different, second|annen:pos m sg ind, annet:pos n sg ind, andre:pos pl, andre:pos def
hverandre|PRON|each other|hverandre:prs rec
// ── interrogatives and relatives ──
hvem|PRON|who|hvem:int
hva|PRON|what|hva:int
hvilken|DET|which|hvilken:int sg mf, hvilket:int sg n, hvilke:int pl
hvor|ADV|where; how (before an adjective)|hvor:int
hvordan|ADV|how|hvordan:int
hvorfor|ADV|why|hvorfor:int
når|ADV|when (question)|når:int
som|PRON|who, which, that (relative)|som:rel
hvis|PRON|whose (formal)|hvis:rel
// ── auxiliaries, copulas and modals ──
være|AUX|be|være:inf, er:pres, var:past, vært:ptcp, vær:imp
ha|AUX|have (perfect auxiliary)|ha:inf, har:pres, hadde:past, hatt:ptcp, ha:imp
bli|AUX|become; be (passive auxiliary)|bli:inf, blir:pres, ble:past, blei:past #colloquial, blitt:ptcp, bli:imp
kunne|AUX|can, be able to|kunne:inf, kan:pres, kunne:past, kunnet:ptcp
skulle|AUX|shall, should, be going to|skulle:inf, skal:pres, skulle:past, skullet:ptcp
ville|AUX|will, want to|ville:inf, vil:pres, ville:past, villet:ptcp
måtte|AUX|must, have to|måtte:inf, må:pres, måtte:past, måttet:ptcp
burde|AUX|ought to|burde:inf, bør:pres, burde:past, burdet:ptcp
tørre|AUX|dare|tørre:inf, tør:pres, torde:past, turt:ptcp ^
// ── prepositions ──
i|ADP|in; for (duration)|i
på|ADP|on; at|på
til|ADP|to; until|til
fra|ADP|from|fra
av|ADP|of; off; by|av
med|ADP|with|med
om|ADP|about; around; in (a period)|om
for|ADP|for; before (spatial)|for
ved|ADP|by, at, near|ved
over|ADP|over, above|over
under|ADP|under, during|under
mot|ADP|against, towards|mot
mellom|ADP|between|mellom
gjennom|ADP|through|gjennom
etter|ADP|after, according to|etter
før|ADP|before|før
uten|ADP|without|uten
hos|ADP|at (someone's place), with|hos
blant|ADP|among|blant
rundt|ADP|around|rundt
ifølge|ADP|according to|ifølge
bak|ADP|behind|bak
foran|ADP|in front of|foran
siden|ADP|since|siden
innen|ADP|within, by (a time)|innen
innenfor|ADP|inside of|innenfor
utenfor|ADP|outside of|utenfor
overfor|ADP|opposite, towards|overfor
langs|ADP|along|langs
via|ADP|via|via
per|ADP|per|per
nær|ADP|near|nær
inntil|ADP|up to; until|inntil
unntatt|ADP|except|unntatt
omkring|ADP|around|omkring
// ── conjunctions and subordinators ──
og|CONJ|and|og
eller|CONJ|or|eller
men|CONJ|but|men
for|CONJ|for, because (main-clause order)|for
så|CONJ|so (main-clause order)|så
både|CONJ|both|både
enten|CONJ|either|enten
verken|CONJ|neither|verken
samt|CONJ|as well as|samt
at|SCONJ|that|at
fordi|SCONJ|because|fordi
hvis|SCONJ|if|hvis
om|SCONJ|whether; if|om
mens|SCONJ|while|mens
når|SCONJ|when, whenever|når
da|SCONJ|when (a single past event)|da
siden|SCONJ|since|siden
før|SCONJ|before|før
dersom|SCONJ|if, in case|dersom
enn|SCONJ|than|enn
som|SCONJ|as, like|som
idet|SCONJ|as, just as|idet
ettersom|SCONJ|since, as|ettersom
slik|SCONJ|so that (colloquial)|slik
forat|SCONJ|so that (older spelling of for at)|forat:#archaic @nb-riksmal
// ── adverbs ──
endelig|ADV|at last, finally|endelig
før|ADV|before, earlier|før
fjor|ADV|last year (i fjor)|fjor
ikke|ADV|not|ikke:neg
aldri|ADV|never|aldri:neg
alltid|ADV|always|alltid
ofte|ADV|often|ofte
sjelden|ADV|seldom|sjelden
også|ADV|also, too|også
bare|ADV|only, just|bare
kun|ADV|only|kun
jo|ADV|as you know; yes (to a negative)|jo
nok|ADV|probably; enough|nok
vel|ADV|surely; well|vel
kanskje|ADV|perhaps|kanskje
sikkert|ADV|surely, probably|sikkert
ja|INTJ|yes|ja
nei|INTJ|no|nei
her|ADV|here|her
der|ADV|there|der
hit|ADV|(to) here|hit
dit|ADV|(to) there|dit
hjem|ADV|(to) home|hjem
hjemme|ADV|at home|hjemme
borte|ADV|away; over there|borte
ute|ADV|outside, out|ute
inne|ADV|inside, in|inne
oppe|ADV|up, upstairs|oppe
nede|ADV|down, downstairs|nede
opp|ADV|up|opp
ned|ADV|down|ned
inn|ADV|in (into)|inn
ut|ADV|out|ut
fram|ADV|forward|fram
frem|ADV|forward|frem
bort|ADV|away|bort
tilbake|ADV|back|tilbake
av|ADV|off|av
på|ADV|on|på
over|ADV|over|over
sammen|ADV|together|sammen
nå|ADV|now|nå
da|ADV|then; well|da
så|ADV|then; so, such|så
igjen|ADV|again; left|igjen
ennå|ADV|yet, still|ennå
enda|ADV|even (before a comparative); still|enda
fremdeles|ADV|still|fremdeles
allerede|ADV|already|allerede
snart|ADV|soon|snart
nesten|ADV|almost|nesten
veldig|ADV|very|veldig
ganske|ADV|quite|ganske
helt|ADV|completely|helt
svært|ADV|very|svært
for|ADV|too (before an adjective)|for
først|ADV|first, at first|først
sist|ADV|last|sist
senere|ADV|later|senere
tidligere|ADV|earlier, formerly|tidligere
nylig|ADV|recently|nylig
straks|ADV|at once|straks
plutselig|ADV|suddenly|plutselig
heller|ADV|rather; either (after not)|heller
dessuten|ADV|besides|dessuten
derfor|ADV|therefore|derfor
dermed|ADV|thereby|dermed
likevel|ADV|nevertheless|likevel
imidlertid|ADV|however|imidlertid
faktisk|ADV|actually|faktisk
virkelig|ADV|really|virkelig
egentlig|ADV|actually, really|egentlig
ellers|ADV|otherwise; else|ellers
samtidig|ADV|at the same time|samtidig
gjerne|ADV|gladly, willingly|gjerne
helst|ADV|preferably|helst
dessverre|ADV|unfortunately|dessverre
heldigvis|ADV|fortunately|heldigvis
sannsynligvis|ADV|probably|sannsynligvis
langt|ADV|far|langt
overalt|ADV|everywhere|overalt
nettopp|ADV|just, precisely|nettopp
akkurat|ADV|exactly|akkurat
omtrent|ADV|about, approximately|omtrent
cirka|ADV|about, approximately|cirka
ca.|ADV|about (abbreviation of cirka)|ca.
bl.a.|ADV|among other things (blant annet)|bl.a.
f.eks.|ADV|for example (for eksempel)|f.eks.
osv.|ADV|and so on (og så videre)|osv.
dvs.|ADV|that is (det vil si)|dvs.
mv.|ADV|and so on (med mer)|mv.
nr.|N|number (nummer)|nr.
kl.|N|o'clock (klokka)|kl.
fort|ADV|fast; quickly|fort
sakte|ADV|slowly|sakte
sent|ADV|late|sent
godt|ADV|well|godt
pent|ADV|nicely|pent
tidlig|ADV|early|tidlig
lenge|ADV|for a long time|lenge
lenger|ADV|longer; any longer|lenger
rett|ADV|straight; right (before a place)|rett
mye|ADV|much|mye
etterpå|ADV|afterwards|etterpå
forbi|ADV|past, by|forbi
forbi|ADP|past, by|forbi
nord|ADV|north|nord
sør|ADV|south|sør
vest|ADV|west|vest
øst|ADV|east|øst
// ── numerals ──
en|NUM|one|en:card m, ett:card n
to|NUM|two|to:card
tre|NUM|three|tre:card
fire|NUM|four|fire:card
fem|NUM|five|fem:card
seks|NUM|six|seks:card
sju|NUM|seven|sju:card
syv|NUM|seven|syv:card
åtte|NUM|eight|åtte:card
ni|NUM|nine|ni:card
ti|NUM|ten|ti:card
elleve|NUM|eleven|elleve:card
tolv|NUM|twelve|tolv:card
tretten|NUM|thirteen|tretten:card
fjorten|NUM|fourteen|fjorten:card
femten|NUM|fifteen|femten:card
seksten|NUM|sixteen|seksten:card
sytten|NUM|seventeen|sytten:card
atten|NUM|eighteen|atten:card
nitten|NUM|nineteen|nitten:card
tjue|NUM|twenty|tjue:card
tyve|NUM|twenty|tyve:card
tretti|NUM|thirty|tretti:card
førti|NUM|forty|førti:card
femti|NUM|fifty|femti:card
seksti|NUM|sixty|seksti:card
sytti|NUM|seventy|sytti:card
åtti|NUM|eighty|åtti:card
nitti|NUM|ninety|nitti:card
hundre|NUM|hundred|hundre:card
tusen|NUM|thousand|tusen:card
million|NUM|million|million:card, millioner:card pl
første|ADJ|first|første:ord
andre|ADJ|second (ordinal)|andre:ord
tredje|ADJ|third|tredje:ord
fjerde|ADJ|fourth|fjerde:ord
femte|ADJ|fifth|femte:ord
sjette|ADJ|sixth|sjette:ord
sjuende|ADJ|seventh|sjuende:ord, syvende:ord
åttende|ADJ|eighth|åttende:ord
niende|ADJ|ninth|niende:ord
tiende|ADJ|tenth|tiende:ord
// ── particles and interjections ──
å|PART|to (infinitive marker)|å
hei|INTJ|hello|hei
takk|INTJ|thanks|takk
unnskyld|INTJ|excuse me, sorry|unnskyld
amen|INTJ|amen|amen
halleluja|INTJ|hallelujah|halleluja
`),ot=it(`
// ── personal pronouns ──
eg|PRON|I; me|eg:prs 1 sg nom, meg:prs 1 sg acc
du|PRON|you (sg)|du:prs 2 sg nom, deg:prs 2 sg acc
han|PRON|he; him|han:prs 3 m sg nom, honom:prs 3 m sg acc
ho|PRON|she; her|ho:prs 3 f sg nom, henne:prs 3 f sg acc
vi|PRON|we; us|vi:prs 1 pl nom, me:prs 1 pl nom, oss:prs 1 pl acc
de|PRON|you (pl)|de:prs 2 pl nom, dykk:prs 2 pl acc
dei|PRON|they; them|dei:prs 3 pl, dem:prs 3 pl acc
seg|PRON|oneself (reflexive)|seg:prs refl 3 acc
ein|PRON|one (generic)|ein:prs 3 indef
// ── articles and demonstratives ──
ein|DET|a, an (the indefinite article)|ein:art ind m sg, ei:art ind f sg, eit:art ind n sg
den|DET|that, the (before an adjective)|den:dem mf sg
det|DET|that, the (before an adjective)|det:dem n sg
dei|DET|those, the (before an adjective)|dei:dem pl
den|PRON|it (masculine/feminine); that|den:prs 3 mf sg
det|PRON|it; that; there (dummy subject)|det:prs 3 n sg
denne|DET|this, these|denne:dem sg mf, dette:dem sg n, desse:dem pl
dette|PRON|this (thing)|dette:dem n sg
// ── possessives ──
min|DET|my|min:poss 1 sg m, mi:poss 1 sg f, mitt:poss 1 sg n, mine:poss 1 pl
din|DET|your (sg)|din:poss 2 sg m, di:poss 2 sg f, ditt:poss 2 sg n, dine:poss 2 pl
vår|DET|our|vår:poss 1 pl sg mf, vårt:poss 1 pl sg n, våre:poss 1 pl pl
sin|DET|his/her/its/their own (reflexive)|sin:poss refl 3 sg m, si:poss refl 3 f sg, sitt:poss refl 3 n sg, sine:poss refl 3 pl
hans|DET|his|hans:poss 3 m
hennar|DET|her|hennar:poss 3 f, hennes:poss 3 f
deira|DET|their|deira:poss 3 pl
dykkar|DET|your (pl)|dykkar:poss 2 pl
// ── other determiners and quantifiers ──
all|DET|all|all:tot sg mf, alt:tot sg n, alle:tot pl
alle|PRON|everyone|alle:tot pl
alt|PRON|everything|alt:tot n sg
heile|DET|the whole|heile:def
begge|DET|both|begge:tot pl
kvar|DET|each, every|kvar:tot sg mf, kvart:tot sg n
nokon|DET|some, any|nokon:indef sg mf, nokre:indef pl
nokon|PRON|someone, anyone|nokon:indef
noko|DET|some, any (neuter)|noko:indef n sg
noko|PRON|something, anything|noko:indef n sg
ingen|DET|no, none|ingen:negp sg mf, ingen:negp pl, inkje:negp n sg
ingenting|PRON|nothing|ingenting:negp
mange|DET|many|mange:indef pl
mykje|DET|much, a lot of|mykje:indef n sg
mykje|ADV|much, a lot|mykje
lite|ADV|little|lite
litt|ADV|a little|litt
få|DET|few|få:indef pl
fleire|DET|more (several)|fleire:cmp indef pl
flest|DET|most (of countable things)|flest:supl indef pl
meir|ADV|more|meir:cmp
meir|DET|more|meir:cmp indef
mest|ADV|most|mest:supl
mest|DET|most|mest:supl indef
slik|DET|such|slik:dem sg mf, slikt:dem sg n, slike:dem pl
sjølv|PRON|self|sjølv:prs refl, sjølve:prs refl def
same|ADJ|same|same
annan|ADJ|other, different, second|annan:pos m sg ind, anna:pos n sg ind, andre:pos pl, andre:pos def
// ── interrogatives and relatives ──
kven|PRON|who|kven:int
kva|PRON|what|kva:int
kvifor|ADV|why|kvifor:int
korleis|ADV|how|korleis:int
kvar|ADV|where|kvar:int
kor|ADV|how (before an adjective); where|kor:int
når|ADV|when (question)|når:int
som|PRON|who, which, that (relative)|som:rel
// ── auxiliaries, copulas and modals ──
vere|AUX|be|vere:inf, vera:inf, er:pres, var:past, vore:ptcp ^, ver:imp
ha|AUX|have (perfect auxiliary)|ha:inf, hava:inf, har:pres, hadde:past, hatt:ptcp
bli|AUX|become; be (passive auxiliary)|bli:inf, verte:inf, verta:inf, blir:pres, vert:pres, blei:past, vart:past, blitt:ptcp, vorte:ptcp ^
kunne|AUX|can, be able to|kunne:inf, kan:pres, kunne:past, kunna:ptcp ^
skulle|AUX|shall, should|skulle:inf, skal:pres, skulle:past, skulla:ptcp ^
ville|AUX|will, want to|ville:inf, vil:pres, ville:past, vilja:ptcp ^
måtte|AUX|must, have to|måtte:inf, må:pres, måtte:past, måtta:ptcp ^
burde|AUX|ought to|burde:inf, bør:pres, burde:past, burda:ptcp ^
tore|AUX|dare|tore:inf, tør:pres, torde:past, tort:ptcp ^
// ── prepositions ──
i|ADP|in; for (duration)|i
på|ADP|on; at|på
til|ADP|to; until|til
frå|ADP|from|frå
av|ADP|of; off; by|av
med|ADP|with|med
om|ADP|about; around; in (a period)|om
for|ADP|for; before (spatial)|for
ved|ADP|by, at, near|ved
over|ADP|over, above|over
under|ADP|under, during|under
mot|ADP|against, towards|mot
mellom|ADP|between|mellom
gjennom|ADP|through|gjennom
etter|ADP|after, according to|etter
før|ADP|before|før
utan|ADP|without|utan
hjå|ADP|at (someone's place), with|hjå
blant|ADP|among|blant
rundt|ADP|around|rundt
bak|ADP|behind|bak
framfor|ADP|in front of|framfor
sidan|ADP|since|sidan
innan|ADP|within|innan
utanfor|ADP|outside of|utanfor
langs|ADP|along|langs
// ── conjunctions and subordinators ──
og|CONJ|and|og
eller|CONJ|or|eller
men|CONJ|but|men
for|CONJ|for, because|for
så|CONJ|so (main-clause order)|så
både|CONJ|both|både
anten|CONJ|either|anten
verken|CONJ|neither|verken
at|SCONJ|that|at
fordi|SCONJ|because|fordi
viss|SCONJ|if|viss
dersom|SCONJ|if, in case|dersom
om|SCONJ|whether; if|om
medan|SCONJ|while|medan
når|SCONJ|when, whenever|når
då|SCONJ|when (a single past event)|då
sidan|SCONJ|since|sidan
før|SCONJ|before|før
enn|SCONJ|than|enn
som|SCONJ|as, like|som
// ── adverbs ──
endeleg|ADV|at last, finally|endeleg
endelig|ADV|at last, finally|endelig
før|ADV|before, earlier|før
fjor|ADV|last year (i fjor)|fjor
ikkje|ADV|not|ikkje:neg
aldri|ADV|never|aldri:neg
alltid|ADV|always|alltid
ofte|ADV|often|ofte
sjeldan|ADV|seldom|sjeldan
òg|ADV|also, too|òg
også|ADV|also, too|også
berre|ADV|only, just|berre
kun|ADV|only|kun
jo|ADV|as you know; yes (to a negative)|jo
nok|ADV|probably; enough|nok
vel|ADV|surely; well|vel
kanskje|ADV|perhaps|kanskje
ja|INTJ|yes|ja
nei|INTJ|no|nei
her|ADV|here|her
der|ADV|there|der
hit|ADV|(to) here|hit
dit|ADV|(to) there|dit
heim|ADV|(to) home|heim
heime|ADV|at home|heime
borte|ADV|away; over there|borte
ute|ADV|outside, out|ute
inne|ADV|inside, in|inne
opp|ADV|up|opp
ned|ADV|down|ned
inn|ADV|in (into)|inn
ut|ADV|out|ut
fram|ADV|forward|fram
bort|ADV|away|bort
tilbake|ADV|back|tilbake
saman|ADV|together|saman
no|ADV|now|no
nå|ADV|now|nå
då|ADV|then; well|då
så|ADV|then; so, such|så
igjen|ADV|again; left|igjen
enno|ADV|yet, still|enno
endå|ADV|even (before a comparative); still|endå
framleis|ADV|still|framleis
allereie|ADV|already|allereie
snart|ADV|soon|snart
nesten|ADV|almost|nesten
veldig|ADV|very|veldig
ganske|ADV|quite|ganske
heilt|ADV|completely|heilt
svært|ADV|very|svært
først|ADV|first, at first|først
sist|ADV|last|sist
seinare|ADV|later|seinare
plutseleg|ADV|suddenly|plutseleg
tidleg|ADV|early|tidleg
seint|ADV|late|seint
fort|ADV|fast; quickly|fort
sakte|ADV|slowly|sakte
lenge|ADV|for a long time|lenge
godt|ADV|well|godt
pent|ADV|nicely|pent
heller|ADV|rather|heller
difor|ADV|therefore|difor
likevel|ADV|nevertheless|likevel
faktisk|ADV|actually|faktisk
gjerne|ADV|gladly, willingly|gjerne
// ── numerals ──
ein|NUM|one|ein:card m, eit:card n
to|NUM|two|to:card
tre|NUM|three|tre:card
fire|NUM|four|fire:card
fem|NUM|five|fem:card
seks|NUM|six|seks:card
sju|NUM|seven|sju:card
syv|NUM|seven|syv:card
åtte|NUM|eight|åtte:card
ni|NUM|nine|ni:card
ti|NUM|ten|ti:card
tjue|NUM|twenty|tjue:card
tyve|NUM|twenty|tyve:card
hundre|NUM|hundred|hundre:card
tusen|NUM|thousand|tusen:card
første|ADJ|first|første:ord
andre|ADJ|second (ordinal)|andre:ord
tredje|ADJ|third|tredje:ord
fjerde|ADJ|fourth|fjerde:ord
femte|ADJ|fifth|femte:ord
// ── particles and interjections ──
å|PART|to (infinitive marker)|å
takk|INTJ|thanks|takk
hei|INTJ|hello|hei
ævelegt|ADJ|eternal (Landsmål spelling)|ævelegt:pos n sg ind @nn-landsmal
amen|INTJ|amen|amen
`),st=`
// ── people and family ──
mann/m:menn;mennene = man; husband
kvinne/f = woman
barn/n = child
gutt/m = boy
jente/f = girl
baby/m = baby
mor/f:mødre;mødrene = mother
far/m:fedre;fedrene = father
foreldre/pl = parents
bror/m:brødre;brødrene = brother
søster/f:søstre;søstrene = sister
søsken/n:0 = siblings
sønn/m = son
datter/f:døtre;døtrene = daughter
onkel/m:onkler;onklene = uncle
tante/f = aunt
bestemor/f:bestemødre;bestemødrene = grandmother
bestefar/m:bestefedre;bestefedrene = grandfather
besteforeldre/pl = grandparents
fetter/m:+e = male cousin
kusine/f = female cousin
barnebarn/n:0 = grandchild
venn/m = friend
venninne/f = female friend
familie/m = family
slekt/f = relatives; clan
nabo/m = neighbour
kjæreste/m = boyfriend; girlfriend; sweetheart
ektemann/m:ektemenn;ektemennene = husband
kone/f = wife
ektefelle/m = spouse
person/m = person
menneske/n = human being
folk/n:0 = people
lærer/m:+e = teacher
elev/m = pupil
student/m = student
lege/m = doctor
sykepleier/m:+e = nurse
prest/m = priest; minister
pastor/m = pastor
biskop/m = bishop
disippel/m:disipler;disiplene = disciple
apostel/m:apostler;apostlene = apostle
profet/m = prophet
engel/m:engler;englene = angel
konge/m = king
dronning/f = queen
kjenning/m = acquaintance
fremmed/m = stranger
gjest/m = guest
sjef/m = boss
kollega/m = colleague
arbeider/m:+e = worker
bonde/m:bønder;bøndene = farmer
fisker/m:+e = fisherman
sjømann/m:sjømenn;sjømennene = sailor
soldat/m = soldier
politimann/m:politimenn;politimennene = police officer
kunde/m = customer
sjåfør/m = driver
// ── body ──
kropp/m = body
hode/n = head
ansikt/n = face
øye/n:øyne;øynene = eye
øre/n:ører;ørene = ear
nese/f = nose
munn/m = mouth
tann/f:tenner;tennene = tooth
tunge/f = tongue
hår/n:0 = hair
hals/m = neck; throat
skulder/m:skuldre;skuldrene = shoulder
arm/m = arm
hånd/f:hender;hendene = hand
finger/m:fingre;fingrene = finger
bryst/n = chest; breast
rygg/m = back
mage/m = stomach
hjerte/n = heart
ben/n:0 = leg; bone
fot/m:føtter;føttene = foot
kne/n:knær;knærne = knee
tå/f:tær;tærne = toe
hud/f = skin
blod/n:- = blood
sjel/f = soul
ånd/f = spirit
// ── home and household ──
hus/n = house
hjem/n~hjemmet:0 = home
leilighet/f = flat, apartment
rom/n~rommet:0 = room
stue/f = living room
kjøkken/n:0 = kitchen
soverom/n:0 = bedroom
bad/n:0 = bathroom
toalett/n = toilet
gang/m = hallway
trapp/f = stairs
dør/f:dører;dørene = door
vindu/n = window
vegg/m = wall
tak/n:0 = roof; ceiling
gulv/n:0 = floor
hage/m = garden
tomt/f = plot of land
bord/n:0 = table
stol/m = chair
seng/f = bed
sofa/m = sofa
lampe/f = lamp
speil/n:0 = mirror
teppe/n = carpet; blanket
pute/f = pillow
skap/n:0 = cupboard
hylle/f = shelf
nøkkel/m:nøkler;nøklene = key
lys/n:0 = light; candle
ovn/m = oven; stove
kjøleskap/n:0 = refrigerator
tallerken/m:tallerkener;tallerkenene = plate
kopp/m = cup
glass/n:0 = glass
kniv/m = knife
gaffel/m:gafler;gaflene = fork
skje/f = spoon
gryte/f = pot
panne/f = pan; forehead
flaske/f = bottle
pose/m = bag
veske/f = handbag
koffert/m = suitcase
paraply/m = umbrella
klokke/f = clock; bell
telefon/m = telephone
mobil/m = mobile phone
datamaskin/m = computer
tv/m:+er = television
radio/m = radio
avis/f = newspaper
brev/n:0 = letter
bok/f:bøker = book
blad/n:0 = magazine; leaf
papir/n = paper
penn/m = pen
blyant/m = pencil
bilde/n = picture; photo
kart/n:0 = map
// ── food and drink ──
mat/m:- = food
måltid/n:0 = meal
frokost/m = breakfast
lunsj/m = lunch
middag/m = dinner
kveldsmat/m = supper
brød/n:0 = bread
smør/n:- = butter
ost/m = cheese
melk/f:- = milk
egg/n:0 = egg
kjøtt/n:- = meat
fisk/m = fish
laks/m = salmon
torsk/m = cod
kylling/m = chicken
pølse/f = sausage
suppe/f = soup
salat/m = salad
potet/m:poteter;potetene = potato
gulrot/f:gulrøtter;gulrøttene = carrot
løk/m = onion
tomat/m = tomato
frukt/f = fruit
eple/n:+r = apple
banan/m = banana
appelsin/m = orange
bær/n:0 = berry
jordbær/n:0 = strawberry
kake/f = cake
kjeks/m = biscuit
sjokolade/m = chocolate
is/m:- = ice; ice cream
sukker/n:- = sugar
salt/n:- = salt
pepper/m:- = pepper
ris/m:- = rice
pasta/m = pasta
pizza/m = pizza
vann/n:0 = water
kaffe/m = coffee
te/m~teen = tea
juice/m = juice
øl/n:0 = beer
vin/m = wine
`,ct=`
// ── town, shops, transport ──
by/m = town; city
land/n = country; land
landsby/m = village
sted/n:0 = place
vei/m = road; way
gate/f = street
plass/m = square; place; seat
torg/n:0 = market square
bro/f = bridge
park/m = park
skog/m = forest
fjell/n:0 = mountain
dal/m = valley
innsjø/m = lake
sjø/m = sea
hav/n:0 = ocean
elv/f = river
fjord/m = fjord
øy/f = island
strand/f:strender;strendene = beach
kyst/m = coast
butikk/m = shop
kafé/m~kafeen|kaféen = café
restaurant/m = restaurant
hotell/n = hotel
bank/m = bank
postkontor/n:0 = post office
apotek/n:0 = pharmacy
sykehus/n:0 = hospital
skole/m = school
barnehage/m = kindergarten
universitet/n = university
bibliotek/n = library
museum/n:museer;museene = museum
teater/n:teatre;teatrene = theatre
kino/m = cinema
fabrikk/m = factory
kontor/n = office
bil/m = car
buss/m = bus
tog/n:0 = train
sykkel/m:sykler;syklene = bicycle
båt/m = boat
skip/n:0 = ship
fly/n:0 = aeroplane
flyplass/m = airport
stasjon/m = station
billett/m = ticket
reise/f = journey
tur/m = trip; walk
ferie/m = holiday
// ── school and work ──
klasse/m = class
time/m = lesson; hour
leksjon/m = lesson
oppgave/f = task; exercise
spørsmål/n:0 = question
svar/n:0 = answer
språk/n:0 = language
ord/n:0 = word
setning/m = sentence
tekst/m = text
side/f = page; side
kapittel/n:kapitler;kapitlene = chapter
historie/m = history; story
eksempel/n:eksempler;eksemplene = example
prøve/f = test
eksamen/m:eksamener;eksamenene = exam
karakter/m = grade; character
arbeid/n:- = work
jobb/m = job
yrke/n = profession
lønn/f = wage
penger/pl = money
pris/m = price; prize
firma/n:0 = company
selskap/n:0 = company; party
møte/n = meeting
avtale/m = agreement; appointment
problem/n:problemer;problemene = problem
løsning/m = solution
forslag/n:0 = suggestion
plan/m = plan
prosjekt/n = project
// ── church and faith ──
kirke/f = church
menighet/f = congregation
gudstjeneste/m = worship service
bønn/f:bønner;bønnene = prayer
bibel/m:bibler;biblene = bible
tro/f:- = faith
håp/n:- = hope
kjærlighet/f:- = love
nåde/f:- = grace
synd/f = sin
tilgivelse/m:- = forgiveness
frelse/m:- = salvation
frelser/m:+e = saviour
evangelium/n:evangelier;evangeliene = gospel
vitnesbyrd/n:0 = testimony
tjeneste/m = service; favour
salme/m = psalm
sang/m = song
dåp/m = baptism
nattverd/m = communion
himmel/m:himler;himlene = heaven; sky
helvete/n = hell
verden/m:verdener;verdenene = world
skapelse/m = creation
liv/n:0 = life
død/m = death
oppstandelse/m = resurrection
kors/n:0 = cross
sannhet/f = truth
fred/m:- = peace
glede/f = joy
sorg/f = sorrow
lys/n:0 = light
mørke/n:- = darkness
ånd/f = spirit
profeti/m = prophecy
kall/n:0 = calling
// ── weather and nature ──
vær/n:0 = weather
sol/f = sun
måne/m = moon
stjerne/f = star
sky/f = cloud
regn/n:- = rain
snø/m:- = snow
vind/m = wind
storm/m = storm
tåke/f = fog
is/m:- = ice
kulde/m:- = cold
varme/m:- = warmth; heat
temperatur/m = temperature
luft/f:- = air
jord/f = earth; soil
tre/n~treet:trær;trærne = tree
blomst/m = flower
gress/n:- = grass
plante/f = plant
stein/m = stone
fjære/f = shore
bølge/m = wave
natur/m:- = nature
dyr/n:0 = animal
fugl/m = bird
hest/m = horse
ku/f:kyr;kyrne = cow
gris/m = pig
sau/m = sheep
geit/f = goat
hund/m = dog
katt/m = cat
mus/f:mus;musene = mouse
fisk/m = fish
bie/f = bee
// ── time ──
tid/f = time
dag/m = day
natt/f:netter;nettene = night
morgen/m:morgener;morgenene = morning
formiddag/m = forenoon
ettermiddag/m = afternoon
kveld/m = evening
uke/f = week
måned/m = month
år/n:0 = year
helg/f = weekend
mandag/m = Monday
tirsdag/m = Tuesday
onsdag/m = Wednesday
torsdag/m = Thursday
fredag/m = Friday
lørdag/m = Saturday
søndag/m = Sunday
vår/m = spring
sommer/m:somrer;somrene = summer
høst/m = autumn
vinter/m:vintrer;vintrene = winter
jul/f:- = Christmas
påske/m:- = Easter
fødselsdag/m = birthday
minutt/n = minute
sekund/n = second
time/m = hour
øyeblikk/n:0 = moment
gang/m = time; occasion
fremtid/f:- = future
fortid/f:- = past
// ── clothes and objects ──
klær/pl = clothes
skjorte/f = shirt
bukse/f = trousers
kjole/m = dress
jakke/f = jacket
frakk/m = coat
genser/m:+e = sweater
sko/m:sko;skoene = shoe
sokk/m = sock
hatt/m = hat
lue/f = cap
hanske/m = glove
belte/n = belt
ring/m = ring
gave/f = gift
ting/m:ting;tingene = thing
sak/f = thing; case
vare/f = goods
norsk/n:- = Norwegian (the language)
engelsk/n:- = English (the language)
hyrde/m = shepherd
// ── abstract and general ──
navn/n:0 = name
adresse/f = address
nummer/n:numre;numrene = number
tall/n:0 = number; figure
del/m = part
bit/m = piece
form/m = shape; form
slags/m:- = kind, sort
måte/m = way, manner
grunn/m = reason; ground
mulighet/f = possibility
forskjell/m = difference
hjelp/m:- = help
råd/n:0 = advice; council
idé/m = idea
tanke/m = thought
følelse/m = feeling
drøm/m~drømmen:drømmer;drømmene = dream
minne/n = memory
mening/f = opinion; meaning
interesse/m = interest
frykt/m:- = fear
styrke/m:- = strength
krig/m = war
lov/f = law; promise
regjering/f = government
samfunn/n:0 = society
kultur/m = culture
nyhet/f = news item
nyheter/pl = news
`,lt=`
// ── health and body care ──
helse/m:- = health
sykdom/m = illness
smerte/m = pain
feber/m:- = fever
forkjølelse/m = cold (illness)
hoste/m = cough
medisin/m = medicine
tablett/m = tablet
lege/m = doctor
tannlege/m = dentist
ambulanse/m = ambulance
ulykke/f = accident
hodepine/f = headache
søvn/m:- = sleep
hvile/f:- = rest
styrketrening/f = strength training
trening/f = training
// ── sport and leisure ──
sport/m = sport
fotball/m = football
ball/m = ball
kamp/m = match; fight
lag/n:0 = team
spill/n:0 = game
lek/m = play
ski/m:0 = ski
skitur/m = ski trip
fjelltur/m = mountain walk
bading/f = swimming
svømming/f = swimming
musikk/m:- = music
konsert/m = concert
film/m = film
hobby/m = hobby
fest/m = party
feiring/f = celebration
tradisjon/m = tradition
bursdag/m = birthday
// ── media and communication ──
nett/n:0 = net; internet
melding/f = message
epost/m = email
samtale/m = conversation
prat/n:- = chat
stemme/f = voice
lyd/m = sound
tegn/n:0 = sign
rapport/m = report
artikkel/m:artikler;artiklene = article
program/n~programmet = programme
// ── shops, money, services ──
krone/f = krone
øre/n:ører;ørene = øre (coin)
regning/f = bill
kvittering/f = receipt
rabatt/m = discount
handel/m = trade
handlekurv/m = shopping basket
varehus/n:0 = department store
marked/n = market
tilbud/n:0 = offer
kunde/m = customer
// ── church life and Scripture ──
vers/n:0 = verse
skrift/f = writing; scripture
lære/f = teaching; doctrine
undervisning/f = teaching
forkynnelse/m = preaching
preken/m:prekener;prekenene = sermon
bønnemøte/n = prayer meeting
gruppe/f = group
fellesskap/n:0 = fellowship
kall/n:0 = calling
omvendelse/m = conversion
tilgivelse/m:- = forgiveness
tjener/m:+e = servant
herre/m = lord
alter/n:altere;alterne = altar
ofring/f = offering
lovsang/m = praise song
takk/m:- = thanks
velsignelse/m = blessing
mirakel/n:mirakler;miraklene = miracle
under/n:0 = wonder
rike/n = kingdom
folk/n:0 = people; nation
frihet/f:- = freedom
rettferdighet/f:- = righteousness
barmhjertighet/f:- = mercy
// ── more places and things ──
hjørne/n = corner
inngang/m = entrance
utgang/m = exit
etasje/m = floor (storey)
kjeller/m:kjellere;kjellerne = cellar
loft/n:0 = attic
garasje/m = garage
mur/m = wall (masonry)
hytte/f = cabin
telt/n:0 = tent
gård/m = farm
åker/m:åkrer;åkrene = field
eng/f = meadow
vei/m = road
fortau/n = pavement
lyskryss/n:0 = traffic light
parkering/f = parking
motorvei/m = motorway
stasjon/m = station
perrong/m = platform
holdeplass/m = stop (bus stop)
rute/f = route; timetable
retning/f = direction
kilometer/m:+e = kilometre
meter/m:+e = metre
liter/m:+e = litre
kilo/n:0 = kilo
gram/n:0 = gram
prosent/m = per cent
// ── food, more ──
grøt/m = porridge
pannekake/f = pancake
vaffel/m:vafler;vaflene = waffle
brunost/m = brown cheese
rømme/f:- = sour cream
syltetøy/n:- = jam
skinke/f = ham
pålegg/n:0 = sandwich filling
smørbrød/n:0 = open sandwich
matpakke/f = packed lunch
bolle/f = bun
kjøttkake/f = meat cake
fiskesuppe/f = fish soup
dessert/m = dessert
snacks/n:- = snacks
godteri/n = sweets
drikke/m = drink
saft/m = squash (drink)
nøtt/f:nøtter;nøttene = nut
bønne/f = bean
erter/pl = peas
agurk/m = cucumber
paprika/m = pepper (vegetable)
sopp/m = mushroom
sitron/m = lemon
pære/f = pear
drue/f = grape
// ── clothes, more ──
kåpe/f = coat
skjerf/n:0 = scarf
støvel/m:støvler;støvlene = boot
drakt/f = suit
dress/m = suit
undertøy/n:- = underwear
// ── abstract, more ──
verdi/m = value
betydning/m = meaning; importance
behov/n:0 = need
valg/n:0 = choice; election
svar/n:0 = answer
bruk/m:- = use
tilfelle/n = case; instance
situasjon/m = situation
resultat/n = result
utvikling/f = development
endring/f = change
forandring/f = change
begynnelse/m = beginning
slutt/m = end
kant/m = edge
bunn/m = bottom
topp/m = top
urettferdighet/f = injustice; unrighteousness
klinikk/m = clinic
sentrum/n~sentrum:0 = centre ^
pasient/m = patient
lekse/f = homework
liste/f = list
fru/f = Mrs; wife
busstopp/n:0 = bus stop
stopp/n:0 = stop
// ── countries and people (common nouns) ──
nordmann/m:nordmenn;nordmennene = Norwegian (person)
nasjon/m = nation
grense/f = border
hovedstad/m:hovedsteder;hovedstedene = capital city
innbygger/m:+e = inhabitant
kurs/n:0 = course
// ── common nouns, last sweep ──
bakke/m = hill; ground
berg/n:0 = mountain; rock
bukt/f = bay
busk/m = bush
drivhus/n:0 = greenhouse
flokk/m = flock
gjerde/n = fence
grein/f = branch
hull/n:0 = hole
kasse/f = box; till
korn/n:0 = grain
kurv/m = basket
lomme/f = pocket
låve/m = barn
maskin/m = machine
merke/n = mark; brand
mynt/n:0 = coin
pakke/f = parcel
plate/f = plate; record
rør/n:0 = pipe
sirkel/m:sirkler;sirklene = circle
sted/n:0 = place
tavle/f = board
trapp/f = staircase
verktøy/n:0 = tool
vogn/f = wagon; carriage
`,ut=`
Norge = Norway
Oslo = Oslo
Bergen = Bergen
Trondheim = Trondheim
Stavanger = Stavanger
Tromsø = Tromsø
Kristiansand = Kristiansand
Drammen = Drammen
Sverige = Sweden
Danmark = Denmark
Finland = Finland
Island = Iceland
Europa = Europe
Amerika = America
USA = the USA
England = England
Tyskland = Germany
Frankrike = France
Spania = Spain
Italia = Italy
Israel = Israel
Jerusalem = Jerusalem
Betlehem = Bethlehem
Nasaret = Nazareth
Egypt = Egypt
Babylon = Babylon
Jordan = Jordan
Galilea = Galilee
Gud = God
Herren = the Lord
Jesus = Jesus
Kristus = Christ
Messias = Messiah
Faderen = the Father
Sønnen = the Son
Paulus = Paul
Peter = Peter
Johannes = John
Jakob = Jacob
Maria = Mary
Josef = Joseph
Moses = Moses
Abraham = Abraham
Isak = Isaac
David = David
Salomo = Solomon
Elia = Elijah
Ola = Ola
Kari = Kari
Per = Per
Anna = Anna
Sam = Sam
Marta = Marta
Dahl = Dahl
Hansen = Hansen
Miller = Miller
Fløyen = Fløyen
Anne = Anne
Lars = Lars
Ingrid = Ingrid
Erik = Erik
Hans = Hans
Nils = Nils
Silje = Silje
Jonas = Jonas
Emma = Emma
Sofie = Sofie
Magnus = Magnus
Mons = Mons
Solveig = Solveig
Olav = Olav
`,dt=`
// ── everyday and society ──
farge/m = colour
president/m = president
transport/m = transport
bakeri/n = bakery
bokhandel/m:bokhandler;bokhandlene = bookshop
bokhylle/f = bookshelf
bursdagsgave/f = birthday present
ferge/f = ferry
flagg/n:0 = flag
fotografi/n = photograph
frisør/m = hairdresser
grunnskole/m = primary school
helligdag/m = public holiday
høytid/f = festival
idrett/m = sport; athletics
jernbane/m = railway
kamera/n:+er = camera
konto/m:+er = account
kunst/m:- = art
kunstner/m:+e = artist
landskap/n:0 = landscape
lykke/f:- = happiness; luck
ordbok/f:ordbøker;ordbøkene = dictionary
ordforråd/n:0 = vocabulary
oversettelse/m = translation
pensjon/m = pension
plakat/m = poster
rolle/f = role
sikkerhet/f:- = safety
skatt/m = treasure; tax
skilt/n:0 = sign
skuespiller/m:+e = actor
stillhet/f:- = silence
studium/n:studier;studiene = study
støv/n:- = dust
sult/m:- = hunger
supermarked/n = supermarket
svømmehall/m = swimming pool
tegning/f = drawing
tidsskrift/n:0 = periodical
tilbakemelding/f = feedback
trafikk/m:- = traffic
tørst/m:- = thirst
uvær/n:0 = bad weather
utdanning/f = education
utsikt/f:- = view
verksted/n:0 = workshop
åpning/f = opening
ære/f:- = honour
gjenstand/m = object
gjeld/f:- = debt
hverdag/m = weekday; everyday life
hyggekveld/m = cosy evening
kjerne/f = core
kompis/m = pal
kjøreskole/m = driving school
leir/m = camp
lommebok/f:lommebøker;lommebøkene = wallet
middagstid/f = dinner time
mobiltelefon/m = mobile phone
nettside/f = web page
opplevelse/m = experience
ordning/f = arrangement
oppskrift/m = recipe
reisebyrå/n = travel agency
rutetabell/m = timetable
skolebuss/m = school bus
slektning/m = relative
spiseskje/f = tablespoon
stemning/f = mood
tilstand/m = condition
tilværelse/m = existence
tusenvis/m:- = thousands ^
vennskap/n:0 = friendship
yrkesskole/m = vocational school
brødskive/f = slice of bread
rorbu/f = fisherman's cabin
besøk/n:0 = visit
unge/m = kid; child
januar/m:- = January
februar/m:- = February
mars/m:- = March
april/m:- = April
mai/m:- = May
juni/m:- = June
juli/m:- = July
august/m:- = August
september/m:- = September
oktober/m:- = October
november/m:- = November
desember/m:- = December
bokmål/n:- = Bokmål (the language)
nynorsk/n:- = Nynorsk (the language)
dialekt/m = dialect
mel/n:- = flour
gjær/m:- = yeast
deig/m = dough
tørrfisk/m:- = stockfish
invitasjon/m = invitation
hilsen/m = greeting
dame/f = lady
tvil/m:- = doubt
nord/n:- = north
sør/n:- = south
vest/m:- = west
øst/m:- = east
taco/m = taco
samaritan/m = Samaritan
strøm/m~strømmen:strømmer;strømmene = current; electricity
eier/m:+e = owner
bunad/m = national costume
mamma/f = mum
pappa/m = dad
peis/m = fireplace
røver/m:+e = robber
bygg/n:0 = building
tunnel/m = tunnel
troll/n:0 = troll
gåte/f = riddle; puzzle
voks/m:- = wax
// ── church life and Scripture ──
forbønn/m = intercession
lam/n:0 = lamb
vingård/m = vineyard
vinranke/f = vine
korsfestelse/m = crucifixion
lidelse/m = suffering
oppdrag/n:0 = assignment; mission
dom/m = judgement
ondskap/m:- = evil
løfte/n = promise
pakt/m = covenant
offer/n~offeret:ofre;ofrene = sacrifice; victim
tempel/n:templer;templene = temple
synagoge/m = synagogue
farisee/m = Pharisee
ungdom/m:- = youth
ungdomsgruppe/f = youth group
søndagsskole/m = Sunday school
prekestol/m = pulpit
kirkegård/m = graveyard
begravelse/m = funeral
bryllup/n:0 = wedding
konfirmasjon/m = confirmation
evangelist/m = evangelist
misjonær/m = missionary
misjon/m:- = mission
nestekjærlighet/f:- = love of neighbour
tålmodighet/f:- = patience
tillit/m:- = trust
trøst/m:- = comfort
visdom/m:- = wisdom
ydmykhet/f:- = humility
godhet/f:- = goodness
hellighet/f:- = holiness
herlighet/f:- = glory
makt/f = power
kraft/f:krefter;kreftene = strength; force
svakhet/f = weakness
vitne/n = witness
åpenbaring/f = revelation
lovprisning/f = praise
tilbedelse/m:- = worship
takksigelse/m = thanksgiving
// ── bridge additions (b1-bridge ladder, 2026-10-08; machine-draft, unchecked) ──
bjørn/m = bear
fredagskveld/m = Friday evening
annonse/m = advertisement
stilling/f = position; job
søknad/m = application
erfaring/f = experience
intervju/n = interview
deltid/m:- = part-time
feil/m = mistake; error
pause/m = break
husleie/m = rent
balkong/m = balcony
baderom/n~baderommet:0 = bathroom
utleier/m:+e = landlord
dusj/m = shower
flekk/m = stain; patch
visning/f = viewing
kontrakt/m = contract
depositum/n:depositum;depositumene = deposit
regel/m:regler;reglene = rule
dugnad/m = voluntary communal work
møbel/n:møbler;møblene = piece of furniture
lapp/m = note; scrap
søppel/n:0 = rubbish
støy/m:- = noise
plast/m:- = plastic
parti/n:0 = party
politiker/m:+e = politician
kommune/m = municipality
ordfører/m:+e = mayor
debatt/m = debate
brudd/n:0 = fracture; break
gips/m = plaster cast
legevakt/f = emergency clinic
hjelm/m = helmet
vakt/f = watch; shift; guard
ansvar/n:0 = responsibility
omsorg/m:- = care
leder/m:+e = leader
lignelse/m = parable
basar/m = bazaar; fair
lodd/n:0 = raffle ticket
premie/m = prize
julaften/m = Christmas Eve
mandel/m = almond
tips/n:0 = tip
løype/f = trail; ski track
spor/n:0 = track; trace
kakao/m:- = cocoa
krim/m = crime fiction
grav/f = grave
hurtigrute/f = coastal express ship
lugar/m:+er = cabin (on a ship)
dekk/n:0 = deck
havn/f = harbour
kaptein/m:+er = captain
midnattssol/f = midnight sun
lufthavn/f = airport
bagasje/m = luggage
klem/m = hug
skål/f = bowl; toast
`,ft=`
// ── people and family ──
mann/m:menn;mennene = man; husband
kvinne/f = woman
barn/n:born;borna = child
gut/m = boy
jente/f = girl
mor/f:mødrer;mødrene = mother ^
far/m:fedrar;fedrane = father ^
foreldre/pl = parents
bror/m:brør;brørne = brother ^
syster/f:systrer;systrene = sister ^
søster/f:søstrer;søstrene = sister ^
son/m:søner;sønene = son ^
dotter/f:døtrer;døtrene = daughter ^
onkel/m:onklar;onklane = uncle ^
tante/f = aunt
bestemor/f:bestemødrer;bestemødrene = grandmother ^
bestefar/m:bestefedrar;bestefedrane = grandfather ^
ven/m:+er = friend
venninne/f = female friend
familie/m = family
nabo/m:+ar = neighbour
kjærast/m = boyfriend; girlfriend
kone/f = wife
menneske/n = human being
folk/n:0 = people
lærar/m:+ar = teacher
elev/m = pupil
student/m = student
lækjar/m:+ar = doctor ^
prest/m = priest; minister
disippel/m:disiplar;disiplane = disciple
profet/m = prophet
engel/m:englar;englane = angel
konge/m = king
gjest/m = guest
sjef/m = boss
kunde/m = customer
bonde/m:bønder;bøndene = farmer
// ── body ──
kropp/m = body
hovud/n = head
andlet/n = face ^
auge/n:0;auga = eye
øyre/n:0;øyra = ear ^
nase/f = nose
munn/m = mouth
tann/f:tenner;tennene = tooth
tunge/f = tongue
hår/n:0 = hair
hals/m = neck; throat
arm/m = arm
hand/f:hender;hendene = hand
finger/m:fingrar;fingrane = finger
rygg/m = back
mage/m = stomach
hjarte/n:0;hjarta = heart
fot/m:føter;føtene = foot ^
kne/n:0;kne|kna = knee ^
sjel/f = soul
// ── home ──
hus/n = house
heim/m = home ^
leilegheit/f = flat, apartment
rom/n = room
stove/f = living room
kjøken/n:0 = kitchen
bad/n = bathroom
dør/f:dører;dørene = door
vindauge/n:0;vindauga = window
vegg/m = wall
tak/n = roof; ceiling
golv/n = floor
hage/m = garden
bord/n = table
stol/m = chair
seng/f = bed
lampe/f = lamp
skap/n = cupboard
nøkkel/m:nøklar;nøklane = key
lys/n = light; candle
glas/n = glass
kopp/m = cup
kniv/m = knife
gaffel/m:gaflar;gaflane = fork
skei/f = spoon
flaske/f = bottle
veske/f = handbag
telefon/m = telephone
datamaskin/m = computer
avis/f = newspaper
brev/n = letter
bok/f:bøker;bøkene = book
bilete/n:0;bileta = picture; photo
kart/n = map
// ── food and drink ──
mat/m:- = food
frukost/m = breakfast
lunsj/m = lunch
middag/m = dinner
brød/n = bread
smør/n:- = butter
ost/m = cheese
mjølk/f:- = milk
egg/n = egg
kjøt/n:- = meat
fisk/m = fish
suppe/f = soup
potet/m:poteter;potetene = potato
eple/n:0;epla = apple
kake/f = cake
sukker/n:- = sugar
salt/n:- = salt
vatn/n:0;vatna = water
kaffi/m:- = coffee
te/m = tea
øl/n = beer
vin/m = wine
// ── town and travel ──
by/m:+ar = town; city
land/n = country; land
stad/m:stader;stadene = place
veg/m:+ar = road; way
gate/f = street
plass/m = square; place
bru/f = bridge
skog/m:+ar = forest
fjell/n = mountain
dal/m:+ar = valley
sjø/m = sea
hav/n = ocean
elv/f = river
fjord/m:+ar = fjord
øy/f = island
butikk/m = shop
bank/m = bank
sjukehus/n = hospital
skule/m:+ar = school
bibliotek/n = library
bil/m:+ar = car
buss/m:+ar = bus
tog/n = train
båt/m:+ar = boat
skip/n = ship
fly/n = aeroplane
stasjon/m:+ar = station
billett/m = ticket
reise/f = journey
tur/m:+ar = trip; walk
ferie/m = holiday
// ── school and work ──
klasse/m = class
time/m:+ar = lesson; hour
oppgåve/f = task; exercise
spørsmål/n = question
svar/n = answer
språk/n = language
ord/n = word
setning/m = sentence
tekst/m = text
side/f = page; side
kapittel/n:kapittel = chapter ^
historie/m = history; story
eksempel/n:0 = example
arbeid/n:- = work
jobb/m:+ar = job
løn/f:- = wage
pengar/pl = money
pris/m = price; prize
møte/n:0;møta = meeting
problem/n:0 = problem
plan/m:+ar = plan
// ── church and faith ──
kyrkje/f = church
kyrkjelyd/m = congregation ^
gudsteneste/m = worship service ^
bøn/f:bøner;bønene = prayer
bibel/m:biblar;biblane = bible
tru/f:- = faith
von/f:- = hope
kjærleik/m:- = love
nåde/f:- = grace
synd/f = sin
tilgjeving/f:- = forgiveness
frelsar/m:+ar = saviour
evangelium/n:evangelium = gospel ^
vitnemål/n = testimony ^
song/m:+ar = song
himmel/m:himlar;himlane = heaven; sky
verd/f:- = world
liv/n = life
død/m:- = death
kross/m:+ar = cross ^
fred/m:- = peace
glede/f:- = joy
sorg/f = sorrow
klokke/f = clock; bell
ball/m = ball
stein/m = stone
jakke/f = jacket
sanning/f = truth
urettferd/f:- = injustice; unrighteousness
dåre/m = fool
synd/f:synder;syndene = sin
sol/f = sun
gard/m:+ar = farm
mynt/n:0 = coin
hyrde/m = shepherd
jord/f:- = earth; soil
bil/m:+ar = car
verd/f:- = world
kjøkken/n:0 = kitchen ^
hytte/f = cabin
bane/m:+ar = pitch; track
jul/f:- = Christmas
besøk/n:0 = visit
unge/m = kid; child
brødskive/f = slice of bread
januar/m:- = January
februar/m:- = February
mars/m:- = March
april/m:- = April
mai/m:- = May
juni/m:- = June
juli/m:- = July
august/m:- = August
september/m:- = September
oktober/m:- = October
november/m:- = November
desember/m:- = December
// ── weather, nature, time ──
vêr/n:0 = weather
sol/f = sun
måne/m = moon
stjerne/f = star
sky/f = cloud
regn/n:- = rain
snø/m:- = snow
vind/m:+ar = wind
tre/n:0;trea = tree
blome/f = flower
dyr/n = animal
fugl/m:+ar = bird
hest/m:+ar = horse
ku/f:kyr;kyrne = cow ^
sau/f:sauer;sauene = sheep ^
hund/m:+ar = dog
katt/m:+ar = cat
tid/f:- = time
dag/m:+ar = day
natt/f:netter;nettene = night
morgon/m:morgonar;morgonane = morning
kveld/m:+ar = evening
veke/f = week
månad/m:+ar = month
år/n = year
sommar/m:sommarar;sommarane = summer
haust/m = autumn
vinter/m:vintrar;vintrane = winter
minutt/n = minute
gong/f:+er = time; occasion
namn/n:0;namna = name
tal/n = number
del/m:+ar = part
form/m:+ar = shape; form
måte/m = way, manner
grunn/m:+ar = reason; ground
hjelp/f:- = help
tanke/m = thought
draum/m:+ar = dream
minne/n:0;minna = memory
ting/m:ting;tinga = thing ^
sak/f = thing; case
`,pt=`
Noreg = Norway
Oslo = Oslo
Bergen = Bergen
Trondheim = Trondheim
Sverige = Sweden
Danmark = Denmark
Gud = God
Herren = the Lord
Jesus = Jesus
Kristus = Christ
Paulus = Paul
Peter = Peter
Johannes = John
Maria = Mary
Ola = Ola
Kari = Kari
Per = Per
Anna = Anna
Hans = Hans
Ingrid = Ingrid
Jakob = Jacob
David = David
Moses = Moses
`,mt=`
// ── strong and irregular (principal parts listed) ──
gjøre/s = do; make | gjør, gjorde, gjort
ha/s = have; possess | har, hadde, hatt
gå/s = go; walk | går, gikk, gått
se/s = see; look | ser, så, sett
si/s = say | sier, sa, sagt
ta/s = take | tar, tok, tatt
gi/s = give | gir, ga/gav, gitt
få/s = get; receive; may | får, fikk, fått
finne/s = find | finner, fant, funnet
vite/s = know (a fact) | vet, visste, visst
la/s = let; allow | lar, lot, latt
holde/s = hold; keep | holder, holdt, holdt
stå/s = stand | står, sto/stod, stått
sitte/s = sit | sitter, satt, sittet
ligge/s = lie; be located | ligger, lå, ligget
legge/s = lay; put | legger, la, lagt
sette/s = set; put; seat | setter, satte, satt
sove/s = sleep | sover, sov, sovet
skrive/s = write | skriver, skrev, skrevet
lese/s = read | leser, leste, lest
spise/s = eat | spiser, spiste, spist
drikke/s = drink | drikker, drakk, drukket
drive/s = drive; run; do | driver, drev, drevet
dra/s = pull; go; travel | drar, dro, dratt
fare/s = travel; go | farer, for, faret
komme/s = come | kommer, kom, kommet
gråte/s = cry | gråter, gråt, grått
hete/s = be called | heter, het, hett
springe/s = run; jump | springer, sprang, sprunget
synge/s = sing | synger, sang, sunget
svømme/s = swim | svømmer, svømte, svømt
gripe/s = grab | griper, grep, grepet
bite/s = bite | biter, bet, bitt
skjære/s = cut | skjærer, skar, skåret
slå/s = hit; beat; turn | slår, slo, slått
treffe/s = meet; hit | treffer, traff, truffet
trekke/s = pull; draw | trekker, trakk, trukket
bryte/s = break | bryter, brøt, brutt
velge/s = choose | velger, valgte, valgt
selge/s = sell | selger, solgte, solgt
fortelle/s = tell | forteller, fortalte, fortalt
stjele/s = steal | stjeler, stjal, stjålet
forstå/s = understand | forstår, forsto/forstod, forstått
begynne/s = begin | begynner, begynte, begynt
hjelpe/s = help | hjelper, hjalp, hjulpet
vinne/s = win | vinner, vant, vunnet
dø/s = die | dør, døde, dødd
skyte/s = shoot | skyter, skjøt, skutt
fly/s = fly | flyr, fløy, fløyet
be/s = ask; pray | ber, ba/bad, bedt
bære/s = carry | bærer, bar, båret
stige/s = rise; climb | stiger, steg, steget
ri/s = ride | rir, red, ridd
binde/s = bind; tie | binder, bandt, bundet
bringe/s = bring | bringer, brakte, brakt
by/s = offer; bid | byr, bød, budt
drepe/s = kill | dreper, drepte, drept
falle/s = fall | faller, falt, falt
fryse/s = freeze; be cold | fryser, frøs, frosset
gjelde/s = apply; concern | gjelder, gjaldt, gjeldt
glemme/s = forget | glemmer, glemte, glemt
henge/s = hang | henger, hang, hengt
krype/s = creep; crawl | kryper, krøp, krøpet
le/s = laugh | ler, lo, ledd
lide/s = suffer | lider, led, lidd
lyge/s = lie (tell a falsehood) | lyger, løy, løyet
nyte/s = enjoy | nyter, nøt, nytt
rekke/s = reach; have time | rekker, rakk, rukket
renne/s = run; flow | renner, rant, rent
skjule/s = hide (something) | skjuler, skjulte, skjult
slippe/s = release; escape | slipper, slapp, sluppet
stikke/s = stab; sting; go off | stikker, stakk, stukket
tvinge/s = force | tvinger, tvang, tvunget
vise/s = show | viser, viste, vist
vokse/s = grow | vokser, vokste, vokst
løpe/s = run | løper, løp, løpt
ligne/s = resemble | ligner, lignet, lignet
sprekke/s = burst | sprekker, sprakk, sprukket
smelle/s = bang; slam | smeller, small, smellet
tigge/s = beg | tigger, tigde, tigget ^
sverge/s = swear | sverger, sverget, sverget ^
verge/s = defend | verger, verget, verget ^
kunngjøre/s = announce | kunngjør, kunngjorde, kunngjort
utføre/s = carry out | utfører, utførte, utført
oppfylle/s = fulfil | oppfyller, oppfylte, oppfylt
gjenta/s = repeat | gjentar, gjentok, gjentatt
overta/s = take over | overtar, overtok, overtatt
foreslå/s = suggest | foreslår, foreslo, foreslått
beholde/s = keep | beholder, beholdt, beholdt
bestå/s = consist; pass | består, bestod, bestått
oppnå/s = achieve | oppnår, oppnådde, oppnådd
tilgi/s = forgive | tilgir, tilga/tilgav, tilgitt
utgi/s = publish | utgir, utga/utgav, utgitt
undervise/s = teach | underviser, underviste, undervist
anbefale/s = recommend | anbefaler, anbefalte, anbefalt
// ── weak, class 4 (-dde) ──
bo/4 = live; reside
tro/4 = believe
nå/4 = reach; catch
snu/4 = turn
sy/4 = sew
bety/4 = mean
gro/4 = grow (of plants)
// ── weak, class 3 (-de) ──
leve/3 = live
bygge/s = build | bygger, bygde/bygget, bygd/bygget
prøve/3 = try
kreve/3 = demand
hente/1 = fetch
rense/1 = clean
rydde/1 = tidy
selge/s = sell | selger, solgte, solgt
// ── weak, class 2 (-te / -t) ──
kjøpe/2 = buy
kjøre/2 = drive
lære/2 = learn; teach
høre/2 = hear
tenke/2 = think
bruke/2 = use
spørre/s = ask | spør, spurte, spurt
svare/2 = answer
reise/2 = travel
besøke/2 = visit
bestille/2 = order; book
like/2 = like
leke/2 = play
lukke/s = close | lukker, lukket, lukket
mene/2 = think; mean
møte/2 = meet
sende/2 = send
snakke/1 = speak; talk
spille/2 = play
steke/2 = fry
koke/2 = boil; cook
stenge/2 = close; shut
trenge/2 = need
dele/2 = share; divide
hilse/2 = greet
vente/1 = wait
jobbe/1 = work
lage/1 = make; cook
arbeide/1 = work
ringe/2 = ring; phone
hoppe/1 = jump
smile/2 = smile
tegne/1 = draw
åpne/1 = open
regne/1 = rain; calculate
handle/1 = shop; act
ordne/1 = arrange
forklare/2 = explain
studere/2 = study
telefonere/2 = telephone
kontrollere/2 = check
reparere/2 = repair
bestemme/2 = decide
fortsette/s = continue | fortsetter, fortsatte, fortsatt
glede/1r = please (glede seg: look forward)
kjede/1r = bore (kjede seg: be bored)
føle/2r = feel (føle seg: feel)
// ── weak, class 1 (-et / -a) ──
bade/1 = bathe
banke/1 = knock
bake/2 = bake
barbere/2 = shave
bevege/1 = move ^
bøye/1 = bend
danse/1 = dance
dusje/1 = shower
elske/1 = love
ete/s = eat | eter, åt, ett ^
fiske/1 = fish
flytte/1 = move (house)
frykte/1 = fear
følge/s = follow | følger, fulgte, fulgt
gifte/1r = marry (gifte seg)
gjemme/2 = hide
handle/1 = trade
helbrede/1 = heal
huske/1 = remember
håpe/1 = hope
kaste/1 = throw
kjenne/s = know (a person); feel | kjenner, kjente, kjent
klatre/1 = climb
klippe/1 = cut
knekke/1 = break
kritisere/2 = criticise
kysse/1 = kiss
legge/s = lay | legger, la, lagt
lytte/1 = listen
male/2 = paint
miste/1 = lose
nevne/1 = mention
nikke/1 = nod
parkere/2 = park
passe/1 = fit; look after
planlegge/s = plan | planlegger, planla, planlagt
praktisere/2 = practise
presentere/2 = present
rope/1 = call out
rote/1 = rummage
savne/1 = miss
si/s = say | sier, sa, sagt
skade/1 = hurt
skape/2 = create
skifte/1 = change
skinne/s = shine | skinner, skinte, skint ^
skrike/s = scream | skriker, skrek, skreket
slutte/1 = stop; finish
smake/2 = taste
snakke/1 = talk
spare/2 = save
sparke/1 = kick
stemme/2 = vote; be correct
stoppe/1 = stop
støtte/1 = support
svare/1 = reply
telle/s = count | teller, talte, talt
tilbringe/s = spend (time) | tilbringer, tilbrakte, tilbrakt
tjene/2 = serve; earn
trene/2 = train; exercise
trives/1d = thrive; be happy | trives, trivdes, trivdes
tørke/1 = dry; wipe
vaske/1 = wash
varme/1 = warm
velsigne/1 = bless
vinke/1 = wave
våkne/1 = wake up
ønske/1 = wish
øve/3 = practise
// ── more weak verbs ──
akseptere/2 = accept
angre/1 = regret
annonsere/2 = announce
avslutte/1 = end
bekrefte/1 = confirm
beskrive/s = describe | beskriver, beskrev, beskrevet
beskytte/1 = protect
betale/2 = pay
bevare/1 = preserve
bidra/s = contribute | bidrar, bidro, bidratt
bli/s = become | blir, ble/blei, blitt
bruke/2 = use
bygge/s = build | bygger, bygde/bygget, bygd/bygget
delta/s = take part | deltar, deltok, deltatt
diskutere/2 = discuss
drømme/2 = dream
elske/1 = love
erfare/2 = learn from experience
erklære/2 = declare
finnes/1d = exist; be found | finnes, fantes, funnes
fjerne/1 = remove
fremstille/2 = present
fungere/2 = function
følge/s = follow | følger, fulgte, fulgt
forbinde/s = connect | forbinder, forbandt, forbundet
forbli/s = remain | forblir, forble, forblitt
forbyde/s = forbid | forbyr, forbød, forbudt
forelske/1r = fall in love
forsvinne/s = disappear | forsvinner, forsvant, forsvunnet
forsøke/2 = try
fortjene/1 = deserve
forvente/1 = expect
godta/s = accept | godtar, godtok, godtatt
gratulere/2 = congratulate
hende/1 = happen
hevde/1 = claim
hilse/2 = greet
hjelpe/s = help | hjelper, hjalp, hjulpet
innebære/s = involve | innebærer, innebar, innebåret
innrømme/2 = admit
invitere/2 = invite
kalle/1 = call
kjempe/1 = fight
kjenne/s = know | kjenner, kjente, kjent
klare/1 = manage
kjøpe/2 = buy
lede/s = lead | leder, ledet, ledet
leie/s = rent | leier, leide, leid
lykkes/1d = succeed | lykkes, lyktes, lyktes
lyse/2 = shine
lyve/s = lie | lyver, løy, løyet
minnes/1d = remember | minnes, mintes, mintes
nekte/1 = refuse
nøle/1 = hesitate
oppdage/1 = discover
oppholde/s = stay | oppholder, oppholdt, oppholdt
oppleve/3 = experience
oppstå/s = arise | oppstår, oppstod, oppstått
pleie/1 = be accustomed to
rette/1 = correct
reagere/2 = react
redde/1 = save; rescue
rope/1 = shout
rulle/1 = roll
samle/1 = gather
samtykke/2 = consent
sikre/1 = secure
skjønne/2 = understand
skrive/s = write | skriver, skrev, skrevet
skylde/1 = owe
slåss/s = fight | slåss, sloss, slåss ^
smøre/s = spread | smører, smurte, smurt
snakke/1 = speak
sørge/1 = grieve; ensure
søke/2 = search; apply
tilbe/s = worship | tilber, tilba, tilbedt
tillate/s = allow | tillater, tillot, tillatt
tilhøre/2 = belong to
takke/1 = thank
tenne/1 = light
tilby/s = offer | tilbyr, tilbød, tilbudt
true/1 = threaten
tåle/2 = bear; stand
undre/1r = wonder
unngå/s = avoid | unngår, unngikk, unngått
utsette/s = postpone | utsetter, utsatte, utsatt
utvikle/1 = develop
vandre/1 = walk; wander
vente/1 = wait
verdsette/s = value | verdsetter, verdsatte, verdsatt
vitne/1 = witness
vurdere/2 = consider
yte/1 = give; perform
ære/1 = honour
åpenbare/1 = reveal
pakke/1 = pack
koste/1 = cost
lete/1 = look for; search
hvile/2 = rest
skje/s = happen | skjer, skjedde, skjedd
frelse/2 = save (spiritually)
takke/1 = thank
snø/1 = snow
regne/1 = rain; calculate
hyle/1 = howl
lengte/1r = long (lengte seg)
smile/2 = smile
kle/4 = dress
låse/2 = lock
stille/2 = put; set; ask (a question)
skru/4 = screw; turn
nei-/1 = (placeholder)
dåre/1 = befool
rense/1 = clean
bekjenne/s = confess | bekjenner, bekjente, bekjent
forlate/s = leave; forsake | forlater, forlot, forlatt
fortape/s = condemn; destroy | fortaper, fortapte, fortapt
lukte/1 = smell
fange/1 = catch
feire/1 = celebrate
lure/1 = wonder; trick
forandre/1 = change
stole/2 = trust (stole på)
// ── deponents (-s verbs that are their own lemmas) ──
synes/1d = think; seem | synes, syntes, synes
kjennes/1d = feel (be felt) | kjennes, kjentes, kjentes
møtes/1d = meet (each other) | møtes, møttes, møttes
treffes/1d = meet (each other) | treffes, traffes, treffes
enes/1d = agree | enes, enedes, enes
høres/1d = sound | høres, hørtes, hørtes
ses/1d = see each other | ses, sås, ses
// ── bridge additions (b1-bridge ladder, 2026-10-08; machine-draft, unchecked) ──
forberede/1 = prepare | forbereder, forberedte, forberedt
sammenligne/1 = compare
løfte/2 = lift
levere/1 = deliver; hand in
sjekke/1 = check
klage/1 = complain
sykle/1 = cycle
måle/2 = measure
strikke/1 = knit
organisere/2 = organise
pynte/1 = decorate
øke/s = increase | øker, økte, økt
overraske/1 = surprise
`,ht=`
// ── strong and irregular ──
ha/s = have; possess | har, hadde, hatt
gjere/s = do; make | gjer, gjorde, gjort
gå/s = go; walk | går, gjekk, gått
sjå/s = see; look | ser, såg, sett
seie/s = say | seier, sa, sagt
ta/s = take | tek/tar, tok, teke/tatt ^
gje/s = give | gjev/gir, gav, gjeve/gitt ^
gi/s = give | gir, gav, gitt
få/s = get; receive; may | får, fekk, fått
finne/s = find | finn, fann, funne
vite/s = know (a fact) | veit, visste, visst
late/s = let; allow | let/lar, lét/lot, late/latt ^
halde/s = hold; keep | held, heldt, halde
stå/s = stand | står, stod, stått
sitje/s = sit | sit, sat, site
liggje/s = lie; be located | ligg, låg, ligge
leggje/s = lay; put | legg, la, lagt/lagd
setje/s = set; put; seat | set, sette, sett ^
sove/s = sleep | søv, sov, sove ^
skrive/s = write | skriv, skreiv, skrive
lese/s = read | les, las, lese
ete/s = eat | et, åt, ete ^
spise/e = eat | spiser, spiste, spist
drikke/s = drink | drikk, drakk, drukke
drive/s = drive; run; do | driv, dreiv, drive
dra/s = pull; go; travel | dreg, drog, dradd/dratt ^
fare/s = travel; go | fer, for, fare
kome/s = come | kjem, kom, kome ^
gråte/s = cry | græt, gret, grete
heite/s = be called | heiter, heitte, heitt
springe/s = run; jump | spring, sprang, sprunge
syngje/s = sing | syng, song, sunge
symje/s = swim | sym, sumde, sumt ^
gripe/s = grab | grip, greip, gripe
bite/s = bite | bit, beit, bite
skjere/s = cut | skjer, skar, skore
slå/s = hit; beat; turn | slår, slo, slått
treffe/s = meet; hit | treff, traff, truffe
trekkje/s = pull; draw | trekk, trakk, trukke
bryte/s = break | bryt, braut, broten ^
velje/s = choose | vel, valde, valt
selje/s = sell | sel, selde, seld/selt ^
fortelje/s = tell | fortel, fortalde, fortalt
stele/s = steal | stel, stal, stole
forstå/s = understand | forstår, forstod, forstått
byrje/e = begin | byrjar, byrja, byrja ^
begynne/s = begin | begynner, begynte, begynt
hjelpe/s = help | hjelper, hjalp, hjelpt ^
vinne/s = win | vinn, vann, vunne
døy/s = die | døyr, døydde, døydd
skyte/s = shoot | skyt, skaut, skote
fly/s = fly | flyg, fløy, floge ^
be/s = ask; pray | bed/ber, bad, bede
bere/s = carry | ber, bar, bore
stige/s = rise; climb | stig, steig, stige
ri/s = ride | rid, reid, ride ^
// ── e-verbs (-er, -te / -de / -dde) ──
bu/e = live; reside | bur, budde, budd
tru/e = believe | trur, trudde, trudd
leve/e = live | lever, levde, levd
kjøpe/e = buy | kjøper, kjøpte, kjøpt
køyre/e = drive | køyrer, køyrde, køyrt ^
lære/e = learn; teach | lærer, lærte, lært
høyre/e = hear | høyrer, høyrde, høyrt
tenkje/e = think | tenkjer, tenkte, tenkt
bruke/e = use | bruker, brukte, brukt
spørje/e = ask | spør, spurde, spurt
svare/e = answer | svarar, svara, svara
reise/e = travel | reiser, reiste, reist
besøkje/e = visit | besøkjer, besøkte, besøkt
bestille/e = order; book | bestiller, bestilte, bestilt
like/e = like | likar, lika, lika
møte/e = meet | møter, møtte, møtt
sende/e = send | sender, sende, sendt
spele/e = play | spelar, spela, spela
trenge/e = need | treng, trengde, trengt
dele/e = share; divide | delar, dela, dela
vente/e = wait | ventar, venta, venta
bygge/e = build | bygger, bygde, bygd
prøve/e = try | prøver, prøvde, prøvd
krevje/e = demand | krev, kravde, kravd ^
meine/e = think; mean | meiner, meinte, meint
nå/e = reach; catch | når, nådde, nådd
// ── a-verbs (-ar, -a) ──
kaste/a = throw
snakke/a = speak; talk
lage/a = make; cook
arbeide/a = work
jobbe/a = work
hente/a = fetch
opne/a = open
rope/a = shout
elske/a = love
ønskje/a = wish
vaske/a = wash
hjelpe/a = help ^
bade/a = bathe
danse/a = dance
fiske/a = fish
flytte/a = move (house)
hugse/a = remember
håpe/a = hope
lukke/a = close
lytte/a = listen
male/a = paint
spare/a = save
stoppe/a = stop
takke/a = thank
telje/e = count | tel, talde, talt ^
tene/a = serve; earn
trene/a = train
våkne/a = wake up
øve/a = practise
vise/e = show | viser, viste, vist
tilgi/s = forgive | tilgir, tilgav, tilgitt
sanne/a = verify; confess ^
reinse/a = cleanse
forlate/s = leave; forsake | forlet, forlet, forlate ^
dåre/a = befool
regne/a = rain; calculate
skje/e = happen | skjer, skjedde, skjedd
slutte/a = stop; finish
frelse/e = save (spiritually) | frelser, frelste, frelst
angre/a = regret
kjenne/s = know (a person); feel | kjenner, kjende, kjent ^
føle/e = feel | føler, følte, følt
// ── deponents (-st verbs that are their own lemmas) ──
synast/1d = think; seem | synest, syntest, synst ^
finnast/1d = exist; be found | finst, fanst, funnest ^
`,gt=`
// ── irregular ──
liten = small | n:lite; f:lita; pl:små/lille; cmp:mindre; sup:minst
stor = big | cmp:større; sup:størst
god = good | n:godt; cmp:bedre; sup:best
bra/i = good; well | cmp:bedre; sup:best
dårlig = bad | cmp:verre; sup:verst
ille/i = bad; badly | cmp:verre; sup:verst
gammel = old | cmp:eldre; sup:eldst
ung = young | cmp:yngre; sup:yngst
lang = long | cmp:lengre; sup:lengst
tung = heavy | cmp:tyngre; sup:tyngst
nær = near | cmp:nærmere; sup:nærmest
fjern = distant
egen = own | n:eget; pl:egne
hel = whole | n:helt; pl:hele
halv = half | n:halvt; pl:halve
mange = many | n:mange; pl:mange; cmp:flere; sup:flest
glad = happy | n:glad
fremmed = foreign; strange | n:fremmed
// ── size, shape, quality ──
ny/v = new
fin = fine; nice
pen = pretty; neat | n:pent
ren = clean; pure | n:rent
lett = easy; light
vanskelig = difficult
enkel = simple
viktig = important
vanlig = common; usual
spesiell = special
vakker = beautiful
søt = sweet; cute
stygg = ugly; nasty
pen = nice
sterk = strong
svak = weak
rask = quick
tidlig = early
høy = tall; high; loud | cmp:høyere; sup:høyest
lav = low | cmp:lavere; sup:lavest
bred = wide; broad
smal = narrow
tykk = thick; fat | n:tykt
tynn = thin
dyp = deep
grunn = shallow
stille = quiet
rolig = calm
trang = tight
åpen = open | n:åpent
lukket = closed
full = full | n:fullt
tom = empty | n:tomt; pl:tomme
varm = warm
kald = cold
kjølig = cool
våt = wet | n:vått
tørr = dry
mørk = dark
lys = light; bright
hard = hard
myk = soft
glatt/i = smooth
skarp = sharp
rik = rich
fattig = poor
dyr = expensive; dear
billig = cheap
gratis/i = free (of charge)
ledig = free; vacant
opptatt = busy; occupied | n:opptatt
klar = clear; ready
riktig = right; correct
feil/i = wrong
sann = true | n:sant
falsk = false
nødvendig = necessary
mulig = possible
umulig = impossible
sikker = sure; safe
farlig = dangerous
trygg = safe | n:trygt
heldig = lucky
ulykkelig = unhappy
lykkelig = happy
// ── people and feelings ──
snill = kind; nice | n:snilt
grei = nice; fine; straightforward | n:greit
hyggelig = pleasant; nice
morsom = funny
vennlig = friendly
sint = angry | n:sint
redd = afraid | n:redd
trøtt = tired | n:trøtt
sliten = tired; worn | n:sliten
sulten = hungry
tørst = thirsty | n:tørst
syk = ill
frisk = healthy; fresh
sterk = strong
modig = brave
dum = stupid | n:dumt
klok = wise
flink = skilful; good (at)
interessant/m = interesting
spennende/m = exciting
kjedelig/m = boring
nysgjerrig = curious
ensom = lonely
sjalu = jealous
stolt = proud
glad = glad
trist = sad
fornøyd = pleased | n:fornøyd
forelsket = in love | n:forelsket
beskjeden = modest
// ── colours ──
rød = red | n:rødt
blå/v = blue
grønn = green
gul = yellow | n:gult
svart = black
hvit = white | n:hvitt
grå/v = grey
brun = brown
rosa/i = pink
oransje/i = orange
lilla/i = purple
// ── nationalities and places ──
norsk = Norwegian
svensk = Swedish
dansk = Danish
engelsk = English
tysk = German
fransk = French
spansk = Spanish
amerikansk = American
europeisk/m = European
nordisk = Nordic
utenlandsk = foreign
lokal/m = local
hel = whole
// ── time, quantity ──
daglig = daily
ukentlig = weekly
årlig = yearly
siste = last
neste = next
forrige = previous
ung = young
gammel = old
ferdig = finished; ready
ekstra/i = extra
ulik = different
lik = equal; like | n:likt
samme = same
forskjellig = different
annerledes/i = different; otherwise
// ── religion, society ──
hellig = holy
evig = eternal
kristen = Christian | n:kristent
rettferdig = righteous; just
barmhjertig = merciful
ond = evil | n:ondt
sann = true
gudfryktig = God-fearing
fri = free | n:fritt
villig = willing
trofast = faithful | n:trofast
lydig = obedient
ydmyk = humble
gjerrig = stingy
offentlig = public
privat/m = private
politisk = political
økonomisk = economic
sosial/m = social
kulturell/m = cultural
moderne/i = modern
tradisjonell/m = traditional
internasjonal/m = international
nasjonal/m = national
enbåren = only-begotten
forsinket = delayed | n:forsinket
takknemlig = grateful
mett = full (of food) | n:mett
vond = painful; bad | n:vondt
høyre/i = right (side)
våt = wet | n:vått
ene/i = one (of two; den ene)
velkommen = welcome | n:velkommen; pl:velkomne
kjære = dear
enig = agreed | n:enig
skyldig = guilty; owing
// ── participles and others used as adjectives ──
kjent = known; well-known | n:kjent
forbudt = forbidden | n:forbudt
stengt = closed | n:stengt
brukt = used | n:brukt
laget = made | n:laget
skrevet = written | n:skrevet
glemt = forgotten | n:glemt
fortapt = lost | n:fortapt
frelst = saved | n:frelst
født = born | n:født
gift = married | n:gift
singel/i = single
død = dead | n:dødt
levende = living
kommende = coming
gjeldende = current
utmerket = excellent | n:utmerket
nydelig = lovely
deilig = delicious; lovely
fantastisk = fantastic
forferdelig = terrible
fryktelig = awful
herlig = wonderful
utrolig = incredible
tydelig = clear; obvious
umiddelbar/m = immediate
rettferdiggjort = justified | n:rettferdiggjort
// ── more everyday adjectives ──
stram = tight
sur = sour; grumpy | n:surt
salt = salty
bitter = bitter
mild = mild
sprø = crispy; crazy
rund = round
firkantet = square | n:firkantet
rett = straight; right | n:rett
skrå/v = slanting
bratt = steep | n:bratt
flat = flat
jevn = even
ujevn = uneven
tett = dense; close | n:tett
spredt = spread | n:spredt
fersk = fresh
gammeldags/i = old-fashioned
praktisk = practical
nyttig = useful
unyttig = useless
tilfreds = satisfied | n:tilfreds
alene/i = alone
// ── bridge additions (b1-bridge ladder, 2026-10-08; machine-draft, unchecked) ──
nervøs = nervous
ærlig = honest
fuktig = damp
forsiktig = careful
uvanlig = unusual
`,_t=`
liten = small | n:lite; f:lita; pl:små/vesle; cmp:mindre; sup:minst
stor = big | cmp:større; sup:størst
god = good | n:godt; cmp:betre; sup:best
bra/i = good; well | cmp:betre; sup:best
dårleg = bad | cmp:verre; sup:verst
gammal = old | pl:gamle; cmp:eldre; sup:eldst
ung = young | cmp:yngre; sup:yngst
lang = long | cmp:lengre; sup:lengst
tung = heavy | cmp:tyngre; sup:tyngst
nær = near | cmp:nærare; sup:nærast ^
eigen = own | n:eige; pl:eigne ^
heil = whole | n:heilt; pl:heile
halv = half | n:halvt; pl:halve
glad = happy | n:glad
ny/v = new
fin = fine; nice
pen = pretty; neat | n:pent
ren = clean; pure | n:rent
lett = easy; light
vanskeleg = difficult
enkel = simple
viktig = important
vanleg = common; usual
spesiell = special
vakker = beautiful
søt = sweet; cute
stygg = ugly; nasty
sterk = strong
svak = weak
rask = quick
tidleg = early
høg = tall; high; loud | n:høgt; cmp:høgare; sup:høgast ^
låg = low | n:lågt; cmp:lågare; sup:lågast ^
brei = wide; broad | n:breitt
smal = narrow
tjukk = thick; fat | n:tjukt
tynn = thin
djup = deep
open = open | n:ope; pl:opne ^
full = full | n:fullt
tom = empty | n:tomt
varm = warm
kald = cold
våt = wet
tørr = dry
mørk = dark
lys = light; bright
hard = hard
mjuk = soft
rik = rich
fattig = poor
dyr = expensive; dear
billig = cheap
ledig = free; vacant
klar = clear; ready
rett = right; correct; straight
sann = true | n:sant
farleg = dangerous
trygg = safe | n:trygt
snill = kind; nice | n:snilt
hyggeleg = pleasant; nice
sint = angry | n:sint
redd = afraid | n:redd
trøytt = tired | n:trøytt
sliten = tired; worn | n:sliten
svolten = hungry ^
sjuk = ill
frisk = healthy; fresh
modig = brave
dum = stupid | n:dumt
klok = wise
trist = sad
ensam = lonely
stolt = proud
interessant/m = interesting
spennande/m = exciting
raud = red | n:raudt
blå/v = blue
grøn = green | n:grønt
gul = yellow | n:gult
svart = black
kvit = white | n:kvitt
grå/v = grey
brun = brown
norsk = Norwegian
svensk = Swedish
dansk = Danish
engelsk = English
tysk = German
fransk = French
siste = last
neste = next
førre = previous
ferdig = finished; ready
heilag = holy | pl:heilage ^
evig = eternal
kristen = Christian | n:kristent
rettferdig = righteous; just
ond = evil | n:ondt
fri = free | n:fritt
kjend = known; well-known | n:kjent ^
fødd = born | n:fødd
gift = married | n:gift
død = dead | n:dødt
trufast = faithful | n:trufast
fortapt = lost | n:fortapt
einboren = only-begotten
levande = living
`;function vt(e){return(e.toLowerCase().match(/[aeiouyæøå]+/g)??[]).length}var q=e=>/e$/.test(e);function yt(e,t,n){return n===`nb`?t===`n`&&vt(e)===1?[e]:[q(e)?`${e}r`:`${e}er`]:t===`m`?[q(e)?`${e.slice(0,-1)}ar`:`${e}ar`]:t===`f`?[q(e)?`${e}r`:`${e}er`]:[e]}function bt(e,t){return q(e)&&/^[ae]/.test(t)?e.slice(0,-1)+t:e+t}function xt(e,t,n,r){if(n===`nb`){if(/er$/.test(r)&&e===`${r}e`)return[`${r}ne`];if(/er$/.test(e)&&e!==r)return[`${e.slice(0,-1)}ne`];if(q(e))return[`${e}ne`];let n=[`${e}ene`];return t===`n`&&e===r&&n.push(q(e)?`${e.slice(0,-1)}a`:`${e}a`),n}return/ar$/.test(e)?[`${e.slice(0,-2)}ane`]:/er$/.test(e)&&e!==r?[`${e.slice(0,-1)}ne`]:t===`n`&&e===r?[q(e)?`${e.slice(0,-1)}a`:`${e}a`]:[q(e)?`${e}ne`:`${e}ene`]}function St(e,t,n){let r=q(e);if(t===`m`)return[{form:r?`${e}n`:`${e}en`,gender:`Masc`}];if(t===`n`)return[{form:r?`${e}t`:`${e}et`,gender:`Neut`}];let i={form:r?`${e.slice(0,-1)}a`:`${e}a`,gender:`Fem`};return n===`nb`?[i,{form:r?`${e}n`:`${e}en`,gender:`Masc`}]:[i]}function Ct(e,t,n,r){return e===`-`?{plural:[],mass:!0}:e===`0`?{plural:[t],mass:!1}:e===``?{plural:yt(t,n,r),mass:!1}:{plural:e.split(`|`).map(e=>e.startsWith(`+`)?bt(t,e.slice(1)):e),mass:!1}}function wt(e,t){let n=[];for(let r of e.split(`
`)){let e=r.trim();if(!e||e.startsWith(`//`))continue;let i=e.indexOf(`=`);if(i<0)throw Error(`noun row without "=": ${e}`);let a=e.slice(0,i).trim(),o=e.slice(i+1).trim(),s=[],c=!1;for(;;){let e=/\s(\^|#[a-z-]+)$/.exec(o);if(!e)break;e[1]===`^`?c=!0:s.push(e[1].slice(1)),o=o.slice(0,e.index).trim()}let l=/^([^/:;~]+)\/(m|f|n|pl)(?:~([^:;]+))?(?::([^;]*))?(?:;(.+))?$/.exec(a);if(!l)throw Error(`bad noun row head: ${a}`);let[,u,d,f,p=``,m]=l;if(d===`pl`){let e=m?m.split(`|`):[q(u)?`${u}ne`:/er$/.test(u)?`${u.slice(0,-1)}ne`:`${u}ene`];n.push({lemma:u,gender:`m`,alsoMasc:!1,gloss:o,massNoun:!1,pluralOnly:!0,plural:[u],defSg:[],defPl:e,source:`machine-draft`,unverified:c||void 0,register:s.length?s:void 0});continue}let h=d,{plural:g,mass:_}=Ct(p,u,h,t),v=_?[]:m?m.split(`|`):[...new Set(g.flatMap(e=>xt(e,h,t,u)))];n.push({lemma:u,gender:h,alsoMasc:t===`nb`&&h===`f`,gloss:o,massNoun:_,plural:g,defSg:f?f.split(`|`).map(e=>({form:e,gender:/a$/.test(e)&&h===`f`?`Fem`:h===`m`?`Masc`:h===`n`?`Neut`:`Fem`})):St(u,h,t),defPl:v,source:`machine-draft`,unverified:c||void 0,register:s.length?s:void 0})}return n}function Tt(e){let t=[];for(let n of e.split(`
`)){let e=n.trim();if(!e||e.startsWith(`//`))continue;let[r,i]=e.split(`=`).map(e=>e.trim());t.push({lemma:r,gender:`m`,alsoMasc:!1,gloss:i,massNoun:!0,plural:[],defSg:[],defPl:[],proper:!0,source:`machine-draft`})}return t}var Et=e=>/e$/.test(e);function Dt(e){if(vt(e)<2)return;let t=/^(.*[^aeiouyæøå])(el|en|er|al)$/.exec(e);if(t)return`${t[1].replace(/([^aeiouyæøå])\1$/,`$1`)}${t[2][1]}e`}function Ot(e,t){let n=[];for(let r of e.split(`
`)){let e=r.trim();if(!e||e.startsWith(`//`))continue;let i=e.indexOf(`=`);if(i<0)throw Error(`adjective row without "=": ${e}`);let a=e.slice(0,i).trim(),o=e.slice(i+1).trim(),s=[],c=!1;for(;;){let e=/\s(\^|#[a-z-]+)$/.exec(o);if(!e)break;e[1]===`^`?c=!0:s.push(e[1].slice(1)),o=o.slice(0,e.index).trim()}let l=o.indexOf(`|`),u=(l<0?o:o.slice(0,l)).trim(),d={};if(l>=0)for(let e of o.slice(l+1).split(`;`)){let t=e.indexOf(`:`);t>0&&(d[e.slice(0,t).trim()]=e.slice(t+1).split(`/`).map(e=>e.trim()).filter(Boolean))}let[f,p=``]=a.split(`/`).map(e=>e.trim()),m=p.includes(`i`),h=p.includes(`m`),g;g=d.pl?d.pl:m||Et(f)?[f]:[(p.includes(`s`)?void 0:Dt(f))??`${f}e`];let _;_=d.n?d.n:m||/(ig|sk|t|ende)$/.test(f)||Et(f)&&!p.includes(`v`)?[f]:/nn$/.test(f)?[`${f.slice(0,-2)}nt`]:p.includes(`v`)?[`${f}tt`]:[`${f}t`];let v=(g[0]??f).replace(/e$/,``),y=!m&&!h,b=t===`nb`?`ere`:`are`,x=t===`nb`?/(ig|lig|leg|som)$/.test(f)?`st`:`est`:`ast`,S=d.cmp??(y?[`${v}${b}`]:[]),C=d.sup??(y?[`${v}${x}`]:[]),w=C.map(e=>Et(e)?e:`${e}e`);n.push({lemma:f,gloss:u,neuter:_,plural:g,feminine:d.f,comparative:S,superlative:C,superlativeDef:w,periphrastic:h,invariable:m,source:`machine-draft`,unverified:c||void 0,register:s.length?s:void 0})}return n}var kt=e=>/e$/.test(e),At=/[aeiouyæøå]/;function jt(e,t){return!kt(e)||/[^aeiouyæøåhlnr][lnr]$/.test(t)&&!/(.)\1$/.test(t)&&!/[gk]n$/.test(t)?[e]:/mm$/.test(t)?[t.slice(0,-1)]:[t]}function Mt(e){return e.split(`/`).map(e=>e.trim()).filter(Boolean)}function Nt(e){return kt(e)?e.slice(0,-1):e}function Pt(e,t){let n=[];for(let r of e.split(`
`)){let e=r.trim();if(!e||e.startsWith(`//`))continue;let i=e.indexOf(`=`);if(i<0)throw Error(`verb row without "=": ${e}`);let a=e.slice(0,i).trim(),o=e.slice(i+1).trim(),s=[],c=!1;for(;;){let e=/\s(\^|#[a-z-]+)$/.exec(o);if(!e)break;e[1]===`^`?c=!0:s.push(e[1].slice(1)),o=o.slice(0,e.index).trim()}let l=o.indexOf(`|`),u=(l<0?o:o.slice(0,l)).trim(),d=l<0?[]:o.slice(l+1).split(`,`).map(e=>e.trim()),f=/^([^/]+)\/([1234saex])([rdx]*)$/.exec(a);if(!f)throw Error(`bad verb row head: ${a}`);let[,p,m,h]=f,g=Nt(p),_=!kt(p)&&At.test(p[p.length-1]),v=_?p:g,y,b,x,[S,C,w]=d.length===3?d:d.length===2?[void 0,d[0],d[1]]:[void 0,void 0,void 0];if(t===`nb`){if(y=S?Mt(S):[_?`${p}r`:`${g}er`],C)b=Mt(C),x=Mt(w);else if(m===`1`)b=[`${g}et`,`${g}a`],x=[`${g}et`,`${g}a`];else if(m===`2`){let e=g.replace(/(.)\1$/,`$1`);b=[`${e}te`],x=[`${e}t`]}else if(m===`3`)b=[`${g}de`],x=[`${g}d`];else if(m===`4`)b=[`${v}dde`],x=[`${v}dd`];else throw Error(`strong verb "${p}" needs parts`)}else if(y=S?Mt(S):m===`a`?[`${g}ar`]:m===`e`?[_?`${p}r`:`${g}er`]:[g],C)b=Mt(C),x=Mt(w);else if(m===`a`)b=[`${g}a`],x=[`${g}a`];else throw Error(`Nynorsk verb "${p}" needs parts`);let T=t===`nn`&&kt(p)?Ft(p):[p],ee=h.includes(`d`)||_?[]:t===`nb`?[`${kt(p)?g:p}${kt(p)?`es`:`s`}`]:[`${g}ast`],te=h.includes(`d`);n.push({lemma:p,infinitives:T,cls:m,gloss:u,present:te&&!S?[p]:y,past:b,supine:x,participleAdj:[],imperative:te?[]:jt(p,g),passive:ee,deponent:te||void 0,reflexive:h.includes(`r`)||void 0,aux:h.includes(`x`)||void 0,source:`machine-draft`,unverified:c||void 0,register:s.length?s:void 0})}return n}function Ft(e){let t=[e,`${e.slice(0,-1)}a`],n=e.replace(/kkje$/,`kke`).replace(/ggje$/,`gge`).replace(/tje$/,`tte`).replace(/kje$/,`ke`).replace(/gje$/,`ge`);return n!==e&&t.push(n,`${n.slice(0,-1)}a`),t}var It=0,Lt=1e5,Rt=2e5,zt=3e5,Bt=e=>e.normalize(`NFC`).toLocaleLowerCase(`nb`);function Vt(e,t,n){let r=new Map;for(let i of e){let e=t(i),a=r.get(e);if(a){n?.(a,i);continue}r.set(e,i)}return[...r.values()]}var Ht={bro:{indef:[`bru`],defSg:[`brua`,`bruen`],pl:[`bruer`],defPl:[`bruene`]}},Ut={m:`Masc`,f:`Fem`,n:`Neut`};function Wt(e){let t=e===`nb`?`Bokmål`:`Nynorsk`,n=e===`nb`?[...at]:[...ot],r=Vt(e===`nb`?[st,ct,lt,dt].flatMap(e=>wt(e,`nb`)):wt(ft,`nn`),e=>`${e.lemma}|${e.gender}`,(e,t)=>{e.gloss.includes(t.gloss)||(e.gloss+=`; ${t.gloss}`)}),i=Tt(e===`nb`?ut:pt),a=Vt(Pt(e===`nb`?mt:ht,e),e=>e.lemma),o=Vt(Ot(e===`nb`?gt:_t,e),e=>e.lemma),s=new Map,c=new Set,l=(e,t)=>{let n=Bt(e),r=`${n}|${t.lemma}|${t.pos}|${JSON.stringify(t.morph)}`;if(c.has(r))return;c.add(r);let i=s.get(n)??[];i.push(t),s.set(n,i)},u=new Map,d=(e,t,n,r)=>{let i=u.get(e)??[];i.some(e=>e.pos===t&&e.gender===r)||i.push({pos:t,gloss:n,gender:r}),u.set(e,i)},f=new Map,p=(e,t,n)=>{let r=f.get(e)??new Map,i=r.get(t)??new Set;i.add(Bt(n)),r.set(t,i),f.set(e,r)};n.forEach((e,n)=>{l(e.form,{lemma:e.lemma,pos:e.pos,morph:{...e.morph},gloss:e.gloss,rule:`${t} word list: ${e.lemma}`,confidence:.9,role:e.role,register:e.register,varieties:e.varieties,unverified:e.unverified,order:It+(e.rank??n)*4}),d(e.lemma,e.pos,e.gloss),p(e.lemma,e.pos,e.form)}),a.forEach((n,r)=>{let i=Lt+r,a={gloss:n.gloss,register:n.register,varieties:n.varieties,unverified:n.unverified,order:i},o=(e,r,i)=>{l(e,{...a,lemma:n.lemma,pos:`VERB`,morph:r,rule:`${t} verb ${n.lemma}, ${i}`,confidence:.9}),p(n.lemma,`VERB`,e)};for(let e of n.infinitives)o(e,{VerbForm:`Inf`},`infinitive`);if(n.deponent)for(let e of n.present)o(e,{VerbForm:`Fin,Inf`,Tense:`Pres`},`present (deponent)`);else for(let e of n.present)o(e,{VerbForm:`Fin`,Tense:`Pres`,Mood:`Ind`},`present`);for(let e of n.past)o(e,{VerbForm:`Fin`,Tense:`Past`,Mood:`Ind`},`past`);for(let e of n.supine)o(e,{VerbForm:`Part`,Tense:`Past`},`perfect participle`);for(let e of n.imperative)o(e,{VerbForm:`Fin`,Mood:`Imp`},`imperative`);for(let t of n.passive)o(t,{VerbForm:`Fin,Inf`,Tense:`Pres`,Voice:`Pass`},e===`nb`?`passive in -s`:`passive in -st`);d(n.lemma,`VERB`,n.gloss)});let m=[...r,...i],h=e=>r.find(t=>t.lemma===e);if(m.forEach((e,n)=>{let r=Rt+n,i=e.proper?`PROPN`:`NOUN`,a={gloss:e.gloss,register:e.register,varieties:e.varieties,unverified:e.unverified,order:r,gender:e.gender},o=(n,r,o)=>{l(n,{...a,lemma:e.lemma,pos:i,morph:r,rule:`${t} noun ${e.lemma}, ${o}`,confidence:.9}),p(e.lemma,i,n)};if(e.proper){o(e.lemma,{},`name`),d(e.lemma,i,e.gloss);return}let s=Ut[e.gender];if(!e.pluralOnly){o(e.lemma,{Gender:e.alsoMasc?`Fem,Masc`:s,Number:`Sing`,Definite:`Ind`},`indefinite singular`);for(let t of e.defSg){let n=e.alsoMasc&&t.gender===`Masc`?`Fem,Masc`:t.gender;o(t.form,{Gender:n,Number:`Sing`,Definite:`Def`},`definite singular`)}}for(let t of e.plural)o(t,{Number:`Plur`,Definite:`Ind`},`indefinite plural`);for(let t of e.defPl)o(t,{Number:`Plur`,Definite:`Def`},`definite plural`);d(e.lemma,i,e.gloss,e.gender)}),e===`nb`){let e=Ht;for(let[n,r]of Object.entries(e)){let e=h(n);if(!e)continue;let i={gloss:e.gloss,order:3e5+m.indexOf(e),gender:e.gender},a=(e,r,a)=>{l(e,{...i,lemma:n,pos:`NOUN`,morph:r,rule:`${t} noun ${n}, ${a} (the variant spelling)`,confidence:.9}),p(n,`NOUN`,e)};for(let e of r.indef)a(e,{Gender:`Fem,Masc`,Number:`Sing`,Definite:`Ind`},`indefinite singular`);for(let e of r.defSg)a(e,{Gender:e.endsWith(`a`)?`Fem`:`Fem,Masc`,Number:`Sing`,Definite:`Def`},`definite singular`);for(let e of r.pl)a(e,{Number:`Plur`,Definite:`Ind`},`indefinite plural`);for(let e of r.defPl)a(e,{Number:`Plur`,Definite:`Def`},`definite plural`)}}o.forEach((e,n)=>{let r=zt+n,i={gloss:e.gloss,register:e.register,varieties:e.varieties,unverified:e.unverified,order:r},a=(n,r,a)=>{l(n,{...i,lemma:e.lemma,pos:`ADJ`,morph:r,rule:`${t} adjective ${e.lemma}, ${a}`,confidence:.9}),p(e.lemma,`ADJ`,n)};a(e.lemma,{Degree:`Pos`,Gender:`Fem,Masc`,Number:`Sing`,Definite:`Ind`},`common form`);for(let t of e.feminine??[])a(t,{Degree:`Pos`,Gender:`Fem`,Number:`Sing`,Definite:`Ind`},`feminine`);for(let t of e.neuter)a(t,{Degree:`Pos`,Gender:`Neut`,Number:`Sing`,Definite:`Ind`},`neuter singular`);for(let t of e.plural)a(t,{Degree:`Pos`,Number:`Plur,Sing`,Definite:`Def,Ind`},`plural and definite`);for(let t of e.comparative)a(t,{Degree:`Cmp`},`comparative`);for(let t of e.superlative)a(t,{Degree:`Sup`,Definite:`Ind`},`superlative`);for(let t of e.superlativeDef)a(t,{Degree:`Sup`,Definite:`Def`},`definite superlative`);d(e.lemma,`ADJ`,e.gloss)});for(let e of s.values())e.sort((e,t)=>e.order-t.order);let g=new Map(r.map(e=>[e.lemma,e])),_=new Map(a.map(e=>[e.lemma,e])),v=new Map(o.map(e=>[e.lemma,e]));return{std:e,nouns:r,verbs:a,adjectives:o,words:n,lookup:e=>s.get(e)??[],has:e=>s.has(e),entriesOf:e=>u.get(e)??u.get(Bt(e))??[],hasLemma:(e,t)=>(u.get(e)??[]).some(e=>!t||e.pos===t),noun:e=>g.get(e),verb:e=>_.get(e),adjective:e=>v.get(e),formsOf:(e,t)=>{let n=f.get(e);return n?t?[...n.get(t)??[]]:[...n.values()].flatMap(e=>[...e]):[]},stats:{nouns:r.length,verbs:a.length,adjectives:o.length,words:new Set(n.map(e=>`${e.lemma}|${e.pos}`)).size,forms:s.size,names:i.length}}}var Gt,Kt;function qt(e){return e===`nb`?Gt??=Wt(`nb`):Kt??=Wt(`nn`)}var Jt={N:`NOUN`,V:`VERB`,ADJ:`ADJ`,ADV:`ADV`,PRON:`PRON`,DET:`DET`,ADP:`ADP`,CONJ:`CONJ`,SCONJ:`SCONJ`,AUX:`AUX`,NUM:`NUM`,PART:`PART`},Yt=`
// ── pronouns, determiners, wh-words ──
jeg|PRON = eg | I
hun|PRON = ho | she
ham|PRON = honom | him
de|PRON = dei | they
dere|PRON = de | you (plural)
seg|PRON = seg | oneself
man|PRON = ein | one, you (generic)
noen|DET = nokon | some, any
noen|PRON = nokon | someone, anyone
noe|DET = noko | some, any (neuter)
noe|PRON = noko | something
mye|DET = mykje | much, a lot of
mye|ADV = mykje | much, a lot
mer|ADV = meir | more
mer|DET = meir | more
flere|DET = fleire | more (several)
hvem|PRON = kven | who
hva|PRON = kva | what
hvorfor|ADV = kvifor | why
hvordan|ADV = korleis | how
hvor|ADV = kvar, kor | where; how (before an adjective)
hver|DET = kvar | each, every
selv|PRON = sjølv | self
en|DET = ein | a, an (masculine)
hele|DET = heile | the whole
annen|ADJ = annan | other
samme|ADJ = same | same
// ── function words ──
ikke|ADV = ikkje | not
også|ADV = òg, også | also
bare|ADV = berre | only
fra|ADP = frå | from
uten|ADP = utan | without
hos|ADP = hjå | at (someone's place)
mens|SCONJ = medan | while
siden|SCONJ = sidan | since
siden|ADP = sidan | since
hvis|SCONJ = viss, dersom | if
da|SCONJ = då | when (a single past event)
da|ADV = då | then
nå|ADV = no, nå | now
ennå|ADV = enno | yet, still
fremdeles|ADV = framleis | still
sammen|ADV = saman | together
hjem|ADV = heim | (to) home
hjemme|ADV = heime | at home
allerede|ADV = allereie | already
heller|ADV = heller | rather
helt|ADV = heilt | completely
plutselig|ADV = plutseleg | suddenly
sjelden|ADV = sjeldan | seldom
enda|ADV = endå | even; still
fram|ADV = fram | forward
foran|ADP = framfor | in front of
innen|ADP = innan | within
utenfor|ADP = utanfor | outside of
og|CONJ = og | and
tjue|NUM = tjue | twenty
sju|NUM = sju | seven
// ── verbs (the strong-verb table and the common weak verbs) ──
være|AUX = vere, vera | be
ha|AUX = ha, hava | have
bli|AUX = bli, verte | become
gjøre|V = gjere | do; make
komme|V = kome | come
se|V = sjå | see
si|V = seie | say
gi|V = gje, gi | give
høre|V = høyre | hear
spørre|V = spørje | ask
begynne|V = byrje, begynne | begin
tenke|V = tenkje | think
hete|V = heite | be called
spise|V = ete, spise | eat
kjøre|V = køyre | drive
tro|V = tru | believe
bo|V = bu | live; reside
la|V = late | let; allow
holde|V = halde | hold; keep
sitte|V = sitje | sit
ligge|V = liggje | lie; be located
legge|V = leggje | lay; put
sette|V = setje | set; put
synge|V = syngje | sing
svømme|V = symje | swim
skjære|V = skjere | cut
trekke|V = trekkje | pull
velge|V = velje | choose
selge|V = selje | sell
fortelle|V = fortelje | tell
stjele|V = stele | steal
dø|V = døy | die
bære|V = bere | carry
besøke|V = besøkje | visit
åpne|V = opne | open
ønske|V = ønskje | wish
huske|V = hugse | remember
spille|V = spele | play
telle|V = telje | count
kreve|V = krevje | demand
mene|V = meine | think; mean
vite|V = vite | know (a fact)
// ── nouns ──
uke|N = veke | week
måned|N = månad | month
gang|N = gong | time; occasion
barn|N = barn | child
hjerte|N = hjarte | heart
øye|N = auge | eye
øre|N = øyre | ear
hode|N = hovud | head
gutt|N = gut | boy
venn|N = ven | friend
søster|N = syster, søster | sister
kjøkken|N = kjøken | kitchen
melk|N = mjølk | milk
sted|N = stad | place
vei|N = veg | road; way
hjem|N = heim | home
skole|N = skule | school
lærer|N = lærar | teacher
kirke|N = kyrkje | church
kjærlighet|N = kjærleik | love
håp|N = von | hope
bønn|N = bøn | prayer
vindu|N = vindauge | window
bilde|N = bilete | picture
navn|N = namn | name
vann|N = vatn | water
kaffe|N = kaffi | coffee
kjøtt|N = kjøt | meat
frokost|N = frukost | breakfast
oppgave|N = oppgåve | task
sykehus|N = sjukehus | hospital
leilighet|N = leilegheit | flat, apartment
vær|N = vêr | weather
sommer|N = sommar | summer
høst|N = haust | autumn
morgen|N = morgon | morning
penger|N = pengar | money
lønn|N = løn | wage
tilgivelse|N = tilgjeving | forgiveness
frelser|N = frelsar | saviour
sang|N = song | song
verden|N = verd | world
menighet|N = kyrkjelyd | congregation
gudstjeneste|N = gudsteneste | worship service
vitnesbyrd|N = vitnemål | testimony
lege|N = lækjar | doctor
kjæreste|N = kjærast | boyfriend; girlfriend
tall|N = tal | number
drøm|N = draum | dream
hånd|N = hand | hand
oppgave|N = oppgåve | task
// ── adjectives ──
gammel|ADJ = gammal | old
dårlig|ADJ = dårleg | bad
vanskelig|ADJ = vanskeleg | difficult
vanlig|ADJ = vanleg | common; usual
farlig|ADJ = farleg | dangerous
hyggelig|ADJ = hyggeleg | pleasant
tidlig|ADJ = tidleg | early
høy|ADJ = høg | tall; high; loud
lav|ADJ = låg | low
hel|ADJ = heil | whole
egen|ADJ = eigen | own
åpen|ADJ = open | open
rød|ADJ = raud | red
grønn|ADJ = grøn | green
hvit|ADJ = kvit | white
syk|ADJ = sjuk | ill
sulten|ADJ = svolten | hungry
ensom|ADJ = ensam | lonely
spennende|ADJ = spennande | exciting
levende|ADJ = levande | living
kjent|ADJ = kjend | known
født|ADJ = fødd | born
forrige|ADJ = førre | previous
`,Xt=[`søster`,`hånd`,`gang`,`verden`,`menighet`,`vitnesbyrd`,`lege`,`kjæreste`,`hvor`,`også`,`siden`,`foran`];function Zt(){let e=[];for(let t of Yt.split(`
`)){let n=t.trim();if(!n||n.startsWith(`//`))continue;let r=n.indexOf(` = `),i=n.slice(0,r),a=n.slice(r+3),o=a.lastIndexOf(` | `),s=a.slice(0,o),c=a.slice(o+3),[l,u]=i.split(`|`);e.push({nb:l,nbPos:Jt[u],nn:s.split(`,`).map(e=>e.trim()),meaning:c})}return e}var Qt=Zt();function $t(e){return e.normalize(`NFC`).toLocaleLowerCase(`nb`)}function en(e,t,n){let r={lang:e,lemma:t,pos:n};return Xt.includes(t)&&(r.note=`machine-draft, unverified`),r}function tn(e,t,n){let r=$t(t),i=Qt.filter(t=>(e===`nb`?$t(t.nb)===r:t.nn.some(e=>$t(e)===r))&&(!n||t.nbPos===n));if(i.length){let e=i[0],t=[en(`nb`,e.nb,e.nbPos),...e.nn.map(t=>en(`nn`,t,e.nbPos))];return{id:`no-family:${e.nb}:${e.nbPos}`,meaning:e.meaning,members:t}}let a=e===`nb`?`nn`:`nb`,o=qt(e),s=qt(a),c=o.entriesOf(t).filter(e=>!n||e.pos===n);for(let e of c)if(e.pos!==`PROPN`&&s.hasLemma(t,e.pos))return{id:`no-family:${t}:${e.pos}`,meaning:e.gloss,members:[en(`nb`,t,e.pos),en(`nn`,t,e.pos)]}}Qt.length;function nn(){let e=qt(`nb`),t=new Map;for(let n of Qt)for(let r of n.nn){let i=$t(r);i===$t(n.nb)||e.has(i)||t.has(i)||t.set(i,{nb:n.nb,pos:n.nbPos})}return t}var rn=e=>e.normalize(`NFC`),an=e=>rn(e).toLocaleLowerCase(`nb`),J={nb:`Bokmål`,nn:`Nynorsk`},on=`No Norwegian dictionary table has been imported yet (docs/norway/SPEC.md section 10), so every cell here is generated by the adapter's rules and word list and none can be marked verified or supported. All of it is machine-drafted and has not been checked by a native speaker or against Norsk ordbank.`,sn=[`perfect-har`,`modal-bare-infinitive`,`bli-passive`],Y=e=>e?e.split(`,`).filter(Boolean):[],cn=new Set([`PronType`,`Poss`,`Reflex`,`NumType`,`Polarity`]);function ln(e){let t={};for(let[n,r]of Object.entries(e))cn.has(n)||(t[n]=r);return t.Number===`Plur,Sing`&&t.Gender&&(t.Number=`Sing`),t.Definite===`Def`&&!t.Number&&t.Degree===`Pos`&&(t.Number=`Sing`),t}function un(e,t){let n=[],r=e=>{n.some(t=>JSON.stringify(Object.entries(t).sort())===JSON.stringify(Object.entries(e).sort()))||n.push(e)};if(t.Case===`Gen`&&(e===`NOUN`||e===`PROPN`))return[];if(e===`NOUN`){for(let e of Y(t.Definite))for(let n of Y(t.Number))r({Definite:e,Number:n});return n}if(e===`ADJ`){let e=Y(t.Degree);if(e.includes(`Cmp`)&&r({Degree:`Cmp`}),e.includes(`Sup`))for(let e of Y(t.Definite))r({Degree:`Sup`,Definite:e});if(e.includes(`Pos`)||!e.length){let e=Y(t.Number),n=Y(t.Definite);if(t.Gender&&e.includes(`Sing`)&&n.includes(`Ind`)){let e=Y(t.Gender),n=new Set([t.Gender,...e]);e.includes(`Fem`)&&e.includes(`Masc`)&&n.add(`Fem,Masc`);for(let e of n)r({Degree:`Pos`,Definite:`Ind`,Gender:e,Number:`Sing`})}e.includes(`Plur`)&&r({Degree:`Pos`,Number:`Plur`}),e.includes(`Sing`)&&n.includes(`Def`)&&r({Degree:`Pos`,Definite:`Def`,Number:`Sing`})}return n}if(e===`VERB`||e===`AUX`){if(Y(t.Voice).includes(`Pass`))return[{Voice:`Pass`}];let e=Y(t.VerbForm),i=Y(t.Tense),a=Y(t.Mood),o=!a.length||a.includes(`Ind`);return e.includes(`Inf`)&&r({VerbForm:`Inf`}),a.includes(`Imp`)&&r({VerbForm:`Fin`,Mood:`Imp`}),e.includes(`Fin`)&&o&&i.includes(`Pres`)&&r({VerbForm:`Fin`,Mood:`Ind`,Tense:`Pres`}),e.includes(`Fin`)&&o&&i.includes(`Past`)&&r({VerbForm:`Fin`,Mood:`Ind`,Tense:`Past`}),e.includes(`Part`)&&r({VerbForm:`Part`,Tense:`Past`}),n}return e===`PRON`||e===`DET`?[ln(t)]:[]}function dn(){return{columns:{key:`Definite`,values:[[`Ind`,`indefinite (a, an)`],[`Def`,`definite (the, an ending)`]]},rows:{key:`Number`,values:[[`Sing`,`singular`],[`Plur`,`plural`]]}}}var fn={m:`masculine (en)`,f:`feminine (ei)`,n:`neuter (et)`};function pn(e,t){let n=[],r=[],i=e.defSg;if(!e.pluralOnly){n.push({features:{Definite:`Ind`,Number:`Sing`},form:e.lemma});for(let r of i){let a=t===`nb`&&e.gender===`f`?r.gender===`Fem`?`feminine: ${e.lemma===i[0].form?``:`ei `}${e.lemma}, ${r.form}`:`masculine: en ${e.lemma}, ${r.form} (also valid for a feminine noun)`:void 0;n.push({features:{Definite:`Def`,Number:`Sing`},form:r.form,...a?{note:a}:{}})}}for(let t of e.plural)n.push({features:{Definite:`Ind`,Number:`Plur`},form:t,...t===e.lemma&&!e.pluralOnly?{note:`same as the singular (a zero plural)`}:{}});for(let t of e.defPl)n.push({features:{Definite:`Def`,Number:`Plur`},form:t});let a=t===`nb`?Ht[e.lemma]:void 0;if(a){let t=`variant spelling (${e.lemma} and ${a.indef[0]} are one word)`;for(let e of a.indef)n.push({features:{Definite:`Ind`,Number:`Sing`},form:e,note:t});for(let e of a.defSg)n.push({features:{Definite:`Def`,Number:`Sing`},form:e,note:t});for(let e of a.pl)n.push({features:{Definite:`Ind`,Number:`Plur`},form:e,note:t});for(let e of a.defPl)n.push({features:{Definite:`Def`,Number:`Plur`},form:e,note:t})}let o=J[t];return e.pluralOnly?r.push(`Plural only: ${e.lemma} has no singular.`):e.massNoun&&r.push(`Singular only (a mass or abstract noun): the engine generates no plural.`),e.pluralOnly||(t===`nb`&&e.gender===`f`?r.push(`Gender: feminine (ei ${e.lemma}); ${o} also accepts the masculine paradigm (en ${e.lemma}, ${i.find(e=>e.gender===`Masc`)?.form??`the -en form`}), so the definite singular has two cells with the same features: ${i.map(e=>e.form).join(` and `)}.`):r.push(`Gender: ${fn[e.gender]}.`)),e.gender===`n`&&e.plural.includes(e.lemma)&&t===`nb`&&e.defPl.some(e=>/a$/.test(e))&&r.push(`A one-syllable neuter has two definite plurals (husene, husa); both are cells.`),r.push(`The genitive is the form + -s (bilens, husets): a spelling rule, not a cell of the table.`),{cells:n,notes:r,template:e.pluralOnly?`plural-only noun`:e.massNoun?`${fn[e.gender].split(` `)[0]} noun, no plural`:t===`nb`&&e.gender===`f`?`feminine noun (ei / en)`:`${fn[e.gender].split(` `)[0]} noun`}}function mn(e,t,n){let r=e.noun(n)??e.noun(an(n));if(r&&!r.proper){let e=pn(r,t),n=[`${J[t]} (${t}) noun table.`,...e.notes];return r.unverified&&n.push(`The author marks a plural or definite form of this row as unsure (unverified).`),n.push(on),{kind:`noun-declension`,cells:e.cells,layout:dn(),template:`${J[t]} ${e.template}`,notes:n}}if(r||e.hasLemma(n)||e.hasLemma(an(n)))return;let i=an(n),a=v(i,e);if(!a||an(a.headForm)!==an(a.headLemma))return;let o=e.noun(a.headLemma);if(!o||o.proper)return;let s=pn(o,t),c=s.cells.map(e=>({features:e.features,form:a.prefix+e.form,...e.note?{note:e.note.replaceAll(o.lemma,i)}:{}})),l=[`${J[t]} (${t}) noun table.`,`Guessed: ${i} is not in the word list; the engine reads it as a compound (${a.parts.filter(e=>e.kind!==`link`).map(e=>e.text).join(` + `)}${a.fuge.length?`, linking -${a.fuge.join(`-`)}-`:``}) and the head ${o.lemma} decides gender and inflection. Unconfirmed: check the forms against a dictionary.`,...s.notes.map(e=>e.replaceAll(o.lemma,i)),on];return{kind:`noun-declension`,cells:c,layout:dn(),template:`${J[t]} ${s.template} (guessed compound)`,notes:l}}var hn={columns:{key:`Gender`,values:[[`Fem,Masc`,`masculine / feminine (en, ei)`],[`Fem`,`feminine (only where it has its own form)`],[`Masc`,`masculine`],[`Neut`,`neuter (et)`],[``,`every gender`]]},rows:{key:`Definite`,values:[[`Ind`,`indefinite (en stor bil)`],[`Def`,`definite singular (den store bilen)`],[``,`plural, or one form (de store bilene)`]]},sections:[`Degree`],labels:{Degree:{Pos:`positive`,Cmp:`comparative (-ere / -are, or mer + adjective)`,Sup:`superlative (-est / -ast, or mest + adjective)`}}};function gn(e){let t=[],n=[],r=(e,n,r)=>{t.push({features:{Degree:`Pos`,...e},form:n,...r?{note:r}:{}})};r({Definite:`Ind`,Gender:`Fem,Masc`,Number:`Sing`},e.lemma);for(let t of e.feminine??[])r({Definite:`Ind`,Gender:`Fem`,Number:`Sing`},t,`the feminine form (liten, lita): the common form above is the masculine`);for(let t of e.neuter)r({Definite:`Ind`,Gender:`Neut`,Number:`Sing`},t);let i=e.plural.length>1?`the word list gives one list for the definite singular and the plural and does not say which form is which`:void 0;for(let t of e.plural)r({Definite:`Def`,Number:`Sing`},t,i);for(let t of e.plural)r({Number:`Plur`},t,i);for(let n of e.comparative)t.push({features:{Degree:`Cmp`},form:n});for(let n of e.superlative)t.push({features:{Degree:`Sup`,Definite:`Ind`},form:n});for(let n of e.superlativeDef)t.push({features:{Degree:`Sup`,Definite:`Def`},form:n});return e.invariable&&n.push(`Invariable: the same form in every cell, and no comparison.`),e.periphrastic&&n.push(`Compared with mer and mest before the adjective (mer interessant, mest interessant), not with endings: there are no comparative or superlative cells.`),e.feminine&&n.push(`A separate feminine (lita) exists beside the common form (liten).`),e.plural.length>1?n.push(`This adjective has different definite singular and plural forms (${e.plural.join(`, `)}), but the engine keeps them in one list: every form is offered in both cells, and only a dictionary table can say which belongs where.`):n.push(`The definite singular (after den / det) and the plural are the same form; both are cells so that a dictionary table can confirm each.`),{cells:t,notes:n}}function _n(e,t,n){let r=e.adjective(n)??e.adjective(an(n));if(r){let e=gn(r),n=[`${J[t]} (${t}) adjective table.`,...e.notes];return r.unverified&&n.push(`The author marks a form of this row as unsure (unverified).`),n.push(on),{kind:`adjective-declension`,cells:e.cells,layout:hn,template:`${J[t]} ${r.invariable?`invariable adjective`:r.periphrastic?`adjective compared with mer / mest`:`adjective`}`,notes:n}}return On(e,t,n,`ADJ`)}function vn(e){return{columns:{key:`Tense`,values:[[`Pres`,`present`],[`Past`,`past`],[``,`no tense`]]},rows:{key:`VerbForm`,values:[[`Inf`,`infinitive (å ...)`],[`Fin`,`finite forms and the command`],[`Part`,`participle`],[``,`the -s form`]]},sections:[`Voice`],labels:{Voice:{"":`active`,Pass:e===`nb`?`passive in -s (leses, finnes)`:`passive in -st (lesast, finnast)`}}}}function yn(e){let t=[];for(let n of e.infinitives)t.push({features:{VerbForm:`Inf`},form:n});for(let n of e.present)t.push({features:{VerbForm:`Fin`,Mood:`Ind`,Tense:`Pres`},form:n});for(let n of e.past)t.push({features:{VerbForm:`Fin`,Mood:`Ind`,Tense:`Past`},form:n});for(let n of e.supine)t.push({features:{VerbForm:`Part`,Tense:`Past`},form:n});for(let n of e.imperative)t.push({features:{VerbForm:`Fin`,Mood:`Imp`},form:n});for(let n of e.passive)t.push({features:{Voice:`Pass`},form:n});return t}function bn(e,t){return e.deponent?`deponent -s verb`:t===`nb`?{1:`weak verb, class 1 (-et / -a)`,2:`weak verb, class 2 (-te, -t)`,3:`weak verb, class 3 (-de, -d)`,4:`weak verb, class 4 (-dde, -dd)`,s:`strong or irregular verb (the word list gives the parts)`}[e.cls]??`verb`:{a:`a-verb (-ar, -a, -a)`,e:`e-verb (-er, -te, -t)`,1:`weak verb`,s:`strong or irregular verb (the word list gives the parts)`}[e.cls]??`verb`}function xn(e,t){let n=[`${J[t]} (${t}) verb table.`];return e.cls===`s`&&n.push(`Strong or irregular verb: the past and the perfect participle come from the word list (not from a rule), so the vowel change is listed, not predicted.`),e.deponent?n.push(`${e.lemma} is a deponent -s verb: its -s form is the dictionary form, so the table has no separate active infinitive, command or -s passive.`):e.passive.length||n.push(`No -s passive is generated for this verb (a verb ending in a stressed vowel has none in the engine).`),e.reflexive&&n.push(`Reflexive verb: used with seg (${e.lemma} seg); the cells are the forms of ${e.lemma} without the pronoun.`),t===`nb`&&(e.past.length>1||e.supine.length>1)&&n.push(`Two forms are accepted (-et and -a for a class-1 verb): both are cells with the same features.`),t===`nn`&&e.infinitives.length>1&&n.push(`Nynorsk allows an infinitive in -e and in -a (kaste, kasta): both are cells.`),n.push(`The perfect (har + participle), the future and the modal use (vil, skal, kan + infinitive) and the bli-passive (blir + participle) are constructions, not inflected words: they are listed under constructions, not in the table.`),n.push(`Not generated: the present participle (-ende) and the participle used as an adjective (stengt, stengte).`),e.unverified&&n.push(`The author marks at least one form of this row as unsure (unverified).`),n.push(on),{kind:`verb-conjugation`,cells:yn(e),layout:vn(t),template:`${J[t]} ${bn(e,t)}`,notes:n,constructions:[...sn]}}function Sn(e,t,n){let r=e.verb(n)??e.verb(an(n))??e.verbs.find(e=>e.infinitives.includes(an(n)));return r?xn(r,t):Cn(e,t,n)}function Cn(e,t,n){let r=wn(e,n,`AUX`);if(!r.length)return;let i=[],a=e=>e.VerbForm===`Inf`?0:e.Tense===`Pres`&&e.VerbForm===`Fin`?1:e.Tense===`Past`&&e.VerbForm===`Fin`?2:e.VerbForm===`Part`?3:4,o=new Set;for(let e of r)for(let t of un(`AUX`,e.morph)){let n=`${JSON.stringify(Object.entries(t).sort())}|${e.form}`;if(o.has(n))continue;o.add(n);let r=[e.register?.length?e.register.join(`, `):``,e.unverified?`unverified (the author is unsure of this form)`:``].filter(Boolean).join(`; `);i.push({features:t,form:e.form,...r?{note:r}:{}})}i.sort((e,t)=>a(e.features)-a(t.features));let s=[`${J[t]} (${t}) auxiliary table, from the closed-class word list.`,`An auxiliary has no -s passive or imperative cell unless the word list gives the form (være has vær; ha has ha).`,`The perfect (har + participle), the future and the modal use (vil, skal, kan + infinitive) and the bli-passive (blir + participle) are constructions, not inflected words: they are listed under constructions, not in the table.`,on];return{kind:`verb-conjugation`,cells:i,layout:vn(t),template:`${J[t]} auxiliary verb`,notes:s,constructions:[...sn]}}function wn(e,t,n){let r=an(t);return e.words.filter(e=>an(e.lemma)===r&&e.pos===n)}var Tn={columns:{key:`Case`,values:[[`Nom`,`subject (jeg, han)`],[`Acc`,`object (meg, ham)`],[``,`one form`]]},rows:{key:`Gender`,values:[[`Masc`,`masculine`],[`Fem`,`feminine`],[`Neut`,`neuter`],[``,`no gender`]]},sections:[`Person`,`Number`],labels:{Person:{1:`first person`,2:`second person`,3:`third person`},Number:{Sing:`singular`,Plur:`plural`}}},En={columns:{key:`Number`,values:[[`Sing`,`singular`],[`Plur`,`plural`],[``,`no number`]]},rows:{key:`Gender`,values:[[`Fem,Masc`,`masculine / feminine (en, ei)`],[`Fem`,`feminine (ei)`],[`Masc`,`masculine`],[`Neut`,`neuter (et)`],[``,`every gender`]]},sections:[`Person`,`Definite`],labels:{Person:{1:`owner: first person`,2:`owner: second person`,3:`owner: third person`},Definite:{Def:`definite`,Ind:`indefinite`}}},Dn={Prs:`personal pronoun`,Dem:`demonstrative`,Art:`article`,Ind:`indefinite`,Tot:`total (all, every)`,Neg:`negative`,Int:`interrogative`,Rel:`relative`,Rcp:`reciprocal`};function On(e,t,n,r){let i=wn(e,n,r);if(!i.length)return;let a=[],o=new Set;for(let e of i){let t=r===`ADJ`?un(`ADJ`,ln({Degree:`Pos`,...e.morph}))[0]??ln({Degree:`Pos`,...e.morph}):ln(e.morph),n=`${JSON.stringify(Object.entries(t).sort())}|${e.form}`;if(o.has(n))continue;o.add(n);let i=[e.register?.length?e.register.join(`, `):``,e.unverified?`unverified (the author is unsure of this form)`:``].filter(Boolean).join(`; `);a.push({features:t,form:e.form,...i?{note:i}:{}})}if(new Set(a.map(e=>JSON.stringify(Object.entries(e.features).sort()))).size<2)return;let s=i[0].morph,c=s.Poss===`Yes`?`possessive`:Dn[s.PronType]??``,l=[`${J[t]} (${t}) ${r===`PRON`?`pronoun`:r===`DET`?`determiner`:`adjective`} table, from the closed-class word list.`];return s.Poss===`Yes`&&l.push(`A possessive agrees with the thing owned (min bil, mi bok, mitt hus, mine hus), not with the owner; the person in the section title is the owner.`),l.push(`Only the forms the word list holds are cells; a missing cell is a gap in the list, not a claim that the form does not exist.`),l.push(on),{kind:r===`PRON`?`pronoun-paradigm`:r===`DET`?`determiner-paradigm`:`adjective-declension`,cells:a,layout:r===`PRON`?Tn:r===`DET`?En:hn,template:`${J[t]} ${c&&!/pronoun$/.test(c)?`${c} `:``}${c&&/pronoun$/.test(c)?c:r===`PRON`?`pronoun`:r===`DET`?`determiner`:`adjective`}`,notes:l}}function kn(e,t,n){let r=qt(e);switch(n){case`NOUN`:return mn(r,e,t);case`ADJ`:return _n(r,e,t);case`VERB`:return Sn(r,e,t);case`AUX`:return Cn(r,e,t)??Sn(r,e,t);case`PRON`:return On(r,e,t,`PRON`);case`DET`:return On(r,e,t,`DET`);default:return}}var An=qt(`nb`),jn=qt(`nn`),Mn=e=>(e??``).split(`,`).filter(Boolean),X=(e,t,n)=>Mn(e?.morph[t]).includes(n),Z=e=>e?.candidates[0],Q=e=>`"${e}"`,Nn={honom:`ham`,dykk:`dere`,dykkar:`deres`,deira:`deres`,hennar:`hennes`,eit:`et`,ein:`en`,desse:`disse`,nokre:`noen`,inkje:`intet`,heile:`hele`,kvart:`hvert`,kvar:`hver`,frå:`fra`,utan:`uten`,hjå:`hos`,sidan:`siden`,medan:`mens`,no:`nå`,då:`da`,kven:`hvem`,kva:`hva`,kvifor:`hvorfor`,korleis:`hvordan`,ikkje:`ikke`,eg:`jeg`,ho:`hun`,dei:`de`,noko:`noe`,nokon:`noen`,mykje:`mye`,berre:`bare`,heim:`hjem`,heime:`hjemme`,saman:`sammen`,enno:`ennå`,endå:`enda`,framleis:`fremdeles`,allereie:`allerede`,heilt:`helt`,òg:`også`,fleire:`flere`,meir:`mer`,sjølv:`selv`,viss:`hvis`,vere:`være`,vera:`være`,gjere:`gjøre`,kome:`komme`,sjå:`se`,seie:`si`,annan:`annen`,framfor:`foran`,innan:`innen`,utanfor:`utenfor`,plutseleg:`plutselig`,sjeldan:`sjelden`,difor:`derfor`,anten:`enten`,endå_:`enda`};function Pn(){let e=new Map;for(let[t,n]of nn())e.set(t,{replacement:n.nb,sure:t.length<=2?.55:.7});for(let t of ot){if(![`PRON`,`DET`,`ADV`,`ADP`,`CONJ`,`SCONJ`,`AUX`,`INTJ`,`PART`].includes(t.pos))continue;let n=t.form.normalize(`NFC`).toLocaleLowerCase(`nb`);An.has(n)||e.has(n)||e.set(n,{replacement:Nn[n],sure:n.length<=2?.55:.65})}for(let[t,n]of Object.entries(Nn))!An.has(t)&&!e.has(t)&&!t.endsWith(`_`)&&e.set(t,{replacement:n,sure:.6});return e}var Fn;function In(e,t,n){if(!e[n].isWord||!/^\p{Lu}/u.test(e[n].surface))return!1;let r=e.findIndex(e=>e.isWord);return t[n].candidates.some(e=>e.pos===`PROPN`&&!(n===r&&e.unconfirmed))?!0:n!==r}function Ln(e,t){return{start:e.start,end:e.end,replacement:r(e.surface,t)}}function Rn(e,t){Fn??=Pn();let n=[];return e.forEach((r,i)=>{if(!r.isWord||In(e,t,i))return;let a=r.normalized;if(An.has(a))return;let o=Fn.get(a);if(o){n.push({category:`dialect`,tokenIndexes:[i],confidence:o.sure,affectsMeaning:!1,message:o.replacement?`"${r.surface}" is a Nynorsk form. Bokmål writes "${o.replacement}". Nothing is wrong if you mean to write Nynorsk.`:`"${r.surface}" is a Nynorsk form, not Bokmål. Nothing is wrong if you mean to write Nynorsk.`,suggestion:o.replacement?Ln(r,o.replacement):void 0});return}if(r.surface.length>=5&&jn.has(a)&&!t[i].candidates.some(e=>!e.unconfirmed&&e.orthography===void 0&&e.origin===`hand`)){let e=jn.lookup(a)[0].lemma;n.push({category:`dialect`,tokenIndexes:[i],confidence:.5,affectsMeaning:!1,message:`"${r.surface}" looks like a Nynorsk form (${Q(e)}), not Bokmål. Nothing is wrong if you mean to write Nynorsk.`})}}),n}function zn(e,t){let n=[];return e.forEach((i,a)=>{let o=Z(t[a]);if(In(e,t,a)||!o?.orthography||!o.orthography.period.startsWith(`nb-`))return;let s=o.orthography,c=s.period===`nb-pre1907`,l=/^\p{Lu}/u.test(i.surface)&&s.modern===i.normalized,u=c?`Dano-Norwegian (before 1907)`:s.period===`nb-1907`?`the spelling of 1907–1917`:`Riksmål`;n.push({category:`register`,tokenIndexes:[a],confidence:Math.round(Math.min(.85,s.confidence)*100)/100,affectsMeaning:!1,message:l?`A common noun is written with a capital letter here, as in Danish and early Norwegian print. Today's Bokmål writes "${s.modern}". Nothing is wrong if you are imitating older writing.`:`"${i.surface}" is ${u} spelling (Riksmål is still written by some writers today, but it is not the official Bokmål norm). Today's Bokmål writes "${s.modern}".`,suggestion:{start:i.start,end:i.end,replacement:l?s.modern:r(i.surface,s.modern)}})}),n}function Bn(e,t){let n=[];for(let r=0;r+1<e.length;r++){let i=Z(t[r]),a=Z(t[r+1]);if(!e[r].isWord||!e[r+1].isWord||i?.pos!==`DET`||!X(i,`Poss`,`Yes`)||!a||a.pos!==`NOUN`||!X(a,`Definite`,`Def`)||a.unconfirmed||a.morph.Definite!==`Def`)continue;let o=a.lemma,s=An.noun(o);if(!s)continue;let c=X(a,`Number`,`Plur`)?s.plural[0]:s.lemma;c&&n.push({category:`definiteness`,tokenIndexes:[r,r+1],confidence:.8,affectsMeaning:!1,message:`After the possessive the noun is indefinite: ${Q(`${e[r].surface} ${c}`)}. Or put the possessive after the definite noun: ${Q(`${e[r+1].surface} ${e[r].surface}`)}.`,suggestion:Ln(e[r+1],c)})}return n}function Vn(e,t){let n=[],r=e=>e?.pos===`ADJ`&&e.lemma?An.adjective(e.lemma):void 0;for(let i=0;i+2<e.length;i++){if(![i,i+1,i+2].every(t=>e[t].isWord))continue;let a=e[i].normalized,o=Z(t[i+1]),s=Z(t[i+2]),c=r(o);if(!c||!s||s.pos!==`NOUN`||s.unconfirmed||!X(s,`Number`,`Sing`)||X(s,`Definite`,`Def`))continue;let l=s.morph.Gender,u=e[i+1].normalized,d=c.neuter[0];a===`et`&&l===`Neut`&&u===c.lemma&&d&&d!==c.lemma&&!c.invariable?n.push({category:`agreement`,tokenIndexes:[i,i+1,i+2],confidence:.8,affectsMeaning:!1,message:`"${e[i+2].surface}" is a neuter (et) noun, so the adjective takes -t: ${Q(`${e[i].surface} ${d} ${e[i+2].surface}`)}.`,suggestion:Ln(e[i+1],d)}):(a===`en`||a===`ei`)&&(l===`Masc`||l===`Fem`||l===`Fem,Masc`)&&d&&d!==c.lemma&&c.neuter.includes(u)&&!c.plural.includes(u)&&n.push({category:`agreement`,tokenIndexes:[i,i+1,i+2],confidence:.75,affectsMeaning:!1,message:`"${e[i+2].surface}" is not a neuter noun, so the adjective has no -t: ${Q(`${e[i].surface} ${c.lemma} ${e[i+2].surface}`)}.`,suggestion:Ln(e[i+1],c.lemma)})}for(let i=0;i+2<e.length;i++){if(![i,i+1,i+2].every(t=>e[t].isWord))continue;let a=Z(t[i]),o=Z(t[i+1]),s=r(Z(t[i+2]));if(!a||a.pos!==`NOUN`||a.unconfirmed||!X(a,`Definite`,`Def`)||!X(a,`Number`,`Sing`)||!o||o.pos!==`AUX`||o.lemma!==`være`||!s||s.invariable)continue;let c=e[i+2].normalized,l=s.neuter[0];l&&l!==s.lemma&&(a.morph.Gender===`Neut`&&c===s.lemma?n.push({category:`agreement`,tokenIndexes:[i,i+1,i+2],confidence:.7,affectsMeaning:!1,message:`"${e[i].surface}" is a neuter noun, so the adjective after ${Q(e[i+1].surface)} takes -t: ${Q(l)}.`,suggestion:Ln(e[i+2],l)}):(a.morph.Gender===`Masc`||a.morph.Gender===`Fem`)&&c===l&&n.push({category:`agreement`,tokenIndexes:[i,i+1,i+2],confidence:.7,affectsMeaning:!1,message:`"${e[i].surface}" is not a neuter noun, so the adjective after ${Q(e[i+1].surface)} has no -t: ${Q(s.lemma)}.`,suggestion:Ln(e[i+2],s.lemma)}))}return n}var Hn=new Set([`at`,`fordi`,`hvis`,`dersom`,`mens`,`siden`,`ettersom`,`idet`]);function Un(e,t){let n=[];for(let r=0;r+3<e.length;r++){if(![r,r+1,r+2,r+3].every(t=>e[t].isWord)||!Hn.has(e[r].normalized)||Z(t[r])?.pos!==`SCONJ`)continue;let i=Z(t[r+1]),a=Z(t[r+2]);i&&i.pos===`PRON`&&X(i,`Case`,`Nom`)&&i.morph.Case===`Nom`&&(!a||a.pos!==`VERB`&&a.pos!==`AUX`||!X(a,`VerbForm`,`Fin`)||X(a,`VerbForm`,`Inf`)||e[r+3].normalized===`ikke`&&n.push({category:`word-order`,tokenIndexes:[r+2,r+3],confidence:.75,affectsMeaning:!1,message:`In a subordinate clause ikke comes before the verb: ${Q(`${e[r].surface} ${e[r+1].surface} ikke ${e[r+2].surface}`)}.`,suggestion:{start:e[r+2].start,end:e[r+3].end,replacement:`${e[r+3].surface} ${e[r+2].surface}`}}))}return n}function Wn(e,t){let n=[];for(let i=1;i+1<e.length;i++){if(!e[i].isWord||!e[i+1].isWord)continue;let a=e[i].normalized,o=Z(t[i-1]),s=Z(t[i+1]);if(a===`og`){let a=e=>e.pos===`VERB`&&X(e,`VerbForm`,`Inf`)&&!X(e,`VerbForm`,`Fin`)&&!e.unconfirmed,c=!!s&&(o?.pos===`ADJ`?t[i+1].candidates.some(a):a(s)&&t[i+1].candidates.every(e=>e.pos===`VERB`)),l=!!o&&e[i-1].isWord&&(o.pos===`ADJ`&&!X(o,`Degree`,`Cmp`)||o.pos===`VERB`&&X(o,`VerbForm`,`Fin`)&&!X(o,`VerbForm`,`Inf`)||o.pos===`ADP`||o.pos===`NOUN`&&X(o,`Definite`,`Def`));c&&l&&!(o?.pos===`VERB`&&[`gå`,`sitte`,`ligge`,`stå`,`komme`,`drive`].includes(o.lemma??``)&&0)&&n.push({category:`syntax`,tokenIndexes:[i,i+1],confidence:.6,affectsMeaning:!1,message:`Before an infinitive the marker is "å" (to), not "og" (and): ${Q(`å ${e[i+1].surface}`)}. They sound alike, which is why they are mixed up.`,suggestion:{start:e[i].start,end:e[i].end,replacement:r(e[i].surface,`å`)}})}if(a===`å`){let r=!!o&&o.pos===`VERB`&&X(o,`VerbForm`,`Fin`)&&!X(o,`VerbForm`,`Inf`);s&&s.pos===`VERB`&&X(s,`VerbForm`,`Fin`)&&!X(s,`VerbForm`,`Inf`)&&!X(s,`Mood`,`Imp`)&&(r||t[i+1].candidates.every(e=>e.pos===`VERB`&&X(e,`VerbForm`,`Fin`)))&&n.push({category:`syntax`,tokenIndexes:[i,i+1],confidence:.55,affectsMeaning:!1,message:`"å" goes only before an infinitive. To join two verbs that are both conjugated, use "og" (and): ${Q(`og ${e[i+1].surface}`)}.`,suggestion:{start:e[i].start,end:e[i].end,replacement:`og`}})}}return n}function Gn(e,t,n){let r=[...Rn(e,t),...zn(e,t),...Bn(e,t),...Vn(e,t),...Un(e,t),...Wn(e,t)].filter(n=>!n.tokenIndexes.some(n=>In(e,t,n))),i=new Map,a=[];for(let e of r){if(!e.suggestion){a.push(e);continue}let t=`${e.suggestion.start}:${e.suggestion.end}:${e.suggestion.replacement}`,n=i.get(t);(!n||e.confidence>n.confidence)&&i.set(t,e)}return[...i.values(),...a].sort((e,t)=>Math.min(...e.tokenIndexes)-Math.min(...t.tokenIndexes)||t.confidence-e.confidence)}var Kn={bønder:{tone:1,unverified:!0,pair:`bønner`},bønner:{tone:2,unverified:!0,pair:`bønder`},stenger:{tone:1,unverified:!0,pair:`stenger (verb)`}},qn=new Set([...`aeiouyæøå`,`E`,`Ø`,`A`]),Jn=`·`,Yn={a:{ipa:`ɑː`,resp:`aa`,vowel:!0},e:{ipa:`eː`,resp:`ay`,vowel:!0},i:{ipa:`iː`,resp:`ee`,vowel:!0},o:{ipa:`uː`,resp:`oo`,vowel:!0},u:{ipa:`ʉː`,resp:`ew`,vowel:!0},y:{ipa:`yː`,resp:`ü`,vowel:!0},å:{ipa:`oː`,resp:`aw`,vowel:!0},ø:{ipa:`øː`,resp:`ö`,vowel:!0},æ:{ipa:`æː`,resp:`aa`,vowel:!0}},Xn={a:{ipa:`ɑ`,resp:`ah`,vowel:!0},e:{ipa:`ɛ`,resp:`eh`,vowel:!0},i:{ipa:`ɪ`,resp:`i`,vowel:!0},o:{ipa:`ɔ`,resp:`o`,vowel:!0},u:{ipa:`ɵ`,resp:`ew`,vowel:!0},y:{ipa:`ʏ`,resp:`ü`,vowel:!0},å:{ipa:`ɔ`,resp:`o`,vowel:!0},ø:{ipa:`œ`,resp:`ö`,vowel:!0},æ:{ipa:`æ`,resp:`a`,vowel:!0}},Zn={E:{ipa:`æɪ`,resp:`ay`,vowel:!0},Ø:{ipa:`øʏ`,resp:`öy`,vowel:!0},A:{ipa:`æʉ`,resp:`aew`,vowel:!0}},Qn={b:{ipa:`b`,resp:`b`},d:{ipa:`d`,resp:`d`},f:{ipa:`f`,resp:`f`},g:{ipa:`ɡ`,resp:`g`},h:{ipa:`h`,resp:`h`},j:{ipa:`j`,resp:`y`},k:{ipa:`k`,resp:`k`},l:{ipa:`l`,resp:`l`},m:{ipa:`m`,resp:`m`},n:{ipa:`n`,resp:`n`},p:{ipa:`p`,resp:`p`},r:{ipa:`ɾ`,resp:`r`},s:{ipa:`s`,resp:`s`},t:{ipa:`t`,resp:`t`},v:{ipa:`v`,resp:`v`},w:{ipa:`v`,resp:`v`},x:{ipa:`ks`,resp:`ks`},z:{ipa:`s`,resp:`s`},c:{ipa:`k`,resp:`k`},q:{ipa:`k`,resp:`k`},ç:{ipa:`ç`,resp:`ç`},ʃ:{ipa:`ʃ`,resp:`sh`},ʂ:{ipa:`ʂ`,resp:`sh`},ŋ:{ipa:`ŋ`,resp:`ng`},ʈ:{ipa:`ʈ`,resp:`t`},ɳ:{ipa:`ɳ`,resp:`n`},ɭ:{ipa:`ɭ`,resp:`l`}};function $n(e,t){let n=e,r=e=>{t.includes(e)||t.push(e)};return/^hj/.test(n)&&(n=n.replace(/^hj/,`${Jn}j`),r(`h is silent in hj-.`)),/^hv/.test(n)&&(n=n.replace(/^hv/,`${Jn}v`),r(`h is silent in hv-.`)),n=n.replace(/skj/g,`ʃ`).replace(/sj/g,`ʃ`),/ʃ/.test(n)&&r(`sj, skj and sk before i / y / ø are [ʃ] ("sh"); in much speech kj and sj have merged.`),n=n.replace(/sk(?=[iyø])/g,`ʃ`),n=n.replace(/gj/g,`${Jn}j`).replace(/kj/g,`ç`).replace(/tj/g,`ç`),/ç/.test(n)&&r(`kj, tj and k before i / y are [ç], like the ch of German "ich".`),n=n.replace(/k(?=[iyj])/g,`ç`).replace(/g(?=[iyj])/g,`j`),n=n.replace(/rs/g,`ʂ`).replace(/rt/g,`ʈ`).replace(/rn/g,`ɳ`).replace(/rl/g,`ɭ`),/[ʂʈɳɭ]/.test(n)&&r(`In East Norwegian rs, rt, rn and rl are retroflex ([ʂ ʈ ɳ ɭ]); the r is not heard separately.`),n=n.replace(/ng/g,`ŋ`).replace(/nk/g,`ŋk`),n=n.replace(/([nlr])d(?=$|e|et|en|ene|er)/g,`$1${Jn}`),RegExp(`${Jn}`).test(n)&&/[nlr]·/.test(n)&&r(`A d after n, l or r is silent (land, kald, ord).`),n=n.replace(/ig(?=$|e)/g,`i·`),n=n.replace(/ei/g,`E`).replace(/øy/g,`Ø`).replace(/au/g,`A`),n}var er=new Set([`bedre`,`beste`,`berre`,`erter`,`bein`,`berg`,`bear`,`ere`,`beger`,`fortau`]),tr=/^(be|for|er|mis)(?=[^aeiouyæøå]*[aeiouyæøå])/,nr={jeg:{ipa:`ˈjæɪ`,resp:`yai`},meg:{ipa:`ˈmæɪ`,resp:`mai`},deg:{ipa:`ˈdæɪ`,resp:`dai`},seg:{ipa:`ˈsæɪ`,resp:`sai`},og:{ipa:`ˈɔ`,resp:`o`},det:{ipa:`ˈdeː`,resp:`deh`},de:{ipa:`ˈdiː`,resp:`dee`},er:{ipa:`ˈæːr`,resp:`air`},hva:{ipa:`ˈvɑː`,resp:`vaa`},hvem:{ipa:`ˈvɛm`,resp:`vem`},hvor:{ipa:`ˈvuːr`,resp:`voor`},hvordan:{ipa:`ˈvuɖɑn`,resp:`VOOR-dan`},hvorfor:{ipa:`ˈvuːrfɔr`,resp:`VOOR-for`},ikke:{ipa:`ˈɪkə`,resp:`IK-keh`},også:{ipa:`ˈɔsɔ`,resp:`OS-so`},du:{ipa:`ˈdʉː`,resp:`dew`},nå:{ipa:`ˈnoː`,resp:`naw`}};function rr(e){let t=e.normalize(`NFC`).toLocaleLowerCase(`nb`).replace(/[-'’]/g,``);if(!t||!/^[a-zæøåéèêóòô]+$/u.test(t))return;let n=nr[t];if(n)return{ipa:n.ipa,respelling:n.resp,notes:[`listed word: its everyday pronunciation does not follow the letter rules`]};let r=[],i=t.replace(/[éèê]/g,`e`).replace(/[óòô]/g,`o`),a=[...$n(i,r)],o=e=>qn.has(e),s=[];a.forEach((e,t)=>{o(e)&&s.push(t)});let c=tr.exec(i),l=c&&s.length>=2&&i.length-c[1].length>=3&&!er.has(i)?1:0,u=l===1&&c?c[1].length:0,d=[],f=``;a.forEach((e,t)=>{if(t===u&&s.length>=2&&(f+=`ˈ`),t===0&&s.length===1&&(f+=`ˈ`),e===Jn)return;if(o(e)){let n=s.indexOf(t)===l,r;if(`EØA`.includes(e))r=Zn[e];else if(n){let n=0;for(let e=t+1;e<a.length&&!o(a[e]);e++)n++;r=n>=2?Xn[e]:Yn[e]}else r=e===`e`&&/^(n|r|l|t|s|ne|rne|ne|ns|rs)?$/.test(a.slice(t+1).join(``))?{ipa:`ə`,resp:`uh`,vowel:!0}:Xn[e];f+=r.ipa,d.push(r);return}let n=Qn[e];n&&(t>0&&a[t-1]===e||(f+=n.ipa,d.push(n)))});let p=d.map(e=>e.resp).join(``),m=Kn[t]?{tone:Kn[t].tone,unverified:!0}:void 0;return!m&&s.length>=2&&r.push(`Tone (the word accent) is not shown: it must be learned with the word.`),m&&r.push(`Tone ${m.tone} (unverified; minimal pair with ${Kn[t].pair}).`),{ipa:f,respelling:p,notes:r,tone:m}}var ir=new Set(`table-tags.inflection-template.canonical.alternative.colloquial.informal.dialectal.archaic.obsolete.dated.rare.literary.poetic.regional.nonstandard.standard.Bokmål.Nynorsk.Riksmål.Dano-Norwegian.Høgnorsk.Landsmål.form-of.no-gloss.positive.active.finite.singular-only.plural-only.uncountable.countable.clitic.proper-noun.noun-from-verb`.split(`.`)),ar=new Set([`error-unrecognized-form`]),or={masculine:`Masc`,feminine:`Fem`,neuter:`Neut`},sr={singular:`Sing`,plural:`Plur`},cr={definite:`Def`,indefinite:`Ind`},lr={"first-person":`1`,"second-person":`2`,"third-person":`3`},ur={nominative:`Nom`,accusative:`Acc`,objective:`Acc`,oblique:`Acc`},dr=new Set([`comparative`,`superlative`]),fr=new Set([`infinitive`,`present`,`past`,`preterite`,`participle`,`perfect`,`supine`,`imperative`,`passive`,`gerund`,`future`,`subjunctive`,`conditional`]),pr=new Set([`common-gender`,`genitive`,`possessive`,`reflexive`,`indeclinable`,`bare`]),mr=e=>e.normalize(`NFC`).trim().replace(/\s+/g,`-`),hr=e=>e.toLowerCase();function gr(e,t){let n=e.map(mr).filter(Boolean),r=n.map(hr),i=e=>r.includes(e),a=[];for(let e of n){let t=hr(e);ir.has(e)||ir.has(t)||ar.has(t)||t in or||t in sr||t in cr||t in lr||t in ur||dr.has(t)||fr.has(t)||pr.has(t)||a.push(e)}if(r.some(e=>ar.has(e)))return{unknown:a,skipped:`error`};let o=t===`VERB`||t===`AUX`,s=t===`NOUN`||t===`PROPN`,c=t===`ADJ`;if(!o&&!s&&!c&&t!==`PRON`&&t!==`DET`)return{unknown:a,skipped:`not-modelled`};let l=r.filter(e=>fr.has(e)),u=r.map(e=>sr[e]).find(Boolean),d=r.map(e=>cr[e]).find(Boolean),f=[...new Set(r.map(e=>or[e]).filter(Boolean))];if(o)return i(`genitive`)||i(`participle`)&&(u||d||f.length)?{unknown:a,skipped:`not-modelled`}:i(`passive`)?{features:{Voice:`Pass`},unknown:a}:i(`participle`)&&i(`present`)?{features:{VerbForm:`Part`,Tense:`Pres`},unknown:a}:i(`participle`)||i(`supine`)||i(`perfect`)&&!i(`infinitive`)?{features:{VerbForm:`Part`,Tense:`Past`},unknown:a}:i(`imperative`)?{features:{VerbForm:`Fin`,Mood:`Imp`},unknown:a}:i(`infinitive`)?{features:{VerbForm:`Inf`},unknown:a}:i(`present`)?{features:{VerbForm:`Fin`,Mood:`Ind`,Tense:`Pres`},unknown:a}:i(`past`)||i(`preterite`)?{features:{VerbForm:`Fin`,Mood:`Ind`,Tense:`Past`},unknown:a}:u||d?{unknown:a,skipped:`wrong-table`}:{unknown:a,skipped:l.length?`not-modelled`:`not-a-form`};if(s)return i(`genitive`)?{unknown:a,skipped:`not-modelled`}:l.length?{unknown:a,skipped:`wrong-table`}:!u||!d?{unknown:a,skipped:u||d?`not-modelled`:`not-a-form`}:{features:{Definite:d,Number:u},unknown:a};if(c){if(i(`genitive`))return{unknown:a,skipped:`not-modelled`};if(l.length)return{unknown:a,skipped:`wrong-table`};if(i(`comparative`))return{features:{Degree:`Cmp`},unknown:a};if(i(`superlative`))return{features:{Degree:`Sup`,Definite:d===`Def`?`Def`:`Ind`},unknown:a};let e=i(`common-gender`)||f.includes(`Masc`)&&f.includes(`Fem`)?`Fem,Masc`:f.length===1?f[0]:void 0;return u===`Plur`?{features:{Degree:`Pos`,Number:`Plur`},unknown:a}:d===`Def`&&u===`Sing`?{features:{Degree:`Pos`,Definite:`Def`,Number:`Sing`},unknown:a}:e&&(d===`Ind`||d===void 0)&&(u===`Sing`||u===void 0)?{features:{Degree:`Pos`,Definite:`Ind`,Gender:e,Number:`Sing`},unknown:a}:{unknown:a,skipped:d||u||f.length?`not-modelled`:`not-a-form`}}let p={};for(let e of r)lr[e]&&(p.Person=lr[e]),ur[e]&&(p.Case=ur[e]);return u&&(p.Number=u),d&&(p.Definite=d),f.length&&(p.Gender=f.length===2&&f.includes(`Masc`)&&f.includes(`Fem`)?`Fem,Masc`:f[0]),i(`common-gender`)&&(p.Gender=`Fem,Masc`),i(`genitive`)?{unknown:a,skipped:`not-modelled`}:Object.keys(p).length?{features:p,unknown:a}:{unknown:a,skipped:`not-a-form`}}function _r(e,t){return gr(e,t).features}var vr=new Set([`kunne`,`ville`,`skulle`,`måtte`,`burde`,`tore`,`turde`,`torde`,`turva`,`trenge`,`trengje`]),yr=new Set([`ha`,`hava`,`være`,`vere`,`vera`]),br=new Set([`bli`,`verte`,`verta`]),xr=new Set([`være`,`vere`,`vera`,`bli`,`verte`,`verta`]),Sr=new Set([`dag`,`morgen`,`morgon`,`kveld`,`natt`,`uke`,`år`,`gang`,`tid`,`måned`,`helg`,`time`,`stund`,`sommer`,`sommar`,`vinter`,`høst`,`haust`,`påske`,`jul`,`sekund`,`minutt`]),Cr=new Set([`hvem`,`hva`,`hvorfor`,`hvordan`,`hvor`,`når`,`hvilken`,`hvilket`,`hvilke`,`kven`,`kva`,`kvifor`,`korleis`,`kvar`,`kor`,`kva for`,`kvi`]),wr=new Set([`og`,`eller`,`men`,`samt`,`ellers`]),Tr=new Set([`ikke`,`ikkje`,`svært`,`veldig`,`meget`,`så`,`so`,`for`,`ganske`,`mer`,`mest`,`litt`,`helt`,`altfor`,`ytterst`,`også`,`òg`,`aldri`,`ikkje`,`særleg`,`svært`]),Er=new Set([`den`,`det`,`de`,`dei`,`denne`,`dette`,`disse`]),Dr=new Set([`alle`,`noen`,`noe`,`mange`,`begge`,`ingen`,`noko`,`nokon`,`mange`,`få`]),Or=new Set([`der`,`her`,`hjemme`,`heime`,`borte`,`ute`,`inne`,`oppe`,`nede`,`bra`,`ferdig`,`dit`,`dar`]),kr=new Set([`hete`,`heite`,`heita`]),Ar=new Set([`ikke`,`ikkje`]),jr=new Set([`så`,`so`,`slik`,`sånn`,`slikt`]),Mr=new Set([`at`,`fordi`,`når`,`da`,`dersom`,`hvis`,`om`,`mens`,`siden`,`før`,`etter`,`forat`,`sidan`,`då`,`om`,`viss`,`medan`,`fyrr`,`til`,`enn`,`såframt`,`sjølv`,`selv`]),Nr=e=>(e??``).split(`,`).filter(Boolean),$=(e,t,n)=>!!e&&Nr(e.m[t]).includes(n),Pr=e=>!!e&&e.word&&(e.pos===`VERB`||e.pos===`AUX`),Fr=e=>/^[,;:–—]$|^-$/.test(e),Ir=e=>/^[.!?…]+$/.test(e);function Lr(e,t){let n=Nr(e),r=Nr(t);return!n.length||!r.length||n.some(e=>r.includes(e))}function Rr(e){return e.pos===`PRON`?$(e,`Case`,`Nom`)&&!$(e,`Case`,`Acc`)?`nom`:$(e,`Case`,`Acc`)&&!$(e,`Case`,`Nom`)?`acc`:`free`:`none`}function zr(e,t,n,r=0){let i=t.length,o=n[0]?.analyzer??`adapter-${e}`,s=t.map((e,t)=>{let a=n[t]?.candidates?.[0],o={i:t,s:e.surface,n:e.normalized,word:e.isWord,lemma:a?.lemma??e.normalized,m:a?.morph??{},unconf:!1};return e.isWord&&a?.pos&&(o.pos=a.pos,o.unconf=!!a.unconfirmed||a.notes?.nameGuess===`true`,a.unit&&a.unit.pieces.length>1&&a.unit.head!==t+r&&a.unit.head-r>=0&&a.unit.head-r<i&&(o.unit={role:a.unit.role,head:a.unit.head-r,display:a.unit.display})),o}),c=s.filter(e=>e.word),l=new Map,u=[],d=e=>t[e].surface,f=e=>`“${d(e)}”`,p=(e,t)=>{let n=t===void 0?``:f(t);switch(e){case`root`:return`the main word of the sentence`;case`nsubj`:return`subject of ${n}`;case`obj`:return`direct object of ${n}`;case`iobj`:return`indirect object (the receiver) of ${n}`;case`obl`:return`adverbial phrase of ${n} (place, time, manner or a prepositional object)`;case`case`:return`preposition introducing ${n}`;case`det`:return`article or determiner of ${n}`;case`amod`:return`adjective describing ${n}`;case`nmod`:return`noun phrase modifying ${n}`;case`aux`:return`auxiliary verb of ${n}`;case`cop`:return`copula (“is / are / become”) linking ${n} to its subject`;case`mark`:return`word that opens the clause of ${n}`;case`advmod`:return`adverb modifying ${n}`;case`advcl`:return`adverbial clause of ${n}`;case`acl`:return`clause describing ${n}`;case`ccomp`:return`clause that is the content of ${n}`;case`xcomp`:return`open complement of ${n} (an infinitive, or a predicate without its own subject)`;case`conj`:return`coordinated with ${n}`;case`cc`:return`coordinating word (“and / but / or”) before ${n}`;case`nummod`:return`number of ${n}`;case`vocative`:return`the person addressed (to ${n})`;case`discourse`:return`interjection or discourse word attached to ${n}`;case`appos`:return`apposition to ${n}`;case`compound`:return`particle of the particle verb ${n}`;case`flat`:return`second part of the name ${n}`;case`punct`:return`punctuation`;default:return a[e]}},m=(e,t,n,r,i,a={})=>{if(l.has(e)||e===t)return;let o=[...r],c=i;(s[e].unconf||t!==void 0&&s[t]?.unconf)&&(c=Math.min(c,.6),o.push(`One of the two words is not in the word list; its part of speech is a guess, so this attachment is too.`));let u={dependent:e,...t===void 0?{}:{head:t},relation:n,label:a.label??p(n,t),basis:o.length?o:[`attached by the word-order rules`],confidence:Math.round(c*100)/100,status:a.alts?.length?`conflicted`:a.status??`generated`};a.alts?.length&&(u.alternatives=a.alts),l.set(e,u)},h=t.findIndex(e=>e.isWord),g={id:0,kind:`main`,start:Math.max(h,0),end:i-1,toks:[]},_=[g],v=[g],y=Array(i).fill(void 0),b=e=>{for(let t=e-1;t>=0;t--)if(s[t].word)return t;return-1},x=(e,t)=>{e.end=Math.max(t-1,e.start)},S=(e,t,n,r,a={})=>{let o={id:_.length,kind:e,start:t,end:i-1,marker:n,parent:r,toks:[],...a};return _.push(o),v.push(o),o},C=e=>Pr(e)&&$(e,`VerbForm`,`Fin`)&&!$(e,`VerbForm`,`Inf`)&&!$(e,`VerbForm`,`Part`),w=e=>{for(let t=e+1;t<i;t++){let e=s[t];if(!e.word){if(Fr(e.s))return!1;continue}if(e.pos===`SCONJ`||e.pos===`CONJ`&&wr.has(e.n)||e.pos===`PRON`&&e.n===`som`)return!1;if(Pr(e)){let n=s[b(t)];return $(e,`VerbForm`,`Fin`)&&!(n&&n.pos===`PART`)}}return!1},T=e=>!!e&&e.word&&(e.pos===`NOUN`||e.pos===`PROPN`||e.pos===`PRON`&&!$(e,`PronType`,`Rel`)&&!$(e,`PronType`,`Int`));for(let e=0;e<i;e++){let t=s[e];if(!t.word){if(Fr(t.s))for(;v.length>1&&v[v.length-1].fin!==void 0;)x(v.pop(),e);continue}let n=v[v.length-1],r=()=>!n.toks.length;if(t.pos===`SCONJ`&&t.n!==`som`&&(Mr.has(t.n)||1)){let t=S(`sub`,e,e,n);y[e]=t,t.toks.push(e);continue}if(t.n===`som`&&t.pos===`PRON`&&n.whMarker&&n.marker!==void 0&&b(e)===n.marker){n.somAfterWh=e,y[e]=n,n.toks.push(e);continue}if(t.n===`som`&&t.pos===`PRON`){let t=S(`rel`,e,e,n);y[e]=t,t.toks.push(e);continue}if(t.pos===`SCONJ`&&t.n===`som`){let t=!1;for(let n=e+1;n<i&&!t&&!(!s[n].word&&Fr(s[n].s)||(C(s[n])&&(t=!0),s[n].pos===`SCONJ`));n++);if(t){let t=S(`sub`,e,e,n);y[e]=t,t.toks.push(e);continue}}if((t.pos===`ADV`||t.pos===`PRON`)&&Cr.has(t.lemma)&&n.fin!==void 0&&e>0&&s[e-1].word&&!r()){let t=s[e-1];if(Pr(t)||t.pos===`ADV`&&(Ar.has(t.n)||t.unit)||t.pos===`PRON`&&$(t,`Case`,`Acc`)){let t=S(`sub`,e,e,n,{whMarker:!0});y[e]=t,t.toks.push(e);continue}}if(t.pos===`CONJ`&&(t.n===`så`||t.n===`so`)&&n.fin!==void 0&&e+1<i&&s[e+1].word&&s[e+1].pos&&!Pr(s[e+1])){let t=S(`sub`,e,e,n);y[e]=t,t.toks.push(e);continue}if(t.pos===`CONJ`&&wr.has(t.n)){if(n.fin!==void 0&&w(e)){let t=n.last??n,r=S(`coord`,e,e,n,{prev:t});n.last=r,y[e]=r,r.toks.push(e);continue}y[e]=n,n.toks.push(e);continue}if(Pr(t)){let r=s[b(e)],i=!!r&&r.pos===`PART`,a=$(t,`VerbForm`,`Fin`)&&!i&&(n.fin===void 0||C(t));if(a&&n.fin===void 0)n.fin=e;else if(a&&n.fin!==void 0){let t=e-1;for(;t>=0&&s[t].word&&y[t]===n&&s[t].pos===`ADV`;)t--;if(t>=0&&s[t].word&&y[t]===n&&T(s[t])&&t>(n.marker??-1)&&(Rr(s[t])===`nom`||n.marker===void 0&&Rr(s[t])!==`acc`)){let r=t;if(s[t].pos===`NOUN`||s[t].pos===`PROPN`)for(;r-1>=0&&s[r-1].word&&y[r-1]===n&&(s[r-1].pos===`DET`||s[r-1].pos===`ADJ`||s[r-1].pos===`NUM`);)r--;let i=S(`rel`,r,void 0,n,{irel:!0});i.fin=e;for(let t=r;t<e;t++)y[t]===n&&(y[t]=i,n.toks=n.toks.filter(e=>e!==t),i.toks.push(t));n=i}else{for(;v.length>1&&v[v.length-1].fin!==void 0;)x(v.pop(),e);n=v[v.length-1],n.fin===void 0&&(n.fin=e)}}}y[e]=n,n.toks.push(e)}for(;v.length>1;)x(v.pop(),i);for(let e of _)e.toks.sort((e,t)=>e-t);let ee=(e,t)=>{let n=Lr(e.m.Gender,t.m.Gender),r=Lr(e.m.Number,t.m.Number),i=`${e.s} (${[Nr(e.m.Gender).join(`/`).toLowerCase(),Nr(e.m.Number).join(`/`).toLowerCase()].filter(Boolean).join(`, `)||`no gender or number`})`,a=`${t.s} (${[Nr(t.m.Gender).join(`/`).toLowerCase(),Nr(t.m.Number).join(`/`).toLowerCase(),Nr(t.m.Definite).join(`/`).toLowerCase()].filter(Boolean).join(`, `)||`form unknown`})`;return n&&r?[!0,`${i} agrees with ${a} in gender and number`]:[!1,`${i} does not agree with ${a} in ${n?`number`:`gender`}: the form is wrong, a different noun is meant, or the word list has a variant`]},te=e=>{let n=e.toks.filter(t=>t!==e.marker&&(e.kind!==`coord`||t!==e.marker)),r=[],i=0,a=e=>e<n.length?s[n[e]]:void 0,o=e=>!!e&&!!e.pos,c=e=>e+1<n.length&&n[e+1]===n[e]+1,l=e=>{let t=[],r=e;for(;;){let e=a(r);if(!o(e))break;let i=c(r)?a(r+1):void 0;if(e.pos===`DET`||e.pos===`NUM`){t.push(n[r]),r++;continue}if(e.pos===`ADJ`){t.push(n[r]),r++;continue}if(e.pos===`ADV`&&o(i)&&i.pos===`ADJ`&&Tr.has(e.n)){t.push(n[r]),r++;continue}if(e.pos===`PRON`&&Er.has(e.lemma)&&o(i)&&(i.pos===`NOUN`||i.pos===`NUM`||i.pos===`ADJ`&&c(r+1)&&o(a(r+2))&&a(r+2).pos===`NOUN`||i.pos===`ADJ`&&/e$/.test(i.n)&&$(i,`Definite`,`Def`))){t.push(n[r]),r++;continue}if(e.pos===`PRON`&&Dr.has(e.lemma)&&o(i)&&(i.pos===`NOUN`||i.pos===`ADJ`)){t.push(n[r]),r++;continue}if((e.pos===`NOUN`||e.pos===`PROPN`)&&$(e,`Case`,`Gen`)&&o(i)&&(i.pos===`NOUN`||i.pos===`ADJ`||i.pos===`DET`||i.pos===`PROPN`)){t.push(n[r]),r++;continue}break}let i=a(r),l,u=`np`,f=r;if(o(i)&&(i.pos===`NOUN`||i.pos===`PROPN`)&&(r===e||c(r-1))){for(l=n[r],f=r+1;i.pos===`PROPN`&&c(f-1)&&o(a(f))&&a(f).pos===`PROPN`&&!a(f).unconf==!i.unconf;)m(n[f],l,`flat`,[`a name written as two capitalised words`],.8),f++;let e=c(f-1)?a(f):void 0;if(o(e)&&e.pos===`DET`&&$(e,`Poss`,`Yes`)&&i.pos===`NOUN`){let[t,r]=ee(e,i),a=$(i,`Definite`,`Def`)?[`double definiteness: the noun already carries its definite ending, the possessive follows it`]:[`the possessive follows the noun (Son sin)`];m(n[f],l,`det`,[...a,r],t?.88:.6),f++}}else if(o(i)&&i.pos===`PRON`&&!$(i,`PronType`,`Rel`)&&(r===e||c(r-1))&&t.every(e=>s[e].pos===`DET`||s[e].pos===`NUM`||s[e].pos===`ADV`)){l=n[r],f=r+1;let e=c(f-1)?a(f):void 0;o(e)&&e.pos===`PRON`&&(e.lemma===`selv`||e.lemma===`sjølv`)&&(m(n[f],l,`appos`,[`selv / sjølv follows the pronoun it stresses (oss selv)`],.8),f++)}else if(t.length){let e=t[t.length-1],n=s[e];l=e,t.pop(),f=r,u=n.pos===`ADJ`&&!t.some(e=>s[e].pos===`DET`||s[e].pos===`NUM`||s[e].pos===`PRON`)?`adjp`:`np`}else return;let p=s[l];for(let e of t){let n=s[e];if(n.pos===`DET`||n.pos===`NUM`&&/^(en|ein|ei|et|eit)$/.test(n.n)){let[t,r]=n.pos===`NUM`?[!0,`${n.s} is the indefinite article (en / ei / et), the same word as “one”; the noun’s gender is not checked`]:ee(n,p),i=$(p,`Definite`,`Def`)&&(Er.has(n.lemma)||$(n,`Poss`,`Yes`)),a=[r];i&&a.push(`double definiteness: den / det / de (or a possessive) before the noun and the definite ending on the noun together`),$(n,`PronType`,`Art`)&&a.unshift(`indefinite article before its noun`),m(e,l,`det`,a,t?.9:.6)}else if(n.pos===`NUM`)m(e,l,`nummod`,[`a number before the noun it counts`],.88);else if(n.pos===`ADJ`){let t=p.pos!==`NOUN`||Lr(n.m.Number,p.m.Number)&&(!($(n,`Definite`,`Def`)&&!$(n,`Definite`,`Ind`))||$(p,`Definite`,`Def`)||Nr(p.m.Definite).length===0);m(e,l,`amod`,[`adjective ${d(e)} stands directly before ${d(l)} and describes it`,t?`the adjective form fits the noun’s number and definiteness`:`the adjective form does not clearly fit the noun’s number or definiteness`],t?.88:.65)}else if(n.pos===`ADV`){let n=t.find(t=>t>e&&s[t].pos===`ADJ`);m(e,n??l,`advmod`,[`a degree word before the adjective`],.85)}else n.pos===`NOUN`||n.pos===`PROPN`?m(e,l,`nmod`,[`genitive -s: the owner stands before the thing owned`],.8):n.pos===`PRON`&&m(e,l,`det`,[`a quantifier / demonstrative pronoun used before a noun`],.7)}return[{kind:u,head:l,first:Math.min(n[e],l),last:n[f-1]??l,plain:f-e===1,wh:$(p,`PronType`,`Int`)},f]};for(;i<n.length;){let e=n[i],t=s[e];if(!t.pos){i++;continue}if(t.unit&&(t.unit.role===`particle`||/^reflexive/.test(t.unit.role))){r.push({kind:`other`,head:e,first:e,last:e}),i++;continue}if(t.pos===`ADP`){let a=l(i+1);if(a&&!s[n[i+1]]?.unit){m(e,a[0].head,`case`,[`a preposition stands directly before the noun phrase it introduces`],.92),r.push({kind:`pp`,head:a[0].head,first:e,last:a[0].last,adp:e,wh:a[0].wh}),i=a[1];continue}t.n===`for`&&e===h?r.push({kind:`adv`,head:e,first:e,last:e}):r.push({kind:`other`,head:e,first:e,last:e,adp:e}),i++;continue}if(t.pos===`NOUN`||t.pos===`PROPN`||t.pos===`DET`||t.pos===`NUM`||t.pos===`ADJ`||t.pos===`PRON`){let t=l(i);if(t){r.push(t[0]),i=t[1];continue}r.push({kind:`other`,head:e,first:e,last:e}),i++;continue}if(t.pos===`ADV`){let n=c(i)?a(i+1):void 0;if(o(n)&&n.pos===`ADJ`&&Tr.has(t.n)){let e=l(i);if(e){r.push(e[0]),i=e[1];continue}}r.push({kind:`adv`,head:e,first:e,last:e,wh:$(t,`PronType`,`Int`)||Cr.has(t.lemma)}),i++;continue}if(t.pos===`VERB`||t.pos===`AUX`){r.push({kind:`verb`,head:e,first:e,last:e}),i++;continue}if(t.pos===`PART`){r.push({kind:`part`,head:e,first:e,last:e}),i++;continue}if(t.pos===`CONJ`){r.push({kind:wr.has(t.n)?`cc`:`adv`,head:e,first:e,last:e}),i++;continue}if(t.pos===`INTJ`){r.push({kind:`intj`,head:e,first:e,last:e}),i++;continue}r.push({kind:`other`,head:e,first:e,last:e}),i++}for(let e=0;e+1<r.length;e++){let n=r[e],i=r[e+1];if(n.kind!==`np`||i.kind!==`np`||t[n.last+1]?.surface!==`,`||i.first!==n.last+2)continue;let a=e+1;for(;a+1<r.length&&r[a].kind===`np`&&r[a+1].kind===`np`&&t[r[a].last+1]?.surface===`,`&&r[a+1].first===r[a].last+2;)a++;r[a].kind===`np`&&r[a+1]?.kind===`cc`&&r[a+2]?.kind===`np`&&(m(i.head,n.head,`conj`,[`a comma-separated list of noun phrases that ends with “og / eller”: the members are coordinated`],.8),n.last=i.last,r.splice(e+1,1),e--)}for(let e=1;e+1<r.length;e++){let t=r[e-1],n=r[e],i=r[e+1];n.kind!==`cc`||t.absorbed||t.kind===i.kind&&[`np`,`adjp`,`pp`,`verb`,`adv`].includes(t.kind)&&(m(i.head,t.head,`conj`,[`“${d(n.head)}” joins two ${t.kind===`np`?`noun phrases`:t.kind===`adjp`?`adjectives`:t.kind===`pp`?`prepositional phrases`:t.kind===`verb`?`verbs`:`adverbs`} of the same kind`],.85),m(n.head,i.head,`cc`,[`coordinating word right before the second of the two joined words`],.9),t.last=i.last,r.splice(e,2),e--)}return r},E=new Map,ne=e=>e.kind===`np`,D=e=>{let n=te(e),r={C:e,items:n,verbs:[]},i=n.filter(e=>e.kind===`verb`&&!e.absorbed),a=e.fin,o=i.map(e=>e.head),c=a===void 0?0:Math.max(o.indexOf(a),0),f=a===void 0?[]:o.slice(0,c),v=o.slice(c);r.verbs=v;let y=e=>{let t=n.findIndex(t=>t.head===e&&t.kind===`verb`);return t>0&&n[t-1].kind===`part`},x=(e,t)=>{let n=s[e],r=s[t],i=$(r,`VerbForm`,`Inf`)&&!$(r,`VerbForm`,`Part`)?!0:$(r,`VerbForm`,`Inf`)&&!$(r,`VerbForm`,`Fin`),a=$(r,`VerbForm`,`Part`);return y(t)?{link:`xcomp`,why:`“å” marks ${d(t)} as an infinitive that depends on ${d(e)}`,conf:.85}:vr.has(n.lemma)&&(i||$(r,`VerbForm`,`Inf`))?{link:`aux`,why:`${d(e)} is a modal verb; the infinitive ${d(t)} follows without “å”`,conf:.92}:(yr.has(n.lemma)||n.lemma===`ha`)&&a?{link:`aux`,why:`${d(e)} + the participle ${d(t)} makes the perfect tense`,conf:.9}:br.has(n.lemma)&&a?{link:`aux`,why:`${d(e)} + the participle ${d(t)} makes the passive`,conf:.85}:(yr.has(n.lemma)||br.has(n.lemma))&&i&&!xr.has(r.lemma)?{link:`aux`,why:`${d(e)} + an infinitive`,conf:.6}:xr.has(n.lemma)&&(i||a)?{link:`aux`,why:`${d(e)} + ${d(t)}`,conf:.6}:{link:`xcomp`,why:`${d(t)} is a bare infinitive or participle after the verb ${d(e)}`,conf:.5}},S=v.slice(0,-1).map((e,t)=>x(e,v[t+1])),C=e=>{let t=e;for(;t<S.length&&S[t].link===`aux`;)t++;return t},w=v.length?v[C(0)]:void 0;r.head0=w,r.lastVerb=v.length?v[v.length-1]:void 0;let T=a??(v.length?v[0]:void 0),ee=e=>T!==void 0&&e.first<T,E=n=>{if(!n.plain||s[n.head].pos!==`NOUN`&&s[n.head].pos!==`PROPN`||e.kind===`sub`)return!1;let r=t[n.first-1],i=t[n.last+1],a=!r||!r.isWord&&/^[,;:!?.]$/.test(r.surface),o=!i||!i.isWord&&/^[,;:!?.]$/.test(i.surface),c=!!r&&r.surface===`,`||!!i&&i.surface===`,`;return a&&o&&c&&(n.first>0||!!i)},D=n=>{if(n.kind!==`np`||n.first===0||n.first<=(e.fin??-1))return;let r=t[n.first-1],i=t[n.last+1];if(!r||r.isWord||r.surface!==`,`||i&&i.isWord)return;let a=b(n.first-1);a>0&&s[a].pos===`DET`&&$(s[a],`Poss`,`Yes`)&&s[a-1].pos===`NOUN`&&a--;let o=a>=0?s[a]:void 0;return o&&(o.pos===`NOUN`||o.pos===`PROPN`)&&!E(n)&&s[n.head].pos!==`PRON`?a:void 0},O=n.filter(e=>ne(e)&&!E(e)&&D(e)===void 0);for(let e of n){let t=D(e);t!==void 0&&m(e.head,t,`appos`,[`${d(e.head)} stands after a comma and restates ${d(t)}`],.6)}let k=new Set(O.filter(e=>e.kind===`np`&&s[e.head].pos===`NOUN`&&Sr.has(s[e.head].lemma)&&e.first!==e.head&&(/^(hver|hvert|kvar|kvart|denne|dette|neste|forrige)$/.test(s[e.first].n)||ee(e)&&(s[e.first].pos===`DET`||s[e.first].pos===`NUM`))).map(e=>e.head)),A=O.filter(e=>!k.has(e.head)),j,M,re,ie=v.length?C(0):-1,N=ie>=0?v[ie]:void 0,P=N!==void 0&&xr.has(s[N].lemma),F=A.filter(ee),I=A.filter(e=>!ee(e)),ae=e=>{let t=s[e.head];return t.pos===`NOUN`||t.pos===`PROPN`||t.pos===`PRON`&&Rr(t)===`free`||t.pos===`DET`||t.pos===`NUM`||t.pos===`ADJ`},L=e=>s[e.head].pos===`PRON`&&Rr(s[e.head])===`nom`,R=e=>s[e.head].pos===`PRON`&&Rr(s[e.head])===`acc`,z=[],B=.8,oe=new Map,se=e.kind===`main`||e.kind===`coord`,ce=a!==void 0&&$(s[a],`Mood`,`Imp`)&&!$(s[a],`Mood`,`Ind`);(()=>{let t;if(P&&F.length&&(e=>!!e.wh)(F[0])&&I.length)j=F[0],t=I[0],z.push(`the question word ${d(F[0].head)} is what is asked about; the noun phrase after the verb is the subject`),B=.75;else if(e.kind===`coord`&&!F.length&&!n.some(t=>t.first<T&&t.kind!==`cc`&&t.head!==e.marker)){let e=I.find(L);e?(t=e,z.push(`${d(e.head)} is a subject-case pronoun after the verb`),B=.85):z.push(`the coordinated clause starts straight with its verb: it shares the subject of the clause before`)}else if(se||e.irel){if(F.length){let e=F[0],n=I.find(L);if(R(e))t=I.find(e=>!R(e)),t||=void 0,oe.set(e,{rel:`obj`,why:[`${d(e.head)} is an object form (not “${s[e.head].n===`meg`?`jeg`:`subject form`}”), so it is not the subject`],conf:.88});else if(!L(e)&&n&&!P){t=n;{let t=a!==void 0&&kr.has(s[a].lemma);oe.set(e,{rel:t?`xcomp`:`obj`,why:[t?`${d(a)} (“is called”) takes the name or word asked for as its complement: ${d(e.head)} is that complement`:`${d(n.head)} is a subject form and stands after the verb, so the noun phrase before the verb is the fronted object`],conf:t?.75:.8})}z.push(`${d(n.head)} is a subject-case pronoun (jeg, du, han, hun, vi, de ...)`),B=.88}else{t=e,L(e)?(z.push(`${d(e.head)} is a subject-case pronoun`),B=.92):z.push(`the first noun phrase before the finite verb is the subject (verb-second order)`);let n=I.find(ae);n&&ae(e)&&!L(e)&&!P&&!ce&&(B=.7,re={item:n,why:`both ${d(e.head)} and ${d(n.head)} have the same form as subject and object; the usual order (subject first, verb second) makes ${d(e.head)} the subject, but a fronted object is possible`})}}else if(I.length&&!ce){let e=I.find(L);t=e??I[0],e?(z.push(`${d(e.head)} is a subject-case pronoun after the verb (inversion: a question, or something else stands first)`),B=.9):(z.push(`after the finite verb comes the subject when something else stands first or the sentence is a question`),B=.72)}else if(I.length&&ce){let e=I.find(L);e&&(t=e,z.push(`${d(e.head)} is a subject-case pronoun after an imperative-shaped verb`),B=.8)}}else F.length?(t=F[0],z.push(`in a clause with a ${e.kind===`rel`?`relative`:`subordinating`} word the subject stands before the finite verb`),B=L(F[0])?.92:.85):e.kind===`rel`&&e.marker!==void 0||I.length&&(t=I.find(L)??I[0],z.push(`no noun phrase before the verb: the first one after it is taken as subject`),B=.6);M=t})(),P&&!j&&(j=n.filter(e=>(e.kind===`adjp`||e.kind===`pp`||e.kind===`np`&&e!==M&&!k.has(e.head)||e.kind===`adv`&&Or.has(s[e.head].n))&&e.first>N)[0]),P&&j&&j!==M||P&&(j=void 0);let V=j?j.head:w??n.find(e=>e.kind===`np`&&!E(e)||e.kind===`adjp`||e.kind===`pp`||e.kind===`intj`)?.head;r.pred=V,r.subj=M?.head;let le=e=>P&&j&&C(e)===ie?j.head:v[C(e)];v.forEach((e,t)=>{if(t<S.length&&S[t].link===`aux`)m(e,le(t),`aux`,[S[t].why],S[t].conf);else if(t>0&&S[t-1].link===`xcomp`){let r=P&&j&&v[t-1]===N?j.head:v[t-1],i=n.findIndex(t=>t.head===e&&t.kind===`verb`);i>0&&n[i-1].kind===`part`&&m(n[i-1].head,e,`mark`,[`“å” marks the infinitive`],.92),m(e,r,`xcomp`,[S[t-1].why],S[t-1].conf)}}),P&&j&&N!==void 0&&m(N,j.head,`cop`,[`${d(N)} (“is / are / become”) links the subject to ${d(j.head)}, which says what the subject is or does`],.9);for(let e of f)if(y(e)){let t=n.findIndex(t=>t.head===e&&t.kind===`verb`);m(n[t-1].head,e,`mark`,[`“å” marks the infinitive`],.92),V!==void 0&&m(e,V,`nsubj`,[`an infinitive phrase with “å” before the finite verb is the subject of the sentence`],.7)}let ue=v.filter((e,t)=>!(t<S.length&&S[t].link===`aux`)).filter(e=>!(P&&j&&e===N)),de=e=>{let t;for(let n of ue)n<e&&(t=n);return t??(P&&j?j.head:w??V)},fe=e=>{let t;for(let n of ue)n<e&&(t=n);return t??(P&&j&&!ue.length?j.head:ue.length?ue[ue.length-1]:w??V)},pe=P&&j?j.head:w,H=new Set;if(M&&pe!==void 0){H.add(M);let e=re?[{head:pe,relation:`obj`,confidence:.2,why:re.why}]:void 0;m(M.head,pe,`nsubj`,z.length?z:[`subject by word order`],B,{alts:e})}for(let e of O)k.has(e.head)&&V!==void 0&&(H.add(e),m(e.head,de(e.head)??V,`obl`,[`${d(e.head)} names a time; a time noun on its own (without a preposition) works as an adverbial`],.75));for(let[e,t]of oe){if(H.has(e)||e===j)continue;let n=fe(e.head)??V;n!==void 0&&(t.rel===`obj`||t.rel===`xcomp`)&&!(P&&j&&!ue.length)&&(H.add(e),m(e.head,n,t.rel,t.why,t.conf))}let me=A.filter(e=>!H.has(e)&&e!==j).filter(e=>e.head!==M?.head);if(re){let e=re.item;if(!H.has(e)&&M){let t=fe(e.head)??V;t!==void 0&&(H.add(e),m(e.head,t,`obj`,[`a noun phrase after the verb that is not the subject is its object`],.65,{alts:[{head:t,relation:`nsubj`,confidence:.2,why:re.why}]}))}}let U=me.filter(e=>!H.has(e));if(U.length&&!(P&&j&&!ue.length)){if(U.length>=2&&(R(U[0])||s[U[0].head].pos===`PRON`&&Rr(s[U[0].head])!==`none`)&&U[0].last<U[1].first){let e=fe(U[0].head)??V;if(e!==void 0){m(U[0].head,e,`iobj`,[`${d(U[0].head)} stands right after the verb and before another noun phrase: the receiver (“gave ${d(U[0].head)} …”)`],R(U[0])?.85:.7),m(U[1].head,e,`obj`,[`the second noun phrase after the verb is the thing given`],.8),H.add(U[0]),H.add(U[1]);for(let e of U.slice(2))u.push(`“${d(e.head)}” is a third bare noun phrase after one verb; the rules did not place it.`)}}else{let e=U[0],t=fe(e.head)??V;if(t!==void 0){let n=s[e.head].pos===`PRON`&&$(s[e.head],`Reflex`,`Yes`);if(m(e.head,t,kr.has(s[t].lemma)&&s[e.head].pos===`PROPN`?`xcomp`:`obj`,[R(e)?`${d(e.head)} is an object-case pronoun`:`a noun phrase after the verb that is not the subject is its direct object`,...n?[`reflexive pronoun`]:[]],R(e)?.9:.78),H.add(e),U.length>=2){let n=U[1];e.last<n.first&&s[n.head].pos!==`PRON`?(m(n.head,t,`obj`,[`a second noun phrase right after the first: the first is the receiver, this is the thing given`],.5,{status:`conflicted`}),H.add(n),he(e.head,`iobj`)):U.length>=2&&u.push(`“${d(n.head)}” is another bare noun phrase after the object; the rules did not place it.`)}}}}{let n=[...l.values()].find(e=>e.relation===`obj`&&s[e.dependent].pos===`PRON`&&$(s[e.dependent],`Case`,`Acc`)&&t[e.dependent+1]!==void 0),i=n&&_.some(t=>t.parent===e&&t.kind===`sub`&&t.start===n.dependent+1&&(t.whMarker||s[t.start].n===`at`)&&n.head===(r.head0??n.head));n&&i&&he(n.dependent,`iobj`)}function he(e,t){let n=l.get(e);n&&(n.relation=t,n.label=p(t,n.head),n.basis.push(t===`iobj`?`an object pronoun right before a clause or a second noun phrase is the receiver (“tell ME what …”)`:``),n.basis=n.basis.filter(Boolean),n.confidence=Math.min(n.confidence,.7))}let ge=e=>{let t;for(let r of n)r.last<e&&(r.kind===`np`||r.kind===`pp`)&&(t=r);return n.some(n=>n.first>(t?.last??-1)&&n.last<e&&n!==t&&(n.kind===`verb`||n.kind===`adv`||n.kind===`part`))?void 0:t};for(let t=0;t<n.length;t++){let r=n[t];if(r.kind===`pp`){if(l.has(r.head))continue;let e=ge(r.first),t=de(r.head)??V,n=e&&e.kind===`np`&&!k.has(e.head)&&s[e.head].pos!==`PRON`?e:void 0,i=s[r.adp].n;if(r===j)continue;if(t!==void 0&&!Pr(s[t])&&s[t].pos!==`ADJ`&&t!==void 0)m(r.head,n?n.head:t,`nmod`,[`a prepositional phrase in a sentence without a verb the rules know: it modifies the noun before it`],.6);else if(n&&ee(n)&&n===M)m(r.head,n.head,`nmod`,[`the prepositional phrase follows the noun ${d(n.head)} directly in the first position of the sentence: it belongs to the noun`],.6,{alts:t===void 0?void 0:[{head:t,relation:`obl`,confidence:.3,why:`it could also modify the verb`}]});else if(n&&t!==void 0){let e=i===`av`||i===`til`,a={head:n.head,relation:`nmod`,confidence:e?.45:.3,why:`“${d(r.adp)} ${d(r.head)}” follows the noun phrase ${d(n.head)} directly; it could belong to that noun instead of the verb`};m(r.head,t,`obl`,[`the prepositional phrase stands after the verb and its object: attached to the verb ${d(t)} by default`],.62,{alts:[a]})}else t!==void 0&&!Pr(s[t])&&s[t].pos!==`ADJ`?m(r.head,t,`nmod`,[`a prepositional phrase after a noun phrase, in a sentence without a verb the rules know: it modifies the noun`],.6):t!==void 0&&m(r.head,t,`obl`,[`a prepositional phrase after the verb is an adverbial or the verb’s prepositional object`],.78)}else if(r.kind===`adv`){if(l.has(r.head))continue;let t=V,i=s[r.head];if(t===void 0||r.head===e.marker)continue;if(r.head===h&&i.n===`for`&&e===g&&n.some(e=>e.kind===`verb`)){m(r.head,t,`cc`,[`sentence-initial “for” before a full clause: a coordinating word (“for / because”)`],.6);continue}m(r.head,t,`advmod`,[Ar.has(i.n)?`the negation modifies the predicate of its clause`:`an adverb modifies the predicate of its clause`],.84)}else if(r.kind===`adjp`&&r!==j&&r.head!==M?.head){if(l.has(r.head))continue;let e=fe(r.head)??V;e!==void 0&&e!==r.head&&m(r.head,e,`xcomp`,[`an adjective after a verb that is not “be”: a predicate complement (jeg har det bra)`],.5)}else if(r.kind===`intj`)V!==void 0&&V!==r.head&&m(r.head,V,`discourse`,[`an interjection / greeting`],.8);else if(r.kind===`np`&&E(r)&&V!==void 0&&V!==r.head)m(r.head,V,`vocative`,[`a name between commas (or between a comma and the end) is the person addressed`],.7);else if(r.kind===`other`&&r.adp!==void 0&&!l.has(r.head)){let e=fe(r.head);e!==void 0&&m(r.head,e,`compound`,[`the preposition has no noun phrase after it in this clause: it belongs to the verb as a particle`],.5)}else if(r.kind===`other`&&s[r.head].unit&&/^reflexive/.test(s[r.head].unit.role)){let e=s[r.head].unit;m(r.head,e.head,`expl`,[`${d(r.head)} is the reflexive pronoun of the verb unit “${e.display}”`],.8)}else if(r.kind===`other`&&s[r.head].unit&&s[r.head].unit.role===`particle`){let e=s[r.head].unit;m(r.head,e.head,`compound`,[`${d(r.head)} is the particle of the particle verb “${e.display}”`],.85)}}return r};for(let e of _)E.set(e.id,D(e));let O=e=>e?E.get(e.id)?.pred:void 0,k=O(g);if(k===void 0)for(let e of _){let t=O(e);if(t!==void 0){k=t;break}}let A=(e,t)=>{let n=E.get(e.id);if(!n)return;let r;for(let e of n.items)e.last<t&&(e.kind===`np`||e.kind===`pp`)&&(r=e);if(r){for(let n=r.last+1;n<t;n++)if(s[n].word&&y[n]===e&&n!==r.last)return;return r}};for(let e of _){let t=O(e);if(e===g)continue;let n=e.parent,r=O(n);if(t===void 0){e.marker!==void 0&&s[e.marker].pos&&u.push(`The clause opened by “${d(e.marker)}” has no verb the rules could find; it was not attached.`);continue}let i=e.marker===void 0?void 0:s[e.marker];if(e.kind===`coord`){let n=O(e.prev);n!==void 0&&(m(t,n,`conj`,[`a new clause (with its own finite verb) joined by “${d(e.marker)}” to the one before`],.82),m(e.marker,t,`cc`,[`coordinating word that opens the second clause`],.9))}else if(e.kind===`rel`){let i=A(n,e.marker??e.start);i?(m(t,i.head,`acl`,[e.marker===void 0?`a clause with its own subject and finite verb right after ${d(i.head)} and no conjunction: a relative clause without “som”`:`“som” opens a clause that describes ${d(i.head)}, the noun phrase right before it`],e.marker===void 0?.6:.78),e.marker!==void 0&&m(e.marker,t,`mark`,[`relative som opens the clause; it stands for the subject or object of the verb inside`],.85)):r!==void 0&&e.marker!==void 0&&(m(t,r,`advcl`,[`“som” without a noun phrase before it: taken as an adverbial clause of the verb`],.45),m(e.marker,t,`mark`,[`relative som opens the clause`],.7))}else if(e.kind===`sub`){if(r===void 0)continue;let a=i;if(e.whMarker&&a){m(t,r,`ccomp`,[`the question word “${d(a.i)}” after the verb opens an embedded question that is the content of ${d(r)}`],.78);let n=E.get(e.id);e.somAfterWh===void 0?a.pos===`ADV`?m(a.i,t,`advmod`,[`an interrogative adverb modifies the verb of its own clause`],.85):m(a.i,t,n.subj===void 0?`nsubj`:`obj`,[n.subj===void 0?`the clause has no other subject: the question word is it`:`the clause already has a subject, so the question word is the object`],.7):(m(a.i,t,`nsubj`,[`the question word is followed by “som”: it stands for the subject of the embedded verb`],.7),m(e.somAfterWh,t,`mark`,[`“som” after a question word opens the verb of the embedded question`],.7))}else if(a){let i=a.n,o=E.get(n.id),c=o&&o.C.fin!==void 0&&e.start<o.C.fin,l=n.toks.filter(t=>t<e.start),u=i===`at`&&l.some(e=>jr.has(s[e].n)&&s[e].pos!==`PRON`),f=`advcl`,p=`“${d(a.i)}” opens an adverbial clause (time, reason, condition) of ${d(r)}`,h=.82,g;i===`at`&&!u&&!c?(f=`ccomp`,p=`“${d(a.i)}” opens a clause that tells what ${d(r)} says, thinks or shows`,h=.8):i===`at`&&u?(f=`advcl`,p=`“så / slik … at” (so … that): the at-clause gives the result; it is adverbial`,h=.7):i===`at`?(f=`advcl`,p=`a fronted “at” clause stands before the verb of ${d(r)}`,h=.65):i===`om`&&!c?(f=`ccomp`,p=`“om” (whether) after the verb opens an indirect question`,h=.65,g=[{head:r,relation:`advcl`,confidence:.25,why:`“om” can also open an adverbial clause (“whether or not”)`}]):i===`så`||i===`so`?(f=`advcl`,p=`“${d(a.i)}” (so that) opens a result clause of ${d(r)}`,h=.7):i===`som`&&a.pos===`SCONJ`&&(f=`advcl`,p=`“som” (as, like) opens a comparison clause`,h=.55),m(t,r,f,[p],h,{alts:g}),m(a.i,t,`mark`,[`subordinating word at the start of its clause`],.9)}}}let j=c[0];if(j&&j.n===`for`&&k!==void 0&&!l.has(j.i)&&(j.pos===`ADV`||j.pos===`ADP`||j.pos===`CONJ`)){let e=c[1];e&&(e.pos===`ADV`||e.pos===`PRON`||e.pos===`NOUN`||e.pos===`PROPN`||e.pos===`DET`)&&m(j.i,k,`cc`,[`sentence-initial “for” before a full clause: a coordinating word (“for / because”)`],.6)}for(let e of _){let t=E.get(e.id);if(t&&t.pred!==void 0)for(let e of t.items)e.kind===`cc`&&!l.has(e.head)&&t.items.indexOf(e)===0&&m(e.head,t.pred,`cc`,[`a coordinating word at the start of its clause`],.6)}k!==void 0&&m(k,void 0,`root`,[s[k].pos===`VERB`||s[k].pos===`AUX`?`the main verb of the main clause`:`the main word of the sentence: no finite verb, so its first phrase is taken`],Pr(s[k])?.92:E.get(0)?.items.some(e=>e.kind===`verb`)?.85:.5);for(let e=0;e<i;e++){let t=s[e];if(t.word||l.has(e)||!/\S/.test(t.s))continue;let n;if(Ir(t.s)||e===i-1)n=k;else{for(let t=e+1;t<i;t++)if(s[t].word){n=O(y[t])??k;break}n??=k}n!==void 0&&n!==e&&m(e,n,`punct`,[`punctuation hangs on the main word of its clause`],.95)}let M=e=>e.s,re=0;for(let e of c){if(l.has(e.i)){re++;continue}u.push(e.pos?`“${M(e)}” (${e.pos}) could not be attached by the rules.`:`“${M(e)}” is not in the word list, so the rules left it without a relation.`)}c.length>28&&u.push(`A long sentence: the rules read it clause by clause and may have lost track of the longer dependencies.`);let ie=_.map(e=>{let t=e.kind===`main`?`main`:e.kind===`sub`?`subordinate`:e.kind===`rel`?`relative`:`coordinate`,n={main:`main clause`,subordinate:e.whMarker?`embedded question`:`subordinate clause`,relative:e.marker===void 0?`relative clause without som`:`relative clause (som)`,coordinate:`coordinated clause`,quote:`quotation`},r=e.toks.length?e.toks[e.toks.length-1]:e.end;return{start:e.toks.length?e.toks[0]:e.start,end:Math.max(e.end,r),kind:t,...e.marker===void 0?{}:{marker:e.marker},label:n[t]}}),N=[...l.values()].sort((e,t)=>e.dependent-t.dependent);return ie.sort((e,t)=>e.end-e.start-(t.end-t.start)||e.start-t.start),{languageId:e,analyzer:`${o}:syntax`,tokens:t.map(e=>e.surface),relations:N,clauses:ie,notes:u,attached:c.length?Math.round(re/c.length*1e3)/1e3:0}}function Br(e,t,n){let r=[];for(let e=0;e<t.length-1;e++){if(t[e].isWord||!/^[.!?…]+$/.test(t[e].surface))continue;let n=e+1;for(;n<t.length&&!t[n].isWord&&/^[»”"’')\]]$/.test(t[n].surface);)n++;n<t.length&&t[n].isWord&&(r.push(n),e=n-1)}if(!r.length)return zr(e,t,n);let i=[0,...r,t.length],a=i.slice(0,-1).map((r,a)=>({at:r,a:zr(e,t.slice(r,i[a+1]),n.slice(r,i[a+1]),r)})),o=t.filter(e=>e.isWord).length,s=a.reduce((e,n)=>e+Math.round(n.a.attached*t.slice(n.at,n.at+n.a.tokens.length).filter(e=>e.isWord).length),0),c=(e,t)=>({...t,dependent:t.dependent+e.at,...t.head===void 0?{}:{head:t.head+e.at},...t.alternatives?{alternatives:t.alternatives.map(t=>({...t,...t.head===void 0?{}:{head:t.head+e.at}}))}:{}});return{languageId:e,analyzer:a[0].a.analyzer,tokens:t.map(e=>e.surface),relations:a.flatMap(e=>e.a.relations.map(t=>c(e,t))),clauses:a.flatMap(e=>(e.a.clauses??[]).map(t=>({...t,start:t.start+e.at,end:t.end+e.at,...t.marker===void 0?{}:{marker:t.marker+e.at}}))),notes:[`The selection holds more than one sentence; each sentence was read on its own and has its own main word.`,...a.flatMap(e=>e.a.notes)],attached:o?Math.round(s/o*1e3)/1e3:0}}var Vr={nb:{code:`nb`,label:`Bokmål`,kind:`national`,note:`The written standard of Bokmål (the norm of 2005). One of Norway's two equal written standards; there is no official spoken standard.`},"nb-riksmal":{code:`nb-riksmal`,label:`Riksmål`,kind:`historical`,parent:`nb`,note:`Riksmål is the older, more conservative Bokmål-type spelling (efter, nu, sprog, sne). It had official status before 1929 and its norm is kept privately and is still written today by Riksmål writers, but it is not part of the official Bokmål norm. Recognise it; do not use it as Bokmål.`},"nb-dano":{code:`nb-dano`,label:`Dano-Norwegian (pre-1907)`,kind:`historical`,parent:`nb`,note:`Danish-based written language in Norway before the reform of 1907 (soft consonants such as gade and bog, hvad, mig, capital letters on nouns, aa for å). Not written this way today.`}},Hr={nn:{code:`nn`,label:`Nynorsk`,kind:`national`,note:`The written standard of Nynorsk (the norm of 2012). One of Norway's two equal written standards; read here, not the target of the course.`},"nn-landsmal":{code:`nn-landsmal`,label:`Landsmål (pre-1929)`,kind:`historical`,parent:`nn`,note:`Ivar Aasen's Landsmål and its spelling before the name Nynorsk (1929) and the reforms of 1917, 1938 and 1959. Recognise it when reading older Nynorsk; it is not the spelling of today.`},"nn-hognorsk":{code:`nn-hognorsk`,label:`Høgnorsk`,kind:`historical`,parent:`nn`,note:`Høgnorsk is a conservative Nynorsk norm kept by a small group of writers, close to Aasen's Landsmål; it is still written today but is not part of the official Nynorsk norm.`}};Object.keys(Vr),Object.keys(Hr);var Ur=`2`,Wr=[`null`,`en`,`to`,`tre`,`fire`,`fem`,`seks`,`sju`,`åtte`,`ni`,`ti`,`elleve`,`tolv`,`tretten`,`fjorten`,`femten`,`seksten`,`sytten`,`atten`,`nitten`],Gr={2:`tjue`,3:`tretti`,4:`førti`,5:`femti`,6:`seksti`,7:`sytti`,8:`åtti`,9:`nitti`};function Kr(e){if(e<20)return Wr[e];let t=e%10;return t?`${Gr[Math.floor(e/10)]}${Wr[t]}`:Gr[Math.floor(e/10)]}function qr(e){if(e<100)return Kr(e);let t=Math.floor(e/100),n=e%100;return`${t===1?`ett`:Wr[t]} hundre${n?` og ${Kr(n)}`:``}`}function Jr(e){if(!Number.isInteger(e)||e<0||e>999999)return null;if(e<1e3)return qr(e);let t=Math.floor(e/1e3),n=e%1e3,r=`${t===1?`ett`:qr(t)} tusen`;return n?`${r} ${n<100?`og `:``}${qr(n)}`:r}var Yr=[{pattern:/\bbl\.\s?a\./gu,replacement:`blant annet`,label:`bl.a.`},{pattern:/\bf\.\s?eks\./gu,replacement:`for eksempel`,label:`f.eks.`},{pattern:/\bosv\./gu,replacement:`og så videre`,label:`osv.`},{pattern:/\bdvs\./gu,replacement:`det vil si`,label:`dvs.`},{pattern:/\bm\.\s?fl\./gu,replacement:`med flere`,label:`m.fl.`},{pattern:/\bo\.\s?l\./gu,replacement:`og lignende`,label:`o.l.`},{pattern:/\bca\./gu,replacement:`cirka`,label:`ca.`},{pattern:/\bmv\./gu,replacement:`med mer`,label:`mv.`},{pattern:/\bnr\./gu,replacement:`nummer`,label:`nr.`},{pattern:/\bkl\.\s?(?=\d)/gu,replacement:`klokka `,label:`kl.`},{pattern:/\bDr\./gu,replacement:`doktor`,label:`Dr.`},{pattern:/\bProf\./gu,replacement:`professor`,label:`Prof.`}],Xr=[{pattern:/\bm\.\s?a\./gu,replacement:`mellom anna`,label:`m.a.`},{pattern:/\bt\.\s?d\./gu,replacement:`til dømes`,label:`t.d.`},{pattern:/\bosb\./gu,replacement:`og så bortetter`,label:`osb.`},{pattern:/\bdvs\./gu,replacement:`det vil seie`,label:`dvs.`},{pattern:/\bca\./gu,replacement:`cirka`,label:`ca.`},{pattern:/\bnr\./gu,replacement:`nummer`,label:`nr.`},{pattern:/\bkl\.\s?(?=\d)/gu,replacement:`klokka `,label:`kl.`}],Zr={masculine:{Gender:`Masc`},feminine:{Gender:`Fem`},neuter:{Gender:`Neut`},singular:{Number:`Sing`},plural:{Number:`Plur`},definite:{Definite:`Def`},indefinite:{Definite:`Ind`},present:{VerbForm:`Fin`,Tense:`Pres`},past:{VerbForm:`Fin`,Tense:`Past`},preterite:{VerbForm:`Fin`,Tense:`Past`},participle:{VerbForm:`Part`,Tense:`Past`},infinitive:{VerbForm:`Inf`},imperative:{VerbForm:`Fin`,Mood:`Imp`},passive:{Voice:`Pass`},comparative:{Degree:`Cmp`},superlative:{Degree:`Sup`},genitive:{Case:`Gen`},supine:{VerbForm:`Part`,Tense:`Past`}};function Qr(e,t){let n=t=>(e[t]??``).split(`,`).filter(Boolean),r={Masc:`masculine`,Fem:`feminine`,Neut:`neuter`},i=[];if(t===`VERB`||t===`AUX`){let e=n(`Mood`).includes(`Imp`)&&n(`Mood`).includes(`Ind`)?` or imperative`:``;return n(`Mood`).includes(`Imp`)&&!e?i.push(n(`VerbForm`).includes(`Inf`)?`imperative or infinitive`:`imperative`):n(`VerbForm`).includes(`Inf`)&&!n(`VerbForm`).includes(`Fin`)?i.push(n(`VerbForm`).includes(`Part`)?`infinitive or perfect participle`:`infinitive`):n(`VerbForm`).includes(`Part`)&&!n(`VerbForm`).includes(`Fin`)?i.push(`perfect participle`):n(`Tense`).includes(`Pres`)?i.push(`present tense${e}`):n(`Tense`).includes(`Past`)&&i.push(n(`VerbForm`).includes(`Part`)?`past tense or perfect participle`:`past tense${e}`),n(`Voice`).includes(`Pass`)&&i.push(`passive (-s)`),i.join(`, `)}return n(`Gender`).length&&i.push(n(`Gender`).map(e=>r[e]??e).join(` or `)),n(`Number`).length&&!(n(`Number`).includes(`Plur`)&&n(`Number`).includes(`Sing`))&&i.push(n(`Number`).includes(`Plur`)?`plural`:`singular`),n(`Definite`).length===1&&i.push(n(`Definite`)[0]===`Def`?`definite`:`indefinite`),n(`Case`).includes(`Gen`)&&i.push(`genitive`),n(`Degree`).length&&n(`Degree`)[0]!==`Pos`&&i.push(n(`Degree`)[0]===`Cmp`?`comparative`:`superlative`),n(`Person`).length&&i.push(`${n(`Person`)[0]} person`),n(`Poss`).includes(`Yes`)&&i.push(`possessive`),n(`Reflex`).includes(`Yes`)&&i.push(`reflexive`),i.join(`, `)}var $r=[[`syv`,`sju`],[`tyve`,`tjue`],[`bli`,`verte`],[`bro`,`bru`]];function ei(e){let t=qt(e),n=ge(e,Ur),r=`adapter-${e}@${Ur}`,a={std:e,lex:t,units:e===`nb`?fe:pe,analyzer:r,ids:n},s=e===`nb`?`Norwegian (Bokmål)`:`Norwegian (Nynorsk)`,c=e===`nb`?`Bokmål`:`Nynorsk`,l=t.stats.nouns+t.stats.verbs+t.stats.adjectives+t.stats.words,u={[n.hand]:{id:n.hand,label:`${c} word list`,origin:`hand`,reviewStatus:`machine-drafted`,version:Ur},[n.phrases]:{id:n.phrases,label:`${c} fixed expressions`,origin:`hand`,reviewStatus:`machine-drafted`,version:Ur},[n.constructions]:{id:n.constructions,label:`${c} grammar patterns`,origin:`hand`,reviewStatus:`machine-drafted`,version:Ur},[n.rules]:{id:n.rules,label:`${c} word-form and sentence rules`,origin:`rule`,reviewStatus:`machine-drafted`,version:Ur}},d={tokenization:`dependable`,sentenceSegmentation:`limited`,lemmatization:`seed-only`,morphology:`limited`,phraseDetection:`limited`,productionChecks:e===`nb`?`limited`:`none`,limitations:e===`nb`?[`Lemmatization is seed-only: the ${c} word list is a machine-drafted seed of about ${l.toLocaleString(`en`)} entries (nouns, verbs, adjectives, closed classes) that no native speaker has checked against Norsk ordbank; a word outside it gets a reading the rules only infer (a compound, an older spelling, a name guess: marked unconfirmed) or none.`,`There is no parser. The sentence layer reads the words around a homograph (an article before a noun, å or a modal before an infinitive, har before a participle); what the neighbours do not decide stays a list of readings, never a guess. Both feminine paradigms (ei bok, boka and en bok, boken) and both past forms (kastet and kasta) are accepted as valid.`,`Compounds are taken apart only into words the word list knows, with the linking element (-s-, -e-) named; the reading is marked unconfirmed (0.55) and has no gloss. A word the list holds keeps its own entry, and a listed non-compound (bilde, stolen) is never split.`,`A particle verb (stå opp, finne ut, ta på seg) is put together when the particle stands within four words after the verb in the same clause; the word list of such verbs is short, and a preposition verb that cannot split (se på) is not a unit.`,`Older spelling (Riksmål efter, nu, sprog; Dano-Norwegian gade, hvad, mig, aa for å) is related to today's word without changing the text, and only when the modern spelling is a word the list knows. The period each pair belongs to is the author's judgement, not a source.`,`Production checks are not dependable: they are rules for a few common errors (a Nynorsk form in Bokmål, a Riksmål spelling, min bilen, a missing neuter -t, ikke after the verb in a subordinate clause, og for å) that fire only on their own shape and say nothing when a fact is missing. Pronunciation is a rule-based East Norwegian reference realisation, not a norm, and carries no tone except a few unverified minimal pairs.`]:[`Lemmatization is seed-only: the Nynorsk word list is a machine-drafted seed of about ${l.toLocaleString(`en`)} entries, smaller than the Bokmål list because Nynorsk is read, not written, in this course; no native speaker has checked it against Norsk ordbank.`,`There is no parser. The sentence layer reads the words around a homograph; what the neighbours do not decide stays a list of readings. The -a and -e infinitives of Nynorsk (kaste / kasta) are both generated for every -e verb; table cells the recon notes mark unsure carry an unverified flag in the notes of the reading.`,`Compounds are taken apart only into words the Nynorsk list knows; the reading is marked unconfirmed (0.55) and has no gloss. Older Landsmål and Høgnorsk spelling is related only for aa → å and a handful of listed forms.`,`Nynorsk writing is not checked: this adapter does not check production. The Bokmål adapter flags Nynorsk forms in Bokmål writing.`]};return Object.assign({lang:e,name:s,script:`Latn`,version:Ur,support:d,sources:u,varieties:e===`nb`?Vr:Hr,segmentSentences:Re,tokenize:Le,normalize:Ae,searchNormalize:e=>Ae(e).trim(),analyze:e=>ke(e,a),detectPhrases:(t,n)=>$e(t,n,e),detectPatterns:(t,n)=>Ye(t,n,e),pronunciation(e){let t=rr(e.normalized);return t?{ipa:t.ipa,ipaSource:`rules`,transliteration:t.respelling,notes:[`variant: east`,`machine-draft (rule-based respelling, not checked by a native speaker)`,`Reference realisation of East Norwegian speech, not a norm: there is no official spoken standard, and speech is not "Bokmål".`,...t.notes]}:{notes:[]}},speechNormalize:t=>i(t,{tool:`speech-${e}@1`,numberToWords:Jr,percentWord:`prosent`,skipOrdinalDot:!0,abbreviations:e===`nb`?Yr:Xr}),display:{wordSeparator:` `,showBoundariesOnHighlight:!1,fontFamily:`Georgia, "Times New Roman", serif`,lineHeight:1.7},checkProduction:(t,n,r)=>e===`nb`?Gn(t,n,r):[],relate(n,r){let i=Ae(n),a=Ae(r);if(i===a)return`same`;let o=e=>{let n=new Set;for(let r of t.lookup(e))n.add(`${r.lemma}|${r.pos}`);if(!n.size&&e.endsWith(`s`))for(let r of t.lookup(e.slice(0,-1)))(r.pos===`NOUN`||r.pos===`PROPN`)&&n.add(`${r.lemma}|${r.pos}`);return n},s=o(i),c=o(a);for(let e of s)if(c.has(e))return`inflection`;let l=n=>ce(n,e,{isWord:e=>t.has(e)})?.modern,u=l(i),d=l(a);if(u&&(u===a||[...o(u)].some(e=>c.has(e)))||d&&(d===i||[...o(d)].some(e=>s.has(e))))return`inflection`;let f=e=>{let n=v(e,t);return n?n.parts.filter(e=>e.lemma).map(e=>Ae(e.lemma)):[]},p=e=>new Set([...e].map(e=>Ae(e.split(`|`)[0]))),m=f(i),h=f(a),g=p(s),_=p(c);return m.some(e=>_.has(e)||e===a)||h.some(e=>g.has(e)||e===i)?`component`:`none`},lemmaVariants:(n,r)=>{let i=[];for(let[e,t]of $r)n===e&&i.push(t),n===t&&i.push(e);return e===`nn`&&(r===void 0||r===`VERB`||r===`AUX`)&&/e$/.test(n)&&t.hasLemma(n)&&i.push(`${n.slice(0,-1)}a`),e===`nn`&&/a$/.test(n)&&t.hasLemma(`${n.slice(0,-1)}e`)&&i.push(`${n.slice(0,-1)}e`),i.push(...z(n)),[...new Set(i)].filter(e=>e!==n)},morphFromTags(e){let t={};for(let n of e){let e=Zr[n.toLowerCase()];if(e)for(let[n,r]of Object.entries(e))t[n]=t[n]&&t[n]!==r?[...new Set([...t[n].split(`,`),r])].sort().join(`,`):r}return t},varietiesFromTags(t){let n=[];for(let e of t){let t=e.toLowerCase();t===`riksmål`||t===`riksmal`?n.push(`nb-riksmal`):t===`dano-norwegian`?n.push(`nb-dano`):t===`landsmål`||t===`landsmal`?n.push(`nn-landsmal`):(t===`høgnorsk`||t===`hognorsk`)&&n.push(`nn-hognorsk`)}return n.filter(t=>e===`nb`?t.startsWith(`nb-`):t.startsWith(`nn-`))},describeMorph:(e,t)=>Qr(e,t)},{family:(t,n)=>tn(e,t,n),paradigm:(t,n)=>kn(e,t,n),featuresFromTableTags:(e,t)=>_r(e,t),syntax:(t,n)=>Br(e,t,n),cellsFor:(e,t)=>{let n=[];for(let r of un(e.pos,t)){let t=o(e,r);t&&!n.includes(t)&&n.push(t)}return n}})}export{ei as t};