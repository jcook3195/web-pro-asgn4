
/**
*
* Jordan Cook - Assignment 2
*
*/


// Set initial validation variable
var isValid = true;

// Create new date object
var today = new Date();
var month = '' + (today.getMonth() + 1); // Get month value, add one to it due to starting at 0, and convert it to a string
var day = '' + today.getDate(); // Get day value and convert it to a string
var year = '' + today.getFullYear(); // Get full year value and convert it to a string

var dateString = month + "/" + day + "/" + year; // Combine all date values into one formatted string

// Main function when doc is ready
$(document).ready(function(){

	// Run when login button is clicked
	$("#login_button").click(function(event) {

		var usernames = new Array("user1", "user2", "user3", "user4"); // Array of usernames
		var passwords = new Array("pass1", "pass2", "pass3", "pass4"); // Array of passwords

		var user = $('#username').val(); // Get value of username field
		var pass = $('#password').val(); // Get value of password field

		var u = usernames.length; // Create var that equals length of username array
		var p = passwords.length; // Create var that equals length of password array

		var correct_user = false; // Sets correct username to false
		var correct_pass = false; // Sets correct password to false

		for(i = 0; i < u; i++) { // Loop through length of username array
			if(usernames[i] === user) { // If the username is found in the array
				correct_user = true; // Set correct user to true
				un_index = i; // Set var containing index of username to compare it to password
				
				for(i = 0; i < p; i++) { // If username matches, loop through length of passwords
					if(passwords[i] === pass) { // If the password is found in the array

						pw_index = i; // Set var containing index of password to compare it to username

						if(un_index === pw_index) {
							window.location="index.html"; // Go to order page
							var correct_pass = true; // Sets correct password to true
							break; // Stop the loop
						}
					}
				}

			if(correct_pass != true) {
				$("#login_output").text("Incorrect username or password."); // Display message if password is incorrect
			}

			break; // Stop the loop
			} 
		}

		if(correct_user != true) {
			$("#login_output").text("Incorrect username or password."); // Display message if username is incorrect
		}

	});

	// Set date in date field
	$("#order_date").val(dateString);

	// Run when order button is clicked
	$("#order_button").click(function(event){

		// Get the values of all form fields
		var product = $('#product').val();
		var quantity = $('#quantity').val();
		var unit_price = $('#unit_price').val();
		var discount_rate = $('#discount_rate').val();
		var order_date = $('#order_date').val();
		var first_name = $('#first_name').val();
		var last_name = $('#last_name').val();
		var payment_type = $('#payment_type').val();
		var card_number = $('#card_number').val();
		var security_code = $('#security_code').val();

		validate();

		function validate() {

			// Form validation conditionals
			if(product == null) {
				$('#err1').text("Please select a value.");
				isValid = false;
			} else {
				$('#err1').text("");
			}

			if(isNaN(quantity) || quantity < 1) {
				$('#err2').text("Please enter a number greater than 0.");
				isValid = false;
			} else {
				$('#err2').text("");
			}

			if(isNaN(unit_price) || unit_price < 1) {
				$('#err3').text("Please enter a number greater than 0.");
				isValid = false;
			} else {
				$('#err3').text("");
			}

			if(isNaN(discount_rate) || discount_rate < 1) {
				$('#err4').text("Please enter a number greater than 0.");
				isValid = false;
			} else {
				$('#err4').text("");
				// If it is a valid discount rate, divide by 100 to get percentage
				discount_rate = discount_rate/100;
			}

			if(order_date == null || order_date.length < 8 || order_date.length > 10) {
				$('#err5').text("Please enter a valid date.");
				isValid = false;
			} else {
				$('#err5').text("");
			}

			if(first_name == null || first_name.length < 1) {
				$('#err6').text("Please enter your first name.");
				isValid = false;
			} else {
				$('#err6').text("");
			}

			if(last_name == null || last_name.length < 1) {
				$('#err7').text("Please enter your last name.");
				isValid = false;
			} else {
				$('#err7').text("");
			}

			if(payment_type == null) {
				$('#err8').text("Please select payment type.");
				isValid = false;
			} else {
				$('#err8').text("");
			}

			if(isNaN(card_number) || card_number.length !== 16) {
				$('#err9').text("Please enter valid credit card number.");
				isValid = false;
			} else {
				$('#err9').text("");
			}

			if(isNaN(security_code) || security_code.length !== 3) {
				$('#err10').text("Please enter valid securtiy code.");
				isValid = false;
			} else {
				$('#err10').text("");
			}

			if(isValid) {
				calcTotal();
			}

		}

		function calcTotal() {

			// Calculate discounted amount
			var discounted_amount = unit_price * discount_rate;

			// Calculate order total based on quantity, price, and discount
			var order_total = quantity * (unit_price - discounted_amount);

		
			// Output statement with name and order total
			var stateTotal = "Thanks for your order of " + product + " " + first_name + " " + last_name + "! Your total is $" + order_total + ".";
			$("#output").text(stateTotal);

		}

	});
});