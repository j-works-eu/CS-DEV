<?php
drupal_add_library('system', 'jquery.cookie');
drupal_add_js(drupal_get_path('module', 'art_revolution') . '/js/fs.animations.js');
drupal_add_js(drupal_get_path('module', 'art_revolution') . '/js/jquery.instagramFeed.js');
drupal_add_js(drupal_get_path('module', 'art_revolution') . '/js/jquery.rateyo.min.js');
drupal_add_js(drupal_get_path('module', 'art_revolution') . '/js/google-places.js');
//drupal_add_js('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyBMtw94ZFy2IcxIU-P6KF019cJ3Igy_RpY', array('type' => 'external', 'defer' => 'defer'));
drupal_add_css(drupal_get_path('module', 'art_revolution') . '/css/fs.animations.css');
drupal_add_css(drupal_get_path('module', 'art_revolution') . '/css/weather-icons.css');
drupal_add_css(drupal_get_path('module', 'art_revolution') . '/css/weather-icons.css');

/**
 * Define $root global variable.
 */
global $theme_root;
$theme_root = base_path() . path_to_theme();

/**
 * Strip unwanted rel attributes from meta tags in <head>.
 */
//
//	function fioratheme($existing, $type, $theme, $path){
//		return array(
//
//			'user_login' => array(
//				'arguments' => array('form' => NULL),
//				'render element' => 'form',
//				'template' => 'template/user-login',
//			),
//		);
//	}


//function fiora_html_head_alter(&$head_elements) {
//    unset($head_elements['system_meta_generator']);
//    foreach ($head_elements as $key => $element) {
//        if (isset($element['#attributes']['rel']) && $element['#attributes']['rel'] == 'canonical') {
//            unset($head_elements[$key]);
//        }
//        if (isset($element['#attributes']['rel']) && $element['#attributes']['rel'] == 'shortlink') {
//            unset($head_elements[$key]);
//        }
//    }
//}

function fiora_css_alter(&$css) {
    // Remove defaults.css file.
    unset($css[drupal_get_path('module', 'system') . '/defaults.css']);
    unset($css[drupal_get_path('module', 'system') . '/system.css']);
    unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
    unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
    unset($css[drupal_get_path('module', 'user') . '/user.css']);
    // .. etc..
}

/**
 * Apply alternate UL class to Drupal tabs.
 */
function fiora_menu_local_tasks(&$variables) {
    $output = '';

    if (!empty($variables['primary'])) {
        $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
        $variables['primary']['#prefix'] .= '<ul class="nav nav-tabs">';
        $variables['primary']['#suffix'] = '</ul>';
        $output .= drupal_render($variables['primary']);
    }
    if (!empty($variables['secondary'])) {
        $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
        $variables['secondary']['#prefix'] .= '<ul class="nav nav-tabs">';
        $variables['secondary']['#suffix'] = '</ul>';
        $output .= drupal_render($variables['secondary']);
    }

    return $output;
}

/**
* Helper function to test for panel page config.
*/
function _is_panel_page() {
	$page = &drupal_static(__FUNCTION__);
	if (function_exists("page_manager_get_current_page")) {
		if (!isset($page)) {
			$page = page_manager_get_current_page();
		}
	}
	return $page ? $page : FALSE;
}

/**
 * Assign theme hook suggestions for custom templates.
 */
function fiora_preprocess_page(&$vars, $hook) {
    if (isset($vars['node'])) {
        $suggest = "page__{$vars['node']->type}";
        $vars['theme_hook_suggestions'][] = $suggest;
    }

    $status = drupal_get_http_header("status");
    if ($status == "404 Not Found") {
        $vars['theme_hook_suggestions'][] = 'page__404';
    }

    if (arg(0) == 'taxonomy' && arg(1) == 'term') {
        $term = taxonomy_term_load(arg(2));
        $vars['theme_hook_suggestions'][] = 'page--taxonomy--' . $term->vid;
    }

    // If this is a panel page, add template suggestions.
	if($panel_page = _is_panel_page()) {
		// Add a generic suggestion for all panel pages.
		$vars['theme_hook_suggestions'][] = 'page__panel';
		// Add the panel page machine name to the template suggestions.
		$vars['theme_hook_suggestions'][] = 'page__' . $panel_page['name'];
		// Add a body class for good measure.
		$body_classes[] = 'page-panel';
	}
}

