/**
 * Keyboard input helpers. The whole game must be operable from the keyboard
 * (FR-012): free-text answers submit on Enter, and the primary action of any
 * screen is reachable by tabbing to its button.
 * @module ui/input
 */

/**
 * Submit a free-text field when the learner presses Enter.
 * @param {HTMLInputElement} input
 * @param {() => void} onSubmit
 */
export function submitOnEnter(input, onSubmit) {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  });
}

/**
 * Move keyboard focus to the most useful control on a freshly rendered screen:
 * the answer input if present, otherwise the first actionable button.
 * @param {HTMLElement} root
 */
export function focusPrimary(root) {
  const input = /** @type {HTMLElement | null} */ (root.querySelector('.answer-input'));
  const target = input ?? /** @type {HTMLElement | null} */ (root.querySelector('[data-action]'));
  if (target) target.focus();
}
