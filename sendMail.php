<?php 	
	$name = trim($_POST['name']);
	
	$email = trim($_POST['email']);
			
	if(function_exists('stripslashes')) {
		$message = stripslashes(trim($_POST['message']));
	} else {
		$message = trim($_POST['message']);
	}


	// Edit below to your needs
	$emailTo = 'jacobsiddall@gmail.com';
	$subject = 'Message from '.$name;
	$sendCopy = trim($_POST['sendCopy']);
	$body = "Name: $name \n\nEmail: $email \n\nMessage: $message";
	$headers = 'From: Your Company Website <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;
	
	mail($emailTo, $subject, $body, $headers);
	
	return true;
?>