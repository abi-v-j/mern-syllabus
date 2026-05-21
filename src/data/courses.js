import { getCourseProfile } from './courseProfiles.js';
import slugify from '../utils/slugify.js';

const t = (title, extras = {}) => ({ title, ...extras });

export const learningStages = [
  {
    stageId: 'foundation',
    badge: 'Phase 01',
    title: 'Foundations',
    summary: 'Start with browser basics, semantic HTML, CSS, JavaScript, and Git.',
  },
  {
    stageId: 'frontend',
    badge: 'Phase 02',
    title: 'Frontend',
    summary: 'Learn React, UI systems, animations, and modern client-side state management.',
  },
  {
    stageId: 'backend',
    badge: 'Phase 03',
    title: 'Backend',
    summary: 'Build APIs with Node.js, Express, MongoDB, Mongoose, and REST conventions.',
  },
  {
    stageId: 'production',
    badge: 'Phase 04',
    title: 'Production',
    summary:
      'Add auth, validation, uploads, integrations, testing, deployment, and realtime flows.',
  },
  {
    stageId: 'scale',
    badge: 'Phase 05',
    title: 'Scale',
    summary: 'Move into architecture, queues, caching, major projects, and interview readiness.',
  },
];

const stageLookup = Object.fromEntries(
  learningStages.map((stage, index) => [stage.stageId, { ...stage, order: index + 1 }]),
);

