<?php
global $theme_root;
// get image
if (isset($node->field_image['und'])) {
    $image = file_create_url($node->field_image['und'][0]['uri']);
} else {
    $image = $theme_root . '/images/defaults/img_about_us.png';
}
?>
<div class="box col-md-4 col-sm-4 col-xs-12">
    <div class="media-element entry">
        <a href="<?php echo $node_url; ?>" title="">
            <img src="<?php echo $image; ?>" class="img-responsive" alt="">
            <div class="magnifier outline-outward">
                <div class="buttons">
                    <h3>LEARN MORE</h3>
                </div>
            </div>
        </a>
    </div><!-- end entry -->
    <h3 class="section-sub-title">
        <?php echo $title; ?>
    </h3><!-- end section-title -->

    <div class="desc">
        <p>
            <?php
            if (isset($node->body['und'])) {
                $summary = strip_tags($node->body['und'][0]['summary']);
                $summary = (strlen($summary) > 233) ? substr($summary, 0, 230) . '...' : $summary;
                echo $summary;
            }
            ?>
        </p>
    </div><!-- end desc -->
</div>