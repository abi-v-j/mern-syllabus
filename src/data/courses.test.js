import { describe, expect, it } from 'vitest';
import courses from './courses.js';

describe('courses data', () => {
  it('adds simple explanations and real-life examples to every topic', () => {
    courses.forEach((course) => {
      course.topics.forEach((topic) => {
        expect(topic.simpleExplanation).toBeTruthy();
        expect(topic.whyItMatters).toBeTruthy();
        expect(topic.realLifeExample?.title).toBe('Real-life example');
        expect(topic.realLifeExample?.scenario).toBeTruthy();
        expect(topic.realLifeExample?.takeaway).toBeTruthy();
      });
    });
  });
});
