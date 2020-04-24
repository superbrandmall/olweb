<?php
require_once('../../TCPDF-master/tcpdf.php'); //引入库文件

$html = $_POST['html'];
$name = $_POST['name'];


$tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$tcpdf->SetFont('stsongstdlight', '', 20);
$tcpdf->SetTitle($name);
$tcpdf->AddPage();
$tcpdf->writeHTML($html);
$tcpdf->lastPage();
ob_clean();
$tcpdf->Output($_SERVER['DOCUMENT_ROOT'] ."/pdf/".$name.".pdf",'F');
exit();