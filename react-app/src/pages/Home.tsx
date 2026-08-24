import { Link } from 'react-router-dom';
import { SeoHead } from '../components/ui/SeoHead';
import { HeroCanvas } from '../components/ui/HeroCanvas';
import { CtaBand } from '../components/ui/PageHero';
import { ArrowIcon, Icon } from '../components/ui/Icon';
import { DIVISION_ORDER, DIVISIONS } from '../data/divisions';

const ICON_COLOURS = ['', 'orange', 'teal', '', 'orange'];

export default function Home() {
  return (
    <>
      <SeoHead
        title="Digital Trust Futures Foundation — Safe infrastructure. Trusted technology. Inclusive digital futures."
        description="An independent, non-profit public-benefit organisation strengthening the safety, security, inclusion and trustworthiness of digital public infrastructure, digital public goods, open-source technology and AI-enabled public services across Africa and the Global South."
        canonical="index.html"
      />

      {/* ── Hero ── */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero-photo" aria-hidden={true} />
        <div className="hero-grain" aria-hidden={true} />
        <div className="container">
          <div className="hero-inner">
            <p className="eyebrow">Independent · Non-profit · Public interest</p>
            <h1>Digital public infrastructure is only as good as the <span className="mark">protection</span> around it.</h1>
            <p className="hero-lede">
              Digital Trust Futures Foundation is an independent, non-profit public-benefit organisation
              strengthening the safety, security, inclusion and trustworthiness of digital public infrastructure,
              digital public goods, open-source technology and AI-enabled public services — with a focus on
              Africa and the wider Global South.
            </p>
            <div className="hero-actions">
              <Link className="btn btn--accent btn--lg" to="/get-involved#partner">Partner with us<ArrowIcon /></Link>
              <Link className="btn btn--outline-light btn--lg" to="/what-we-do">Explore our work<ArrowIcon /></Link>
            </div>
          </div>
          <div className="hero-triad">
            <div className="triad-item">
              <p className="triad-key"><span className="pill-dot" />Security</p>
              <p>Protects the system. Infrastructure withstands intentional harm, fraud, insider abuse and adversarial pressure.</p>
            </div>
            <div className="triad-item">
              <p className="triad-key"><span className="pill-dot" />Safety</p>
              <p>Protects the citizen. People are shielded from exclusion, service failure, data misuse and opaque decisions.</p>
            </div>
            <div className="triad-item">
              <p className="triad-key"><span className="pill-dot" />Trust</p>
              <p>Sustains adoption. Digital services become meaningful, sustained access rather than a fragile registration count.</p>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden={true}><span /></div>
      </section>

      {/* ── Positioning ── */}
      <section className="section section--tight" id="positioning">
        <div className="container">
          <div className="split split--sticky">
            <div data-reveal="">
              <p className="eyebrow">Positioning</p>
              <h2 className="balance">The missing protection layer between digital public infrastructure and the people who depend on it</h2>
            </div>
            <div className="flow" data-reveal="">
              <p className="lede pretty">Identity systems, payment rails, data-exchange platforms and social protection systems have
                become the rails through which citizens prove who they are, receive money, access benefits, consent to data
                sharing and participate in the digital economy. The safeguards required to protect them have not kept pace.</p>
              <p className="text-muted">The Foundation is the independent, non-commercial digital trust partner for governments,
                digital public goods and civil society — bringing evidence-based cybersecurity, safety and AI-governance
                assurance to public-interest digital infrastructure, and releasing its tools, research and frameworks as
                reusable public goods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divisions ── */}
      <section className="section band-dark band-dark--grid">
        <div className="container">
          <div className="section-head section-head--center" data-reveal="">
            <p className="eyebrow eyebrow--center eyebrow--teal">Programme divisions</p>
            <h2 className="balance">Five areas of work, one protection mission</h2>
            <p style={{ maxWidth: '64ch', margin: '0 auto' }}>
              From infrastructure assurance to citizen safety, each division addresses a distinct layer of the
              digital trust problem — and together they cover the full stack from national DPI through to the
              open-source components underneath it.
            </p>
          </div>
          <div className="grid grid-3 mt-8" data-reveal-stagger="">
            {DIVISION_ORDER.map((key, i) => {
              const d = DIVISIONS[key];
              return (
                <article key={key} className="division-card">
                  <div className={`icon-badge${ICON_COLOURS[i] ? ` icon-badge--${ICON_COLOURS[i]}` : ''}`}>
                    <Icon name={d.icon as any} />
                  </div>
                  <span className="mono-label mt-4">{d.num}</span>
                  <h3 className="card-title mt-2">{d.name}</h3>
                  <p>{d.strap}</p>
                  <Link className="link-arrow mt-4" to={`/divisions/${d.slug}`}>{d.short}<ArrowIcon /></Link>
                </article>
              );
            })}
          </div>
          <div className="mt-8 cluster" data-reveal="">
            <Link className="btn btn--light" to="/what-we-do">All divisions<ArrowIcon /></Link>
          </div>
        </div>
      </section>

      {/* ── Why now ── */}
      <section className="section">
        <div className="container">
          <div className="split split--sticky">
            <div data-reveal="">
              <p className="eyebrow">Why now</p>
              <h2 className="balance">DPI adoption is accelerating faster than the safeguards capacity around it</h2>
            </div>
            <div className="flow" data-reveal="">
              <p className="text-muted">More than 50 countries are deploying or scaling digital public infrastructure — identity stacks,
                instant payment rails, data-exchange platforms, social protection registries — often on donor-supported
                timelines and without the independent assurance capacity required to confirm they are safe to carry
                population-scale trust.</p>
              <p className="text-muted">The open-source components underneath those systems are frequently maintained by small,
                under-resourced teams without dedicated security funding. A single weak dependency shared by many national
                systems can create compounding, cross-border risk.</p>
              <p className="text-muted">Commercial assurance is available, but at a price point and with a conflict-of-interest
                structure that makes it unsuitable for public-interest work. The Foundation was created to close that gap.</p>
              <div className="mt-6 cluster">
                <Link className="btn btn--primary" to="/about">About the Foundation<ArrowIcon /></Link>
                <Link className="btn btn--ghost" to="/programmes">See the programmes<ArrowIcon /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="stat-grid" data-reveal-stagger="">
            <div className="stat-item">
              <span className="stat-num">50+</span>
              <span className="stat-label">Countries deploying or scaling DPI</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">$billions</span>
              <span className="stat-label">Annual donor investment in digital infrastructure</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">Dozens</span>
              <span className="stat-label">DPGs with no dedicated security funding</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">0</span>
              <span className="stat-label">Independent, nonprofit DPI trust organisations in the Global South</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured programmes ── */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal="">
            <p className="eyebrow">Launch programmes</p>
            <h2 className="balance">Three mutually reinforcing programmes</h2>
          </div>
          <div className="grid grid-3 mt-7" data-reveal-stagger="">
            <article className="prog-card prog-card--1">
              <span className="prog-index">1</span>
              <h3>Citizen Digital Safety and DPI Trust Programme</h3>
              <p>Community safety toolkits, awareness, user protection learning and citizen harm reporting.</p>
              <Link className="link-arrow mt-4" to="/programmes#citizen-safety">Programme detail<ArrowIcon /></Link>
            </article>
            <article className="prog-card prog-card--2">
              <span className="prog-index">2</span>
              <h3>DPI Security Assurance and Resilience Lab</h3>
              <p>Independent public-interest assessment of identity, payment, data exchange, DPG and AI risks.</p>
              <Link className="link-arrow mt-4" to="/programmes#assurance-lab">Programme detail<ArrowIcon /></Link>
            </article>
            <article className="prog-card prog-card--3">
              <span className="prog-index">3</span>
              <h3>Global South Digital Trust Coordination and Cyber Resilience Network</h3>
              <p>Roundtables, shared playbooks, knowledge hub, cross-border learning and civil-society readiness.</p>
              <Link className="link-arrow mt-4" to="/programmes#coordination-network">Programme detail<ArrowIcon /></Link>
            </article>
          </div>
          <div className="mt-8" data-reveal="">
            <Link className="btn btn--ghost" to="/programmes">Full programme detail<ArrowIcon /></Link>
          </div>
        </div>
      </section>

      {/* ── Open source ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="split split--even" style={{ alignItems: 'center' }}>
            <figure className="media-frame" data-reveal="">
              <img src="/assets/img/photos/fibre-optic.jpg" alt="Close-up of fibre-optic cables carrying data." width={1200} height={750} loading="lazy" decoding="async" />
            </figure>
            <div className="flow" data-reveal="">
              <p className="eyebrow">Open source</p>
              <h2 className="balance">Securing the shared infrastructure that many governments quietly depend on</h2>
              <p className="text-muted">The Foundation supports digital public goods — the open-source components underneath national
                identity, payment, health and data systems — with security baseline reviews, SBOM support, coordinated
                vulnerability disclosure and long-term sustainability planning.</p>
              <div className="mt-6">
                <Link className="btn btn--ghost" to="/open-source">Open-source work<ArrowIcon /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Independent assurance is only useful if it is funded to stay independent."
        text="The Foundation welcomes partnership, funding and programme enquiries from governments, digital public goods initiatives, donors and social investment partners."
      />
    </>
  );
}
