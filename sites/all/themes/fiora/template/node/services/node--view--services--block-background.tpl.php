<?php
// get features
$feature_string = "";
if (isset($node->field_service_features['und'])) {
    $features = $node->field_service_features['und'];
    $count_feature = 1;
    foreach ($features as $feature) {
        if ($count_feature < count($features)) {
            $feature_string .= "<i class='icon-ok'></i> " . $feature['value'] . "<br>";
        } else {
            $feature_string .= "<i class='icon-ok'></i> " . $feature['value'];
        }
        $count_feature++;
    }
}
?>
<div class="service-box hover-shadow col-md-2 col-sm-4">
    <div rel="tooltip" 
         data-toggle="tooltip" 
         data-trigger="hover" 
         data-placement="top" 
         data-html="true" 
         data-title="<?php echo $feature_string; ?>">
        <span class="icon-container wow fadeIn"><i class="<?php echo $node->field_service_icon['und'][0]['value']; ?>"></i></span>
        <h3><?php echo $title; ?></h3>
    </div>
</div><!-- end col -->