# MERN Study Portal React

A W3Schools-inspired static learning portal for MERN stack training, built with React, Vite, React Router, and Tailwind CSS.

## Overview

This project is a complete frontend-only tutorial website for a MERN training center. It covers the full zero-to-hero syllabus through dynamic course pages, topic sidebars, code examples, a browser-based practice editor, exercises, project ideas, and interview preparation.

The site is data-driven, so course and topic content is rendered from JavaScript files instead of hand-building separate pages for every lesson.

## Features

- Sticky top navigation with global tutorial search
- Redesigned course sidebar with progress, current lesson, and in-course topic search
- Clearer lesson pages with plain-English explanations and real-life examples
- Dynamic topic routing using React Router
- LocalStorage-powered theme, bookmarks, and completion tracking
- Copyable code blocks
- Try It Yourself editor with live HTML/CSS/JavaScript preview
- Static editable code area for React, Node, MongoDB, and architecture topics
- Responsive mobile sidebar and layout
- Exercises page with topic-based practice tasks
- Projects page with beginner, intermediate, and advanced project ideas
- Interview preparation page with grouped question sets
- About/contact page placeholder for training center branding
- Vitest + React Testing Library coverage for core sidebar/topic flows

## Tech Stack

- React 19
- Vite 8
- React Router DOM 6
- Tailwind CSS 3
- Lucide React icons
- Vitest
- React Testing Library
- LocalStorage for client-side persistence

## Folder Structure

```text
mern-study-portal-react/
|- public/
|- src/
|  |- components/
|  |- context/
|  |- data/
|  |- hooks/
|  |- layouts/
|  |- pages/
|  |- routes/
|  |- styles/
|  `- utils/
|- index.html
|- package.json
|- postcss.config.js
|- tailwind.config.js
`- vite.config.js
```

## Key Data Files

- `src/data/courses.js`: full syllabus course and topic structure
- `src/data/courseProfiles.js`: clearer teaching profiles and real-life context per course
- `src/data/examples.js`: reusable code example templates for all courses
- `src/data/resources.js`: project cards, interview groups, and contact placeholders

## Installation

```bash
npm install
```

## Run The Project

```bash
npm run dev
```

The local development server will start with Vite. Open the local URL shown in the terminal.

## Build For Production

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Test

```bash
npm run test
```

Run once:

```bash
npm run test:run
```

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Keep the default Vite build settings.
4. Deploy.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

### Netlify

1. Push the project to GitHub.
2. Create a new site from Git in Netlify.
3. Use the settings below.

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

## Content Notes

- The current training center contact details are placeholders in `src/data/resources.js`.
- All lesson content is static and can be edited directly in the data layer.
- The project is ready to evolve into a backend-powered LMS later if needed.

## Verified

- `npm run test:run`
- `npm run build`
- `npm run lint`
