const checkSupportWebp = () => {
  const webp = new Image();
  webp.onload = webp.onerror = () => {
    if (webp.height == 2) {
      document.documentElement.classList.add('webp');
    }
  };
  webp.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};



export {
  checkSupportWebp
}
