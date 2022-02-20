<?php

$email = homemade_storing_email();
$uid = $order->uid;
$user_fields = user_load($uid);

$today = date("d-m-Y");

?>
<style>
  table {
    font-size: 12px;
    font-family: courier;
  }

  span {
    font-size: 10px;
  }

  span#factuur {
    font-size: 15px;
  }

  span#streepje {
    font-size: 10px;
  }

  span#orderid {
    color: orange;
  }

  span#footer {
    font-size: 9px;
  }
</style>

<table border="0" cellspacing="0" cellpadding="0">

  <tr>
    <td valign="top" align="center" colspan="3">
	<span>
	&nbsp;<br/>
	</span>
    </td>
  </tr>

  <tr>
    <td align="left" width="49%">
      <span>
      &nbsp;&nbsp;<br/>
       <img src="/sites/all/themes/fiora/images/logo700px.png" border="0" height="18" width="175">
		<br/>
       <br/>Postbus 1045<br/>
       5004 BA<br/>
       Tilburg<br/>
       info@cloudscreen.nl<br/>
		www.cloudscreen.nl<br/>
        </span>
    </td>
    <td align="center" width="2%">
    </td>
    <td align="right" width="49%">
       <span>
         &nbsp;&nbsp;<br/>
         <span id="factuur">FACTUUR: #<span
             id="orderid"><?php print $order_order_id; ?></span></span><br/>
         <?php print $today; ?><br/><br/>
         <?php
		 print $user_fields->field_bedrijfsnaam[LANGUAGE_NONE]['0']['value'] . "<br />";
         print $user_fields->field_klantnaam[LANGUAGE_NONE]['0']['value'] . "<br />";
         print $user_fields->field_straat_huisnummer[LANGUAGE_NONE]['0']['value'] . "<br />";
         print $user_fields->field_postcode[LANGUAGE_NONE]['0']['value'] . "<br />";
         print $user_fields->field_plaats[LANGUAGE_NONE]['0']['value'] . "<br />";
         print $user_fields->field_land [LANGUAGE_NONE]['0']['value'] . "<br />";
         print $user_fields->field_telefoonnummer[LANGUAGE_NONE]['0']['value'] . "<br />";
         ?>
      </span>
    </td>
  </tr>

  <tr>
    <td align="center" colspan="3">
	<span>
	&nbsp;<br/>&nbsp;<br/>
	</span>
    </td>
  </tr>

  <tr>
    <?php foreach ($products as $product): ?>
    <td align="left">
      <?php print $product->title; ?></td>

    <td align="center" width="1px" colspan="1">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;
    </td>

    <td align="right">
      <?php print $product->individual_price; ?>
      <br/><?php print $product->total_price; ?>
      <?php endforeach; ?>
      <br/><br/>----------<br/>
      BTW: <?php foreach ($line_items as $item): ?>
        <?php if ($item['type'] == 'subtotal' || $item['type'] == 'total') {
          continue;
        } ?>
        <?php print $item['formatted_amount']; ?>
      <?php endforeach; ?><br/>
      TOTAAL: <?php print $order_total; ?>
    </td>
  </tr>

  <tr>
    <td align="center" colspan="3">
	<span>
	Vriendlijk bedankt voor uw betaling.<br/>
	Als u nog vragen heeft horen wij dit graag van u.
	</span>
    </td>
  </tr>

  <tr>
    <td align="center" colspan="3">
	<span>
	&nbsp;<br/>&nbsp;<br/>
	</span>
    </td>
  </tr>

  <tr>
    <td valign="bottom" align="center" colspan="3">
	<span>
      <span id="footer">
        info@cloudscreen.nl <span id="streepje">|</span> KVK: NL.1234567890 <span id="streepje">|</span> BTW: BTW123442435 <span id="streepje">|</span> BANKREKENING: ABN...........
      </span>
    </span>
    </td>
  </tr>
</table>