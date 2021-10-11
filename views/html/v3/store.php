<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v3/swiper.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v3/store.js" ></script>';
?>

<div style="overflow: hidden;">
    <div class="banner-view fl photoBrowser">
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>

<h1 id="store_desc" class="title"></h1>

<h3 class="similar-data">
    <div class="similar_data_detail">
        <p class="gray big">门牌号</p>
        <p id="room_name" class="red big"></p>
    </div>
    <div class="similar_data_detail"><p class="gray big">类型</p><p id="subType" class="red big"></p></div>
    <div class="similar_data_detail"><p class="gray big">租赁面积</p><p id="area" class="red big"></p></div>
</h3>

<div class="view-app-download">
    <div class="download_logo">
        <img src="/views/assets/base/img/content/v3/qrcode.jpg">
    </div>
    <div class="download_desc">微信关注OLL线上租，获取更多消息</div>
</div>

<ul class="house_description">
    <div class="tag_group">
        <span style="color:rgb(242,161,47);background-color:rgba(242,161,47,0.15);">{{houseDetails.manNnian}}</span>
        <span style="color:rgb(51,190,133);background-color:rgba(51,190,133,0.15);">{{houseDetails.kanfang}}</span>
    </div>
    <li class="short"><span class="gray">品牌：</span><span id="b_name"></span></li>
    <li class="short"><span class="gray">状态：</span><span id="shop_state"></span></li>
    <li class="short"><span class="gray">楼层：</span><span id="floor"></span></li>
    <li class="short"><span class="gray">项目：</span><span id="mall_name"></span></li>
    <li class="short"><span class="gray">业态：</span><span id="modality"></span></li>
    <li class="short"><span class="gray">入驻：</span><span id="moving_date"></span></li>
</ul>

<div class="sub_mod_box house_model">
    <div class="mod_cont">
        <div class="pictext flexbox">
            <div class="item_list">
                <div class="house_model_tit">户型分间</div>		                                                                                                                                                            				<p class="gray light_small oneline" v-for="v in houseDetails.huxing">{{v}}</p>
            </div>
            <div class="mod_media">
                <img :src="houseDetails.huxingtu">
            </div>
        </div>
    </div>
</div>

<!--更多房源信息弹窗-->
<a class="more-house-info-btn weui-btn weui-btn_default open-popup" data-target="#more-house-info" href="javascript:;">更多房源信息</a>
<div id="more-house-info" class="weui-popup__container more-house-info-container">
    <div class="weui-popup__overlay"></div>
    <div class="weui-popup__modal">
        <a class="close close-popup" href="javascript:;"></a>
        <h1 class="info_layer_title">基础属性</h1>
        <ul class="info_ul">
            <li class="info_li">
                <p class="info_title">房源户型</p>
                <p class="info_content deep_gray">2室1厅1厨1卫</p>
            </li>
            <li class="info_li">
                <p class="info_title">建筑面积</p>
                <p class="info_content deep_gray">70.72㎡</p>
            </li>
            <li class="info_li">
                <p class="info_title">套内面积</p>
                <p class="info_content deep_gray">暂无数据</p>
            </li>
            <li class="info_li">
                <p class="info_title">户型结构</p>
                <p class="info_content deep_gray">平层</p>
            </li>
            <li class="info_li">
                <p class="info_title">梯户比例</p>
                <p class="info_content deep_gray">一梯十九户</p>
            </li>
            <li class="info_li">
                <p class="info_title">供暖方式</p>
                <p class="info_content deep_gray">暂无数据</p>
            </li>
        </ul>
        <h1 class="info_layer_title">交易信息</h1>
        <ul class="info_ul">
            <li class="info_li">
                <p class="info_title">上次交易</p>
                <p class="info_content deep_gray">2011年03月22日</p>
            </li>
            <li class="info_li">
                <p class="info_title">购房年限</p>
                <p class="info_content deep_gray">满五年</p>
            </li>
            <li class="info_li">
                <p class="info_title">房屋用途</p>
                <p class="info_content deep_gray">普通住宅</p>
            </li>
            <li class="info_li">
                <p class="info_title">交易权属</p>
                <p class="info_content deep_gray">商品房</p>
            </li>
            <li class="info_li">
                <p class="info_title">产权所属</p>
                <p class="info_content deep_gray">非共有</p>
            </li>
            <li class="info_li">
                <p class="info_title">抵押信息</p>
                <p class="info_content deep_gray">无抵押</p>
            </li>
            <li class="info_li">
                <p class="info_title">房本备件</p>
                <p class="info_content deep_gray">已上传房本照片</p>
            </li>
            <li class="info_li">
                <p class="info_title">看房时间</p>
                <p class="info_content deep_gray">提前预约随时可看</p>
            </li>
            <li class="info_li">
                <p class="info_title">链家编号</p>
                <p class="info_content deep_gray">103101798634</p>
            </li>
            <li class="info_li">
                <p class="info_title">土地年限</p>
                <p class="info_content deep_gray">详见业主土地证明材料或查询相关政府部门的登记文件</p>
            </li>
        </ul>
    </div>
