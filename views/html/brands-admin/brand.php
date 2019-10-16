<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/brand-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            查看品牌
        </h1>
        <div class="pull-right">
            <?php $_SESSION['record_url'] == ''?  $back = 'brands-admin/' : $back = $_SESSION['record_url']; ?>
            <a href="<?= $back ?>" class="btn btn-primary pull-right">
                返回
            </a>
        </div>
    </section>

    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="callout callout-info" style="display: none;">
                        删除联系人成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        删除联系人失败!
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a href="#details" data-toggle="tab" aria-expanded="false">
                                    <span class="hidden-lg hidden-md">
                                        <i class="fa fa-info-circle"></i>
                                    </span>
                                    <span class="hidden-xs hidden-sm">基础信息</span>
                                </a>
                            </li>

                            <li>
                                <a href="#contacts_tab" data-toggle="tab">
                                    <span class="hidden-lg hidden-md">
                                        <i class="fa fa-user"></i></span>
                                    <span class="hidden-xs hidden-sm">联系人</span>
                                </a>
                            </li>

                            <li class="dropdown pull-right">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                    <i class="fa fa-gear"></i> 操作
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li style="display: none;"><a href="#!" class="update-link">更新品牌</a></li>
                                    <li style="display: none;"><a href="#!" class="delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">删除品牌</a></li>
                                    <li style="display: none;"><a href="#!" class="lock-link" id="lock1">锁定品牌</a></li>
                                    <li><a href="#!" class="create-contact-link">新增联系人</a></li>
                                </ul>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div class="tab-pane active" id="details">
                                <div class="row">
                                    <div class="col-md-2 text-center">
                                        <img id="imagePreview" class="avatar img-circle" style="max-width: 200px; max-height: 100px;">
                                    </div>

                                    <div class="col-md-8">
                                        <div class="table table-responsive">
                                            <table class="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td class="text-nowrap">品牌名称</td>
                                                        <td id="brand_name"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">新业态</td>
                                                        <td id="new_category"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">一级业态</td>
                                                        <td id="modality_1"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">二级业态</td>
                                                        <td id="modality_2"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">三级业态</td>
                                                        <td id="modality_3"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">品牌属性</td>
                                                        <td id="attribute"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">品牌价位</td>
                                                        <td id="class"></td>
                                                    </tr>


                                                    <tr>
                                                        <td class="text-nowrap">口碑</td>
                                                        <td id="reputation"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">市场销售份额</td>
                                                        <td id="market_share"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">英文名称</td>
                                                        <td id="name_eng"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">开店区域</td>
                                                        <td id="location"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">标准店面积</td>
                                                        <td id="standard_area"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">主要客户群</td>
                                                        <td id="target"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">城市</td>
                                                        <td id="city"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">品牌发展历史</td>
                                                        <td id="history"></td>
                                                    </tr>

                                                    <tr>
                                                        <td class="text-nowrap">行业排名</td>
                                                        <td id="rank"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">当地已开店数</td>
                                                        <td id="shop_amount"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">月均销售额坪效</td>
                                                        <td id="compare"></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">客单价</td>
                                                        <td><span id="average_unit_price"></span>元</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="text-nowrap">是否有旗下品牌已入驻SBM/TM</td>
                                                        <td><span id="joined"></span>个</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="col-md-12" style="display: none;">
                                            <a href="#!" style="width: 100%;" class="btn btn-sm btn-default update-link">更新品牌</a>
                                        </div>
                                        <div class="col-md-12" style="display: none; padding-top: 5px;">
                                            <a href="#!" style="width: 100%;" class="btn btn-sm btn-danger delete-asset" data-tooltip="true" data-toggle="modal" data-content="是否确定删除该品牌 ?" data-title="删除品牌" onclick="return false;">删除品牌</a>
                                        </div>
                                        <div class="col-md-12" style="display: none; padding-top: 5px;">
                                            <a href="#!" style="width: 100%;" class="btn btn-sm btn-success lock-link" id="lock2">锁定品牌</a>
                                        </div>
                                        <div class="col-md-12" style="padding-top: 5px;">
                                            <a href="#!" style="width: 100%;" class="btn btn-sm btn-info create-contact-link">新增联系人</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane" id="contacts_tab">
                                <div class="table-responsive">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-container table-no-bordered" style="padding-bottom: 0px;">
                                            <div class="fixed-table-header" style="display: none;">
                                                <table></table>
                                            </div>
                                            <div class="fixed-table-body">
                                                <div class="fixed-table-loading" style="top: 1px; display: none;">
                                                    <h4><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading... please wait.... </h4>
                                                </div>
                                                <table class="table table-striped snipe-table table-responsive table-no-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th class="col-sm-1">
                                                                <div class="th-inner">姓名</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-2">
                                                                <div class="th-inner">名片</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-2">
                                                                <div class="th-inner">公司</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-2">
                                                                <div class="th-inner">职位</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-1">
                                                                <div class="th-inner">电话</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-1">
                                                                <div class="th-inner">微信</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-1">
                                                                <div class="th-inner">邮箱</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-1">
                                                                <div class="th-inner">所有人</div><div class="fht-cell"></div>
                                                            </th>
                                                            <th class="col-sm-1">
                                                                <div class="th-inner"></div><div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="contactsTable"></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'footer.php'; ?>