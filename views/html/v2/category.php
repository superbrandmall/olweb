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
        float: left;
        line-height: 2em;
        padding: 0 5px;
        margin: 0 5px 10px;
    }
    
    .categories li.label.active {
        background-color: #FF6600;
        border-color: #FF6600 !important;
        color: #FFF !important;
    }
</style>

<div class="page__bd">
    <div class="weui-form__text-area" style="margin: 20px 0;">
        <h2 class="weui-form__title">请选择业态</h2>
    </div>
    <div class="categories">
        <div>
            <p>
                <span>女鞋</span>
            </p>
            <ul>
                <li class="label f-green b-green">设计师</li>
                <li class="label f-green b-green">商务/通勤</li>
                <li class="label f-green b-green">潮流休闲</li>
                <li class="label f-green b-green">买手/集合店/其他</li>
            </ul>
        </div>
        <div>
            <p>
                <span>女包</span>
            </p>
            <ul>
                <li class="label f-blue b-blue">设计师</li>
                <li class="label f-blue b-blue">商务/通勤</li>
                <li class="label f-blue b-blue">潮流休闲</li>
                <li class="label f-blue b-blue">买手/集合店/其他</li>
            </ul>
        </div>
        <div>
            <p>
                <span>女性发饰/耳饰/首饰</span>
            </p>
            <ul>
                <li class="label f-green b-green">水晶/锆石</li>
                <li class="label f-green b-green">银饰</li>
                <li class="label f-green b-green">K金首饰/其他</li>
            </ul>
        </div>
        <div>
            <p>
                <span>女性眼镜</span>
            </p>
            <ul>
                <li class="label f-blue b-blue">自主设计</li>
                <li class="label f-blue b-blue">买手/集合店/其他</li>
            </ul>
        </div>
        <div>
            <p>
                <span>女性帽子/手套/围巾/丝巾/袜子</span>
            </p>
            <ul>
                <li class="label f-green b-green">帽子/手套/围巾/丝巾/袜子/其他</li>
            </ul>
        </div>
        <div>
            <p>
                <span>美妆个护</span>
            </p>
            <ul>
                <li class="label f-blue b-blue">护肤/身体护理</li>
                <li class="label f-blue b-blue">彩妆</li>
                <li class="label f-blue b-blue">香氛香薰/其他</li>
            </ul>
        </div>
    </div>
</div>

<div class="weui-btn-area">
    <button type="submit" class="weui-btn weui-btn_primary" id="confirm_category">确定</button>
</div>
<br><br><br>

<?php include ('menu_bottom.php'); ?>
<?php include ('footer.php'); ?>