</div>
<!--/更多房源信息弹窗-->

<div class="bdMap">
    <div class="mod_cont">
        <img id="floor_plan" src="javascript: void(0);">
    </div>
</div>

<a class="house_introduce_address" href="房源介绍地址">
    <h3 class="mod_tit arrow">房源介绍</h3>
    <div class="mod_cont fiveline house_intro_mod_cont">
        {{houseDetails.description}}
    </div>
</a>

<a href="带看地址" class="house_yezhushuo" >
    <h3 class="mod_tit_complex">
        <div class="mod_tit_complex_text">经纪人带看反馈（3）
            <div class="avatar_frame"><img src="/views/assets/base/img/content/v3/avatar.jpg"></div>
            <p class="small light_gray">最新带看:2017.11.02</p>
        </div>
    </h3>
    <div class="mod_cont twoline">朝南东边户，精装修，有燃气，家电家具齐全，入住舒适，科大东区，周边配套成熟。</div>
</a>

<!--灰色背景-->
<div class="grayBg">


    <div class="house_record">
        <h3 class="mod_tit">房源动态<span class="title_remark gray"></span></h3>
        <div class="mod_cont">
            <div class="data flexbox">
                <div class="box_col">
                    <small class="gray">近7日带看(次)</small>
                    <strong>{{houseDetails.dongtai.jin7ri}}</strong>
                </div>
                <div class="box_col">
                    <small class="gray">累计带看(次)</small>
                    <strong>{{houseDetails.dongtai.leiji}}</strong>
                </div>
                <div class="box_col">
                    <small class="gray">关注(人)</small>
                    <strong>{{houseDetails.dongtai.guanzhu}}</strong>
                </div>
            </div>
        </div>
        <div class="mod_tit mod_sub_tit mod_app">
            <div class="app_title">使用APP查看详细带看记录和更多动态信息</div>
            <div class="app_btn lazyload_ulog">安装链家 APP</div>
        </div>
    </div>

    <!--新鸿意 瀚海星座-->
    <div class="mod_xiaoqu">
        <h3 class="mod_tit arrow post_ulog"><a href="">新鸿意 瀚海星座<span class="title_remark gray">小区详情</span></a></h3>
        <div class="sub_mod_box house_model">
            <div class="mod_cont">
                <div class="pictext flexbox">
                    <div class="item_list">
                        <div class="house_model_tit">参考均价: <span class="red">13,257元/平</span></div>
                        <p class="gray light_small">建筑年代:2010年建</p>
                        <p class="gray light_small">楼栋总数:2栋</p>
                        <p class="gray light_small">房屋总数:1092户</p>
                    </div>
                    <div class="mod_media">
                        <div class="media_main">
                            <img class="lazyload" src="/views/assets/base/img/content/v3/default_lianjia_small.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="house_introduce">
            <a class="mod_tit mod_sub_tit arrow post_ulog" href="javascript:;">同小区成交（5）<span class="app_link">APP中查看</span></a>
            <ul class="time_axis_ul">
                <li>
                    <a href="" class=" post_ulog">
                        <p class="">1室1厅/61.63㎡/南<span class="right red bold">83万</span></p>
                        <p class="light_small gray">单价13,468元/平，2017.09.09 成交</p>
                    </a>
                </li>
                <li>
                    <a href="#" class=" post_ulog">
                        <p class="">1室0厅/56.51㎡/东<span class="right red bold">67万</span></p>
                        <p class="light_small gray">单价11,857元/平，2017.06.23 成交</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="sub_mod_box same_resblock_mod tongyong_mod">
            <a class="mod_tit mod_sub_tit" href="javascript:;">
                同小区房源
                <span class="title_remark gray light_small">在租</span>
                <span class="selected title_remark gray light_small">在售</span>
            </a>
            <div>
                <div class="mod_cont house_list_scroll">
                    <ul class="house_list_scroll_list">
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                    </ul>
                </div>
                <a class="more-house-info-btn weui-btn weui-btn_default">APP内查看更多在售房源</a>
            </div>
        </div>
    </div>
    <!--/新鸿意 瀚海星座-->

    <!--周边推荐-->
    <div class="mod_xiaoqu">
        <h3 class="mod_tit post_ulog"><a href="">周边推荐</a></h3>
        <div class="sub_mod_box same_resblock_mod tongyong_mod">
            <a class="mod_tit mod_sub_tit" href="javascript:;">
                推荐房源(8)
                <span class="title_remark gray light_small arrow arrow-more">更多房源</span>
            </a>
            <div>
                <div class="mod_cont house_list_scroll">
                    <ul class="house_list_scroll_list">
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="sub_mod_box same_resblock_mod tongyong_mod">
            <a class="mod_tit mod_sub_tit" href="javascript:;">
                周边小区(13)
                <span class="title_remark gray light_small arrow arrow-more">更多小区</span>
            </a>
            <div>
                <div class="mod_cont house_list_scroll">
                    <ul class="house_list_scroll_list">
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                        <li class="house_list_scroll_list_item">
                            <a href="" class="post_ulog">
                                <div class="house_img_frame">
                                    <img src="/views/assets/base/img/content/v3/65b85f48-0ac8-4d50-94ab-39930d294876.jpg">
                                </div>
                                <p class="house_desc">2室1厅/70.72㎡/南</p>
                                <p class="house_price"><span class="house_total_price bold">105万元</span><span class="light_small deep_gray">14,848元/平</span></p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--/新鸿意 瀚海星座-->

    <div class="gray_mod">
        <h2>考虑卖房？我们可以帮到你</h2>
        <p class="light_small gray">30万业主信赖的选择，卖房专业又省心</p>
        <a class="round_btn post_ulog" data-evtid="10362" data-ulog="" href="/hf/yezhu/">帮我卖房</a>
    </div>

    <p class="hintStyle">房源所示“户型图、房屋用途、交易权属、建成年代、产权年限、建筑结构”仅供参考，购房时请以房本信息为准。</p>

