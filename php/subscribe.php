<?php

/*
  |--------------------------------------------------------------------------
  | Subscription module
  |--------------------------------------------------------------------------
  |
  | These module are used when subscribing email from input text
  |
 */



/* SECTION I - CONFIGURATION */

ini_set('track_errors', 1);
$myFile = "../subscriptions.txt";
$date = date("Y-m-d H:i:s");

/* SECTION II - CODE */
if ( ! empty( $_POST[ 'email' ] ) ) {
  $fh = fopen( $myFile, 'a' ) or die( $php_errormsg );
  $stringData = ($_POST[ 'email' ]) . "," . $date . "\r\n";
  if ( fwrite( $fh, $stringData ) )
    $result = "Your e-mail was added to subscriptions";
  else
    $result = "Operation could not be completed.";
  fclose( $fh );
}else {
  $result = "Please insert your email";
}
echo $result;