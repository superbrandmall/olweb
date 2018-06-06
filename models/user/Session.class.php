<?php
if (file_exists('system/BaseObject.php')) {
    include_once 'system/BaseObject.php';
} else if (file_exists('../../system/BaseObject.php')) {
    include_once '../../system/BaseObject.php';
} else {
    include_once '../../../system/BaseObject.php';
}
    
class Session extends BaseObject {
    public function _session() {
        if(strpos($_SERVER['REQUEST_URI'],'login') === FALSE) {
            $_SESSION['uri'] = $_SERVER['REQUEST_URI'];
        }
        
        if(!isset($_SESSION['user_login'])) { //用户没登录
            header("location: $this->domain/home?k=login");
            die();
        } else { //用户已登录
            if(isset($_GET['p']) && ($_GET['p'] == 'login' || $_GET['p'] == 'register')) {
                header("location: $this->domain/home");
                die();
            } /*else {
                if(isset($_SESSION['merchant_brand_count']) && $_SESSION['merchant_brand_count'] == null) {
                    header("location: $this->domain/home?k=register-step-2");
                    die();
                } else if(isset($_SESSION['merchant_brand_count']) && $_SESSION['merchant_brand_count'] == 0) {
                    header("location: $this->domain/home?k=register-step-3");
                    die();
                }
            }*/
        }
    }
}