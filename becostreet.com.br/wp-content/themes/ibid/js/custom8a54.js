/*
 Project name:       iBid
 Project author:     ModelTheme
 File name:          Custom JS
*/

(function ($) {
    'use strict';

    $(document).ready(function() {

        // Monthly/Yearly Service Tables (With Switcher)
        function ibid_monthly_yearly_service_tables(){
            jQuery( ".cd-services-switcher .monthly-label" ).on( "click", function() {
                jQuery( ".cd-services-switcher .yearly-label" ).removeClass('active');
                jQuery(this).addClass('active');
                jQuery('.package_price_per_year-parent').hide();
                jQuery('.package_price_per_month-parent').show();
            });
            jQuery( ".cd-services-switcher .yearly-label" ).on( "click", function() {
                jQuery( ".cd-services-switcher .monthly-label" ).removeClass('active');
                jQuery(this).addClass('active');
                jQuery('.package_price_per_month-parent').hide();
                jQuery('.package_price_per_year-parent').show();
            });
        }
        ibid_monthly_yearly_service_tables();

        // Disabling the Enter key press on books search form
        if( jQuery( "form .cd-filter-block" ).length == 0 ) {
            jQuery( "form .cd-filter-block" ).bind("keypress", function(e) {
                if (e.keyCode == 13) {
                    return false;
                }
            });
        }

        // Style the select fields
        if( jQuery( '.variations select' ).length == 0 ||  jQuery( '.ibid-header-searchform select' ).length == 0 || jQuery( '.widget_archive select' ).length == 0 || jQuery( '.widget_categories select' ).length == 0 || jQuery( '.widget_text select' ).length == 0  || jQuery( '.woocommerce-ordering select' ).length == 0 ) {
            jQuery('.variations select, .ibid-header-searchform select, .widget_archive select, .widget_categories select, .widget_text select, .woocommerce-ordering select').niceSelect();
        }
        
        // Shop filters sidebar button (mobile)
        jQuery( '.ibid-shop-filters-button' ).on( "click", function(event) {
            event.preventDefault();
            jQuery('.ibid-shop-sidebar').toggleClass('is-active');
        });

        // Shop filters sidebar closing
        jQuery( '.ibid-shop-sidebar-close-btn' ).on( "click", function(event) {
            event.preventDefault();
            jQuery('.ibid-shop-sidebar').removeClass('is-active');
        });



        //Instant search in header
        jQuery('.ibid-header-searchform input#keyword').on('blur', function(){
            jQuery('.data_fetch').removeClass('focus');
        }).on('focus', function(){
            jQuery('.data_fetch').addClass('focus');
        });

        if ( jQuery( ".slider-moving" ).length ) {
            //moving slider
            var scrollSpeed = 60;        // Speed in milliseconds
            var step = 1;               // How many pixels to move per step
            var current = 0;            // The current pixel row
            var imageWidth = 3473;      // Background image width
            var headerWidth = 1170;     // How wide the header is.

            //The pixel row where to start a new loop
            var restartPosition = -(imageWidth - headerWidth);

            function scrollBg(){
                //Go to next pixel row.
                current += step;
                
                //If at the end of the image, then go to the top.
                if (current == restartPosition){
                    current = 0;
                }
                
                //Set the CSS of the header.
                jQuery('.slider-moving').css("background-position",current+"px 0");
            }

            setInterval(scrollBg, scrollSpeed);
        }

        jQuery('#register .show_if_seller input').each(function(){
            jQuery(this).prop('disabled', true);
        });

        jQuery('#register .user-role input[value="customer"]').click(function() {
            if(jQuery(this).is(':checked')) {
                jQuery('#signup-modal-content .show_if_seller').hide();
                jQuery('#signup-modal-content .show_if_seller input').each(function(){
                    jQuery(this).prop('disabled', true);
                });
            }
        });

        jQuery('#register .user-role input[value="seller"]').click(function() {
            if(jQuery(this).is(':checked')) {
                jQuery('#register .show_if_seller').show(300);
                jQuery('#register .show_if_seller input').each(function(){
                    jQuery(this).prop('disabled', false);
                });
            }
        });

        jQuery('#register .user-role input[value="customer"]').click(function() {
            if(jQuery(this).is(':checked')) {
                jQuery('#register .show_if_seller').hide(300);
            }
        });
        

        jQuery('.ibid_datetime_picker').each(function(){
            jQuery( this ).datetimepicker({
                format:'Y-m-d H:i',
            });
        });


        if ( jQuery( ".auction-checkbox .ibid_is_auction" ).length ) {
            if (jQuery('.auction-checkbox .ibid_is_auction').is(':checked')) {
                jQuery(".dokan-form-group.dokan-price-container").hide();
            }else{
                jQuery(".dokan-form-group.dokan-price-container").show();
            }
        }
        

        // Responsive Set Height Products
        jQuery(function() {

            if ( jQuery( ".woocommerce-tabs .tabs.wc-tabs" ).length ) {
                jQuery(".woocommerce-tabs .tabs.wc-tabs > li > a").matchHeight({
                    byRow: true
                });
            }

            if (jQuery("body").hasClass("woocommerce-js")) {
                // iBid - Product Filters shortcode
                jQuery('.iconfilter-shortcode .product-wrapper').matchHeight({
                    byRow: true
                });
                // iBid - Domains list shortcode
                jQuery('.domain-list-shortcode .post').matchHeight({
                    byRow: true
                });
            }
        });


        function ibid_dokan_vendor_yith_auction_conditional_fields(){
            jQuery(document).ready(function () {

                // Advanced group 1 - Override bid type options
                function ibid_yith_auction_bid_type_onoff(){
                    if (jQuery('#_yith_auction_bid_type_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-bid_type_set_radio").show();
                        jQuery(".ibid-conditional-ywcact_automatic_product_bid_simple").show();
                    }else{
                        jQuery(".ibid-conditional-bid_type_set_radio").hide();
                        jQuery(".ibid-conditional-bid_type_radio").hide();
                        jQuery(".ibid-conditional-ywcact_automatic_product_bid_simple").hide();
                    }

                    if (jQuery('#_yith_wcact_bid_type_set_radio').val() == 'automatic') {
                        jQuery(".ibid-conditional-bid_type_radio").show();
                        jQuery(".ibid-conditional-ywcact_automatic_product_bid_simple").show();
                    }else{
                        jQuery(".ibid-conditional-bid_type_radio").hide();
                        jQuery(".ibid-conditional-ywcact_automatic_product_bid_simple").hide();
                    }

                    if (!jQuery('#_yith_auction_bid_type_onoff').is(':checked') && jQuery('#_yith_wcact_bid_type_set_radio').val() == 'automatic') {
                        jQuery(".ibid-conditional-bid_type_radio").hide();
                    }

                }
                ibid_yith_auction_bid_type_onoff();

                jQuery( '#_yith_auction_bid_type_onoff' ).on( "click", function() {
                    ibid_yith_auction_bid_type_onoff();
                });
                jQuery('#_yith_wcact_bid_type_set_radio').change(function ($e){
                    ibid_yith_auction_bid_type_onoff();
                });


                // Advanced group 2 - Override fee options
                function ibid_yith_auction_fee_ask_onoff(){
                    if (jQuery('#yith_auction_fee_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-fee_ask_onoff").show();
                    }else{
                        jQuery(".ibid-conditional-fee_ask_onoff").hide();
                        jQuery(".ibid-conditional-fee_amount").hide();
                    }

                    if (jQuery('#yith_auction_fee_ask_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-fee_amount").show();
                    }else{
                        jQuery(".ibid-conditional-fee_amount").hide();
                    }

                    if (!jQuery('#yith_auction_fee_onoff').is(':checked') && jQuery('#yith_auction_fee_ask_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-fee_amount").hide();
                    }

                }
                ibid_yith_auction_fee_ask_onoff();

                jQuery( '#yith_auction_fee_onoff, #yith_auction_fee_ask_onoff' ).on( "click", function() {
                    ibid_yith_auction_fee_ask_onoff();
                });


                // Advanced group 3
                function ibid_yith_auction_rescheduling_options(){
                    if (jQuery('#_yith_auction_reschedule_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-yith-reschedule_closed_without_bids_onoff").show();
                        jQuery(".ibid-conditional-reschedule_reserve_no_reached_onoff").show();
                    }else{
                        jQuery(".ibid-conditional-yith-reschedule_closed_without_bids_onoff").hide();
                        jQuery(".ibid-conditional-reschedule_reserve_no_reached_onoff").hide();
                    }

                    if (jQuery('#_yith_auction_reschedule_closed_without_bids_onoff').is(':checked') && jQuery('#_yith_auction_reschedule_reserve_no_reached_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-yith-reschedule-timer").show();
                    }else{
                        jQuery(".ibid-conditional-yith-reschedule-timer").hide();
                    }

                }
                ibid_yith_auction_rescheduling_options();

                jQuery( '#_yith_auction_reschedule_onoff, #_yith_auction_reschedule_closed_without_bids_onoff, #_yith_auction_reschedule_reserve_no_reached_onoff' ).on( "click", function() {
                    ibid_yith_auction_rescheduling_options();
                });


                // Advanced group 4
                function ibid_yith_auction_overtime_onoff(){
                    if (jQuery('#_yith_auction_overtime_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-set-overtime").show();
                    }else{
                        jQuery(".ibid-conditional-set-overtime").hide();
                        jQuery(".ibid-conditional-override-settings").hide();
                    }

                    if (jQuery('#_yith_auction_overtime_set_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-override-settings").show();
                    }else{
                        jQuery(".ibid-conditional-override-settings").hide();
                    }

                    if (!jQuery('#_yith_auction_overtime_onoff').is(':checked') && jQuery('#_yith_auction_overtime_set_onoff').is(':checked')) {
                        jQuery(".ibid-conditional-override-settings").hide();
                    }
                }
                ibid_yith_auction_overtime_onoff();

                jQuery( '#_yith_auction_overtime_onoff, #_yith_auction_overtime_set_onoff' ).on( "click", function() {
                    ibid_yith_auction_overtime_onoff();
                });

            });
        }
        ibid_dokan_vendor_yith_auction_conditional_fields();

        function ibid_dokan_vendor_auctions_blue_box(){
            jQuery(document).ready(function () {
                if (jQuery('.auction-checkbox .ibid_is_auction').is(':checked')) {
                    jQuery(".ibid-auction-settings").show();
                    jQuery(".dokan-form-group.dokan-price-container").hide();
                }
            });

            // DOKAN MARKETPLACE Auctions settings
            jQuery( '.auction-checkbox .ibid_is_auction' ).on( "click", function() {
                if (jQuery('.auction-checkbox .ibid_is_auction').is(':checked')) {
                    jQuery(".ibid-auction-settings").show();
                    jQuery(".dokan-form-group.dokan-price-container").hide();
                }else{
                    jQuery(".ibid-auction-settings").hide();
                    jQuery(".dokan-form-group.dokan-price-container").show();
                }
            });
        }
        ibid_dokan_vendor_auctions_blue_box();


        // WCFM MARKETPLACE Auctions settings
        jQuery( '#product_type' ).on('change', function() {
            var product_type_value = jQuery(this).val();
            if (product_type_value == 'auction') {
                jQuery(".ibid-auction-settings").show();
            }else{
                jQuery(".ibid-auction-settings").hide();
            }
        });

        jQuery('input#_regular_price').change(function() {
            jQuery('p._regular_price_field input#_regular_price').val(jQuery(this).val());
        });

        //Begin: Validate and Submit contact form via Ajax
        jQuery("#modal-log-in #loginform").validate({
            //Ajax validation rules
            rules: {
                log: {
                    required: true,
                    minlength: 2
                },
                pwd: {
                    required: true,
                }
            },
            //Ajax validation messages
            messages: {
                log: {
                    required: "Please enter your username",
                },
                pwd: {
                    required: "Please enter your password",
                },
            },
        });

        //Begin: Validate and Submit contact form via Ajax
        jQuery("#contact_form").validate({
            //Ajax validation rules
            rules: {
                user_name: {
                    required: true,
                    minlength: 2
                },
                user_message: {
                    required: true,
                    minlength: 10
                },
                user_subject: {
                    required: true,
                    minlength: 5
                },
                user_email: {
                    required: true,
                    email: true
                }
            },
            //Ajax validation messages
            messages: {
                user_name: {
                    required: "Please enter a name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                user_message: {
                    required: "Please enter a message",
                    minlength: "Your message must consist of at least 10 characters"
                },
                user_subject: {
                    required: "Please provide a subject",
                    minlength: "Your subject must be at least 5 characters long"
                },
                user_email: "Please enter a valid email address"
            },
            //Submit via Ajax Form
            submitHandler: function() {
                jQuery('#contact_form').ajaxSubmit();
                jQuery('.success_message').fadeIn('slow');
            }
        });
        //End: Validate and Submit contact form via Ajax
        
        if (jQuery(window).width() < 768) {
            var expand = '<span class="expand"><a class="action-expand"></a></span>';
            jQuery('.navbar-collapse .menu-item-has-children, .navbar-collapse .mega_menu, .aside-navbar .menu-item-has-children,.aside-navbar .mega_menu, .aside-navbar .mega3menu').append(expand);
            jQuery('header #navbar .sub-menu').hide();
            jQuery('.aside-navbar .sub-menu').hide();
            jQuery(".menu-item-has-children .expand a").on("click",function() {
                jQuery(this).parent().parent().find(' > ul').toggle();
                jQuery(this).toggleClass("show-menu");
            });
            jQuery(".mega_menu .expand a").on("click",function() {
                jQuery(this).parent().parent().find(' > .cf-mega-menu').toggle();
                jQuery(this).toggleClass("show-menu");
            });
            jQuery(".mega3menu .expand a").on("click",function() {
                jQuery(this).parent().parent().find(' > .cf-mega-menu').toggle();
                jQuery(this).toggleClass("show-menu");
            });
        }


        // Side Menu variant
        if (jQuery(window).width() < 768) {
            jQuery("#aside-menu").on('click', function() {
                jQuery(this).toggleClass('is-active');
                jQuery('.mt-header').toggleClass('aside-open');
                jQuery('body').toggleClass('burger-open');
            });
        
            jQuery('.mt-nav-content .mt-second-menu').hide();
            jQuery(".aside-tabs a:first-child").addClass('is-selected');

            jQuery(".aside-tabs a:first-child").on('click', function() {
                jQuery(".aside-tabs a:last-child").removeClass('is-selected');
                jQuery(this).addClass('is-selected');
                jQuery('.mt-nav-content .mt-first-menu').show();
                jQuery('.mt-nav-content .mt-second-menu').hide();
            });
            jQuery(".aside-tabs a:last-child").on('click', function() {
                jQuery(".aside-tabs a:first-child").removeClass('is-selected');
                jQuery(this).addClass('is-selected');
                jQuery('.mt-nav-content .mt-first-menu').hide();
                jQuery('.mt-nav-content .mt-second-menu').show();
            });
                
            jQuery(document).mouseup(function (e) {
              var container = jQuery(".header-aside");
              if (!container.is(e.target)
                  && container.has(e.target).length === 0)
              {
                jQuery('.mt-header').removeClass('aside-open');
                jQuery('body').removeClass('burger-open');
              }
            });
        }

        //Begin: Sticky Head
        jQuery(function(){
           if (jQuery('body').hasClass('is_nav_sticky')) {
                jQuery(window).resize(function() {
                    if (jQuery(window).width() <= 768) {
                    } else {
                        jQuery("#ibid-main-head").sticky({
                            topSpacing:0
                        });
                    }
                });

                if (jQuery(window).width() >= 768) {
                    jQuery("#ibid-main-head").sticky({
                        topSpacing:0
                    });
                }
           }
        });

        (function() {
        [].slice.call( document.querySelectorAll( ".mt-tabs .tabs" ) ).forEach( function( el ) {
            new CBPFWTabs( el );
        });

        })();

        (function() {
            [].slice.call( document.querySelectorAll( ".mt-multicateg .tabs" ) ).forEach( function( el ) {
                new CBPFWTabs( el );
            });

        })();
        //End: Sticky Head
        jQuery('.cart-contents').hover(function() {
            /* Stuff to do when the mouse enters the element */
            jQuery('.header_mini_cart').addClass('visible_cart');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            jQuery('.header_mini_cart').removeClass('visible_cart');
        });
        
        jQuery('.shop_cart').hover(function() {
            /* Stuff to do when the mouse enters the element */
            jQuery('.header_mini_cart').addClass('visible_cart');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            jQuery('.header_mini_cart').removeClass('visible_cart');
        });

        jQuery('.header_mini_cart').hover(function() {
            /* Stuff to do when the mouse enters the element */
            jQuery(this).addClass('visible_cart');
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            jQuery(this).removeClass('visible_cart');
        });


        if ( jQuery( ".woocommerce_categories" ).length ) {
            
            jQuery(".category a").click(function () {
                var attr = jQuery(this).attr("class");

                jQuery(".products_by_category").removeClass("active");
                jQuery(attr).addClass("active");

                jQuery('.category').removeClass("active");
                jQuery(this).parent('.category').addClass("active");

            });  

            jQuery('.products_category .products_by_category:first').addClass("active");
            jQuery('.categories_shortcode .category:first').addClass("active");

        }


        //Begin: Search Form
        if ( jQuery( "#ibid-search" ).length ) {
            new UISearch( document.getElementById( 'ibid-search' ) );
        }
        //End: Search Form

        //Begin: WooCommerce Quantity
        jQuery( function( $ ) {
        if ( ! String.prototype.getDecimals ) {
            String.prototype.getDecimals = function() {
                var num = this,
                    match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if ( ! match ) {
                    return 0;
                }
                return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
            }
        }
        // Quantity "plus" and "minus" buttons
        $( document.body ).on( 'click', '.plus, .minus', 
            function() {
                
                if (jQuery('form.auction_form.cart').length){
                    // nothing
                }else{
                    var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                        currentVal  = parseFloat( $qty.val() ),
                        max         = parseFloat( $qty.attr( 'max' ) ),
                        min         = parseFloat( $qty.attr( 'min' ) ),
                        step        = $qty.attr( 'step' );

                    // Format values
                    if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
                    if ( max === '' || max === 'NaN' ) max = '';
                    if ( min === '' || min === 'NaN' ) min = 0;
                    if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

                    // Change the value
                    if ( $( this ).is( '.plus' ) ) {
                        if ( max && ( currentVal >= max ) ) {
                            $qty.val( max );
                        } else {
                            $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                        }
                    } else {
                        if ( min && ( currentVal <= min ) ) {
                            $qty.val( min );
                        } else if ( currentVal > 0 ) {
                            $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                        }
                    }

                    // Trigger change event
                    $qty.trigger( 'change' );
                }
            });
        });
         //End: WooCommerce Quantity

        /*Begin: Testimonials slider*/
        jQuery(".testimonials-container").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  2],
                [1200,  2],
                [1400,  2],
                [1600,  2]
            ]
        });
        jQuery(".testimonials-container-1").owlCarousel({
            navigation      : false, // Show next and prev buttons
            navigationText  : ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   1],
                [700,   1],
                [1000,  1],
                [1200,  1],
                [1400,  1],
                [1600,  1]
            ]
        });
        jQuery(".testimonials-container-2").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  2],
                [1200,  2],
                [1400,  2],
                [1600,  2]
            ]
        });
        jQuery(".testimonials-container-3").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            itemsCustom : [
                [0,     1],
                [450,   1],
                [600,   2],
                [700,   2],
                [1000,  3],
                [1200,  3],
                [1400,  3],
                [1600,  3]
            ]
        });
        /*End: Testimonials slider*/


        /*Begin: Clients slider*/
        jQuery(".categories_shortcode").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["<i class='fas fa-angle-left' aria-hidden='true'></i>","<i class='fas fa-angle-right' aria-hidden='true'></i>"],
            itemsCustom : [
                [0,     1],
                [450,   2],
                [600,   2],
                [700,   5],
                [1000,  5],
                [1200,  5],
                [1400,  5],
                [1600,  5]
            ]
        });

        /*Begin: Products Carousel slider*/
        jQuery(".modeltheme_products_carousel").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : false,
            autoPlay        : true,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["<i class='fas fa-angle-left' aria-hidden='true'></i>","<i class='fas fa-angle-right' aria-hidden='true'></i>"],
            itemsCustom : [
                [0,     1],
                [450,   2],
                [600,   2],
                [700,   4],
                [1000,  4],
                [1200,  4],
                [1400,  4],
                [1600,  4]
            ]
        });

        /*Begin: Portfolio single slider*/
        jQuery(".portfolio_thumbnails_slider").owlCarousel({
            navigation      : true, // Show next and prev buttons
            pagination      : true,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            navigationText  : ["",""],
            singleItem      : true
        });
        /*End: Portfolio single slider*/

        /*Begin: Testimonials slider*/
        jQuery(".post_thumbnails_slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : false,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
        var owl = jQuery(".post_thumbnails_slider");
        jQuery(".next").click(function(){
            owl.trigger('owl.next');
        })
        jQuery(".prev").click(function(){
            owl.trigger('owl.prev');
        })
        /*End: Testimonials slider*/
        
        /*Begin: Testimonials slider*/
        jQuery(".testimonials_slider").owlCarousel({
            navigation      : false, // Show next and prev buttons
            pagination      : true,
            autoPlay        : false,
            slideSpeed      : 700,
            paginationSpeed : 700,
            singleItem      : true
        });
        /*End: Testimonials slider*/

        /* Animate */
        jQuery('.animateIn').animateIn();

        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            //grab the "back to top" link
            $back_to_top = jQuery('.back-to-top');

        //hide or show the "back to top" link
        jQuery(window).scroll(function(){
            ( jQuery(this).scrollTop() > offset ) ? $back_to_top.addClass('ibid-is-visible') : $back_to_top.removeClass('ibid-is-visible ibid-fade-out');
            if( jQuery(this).scrollTop() > offset_opacity ) { 
                $back_to_top.addClass('ibid-fade-out');
            }
        });

        //smooth scroll to top
        $back_to_top.on('click', function(event){
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0 ,
                }, scroll_top_duration
            );
        });

        //Smooth Scroll breadcrumb //
        jQuery(".single-project .project-tabs li a").on("click", function (e) {
          e.preventDefault();
          // 2
          const href = jQuery(this).attr("href");
          // 3
          jQuery("html, body").animate({ scrollTop: jQuery(href).offset().top }, 800);
        });

        //Begin: Sticky Project Breadcrumb
        jQuery(function(){
           if (jQuery('.ibid-breadcrumbs-b').hasClass('sticky-wrapper')) {
                jQuery(window).resize(function() {
                    if (jQuery(window).width() <= 768) {
                    } else {
                        jQuery(".ibid-breadcrumbs-b").sticky({
                            topSpacing:0
                        });
                    }
                });

                if (jQuery(window).width() >= 768) {
                    jQuery(".ibid-breadcrumbs-b").sticky({
                        topSpacing:0
                    });
                }
           }
        });

        //Begin: Skills
        jQuery('.statistics').appear(function() {
            jQuery('.percentage').each(function(){
                var dataperc = jQuery(this).attr('data-perc');
                jQuery(this).find('.skill-count').delay(6000).countTo({
                    from: 0,
                    to: dataperc,
                    speed: 5000,
                    refreshInterval: 100
                });
            });
        });  
        //End: Skills 
    });
    
     /*LOGIN MODAL */
    var ModalEffects = (function() {
            function init_modal() {

                var overlay = document.querySelector( '.modeltheme-overlay' );
                var overlay_inner = document.querySelector( '.modeltheme-overlay-inner' );
                var modal_holder = document.querySelector( '.modeltheme-modal-holder' );
                var html = document.querySelector( 'html' );

                [].slice.call( document.querySelectorAll( '.modeltheme-trigger' ) ).forEach( function( el, i ) {

                    var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                        close = modal.querySelector( '.modeltheme-close' );

                    function removeModal( hasPerspective ) {
                        classie.remove( modal, 'modeltheme-show' );
                        classie.remove( modal_holder, 'modeltheme-show' );
                        classie.remove( html, 'modal-open' );

                        if( hasPerspective ) {
                            classie.remove( document.documentElement, 'modeltheme-perspective' );
                        }
                    }

                    function removeModalHandler() {
                        removeModal( classie.has( el, 'modeltheme-setperspective' ) ); 
                    }

                    el.addEventListener( 'click', function( ev ) {
                        classie.add( modal, 'modeltheme-show' );
                        classie.add( modal_holder, 'modeltheme-show' );
                        classie.add( html, 'modal-open' );
                        overlay.removeEventListener( 'click', removeModalHandler );
                        overlay.addEventListener( 'click', removeModalHandler );

                        overlay_inner.removeEventListener( 'click', removeModalHandler );
                        overlay_inner.addEventListener( 'click', removeModalHandler );

                        if( classie.has( el, 'modeltheme-setperspective' ) ) {
                            setTimeout( function() {
                                classie.add( document.documentElement, 'modeltheme-perspective' );
                            }, 25 );
                        }
                    });

                } );

            }

        if (!jQuery("body").hasClass("login-register-page")) {
            init_modal();
        }

    })();

	jQuery("#dropdown-user-profile").on({
	    mouseenter: function () {
			jQuery(this).addClass("open");
	    },
	    mouseleave: function () {
			if(jQuery(this).hasClass("open")) {
				jQuery(this).removeClass("open");
			}
	    }
	});   

    jQuery("#member_hover").on("hover", function(e){
      if(jQuery(this).hasClass("open")) {
        jQuery(this).removeClass("open");
      } else {
        jQuery(this).addClass("open");
      }
    });

    jQuery('.mt-search-icon').on( "click", function(event) {
        event.preventDefault();
        jQuery('.fixed-search-overlay').toggleClass('visible');
    });

    jQuery('.fixed-search-overlay .icon-close').on( "click", function() {
        jQuery('.fixed-search-overlay').removeClass('visible');
    });
    jQuery(document).keyup(function(e) {
         if (e.keyCode == 27) { // escape key maps to keycode `27`
            jQuery('.fixed-search-overlay').removeClass('visible');
            jQuery('.fixed-sidebar-menu').removeClass('open');
            jQuery('.fixed-sidebar-menu-overlay').removeClass('visible');
        }
    });
    
    jQuery('#DataTable-icondrops-active').dataTable( {
        responsive: true,
        language: {
            searchPlaceholder: "Search "
        },
    });
    
    jQuery("#modal-log-in #register-modal").on("click",function(){                       
        jQuery("#login-modal-content").fadeOut("fast", function(){
            jQuery("#signup-modal-content").fadeIn(500);
        });
    }); 
    jQuery("#modal-log-in .btn-login-p").on("click",function(){                       
        jQuery("#signup-modal-content").fadeOut("fast", function(){
            jQuery("#login-modal-content").fadeIn(500);
        });
    }); 

    jQuery("#login-content-shortcode .btn-register-shortcode").on("click",function(){                       
        jQuery("#login-content-shortcode").fadeOut("fast", function(){
           jQuery("#register-content-shortcode").fadeIn(500);
        });
    });    

    jQuery('#nav-menu-login').on("click",function(){ 
        jQuery(".modeltheme-show ~ .modeltheme-overlay, .modeltheme-show .modeltheme-overlay-inner").on("click",function(){ 
            jQuery("#signup-modal-content").fadeOut("fast");
            jQuery("#login-modal-content").fadeIn(500);
        });
    });

    var baseUrl = document.location.origin;
    if ($(window).width() < 768) { 
        jQuery("#dropdown-user-profile").on("click", function() {
            window.location.href = (baseUrl + '/my-account');
        });
    } 
    
    jQuery('#product-type').change(function() {
        if (jQuery(this).val() == "auction") {
            jQuery('.advanced_options').show();
        } else {
            jQuery('.advanced_options').hide();
        }
    });


    if( jQuery( '#yith-wcwl-popup-message' ).length == 0 ) {
        var message_div = jQuery( '<div>' )
                .attr( 'id', 'yith-wcwl-message' ),
            popup_div = jQuery( '<div>' )
                .attr( 'id', 'yith-wcwl-popup-message' )
                .html( message_div )
                .hide();

        jQuery( 'body' ).prepend( popup_div );
    }

    (function ($) {
        var openBtn = $('#navbar .bot_cat_button'),
        slideMenu = $('#navbar .bot_nav_cat_wrap'),
        headerBotClass = $('#navbar');
        
        if (jQuery(window).width() > 1024) {
            if (slideMenu.hasClass("cat_open_default")) {
                openBtn.addClass("active");
                slideMenu.addClass("active");
                slideMenu.slideDown(300);
            }
        } else {
            slideMenu.slideUp(0);
            openBtn.removeClass("active");
            slideMenu.removeClass("active");
        }

        openBtn.on("click", function() {
            if (slideMenu.is(':hidden')) {
                slideMenu.slideDown(300);
                openBtn.addClass("active");
                openBtn.removeClass("close");
            } else {
                slideMenu.slideUp(300);
                openBtn.removeClass("active");
                openBtn.addClass("close");
                slideMenu.removeClass("active");
            }
        });
       
    })(jQuery);
} (jQuery) );



