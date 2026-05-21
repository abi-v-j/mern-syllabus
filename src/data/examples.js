import slugify from '../utils/slugify.js';

function createPreviewExample(topicTitle, html, css = '', js = '', output) {
  const sections = [
    { label: 'HTML', code: html.trim() },
    { label: 'CSS', code: css.trim() },
    { label: 'JS', code: js.trim() },
  ].filter((section) => section.code);

  const combinedCode = sections
    .map((section) => `/* ${section.label} */\n${section.code}`)
    .join('\n\n');

  return {
    title: `${topicTitle} demo`,
    mode: 'preview',
    language: 'html',
    code: combinedCode,
    files: {
      html: html.trim(),
      css: css.trim(),
      js: js.trim(),
    },
    output,
  };
}

function createStaticExample(topicTitle, language, code, output) {
  return {
    title: `${topicTitle} walkthrough`,
    mode: 'static',
    language,
    code: code.trim(),
    output,
  };
}

const topicOverrides = {
  'javascript-advanced:fetch-api': () =>
    createPreviewExample(
      'Fetch API',
      `<main class="card">
  <h1>Fetch API Demo</h1>
  <button id="loadBtn">Load user</button>
  <pre id="result">Click the button...</pre>
</main>`,
      `.card {
  max-width: 440px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 1rem;
  background: #f8fafc;
  font-family: system-ui, sans-serif;
}

button {
  margin-bottom: 1rem;
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 0.75rem;
  background: #0f766e;
  color: white;
}`,
      `const result = document.getElementById('result');

document.getElementById('loadBtn').addEventListener('click', async () => {
  result.textContent = 'Loading...';
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  result.textContent = JSON.stringify(user, null, 2);
});`,
      'The preview loads a sample JSON user and prints it to the page.',
    ),
  'javascript-advanced:local-storage-and-session-storage': () =>
    createPreviewExample(
      'Local Storage and Session Storage',
      `<main class="storage-demo">
  <h1>Storage Playground</h1>
  <input id="note" placeholder="Type a note" />
  <div class="actions">
    <button id="saveLocal">Save local</button>
    <button id="saveSession">Save session</button>
  </div>
  <p id="message"></p>
</main>`,
      `.storage-demo {
  max-width: 460px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 20px;
  background: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

button {
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  background: #0284c7;
  color: white;
}`,
      `const noteInput = document.getElementById('note');
const message = document.getElementById('message');

noteInput.value = localStorage.getItem('portalNote') || '';
message.textContent = sessionStorage.getItem('portalSession') || 'No session note yet.';

document.getElementById('saveLocal').onclick = () => {
  localStorage.setItem('portalNote', noteInput.value);
  message.textContent = 'Saved to localStorage.';
};

document.getElementById('saveSession').onclick = () => {
  sessionStorage.setItem('portalSession', noteInput.value);
  message.textContent = 'Saved to sessionStorage.';
};`,
      'The note is saved either across refreshes or only for the current tab session.',
    ),
  'css:animations-and-transitions': () =>
    createPreviewExample(
      'Animations and Transitions',
      `<div class="demo-card">
  <button class="pulse-btn">Hover me</button>
</div>`,
      `.demo-card {
  display: grid;
  place-items: center;
  min-height: 220px;
}

.pulse-btn {
  border: 0;
  border-radius: 999px;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #0f766e, #06b6d4);
  color: white;
  font-size: 1rem;
  transition: transform 180ms ease, box-shadow 180ms ease;
  animation: float 2.4s ease-in-out infinite;
}

.pulse-btn:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 16px 32px rgba(14, 116, 144, 0.25);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}`,
      '',
      'The button animates continuously and reacts smoothly on hover.',
    ),
  'state-management:redux-toolkit': () =>
    createStaticExample(
      'Redux Toolkit',
      'js',
      `import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(counterSlice.actions.increment())}>{count}</button>;
}

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`,
      'Redux Toolkit gives you a structured store, slices, reducers, and predictable state updates.',
    ),
  'state-management:rtk-query': () =>
    createStaticExample(
      'RTK Query',
      'js',
      `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
  }),
});

export const { useGetProductsQuery } = api;`,
      'RTK Query manages data fetching, caching, loading, and invalidation inside the Redux ecosystem.',
    ),
  'state-management:zustand': () =>
    createStaticExample(
      'Zustand',
      'js',
      `import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));

export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  return <button onClick={() => addItem({ id: Date.now(), name: 'Course' })}>{items.length}</button>;
}`,
      'Zustand keeps global state lightweight and avoids much of the ceremony of larger stores.',
    ),
  'state-management:jotai': () =>
    createStaticExample(
      'Jotai',
      'js',
      `import { atom, useAtom } from 'jotai';

const themeAtom = atom('light');

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme}
    </button>
  );
}

export default ThemeToggle;`,
      'Jotai models state as small atoms, which can feel very natural for isolated shared values.',
    ),
  'state-management:recoil': () =>
    createStaticExample(
      'Recoil',
      'js',
      `import { atom, RecoilRoot, useRecoilState } from 'recoil';

const filterAtom = atom({
  key: 'filterAtom',
  default: 'all',
});

function FilterButtons() {
  const [filter, setFilter] = useRecoilState(filterAtom);

  return <button onClick={() => setFilter('completed')}>{filter}</button>;
}

export default function App() {
  return (
    <RecoilRoot>
      <FilterButtons />
    </RecoilRoot>
  );
}`,
      'Recoil uses atoms and selectors to model state graphs across multiple React components.',
    ),
  'ui-development:tailwind-css': () =>
    createStaticExample(
      'Tailwind CSS',
      'jsx',
      `export function FeatureCard() {
  return (
    <article className="rounded-3xl border border-emerald-500/20 bg-white p-6 shadow-xl">
      <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
        Tailwind
      </span>
      <h3 className="mt-4 text-2xl font-bold text-slate-900">Reusable UI</h3>
      <p className="mt-3 text-slate-600">
        Compose layout, spacing, color, and state styles directly in your markup.
      </p>
    </article>
  );
}`,
      'Tailwind CSS makes it fast to build consistent UI directly inside JSX with utility classes.',
    ),
  'ui-development:material-ui-mui': () =>
    createStaticExample(
      'Material UI (MUI)',
      'jsx',
      `import { Button, Card, CardContent, Typography } from '@mui/material';

export default function StatsCard() {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="overline">MUI</Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Fast component setup
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Open dashboard
        </Button>
      </CardContent>
    </Card>
  );
}`,
      'MUI gives you ready-made accessible components with theming and responsive props.',
    ),
  'ui-development:framer-motion': () =>
    createStaticExample(
      'Framer Motion',
      'jsx',
      `import { motion } from 'framer-motion';

export default function HeroCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-slate-900">Framer Motion intro</h2>
      <p className="mt-3 text-slate-600">Animate entry, hover, and layout changes with React-friendly APIs.</p>
    </motion.article>
  );
}`,
      'Framer Motion helps React interfaces feel smoother with declarative, component-level animation.',
    ),
  'ui-development:gsap': () =>
    createStaticExample(
      'GSAP',
      'jsx',
      `import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PromoBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    );
  }, []);

  return <section ref={bannerRef}>GSAP lets you build timeline-driven animations.</section>;
}`,
      'GSAP is useful when you need timeline control, advanced sequencing, or scroll-linked motion.',
    ),
  'ui-development:shadcn-ui': () =>
    createStaticExample(
      'shadcn/ui',
      'jsx',
      `import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UpgradeCard() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>shadcn/ui</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Build composable design system primitives directly inside your app.</p>
        <Button>Explore components</Button>
      </CardContent>
    </Card>
  );
}`,
      'shadcn/ui gives you copy-pasteable component primitives you fully own inside your project.',
    ),
  'express-js:express-json-and-body-parser': () =>
    createStaticExample(
      'express.json() and body-parser',
      'js',
      `import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', (req, res) => {
  res.json({ received: req.body });
});`,
      'Modern Express uses `express.json()` for JSON bodies, while `body-parser` is still useful for urlencoded form data.',
    ),
  'express-js:cors': () =>
    createStaticExample(
      'cors',
      'js',
      `import cors from 'cors';

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);`,
      'CORS controls which frontend origins can call your API and whether cookies or auth headers are allowed.',
    ),
  'express-js:morgan': () =>
    createStaticExample(
      'morgan',
      'js',
      `import morgan from 'morgan';

app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});`,
      'Morgan logs incoming HTTP requests so you can spot broken routes and debug traffic quickly.',
    ),
  'react-js-advanced:react-router': () =>
    createStaticExample(
      'React Router',
      'jsx',
      `import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
      </Routes>
    </BrowserRouter>
  );
}`,
      'Routes map different URL paths to different screens in the same React app.',
    ),
  'rest-api-development:swagger-ui-express': () =>
    createStaticExample(
      'Swagger UI Express',
      'js',
      `import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));`,
      'Swagger UI Express hosts interactive API documentation directly inside your Express app.',
    ),
  'authentication-and-authorization:jsonwebtoken': () =>
    createStaticExample(
      'jsonwebtoken',
      'js',
      `import jwt from 'jsonwebtoken';

export function createAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' },
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}`,
      'The server issues a signed token after login and verifies it on protected requests.',
    ),
  'authentication-and-authorization:bcrypt': () =>
    createStaticExample(
      'bcrypt',
      'js',
      `import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function checkPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}`,
      'bcrypt protects passwords by hashing them before storage and comparing them safely during login.',
    ),
  'authentication-and-authorization:passport-js': () =>
    createStaticExample(
      'Passport.js',
      'js',
      `import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await User.findById(payload.sub);
      return done(null, user || false);
    },
  ),
);`,
      'Passport.js helps you plug reusable auth strategies into routes such as JWT, local login, or OAuth providers.',
    ),
  'security:helmet': () =>
    createStaticExample(
      'Helmet',
      'js',
      `import helmet from 'helmet';

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);`,
      'Helmet adds several secure HTTP headers to help protect your app by default.',
    ),
  'security:joi': () =>
    createStaticExample(
      'Joi',
      'js',
      `import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export function validateRegisterBody(req, res, next) {
  const { error, value } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: error.details.map((detail) => detail.message) });
  }

  req.body = value;
  return next();
}`,
      'Joi validates request data before it reaches your controllers or database layer.',
    ),
  'security:zod': () =>
    createStaticExample(
      'Zod',
      'js',
      `import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export function validateRegisterBody(req, res, next) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.flatten() });
  }

  req.body = parsed.data;
  return next();
}`,
      'Zod gives you a clean schema-first validation flow and is especially nice in TypeScript-heavy projects.',
    ),
  'file-upload:multer': () =>
    createStaticExample(
      'Multer',
      'js',
      `import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }

    return cb(null, true);
  },
});

app.post('/api/profile/photo', upload.single('avatar'), (req, res) => {
  res.json({ fileName: req.file?.originalname });
});`,
      'Multer parses multipart form uploads and lets you validate files before saving them.',
    ),
  'full-stack-integration:axios': () =>
    createStaticExample(
      'Axios',
      'js',
      `import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized request');
    }

    return Promise.reject(error);
  },
);`,
      'Axios makes it easy to create a reusable API client with shared base URLs, headers, and interceptors.',
    ),
  'real-time-features:socket-io': () =>
    createStaticExample(
      'Socket.IO',
      'js',
      `import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  socket.on('chat:send', (message) => {
    io.emit('chat:message', message);
  });
});

httpServer.listen(5000);`,
      'Socket.IO adds a simple event API for two-way realtime communication between server and client.',
    ),
  'advanced-mern-concepts:dotenv': () =>
    createStaticExample(
      'dotenv',
      'js',
      `import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ?? 5000;
const mongoUri = process.env.MONGO_URI;

console.log({ port, hasMongoUri: Boolean(mongoUri) });`,
      'dotenv loads environment variables from a local file so secrets and config stay out of source code.',
    ),
  'advanced-mern-concepts:redis': () =>
    createStaticExample(
      'Redis',
      'js',
      `import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

export async function getCachedProduct(id) {
  const cached = await redis.get(\`product:\${id}\`);
  return cached ? JSON.parse(cached) : null;
}

export async function cacheProduct(id, product) {
  await redis.setEx(\`product:\${id}\`, 3600, JSON.stringify(product));
}`,
      'Redis is commonly used for fast caching, ephemeral state, and queue backends.',
    ),
  'advanced-mern-concepts:bullmq': () =>
    createStaticExample(
      'BullMQ',
      'js',
      `import { Queue, Worker } from 'bullmq';

const connection = { host: '127.0.0.1', port: 6379 };

export const emailQueue = new Queue('email-jobs', { connection });

await emailQueue.add('welcome-email', {
  userId: 'u_123',
  email: 'learner@example.com',
});

new Worker(
  'email-jobs',
  async (job) => {
    console.log('Processing job', job.name, job.data.email);
  },
  { connection },
);`,
      'BullMQ moves slow or retryable tasks into background workers backed by Redis.',
    ),
  'advanced-mern-concepts:nodemailer': () =>
    createStaticExample(
      'Nodemailer',
      'js',
      `import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail({
  from: '"MERN Portal" <no-reply@example.com>',
  to: 'learner@example.com',
  subject: 'Welcome to the course',
  text: 'Your account is ready.',
});`,
      'Nodemailer sends transactional email such as welcome messages, verification links, and password resets.',
    ),
  'major-projects:search-first-knowledge-portal': () =>
    createStaticExample(
      'Search-First Knowledge Portal',
      'txt',
      `Frontend
- Search box with ranking, suggestions, and filters
- Result cards grouped by topic and course

Backend
- Indexed course/topic content
- Query logging for popular searches

Extras
- Bookmarking
- Related topic links
- Search analytics`,
      'A search-first portal proves you can model content, retrieval, user navigation, and information architecture.',
    ),
  'major-projects:rag-chatbot': () =>
    createStaticExample(
      'RAG Chatbot',
      'txt',
      `RAG flow
1. User asks a question
2. Retrieve the most relevant lessons
3. Build an answer from trusted syllabus content
4. Return direct lesson links for deeper reading

Useful features
- Suggested prompts
- Source links
- Follow-up questions
- Search + chat working together`,
      'A RAG chatbot combines retrieval, structured knowledge, and answer composition into one guided study flow.',
    ),
};

