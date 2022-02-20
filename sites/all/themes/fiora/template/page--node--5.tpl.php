<style>
  body {
    font-family: 'Open Sans Condensed', sans-serif !important;
    /* color: #eaeaea !important; */
    background: #464646 !important;
    /* font-size: 12px !important; */
    font-weight: 300;
    letter-spacing: 0;
    line-height: 18px !important;
    }
</style>



<?php

global $user;

$user_wrapper = entity_metadata_wrapper('user', $user->uid);

$account = user_load($user->uid);
$display_id = $account->name;

// SESSION ID
$SESID = session_id();


// COOKIE SESSION DISPLAY
$output = array_slice($_COOKIE, 1);
$SID = '';
foreach($output as $key => $value) {
  $SID =  $value;
}

// GET FPR REQUESTS ON BASED ON COOKIE SESSION DISPLAY
  $artRevolutionFPRInfo = art_revolution_fpr_selectFields($SID);
    $FPRUID = $artRevolutionFPRInfo->uid??null;
    $FPRsession = $artRevolutionFPRInfo->sessionID??null;
    $FPRresetDone = $artRevolutionFPRInfo->resetDone??null;

//echo '<pre>';
//    print '1' . $SESID .'<br>';
//    print '2' . $FPRsession .'<br>';
//    print '3' . $FPRresetDone .'<br>';
//echo '</pre>';

?>



<?php if ($FPRsession == $SESID && empty($FPRresetDone)) {

    db_update("field_data_field_force_refresh_page")
      ->fields(array(
        'field_force_refresh_page_value' => 2,
      ))
      ->condition('entity_id', $FPRUID)
      ->execute();

    db_update("art_revolution")
      ->fields(array(
        'field_force_refresh_page_value' => 2,
      ))
      ->condition('uid', $FPRUID)
      ->execute();

    db_update("art_revolution_fpr")
      ->fields(array(
        'resetDone' => 1,
      ))
      ->condition('sessionID', $SID)
      ->execute();

    db_update("sessions")
      ->fields(array(
        'refreshPending' => 0,
      ))
      ->condition('sid', $SID)
      ->execute();

    db_delete("art_revolution_fpr")
      ->condition('sessionID', $SID)
      ->execute();

//    watchdog('FRP', "Start forcing of the page refresh getID: '{$SID}' with session ID '{$SESID}'", array(), WATCHDOG_INFO);

    echo '<script>location.reload();</script>';

}
    die;
?>