//Begin: MT Popups
(function ($) {
    
    $(document).ready(function () {
        MTPopups.init();
    });
    
    var MTPopups = {
        init: function () {
            var $popup = $(".popup");
            
            if ($popup.length) {
                $(function(){
                    jQuery('#exit-popup').click(function(e) { 
                        jQuery('.popup').fadeOut(1000);
                        jQuery('.popup').removeClass("modeltheme-show");
                    });

                    var expireDate = jQuery('.popup').attr('data-expire');
                    var timeShow = jQuery('.popup').attr('show');
                    var visits = jQuery.cookie('visits') || 0;
                    visits++;
                    
                    if(expireDate = 1) {
                        jQuery.cookie('visits', visits, { expires: 1, path: '/' });
                    } else if(expireDate = 3){
                        jQuery.cookie('visits', visits, { expires: 3, path: '/' });
                    } else if(expireDate = 7){
                        jQuery.cookie('visits', visits, { expires: 7, path: '/' });
                    } else if(expireDate = 30){
                        jQuery.cookie('visits', visits, { expires: 30, path: '/' });
                    } else {
                        jQuery.cookie('visits', visits, { expires: 3000, path: '/' });
                    }
                    
                    if ( jQuery.cookie('visits') > 1 ) {
                        jQuery('.popup').removeClass("modeltheme-show");
                        jQuery.cookie();
                    } else {
                        jQuery(function() {
                             setTimeout(function(){
                                 showElement();
                              }, timeShow);
                             function showElement() {
                                jQuery('.popup').addClass("modeltheme-show");
                             }
                        });
                        
                    }
                });
            }
        }
    };
    
})(jQuery);
//End: MT Popups



