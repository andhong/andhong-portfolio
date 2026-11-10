export const site = {
  name: 'Andrew Hong',
  title: 'Andrew Hong | Product Designer',
  description:
    "I'm Andrew Hong, a product designer based in Philadelphia making things that I can be proud of.",
  email: 'andrewhong09@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andrewjhong/',
};

export const nav = [
  { href: '/', label: 'Work' },
  { href: '/playground', label: 'Playground' },
  { href: '/about', label: 'About' },
];

// "Selected works" grid on the home page, in order.
// `thumb` is a file name in src/assets/media (no extension); `years` shows under the title.
// `hidden: true` keeps the page live at its URL but leaves it off the home page.
export const projects = [
  { slug: 'lumi', title: 'Lumi', blurb: 'Supply chain management tools', years: '2019–2020', thumb: 'lumi-dashboard-3' },
  { slug: 'mlb-at-bat-ios', title: 'MLB: The Official App', blurb: 'Product design', years: '2017–2019', thumb: 'project-thumb_at-bat' },
  { slug: 'mlb-at-bat-stats', title: 'MLB Stats', blurb: 'Case study', years: '2017–2019', thumb: 'project-thumb_at-bat-stats' },
  { slug: '1stdibs-seller', title: '1stDibs Seller Tools', blurb: 'Marketplace seller tools', years: '2017', thumb: '1stdibs-dashboard-final2' },
  { slug: 'portfolio', title: '1stdibs Contemporary', blurb: 'Product design', years: '2017', thumb: 'project-thumb_1d-contemporary', hidden: true },
  { slug: 'trove', title: 'Trove 3D Printing', blurb: 'Product design', years: '2014–2016', thumb: 'project-thumb_trove', hidden: true },
];

// "Recent work" features at the top of the home page, in order.
// A tile without `name` renders as a placeholder until real images are added.
// `draft: true` shows the section in local preview (npm run dev) but not on the live site.
export type Tile = { name?: string; alt: string };
export const recent: {
  company: string;
  title: string;
  tagline: string;
  tags: string;
  href: string;
  tiles: Tile[];
  draft?: boolean;
}[] = [
  {
    draft: true,
    company: 'ClassDojo',
    title: 'Dojo Tutor',
    tagline: 'is ClassDojo’s marketplace connecting tutors and families across a wide range of subjects, in both 1-on-1 and group formats.',
    tags: 'Product design • Product building',
    href: '/dojo-tutor',
    tiles: [
      { alt: 'Dojo Tutor image 1' },
      { alt: 'Dojo Tutor image 2' },
      { alt: 'Dojo Tutor image 3' },
      { alt: 'Dojo Tutor image 4' },
    ],
  },
  {
    company: 'Hank',
    title: 'Hank',
    tagline: 'is a social network focused on fighting social isolation amongst older adults.',
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
