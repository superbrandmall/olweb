<?php
use setasign\Fpdi\Fpdi;

require_once('../../fpdf/chinese.php');
require_once('../../fpdi2/src/autoload.php');

$name = $_POST['name'];
$company_name = $_POST['company_name'];
$uscc = $_POST['uscc'];
$register_address = $_POST['register_address'];
$identity_card_no = $_POST['identity_card_no'];
$contact_address = $_POST['contact_address'];
$contact_phone_1 = $_POST['contact_phone_1'];
$bank_name = $_POST['bank_name'];
$bank_card_no = $_POST['bank_card_no'];


// initiate FPDI
$pdf = new Fpdi();

$pdf->AddGBFont('simhei','黑体');
$pdf->SetFont('simhei', 'B', 10);

// get the page count
$pageCount = $pdf->setSourceFile('../../../upload/docs/leasing-template.pdf');
// iterate through all pages
for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
    // import a page
    $templateId = $pdf->importPage($pageNo);        
    $pdf->AddPage();
    
    // use the imported page and adjust the page size
    $pdf->useTemplate($templateId, ['adjustPageSize' => true]);

    if($pageNo == 1) {
        $pdf->SetXY(25, 70.5);
        $pdf->Write(0, iconv("utf-8","gbk",$company_name));

        $pdf->SetXY(35, 75.5);
        $pdf->Write(0, iconv("utf-8","gbk",$register_address));

        $pdf->SetXY(40, 80.5);
        $pdf->Write(0, iconv("utf-8","gbk",$identity_card_no));

        $pdf->SetXY(122, 80.5);
        $pdf->Write(0, iconv("utf-8","gbk",$bank_name));

        $pdf->SetXY(25, 85.5);
        $pdf->Write(0, iconv("utf-8","gbk",$contact_address));

        $pdf->SetXY(116, 85.5);
        $pdf->Write(0, iconv("utf-8","gbk",$bank_card_no));

        $pdf->SetXY(25, 90.5);
        $pdf->Write(0, iconv("utf-8","gbk",$contact_phone_1));

        $pdf->SetXY(136, 90.5);
        $pdf->Write(0, iconv("utf-8","gbk",$uscc));
    }
}

$pdf->Output($_SERVER['DOCUMENT_ROOT'] ."/pdf/".$name.".pdf",'F');