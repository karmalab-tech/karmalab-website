import { KLButton } from '../KLButton';
import { KLSectionNumber } from '../KLSectionNumber';
import { IconArrowUpRight } from '../Icons';
import { sectionWrapClass } from './shared';

const blueprintPatternSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>" +
    "<path d='M0 24H120M0 48H120M0 72H120M0 96H120M24 0V120M48 0V120M72 0V120M96 0V120' stroke='rgba(255,255,255,0.05)' stroke-width='1'/>" +
    "<path d='M0 0H120M0 120H120M0 0V120M120 0V120' stroke='rgba(255,255,255,0.08)' stroke-width='1'/>" +
    "<path d='M24 24H72V72H96' stroke='rgba(133,255,0,0.18)' stroke-width='1' fill='none'/>" +
    "<path d='M0 96H24V120' stroke='rgba(251,72,196,0.16)' stroke-width='1' fill='none'/>" +
    "<circle cx='24' cy='24' r='2' fill='rgba(133,255,0,0.35)'/>" +
    "<circle cx='96' cy='72' r='2' fill='rgba(251,72,196,0.3)'/>" +
    "<circle cx='24' cy='120' r='2' fill='rgba(251,72,196,0.25)'/>" +
    '</svg>',
);

export const SectionOpenSource = () => (
  <section
    id="open-source"
    className={sectionWrapClass}
    style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-1)' }}
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${blueprintPatternSvg}")`,
        backgroundSize: '120px 120px',
      }}
    />

    <div className="relative mb-14">
      <KLSectionNumber n="06" label="Open Source" />
    </div>

    <div className="relative grid items-center grid-cols-[1fr_460px] gap-16 max-md:grid-cols-1 max-md:gap-10">
      <div>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[560px] m-0 mb-9">
          We open source some of our projects and pipelines, so anyone can learn from them, reuse
          them, and build on them.
        </p>
        <KLButton size="md" href="https://github.com/karmalab-tech" target="_blank">
          github.com/karmalab-tech <IconArrowUpRight size={14} />
        </KLButton>
      </div>

      <div className="w-full max-md:w-[min(320px,80vw)] max-md:mx-auto">
        <img src="/assets/dog.png" alt="" className="w-full h-auto block" />
      </div>
    </div>
  </section>
);
