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

	// custom url validator
	$.validator.addMethod("urlCheck", function(value, element) {
		if ( $("#cc_website_yes").is(":selected") ) {
			return /^[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/.test(value);
		} else if ( $("#cc_website_yes").not(":selected") ) {
			return true;
		}
	}, "Please enter a valid URL (example.com)");

	// creditCardForm validate
	$("#creditCardForm").validate({
    	rules: {

    		// step 2
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

    		// step 3
    		ownership: { valueNotEquals: "default" },
    		principal: "required",
    		title: "required",
    		employees: { valueNotEquals: "default" },
    		sales: { valueNotEquals: "default" },
    		bankruptcy: { valueNotEquals: "default" },
    		explanation: {
    			required: "#bankruptcy_yes:selected"
    		},
    		website: { valueNotEquals: "default" },
    		cc_url: { urlCheck: true },
    		cc_BusinessType: { valueNotEquals: "default" }
    	},
    	messages: {

    		// step 2
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

    		// step 3
    		ownership: { valueNotEquals: "Please select an ownership type." },
    		principal: "Please enter a principal.",
    		title: "Please enter a title.",
    		employees: { valueNotEquals: "Please select an employee bracket." },
    		sales: { valueNotEquals: "Please select a sales bracket." },
    		bankruptcy: { valueNotEquals: "Please choose an option." },
    		explanation: "Please enter an explanation for claiming bankruptcy.",
    		website: { valueNotEquals: "Please choose an option." },
    		cc_url: { urlCheck: "Please enter a valid URL(example.com)." },
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
			$(".cod_state_form2").hide();
		}
	});

		// custom url validator
	$.validator.addMethod("cod_urlCheck", function(value, element) {
		if ( $("#cod_website_yes").is(":selected") ) {
			return /^[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/.test(value);
		} else if ( $("#cod_website_yes").not(":selected") ) {
			return true;
		}
	}, "Please enter a valid URL (example.com)");

	// codForm validate
	$("#codForm").validate({
    	rules: {

    		// step 2
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

    		// step 3
    		cod_ownership: { valueNotEquals: "default" },
    		cod_principal: "required",
    		cod_title: "required",
    		cod_employees: { valueNotEquals: "default" },
    		cod_sales: { valueNotEquals: "default" },
    		cod_bankruptcy: { valueNotEquals: "default" },
    		cod_explanation: {
    			required: "#cod_bankruptcy_yes:selected"
    		},
    		cod_website: { valueNotEquals: "default" },
    		cod_url: { cod_urlCheck: true },
    		cod_BusinessType: { valueNotEquals: "default" },

    		// step 4
    		cod_acct_type: { valueNotEquals: "default" },
    		cod_name: "required",
    		cod_address2: "required",
    		cod_city2: "required",
    		cod_state2: { codDblConditions: "cod_state_select2" },
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

    		// step 2
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

    		// step 3
    		cod_ownership: { valueNotEquals: "Please select an ownership type." },
    		cod_principal: "Please enter a principal.",
    		cod_title: "Please enter a title.",
    		cod_employees: { valueNotEquals: "Please select an employee bracket." },
    		cod_sales: { valueNotEquals: "Please select a sales bracket." },
    		cod_bankruptcy: { valueNotEquals: "Please select an option." },
    		cod_explanation: "Please enter an explanation for claiming bankruptcy.",
    		cod_website: { valueNotEquals: "Please select an option." },
    		cod_url: { cod_urlCheck: "Please enter a valid URL(example.com)." },
    		cod_BusinessType: { valueNotEquals: "Please select an option." },

    		// step 4
    		cod_acct_type: { valueNotEquals: "Please select an account type." },
    		cod_name: "Plase enter your name.",
    		cod_address2: "Please enter your address.",
    		cod_city2: "Please enter your city",
    		cod_state2: { codDblConditions: "Please select a state." },
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

	// custom url validator
	$.validator.addMethod("net_urlCheck", function(value, element) {
		if ( $("#net_website_yes").is(":selected") ) {
			return /^[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/.test(value);
		} else if ( $("#net_website_yes").not(":selected") ) {
			return true;
		}
	}, "Please enter a valid URL (example.com)");

	// netForm validate
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
    		net_ownership: { valueNotEquals: "default" },
    		net_principal: "required",
    		net_title: "required",
    		net_employees: { valueNotEquals: "default" },
    		net_sales: { valueNotEquals: "default" },
    		net_bankruptcy: { valueNotEquals: "default" },
    		net_explanation: {
    			required: "#net_bankruptcy_yes:selected"
    		},
    		net_website: { valueNotEquals: "default" },
    		net_url: { net_urlCheck: true },
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
    			required: false,
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
    			required: false,
    			digits: true
    		},

    		//step 5
    		net_acct_type3: { valueNotEquals: "default"},
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

    		net_acct_type4: { valueNotEquals: "default"},
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
    		net_ownership: { valueNotEquals: "Please select an ownership type." },
    		net_principal: "Please enter a principal.",
    		net_title: "Please enter a title.",
    		net_employees: { valueNotEquals: "Please select an employee bracket." },
    		net_sales: { valueNotEquals: "Please select a sales bracket." },
    		net_bankruptcy: { valueNotEquals: "Please select an option." },
    		net_explanation: "Please enter an explanation for claiming bankruptcy.",
    		net_website: { valueNotEquals: "Please select an option." },
    		net_url: { net_urlCheck: "Please enter a valid URL(example.com)." },
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
    			digits: "Please use numbers only."
    		},

    		// step 5
    		net_acct_type3: { valueNotEquals: "Please choose an account type." },
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

    		net_acct_type4: { valueNotEquals: "Please choose an account type." },
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