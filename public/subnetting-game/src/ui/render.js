/**
 * Presentation: builds screen markup and announces feedback. No game logic and
 * no subnet math live here. Status is always conveyed by text + icon, never by
 * color alone (FR-011); notation is consistent across screens (Principle IV).
 * @module ui/render
 */

/**
 * @typedef {import('../engine/generate.js').Challenge} Challenge
 * @typedef {import('../game/content.js').Lesson} Lesson
 */

/** @param {string} s */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {import('../engine/address.js').AnswerKind} kind */
function kindHint(kind) {
  switch (kind) {
    case 'address':
      return 'an address, e.g. 192.168.1.0';
    case 'mask':
      return 'a mask like 255.255.255.0 or /24';
    case 'count':
      return 'a whole number';
    default:
      /* c8 ignore next -- ranges are not used as free-text answers in v1 */
      return 'your answer';
  }
}

/**
 * @param {Lesson} lesson
 * @returns {string}
 */
export function renderLesson(lesson) {
  return `
    <section class="screen screen--lesson card" aria-labelledby="lesson-title">
      <h2 id="lesson-title">${esc(lesson.title)}</h2>
      <p>${esc(lesson.body)}</p>
      <button class="btn-primary" data-action="start-practice">Start practice</button>
    </section>`;
}

/**
 * @param {Challenge} challenge
 * @param {string} errorMsg
 * @returns {string}
 */
export function renderChallenge(challenge, errorMsg) {
  const body =
    challenge.entryMode === 'mc'
      ? `<div class="options" role="group" aria-label="Answer choices">
           ${(challenge.options ?? [])
             .map(
               (o) =>
                 `<button class="option" data-action="option" data-label="${esc(o.label)}">${esc(o.label)}</button>`
             )
             .join('')}
         </div>`
      : `<div class="answer-form">
           <label class="format-hint" for="answer">Type ${esc(kindHint(challenge.answer.kind))}</label>
           <input id="answer" class="answer-input" type="text" autocomplete="off"
                  inputmode="text" aria-describedby="answer-hint" />
           <button class="btn-primary" type="button" data-action="submit">Submit</button>
         </div>`;
  const error = errorMsg ? `<p class="input-error" role="alert">${esc(errorMsg)}</p>` : '';
  return `
    <section class="screen screen--challenge card" aria-labelledby="challenge-prompt">
      <p class="prompt" id="challenge-prompt">${esc(challenge.prompt)}</p>
      ${body}
      ${error}
    </section>`;
}

/**
 * @param {{ status: 'correct'|'incorrect', correctAnswer: string,
 *           explanation: import('../engine/generate.js').Explanation }} result
 * @returns {string}
 */
export function renderFeedback(result) {
  const correct = result.status === 'correct';
  const icon = correct ? '✓' : '✗'; // ✓ / ✗ — shape carries meaning, not just color
  const derivation = correct
    ? ''
    : `<div class="derivation">
         <p>Correct answer: <strong>${esc(result.correctAnswer)}</strong></p>
         <ol>${result.explanation.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
       </div>`;
  return `
    <section class="screen screen--feedback card" aria-labelledby="feedback-title">
      <div class="feedback feedback--${correct ? 'correct' : 'incorrect'}">
        <p id="feedback-title">
          <span class="feedback__icon" aria-hidden="true">${icon}</span>
          ${correct ? 'Correct!' : 'Not quite.'}
        </p>
        ${derivation}
      </div>
      <button class="btn-primary" data-action="next">Next</button>
    </section>`;
}

/**
 * Announce a message to assistive technology via the ARIA live region.
 * @param {string} message
 */
export function announce(message) {
  /* c8 ignore next -- live region is present in the app shell and tests */
  if (typeof document === 'undefined') return;
  const region = document.getElementById('aria-live');
  if (region) region.textContent = message;
}
