export const site = {
  name: 'Andrew Hong',
  title: 'Andrew Hong | Product Designer',
  description:
    "I'm Andrew Hong, a product designer based in Philadelphia making things that I can be proud of.",
  email: 'andrewhong09@gmail.com',
  linkedin: 'https://www.linkedin.com/in/andrewjhong/',
  cv: 'https://read.cv/andrewhong',
};

export const nav = [
  { href: '/', label: 'Work' },
  { href: '/playground', label: 'Playground' },
  { href: '/about', label: 'About' },
];

// "Selected works" grid on the home page, in order.
// `thumb` is a file name in src/assets/media (no extension).
export const projects = [
  { slug: 'lumi', title: 'Lumi', blurb: 'Supply chain management tools', thumb: 'lumi-dashboard-3', protected: true },
  { slug: 'mlb-at-bat-ios', title: 'MLB: The Official App', blurb: 'Product Design', thumb: 'project-thumb_at-bat' },
  { slug: 'mlb-at-bat-stats', title: 'MLB Stats', blurb: 'Case Study', thumb: 'project-thumb_at-bat-stats' },
  { slug: '1stdibs-seller', title: '1stDibs Seller Tools', blurb: 'Marketplace seller tools', thumb: '1stdibs-dashboard-final2', protected: true },
  { slug: 'portfolio', title: '1stdibs Contemporary', blurb: 'Product Design', thumb: 'project-thumb_1d-contemporary' },
  { slug: 'trove', title: 'Trove 3D Printing', blurb: 'Product Design', thumb: 'project-thumb_trove' },
];