const courseBlueprints = [
  {
    courseId: 'web-development-basics',
    courseTitle: 'Web Development Basics',
    label: 'Start Here',
    stageId: 'foundation',
    level: 'Beginner',
    icon: 'WEB',
    accent: 'from-emerald-500/20 via-teal-500/10 to-sky-500/20',
    courseDescription:
      'Learn what actually happens when a user opens a website, clicks a button, or sends a form.',
    focus:
      'how browsers, servers, networks, requests, and developer tools connect inside a real web app',
    prerequisites: ['No coding background required', 'Basic computer usage'],
    tools: ['Browser', 'DevTools', 'VS Code', 'Terminal'],
    outcomes: [
      'Explain the request and response cycle in simple words.',
      'Understand where frontend and backend responsibilities begin and end.',
      'Debug basic browser and network issues with more confidence.',
    ],
    buildProject: 'Trace a login request from button click to server response.',
    searchTerms: ['internet basics', 'browser', 'server', 'dns', 'http', 'https'],
    topics: [
      t('How the Web Works', {
        estimatedMinutes: 18,
        searchTerms: ['dns', 'request', 'response', 'browser flow'],
      }),
      t('Client vs Server', {
        searchTerms: ['frontend vs backend', 'request source', 'response source'],
      }),
      t('Frontend vs Backend', {
        searchTerms: ['ui layer', 'api layer', 'web architecture'],
      }),
      t('HTTP and HTTPS', {
        searchTerms: ['http methods', 'secure transport', 'tls'],
      }),
      t('Domain, Hosting, Server Basics', {
        searchTerms: ['domain', 'hosting', 'vps', 'deployment basics'],
      }),
      t('Browser Developer Tools', {
        searchTerms: ['network tab', 'elements tab', 'console'],
      }),
    ],
  },
  {
    courseId: 'html',
    courseTitle: 'HTML',
    label: 'Markup',
    stageId: 'foundation',
    level: 'Beginner',
    icon: 'HTML',
    accent: 'from-orange-500/20 via-amber-500/10 to-rose-500/20',
    courseDescription:
      'Build clean page structure that is readable, accessible, and ready for CSS and JavaScript.',
    focus: 'semantic structure, accessibility, forms, and SEO-friendly content',
    prerequisites: ['Web Development Basics'],
    tools: ['VS Code', 'Browser', 'Emmet'],
    outcomes: [
      'Create semantic layouts for landing pages, dashboards, and forms.',
      'Use the right element for content, actions, media, and navigation.',
      'Understand how HTML supports accessibility and SEO.',
    ],
    buildProject: 'Build a structured multi-section landing page with a contact form.',
    searchTerms: ['semantic html', 'forms', 'seo basics', 'accessible markup'],
    topics: [
      t('HTML Introduction'),
      t('HTML Document Structure'),
      t('Headings, Paragraphs, Links'),
      t('Images and Lists'),
      t('Tables'),
      t('Forms and Inputs', {
        searchTerms: ['input types', 'label', 'form submit'],
      }),
      t('Semantic HTML', {
        searchTerms: ['header', 'main', 'section', 'article', 'footer'],
      }),
      t('SEO Basics', {
        searchTerms: ['meta tags', 'title tag', 'description'],
      }),
    ],
  },
  {
    courseId: 'css',
    courseTitle: 'CSS',
    label: 'Styling',
    stageId: 'foundation',
    level: 'Beginner',
    icon: 'CSS',
    accent: 'from-sky-500/20 via-cyan-500/10 to-emerald-500/20',
    courseDescription:
      'Style layouts, spacing, typography, motion, and responsiveness without losing clarity.',
    focus: 'layout, responsive design, visual hierarchy, and interface polish',
    prerequisites: ['HTML'],
    tools: ['Browser DevTools', 'VS Code'],
    outcomes: [
      'Build layouts with Flexbox and Grid.',
      'Create responsive interfaces that work on mobile and desktop.',
      'Use transitions and animations without overdesigning the UI.',
    ],
    buildProject: 'Turn a plain HTML page into a responsive product marketing page.',
    searchTerms: ['flexbox', 'grid', 'responsive', 'media queries'],
    topics: [
      t('CSS Introduction'),
      t('Selectors'),
      t('Colors and Units'),
      t('Box Model'),
      t('Display Properties'),
      t('Positioning'),
      t('Flexbox'),
      t('CSS Grid'),
      t('Responsive Design'),
      t('Media Queries'),
      t('Animations and Transitions', {
        searchTerms: ['css animation', 'transition', 'hover effect'],
      }),
    ],
  },
  {
    courseId: 'javascript-basics',
    courseTitle: 'JavaScript Basics',
    label: 'Logic',
    stageId: 'foundation',
    level: 'Beginner',
    icon: 'JS',
    accent: 'from-amber-500/20 via-yellow-500/10 to-lime-500/20',
    courseDescription:
      'Learn the programming basics that make web pages interactive and data-aware.',
    focus: 'variables, functions, arrays, objects, control flow, and common logic patterns',
    prerequisites: ['HTML', 'CSS'],
    tools: ['Browser Console', 'VS Code'],
    outcomes: [
      'Write small but correct programs for forms, lists, and calculations.',
      'Understand how data moves through variables, arrays, and objects.',
      'Use functions to make logic easier to reuse.',
    ],
    buildProject: 'Create a mini expense calculator with dynamic totals.',
    searchTerms: ['variables', 'functions', 'arrays', 'objects', 'loops'],
    topics: [
      t('JavaScript Introduction'),
      t('Variables'),
      t('Data Types'),
      t('Operators'),
      t('Conditions'),
      t('Loops'),
      t('Functions'),
      t('Arrays'),
      t('Objects'),
      t('String Methods'),
      t('Array Methods'),
      t('Date and Math'),
      t('Error Handling'),
    ],
  },
  {
    courseId: 'javascript-advanced',
    courseTitle: 'JavaScript Advanced',
    label: 'Advanced JS',
    stageId: 'foundation',
    level: 'Intermediate',
    icon: 'ES6',
    accent: 'from-fuchsia-500/20 via-sky-500/10 to-emerald-500/20',
    courseDescription:
      'Move into DOM APIs, asynchronous flows, fetch requests, modules, and storage.',
    focus: 'async JavaScript, browser APIs, modular code, and real user-driven interactions',
    prerequisites: ['JavaScript Basics'],
    tools: ['Browser', 'VS Code', 'Network tab'],
    outcomes: [
      'Handle async requests with promises and async/await.',
      'Work with APIs and JSON without blocking the UI.',
      'Use modules and browser storage in real projects.',
    ],
    buildProject: 'Build a searchable API-powered dashboard with local persistence.',
    searchTerms: ['promises', 'async await', 'fetch api', 'local storage'],
    topics: [
      t('DOM Manipulation'),
      t('Events'),
      t('ES6 Features'),
      t('Destructuring'),
      t('Spread and Rest Operators'),
      t('Template Literals'),
      t('Modules'),
      t('Callbacks'),
      t('Promises'),
      t('Async/Await'),
      t('Fetch API', {
        searchTerms: ['api request', 'fetch', 'json'],
      }),
      t('JSON'),
      t('Local Storage and Session Storage', {
        searchTerms: ['localstorage', 'sessionstorage', 'browser storage'],
      }),
    ],
  },
  {
    courseId: 'git-and-github',
    courseTitle: 'Git and GitHub',
    label: 'Versioning',
    stageId: 'foundation',
    level: 'Beginner',
    icon: 'GIT',
    accent: 'from-slate-500/20 via-orange-500/10 to-amber-500/20',
    courseDescription:
      'Track changes safely, work in branches, and collaborate without breaking each other’s work.',
    focus: 'commit flow, branches, pull requests, merge conflict handling, and team habits',
    prerequisites: ['JavaScript Basics'],
    tools: ['Git', 'GitHub', 'Terminal'],
    outcomes: [
      'Use everyday Git commands without guessing.',
      'Open clean pull requests and resolve basic conflicts.',
      'Understand how teams review and ship changes safely.',
    ],
    buildProject: 'Push a small feature through a branch and pull request workflow.',
    searchTerms: ['git commands', 'github', 'branching', 'pull requests'],
    topics: [
      t('Git Introduction'),
      t('Git Installation'),
      t('Git Commands'),
      t('GitHub Repository'),
      t('Branching'),
      t('Pull Requests'),
      t('Merge Conflicts'),
      t('GitHub Workflow'),
    ],
  },
  {
    courseId: 'react-js-basics',
    courseTitle: 'React.js Basics',
    label: 'React Core',
    stageId: 'frontend',
    level: 'Beginner',
    icon: 'RJS',
    accent: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20',
    courseDescription:
      'Build component-based interfaces with JSX, props, state, events, and forms.',
    focus: 'React mental model, reusable components, and interactive UI building',
    prerequisites: ['JavaScript Advanced'],
    tools: ['React', 'Vite', 'Browser DevTools'],
    outcomes: [
      'Break UI into small components.',
      'Pass data through props and local state clearly.',
      'Handle forms, lists, and conditional rendering in a clean way.',
    ],
    buildProject: 'Create a student dashboard with cards, filters, and form inputs.',
    searchTerms: ['jsx', 'components', 'props', 'state', 'react forms'],
    topics: [
      t('React Introduction'),
      t('React Project Setup'),
      t('JSX'),
      t('Components'),
      t('Props'),
      t('State'),
      t('Events'),
      t('Conditional Rendering'),
      t('Lists and Keys'),
      t('Forms in React'),
      t('React Styling'),
    ],
  },
  {
    courseId: 'react-js-advanced',
    courseTitle: 'React.js Advanced',
    label: 'React Pro',
    stageId: 'frontend',
    level: 'Intermediate',
    icon: 'HOOK',
    accent: 'from-cyan-500/20 via-sky-500/10 to-violet-500/20',
    courseDescription:
      'Level up with hooks, routing, guarded navigation, error boundaries, and larger app patterns.',
    focus: 'application structure, side effects, routing, and maintainable React flows',
    prerequisites: ['React.js Basics'],
    tools: ['React Router', 'Vite', 'DevTools'],
    outcomes: [
      'Use the core hooks correctly in real app scenarios.',
      'Organize route-based apps with lazy loading and protected screens.',
      'Move repeated logic into custom hooks.',
    ],
    buildProject: 'Build a multi-page dashboard with protected routes and shared app state.',
    searchTerms: ['react hooks', 'react router', 'protected routes', 'lazy loading'],
    topics: [
      t('React Hooks'),
      t('useState'),
      t('useEffect'),
      t('useRef'),
      t('useMemo'),
      t('useCallback'),
      t('Custom Hooks'),
      t('Context API'),
      t('React Router', {
        searchTerms: ['routing', 'nested routes', 'navigation'],
      }),
      t('Protected Routes'),
      t('Error Boundaries'),
      t('Code Splitting'),
      t('Lazy Loading'),
    ],
  },
  {
    courseId: 'state-management',
    courseTitle: 'State Management',
    label: 'Data Flow',
    stageId: 'frontend',
    level: 'Intermediate',
    icon: 'STATE',
    accent: 'from-emerald-500/20 via-cyan-500/10 to-sky-500/20',
    courseDescription:
      'Choose the right place for app data and learn when Redux, Zustand, Recoil, or Jotai make sense.',
    focus:
      'global state, server state, predictable updates, and cleaner data sharing across screens',
    prerequisites: ['React.js Advanced'],
    tools: ['React Context', 'Redux Toolkit', 'Zustand', 'Jotai', 'Recoil'],
    outcomes: [
      'Understand when local state is enough and when a store helps.',
      'Compare lightweight and structured state solutions confidently.',
      'Keep app data easier to trace and update.',
    ],
    buildProject:
      'Refactor a growing dashboard from prop drilling into a cleaner shared-state approach.',
    searchTerms: ['redux', 'zustand', 'jotai', 'recoil', 'global state'],
    topics: [
      t('Props Drilling'),
      t('Context API'),
      t('Redux Toolkit', {
        searchTerms: ['redux', 'slice', 'store', 'dispatch'],
      }),
      t('RTK Query', {
        searchTerms: ['redux query', 'api cache', 'server state'],
      }),
      t('Zustand', {
        searchTerms: ['zustand store', 'lightweight state'],
      }),
      t('Jotai', {
        searchTerms: ['atoms', 'jotai state'],
      }),
      t('Recoil', {
        searchTerms: ['recoil atoms', 'selectors'],
      }),
      t('Choosing the Right Store', {
        searchTerms: ['state comparison', 'which state library'],
      }),
    ],
  },
  {
    courseId: 'ui-development',
    courseTitle: 'UI Development',
    label: 'Design Systems',
    stageId: 'frontend',
    level: 'Intermediate',
    icon: 'UI',
    accent: 'from-rose-500/20 via-amber-500/10 to-emerald-500/20',
    courseDescription:
      'Build responsive interfaces with Tailwind CSS, MUI, motion libraries, and reusable UI patterns.',
    focus: 'design consistency, component libraries, responsive patterns, and purposeful motion',
    prerequisites: ['React.js Basics', 'CSS'],
    tools: ['Tailwind CSS', 'Material UI', 'Framer Motion', 'GSAP', 'shadcn/ui'],
    outcomes: [
      'Create UI systems that stay consistent across pages.',
      'Choose between utility-first styling and component libraries with intention.',
      'Add motion that supports the interface instead of distracting from it.',
    ],
    buildProject:
      'Build a responsive product dashboard with animated cards and a reusable form system.',
    searchTerms: ['tailwind', 'mui', 'material ui', 'framer motion', 'gsap'],
    topics: [
      t('Tailwind CSS', {
        searchTerms: ['tailwind', 'utility classes'],
      }),
      t('Material UI (MUI)', {
        searchTerms: ['mui', 'material ui', 'component library'],
      }),
      t('Framer Motion', {
        searchTerms: ['motion', 'animation in react', 'framer'],
      }),
      t('GSAP', {
        searchTerms: ['greensock', 'timeline animation', 'gsap'],
      }),
      t('shadcn/ui', {
        searchTerms: ['shadcn', 'radix ui'],
      }),
      t('Responsive UI Systems'),
      t('Reusable Components'),
      t('Accessible Forms'),
      t('Data Table Patterns'),
      t('Modal and Drawer Patterns'),
    ],
  },
  {
    courseId: 'node-js',
    courseTitle: 'Node.js',
    label: 'Runtime',
    stageId: 'backend',
    level: 'Beginner',
    icon: 'NODE',
    accent: 'from-lime-500/20 via-emerald-500/10 to-cyan-500/20',
    courseDescription:
      'Understand how JavaScript runs on the server and how Node.js handles modules, files, and processes.',
    focus: 'runtime behavior, core modules, package management, and server-side tooling',
    prerequisites: ['JavaScript Advanced'],
    tools: ['Node.js', 'npm', 'Terminal'],
    outcomes: [
      'Run JavaScript outside the browser.',
      'Use core modules for files, paths, and events.',
      'Understand environment configuration at a practical level.',
    ],
    buildProject: 'Create a small CLI tool that reads data and outputs a report.',
    searchTerms: ['node runtime', 'npm', 'modules', 'filesystem'],
    topics: [
      t('Node.js Introduction'),
      t('Node.js Runtime'),
      t('NPM'),
      t('Modules'),
      t('File System'),
      t('Path Module'),
      t('Events'),
      t('Streams'),
      t('Environment Variables'),
      t('Node.js Architecture'),
    ],
  },
  {
    courseId: 'express-js',
    courseTitle: 'Express.js',
    label: 'API Layer',
    stageId: 'backend',
    level: 'Beginner',
    icon: 'EXP',
    accent: 'from-slate-500/20 via-cyan-500/10 to-emerald-500/20',
    courseDescription:
      'Create clean HTTP servers with routes, middleware, request parsing, and structured controller flow.',
    focus: 'routing, middleware, server setup, request validation, and scalable API structure',
    prerequisites: ['Node.js'],
    tools: ['Express', 'Postman', 'Thunder Client'],
    outcomes: [
      'Set up routes and middleware cleanly.',
      'Use logging, parsing, and CORS in the right layer.',
      'Build APIs that are easier to debug and extend.',
    ],
    buildProject: 'Build a small product API with reusable middleware and controller modules.',
    searchTerms: ['express middleware', 'cors', 'morgan', 'body-parser'],
    topics: [
      t('Express Introduction'),
      t('Express Server Setup'),
      t('Routing'),
      t('Middleware Pipeline'),
      t('express.json() and body-parser', {
        searchTerms: ['body parser', 'body-parser', 'json parser'],
      }),
      t('cors', {
        searchTerms: ['cors middleware', 'cross origin resource sharing'],
      }),
      t('morgan', {
        searchTerms: ['http logger', 'request logging'],
      }),
      t('Request and Response'),
      t('Centralized Error Handling'),
      t('Route Modules and Controllers'),
    ],
  },
  {
    courseId: 'mongodb',
    courseTitle: 'MongoDB',
    label: 'Database',
    stageId: 'backend',
    level: 'Beginner',
    icon: 'MDB',
    accent: 'from-emerald-500/20 via-green-500/10 to-lime-500/20',
    courseDescription:
      'Store app data as documents, query it clearly, and understand flexible NoSQL modeling.',
    focus: 'collections, documents, CRUD, filtering, aggregation, and indexing basics',
    prerequisites: ['Express.js'],
    tools: ['MongoDB Atlas', 'Mongo Shell', 'Compass'],
    outcomes: [
      'Understand document-based thinking.',
      'Perform CRUD operations and common query patterns.',
      'Know when indexing and aggregation start to matter.',
    ],
    buildProject: 'Design and query user, product, and order collections for a mini app.',
    searchTerms: ['mongodb atlas', 'crud', 'aggregation', 'indexing'],
    topics: [
      t('MongoDB Introduction'),
      t('NoSQL Concepts'),
      t('Collections and Documents'),
      t('MongoDB Atlas'),
      t('CRUD Operations'),
      t('Filtering and Sorting'),
      t('Aggregation Basics'),
      t('Indexing Basics'),
    ],
  },
  {
    courseId: 'mongoose',
    courseTitle: 'Mongoose',
    label: 'ODM',
    stageId: 'backend',
    level: 'Intermediate',
    icon: 'ODM',
    accent: 'from-sky-500/20 via-emerald-500/10 to-lime-500/20',
    courseDescription:
      'Add schemas, validation, hooks, and relationships on top of MongoDB for safer backend code.',
    focus: 'schema-driven data modeling, validation, population, and model-level logic',
    prerequisites: ['MongoDB'],
    tools: ['Mongoose', 'MongoDB Atlas'],
    outcomes: [
      'Create readable schemas and models.',
      'Use validation and middleware hooks to protect data.',
      'Handle relations and population with fewer surprises.',
    ],
    buildProject: 'Model a blog or ecommerce database with references and validation rules.',
    searchTerms: ['mongoose schema', 'model', 'populate', 'validation'],
    topics: [
      t('Mongoose Introduction'),
      t('Schema'),
      t('Model'),
      t('CRUD with Mongoose'),
      t('Validation'),
      t('Relationships'),
      t('Population'),
      t('Middleware Hooks'),
      t('Timestamps'),
    ],
  },
  {
    courseId: 'rest-api-development',
    courseTitle: 'REST API Development',
    label: 'REST',
    stageId: 'backend',
    level: 'Intermediate',
    icon: 'API',
    accent: 'from-sky-500/20 via-cyan-500/10 to-indigo-500/20',
    courseDescription:
      'Design predictable APIs with good response shapes, search, pagination, and documentation.',
    focus: 'API contracts, status codes, filters, search, pagination, and documentation',
    prerequisites: ['Express.js', 'MongoDB'],
    tools: ['Express', 'Swagger UI Express', 'Postman'],
    outcomes: [
      'Create APIs that frontend developers can depend on.',
      'Handle search, filter, pagination, and sorting cleanly.',
      'Document endpoints so teams can use them faster.',
    ],
    buildProject: 'Document and ship a product catalog API with filters, pagination, and examples.',
    searchTerms: ['rest api', 'search', 'pagination', 'swagger ui express'],
    topics: [
      t('REST API Concepts'),
      t('API Methods and Status Codes'),
      t('CRUD APIs'),
      t('Searching and Filtering'),
      t('Pagination and Sorting'),
      t('API Response Design'),
      t('Swagger UI Express', {
        searchTerms: ['swagger', 'swagger ui', 'api docs'],
      }),
      t('API Versioning'),
    ],
  },
  {
    courseId: 'authentication-and-authorization',
    courseTitle: 'Authentication and Authorization',
    label: 'Auth',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'AUTH',
    accent: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    courseDescription:
      'Secure users with hashing, tokens, strategy-based auth, protected APIs, and role checks.',
    focus: 'identity, password security, sessions, tokens, RBAC, and protected routes',
    prerequisites: ['REST API Development'],
    tools: ['jsonwebtoken', 'bcrypt', 'Passport.js', 'Cookies'],
    outcomes: [
      'Build login and register flows safely.',
      'Understand the job of `jsonwebtoken`, `bcrypt`, and Passport.js.',
      'Protect APIs and frontend routes with the right checks.',
    ],
    buildProject:
      'Create an auth module with registration, login, refresh tokens, and role checks.',
    searchTerms: ['jwt', 'jsonwebtoken', 'bcrypt', 'passport.js', 'rbac'],
    topics: [
      t('Authentication Basics'),
      t('Authorization Basics'),
      t('jsonwebtoken', {
        searchTerms: ['jwt', 'jsonwebtocken', 'token signing'],
      }),
      t('bcrypt', {
        searchTerms: ['bycrypt', 'password hashing'],
      }),
      t('Passport.js', {
        searchTerms: ['passport', 'auth strategy', 'google auth'],
      }),
      t('JWT Authentication Flow'),
      t('Refresh Token Rotation'),
      t('Role-Based Access Control'),
      t('Protected APIs'),
      t('Email Verification'),
    ],
  },
  {
    courseId: 'security',
    courseTitle: 'Security',
    label: 'Protection',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'SEC',
    accent: 'from-rose-500/20 via-red-500/10 to-orange-500/20',
    courseDescription:
      'Protect production apps with secure headers, validation, sanitization, and safer defaults.',
    focus:
      'input validation, headers, abuse prevention, cookies, tokens, and attack surface reduction',
    prerequisites: ['Authentication and Authorization'],
    tools: ['Helmet', 'Joi', 'Zod', 'Rate Limiter'],
    outcomes: [
      'Ship stronger defaults for public APIs.',
      'Validate request data before it touches your business logic.',
      'Reduce common risks like XSS, weak tokens, and abusive request traffic.',
    ],
    buildProject: 'Harden a CRUD API with validation, security headers, and rate limits.',
    searchTerms: ['helmet', 'joi', 'zod', 'security', 'rate limiting'],
    topics: [
      t('Helmet', {
        searchTerms: ['secure headers', 'helmet middleware'],
      }),
      t('CORS Hardening', {
        searchTerms: ['cors allowlist', 'origin policy'],
      }),
      t('Joi', {
        searchTerms: ['schema validation', 'joi validation'],
      }),
      t('Zod', {
        searchTerms: ['zod validation', 'typescript validation'],
      }),
      t('Rate Limiting'),
      t('Input Sanitization'),
      t('Token and Cookie Security'),
      t('API Security Best Practices'),
    ],
  },
  {
    courseId: 'file-upload',
    courseTitle: 'File Upload',
    label: 'Media',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'FILE',
    accent: 'from-cyan-500/20 via-sky-500/10 to-emerald-500/20',
    courseDescription:
      'Handle media uploads with Multer, validation, storage providers, and safer file handling.',
    focus: 'upload middleware, validation, cloud storage, and user-generated media flows',
    prerequisites: ['Express.js', 'Security'],
    tools: ['Multer', 'Cloudinary'],
    outcomes: [
      'Accept files safely from forms and APIs.',
      'Validate size, type, and count before saving uploads.',
      'Store files in a way that fits production workflows.',
    ],
    buildProject: 'Add profile image and product image uploads to a dashboard API.',
    searchTerms: ['multer', 'file upload', 'cloudinary', 'image upload'],
    topics: [
      t('Multer', {
        searchTerms: ['multer upload middleware', 'multipart form data'],
      }),
      t('File Validation'),
      t('Cloudinary Upload Flow'),
      t('Multiple File Upload'),
      t('Profile Image Upload'),
      t('Product Image Upload'),
    ],
  },
  {
    courseId: 'full-stack-integration',
    courseTitle: 'Full Stack Integration',
    label: 'Connect',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'FULL',
    accent: 'from-emerald-500/20 via-sky-500/10 to-indigo-500/20',
    courseDescription:
      'Connect React and Express cleanly with Axios, auth headers, loading states, and service layers.',
    focus: 'API calls, frontend state, auth flow, network errors, and UX around async data',
    prerequisites: ['React.js Advanced', 'REST API Development'],
    tools: ['Axios', 'React Router', 'Browser DevTools'],
    outcomes: [
      'Build a clean API service layer.',
      'Handle loading, success, and error states without messy UI code.',
      'Keep auth token flow stable across refreshes and protected routes.',
    ],
    buildProject: 'Connect a React admin panel to a secure Express API with optimistic UI updates.',
    searchTerms: ['axios', 'api integration', 'auth token flow', 'protected routes'],
    topics: [
      t('Connect React with Express API'),
      t('Axios', {
        searchTerms: ['axios instance', 'interceptors', 'http client'],
      }),
      t('API Service Layer'),
      t('Loading and Error States'),
      t('Form Submission'),
      t('Authentication Flow'),
      t('Protected Frontend Routes'),
      t('Optimistic Updates'),
    ],
  },
  {
    courseId: 'admin-panel-development',
    courseTitle: 'Admin Panel Development',
    label: 'Dashboard',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'ADMIN',
    accent: 'from-slate-500/20 via-sky-500/10 to-amber-500/20',
    courseDescription:
      'Design and build management dashboards that support real operations, not only polished public pages.',
    focus: 'operations UI, role-based access, data-heavy screens, and business workflows',
    prerequisites: ['UI Development', 'Full Stack Integration'],
    tools: ['React', 'Tailwind CSS', 'Data grids'],
    outcomes: [
      'Design faster task-oriented screens for internal users.',
      'Plan navigation, forms, tables, and filters around daily operations.',
      'Build admin experiences that scale beyond a demo.',
    ],
    buildProject: 'Ship a role-based admin dashboard for an ecommerce or SaaS app.',
    searchTerms: ['admin dashboard', 'table ui', 'sidebar layout'],
    topics: [
      t('Admin Login'),
      t('Admin Dashboard'),
      t('Sidebar Layout'),
      t('User Management'),
      t('Product Management'),
      t('Category Management'),
      t('Order Management'),
      t('Reports'),
      t('Settings Page'),
    ],
  },
  {
    courseId: 'payment-integration',
    courseTitle: 'Payment Integration',
    label: 'Payments',
    stageId: 'production',
    level: 'Advanced',
    icon: 'PAY',
    accent: 'from-amber-500/20 via-yellow-500/10 to-emerald-500/20',
    courseDescription:
      'Understand order creation, payment confirmation, and secure checkout behavior in web apps.',
    focus: 'provider integration, verification, order sync, and trustworthy checkout UX',
    prerequisites: ['Authentication and Authorization', 'REST API Development'],
    tools: ['Stripe', 'Razorpay', 'Webhooks'],
    outcomes: [
      'Model checkout flows with backend verification.',
      'Keep order state and payment state aligned.',
      'Understand where webhooks fit into real systems.',
    ],
    buildProject: 'Add a server-verified checkout flow to an ecommerce app.',
    searchTerms: ['stripe', 'razorpay', 'checkout', 'payment verification'],
    topics: [
      t('Payment Gateway Basics'),
      t('Razorpay Integration'),
      t('Stripe Integration'),
      t('Payment Verification'),
      t('Order Creation'),
      t('Invoice Generation'),
    ],
  },
  {
    courseId: 'real-time-features',
    courseTitle: 'Real-Time Features',
    label: 'Realtime',
    stageId: 'production',
    level: 'Advanced',
    icon: 'LIVE',
    accent: 'from-cyan-500/20 via-blue-500/10 to-emerald-500/20',
    courseDescription:
      'Build live chat, notifications, room-based communication, and status updates with websockets.',
    focus: 'event-driven communication, socket rooms, presence, and live product experiences',
    prerequisites: ['Full Stack Integration'],
    tools: ['WebSocket', 'Socket.IO'],
    outcomes: [
      'Understand when realtime is better than polling.',
      'Create basic chat and notification flows with Socket.IO.',
      'Model room-based or presence-based user experiences.',
    ],
    buildProject: 'Build a live support chat with presence and unread notifications.',
    searchTerms: ['socket io', 'socket.io', 'realtime chat', 'websocket'],
    topics: [
      t('WebSocket Basics'),
      t('Socket.IO', {
        searchTerms: ['socket io', 'socket.io', 'realtime events'],
      }),
      t('Rooms and Presence'),
      t('Real-Time Chat'),
      t('Notifications'),
      t('Live Status Feed'),
    ],
  },
  {
    courseId: 'testing',
    courseTitle: 'Testing',
    label: 'Quality',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'TEST',
    accent: 'from-violet-500/20 via-sky-500/10 to-emerald-500/20',
    courseDescription:
      'Protect your changes with frontend, backend, and API tests that catch regressions early.',
    focus: 'confidence, behavior verification, API checks, and safer refactoring',
    prerequisites: ['React.js Basics', 'Express.js'],
    tools: ['Vitest', 'React Testing Library', 'Postman'],
    outcomes: [
      'Understand what to test first and why.',
      'Write basic UI and API tests that catch meaningful regressions.',
      'Use testing to support refactors instead of slow them down.',
    ],
    buildProject: 'Add meaningful smoke tests to a MERN starter project.',
    searchTerms: ['testing', 'vitest', 'rtl', 'api testing'],
    topics: [
      t('Testing Basics'),
      t('Unit Testing'),
      t('API Testing'),
      t('Postman'),
      t('Vitest'),
      t('React Testing Library'),
      t('Backend Testing'),
      t('Error Case Testing'),
    ],
  },
  {
    courseId: 'deployment',
    courseTitle: 'Deployment',
    label: 'Ship',
    stageId: 'production',
    level: 'Intermediate',
    icon: 'DEPLOY',
    accent: 'from-slate-500/20 via-emerald-500/10 to-sky-500/20',
    courseDescription:
      'Move local apps to real hosting with environment variables, builds, databases, and deployment platforms.',
    focus: 'production builds, env vars, hosting choices, and deployment workflow basics',
    prerequisites: ['Full Stack Integration'],
    tools: ['Vercel', 'Render', 'Railway', 'MongoDB Atlas'],
    outcomes: [
      'Deploy frontend and backend projects with less confusion.',
      'Understand the role of environment variables and build output.',
      'Troubleshoot common hosting and config mistakes.',
    ],
    buildProject: 'Deploy a full MERN project with separated frontend and backend environments.',
    searchTerms: ['vercel', 'render', 'railway', 'deployment', 'env vars'],
    topics: [
      t('Frontend Deployment'),
      t('Backend Deployment'),
      t('MongoDB Atlas Setup'),
      t('Environment Variables'),
      t('Render'),
      t('Vercel'),
      t('Netlify'),
      t('Railway'),
      t('Production Build'),
    ],
  },
  {
    courseId: 'mern-project-structure',
    courseTitle: 'MERN Project Structure',
    label: 'Architecture',
    stageId: 'scale',
    level: 'Intermediate',
    icon: 'ARCH',
    accent: 'from-emerald-500/20 via-cyan-500/10 to-slate-500/20',
    courseDescription:
      'Organize frontend and backend code so the project stays easy to navigate as features grow.',
    focus: 'folders, naming, layers, services, configs, and long-term codebase clarity',
    prerequisites: ['Full Stack Integration'],
    tools: ['Feature folders', 'Service layer', 'Config modules'],
    outcomes: [
      'Know where files should live in a growing codebase.',
      'Separate routes, controllers, services, and UI concerns more clearly.',
      'Avoid the “everything in one file” stage earlier.',
    ],
    buildProject: 'Restructure a cluttered MERN project into cleaner frontend and backend layers.',
    searchTerms: ['mern structure', 'folder structure', 'service layer', 'mvc'],
    topics: [
      t('Frontend Folder Structure'),
      t('Backend Folder Structure'),
      t('Feature-Based Organization'),
      t('MVC Architecture'),
      t('Service Layer'),
      t('Controller Layer'),
      t('Route Layer'),
      t('Middleware Layer'),
      t('Config Management'),
      t('Reusable Components'),
    ],
  },
  {
    courseId: 'advanced-mern-concepts',
    courseTitle: 'Advanced MERN Concepts',
    label: 'Scale',
    stageId: 'scale',
    level: 'Advanced',
    icon: 'ADV',
    accent: 'from-indigo-500/20 via-cyan-500/10 to-emerald-500/20',
    courseDescription:
      'Explore caching, jobs, queues, email workflows, logs, and production-focused backend tooling.',
    focus: 'reliability, performance, queues, caching, env management, and operational thinking',
    prerequisites: ['Deployment', 'MERN Project Structure'],
    tools: ['dotenv', 'Redis', 'BullMQ', 'Nodemailer'],
    outcomes: [
      'Understand when caching or background jobs are worth the complexity.',
      'Use production helpers like Redis, BullMQ, and email services more intentionally.',
      'Think beyond CRUD and start thinking about scale and operations.',
    ],
    buildProject:
      'Add caching, job queues, and email notifications to a production-style MERN app.',
    searchTerms: ['dotenv', 'redis', 'bullmq', 'nodemailer', 'background jobs'],
    topics: [
      t('dotenv', {
        searchTerms: ['env file', 'process env', 'dotenv'],
      }),
      t('Redis', {
        searchTerms: ['redis cache', 'in-memory store'],
      }),
      t('BullMQ', {
        searchTerms: ['queue', 'job queue', 'bull mq', 'bullmq'],
      }),
      t('Background Jobs'),
      t('Nodemailer', {
        searchTerms: ['email sending', 'smtp', 'nodemailer'],
      }),
      t('Logging and Monitoring'),
      t('Caching Strategy'),
      t('TypeScript with MERN'),
      t('Monorepo Structure'),
      t('Production Readiness Checklist'),
    ],
  },
  {
    courseId: 'major-projects',
    courseTitle: 'Major Projects',
    label: 'Build',
    stageId: 'scale',
    level: 'Advanced',
    icon: 'PRO',
    accent: 'from-amber-500/20 via-rose-500/10 to-cyan-500/20',
    courseDescription:
      'Turn the roadmap into real portfolio projects with search, chat, dashboards, auth, and scalable features.',
    focus: 'project planning, feature sequencing, reusable architecture, and portfolio credibility',
    prerequisites: ['Advanced MERN Concepts'],
    tools: ['React', 'Express', 'MongoDB', 'Redis', 'Socket.IO'],
    outcomes: [
      'Plan real projects in terms of flows, modules, and MVP scope.',
      'Choose the right features for a beginner, intermediate, or advanced portfolio.',
      'Use complex features like search and chat to demonstrate product thinking.',
    ],
    buildProject:
      'Plan a flagship MERN project with search, auth, admin, notifications, and deployment.',
    searchTerms: ['portfolio projects', 'rag chatbot', 'search app', 'mern projects'],
    topics: [
      t('Todo App'),
      t('Blog Platform'),
      t('Authentication Starter'),
      t('E-Commerce Website'),
      t('Admin Dashboard'),
      t('Real-Time Chat Application'),
      t('Search-First Knowledge Portal'),
      t('RAG Chatbot', {
        searchTerms: ['chatbot', 'retrieval augmented generation', 'rag'],
      }),
      t('SaaS Application'),
    ],
  },
  {
    courseId: 'interview-preparation',
    courseTitle: 'Interview Preparation',
    label: 'Interview',
    stageId: 'scale',
    level: 'Advanced',
    icon: 'Q&A',
    accent: 'from-sky-500/20 via-emerald-500/10 to-amber-500/20',
    courseDescription:
      'Practice explaining MERN concepts clearly, comparing tools, and walking through project decisions.',
    focus: 'clear communication, practical examples, tradeoffs, and project storytelling',
    prerequisites: ['Major Projects'],
    tools: ['Whiteboard', 'Notion', 'Practice prompts'],
    outcomes: [
      'Answer theory and project questions more clearly.',
      'Compare tools like Redux vs Zustand or Joi vs Zod with confidence.',
      'Present your projects in a stronger, more structured way.',
    ],
    buildProject:
      'Prepare concise answers for your strongest project and the most common MERN topics.',
    searchTerms: ['mern interview', 'project explanation', 'system design basics'],
    topics: [
      t('HTML Interview Questions'),
      t('CSS Interview Questions'),
      t('JavaScript Interview Questions'),
      t('React Interview Questions'),
      t('Node.js Interview Questions'),
      t('Express Interview Questions'),
      t('MongoDB Interview Questions'),
      t('State Management Comparison Questions'),
      t('System Design Basics'),
      t('Resume and Portfolio Preparation'),
    ],
  },
];

