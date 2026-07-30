import type { Metadata } from 'next';
import { SectionLabel } from '@/components/SectionLabel';
import {
  type Link,
  certifications, courses, serviceProvider, labs, rfcs, blogs,
  outageMaps, cloudStatus, aiStatus, lookupTools, dashboardGroups, communities, listening,
  aiResources, specDriven, automation, gitGithub, diagramming, vendorRoles,
  careerData, books, biases,
} from './catalog';
import { ResourceCatalog } from './ResourceCatalog';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'A curated list of free resources for network engineers: certifications, courses, lab software, standards, communities, podcasts, automation tools, diagramming, internet measurement, books, and career data.',
};

function LinkSection({
  id,
  label,
  heading,
  intro,
  links,
}: {
  id: string;
  label: string;
  heading: string;
  intro: string;
  links: Link[];
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-3 font-display text-2xl md:text-3xl">{heading}</h2>
      <p className="mt-3 max-w-3xl text-text-muted">{intro}</p>
      <ul className="mt-6 space-y-4">
        {links.map((l) => (
          <li key={l.href} className="border border-border bg-surface p-5 rounded-sm">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text font-semibold hover:text-accent-green"
            >
              {l.name}
            </a>
            <p className="mt-1 text-sm text-text-muted">{l.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const navSections: { id: string; label: string }[] = [
  { id: 'start-here', label: 'You are here' },
  { id: 'learn', label: 'Learn the fundamentals' },
  { id: 'stay-current', label: 'Stay current' },
  { id: 'build', label: 'Automate & build' },
  { id: 'grow', label: 'Grow your career' },
];

function JumpNav() {
  return (
    <nav
      aria-label="Jump to section"
      className="sticky top-0 z-20 -mx-6 mt-10 mb-8 px-6 py-3 bg-bg/90 backdrop-blur-sm border-b border-border"
    >
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-label">
        {navSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-accent-green hover:text-text transition-colors"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type Step = { label: string; href: string };
type Stage = { label: string; who: string; steps: Step[] };

const careerStages: Stage[] = [
  {
    label: 'Breaking in',
    who: 'New to networking, changing careers, or studying for your first cert.',
    steps: [
      { label: 'Play the subnetting game', href: '/subnetting' },
      { label: 'Certifications', href: '#certifications' },
      { label: 'Free courses', href: '#free-courses' },
      { label: 'Communities', href: '#communities' },
    ],
  },
  {
    label: 'Early career',
    who: 'In a NOC or junior role, building real fundamentals.',
    steps: [
      { label: 'Lab software', href: '#lab-software' },
      { label: 'Foundational RFCs', href: '#standards' },
      { label: 'Free courses', href: '#free-courses' },
      { label: 'Books', href: '#books' },
    ],
  },
  {
    label: 'Mid-career / specializing',
    who: 'Fundamentals are solid; now you are picking a depth.',
    steps: [
      { label: 'Automation', href: '#automation' },
      { label: 'Service provider', href: '#service-provider' },
      { label: 'Git & GitHub', href: '#git-github' },
      { label: 'Certifications', href: '#certifications' },
    ],
  },
  {
    label: 'Senior / architect',
    who: 'Designing networks and owning the hard calls.',
    steps: [
      { label: 'Books', href: '#books' },
      { label: 'Internet dashboard', href: '#measurement' },
      { label: 'Communities & NANOG', href: '#communities' },
      { label: 'Cognitive biases', href: '#biases' },
    ],
  },
  {
    label: 'Pivoting to adjacent roles',
    who: 'Stay technical, step off the on-call rotation.',
    steps: [
      { label: 'Vendor roles', href: '#vendor-roles' },
      { label: 'AI for NEs', href: '#ai-for-nes' },
      { label: 'Spec-driven dev', href: '#spec-driven' },
      { label: 'Career data', href: '#career-data' },
    ],
  },
];

function CareerPaths() {
  return (
    <section id="start-here" className="mt-12 scroll-mt-24">
      <SectionLabel>Start here</SectionLabel>
      <h2 className="mt-3 font-display text-2xl md:text-3xl">You are here</h2>
      <p className="mt-3 max-w-3xl text-text-muted">
        Not sure where to begin? Find the stage that sounds like you and follow the trail. Each
        link jumps to the matching section of the catalog below, which is always there if you
        would rather browse by topic.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {careerStages.map((stage) => (
          <div key={stage.label} className="border border-border bg-surface p-5 rounded-sm">
            <h3 className="font-display text-lg text-accent-green">{stage.label}</h3>
            <p className="mt-1 text-sm text-text-muted">{stage.who}</p>
            <ul className="mt-3 space-y-1.5">
              {stage.steps.map((s) => (
                <li key={s.href + s.label}>
                  <a href={s.href} className="text-sm text-accent-blue hover:text-accent-green">
                    {s.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClusterHeading({ id, title, intro }: { id: string; title: string; intro: string }) {
  return (
    <div id={id} className="mt-20 scroll-mt-24 border-t border-border pt-8">
      <h2 className="font-display text-3xl md:text-4xl text-accent-green">{title}</h2>
      <p className="mt-2 max-w-2xl text-text-muted">{intro}</p>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <SectionLabel>Resources</SectionLabel>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
        Free resources for network engineers.
      </h1>
      <p className="mt-6 max-w-3xl text-text-muted text-lg">
        A curated list of the certifications, courses, labs, standards, blogs, communities,
        podcasts, automation tools, diagramming references, and books we point listeners to
        most often. Every link here is free or freely accessible. Vendor neutral by default.
        Last reviewed June 2026.
      </p>

      <ResourceCatalog>
        <JumpNav />

      <CareerPaths />

      <ClusterHeading
        id="learn"
        title="Learn the fundamentals"
        intro="Certs, courses, labs, and the standards underneath it all. Where you build the base everything else sits on."
      />

      <LinkSection
        id="certifications"
        label="Certifications"
        heading="Learning paths and certifications"
        intro="The certifications that move resumes and pay bands. Mix vendor and vendor-neutral. Pick one track, finish it, then expand."
        links={certifications}
      />

      <LinkSection
        id="free-courses"
        label="Free courses"
        heading="Free courses and labs"
        intro="Practical, hands-on, free. Start with Kirk Byers if you've never written a line of Python."
        links={courses}
      />

      <LinkSection
        id="service-provider"
        label="Service provider"
        heading="Service provider and operator training"
        intro="Free training for the carrier, ISP, and large-scale operator world: routing at scale, MPLS, segment routing, and the regional registry academies. This is where the internet's backbone is run."
        links={serviceProvider}
      />

      <LinkSection
        id="lab-software"
        label="Lab software"
        heading="Lab software and simulators"
        intro="The platforms working engineers and students use to build realistic topologies on a laptop. Start with whichever you have local images for; the differences become preferences over time."
        links={labs}
      />

      <LinkSection
        id="standards"
        label="Standards"
        heading="Foundational RFCs and standards"
        intro="The Request for Comments (RFC) series is how the internet is specified. Every major protocol you touch has an RFC behind it. These are the ones every network engineer should be able to point to."
        links={rfcs}
      />

      <LinkSection
        id="git-github"
        label="Git & GitHub"
        heading="Git and GitHub"
        intro="Version control is the on-ramp to network automation. Before you push configs from code, get comfortable with Git and the GitHub workflow. Start with GitHub Skills and keep Pro Git nearby."
        links={gitGithub}
      />

      <ClusterHeading
        id="stay-current"
        title="Stay current"
        intro="How working engineers keep up: the blogs, dashboards, communities, and shows worth your attention."
      />

      <LinkSection
        id="engineering-blogs"
        label="Blogs"
        heading="Engineering and vendor blogs"
        intro="Where new ideas actually drop before they hit a conference stage. Subscribe to a couple of these and you'll be ahead of most of the room on what's changing in the field."
        links={blogs}
      />

      <section id="measurement" className="mt-16 scroll-mt-24">
        <SectionLabel>Dashboards</SectionLabel>
        <h2 className="mt-3 font-display text-2xl md:text-3xl">Internet dashboard</h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          Bookmark this for the next time something breaks. Live maps of internet health,
          crowd-sourced outage trackers, and the official status pages for the clouds, CDNs, and AI
          providers you depend on. The fastest way to answer "is it me or is it them?"
        </p>
        {dashboardGroups.map((g) => (
          <div key={g.label} className="mt-8">
            <h3 className="font-mono text-xs uppercase tracking-label text-text-muted">{g.label}</h3>
            <ul className="mt-3 space-y-4">
              {g.links.map((l) => (
                <li key={l.href} className="border border-border bg-surface p-5 rounded-sm">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text font-semibold hover:text-accent-green"
                  >
                    {l.name}
                  </a>
                  <p className="mt-1 text-sm text-text-muted">{l.note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <LinkSection
        id="communities"
        label="Communities"
        heading="Where network engineers hang out"
        intro="Network engineering is a small world. The people in these communities are how most working engineers stay current and how most opportunities surface."
        links={communities}
      />

      <LinkSection
        id="listening"
        label="Listening"
        heading="Other podcasts and newsletters"
        intro="The shows and newsletters we recommend alongside our own. Different styles, different angles, all worth your time."
        links={listening}
      />

      <ClusterHeading
        id="build"
        title="Automate & build"
        intro="Bringing software practices to the network: AI, spec-driven development, automation tooling, and diagramming."
      />

      <LinkSection
        id="ai-for-nes"
        label="AI for NEs"
        heading="AI and LLMs for network engineers"
        intro="Knowing how to use LLMs effectively is now a baseline skill for network engineers. Not because AI replaces you, but because AI-augmented engineers are dramatically faster at automation, troubleshooting, documentation, and learning new technologies. Start with the basics, then bring them to your daily work."
        links={aiResources}
      />

      <LinkSection
        id="spec-driven"
        label="Spec-driven dev"
        heading="Spec-driven development with AI coding agents"
        intro="The disciplined alternative to 'vibe coding.' Write a clear spec of what you want the agent to build, refine it through structured phases, and let the agent implement against it. Especially useful for network automation work, where ambiguity in the prompt leads to subtly wrong code that passes review and breaks in production."
        links={specDriven}
      />

      <LinkSection
        id="automation"
        label="Automation"
        heading="Network automation and operations tools"
        intro="The open-source stack working engineers reach for when they're moving past CLI-and-spreadsheet operations. Source of truth, config management, observability, validation."
        links={automation}
      />

      <LinkSection
        id="diagramming"
        label="Diagramming"
        heading="Diagramming and topology icons"
        intro="The editors and icon libraries that make network diagrams look like network diagrams. Useful whether you're sketching a design, writing a runbook, or building slides."
        links={diagramming}
      />

      <ClusterHeading
        id="grow"
        title="Grow your career"
        intro="Roles, data, books, and the decision-making habits that move a career forward."
      />

      <section id="vendor-roles" className="mt-16 scroll-mt-24">
        <SectionLabel>Vendor roles</SectionLabel>
        <h2 className="mt-3 font-display text-2xl md:text-3xl">
          Vendor Roles For Network Engineers
        </h2>
        <p className="mt-3 max-w-3xl text-text-muted">
          Most engineers know the path from NOC → ops → architecture. Far fewer hear about the
          vendor roles that let you stay technical, influence products, and step off the on-call
          rotation. Below is a quick map of what those roles actually look like, each linked to
          the AONE episode where someone in the seat walks you through the job. The full
          collection lives in our{' '}
          <a
            href="https://youtube.com/playlist?list=PLH4sfHyLzNQ8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vendor Roles playlist on YouTube
          </a>
          .
        </p>
        <ul className="mt-6 space-y-4">
          {vendorRoles.map((l) => (
            <li key={l.href} className="border border-border bg-surface p-5 rounded-sm">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text font-semibold hover:text-accent-green"
              >
                {l.name}
              </a>
              <p className="mt-1 text-sm text-text-muted">{l.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <LinkSection
        id="career-data"
        label="Career data"
        heading="Industry and career data"
        intro="Salary and employment data from authoritative sources. Useful for negotiating, planning a career move, or just understanding where the field is going."
        links={careerData}
      />

      <LinkSection
        id="books"
        label="Books"
        heading="Books that hold up"
        intro="The network engineering books that are still worth your time after years of cloud, automation, and AI reshaping the field, plus a couple of adjacent ones that translate directly to the job."
        links={books}
      />

      <LinkSection
        id="biases"
        label="Cognitive biases"
        heading="Cognitive biases and decision-making"
        intro="Most engineering mistakes are not technical, they are cognitive. The traps that derail design reviews, troubleshooting calls, and career decisions are the same traps psychologists have been documenting for decades. Reading on this stuff is one of the highest-leverage habits a working engineer can build."
        links={biases}
      />

      <section className="mt-16 border-t border-border pt-12 space-y-4">
        <SectionLabel>Help improve this site</SectionLabel>
        <p className="text-text-muted">
          This website is open source. If you spot a broken link, a typo, or a
          resource we should add, the fastest way to fix it is on GitHub:{' '}
          <a
            href="https://github.com/The-Art-of-Network-Engineering/website"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/The-Art-of-Network-Engineering/website
          </a>
          .
        </p>
        <ul className="text-text-muted text-sm space-y-2 list-disc pl-5 marker:text-accent-green">
          <li>
            <a
              href="https://github.com/The-Art-of-Network-Engineering/website/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an issue
            </a>{' '}
            to report a bug or suggest a change. No coding required, just describe
            what you saw and what you expected.
          </li>
          <li>
            <a
              href="https://github.com/The-Art-of-Network-Engineering/website/pulls"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send a pull request
            </a>{' '}
            if you want to propose the change directly in code.
          </li>
        </ul>
        <p className="text-text-muted text-sm">
          Prefer email? Reach Andy at{' '}
          <a href="mailto:andy@artofnetworkengineering.com">andy@artofnetworkengineering.com</a>.
        </p>
      </section>
      </ResourceCatalog>
    </div>
  );
}
