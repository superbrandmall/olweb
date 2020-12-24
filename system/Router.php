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
        'v2/bill' => array(
            'url' => 'bill.php'
        ),
        'v2/engineering' => array(
            'url' => 'engineering.php'
        ),
        'v2/improve-info' => array(
            'url' => 'improve_info.php'
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
        'v2/unionpay' => array(
            'url' => 'unionpay.php'
        ),
        'v2/favourites' => array(
            'url' => 'my_favourites.php'
        ),
        'v2/category' => array(
            'url' => 'category.php'
        )
    );

    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php', 'info.php', 'contact.php', 'my_files.php', 'qa.php', 'my_msg.php', 'register.php', 'pay_done.php', 'my_reservation.php', 
        'advertising_shopping_cart.php', 'advertising_package.php', 'negotiation.php', 'all_orders.php', 'my_favourites.php', 'order_to_be_stamped.php', 
        'stamping.php', 'to_pay.php', 'bill.php', 'engineering.php', 'improve_info.php', 'company_info.php', 'contract.php','contract_view.php','unionpay.php');
    if (in_array($page, $session_required)) {
        include_once 'models/v2/Session.class.php';
        $session = new Session();
        $session->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'], 'brands-admin')) !== false) { // 品牌库
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