function createExplanation(course, topic) {
  if (topic.explanation) {
    return topic.explanation;
  }

  const profile = getCourseProfile(course.courseId);

  return `${topic.title} is part of ${course.courseTitle}. This lesson helps you understand ${profile.simpleMeaning}, so when you build real features instead of only reading theory, the full flow feels much easier to follow.`;
}

function createSimpleExplanation(course, topic) {
  if (topic.simpleExplanation) {
    return topic.simpleExplanation;
  }

  const profile = getCourseProfile(course.courseId);
  return `${topic.title} is mainly about ${profile.simpleMeaning}. Think of it like ${profile.analogy}.`;
}

function createWhyItMatters(course, topic) {
  if (topic.whyItMatters) {
    return topic.whyItMatters;
  }

  const profile = getCourseProfile(course.courseId);
  return `Once ${topic.title} is clear, ${profile.useCase}. That is why this topic shows up again and again in real MERN projects.`;
}

function createRealLifeExample(course, topic) {
  if (topic.realLifeExample) {
    return topic.realLifeExample;
  }

  const profile = getCourseProfile(course.courseId);

  return {
    title: 'Real-life example',
    scenario: `Imagine ${profile.realLifeScenario}. ${topic.title} becomes important when ${profile.realLifeAction}.`,
    takeaway: `This is where ${topic.title} stops feeling like a textbook term and starts helping with real product work.`,
  };
}

