# MERN Zero to Hero Portal

A responsive React + Vite learning portal for a complete zero-to-hero MERN roadmap.

## What Changed

This version is structured as a clearer learning system instead of a flat topic list.

- Stage-based roadmap from foundations to advanced MERN architecture
- Smarter search that understands topic names, aliases, and package names
- RAG-style study assistant that answers questions from the syllabus and links to lesson pages
- More practical course metadata: level, phase, prerequisites, tools, outcomes, and build focus
- Expanded topic coverage for modern frontend and backend tooling
- Cleaner, more interesting home/tutorial/course layouts
- Copyable code examples and practice-friendly lesson pages

## Included Topics

The syllabus now explicitly covers topics such as:

- Framer Motion
- GSAP
- Material UI (MUI)
- Tailwind CSS
- Redux Toolkit
- Recoil
- Zustand
- Jotai
- Helmet
- cors
- morgan
- body-parser
- jsonwebtoken
- bcrypt
- Passport.js
- Joi
- Zod
- Multer
- Socket.IO
- Axios
- Swagger UI Express
- Redis
- BullMQ
- dotenv
- Nodemailer

## Main Routes

- `/` home page with roadmap overview
- `/tutorials` stage-based syllabus browser
- `/tutorials/:courseId/:topicId` detailed lesson pages
- `/search` ranked search results
- `/assistant` RAG-style study assistant
- `/exercises` quick revision prompts
- `/projects` portfolio project ideas
- `/interview-prep` grouped interview questions

## Tech Stack

- React 19
- Vite 8
- React Router DOM 6
- Tailwind CSS 3
- Lucide React
- Vitest
- React Testing Library

## Run Locally

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run test:run
npm run build
```

## Verified

- `npm run lint`
- `npm run test:run`
- `npm run build`