</div>
<!--灰色背景 end-->

<div class="fixed_bar contact_agent">
    <div class="follow post_ulog"><i class="icon_guanzhu"></i><span>关注</span></div>
    <div class="box_col btn_app"><a href="javascript:;" class="btn btn_green btn_red"><span>微信扫一扫</span></a></div>
    <div class="box_col"><a href="javascript:;" class="btn btn_green q_agenticon post_ulog"><span>咨询招商经理</span></a></div>
</div>

<?php include ('footer.php'); ?>

<!--<script src="js/jquery.min.js"></script>
<script src="js/jquery-weui.min.js"></script>
<script src="js/swiper.js"></script>
<script src="js/vue.js"></script>
<script src="js/vue-resource.js"></script>
<script>
$(function(){
        //加载数据
        var houseData=null;
        var vm = new Vue({
                el:"body",
       	created:function(){
                this.$http.get("houseDetails.json").then(function(r){
                                this.houseDetails = r.data.data;
                                console.log(houseData);
                        },function(r){
                                $.toast("数据获取失败","cancel");
                        })
       	},
                data:{
                        houseDetails:{
                    title: "链家APP",
                    imgs: ["images/no-pic.jpg", "images/no-pic.jpg"],
                    cururl:"#",
                    houseIntroduceUrl:"#",
                    daikanUrl:"#",
                    unitPrice: 0,
                    fangxing: "",
                    mianji: 0,
                                manNnian:"",
                                kanfang:"",
                                price:0,
                                guapai:"2017.08.13",
                                chaoxiang:"",
                                louceng:"",
                                louxing:"",
                                dianti:"--",
                                zhuangxiu:"",
                                niandai:"2011",
                                yongtu:"",
                                quanshu:"",
                                shoufuyusuan:"",
                                xiaoqu:"",
                                huxing:["客厅: 28.78㎡/ 暂无数据/ 未知窗户类型","卧室A: 12.7㎡/ 暂无数据/ 未知窗户类型","卧室B: 7.33㎡/ 暂无数据/ 未知窗户类型"],
                                huxingtu:["images/huxing.jpg"],
                                pos:[0,0],
                                house_code:"00000",
                                description:"... ...",
                                dongtai:{"jin7ri":0, "leiji":0, "guanzhu":0}
                }
        }
        })

        

})
</script>
</body>
</html>-->