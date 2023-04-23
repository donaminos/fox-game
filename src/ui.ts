import { buttonPositions, icons } from "./constants";

export const handleButtonsClick = () => {
  const buttons = document.querySelector(".buttons");

  buttons?.parentNode?.addEventListener("click", (event) => {
    const { classList } = event.target;

    if (classList.contains(buttonPositions.LEFT)) {
      setActiveIcon(buttonPositions.LEFT);
    }

    if (classList.contains(buttonPositions.RIGHT)) {
      setActiveIcon(buttonPositions.RIGHT);
    }

    if (classList.contains(buttonPositions.CENTER)) {
      setActiveIcon(buttonPositions.CENTER);
    }
  });
};

type Icon = {
  name: string;
  index: number;
};

const getCurrentIndex = (currentIcon: Element | null): number =>
  Object.values(icons).reduce((acc, icon) => {
    if (currentIcon?.classList.contains(icon.name)) {
      return icon.index;
    }
    return acc;
  }, 0);

const getNextIndex = (currentIndex: number, buttonClicked: string): number => {
  let nextIndex = 0;
  const maxIndex = 2;
  const MAX_INDEX_INC = maxIndex + 1;

  switch (buttonClicked) {
    case buttonPositions.LEFT:
      nextIndex = (currentIndex - 1 + MAX_INDEX_INC) % MAX_INDEX_INC;
      break;
    case buttonPositions.RIGHT:
      nextIndex = (currentIndex + 1) % MAX_INDEX_INC;
      break;
    default:
      return currentIndex;
  }

  return nextIndex;
};

const setActiveIcon = (buttonClicked: string): void => {
  const currentIcon = document.querySelector(".icon[data-active]");
  const iconsElm = document.querySelectorAll(".icon");

  const currentIndex = getCurrentIndex(currentIcon);

  delete currentIcon?.dataset.active;

  const nextIndex = getNextIndex(currentIndex, buttonClicked);

  const nextIcon = Object.values(icons).find(
    ({ index }) => index === nextIndex
  );

  iconsElm.forEach((elm) => {
    if (elm.classList.contains(nextIcon.name)) {
      elm.setAttribute("data-active", "");
    }
  });
};
