<?php

/*
  |--------------------------------------------------------------------------
  | Project Mailer module
  |--------------------------------------------------------------------------
  |
  | These modules are used when sending email from project form
  |
 */


/* SECTION I - CONFIGURATION */

$receiver_mail = 'example@mail.com';
$mail_title    = ( ! empty( $_POST[ 'name' ] )) ? $_POST[ 'name' ] . ' from ' . $_POST[ 'email' ] : ' from [WebSite]';

/* SECTION II - CODE */

if ( ! empty( $_POST[ 'name' ] ) && ! empty( $_POST [ 'email' ] ) && ! empty( $_POST [ 'description' ] ) ) {
	$email   = $_POST[ 'email' ];
	$name    = $_POST[ 'name' ];
	$message = wordwrap( $_POST [ 'description' ], 70, "\r\n" );
	$message.= "\r\n Name : $name";
	$message.= "\r\n Email : $email";
	$message.= ($_POST['phone'])? "\r\n Phone : {$_POST['phone']}" : '';
	$message.= ($_POST['product_type'])? "\r\n Product Type : {$_POST['product_type']}" : '';
	$message.= ($_POST['product'])? "\r\n Product : {$_POST['product']}" : '';
	$message.= ($_POST['start_month'])? "\r\n Start Month : {$_POST['start_month']}" : '';
	$message.= ($_POST['start_year'])? "\r\n Start Year : {$_POST['start_year']}" : '';
	$message.= ($_POST['launch_month'])? "\r\n Launch Month : {$_POST['launch_month']}" : '';
	$message.= ($_POST['launch_year'])? "\r\n Launch Year : {$_POST['launch_year']}" : '';
	$message.= ($_POST['amount'])? "\r\n Amount : {$_POST['amount']}" : '';
	$message.= ($_POST['currency'])? "\r\n Currency : {$_POST['currency']}" : '';
	$subject = $mail_title;
	$header .= 'From: ' . $_POST[ 'name' ] . "\r\n";
	$header .= 'Reply-To: ' . $email;
	if ( mail( $receiver_mail, $subject, $message, $header ) )
		$result = 'Message successfully sent.';
	else
		$result = 'Message could not be sent.';
} else {
	$result  = 'Please fill all the fields in the form.';
}
echo $result;