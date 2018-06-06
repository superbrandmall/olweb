<?php
if (file_exists('system/DB.php')) {
    include_once 'system/DB.php';
} else if (file_exists('../../system/DB.php')) {
    include_once '../../system/DB.php';
} else if (file_exists('../../../system/DB.php')) {
    include_once '../../../system/DB.php';
} else {
    include_once '../../../../system/DB.php';
}

abstract class BaseObject {
    static $abs_path;
    var $post = array();
    var $get = array();
    
    var $domain;
    
    public function __construct() {
        if(gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.15') {
            if(strpos($_SERVER['REQUEST_URI'],'admin') !== false) {
                $this->domain = 'http://10.130.12.15/admin';
            } else {
                $this->domain = 'http://10.130.12.15';
            }
        } else {
            if(strpos($_SERVER['REQUEST_URI'],'admin') !== false) {
                $this->domain = 'http://uat-ol.superbrandmall.com/admin';
            } else {
                $this->domain = 'http://uat-ol.superbrandmall.com';
            }
        }
    
        if(session_id() == '' || !isset($_SESSION)) {
            session_start();
        }
        self::$abs_path = dirname(dirname(__FILE__));

        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $this->post = $_POST;
            if(get_magic_quotes_gpc ()) {
                array_walk_recursive($this->post, array($this, 'stripslash_gpc'));
            }
        }
        $this->get = $_GET;
        array_walk_recursive($this->get, array($this, 'urldecode'));
    }
    
    private function stripslash_gpc(&$value) {
        $value = stripslashes($value);
    }

    private function htmlspecialcarfy(&$value) {
        $value = htmlspecialchars($value);
    }

    protected function urldecode(&$value) {
        $value = urldecode($value);
    }
}