// function ibid_countdown_callback(uniqueID){
//     // jQuery('#'+uniqueID).find('.auction-status-message').html('We have lift off!'); 
//     var uniqueID = 'countdown_61d600db30c3b';
//     jQuery('.countdownv2_holder[data-unique-id="'+uniqueID+' > .auction-status-message"').html('This auction has started!'); 
//     jQuery('.countdownv2_holder[data-unique-id="'+uniqueID+' > .countdownv2"').remove(); 
// }

//Begin: Auction Countdowns
(function ($) {
    
    $(document).ready(function () {
        MTAuctionCountdown.init();
    });
    

    // annasta Woocommerce Product Filters: Distroy before Ajax filters
    $( document ).on( 'awf_ajax_filter', function() {
        $('.countdownv2_holder .countdownv2 ').countdown('destroy');
    });

    // annasta Woocommerce Product Filters: Reinit the countdown when the Ajax filtering is complete
    $( document ).on( 'awf_after_ajax_products_update', function() {
        MTAuctionCountdown.init();
    });
    
    var MTAuctionCountdown = {
        init: function () {
            var countdown_holders = $('.countdownv2_holder');
            
            if (countdown_holders.length) {
                countdown_holders.each(function (i) {

                    var inlineDate_end = $(this).attr('data-insert-date'),
                        inlineDate_start = $(this).attr('data-insert-date-start'),
                        uniqueID = $(this).attr('data-unique-id'),
                        dateFormatRedux = $(this).attr('data-date-format-redux'),
                        countdownDirection = $(this).attr('data-countdown-direction'),
                        gmt_offset = $(this).attr('data-gmt-offset'),
                        siteLanguage = $('html').attr('lang').toLowerCase();
                        
                    if (inlineDate_start != '') {
                        var datetime = inlineDate_start;
                    }else{
                        var datetime = inlineDate_end;
                    }

                    if(datetime){
                        datetime = datetime.replace(/\-/g, "/");
                        var untilDate = new Date(datetime);

                        if (countdownDirection == 'true') {
                            $("#"+uniqueID).countdown({
                                until: untilDate,
                                format: dateFormatRedux,
                                isRTL: true,
                                timezone: gmt_offset,
                                // onExpiry: ibid_countdown_callback(uniqueID),
                            });
                        }else{
                            $("#"+uniqueID).countdown({
                                until: untilDate,
                                format: dateFormatRedux,
                                isRTL: false,
                                timezone: gmt_offset,
                                // onExpiry: ibid_countdown_callback(uniqueID),
                            });
                        }
                    }


                });
            }
        }
    };
    
})(jQuery);


