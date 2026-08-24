import { SeoHead } from '../components/ui/SeoHead';
import { PageHero, CtaBand } from '../components/ui/PageHero';

const RESOURCES = [
  { title: 'DPI Security Assurance Framework and maturity model', rtype: 'Framework', tags: 'dpi ai identity payments', desc: "The Foundation's core assurance method: a maturity model and structured review approach for citizen-facing digital public infrastructure.", status: 'development', div: 'Assurance Lab' },
  { title: 'DPI Trust Assessment Toolkit', rtype: 'Toolkit', tags: 'dpi identity payments', desc: 'A practical toolkit for conducting a DPI trust readiness assessment, including scoping, evidence requests, interview guides and scoring.', status: 'development', div: 'DPI Trust Lab' },
  { title: 'Open-Source Project Security Baseline', rtype: 'Baseline', tags: 'opensource', desc: 'A minimum security baseline for public-interest open-source projects: repository hardening, release integrity, dependency handling and disclosure readiness.', status: 'development', div: 'Open Digital Commons' },
  { title: 'DPI/DPG supply chain security checklist', rtype: 'Checklist', tags: 'opensource dpi', desc: 'A checklist covering provenance, SBOM readiness, dependency depth, patching obligations and shared exposure across national deployments.', status: 'development', div: 'Assurance Lab' },
  { title: 'Citizen digital safety toolkit', rtype: 'Toolkit', tags: 'citizen', desc: 'Plain-language materials on scams, social engineering, safe payments, identity protection, consent, privacy, grievance channels and fraud reporting.', status: 'development', div: 'Citizen Safety Programme' },
  { title: 'Responsible vulnerability disclosure guidance for public-interest systems', rtype: 'Guidance', tags: 'opensource dpi', desc: 'How to receive, triage, coordinate and publish vulnerability information when the affected system serves citizens who cannot switch providers.', status: 'development', div: 'Assurance Lab' },
  { title: 'DPG Software Trust Scorecard', rtype: 'Scorecard', tags: 'opensource', desc: 'A comparable, published measure of software trust practice for digital public goods carrying national dependency.', status: 'planned', div: 'Open Digital Commons' },
  { title: 'DPI AI Governance Checklist', rtype: 'Checklist', tags: 'ai dpi', desc: 'Accountability, oversight, bias, explainability and appeal checks for AI used in identity verification, fraud detection and service delivery.', status: 'planned', div: 'DPI Trust Lab' },
  { title: 'Digital Identity and Credential Threat Model', rtype: 'Threat model', tags: 'identity', desc: 'A reference threat model for identity systems and verifiable credentials, covering enrolment, authentication, revocation and recovery.', status: 'planned', div: 'DPI Trust Lab' },
  { title: 'Inclusive Payment Security Guide', rtype: 'Guide', tags: 'payments', desc: 'Fraud, mule flows, dispute handling, liability allocation and inclusion safeguards for instant and interoperable payment systems.', status: 'planned', div: 'DPI Trust Lab' },
  { title: 'AI and fraud risk module for citizen-facing DPI', rtype: 'Module', tags: 'ai payments', desc: 'An assessment module addressing synthetic identity, adversarial inputs, model governance and AI incident response in citizen-facing services.', status: 'planned', div: 'Assurance Lab' },
  { title: 'Scam escalation and user recourse playbook', rtype: 'Playbook', tags: 'citizen', desc: 'Cross-institution guidance for escalating scams and resolving user recourse where responsibility is split across operators, banks and regulators.', status: 'planned', div: 'Coordination Network' },
  { title: 'Annual DPI Trust Report', rtype: 'Report', tags: 'policy dpi', desc: "The Foundation's flagship annual publication on DPI trust conditions, drawing on assessments, network evidence and comparative research.", status: 'planned', div: 'Policy and Evidence Centre' },
  { title: 'Nonprofit cyber maturity self-assessment', rtype: 'Self-assessment', tags: 'citizen', desc: "A right-sized maturity path for civil-society organisations that does not assume enterprise budgets or staffing.", status: 'planned', div: 'Cyber and Digital Safety Centre' },
];

const STATUS_LABEL: Record<string, string> = { development: 'In development', planned: 'Planned', live: 'Published' };

const FILTERS = [
  ['all', 'All resources'], ['dpi', 'DPI safeguards'], ['identity', 'Digital identity'],
  ['payments', 'Payments'], ['opensource', 'Open source'], ['ai', 'AI governance'],
  ['citizen', 'Citizen safety'], ['policy', 'Policy & evidence'],
];

