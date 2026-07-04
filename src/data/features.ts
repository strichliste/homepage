import type { ImageMetadata } from 'astro';
import rest from '../assets/features/rest.png';
import sqlite from '../assets/features/sqlite.png';
import statistics from '../assets/features/statistics.png';
import webBased from '../assets/features/web-based.png';

export interface Feature {
  title: string;
  img: ImageMetadata;
  text: string;
}

export const features: Feature[] = [
  {
    title: 'Statistics',
    img: statistics,
    text: 'The metrics page shows the sum of all balances, transaction volume and top articles. Every user gets personal statistics too.',
  },
  {
    title: 'Database agnostic',
    img: sqlite,
    text: 'Runs on the database you already have: SQLite for a single kiosk, PostgreSQL or MariaDB for busy installs. Switching is one setting.',
  },
  {
    title: 'REST API',
    img: rest,
    text: 'Write your own client against the REST API. Interactive documentation is built into your installation at /api/doc.',
  },
  {
    title: 'Web-based',
    img: webBased,
    text: 'Runs on any device with a web browser, and works even with JavaScript disabled.',
  },
];
