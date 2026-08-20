import { IconGithub } from '../Icons';
import { sectionWrapClass } from './shared';

export const SectionOpenSource = () => (
  <section
    id="open-source"
    className={sectionWrapClass}
    style={{
      borderTop: '1px solid var(--border-1)',
      paddingTop: 'clamp(28px,4vw,48px)',
      paddingBottom: 'clamp(28px,4vw,48px)',
    }}
  >
    <div className="flex items-center justify-center gap-4 text-center max-md:flex-col max-md:gap-3">
      <IconGithub size={28} className="text-kl-bone flex-none" />
      <p className="font-sans font-light text-kl-fog text-base sm:text-lg leading-[1.55] max-w-[640px] m-0">
        We open source some of our projects and pipelines, so anyone can learn from them, reuse
        them, and build on them.{' '}
        <a
          href="https://github.com/karmalab-tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kl-pink hover:underline"
        >
          github.com/karmalab-tech
        </a>
      </p>
    </div>
  </section>
);
