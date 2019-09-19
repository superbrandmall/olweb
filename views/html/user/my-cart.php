<?php
$scripts = $scripts . '<script type="text/javascript" src="views/assets/base/js/my-cart.js"></script>';
?>

<div class="c-layout-page">
    <div class="c-layout-breadcrumbs-1 c-fonts-uppercase c-fonts-bold" style="background-color: #f7fafb;">
        <div class="container">
            <div class="c-page-title c-pull-left">
                <h3 class="c-font-bold"><?= $lang['nav_cart'] ?></h3>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-md" style="margin-bottom: 0; padding: 30px 0;">
        <div class="container">
            <div class="c-shop-cart-page-1">
                <div class="row c-cart-table-title hidden-sm hidden-xs">
                    <div class="col-md-2 c-cart-image">
                        <h3 class="c-font-uppercase c-font-bold c-font-16 c-font-grey-2">店铺门图</h3>
                    </div>
                    <div class="col-md-3 c-cart-desc">
                        <h3 class="c-font-uppercase c-font-bold c-font-16 c-font-grey-2">招商详情</h3>
                    </div>
                    <div class="col-md-2 c-cart-ref">
                        <h3 class="c-font-uppercase c-font-bold c-font-16 c-font-grey-2">业态</h3>
                    </div>
                    <div class="col-md-3 c-cart-qty">
                        <h3 class="c-font-uppercase c-font-bold c-font-16 c-font-grey-2">商业项目</h3>
                    </div>
                    <div class="col-md-1 c-cart-price">
                        <h3 class="c-font-uppercase c-font-bold c-font-16 c-font-grey-2">租赁面积</h3>
                    </div>
                    <div class="col-md-1 c-cart-remove"></div>
                </div>
                <!-- BEGIN: SHOPPING CART ITEM ROW -->
                <div class="table-rows"></div>
                <!-- END: SHOPPING CART ITEM ROW -->

                <div class="row"></div>

                <div class="c-cart-buttons" style="margin: 20px 0;">
                    <a href="requirement" class="btn c-btn btn-lg c-btn-red c-btn-square c-font-white c-font-bold c-font-uppercase c-cart-float-l">继续逛逛</a>
                </div>
            </div>
        </div>
    </div>

    <div class="c-content-box c-size-md c-overflow-hide c-bs-grid-small-space">
        <div class="container">
            <div class="c-content-client-logos-slider-1 c-bordered" data-slider="owl" data-items="4" data-desktop-items="4" data-desktop-small-items="3" data-tablet-items="2" data-mobile-small-items="1" data-auto-play="5000">
                <div class="c-content-title-4">
                    <h1 class="c-font-uppercase c-center c-font-bold c-line-strike" style="position: relative; z-index: 1;"><span style="background-color: #fff;">推荐店铺</span></h1>
                </div>

                <div class="owl-carousel owl-theme c-theme owl-bordered1">
                    
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>