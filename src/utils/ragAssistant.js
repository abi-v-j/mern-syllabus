import { searchCourseContent } from './searchEngine.js';

function findCourse(courses, courseId) {
  return courses.find((course) => course.courseId === courseId);
}

function findTopic(course, topicId) {
  return course?.topics.find((topic) => topic.topicId === topicId);
}

function isRoadmapQuestion(query) {
  const text = query.toLowerCase();
  return ['roadmap', 'start', 'begin', 'zero to hero', 'learning path', 'learn mern', 'order'].some(
    (keyword) => text.includes(keyword),
  );
}

function isComparisonQuestion(query) {
  const text = query.toLowerCase();
  return text.includes(' vs ') || text.includes('compare ');
}

function buildLink(result) {
  return {
    title: result.title,
    subtitle: result.subtitle,
    path: result.path,
  };
}

function buildRoadmapReply(courses) {
  const stageMap = new Map();

  courses.forEach((course) => {
    if (!stageMap.has(course.stageId)) {
      stageMap.set(course.stageId, []);
    }

    stageMap.get(course.stageId).push(course);
  });

  const orderedStages = [...stageMap.values()].map((stageCourses) => stageCourses[0]);

  return {
    title: 'Zero-to-hero MERN roadmap',
    answer:
      'Follow the roadmap in phases instead of jumping between random tutorials. Each phase builds directly on the one before it.',
    bullets: orderedStages.map(
      (course) =>
        `${course.stageBadge}: ${course.stageTitle} starts with ${course.courseTitle} and focuses on ${course.focus}.`,
    ),
    links: orderedStages.map((course) => ({
      title: `${course.stageBadge} • ${course.courseTitle}`,
      subtitle: course.courseDescription,
      path: `/tutorials/${course.courseId}`,
    })),
    followUps: [
      'Which phase should I learn after JavaScript?',
      'Give me a beginner MERN project roadmap.',
      'How long should I spend on React before backend?',
    ],
  };
}

function buildComparisonReply(courses, results) {
  const topicResults = results.filter((result) => result.type === 'topic').slice(0, 2);

  if (topicResults.length < 2) {
    return null;
  }

  const [leftResult, rightResult] = topicResults;
  const leftCourse = findCourse(courses, leftResult.courseId);
  const rightCourse = findCourse(courses, rightResult.courseId);
  const leftTopic = findTopic(leftCourse, leftResult.topicId);
  const rightTopic = findTopic(rightCourse, rightResult.topicId);

  return {
    title: `${leftTopic.topicTitle} vs ${rightTopic.topicTitle}`,
    answer:
      'Use the simpler tool when the state or feature is still local and understandable. Reach for the heavier tool only when multiple screens, async flows, or team conventions justify it.',
    bullets: [
      `${leftTopic.topicTitle}: ${leftTopic.simpleExplanation}`,
      `${rightTopic.topicTitle}: ${rightTopic.simpleExplanation}`,
      `Pick ${leftTopic.topicTitle} when you want a smaller mental model. Pick ${rightTopic.topicTitle} when the app needs more structure or shared conventions.`,
    ],
    links: [buildLink(leftResult), buildLink(rightResult)],
    followUps: [
      `When should I choose ${leftTopic.topicTitle}?`,
      `Show me the code basics for ${rightTopic.topicTitle}.`,
      'What should I learn next after this comparison?',
    ],
  };
}

function buildTopicReply(courses, results) {
  const primaryResult = results.find((result) => result.type === 'topic') ?? results[0];
  const supportingResults = results.filter((result) => result.id !== primaryResult.id).slice(0, 3);
  const course = findCourse(courses, primaryResult.courseId);
  const topic = primaryResult.topicId ? findTopic(course, primaryResult.topicId) : null;

  if (!course || !topic) {
    return {
      title: primaryResult.title,
      answer: primaryResult.snippet,
      bullets: [primaryResult.matchReason],
      links: [buildLink(primaryResult)],
      followUps: ['Show me a related topic.', 'What should I learn next?'],
    };
  }

  return {
    title: topic.topicTitle,
    answer: `${topic.simpleExplanation} ${topic.whyItMatters}`,
    bullets: [
      topic.learningOutcome,
      `Best studied inside ${course.courseTitle} (${course.level}).`,
      `Practice idea: ${topic.practiceTask}`,
    ],
    links: [buildLink(primaryResult), ...supportingResults.map(buildLink)],
    followUps: [
      topic.starterQuestion,
      `What should I learn after ${topic.topicTitle}?`,
      `Show me more lessons from ${course.courseTitle}.`,
    ],
  };
}

export const assistantPrompts = [
  'Give me a zero-to-hero MERN roadmap.',
  'Redux Toolkit vs Zustand',
  'How do I secure an Express API?',
  'How do I use jsonwebtoken and bcrypt together?',
  'Teach me Socket.IO for a chat app.',
  'How do Redis and BullMQ fit into MERN?',
  'Show me the best way to learn Tailwind CSS and MUI.',
  'How can I build a RAG chatbot in a MERN project?',
];

export function buildAssistantReply(courses, query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      title: 'Ask a MERN question',
      answer:
        'Ask about a topic, a tool comparison, a learning roadmap, or a project feature and I will retrieve the best matching lessons from the syllabus.',
      bullets: ['Try React Router, Tailwind CSS, Passport.js, Redis, BullMQ, or RAG Chatbot.'],
      links: [
        {
          title: 'Browse all tutorials',
          subtitle: 'Open the complete syllabus',
          path: '/tutorials',
        },
      ],
      followUps: assistantPrompts.slice(0, 3),
    };
  }

  if (isRoadmapQuestion(trimmedQuery)) {
    return buildRoadmapReply(courses);
  }

  const results = searchCourseContent(courses, trimmedQuery, { limit: 6 });

  if (!results.length) {
    return {
      title: 'No close syllabus match yet',
      answer:
        'I could not retrieve a strong lesson match from the current syllabus. Try a package name, a concept, or the feature you want to build.',
      bullets: [
        'Good queries: Tailwind CSS, Passport.js, JWT Authentication Flow, Redis, BullMQ, Socket.IO.',
      ],
      links: [
        {
          title: 'Open tutorials',
          subtitle: 'Browse the full zero-to-hero roadmap',
          path: '/tutorials',
        },
      ],
      followUps: assistantPrompts.slice(0, 4),
    };
  }

  if (isComparisonQuestion(trimmedQuery)) {
    const comparisonReply = buildComparisonReply(courses, results);

    if (comparisonReply) {
      return comparisonReply;
    }
  }

  return buildTopicReply(courses, results);
}
