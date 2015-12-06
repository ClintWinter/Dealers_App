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

    // email-form validate
    $('#emailForm').validate({
    	rules: {
    		email: {
    			required: true,
    			email: true
    		},
    		email_confirm: {
    			required: true,
    			email: true,
    			equalTo: "#email"
    		},
    		form_account_type: { valueNotEquals: "selection" }
    	},
    	messages: {
    		email: "Please enter a valid email address.",
    		email_confirm: "Please re-enter the email address.",
    		form_account_type: { valueNotEquals: "Please select one of the options." }
    	}
    });

    // email submit
	$( '#emailSubmit' ).on('click', function() {
		if ( $('#emailForm').valid() ) {
			$('#emailForm fieldset').fadeOut(400, function() {
				$( '#registrationForm fieldset:first-child' ).fadeIn();
			});			
		}
	});




	// adding method so leaving the default selected causes an error
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
	  return arg != value;
	}, "Value must not equal arg.");

	// adding method to make state require united states to be selected AND default can't be used
	$.validator.addMethod("doubleConditions", function(value, element, arg){
		if ( $("#us").is(":selected") ) {
			return arg != value;
		} else if ( $("#us").not(":selected") ) {
			return true;
		}
	},"Wrong.");


	$(".state_form").hide();
	// visibility for state_form
	$("#country").on("blur", function() {
		if ( $("#us").is(":selected") ) {
			$(".state_form").show();
		} else if ( $("#us").not(":selected") ) {
			$(".state_form").hide();
		}
	});

	// registration-form validate
	$("#registrationForm").validate({
    	rules: {
    		business: "required",
    		contact: "required",
    		address: "required",
    		city: "required",
    		country: { valueNotEquals: "country_select" },
    		state: { 
    			doubleConditions: "state_select"
    			 },
    		zipcode: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		phone: {
    			required: true,
    			minlength: 10,
    			digits: true
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
    		country: { valueNotEquals: "Please select a country."},
    		state: { doubleConditions: "Select a state when United States is selected." },
    		zipcode: {
    			required: "Please enter your business's zip code.",
    			minlength: "Please enter a 5-digit zip code.",
    			digits: "Please use numbers only."
    		},
    		phone: {
    			required: "Please enter your business's phone number.",
    			minlength: "Please enter a 10-digit phone number(no dashes).",
    			digits: "Please use numbers only."
    		},
    		principal: "Please enter a principal.",
    		title: "Please enter a title.",
    		employees: "Please enter the number of employees.",
    		sales: "Please enter last year's sales.",
    		explanation: "Please enter an explanation for claiming bankruptcy.",
    		url: "Please enter a valid URL. (http://www.example.com)"
    	}
    });

    // Next
	$('#registrationForm .btn-next').on('click', function() {
		var parent_fieldset = $(this).parents('fieldset');
    	if( $('#registrationForm').valid() ) {
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