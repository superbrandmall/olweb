<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/create-brand-admin.js"></script>'.PHP_EOL;
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header">
            <h4>
                新建品牌
            </h4>
            <div class="pull-right">
                <a href="javascript: window.history.go(-1);" class="btn btn-primary btn-sm">
                返回
            </a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> 保存</button>
            </div>
        </section>

        <section class="content" style="margin-top: 90px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="callout callout-info" style="display: none;">
                            新建品牌成功!
                        </div>
                        <div class="callout callout-danger" style="display: none;">
                            新建品牌失败!
                        </div>
                        <div class="callout callout-warning" style="display: none;">
                            该品牌已存在!
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default">
                            <div class="box-header with-border">
                                <h3 class="box-title">
                                </h3>
                                <div class="box-tools pull-right">
                                    <button class="slideout-menu-toggle btn btn-box-tool btn-box-tool-lg" data-toggle="tooltip" title="Help"><i class="fa fa-question"></i></button>
                                </div>
                            </div>

                            <div class="box-body">
                                <div class="form-group">
                                    <label for="brand_name" class="col-md-3 control-label" style="text-align: right;">品牌名称 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="brand_name" name="brand_name">
                                        <div id="errorcontainer-brand_name" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_1" class="col-md-3 control-label" style="text-align: right;">一级业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="modality_1" name="modality_1" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="儿童">儿童</option>
                                            <option value="基站">基站</option>
                                            <option value="娱乐服务">娱乐服务</option>
                                            <option value="工程设备">工程设备</option>
                                            <option value="服务">服务</option>
                                            <option value="零售">零售</option>
                                            <option value="餐饮">餐饮</option>
                                        </select>
                                        <div id="errorcontainer-modality_1" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_2" class="col-md-3 control-label" style="text-align: right;">二级业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="modality_2" name="modality_2" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="F&B Retail">F&B Retail</option>
                                            <option value="个人护理">个人护理</option>
                                            <option value="休闲娱乐">休闲娱乐</option>
                                            <option value="儿童育乐">儿童育乐</option>
                                            <option value="儿童零售">儿童零售</option>
                                            <option value="娱乐">娱乐</option>
                                            <option value="快时尚">快时尚</option>
                                            <option value="快餐">快餐</option>
                                            <option value="服务">服务</option>
                                            <option value="服装">服装</option>
                                            <option value="服饰">服饰</option>
                                            <option value="珠宝首饰">珠宝首饰</option>
                                            <option value="甜品">甜品</option>
                                            <option value="生活方式">生活方式</option>
                                            <option value="科技数码">科技数码</option>
                                            <option value="美容及个人护理">美容及个人护理</option>
                                            <option value="茶饮">茶饮</option>
                                            <option value="茶饮咖啡/甜品">茶饮咖啡/甜品</option>
                                            <option value="鞋服">鞋服</option>
                                            <option value="饮品">饮品</option>
                                            <option value="饰品">饰品</option>
                                        </select>
                                        <div id="errorcontainer-modality_2" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="modality_3" class="col-md-3 control-label" style="text-align: right;">三级业态 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="modality_3" name="modality_3" />
                                        <div id="errorcontainer-modality_3" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact_name_1" class="col-md-3 control-label" style="text-align: right;">联系人 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="contact_name_1" name="contact_name_1" />
                                        <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="contact_phone_1"  class="col-md-3 control-label" style="text-align: right;">联系电话 <span class="btn-box-tool-lg">*</span></label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" id="contact_phone_1" name="contact_phone_1" />
                                        <div id="errorcontainer-contact_phone_1" class="errorDiv"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="slideout-menu">
                        <a href="#" class="slideout-menu-toggle pull-right">×</a>
                        <h3>
                            注意事项
                        </h3>
                        <p><span class="btn-box-tool-lg">*</span> Silence is gold</p>
                    </div>
                </div>
            </div>
        </section>
    </form>    
</div>

<?php include 'footer.php'; ?>