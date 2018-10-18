"use strict";
/**
Core layout handlers and component wrappers
**/

// BEGIN: Layout Brand
var LayoutBrand = function() {

    return {
        //main function to initiate the module
        init: function() {
            $('body').on('click', '.c-hor-nav-toggler', function() {
                var target = $(this).data('target');
                $(target).toggleClass("c-shown");
            });
        }

    };
}();
// END

// BEGIN: Layout Header
var LayoutHeader = function() {

    var _handleHeaderOnScroll = function() {
        if ($(window).scrollTop() > 60) {
            $("body").addClass("c-page-on-scroll");
        } else {
            $("body").removeClass("c-page-on-scroll");
        }
    }

    return {
        //main function to initiate the module
        init: function() {
            if ($('body').hasClass('c-layout-header-fixed-non-minimized')) {
                return; 
            }

            _handleHeaderOnScroll();

            $(window).scroll(function() {
                _handleHeaderOnScroll();
            });
        }
    };
}();
// END

// BEGIN: Layout Mega Menu
var LayoutMegaMenu = function() {

    return {
        //main function to initiate the module
        init: function() {
            $('.c-mega-menu').on('click', 'a.dropdown-toggle, .dropdown-submenu > a', function(e) {
                if (App.getViewPort().width < App.getBreakpoint('md')) {
                    e.preventDefault();
                    $(this).parent("li").toggleClass("c-open");
                }
            });
        }
    };
}();
// END

// BEGIN: Layout Mega Menu
var LayoutQuickSearch = function() {

    return {
        //main function to initiate the module
        init: function() {
            // desktop mode
            /*$('.c-layout-header').on('click', '.c-mega-menu .c-search-toggler', function(e) {
                e.preventDefault();

                $('body').addClass('c-layout-quick-search-shown');

                if (App.isIE() === false) {
                    $('.c-quick-search > .form-control').focus();
                }
            });*/

            // mobile mode
            /*$('.c-layout-header').on('click', '.c-brand .c-search-toggler', function(e) {
                e.preventDefault();

                $('body').addClass('c-layout-quick-search-shown');

                if (App.isIE() === false) {
                    $('.c-quick-search > .form-control').focus();
                }
            });*/

            // handle close icon for mobile and desktop
            /*$('.c-quick-search').on('click', '> span', function(e) {
                e.preventDefault();
                $('body').removeClass('c-layout-quick-search-shown');
            });*/
        }
    };
}();
// END

// BEGIN: Layout Mega Menu
var LayoutQuickSidebar = function() {

    return {
        //main function to initiate the module
        init: function() {
            // desktop mode
            $('.c-layout-header').on('click', '.c-mega-menu .c-quick-sidebar-toggler', function(e) {
                e.preventDefault();
                e.stopPropagation();

                if ($('body').hasClass("c-layout-quick-sidebar-shown")) {
                    $('body').removeClass("c-layout-quick-sidebar-shown");
                } else {
                    $('body').addClass("c-layout-quick-sidebar-shown");
                }
            });

            $('.c-layout-quick-sidebar').on('click', '.c-close', function(e) {
                e.preventDefault();

                $('body').removeClass("c-layout-quick-sidebar-shown");
            });

            $('.c-layout-quick-sidebar').on('click', function(e) {
                e.stopPropagation();
            });

            $(document).on('click', '.c-layout-quick-sidebar-shown', function(e) {
                $(this).removeClass("c-layout-quick-sidebar-shown");
            });
        }
    };
}();
// END

// BEGIN: Layout Go To Top
var LayoutGo2Top = function() {
    
    var handle = function() {
        var currentWindowPosition = $(window).scrollTop(); // current vertical position
        //if (currentWindowPosition > 300) {
            $(".c-layout-go2top").show();
        /*} else {
            $(".c-layout-go2top").hide();
        }*/
    };

    return {

         //main function to initiate the module
        init: function() {
            
            handle(); // call headerFix() when the page was loaded

            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                $(window).bind("touchend touchcancel touchleave", function(e) {
                    handle();
                });
            } else {
                $(window).scroll(function() {
                    handle();
                });
            }

            /*$(".c-layout-go2top").on('click', function(e) {
                //$(document).scrollTop( $("#intro").offset().top ); 
                var video = $('video').get(0);
                if (typeof(video.webkitEnterFullscreen) != "undefined") {
                    // This is for Android Stock.
                    video.webkitEnterFullscreen();
                } else if (typeof(video.webkitRequestFullscreen)  != "undefined") {
                    // This is for Chrome.
                    video.webkitRequestFullscreen();
                } else if (typeof(video.mozRequestFullScreen)  != "undefined") {
                    video.mozRequestFullScreen();
                }
                
            });*/
            
        }

    };
}();
// END: Layout Go To Top

