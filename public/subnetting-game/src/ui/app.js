/**
 * Application entry point: wires the UI to the game controller and the engine
 * (ui → game → engine). Renders the current game state and translates user
 * actions into controller calls.
 * @module ui/app
 */
import { makeRng } from '../engine/index.js';
import { createGame } from '../game/game.js';
import { renderLesson, renderChallenge, renderFeedback, announce } from './render.js';
import { submitOnEnter, focusPrimary } from './input.js';

/**
 * Mount the game into a root element.
 * @param {HTMLElement} root
 * @param {{ game: ReturnType<typeof createGame> }} deps
 */
export function mountApp(root, { game }) {
  let errorMsg = '';

  function render() {
    if (game.state === 'lesson') {
      root.innerHTML = renderLesson(game.currentLesson);
    } else if (game.state === 'challenge') {
      root.innerHTML = renderChallenge(
        /** @type {import('../engine/generate.js').Challenge} */ (game.currentChallenge),
        errorMsg
      );
    } else {
      root.innerHTML = renderFeedback(
        /** @type {NonNullable<ReturnType<typeof createGame>['lastResult']>} */ (game.lastResult)
      );
    }
    wire();
    focusPrimary(root);
  }

  function wire() {
    root.querySelectorAll('[data-action]').forEach((el) => {
      el.addEventListener('click', onAction);
    });
    const input = /** @type {HTMLInputElement | null} */ (root.querySelector('.answer-input'));
    if (input) submitOnEnter(input, () => doSubmit(input.value));
  }

  /** @param {Event} event */
  function onAction(event) {
    const el = /** @type {HTMLElement} */ (event.currentTarget);
    const action = el.dataset.action;
    if (action === 'start-practice') {
      errorMsg = '';
      game.startPractice();
      render();
    } else if (action === 'next') {
      errorMsg = '';
      game.next();
      render();
    } else if (action === 'submit') {
      const input = /** @type {HTMLInputElement | null} */ (root.querySelector('.answer-input'));
      doSubmit(input ? input.value : '');
    } else if (action === 'option') {
      doSubmit(el.dataset.label ?? '');
    }
  }

  /** @param {string} text */
  function doSubmit(text) {
    const status = game.submit(text);
    if (status === 'invalid') {
      errorMsg = 'Please enter a valid answer in the format shown.';
      render();
      announce('That answer is not in a valid format.');
      return;
    }
    errorMsg = '';
    render();
    announce(status === 'correct' ? 'Correct!' : 'Incorrect — the correct answer is shown.');
  }

  render();
}

/* c8 ignore start -- browser auto-mount; exercised in the real app, not unit tests */
if (typeof document !== 'undefined') {
  const el = document.getElementById('app');
  if (el) {
    const game = createGame({ rng: makeRng(Date.now() >>> 0) });
    mountApp(/** @type {HTMLElement} */ (el), { game });
  }
}
/* c8 ignore stop */
