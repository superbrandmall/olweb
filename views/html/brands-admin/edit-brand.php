<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/brands-admin/edit-brand-admin.js"></script>';
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            修改品牌
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
                        修改品牌成功!
                    </div>
                    <div class="callout callout-danger" style="display: none;">
                        修改品牌失败!
                    </div>
                    <div class="callout callout-warning" style="display: none;">
                        该品牌已存在!
                    </div>
                </div>
            </div>
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
                            <form id="edit-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="brand_name" class="col-md-3 control-label">品牌名称 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="brand_name" name="brand_name" readonly>
                                        <div id="errorcontainer-brand_name" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="new_category" class="col-md-3 control-label">新业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="new_category" name="new_category" style="width: 100%">
                                            <option value="">未选择</option>
                                        </select>
                                        <div id="errorcontainer-new_category" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_1" class="col-md-3 control-label">一级业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="modality_1" name="modality_1" style="width: 100%">
                                            <option value="">未选择</option>
                                        </select>
                                        <div id="errorcontainer-modality_1" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_2" class="col-md-3 control-label">二级业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="modality_2" name="modality_2" style="width: 100%">
                                            <option value="">未选择</option>
                                        </select>
                                        <div id="errorcontainer-modality_2" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_3" class="col-md-3 control-label">三级业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="modality_3" name="modality_3" style="width: 100%">
                                            <option value="">未选择</option>
                                        </select>
                                        <div id="errorcontainer-modality_3" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="average_unit_price" class="col-md-3 control-label">客单价 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <div class="input-group" style="padding-left: 0px;">
                                            <input class="form-control" type="text" id="average_unit_price" name="average_unit_price" />
                                            <span class="input-group-addon">元</span>
                                        </div>
                                        <div id="errorcontainer-average_unit_price" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="compare" class="col-md-3 control-label">月均销售额坪效 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="compare" name="compare" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">> 当地同等行业水平 20%</option>
                                            <option value="2">> 当地同等行业水平 10%</option>
                                            <option value="3">= 当地同等行业水平</option>
                                            <option value="4">< 当地同等行业水平 10%</option>
                                            <option value="5">< 当地同等行业水平 20%</option>
                                        </select>
                                        <div id="errorcontainer-compare" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="standard_area" class="col-md-3 control-label">标准店面积 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="standard_area" name="standard_area" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">< 80 m&sup2;</option>
                                            <option value="2">80 - 150 m&sup2;</option>
                                            <option value="3">150 - 250 m&sup2;</option>
                                            <option value="4">250 - 600 m&sup2;</option>
                                            <option value="5">> 600 m&sup2;</option>
                                        </select>
                                        <div id="errorcontainer-standard_area" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="entered_mall" class="col-md-3 control-label">已入驻购物中心 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="entered_mall" name="entered_mall" value="" />
                                        <div id="errorcontainer-entered_mall" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="competitor" class="col-md-3 control-label">对标品牌 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="competitor" name="competitor" value="" />
                                        <div id="errorcontainer-competitor" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label" for="logo">品牌Logo <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <label class="btn btn-default">
                                            选择文件...
                                            <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                            <input type="hidden" id="hidden_logo" name="hidden_logo">
                                            <input type="file" name="logo" id="logo" data-maxsize="9000000" accept="image/gif,image/jpeg,image/png,image/svg" style="width: 0;height: 0;">
                                        </label>
                                        <span class="help-block" id="logo-status">文件类型可选择jpg、png、gif或svg，文件最大尺寸不超过10M。</span>
                                        <span class='label label-default' id="logo-info"></span>
                                    </div>
                                    <div class="col-md-4 col-md-offset-3">
                                        <img id="imagePreview" style="max-width: 200px;">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="attribute" class="col-md-3 control-label">品牌属性 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="attribute" name="attribute" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">国际知名品牌国内首家</option>
                                            <option value="2">国际主流知名品牌</option>
                                            <option value="3">国际普通品牌</option>
                                            <option value="4">国内主流知名品牌</option>
                                            <option value="5">国内普通品牌</option>
                                            <option value="6">区域知名品牌</option>
                                            <option value="7">区域普通品牌</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="class" class="col-md-3 control-label">品牌价位 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="class" name="class" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">奢侈</option>
                                            <option value="2">中等</option>
                                            <option value="3">低端</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="reputation" class="col-md-3 control-label">口碑 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="reputation" name="reputation" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">非常好</option>
                                            <option value="2">比较好</option>
                                            <option value="3">一般</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="market_share" class="col-md-3 control-label">市场销售份额 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7 col-sm-12">
                                        <div class="input-group" style="padding-left: 0px;">
                                            <input class="form-control" type="text" id="market_share" name="market_share" />
                                            <span class="input-group-addon">%</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="name_eng" class="col-md-3 control-label">英文名称 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="name_eng" name="name_eng" />
                                        <div id="errorcontainer-name_eng" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="location" class="col-md-3 control-label">开店区域 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="location" name="location" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">商务区</option>
                                            <option value="2">居民区</option>
                                            <option value="3">商务区/居民区</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="target" class="col-md-3 control-label">主要客户群 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="target" name="target" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">快速增长的中产家庭</option>
                                            <option value="2">金领/商务精英/高级白领/专业人</option>
                                            <option value="3">富裕的年长者/心态年轻的中老年人</option>
                                            <option value="4">有消费力的新世代（80/90后）</option>
                                            <option value="5">都有</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group ">
                                    <label for="city" class="col-md-3 control-label">城市 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="city" name="city" value="" />
                                        <div id="errorcontainer-city" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="history" class="col-md-3 control-label">品牌发展历史 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="history" name="history" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">> 10年</option>
                                            <option value="2">> 5年</option>
                                            <option value="3">> 2年</option>
                                            <option value="4">新品牌</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label for="rank" class="col-md-3 control-label">行业排名 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7 col-sm-12">
                                        <input class="form-control" type="text" id="rank" name="rank" />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="shop_amount" class="col-md-3 control-label">当地已开店数 <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="shop_amount" name="shop_amount" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">> 10家</option>
                                            <option value="2">5-10家</option>
                                            <option value="3">< 5家</option>
                                            <option value="4">0</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="joined" class="col-md-3 control-label">是否有旗下品牌已入驻SBM/TM <span style="margin-right:10px;"></span></label>
                                    <div class="col-md-7">
                                        <select class="select2" id="joined" name="joined" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">0</option>
                                            <option value="2">1</option>
                                            <option value="3">2</option>
                                            <option value="4">3</option>
                                            <option value="5">> 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/brands-admin/brands">取消</a>
                                    <button type="submit" class="btn btn-success"><i class="fa fa-check icon-white"></i> 保存</button>
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
                    <p><span class="btn-box-tool-lg">*</span> 号代表该栏目为必填。</p>
                </div>
            </div>

        </div>

    </section>

</div>

<?php include 'footer.php'; ?>