export interface Project {
  client?: string;
  title?: string;
  /** Path or URL to an MP4 for the projects grid. If omitted the cell renders empty (black). */
  video: string;
  /** When true, clicking the cell opens the video in a fullscreen modal. */
  modal?: boolean;
}

export interface Category {
  slug: string;
  n: string;
  label: string;
  copy: string;
  tags: string[];
  projects: Project[];
}

export const categories: Category[] = [
  {
    slug: 'films-and-commercials',
    n: '01',
    label: 'Films & Commercials',
    copy: 'Narrative and documentary projects for cinema, television, web, and social platforms.',
    tags: ['Concept', 'Production', 'CGI', 'Post-production'],
    projects: [
      {
        client: 'Failing Forward',
        title: 'Narrative short film distributed by ARTE - 2024',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/Failing_2.mp4',
        modal: true,
      },
      {
        client: 'Moustache',
        title: 'Spec commercial comedy sketch - 2026',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/Moustache_1.mp4',
        modal: true,
      },
      {
        client: 'Women in AI',
        title: 'AI musical short film - 2026',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/Women_1.mp4',
        modal: true,
      },
      {
        client: 'Une vie en France',
        title: 'Short form biopic series produced by Cinétévé for France Télévisions - 2026',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/Kenzo_1.mp4',
        modal: true,
      },
    ],
  },
  {
    slug: 'interactive-experiences',
    n: '02',
    label: 'Interactive Experiences',
    copy: 'For exhibitions, public spaces, and events combining visuals, interaction, and spatial design.',
    tags: ['Projection mapping', 'Realtime visuals', 'Design'],
    projects: [
      {
        client: 'Strike Against the Archive',
        title: 'Exhibition at ADAGP - 2025',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/strike.mp4',
        modal: true,
      },
      {
        client: 'Coup de cœur',
        title:
          'Interactive film commission for Bibliothèque Historique de la Ville de Paris - 2018',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/iglou1.mp4',
        modal: true,
      },
      {
        client: 'Sanofi',
        title: 'Installation for Diabetes Awareness - 2017',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/sanofi.mp4',
        modal: true,
      },
    ],
  },
  {
    slug: 'digital-interfaces',
    n: '03',
    label: 'Digital Interfaces',
    copy: 'Online experiences designed to be accessible and playful.',
    tags: ['Websites', 'Mobile apps', 'Workflow automation'],
    projects: [
      {
        client: 'Peter Lindbergh',
        title: 'Website - Design by David Polonia',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/peter_lindbergh.mp4',
        modal: true,
      },
      {
        client: 'Kenzo',
        title: 'Website - Design by Kim Boutin',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/kenzo.mp4',
        modal: true,
      },
      {
        client: 'Madame C',
        title: 'Website - Design by Caroline Ritzler',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/madame_c.mp4',
        modal: true,
      },
    ],
  },
];
