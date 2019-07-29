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
            <a href="javascript: window.history.go(-1);" class="btn btn-primary pull-right">
                返回
            </a>
        </div>
    </section>
    
    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-default">
                        <div class="box-header with-border">
                            <h3 class="box-title">
                            </h3>
                            <div class="box-tools pull-right">
                                <button class="slideout-menu-toggle btn btn-box-tool btn-box-tool-lg" data-toggle="tooltip" title="Help"><i class="fa fa-question"></i></button>
                            </div>
                        </div>

                        <div class="box-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="brand_name" class="col-md-3 control-label">品牌名称</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="brand_name" name="brand_name" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="contact_name_1" class="col-md-3 control-label">联系人姓名</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="contact_name_1" name="contact_name_1" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="contact_phone_1"  class="col-md-3 control-label">联系人电话</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="contact_phone_1" name="contact_phone_1" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="company_name" class="col-md-3 control-label">联系人公司</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="company_name" name="company_name" readonly />
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="title"  class="col-md-3 control-label">联系人职位</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="title" name="title" readonly />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="new_category" class="col-md-3 control-label">新业态</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="new_category" name="new_category" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_1" class="col-md-3 control-label">一级业态</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="modality_1" name="modality_1" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_2" class="col-md-3 control-label">二级业态</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="modality_2" name="modality_2" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_3" class="col-md-3 control-label">三级业态</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="modality_3" name="modality_3" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="attribute" class="col-md-3 control-label">品牌属性</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="attribute" name="attribute" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="class" class="col-md-3 control-label">品牌价位</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="class" name="class" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="reputation" class="col-md-3 control-label">口碑</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="reputation" name="reputation" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="market_share" class="col-md-3 control-label">市场销售份额</label>
                                    <div class="col-md-7 col-sm-12">
                                        <div class="input-group" style="padding-left: 0px;">
                                            <input class="form-control" type="text" id="market_share" name="market_share" readonly />
                                            <span class="input-group-addon">%</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="name_eng" class="col-md-3 control-label">英文名称</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="name_eng" name="name_eng" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="location" class="col-md-3 control-label">开店区域</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="location" name="location" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="standard_area" class="col-md-3 control-label">标准店面积</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="standard_area" name="standard_area" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="target" class="col-md-3 control-label">主要客户群</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="target" name="target" readonly>
                                    </div>
                                </div>

                                <div class="form-group ">
                                    <label for="city" class="col-md-3 control-label">城市</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="city" name="city" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="history" class="col-md-3 control-label">品牌发展历史</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="history" name="history" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="rank" class="col-md-3 control-label">行业排名</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="rank" name="rank" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="shop_amount" class="col-md-3 control-label">当地已开店数</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="shop_amount" name="shop_amount" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="compare" class="col-md-3 control-label">月均销售额坪效</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="compare" name="compare" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="average_unit_price" class="col-md-3 control-label">客单价</label>
                                    <div class="col-md-7 col-sm-12">
                                        <div class="input-group" style="padding-left: 0px;">
                                            <input class="form-control" type="text" id="average_unit_price" name="average_unit_price" readonly>
                                            <span class="input-group-addon">元</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="joined" class="col-md-3 control-label">是否有旗下品牌已入驻SBM/TM</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="joined" name="joined" readonly>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label" for="logo">品牌Logo</label>
                                    <div class="col-md-7">
                                        <img id="imagePreview" style="max-width: 200px;">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="slideout-menu">
                    <a href="#" class="slideout-menu-toggle pull-right">×</a>
                    <h3>
                        注意事项
                    </h3>
                    <p>新增品牌应谨慎小心，严格按照格式要求填写内容，以免引起差错。 </p>
                </div>
            </div>

        </div>

    </section>

</div>

<?php include 'footer.php'; ?>