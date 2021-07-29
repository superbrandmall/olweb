<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/nikola/bootstrap.bundle.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/nikola/blocs.min.js"></script>
                    <script type="text/javascript" src="/views/assets/base/js/v2/category-admin.js"></script>';
?>

<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/views/assets/base/css/nikola.css" />

<style>
    .categories {
        padding: 0 15px;
    }
    
    .categories > div {
        position: relative;
        margin: 10px auto;
    }
    
    .categories p {
        line-height: 2em;
        margin: 0;
        position: relative;
        top: 0;
    }
    
    .categories p span {
        display: inline-block;
        padding: 0 10px;
    }
    
    .categories ul {
        list-style: none;
        margin: 0;
        overflow: auto;
        padding: 0;
    }
    
    .categories ul li {
        line-height: 2.5em;
        padding: 0 5px;
        margin: 10px 2px;
    }
    
    .categories li.label.active {
        background-color: #FF6600;
        border-color: #FF6600 !important;
        color: #FFF !important;
    }
</style>

<div class="page__bd">
    <div class="weui-form__text-area" style="margin: 20px 0;">
        <h2 class="weui-form__title">请选择您的业态</h2>
    </div>
    <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells weui-cells_checkbox categories"></div>
    </div>
</div>

<div class="weui-btn-area">
    <button type="submit" class="weui-btn btn-primary" id="confirm_category" style="border-radius: 20px;">确定</button>
</div>
<br><br><br>

<?php include ('timeline/step_two.php'); ?>
<?php include ('footer.php'); ?>