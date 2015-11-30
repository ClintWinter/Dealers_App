$(document).ready(function() {

	// background
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });

        // email-form
    $('.email-form fieldset').fadeIn('slow');

    $('#email').focus();

        // validate email
    $('.email-form').validate();


    // Email submission
    $('.email-form').on('submit', function(e) {

    	e.preventDefault();
    	$(this).fadeOut(400, function() {

    		$('.registration-form fieldset:first-child').fadeIn(400);

    	});

    });

    //
    //
    //
    //
    //
    // NEED NEXT BUTTON TO VALIDATE BEFORE GOING TO PAGE 2
    // NEED PREVIOUS BUTTON TO KEEP ERROR MESSAGES FROM PREVIOUS PAGE
    //
    //
    //
    //
    //
    //

    // registration-form validate
	$("#registrationForm").validate({
		success: function(label) {
    label.addClass("valid").text("Ok!")
		},
    	rules: {
    		business: "required",
    		contact: "required",
    		address: "required",
    		city: "required",
    		zipcode: {
    			required: true,
    			minlength: 5
    		},
    		phone: {
    			required: true,
    			minlength: 10
    		},
    		principal: "required",
    		title: "required",
    		employees: "required",
    		sales: "required",
    		explanation: {
    			required: "#bankruptcy-yes:selected"
    		},
    		url: {
    			required: "#website-yes:selected"
    		}
    	},
    	messages: {
    		business: "Please enter the name of your business.",
    		contact: "Please enter your contact name.",
    		address: "Please enter your business's address.",
    		city: "Please enter your business's city.",
    		zipcode: {
    			required: "Please enter your business's zip code.",
    			minlength: "Please enter a 5-digit zip code."
    		},
    		phone: {
    			required: "Please enter your business's phone number.",
    			minlength: "Please enter a 10-digit phone number(no dashes)."
    		},
    		principal: "Please enter a principal.",
    		title: "Please enter a title.",
    		employees: "Please enter the number of employees.",
    		sales: "Please enter last year's sales.",
    		explanation: "Please enter an explanation for claiming bankruptcy.",
    		url: "Please enter a valid URL. (http://www.example.com)"
    	}
    });

	/*
	$('.form-control').on('blur', function() {
		if ($(this).val() == "") {
			$(this).addClass("error");
			$(this).attr("aria-invalid", true);
		}
	});
	*/


    // Next
	$('#registrationForm .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	
    	parent_fieldset.find('.form-control:not(.not-required)').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
                $('.error').html("At least one of the required fields is not filled out!");
            } else {
    			$(this).removeClass('input-error');
                $('.error').html("");
    		}
    	});
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    	
    });
	

    // previous step
    
    $('.registration-form .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });

    




});