function createHtmlCourseExample(topicTitle) {
  const labs = {
    'html-introduction': {
      html: `<main class="page">
  <section class="hero">
    <p class="eyebrow">HTML foundation</p>
    <h1>Welcome to AJ's MERN study portal</h1>
    <p>HTML gives content meaning before CSS makes it beautiful and JavaScript makes it interactive.</p>
  </section>
</main>`,
      css: `.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #ecfeff;
  font-family: system-ui, sans-serif;
}

.hero {
  max-width: 620px;
  padding: 2rem;
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
}

.eyebrow {
  color: #0f766e;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}`,
      output: 'A beginner-friendly hero section renders with meaningful text content.',
    },
    'html-document-structure': {
      html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MERN Lesson Page</title>
  </head>
  <body>
    <header>Course Header</header>
    <main>
      <h1>HTML Document Structure</h1>
      <p>The browser reads this structure from top to bottom.</p>
    </main>
  </body>
</html>`,
      css: `body {
  margin: 0;
  padding: 2rem;
  background: #f8fafc;
  color: #0f172a;
  font-family: system-ui, sans-serif;
}

header,
main {
  max-width: 680px;
  margin: 1rem auto;
  padding: 1.25rem;
  border-radius: 1rem;
  background: white;
}`,
      output:
        'A complete HTML document has doctype, html, head, metadata, title, and body content.',
    },
    'headings-paragraphs-links': {
      html: `<article class="lesson">
  <h1>Frontend Roadmap</h1>
  <p>Start with structure, then styling, then interactivity.</p>
  <a href="/tutorials">Open tutorials</a>
</article>`,
      css: `.lesson {
  max-width: 560px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #dbeafe;
  border-radius: 1.25rem;
  font-family: system-ui, sans-serif;
}

a {
  color: #0369a1;
  font-weight: 700;
}`,
      output: 'The page communicates hierarchy with a heading, readable paragraph, and clear link.',
    },
    'images-and-lists': {
      html: `<section class="profile">
  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&auto=format&fit=crop" alt="Laptop showing a web development workspace" />
  <h1>Study checklist</h1>
  <ul>
    <li>Read the lesson</li>
    <li>Copy and edit the example</li>
    <li>Explain the output</li>
  </ul>
</section>`,
      css: `.profile {
  max-width: 520px;
  margin: 2rem auto;
  padding: 1.25rem;
  border-radius: 1.25rem;
  background: #ffffff;
  font-family: system-ui, sans-serif;
}

img {
  width: 100%;
  border-radius: 1rem;
}`,
      output: 'Images need useful alt text, and lists make repeated content easier to scan.',
    },
    tables: {
      html: `<table>
  <caption>Weekly MERN study plan</caption>
  <thead>
    <tr>
      <th>Day</th>
      <th>Topic</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>HTML forms</td>
      <td>Practice</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>CSS Grid</td>
      <td>Revise</td>
    </tr>
  </tbody>
</table>`,
      css: `table {
  width: min(680px, 100%);
  margin: 2rem auto;
  border-collapse: collapse;
  font-family: system-ui, sans-serif;
}

caption {
  margin-bottom: 0.75rem;
  font-weight: 800;
}

th,
td {
  border: 1px solid #cbd5e1;
  padding: 0.8rem;
  text-align: left;
}`,
      output: 'A table displays structured rows and columns with a caption and headings.',
    },
    'forms-and-inputs': {
      html: `<form class="contact-form">
  <h1>Join the MERN roadmap</h1>
  <label>
    Name
    <input type="text" name="name" placeholder="AJ" />
  </label>
  <label>
    Email
    <input type="email" name="email" placeholder="aj@example.com" />
  </label>
  <button type="submit">Send request</button>
</form>`,
      css: `.contact-form {
  max-width: 460px;
  margin: 2rem auto;
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: #f0fdfa;
  font-family: system-ui, sans-serif;
}

label {
  display: grid;
  gap: 0.4rem;
  font-weight: 700;
}

input,
button {
  border: 1px solid #99f6e4;
  border-radius: 0.8rem;
  padding: 0.8rem;
}`,
      output: 'A form connects labels, inputs, and an action button in an accessible structure.',
    },
    'semantic-html': {
      html: `<header class="site-header">MERN Portal</header>
<main>
  <section>
    <h1>Semantic HTML</h1>
    <article>
      <h2>Lesson card</h2>
      <p>Use meaningful tags so users, browsers, and assistive tools understand the page.</p>
    </article>
  </section>
</main>
<footer>Built by AJ</footer>`,
      css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f8fafc;
}

header,
main,
footer {
  max-width: 720px;
  margin: 1rem auto;
  padding: 1.25rem;
  border-radius: 1rem;
  background: white;
}`,
      output: 'Semantic landmarks make the page easier to navigate and understand.',
    },
    'seo-basics': {
      html: `<main class="seo-card">
  <h1>MERN Zero-to-Hero Roadmap</h1>
  <p>Use clear titles, headings, descriptions, and meaningful links so people and search engines understand the page.</p>
  <a href="/tutorials/html">Read the HTML course</a>
</main>`,
      css: `.seo-card {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: linear-gradient(135deg, #ffffff, #ecfeff);
  font-family: system-ui, sans-serif;
}`,
      output: 'SEO starts with clear page meaning, useful headings, and descriptive links.',
    },
  };

  const lab = labs[slugify(topicTitle)] ?? labs['html-introduction'];
  return createPreviewExample(topicTitle, lab.html, lab.css, lab.js ?? '', lab.output);
}

