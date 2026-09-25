import { useEffect, useState } from 'react';
import type { VideoSources } from '../data/projects';

export type VideoQuality = 'low' | 'high';

interface NetworkInformation extends EventTarget {
  saveData?: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
}

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === 'undefined') return undefined;
  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  };
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

/**
 * Best-effort read of the current connection quality via the Network Information API.
 * Unsupported browsers (notably Safari/iOS) report no `connection` object at all —
 * in that case we assume a normal connection and rely on lazy-loading (only fetching
 * videos once they scroll into view) to keep bandwidth usage down instead.
 */
function readQuality(): VideoQuality {
  const connection = getConnection();
  if (!connection) return 'high';
  if (connection.saveData) return 'low';
  if (connection.effectiveType && connection.effectiveType !== '4g') return 'low';
  if (typeof connection.downlink === 'number' && connection.downlink < 1.5) return 'low';
  return 'high';
}

/** Tracks connection quality live, so e.g. switching from wifi to cellular downgrades new loads. */
export function useVideoQuality(): VideoQuality {
  const [quality, setQuality] = useState<VideoQuality>(readQuality);

  useEffect(() => {
    const connection = getConnection();
    if (!connection) return;
    const onChange = () => setQuality(readQuality());
    connection.addEventListener('change', onChange);
    return () => connection.removeEventListener('change', onChange);
  }, []);

  return quality;
}

/** Picks the right encode for a project's video given the current network quality. */
export function resolveVideoSrc(video: string | VideoSources, quality: VideoQuality): string {
  if (typeof video === 'string') return video;
  return quality === 'low' ? video.low : video.high;
}