function createKeyPoints(course, topic) {
  if (topic.keyPoints) {
    return topic.keyPoints;
  }

  const profile = getCourseProfile(course.courseId);

  return [
    `Start with the job of ${topic.title} before worrying about syntax or package options.`,
    `Connect ${topic.title} to ${profile.realLifeScenario} so the lesson feels practical.`,
    `Notice the input, processing step, and output each time you study ${topic.title}.`,
    `Ask yourself what would break in a MERN app if ${topic.title} were missing.`,
    `Write one short revision note for ${topic.title} in your own words.`,
  ];
}

function createPracticeTask(course, topic) {
  if (topic.practiceTask) {
    return topic.practiceTask;
  }

  const profile = getCourseProfile(course.courseId);

  if (course.courseId === 'git-and-github' || course.courseId === 'deployment') {
    return `Write the exact steps or commands you would use for ${topic.title}, then describe what each step does and why the order matters.`;
  }

  if (course.courseId === 'interview-preparation') {
    return `Answer one short interview question for ${topic.title} using a definition, one example, and one real project use case.`;
  }

  if (course.courseId === 'major-projects') {
    return `Break ${topic.title} into modules, list the main user flows, and identify the smallest MVP version you could build first.`;
  }

  return `Create a small example or note for ${topic.title} and explain where it would appear in ${profile.realLifeScenario}.`;
}

