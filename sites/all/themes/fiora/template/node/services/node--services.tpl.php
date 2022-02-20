<?php if (!$page) : ?>
<?php else: ?>
    <section class="white-wrapper border-top nopadding service-box-node">
        <div class="container">
            <div id="content" class="col-md-12 col-sm-12 col-xs-12">
                <div class="single-post">

                    <span class="icon-container wow fadeIn">
                        <i class="<?php echo $node->field_service_icon['und'][0]['value']; ?>"></i>
                    </span>

                    <h3 class="section-sub-title">
                        <?php echo $title; ?>
                    </h3><!-- end section-title -->

                    <div class="post-meta">
                        <span><a rel="author" title="View all posts by admin" href="#">by <?php echo $node->name; ?></a></span>
                        <!--<span><a rel="bookmark" title="" href="#comments"><?php print $comment_count; ?> Comments</a></span>-->
                        <span><a rel="bookmark" title="Permalink to Interview: <?php echo $title; ?>" href="<?php echo $node_url; ?>">on <?php print format_date($node->created, 'custom', 'M d, Y'); ?></a></span>
                    </div><!-- end post-meta -->

                    <div class="desc">
                        <ul>
                            <?php
                            if (isset($node->field_service_features['und'])) :
                                $features = $node->field_service_features['und'];
                                foreach ($features as $feature) :
                                    ?>
                                    <li>
                                        <?php echo $feature['value']; ?>
                                    </li>
                                    <?php
                                endforeach;
                            endif;
                            ?>
                        </ul>
                        <?php echo $node->body['und'][0]['value']; ?>
                    </div><!-- end desc -->
                    <hr>
                    <?php //print render($content['comments']);  ?>
                </div><!-- end single-post -->
            </div><!-- end content -->
        </div>
    </section>
<?php endif; ?>
