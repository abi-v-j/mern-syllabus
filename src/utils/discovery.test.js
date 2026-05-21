import { describe, expect, it } from 'vitest';
import courses from '../data/courses.js';
import { buildAssistantReply } from './ragAssistant.js';
import { searchCourseContent } from './searchEngine.js';

describe('discovery layer', () => {
  it('matches common aliases and misspellings in search', () => {
    const results = searchCourseContent(courses, 'jsonwebtocken');

    expect(results[0]?.title).toBe('jsonwebtoken');
    expect(results[0]?.type).toBe('topic');
  });

  it('builds comparison-style assistant answers for tool questions', () => {
    const reply = buildAssistantReply(courses, 'Redux Toolkit vs Zustand');

    expect(reply.title).toContain('Redux Toolkit');
    expect(reply.title).toContain('Zustand');
    expect(reply.links).toHaveLength(2);
  });
});