/* function fiora_preprocess_node(&$vars) {
  if (request_path() == 'shop' || request_path() == 'shop-grid-v2' || request_path() == 'shop-grid-v3') {
  $vars['theme_hook_suggestions'][] = 'node__shop';
  }
  } */

function fiora_preprocess_region(&$variables) {
    // Create the $content variable that templates expect.
    $variables['content'] = $variables['elements']['#children'];
    $variables['region'] = $variables['elements']['#region'];

    $variables['classes_array'][] = drupal_region_class($variables['region']);
    $variables['theme_hook_suggestions'][] = 'region__' . $variables['region'];
}

/**
 * Define some variables for use in theme templates.
 */
function fiora_process_page(&$variables) {
    // Assign site name and slogan toggle theme settings to variables.
    $variables['disable_site_name'] = theme_get_setting('toggle_name') ? FALSE : TRUE;
    $variables['disable_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
    // Assign site name/slogan defaults if there is no value.
    if ($variables['disable_site_name']) {
        $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
    }
    if ($variables['disable_site_slogan']) {
        $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
    }
}

/**
 * Define breadcrumb in theme templates.
 */
//function fiora_breadcrumb($variables) {
//    $breadcrumb = $variables['breadcrumb'];
//    if (!empty($breadcrumb)) {
//        // Provide a navigational heading to give context for breadcrumb links to
//        // screen-reader users. Make the heading invisible with .element-invisible.
//        $crumbs = '<div class="bread-crumbs">';
//        $array_size = count($breadcrumb);
//        if ($array_size > 1) {
//            $array_size = $array_size - 1;
//        }
//        $i = 0;
//        while ($i < $array_size) {
//            $crumbs .= $breadcrumb[$i] . ' / ';
//            $i++;
//        }
//        $crumbs .= drupal_get_title() . '</div>';
//        return $crumbs;
//    }
//}

/**
 * Preprocess variables for the username.
 */
function fiora_preprocess_username(&$vars) {
    global $theme_key;
    $theme_name = $theme_key;

    // Add rel=author for SEO and supporting search engines
    if (isset($vars['link_path'])) {
        $vars['link_attributes']['rel'][] = 'author';
    } else {
        $vars['attributes_array']['rel'][] = 'author';
    }
}

function fiora_format_comma_field($field_category, $node, $limit = NULL) {

    if (module_exists('i18n_taxonomy')) {
        $language = i18n_language();
    }

    $category_arr = array();
    $category = '';
    $field = field_get_items('node', $node, $field_category);

    if (!empty($field)) {
        foreach ($field as $item) {
            $term = taxonomy_term_load($item['tid']);


            if ($term) {
                if (module_exists('i18n_taxonomy')) {
                    $term_name = i18n_taxonomy_term_name($term, $language->language);

                    // $term_desc = tagclouds_i18n_taxonomy_term_description($term, $language->language);
                } else {
                    $term_name = $term->name;
                    //$term_desc = $term->description;
                }

                $category_arr[] = l($term_name, 'taxonomy/term/' . $item['tid']);
            }

            if ($limit) {
                if (count($category_arr) == $limit) {
                    $category = implode(' ', $category_arr);
                    return $category;
                }
            }
        }
    }
    $category = implode(' ', $category_arr);

    return $category;
}

function fiora_form_contact_site_form_alter(&$form, $form_state) {

    $form['name'] = array('#type' => 'textfield',
        '#title' => t(''),
        '#maxlength' => 255,
        '#required' => TRUE,
        '#placeholder' => 'Your Name',
        '#weight' => 1,
    );
    $form['mail'] = array('#type' => 'textfield',
        '#title' => t(''),
        '#maxlength' => 255,
        '#required' => TRUE,
        '#placeholder' => t('Your Email'),
        '#weight' => 2,
    );
    $form['subject'] = array('#type' => 'textfield',
        '#title' => t(''),
        '#maxlength' => 255,
        '#required' => FALSE,
        '#placeholder' => t('Subject'),
        '#weight' => 1,
    );
    $form['message'] = array(
        '#type' => 'textarea',
        '#title' => t(''),
        '#placeholder' => t('Your Message'),
        '#weight' => 5,
    );
    $form['copy']['#access'] = FALSE;
    $form['submit'] = array(
        '#type' => 'submit',
        '#value' => t('Send'),
        '#weight' => 6,
    );
}

function fiora_pagination($node, $mode = 'n') {
    if (!function_exists('prev_next_nid')) {
        return NULL;
    }

	if(isset($node->nid)) {
		switch ($mode) {
			case 'p':
				$n_nid = prev_next_nid($node->nid, 'prev');
				$link_text = "Previous post";
				break;

			case 'n':
				$n_nid = prev_next_nid($node->nid, 'next');
				$link_text = "Next post";
				break;

			default:
				return NULL;
		}

		if ($n_nid) {
			$n_node = '';
			$n_node = node_load($n_nid);

			switch ($n_node->type) {
				case 'projects':
					$id = $n_node->nid;
					return $id;

				case 'blog':
					$id = $n_node->nid;
					return $id;

				case 'our_team':
					$id = $n_node->nid;
					return $id;

				case 'our_services':
					$id = $n_node->nid;
					return $id;

				case 'testimonial':
					$id = $n_node->nid;
					return $id;

				case 'article':
					$html = l($link_text, 'node/' . $n_node->nid);
					return $html;
			}
		}
    }
}

/**
 * Overrides theme_item_list().
 */
function fiora_item_list($vars) {
    if (isset($vars['attributes']['class']) && is_array($vars['attributes']['class']) && in_array('pager', $vars['attributes']['class'])) {
        foreach ($vars['items'] as $i => &$item) {
            if (in_array('pager-current', $item['class'])) {
                $item['data'] = '<a class="active" href="javascript: void(0);"><span>' . $item['data'] . '</span></a>';
            } elseif (in_array('pager-item', $item['class'])) {
                $item['class'] = array('page-numbers');
                $item['data'] = $item['data'];
            } elseif (in_array('pager-next', $item['class'])) {
                $item['class'] = array('next page-numbers');
                $item['data'] = $item['data'];
            } elseif (in_array('pager-last', $item['class'])) {
                $item['class'] = array('page-numbers');
                $item['data'] = $item['data'];
            } elseif (in_array('pager-first', $item['class'])) {
                $item['class'] = array('page-numbers first');
                $item['data'] = $item['data'];
            } elseif (in_array('pager-previous', $item['class'])) {
                $item['class'] = array('prev page-numbers');
                $item['data'] = $item['data'];
            } elseif (in_array('pager-ellipsis', $item['class'])) {
                $item['class'] = array('disabled');
                $item['data'] = $item['data'];
            }
        }
        return '<div class="pagination pagination-3">' . theme_item_list($vars) . '</div>';
    }
    return theme_item_list($vars);
}

/**
 * Overrides theme_pager_link().
 */
function fiora_pager_link($variables) {
    $text = $variables['text'];
    $page_new = $variables['page_new'];
    $element = $variables['element'];
    $parameters = $variables['parameters'];
    $attributes = $variables['attributes'];

    $page = isset($_GET['page']) ? $_GET['page'] : '';
    if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
        $parameters['page'] = $new_page;
    }

    $query = array();
    if (count($parameters)) {
        $query = drupal_get_query_parameters($parameters, array());
    }
    if ($query_pager = pager_get_query_parameters()) {
        $query = array_merge($query, $query_pager);
    }

    // Set each pager link title
    if (!isset($attributes['title'])) {
        static $titles = NULL;
        if (!isset($titles)) {
            $titles = array(
                t('Â«') => t('Go to first page'),
                t('â€¹') => t('Go to previous page'),
                t('â€º') => t('Go to next page'),
                t('Â»') => t('Go to last page'),
            );
        }
        if (isset($titles[$text])) {
            $attributes['title'] = $titles[$text];
        } elseif (is_numeric($text)) {
            $attributes['title'] = t('Go to page @number', array('@number' => $text));
        }
    }

    // @todo l() cannot be used here, since it adds an 'active' class based on the
    //   path only (which is always the current path for pager links). Apparently,
    //   none of the pager links is active at any time - but it should still be
    //   possible to use l() here.
    // @see http://drupal.org/node/1410574
    $attributes['href'] = url($_GET['q'], array('query' => $query));
    return '<a' . drupal_attributes($attributes) . '><span>' . check_plain($text) . '</span></a>';
}