function createCommonMistakes(topic) {
  if (topic.commonMistakes) {
    return topic.commonMistakes;
  }

  return [
    `Memorizing ${topic.title} without first understanding what problem it solves.`,
    `Copying an example for ${topic.title} without checking why the output changed.`,
    `Ignoring edge cases or errors instead of using them to understand ${topic.title} more deeply.`,
  ];
}

function createLearningOutcome(topic) {
  if (topic.learningOutcome) {
    return topic.learningOutcome;
  }

  return `After this lesson, you should be able to explain ${topic.title} clearly and use it in a small MERN-focused example.`;
}

function createStarterQuestion(topic) {
  if (topic.starterQuestion) {
    return topic.starterQuestion;
  }

  return `How do I use ${topic.title} inside a real MERN project?`;
}

const stageCoaching = {
  foundation: {
    learn: 'Build the mental model first',
    practice: 'Create a tiny browser-visible result',
    project: 'Connect it to a small page or interaction',
    interview: 'Explain it without memorized words',
  },
  frontend: {
    learn: 'Understand the UI responsibility',
    practice: 'Build one reusable component or state flow',
    project: 'Connect it to routing, design, or real user actions',
    interview: 'Explain tradeoffs and when you would choose it',
  },
  backend: {
    learn: 'Understand the request, response, and data boundary',
    practice: 'Build one small endpoint or data operation',
    project: 'Connect it to validation, errors, and frontend needs',
    interview: 'Explain the API contract and failure cases',
  },
  production: {
    learn: 'Understand the production risk it solves',
    practice: 'Add one safe implementation path',
    project: 'Connect it to auth, validation, deployment, or monitoring',
    interview: 'Explain security, reliability, and edge cases',
  },
  scale: {
    learn: 'Understand the system-level tradeoff',
    practice: 'Sketch the architecture before coding',
    project: 'Connect it to queues, caching, performance, or team workflow',
    interview: 'Explain how you would scale and debug it',
  },
};

