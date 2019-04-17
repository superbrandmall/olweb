<script>
$(document).ready(function() {
    $('nav .navbar-nav').html('\
<li class="c-menu-type-classic"><a href="co-work#hot_spaces" class="c-link">办公地点</a></li>\n\
<li class="c-menu-type-classic"><a href="co-work#we_offer" class="c-link">关于eat n work</a></li>\n\
<li class="c-menu-type-classic"><a href="co-work#grids" class="c-link">关于OZONE</a></li>\n\
<li class="c-menu-type-classic"><a href="co-work#prices" class="c-link">房型与价格</a></li>');

    $('.c-brand').append('<a href="co-work" class="c-logo"><img src="views/assets/base/img/content/mall/ozone.png" alt="正大" class="c-desktop-logo" height="20" style="margin-left: 10px;"></a>');
});
</script>

<div class="c-layout-page">
    <div id="form" class="c-content-box c-bg-parallax c-content-feature-16" style="background-image: url(views/assets/base/img/content/mall/cowork2.jpg); background-position: center -370px; margin-bottom: 0; padding: 160px 0; z-index: 11;">
        <div class="container">
            <h3 class="c-font-70 c-font-bold c-font-uppercase c-font-white">办公区域</h3>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0; z-index: 11; padding-bottom: 140px;">
        <div class="container">
            <div class="col-md-6" style="font-size: 20px;">
                <h1 class="c-font-bold" style="font-size: 26px;">欢迎来到OZONE陆家嘴正大广场旗舰店</h1><br>
                <p>上海浦东陆家嘴西路168号</p>
                <p>金融城的便捷、繁华</p>
                <p>引爆全新生活方式！</p>
            </div>
            
            <div class="col-md-6">
                <div class="modal-dialog" style="position: absolute; top: -370px; right: 0;">
                    <div class="modal-content c-square" style="background-color: #fff; box-shadow: none; border: 1px solid rgb(240, 240, 240); padding: 0;">
                        <div class="modal-body" style="padding: 20px 40px;">
                            <h1 class="c-font-44 c-font-sbold">欢迎来到OZONE</h1>
                            <p>正大广场陆家嘴购物中心 | 上海市浦东陆家嘴西路168号9、10楼</p>
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
                                        <input type="checkbox" id="terms" name="terms" class="c-check" required>
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
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 0;">
        <div class="container">
            <div class="c-content-title-1">
                <h3 class="c-font-uppercase c-font-bold">专属豪华办公室</h3>
            </div><br>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-desc">
                        <p>外滩江景豪华套间 （18人）</p>
                        <p>63,000元/月</p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/work-space-1.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div><br>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-desc">
                        <p>外侧中庭采光间（8人）</p>
                        <p>20,000元/月</p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/work-space-2.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div><br>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-desc">
                        <p>10人 半采光 办公室</p>
                        <p>22,000元/月</p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/work-space-1.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div><br>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-desc">
                        <p>5人 半采光 办公室</p>
                        <p>11,000元/月</p>
                    </div>
                    <img src="/views/assets/base/img/content/mall/work-space-1.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="c-desc">
                        <small>*以上价格均含税/物业/水电/空调/保洁保安/前台接待/网络;空调同步商场空调时间</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-grey-1" style="margin-bottom: 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="c-title c-font-bold c-font-uppercase" style="font-size: 30px; margin: 20px 0 30px 0;">
                        定制面积 （140人）
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="/views/assets/base/img/content/mall/work-space-5.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
                </div>
                <div class="col-md-4">
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        面积
                                    </th>
                                    <td>
                                        560平方米
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        建议办公人数
                                    </th>
                                    <td>
                                        140人
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        租金单价
                                    </th>
                                    <td>
                                        13元/平/日
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        物业费单价
                                    </th>
                                    <td>
                                        25元/平/日
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        每月租金
                                    </th>
                                    <td>
                                        235,433元
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        租赁方式
                                    </th>
                                    <td>
                                        一年起
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="c-content-box c-size-md c-bg-white" style="margin-bottom: 120px;">
        <div class="container">
            <div class="col-md-12">
                <div class="c-title c-font-bold c-font-uppercase" style="font-size: 30px; margin: 20px 0 30px 0;">
                    快闪店（9/15 /18/44人）
                </div>
            </div>
            <div class="col-md-4">
                <img src="/views/assets/base/img/content/mall/work-space-6.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
            </div>
            <div class="col-md-8">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    901#
                                </th>
                                <th>
                                    901+902#
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    面积
                                </th>
                                <td>
                                    36平方米
                                </td>
                                <td>
                                    70平方米
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    建议办公人数
                                </th>
                                <td>
                                    9人
                                </td>
                                <td>
                                    15人
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    租金单价
                                </th>
                                <td>
                                    30元/平/日
                                </td>
                                <td>
                                    25元/平/日
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    物业费单价
                                </th>
                                <td>
                                    30元/平/日
                                </td>
                                <td>
                                    30元/平/月
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    每月租金
                                </th>
                                <td>
                                    35,025元
                                </td>
                                <td>
                                    55,329元
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    特色
                                </th>
                                <td>
                                    临近eat n work现代休闲餐饮区<br>和正大厅,适合展示或快闪类客户
                                </td>
                                <td>
                                    与901相邻<br>可组合成前店后办公模式
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    租赁方式
                                </th>
                                <td>
                                    可短租
                                </td>
                                <td>
                                    可短租
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div><br>
    
        <div class="container">
            <div class="col-md-4">
                <img src="/views/assets/base/img/content/mall/work-space-7.jpg"  class="c-content-person-1 c-option-2 c-bordered c-shadow img-responsive" style="background-color: #fff;" />
            </div>
            <div class="col-md-8">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    橘色区域
                                </th>
                                <th>
                                    蓝色区域
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    面积
                                </th>
                                <td>
                                    220平方米
                                </td>
                                <td>
                                    70平方米
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    建议办公人数
                                </th>
                                <td>
                                    44人
                                </td>
                                <td>
                                    18人
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    租金单价
                                </th>
                                <td>
                                    16元/平/日
                                </td>
                                <td>
                                    19元/平/日
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    物业费单价
                                </th>
                                <td>
                                    30元/平/日
                                </td>
                                <td>
                                    30元/平/月
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    每月租金
                                </th>
                                <td>
                                    113,666元
                                </td>
                                <td>
                                    42,554元
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    特色
                                </th>
                                <td>
                                    适合广告、教育、电商、互联网企业
                                </td>
                                <td>
                                    套内有独立储藏室，<br>适合电商或零售客户
                                </td>
                            </tr>
                        </tbody>
                    </table>
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