( function() {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

    if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var element = document.getElementById( location.hash.substring( 1 ) );

            if ( element ) {
                if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false );
    }
})();


// uisearch
;( function( window ) {
    
    'use strict';
    
    // EventListener | @jon_neal | //github.com/jonathantneal/EventListener
    !window.addEventListener && window.Element && (function () {
       function addToPrototype(name, method) {
          Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
       }
     
       var registry = [];
     
       addToPrototype("addEventListener", function (type, listener) {
          var target = this;
     
          registry.unshift({
             __listener: function (event) {
                event.currentTarget = target;
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
                event.preventDefault = function () { event.returnValue = false };
                event.relatedTarget = event.fromElement || null;
                event.stopPropagation = function () { event.cancelBubble = true };
                event.relatedTarget = event.fromElement || null;
                event.target = event.srcElement || target;
                event.timeStamp = +new Date;
     
                listener.call(target, event);
             },
             listener: listener,
             target: target,
             type: type
          });
     
          this.attachEvent("on" + type, registry[0].__listener);
       });
     
       addToPrototype("removeEventListener", function (type, listener) {
          for (var index = 0, length = registry.length; index < length; ++index) {
             if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
             }
          }
       });
     
       addToPrototype("dispatchEvent", function (eventObject) {
          try {
             return this.fireEvent("on" + eventObject.type, eventObject);
          } catch (error) {
             for (var index = 0, length = registry.length; index < length; ++index) {
                if (registry[index].target == this && registry[index].type == eventObject.type) {
                   registry[index].call(this, eventObject);
                }
             }
          }
       });
    })();

    function mobilecheck() {
        var check = false;
        (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    if( mobilecheck() ) {
        jQuery('body').addClass('is-mobile');
    }

    !String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    });

    function UISearch( el, options ) {  
        this.el = el;
        this.inputEl = el.querySelector( 'form > input.ibid-search-input' );
        this._initEvents();
    }

    UISearch.prototype = {
        _initEvents : function() {
            var self = this,
                initSearchFn = function( ev ) {
                    ev.stopPropagation();
                    // trim its value
                    self.inputEl.value = self.inputEl.value.trim();
                    
                    if( !classie.has( self.el, 'ibid-search-open' ) ) { // open it
                        ev.preventDefault();
                        self.open();
                    }
                    else if( classie.has( self.el, 'ibid-search-open' ) && /^\s*$/.test( self.inputEl.value ) ) { // close it
                        ev.preventDefault();
                        self.close();
                    }
                }

            this.el.addEventListener( 'click', initSearchFn );
            this.el.addEventListener( 'touchstart', initSearchFn );
            this.inputEl.addEventListener( 'click', function( ev ) { ev.stopPropagation(); });
            this.inputEl.addEventListener( 'touchstart', function( ev ) { ev.stopPropagation(); } );
        },
        open : function() {
            var self = this;
            classie.add( this.el, 'ibid-search-open' );
            // focus the input
            if( !mobilecheck() ) {
                this.inputEl.focus();
            }
            // close the search input if body is clicked
            var bodyFn = function( ev ) {
                self.close();
                this.removeEventListener( 'click', bodyFn );
                this.removeEventListener( 'touchstart', bodyFn );
            };
            document.addEventListener( 'click', bodyFn );
            document.addEventListener( 'touchstart', bodyFn );
        },
        close : function() {
            this.inputEl.blur();
            classie.remove( this.el, 'ibid-search-open' );
        }
    }

    function ibidStaticWhatsappHandler() {
        var ibidStaticFixedPhone = "5511994317886";
        function ibidStaticExtractPhone(rawUrl) {
            if (!rawUrl) {
                return "";
            }
            var url = String(rawUrl);
            var waMatch = url.match(/wa\.me\/(\d+)/i);
            if (waMatch && waMatch[1]) {
                return waMatch[1];
            }
            var phoneQuery = url.match(/[?&]phone=(\d+)/i);
            if (phoneQuery && phoneQuery[1]) {
                return phoneQuery[1];
            }
            return "";
        }

        function ibidStaticGetPhone() {
            var links = document.querySelectorAll("a[href*='wa.me/'], a[href*='api.whatsapp.com/send']");
            for (var i = 0; i < links.length; i++) {
                var phone = ibidStaticExtractPhone(links[i].getAttribute("href"));
                if (phone) {
                    return phone;
                }
            }
            return "";
        }

        function ibidStaticGetProductName(target) {
            var fromSingle = document.querySelector(".product_title");
            if (fromSingle && fromSingle.textContent) {
                return fromSingle.textContent.trim();
            }
            var el = target && target.closest ? target.closest(".product, .product-type-simple, .product-type-auction, li.product") : null;
            if (el) {
                var localTitle = el.querySelector(".woocommerce-loop-product__title, .woocommerce-loop-product__link, h2, h3, .product-title");
                if (localTitle && localTitle.textContent) {
                    return localTitle.textContent.trim();
                }
            }
            var title = document.title || "";
            title = title.replace(/\s*[\-\|–]\s*Beco Street.*$/i, "").trim();
            return title || "TAL";
        }

        function ibidStaticBuildWhatsappUrl(productName) {
            var phone = ibidStaticFixedPhone || ibidStaticGetPhone();
            var message = "EU QUERO A OBRA " + productName + " - +55 11 99431-7886";
            if (phone) {
                return "https://api.whatsapp.com/send?phone=" + encodeURIComponent(phone) + "&text=" + encodeURIComponent(message);
            }
            return "https://api.whatsapp.com/send?text=" + encodeURIComponent(message);
        }

        function ibidStaticShouldRedirect(target) {
            var href = "";
            if (target) {
                href = target.getAttribute("href") || target.getAttribute("formaction") || "";
            }
            var hrefValue = String(href).toLowerCase();
            var classes = target && target.className ? String(target.className).toLowerCase() : "";
            if (hrefValue.indexOf("wa.me/") !== -1 || hrefValue.indexOf("api.whatsapp.com/send") !== -1) {
                return false;
            }
            if (hrefValue.indexOf("add-to-cart") !== -1 || hrefValue.indexOf("wc-ajax=add_to_cart") !== -1) {
                return true;
            }
            if (hrefValue.indexOf("/cart") !== -1 || hrefValue.indexOf("/checkout") !== -1 || hrefValue.indexOf("/my-account") !== -1) {
                return true;
            }
            if (classes.indexOf("add_to_cart_button") !== -1 || classes.indexOf("single_add_to_cart_button") !== -1 || classes.indexOf("checkout-button") !== -1 || classes.indexOf("button alt") !== -1) {
                return true;
            }
            return false;
        }

        function ibidStaticGoToWhatsapp(target) {
            var productName = ibidStaticGetProductName(target);
            var url = ibidStaticBuildWhatsappUrl(productName);
            window.location.href = url;
        }

        document.addEventListener("click", function(ev) {
            var target = ev.target && ev.target.closest ? ev.target.closest("a, button, input[type='submit']") : null;
            if (!target || !ibidStaticShouldRedirect(target)) {
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();
            ibidStaticGoToWhatsapp(target);
        }, true);

        document.addEventListener("submit", function(ev) {
            var form = ev.target;
            if (!form || !form.matches) {
                return;
            }
            if (form.matches("form.cart, form.variations_form, form.checkout, form.woocommerce-cart-form")) {
                ev.preventDefault();
                ev.stopPropagation();
                ibidStaticGoToWhatsapp(form);
            }
        }, true);
    }

    function ibidStaticImageRecovery() {
        function ibidStaticNormalizeUrl(url) {
            if (!url) {
                return "";
            }
            var value = String(url).trim();
            if (!value || value.indexOf("data:") === 0) {
                return value;
            }
            if (value.indexOf("://") !== -1) {
                return value.replace(/([^:])\/{2,}/g, "$1/");
            }
            return value.replace(/\/{2,}/g, "/");
        }

        function ibidStaticBuildImageCandidates(url) {
            var normalized = ibidStaticNormalizeUrl(url);
            var list = [];
            function add(v) {
                if (!v) {
                    return;
                }
                if (list.indexOf(v) === -1) {
                    list.push(v);
                }
            }
            add(normalized);
            var noQuery = normalized.split("?")[0].split("#")[0];
            var suffix = normalized.slice(noQuery.length);
            var withoutSize = noQuery.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, "");
            add(withoutSize + suffix);
            var extMatch = withoutSize.match(/\.([a-z0-9]+)$/i);
            if (extMatch) {
                var ext = extMatch[1].toLowerCase();
                var base = withoutSize.slice(0, -ext.length - 1);
                if (ext === "webp") {
                    add(base + ".jpg" + suffix);
                    add(base + ".jpeg" + suffix);
                    add(base + ".png" + suffix);
                } else if (ext === "jpg" || ext === "jpeg" || ext === "png") {
                    add(base + ".webp" + suffix);
                }
                if (withoutSize !== noQuery) {
                    add(base + "." + ext + suffix);
                }
            }
            return list;
        }

        function ibidStaticApplyLazySources(scope) {
            var root = scope || document;
            var imgs = root.querySelectorAll ? root.querySelectorAll("img") : [];
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                var src = img.getAttribute("src") || "";
                var lazySrc = img.getAttribute("data-src") || img.getAttribute("data-lazy-src") || "";
                if ((!src || src.indexOf("data:image") === 0) && lazySrc) {
                    img.setAttribute("src", ibidStaticNormalizeUrl(lazySrc));
                } else if (src) {
                    img.setAttribute("src", ibidStaticNormalizeUrl(src));
                }
                var srcset = img.getAttribute("srcset") || "";
                var lazySrcset = img.getAttribute("data-srcset") || img.getAttribute("data-lazy-srcset") || "";
                if ((!srcset || srcset.indexOf("data:image") === 0) && lazySrcset) {
                    img.setAttribute("srcset", ibidStaticNormalizeUrl(lazySrcset));
                }
                var isProductImage = img.classList && (img.classList.contains("attachment-woocommerce_thumbnail") || img.classList.contains("woo_secondary_media_image"));
                var insideProductCard = img.closest && img.closest(".products .product, .woocommerce ul.products li.product, .woo_catalog_media_images");
                if (isProductImage || insideProductCard) {
                    if (img.hasAttribute("srcset")) {
                        img.removeAttribute("srcset");
                    }
                    if (img.hasAttribute("sizes")) {
                        img.removeAttribute("sizes");
                    }
                    if (img.hasAttribute("data-srcset")) {
                        img.removeAttribute("data-srcset");
                    }
                    if (img.hasAttribute("data-lazy-srcset")) {
                        img.removeAttribute("data-lazy-srcset");
                    }
                }
            }
        }

        function ibidStaticTryNextImage(img) {
            if (!img || !img.getAttribute) {
                return;
            }
            var current = img.getAttribute("src") || "";
            var candidates = ibidStaticBuildImageCandidates(current);
            var triedRaw = img.getAttribute("data-ibid-static-img-tried") || "";
            var tried = triedRaw ? triedRaw.split("|") : [];
            for (var i = 0; i < candidates.length; i++) {
                var candidate = candidates[i];
                if (candidate && tried.indexOf(candidate) === -1 && candidate !== current) {
                    tried.push(candidate);
                    img.setAttribute("data-ibid-static-img-tried", tried.join("|"));
                    img.setAttribute("src", candidate);
                    return;
                }
            }
        }

        ibidStaticApplyLazySources(document);
        window.setTimeout(function() {
            ibidStaticApplyLazySources(document);
        }, 250);
        window.setTimeout(function() {
            ibidStaticApplyLazySources(document);
        }, 1200);

        document.addEventListener("error", function(ev) {
            var target = ev.target;
            if (target && target.tagName === "IMG") {
                ibidStaticTryNextImage(target);
            }
        }, true);
    }

    function ibidStaticRevSliderRecovery() {
        function ibidStaticRevNormalize(url) {
            if (!url) {
                return "";
            }
            return String(url).trim().replace(/\/{2,}/g, "/").replace(/^\.\/+/, "");
        }

        var lazyMap = {
            "wp-content/plugins/revslider/public/assets/assets/transparent.png": "wp-content/plugins/revslider/public/assets/assets/dummy.png",
            "wp-content/uploads/2020/02/art2.jpg": "wp-content/uploads/2024/02/PRIMEIRO-POST-BECO-STREET.jpg",
            "wp-content/uploads/2020/02/art1.jpg": "wp-content/uploads/2024/02/shell2-1174x500.jpg",
            "wp-content/uploads/2024/04/BORDALO.fw_.png": "wp-content/uploads/2024/02/shell2333-1138x500.jpg",
            "wp-content/uploads/2024/04/red-checker.webp": "wp-content/uploads/2024/02/FUNDO8c49.jpg",
            "wp-content/uploads/2024/04/tcheruggi-arocha.fw_.png": "wp-content/uploads/2024/02/IMG_4236-scaled.jpg",
            "wp-content/uploads/2024/04/shalak.fw_.png": "wp-content/uploads/2024/04/DSC05791.jpg"
        };
        var genericFallbacks = [
            "wp-content/uploads/2024/02/PRIMEIRO-POST-BECO-STREET.jpg",
            "wp-content/uploads/2024/02/shell2-1174x500.jpg",
            "wp-content/uploads/2024/02/shell2333-1138x500.jpg",
            "wp-content/uploads/2024/04/DSC05791.jpg"
        ];

        function remap(url) {
            var key = ibidStaticRevNormalize(url);
            if (lazyMap[key]) {
                return lazyMap[key];
            }
            return key;
        }

        function applyToSliderImages() {
            var imgs = document.querySelectorAll("rs-module-wrap img.rs-lazyload, rs-module-wrap img.tp-rs-img");
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                var lazy = img.getAttribute("data-lazyload");
                var remappedLazy = remap(lazy);
                if (lazy && remappedLazy !== lazy) {
                    img.setAttribute("data-lazyload", remappedLazy);
                }
                var src = img.getAttribute("src") || "";
                if (!src || src.indexOf("dummy.png") !== -1 || src.indexOf("transparent.png") !== -1) {
                    var preferred = remappedLazy || genericFallbacks[0];
                    img.setAttribute("src", preferred);
                } else {
                    img.setAttribute("src", remap(src));
                }
                var tried = img.getAttribute("data-ibid-slider-fallback-index");
                if (!tried) {
                    img.setAttribute("data-ibid-slider-fallback-index", "0");
                    img.addEventListener("error", function() {
                        var index = parseInt(this.getAttribute("data-ibid-slider-fallback-index") || "0", 10);
                        index += 1;
                        if (index < genericFallbacks.length) {
                            this.setAttribute("data-ibid-slider-fallback-index", String(index));
                            this.setAttribute("src", genericFallbacks[index]);
                        }
                    });
                }
            }
            var slides = document.querySelectorAll("rs-slide[data-thumb]");
            for (var j = 0; j < slides.length; j++) {
                var thumb = slides[j].getAttribute("data-thumb") || "";
                if (thumb.indexOf("modeltheme.com") !== -1 || thumb.indexOf("//") === 0) {
                    slides[j].setAttribute("data-thumb", genericFallbacks[j % genericFallbacks.length]);
                }
            }
        }

        function forceVisibleIfNeeded() {
            var wrappers = document.querySelectorAll("rs-module-wrap");
            for (var i = 0; i < wrappers.length; i++) {
                var w = wrappers[i];
                var visibility = window.getComputedStyle(w).visibility;
                if (visibility === "hidden") {
                    w.style.visibility = "visible";
                    w.style.opacity = "1";
                }
            }
        }

        function getSiteRootPrefix() {
            var scripts = document.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                var src = scripts[i].getAttribute("src") || "";
                var index = src.indexOf("/wp-content/themes/ibid/js/custom");
                if (index !== -1) {
                    return src.slice(0, index + 1);
                }
                if (src.indexOf("wp-content/themes/ibid/js/custom") !== -1) {
                    return "";
                }
            }
            return "";
        }

        function loadRevsliderAssetsIfNeeded(done) {
            var hasRev = window.jQuery && window.jQuery.fn && window.jQuery.fn.revolution;
            if (hasRev) {
                done();
                return;
            }
            if (window.__ibidRevsliderAssetsLoading) {
                window.setTimeout(function() {
                    loadRevsliderAssetsIfNeeded(done);
                }, 120);
                return;
            }
            window.__ibidRevsliderAssetsLoading = true;
            var prefix = getSiteRootPrefix();
            var urls = [
                prefix + "wp-content/plugins/revslider/public/assets/js/rbtools.minec8f.js?ver=6.6.20",
                prefix + "wp-content/plugins/revslider/public/assets/js/rs6.minec8f.js?ver=6.6.20"
            ];
            var cursor = 0;
            function next() {
                if (cursor >= urls.length) {
                    window.__ibidRevsliderAssetsLoading = false;
                    done();
                    return;
                }
                var url = urls[cursor];
                cursor += 1;
                var s = document.createElement("script");
                s.src = url;
                s.async = false;
                s.defer = false;
                s.onload = next;
                s.onerror = next;
                document.head.appendChild(s);
            }
            next();
        }

        function ensureInit() {
            var attempts = 0;
            function run() {
                attempts += 1;
                var module = window.RS_MODULES && window.RS_MODULES.modules && window.RS_MODULES.modules.revslider11;
                var hasRev = window.jQuery && window.jQuery.fn && window.jQuery.fn.revolution;
                if (module && typeof module.init === "function" && hasRev) {
                    try {
                        module.init();
                    } catch (e) {}
                    forceVisibleIfNeeded();
                    return;
                }
                if (attempts < 60) {
                    if (!hasRev && attempts === 2) {
                        loadRevsliderAssetsIfNeeded(function() {
                            window.setTimeout(run, 120);
                        });
                        return;
                    }
                    window.setTimeout(run, 250);
                } else {
                    forceVisibleIfNeeded();
                }
            }
            window.setTimeout(run, 150);
        }

        applyToSliderImages();
        window.setTimeout(applyToSliderImages, 400);
        window.setTimeout(applyToSliderImages, 1200);
        ensureInit();
    }

    function ibidStaticSimplifyToWhatsappOnly() {
        var fixedPhone = "5511994317886";
        function getProductNameFromTarget(target) {
            var singleTitle = document.querySelector(".product_title");
            if (singleTitle && singleTitle.textContent) {
                return singleTitle.textContent.trim();
            }
            var card = target && target.closest ? target.closest(".product, li.product, .products-wrapper .post, article.product") : null;
            if (card) {
                var title = card.querySelector(".woocommerce-loop-product__title, .woocommerce-loop-product__link, h2, h3, .product-title");
                if (title && title.textContent) {
                    return title.textContent.trim();
                }
            }
            var docTitle = document.title || "";
            docTitle = docTitle.replace(/\s*[\-\|–]\s*Beco Street.*$/i, "").trim();
            return docTitle || "X";
        }

        function buildUrl(name) {
            var message = "EU QUERO A OBRA " + name + " - +55 11 99431-7886";
            return "https://api.whatsapp.com/send?phone=" + encodeURIComponent(fixedPhone) + "&text=" + encodeURIComponent(message);
        }

        function injectStaticStyles() {
            var styleId = "ibid-static-storefront";
            if (document.getElementById(styleId)) {
                return;
            }
            var style = document.createElement("style");
            style.id = styleId;
            style.textContent = ""
                + "#modal-log-in,.popup.modeltheme-modal,.modeltheme-modal,.modeltheme-overlay,.fixed-search-overlay,.fixed-search-inside,.modeltheme-search{display:none !important;visibility:hidden !important;opacity:0 !important;pointer-events:none !important;}"
                + ".woocommerce ul.products li.product .products-wrapper{display:flex !important;flex-direction:column !important;height:auto !important;min-height:0 !important;overflow:hidden !important;border-radius:16px !important;}"
                + ".woocommerce ul.products li.product .thumbnail-and-details,.woocommerce ul.products li.product .woocommerce-title-metas,.woocommerce ul.products li.product .details-container{float:none !important;width:100% !important;height:auto !important;min-height:0 !important;}"
                + ".woocommerce ul.products li.product .archive-product-title{border-top:0 !important;padding:18px 18px 0 !important;margin:0 !important;}"
                + ".woocommerce ul.products li.product .details-container{padding:10px 18px 18px !important;overflow:visible !important;}"
                + ".woocommerce ul.products li.product .details-price-container{display:flex !important;flex-direction:column !important;gap:8px !important;}"
                + ".woocommerce ul.products li.product .woocommerce-product-details__short-description p{margin:0 !important;}"
                + ".woocommerce ul.products li.product .price{margin:0 !important;}"
                + ".woocommerce ul.products li.product .overlay-components,.woocommerce ul.products li.product .bottom-components,.woocommerce ul.products li.product .bottom-components-list,.woocommerce ul.products li.product .yith-wcwl-add-to-wishlist,.woocommerce ul.products li.product .yith-wcqv-button,.woocommerce ul.products li.product .compare.button{display:none !important;}"
                + ".ibid-static-buy-row{display:block !important;width:100% !important;margin-top:14px !important;}"
                + ".ibid-static-buy-now{display:block !important;width:100% !important;padding:14px 18px !important;border-radius:12px !important;background:#111 !important;color:#fff !important;text-align:center !important;font-size:14px !important;font-weight:700 !important;letter-spacing:.04em !important;text-transform:uppercase !important;line-height:1.2 !important;box-shadow:none !important;border:0 !important;}"
                + ".ibid-static-buy-now:hover{background:#2695FF !important;color:#fff !important;}"
                + "@media only screen and (max-width: 767px){"
                + "body .woocommerce ul.products li.product,body .woocommerce-page ul.products li.product{width:100% !important;margin:0 0 16px !important;padding:0 !important;height:auto !important;min-height:0 !important;}"
                + "body .woocommerce ul.products li.product .products-wrapper{margin-bottom:0 !important;}"
                + "body .woocommerce ul.products li.product .thumbnail-and-details,body .woocommerce ul.products li.product .woocommerce-title-metas,body .woocommerce ul.products li.product .details-container,body .woocommerce ul.products li.product .archive-product-title{width:100% !important;float:none !important;height:auto !important;min-height:0 !important;padding-bottom:0 !important;margin-bottom:0 !important;}"
                + "body .woocommerce ul.products li.product .archive-product-title{padding:16px 16px 0 !important;}"
                + "body .woocommerce ul.products li.product .details-container{padding:8px 16px 16px !important;}"
                + "body .woocommerce ul.products li.product .price{margin-bottom:0 !important;}"
                + "body .woocommerce ul.products li.product .products-wrapper a img{width:100% !important;}"
                + "}";
            document.head.appendChild(style);
        }

        function removeSlider() {
            var sliderNodes = document.querySelectorAll(".ibid_header_slider, .rs-p-wp-fix, rs-module-wrap, rs-module, rs-slides");
            for (var i = 0; i < sliderNodes.length; i++) {
                var node = sliderNodes[i];
                if (node && node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }
        }

        function hideEcommerceNoise() {
            var selectors = [
                ".component.wishlist",
                ".component.quick-view",
                ".yith-wcqv-button",
                ".wishlist",
                ".wishlist_products_counter",
                ".yith-wcwl-add-to-wishlist",
                ".yith-wcwl-wishlistaddedbrowse",
                ".yith-wcwl-wishlistexistsbrowse",
                ".header-cart",
                ".navbar-cart",
                ".shop_cart",
                ".cart-contents",
                ".header_mini_cart",
                ".menu-products",
                ".woocommerce-mini-cart",
                ".widget_shopping_cart",
                ".woocommerce-message",
                ".added_to_cart.wc-forward",
                ".woocommerce-tabs",
                ".product_meta",
                ".quantity",
                ".related.products",
                ".upsells.products",
                ".woocommerce-breadcrumb",
                ".mt-search-icon",
                "#ibid-search",
                ".fixed-search-overlay",
                ".fixed-search-inside",
                ".modeltheme-search",
                ".ibid-header-searchform",
                "form.woocommerce-product-search.menu-search",
                ".mobile_footer_icon_wrapper",
                ".popup.modeltheme-modal",
                ".modeltheme-modal",
                ".modeltheme-overlay",
                "#modal-log-in",
                "#popup-modal-wrapper",
                "[data-modal='modal-log-in']",
                "a[href*='/cart']",
                "a[href*='/wishlist']",
                "a[href*='/my-account']",
                "a[href*='/order-tracking']"
            ];
            for (var s = 0; s < selectors.length; s++) {
                var elements = document.querySelectorAll(selectors[s]);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = "none";
                }
            }
            var dropdownProfile = document.querySelector("#dropdown-user-profile");
            if (dropdownProfile) {
                dropdownProfile.style.display = "none";
            }
        }

        function normalizeProductCards() {
            var cards = document.querySelectorAll(".woocommerce ul.products li.product");
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                if (!card) {
                    continue;
                }
                var trash = card.querySelectorAll(".overlay-components, .bottom-components, .bottom-components-list, .component.wishlist, .component.quick-view, .yith-wcwl-add-to-wishlist, .yith-wcwl-wishlistaddedbrowse, .yith-wcwl-wishlistexistsbrowse, .ajax-loading, a.yith-wcqv-button");
                for (var t = 0; t < trash.length; t++) {
                    if (trash[t] && trash[t].parentNode) {
                        trash[t].parentNode.removeChild(trash[t]);
                    }
                }
                var actionLinks = card.querySelectorAll("a.add_to_cart_button, a.single_add_to_cart_button, a.button.product_type_simple, a.button.product_type_auction");
                for (var a = 0; a < actionLinks.length; a++) {
                    if (actionLinks[a].classList && actionLinks[a].classList.contains("ibid-static-buy-now")) {
                        continue;
                    }
                    if (actionLinks[a] && actionLinks[a].parentNode) {
                        actionLinks[a].parentNode.removeChild(actionLinks[a]);
                    }
                }
                var targetContainer = card.querySelector(".details-container") || card.querySelector(".woocommerce-title-metas") || card.querySelector(".products-wrapper");
                if (!targetContainer) {
                    continue;
                }
                var buyRow = card.querySelector(".ibid-static-buy-row");
                if (!buyRow) {
                    buyRow = document.createElement("div");
                    buyRow.className = "ibid-static-buy-row";
                    targetContainer.appendChild(buyRow);
                }
                var buyButton = buyRow.querySelector(".ibid-static-buy-now");
                if (!buyButton) {
                    buyButton = document.createElement("a");
                    buyButton.className = "button ibid-static-buy-now";
                    buyButton.setAttribute("target", "_blank");
                    buyButton.setAttribute("rel", "noopener");
                    buyRow.appendChild(buyButton);
                }
                var cardName = getProductNameFromTarget(card);
                buyButton.setAttribute("href", buildUrl(cardName));
                buyButton.setAttribute("data-tooltip", "Comprar Agora");
                buyButton.setAttribute("aria-label", "Comprar agora " + cardName);
                buyButton.textContent = "Comprar Agora";
            }
        }

        function removePopups() {
            var popupNodes = document.querySelectorAll(".popup.modeltheme-modal, .modeltheme-modal, .modeltheme-overlay, #modal-log-in, #popup-modal-wrapper, [data-modal='modal-log-in'], .dismiss, #exit-popup");
            for (var i = 0; i < popupNodes.length; i++) {
                var popupNode = popupNodes[i];
                if (popupNode && popupNode.parentNode) {
                    popupNode.parentNode.removeChild(popupNode);
                }
            }
        }

        function rewriteButtonsToWhatsapp() {
            var links = document.querySelectorAll("a.add_to_cart_button, a.single_add_to_cart_button, .bottom-components .component.add-to-cart a, .product .button.product_type_simple");
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var name = getProductNameFromTarget(link);
                var url = buildUrl(name);
                link.setAttribute("href", url);
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener");
                link.classList.add("ibid-static-buy-now");
                link.setAttribute("data-tooltip", "Comprar Agora");
                link.setAttribute("aria-label", "Comprar agora " + name);
                link.textContent = "Comprar Agora";
            }
            var formButtons = document.querySelectorAll("form.cart button.single_add_to_cart_button, form.cart button[name='add-to-cart']");
            for (var j = 0; j < formButtons.length; j++) {
                var btn = formButtons[j];
                var productName = getProductNameFromTarget(btn);
                var waUrl = buildUrl(productName);
                btn.setAttribute("type", "button");
                btn.classList.add("ibid-static-buy-now");
                btn.textContent = "Comprar Agora";
                btn.addEventListener("click", function(ev) {
                    ev.preventDefault();
                    var nm = getProductNameFromTarget(this);
                    window.open(buildUrl(nm), "_blank");
                });
            }
        }

        function fixMobileProductSpacing() {
            var styleId = "ibid-mobile-product-spacing-fix";
            if (!document.getElementById(styleId)) {
                var style = document.createElement("style");
                style.id = styleId;
                style.textContent = "@media only screen and (max-width: 767px){"
                    + "body .woocommerce ul.products li.product,"
                    + "body .woocommerce-page ul.products li.product{height:auto !important;min-height:0 !important;margin-bottom:12px !important;}"
                    + "body .woocommerce ul.products li.product .products-wrapper,"
                    + "body .woocommerce ul.products li.product .woocommerce-title-metas,"
                    + "body .woocommerce ul.products li.product .thumbnail-and-details,"
                    + "body .woocommerce ul.products li.product .details-container,"
                    + "body .woocommerce ul.products li.product .archive-product-title{height:auto !important;min-height:0 !important;padding-bottom:0 !important;margin-bottom:0 !important;}"
                    + "body .woocommerce ul.products li.product .bottom-components,"
                    + "body .woocommerce ul.products li.product .bottom-components-list{position:static !important;bottom:auto !important;margin-top:8px !important;}"
                    + "body .woocommerce ul.products li.product .overlay-components{display:none !important;}"
                    + "body .woocommerce ul.products li.product .price{margin-bottom:8px !important;}"
                    + "}";
                document.head.appendChild(style);
            }
            var elements = document.querySelectorAll(".woocommerce ul.products li.product, .woocommerce ul.products li.product .products-wrapper, .woocommerce ul.products li.product .woocommerce-title-metas, .woocommerce ul.products li.product .thumbnail-and-details, .woocommerce ul.products li.product .details-container, .woocommerce ul.products li.product .archive-product-title, .woocommerce ul.products li.product .bottom-components, .woocommerce ul.products li.product .bottom-components-list");
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.setProperty("height", "auto", "important");
                elements[i].style.setProperty("min-height", "0", "important");
                elements[i].style.setProperty("padding-bottom", "0", "important");
                elements[i].style.setProperty("margin-bottom", "0", "important");
            }
            if (window.innerWidth <= 767 && window.jQuery && window.jQuery.fn && window.jQuery.fn.matchHeight) {
                try {
                    window.jQuery(".products .product .woocommerce-title-metas").matchHeight({ remove: true });
                } catch (e) {}
            }
        }

        injectStaticStyles();
        removeSlider();
        removePopups();
        hideEcommerceNoise();
        normalizeProductCards();
        rewriteButtonsToWhatsapp();
        fixMobileProductSpacing();
        window.setTimeout(function() {
            removeSlider();
            removePopups();
            hideEcommerceNoise();
            normalizeProductCards();
            rewriteButtonsToWhatsapp();
            fixMobileProductSpacing();
        }, 600);
        window.setTimeout(function() {
            normalizeProductCards();
            fixMobileProductSpacing();
        }, 1400);
        window.setTimeout(function() {
            normalizeProductCards();
            fixMobileProductSpacing();
        }, 2600);
        var spacingObserver = new MutationObserver(function() {
            removePopups();
            hideEcommerceNoise();
            normalizeProductCards();
            rewriteButtonsToWhatsapp();
            fixMobileProductSpacing();
        });
        spacingObserver.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "class"] });
        window.addEventListener("resize", function() {
            fixMobileProductSpacing();
        });
    }

    ibidStaticWhatsappHandler();
    ibidStaticImageRecovery();
    ibidStaticSimplifyToWhatsappOnly();

    // add to global namespace
    window.UISearch = UISearch;

} )( window );
