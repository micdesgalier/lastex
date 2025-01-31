import convert from 'color-convert';

export function generatePalette(hex) {
  const hsl = convert.hex.hsl(hex);
  const palette = [];
  
  for (let l = 0; l <= 100; l += 10) {
    palette.push([hsl[0], hsl[1], l]);
  }
  
  return palette;
}

export function hslToCSS(hslArray) {
  return `${hslArray[0]}deg ${hslArray[1]}% ${hslArray[2]}%`;
}