import { MapPin, MessageCircle, Phone, UserRound } from 'lucide-react';
import { centerProfile } from '../data/resources.js';

function About() {
  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card overflow-hidden">
        <div className="relative">
          <p className="eyebrow">About AJ</p>
          <h1 className="headline mt-4 text-4xl font-bold">{centerProfile.name}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--text-soft)]">
            {centerProfile.description}
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="section-card">
          <p className="eyebrow">Why this portal works</p>
          <div className="mt-5 grid gap-4">
            <div className="surface-soft p-4 text-sm leading-7 text-[var(--text-soft)]">
              Learners get one place for tutorials, smart search, AI guidance, exercises, project
              ideas, and interview prep.
            </div>
            <div className="surface-soft p-4 text-sm leading-7 text-[var(--text-soft)]">
              The roadmap is grouped into clear zero-to-hero phases so beginners know what to learn
              first.
            </div>
            <div className="surface-soft p-4 text-sm leading-7 text-[var(--text-soft)]">
              Content lives in a clean data layer, so AJ can expand lessons and examples quickly.
            </div>
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">Contact details</p>
          <div className="mt-5 grid gap-3">
            <div className="surface-soft flex items-center gap-3 p-4">
              <UserRound size={18} className="text-emerald-500" />
              <span className="text-sm text-[var(--text-soft)]">{centerProfile.owner}</span>
            </div>
            <a
              href={`tel:${centerProfile.phoneHref}`}
              className="surface-soft flex items-center gap-3 p-4"
            >
              <Phone size={18} className="text-sky-500" />
              <span className="text-sm text-[var(--text-soft)]">{centerProfile.phone}</span>
            </a>
            <a
              href={centerProfile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="surface-soft flex items-center gap-3 p-4"
            >
              <MessageCircle size={18} className="text-amber-500" />
              <span className="text-sm text-[var(--text-soft)]">Chat on WhatsApp</span>
            </a>
            <div className="surface-soft flex items-center gap-3 p-4">
              <MapPin size={18} className="text-rose-500" />
              <span className="text-sm text-[var(--text-soft)]">{centerProfile.location}</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default About;
