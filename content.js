const getBellsFromTile = el => {
  const possible = el.querySelectorAll('.flex p');
  const bells = Array.from(possible).find(p => {
    return p.innerText.endsWith('Bells');
  });
  if (bells == null) {
    return 0;
  }
  const text = bells.innerText;
  return parseInt(text.substr(0, text.length - 6), 10);
};
const getTiles = () => {
  return Array.from(document.querySelectorAll('[data-turnip-code]'));
};
const onClick = evt => {
  evt.preventDefault();
  const tiles = getTiles();
  const sorted = Array.prototype.slice
    .call(tiles)
    .sort((a, b) => getBellsFromTile(b) - getBellsFromTile(a));
  const p = tiles[0].parentElement;
  tiles.forEach(t => t.parentElement.removeChild(t));
  sorted.forEach(c => p.appendChild(c));
};
const button = document.createElement('button');
button.addEventListener('click', onClick);
button.style.position = 'fixed';
button.value = 'Sort';
button.type = 'button';
button.style.top = '64px';
button.style.right = '32px';
button.innerText = 'Sort by Bells';
button.className =
  'flex justify-center items-center absolute text-sm p-2 rounded-lg bg-primary hover:bg-primary-600 text-background select-none cursor-pointer shadow-lg';
window.setInterval(() => {
  if (getTiles().length > 1) {
    if (button.parentElement == null) {
      document.body.appendChild(button);
    }
  } else {
    button.parentElement && button.parentElement.removeChild(button);
  }
}, 1000);
