import { getExampleTemplate } from './examples.js';
import { getCourseProfile } from './courseProfiles.js';
import slugify from '../utils/slugify.js';

const courseBlueprints = [
  {
    courseId: 'web-development-basics',
    courseTitle: 'Web Development Basics',
    label: 'Start Here',
    icon: 'WEB',
    accent: 'from-emerald-500/20 via-teal-500/10 to-sky-500/20',
    courseDescription:
      'Learn the core internet concepts that every MERN student should understand before writing full-stack code.',
    focus:
      'how browsers, servers, networks, and developer tools work together in a modern web application',
    topics: [
      'How the Web Works',
      'Client vs Server',
      'Frontend vs Backend',
      'HTTP and HTTPS',
      'Domain, Hosting, Server Basics',
      'Browser Developer Tools',
    ],
  },
  {
    courseId: 'html',
    courseTitle: 'HTML',
    label: 'Markup',
    icon: 'HTML',
    accent: 'from-orange-500/20 via-amber-500/10 to-rose-500/20',
    courseDescription:
      'Build clean document structure, accessible content, and the semantic foundations used by every frontend screen.',
    focus: 'semantic structure, accessibility, and browser-friendly content',
    topics: [
      'HTML Introduction',
      'HTML Document Structure',
      'Headings, Paragraphs, Links',
      'Images and Lists',
      'Tables',
      'Forms and Inputs',
      'Semantic HTML',
      'SEO Basics',
    ],
  },
  {
    courseId: 'css',
    courseTitle: 'CSS',
    label: 'Styling',
    icon: 'CSS',
    accent: 'from-sky-500/20 via-cyan-500/10 to-emerald-500/20',
    courseDescription:
      'Style interfaces with confidence using layout, spacing, animation, responsiveness, and reusable visual patterns.',
    focus: 'layout, responsiveness, and visual communication',
    topics: [
      'CSS Introduction',
      'Selectors',
      'Colors and Units',
      'Box Model',
      'Display Properties',
      'Positioning',
      'Flexbox',
      'CSS Grid',
      'Responsive Design',
      'Media Queries',
      'Animations and Transitions',
    ],
  },
  {
    courseId: 'javascript-basics',
    courseTitle: 'JavaScript Basics',
    label: 'Logic',
    icon: 'JS',
    accent: 'from-amber-500/20 via-yellow-500/10 to-lime-500/20',
    courseDescription:
      'Understand the core language features used to make webpages interactive and data-driven.',
    focus: 'variables, control flow, and everyday programming fundamentals',
    topics: [
      'JavaScript Introduction',
      'Variables',
      'Data Types',
      'Operators',
      'Conditions',
      'Loops',
      'Functions',
      'Arrays',
      'Objects',
      'String Methods',
      'Array Methods',
      'Date and Math',
      'Error Handling',
    ],
  },
  {
    courseId: 'javascript-advanced',
    courseTitle: 'JavaScript Advanced',
    label: 'Advanced JS',
    icon: 'ES6',
    accent: 'from-fuchsia-500/20 via-sky-500/10 to-emerald-500/20',
    courseDescription:
      'Move into browser APIs, asynchronous code, modular architecture, and the modern JavaScript patterns used in production.',
    focus: 'asynchronous flows, browser APIs, and reusable JavaScript patterns',
    topics: [
      'DOM Manipulation',
      'Events',
      'ES6 Features',
      'Destructuring',
      'Spread and Rest Operators',
      'Template Literals',
      'Modules',
      'Callbacks',
      'Promises',
      'Async/Await',
      'Fetch API',
      'JSON',
      'Local Storage and Session Storage',
    ],
  },
  {
    courseId: 'git-and-github',
    courseTitle: 'Git and GitHub',
    label: 'Versioning',
    icon: 'GIT',
    accent: 'from-slate-500/20 via-orange-500/10 to-amber-500/20',
    courseDescription:
      'Learn the workflows that help teams track changes, review work, and collaborate on code safely.',
    focus: 'version control, collaboration, and release discipline',
    topics: [
      'Git Introduction',
      'Git Installation',
      'Git Commands',
      'GitHub Repository',
      'Branching',
      'Pull Requests',
      'Merge Conflicts',
      'GitHub Workflow',
    ],
  },
  {
    courseId: 'react-js-basics',
    courseTitle: 'React.js Basics',
    label: 'React Core',
    icon: 'RJS',
    accent: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20',
    courseDescription:
      'Learn the component model, JSX syntax, props, state, and forms that power React frontends.',
    focus: 'component-driven UI and stateful client-side rendering',
    topics: [
      'React Introduction',
      'React Project Setup',
      'JSX',
      'Components',
      'Props',
      'State',
      'Events',
      'Conditional Rendering',
      'Lists and Keys',
      'Forms in React',
      'React Styling',
    ],
  },
  {
    courseId: 'react-js-advanced',
    courseTitle: 'React.js Advanced',
    label: 'React Pro',
    icon: 'HOOK',
    accent: 'from-cyan-500/20 via-sky-500/10 to-violet-500/20',
    courseDescription:
      'Cover advanced hooks, routing, code splitting, lazy loading, and larger application patterns.',
    focus: 'app architecture, routing, and advanced hook patterns',
    topics: [
      'React Hooks',
      'useState',
      'useEffect',
      'useRef',
      'useMemo',
      'useCallback',
      'Custom Hooks',
      'Context API',
      'React Router',
      'Protected Routes',
      'Error Boundaries',
      'Code Splitting',
      'Lazy Loading',
    ],
  },
  {
    courseId: 'state-management',
    courseTitle: 'State Management',
    label: 'Data Flow',
    icon: 'STATE',
    accent: 'from-emerald-500/20 via-cyan-500/10 to-sky-500/20',
    courseDescription:
      'Understand where app data should live and how to share it cleanly across large interfaces.',
    focus: 'shared state, predictable updates, and scalable frontend data flow',
    topics: [
      'Props Drilling',
      'Context API',
      'Redux Toolkit',
      'Zustand',
      'Global State Management',
      'API State Management',
    ],
  },
  {
    courseId: 'ui-development',
    courseTitle: 'UI Development',
    label: 'Design Systems',
    icon: 'UI',
    accent: 'from-rose-500/20 via-amber-500/10 to-emerald-500/20',
    courseDescription:
      'Build modern, reusable interface systems with utility classes, component libraries, and responsive patterns.',
    focus: 'design consistency, reusable UI patterns, and responsive layout craft',
    topics: [
      'Tailwind CSS',
      'Bootstrap',
      'Material UI',
      'ShadCN UI',
      'Responsive UI',
      'Reusable Components',
      'Dashboard Layouts',
      'Form UI',
      'Table UI',
      'Modal and Drawer UI',
    ],
  },
  {
    courseId: 'node-js',
    courseTitle: 'Node.js',
    label: 'Runtime',
    icon: 'NODE',
    accent: 'from-lime-500/20 via-emerald-500/10 to-cyan-500/20',
    courseDescription:
      'Learn how JavaScript runs on the server, how modules work, and how Node.js handles files and events.',
    focus: 'server-side JavaScript, tooling, and runtime behavior',
    topics: [
      'Node.js Introduction',
      'Node.js Runtime',
      'NPM',
      'Modules',
      'File System',
      'Path Module',
      'Events',
      'Streams',
      'Environment Variables',
      'Node.js Architecture',
    ],
  },
  {
    courseId: 'express-js',
    courseTitle: 'Express.js',
    label: 'API Layer',
    icon: 'EXP',
    accent: 'from-slate-500/20 via-cyan-500/10 to-emerald-500/20',
    courseDescription:
      'Set up clean HTTP servers with routes, middleware, and structured API patterns.',
    focus: 'routing, middleware, and organized server structure',
    topics: [
      'Express Introduction',
      'Express Server Setup',
      'Routing',
      'Middleware',
      'Request and Response',
      'Error Handling',
      'Static Files',
      'REST API Structure',
      'MVC Pattern',
    ],
  },
  {
    courseId: 'mongodb',
    courseTitle: 'MongoDB',
    label: 'Database',
    icon: 'MDB',
    accent: 'from-emerald-500/20 via-green-500/10 to-lime-500/20',
    courseDescription:
      'Understand document databases, CRUD flows, Atlas deployment, and query basics.',
    focus: 'documents, collections, and flexible data modeling',
    topics: [
      'MongoDB Introduction',
      'NoSQL Concepts',
      'Collections and Documents',
      'MongoDB Atlas',
      'CRUD Operations',
      'Filtering and Sorting',
      'Aggregation Basics',
      'Indexing Basics',
    ],
  },
  {
    courseId: 'mongoose',
    courseTitle: 'Mongoose',
    label: 'ODM',
    icon: 'ODM',
    accent: 'from-sky-500/20 via-emerald-500/10 to-lime-500/20',
    courseDescription:
      'Use schemas, models, validation, and relationships to manage MongoDB data cleanly in Node applications.',
    focus: 'schema-driven data modeling and safer database access',
    topics: [
      'Mongoose Introduction',
      'Schema',
      'Model',
      'CRUD with Mongoose',
      'Validation',
      'Relationships',
      'Population',
      'Middleware Hooks',
      'Timestamps',
    ],
  },
  {
    courseId: 'rest-api-development',
    courseTitle: 'REST API Development',
    label: 'REST',
    icon: 'API',
    accent: 'from-sky-500/20 via-cyan-500/10 to-indigo-500/20',
    courseDescription:
      'Design predictable APIs with the right methods, status codes, pagination, filtering, and versioning strategies.',
    focus: 'clear API contracts and maintainable backend interfaces',
    topics: [
      'REST API Concepts',
      'API Methods',
      'API Status Codes',
      'API Response Format',
      'CRUD APIs',
      'Pagination',
      'Searching',
      'Filtering',
      'Sorting',
      'API Versioning',
    ],
  },
  {
    courseId: 'authentication-and-authorization',
    courseTitle: 'Authentication and Authorization',
    label: 'Auth',
    icon: 'AUTH',
    accent: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    courseDescription:
      'Cover user identity, roles, passwords, tokens, protected APIs, and recovery flows.',
    focus: 'secure user identity, access control, and session/token strategy',
    topics: [
      'Authentication Basics',
      'Authorization Basics',
      'Password Hashing',
      'JWT Authentication',
      'Refresh Token',
      'Role-Based Access Control',
      'Protected APIs',
      'Login and Register API',
      'Forgot Password',
      'Email Verification',
    ],
  },
  {
    courseId: 'security',
    courseTitle: 'Security',
    label: 'Protection',
    icon: 'SEC',
    accent: 'from-rose-500/20 via-red-500/10 to-orange-500/20',
    courseDescription:
      'Learn the practical security layers that protect real MERN applications from common attacks.',
    focus: 'defense in depth, validation, and secure defaults',
    topics: [
      'CORS',
      'Helmet',
      'Rate Limiting',
      'Input Validation',
      'Password Security',
      'Token Security',
      'XSS Protection',
      'SQL/NoSQL Injection Protection',
      'Secure Cookies',
      'API Security Best Practices',
    ],
  },
  {
    courseId: 'file-upload',
    courseTitle: 'File Upload',
    label: 'Media',
    icon: 'FILE',
    accent: 'from-cyan-500/20 via-sky-500/10 to-emerald-500/20',
    courseDescription:
      'Handle user-uploaded images and files safely using validation, storage integrations, and upload middleware.',
    focus: 'safe upload flows, storage providers, and file validation',
    topics: [
      'Image Upload',
      'Multer',
      'Cloudinary',
      'File Validation',
      'Multiple File Upload',
      'Profile Image Upload',
      'Product Image Upload',
    ],
  },
  {
    courseId: 'full-stack-integration',
    courseTitle: 'Full Stack Integration',
    label: 'Connect',
    icon: 'FULL',
    accent: 'from-emerald-500/20 via-sky-500/10 to-indigo-500/20',
    courseDescription:
      'Connect the frontend and backend cleanly using API services, auth flows, loading states, and error handling.',
    focus: 'frontend-backend communication and resilient user experience',
    topics: [
      'Connect React with Express API',
      'Axios',
      'API Services',
      'Loading States',
      'Error Handling',
      'Toast Notifications',
      'Form Submission',
      'Authentication Flow',
      'Protected Frontend Routes',
    ],
  },
  {
    courseId: 'admin-panel-development',
    courseTitle: 'Admin Panel Development',
    label: 'Dashboard',
    icon: 'ADMIN',
    accent: 'from-slate-500/20 via-sky-500/10 to-amber-500/20',
    courseDescription:
      'Plan and build management dashboards with side navigation, protected workflows, and operational data views.',
    focus: 'back-office flows, management screens, and role-restricted operations',
    topics: [
      'Admin Login',
      'Admin Dashboard',
      'Sidebar Layout',
      'User Management',
      'Product Management',
      'Category Management',
      'Order Management',
      'Reports',
      'Settings Page',
    ],
  },
  {
    courseId: 'payment-integration',
    courseTitle: 'Payment Integration',
    label: 'Payments',
    icon: 'PAY',
    accent: 'from-amber-500/20 via-yellow-500/10 to-emerald-500/20',
    courseDescription:
      'Understand checkout flows, gateway concepts, verification, order creation, and billing integration.',
    focus: 'trusted payment flows, order handling, and post-payment verification',
    topics: [
      'Payment Gateway Basics',
      'Razorpay Integration',
      'Stripe Integration',
      'Payment Verification',
      'Order Creation',
      'Invoice Generation',
    ],
  },
  {
    courseId: 'real-time-features',
    courseTitle: 'Real-Time Features',
    label: 'Realtime',
    icon: 'LIVE',
    accent: 'from-cyan-500/20 via-blue-500/10 to-emerald-500/20',
    courseDescription:
      'Build live chat, presence indicators, notifications, and streaming-like user experiences with sockets.',
    focus: 'two-way communication, event-driven updates, and live status flows',
    topics: [
      'WebSocket Basics',
      'Socket.io',
      'Real-Time Chat',
      'Notifications',
      'Live Order Status',
      'Online/Offline Status',
    ],
  },
  {
    courseId: 'testing',
    courseTitle: 'Testing',
    label: 'Quality',
    icon: 'TEST',
    accent: 'from-violet-500/20 via-sky-500/10 to-emerald-500/20',
    courseDescription:
      'Learn how to validate frontend and backend behavior using manual checks, unit tests, and API testing tools.',
    focus: 'confidence, regression protection, and behavior verification',
    topics: [
      'Testing Basics',
      'Unit Testing',
      'API Testing',
      'Postman',
      'Jest',
      'React Testing Library',
      'Backend Testing',
      'Error Case Testing',
    ],
  },
  {
    courseId: 'deployment',
    courseTitle: 'Deployment',
    label: 'Ship',
    icon: 'DEPLOY',
    accent: 'from-slate-500/20 via-emerald-500/10 to-sky-500/20',
    courseDescription:
      'Prepare projects for production with environment variables, cloud hosting, builds, and deployment platforms.',
    focus: 'production readiness, hosting choices, and deployment workflows',
    topics: [
      'Frontend Deployment',
      'Backend Deployment',
      'MongoDB Atlas Setup',
      'Environment Variables',
      'Render',
      'Vercel',
      'Netlify',
      'Railway',
      'VPS Basics',
      'Production Build',
    ],
  },
  {
    courseId: 'mern-project-structure',
    courseTitle: 'MERN Project Structure',
    label: 'Architecture',
    icon: 'ARCH',
    accent: 'from-emerald-500/20 via-cyan-500/10 to-slate-500/20',
    courseDescription:
      'Organize frontend and backend code into clear layers that scale as your applications grow.',
    focus: 'folders, layers, conventions, and clean long-term maintainability',
    topics: [
      'Frontend Folder Structure',
      'Backend Folder Structure',
      'MVC Architecture',
      'Service Layer',
      'Controller Layer',
      'Route Layer',
      'Middleware Layer',
      'Config Management',
      'Reusable Components',
      'Clean Code Structure',
    ],
  },
  {
    courseId: 'advanced-mern-concepts',
    courseTitle: 'Advanced MERN Concepts',
    label: 'Scale',
    icon: 'ADV',
    accent: 'from-indigo-500/20 via-cyan-500/10 to-emerald-500/20',
    courseDescription:
      'Explore higher-level architecture topics like monorepos, caching, logging, jobs, and operational scale.',
    focus: 'performance, platform structure, and production-grade system design',
    topics: [
      'Monorepo Structure',
      'TypeScript with MERN',
      'Next.js Basics',
      'Microservice-Like Architecture',
      'Queue System',
      'Caching',
      'Redis Basics',
      'Background Jobs',
      'Logging',
      'Monitoring',
    ],
  },
  {
    courseId: 'major-projects',
    courseTitle: 'Major Projects',
    label: 'Build',
    icon: 'PRO',
    accent: 'from-amber-500/20 via-rose-500/10 to-cyan-500/20',
    courseDescription:
      'Turn the syllabus into real products by planning and building multi-feature portfolio-grade projects.',
    focus: 'feature planning, reusable patterns, and end-to-end delivery',
    topics: [
      'Todo App',
      'Blog App',
      'Authentication System',
      'E-Commerce Website',
      'Admin Dashboard',
      'Chat Application',
      'Job Portal',
      'Gym Management System',
      'WhatsApp Lead Management System',
      'SaaS Application',
    ],
  },
  {
    courseId: 'interview-preparation',
    courseTitle: 'Interview Preparation',
    label: 'Interview',
    icon: 'Q&A',
    accent: 'from-sky-500/20 via-emerald-500/10 to-amber-500/20',
    courseDescription:
      'Prepare for interviews with grouped question sets, system design basics, and project explanation practice.',
    focus: 'clear communication, practical examples, and confident technical storytelling',
    topics: [
      'HTML Interview Questions',
      'CSS Interview Questions',
      'JavaScript Interview Questions',
      'React Interview Questions',
      'Node.js Interview Questions',
      'Express Interview Questions',
      'MongoDB Interview Questions',
      'MERN Project Questions',
      'System Design Basics',
      'Resume and Portfolio Preparation',
    ],
  },
];

