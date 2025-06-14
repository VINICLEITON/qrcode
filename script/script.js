function criarConfete() {
  const confete = document.createElement('div');
  confete.classList.add('confete');

  // Cores variadas
  const cores = ['#f39c12', '#e74c3c', '#9b59b6', '#2ecc71', '#3498db'];
  confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];

  // Posição aleatória no topo
  confete.style.left = Math.random() * window.innerWidth + 'px';

  // Tamanho aleatório
  const tamanho = Math.random() * 8 + 5;
  confete.style.width = tamanho + 'px';
  confete.style.height = tamanho + 'px';

  // Animação com duração aleatória
  confete.style.animationDuration = (Math.random() * 3 + 2) + 's';

  document.getElementById('confetes-container').appendChild(confete);

  // Remover o confete depois que sair da tela
  setTimeout(() => {
    confete.remove();
  }, 5000);
}
const calendarDates = document.getElementById("calendar-dates");

// Dados de junho de 2024
const year = 2024;
const month = 5; // Junho (0-based)
const firstDay = new Date(year, month, 1).getDay();
const totalDays = new Date(year, month + 1, 0).getDate();
const prevMonthDays = new Date(year, month, 0).getDate();

// Preenche dias do mês anterior
for (let i = firstDay - 1; i >= 0; i--) {
  const date = document.createElement("div");
  date.className = "date other-month";
  date.textContent = prevMonthDays - i;
  calendarDates.appendChild(date);
}

// Preenche dias de junho
for (let i = 1; i <= totalDays; i++) {
  const date = document.createElement("div");
  date.className = "date";
  date.textContent = i;
  if (i === 12) {
    date.classList.add("today"); // Marca o dia 12 em vermelho
  }
  calendarDates.appendChild(date);
}

// Preenche dias do próximo mês para completar a grade 
const totalCells = firstDay + totalDays;
const nextDays = 7 - (totalCells % 7);
if (nextDays < 7) {
  for (let i = 1; i <= nextDays; i++) {
    const date = document.createElement("div");
    date.className = "date other-month";
    date.textContent = i;
    calendarDates.appendChild(date);
  }
}

// Criar confetes a cada 200ms
setInterval(criarConfete, 200);

// Índice atual do slide
let slideIndex = 0;
// Coletando elementos
let slides = document.getElementsByClassName("slides");
let dots = document.getElementsByClassName("dot");

// Exibe o slide atual e atualiza os dots
function showSlide(index) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[index].style.display = "block";
  dots[index].classList.add("active");
}

// Função para avançar automaticamente os slides
function carrossel() {
  slideIndex++;
  if (slideIndex >= slides.length) { slideIndex = 0; }
  showSlide(slideIndex);
  setTimeout(carrossel, 3000); // muda a cada 3s
}

// Função para selecionar um slide manualmente
function moveToSlide(index) {
  slideIndex = index;
  showSlide(slideIndex);
}

// Inicializa carrossel automático
showSlide(slideIndex);
setTimeout(carrossel, 3000);

// Variáveis para capturar o toque
let startX = 0;
let endX = 0;
const carrosselEl = document.querySelector(".carrossel");

// Detecta início do toque
carrosselEl.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
}, false);

// Detecta fim do toque
carrosselEl.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}, false);

// Função para identificar swipe e mover slide
function handleSwipe() {
  if (startX - endX > 50) {
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    showSlide(slideIndex);
  } else if (endX - startX > 50) {
    slideIndex--;
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    showSlide(slideIndex);
  }
}

// Variáveis de curtidas
let likeIcon = document.getElementById("likeIcon");
let quantLike = document.getElementById("quant_like");
let curtidasAtuais = parseInt(quantLike.innerText.replace('.', ''));

// Atualiza as curtidas continuamente
function aumentarCurtidas() {
  curtidasAtuais++;
  quantLike.innerText = curtidasAtuais.toLocaleString('pt-BR');
}

