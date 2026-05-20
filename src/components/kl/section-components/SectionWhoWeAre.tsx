import { KLButton } from '../KLButton';
import { KLSectionNumber } from '../KLSectionNumber';
import { IconArrowUpRight } from '../Icons';
import { sectionWrapClass } from './shared';

const portraitNoiseSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='.45'/></svg>",
);

export const SectionWhoWeAre = () => (
  <section id="who-we-are" className={sectionWrapClass}>
    <div className="mb-14">
      <KLSectionNumber n="05" label="Who we are" />
    </div>

    <div className="grid items-center grid-cols-[540px_1fr] gap-16 max-md:grid-cols-1 max-md:gap-10">
      {/* Portrait placeholder */}
      <div className="w-full aspect-square  overflow-hidden relative max-md:w-[min(280px,70vw)] max-md:mx-auto">
        <img
          src="/assets/pierrony_alpha.png"
          alt="Rony Efrat and Pierre de Milly"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Bio text */}
      <div>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[640px] m-0 mb-7">
          KarmaLab was founded by <span className="text-kl-pink">Rony Efrat</span>, a filmmaker
          working across film, code, and hybrid production, with parallel work in policy and in
          teaching how technology is built and shapes systems.
        </p>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[640px] m-0 mb-7">
          She joined forces with <span className="text-kl-pink">Pierre de Milly</span>, a software
          engineer and a serial entrepreneur with a knack for building meaningful digital
          experiences.
        </p>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[640px] mb-7">
          <span className="text-kl-pink">KarmaLab</span> turns our ideas into a working structure.
        </p>
        <p className="text-kl-fog text-base leading-[1.55] max-w-[560px]">
          We work with a multi-cultural network of 20+ professionals across disciplines and
          languages.
        </p>
        <div className="mt-9">
          <KLButton
            size="md"
            href="https://www.arte.tv/fr/videos/133035-000-A/rencontre-avec-rony-efrat/"
            target="_blank"
          >
            Watch an interview <IconArrowUpRight size={14} />
          </KLButton>
        </div>
      </div>
    </div>
  </section>
);
