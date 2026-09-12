(function(){
  /* ---------- preloader ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.getElementById('preloader');
  const preloaderCount = document.getElementById('preloaderCount');
  if(reduceMotion || !preloader){
    if(preloader) preloader.remove();
  } else {
    document.body.style.overflow = 'hidden';
    let n = 0;
    const countInterval = setInterval(()=>{
      n = Math.min(n + Math.round(8 + Math.random()*14), 99);
      preloaderCount.textContent = String(n).padStart(2,'0');
      if(n >= 99) clearInterval(countInterval);
    }, 90);
    requestAnimationFrame(()=> preloader.classList.add('is-ready'));
    window.addEventListener('load', ()=>{
      setTimeout(()=>{
        clearInterval(countInterval);
        preloaderCount.textContent = '100';
        preloader.classList.add('opening');
        document.body.style.overflow = '';
        setTimeout(()=>{ preloader.classList.add('done'); preloader.remove(); }, 950);
      }, 550);
    });
    // safety fallback in case load event is delayed
    setTimeout(()=>{
      if(preloader.isConnected && !preloader.classList.contains('opening')){
        clearInterval(countInterval);
        preloader.classList.add('opening');
        document.body.style.overflow = '';
        setTimeout(()=>{ preloader.classList.add('done'); preloader.remove(); }, 950);
      }
    }, 3200);
  }

  /* ---------- scroll progress ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    scrollProgress.style.width = (height > 0 ? (scrolled/height)*100 : 0) + '%';
  };
  document.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  /* ---------- custom cursor ---------- */
  const isFinePointer = matchMedia('(pointer:fine)').matches;
  if(!reduceMotion && isFinePointer){
    document.documentElement.classList.add('has-custom-cursor');
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const label = document.getElementById('cursorLabel');
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', (e)=>{
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    (function loop(){
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseleave', ()=>{ dot.classList.add('hidden'); ring.classList.add('hidden'); });
    document.addEventListener('mouseenter', ()=>{ dot.classList.remove('hidden'); ring.classList.remove('hidden'); });

    const setHover = (on, text) => {
      ring.classList.toggle('hover', on);
      label.textContent = on && text ? text : '';
    };
    document.addEventListener('mouseover', (e)=>{
      const target = e.target.closest('a, button, summary, [data-cursor]');
      if(target){ setHover(true, target.dataset.cursor || ''); }
    });
    document.addEventListener('mouseout', (e)=>{
      const target = e.target.closest('a, button, summary, [data-cursor]');
      const related = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('a, button, summary, [data-cursor]') : null;
      if(target && target !== related){ setHover(false); }
    });
  }

  /* ---------- event tracking (GA4-ready) ---------- */
  window.edgewebEvents = window.edgewebEvents || [];
  function trackEvent(name, params){
    window.edgewebEvents.push({ name, params, t: Date.now() });
    if(typeof window.gtag === 'function'){ window.gtag('event', name, params || {}); }
  }
  // Exposed on window because the discovery-modal IIFE further down is a
  // separate top-level closure, not nested inside this one — a bare
  // trackEvent reference there throws ReferenceError (undeclared
  // identifier), it doesn't just evaluate falsy like a missing property
  // would. This silently broke discovery_open/discovery_submit/exit_intent
  // tracking on every page: the throw happened after the visible UI update
  // already ran, so the modal still looked like it worked.
  window.trackEvent = trackEvent;
  document.querySelectorAll('[data-track]').forEach(el=>{
    el.addEventListener('click', ()=> trackEvent(el.dataset.track, { link_text: el.textContent.trim() }));
  });

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = () => {
    burger.classList.remove('open'); burger.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open'); document.body.style.overflow = '';
  };
  burger.addEventListener('click', ()=>{
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- header solid-on-scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- scroll reveals ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold:0.14, rootMargin:'0px 0px -60px 0px' });
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('is-in'));
  }

  /* ---------- magnetic buttons ---------- */
  if(!reduceMotion && matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('mousemove', (e)=>{
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) * 0.28;
        const y = (e.clientY - r.top - r.height/2) * 0.5;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', ()=>{ el.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---------- proof counters ---------- */
  const counters = document.querySelectorAll('.num[data-count]');
  const animateCount = (el)=>{
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.querySelector('span');
    const suffixHTML = suffix ? suffix.outerHTML : '';
    const dur = 1400;
    const start = performance.now();
    const step = (now)=>{
      const p = Math.min((now-start)/dur, 1);
      const eased = 1 - Math.pow(1-p, 3);
      el.innerHTML = Math.round(eased*target) + suffixHTML;
      if(p<1) requestAnimationFrame(step);
    };
    if(reduceMotion){ el.innerHTML = target + suffixHTML; }
    else requestAnimationFrame(step);
  };
  if('IntersectionObserver' in window){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ animateCount(e.target); cio.unobserve(e.target); } });
    }, { threshold:0.5 });
    counters.forEach(c=>cio.observe(c));
  }
  /* ---------- sticky conversion bar ---------- */
  const stickyDesktop = document.getElementById('stickyDesktop');
  if(stickyDesktop){
    const heroEl = document.querySelector('.hero');
    const onStickyScroll = () => {
      const past = !heroEl || window.scrollY > heroEl.offsetHeight * 0.8;
      const nearBottom = (window.innerHeight + window.scrollY) > (document.documentElement.scrollHeight - 200);
      stickyDesktop.classList.toggle('show', past && !nearBottom);
    };
    document.addEventListener('scroll', onStickyScroll, { passive:true });
    onStickyScroll();
  }
  /* ---------- discovery modal ---------- */
  (function(){
    const overlay = document.getElementById('discoveryOverlay');
    if(!overlay) return;
    const closeBtn = document.getElementById('discoveryClose');
    const form = document.getElementById('discoveryForm');
    const steps = Array.from(form.querySelectorAll('.discovery-step'));
    const progressEl = document.getElementById('discoveryProgress');
    const progressDots = Array.from(progressEl.querySelectorAll('span'));
    const backBtn = document.getElementById('discoveryBack');
    const nextBtn = document.getElementById('discoveryNext');
    const answers = { buildType:null, goal:null, details:'', budget:null, timeline:null, name:'', company:'', email:'', phone:'' };
    let stepIndex = 0; // 0-5 = questions, 6 = success
    const totalSteps = 6;

    function openModal(prefill){
      if(prefill && prefill.buildType) selectOption('buildType', prefill.buildType, true);
      document.getElementById('dUtmSource').value = new URLSearchParams(location.search).get('utm_source') || '';
      document.getElementById('dUtmMedium').value = new URLSearchParams(location.search).get('utm_medium') || '';
      document.getElementById('dUtmCampaign').value = new URLSearchParams(location.search).get('utm_campaign') || '';
      document.getElementById('dLandingPage').value = location.pathname;
      document.getElementById('dReferrer').value = document.referrer || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      window.trackEvent && window.trackEvent('discovery_open', {});
    }
    function closeModal(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.addEventListener('click', (e)=>{
      const trigger = e.target.closest('[data-open-discovery]');
      if(trigger){
        e.preventDefault();
        openModal(trigger.dataset.openDiscovery ? { buildType: trigger.dataset.openDiscovery } : null);
      }
    });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

    function renderProgress(){
      progressDots.forEach((d,i)=> d.classList.toggle('done', i <= stepIndex));
    }
    function showStep(idx){
      steps.forEach(s => s.classList.remove('active'));
      const target = idx === totalSteps ? form.querySelector('[data-step="success"]') : steps[idx];
      target.classList.add('active');
      const nav = document.getElementById('discoveryNav');
      nav.style.display = idx === totalSteps ? 'none' : 'flex';
      backBtn.disabled = idx === 0;
      nextBtn.textContent = idx === totalSteps - 1 ? "Let's Build It →" : 'Continue →';
      renderProgress();
    }

    function selectOption(field, value, silent){
      answers[field] = value;
      const group = form.querySelector(`.discovery-options[data-field="${field}"]`);
      if(group){
        Array.from(group.children).forEach(btn => btn.classList.toggle('selected', btn.textContent.trim() === value || btn.textContent.replace(/\s+/g,' ').trim() === value));
      }
      if(!silent) hideError(field);
    }
    form.querySelectorAll('.discovery-options').forEach(group=>{
      const field = group.dataset.field;
      Array.from(group.children).forEach(btn=>{
        btn.addEventListener('click', ()=> selectOption(field, btn.textContent.replace(/\s+/g,' ').trim()));
      });
    });

    function showError(field){
      const el = form.querySelector(`[data-error-for="${field}"]`);
      if(el) el.classList.add('show');
    }
    function hideError(field){
      const el = form.querySelector(`[data-error-for="${field}"]`);
      if(el) el.classList.remove('show');
    }

    function validateCurrentStep(){
      const fieldMap = { 0:'buildType', 1:'goal', 3:'budget', 4:'timeline' };
      if(fieldMap[stepIndex]){
        const f = fieldMap[stepIndex];
        if(!answers[f]){ showError(f); return false; }
        return true;
      }
      if(stepIndex === 2){
        const val = form.querySelector('textarea[name="details"]').value.trim();
        if(val.length < 3){ showError('details'); return false; }
        answers.details = val;
        return true;
      }
      if(stepIndex === 5){
        const name = document.getElementById('dName').value.trim();
        const email = document.getElementById('dEmail').value.trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!name || !emailOk){ showError('contact'); return false; }
        answers.name = name; answers.email = email;
        answers.company = document.getElementById('dCompany').value.trim();
        answers.phone = document.getElementById('dPhone').value.trim();
        return true;
      }
      return true;
    }

    nextBtn.addEventListener('click', ()=>{
      if(!validateCurrentStep()) return;
      if(stepIndex === totalSteps - 1){
        hideError('submit');
        nextBtn.disabled = true;
        nextBtn.textContent = 'Sending…';
        submitLead();
        return;
      }
      stepIndex++;
      showStep(stepIndex);
      window.trackEvent && window.trackEvent('discovery_step_view', { step: stepIndex + 1 });
    });
    backBtn.addEventListener('click', ()=>{
      if(stepIndex === 0) return;
      stepIndex--;
      showStep(stepIndex);
    });

    async function submitLead(){
      const lead = {
        ...answers,
        utm_source: document.getElementById('dUtmSource').value,
        utm_medium: document.getElementById('dUtmMedium').value,
        utm_campaign: document.getElementById('dUtmCampaign').value,
        landing_page: document.getElementById('dLandingPage').value,
        referrer: document.getElementById('dReferrer').value,
        submitted_at: new Date().toISOString()
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...lead,
            source: 'discovery_popup',
            formType: 'project_enquiry'
          })
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        window.edgewebLeads = window.edgewebLeads || [];
        window.edgewebLeads.push(lead);
        window.trackEvent && window.trackEvent('discovery_submit', { build_type: lead.buildType, goal: lead.goal, budget: lead.budget });
        stepIndex = totalSteps;
        showStep(stepIndex);
      } catch (error) {
        console.error('Discovery form email submission failed:', error);
        nextBtn.disabled = false;
        nextBtn.textContent = "Let's Build It →";
        showError('submit');
      }
    }

    window.edgewebOpenDiscovery = openModal;
  })();

})();
