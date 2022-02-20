<?php
	$verkochttotal = db_select(' uc_orders');
	$verkochttotal->addExpression('sum(order_total)', 'total');
	$verkoopresult = $verkochttotal->execute()->fetchAssoc();
	$verkoopvalue = $verkoopresult['total'];

	$inkooptotal = db_select(' field_data_field_prijs_inclusief');
	$inkooptotal->addExpression('sum(field_prijs_inclusief_value)', 'total');
	$inkoopresult = $inkooptotal->execute()->fetchAssoc();
	$inkoopvalue = $inkoopresult['total'];

	print 'Verkoop' . number_format((float)$verkoopvalue, 2, '.', '') . '<br>';
	print 'inkoop' .number_format((float)$inkoopvalue, 2, '.', '') . '<br>';

