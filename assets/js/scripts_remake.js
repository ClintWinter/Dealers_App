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
				if ( $("#credit_card").is(":selected") ) {
					$( "#creditCardForm fieldset:first-child" ).fadeIn();
				} else if ( $("#cod").is(":selected") ) {
					$( "#codForm fieldset:first-child" ).fadeIn();
				} else if ( $("#net_15").is(":selected") ) {
					$("#netForm fieldset:first-child").fadeIn();
				}
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

	// creditCardForm validate
	$("#creditCardForm").validate({
    	rules: {
    		business: "required",
    		contact: "required",
    		address: "required",
    		city: "required",
    		country: { valueNotEquals: "country_select" },
    		state: { doubleConditions: "state_select" },
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
    		employees: {
    			required: true,
    			digits: true
    		},
    		sales: {
    			required: true,
    			digits: true
    		},
    		explanation: {
    			required: "#bankruptcy-yes:selected"
    		},
    		url: {
    			required: "#website-yes:selected"
    		},
    		cc_BusinessType: { valueNotEquals: "default" }
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
    		employees: {
    			required: "Please enter the number of employees.",
    			digits: "Please use numbers only."
    		},
    		sales: {
    			required: "Please enter last year's sales.",
    			digits: "Please use numbers only."
    		},
    		explanation: "Please enter an explanation for claiming bankruptcy.",
    		url: "Please enter a valid URL. (http://www.example.com)",
    		cc_BusinessType: { valueNotEquals: "Please select an option." }
    	}
    });

    // Next
	$('#creditCardForm .btn-next').on('click', function() {
		var parent_fieldset = $(this).parents('fieldset');
    	if( $('#creditCardForm').valid() ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    });
	
    // previous step
    $('.creditCardForm .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });







    // adding method to make state require united states to be selected AND default can't be used
	$.validator.addMethod("codDblConditions", function(value, element, arg){
		if ( $("#cod_us").is(":selected") ) {
			return arg != value;
		} else if ( $("#cod_us").not(":selected") ) {
			return true;
		}
	},"Wrong.");


	$(".cod_state_form").hide();
	// visibility for cod_state_form
	$("#cod_country").on("blur", function() {
		if ( $("#cod_us").is(":selected") ) {
			$(".cod_state_form").show();
		} else if ( $("#cod_us").not(":selected") ) {
			$(".cod_state_form").hide();
		}
	});

	// codForm validate
	$("#codForm").validate({
    	rules: {
    		cod_business: "required",
    		cod_contact: "required",
    		cod_address: "required",
    		cod_city: "required",
    		cod_country: { valueNotEquals: "cod_country_select" },
    		cod_state: { codDblConditions: "cod_state_select" },
    		cod_zipcode: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		cod_phone: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},
    		cod_principal: "required",
    		cod_title: "required",
    		cod_employees: {
    			required: true,
    			digits: true
    		},
    		cod_sales: {
    			required: true,
    			digits: true
    		},
    		cod_explanation: {
    			required: "#cod_bankruptcy-yes:selected"
    		},
    		cod_url: {
    			required: "#cod_website-yes:selected"
    		},
    		cod_BusinessType: { valueNotEquals: "default" },
    		cod_account_type: "required",
    		cod_name: "required",
    		cod_address2: "required",
    		cod_city2: "required",
    		cod_state2: { valueNotEquals: "cod_state_select2" },
    		cod_zipcode2: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		cod_phone2: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},
    		cod_acct_num: {
    			required: true,
    			digits: true
    		}
    	},
    	messages: {
    		cod_business: "Please enter the name of your business.",
    		cod_contact: "Please enter your contact name.",
    		cod_address: "Please enter your business's address.",
    		cod_city: "Please enter your business's city.",
    		cod_country: { valueNotEquals: "Please select a country."},
    		cod_state: { codDblConditions: "Select a state when United States is selected." },
    		cod_zipcode: {
    			required: "Please enter your business's zip code.",
    			minlength: "Please enter a 5-digit zip code.",
    			digits: "Please use numbers only."
    		},
    		cod_phone: {
    			required: "Please enter your business's phone number.",
    			minlength: "Please enter a 10-digit phone number(no dashes).",
    			digits: "Please use numbers only."
    		},
    		cod_principal: "Please enter a principal.",
    		cod_title: "Please enter a title.",
    		cod_employees: {
    			required: "Please enter the number of employees.",
    			digits: "Please use numbers only."
    		},
    		cod_sales: {
    			required: "Please enter last year's sales.",
    			digits: "Please use numbers only."
    		},
    		cod_explanation: "Please enter an explanation for claiming bankruptcy.",
    		cod_url: "Please enter a valid URL. (http://www.example.com)",
    		cod_BusinessType: { valueNotEquals: "Please select an option." },
    		cod_account_type: "Please select an account type.",
    		cod_name: "Plase enter your name.",
    		cod_address2: "Please enter your address.",
    		cod_city2: "Please enter your city",
    		cod_state2: { valueNotEquals: "Please select a state." },
    		cod_zipcode2: {
    			required: "Please enter your zip code.",
    			minlength: "Please enter a 5-digit number.",
    			digits: "Please use numbers only."
    		},
    		cod_phone2: {
    			required: "Please enter your phone number.",
    			minlength: "Please enter a 10-digit phone number(no dashes).",
    			digits: "Please use numbers only."
    		},
    		cod_acct_num: {
    			required: "Please enter an account number",
    			digits: "Please use numbers only"
    		}
    	}
    });

    // Next
	$('#codForm .btn-next').on('click', function() {
		var parent_fieldset = $(this).parents('fieldset');
    	if( $('#codForm').valid() ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    });
	
    // previous step
    $('.codForm .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });









    // adding method to make state require united states to be selected AND default can't be used
	$.validator.addMethod("netDblConditions", function(value, element, arg){
		if ( $("#net_us").is(":selected") ) {
			return arg != value;
		} else if ( $("#net_us").not(":selected") ) {
			return true;
		}
	},"Wrong.");


	$(".net_state_form").hide();
	// visibility for cod_state_form
	$("#net_country").on("blur", function() {
		if ( $("#net_us").is(":selected") ) {
			$(".net_state_form").show();
		} else if ( $("#net_us").not(":selected") ) {
			$(".net_state_form").hide();
		}
	});

	// codForm validate
	$("#netForm").validate({
    	rules: {

    		// step 2
    		net_business: "required",
    		net_contact: "required",
    		net_address: "required",
    		net_city: "required",
    		net_country: { valueNotEquals: "net_country_select" },
    		net_state: { netDblConditions: "net_state_select" },
    		net_zipcode: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		net_phone: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},

    		// step 3
    		net_principal: "required",
    		net_title: "required",
    		net_employees: {
    			required: true,
    			digits: true
    		},
    		net_sales: {
    			required: true,
    			digits: true
    		},
    		net_explanation: {
    			required: "#net_bankruptcy-yes:selected"
    		},
    		net_url: {
    			required: "#net_website-yes:selected"
    		},
    		net_BusinessType: { valueNotEquals: "default" },

    		// step 4
    		net_ref1: "required",
    		net_address_ref1: "required",
    		net_city_ref1: "required",
    		net_state_ref1: { valueNotEquals: "net_state_select_ref1" },
    		net_zipcode_ref1: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		net_phone_ref1: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},
    		net_acct_ref1: {
    			required: true,
    			digits: true
    		},
    		net_ref2: "required",
    		net_address_ref2: "required",
    		net_city_ref2: "required",
    		net_state_ref2: { valueNotEquals: "net_state_select_ref2" },
    		net_zipcode_ref2: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		net_phone_ref2: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},
    		net_acct_ref2: {
    			required: true,
    			digits: true
    		},

    		//step 5
    		net_account_type3: "required",
    		net_name3: "required",
    		net_address3: "required",
    		net_city3: "required",
    		net_state3: { valueNotEquals: "net_state_select3" },
    		net_zipcode3: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		net_phone3: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},
    		net_acct_num3: {
    			required: true,
    			digits: true
    		},

    		net_account_type4: "required",
    		net_name4: "required",
    		net_address4: "required",
    		net_city4: "required",
    		net_state4: { valueNotEquals: "net_state_select4" },
    		net_zipcode4: {
    			required: true,
    			minlength: 5,
    			digits: true
    		},
    		net_phone4: {
    			required: true,
    			minlength: 10,
    			digits: true
    		},
    		net_acct_num4: {
    			required: true,
    			digits: true
    		}
    	},
    	messages: {

    		// step 2
    		net_business: "Please enter the name of your business.",
    		net_contact: "Please enter your contact name.",
    		net_address: "Please enter your business's address.",
    		net_city: "Please enter your business's city.",
    		net_country: { valueNotEquals: "Please select a country."},
    		net_state: { netDblConditions: "Select a state when United States is selected." },
    		net_zipcode: {
    			required: "Please enter your business's zip code.",
    			minlength: "Please enter a 5-digit zip code.",
    			digits: "Please use numbers only."
    		},
    		net_phone: {
    			required: "Please enter your business's phone number.",
    			minlength: "Please enter a 10-digit phone number(no dashes).",
    			digits: "Please use numbers only."
    		},

    		// step 3
    		net_principal: "Please enter a principal.",
    		net_title: "Please enter a title.",
    		net_employees: {
    			required: "Please enter the number of employees.",
    			digits: "Please use numbers only."
    		},
    		net_sales: {
    			required: "Please enter last year's sales.",
    			digits: "Please use numbers only."
    		},
    		net_explanation: "Please enter an explanation for claiming bankruptcy.",
    		net_url: "Please enter a valid URL. (http://www.example.com)",
    		net_BusinessType: { valueNotEquals: "Please select an option." },

    		// step 4
    		net_ref1: "Please enter a reference.",
    		net_address_ref1: "Please enter reference 1's address.",
    		net_city_ref1: "Please enter reference 1's city.",
    		net_state_ref1: { valueNotEquals: "Please select reference 1's state." },
    		net_zipcode_ref1: {
    			required: "Please enter reference 1's zip code.",
    			minlength: "Must be 5-digits in length.",
    			digits: "Please use numbers only."
    		},
    		net_phone_ref1: {
    			required: "Please enter reference 1's phone number.",
    			minlength: "Must be 10-digits in length.",
    			digits: "Please use numbers only."
    		},
    		net_acct_ref1: {
    			required: "Please enter reference 1's account number.",
    			digits: "Please use numbers only."
    		},
    		net_ref2: "Please enter a reference.",
    		net_address_ref2: "Please enter reference 2's address.",
    		net_city_ref2: "Please enter reference 2's city.",
    		net_state_ref2: { valueNotEquals: "Please select reference 2's state." },
    		net_zipcode_ref2: {
    			required: "Please enter reference 2's zip code.",
    			minlength: "Must be 5-digits in length.",
    			digits: "Please use numbers only."
    		},
    		net_phone_ref2: {
    			required: "Please enter reference 2's phone number.",
    			minlength: "Must be 10-digits in length.",
    			digits: "Please use numbers only."
    		},
    		net_acct_ref2: {
    			required: "Please enter reference 2's account number.",
    			digits: "Please use numbers only."
    		},

    		// step 5
    		net_acct_type3: "Please choose an account type.",
    		net_name3: "Please enter a name.",
    		net_address3: "Please enter an address.",
    		net_city3: "Please enter a city.",
    		net_state3: { valueNotEquals: "Please select a state." },
    		net_zipcode3: {
    			required: "Please enter a zip code.",
    			minlength: "Please enter a 5-digit number.",
    			digits: "Please use numbers only."
    		},
    		net_phone3: {
    			required: "Please enter a phone number.",
    			minlength: "Please enter a 10-digit number.",
    			digits: "Please use numbers only."
    		},
    		net_acct_num3: {
    			required: "Please enter an account number.",
    			digits: "Please use numbers only."
    		},

    		net_acct_type4: "Please choose an account type.",
    		net_name4: "Please enter a name.",
    		net_address4: "Please enter an address.",
    		net_city4: "Please enter a city.",
    		net_state4: { valueNotEquals: "Please select a state." },
    		net_zipcode4: {
    			required: "Please enter a zip code.",
    			minlength: "Please enter a 5-digit number.",
    			digits: "Please use numbers only."
    		},
    		net_phone4: {
    			required: "Please enter a phone number.",
    			minlength: "Please enter a 10-digit number.",
    			digits: "Please use numbers only."
    		},
    		net_acct_num4: {
    			required: "Please enter an account number.",
    			digits: "Please use numbers only."
    		}
    	}
    });

    // Next
	$('#netForm .btn-next').on('click', function() {
		var parent_fieldset = $(this).parents('fieldset');
    	if( $('#netForm').valid() ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    });
	
    // previous step
    $('.netForm .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });






    /*

    [check] Needs to stay as 2 separate forms.
    
    [check] jQuery validators need to go inside submit buttons/next buttons so that it doesn't go to the next page regardless:
    v
    |	if ( $('#emailForm').validate() ) {
	|		next page button works
    v	} else {
	|		not
    |	}
	v
    |	[check] Form select inputs needs to bet set to a neutral option to force the user to pick one. Selecting a different
    |	country should give a different selection of states? Or at the very least remove it.
	v
    .preventDefault() and return false; are not working to prevent the page from
    refreshing on submit...
    --Works when used as a REGULAR button, but not as a SUBMIT button.
	
	On second page, there should be a cancel button instead of a previous button to go back to the email/account page.
	--Supposed to scrap the original form?

    */


});