(() => {
  const header=document.querySelector('[data-header]');
  const toggle=document.querySelector('[data-menu-toggle]');
  const menu=document.querySelector('[data-mobile-menu]');
  const closeMenu=()=>{if(!toggle||!menu)return;toggle.setAttribute('aria-expanded','false');menu.hidden=true;document.body.classList.remove('menu-open')};
  const setHeader=()=>header?.classList.toggle('is-scrolled',scrollY>8);setHeader();addEventListener('scroll',setHeader,{passive:true});
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));menu.hidden=open;document.body.classList.toggle('menu-open',!open)});
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));addEventListener('resize',()=>{if(innerWidth>900)closeMenu()});addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());
  const items=document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -20px'});items.forEach(i=>io.observe(i))}else items.forEach(i=>i.classList.add('is-visible'));
  const faq=document.querySelector('[data-faq]');faq?.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)faq.querySelectorAll('details').forEach(o=>{if(o!==d)o.open=false})}));
  const embed=document.querySelector('[data-facebook-embed]');const frame=document.querySelector('[data-facebook-frame]');
  const syncFacebook=()=>{if(!embed||!frame)return;const width=Math.max(280,Math.min(500,Math.floor(embed.clientWidth)));const page=frame.dataset.pageUrl;const src='https://www.facebook.com/plugins/page.php?href='+encodeURIComponent(page)+'&tabs=timeline&width='+width+'&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false';if(frame.dataset.currentWidth!==String(width)){frame.dataset.currentWidth=String(width);frame.width=width;frame.src=src}};
  syncFacebook();let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(syncFacebook,140)});
})();
