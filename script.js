/* Far From Home — interactive components.
   Update tab descriptions in `stages`, location content in `places`,
   and analytical lenses in `data`. No build tools needed. */

(() => {
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('nav');
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

  const stages = {
    arrive: {tag:'First impressions', title:'She expected an empty city. She found people.', body:'Before moving, the student expected Lubbock to be boring and deserted. What surprised her at TTU was the number of people, the friendliness, and the diversity she experienced on campus.', question:'From the interview: “What surprised you most when you first arrived at Texas Tech?”', media:'Primary interview · Expectations and surprise (edited captions).' },
    connect: {tag:'Everyday adjustment', title:'Connection came through ordinary moments.', body:'The student describes professors who are approachable, group work with classmates, and clubs where someone will greet her. She also misses her family and finds fewer activities in Lubbock than where she lived before.', question:'From the interview: “What has been the most difficult part of adjusting?”', media:'Primary interview · Cultural differences, groups, people, and challenges.' },
    belong: {tag:'Identity and home', title:'Welcome is real. Home remains complicated.', body:'She describes Lubbock as her third home, after Nigeria and Virginia. Welcoming campus life does not erase her sense of family and history elsewhere. The strongest finding is not that she does not belong, but that home can mean different things in different places.', question:'From the interview: “Would you consider Lubbock or Texas Tech your second home?”', media:'Primary interview · Identity, family, and the meaning of home.' }
  };
  const tabs = [...document.querySelectorAll('[data-stage]')];
  const panel = document.getElementById('panel-journey');
  const setStage = (stage) => {
    const d = stages[stage];
    tabs.forEach(t => { const active=t.dataset.stage===stage; t.setAttribute('aria-selected',String(active)); t.tabIndex=active?0:-1; });
    panel.setAttribute('aria-labelledby','tab-'+stage);
    document.getElementById('stageTag').textContent=d.tag;
    document.getElementById('stageTitle').textContent=d.title;
    document.getElementById('stageBody').textContent=d.body;
    document.getElementById('stageQuestion').textContent=d.question;
    document.getElementById('stageMedia').textContent=d.media;
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => setStage(tab.dataset.stage));
    tab.addEventListener('keydown', e => { let ni=null; if(e.key==='ArrowRight')ni=(i+1)%tabs.length; if(e.key==='ArrowLeft')ni=(i+tabs.length-1)%tabs.length; if(e.key==='Home')ni=0; if(e.key==='End')ni=tabs.length-1; if(ni!==null){e.preventDefault(); setStage(tabs[ni].dataset.stage); tabs[ni].focus();} });
  });
  const places = {
    campus: ['Library, classrooms, gym, and games','The interviewee feels comfortable studying at the library, being in classes, going to the gym, and attending Texas Tech games. These experiences make her university life feel friendly and engaging.','Interview 01: the participant named these spaces; no separate field observation has been completed.'],
    residence: ['Living arrangements · still unknown','The participant does not clearly state whether she lives on or off campus. Housing may influence belonging, but this first interview cannot answer that question.','Next interview question: How does where you live affect friendships and comfort?'],
    community: ['Organizations and human connections','She names the National Society of Black Engineers, Society of Women Engineers, and African Student Organization. She also praises professors, classmates, and collaborative assignments.','Interview 01: student groups and interpersonal interactions are reported sources of welcome.'],
    lubbock: ['Lubbock beyond campus','She says she rarely goes off campus and feels there are fewer things to do than where she lived previously. Her account tells us more about Texas Tech than daily life in the wider city.','Research gap: explore transportation, cultural spaces, social life, and access beyond TTU.']
  };
  document.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-place]').forEach(b => b.setAttribute('aria-pressed',String(b===button)));
    const d = places[button.dataset.place];
    document.getElementById('placeTitle').textContent=d[0];
    document.getElementById('placeBody').textContent=d[1];
    document.getElementById('placePrompt').textContent=d[2];
  }));
  const selected = new Set();
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    const c=button.dataset.choice;
    if(selected.has(c)) selected.delete(c); else if(selected.size<3)selected.add(c);
    document.querySelectorAll('[data-choice]').forEach(b => b.setAttribute('aria-pressed', String(selected.has(b.dataset.choice))));
    const r=document.getElementById('response');
    if(selected.size===0)r.innerHTML='<strong>Your reflection</strong><p class="reflection-copy">Choose one or more factors to see your reflection.</p>';
    else { const safe=[...selected].map(s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;')); r.innerHTML='<strong>Your reflection</strong><p class="reflection-copy">For you, home begins with <b>'+safe.join(', ')+'</b>. How might a student build those things in an unfamiliar city?</p>'; }
  }));
})();

(() => {
 const data = {
    rituals: ['Rituals · Learning the campus','She mentions studying in the library, going to the gym, attending campus games and events, and being part of group activities. Repeated practices may help a place become familiar.'],
    relationships: ['Relationships · Welcome versus family','She feels welcomed by classmates, professors, and organizations, yet continues to associate Nigeria and Virginia with home and family. This distinction is the most revealing part of her account.'],
    restrictions: ['Restrictions · What we can and cannot infer','She mentions missing family and finding fewer things to do. However, she does not provide enough evidence about discrimination, housing cost, transport, or other restrictions to make claims about them.']
  };
 const box=document.getElementById('lensOutput');
 document.querySelectorAll('[data-lens]').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('[data-lens]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
   const d=data[btn.dataset.lens]; box.replaceChildren();
   const h=document.createElement('h4');h.textContent=d[0];
   const p=document.createElement('p');p.textContent=d[1]; box.append(h,p);
 }));
})();
