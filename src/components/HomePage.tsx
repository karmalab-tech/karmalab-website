import { useState, useEffect, useRef } from 'react';
import { ReelFixed, HeroBlock, ReelPinnedSpacer } from './kl/Hero';
import { FloatingChrome, DrawerMenu, ContactModal } from './kl/Chrome';
import {
  SectionWhatWeDo,
  SectionHowItWorks,
  SectionForWho,
  SectionWhoWeAre,
  SectionOpenSource,
  SectionCTA,
} from './kl/Sections';

const TWEAKS = {
  tagline1: 'There are many ways to create something.',
  tagline2: 'Most of them almost work.',
  accentDominance: 'pink',
  logoTreatment: 'chrome',
  heroFadeOpacity: 0,
  heroBlurPx: 5,
  heroHeightVh: 100,
  reelPinVh: 160,
  grainOn: true,
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const videoUnlockRef = useRef<(() => void) | null>(null);

  const unlock = () => setUnlocked(true);
  const relock = () => setUnlocked(false);
  const watchVideo = () => videoUnlockRef.current?.();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.3);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setContactOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openContact = () => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'click_contact');
    }
    setContactOpen(true);
  };

  return (
    <>
      <ReelFixed
        tweaks={TWEAKS}
        unlocked={unlocked}
        onUnlock={unlock}
        onRelock={relock}
        onRegisterUnlock={(fn) => {
          videoUnlockRef.current = fn;
        }}
      />
      <FloatingChrome
        onOpenMenu={() => setMenuOpen(true)}
        onOpenContact={openContact}
        scrolled={scrolled}
        startHidden={true}
        hidden={unlocked}
      />

      <main style={{ position: 'relative' }}>
        <HeroBlock onContact={openContact} onUnlock={watchVideo} tweaks={TWEAKS} />
        <ReelPinnedSpacer tweaks={TWEAKS} />

        <div className="relative bg-kl-black" style={{ zIndex: 5 }}>
          <SectionWhatWeDo />
          <SectionHowItWorks />
          <SectionForWho />
          {/* <SectionValues /> */}
          <SectionWhoWeAre />
          <SectionOpenSource />
          <SectionCTA onContact={openContact} />
        </div>
      </main>

      <DrawerMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
