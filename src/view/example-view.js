import { createTemplate } from ''; // путь укажу, когда в tempates сделаю шаблоны для страницы index.html
import { createElement } from '../render.js';

export default class EventListView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