function fiora_form_alter(&$form, &$form_state, $form_id) {
    if ($form_id == 'search_block_form') {
        $form['#attributes']['class'][] = 'search_form';
        $form['search_block_form']['#default_value'] = t('Search on the site..'); // Set a default value for the textfield
        $form['search_block_form']['#attributes']['class'][] = 'form-control';

        // Add extra attributes to the text box
        $form['search_block_form']['#attributes']['onblur'] = "if (this.value == '') {this.value = 'Search on the site..';}";
        $form['search_block_form']['#attributes']['onfocus'] = "if (this.value == 'Search on the site..') {this.value = '';}";
        // Prevent user from searching the default text
        $form['#attributes']['onsubmit'] = "if(this.search_block_form.value=='Search'){ alert('Please enter a search'); return false; }";

        // Alternative (HTML5) placeholder attribute instead of using the javascript
        $form['search_block_form']['#attributes']['placeholder'] = t('Search on the site..');
    }
    if (substr($form_id, 0, 28) == 'uc_product_add_to_cart_form_') {
        $form['qty'] = array(
            '#type' => 'textfield',
            '#type' => 'textfield',
            '#title' => t(''),
            '#default_value' => '1',
        );
        $form['qty']['#attributes']['class'][] = 'form-control';
    }
}

