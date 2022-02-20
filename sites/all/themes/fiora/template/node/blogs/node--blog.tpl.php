<?php
global $theme_root;
// get image
if (isset($node->field_image['und'])) {
    $image = file_create_url($node->field_image['und'][0]['uri']);
} else {
    $image = $theme_root . '/images/defaults/img_blogs.png';
}
if (!$page) :
    ?>
    <div class="white-wrapper blog-wrapper blog-item">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-5 col-xs-12">
                    <div class="media-element entry">
                        <img src="<?php echo $image; ?>" class="img-responsive" alt="">
                        <div class="magnifier outline-outward">
                            <div class="buttons">
                                <a class="portfoliobuttons" href="<?php echo $node_url; ?>" title=""><i class="icon-link"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-7 col-xs-12">
                    <h3 class="section-sub-title">
                        <a title="" href="<?php echo $node_url; ?>"><?php echo $title; ?></a>
                    </h3>
                    <div class="post-meta">
                        <span>
                            by <?php echo $node->name; ?> <a rel="bookmark" title="Permalink to Interview: <?php echo $title; ?>" href="<?php echo $node_url; ?>">on <?php print format_date($node->created, 'custom', 'M d, Y'); ?></a>
                        </span>
                    </div><!-- end post-meta -->
                    <div class="desc">
                        <p>
                            <?php
                            if (isset($node->body['und'])) {
                                $summary = strip_tags($node->body['und'][0]['summary']);
                                $summary = (strlen($summary) > 503) ? substr($summary, 0, 530) . '...' : $summary;
                                echo $summary;
                            }
                            ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
else:
    ?>
    <section class="nopadding">
        <div class="row">
            <div class="col-md-9 col-sm-8 col-xs-12">
                <div class="single-post">
                    <div class="media-element">
                        <img src="<?php echo $image; ?>" alt="" class="img-responsive">
                    </div><!-- end media-element -->

                    <h3 class="section-sub-title">
                        <?php echo $title; ?>
                    </h3><!-- end section-title -->

                    <div class="post-meta">
                        <span><a rel="author" title="View all posts by admin" href="#">by <?php echo $node->name; ?></a></span>
                        <span><a rel="bookmark" title="" href="#comments"><?php print $comment_count; ?> Comments</a></span>
                        <span><a rel="bookmark" title="Permalink to Interview: <?php echo $title; ?>" href="<?php echo $node_url; ?>">on <?php print format_date($node->created, 'custom', 'M d, Y'); ?></a></span>
                    </div><!-- end post-meta -->

                    <div class="desc">
                        <?php echo $node->body['und'][0]['value']; ?>
                    </div><!-- end desc -->

                    <div class="post-share text-left clearfix">
                        <div class="social">
                            <p>Share this:
                                <a href="http://www.facebook.com/sharer.php?u=<?php echo $_SERVER['HTTP_HOST'] . file_create_url($node_url); ?>" onClick="javascript:window.open(this.href,
                                                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=220,width=600');
                                        return false;">
                                    <i class="icon-facebook"></i>
                                </a>
                                <a href="https://twitter.com/share?url=<?php echo $_SERVER['HTTP_HOST'] . file_create_url($node_url); ?>" onClick="javascript:window.open(this.href,
                                                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=260,width=600');
                                        return false;">
                                    <i class="icon-twitter"></i>
                                </a>
                                <a href="https://plus.google.com/share?url=<?php echo $_SERVER['HTTP_HOST'] . file_create_url($node_url); ?>" onClick="javascript:window.open(this.href,
                                                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                                        return false;">
                                    <i class="icon-googleplus"></i>
                                </a>
                                <a href="http://www.reddit.com/submit?url=<?php echo $_SERVER['HTTP_HOST'] . file_create_url($node_url); ?>" onClick="javascript:window.open(this.href,
                                                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=220,width=600');
                                        return false;">
                                    <i class="icon-reddit"></i>
                                </a>
                                <!--<a href="#" title="vimeo"><i class="icon-vimeo"></i></a>-->
                                <!--<a href="#" title="Behance"><i class="icon-behance"></i></a></p>-->
                        </div><!-- end social -->
                    </div><!-- end share -->

                    <div class="tags">
                        <?php print fiora_format_comma_field('field_blog_tags', $node); ?>
                    </div>

                    <hr>
                    <div class="blog-comment">
                        <?php print render($content['comments']); ?>
                    </div>


                </div><!-- end single-post -->
            </div><!-- end content -->

            <div id="sidebar" class="col-md-3 col-sm-4 col-xs-12">
                <?php
                $blog_sidebar = block_get_blocks_by_region('blog_sidebar');
                print render($blog_sidebar);
                $blog_newsletter = block_get_blocks_by_region('newsletter');
                print render($blog_newsletter);
                ?>
            </div><!-- end sidebar -->
        </div><!-- end container -->
    </section><!-- end white -->
    <?php
    $bottom_content = block_get_blocks_by_region('bottom_content');
    print render($bottom_content);
    ?>
<?php endif; ?>
