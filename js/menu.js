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



$(document).ready(function() {	
		
		/* Hero Case study images */			
		
		$('.link-list li:nth-child(1)').on('mouseenter', function() {
			$('.link-list li.active').removeClass('active');
			$('.img-list li.show').removeClass("show");
			$('.img-list li:nth-child(1)').addClass("show");
			$('.link-list li:nth-child(1)').addClass('active');
		})
		$('.link-list li:nth-child(2)').on('mouseenter', function() {
			$('.link-list li.active').removeClass('active');
			$('.img-list li.show').removeClass("show");
			$('.img-list li:nth-child(2)').addClass("show");
			$('.link-list li:nth-child(2)').addClass('active');
		})
		$('.link-list li:nth-child(3)').on('mouseenter', function() {
			$('.link-list li.active').removeClass('active');
			$('.img-list li.show').removeClass("show");
			$('.img-list li:nth-child(3)').addClass("show");
			$('.link-list li:nth-child(3)').addClass('active');
		})
		$('.link-list li:nth-child(4)').on('mouseenter', function() {
			$('.link-list li.active').removeClass('active');
			$('.img-list li.show').removeClass("show");
			$('.img-list li:nth-child(4)').addClass("show");
			$('.link-list li:nth-child(4)').addClass('active');
		})
		$('.link-list li:nth-child(5)').on('mouseenter', function() {
			$('.link-list li.active').removeClass('active');
			$('.img-list li.show').removeClass("show");
			$('.img-list li:nth-child(5)').addClass("show");
			$('.link-list li:nth-child(5)').addClass('active');
		})
		$('.link-list li:nth-child(1)').trigger('mouseenter')   
		
	});


