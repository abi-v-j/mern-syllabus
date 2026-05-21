function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeQuery(query) {
  return [
    ...new Set(
      normalizeSearchText(query)
        .split(' ')
        .filter((token) => token.length > 1),
    ),
  ];
}

function scoreByTokens(text, searchTerms, tokens) {
  let score = 0;

  tokens.forEach((token) => {
    if (text.includes(token)) {
      score += 5;
    }

    searchTerms.forEach((term) => {
      if (term === token) {
        score += 12;
      } else if (term.includes(token)) {
        score += 8;
      }
    });
  });

  return score;
}

function buildCourseSearchTerms(course) {
  return [
    course.courseTitle,
    course.label,
    course.level,
    course.stageTitle,
    course.focus,
    ...(course.searchTerms ?? []),
    ...course.topics.map((topic) => topic.topicTitle),
  ].map(normalizeSearchText);
}

function buildTopicSearchTerms(course, topic) {
  return [
    topic.topicTitle,
    course.courseTitle,
    course.stageTitle,
    course.level,
    topic.simpleExplanation,
    topic.learningOutcome,
    ...(course.searchTerms ?? []),
    ...(topic.searchTerms ?? []),
    ...(topic.tools ?? []),
  ].map(normalizeSearchText);
}

function getCourseScore(course, normalizedQuery, tokens) {
  const title = normalizeSearchText(course.courseTitle);
  const description = normalizeSearchText(`${course.courseDescription} ${course.focus}`);
  const searchTerms = buildCourseSearchTerms(course);
  let score = 0;

  if (title === normalizedQuery) {
    score += 120;
  }

  if (title.startsWith(normalizedQuery)) {
    score += 80;
  }

  if (title.includes(normalizedQuery)) {
    score += 60;
  }

  if (description.includes(normalizedQuery)) {
    score += 20;
  }

  score += scoreByTokens(`${title} ${description}`, searchTerms, tokens);

  return score;
}

function getTopicScore(course, topic, normalizedQuery, tokens) {
  const title = normalizeSearchText(topic.topicTitle);
  const summary = normalizeSearchText(
    `${topic.simpleExplanation} ${topic.explanation} ${topic.whyItMatters} ${topic.learningOutcome}`,
  );
  const searchTerms = buildTopicSearchTerms(course, topic);
  let score = 0;

  if (title === normalizedQuery) {
    score += 150;
  }

  if (title.startsWith(normalizedQuery)) {
    score += 90;
  }

  if (title.includes(normalizedQuery)) {
    score += 70;
  }

  if (summary.includes(normalizedQuery)) {
    score += 24;
  }

  score += scoreByTokens(`${title} ${summary}`, searchTerms, tokens);

  if (normalizeSearchText(course.courseTitle).includes(normalizedQuery)) {
    score += 8;
  }

  return score;
}

function createCourseResult(course, score) {
  return {
    id: `course-${course.courseId}`,
    type: 'course',
    courseId: course.courseId,
    topicId: null,
    title: course.courseTitle,
    subtitle: `${course.stageBadge} • ${course.level} • ${course.topics.length} topics`,
    snippet: course.courseDescription,
    matchReason: course.focus,
    path: `/tutorials/${course.courseId}`,
    level: course.level,
    stageTitle: course.stageTitle,
    keywords: (course.searchTerms ?? []).slice(0, 4),
    score,
  };
}

function createTopicResult(course, topic, score) {
  return {
    id: `topic-${course.courseId}-${topic.topicId}`,
    type: 'topic',
    courseId: course.courseId,
    topicId: topic.topicId,
    title: topic.topicTitle,
    subtitle: `${course.courseTitle} • ${course.level} • ${topic.estimatedMinutes} min`,
    snippet: topic.simpleExplanation,
    matchReason: topic.learningOutcome,
    path: `/tutorials/${course.courseId}/${topic.topicId}`,
    level: course.level,
    stageTitle: course.stageTitle,
    keywords: [...(topic.searchTerms ?? []), ...(topic.tools ?? [])].slice(0, 4),
    score,
  };
}

export const popularSearches = [
  'React Router',
  'Tailwind CSS',
  'Redux Toolkit',
  'jsonwebtoken',
  'Passport.js',
  'Socket.IO',
  'Redis',
  'BullMQ',
  'RAG Chatbot',
];

export function searchCourseContent(courses, query, options = {}) {
  const { limit = 12, type = 'all' } = options;
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const tokens = tokenizeQuery(query);
  const results = [];

  courses.forEach((course) => {
    const courseScore = getCourseScore(course, normalizedQuery, tokens);

    if (courseScore > 0 && type !== 'topic') {
      results.push(createCourseResult(course, courseScore));
    }

    course.topics.forEach((topic) => {
      const topicScore = getTopicScore(course, topic, normalizedQuery, tokens);

      if (topicScore > 0 && type !== 'course') {
        results.push(createTopicResult(course, topic, topicScore));
      }
    });
  });

  return results
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (left.type !== right.type) {
        return left.type === 'topic' ? -1 : 1;
      }

      return left.title.localeCompare(right.title);
    })
    .slice(0, limit);
}