function createExplanation(course, topicTitle) {
  const profile = getCourseProfile(course.courseId);

  return `${topicTitle} is part of ${course.courseTitle}. This lesson helps you understand ${profile.simpleMeaning}, so when you work on real features instead of only theory, the flow feels much easier to follow.`;
}

function createSimpleExplanation(course, topicTitle) {
  const profile = getCourseProfile(course.courseId);

  return `${topicTitle} is mainly about ${profile.simpleMeaning}. Think of it like ${profile.analogy}.`;
}

function createWhyItMatters(course, topicTitle) {
  const profile = getCourseProfile(course.courseId);

  return `Once ${topicTitle} is clear, ${profile.useCase}. That is why this topic shows up again and again in real MERN projects.`;
}

function createRealLifeExample(course, topicTitle) {
  const profile = getCourseProfile(course.courseId);

  return {
    title: 'Real-life example',
    scenario: `Imagine ${profile.realLifeScenario}. ${topicTitle} becomes important when ${profile.realLifeAction}.`,
    takeaway: `This is where ${topicTitle} stops feeling like a textbook term and starts helping with real product work.`,
  };
}

function createKeyPoints(course, topicTitle) {
  const profile = getCourseProfile(course.courseId);

  return [
    `Start with the job of ${topicTitle} before worrying about syntax or commands.`,
    `Connect the topic to ${profile.realLifeScenario} so the lesson feels practical.`,
    `Use the example to notice input, behavior, and output step by step.`,
    `Ask yourself what would break in a MERN app if ${topicTitle} were missing.`,
    `Write one short revision note for ${topicTitle} in your own words.`,
  ];
}

