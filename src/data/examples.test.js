import { describe, expect, it } from 'vitest';
import { getExampleTemplate } from './examples.js';

describe('lesson examples', () => {
  it('uses topic-specific HTML examples instead of only changing the title', () => {
    const intro = getExampleTemplate('html', 'HTML', 'HTML Introduction');
    const forms = getExampleTemplate('html', 'HTML', 'Forms and Inputs');

    expect(intro.code).toContain('HTML foundation');
    expect(forms.code).toContain('contact-form');
    expect(forms.code).not.toBe(intro.code);
  });

  it('uses topic-specific CSS and JavaScript beginner labs', () => {
    const grid = getExampleTemplate('css', 'CSS', 'CSS Grid');
    const loops = getExampleTemplate('javascript-basics', 'JavaScript Basics', 'Loops');

    expect(grid.code).toContain('grid-template-columns');
    expect(loops.code).toContain('for (const topic of topics)');
  });
});
