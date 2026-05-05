const courseProfiles = {
  'web-development-basics': {
    simpleMeaning: 'how a request moves between the browser, the internet, and the server',
    analogy:
      'tracking a food order from the moment a customer taps "Order" until the restaurant sends the result back',
    realLifeScenario: 'a student opens an online food delivery site to check menus and prices',
    realLifeAction:
      'the browser requests data, the server processes it, and the page updates with the returned response',
    useCase:
      'you can debug slow pages, broken requests, and frontend/backend confusion much faster',
  },
  html: {
    simpleMeaning: 'how to give structure and meaning to page content',
    analogy: 'drawing the rooms and labels of a house before painting or decorating it',
    realLifeScenario: 'you are building a restaurant landing page with headings, images, menus, and a contact form',
    realLifeAction:
      'you need clear sections, buttons, forms, and accessible content so both users and browsers understand the page',
    useCase:
      'your pages become easier to style, easier to read, and better for accessibility and SEO',
  },
  css: {
    simpleMeaning: 'how to control layout, spacing, color, and visual polish',
    analogy: 'choosing the paint, furniture spacing, and lighting after the house structure already exists',
    realLifeScenario: 'you want a dashboard or landing page to look clean on both desktop and mobile screens',
    realLifeAction:
      'you arrange cards, align sections, choose spacing, and make the design responsive',
    useCase:
      'you can turn plain markup into interfaces that feel professional and easy to use',
  },
  'javascript-basics': {
    simpleMeaning: 'how to add logic, decisions, and interactivity to a page',
    analogy: 'adding switches and rules that decide what should happen when a user clicks or types',
    realLifeScenario: 'you are building a shopping cart, calculator, or form validator',
    realLifeAction:
      'the page needs to react to user input, update totals, and show the right message at the right time',
    useCase:
      'you can move from static pages to interfaces that actually respond to users',
  },
  'javascript-advanced': {
    simpleMeaning: 'how to work with asynchronous code, browser APIs, and modern JavaScript patterns',
    analogy:
      'coordinating several moving parts in the background while the user keeps using the page normally',
    realLifeScenario: 'you are loading live order updates, saving data locally, or calling an external API',
    realLifeAction:
      'data arrives later, events happen at different times, and your code still needs to stay predictable',
    useCase:
      'you can build richer frontend features without freezing the interface or losing track of state',
  },
  'git-and-github': {
    simpleMeaning: 'how to save project history and collaborate safely with other developers',
    analogy: 'keeping a timeline of every change so you can review, share, or roll back work confidently',
    realLifeScenario: 'two developers are working on the same project and both need to ship updates this week',
    realLifeAction:
      'changes must be committed, pushed, reviewed, and merged without overwriting each other',
    useCase:
      'your team can work faster without losing code or guessing what changed',
  },
  'react-js-basics': {
    simpleMeaning: 'how to build user interfaces from reusable components and state',
    analogy: 'assembling a page from Lego blocks that can be reused and updated independently',
    realLifeScenario: 'you are building product cards, navigation, forms, and lists for a web app',
    realLifeAction:
      'the same UI patterns appear again and again, so reusable components save time and reduce mistakes',
    useCase:
      'you can build cleaner frontends that are easier to maintain as the app grows',
  },
  'react-js-advanced': {
    simpleMeaning: 'how to scale React apps with hooks, routing, and larger application patterns',
    analogy:
      'organizing a growing team so each part knows its job, dependencies, and movement through the app',
    realLifeScenario: 'you are building a multi-page dashboard with protected areas, lazy loading, and shared logic',
    realLifeAction:
      'pages need routing, side effects, reusable hooks, and performance-aware rendering',
    useCase:
      'you can handle larger React apps without turning them into tangled component trees',
  },
  'state-management': {
    simpleMeaning: 'how to decide where shared data should live and how different components update it',
    analogy: 'choosing whether a note stays on one desk or is pinned to a board the whole team can see',
    realLifeScenario: 'a cart count, logged-in user, filters, or theme needs to be used across many screens',
    realLifeAction:
      'several components must read the same data and stay in sync when one part changes it',
    useCase:
      'your app becomes easier to reason about and much less repetitive',
  },
  'ui-development': {
    simpleMeaning: 'how to create consistent, reusable, and responsive interface patterns',
    analogy: 'building a design toolkit so you do not redesign every button, form, or card from scratch',
    realLifeScenario: 'you are designing an admin dashboard, marketing page, and data table in the same product',
    realLifeAction:
      'the interface needs to feel consistent even though it contains many different screens',
    useCase:
      'you can build polished UI faster and keep the product visually coherent',
  },
  'node-js': {
    simpleMeaning: 'how JavaScript runs outside the browser to power servers, scripts, and tooling',
    analogy: 'moving the same language from the front desk to the back office where the work is processed',
    realLifeScenario: 'you need a server to read files, handle environment variables, or run a backend process',
    realLifeAction:
      'code now works with the operating system, packages, streams, and server-side tasks',
    useCase:
      'you can use JavaScript across both the frontend and backend of a MERN project',
  },
  'express-js': {
    simpleMeaning: 'how to create routes and middleware for handling HTTP requests cleanly',
    analogy: 'setting up reception desks that know where each request should go and what checks happen first',
    realLifeScenario: 'your React app needs endpoints for products, login, orders, or profile updates',
    realLifeAction:
      'incoming requests must be validated, routed, processed, and answered consistently',
    useCase:
      'your backend becomes easier to organize, debug, and extend',
  },
  mongodb: {
    simpleMeaning: 'how to store application data as flexible documents instead of strict table rows',
    analogy: 'keeping information in structured folders where each record can hold slightly different details',
    realLifeScenario: 'you are storing users, products, orders, or blog posts for an app',
    realLifeAction:
      'data must be inserted, searched, filtered, and updated without losing structure',
    useCase:
      'you can model real app data in a format that fits naturally with JavaScript objects',
  },
  mongoose: {
    simpleMeaning: 'how to add schema rules and cleaner database operations on top of MongoDB',
    analogy: 'placing quality rules and helper tools on each folder before it is allowed into storage',
    realLifeScenario: 'your app saves user records, products, or bookings and needs validation before writing them',
    realLifeAction:
      'you want safer CRUD logic, relationships, middleware hooks, and consistent timestamps',
    useCase:
      'you reduce database bugs and keep model logic more maintainable',
  },
  'rest-api-development': {
    simpleMeaning: 'how to design clear backend endpoints that frontend apps can rely on',
    analogy: 'creating a menu where every action has a clear name, method, and expected response',
    realLifeScenario: 'a product listing screen needs search, filters, pagination, and sorting from an API',
    realLifeAction:
      'the client expects predictable URLs, methods, status codes, and response shapes',
    useCase:
      'your frontend and backend can work together without constant guessing or patchwork fixes',
  },
  'authentication-and-authorization': {
    simpleMeaning: 'how to confirm who a user is and what they are allowed to do',
    analogy:
      'first checking identity at the door, then deciding which rooms or tools that person can access',
    realLifeScenario: 'a user signs in to a dashboard and only admins should see management features',
    realLifeAction:
      'passwords, tokens, roles, and protected routes all need to work together correctly',
    useCase:
      'you can secure sensitive parts of the app without blocking valid users',
  },
  security: {
    simpleMeaning: 'how to protect your app from common attacks and unsafe defaults',
    analogy: 'locking the doors, checking deliveries, and adding alarms before opening a shop to the public',
    realLifeScenario: 'your app accepts logins, form input, uploaded files, and browser requests from many users',
    realLifeAction:
      'bad input, abuse, or unsafe tokens can break the app or expose private data if you do nothing',
    useCase:
      'you can ship features with safer defaults and fewer production surprises',
  },
  'file-upload': {
    simpleMeaning: 'how to accept and store user-uploaded files safely',
    analogy: 'receiving packages at a warehouse, checking them, and sending them to the right shelf',
    realLifeScenario: 'a user uploads a profile photo or a seller adds product images',
    realLifeAction:
      'the file must be validated, optionally resized or uploaded to cloud storage, then saved with metadata',
    useCase:
      'you can add media features without making the app messy or unsafe',
  },
  'full-stack-integration': {
    simpleMeaning: 'how the frontend and backend exchange data smoothly in real user flows',
    analogy: 'making sure the customer-facing counter and the kitchen speak the same language',
    realLifeScenario: 'a React form sends data to an Express API and the page shows loading, success, or error states',
    realLifeAction:
      'requests, responses, auth tokens, and UI feedback all need to stay coordinated',
    useCase:
      'your product feels reliable instead of disconnected or confusing',
  },
  'admin-panel-development': {
    simpleMeaning: 'how to build operational dashboards for managing data and workflows',
    analogy: 'designing the control room behind the public-facing app',
    realLifeScenario: 'staff need to manage users, products, reports, and settings from one secure area',
    realLifeAction:
      'the layout, permissions, filters, and actions must stay efficient and easy to scan',
    useCase:
      'you can support real operations, not just public marketing pages',
  },
  'payment-integration': {
    simpleMeaning: 'how to create trusted checkout flows and confirm payments correctly',
    analogy: 'handling checkout, payment confirmation, and receipt generation at a store counter',
    realLifeScenario: 'a customer pays for an online order and expects the app to confirm the purchase immediately',
    realLifeAction:
      'orders, payment providers, verification, and invoices all need to stay in sync',
    useCase:
      'you can connect revenue-critical features without guesswork',
  },
  'real-time-features': {
    simpleMeaning: 'how to send updates instantly instead of waiting for the next page refresh',
    analogy: 'using a live phone call instead of mailing status updates one by one',
    realLifeScenario: 'a chat window, live order tracker, or online/offline indicator updates while the user is watching',
    realLifeAction:
      'the server pushes events and every connected client reacts right away',
    useCase:
      'you can build interfaces that feel alive and timely',
  },
  testing: {
    simpleMeaning: 'how to check that features still work before and after changes',
    analogy: 'running a safety checklist before handing a vehicle back to the customer',
    realLifeScenario: 'you update a login flow or API and want proof that nothing important broke',
    realLifeAction:
      'tests confirm behavior, catch regressions, and reduce fear during refactors',
    useCase:
      'you can change code faster with more confidence',
  },
  deployment: {
    simpleMeaning: 'how to move an app from your computer to a real hosted environment',
    analogy: 'taking a prototype from the workshop and opening it to actual visitors',
    realLifeScenario: 'you finished a project locally and now need it running on Vercel, Render, or another platform',
    realLifeAction:
      'builds, environment variables, databases, and hosting settings must all line up correctly',
    useCase:
      'your project becomes shareable, testable, and ready for real users',
  },
  'mern-project-structure': {
    simpleMeaning: 'how to organize files and layers so a full-stack app stays manageable',
    analogy: 'giving every tool, document, and workspace a clear place in a busy office',
    realLifeScenario: 'your app now has controllers, services, components, pages, and shared utilities',
    realLifeAction:
      'without structure, even simple changes become slow because nobody knows where things belong',
    useCase:
      'you can scale the codebase without turning navigation and debugging into a headache',
  },
  'advanced-mern-concepts': {
    simpleMeaning: 'how larger systems handle scale, performance, tooling, and operations',
    analogy: 'upgrading from one small shop to a business with multiple teams, warehouses, and monitoring screens',
    realLifeScenario: 'traffic grows, jobs move to the background, and one app becomes several cooperating parts',
    realLifeAction:
      'you need caching, queues, logging, monitoring, and better system boundaries',
    useCase:
      'you can reason about production systems beyond the basic CRUD stage',
  },
  'major-projects': {
    simpleMeaning: 'how smaller topics combine into full applications that people can actually use',
    analogy: 'moving from practicing individual tools to building a complete machine end to end',
    realLifeScenario: 'you are planning a Todo app, ecommerce platform, chat app, or SaaS dashboard for a portfolio',
    realLifeAction:
      'features, data flow, UI, API design, auth, and deployment all need to come together',
    useCase:
      'you build portfolio work that proves you can connect the full stack',
  },
  'interview-preparation': {
    simpleMeaning: 'how to explain technical ideas clearly, briefly, and with project examples',
    analogy: 'turning what you know into a conversation the interviewer can follow easily',
    realLifeScenario: 'you are asked to explain a topic, defend a design choice, or talk through a project you built',
    realLifeAction:
      'clear definitions, practical examples, and tradeoff thinking matter more than memorized buzzwords',
    useCase:
      'you sound more confident because your answers are structured and grounded in real work',
  },
};

const defaultProfile = {
  simpleMeaning: 'one important part of building modern web applications',
  analogy: 'learning one useful tool before combining it with the rest of the toolbox',
  realLifeScenario: 'you are building a real product and need this topic in the flow',
  realLifeAction: 'a feature depends on this concept to work correctly',
  useCase: 'you can connect theory to practice much faster',
};

export function getCourseProfile(courseId) {
  return courseProfiles[courseId] ?? defaultProfile;
}
