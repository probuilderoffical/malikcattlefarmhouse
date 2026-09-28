(() => {
  const header=document.querySelector('[data-header]');
  const toggle=document.querySelector('[data-menu-toggle]');
  const menu=document.querySelector('[data-mobile-menu]');
  const setHeader=()=>header?.classList.toggle('is-scrolled',window.scrollY>8);
  setHeader();
  window.addEventListener('scroll',setHeader,{passive:true});

  const closeMenu=()=>{
    if(!toggle||!menu)return;
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open menu');
    menu.hidden=true;
    document.body.classList.remove('menu-open');
  };
  const openMenu=()=>{
    if(!toggle||!menu)return;
    menu.hidden=false;
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','Close menu');
    document.body.classList.add('menu-open');
  };

  toggle?.addEventListener('click',()=>{
    toggle.getAttribute('aria-expanded')==='true'?closeMenu():openMenu();
  });
  menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});
  window.addEventListener('orientationchange',closeMenu);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

  document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());

  const items=document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -20px'});
    items.forEach(item=>io.observe(item));
  }else{
    items.forEach(item=>item.classList.add('is-visible'));
  }

  const faq=document.querySelector('[data-faq]');
  faq?.querySelectorAll('details').forEach(detail=>{
    detail.addEventListener('toggle',()=>{
      if(!detail.open)return;
      faq.querySelectorAll('details').forEach(other=>{
        if(other!==detail)other.open=false;
      });
    });
  });

  const embed=document.querySelector('[data-facebook-embed]');
  const frame=document.querySelector('[data-facebook-frame]');
  let timer;
  const syncFacebook=()=>{
    if(!embed||!frame)return;
    const raw=Math.floor(embed.getBoundingClientRect().width);
    if(raw<=0)return;
    const width=Math.max(260,Math.min(500,raw));
    const page=frame.dataset.pageUrl;
    const src='https://www.facebook.com/plugins/page.php?href='+encodeURIComponent(page)
      +'&tabs=timeline&width='+width
      +'&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false';
    if(frame.dataset.currentWidth!==String(width)){
      frame.dataset.currentWidth=String(width);
      frame.width=width;
      frame.style.width=width+'px';
      frame.style.maxWidth='100%';
      frame.src=src;
    }
  };
  syncFacebook();
  if('ResizeObserver' in window&&embed){
    new ResizeObserver(()=>{
      clearTimeout(timer);
      timer=setTimeout(syncFacebook,80);
    }).observe(embed);
  }else{
    window.addEventListener('resize',()=>{
      clearTimeout(timer);
      timer=setTimeout(syncFacebook,120);
    });
  }
})();