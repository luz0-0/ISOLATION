$(document).ready(function() {
    $('.news-item p').hide();
    $('.news-item h2').css('cursor', 'pointer').click(function() {
        $(this).next('p').slideToggle();
    });
});

function abrirPopup() {
  document.getElementById('newsletter-popup').style.display = 'block';
}
function cerrarPopup() {
  document.getElementById('newsletter-popup').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', function() {
  setTimeout(abrirPopup, 2000);
});

const linksAleatorios = [
  'https://www.kailashdeepakhospital.com/',
  'https://www.karolinska.se/SplitPage',
  'https://www.sgh.com.sg/',
  'https://www.auh.dk/',
  'https://www.samsunghospital.com/home/main/index.do',
  'https://www.uzleuven.be/nl',
  'https://www.hus.fi/en',
  'https://www.comunidad.madrid/hospital/lapaz/'


];

function abrirVentanaDados() {
  const linkAleatorio = linksAleatorios[Math.floor(Math.random() * linksAleatorios.length)];
  
  const left = (screen.width - 800) / 2;
  const top = (screen.height - 800) / 2;
  
  window.open(
    linkAleatorio,
    'ventanaDados',
    `width=800,height=800,left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
}
