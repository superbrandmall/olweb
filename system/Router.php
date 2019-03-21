<?php
$controller = null;
$getTarget = isset($_GET['p']) ? $_GET['p'] : null;
    
if (isset($_GET['p']) && (strpos($_GET['p'],'admin')) !== false) {
    $target = array(
        'admin/home' => array(
            'url' => 'default.php'
        ),
        'admin/login' => array(
            'url' => 'login.php'
        ),
        'admin/summary' => array(
            'url' => 'summary.php'
        ),
        'admin/merchants' => array(
            'url' => 'merchants.php'
        ),
        'admin/merchant' => array(
            'url' => 'merchant.php'
        ),
        'admin/merchant-tianyancha' => array(
            'url' => 'merchant_tianyancha.php'
        ),
        'admin/brands' => array(
            'url' => 'brands.php'
        ),
        'admin/brand' => array(
            'url' => 'brand.php'
        ),
        'admin/malls' => array(
            'url' => 'malls.php'
        ),
        'admin/mall' => array(
            'url' => 'mall.php'
        ),
        'admin/buildings' => array(
            'url' => 'buildings.php'
        ),
        'admin/building' => array(
            'url' => 'building.php'
        ),
        'admin/floors' => array(
            'url' => 'floors.php'
        ),
        'admin/floor' => array(
            'url' => 'floor.php'
        ),
        'admin/shops' => array(
            'url' => 'shops.php'
        ),
        'admin/shop' => array(
            'url' => 'shop.php'
        ),
        'admin/bids' => array(
            'url' => 'bids.php'
        ),
        'admin/bid' => array(
            'url' => 'bid.php'
        ),
        'admin/sync-hd' => array(
            'url' => 'sync_hd.php'
        ),
        'admin/users' => array(
            'url' => 'users.php'
        ),
        'admin/add-admin' => array(
            'url' => 'add_admin.php'
        ),
        'admin/roles' => array(
            'url' => 'roles.php'
        ),
        'admin/add-role' => array(
            'url' => 'add_role.php'
        ),
        'admin/apis' => array(
            'url' => 'apis.php'
        ),
        'admin/logout' => array(
            'url' => 'logout.php'
        )
    );
    
    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php','default.php','summary.php','merchant.php','merchants.php','brands.php','brand.php','malls.php','mall.php','buildings.php','building.php',
        'floors.php','floor.php','shops.php','shop.php','bids.php','bid.php','sync_hd.php','users.php','add_admin.php','roles.php','add_role.php','apis.php');
    if (in_array($page, $session_required)) {
        include_once 'models/admin/Session.class.php';
        $session = new Session();
        $session ->_session();
    }
} else {
    include ('MallCode.php');
    
    $target = array(
        'home' => array(
            'url' => 'default.php'
        ),
        strtolower($shanghai_sbm) => array(
            'url' => 'shanghai_sbm.php'
        ),
        'shop' => array(
            'url' => 'shop.php'
        ),
        'requirement' => array(
            'url' => 'requirement.php'
        ),
        'events' => array(
            'url' => 'events.php'
        ),
        'event' => array(
            'url' => 'event.php'
        )
    );
    
    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }
    
    $session_required = array('login.php','register.php','reserve.php','reserve_event.php','my_info.php','my_reservations.php','my_favourite.php');
    if (in_array($page, $session_required)) {
        include_once 'models/user/Session.class.php';
        $session = new Session();
        $session ->_session();
    }
}