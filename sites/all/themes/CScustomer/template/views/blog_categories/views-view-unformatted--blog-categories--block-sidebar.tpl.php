<div class="widget clearfix">
    <h3 class="section-sub-title">Blog Categories</h3>
    <div class="check">
        <ul>
            <?php foreach ($rows as $id => $row): ?>
                <li>
                    <?php print $row; ?>
                </li>
            <?php endforeach; ?>
        </ul><!-- end ul -->
    </div><!-- end details -->
</div><!-- end widget -->