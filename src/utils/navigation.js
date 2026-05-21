export function buildTopicKey(courseId, topicId) {
  return `${courseId}::${topicId}`;
}

export function findCourse(courses, courseId) {
  return courses.find((course) => course.courseId === courseId);
}

export function findTopic(course, topicId) {
  return course?.topics.find((topic) => topic.topicId === topicId);
}

export function flattenTopics(courses) {
  return courses.flatMap((course) =>
    course.topics.map((topic, index) => ({
      ...topic,
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      courseLabel: course.label,
      courseLevel: course.level,
      stageId: course.stageId,
      stageTitle: course.stageTitle,
      courseDescription: course.courseDescription,
      courseSearchTerms: course.searchTerms ?? [],
      topicIndex: index,
      totalTopics: course.topics.length,
    })),
  );
}

export function getTopicNavigation(course, topicId) {
  const currentIndex = course?.topics.findIndex((topic) => topic.topicId === topicId) ?? -1;

  if (currentIndex < 0) {
    return {
      currentIndex: -1,
      previousTopic: null,
      nextTopic: null,
    };
  }

  return {
    currentIndex,
    previousTopic: currentIndex > 0 ? course.topics[currentIndex - 1] : null,
    nextTopic: currentIndex < course.topics.length - 1 ? course.topics[currentIndex + 1] : null,
  };
}

export function countCompletedTopics(course, completedTopics) {
  return course.topics.filter(
    (topic) => completedTopics[buildTopicKey(course.courseId, topic.topicId)],
  ).length;
}
