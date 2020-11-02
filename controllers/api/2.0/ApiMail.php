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
$mail->Subject = 'Online Leasing Contact Form';



if (!empty ($_POST['bu']) && !empty ($_POST['phone']) && !empty ($_POST['target_mall']) && !empty ($_POST['contact_msg'])) 
{
    if($_POST['target_mall'] == 'OLMALL180917000003'){
        $target = '正大广场陆家嘴购物中心';
    } else if($_POST['target_mall'] == 'OLMALL190117000001'){
        $target = '洛阳正大国际广场';
    } else if($_POST['target_mall'] == 'OLMALL180917000002'){
        $target = '正大乐城宝山购物中心';
    } else {
        $target = '徐汇正大乐城';
    }
    
    $mail->addAddress('jun.ma@superbrandmall.com','customerservice');
    
    $text = "讯息:" . $_POST['contact_msg'] . "<br><br>购物商场:" . $target . "<br><br>业务:" . $_POST['bu'] . "<br><br>电话:" . $_POST['phone'];
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
