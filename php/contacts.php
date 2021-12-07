<?php

/*
  |--------------------------------------------------------------------------
  | Mailer module
  |--------------------------------------------------------------------------
  |
  | These module ares used when sending email from contact form
  |
 */


/* SECTION I - CONFIGURATION */

$receiver_mail = 'example@mail.com';
$mail_title    = ( ! empty( $_POST[ 'website' ] )) ? $_POST[ 'name' ] . ' from ' . $_POST[ 'website' ] : ' from [WebSite]';

/* SECTION II - CODE */

if ( ! empty( $_POST[ 'name' ] ) && ! empty( $_POST [ 'email' ] ) && ! empty( $_POST [ 'message' ] ) ) {
	$email   = $_POST[ 'email' ];
	$message = $_POST[ 'message' ];
	$message = wordwrap( $message, 70, "\r\n" );
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