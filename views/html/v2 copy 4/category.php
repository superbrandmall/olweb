<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2/category-admin.js"></script>';
?>

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

<div class="page__bd" style="background: #0C31FA;">
    <div style="background: #0C31FA; margin-bottom: 40px;">
        <img src='/views/assets/base/img/content/backgrounds/judyhao.png' width="50px;" alt="" style="margin-top: 15px;margin-left: 15px;">
        <?php include ('timeline/step_two.php'); ?>
    </div>
    <div class="weui-form__text-area" style="color: #fff;">
        <h2 class="weui-form__title">请选择您的业态</h2>
    </div>
    <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells weui-cells_checkbox categories" style="background: #0C31FA;">
            <p class="weui-cell weui-cell_active"></p>
        </div>
    </div>
</div>

<div class="weui-btn-area">
    <button type="submit" class="weui-btn weui-btn_primary" id="confirm_category">确定</button>
</div>
<br><br><br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>