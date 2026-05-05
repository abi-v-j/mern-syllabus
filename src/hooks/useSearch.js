export function useSearch(courses, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const matches = [];

  courses.forEach((course) => {
    const courseText = `${course.courseTitle} ${course.courseDescription}`.toLowerCase();

    if (courseText.includes(normalizedQuery)) {
      matches.push({
        type: 'course',
        courseId: course.courseId,
        title: course.courseTitle,
        subtitle: `${course.topics.length} topics`,
      });
    }

    course.topics.forEach((topic) => {
      const topicText = `${topic.topicTitle} ${topic.explanation}`.toLowerCase();
      if (topicText.includes(normalizedQuery)) {
        matches.push({
          type: 'topic',
          courseId: course.courseId,
          topicId: topic.topicId,
          title: topic.topicTitle,
          subtitle: course.courseTitle,
        });
      }
    });
  });

  return matches.slice(0, 12);
}