// BEGIN: Home Page Partner Brands Carousel
var ContentOwlcarousel = function() {
    
    var _initInstances = function() {
        $("[data-slider='owl'] .owl-carousel").each(function() { 
            var parent = $(this).parent();

            var items;
            var itemsDesktop;
            var itemsDesktopSmall;
            var itemsTablet;
            var itemsTabletSmall;
            var itemsMobile;

            if (parent.attr("data-single-item") === "true") {
                items = 1;
                itemsDesktop = 1;
                itemsDesktopSmall = 1;
                itemsTablet = 1;
                itemsTabletSmall = 1;
                itemsMobile = 1;
            } else {
                items = parent.attr('data-items');
                itemsDesktop = [1199, parent.attr('data-desktop-items') ? parent.attr('data-desktop-items') : items];
                itemsDesktopSmall = [979, parent.attr('data-desktop-small-items') ? parent.attr('data-desktop-small-items') : 3];
                itemsTablet = [768, parent.attr('data-tablet-items') ? parent.attr('data-tablet-items') : 2];
                itemsMobile = [479, parent.attr('data-mobile-items') ? parent.attr('data-mobile-items') : 2];
            }

            $(this).owlCarousel({

                items: items,
                itemsDesktop: itemsDesktop,
                itemsDesktopSmall: itemsDesktopSmall,
                itemsTablet: itemsTablet,
                itemsTabletSmall: itemsTablet,
                itemsMobile: itemsMobile,
                stopOnHover: true,
                pagination: true,
                navigation : false,
                slideSpeed : parent.attr('data-slide-speed', 100),
                paginationSpeed : parent.attr('data-pagination-speed', 800),  
                singleItem: parent.attr("data-single-item") === "true" ? true : false,
                autoPlay: parent.attr("data-auto-play")
            });
        });
    };

    return {

         //main function to initiate the module
        init: function() {
            
            _initInstances();
        }

    };
}();
// END: Home Page Partner Brands Carousel

// BEGIN: ContentCubeLatestPortfolio
var ContentCubeLatestPortfolio = function() {

    var _initInstances = function() {

        // init cubeportfolio
        $('.c-content-latest-works').cubeportfolio({
            filters: '#filters-container',
            loadMore: '#loadMore-container',
            loadMoreAction: 'click',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'quicksand',
            gapHorizontal: 20,
            gapVertical: 23,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1100,
                cols: 6
            }, {
                width: 800,
                cols: 4
            }, {
                width: 500,
                cols: 3
            }, {
                width: 320,
                cols: 2
            }],
            caption: 'zoom',
            displayType: 'lazyLoading',
            displayTypeSpeed: 100,

            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

            // singlePage popup
            singlePageDelegate: '.cbp-singlePage',
            singlePageDeeplinking: true,
            singlePageStickyNavigation: true,
            singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
            singlePageCallback: function(url, element) {
                // to update singlePage content use the following method: this.updateSinglePage(yourContent)
                var t = this;

                $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'html',
                        timeout: 5000
                    })
                    .done(function(result) {
                        t.updateSinglePage(result);
                    })
                    .fail(function() {
                        t.updateSinglePage("Error! Please refresh the page!");
                    });
            }
        });

        $('.c-content-latest-works-fullwidth').cubeportfolio({
            filters: '#filters-container',
            loadMore: '#loadMore-container',
            loadMoreAction: 'auto',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'fadeOutTop',
            gapHorizontal: 0,
            gapVertical: 0,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1600,
                cols: 5
            }, {
                width: 1200,
                cols: 4
            }, {
                width: 800,
                cols: 3
            }, {
                width: 500,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            caption: 'zoom',
            displayType: 'lazyLoading',
            displayTypeSpeed: 100,

            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>'
        });
        
        $('#grid-container').cubeportfolio({
            filters: '#filters-container',
            loadMore: '#loadMore-container',
            loadMoreAction: 'click',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'quicksand',
            gapHorizontal: 35,
            gapVertical: 25,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1100,
                cols: 4
            }, {
                width: 800,
                cols: 3
            }, {
                width: 500,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            caption: 'zoom',
            displayType: 'lazyLoading',
            displayTypeSpeed: 100
        });

    };

    return {

         //main function to initiate the module
        init: function() {
            _initInstances();
        }

    };
}();
// END: ContentCubeLatestPortfolio

// BEGIN: CounterUp
var ContentCounterUp = function() {

    var _initInstances = function() {

        // init counter up
        $("[data-counter='counterup']").counterUp({
            delay: 10,
            time: 1000
        });
    };

    return {

         //main function to initiate the module
        init: function() {
            _initInstances();
        }

    };
}();
// END: CounterUp

// BEGIN: Fancybox
var ContentFancybox = function() {

    var _initInstances = function() {
        // init fancybox
        $("[data-lightbox='fancybox']").fancybox();
    };

    return {

         //main function to initiate the module
        init: function() {
            _initInstances();
        }

    };
}();
// END: Fancybox

// Main theme initialization
$(document).ready(function() {
    // init layout handlers 
    LayoutBrand.init();
    LayoutHeader.init();
    LayoutMegaMenu.init();
    LayoutQuickSearch.init();
    LayoutQuickSidebar.init();
    LayoutGo2Top.init();
    
    // init plugin wrappers    
    ContentOwlcarousel.init();
    ContentCubeLatestPortfolio.init();
    ContentCounterUp.init();
    ContentFancybox.init();
});