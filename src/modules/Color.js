import convert from 'color-convert';

export class Color {
  #hsl;
  #hex;
  #element;

  constructor(hsl) {
    this.#hsl = hsl;
    this.#hex = `#${convert.hsl.hex(hsl)}`;
    this.#generateElement();
  }

  #generateElement() {
    const div = document.createElement('div');
    div.className = 'color';
    div.style.backgroundColor = this.#hex;
    div.dataset.color = this.#hex;

    const p = document.createElement('p');
    p.textContent = this.#hex;
    p.style.color = this.#hsl[2] < 60 ? '#ffffff' : '#000000';

    div.appendChild(p);
    this.#element = div;
  }

  display(parent) {
    parent.appendChild(this.#element);
  }
}