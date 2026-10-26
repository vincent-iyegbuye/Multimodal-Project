/* Mobile menu: click or use keyboard to navigate */
(() => {
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.getElementById('main-nav');
 if(!toggle||!nav)return;
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}));
})();
