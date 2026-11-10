export const site = {
  name: 'Andrew Hong',
  title: 'Andrew Hong - Product Designer',
  description:
    "I'm Andrew Hong, a product designer based in Philadelphia making things that I can be proud of.",
  email: 'andrewhong09@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andrewjhong/',
};

export const nav = [
  { href: '/', label: 'Work' },
  { href: '/play', label: 'Play' },
  { href: '/about', label: 'About' },
];

// "Selected works" grid on the home page, in order.
// `thumb` is a file name in src/assets/media (no extension); `years` shows under the title.
// `hidden: true` keeps the page live at its URL but leaves it off the home page.
export const projects = [
  { slug: 'lumi', title: 'Lumi', blurb: 'Supply chain management tools', years: '2019–2020', thumb: 'lumi-dashboard-3', hidden: true },
  { slug: 'mlb-at-bat-ios', title: 'MLB: The Official App', blurb: 'Product design', years: '2017–2019', thumb: 'project-thumb_at-bat', hidden: true },
  { slug: 'mlb-at-bat-stats', title: 'MLB Stats', blurb: 'Case study', years: '2017–2019', thumb: 'project-thumb_at-bat-stats', hidden: true },
  { slug: '1stdibs-seller', title: '1stDibs Seller Tools', blurb: 'Marketplace seller tools', years: '2017', thumb: '1stdibs-dashboard-final2', hidden: true },
  { slug: 'portfolio', title: '1stdibs Contemporary', blurb: 'Product design', years: '2017', thumb: 'project-thumb_1d-contemporary', hidden: true },
  { slug: 'trove', title: 'Trove 3D Printing', blurb: 'Product design', years: '2014–2016', thumb: 'project-thumb_trove', hidden: true },
];

// "Recent work" features at the top of the home page, in order.
// Each feature shows either one `hero` image or a 2×2 grid of four `tiles`
// (file names in src/assets/media); an image without `name` renders as a placeholder.
// `draft: true` shows the section in local preview (npm run dev) but not on the live site.
/** `wall: true` renders the animated wall of screens (HeroWall) instead of the image;
 *  `video` (a path under public/, with an optional `poster`) plays a looping video instead. */
export type Hero = { name?: string; alt: string; wall?: boolean; video?: string; poster?: string };
export const recent: {
  company: string;
  title: string;
  tagline: string;
  tags: string;
  href: string;
  hero?: Hero;
  tiles?: Hero[];
  /** Custom headline in place of "*title* tagline": plain text, an italic phrase, then plain text. */
  heading?: [string, string, string];
  draft?: boolean;
}[] = [
  {
    company: 'ClassDojo',
    title: 'Dojo Tutor',
    tagline: 'ClassDojo: Taking Dojo Tutor from MVP to a learning marketplace families and tutors trust.',
    heading: ['ClassDojo: Taking ', 'Dojo Tutor', ' from MVP to a learning marketplace families and tutors trust.'],
    tags: 'Product design • Product building',
    href: '/dojo-tutor',
    hero: { name: 'dojo-tutor-hero', wall: true, alt: 'A wall of Dojo Tutor screens across web and mobile: calendars, chats, pricing, group classes, insights, and the parent home' },
  },
  {
    company: 'ClassDojo',
    title: 'Tutor-set pricing',
    tagline: 'Enabling Dojo Tutor’s tutors to set their own prices and take control of their businesses.',
    heading: ['Enabling Dojo Tutor’s tutors to ', 'set their own prices', ' and take control of their businesses.'],
    tags: 'Product design • User research • Product building',
    href: '/tutor-pricing',
    hero: { video: '/media/dojo-pricing-hero.mp4', poster: '/media/dojo-pricing-hero-poster.jpg', alt: 'Setting a group class price: recommended range, take-home pay after the platform fee, and Earnings Boost' },
  },
  {
    company: 'Hank',
    title: 'Hank',
    tagline: 'Founding and building Hank, a social network focused on fighting social isolation amongst older adults.',
    heading: ['Founding and building ', 'Hank', ', a social network focused on fighting social isolation amongst older adults.'],
    tags: 'Brand identity • Product design',
    href: '/project/hank',
    tiles: [
      { name: 'hank-app-screenshot', alt: 'Hank app screenshot' },
      { name: 'hank-printed-card', alt: 'Hank printed card' },
      { name: 'member-pins', alt: 'Hank member pins' },
      { name: 'hank-screenshots-UI-snippets-1', alt: 'Hank UI snippets' },
    ],
  },
];
