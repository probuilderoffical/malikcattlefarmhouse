(() => {
  const PHOTO = {
    hero: 'https://images.unsplash.com/photo-1761688057304-3b63f507ee3e?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=2400',
    land: 'https://images.unsplash.com/photo-1752193945640-fea56ff08d18?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=2400',
    farmhouse: 'https://images.unsplash.com/photo-1761013320045-d29e4f10bcbc?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=2400',
    cattle: 'https://images.unsplash.com/photo-1666878125618-ed3dddd1ab36?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=2400'
  };

  const style = document.createElement('style');
  style.id = 'malik-mobile-media-fixes';
  style.textContent = `
    .brand__mark,.source-card__logo{background:#F3EBDD!important}
    .brand__mark{width:54px!important;height:54px!important;border-radius:12px!important;padding:2px!important}
    .brand__mark img,.source-card__logo img{object-fit:contain!important;background:#F3EBDD!important;width:100%!important;height:100%!important;display:block!important}
    .source-card__logo{width:58px!important;height:58px!important;border-radius:14px!important;padding:2px!important}
    .mobile-menu[hidden]{display:none!important}
    @media(max-width:900px){
      .site-header{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
      .mobile-menu{position:absolute!important;top:100%!important;left:0!important;right:0!important;bottom:auto!important;height:calc(100dvh - 70px)!important;z-index:140!important;overflow:auto!important;overscroll-behavior:contain!important}
      .mobile-menu:not([hidden]){display:block!important}
      .hero{isolation:isolate!important;min-height:max(640px,calc(100svh - 70px))!important}
      .hero__media{z-index:0!important;display:block!important;visibility:visible!important;opacity:1!important}
      .hero__media img{display:block!important;visibility:visible!important;opacity:1!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:54% center!important}
      .hero__shade{z-index:1!important}.hero__content{z-index:2!important;position:relative!important}
    }
    @media(max-width:760px){
      .brand__mark{width:44px!important;height:44px!important;border-radius:10px!important}
      .header__inner{height:70px!important}.hero__content{padding-top:145px!important;padding-bottom:38px!important}
    }
    @media(max-width:430px){
      .hero{min-height:max(650px,calc(100svh - 70px))!important}.hero__content{padding-top:135px!important}.hero h1{font-size:clamp(40px,12.2vw,54px)!important}
    }
  `;
  document.head.appendChild(style);

  // Always use the user-supplied official logo from the local JPG asset.
  document.querySelectorAll('.brand__mark img, .source-card__logo img').forEach((img) => {
    img.src = 'assets/images/official-logo.jpg?v=1';
    img.alt = 'Malik Cattle & Farmhouse official logo';
    img.removeAttribute('referrerpolicy');
    img.removeAttribute('onerror');
    img.style.display = 'block';
  });

  const heroImage = document.querySelector('.hero__media img');
  if (heroImage) { heroImage.src = PHOTO.hero; heroImage.removeAttribute('loading'); heroImage.fetchPriority = 'high'; }
  document.querySelectorAll('.plot-card__image img').forEach((img, index) => { img.src = index === 3 ? PHOTO.hero : PHOTO.land; });
  const readyImage = document.querySelector('.ready-photo img');
  if (readyImage) readyImage.src = PHOTO.farmhouse;
  const galleryImages = document.querySelectorAll('.gallery-card img');
  if (galleryImages[0]) galleryImages[0].src = PHOTO.farmhouse;
  if (galleryImages[1]) galleryImages[1].src = PHOTO.cattle;
  if (galleryImages[2]) galleryImages[2].src = PHOTO.land;
  const visitImage = document.querySelector('.visit-photo img');
  if (visitImage) visitImage.src = PHOTO.land;

  document.querySelectorAll('.image-label, .gallery-card figcaption span').forEach((node) => {
    if (/concept visual/i.test(node.textContent || '')) node.textContent = 'Reference photo';
  });
  const heroNote = document.querySelector('.hero__note');
  if (heroNote) heroNote.textContent = '*Availability changes. Reference photography is illustrative and is not proof of a specific Malik plot or amenity.';

  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  setHeader(); window.addEventListener('scroll', setHeader, { passive: true });

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    if (!toggle || !menu) return;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
  };
  toggle?.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
  window.addEventListener('orientationchange', closeMenu);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: '0px 0px -20px' });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  const faq = document.querySelector('[data-faq]');
  faq?.querySelectorAll('details').forEach((detail) => detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    faq.querySelectorAll('details').forEach((other) => { if (other !== detail) other.open = false; });
  }));

  const embed = document.querySelector('[data-facebook-embed]');
  const frame = document.querySelector('[data-facebook-frame]');
  let resizeTimer;
  const syncFacebook = () => {
    if (!embed || !frame) return;
    const width = Math.max(260, Math.min(500, Math.floor(embed.getBoundingClientRect().width)));
    if (!width) return;
    const page = frame.dataset.pageUrl;
    const src = 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent(page) + '&tabs=timeline&width=' + width + '&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false';
    if (frame.dataset.currentWidth !== String(width)) {
      frame.dataset.currentWidth = String(width);
      frame.width = width;
      frame.style.width = width + 'px';
      frame.style.maxWidth = '100%';
      frame.src = src;
    }
  };
  syncFacebook();
  if ('ResizeObserver' in window && embed) {
    new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(syncFacebook, 80); }).observe(embed);
  } else window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(syncFacebook, 120); });
})();