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
    skills: ['Laravel', 'PHP', 'Node.js', 'Express.js', 'REST APIs', 'MVC Architecture', 'Eloquent ORM', 'Laravel Sanctum', 'JWT', 'RBAC'],
  },
  {
    label: 'Frontend Development',
    color: '#A78BFA',
    skills: ['React.js', 'Redux', 'TypeScript', 'Vite', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    label: 'Data Layer',
    color: '#34D399',
    skills: ['MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Database Design', 'Stored Procedures', 'Query Optimization'],
  },
  {
    label: 'Tools & Deployment',
    color: '#F59E0B',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'AWS EC2', 'cPanel', 'Linux', 'SSL', 'DNS', 'Postman', 'VS Code', 'Composer', 'npm'],
  },
]

export const projects: Project[] = [
  {
    slug: 'creative-it-park-website',
    number: '01',
    title: 'Creative IT Park Website',
    category: 'Corporate Platform',
    status: 'Production',
    description: 'Led the migration of the corporate website from Laravel to a modern React + Node.js stack, delivering a custom admin panel and the company\'s first production deployment workflow.',
    tagline: 'Corporate website rebuilt from Laravel to a modern React.js and Node.js stack, featuring a custom admin panel, production-ready contact workflow, and a complete deployment pipeline.',
    taglineShort: 'React Migration · Production Deployment',
    context: 'Creative IT Park · Live production · Laravel + React + Node.js',
    problem: 'The existing website was difficult to maintain, lacked responsive design, and required developer involvement for content updates. The project modernized the platform with a scalable architecture and a custom administration system that enabled non-technical staff to manage content independently.',
    myRole: 'Led the migration of the corporate platform while developing backend modules, administration features, content management, contact workflow, and coordinating the first successful production deployment.',
    whatIBuilt: [
      'Migrated the corporate website from a static Laravel/Blade setup to a React.js frontend with a Node.js backend',
      'Built a custom admin panel for managing services, team members, and contact inquiries',
      'Implemented Eloquent-based content management with clean public/admin route separation',
      'Developed contact form handling with database storage and SMTP email notifications via Laravel Mail',
      'Coordinated the full production deployment — cPanel setup, SSL configuration, DNS, and environment management',
      'Diagnosed and resolved a PHP 7.4 vs 8.1 version mismatch that caused silent failures on the production server',
    ],
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
    takeaways: 'This project strengthened my understanding of production deployments, environment management, and building maintainable CMS platforms that can be operated by non-technical teams.',
    whereItBreaksDown: '',
    engineeringHighlights: [
      { label: 'Migration', detail: 'Laravel → React + Node.js' },
      { label: 'Deployment', detail: 'cPanel · SSL · DNS' },
      { label: 'Admin System', detail: 'Custom CMS' },
    ],
    stack: ['Laravel', 'React.js', 'Node.js', 'MySQL', 'PHP'],
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
    category: 'Sports Platform',
    status: 'Production',
    description: 'Designed and developed a production CMS enabling editors to publish articles, schedule content, automate media processing, and manage sports content without developer involvement.',
    tagline: 'Designed and developed a production CMS for a live Laravel application, introducing editorial workflows, scheduled publishing, and automated media processing without disrupting existing functionality.',
    taglineShort: 'Custom CMS · Editorial Workflow',
    context: 'Creative IT Park · Client project · Existing Laravel codebase',
    problem: 'The existing platform relied on manual database updates for publishing content. Editors had no administrative interface, making routine updates dependent on developers. The objective was to introduce a scalable CMS without interrupting the live application.',
    myRole: 'Designed and implemented a complete CMS layer on top of an existing production Laravel application, including editorial workflows, scheduled publishing, automated image processing, and administration features while preserving the existing architecture.',
    whatIBuilt: [
      'Designed and built a complete CMS layer on top of an existing live Laravel application',
      'Implemented article management with draft, scheduled, and published editorial workflow states',
      'Built a media upload pipeline using Intervention Image — generating thumbnail, medium, and full-size variants on upload',
      'Created a scheduled Artisan command that auto-publishes content at the configured time',
      'Built an editorial admin panel allowing the client team to manage all content without developer involvement',
      'Extended the codebase without modifying or breaking any existing functionality',
    ],
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
        title: 'Safely extending a production Laravel codebase',
        description: 'The application had established patterns and was actively used by the client. Adding features without understanding the structure risked breaking things that were already working.',
        solution: 'Before implementing new functionality, I traced the complete request lifecycle, followed the project\'s architectural conventions, reused existing validation and controller patterns, and introduced new modules incrementally to ensure zero regressions.',
      },
    ],
    takeaways: 'This project reinforced the importance of understanding an existing codebase before extending it. Careful analysis, consistency with established patterns, and incremental development made it possible to introduce major functionality without affecting production stability.',
    whereItBreaksDown: '',
    engineeringHighlights: [
      { label: 'Editorial Workflow', detail: 'Draft · Scheduled · Published' },
      { label: 'Media Pipeline', detail: 'Thumbnail · Medium · Full Size' },
      { label: 'Safe Extension', detail: 'Zero Regression · Existing Architecture' },
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
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
    category: 'Product Management Platform',
    status: 'Production',
    description: 'Designed and developed a product catalog website and custom CMS for a door manufacturer, allowing non-technical staff to manage products, variants, pricing, and website content independently.',
    tagline: 'Designed and developed a production-ready product management platform with a normalized database architecture that eliminated duplicate data and simplified catalog management.',
    taglineShort: 'Product Catalog · Variant Schema',
    context: 'Creative IT Park · Client project · Laravel + Blade',
    problem: 'The client managed a product catalog with multiple size and finish combinations per product. Every price update or content change required contacting a developer to modify the database directly. The existing approach produced significant data duplication, making updates error-prone and time-consuming. The goal was to deliver a self-managed platform that non-technical staff could operate independently.',
    myRole: 'Designed the full database schema before writing any code, separating shared product attributes from variant-specific data. Built the product catalog, variant management system, category relationships, admin panel, and public-facing business website from scratch.',
    whatIBuilt: [
      'Designed the full normalized database schema — separating shared product attributes from variant-specific data to eliminate duplication',
      'Built a product catalog supporting multiple variants per product (size, finish, price, stock status)',
      'Implemented a product variant engine supporting independent pricing, stock management, and multiple size/finish combinations.',
      'Implemented a many-to-many category system so products can appear in multiple categories without data duplication',
      'Developed a custom admin panel allowing non-technical staff to manage products, categories, variants, and pricing independently',
      'Built a responsive business website with product browsing, category filtering, and dynamic product pages powered by the CMS.',
    ],
    technicalApproach: `Schema designed on paper before any code:

  products          id, name, description, category_id
  product_images    id, product_id, path, size_label, sort_order
  product_variants  id, product_id, size, finish, price, in_stock

One product record, many variant records. Shared attributes (name, description, images) live on the product. Variable attributes (size, finish, price, stock) live on the variant.

Result: updating a product description is one UPDATE — not one per variant. Categories use a many-to-many pivot, so a product can appear in multiple categories without duplication.`,
    keyFeatures: [],
    challenges: [
      {
        title: 'Designing a Scalable Product Variant Architecture',
        description: 'The naive approach — one row per variant combination — would produce 15 rows for a door in 5 sizes × 3 finishes, each duplicating the product name, description, and images. A single description change would require 15 UPDATE statements.',
        solution: 'The schema was designed before implementation by separating shared product data from variant-specific attributes using relational modeling and foreign-key relationships. This reduced duplication, simplified updates, and produced a more maintainable catalog.',
      },
    ],
    takeaways: 'This project reinforced that good database design reduces application complexity long before code is written. I now treat schema design as the foundation of every business application.',
    whereItBreaksDown: '',
    engineeringHighlights: [
      { label: 'Database Design', detail: 'Normalized Schema' },
      { label: 'Variant Engine', detail: 'One Product · Multiple Variants' },
      { label: 'Admin Platform', detail: 'Products · Categories · Pricing' },
      { label: 'Catalog Engine', detail: 'Dynamic Filtering' },
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
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
    category: 'National Education Platform',
    status: 'Production',
    description: 'Supported backend development for a national financial literacy platform by implementing production fixes, feature enhancements, and SQL Server–based workflows used in a live educational system.',
    tagline: 'Contributed to the backend of a production Laravel application for a national financial literacy platform, delivering bug fixes, feature enhancements, and SQL Server–based improvements within an enterprise development workflow.',
    taglineShort: 'Production Backend · SQL Server',
    context: 'NIBAF Pakistan · Internal platform · Laravel + SQL Server',
    problem: 'PomPak is a live financial literacy platform operated by NIBAF Pakistan, a government financial institution. The platform was in active use and required ongoing maintenance — accumulated bug reports, pending feature requests, and production stability work. The codebase used SQL Server rather than MySQL, introducing driver-specific differences in query syntax, date functions, and migration behaviour that required careful adaptation.',
    myRole: 'Contributed to production maintenance by resolving backend issues, implementing feature enhancements, validating application behaviour, and collaborating with senior developers while adapting Laravel development to SQL Server–based workflows.',
    whatIBuilt: [
      'Reproduced and resolved reported backend bugs across the Laravel application',
      'Implemented feature enhancements requested by the platform team',
      'Tested application modules and verified fixes against original bug reports and edge cases',
      'Adapted Laravel queries and migrations to SQL Server driver–specific syntax and behaviour',
      'Collaborated with senior developers on more complex development tasks',
    ],
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
        title: 'Adapting Laravel Development to SQL Server',
        description: 'The project used SQL Server rather than MySQL. Some query builder methods and Eloquent behaviours differ between drivers, and date/time functions required SQL Server-specific syntax that doesn\'t work in MySQL.',
        solution: 'Reviewed SQL Server driver documentation before modifying any queries. Used SQL Server–specific syntax where required, validated queries independently before integration, and tested each change against the original bug report and edge cases before submitting for review.',
      },
    ],
    takeaways: 'This project strengthened my understanding of maintaining production software, working within established codebases, and making safe, incremental improvements under real development workflows.',
    whereItBreaksDown: '',
    engineeringHighlights: [
      { label: 'Production Support', detail: 'Bug Fixes · Feature Enhancements' },
      { label: 'SQL Server', detail: 'Driver Adaptation · Query Validation' },
      { label: 'Enterprise Workflow', detail: 'Testing · Collaboration' },
    ],
    stack: ['Laravel', 'PHP', 'SQL Server', 'Git'],
    images: [
      '/images/pompak/Screenshot 2026-07-06 161112.png',
      '/images/pompak/Screenshot 2026-07-06 162236.png',
      '/images/pompak/Screenshot 2026-07-06 162308.png',
      '/images/pompak/Screenshot 2026-07-06 162340.png',
    ],
    liveUrl: 'https://nflpy.pk/elearning',
    githubUrl: 'https://github.com/mfaizanx7/pompak-showcase',
  },
]

export const allProjects = projects
