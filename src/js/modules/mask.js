import IMask from 'imask';

const elements = document.querySelectorAll('[type="tel"]');
const maskOptions = {
  mask: '+{7} (000) 000-00-00',
  lazy: false
};

const initMask = () => {
  if (elements.length) {
    elements.forEach((el) => {
      const mask = IMask(el, maskOptions);
      // mask.on('complete', () => {
      //   console.log(el.value.length)
      // })
    })
  }
};

export {
  initMask
}
