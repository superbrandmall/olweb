<?php
if (explode('type=', $_SERVER['REQUEST_URI'])[1] != null) {
    $attr = explode('type=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($attr, '&') !== false) {
        $type = explode('&',$attr)[0];
    } else {
        $type = $attr;
    }
} else {
    $type = '';
}

switch ($type) {
   case "leasing":
     $choose = "Retail Stores";
     break;
   case "events":
     $choose = "Event Venues";
     break;
   case "ads":
     $choose = "Advertising Space";
     break;
   case "ad":
     $choose = "Advertising Space";
     break;
   case "ad-package":
     $choose = "Advertising Space";
     break;
   default:
     $choose = "Retail Stores";
}
?>

<div class="timeline_btn">
    <i class="fa fa-cog fa-spin fa-fw"></i> 2/5
</div>

<div id="timeline">
    <ul>
        <li class="timeline-item">
            <div class="timeline-item-color timeline-item-head"></div>
            <div class="timeline-item-tail"></div>
            <div class="timeline-item-content"><h4> 1.介绍</h4>
                <p>Introduction</p></div>
        </li>
        <li class="timeline-item">
            <div class="timeline-item-color timeline-item-head-first">
                <i class="timeline-item-checked weui-icon-success-no-circle"></i>
            </div>
            <div class="timeline-item-tail"></div>
            <div class="timeline-item-content"><h4 class="recent">2.选择</h4>
                <p class="recent"><?php echo $choose; ?></p></div>
        </li>
        <li class="timeline-item">
            <div class="timeline-item-color timeline-item-head"></div>
            <div class="timeline-item-tail"></div>
            <div class="timeline-item-content"><h4> 3.下单</h4>
                <p>Ordering</p></div>
        </li>
        <li class="timeline-item">
            <div class="timeline-item-color timeline-item-head"></div>
            <div class="timeline-item-tail"></div>
            <div class="timeline-item-content"><h4> 4.签约</h4>
                <p>Contract</p></div>
        </li>
        <li class="timeline-item">
            <div class="timeline-item-color timeline-item-head"></div>
            <div class="timeline-item-tail hide"></div>
            <div class="timeline-item-content"><h4> 5.付款</h4>
                <p>Payment</p></div>
        </li>
    </ul>
</div>