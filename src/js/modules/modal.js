const openModalEl = document.querySelector('.__js_open-modal');
const modalEl = document.querySelector('.modal');

const activeClass = 'modal--shown'

const getScrollbarWidth = () => {
  const block = document.createElement('div');
  block.style.width = '50px';
  block.style.height = '50px';
  block.style.overflow = 'auto';

  const innerBlock = document.createElement('div');
  innerBlock.style.height = '200px';

  block.appendChild(innerBlock);
  document.body.appendChild(block);

  const width = block.offsetWidth - block.clientWidth;

  block.remove();
  return width;
};

const createOverlay = (cb) => {
  const overlayEl = document.createElement('div');
  overlayEl.className = 'overlay';
  overlayEl.onclick = () => {
    cb();
  };
  return overlayEl;
};

const initModal = () => {
  if (openModalEl !== null && modalEl !== null) {
    const close = () => {
      const overlayEl = document.querySelector('.overlay');

       modalEl.classList.remove(activeClass);

      modalEl.ontransitionend = () => {
        modalEl.ontransitionend = null;

        if (overlayEl !== null) {
          overlayEl.remove();
          document.body.style.overflow = '';
          document.body.style.marginRight = '';
        }
      }
    };

    const open = () => {
      const overlayEl = createOverlay(close);
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${getScrollbarWidth()}px`;
      document.body.appendChild(overlayEl);

       modalEl.classList.add(activeClass);
    };


    openModalEl.onclick = (e) => {
      e.preventDefault();
      e.target.blur();
      open();
    };

    modalEl.querySelector('.modal__close').onclick = (e) => {
      e.preventDefault();
      close();
    };

  }
};

export {
  initModal
}