function createCssCourseExample(topicTitle) {
  const labs = {
    'css-introduction': {
      html: `<section class="card">
  <p class="label">CSS intro</p>
  <h1>Turn plain markup into a clean interface</h1>
  <p>CSS controls spacing, color, typography, and layout.</p>
</section>`,
      css: `.card {
  max-width: 560px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 1.5rem;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.14);
  font-family: system-ui, sans-serif;
}

.label {
  color: #0f766e;
  font-weight: 800;
}`,
      output: 'CSS changes a simple section into a polished card.',
    },
    selectors: {
      html: `<section class="pricing-card featured">
  <p class="badge">Popular</p>
  <h1>Selectors</h1>
  <button>Choose plan</button>
</section>`,
      css: `.pricing-card {
  max-width: 420px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 1.25rem;
}

.pricing-card.featured {
  border-color: #10b981;
  background: #ecfdf5;
}

.pricing-card button {
  border: 0;
  border-radius: 999px;
  padding: 0.75rem 1rem;
  background: #047857;
  color: white;
}`,
      output: 'Selectors target exact elements, classes, states, or nested UI parts.',
    },
    'colors-and-units': {
      html: `<article class="metric">
  <span>Progress</span>
  <strong>72%</strong>
</article>`,
      css: `:root {
  --brand: #0f766e;
}

.metric {
  width: min(90vw, 420px);
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 1.5rem;
  background: #ecfeff;
  font-family: system-ui, sans-serif;
}

strong {
  display: block;
  font-size: clamp(3rem, 12vw, 6rem);
  color: var(--brand);
}`,
      output: 'Colors and units make UI responsive, branded, and readable.',
    },
    'box-model': {
      html: `<div class="box">
  <h1>Box Model</h1>
  <p>Content, padding, border, and margin decide the real size of a card.</p>
</div>`,
      css: `.box {
  box-sizing: border-box;
  width: 360px;
  margin: 2rem auto;
  padding: 2rem;
  border: 6px solid #14b8a6;
  border-radius: 1rem;
  background: #ccfbf1;
}`,
      output: 'The card size is shaped by content width, padding, border, and margin.',
    },
    'display-properties': {
      html: `<nav class="nav">
  <a>Home</a>
  <a>Tutorials</a>
  <a>Projects</a>
</nav>`,
      css: `.nav {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem auto;
}

a {
  display: inline-flex;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: #f1f5f9;
}`,
      output:
        'Display rules decide whether elements stack, flow inline, or become layout containers.',
    },
    positioning: {
      html: `<article class="card">
  <span class="tag">New</span>
  <h1>Positioning</h1>
  <p>The tag is positioned relative to the card.</p>
</article>`,
      css: `.card {
  position: relative;
  max-width: 420px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 1.25rem;
  background: white;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
}

.tag {
  position: absolute;
  top: -0.75rem;
  right: 1rem;
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  background: #f97316;
  color: white;
}`,
      output: 'Positioning is useful for badges, overlays, sticky bars, and controlled placement.',
    },
    flexbox: {
      html: `<section class="toolbar">
  <strong>Lessons</strong>
  <div>
    <button>Save</button>
    <button>Next</button>
  </div>
</section>`,
      css: `.toolbar {
  max-width: 680px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: #f8fafc;
}

button {
  border: 0;
  border-radius: 999px;
  padding: 0.65rem 1rem;
}`,
      output: 'Flexbox aligns items in one direction and is excellent for navbars and toolbars.',
    },
    'css-grid': {
      html: `<section class="dashboard">
  <article>Revenue</article>
  <article>Users</article>
  <article>Orders</article>
  <article>Tickets</article>
</section>`,
      css: `.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  max-width: 760px;
  margin: 2rem auto;
}

article {
  min-height: 120px;
  border-radius: 1.25rem;
  padding: 1.25rem;
  background: #ecfeff;
}`,
      output: 'CSS Grid creates responsive two-dimensional layouts for cards and dashboards.',
    },
    'responsive-design': {
      html: `<section class="layout">
  <article>Main content</article>
  <aside>Sidebar</aside>
</section>`,
      css: `.layout {
  display: grid;
  gap: 1rem;
  max-width: 900px;
  margin: 2rem auto;
}

article,
aside {
  min-height: 160px;
  border-radius: 1rem;
  padding: 1rem;
  background: #f1f5f9;
}

@media (min-width: 760px) {
  .layout {
    grid-template-columns: 2fr 1fr;
  }
}`,
      output: 'The layout stacks on mobile and becomes two columns on wider screens.',
    },
    'media-queries': {
      html: `<section class="banner">
  <h1>Resize the preview</h1>
  <p>The color and alignment change at a breakpoint.</p>
</section>`,
      css: `.banner {
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 1.25rem;
  background: #dbeafe;
  text-align: left;
}

@media (min-width: 700px) {
  .banner {
    background: #dcfce7;
    text-align: center;
  }
}`,
      output: 'Media queries apply different styles for different viewport widths.',
    },
    'animations-and-transitions': {
      html: `<button class="cta">Hover for motion</button>`,
      css: `.cta {
  display: block;
  margin: 4rem auto;
  border: 0;
  border-radius: 999px;
  padding: 1rem 1.4rem;
  background: linear-gradient(135deg, #0f766e, #06b6d4);
  color: white;
  font-weight: 800;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(15, 118, 110, 0.25);
}`,
      output: 'Transitions add smooth feedback when a user interacts with the button.',
    },
  };

  const lab = labs[slugify(topicTitle)] ?? labs['css-introduction'];
  return createPreviewExample(topicTitle, lab.html, lab.css, lab.js ?? '', lab.output);
}

