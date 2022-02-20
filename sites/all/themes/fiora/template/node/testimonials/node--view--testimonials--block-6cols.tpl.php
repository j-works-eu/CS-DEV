<?php
global $theme_root;
// get image
if (isset($node->field_image['und'])) {
    $image = file_create_url($node->field_image['und'][0]['uri']);
} else {
    $image = $theme_root . '/images/defaults/img_testimonials.png';
}
// get client website
$client_website = "";
if (isset($node->field_client_website['und'])) {
    $client_website = $node->field_client_website['und'][0]['value'];
}
?>
<div class="teambox col-md-2 col-sm-4 col-xs-6">
    <div class="hover-shadow">
        <div rel="tooltip" 
             data-toggle="tooltip" 
             data-trigger="hover" 
             data-placement="top" 
             data-html="true" 
             data-title="
             <p><?php echo strip_tags($node->body['und'][0]['value']); ?></p>">
            <span class="icon-container wow fadeIn"><img src="<?php echo $image; ?>" alt="" class="img-responsive"></span>
            <h3><?php echo $title; ?><small><?php echo $client_website; ?></small></h3>
        </div>
    </div>
</div><!-- end col -->