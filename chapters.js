/* Five-chapter documentary: four-source comparison and time-bounded audio moments. */
(() => {
 const stories={
  p1:{label:'PARTICIPANT 01 / THREE HOMES',title:'Nigeria, Virginia, Lubbock',body:'She describes Nigeria as a first home, Virginia as a second, and Lubbock as a third. She enjoys being welcomed at Texas Tech while still feeling closest to family and friendships elsewhere.',evidence:'Classes, events and the library feel comfortable. But she says she has no family or close friends in Lubbock.',interpretation:'My interpretation: finding another home does not erase earlier ones.',transcript:'full-transcript-01'},
  p2:{label:'PARTICIPANT 02 / DEEPER CONNECTIONS',title:'Welcomed, but not yet home',body:'He describes Texas Tech as friendly and enjoys campus activities, but he has not developed the deep connections that would make Lubbock feel like a second home.',evidence:'He initially found it difficult to make friends. Hackathons, library workshops and church have helped; family in Houston still matters deeply.',interpretation:'My interpretation: being invited into a community is different from feeling attached enough to call it home.',transcript:'full-transcript-02'},
  p3:{label:'PARTICIPANT 03 / TIME AND FRIENDSHIP',title:'A familiar city through friends and church',body:'After several years at Texas Tech, she describes friendships and church as a community she enjoys. Dallas is still important when she thinks about a second home.',evidence:'She cautions new students not to force friendships just to fit in. She also describes difficulty moving around the city without driving.',interpretation:'My interpretation: staying longer can build routines, but a sense of home is not guaranteed by time alone.',transcript:'full-transcript-03'},
  p4:{label:'PARTICIPANT 04 / CULTURAL COMMUNITY',title:'The people, rather than the city',body:'She separates the city of Lubbock from the people who make her feel understood. Church and a cultural community can feel like home even if the place itself does not.',evidence:'She describes cultural barriers to friendship, support at her campus job, SWE meetings and the practical importance of buses.',interpretation:'My interpretation: someone can belong within a community without feeling equally at home everywhere around it.',transcript:'full-transcript-04'}
 };
 const box=document.getElementById('place-story');
 const buttons=[...document.querySelectorAll('[data-participant]')];
 const make=(name,cls,text)=>{const el=document.createElement(name);if(cls)el.className=cls;el.textContent=text;return el;};
 if(box&&buttons.length===4){
   buttons.forEach(b=>b.addEventListener('click',()=>{
     const x=stories[b.dataset.participant];if(!x)return;
     buttons.forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));
     const note=make('div','home-evidence','');note.append(make('span','home-evidence-label','From the interview'),make('p','',x.evidence));
     const link=make('a','home-transcript-link','Read Interview '+x.transcript.slice(-2));link.href='#'+x.transcript;
     box.replaceChildren(make('p','place-small',x.label),make('h3','',x.title),make('p','',x.body),note,make('p','place-interpretation',x.interpretation),link);
   }));
 }
})();
