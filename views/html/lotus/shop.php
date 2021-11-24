<?php
if(explode('?id=', $_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=', $_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&type=') !== false) {
        $id = explode('&type=', $id)[0];
    }
}

$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus/shop-admin.js?t='.date("Y-m-d").'"></script>';
?>

<header class="weui-header bg-lotus" style="height: 60px;">
    <div class="weui-header-left" style="margin-top: 5px;"> <span class="icon icon-109" onclick="history.back();"></span> </div>
    <div class="weui-header-title">
        <a class="logo navbar-brand no-hover" href="/lotus/home">
            <img class="navbar-brand-img" src="/views/assets/base/img/content/lotus-admin/logo.png" style="height: 30px; margin-top: 10px;">
        </a>
    </div>
</header>
<div class="slide" id="swiper_banner">
    <ul>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src='http://placehold.it/640x300' alt="">
            </a>
        </li>
    </ul>
    <div class="dot">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
<ul class="weui-nav bg-white">
    <li class="w-3 tcenter"><div class="f24 f-lotus margin5 bold">100,000</div><small class="margin5">月租金 (元/m<sup>2</sup>)</small></div></li>
    <li class="w-3 tcenter"><div class="f24 f-lotus margin5 bold">18</div><small class="margin5">单价 (元/m<sup>2</sup>/天)</small></div></li>
    <li class="w-3 tcenter"><div class="f24 f-lotus margin5 bold">67.58</div><small class="margin5">租赁面积 (m<sup>2</sup>)</small></div></li>