function createJavaScriptBasicsExample(topicTitle) {
  const labs = {
    'javascript-introduction': {
      js: `const learner = 'AJ';
const topic = 'JavaScript Introduction';

console.log(learner + ' is learning ' + topic + ' by running real code.');`,
      output: 'The console prints a simple message built from JavaScript values.',
    },
    variables: {
      js: `let completedLessons = 3;
const totalLessons = 10;

completedLessons += 1;

console.log('Progress:', completedLessons + '/' + totalLessons);`,
      output: 'Variables store values that can be read and updated during program flow.',
    },
    'data-types': {
      js: `const profile = {
  name: 'AJ',
  isLearning: true,
  completed: 4,
  topics: ['HTML', 'CSS', 'JavaScript'],
};

console.log(typeof profile.name);
console.log(Array.isArray(profile.topics));`,
      output: 'The snippet shows strings, booleans, numbers, arrays, and objects.',
    },
    operators: {
      js: `const lessonsDone = 7;
const totalLessons = 10;
const percentage = (lessonsDone / totalLessons) * 100;

console.log('Completed:', percentage + '%');
console.log('Ready for next phase:', percentage >= 70);`,
      output: 'Operators calculate values and compare conditions.',
    },
    conditions: {
      js: `const score = 82;

if (score >= 90) {
  console.log('Excellent');
} else if (score >= 70) {
  console.log('Good. Keep practicing.');
} else {
  console.log('Revise the basics first.');
}`,
      output: 'Conditions choose one path based on the current value.',
    },
    loops: {
      js: `const topics = ['HTML', 'CSS', 'JavaScript'];

for (const topic of topics) {
  console.log('Practice:', topic);
}`,
      output: 'A loop repeats work for every item in a collection.',
    },
    functions: {
      js: `function createLessonSummary(topic, minutes) {
  return topic + ' takes about ' + minutes + ' minutes to revise.';
}

console.log(createLessonSummary('Functions', 15));`,
      output: 'Functions package reusable logic with inputs and outputs.',
    },
    arrays: {
      js: `const roadmap = ['HTML', 'CSS', 'JavaScript'];

roadmap.push('React');

console.log(roadmap);
console.log('Next topic:', roadmap[2]);`,
      output: 'Arrays keep ordered lists and can grow as the roadmap expands.',
    },
    objects: {
      js: `const lesson = {
  title: 'Objects',
  level: 'Beginner',
  completed: false,
};

lesson.completed = true;

console.log(lesson.title, lesson.completed);`,
      output: 'Objects group related data under meaningful property names.',
    },
    'string-methods': {
      js: `const query = '  React Router  ';
const normalizedQuery = query.trim().toLowerCase();

console.log(normalizedQuery.includes('react'));
console.log(normalizedQuery);`,
      output: 'String methods clean, transform, and search text values.',
    },
    'array-methods': {
      js: `const lessons = [
  { title: 'HTML', done: true },
  { title: 'CSS', done: true },
  { title: 'React', done: false },
];

const completed = lessons.filter((lesson) => lesson.done);
const titles = completed.map((lesson) => lesson.title);

console.log(titles);`,
      output: 'Array methods transform lists without manually managing indexes.',
    },
    'date-and-math': {
      js: `const today = new Date();
const randomRevisionMinutes = Math.floor(Math.random() * 20) + 10;

console.log('Today:', today.toDateString());
console.log('Revision target:', randomRevisionMinutes + ' minutes');`,
      output: 'Date and Math help with scheduling, time, random values, and calculations.',
    },
    'error-handling': {
      js: `function parseProgress(value) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error('Progress must be a number');
  }

  return parsed;
}

try {
  console.log(parseProgress('85'));
  console.log(parseProgress('not ready'));
} catch (error) {
  console.log('Handled error:', error.message);
}`,
      output:
        'The code catches a bad value and handles the failure without crashing the full flow.',
    },
  };

  const lab = labs[slugify(topicTitle)] ?? labs['javascript-introduction'];

  return createStaticExample(
    topicTitle,
    'js',
    `// ${topicTitle} zero-to-hero mini lab
${lab.js}

// Pro practice:
// 1. Change the input values.
// 2. Predict the output before running.
// 3. Explain the result in one sentence.`,
    lab.output,
  );
}

