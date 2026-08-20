import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: number;
}

const mkIcon =
  (paths: React.ReactNode) =>
  ({ size = 20, stroke = 1.75, style, ...p }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...p}
    >
      {paths}
    </svg>
  );

export const IconMenu = mkIcon(
  <>
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </>,
);

export const IconClose = mkIcon(
  <>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </>,
);

export const IconPlay = mkIcon(
  <polygon points="7 5 19 12 7 19 7 5" fill="currentColor" stroke="none" />,
);

export const IconPause = mkIcon(
  <>
    <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
  </>,
);

export const IconVolume = mkIcon(
  <>
    <polygon
      points="4 10 9 10 13 6 13 18 9 14 4 14 4 10"
      fill="currentColor"
      stroke="currentColor"
    />
    <path d="M17 9c1.2 1 1.8 2.2 1.8 3s-.6 2-1.8 3" />
    <path d="M19.5 7c2 1.5 3 3.2 3 5s-1 3.5-3 5" />
  </>,
);

export const IconVolumeOff = mkIcon(
  <>
    <polygon
      points="4 10 9 10 13 6 13 18 9 14 4 14 4 10"
      fill="currentColor"
      stroke="currentColor"
    />
    <line x1="17" y1="9" x2="22" y2="14" />
    <line x1="22" y1="9" x2="17" y2="14" />
  </>,
);

export const IconArrowDown = mkIcon(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="6 13 12 19 18 13" />
  </>,
);

export const IconArrowRight = mkIcon(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </>,
);

export const IconFullscreen = mkIcon(
  <>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </>,
);

export const IconArrowUpRight = mkIcon(
  <>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="8 7 17 7 17 16" />
  </>,
);

export const IconPlus = mkIcon(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>,
);

export const IconRestart = mkIcon(
  <>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </>,
);

export const IconGithub = ({ size = 20, style, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} {...p}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.105 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
