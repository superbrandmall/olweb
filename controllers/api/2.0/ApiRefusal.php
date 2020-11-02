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
if($_POST['name'] == 2){
    $mail->Subject = 'Online Leasing 退款申请';
} else {
    $mail->Subject = 'Online Leasing 用户反馈';
}

if (!empty ($_POST['storeCode']) && !empty ($_POST['unitCode']) && !empty ($_POST['mobileNo']) && !empty ($_POST['date'])) 
{
    if($_POST['storeCode'] == 'OLMALL180917000003'){
        $target = '上海陆家嘴正大广场';
    } else if($_POST['target_mall'] == 'OLMALL190117000001'){
        $target = '河南洛阳正大广场';
    } else if($_POST['target_mall'] == 'OLMALL180917000002'){
        $target = '上海宝山正大乐城';
    } else {
        $target = '上海徐汇正大乐城';
    }
    
    if($_POST['name'] == 0){
        $name = '铺位报价';
    } else if($_POST['name'] == 1){
        $name = '合同条款';
    } else if($_POST['name'] == 2){
        $name = '申请退款';
    } else{
        $name = '乙方签约中';
    }
    
    $mail->addAddress('jun.ma@superbrandmall.com','Online Leasing 用户反馈');
    $text = "日期: " . $_POST['date'] . "<br><br>手机号码: " . $_POST['mobileNo'] . "<br><br>反馈阶段: " . $name . "<br><br>项目名称: " . $target . "<br><br>单元号: " . $_POST['unitCode'] . "<br><br>合同年限: " . $_POST['yearsReason'] . "<br><br>合同条款: " . $_POST['termReason'] . "<br><br>租金: " . $_POST['rentReason'] . "<br><br>扣率: " . $_POST['deductReason'] . "<br><br>其他: " . $_POST['reason'] . "";
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
