jQuery(document).ready(function ($) {
	$("#edit-settings--3 .fieldset-wrapper").hide();
	$("#edit-settings--3 .fieldset-legend").click(function(){
		$("#edit-settings--3 .fieldset-wrapper").slideToggle("slow");
		$(this).toggleClass("active");
		$('#edit-settings--3 .plus').toggleClass('minus');
	});

	$("#edit-contactmap .fieldset-wrapper").hide();
	$("#edit-contactmap .fieldset-legend").click(function(){
		$("#edit-contactmap .fieldset-wrapper").slideToggle("slow");
		$(this).toggleClass("active");
		$('#edit-contactmap .plus').toggleClass('minus');
	});
	
	$("#edit-seo .fieldset-wrapper").hide();
	$("#edit-seo .fieldset-legend").click(function(){
		$("#edit-seo .fieldset-wrapper").slideToggle("slow");
		$(this).toggleClass("active");
		$('#edit-seo .plus').toggleClass('minus');
	});
	
	$("#edit-css .fieldset-wrapper").hide();
	$("#edit-css .fieldset-legend").click(function(){
		$("#edit-css .fieldset-wrapper").slideToggle("slow");
		$(this).toggleClass("active");
		$('#edit-css .plus').toggleClass('minus');
	});
  
});