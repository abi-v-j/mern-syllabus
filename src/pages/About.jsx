import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { centerProfile } from '../data/resources.js';

function About() {
  return (
    <main className="shell py-8 md:py-10">
      <section className="section-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-sky-500/5 to-amber-500/15" aria-hidden="true" />
        <div className="relative">
          <p className="eyebrow">About the training center</p>
          <h1 className="headline mt-4 text-4xl font-bold">{centerProfile.name}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--text-soft)]">
            {centerProfile.description} This page is ready for your real institute branding, address,
            WhatsApp number, and enquiry workflow.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="section-card">
          <p className="eyebrow">Why this portal works</p>
          <div className="mt-5 grid gap-4">
            <div className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
              Students get one place for tutorials, exercises, project ideas, interview prep, and progress tracking.
            </div>
            <div className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
              The site is fully static today, which keeps hosting simple while leaving room for a future LMS upgrade.
            </div>
            <div className="surface-soft rounded-[24px] p-4 text-sm leading-7 text-[var(--text-soft)]">
              Content is stored in JavaScript data files, so your team can expand or edit lessons quickly.
            </div>
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">Contact details</p>
          <div className="mt-5 grid gap-3">
            <a href={`mailto:${centerProfile.email}`} className="surface-soft flex items-center gap-3 rounded-[24px] p-4">
              <Mail size={18} className="text-emerald-500" />
              <span className="text-sm text-[var(--text-soft)]">{centerProfile.email}</span>
            </a>
            <a href={`tel:${centerProfile.phone}`} className="surface-soft flex items-center gap-3 rounded-[24px] p-4">
              <Phone size={18} className="text-sky-500" />
              <span className="text-sm text-[var(--text-soft)]">{centerProfile.phone}</span>
            </a>
            <a href={centerProfile.whatsappUrl} target="_blank" rel="noreferrer" className="surface-soft flex items-center gap-3 rounded-[24px] p-4">
              <MessageCircle size={18} className="text-amber-500" />
              <span className="text-sm text-[var(--text-soft)]">Chat on WhatsApp</span>
            </a>
            <div className="surface-soft flex items-center gap-3 rounded-[24px] p-4">
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