function createCoachPlan(course, topic, position) {
  const profile = getCourseProfile(course.courseId);
  const stageGuide = stageCoaching[course.stageId] ?? stageCoaching.foundation;
  const lessonNumber = position + 1;
  const primaryTool = topic.tools?.[0] ?? course.tools[0] ?? 'your editor';
  const projectContext = course.buildProject.toLowerCase();

  return {
    proTip: `Do not treat ${topic.title} as an isolated theory topic. Learn the rule, build one visible result, then connect it to ${projectContext}. That is the zero-to-hero jump from beginner knowledge to project confidence.`,
    interviewAnswer: `${topic.title} helps with ${profile.simpleMeaning}. In a MERN project, I would explain it by showing the input, the processing step, the output, and what can break if it is ignored.`,
    path: [
      {
        label: `Step ${lessonNumber}.1`,
        title: stageGuide.learn,
        detail: `Write a one-line meaning of ${topic.title} in your own words before touching code.`,
      },
      {
        label: `Step ${lessonNumber}.2`,
        title: stageGuide.practice,
        detail: `Use ${primaryTool} and make one tiny example that proves the concept works.`,
      },
      {
        label: `Step ${lessonNumber}.3`,
        title: stageGuide.project,
        detail: `Place ${topic.title} inside the course project idea: ${course.buildProject}`,
      },
      {
        label: `Step ${lessonNumber}.4`,
        title: stageGuide.interview,
        detail: `Answer this clearly: what problem does ${topic.title} solve, and what mistake should a developer avoid?`,
      },
    ],
    checkpoints: [
      `Can I explain ${topic.title} in one simple sentence?`,
      `Can I point to where ${topic.title} appears in a real MERN feature?`,
      `Can I name one mistake or edge case related to ${topic.title}?`,
    ],
  };
}