/**
 * Add a comma delimiter between several field types.
 */
function fiora_field($variables) {

    $output = '';

    // Render the label, if it's not hidden.
    if (!$variables['label_hidden']) {

    }

    // Render the items.

    $arrayFields = array('title', 'body', 'art_portfolio_categories');

    foreach ($arrayFields as $field) {
        if ($variables['element']['#field_name'] == $field) {
            foreach ($variables['items'] as $delta => $item) {
                $rendered_tags[] = drupal_render($item);
            }
            $output .= implode(', ', $rendered_tags);
        }
    }

    if (!in_array($variables['element']['#field_name'], $arrayFields)) {
        // Default rendering taken from theme_field().
        foreach ($variables['items'] as $delta => $item) {
            $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
            $output .= '<div class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
        }
    }

    // Render the top-level DIV.

    return $output;
}

/**
 * User CSS function. Separate from fiora_preprocess_html so function can be called directly before </head> tag.
 */
function fiora_user_css() {
    echo "<!-- User defined CSS -->";
    echo "<style type='text/css'>";
    echo theme_get_setting('user_css');
    echo "</style>";
    echo "<!-- End user defined CSS -->";
}

/**
 * Add theme META tags and style sheets to the header.
 */
function fiora_preprocess_html(&$vars) {
    global $parent_root;

    $meta_title = array(
        '#type' => 'html_tag',
        '#tag' => 'meta',
        '#weight' => 1,
        '#attributes' => array(
            'name' => 'title',
            'content' => theme_get_setting('seo_title')
        )
    );
    $meta_description = array(
        '#type' => 'html_tag',
        '#tag' => 'meta',
        '#weight' => 2,
        '#attributes' => array(
            'name' => 'description',
            'content' => theme_get_setting('seo_description')
        )
    );
    $meta_keywords = array(
        '#type' => 'html_tag',
        '#tag' => 'meta',
        '#weight' => 3,
        '#attributes' => array(
            'name' => 'keywords',
            'content' => theme_get_setting('seo_keywords')
        )
    );


    if (theme_get_setting('seo_title') != "") {
        drupal_add_html_head($meta_title, 'meta_title');
    }
    if (theme_get_setting('seo_description') != "") {
        drupal_add_html_head($meta_description, 'meta_description');
    }
    if (theme_get_setting('seo_keywords') != "") {
        drupal_add_html_head($meta_keywords, 'meta_keywords');
    }
}

?>
