import "./styles.scss";

import localization, {
  addUpdatee as addLocalizationUpdatee,
} from "../localization";

const root = document.createElement(`div`);

let shouldShowHint = true;

root.className = `dropHint`;
root.textContent = localization.dropHint();

const onDragEnter = () => {
  root.classList.remove(`-disappear`);

  if (shouldShowHint) {
    document.body.appendChild(root);
  }
};

const onTransitionEnd = () => {
  document.body.removeChild(root);
  root.removeEventListener(`transitionend`, onTransitionEnd);
};

const hide = () => {
  root.addEventListener(`transitionend`, onTransitionEnd);
  root.classList.add(`-disappear`);
};

document.documentElement!.addEventListener(`dragstart`, () => {
  shouldShowHint = false;
});

document.documentElement!.addEventListener(`dragend`, () => {
  shouldShowHint = true;
});

document.documentElement!.addEventListener(`dragenter`, onDragEnter);

document.documentElement!.addEventListener(`dragleave`, ({ target }) => {
  if (target === root) {
    hide();
  } else {
    onDragEnter();
  }
});

document.documentElement!.addEventListener(`drop`, hide);

root.addEventListener(`click`, () => {
  document.body.removeChild(root);
});

addLocalizationUpdatee(() => {
  root.textContent = localization.dropHint();
});
