// Seleccione los elementos en la página: lienzo, botón shake
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 50;
// Configura nuestro lienzo para dibujar.
// crea una variable llamada altura y ancho a partir de las mismas propiedades en nuestro lienzo.
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
// crear puntos de partida aleatorios x e y en el lienzo

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // empezar el dibujo
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// escribir una función de dibujo

function draw({ key }) {
  // incrementar el tono
  hue += 1;
  console.log(hue);
  //ctx.strokeStyle = `hsl(${Math.random() * 360, 100%, 50%)`;
  console.log(key);
  // iniciar el camino
  ctx.beginPath();
  ctx.moveTo(x, y);
  //Mueve nuestros
  // valores xey dependiendo de lo que hizo el usuario
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// escribir un controlador para las claves
function handleKey(e) {
  if (e.key.includes('Arrow') || ['a','s','d','w']) {
    e.preventDefault();
    draw({ key: e.key });
  }
}
// borrar función /shke
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener('animationend',function() {
      console.log('Done the shake!');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// escuche las teclas de flecha
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);