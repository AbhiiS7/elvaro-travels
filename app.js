const signInTab = document.querySelector('.tabs button:first-child');
const createTab = document.querySelector('.tabs button:last-child');
const submitButton = document.querySelector('.submit');
const loginForm = document.querySelector('#loginForm');
const guestButton = document.querySelector('.guest');
const signInButton = document.querySelector('.sign-in');
const authCard = document.querySelector('.auth-card');
const closeLoginButton = document.querySelector('.close-login');
const menuButton = document.querySelector('.menu-button');
const navigationLinks = document.querySelector('.links');

// The main call-to-action takes travellers to the destination page.
document.querySelector('.primary').href = 'destinations.html';

menuButton.onclick = () => navigationLinks.classList.toggle('open');

function setMode(createAccount) {
  signInTab.classList.toggle('active', !createAccount);
  createTab.classList.toggle('active', createAccount);
  submitButton.textContent = createAccount ? 'Create Account' : 'Sign In';
}

signInTab.onclick = () => setMode(false);
createTab.onclick = () => setMode(true);

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitButton.textContent = 'Welcome to ELVORA';
  setTimeout(() => {
    submitButton.textContent = createTab.classList.contains('active') ? 'Create Account' : 'Sign In';
  }, 1700);
});

guestButton.onclick = () => {
  document.querySelector('.auth-card').innerHTML = `
    <p style="text-align:center;font:16px Playfair Display,serif;margin:18px 0 8px">Welcome, traveller.</p>
    <p style="text-align:center;font-size:9px;color:#c4c6c1">Your Vietnam story begins here.</p>
  `;
};

signInButton.onclick = () => authCard.classList.add('open');
closeLoginButton.onclick = () => authCard.classList.remove('open');

authCard.addEventListener('click', (event) => {
  if (event.target === authCard) authCard.classList.remove('open');
});

// Hero slideshow: the page content stays fixed while only the image changes.
const slideImages = [
  'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=90',
  'hanoi-pagoda.png',
  'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2200&q=90'
];

slideImages.forEach((source) => {
  const image = new Image();
  image.src = source;
});

const slides = [...document.querySelectorAll('.hero-slide')];
const placeButtons = [...document.querySelectorAll('.places button')];
const placeItems = [...document.querySelectorAll('.places li')];
let currentSlide = 0;
let slideshowTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
  placeItems.forEach((item, itemIndex) => item.classList.toggle('current', itemIndex === currentSlide));
}

function startSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
}

placeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showSlide(index);
    startSlideshow();
  });
});

startSlideshow();

const cinematicStyles = document.createElement('style');
cinematicStyles.textContent = `.hero{background:#060b0c!important}.backdrop{background:linear-gradient(90deg,#030708db,#07101295 48%,#09060676)!important}.hero-copy{top:23%;max-width:650px}.hero h1{font-size:clamp(48px,6vw,82px);line-height:.92;text-shadow:0 3px 22px #000}.hero h1 em{color:#b82232;font-style:normal}.kicker{color:#e9be69;letter-spacing:5px}.subtitle{text-shadow:0 2px 8px #000}.primary{background:linear-gradient(100deg,#8f0d1c,#c32630);border:1px solid #e0b663;color:#fff}.brand{font-size:22px}.brand:after{content:'龍';margin-left:7px;color:#b91d2a;font-size:19px}.hero-slide{filter:saturate(.8) contrast(1.13) brightness(.72)}.hero-slide.active{animation:slow-zoom 6s ease-out both}@keyframes slow-zoom{from{transform:scale(1.05)}to{transform:scale(1)}}.hero-copy:after{content:'30+ Destinations · 10K+ Happy Travelers · Authentic Local Experiences';display:block;margin-top:38px;color:#eee2c9;font-size:11px;letter-spacing:1px}@media(max-width:600px){.hero-copy{top:19%}.hero-copy:after{font-size:9px;margin-top:25px}.hero h1{font-size:47px}}`;
document.head.append(cinematicStyles);

// Keep the Home navbar on the same visual scale as Destinations.
const sharedNavStyles = document.createElement('style');
sharedNavStyles.textContent = `
  .hero > nav { height:68px; padding:0 7%; gap:0; }
  .hero > nav .brand { font:500 24px 'Playfair Display', Georgia, serif; letter-spacing:2px; }
  .hero > nav .brand small { margin-top:4px; font:6px 'DM Sans', sans-serif; letter-spacing:1.4px; }
  .hero > nav .links { margin-left:18px; gap:34px; }
  .hero > nav .links a { padding:25px 0 12px; border-bottom:2px solid transparent; font:14px 'Playfair Display', Georgia, serif; }
  .hero > nav .links .selected { border-bottom-color:#dcb66a; color:#dcb66a; }
  .hero > nav .links .selected:after { display:none; }
  .hero > nav .nav-icons { margin-left:auto; }
  .hero > nav .nav-icons .sign-in { padding:9px 23px; border-color:#f6e7cb; border-radius:22px; font-size:11px; }
  @media (max-width:760px) { .hero > nav .links { margin-left:auto; gap:15px; } .hero > nav .links a { font-size:12px; } }
`;
document.head.append(sharedNavStyles);
