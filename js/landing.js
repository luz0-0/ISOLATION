document.addEventListener('DOMContentLoaded', function() {
  const countdownTarget = new Date(new Date().getFullYear(), 6, 2, 0, 0, 0);
  const countdownEl = document.getElementById('countdown');
  function updateCountdown() {
    const now = new Date();
    let diff = countdownTarget - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days}d ${hours}:${mins}:${secs}`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

function title_makeArray(n){
this.length = n;
return this.length;
}
title_messages = new title_makeArray(4);
title_messages[0] = "+ ISOLATION HOSPITAL +";
title_messages[1] = "+";
title_messages[2] = "+ +";
title_messages[3] = "+ + +";
title_messages[4] = "+ ISOLATION HOSPITAL +";
title_rptType = 'infinite';
title_rptNbr = 5;
title_speed = 100;
title_delay = 500;
var title_counter=1;
var title_currMsg=0;
var title_tekst ="";
var title_i=0;
var title_TID = null;
function title_pisi(){
title_tekst = title_tekst + title_messages[title_currMsg].substring(title_i, title_i+1);
document.title = title_tekst;
title_sp=title_speed;
title_i++;
if (title_i==title_messages[title_currMsg].length){
title_currMsg++; title_i=0; title_tekst="";title_sp=title_delay;
}
if (title_currMsg == title_messages.length){
if ((title_rptType == 'finite') && (title_counter==title_rptNbr)){
clearTimeout(title_TID);
return;
}
title_counter++;
title_currMsg = 0;
}
title_TID = setTimeout("title_pisi()", title_sp);
}
title_pisi()

document.addEventListener('DOMContentLoaded', function() {
  const nurseBtn = document.getElementById('nurseBtn');
  const nurseTooltip = document.getElementById('nurseTooltip');
  if (nurseBtn) {
    nurseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      nurseBtn.classList.add('show-tooltip');
      setTimeout(() => {
        nurseBtn.classList.remove('show-tooltip');
      }, 1200);
    });
  }
});