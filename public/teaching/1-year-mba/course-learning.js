(() => {
  'use strict';
  const source = document.getElementById('course-learning-data');
  const mount = document.getElementById('course-learning-checks');
  const score = document.getElementById('course-learning-score');
  const reset = document.getElementById('course-learning-reset');
  if (!source || !mount || !score || !reset) return;
  let questions;
  try {
    const data = JSON.parse(source.textContent);
    questions = data.questions;
    if (!Number.isInteger(data.session) || data.session < 1 || data.session > 13 || !Array.isArray(questions) || questions.length !== 4) throw new Error('Invalid practice configuration');
    for (const item of questions) {
      if (typeof item.q !== 'string' || !Array.isArray(item.o) || item.o.length !== 3 || !item.o.every(value => typeof value === 'string') || !Number.isInteger(item.a) || item.a < 0 || item.a > 2 || !Array.isArray(item.feedback) || item.feedback.length !== 3 || !item.feedback.every(value => typeof value === 'string')) throw new Error('Invalid practice question');
    }
  } catch {
    mount.textContent = 'These practice questions are unavailable. Use the written discussion prompts and existing lesson activities.';
    reset.disabled = true;
    return;
  }
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function render() {
    mount.replaceChildren();
    score.textContent = '0';
    let correctCount = 0;
    questions.forEach((item, index) => {
      const row = element('li');
      row.dataset.question = index;
      const prompt = element('p', `${index + 1}. ${item.q}`);
      prompt.id = `course-learning-question-${index}`;
      const choices = element('div', undefined, 'course-learning-choices');
      choices.setAttribute('role', 'group');
      choices.setAttribute('aria-labelledby', prompt.id);
      const feedback = element('p', undefined, 'course-learning-feedback');
      feedback.id = `course-learning-feedback-${index}`;
      feedback.hidden = true;
      feedback.setAttribute('aria-live', 'polite');
      feedback.setAttribute('aria-atomic', 'true');
      item.o.forEach((label, choice) => {
        const button = element('button', label);
        button.type = 'button';
        button.dataset.choice = choice;
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-describedby', feedback.id);
        button.addEventListener('click', () => {
          if (row.dataset.done === 'true') return;
          row.dataset.done = 'true';
          if (choice === item.a) score.textContent = String(++correctCount);
          [...choices.children].forEach((option, optionIndex) => {
            option.disabled = true;
            option.setAttribute('aria-pressed', String(optionIndex === choice));
            const tags = [];
            if (optionIndex === choice) tags.push('Your choice');
            if (optionIndex === item.a) tags.push('Correct answer');
            option.textContent = item.o[optionIndex] + (tags.length ? ` · ${tags.join(' · ')}` : '');
            if (optionIndex === item.a) option.dataset.state = 'correct';
            else if (optionIndex === choice) option.dataset.state = 'chosen';
          });
          feedback.textContent = item.feedback[choice];
          feedback.hidden = false;
        });
        choices.append(button);
      });
      row.append(prompt, choices, feedback);
      mount.append(row);
    });
  }
  reset.dataset.progressReset = 'true';
  reset.hidden = false;
  reset.addEventListener('click', () => { render(); mount.querySelector('button')?.focus(); });
  render();
})();
