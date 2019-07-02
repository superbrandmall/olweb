<?php
$controller = null;
$getTarget = isset($_GET['p']) ? $_GET['p'] : null;
    
if (isset($_GET['p']) && (strpos($_GET['p'],'ljz-admin')) !== false) { // 陆家嘴内部汇报
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

    $session_required = array('login.php','default.php','summary.php');
    if (in_array($page, $session_required)) {
        include_once 'models/ljz-admin/Session.class.php';
        $session = new Session();
        $session ->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'],'ly-admin')) !== false) { // 洛阳内部汇报
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

    $session_required = array('login.php','default.php','summary.php');
    if (in_array($page, $session_required)) {
        include_once 'models/ly-admin/Session.class.php';
        $session = new Session();
        $session ->_session();
    }
} else if (isset($_GET['p']) && (strpos($_GET['p'],'brands-admin')) !== false) { // 品牌库
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
        'brands-admin/brands' => array(
            'url' => 'brands.php'
        ),
        'brands-admin/brand' => array(
            'url' => 'brand.php'
        ),
        'brands-admin/create-brand' => array(
            'url' => 'create-brand.php'
        ),
        'brands-admin/users' => array(
            'url' => 'users.php'
        ),
        'brands-admin/user' => array(
            'url' => 'user.php'
        ),
        'brands-admin/reset' => array(
            'url' => 'reset.php'
        )
    );
    
    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        $page = 'default.php';
    }

    $session_required = array('login.php','default.php','brands.php','brand.php','create-brand.php','user.php','users.php');
    if (in_array($page, $session_required)) {
        include_once 'models/brands-admin/Session.class.php';
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
        strtolower($luoyang_sbm) => array(
            'url' => 'luoyang_sbm.php'
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
        'test' => array(
            'url' => 'test.php'
        )
    );
    
    if (array_key_exists($getTarget, $target)) {
        $page = $target[$getTarget]['url'];
    } else {
        if($_SERVER['SERVER_NAME'] == 'eatnwork-china.com' || $_SERVER['SERVER_NAME'] == 'www.eatnwork-china.com' || $_SERVER['SERVER_NAME'] == 'uat-ol.superbrandmall.com'){
            $page = 'co-work.php';
        } else {
            $page = 'default.php';
        }
    }
    
    $session_required = array('contact.php');
    if (in_array($page, $session_required)) {
        include_once 'models/user/Session.class.php';
        $session = new Session();
        $session ->_session();
    }
}