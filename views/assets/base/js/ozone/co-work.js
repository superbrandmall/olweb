// BEGIN: OzoneOwlcarousel
var Ozone1Owlcarousel = function() {
    
    var _initInstances = function() {
        $("[data-slider='owl1'] .owl-carousel").each(function() { 
            var parent = $(this).parent();

            var items;
            var itemsDesktop;
            var itemsDesktopSmall;
            var itemsTablet;
            var itemsTabletSmall;
            var itemsMobile;

            if (parent.attr("data-single-item") == "true") {
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
                itemsMobile = [479, parent.attr('data-mobile-items') ? parent.attr('data-mobile-items') : 1];
            }

            $(this).owlCarousel({

                items: items,
                itemsDesktop: itemsDesktop,
                itemsDesktopSmall: itemsDesktopSmall,
                itemsTablet: itemsTablet,
                itemsTabletSmall: itemsTablet,
                itemsMobile: itemsMobile,
                
                navigation : false,
                slideSpeed : parent.attr('data-slide-speed', 400),
                paginationSpeed : parent.attr('data-pagination-speed', 800),  
                singleItem: parent.attr("data-single-item") == "true" ? true : false,
                autoPlay: parent.attr("data-auto-play"),
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
// END: OwlCarousel

// BEGIN: ContentCubeWorldsFoods
var ContentCubeWorldsFoods = function() {

    var _initInstances = function() {

        // init cubeportfolio
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
// END: ContentCubeWorldsFoods



$(document).ready(function() {    
    Ozone1Owlcarousel.init();
    ContentCubeWorldsFoods.init();

    $('#country_selection li a').each(function(i,elem){
        $(this).click(function (e) {
            e.preventDefault();
            if($(this).find('img').length > 0){
                $('#country_flag').show().attr('src', $(this).find('img').attr('src'));
            } else {
                 $('#country_flag').hide();
            }
            $('#country_code').text($(this).text());
        });
    });
    
    
});