<section id="blog">
    <div class="container">
        <div id="owl-blog" class="blog-wrapper owl-carousel clearfix">
            <?php foreach ($rows as $id => $row): ?>
                <?php print $row; ?>
            <?php endforeach; ?>
        </div>
    </div>
</section>