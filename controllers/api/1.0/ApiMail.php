<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../PHPMailer/Exception.php';
require '../../PHPMailer/PHPMailer.php';
require '../../PHPMailer/SMTP.php';

//PHPMailer core class
$mail = new PHPMailer();

//debug mode default off
$mail->SMTPDebug = 0;
 
//smtp auth
$mail->isSMTP();
//smtp auth true
$mail->SMTPAuth=true;
//smtp server
$mail->Host = 'exchange.superbrandmall.com';
//smtp ssl
//$mail->SMTPSecure = 'ssl';
//smtp port
$mail->Port = 25;
//smtp help message head
//$mail->Helo = 'Hello superbrandmall.com Server';
//domain name
$mail->Hostname = 'superbrandmall.com';
//character set
$mail->CharSet = 'UTF-8';
//sender alias
$mail->FromName = 'Online Leasing';
//smtp account
$mail->Username ='onlineleasing@superbrandmall.com';
//smtp password
$mail->Password = 'Qaz12345';
//sender address
$mail->From = 'onlineleasing@superbrandmall.com';
//format html or not
$mail->isHTML(true);
//rcpt address

//subject
$mail->Subject = 'Online Leasing Contact Form';



if (!empty ($_POST['brand_name']) && !empty ($_POST['email']) && !empty ($_POST['merchant_name']) && !empty ($_POST['phone']) && !empty ($_POST['modality_3']) && !empty ($_POST['user_name']) && !empty ($_POST['target_mall']) && !empty ($_POST['msg'])) 
{
    if($_POST['target_mall'] == 'OLMALL190117000001'){
        $mail->addAddress('Neoh.KC@superbrandmall.com','customerservice');
        $mail->addAddress('jun.liu@superbrandmall.com','customerservice');
        $mail->addAddress('jun.ma@superbrandmall.com','customerservice');
        $target = '洛阳正大国际广场';
    } else {
        $mail->addAddress('michael@superbrandmall.com','customerservice');
        $mail->addAddress('yan.song@superbrandmall.com','customerservice');
        $mail->addAddress('jun.ma@superbrandmall.com','customerservice');
        $target = '正大广场陆家嘴购物中心';
    }
    
    $text = "讯息:" . $_POST['msg'] . "<br><br>购物商场:" . $target . "<br><br>公司名:" . $_POST['merchant_name'] . "<br><br>业态:" . $_POST['modality_3'] . "<br><br>品牌名:" . $_POST['brand_name'] . "<br><br>联系人:" . $_POST['user_name'] . "<br><br>电话:" . $_POST['phone'] . "<br><br>邮箱:" . $_POST['email'];
}



//mail body
//$mail->Body = "this is a <b style=\"color:red;\">PHPMailer</b> sending test";
$mail->Body = $text;
//attechment

//$mail->addAttachment('./d.jpg','mm.jpg');
//send command
$status = $mail->send();
//$mail->send();
//send message
echo 'OK';

//else{
 //echo 'Error Info:'.$mail->ErrorInfo;
//}

?>