const courseExamples = {
  'web-development-basics': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'txt',
      `Browser -> DNS lookup -> HTTP request -> Web server -> Application logic -> Response

Topic focus: ${topicTitle}
Goal: explain where this step appears in a real MERN app.`,
      'This lesson follows the path from a user action to the final response in the browser.',
    ),
  html: (topicTitle) => createHtmlCourseExample(topicTitle),
  css: (topicTitle) => createCssCourseExample(topicTitle),
  'javascript-basics': (topicTitle) => createJavaScriptBasicsExample(topicTitle),
  'javascript-advanced': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `const lesson = {
  title: '${topicTitle}',
  level: 'advanced',
  focus: 'modern JavaScript patterns',
};

async function loadLesson() {
  return Promise.resolve(\`Studying \${lesson.title}\`);
}

loadLesson().then(console.log);`,
      'The snippet shows how modern JavaScript features work together in one small example.',
    ),
  'git-and-github': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'bash',
      `# ${topicTitle}
git status
git add .
git commit -m "Study update"
git push origin main`,
      'Git tracks your changes locally and GitHub makes collaboration and review easier.',
    ),
  'react-js-basics': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'jsx',
      `function LessonCard({ title }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-600">This card is rendered from a React component.</p>
    </article>
  );
}

export default function App() {
  return <LessonCard title="${topicTitle}" />;
}`,
      'React renders UI from reusable components and props instead of manually changing the DOM.',
    ),
  'react-js-advanced': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'jsx',
      `import { useEffect, useState } from 'react';

export default function TopicLoader() {
  const [topic, setTopic] = useState('${topicTitle}');

  useEffect(() => {
    console.log('Current topic:', topic);
  }, [topic]);

  return <button onClick={() => setTopic('Next lesson')}>{topic}</button>;
}`,
      'Advanced React lessons focus on hooks, routing, optimization, and larger application patterns.',
    ),
  'state-management': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'jsx',
      `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}</button>;
}`,
      'State management decides where shared data lives and how different components read or update it.',
    ),
  'ui-development': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'jsx',
      `export function DashboardPanel() {
  return (
    <section className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl md:grid-cols-2">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">${topicTitle}</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Modern training dashboard</h2>
      </div>
      <div className="rounded-3xl bg-slate-50 p-4 text-slate-600">UI slot</div>
    </section>
  );
}`,
      'UI libraries and layout systems help teams deliver polished, consistent screens faster.',
    ),
  'node-js': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `import fs from 'node:fs';

const lesson = '${topicTitle}';

fs.writeFileSync('lesson.txt', \`Node topic: \${lesson}\`);
console.log('Saved a quick note for', lesson);`,
      'Node.js lets JavaScript run outside the browser so you can build servers and tools.',
    ),
  'express-js': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `import express from 'express';

const app = express();

app.get('/api/topic', (req, res) => {
  res.json({ topic: '${topicTitle}', status: 'ready' });
});

app.listen(5000);`,
      'Express adds routing and middleware patterns on top of the Node.js runtime.',
    ),
  mongodb: (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `db.topics.insertOne({
  title: '${topicTitle}',
  level: 'beginner',
  tags: ['mongodb', 'mern'],
});`,
      'MongoDB stores JSON-like documents, which makes it a natural fit for JavaScript applications.',
    ),
  mongoose: (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, default: '${topicTitle}' },
  },
  { timestamps: true },
);

