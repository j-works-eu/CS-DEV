<?php
global $theme_root;
// get image
if (isset($node->field_image['und'])) {
    $image = file_create_url($node->field_image['und'][0]['uri']);
} else {
    $image = $theme_root . '/images/defaults/img_brand.png';
}
?>
<div class="col-sm-2 col-xs-12">
    <a class="wow fadeIn" href="<?php echo $node->field_linkto['und'][0]['value']; ?>" title="">
        <img src="<?php echo $image; ?>" alt="" class="img-responsive">
    </a>
</div>