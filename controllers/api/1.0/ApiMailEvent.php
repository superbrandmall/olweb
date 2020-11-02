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
$mail->Host = 'smtp.partner.outlook.cn';
//smtp ssl
$mail->SMTPSecure = 'STARTTLS';
//smtp port
$mail->Port = 587;
//smtp help message head
//$mail->Helo = 'Hello superbrandmall.com Server';
//domain name
$mail->Hostname = 'outlook.cn';
//character set
$mail->CharSet = 'UTF-8';
//sender alias
$mail->FromName = 'Online Leasing';
//smtp account
$mail->Username ='onlineleasing_send@superbrandmall.com';
//smtp password
$mail->Password = 'Qaz!2345';
//sender address
$mail->From = 'onlineleasing_send@superbrandmall.com';
//format html or not
$mail->isHTML(true);
//rcpt address

//subject
$mail->Subject = 'Online Leasing 场地活动需求';



if (!empty ($_POST['user_name']) && !empty ($_POST['phone']) && !empty ($_POST['event_time']) && !empty ($_POST['event_theme']) && !empty ($_POST['target'])) 
{
    //$mail->addAddress('miao.bing@superbrandmall.com','customerservice');
    $mail->addAddress('jun.ma@superbrandmall.com','customerservice');
    $text = "姓名:" . $_POST['user_name'] . "<br><br>电话:" . $_POST['phone'] . "<br><br>计划活动时间:" . $_POST['event_time'] . "<br><br>活动主题:" . $_POST['event_theme'] . "<br><br>意向场地:" . $_POST['target'] . "<br><br>其他需求:" . $_POST['other_requirements'];
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
