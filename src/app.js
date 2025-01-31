import { generatePalette } from './utils.js';
import { Color } from './modules/Color.js';
import Notyf from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();
const main = document.querySelector('main');
const header = document.querySelector('header');
const form = document.querySelector('form');
const input = document.querySelector('input');

function updateGradient(palette) {
  const colors = palette.map(color => `#${convert.hsl.hex(color)}`);
  document.body.style.background = `linear-gradient(-45deg, ${colors.join(', ')})`;
  document.body.style.backgroundSize = '400% 400%';
}

function updateShadowColor(hsl) {
  document.documentElement.style.setProperty('--shadow-color', hslToCSS(hsl));
}

function clearColors() {
  main.innerHTML = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const hex = input.value.trim();

  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    notyf.error(`${hex} is not a valid Hexadecimal color`);
    return;
  }

  try {
    const palette = generatePalette(hex);
    clearColors();
    header.classList.add('minimized');
    
    palette.forEach(hsl => {
      const color = new Color(hsl);
      color.display(main);
    });

    updateGradient(palette);
    updateShadowColor(palette[Math.floor(palette.length/2)]);
    
  } catch (error) {
    notyf.error(error.message);
  }
});

main.addEventListener('click', (e) => {
  if (e.target.closest('.color')) {
    const color = e.target.closest('.color').dataset.color;
    navigator.clipboard.writeText(color)
      .then(() => notyf.success(`Copied ${color} to clipboard`))
      .catch(() => notyf.error('Failed to copy color'));
  }
});