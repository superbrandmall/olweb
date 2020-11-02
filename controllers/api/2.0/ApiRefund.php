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
$mail->Subject = 'Online Leasing退款申请';


/*
 * 
 * 
 * target_mall: target_mall,
            phone: $.cookie('uid'),
            bu: bu,
            outTrade: ot,
            contractNo: cn,
            orderStatus: os,
            tenantName: tn,
            tenantOrg: to
 * 
 * 
 * 
 * 
 */


if (!empty ($_POST['target_mall']) && !empty ($_POST['phone']) && !empty ($_POST['bu']) && !empty ($_POST['outTrade']) && !empty ($_POST['contractNo']) && !empty ($_POST['orderStatus']) && !empty ($_POST['tenantName']) && !empty ($_POST['tenantOrg'])) 
{
    $mail->addAddress('hao.xu@superbrandmall.com','customerservice');
    $mail->addAddress('jun.ma@superbrandmall.com','customerservice');
    
    $text = "租户交易号:" . $_POST['outTrade'] . "<br><br>订单状态:" . $_POST['orderStatus'] . "<br><br>合同号:" . $_POST['contractNo'] . "<br><br>商业项目:" . $_POST['target_mall'] . "<br><br>业务类别:" . $_POST['bu'] . "<br><br>租户名称:" . $_POST['tenantName'] . "<br><br>租户ID:" . $_POST['tenantOrg'] . "<br><br>联系电话:" . $_POST['phone'];
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
