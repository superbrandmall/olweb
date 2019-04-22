<script>
$(document).ready(function() {
    $('nav .navbar-nav').html('\
<li class="c-menu-type-classic"><a href="#!" class="c-link dropdown-toggle"><i class="fa fa-caret-down"></i> 办公地点</a>\n\
<ul class="dropdown-menu c-menu-type-classic c-pull-left" style=""><li><a href="work-space">上海 OZONE</a></li><li><a href="ly-space">洛阳 LE CINEMA 乐影城</a></li></ul></li>\n\
<li class="c-menu-type-classic"><a href="co-work#abt_eat_n_work" class="c-link">关于<img src="views/assets/base/img/content/mall/eat_n_work.png" alt="eat n work" height="12" /></a></li>\n\
<li class="c-menu-type-classic"><a href="co-work#we_offer" class="c-link">关于<img src="views/assets/base/img/content/mall/kzone.png" alt="KZONE" height="11" /></a></li>\n\
<li class="c-menu-type-classic"><a href="co-work#grids" class="c-link">关于<img src="views/assets/base/img/content/mall/ozone.png" alt="OZONE" height="16" /></a></li>\n\
<li class="c-menu-type-classic"><a href="co-work#prices" class="c-link">房型与价格</a></li>');

    $('.c-brand').append('<a href="co-work" class="c-logo"><img src="views/assets/base/img/content/mall/eat_n_work.png" alt="eat n work" class="c-desktop-logo" height="18" style="margin-left: 10px;"></a>');
});
</script>

