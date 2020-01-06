<?php
abstract class BaseObject {
    static $abs_path;
    var $post = array();
    var $get = array();
    
    var $domain;
    
    public function __construct() {
        if(gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.15') {
            if(strpos($_SERVER['REQUEST_URI'],'ljz-admin') !== false) {
                $this->domain = 'http://10.130.12.15/ljz-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'ly-admin') !== false) {
                $this->domain = 'http://10.130.12.15/ly-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'bs-admin') !== false) {
                $this->domain = 'http://10.130.12.15/bs-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'brands-admin') !== false) {
                $this->domain = 'http://10.130.12.15/brands-admin';
            } else {
                $this->domain = 'http://10.130.12.15';
            }
        } else if(gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.41' || gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.45') {
            if(strpos($_SERVER['REQUEST_URI'],'ljz-admin') !== false) {
                $this->domain = 'http://uat-ol.superbrandmall.com/ljz-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'ly-admin') !== false) {
                $this->domain = 'http://uat-ol.superbrandmall.com/ly-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'bs-admin') !== false) {
                $this->domain = 'http://uat-ol.superbrandmall.com/bs-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'brands-admin') !== false) {
                $this->domain = 'http://uat-ol.superbrandmall.com/brands-admin';
            } else {
                $this->domain = 'http://uat-ol.superbrandmall.com';
            }
        } else {
            if(strpos($_SERVER['REQUEST_URI'],'ljz-admin') !== false) {
                $this->domain = 'http://ol.superbrandmall.com/ljz-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'ly-admin') !== false) {
                $this->domain = 'http://ol.superbrandmall.com/ly-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'bs-admin') !== false) {
                $this->domain = 'http://ol.superbrandmall.com/bs-admin';
            }else if(strpos($_SERVER['REQUEST_URI'],'brands-admin') !== false) {
                $this->domain = 'http://ol.superbrandmall.com/brands-admin';
            } else if(strpos($_SERVER['REQUEST_URI'],'portal') !== false) {
                $this->domain = 'http://ol.superbrandmall.com/portal';
            } else {
                $this->domain = 'http://ol.superbrandmall.com';
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