function createTopic(course, topicInput, position) {
  const topic = typeof topicInput === 'string' ? { title: topicInput } : topicInput;
  const stage = stageLookup[course.stageId];

  return {
    topicId: slugify(topic.title),
    topicTitle: topic.title,
    searchTerms: topic.searchTerms ?? [],
    tools: topic.tools ?? course.tools.slice(0, 3),
    simpleExplanation: createSimpleExplanation(course, topic),
    explanation: createExplanation(course, topic),
    whyItMatters: createWhyItMatters(course, topic),
    realLifeExample: createRealLifeExample(course, topic),
    keyPoints: createKeyPoints(course, topic),
    practiceTask: createPracticeTask(course, topic),
    commonMistakes: createCommonMistakes(topic),
    learningOutcome: createLearningOutcome(topic),
    starterQuestion: createStarterQuestion(topic),
    coachPlan: createCoachPlan(course, topic, position),
    estimatedMinutes: topic.estimatedMinutes ?? 12 + (position % 3) * 4,
    stageId: course.stageId,
    stageTitle: stage.title,
    level: course.level,
  };
}

export const courses = courseBlueprints.map((course) => {
  const topics = course.topics.map((topic, position) => createTopic(course, topic, position));
  const totalMinutes = topics.reduce((sum, topic) => sum + topic.estimatedMinutes, 0);
  const stage = stageLookup[course.stageId];

  return {
    ...course,
    topics,
    stageTitle: stage.title,
    stageBadge: stage.badge,
    stageSummary: stage.summary,
    totalMinutes,
    estimatedHours: Math.max(1, Math.round(totalMinutes / 60)),
  };
});

export default courses;