export default function Research() {
  return (
    <>
      <SeoHead
        title="Research and resources"
        description="The Foundation's full library of frameworks, toolkits, checklists, briefs and reports — all released as open public goods. Filter by theme and see the honest publication status of every item."
        canonical="research.html"
      />

      <PageHero
        eyebrow="Research and resources"
        title="Open evidence, open methods, open tools"
        lede="Every framework, checklist, toolkit and brief the Foundation produces is released as a reusable public good under an open licence. This library shows the full programme and the honest status of each item — nothing is listed as published until it is."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Research and resources' }]}
        extra={
          <nav className="section-nav" data-section-nav="" aria-label="On this page">
            <a href="#library">Resource library</a><a href="#toolkits">Toolkit programme</a>
            <a href="#licensing">Licensing</a><a href="#citing">Citing our work</a>
          </nav>
        }
      />

      <section className="section" id="library">
        <div className="container">
          <div className="section-head section-head--wide" data-reveal="">
            <p className="eyebrow">Library</p>
            <h2 className="balance">Publications, briefs, toolkits and frameworks</h2>
            <p style={{ maxWidth: '66ch' }}>Filter by theme. Each record shows its type, the division that owns it, and whether it is published, in development or planned.</p>
          </div>
          <div data-filter-scope="">
            <div className="filter-bar" role="group" aria-label="Filter resources by theme">
              {FILTERS.map(([k, label]) => (
                <button key={k} className="chip" type="button" data-filter={k} aria-pressed={k === 'all' ? 'true' : 'false'}>
                  {label}
                </button>
              ))}
              <span className="filter-count" data-filter-count="" aria-live="polite" />
            </div>
            <div className="res-list">
              {RESOURCES.map((r) => (
                <article key={r.title} className="res-item" data-tags={r.tags}>
                  <div className="res-meta">{r.rtype}<br />{r.div}</div>
                  <div>
                    <h3 className="res-title">{r.title}</h3>
                    <p className="res-desc">{r.desc}</p>
                  </div>
                  <div className="res-status"><span className={`status status--${r.status}`}>{STATUS_LABEL[r.status]}</span></div>
                </article>
              ))}
            </div>
            <p className="empty-state is-hidden" data-filter-empty="">No resources match this filter yet.</p>
          </div>
          <div className="note mt-7" data-reveal=""><strong>On honesty in resource libraries.</strong> A digital trust organisation that overstates its own outputs has already failed its first test. Status labels on this page are maintained against actual publication, and download links appear only once a resource is genuinely available.</div>
        </div>
      </section>

      <section className="section section--alt" id="toolkits">
        <div className="container">
          <div className="split split--even" style={{ alignItems: 'center' }}>
            <div className="flow" data-reveal="">
              <p className="eyebrow">Toolkit programme</p>
              <h2 className="balance">Methods designed to be handed over</h2>
              <p className="text-muted">A toolkit is only a public good if a government team, a maintainer or a community organisation can pick it up and use it without the Foundation in the room. Each toolkit is therefore built with its own scoping guidance, evidence templates, facilitator notes and worked examples.</p>
              <ul className="check-list mt-6">
                <li>Written for the decision being made, not for the discipline it comes from.</li>
                <li>Sized so that a small team can complete a first pass without external support.</li>
                <li>Accompanied by training-of-trainers material where community delivery is intended.</li>
                <li>Versioned publicly, with changes and rationale recorded.</li>
                <li>Released under an open licence with clear attribution requirements.</li>
              </ul>
            </div>
            <figure className="media-frame" data-reveal="">
              <img src="/assets/img/photos/archive-drawers.jpg" alt="Rows of institutional archive drawers." width={1200} height={750} loading="lazy" decoding="async" />
              <figcaption>Evidence is only useful when it is findable, citable and reusable by the next team.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="licensing">
        <div className="container">
          <div className="split split--sticky">
            <div data-reveal="">
              <p className="eyebrow">Open licensing</p>
              <h2 className="balance">What you may do with our work</h2>
              <p className="lede mt-4">The Foundation's intellectual property model is built around release, not retention.</p>
            </div>
            <div className="flow" data-reveal="">
              <div className="grid grid-2">
                <div className="callout"><h3>Publications, toolkits and frameworks</h3><p>Released under <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong> unless a specific resource states otherwise. You may share and adapt the material, including commercially, provided you give appropriate credit and indicate any changes.</p></div>
                <div className="callout callout--teal"><h3>Software and code</h3><p>Grant-funded software is released under a recognised OSI-approved open-source licence, stated in each repository. Licence choice is made per project with its maintainers and recorded in the project charter.</p></div>
                <div className="callout callout--navy"><h3>Data sets</h3><p>Open data sets are published with a stated licence and a documented methodology so that findings can be independently replicated.</p></div>
                <div className="callout"><h3>Security-sensitive detail</h3><p>Where technical detail could assist adversaries or expose citizens to harm, publication follows coordinated disclosure and may be withheld, delayed or redacted. That decision is recorded and explained.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="citing">
        <div className="container">
          <div className="split split--even">
            <div className="flow" data-reveal="">
              <p className="eyebrow">Citing our work</p>
              <h2 className="balance">How to reference a Foundation resource</h2>
              <p className="text-muted">Every published resource carries a stable title, version and publication date. Where a resource has been superseded, the superseding version is linked from the original record.</p>
              <div className="cite-block mt-6">
                <span className="mono-label">Suggested citation format</span>
                <p><code>Digital Trust Futures Foundation (year). Title, version n. Digital Trust Futures Foundation NPC. Available at digitaltrustfuturesfoundation.org</code></p>
              </div>
            </div>
            <div className="flow" data-reveal="">
              <p className="eyebrow">Research enquiries</p>
              <h2 className="balance">Peer review, replication and collaboration</h2>
              <p className="text-muted">The Policy and Evidence Centre welcomes peer reviewers, replication requests, university collaborations and fellowship enquiries.</p>
              <div className="cluster mt-6">
                <a className="btn btn--primary" href="mailto:info@digitaltrustfuturesfoundation.org">info@digitaltrustfuturesfoundation.org</a>
                <a className="btn btn--ghost" href="/divisions/policy-evidence-centre">Policy and Evidence Centre</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Fund the tool once, and every country can use it."
        text="Open public goods extend the reach of a single engagement to every government, maintainer and community facing the same risk."
        primary={['Support our work', '/support-our-work']}
        secondary={['Partner with us', '/get-involved#partner']}
      />
    </>
  );
}
