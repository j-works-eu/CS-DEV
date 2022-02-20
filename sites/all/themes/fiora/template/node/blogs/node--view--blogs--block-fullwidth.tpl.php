<?php
global $theme_root;
// get image
if (isset($node->field_image['und'])) {
    $image = file_create_url($node->field_image['und'][0]['uri']);
} else {
    $image = $theme_root . '/images/defaults/img_blogs.png';
}
?>
<div class="single-post blog-list">
    <div class="media-element entry">
        <img src="<?php echo $image; ?>" class="img-responsive" alt="">
        <div class="magnifier outline-outward">
            <div class="buttons">
                <a class="portfoliobuttons" href="<?php echo $node_url; ?>" title=""><i class="icon-link"></i></a>
            </div>
        </div>
    </div><!-- end entry -->
    <h3 class="section-sub-title">
        <a href="<?php echo $node_url; ?>"><?php echo $title; ?></a>
    </h3><!-- end section-title -->
    <div class="post-meta">
        <span><i class="icon-user"></i> <?php echo $node->name; ?></span>
        <span><i class="icon-comment"></i> <?php print $comment_count; ?> Comments</span>
        <span><a rel="bookmark" title="Permalink to Interview: <?php echo $title; ?>" href="single.html"><i class="icon-clock"></i> <?php print format_date($node->created, 'custom', 'M d, Y'); ?></a></span>
    </div><!-- end post-meta -->

    <div class="desc">
        <p>
            <?php
            if (isset($node->body['und'])) {
                $summary = strip_tags($node->body['und'][0]['summary']);
                echo $summary;
            }
            ?>
        </p>
        <a href="<?php echo $node_url; ?>" class="readmore">Read More</a>
    </div><!-- end desc -->
</div><!-- end single-post -->