<div class="c-layout-page">
    <div id="form" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/cowork2.jpg); background-position: center -150px; margin-bottom: 0; padding: 120px 0; z-index: 11;">
        <div class="container">
            <h3 class="c-font-70 c-font-bold c-font-uppercase c-font-white">公共区域</h3>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11;">
        <div class="container">
            <div class="col-md-6" style="font-size: 20px;">
                <h1 class="c-font-bold" style="margin-top: 100px; font-size: 32px;">陆家嘴正大广场旗舰店</h1><br>
                <p class="c-font-26">金融城的便捷、繁华</p>
                <p class="c-font-26">引爆全新生活方式！</p>
            </div>
            
            <div class="col-md-6">
                <div class="modal-dialog" style="width: auto;">
                    <div class="modal-content c-square" style="background-color: #fff; box-shadow: none; border: 1px solid rgb(240, 240, 240); padding: 0;">
                        <div class="modal-body" style="padding: 20px 40px;">
                            <h1 class="c-font-44 c-font-sbold">欢迎来到<img src="views/assets/base/img/content/mall/ozone.png" alt="OZONE" height="50" /></h1>
                            <p class="c-font-14">正大广场陆家嘴购物中心 | 上海市浦东陆家嘴西路168号9、10楼</p>
                            <hr>
                            <p>请留下联系方式，我们将有专人与您联系。</p>
                            <form>
                                <div class="form-group">
                                    <label for="contact_name_1" class="hidden"><?= $lang['contact_main_contact'] ?></label>
                                    <input type="text" id="contact_name_1" name="contact_name_1" placeholder="<?= $lang['contact_main_contact'] ?>*" required class="form-control input-lg c-square">
                                    <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="hidden"><?= $lang['contact_email'] ?></label>
                                    <input type="email" id="email" name="email" placeholder="<?= $lang['contact_email'] ?>*" required class="form-control input-lg c-square">
                                    <div id="errorcontainer-email" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <label for="phone" class="hidden"><?= $lang['contact_phone'] ?></label>
                                    <div class="input-group c-square">
                                        <div class="input-group-addon" style="background-color: #FAFAFA;">
                                            <button type="button" data-toggle="dropdown" aria-expanded="false" style="padding: 0;background: none; border: 0 none;">
                                                <img src="views/assets/base/img/content/misc/cn.png" alt="中国" width="15"> +86 
                                                <span class="caret" style="margin-top: -1px;"></span>
                                            </button>
                                            <ul class="dropdown-menu" role="menu" style="min-width: 0;">
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/cn.png" alt="" width="20"> +86</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/us.png" alt="" width="20"> +1</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/hk.png" alt="" width="20"> +852</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/tw.png" alt="" width="20"> +886</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/as.png" alt="" width="20"> +61</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/uk.png" alt="" width="20"> +44</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/id.png" alt="" width="20"> +91</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/fa.png" alt="" width="20"> +33</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;"><img src="views/assets/base/img/content/misc/mo.png" alt="" width="20"> +853</a>
                                                </li>
                                                <li>
                                                    <a href="#" style="padding: 1px 20px; font-size: 14px;">其他</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <input type="text" id="phone" name="phone" placeholder="<?= $lang['co_work_phone'] ?>*" required class="form-control input-lg c-square">
                                    </div>
                                    <div id="errorcontainer-phone" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <label for="reserve_verify" class="hidden"><?= $lang['co_work_veryfication_code'] ?>*</label>
                                    <div style="position: relative;">
                                        <input type="text" id="login_verify" name="reserve_verify" placeholder="<?= $lang['co_work_veryfication_code'] ?>*" required class="form-control c-square c-theme input-lg">
                                        <a href="javascript: VeryficationCodeReservation()" id="login_verify_link" style="display: block; position: absolute; z-index: 10; right: 9px; font-size: 14px; top: 13px;"><?= $lang['co_work_send_code'] ?></a>
                                    </div>
                                    <div id="errorcontainer-reserve_verify" class="errorDiv"></div>
                                </div>
                                <div class="form-group">
                                    <div class="c-checkbox">
                                        <input type="checkbox" id="terms" name="terms" class="c-check" checked="checked" required>
                                        <label for="terms" class="c-font-thin c-font-17">
                                            <span></span>
                                            <span class="check"></span>
                                            <span class="box"></span>
                                            我同意正大Online Leasing的<a href="terms.html" target="_blank">服务条款</a>，并且我已阅读并理解正大Online Leasing的<a href="cookie.html" target="_blank">隐私政策</a>，包括隐私政策中所规定的处理和传输我的信息。
                                        </label>
                                    </div>
                                    <div id="errorcontainer-terms" class="errorDiv" style="margin-left: 29px"></div>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn c-theme-btn btn-lg c-btn-uppercase c-btn-bold c-btn-square c-btn-login" style="width: 100%; font-size: 20px;">立即预约</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/cowork5.jpg); margin-bottom: 0; padding: 160px 0; z-index: 11;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-white c-font-bold">前台接待</h3>
                <div class="c-center c-font-24 c-font-white">
                    茶水、咖啡
                </div>
            </div>
        </div>
    </div>
            
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11;">
        <div class="container">
            <div class="col-md-6 col-md-offset-3" style="text-align: center;">
                <div class="c-title c-font-bold c-font-uppercase" style="font-size: 30px; margin-bottom: 20px;">
                    江景会议室
                </div>
                <div class="c-desc">
                    <p>3-20人以上洽谈</p>
                </div><br>
                <img src="/views/assets/base/img/content/mall/shared-space-2.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/shared-space-3.jpg); margin-bottom: 0; padding: 160px 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-white c-font-bold">Maxhub智能会议路演区</h3>
                <div class="c-center c-font-24 c-font-white">
                    50-80人
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="col-md-12" style="text-align: center;">
                <div class="c-title c-font-bold c-font-uppercase" style="font-size: 30px; margin-bottom: 20px;">
                    公共休息区
                </div>
                <div class="c-desc">
                    <p>进口图书阅览休息</p>
                </div><br>
                <div class="col-md-6">
                    <img src="/views/assets/base/img/content/mall/shared-space-4.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
                <div class="col-md-6">
                    <img src="/views/assets/base/img/content/mall/shared-space-5.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/shared-space-6.jpg); margin-bottom: 0; padding: 160px 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-white c-font-bold">180°黄浦江景群尽收眼底</h3>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-dark" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-bar-3">
                <div class="row">
                    <div class="col-md-12" style="text-align: center;">
                        <div class="c-content-title-1">
                            <h3 class="c-font-uppercase c-font-bold">超大户外露台</h3>
                            <p class="c-font-uppercase c-font-white">
                                露台活动  商务宴请
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-lg c-bg-parallax" style="background-image: url(/views/assets/base/img/content/mall/shared-space-7.jpg); margin-bottom: 0; padding: 160px 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-center c-font-uppercase c-font-white c-font-bold">360°全江美景<br>俯瞰外滩</h3>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-feature-2-grid">
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-center c-font-bold">空间特色</h3>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="c-content-feature-2 c-option-2 c-theme-bg-parent-hover">
                            <img src="/views/assets/base/img/content/mall/communicate.jpg" alt="" height="70" style="float: left; margin-right: 25px;">
                            <h3 class="c-font-uppercase c-title">行业交流</h3>
                            <p>
                                与<img src="views/assets/base/img/content/mall/ozone.png" alt="OZONE" height="20" />入驻合伙人，头脑风暴，分享经验！
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="c-content-feature-2 c-option-2 c-theme-bg-parent-hover">
                            <img src="/views/assets/base/img/content/mall/meeting.jpg" alt="" height="70" style="float: left; margin-right: 25px;">
                            <h3 class="c-font-uppercase c-title">会晤磋商</h3>
                            <p>
                                与行业精英、意见领袖面对面，讨教你想知道的经营之道！
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="c-content-feature-2 c-option-2 c-theme-bg-parent-hover">
                            <img src="/views/assets/base/img/content/mall/party.jpg" alt="" height="70" style="float: left; margin-right: 25px;">
                            <h3 class="c-font-uppercase c-title">节日派对</h3>
                            <p>
                                谈笑风生，合作共赢！
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <div class="c-content-feature-2 c-option-2 c-theme-bg-parent-hover">
                            <img src="/views/assets/base/img/content/mall/social.jpg" alt="" height="70" style="float: left; margin-right: 25px;">
                            <h3 class="c-font-uppercase c-title">社交活动</h3>
                            <p>
                                主题各异的活动，协助搭建适合自己的“朋友圈”。
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="c-content-feature-2 c-option-2 c-theme-bg-parent-hover">
                            <img src="/views/assets/base/img/content/mall/register.jpg" alt="" height="70" style="float: left; margin-right: 25px;">
                            <h3 class="c-font-uppercase c-title">公司注册</h3>
                            <p>
                                小隔间，公司注册专属
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <div class="c-content-feature-2 c-option-2 c-theme-bg-parent-hover">
                            <img src="/views/assets/base/img/content/mall/media.jpg" alt="" height="70" style="float: left; margin-right: 25px;">
                            <h3 class="c-font-uppercase c-title">媒体公关</h3>
                            <p>
                                100+媒体渠道，小投入大回报，助力企业整合营销
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 120px;">
        <div class="container">
            <div class="row">
                <div class="c-content-title-1">
                    <h3 class="c-font-uppercase c-center c-font-bold">交通</h3>
                </div>
                <br>
                <div class="col-md-12">
                    <img src="/views/assets/base/img/content/mall/map.jpg" class="img-responsive" />
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-sm c-bg-grey-2" style="padding: 12px 0 0; position: fixed; bottom: -20px; left: 0; right: 0; z-index: 10;">
        <div class="container">
            <div class="c-content-subscribe-form-1">
                <div class="row">
                    <div class="col-sm-8">
                        <h3 class="c-font-20 c-font-uppercase c-font-bold c-font-white">正在寻找一个灵活高端的办公空间？预约参观，我们将尽快与你确认。</h3>
                    </div>
                    <div class="col-sm-4">
                        <a href="#form" class="btn c-theme-btn btn-lg c-btn-uppercase c-btn-bold c-btn-square c-btn-login" style="width: 100%; font-size: 20px;">立即预约</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>