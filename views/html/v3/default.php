<?php

function query_encode($sQuery) {
    if (strlen($sQuery) == 0) {
        return '';
    } else {
        $s_tem = preg_replace("/&/i", '&', $sQuery);
        $s_tem = preg_replace("/&/i", '&', $s_tem);
        $a_tem = explode('&', $s_tem);
        shuffle($a_tem);
        $s_tem = implode('&', $a_tem);
        $s_tem = rawurlencode($s_tem);
        $s_tem = base64_encode($s_tem);
        $s_tem = strrev($s_tem);
        return $s_tem;
    }
}
?>
<div class="near-box">
    <div class="yx-index-top">
        <div class="index-top-box1">
            <span class="index-top-img1"><img src="/views/assets/base/img/content/backgrounds/oll.png" style="width: 50px;" alt=""></span>
        </div>
        <div class="index-top-box2">
            <span class="fresh-toptext1">线上租</span>
            <span class="fresh-topimg1"></span>
        </div>
        <a href="./search.html" class="index-top-box1">
            <span class="index-top-img1"><img src="/views/assets/base/img/content/v3/search3.png" alt=""></span>
            <span class="index-top-text1">搜索</span>
        </a>
    </div>
    <div class="index-bigbox">
        <div id="slideBox" class="slideBox">
            <div class="bd" id="bd">
                <ul>
                    <li>
                        <a class="pic" href="#"><img src="/views/assets/base/img/content/backgrounds/oll-banner-1.jpg"/></a>
                    </li>
                    <li>
                        <a class="pic" href="#"><img src="/views/assets/base/img/content/backgrounds/oll-banner-2.jpg"/></a>
                    </li>
                </ul>
            </div>
            <div class="hd">
                <ul></ul>
            </div>
        </div>
        <div class="brand-box1">
            <span class="brand-text1">正大广场</span>
            <span class="brand-img1"></span>
        </div>
        <div class="special-sale-box1">
            <a href="/v2/ljz" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/1s.jpg" alt="">
                <span class="classify-menu-text1">上海浦东</span>
            </a>
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/2s.jpg" alt="">
                <span class="classify-menu-text1">河南洛阳</span>
            </a>
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/3s.jpg" alt="">
                <span class="classify-menu-text1">安徽合肥</span>
            </a>
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/9s.jpg" alt="">
                <span class="classify-menu-text1">浙江乐清</span>
            </a>
        </div>

        <div class="brand-box1">
            <span class="brand-text1">正大乐城</span>
            <span class="brand-img1"></span>
        </div>
        <div class="special-sale-box1">
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/4s.jpg" alt="">
                <span class="classify-menu-text1">上海徐汇</span>
            </a>
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/5s.jpg" alt="">
                <span class="classify-menu-text1">上海宝山</span>
            </a>
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/7s.jpg" alt="">
                <span class="classify-menu-text1">江苏无锡</span>
            </a>
            <a href="#" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/6s.jpg" alt="">
                <span class="classify-menu-text1">河南郑州</span>
            </a>
        </div>

        <div class="special-sale-banner">
            <img src="/views/assets/base/img/content/v3/slogan.jpg" alt="">
        </div>
        <div class="brand-box1">
            <span class="brand-text1">卜蜂莲花</span>
            <span class="brand-img1"></span>
        </div>
        <div class="special-sale-box1">
            <a href="/v3/lotus-list?id=SC011&name=<?= query_encode('上海杨高北路') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/yanggaobeilu.jpg" alt="">
                <span class="classify-menu-text1">上海杨高北路</span>
            </a>
            <a href="/v3/lotus-list?id=SC145&name=<?= query_encode('上海临港店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/lingang.jpg" alt="">
                <span class="classify-menu-text1">上海临港店</span>
            </a>
            <a href="/v3/lotus-list?id=SC082&name=<?= query_encode('上海新港店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/xingang.jpg" alt="">
                <span class="classify-menu-text1">上海新港店</span>
            </a>
            <a href="/v3/lotus-list?id=SC078&name=<?= query_encode('上海浦江店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/pujiang.jpg" alt="">
                <span class="classify-menu-text1">上海浦江店</span>
            </a>
        </div>
        <div class="special-sale-box1">
            <a href="/v3/lotus-list?id=SC055&name=<?= query_encode('上海松江文诚') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/songjiangwencheng.jpg" alt="">
                <span class="classify-menu-text1">上海松江文诚</span>
            </a>
            <a href="/v3/lotus-list?id=SC001&name=<?= query_encode('上海杨高南路') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/yanggaonanlu.jpg" alt="">
                <span class="classify-menu-text1">上海杨高南路</span>
            </a>
            <a href="/v3/lotus-list?id=SC043&name=<?= query_encode('上海杨高中路') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/yanggaozhonglu.jpg" alt="">
                <span class="classify-menu-text1">上海杨高中路</span>
            </a>
            <a href="/v3/lotus-list?id=SC005&name=<?= query_encode('上海上南店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/shangnan.jpg" alt="">
                <span class="classify-menu-text1">上海上南店</span>
            </a>
        </div>
        <div class="special-sale-box1">
            <a href="/v3/lotus-list?id=SC040&name=<?= query_encode('上海保德店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/baode.jpg" alt="">
                <span class="classify-menu-text1">上海保德店</span>
            </a>
            <a href="/v3/lotus-list?id=SC033&name=<?= query_encode('上海川沙店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/chuansha.jpg" alt="">
                <span class="classify-menu-text1">上海川沙店</span>
            </a>
            <a href="/v3/lotus-list?id=SC127&name=<?= query_encode('上海南桥店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/nanqiao.jpg" alt="">
                <span class="classify-menu-text1">上海南桥店</span>
            </a>
            <a href="/v3/lotus-list?id=SC010&name=<?= query_encode('上海汶水店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/wenshui.jpg" alt="">
                <span class="classify-menu-text1">上海汶水店</span>
            </a>
        </div>
        <div class="special-sale-box1">
            <a href="/v3/lotus-list?id=SC041&name=<?= query_encode('上海南奉店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/nanfeng.jpg" alt="">
                <span class="classify-menu-text1">上海南奉店</span>
            </a>
            <a href="/v3/lotus-list?id=SC060&name=<?= query_encode('上海蕴川店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/yunchuan.jpg" alt="">
                <span class="classify-menu-text1">上海蕴川店</span>
            </a>
            <a href="/v3/lotus-list?id=SC027&name=<?= query_encode('上海松江岳阳') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/songjiangyueyang.jpg" alt="">
                <span class="classify-menu-text1">上海松江岳阳</span>
            </a>
            <a href="/v3/lotus-list?id=SC126&name=<?= query_encode('上海牡丹江店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/mudanjiang.jpg" alt="">
                <span class="classify-menu-text1">上海牡丹江店</span>
            </a>
        </div>
        <div class="special-sale-box1">
            <a href="/v3/lotus-list?id=SC050&name=<?= query_encode('上海金山店') ?>" class="special-sale-box2">
                <img src="/views/assets/base/img/content/mall/jinshan.jpg" alt="">
                <span class="classify-menu-text1">上海金山店</span>
            </a>
        </div>
    </div>

<?php include ('footer.php'); ?>