export const Topic = mongoose.model('Topic', topicSchema);`,
      'Mongoose adds schema rules and model helpers on top of MongoDB collections.',
    ),
  'rest-api-development': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `app.get('/api/v1/topics', async (req, res) => {
  const { page = 1, search = '' } = req.query;

  res.json({
    topic: '${topicTitle}',
    page: Number(page),
    search,
  });
});`,
      'REST APIs expose predictable URLs, methods, and response shapes for frontend clients.',
    ),
  'authentication-and-authorization': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  return res.json({ topic: '${topicTitle}', accessToken: 'demo-token' });
});`,
      'Authentication checks identity, while authorization checks what that identity is allowed to do.',
    ),
  security: (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/api/health', (req, res) => {
  res.json({ topic: '${topicTitle}', secure: true });
});`,
      'Security work layers defenses so a single mistake does not expose the whole application.',
    ),
  'file-upload': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ topic: '${topicTitle}', file: req.file?.filename });
});`,
      'Upload flows validate files, store them safely, and return URLs or metadata for later use.',
    ),
  'full-stack-integration': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'jsx',
      `import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TopicFeed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/topics').then((response) => setItems(response.data.items ?? []));
  }, []);

  return <pre>{JSON.stringify({ topic: '${topicTitle}', count: items.length }, null, 2)}</pre>;
}`,
      'Frontend integration is about calling APIs cleanly, showing loading states, and handling errors well.',
    ),
  'admin-panel-development': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'jsx',
      `export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <article className="rounded-3xl bg-slate-900 p-5 text-white">Users</article>
      <article className="rounded-3xl bg-emerald-600 p-5 text-white">Orders</article>
      <article className="rounded-3xl bg-amber-500 p-5 text-white">${topicTitle}</article>
    </div>
  );
}`,
      'Admin screens focus on fast navigation, clear metrics, and controlled access to operations.',
    ),
  'payment-integration': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `app.post('/api/payments/create-order', async (req, res) => {
  const { amount } = req.body;

  return res.json({
    topic: '${topicTitle}',
    amount,
    provider: 'stripe-or-razorpay',
  });
});`,
      'Payment flows create an order, redirect or confirm payment, then verify the result on the server.',
    ),
  'real-time-features': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `socket.on('connect', () => {
  console.log('Connected for ${topicTitle}');
});

socket.on('status:update', (payload) => {
  console.log(payload);
});`,
      'Real-time features keep clients in sync immediately instead of waiting for the next refresh.',
    ),
  testing: (topicTitle) =>
    createStaticExample(
      topicTitle,
      'js',
      `import { render, screen } from '@testing-library/react';
import App from './App';

test('shows lesson title', () => {
  render(<App />);
  expect(screen.getByText(/${topicTitle}/i)).toBeInTheDocument();
});`,
      'Tests describe expected behavior so refactors can happen with more confidence.',
    ),
  deployment: (topicTitle) =>
    createStaticExample(
      topicTitle,
      'bash',
      `npm run build
vercel deploy

# Topic focus
# ${topicTitle}`,
      'Deployment turns your local app into a hosted, production-ready experience with proper configuration.',
    ),
  'mern-project-structure': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'txt',
      `frontend/
  src/
backend/
  controllers/
  services/
  routes/

Focus topic: ${topicTitle}`,
      'A clean project structure keeps large MERN applications easier to scale and maintain.',
    ),
  'advanced-mern-concepts': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'txt',
      `apps/
  web/
  api/
packages/
  ui/
  config/

Advanced topic: ${topicTitle}`,
      'Advanced MERN work emphasizes system boundaries, tooling, performance, and reliability.',
    ),
  'major-projects': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'txt',
      `Project: ${topicTitle}
- Define the user roles
- Break the product into features
- Prioritize the MVP flow
- Plan APIs and data models`,
      'Project lessons show how smaller concepts combine into full end-to-end applications.',
    ),
  'interview-preparation': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'md',
      `Q: What does ${topicTitle} cover?
A: It checks whether you can explain the concept clearly, apply it in projects, and discuss tradeoffs.`,
      'Interview prep focuses on concise explanations, practical examples, and system-level reasoning.',
    ),
};

export function getExampleTemplate(courseId, courseTitle, topicTitle, position = 0) {
  const overrideKey = `${courseId}:${slugify(topicTitle)}`;
  const override = topicOverrides[overrideKey];

  if (override) {
    return override(topicTitle, courseTitle, position);
  }

  const exampleFactory = courseExamples[courseId];

  if (exampleFactory) {
    return exampleFactory(topicTitle, courseTitle, position);
  }

  return createStaticExample(
    topicTitle,
    'txt',
    `${courseTitle}
Topic: ${topicTitle}
Lesson index: ${position + 1}`,
    `This example gives you a quick starting point for ${topicTitle}.`,
  );
}