function createPracticeTask(course, topicTitle, example) {
  const profile = getCourseProfile(course.courseId);

  if (example.mode === 'preview') {
    return `Edit the live example for ${topicTitle}, make one visible change, and explain how that same change could appear in ${profile.realLifeScenario}.`;
  }

  if (course.courseId === 'git-and-github' || course.courseId === 'deployment') {
    return `Write the exact steps or commands you would use for ${topicTitle}, then describe what each step does.`;
  }

  if (course.courseId === 'interview-preparation') {
    return `Answer one short interview question for ${topicTitle} using a definition, an example, and one real project use case.`;
  }

  if (course.courseId === 'major-projects') {
    return `Break ${topicTitle} into modules, list the main user flows, and identify the first MVP feature you would build.`;
  }

  return `Create a small example or note for ${topicTitle} and explain where it would appear in ${profile.realLifeScenario}.`;
}

function createCommonMistakes(topicTitle) {
  return [
    `Memorizing the name ${topicTitle} without first understanding what problem it solves.`,
    `Copying an example for ${topicTitle} without checking why the output changed.`,
    `Ignoring edge cases or errors instead of using them to understand ${topicTitle} more deeply.`,
  ];
}

function createTopic(course, topicTitle, position) {
  const example = getExampleTemplate(course.courseId, course.courseTitle, topicTitle, position);

  return {
    topicId: slugify(topicTitle),
    topicTitle,
    simpleExplanation: createSimpleExplanation(course, topicTitle),
    explanation: createExplanation(course, topicTitle),
    whyItMatters: createWhyItMatters(course, topicTitle),
    realLifeExample: createRealLifeExample(course, topicTitle),
    keyPoints: createKeyPoints(course, topicTitle),
    codeExample: example,
    output: example.output,
    practiceTask: createPracticeTask(course, topicTitle, example),
    commonMistakes: createCommonMistakes(topicTitle),
    estimatedMinutes: 12 + (position % 3) * 4,
  };
}

export const courses = courseBlueprints.map((course) => ({
  ...course,
  topics: course.topics.map((topicTitle, position) => createTopic(course, topicTitle, position)),
}));

export default courses;
