import { useEffect, useRef, useState } from 'react';

const photos = {
  hero: 'https://tis.edu.in/_next/static/media/Image%202.0c5295c9.webp',
  campus: 'https://tis.edu.in/_next/static/media/campus.e67b1a0a.png',
  dance: 'https://tis.edu.in/_next/static/media/dance.88843edb.webp',
  sport: 'https://tis.edu.in/_next/static/media/swimming.6fc81e65.webp',
};

function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3 10h13m-5-5 5 5-5 5'} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Reveal({ children, className = '', delay = 0 }) {
  return <div className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>;
}

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const interactiveSelector = 'a, button, input, select, textarea, label, [role="button"]';
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.classList.add('is-visible');
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
          frame = 0;
        });
      }
    };

    const handlePointerOver = (event) => {
      if (event.pointerType === 'mouse' && event.target instanceof Element && event.target.closest(interactiveSelector)) {
        cursor.classList.add('is-hovering');
      }
    };

    const handlePointerOut = (event) => {
      const nextTarget = event.relatedTarget;
      if (event.pointerType === 'mouse' && !(nextTarget instanceof Element && nextTarget.closest(interactiveSelector))) {
        cursor.classList.remove('is-hovering');
      }
    };

    const handlePointerLeave = () => cursor.classList.remove('is-visible', 'is-hovering', 'is-pressed');
    const handlePointerDown = (event) => {
      if (event.pointerType === 'mouse') cursor.classList.add('is-pressed');
    };
    const handlePointerUp = () => cursor.classList.remove('is-pressed');

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={dark ? 'site theme-dark' : 'site'}>
      <CustomCursor />
      <div ref={progressRef} className="reading-progress" />
      <div className="topline">
        <span>Dhoolkot · Dehradun, Uttarakhand</span>
        <a href="tel:+919837983791">Admissions helpline <b>+91 98379 83791</b></a>
      </div>
      <header className="header">
        <a className="brand" href="#home" aria-label="Tulas International School home" onClick={closeMenu}>
          <img src="https://tis.edu.in/_next/static/media/schoolLogo.95f6e121.png" alt="Tulas International School" />
          <span><strong>TULAS</strong><small>INTERNATIONAL SCHOOL</small></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <a href="#story" onClick={closeMenu}>Our story</a>
          <a href="#experience" onClick={closeMenu}>The Tulas life</a>
          <a href="#campus" onClick={closeMenu}>Campus</a>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title="Switch theme">
            <span className="theme-icon">{dark ? '☼' : '☾'}</span><span className="theme-label">{dark ? 'Light' : 'Night'}</span>
          </button>
          <a className="nav-cta" href="https://admission.tis.edu.in/" target="_blank" rel="noreferrer">Explore admissions <Arrow diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A school for the beautifully curious</p>
            <h1>A little more<br />room to <em>become.</em></h1>
            <p className="hero-intro">A place to find your voice, follow a new curiosity, and discover what you’re capable of. Welcome to Tulas International School.</p>
            <div className="hero-actions">
              <a className="button button-red" href="https://admission.tis.edu.in/">Find your place <Arrow /></a>
              <a className="text-link" href="#story">Get to know us <span className="down-arrow">↓</span></a>
            </div>
            <div className="hero-note"><span className="note-star">✳</span><span>Boarding & day school<br /><b>Dehradun, India</b></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src={photos.hero} alt="Students discovering new possibilities at Tulas International School" className="hero-image" /></div>
            <div className="image-caption"><span>Curiosity looks good on you.</span><span className="caption-index">01 / 04</span></div>
            <div className="hero-stamp"><span>GROW<br />YOUR<br />WAY</span><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="circlePath" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" /></defs><text><textPath href="#circlePath">LEARN · GROW · BELONG · SHINE · </textPath></text></svg><b>✳</b></div>
            <div className="hero-scribble" aria-hidden="true">✳</div>
          </div>
          <div className="hero-bottom"><span>01 — 04</span><span className="hero-bottom-rule"/><span>SCROLL TO DISCOVER ↓</span></div>
        </section>

        <section className="intro section-pad" id="story">
          <Reveal className="intro-kicker"><p className="eyebrow">A different kind of growing up</p><span className="section-number">01 / OUR STORY</span></Reveal>
          <div className="intro-content">
            <Reveal><h2>Big on learning.<br /><em>Even bigger on life.</em></h2></Reveal>
            <Reveal delay={100}><div className="intro-aside"><p>Our CBSE curriculum focuses on academic excellence, holistic development, and preparing students to be global leaders. Rooted in Dehradun, Tulas brings that ambition together with the freedom to explore, create, and find your own path.</p><a className="text-link" href="https://tis.edu.in/about-tis/our-history/">More about Tulas <Arrow diagonal /></a></div></Reveal>
          </div>
          <Reveal className="stat-strip" delay={150}>
            <div><strong>2012</strong><span>Year Tulas began<br />its learning journey</span></div>
            <div><strong>16<span>+</span></strong><span>Sports to find<br />your kind of play</span></div>
            <div><strong>6:1</strong><span>Student–teacher<br />ratio</span></div>
            <div><strong>22<span>ac</span></strong><span>Of room to breathe<br />and grow</span></div>
          </Reveal>
        </section>

        <section className="experience section-pad" id="experience">
          <div className="section-heading"><Reveal><p className="eyebrow">The Tulas life</p><h2>There’s more than<br /><em>one way to shine.</em></h2></Reveal><Reveal delay={100}><p className="heading-note">The best school days are made of the things you didn’t know you’d love yet.</p></Reveal></div>
          <div className="experience-grid">
            <Reveal className="experience-card card-large"><img src={photos.dance} alt="A student expressing herself through dance"/><div className="card-overlay"><span className="card-label">01 / FIND YOUR RHYTHM</span><h3>Make space<br />for the arts.</h3><a href="https://tis.edu.in/" aria-label="Discover arts at Tulas"><Arrow diagonal /></a></div></Reveal>
            <Reveal className="experience-card card-small" delay={130}><img src={photos.sport} alt="Students building confidence through sport"/><div className="card-overlay"><span className="card-label">02 / PLAY YOUR WAY</span><h3>Go beyond<br />the sidelines.</h3><a href="https://tis.edu.in/" aria-label="Discover sports at Tulas"><Arrow diagonal /></a></div></Reveal>
            <Reveal className="experience-card card-campus" delay={70}><img src={photos.campus} alt="Green campus at Tulas International School"/><div className="campus-quote"><span>“</span><p>When curiosity leads,<br />every day opens up.</p><small>THE TULAS WAY</small></div></Reveal>
          </div>
        </section>

        <section className="campus section-pad" id="campus">
          <Reveal className="campus-topline"><p className="eyebrow">A little closer to nature</p><span className="section-number">02 / OUR CAMPUS</span></Reveal>
          <Reveal className="campus-feature"><div className="campus-photo"><img src={photos.campus} alt="Open green spaces on the Tulas campus in Dehradun" /></div><div className="campus-copy"><span className="campus-mark">✳</span><h2>Room to<br /><em>look up.</em></h2><p>Set against the foothills in Dehradun, our 22-acre campus gives young minds the space to think freely, move boldly, and feel at home.</p><a className="button button-cream" href="https://tis.edu.in/">Take a closer look <Arrow diagonal /></a><span className="campus-address">DHOOLKOT · DEHRADUN<br />UTTARAKHAND, INDIA</span></div></Reveal>
        </section>

        <section className="closing section-pad">
          <Reveal><p className="eyebrow">Your next chapter starts here</p><h2>Ready for a little<br /><em>more possible?</em></h2><a className="button button-red" href="https://admission.tis.edu.in/">Let’s talk about Tulas <Arrow diagonal /></a></Reveal>
          <div className="closing-doodle" aria-hidden="true">✳</div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home"><img src="https://tis.edu.in/_next/static/media/schoolLogo.95f6e121.png" alt=""/><span><strong>TULAS</strong><small>INTERNATIONAL SCHOOL</small></span></a>
        <p>Dhoolkot, P.O. Selaqui,<br />Chakrata Road, Dehradun 248011</p>
        <a href="tel:+919837983791">+91 98379 83791</a>
        <a href="mailto:info@tis.edu.in">info@tis.edu.in</a>
        <span className="copyright">© 2026 Tulas International School</span>
      </footer>
    </div>
  );
}

export default App;
