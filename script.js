/* Far From Home: intentionally small interactions. Edit story and transcript in index.html. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // This is a comparison of ONE interviewee's three homes, not a generalization.
  const places = {
    nigeria: {
      label: 'FIRST HOME / COUNTRY OF ORIGIN',
      title: 'Nigeria',
      description: 'She identifies Nigeria as her first home. The interview does not explore its specific places and traditions in depth, so this part of her story is still open for further questions.',
      interpretation: "What this tells me: a place's importance cannot always be measured by how long someone currently spends there."
    },
    virginia: {
      label: 'SECOND HOME / WHERE FAMILY LIVES',
      title: 'Virginia',
      description: 'The student spent about two years in Virginia before moving to Texas. She describes it as her second home and connects that feeling directly to family members who live there.',
      interpretation: 'What this tells me: her sense of home is shaped by relationships, not only by geography.'
    },
    lubbock: {
      label: 'THIRD HOME / CURRENT PLACE OF STUDY',
      title: 'Lubbock',
      description: 'Texas Tech is a place where she feels welcomed. She talks about clubs, games, classes, the gym and library, but she also says she misses her family. She calls this her third home.',
      interpretation: 'What this tells me: finding a community and missing other homes can be true at the same time.'
    }
  };
  const box = document.getElementById('place-story');
  document.querySelectorAll('[data-place]').forEach(button => {
    button.addEventListener('click', () => {
      const item = places[button.dataset.place];
      if (!item || !box) return;
      document.querySelectorAll('[data-place]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      box.replaceChildren();
      const small = document.createElement('p');
      small.className = 'place-small';
      small.textContent = item.label;
      const title = document.createElement('h3');
      title.textContent = item.title;
      const desc = document.createElement('p');
      desc.textContent = item.description;
      const reflection = document.createElement('p');
      reflection.className = 'place-interpretation';
      reflection.textContent = item.interpretation;
      box.append(small, title, desc, reflection);
    });
  });
})();