</ul>
<div class="weui-content border-t" style="padding-top: 0; overflow: auto;">
    <h2 class="page-hd">sfasfsafsafasf</h2>
    <a class="weui-cell weui-cell_access border-tb" href="javascript:;">
        <div class="weui-cell__bd">
            <p>京东</p>
        </div>
        <div class="weui-cell__ft">
        </div>
    </a>
    <table class="border-b" style="margin-top: 10px;">
        <tbody style="color: #666;">
            <tr><td colspan="2">
                    <label class="label f-white bg-blue">韩信</label>
                    <label class="label f-white bg-blue">韩信</label>
                    <label class="label f-white bg-blue">韩信</label>
                </td>
            </tr>
            <tr><td>年限: <span class="f-black">sfasfs</span></td><td>日固定租金: <span class="f-black">sfasfs</span></td></tr>
            <tr><td>扣率: <span class="f-black">sfasfs</span></td><td>月固定租金: <span class="f-black">sfasfs</span></td></tr>
            <tr><td>月物业管理费: <span class="f-black">sfasfs</span></td><td>履约保证金: <span class="f-black">sfasfs</span></td></tr>
            <tr><td>数据采集设备押金: <span class="f-black">sfasfs</span></td><td>每月推广费: <span class="f-black">sfasfs</span></td></tr>
        </tbody>
    </table>
    <h4 class="page-hd">工程图纸</h4>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAGFBAMAAADzwA07AAAAIVBMVEXr6+vPz8/X19fp6ene3t7k5OTm5ubh4eHT09Pb29vR0dHqLrSfAAACyklEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGB27GdHaSiO4vgJ5e+s5lzAFlZ2Y1yWoIm6AjPJbItG3VJdmLiiOg9Aow8AybinK1/Tey9ldDttl+eTFC6w+4b+2luRNi2XcIJl8v/H6quHhf9BHiXnFlbGE6wep/D8+gm8Dp8CnEAeJePOBz4n7XKssi254gFWzEkVUWVb0uEeVklz7rxS2ZYM/PnfZ8zEz4atyrYkYOjn63emAPI5VLYtxczHe+HnbWxc7K9fVLYFxwjAIur5eVuGQLcgn6lsczkTYDNDOQb6Nma/oJWqbGMLV/EYIg6BAffIaG5iTlW2sSFXQDFGblzDAwqTIIi5VdmmRrZbYI/F3FXeDbj3uQ8q29SA1/ZYYcgtFkzeMAXQ50llmwo4RYcpRlwhj5DN4RShyjZWTHA1Bwa233Fm435w4onKNnY0yAwQ8BrFFGuezVS2sc0c6xBAPA04Rswz8+9Z7VBl61lwG48BrCd+IEQ33i36DB8eNKpsHUP+KPcAMuMvYgYXnFzS71S2jhF/8+D/mq+YIotwURh4GVOVraPHXy4dOsznfrNb3XUh9kv3nqhsHQEjlw5dFsa97qudAnK/RI8GKltLTANfkyEQlFECfOMBGDFKAaw5Vtl61lW1wifMaW7fMkpcZJr7u+fkTmXr2VRbgqM/+3slrZ+wPtP7A5WtZ8FTVfgA63VhYyZw3tGaJSrbkuDTe1Re3t1/hIiIiIiIiIiIiIj8ZQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVpT04JAAAAAAQ9P+10RMAAAAAAAAAAAAAAADAArTtXKLPR7LcAAAAAElFTkSuQmCC" class="img-max">
    <h4 class="page-hd border-t" style="margin-top: 20px;">楼层落位</h4>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAGFBAMAAADzwA07AAAAIVBMVEXr6+vPz8/X19fp6ene3t7k5OTm5ubh4eHT09Pb29vR0dHqLrSfAAACyklEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGB27GdHaSiO4vgJ5e+s5lzAFlZ2Y1yWoIm6AjPJbItG3VJdmLiiOg9Aow8AybinK1/Tey9ldDttl+eTFC6w+4b+2luRNi2XcIJl8v/H6quHhf9BHiXnFlbGE6wep/D8+gm8Dp8CnEAeJePOBz4n7XKssi254gFWzEkVUWVb0uEeVklz7rxS2ZYM/PnfZ8zEz4atyrYkYOjn63emAPI5VLYtxczHe+HnbWxc7K9fVLYFxwjAIur5eVuGQLcgn6lsczkTYDNDOQb6Nma/oJWqbGMLV/EYIg6BAffIaG5iTlW2sSFXQDFGblzDAwqTIIi5VdmmRrZbYI/F3FXeDbj3uQ8q29SA1/ZYYcgtFkzeMAXQ50llmwo4RYcpRlwhj5DN4RShyjZWTHA1Bwa233Fm435w4onKNnY0yAwQ8BrFFGuezVS2sc0c6xBAPA04Rswz8+9Z7VBl61lwG48BrCd+IEQ33i36DB8eNKpsHUP+KPcAMuMvYgYXnFzS71S2jhF/8+D/mq+YIotwURh4GVOVraPHXy4dOsznfrNb3XUh9kv3nqhsHQEjlw5dFsa97qudAnK/RI8GKltLTANfkyEQlFECfOMBGDFKAaw5Vtl61lW1wifMaW7fMkpcZJr7u+fkTmXr2VRbgqM/+3slrZ+wPtP7A5WtZ8FTVfgA63VhYyZw3tGaJSrbkuDTe1Re3t1/hIiIiIiIiIiIiIj8ZQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVpT04JAAAAAAQ9P+10RMAAAAAAAAAAAAAAADAArTtXKLPR7LcAAAAAElFTkSuQmCC" class="img-max">
    <h4 class="page-hd border-t" style="margin-top: 20px;">其他推荐</h4>
    <div style="overflow: scroll; height: 150px;">
        <ul class="weui-uploader__files" style="height: 150px; overflow: scroll; width: 2000px;">
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">1F11</span>
            </li>
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">B1F15</span>
            </li>
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">1F67</span>
            </li>
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">2F01</span>
            </li>
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">1F07</span>
            </li>
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">1F03</span>
            </li>
            <li class="weui-uploader__file" style="position: relative; background-image:url(http://placehold.it/1024x682)">
                <span style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center;">B1F03</span>
            </li>
        </ul>
    </div>
</div>

<div class="weui-cells bg-light-red" style="margin-bottom: 100px; padding-bottom: 70px;">
    <div class="weui-cell">
        <div class="weui-cell__hd"><img src="/views/assets/base/img/content/brands-admin/CUSER190709000022.jpg" alt="" style="width:40px;margin-right:10px;display:block"></div>
        <div class="weui-cell__bd">
            <p><h4>许浩</h4><small>首席顾问</small></p>
        </div>
        <div class="weui-cell__ft">
            <a href="javascript:;" class="weui-btn weui-btn_mini bg-lotus f-white">打电话</a>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>