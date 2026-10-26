/* Far From Home — small interactions for a documentary web essay.
 * Update your source material in index.html. Keep this script free of research claims.
 */
(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* This comparison shows the participant's three stated places. It does not
     claim that these meanings are shared by other international students. */
  const placeData = {
    nigeria: {
      label: 'FIRST HOME / COUNTRY OF ORIGIN', title: 'Nigeria',
      description: 'She identifies Nigeria as her first home. The interview does not explore its specific places and traditions in depth, so this part of her story is still open for further questions.',
      reflection: 'What this tells me: a place\'s importance cannot always be measured by how long someone currently spends there.'
    },
    virginia: {
      label: 'SECOND HOME / WHERE FAMILY LIVES', title: 'Virginia',
      description: 'The student spent about two years in Virginia before moving to Texas. She describes it as her second home and connects that feeling directly to family members who live there.',
      reflection: 'What this tells me: her sense of home is shaped by relationships, not only by geography.'
    },
    lubbock: {
      label: 'THIRD HOME / CURRENT PLACE OF STUDY', title: 'Lubbock',
      description: 'Texas Tech is a place where she feels welcomed. She talks about clubs, games, classes, the gym and library, but she also says she misses her family. She calls this her third home.',
      reflection: 'What this tells me: finding a community and missing other homes can be true at the same time.'
    }
  };
  const placeStory = document.getElementById('place-story');
  document.querySelectorAll('[data-place]').forEach(button => {
    button.addEventListener('click', () => {
      const entry = placeData[button.dataset.place];
      if (!entry || !placeStory) return;
      document.querySelectorAll('[data-place]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      // Only constant strings defined by the author; never read visitor input as HTML.
      placeStory.innerHTML = '<p class="place-small">' + entry.label + '</p>' +
        '<h3>' + entry.title + '</h3><p>' + entry.description + '</p>' +
        '<p class="place-interpretation">' + entry.reflection + '</p>';
    });
  });
})();

// Progressive audio enhancement: show Interview 02 player only when its media is available.
(() => {
  const audio=document.getElementById('interview-02-audio');
  const pending=document.getElementById('audio-02-pending');
  if (!audio || !pending) return;
  audio.addEventListener('loadedmetadata',()=>{audio.hidden=false;pending.hidden=true});
  audio.addEventListener('error',()=>{audio.hidden=true;pending.hidden=false});
  audio.load();
})();


// Show interview 04's audio controls only after its recording is publicly available.
(() => {
 const player=document.getElementById('interview-04-audio');
 const placeholder=document.getElementById('audio-04-pending');
 if(!player||!placeholder) return;
 const ready=()=>{player.hidden=false;placeholder.hidden=true;};
 const missing=()=>{player.hidden=true;placeholder.hidden=false;};
 player.addEventListener('loadedmetadata',ready);
 player.addEventListener('error',missing);
 player.load();
})();

/* Four equally weighted participant perspectives, based on interviews. */
(() => {
 const entries = {
  p1: {tag:"PARTICIPANT 01 / THREE HOMES",title:"Nigeria, Virginia, Lubbock",body:"She names Nigeria as her first home, Virginia as her second and Lubbock as her third. She feels welcomed at Texas Tech, yet family and close friendships elsewhere still shape what home means to her.",detail:"She appreciates classes, events, the gym and the library, but says she does not have family or close friends in Lubbock.",reflection:"My reading: a person can build a new home without losing the meaning of earlier ones.",transcript:"full-transcript-01"},
  p2: {tag:"PARTICIPANT 02 / DEEPER CONNECTIONS",title:"Welcomed, but not yet home",body:"He describes Texas Tech as friendly and says he enjoys his time here. Still, he does not yet call Lubbock his second home, because the deep connections that would give it that meaning have not formed.",detail:"He initially struggled to make friends. Hackathons, church and library workshops help him participate, while family in Houston remains especially important.",reflection:"My reading: access to welcoming events and the feeling of being deeply attached are related, but not identical.",transcript:"full-transcript-02"},
  p3: {tag:"PARTICIPANT 03 / TIME AND FRIENDSHIP",title:"A home built with people",body:"After several years at Texas Tech, she describes friends and church as a community that makes Lubbock familiar. Dallas remains important in how she thinks about a second home; her answer resists an easy yes or no.",detail:"She advises newcomers not to rush into groups simply to fit in. She also describes difficulty navigating Lubbock without driving.",reflection:"My reading: longer residence can create familiar routines, but the relationships within those routines matter more than a number of years.",transcript:"full-transcript-03"},
  p4: {tag:"PARTICIPANT 04 / CULTURAL COMMUNITY",title:"The people, not the city",body:"She distinguishes Lubbock as a physical place from the community that welcomes her. Church and familiar cultural relationships can feel like home even though she does not describe the city itself in the same way.",detail:"She describes cultural differences in friendship, support from her campus workplace, Society of Women Engineers events, and the practical importance of buses.",reflection:"My reading: belonging can be created within a city without extending to every part of life in that city.",transcript:"full-transcript-04"}
 };
 const target=document.getElementById("place-story");
 const buttons=[...document.querySelectorAll("[data-participant]")];
 if(!target||buttons.length!==4)return;
 for(const btn of buttons){btn.addEventListener("click",()=>{
  const d=entries[btn.dataset.participant];if(!d)return;
  for(const b of buttons)b.setAttribute("aria-pressed",String(b===btn));
  target.replaceChildren();
  const line=(tag,txt,cls)=>{const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=txt;return el;};
  target.append(line("p",d.tag,"place-small"),line("h3",d.title),line("p",d.body));
  const ev=document.createElement("div");ev.className="home-evidence";ev.append(line("span","A detail from the interview","home-evidence-label"),line("p",d.detail));target.append(ev,line("p",d.reflection,"place-interpretation"));
  const a=document.createElement("a");a.className="home-transcript-link";a.href="#"+d.transcript;a.textContent="Read Interview "+d.transcript.slice(-2);target.append(a);
 });}
})();
