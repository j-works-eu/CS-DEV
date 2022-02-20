<?php

/** @var views_templates $classes_array */
/** @var views_templates $rows */

if (!empty($title)) {
    echo '<h3><?php print $title; ?></h3>';
}


foreach ($rows as $id => $row) {
    if ($classes_array[$id]) {
        echo '<div class="'.$classes_array[$id].'">'.$row.'</div>';
    } else {
        echo '<div class="noClass">'.$row.'</div>';
    }
}