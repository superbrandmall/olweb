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
        if(!isset($_SESSION['uid'])) {
            if(isset($_GET['p']) && $_GET['p'] != 'v2/login') {
                if (explode('?', $_SERVER['REQUEST_URI'])[1] != null) {
                    $param = '?'.explode('?', $_SERVER['REQUEST_URI'])[1];
                } else {
                    $param = '';
                }

                header("location: $this->domain/login".$param);
                die();
            }
        } else {
            if(isset($_GET['p']) && $_GET['p'] == 'v2/login') {
                header("location: $this->domain/default".$param);
                die();
            }
        }
    }
}