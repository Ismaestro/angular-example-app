export const scrollToElement = (element) => {
  if (element) {
    const distance = window.pageYOffset - Math.abs(element.getBoundingClientRect().y);

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 150
    });

    setTimeout(() => {
      element.focus();
      element.blur(); // Trigger error messages
      element.focus();
    }, distance);
  }
};


export default {
  scrollToElement
};
