import { useMemo } from 'react';
import { searchCourseContent } from '../utils/searchEngine.js';

export function useSearch(courses, query, options = {}) {
  const { limit = 12, type = 'all' } = options;

  return useMemo(
    () => searchCourseContent(courses, query, { limit, type }),
    [courses, limit, query, type],
  );
}
