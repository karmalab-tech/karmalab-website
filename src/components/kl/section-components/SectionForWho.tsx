import { Fragment } from 'react';
import { KLEyebrow } from '../KLEyebrow';
import { KLSectionNumber } from '../KLSectionNumber';
import { KLBorderedGrid, KLBorderedCell } from '../KLBorderedGrid';
import { sectionWrapClass } from './shared';

const clientTypes = [
  {
    label: 'Production Companies',
    desc: 'Integrating new technologies without lowering production standards.',
    image: '/assets/production_companies.png',
  },
  {
    label: 'Cultural Institutions',
    desc: 'Building immersive experiences with meaning, not just effects.',
    image: '/assets/cultural_institutions.png',
  },
  {
    label: 'Brands',
    desc: 'Creating ambitious projects that remain human, intentional, and well crafted.',
    image: '/assets/brands.png',
  },
  {
    label: 'Artists and Creators',
    desc: 'Looking for structure, clarity, and ways to execute their vision.',
    image: '/assets/artists.png',
  },
];

const clients = [
  'ARTE',
  'France Télévisions',
  'Cinétévé',
  'Primordial Soup',
  'Atlas V',
  'Ville de Paris',
  'Journées du Patrimoine',
  'ADAGP',
  'Inrō',
  'LVMH',
  'Nona Source',
  'Kenzo',
  "L'Oréal",
];

export const SectionForWho = () => (
  <section id="clients" className={`${sectionWrapClass} max-md:px-0`}>
    <div className="mb-10 md:mb-18 max-md:px-8">
      <KLSectionNumber n="03" label="For whom" />
    </div>

    <KLBorderedGrid columns={2} className="max-md:grid-cols-1! max-md:*:border-r-0!">
      {clientTypes.map((ct, i) => (
        <KLBorderedCell key={ct.label} hasRight={i % 2 === 0} lastRow={i >= clientTypes.length - 2}>
          <div className="flex gap-6 items-start max-md:hidden">
            <div className="shrink-0 w-[100px] h-[100px] overflow-hidden">
              {ct.image && (
                <img src={ct.image} alt={ct.label} className="w-full h-full object-cover block" />
              )}
            </div>
            <div>
              <div className="font-sans font-normal text-[26px] tracking-[-0.02em] text-kl-bone leading-[1.15]">
                {ct.label}
              </div>
              <p className="mt-3.5 mb-0 text-kl-fog text-lg leading-[1.55] max-w-[480px]">
                {ct.desc}
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-[100px] h-[100px] overflow-hidden">
                {ct.image && (
                  <img src={ct.image} alt={ct.label} className="w-full h-full object-cover block" />
                )}
              </div>
              <div className="font-sans font-normal text-[26px] tracking-[-0.02em] text-kl-bone leading-[1.15]">
                {ct.label}
              </div>
            </div>
            <p className="mt-3 mb-0 text-kl-fog text-base leading-[1.55] px-5">{ct.desc}</p>
          </div>
        </KLBorderedCell>
      ))}
    </KLBorderedGrid>

    <div className="mt-24 max-md:px-8">
      <KLEyebrow>Our clients</KLEyebrow>
      <div className="mt-8 flex flex-wrap gap-x-6 md:gap-x-5 gap-y-1.5">
        {clients.map((c, i) => (
          <Fragment key={c}>
            <span className="font-sans font-light text-xl text-kl-ash leading-[1.6]">{c}</span>
            {i < clients.length - 1 && (
              <span className="text-kl-steel text-xl leading-[1.6] select-none max-md:hidden">
                ·
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);
