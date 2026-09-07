(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- preloader ---------- */
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
    document.addEventListener('pointerdown', ()=> ring.classList.add('active'));
    document.addEventListener('pointerup', ()=> ring.classList.remove('active'));
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

  /* ---------- capabilities interactive list ---------- */
  const capabilities = [
    {
      name:'Web Development',
      copy:'Corporate sites, high-performance marketing sites and conversion-focused landing pages — built on clean code, not a page-builder plugin stack that slows down the moment you need to change something.',
      tags:['Custom Builds','CMS','E-commerce'],
      cta:{ label:'Build My Website →', href:'/services#web-development' }
    },
    {
      name:'App Development',
      copy:'iOS, Android and cross-platform apps for customers or internal teams — scoped as a real MVP first, so you learn what works before over-building.',
      tags:['iOS & Android','React Native','MVP'],
      cta:{ label:'Build My App →', href:'/services#app-development' }
    },
    {
      name:'Custom Software',
      copy:'Enterprise applications, SaaS platforms, internal tools and the CRM/ERP your business actually needs — plus the APIs and integrations that connect them to everything else you run.',
      tags:['SaaS','CRM / ERP','API Development'],
      cta:{ label:'Build My Solution →', href:'/services#custom-software' }
    },
    {
      name:'AI & Automation',
      copy:'AI agents, chatbots and workflow automation that remove manual work from a specific, measurable process — document review, lead routing, support triage, WhatsApp workflows — rather than AI added for its own sake.',
      tags:['AI Agents','Workflow Automation','WhatsApp Automation'],
      cta:{ label:'Automate My Business →', href:'/services/ai-automation' }
    },
    {
      name:'Digital Marketing',
      copy:'SEO, performance marketing and CRO built on the same data layer as the rest of your stack, so marketing performance and product usage are finally the same conversation.',
      tags:['SEO','Google Ads','Lead Generation'],
      cta:{ label:'Grow My Business →', href:'/services#digital-marketing' }
    },
    {
      name:'Branding & UI/UX',
      copy:'Brand strategy, visual identity and product design systems that hold up once real content, real data and real edge cases hit the screen — not just the first mockup.',
      tags:['Brand Identity','UI/UX','Design Systems'],
      cta:{ label:'Design My Product →', href:'/services#branding-ui-ux' }
    },
    {
      name:'Low-Code / No-Code',
      copy:'Internal tools, rapid MVPs and workflow systems built on low-code platforms when speed matters more than a fully custom build — with a clear path to custom development once you outgrow it.',
      tags:['Rapid MVPs','Internal Tools','Automation Platforms'],
      cta:{ label:'Start a Project →', href:'/services#low-code-no-code' }
    },
    {
      name:'Custom Solutions',
      copy:"If it doesn't fit into a box, we'll build the box. Custom dashboards, booking systems, customer portals, industry-specific software — anything unique that requires technology, design or automation.",
      tags:['Custom Dashboards','Industry Software','Anything Unique'],
      cta:{ label:'Tell Us What You Need →', href:'#discovery', discovery:'Something else' }
    }
  ];

  const capList = document.getElementById('capList');
  const capDetail = document.getElementById('capDetail');

  capabilities.forEach((cap, i)=>{
    const item = document.createElement('div');
    item.className = 'cap-item' + (i===0 ? ' active' : '');
    item.innerHTML = `<span class="idx">${String(i+1).padStart(2,'0')}</span><h3>${cap.name}</h3>`;
    item.addEventListener('click', ()=> setActiveCap(i));
    item.addEventListener('mouseenter', ()=> setActiveCap(i));
    capList.appendChild(item);

    const panel = document.createElement('div');
    panel.className = 'cap-panel' + (i===0 ? ' active' : '');
    panel.dataset.idx = i;
    const ctaAttrs = cap.cta.discovery
      ? `href="#discovery" data-open-discovery="${cap.cta.discovery}" data-track="cta_service_${cap.name.toLowerCase().replace(/[^a-z]+/g,'_')}"`
      : `href="${cap.cta.href}" data-track="cta_service_${cap.name.toLowerCase().replace(/[^a-z]+/g,'_')}"`;
    panel.innerHTML = `
      <p class="eyebrow">${String(i+1).padStart(2,'0')} / 0${capabilities.length}</p>
      <h3 style="font-family:var(--f-display); font-style:italic; font-weight:400; font-size:clamp(24px,2.4vw,32px); color:var(--ink); margin-top:16px;">${cap.name}</h3>
      <p class="body-lg">${cap.copy}</p>
      <div class="cap-tags">${cap.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <a class="cap-cta" ${ctaAttrs}>${cap.cta.label}</a>
    `;
    capDetail.appendChild(panel);
  });

  function setActiveCap(idx){
    capList.querySelectorAll('.cap-item').forEach((el,i)=>el.classList.toggle('active', i===idx));
    capDetail.querySelectorAll('.cap-panel').forEach((el,i)=>el.classList.toggle('active', i===idx));
    setActiveNode(idx);
  }

  /* ---------- hero "Edge" node system (SVG) ---------- */
  const svgHost = document.getElementById('edgeSystem');
  if (!svgHost) {
    // The current hero layout uses a static media card instead of the SVG graph.
    // Skip the legacy node animation when the feature is not present.
  } else {
  const NODES = [
    {name:'Web Development', angle:-95},
    {name:'App Development', angle:-40},
    {name:'Custom Software', angle:10},
    {name:'AI & Automation', angle:55},
    {name:'Digital Marketing', angle:100},
    {name:'Branding & UI/UX', angle:150},
    {name:'Low-Code / No-Code', angle:200},
    {name:'Custom Solutions', angle:255}
  ];
  const VB = 600;
  const CX = VB*0.62, CY = VB*0.5, R = VB*0.34;

  function polar(cx,cy,r,deg){
    const rad = (deg-90) * Math.PI/180;
    return [cx + r*Math.cos(rad), cy + r*Math.sin(rad)];
  }

  let svgEl, nodeEls = [], lineEls = [];

  function buildHero(){
    const pts = NODES.map(n => ({...n, pos: polar(CX,CY,R,n.angle)}));
    const linesSvg = pts.map((n,i)=>{
      const [x,y] = n.pos;
      const midx = CX + (x-CX)*0.5, midy = CY + (y-CY)*0.5;
      return `<path class="link-line" id="line-${i}" d="M ${CX} ${CY} Q ${midx} ${midy} ${x} ${y}" stroke-dasharray="4 200" />`;
    }).join('');

    const nodesSvg = pts.map((n,i)=>{
      const [x,y] = n.pos;
      const labelAnchor = x > CX ? 'start' : (Math.abs(x-CX)<4 ? 'middle' : 'end');
      const labelDx = x > CX ? 16 : (Math.abs(x-CX)<4 ? 0 : -16);
      return `
        <g class="node" id="node-${i}" data-idx="${i}" style="cursor:pointer;">
          <circle class="node-circ" cx="${x}" cy="${y}" r="26"/>
          <circle class="pulse-dot" cx="${x}" cy="${y}" r="2.4"/>
          <text class="node-label" x="${x+labelDx}" y="${y+4}" text-anchor="${labelAnchor}">${n.name}</text>
        </g>`;
    }).join('');

    svgHost.innerHTML = `
      <svg viewBox="0 0 ${VB} ${VB}" preserveAspectRatio="xMidYMid meet">
        <g id="linkGroup">${linesSvg}</g>
        <circle class="core-ring" cx="${CX}" cy="${CY}" r="46"/>
        <circle class="core-ring" cx="${CX}" cy="${CY}" r="60" opacity="0.5"/>
        <g id="coreMark">
          <rect class="core-mark" x="${CX-13}" y="${CY-2}" width="26" height="4" rx="1" transform="rotate(-18 ${CX} ${CY})"/>
          <rect class="core-mark" x="${CX-13}" y="${CY-2}" width="26" height="4" rx="1" transform="rotate(18 ${CX} ${CY})"/>
        </g>
        <g id="nodeGroup">${nodesSvg}</g>
      </svg>
    `;

    svgEl = svgHost.querySelector('svg');
    nodeEls = Array.from(svgHost.querySelectorAll('.node'));
    lineEls = Array.from(svgHost.querySelectorAll('.link-line'));

    nodeEls.forEach(el=>{
      el.addEventListener('mouseenter', ()=> setActiveCap(mapNodeToCap(+el.dataset.idx)));
    });

    // load-in draw sequence
    if(!reduceMotion){
      lineEls.forEach((line,i)=>{
        const len = line.getTotalLength ? line.getTotalLength() : 200;
        line.style.strokeDasharray = len;
        line.style.strokeDashoffset = len;
        line.style.transition = `stroke-dashoffset 1.1s var(--ease) ${0.25 + i*0.07}s`;
        requestAnimationFrame(()=>requestAnimationFrame(()=>{ line.style.strokeDashoffset = 0; }));
      });
      nodeEls.forEach((n,i)=>{
        n.style.opacity = 0;
        n.style.transform = 'scale(0.85)';
        n.style.transformOrigin = 'center';
        n.style.transition = `opacity .6s var(--ease) ${0.5+i*0.07}s, transform .6s var(--ease) ${0.5+i*0.07}s`;
        requestAnimationFrame(()=>requestAnimationFrame(()=>{ n.style.opacity = 1; n.style.transform='scale(1)'; }));
      });
    }

    setActiveNode(0);
  }

  function mapNodeToCap(nodeIdx){
    return nodeIdx; // node order now matches capability order 1:1
  }

  function setActiveNode(capIdx){
    if(!nodeEls.length) return;
    nodeEls.forEach((el,i)=> el.classList.toggle('active', i===capIdx));
  }

  buildHero();
  }

  // gentle parallax on pointer move
  if(!reduceMotion && matchMedia('(pointer:fine)').matches && document.getElementById('edgeSystem')){
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mousemove', (e)=>{
      const r = heroSection.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      if(svgEl){ svgEl.style.transform = `translate(${px*10}px, ${py*10}px)`; svgEl.style.transition = 'transform .3s ease-out'; }
    });
  }

  window.addEventListener('resize', ()=>{ /* svg is viewBox-based, no rebuild needed */ });

})();

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

    let exitIntentShown = false;

    function openModal(prefill, intent){
      if(prefill && prefill.buildType) selectOption('buildType', prefill.buildType, true);
      document.getElementById('dUtmSource').value = new URLSearchParams(location.search).get('utm_source') || '';
      document.getElementById('dUtmMedium').value = new URLSearchParams(location.search).get('utm_medium') || '';
      document.getElementById('dUtmCampaign').value = new URLSearchParams(location.search).get('utm_campaign') || '';
      document.getElementById('dLandingPage').value = location.pathname;
      document.getElementById('dReferrer').value = document.referrer || '';
      overlay.dataset.intent = intent || 'default';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      trackEvent && trackEvent('discovery_open', { intent: intent || 'default' });
    }
    function closeModal(){
      overlay.classList.remove('open');
      overlay.dataset.intent = 'default';
      document.body.style.overflow = '';
      exitIntentShown = false;
    }
    function triggerExitIntent(reason){
      if(exitIntentShown || overlay.classList.contains('open')) return;
      exitIntentShown = true;
      openModal({ buildType: 'Something else' }, 'exit');
      trackEvent && trackEvent('exit_intent', { reason });
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

    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden && !overlay.classList.contains('open')){
        triggerExitIntent('tab_switch');
      }
    });

    document.addEventListener('mouseout', (e)=>{
      if(!e.relatedTarget && e.clientY <= 0){
        triggerExitIntent('mouse_leave_top');
      }
    });

    window.addEventListener('beforeunload', (e)=>{
      if(!overlay.classList.contains('open')){
        e.preventDefault();
        e.returnValue = '';
        triggerExitIntent('before_unload');
      }
    });

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
      trackEvent && trackEvent('discovery_step_view', { step: stepIndex + 1 });
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
        trackEvent && trackEvent('discovery_submit', { build_type: lead.buildType, goal: lead.goal, budget: lead.budget });
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