// Atualiza curtidas a cada 50ms


// Animação de pulo ao clicar no ícone de coração
likeIcon.addEventListener("click", function () {
  likeIcon.style.animation = "pulse 0.3s";
  setTimeout(() => {
    likeIcon.style.animation = "";
  }, 300);
});

const botoesCurtir = document.querySelectorAll('.curtir-btn');

botoesCurtir.forEach(botao => {
  botao.addEventListener('click', () => {
    const contador = botao.querySelector('.contador');
    contador.textContent = parseInt(contador.textContent) + 1;
  });
});



const carrosselLuiza = document.getElementById("carrosselLuiza");
const totalImagensLuiza = 7;
const larguraImagemLuizaVW = 50; // Define que cada imagem terá 50vw de largura
let posicaoLuiza = 0;

function avancarLuiza() {
  posicaoLuiza += 3;
  if (posicaoLuiza >= totalImagensLuiza) {
    posicaoLuiza = 0;
  }
  atualizarCarrosselLuiza();
}

function voltarLuiza() {
  posicaoLuiza -= 3;
  if (posicaoLuiza < 0) {
    posicaoLuiza = totalImagensLuiza - (totalImagensLuiza % 3 || 3);
  }
  atualizarCarrosselLuiza();
}

function atualizarCarrosselLuiza() {
  // Utiliza 'vw' para que o carrossel seja responsivo à largura da viewport
  carrosselLuiza.style.transform = `translateX(-${posicaoLuiza * larguraImagemLuizaVW}vw)`;
}

const audios = document.querySelectorAll('.audio');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

audios.forEach(audio => {
  observer.observe(audio);
});


// Loop automático
setInterval(avancarLuiza, 3000);

function atualizarContagem() {
  const agora = new Date();
  const anoAlvo = agora.getFullYear() + 1; // sempre próximo ano
  const dataAlvo = new Date(anoAlvo, 5, 1, 0, 0, 0); // Junho é mês 5 (começa do zero)

  const tempoRestante = dataAlvo - agora;

  const segundos = Math.floor((tempoRestante / 1000) % 60);
  const minutos = Math.floor((tempoRestante / 1000 / 60) % 60);
  const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));

  document.getElementById('dias').innerHTML = dias + "<span>Dias</span>";
  document.getElementById('horas').innerHTML = horas + "<span>Horas</span>";
  document.getElementById('minutos').innerHTML = minutos + "<span>Minutos</span>";
  document.getElementById('segundos').innerHTML = segundos + "<span>Segundos</span>";
}

function atualizarContagem() {
  const dataInicial = new Date(2024, 5, 12, 0, 0, 0); // 12/06/2024 (mês 5 = junho)
  const agora = new Date();

  let tempoPassado = agora - dataInicial;
  if (tempoPassado < 0) tempoPassado = 0;

  const segundosTotal = Math.floor(tempoPassado / 1000);

  const anos = Math.floor(segundosTotal / (365.25 * 24 * 60 * 60));
  const segundosRestantesAno = segundosTotal % Math.floor(365.25 * 24 * 60 * 60);

  const dias = Math.floor(segundosRestantesAno / (24 * 60 * 60));
  const horas = Math.floor((segundosRestantesAno % (24 * 60 * 60)) / (60 * 60));
  const minutos = Math.floor((segundosRestantesAno % (60 * 60)) / 60);
  const segundos = segundosRestantesAno % 60;

  document.getElementById('anos').innerHTML = anos + "<span>Anos</span>";
  document.getElementById('dias').innerHTML = dias + "<span>Dias</span>";
  document.getElementById('horas').innerHTML = horas + "<span>Horas</span>";
  document.getElementById('minutos').innerHTML = minutos + "<span>Minutos</span>";
  document.getElementById('segundos').innerHTML = segundos + "<span>Segundos</span>";
}

setInterval(atualizarContagem, 1000);
atualizarContagem();
