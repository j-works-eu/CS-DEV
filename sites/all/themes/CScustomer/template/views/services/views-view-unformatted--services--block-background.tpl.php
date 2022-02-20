<section data-stellar-background-ratio="" data-stellar-vertical-offset="">
    <div class="parallax-overlay"></div>
    <div class="row-fluid">
        <div class="message-welcome col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 text-center">
            <div class="service-list row clearfix">
                <?php foreach ($rows as $id => $row): ?>
                    <?php print $row; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>