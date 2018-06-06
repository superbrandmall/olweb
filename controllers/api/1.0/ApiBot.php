<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../../models/user/Session.class.php';
$session = new Session();
$session ->_session();

$txt = $_GET['txt'];
$func = $_GET['func'];

if(isset($txt) && $txt != '') {
    switch ($func) {
        case 'save_chats':
            $response = save_chats($txt);
            echo json_encode( $response );
            break;
        default:
            break;
    }
}

function save_chats($txt) {
    global $db;

    if($_SESSION['bot-round'] < 5){
        $_SESSION['chat'][$_SESSION['bot-round']] = $txt;
        $_SESSION['bot-round'] = $_SESSION['bot-round'] + 1;
    } else {
        for($i=0;$i<4;$i++){
            $_SESSION['chat'][$i] = $_SESSION['chat'][$i+1];
        }
        $_SESSION['chat'][4] = $txt;
    }
    
    
    return $_SESSION['chat'];
}