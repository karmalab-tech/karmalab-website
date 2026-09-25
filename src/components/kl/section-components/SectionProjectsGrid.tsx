import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../../../data/projects';
import { KLIconButton } from '../KLIconButton';
import { IconClose } from '../Icons';
import { useVideoQuality, resolveVideoSrc } from '../../../lib/videoQuality';

interface ProjectsGridProps {
  projects: Project[];
}

type GridLayout = 'single' | 'double' | 'triple' | 'eight';

function getLayout(count: number): GridLayout {
  if (count === 1) return 'single';
  if (count === 2) return 'double';
  if (count === 3) return 'triple';
  return 'eight';
}

/** Returns ordered cells (null = blank placeholder) for the given layout. */
function buildCells(projects: Project[], layout: GridLayout): Array<Project | null> {
  switch (layout) {
    case 'single':
      return [projects[0]];
    case 'double':
      return [projects[0], projects[1]];
    case 'triple':
      // 2-col grid, 3 rows — alternating left / right / left
      // Row 1: [p0, blank]  Row 2: [blank, p1]  Row 3: [p2, blank]
      return [projects[0], null, null, projects[1], projects[2], null];
    case 'eight': {
      const [p0, p1, p2, p3, p4, p5, p6, p7] = projects;
      const _ = null;
      // Fixed editorial patterns per project count
      // prettier-ignore
      switch (projects.length) {
        case 4: return [p0, _,  _,  p1, p2, _,  _,  p3]; // L / R / L / R
        case 5: return [p0, p1, p2, _,  _,  p3, p4, _];  // full / L / R / L
        case 6: return [p0, p1, p2, _,  _,  p3, p4, p5]; // full / L / R / full
        case 7: return [p0, p1, p2, p3, p4, p5, p6, _];  // full grid, last cell empty
        default: return [p0, p1, p2, p3, p4, p5, p6, p7]; // 8: full grid
      }
    }
  }
}

function getGridCols(layout: GridLayout): string {
  switch (layout) {
    case 'single':
      return '1fr';
    case 'double':
      return '1fr';
    case 'triple':
      return 'repeat(2, 1fr)';
    case 'eight':
      return 'repeat(2, 1fr)';
  }
}

interface VideoModalProps {
  video: Project['video'] | null;
  client: string | null;
  title: string | null;
  onClose: () => void;
}

const VideoModal = ({ video, client, title, onClose }: VideoModalProps) => {
  const quality = useVideoQuality();
  const src = video ? resolveVideoSrc(video, quality) : null;

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [src, onClose]);

  if (typeof document === 'undefined') return null;
  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0"
        style={{
          background: 'rgba(0,0,0,.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          opacity: src ? 1 : 0,
          pointerEvents: src ? 'auto' : 'none',
          transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
          zIndex: 92,
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Project video"
        className="fixed top-1/2 left-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${src ? 1 : 0.96})`,
          opacity: src ? 1 : 0,
          pointerEvents: src ? 'auto' : 'none',
          transition:
            'opacity 320ms cubic-bezier(.22,1,.36,1), transform 420ms cubic-bezier(.22,1,.36,1)',
          zIndex: 200,
          width: 'min(1100px, 94vw)',
        }}
      >
        {/* Close button sits above the video */}
        <div className="flex justify-end mb-3">
          <KLIconButton onClick={onClose} accent="pink" size={40} title="Close video">
            <IconClose size={18} stroke={2.2} />
          </KLIconButton>
        </div>

        {/* Video — aspect-ratio container ensures correct size even before/after load */}
        <div
          className="relative w-full rounded-2xl overflow-hidden bg-kl-black"
          style={{ aspectRatio: '16 / 9', boxShadow: '0 40px 120px rgba(0,0,0,.8)' }}
        >
          <video
            key={src ?? ''}
            src={src ?? undefined}
            autoPlay
            playsInline
            loop
            className="absolute inset-0 w-full h-full block"
          />
          {client || title ? (
            <div
              className="absolute bottom-0 left-0 w-full text-white font-sans text-sm"
              style={{
                padding: '60px 16px 12px',
                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              }}
            >
              {client && <div className="font-bold text-[18px] mb-1">{client}</div>}
              {title && <div>{title}</div>}
            </div>
          ) : null}
        </div>
      </div>
    </>,
    document.body,
  );
};

/**
 * Grid-cell background video. Stays unmounted (nothing fetched) until it scrolls near
 * the viewport, then loads the encode matching the current network quality and
 * plays/pauses as it enters/leaves view — so a page with a dozen clips never
 * downloads more than what's actually on (or about to be on) screen.
 */
const LazyGridVideo = ({ video }: { video: Project['video'] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const quality = useVideoQuality();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { rootMargin: '300px 0px', threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView, hasEntered]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {hasEntered && (
        <video
          ref={videoRef}
          src={resolveVideoSrc(video, quality)}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        />
      )}
    </div>
  );
};

export const SectionProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const activeVideo = activeProject?.video ?? null;

  const layout = getLayout(projects.length);
  const gridCells = buildCells(projects, layout);

  return (
    <>
      <section aria-label="Projects" className="relative bg-kl-black">
        <div
          className="grid gap-0.75 [grid-template-columns:1fr] md:[grid-template-columns:var(--grid-cols)]"
          style={{ '--grid-cols': getGridCols(layout) } as React.CSSProperties}
        >
          {gridCells.map((cell, i) => {
            const clickable = Boolean(cell?.modal && cell?.video);
            return (
              <div
                key={i}
                onClick={() => {
                  if (clickable) setActiveProject(cell!);
                }}
                aria-label={clickable ? `Play ${cell!.title}` : undefined}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') setActiveProject(cell!);
                      }
                    : undefined
                }
                className={`relative overflow-hidden outline-none${cell === null ? ' hidden md:block' : ''}`}
                style={{
                  aspectRatio: '16 / 9',
                  background: '#000',
                  cursor: clickable ? 'pointer' : 'default',
                  transition: 'filter 200ms ease',
                  filter: 'brightness(0.8) saturate(0.8)',
                }}
                onMouseEnter={(e) => {
                  if (cell)
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(1.2) saturate(1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = 'brightness(0.8) saturate(0.8)';
                }}
                onFocus={(e) => {
                  if (clickable)
                    (e.currentTarget as HTMLElement).style.outline = '2px solid var(--kl-lime)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.outline = 'none';
                }}
              >
                {cell?.video && <LazyGridVideo video={cell.video} />}
              </div>
            );
          })}
        </div>
      </section>

      <VideoModal
        video={activeVideo}
        client={activeProject?.client ?? null}
        title={activeProject?.title ?? ''}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
};
