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
$mail->Subject = '正大商业地产Online Leasing付款信息';



if (!empty ($_POST['amount']) && !empty ($_POST['unit']) && !empty ($_POST['email']) && !empty ($_POST['mobile']) && !empty ($_POST['outTrade'])) 
{
    $mail->addAddress($_POST['email'],'正大商业地产Online Leasing付款信息');
    $text = "商户交易号:" . $_POST['outTrade'] . "<br><br>待付款金额:" . $_POST['amount'] . "元<br><br>单元:" . $_POST['unit'] . "<br><br>支付链接: https://ol.superbrandmall.com/gateway?mobile=".$_POST['mobile']."&trade=".$_POST['outTrade']. "<br><br>目前银联支持的企业网上银行(网银)有平安银行、华夏银行、招商银行、光大银行和民生银行，"
            . "您也可以凭账单信息通过其它网银转账，收款信息如下:<br><br>收款人户名: 上海帝泰发展有限公司<br><br>收款人账号: 310066030018170043300<br><br>开户行名称: 交通银行上海虹口支行" ;
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
