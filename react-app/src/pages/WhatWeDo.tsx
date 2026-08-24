import { Link } from 'react-router-dom';
import { SeoHead } from '../components/ui/SeoHead';
import { PageHero, CtaBand } from '../components/ui/PageHero';
import { ArrowIcon, Icon } from '../components/ui/Icon';
import { DIVISIONS, DIVISION_ORDER } from '../data/divisions';

const ACCENT_COLOURS = ['', 'orange', 'teal', '', 'orange'];

export default function WhatWeDo() {
  return (
    <>
      <SeoHead
        title="What we do"
        description="Five programme divisions covering DPI security assurance, open-source and software trust, policy and evidence, skills and implementation, and public-interest cyber support for civil society."
        canonical="what-we-do.html"
      />

      <PageHero
        eyebrow="What we do"
        title="Five programme divisions, one protection mission"
        lede="Each division addresses a distinct layer of the digital trust problem — from infrastructure assurance through to the open-source components underneath it, to citizen safety, policy evidence, skills and practical cyber support for civil society."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'What we do' }]}
      />

      <section className="section">
        <div className="container">
          {DIVISION_ORDER.map((key, idx) => {
            const d = DIVISIONS[key];
            const isAlt = idx % 2 === 1;
            return (
              <div key={key} className={`split split--even division-row${isAlt ? ' split--reverse' : ''}`} style={{ alignItems: 'center', marginBottom: '5rem' }}>
                <div data-reveal="">
                  <span className={`icon-badge${ACCENT_COLOURS[idx] ? ` icon-badge--${ACCENT_COLOURS[idx]}` : ''}`}>
                    <Icon name={d.icon as any} />
                  </span>
                  <span className="mono-label mt-4 d-block">{d.num} · {d.phase}</span>
                  <h2 className="balance mt-3">{d.name}</h2>
                  <p className="lede mt-4">{d.strap}</p>
                  <p className="text-muted mt-4">{d.purpose}</p>
                  <div className="cluster mt-6">
                    <Link className="btn btn--primary" to={`/divisions/${d.slug}`}>Division detail<ArrowIcon /></Link>
                  </div>
                </div>
                <figure className="media-frame" data-reveal="">
                  <img src={`/assets/img/photos/${d.photo[0]}`} alt={d.photo[1]} width={1200} height={750} loading="lazy" decoding="async" />
                </figure>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <div className="split">
            <div data-reveal="">
              <p className="eyebrow eyebrow--teal">The protection stack</p>
              <h2 className="balance">How the divisions work together</h2>
            </div>
            <div className="flow" data-reveal="">
              <p className="pretty">The five divisions are not independent silos. Citizen safety work reveals harm patterns that feed the assurance lab's research questions. Assurance findings shape the policy briefs the evidence centre publishes. Skills Academy courses train the practitioners who carry lab and evidence-centre methods into government. The Cyber and Digital Safety Centre provides practical support to the civil society organisations that report on citizen harm.</p>
              <p className="pretty">The result is a protection stack that moves from infrastructure to citizen, from research to practice, and from national systems to the open-source components underneath them.</p>
              <div className="mt-6 cluster">
                <Link className="btn btn--light" to="/programmes">See the launch programmes<ArrowIcon /></Link>
                <Link className="btn btn--outline-light" to="/about">About the Foundation<ArrowIcon /></Link>
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
