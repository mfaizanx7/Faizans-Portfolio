import type { SiteMeta, ExperienceItem, StackGroup, Project, NavItem } from '@/types'

export const meta: SiteMeta = {
  name: 'Muhammad Faizan Khan',
  shortName: 'Faizan Khan',
  role: 'Full-Stack Web Developer',
  specialization: 'Laravel',
  headline: 'Building reliable backend systems and production-ready web applications.',
  subheadline: 'Full-stack web developer with hands-on experience building CMS platforms, business web applications, enterprise portals, REST APIs, and admin panels using Laravel, React, PHP, MySQL, Node.js, and modern web technologies.',
  availableFor: 'Available now · Open to full-time roles',
  location: 'Islamabad, Pakistan',
  email: 'mfaizanx10@gmail.com',
  github: 'https://github.com/mfaizanx7',
  linkedin: 'https://www.linkedin.com/in/muhammad-faizan-khan-x7/',
  resumeUrl: '/resume/M Faizan Khan.pdf',
  contactNote: "I'm looking for a backend role where the codebase is something people are proud of. Laravel, PHP, MySQL. Available immediately.",
}

export const navItems: NavItem[] = [
  { label: 'Projects',     href: '#work',       sectionId: 'work'       },
  { label: 'Experience',   href: '#experience', sectionId: 'experience' },
  { label: 'Skills',       href: '#stack',      sectionId: 'stack'      },
  { label: 'Contact',      href: '#contact',    sectionId: 'contact'    },
]

export const experiences: ExperienceItem[] = [
  {
    company: 'Creative IT Park',
    role: 'Web Developer Intern',
    period: 'Apr 2026 – Jul 2026',
    location: 'Islamabad, Pakistan',
    description: 'Worked on client and in-house web applications, CMS platforms, backend features, and production deployments.',
    stack: 'Laravel · PHP · MySQL · React.js · Node.js · REST APIs · Git · cPanel',
    bullets: [
      { text: 'Rebuilt the Creative IT Park website from Laravel to React.js and Node.js, developing frontend and backend components.' },
      { text: 'Implemented client-requested features across Laravel, React.js, and Node.js applications while supporting production systems.' },
      { text: 'Developed CMS functionality for OD Sports and Perfect Doors, including content, media, events, and product management.' },
      { text: 'Supported production deployments using cPanel, DNS configuration, SSL setup, and live release workflows.' },
    ],
  },
  {
    company: 'NIBAF Pakistan',
    role: 'Web Developer Intern',
    period: 'Jan 2026 – Feb 2026',
    location: 'Islamabad, Pakistan',
    description: 'Supported backend development and testing for the PomPak financial literacy platform.',
    stack: 'Laravel · PHP · SQL Server · Git',
    bullets: [
      { text: 'Fixed backend issues and implemented small feature enhancements using Laravel and SQL Server.' },
      { text: 'Tested application modules, identified defects, and resolved straightforward issues.' },
      { text: 'Collaborated with senior developers on more complex development tasks.' },
      { text: 'Worked with Laravel, SQL Server, Git, and collaborative development workflows.' },
    ],
  },
]

export const stackGroups: StackGroup[] = [
  {
    label: 'Backend Engineering',
    color: '#3B82F6',
    skills: ['Laravel', 'PHP', 'Node.js', 'Express.js', 'REST APIs', 'Laravel Sanctum', 'JWT', 'MVC Architecture'],
  },
  {
    label: 'Frontend Integration',
    color: '#A78BFA',
    skills: ['React.js', 'JavaScript', 'Blade', 'Bootstrap', 'HTML', 'CSS', 'Responsive UI'],
  },
  {
    label: 'Data Layer',
    color: '#34D399',
    skills: ['MySQL', 'SQL Server', 'Eloquent ORM', 'Database Design', 'Stored Procedures', 'PostgreSQL', 'MongoDB'],
  },
  {
    label: 'Tools & Deployment',
    color: '#F59E0B',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Composer', 'cPanel', 'Linux CLI', 'SSL', 'DNS'],
  },
]

