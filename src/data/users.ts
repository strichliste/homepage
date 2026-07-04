import type { ImageMetadata } from 'astro';
import backspace from '../assets/users/backspace.png';
import cccDarmstadt from '../assets/users/ccc-darmstadt.png';
import fem from '../assets/users/fem.png';
import fisEv from '../assets/users/fis-ev.png';
import hackerspaceBremen from '../assets/users/hackerspace-bremen.png';
import hackzogtum from '../assets/users/hackzogtum.png';
import maglab from '../assets/users/maglab.png';
import mhpSoftware from '../assets/users/mhp-software-gmbh.png';
import nerd2nerd from '../assets/users/nerd2nerd.png';
import nerdberg from '../assets/users/nerdberg.jpg';
import ownCloud from '../assets/users/ownCloud.png';
import schaffenburg from '../assets/users/schaffenburg.png';
import seeBase from '../assets/users/see-base.png';
import thobits from '../assets/users/thobits.png';
import thomann from '../assets/users/thomann.jpg';
import toolboxBodensee from '../assets/users/toolbox-bodensee.png';
import wwlabs from '../assets/users/wwlabs-banner.png';

interface User {
  name: string;
  link: string;
  img: ImageMetadata;
}

/** Organizations running strichliste, in the order the homepage shows them. */
export const users: User[] = [
  { name: 'Hackerspace Bremen e.V.', link: 'https://www.hackerspace-bremen.de/', img: hackerspaceBremen },
  { name: 'ownCloud', link: 'https://www.owncloud.org/', img: ownCloud },
  { name: 'Hackzogtum Coburg', link: 'https://www.hackzogtum-coburg.de/', img: hackzogtum },
  { name: 'backspace e.V.', link: 'https://www.hackerspace-bamberg.de', img: backspace },
  { name: 'Thomann', link: 'https://thomann.de', img: thomann },
  { name: 'Nerd2Nerd', link: 'https://www.nerd2nerd.org/', img: nerd2nerd },
  { name: 'Schaffenburg', link: 'https://schaffenburg.de/', img: schaffenburg },
  { name: 'Chaos Computer Club Darmstadt e.V.', link: 'https://www.chaos-darmstadt.de/', img: cccDarmstadt },
  { name: 'Magrathea Laboratories e.V.', link: 'https://mag.lab.sh/', img: maglab },
  { name: 'Toolbox Bodensee e.V.', link: 'https://toolbox-bodensee.de/', img: toolboxBodensee },
  { name: 'Hackerspace see-base', link: 'https://see-base.de/', img: seeBase },
  { name: 'Förderkreis innovatives Spiel e.V.', link: 'https://fis-ev.de', img: fisEv },
  { name: 'Westwoodlabs', link: 'https://westwoodlabs.de', img: wwlabs },
  { name: 'Nerdberg e.V.', link: 'https://www.nerdberg.de/', img: nerdberg },
  { name: 'MHP Software GmbH', link: 'https://www.mhp-solution-group.com/', img: mhpSoftware },
  { name: 'Thomann Bits & Beats', link: 'https://www.bitsbeats.io/', img: thobits },
  { name: 'Forschungsgemeinschaft elektronische Medien e.V.', link: 'https://fem.tu-ilmenau.de/', img: fem },
];
