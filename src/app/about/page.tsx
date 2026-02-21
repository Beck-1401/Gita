import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Bhagavad Gita Interactive Study',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold text-ink mb-6">About This Study</h1>

      <div className="prose-custom space-y-6 font-serif text-lg text-ink leading-relaxed">
        <p>
          This website is an interactive companion for studying the Bhagavad Gita. It brings
          together multiple English translations and classical Sanskrit commentaries so students
          can read each verse through multiple lenses simultaneously.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-earth-800 mt-8 mb-3">Translations</h2>
        <ul className="space-y-2 list-none pl-0">
          {[
            ['Gambhirananda', 'Advaita Vedanta perspective, precise and scholarly'],
            ['Adidevananda', 'Vishishtadvaita (Ramanujas school)'],
            ['Zaehner', 'Comparative religion, Oxford scholarly edition'],
            ['Sivananda', 'Practical Vedanta, accessible commentary'],
            ['Bhaktivedanta', 'Vaishnava Bhakti tradition (ISKCON)'],
            ['Radhakrishnan', 'Neo-Vedanta, philosophical synthesis'],
            ['Gemini (AI)', 'AI-generated translation for comparison'],
          ].map(([name, desc]) => (
            <li key={name} className="flex gap-3">
              <span className="text-saffron-500 mt-1">✦</span>
              <span>
                <strong className="font-semibold">{name}</strong> — {desc}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-earth-800 mt-8 mb-3">Commentaries</h2>
        <ul className="space-y-2 list-none pl-0">
          {[
            ['Śaṅkara', 'The great Advaita Vedantin (8th century CE); non-dualist interpretation'],
            ['Rāmānuja', 'Vishishtadvaita; theistic, devotional reading (11th–12th century)'],
            ['Madhva', 'Dvaita Vedanta; strict dualism, Vaishnava (13th century)'],
            ['Madhusūdana Sarasvatī', 'Advaita with strong bhakti element (16th century)'],
          ].map(([name, desc]) => (
            <li key={name} className="flex gap-3">
              <span className="text-saffron-500 mt-1">✦</span>
              <span>
                <strong className="font-semibold">{name}</strong> — {desc}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-earth-800 mt-8 mb-3">AI-Assisted Inquiry</h2>
        <p>
          Each verse includes an AI chat powered by Google Gemini. The AI is grounded in the
          traditional commentaries from the database, drawing on Śaṅkara, Rāmānuja, Madhva, and
          Madhusūdana before drawing on broader knowledge. It is a study aid, not an authority.
        </p>

        <div className="mt-10 pt-6 border-t border-earth-200">
          <Link
            href="/"
            className="font-sans text-sm text-saffron-600 hover:text-saffron-700 transition-colors"
          >
            ← Back to chapters
          </Link>
        </div>
      </div>
    </div>
  );
}