export const projects: Project[] = [
  {
    slug: 'creative-it-park-website',
    number: '01',
    title: 'Creative IT Park Website',
    category: 'Company Website & CMS',
    status: 'Production',
    description: 'Company website and CMS rebuilt for managing content, pages, and admin workflows.',
    tagline: 'Laravel-powered company website with a custom admin panel, contact form pipeline, and a first production deployment I debugged and shipped myself.',
    context: 'Creative IT Park · Live production · Laravel + React + Node.js',
    problem: 'The old site was static, not mobile-responsive, and required a developer to change any content. The team needed to manage services, team members, and contact inquiries without touching code.',
    myRole: 'Built the entire Laravel backend from scratch — admin panel, contact form handling, email notifications via Laravel Mail, and Eloquent-based content management. Also contributed to the Blade frontend and owned the first production deployment end-to-end, including debugging a PHP version mismatch that broke the initial deploy.',
    technicalApproach: `Laravel + Blade MVC. Admin panel uses Laravel Auth middleware — no third-party package. Contact submissions stored in DB and trigger SMTP email via Laravel Mail.

Content managed through Eloquent resource controllers with custom Blade views. Clean separation: public routes vs. admin routes, each with their own middleware group.

Deployment issue I hit and fixed:
  - Dev: PHP 8.1 / Production: PHP 7.4
  - Several 8.x-only syntax features broke silently
  - Fixed by auditing the codebase, replacing incompatible syntax, setting correct storage permissions, and documenting a repeatable deploy checklist used on every project since`,
    keyFeatures: [],
    challenges: [
      {
        title: 'PHP version mismatch killed the first deploy',
        description: 'Production server was on PHP 7.4. Dev was on 8.1. Named arguments, union types, and a few other 8.x features were used throughout — none of them threw errors locally, all of them failed in production. Storage permissions were also wrong, causing silent write failures.',
        solution: 'Audited every file for 8.x-only syntax, replaced with 7.4-compatible equivalents. Fixed storage/bootstrap/cache permissions. Wrote a deploy checklist covering environment, permissions, migrations, and config caching — still use it today.',
      },
    ],
    takeaways: 'Production is a different environment. I now verify PHP version, permissions, and env config before writing a single line of application code on any new project.',
    whereItBreaksDown: '',
    stack: ['Laravel', 'PHP', 'MySQL', 'React.js', 'Node.js', 'Express.js', 'REST APIs', 'Git', 'cPanel'],
    images: [
      '/images/creativeitpark/Screenshot 2026-07-05 200818.png',
      '/images/creativeitpark/Screenshot 2026-07-06 162521.png',
      '/images/creativeitpark/Screenshot 2026-07-07 102109.png',
    ],
    liveUrl: 'https://creativeitpark.org',
    githubUrl: 'https://github.com/mfaizanx7/creative-it-park-website',
  },
  {
    slug: 'odsports-cms',
    number: '02',
    title: 'OD Sports',
    category: 'Sports Media Platform',
    status: 'Completed',
    description: 'Sports media CMS for managing content, events, and editorial workflows.',
    tagline: 'CMS module added to a live Laravel application — article scheduling, multi-size image processing, and an editorial workflow built without touching existing functionality.',
    context: 'Creative IT Park · Client project · Existing Laravel codebase',
    problem: 'All content was being inserted directly via database queries. The editorial team had no interface — every article, match result, or player profile required a developer. The existing codebase had no CMS layer at all.',
    myRole: 'Added the full CMS layer to a codebase I didn\'t write. Article management with draft/scheduled/published states, a media upload pipeline that generates three image sizes on upload, and a scheduled Artisan command that auto-publishes content. Did this without breaking any existing functionality.',
    technicalApproach: `First step before writing any code: traced one complete request through the application — route → middleware → controller → model → response. That trace revealed the conventions, patterns, and structure I needed to match.

Content scheduling:
  published_at TIMESTAMP on articles
  Artisan command runs every 15 min via Laravel scheduler
  Publishes where published_at <= NOW() AND status = 'draft'

Media upload pipeline (Intervention Image):
  thumbnail: 200px
  medium:    600px
  full:      1200px
  Paths stored in article_images with size_label column`,
    keyFeatures: [],
    challenges: [
      {
        title: 'Extending a live codebase without breaking it',
        description: 'The application had established patterns and was actively used by the client. Adding features without understanding the structure risked breaking things that were already working.',
        solution: 'Read before writing. Traced the full request lifecycle first. Matched existing controller structure, validation patterns, and response format exactly. When unsure about a convention, asked the senior developer. No existing functionality broke.',
      },
    ],
    takeaways: 'The fastest way to understand an existing codebase is to follow one complete request from route to response. Everything else — models, helpers, service classes — makes sense once you understand the flow.',
    whereItBreaksDown: '',
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'jQuery', 'Bootstrap', 'Intervention Image', 'Git'],
    images: [
      '/images/odsports/Screenshot 2026-07-06 155343.png',
      '/images/odsports/Screenshot 2026-07-06 161942.png',
      '/images/odsports/Screenshot 2026-07-06 223547.png',
    ],
    githubUrl: 'https://github.com/mfaizanx7/od-sports-cms',
    liveUrl: 'https://odsports.pk',
  },
  {
    slug: 'perfect-doors-cms',
    number: '03',
    title: 'Perfect Doors Website',
    category: 'Business Website',
    status: 'Completed',
    description: 'Business website and CMS for managing products, categories, and website content.',
    tagline: 'Laravel product catalog with a normalised variant schema — designed on paper first, built to eliminate data duplication across product variants.',
    context: 'Creative IT Park · Client project · Laravel + Blade',
    problem: 'Every price update or new variant required emailing a developer to touch the database. A door available in 5 sizes and 3 finishes meant 15 rows of duplicated data under the naive approach.',
    myRole: 'Built the backend and admin interface from scratch. Designed the database schema before opening a code editor — the key decision was separating shared product attributes from variable ones, which made bulk updates single operations instead of 15.',
    technicalApproach: `Schema designed on paper before any code:

  products          id, name, description, category_id
  product_images    id, product_id, path, size_label, sort_order
  product_variants  id, product_id, size, finish, price, in_stock

One product record, many variant records. Shared attributes (name, description, images) live on the product. Variable attributes (size, finish, price, stock) live on the variant.

Result: updating a product description is one UPDATE — not one per variant. Categories use a many-to-many pivot, so a product can appear in multiple categories without duplication.`,
    keyFeatures: [],
    challenges: [
      {
        title: 'Modeling variants without duplicating product data',
        description: 'The naive approach — one row per variant combination — would produce 15 rows for a door in 5 sizes × 3 finishes, each duplicating the product name, description, and images. A single description change would require 15 UPDATE statements.',
        solution: 'Separated product (shared) from variant (variable). One product record, many variant records linked by foreign key. The decision took 10 minutes on paper and saved significant rework. Every project since, I sketch the schema before writing migrations.',
      },
    ],
    takeaways: 'Ten minutes of schema design on paper is worth hours of migration rewrites. I now treat the data model as the first deliverable on any project, not an afterthought.',
    whereItBreaksDown: '',
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap', 'Git'],
    images: [
      '/images/perfectdoors/Screenshot 2026-07-05 203100.png',
      '/images/perfectdoors/Screenshot 2026-07-06 221644.png',
      '/images/perfectdoors/Screenshot 2026-07-07 104030.png',
    ],
    githubUrl: 'https://github.com/mfaizanx7/perfect-doors-cms',
    liveUrl: 'https://perfect-doors.creativeitpark.org/',
  },
  {
    slug: 'pompak-financial-literacy',
    number: '04',
    title: 'PomPak Financial Literacy Platform',
    category: 'EdTech / Financial Education',
    status: 'Internal',
    description: 'Financial literacy learning platform supported with backend fixes and feature enhancements.',
    tagline: 'Backend support on a live Laravel + SQL Server application for a government financial institution — bug fixes, feature enhancements, and learning a new database driver under real constraints.',
    context: 'NIBAF Pakistan · Internal platform · Laravel + SQL Server',
    problem: 'The platform had accumulated bugs and pending feature requests. The codebase used SQL Server instead of MySQL — a different driver with different behaviour in Laravel\'s query builder, date functions, and migration syntax.',
    myRole: 'Reproduced and fixed reported bugs, implemented small feature enhancements, and tested modules across the application. Collaborated with senior developers on more complex tasks. Had to adapt quickly to SQL Server inside Laravel — a combination I hadn\'t worked with before.',
    technicalApproach: `Laravel with the sqlsrv driver. Key differences from MySQL I had to learn fast:

  - Date functions differ: GETDATE() vs NOW(), DATEADD() vs DATE_ADD()
  - Migrations use nvarchar instead of varchar for Unicode
  - Stored procedures called via DB::statement()
  - Some Eloquent query builder methods behave differently across drivers

Debugging workflow I followed on every bug:
  1. Reproduce in local environment first — never fix blind
  2. Identify root cause in controller or model layer
  3. Make the smallest change that fixes the problem
  4. Test against original report + edge cases
  5. Submit for senior developer review`,
    keyFeatures: [],
    challenges: [
      {
        title: 'SQL Server inside Laravel — different rules',
        description: 'The project used SQL Server rather than MySQL. Some query builder methods and Eloquent behaviours differ between drivers, and date/time functions required SQL Server-specific syntax that doesn\'t work in MySQL.',
        solution: 'Reviewed the Laravel SQL Server driver documentation before touching any query. Used raw DB::select() for SQL Server-specific functions. Tested every query in isolation before integrating. Stopped assuming MySQL behaviour applied.',
      },
    ],
    takeaways: 'Supporting a production codebase mid-development is a different discipline from building from scratch. The priority is always: understand the intent, make the smallest change, verify it works, move on.',
    whereItBreaksDown: '',
    stack: ['Laravel', 'PHP', 'SQL Server', 'Git'],
    images: [
      '/images/pompak/Screenshot 2026-07-06 161112.png',
      '/images/pompak/Screenshot 2026-07-06 162236.png',
      '/images/pompak/Screenshot 2026-07-06 162308.png',
      '/images/pompak/Screenshot 2026-07-06 162340.png',
    ],
    liveUrl: 'https://nflpy.pk/elearning',
  },
]

export const allProjects = projects
