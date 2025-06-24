$(document).ready(function() {
    $('.news-item p').hide();
    $('.news-item h2').css('cursor', 'pointer').click(function() {
        $(this).next('p').slideToggle();
    });
});

function openNewsletterPopup() {
  document.getElementById('newsletter-popup').style.display = 'block';
}
function closeNewsletterPopup() {
  document.getElementById('newsletter-popup').style.display = 'none';
}
// Show popup after 2 seconds
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(openNewsletterPopup, 2000);
});