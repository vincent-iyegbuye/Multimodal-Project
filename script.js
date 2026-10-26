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
