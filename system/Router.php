<?php

$controller = null;
$getTarget = isset($_GET['p']) ? $_GET['p'] : null;

if (isset($_GET['p']) && (strpos($_GET['p'], 'ljz-admin')) !== false) { // 陆家嘴内部汇报
    $target = array(
        'ljz-admin/home' => array(
            'url' => 'default.php'
        ),
        'ljz-admin/login' => array(
            'url' => 'login.php'
        ),
        'ljz-admin/summary' => array(
            'url' => 'summary.php'
        ),
        'ljz-admin/logout' => array(
            'url' => 'logout.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php', 'summary.php');
    if (in_array($page, $session_required)) {
        include_once 'models/ljz-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'ly-admin')) !== false) { // 洛阳内部汇报
    $target = array(
        'ly-admin/home' => array(
            'url' => 'default.php'
        ),
        'ly-admin/login' => array(
            'url' => 'login.php'
        ),
        'ly-admin/summary' => array(
            'url' => 'summary.php'
        ),
        'ly-admin/logout' => array(
            'url' => 'logout.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php', 'summary.php');
    if (in_array($page, $session_required)) {
        include_once 'models/ly-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'bs-admin')) !== false) { // 宝山内部汇报
    $target = array(
        'bs-admin/home' => array(
            'url' => 'default.php'
        ),
        'bs-admin/login' => array(
            'url' => 'login.php'
        ),
        'bs-admin/summary' => array(
            'url' => 'summary.php'
        ),
        'bs-admin/logout' => array(
            'url' => 'logout.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php', 'summary.php');
    if (in_array($page, $session_required)) {
        include_once 'models/bs-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'hf-admin')) !== false) { // 合肥内部汇报
    $target = array(
        'hf-admin/home' => array(
            'url' => 'default.php'
        ),
        'hf-admin/login' => array(
            'url' => 'login.php'
        ),
        'hf-admin/summary' => array(
            'url' => 'summary.php'
        ),
        'hf-admin/logout' => array(
            'url' => 'logout.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php', 'summary.php');
    if (in_array($page, $session_required)) {
        include_once 'models/hf-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'v2-admin')) !== false) {
    $target = array(
        'v2-admin/home' => array(
            'url' => 'default.php'
        ),
        'v2-admin/login' => array(
            'url' => 'login.php'
        ),
        'v2-admin/logout' => array(
            'url' => 'logout.php'
        ),
        'v2-admin/brands' => array(
            'url' => 'brands.php'
        ),
        'v2-admin/brand' => array(
            'url' => 'brand.php'
        ),
        'v2-admin/malls' => array(
            'url' => 'malls.php'
        ),
        'v2-admin/mall' => array(
            'url' => 'mall.php'
        ),
        'v2-admin/buildings' => array(
            'url' => 'buildings.php'
        ),
        'v2-admin/building' => array(
            'url' => 'building.php'
        ),
        'v2-admin/floors' => array(
            'url' => 'floors.php'
        ),
        'v2-admin/floor' => array(
            'url' => 'floor.php'
        ),
        'v2-admin/shops' => array(
            'url' => 'shops.php'
        ),
        'v2-admin/shop' => array(
            'url' => 'shop.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php','logout.php','brands.php','brand.php',
        'malls.php','mall.php','buildings.php','building.php','floors.php','floor.php');

    if (in_array($page, $session_required)) {
        include_once 'models/v2-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'v2')) !== false) { // Ol 2.0
    $target = array(
        'v2/login' => array(
            'url' => 'login.php'
        ),
        'v2/home' => array(
            'url' => 'default.php'
        ),
        'v2/vr' => array(
            'url' => 'vr.php'
        ),
        'v2/info' => array(
            'url' => 'info.php'
        ),
        'v2/mall-list' => array(
            'url' => 'mall_list.php'
        ),
        'v2/contact' => array(
            'url' => 'contact.php'
        ),
        'v2/my-files' => array(
            'url' => 'my_files.php'
        ),
        'v2/my-reservation' => array(
            'url' => 'my_reservation.php'
        ),
        'v2/qa' => array(
            'url' => 'qa.php'
        ),
        'v2/my-msg' => array(
            'url' => 'my_msg.php'
        ),
        'v2/ljz' => array(
            'url' => 'ljz.php'
        ),
        'v2/ly' => array(
            'url' => 'ly.php'
        ),
        'v2/bs' => array(
            'url' => 'bs.php'
        ),
        'v2/xh' => array(
            'url' => 'xh.php'
        ),
        'v2/register' => array(
            'url' => 'register.php'
        ),
        'v2/events' => array(
            'url' => 'events.php'
        ),
        'v2/events-ly' => array(
            'url' => 'events_ly.php'
        ),
        'v2/events-bs' => array(
            'url' => 'events_bs.php'
        ),
        'v2/events-xh' => array(
            'url' => 'events_xh.php'
        ),
        'v2/event' => array(
            'url' => 'event.php'
        ),
        'v2/pay-done' => array(
            'url' => 'pay_done.php'
        ),
        'v2/leasing' => array(
            'url' => 'leasing.php'
        ),
        'v2/shop' => array(
            'url' => 'shop.php'
        ),
        'v2/ads' => array(
            'url' => 'ads.php'
        ),
        'v2/ads-ly' => array(
            'url' => 'ads_ly.php'
        ),
        'v2/ads-bs' => array(
            'url' => 'ads_bs.php'
        ),
        'v2/ads-xh' => array(
            'url' => 'ads_xh.php'
        ),
        'v2/ad' => array(
            'url' => 'ad.php'
        ),
        'v2/advertising-shopping-cart' => array(
            'url' => 'advertising_shopping_cart.php'
        ),
        'v2/advertising-package' => array(
            'url' => 'advertising_package.php'
        ),
        'v2/negotiation' => array(
            'url' => 'negotiation.php'
        ),
        'v2/all-orders' => array(
            'url' => 'all_orders.php'
        ),
        'v2/order-to-be-stamped' => array(
            'url' => 'order_to_be_stamped.php'
        ),
        'v2/stamping' => array(
            'url' => 'stamping.php'
        ),
        'v2/to-pay' => array(
            'url' => 'to_pay.php'
        ),
        'v2/order-details' => array(
            'url' => 'order_details.php'
        ),
        'v2/bill' => array(
            'url' => 'bill.php'
        ),
        'v2/bill2' => array(
            'url' => 'bill_2.php'
        ),
        'v2/engineering' => array(
            'url' => 'engineering.php'
        ),
        'v2/improve-info' => array(
            'url' => 'improve_info.php'
        ),
        'v2/improve-info2' => array(
            'url' => 'improve_info2.php'
        ),
        'v2/company-info' => array(
            'url' => 'company_info.php'
        ),
        'v2/contract' => array(
            'url' => 'contract.php'
        ),
        'v2/contract-view' => array(
            'url' => 'contract_view.php'
        ),
        'v2/contract-view2' => array(
            'url' => 'contract_view2.php'
        ),
        'v2/unionpay' => array(
            'url' => 'unionpay.php'
        ),
        'v2/favourites' => array(
            'url' => 'my_favourites.php'
        ),
        'v2/category' => array(
            'url' => 'category.php'
        ),
        'v2/alipay' => array(
            'url' => 'pay.htm'
        ),
        'v2/privacy' => array(
            'url' => 'privacy.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'info.php', 'contact.php', 'my_files.php', 'qa.php', 'my_msg.php', 'register.php', 'pay_done.php', 'my_reservation.php', 
        'advertising_shopping_cart.php', 'advertising_package.php', 'negotiation.php', 'all_orders.php', 'my_favourites.php', 'order_to_be_stamped.php', 
        'stamping.php', 'to_pay.php', 'order_details.php', 'bill.php', 'bill_2.php', 'engineering.php', 'improve_info.php', 'improve_info2.php', 'company_info.php',
        'contract.php', 'contract_view.php','contract_view2.php','unionpay.php');
    $page_nikola = array('default.php', 'login.php', 'ljz.php', 'xh.php', 'bs.php', 'ly.php');
    $page_no_landing = array('default.php', 'login.php');
    $page_no_footer = array('default.php', 'login.php', 'ljz.php','improve_info.php','improve_info2.php');
    
    if (in_array($page, $session_required)) {
        include_once 'models/v2/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'lotus-admin')) !== false) { // 莲花
    $target = array(
        'lotus-admin/home' => array(
            'url' => 'default.php'
        ),
        'lotus-admin/login' => array(
            'url' => 'login.php'
        ),
        'lotus-admin/logout' => array(
            'url' => 'logout.php'
        ),
        'lotus-admin/brands' => array(
            'url' => 'brands.php'
        ),
        'lotus-admin/create-brand' => array(
            'url' => 'create-brand.php'
        ),
        'lotus-admin/reset' => array(
            'url' => 'reset.php'
        ),
        'lotus-admin/mall' => array(
            'url' => 'mall.php'
        ),
        'lotus-admin/tenants' => array(
            'url' => 'tenants.php'
        ),
        'lotus-admin/create-tenant' => array(
            'url' => 'create-tenant.php'
        ),
        'lotus-admin/stores' => array(
            'url' => 'stores.php'
        ),
        'lotus-admin/requests' => array(
            'url' => 'requests.php'
        ),
        'lotus-admin/request-summary' => array(
            'url' => 'request-summary.php'
        ),
        'lotus-admin/contracts' => array(
            'url' => 'contracts.php'
        ),
        'lotus-admin/contract-summary' => array(
            'url' => 'contract-summary.php'
        ),
        'lotus-admin/contract-detail' => array(
            'url' => 'contract-detail.php'
        ),
        'lotus-admin/make-request' => array(
            'url' => 'make-request.php'
        ),
        'lotus-admin/users' => array(
            'url' => 'users.php'
        ),
        'lotus-admin/create-user' => array(
            'url' => 'create-user.php'
        ),
        'lotus-admin/edit-user' => array(
            'url' => 'edit-user.php'
        ),
        'lotus-admin/sales' => array(
            'url' => 'sales.php'
        ),
        'lotus-admin/dict' => array(
            'url' => 'dict.php'
        ),
        'lotus-admin/create-dict-type' => array(
            'url' => 'create-dict-type.php'
        ),
        'lotus-admin/create-dict-data' => array(
            'url' => 'create-dict-data.php'
        ),
        'lotus-admin/edit-dict-data' => array(
            'url' => 'edit-dict-data.php'
        ),
        'lotus-admin/pilot' => array(
            'url' => 'pilot.php'
        ),
        'lotus-admin/kow' => array(
            'url' => 'kow.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php', 'brands.php', 'create-brand.php', 'mall.php', 'tenants.php', 'create-tenant.php', 'stores.php', 'contracts.php', 'contract-summary.php', 'contract-detail.php',  
        'requests.php', 'request-summary.php', 'make-request.php', 'users.php', 'create-user.php', 'edit-user.php', 'sales.php', 'dict.php', 'create-dict-type.php', 'create-dict-data.php', 'edit-dict-data.php');
    if (in_array($page, $session_required)) {
        include_once 'models/lotus-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'lotus')) !== false) { // Lotus
    $target = array(
        'lotus/login' => array(
            'url' => 'login.php'
        ),
        'lotus/home' => array(
            'url' => 'default.php'
        ),
        'lotus/info' => array(
            'url' => 'info.php'
        ),
        'lotus/contact' => array(
            'url' => 'contact.php'
        ),
        'lotus/my-files' => array(
            'url' => 'my_files.php'
        ),
        'lotus/my-reservation' => array(
            'url' => 'my_reservation.php'
        ),
        'lotus/qa' => array(
            'url' => 'qa.php'
        ),
        'lotus/register' => array(
            'url' => 'register.php'
        ),
        'lotus/pay-done' => array(
            'url' => 'pay_done.php'
        ),
        'lotus/leasing' => array(
            'url' => 'leasing.php'
        ),
        'lotus/shop' => array(
            'url' => 'shop.php'
        ),
        'lotus/negotiation' => array(
            'url' => 'negotiation.php'
        ),
        'lotus/all-orders' => array(
            'url' => 'all_orders.php'
        ),
        'lotus/order-to-be-stamped' => array(
            'url' => 'order_to_be_stamped.php'
        ),
        'lotus/stamping' => array(
            'url' => 'stamping.php'
        ),
        'lotus/to-pay' => array(
            'url' => 'to_pay.php'
        ),
        'lotus/order-details' => array(
            'url' => 'order_details.php'
        ),
        'lotus/bill' => array(
            'url' => 'bill.php'
        ),
        'lotus/bill2' => array(
            'url' => 'bill_2.php'
        ),
        'lotus/improve-info' => array(
            'url' => 'improve_info.php'
        ),
        'lotus/improve-info2' => array(
            'url' => 'improve_info2.php'
        ),
        'lotus/company-info' => array(
            'url' => 'company_info.php'
        ),
        'lotus/contract' => array(
            'url' => 'contract.php'
        ),
        'lotus/contract-view' => array(
            'url' => 'contract_view.php'
        ),
        'lotus/contract-view2' => array(
            'url' => 'contract_view2.php'
        ),
        'lotus/unionpay' => array(
            'url' => 'unionpay.php'
        ),
        'lotus/favourites' => array(
            'url' => 'my_favourites.php'
        ),
        'lotus/alipay' => array(
            'url' => 'pay.htm'
        ),
        'lotus/privacy' => array(
            'url' => 'privacy.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'info.php', 'contact.php', 'my_files.php', 'qa.php', 'register.php', 'pay_done.php', 'my_reservation.php', 
        'negotiation.php', 'all_orders.php', 'my_favourites.php', 'order_to_be_stamped.php', 
        'stamping.php', 'to_pay.php', 'order_details.php', 'bill.php', 'bill_2.php', 'improve_info.php', 'improve_info2.php', 'company_info.php',
        'contract.php', 'contract_view.php','contract_view2.php','unionpay.php');
    
    if (in_array($page, $session_required)) {
        include_once 'models/lotus/Session.class.php';
        $session = new Session();
        $session->_session();
    }
}  else if (isset($_GET['p']) && (strpos($_GET['p'], 'brands-admin')) !== false) { // 品牌库
    $target = array(
        'brands-admin/home' => array(
            'url' => 'default.php'
        ),
        'brands-admin/login' => array(
            'url' => 'login.php'
        ),
        'brands-admin/logout' => array(
            'url' => 'logout.php'
        ),
        'brands-admin/brand' => array(
            'url' => 'brand.php'
        ),
        'brands-admin/create-brand' => array(
            'url' => 'create-brand.php'
        ),
        'brands-admin/create-brand-contact' => array(
            'url' => 'create-brand-contact.php'
        ),
        'brands-admin/edit-brand' => array(
            'url' => 'edit-brand.php'
        ),
        'brands-admin/reset' => array(
            'url' => 'reset.php'
        ),
        'brands-admin/levels' => array(
            'url' => 'levels.php'
        ),
        'brands-admin/log' => array(
            'url' => 'log.php'
        ),
        'brands-admin/hd-brands' => array(
            'url' => 'hd-brands.php'
        ),
        'brands-admin/ai-test' => array(
            'url' => 'ai-test.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'default.php', 'brand.php', 'create-brand.php', 'create-brand-contact.php', 'edit-brand.php', 'levels.php', 'hd-brands.php', 'log.php');
    if (in_array($page, $session_required)) {
        include_once 'models/brands-admin/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'portal')) !== false) { // 内部网站导航
    $target = array(
        'portal/1' => array(
            'url' => 'default.php'
        ),
        'portal/2' => array(
            'url' => 'default2.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'gateway')) !== false) { // Payment
    $target = array(
        'gateway/bank' => array(
            'url' => 'default.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
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
        strtolower($luoyang_sbm) => array(
            'url' => 'luoyang_sbm.php'
        ),
        strtolower($hefei_sbm) => array(
            'url' => 'hefei_sbm.php'
        ),
        strtolower($bs_tm) => array(
            'url' => 'baoshan_tm.php'
        ),
        'shop' => array(
            'url' => 'shop.php'
        ),
        'contact' => array(
            'url' => 'default.php'
        ),
        'requirement' => array(
            'url' => 'requirement.php'
        ),
        'events' => array(
            'url' => 'events.php'
        ),
        'event' => array(
            'url' => 'event.php'
        ),
        'co-work' => array(
            'url' => 'co-work.php'
        ),
        'sh-space' => array(
            'url' => 'sh-space.php'
        ),
        'ly-space' => array(
            'url' => 'ly-space.php'
        ),
        'room-type' => array(
            'url' => 'room-type.php'
        ),
        'about-us' => array(
            'url' => 'about-us.php'
        ),
        'join-us' => array(
            'url' => 'join-us.php'
        ),
        'contact-us' => array(
            'url' => 'contact-us.php'
        ),
        'ads' => array(
            'url' => 'ads.php'
        ),
        'login' => array(
            'url' => 'default.php'
        ),
        'logout' => array(
            'url' => 'logout.php'
        ),
        'my-cart' => array(
            'url' => 'my-cart.php'
        ),
        'gateway' => array(
            'url' => 'gateway/index.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        if ($_SERVER['SERVER_NAME'] == 'eatnwork-china.com' || $_SERVER['SERVER_NAME'] == 'www.eatnwork-china.com' || $_SERVER['SERVER_NAME'] == 'uat-ol.superbrandmall.com') {
            $page = 'co-work.php';
        } else {
            $page = 'default.php';
        }
    }

    $session_required = array('login.php', 'my-cart.php', 'contact.php');
    if (in_array($page, $session_required)) {
        include_once 'models/user/Session.class.php';
        $session = new Session();
        $session->_session();
    }
}