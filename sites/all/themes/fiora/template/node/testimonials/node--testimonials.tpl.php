<?php
global $theme_root;
// get image
if (isset($node->field_image['und'])) {
    $image = file_create_url($node->field_image['und'][0]['uri']);
} else {
    $image = $theme_root . '/images/defaults/img_testimonials.png';
}
if (!$page) :
    ?>
<?php else: ?>
    <section class="white-wrapper border-top nopadding">
        <div class="container">
            <div id="content" class="col-md-12 col-sm-12 col-xs-12">
                <div class="single-post">
                    <div class="media-element">
                        <img src="<?php echo $image; ?>" alt="" class="img-responsive">
                    </div><!-- end media-element -->

                    <h3 class="section-sub-title">
                        <?php echo $title; ?>
                    </h3><!-- end section-title -->

                    <?php if (isset($node->field_client_website['und'])): ?>
                        <h5>
                            <?php print t('Website:'); ?>
                            <?php echo $node->field_client_website['und'][0]['value']; ?>
                        </h5>
                    <?php endif; ?>

                    <div class="post-meta">
                        <span><a rel="author" title="View all posts by admin" href="#">by <?php echo $node->name; ?></a></span>
                        <!--<span><a rel="bookmark" title="" href="#comments"><?php print $comment_count; ?> Comments</a></span>-->
                        <span><a rel="bookmark" title="Permalink to Interview: <?php echo $title; ?>" href="<?php echo $node_url; ?>">on <?php print format_date($node->created, 'custom', 'M d, Y'); ?></a></span>
                    </div><!-- end post-meta -->

                    <div class="desc">
                        <?php echo $node->body['und'][0]['value']; ?>
                    </div><!-- end desc -->
                    <hr>
                    <?php //print render($content['comments']); ?>
                </div><!-- end single-post -->
            </div><!-- end content -->
        </div>
    </section>
<?php endif; ?>
