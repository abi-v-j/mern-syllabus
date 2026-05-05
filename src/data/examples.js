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
        Compose layout, spacing, and state styles directly in the markup.
      </p>
    </article>
  );
}`,
      'Tailwind utilities create a polished component without leaving the JSX file.',
    ),
  'react-js-advanced:react-router': () =>
    createStaticExample(
      'React Router',
      'jsx',
      `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

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
  'authentication-and-authorization:jwt-authentication': () =>
    createStaticExample(
      'JWT Authentication',
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
  'real-time-features:socket-io': () =>
    createStaticExample(
      'Socket.io',
      'js',
      `// server.js
io.on('connection', (socket) => {
  socket.on('chat:send', (message) => {
    io.emit('chat:message', message);
  });
});

// client.js
socket.emit('chat:send', { text: 'Hello team!' });
socket.on('chat:message', (message) => {
  console.log(message.text);
});`,
      'Messages are pushed to every connected client without waiting for a manual refresh.',
    ),
};

const courseExamples = {
  'web-development-basics': (topicTitle) =>
    createStaticExample(
      topicTitle,
      'txt',
      `Browser -> DNS lookup -> HTTP request -> Web server -> Application logic -> Response\n\nTopic focus: ${topicTitle}\nGoal: explain where this step appears in a real MERN app.`,
      'This lesson follows the path from a user action to the final response in the browser.',
    ),
  html: (topicTitle) =>
    createPreviewExample(
      topicTitle,
      `<main>
  <section class="lesson-card">
    <h1>${topicTitle}</h1>
    <p>Build semantic pages by combining structure, text, and media correctly.</p>
    <ul>
      <li>Readable markup</li>
      <li>Accessible content</li>
      <li>Maintainable structure</li>
    </ul>
  </section>
</main>`,
      `body {
  margin: 0;
  padding: 2rem;
  background: #eff6ff;
  font-family: system-ui, sans-serif;
}

.lesson-card {
  max-width: 620px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 24px;
  background: white;
}`,
      '',
      'A semantic HTML section is rendered with text and a short topic summary.',
    ),
  css: (topicTitle) =>
    createPreviewExample(
      topicTitle,
      `<section class="panel">
  <div class="badge">CSS topic</div>
  <h1>${topicTitle}</h1>
  <p>Use layout and visual rules to make interfaces easier to scan.</p>
</section>`,
      `.panel {
  max-width: 540px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 28px;
  background: linear-gradient(160deg, #ffffff, #dcfce7);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
}

.badge {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: #0f766e;
  color: white;
}`,
      '',
      'The preview shows how CSS changes the look and spacing of plain markup.',
    ),
  'javascript-basics': (topicTitle) =>
    createPreviewExample(
      topicTitle,
      `<main class="js-box">
  <h1>${topicTitle}</h1>
  <button id="runBtn">Run example</button>
  <p id="result">Result will appear here.</p>
</main>`,
      `.js-box {
  max-width: 420px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 20px;
  background: #f8fafc;
  font-family: system-ui, sans-serif;
}

button {
  border: 0;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  background: #0f172a;
  color: white;
}`,
      `document.getElementById('runBtn').onclick = () => {
  const values = [12, 18, 24];
  const total = values.reduce((sum, value) => sum + value, 0);
  document.getElementById('result').textContent = 'Calculated total: ' + total;
};`,
      'Clicking the button runs JavaScript and updates the page with a calculated result.',
    ),
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
      'State management decides where data lives and how multiple components read or update it.',
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

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  focus: { type: String, default: '${topicTitle}' },
}, { timestamps: true });

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
      `Q: What does ${topicTitle} cover?\nA: It checks whether you can explain the concept clearly, apply it in projects, and discuss tradeoffs.`,
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
    `${courseTitle}\nTopic: ${topicTitle}\nLesson index: ${position + 1}`,
    `This example gives you a quick starting point for ${topicTitle}.`,
  );
}
