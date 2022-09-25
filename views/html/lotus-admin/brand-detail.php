<?php
if(isset($_SESSION['lotus_admin_name']) && $_SESSION['lotus_admin_name'] == '马俊') {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/brand-detail-admin.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
} else {
    $scripts = $scripts .PHP_EOL. '        <script type="text/javascript" src="/views/assets/base/js/lotus-admin/encrypted/brand-detail.js?t='.date("Y-m-d").'"></script>'.PHP_EOL;
}
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper brand-detail">
    <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 90px;">
            <h4>
                <span class="badge badge-success" id="status" style="vertical-align: top;"></span> 品牌: <b id="name2"></b>
            </h4>
            <div class="pull-right">
                <a class="btn btn-link text-left" href="javascript:void(0);" onclick="javascript: confirmCancel('<i class=\'fa fa-question-circle\'></i> 确定要取消吗?','brands');">取消</a>
                <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-check icon-white"></i> <span class="hidden-xs">提交保存</span></button>
            </div>
            <div class="box-header" id="navbarTop">
                <ul class="breadcrumb nav" style="margin-bottom: 0; padding-left: 0;">
                    <li><a href="#brandBasicInfo">基本信息</a></li>
                    <li><a href="#brandContacts">联系方式</a></li>
                    <li><a href="#brandCertificates">证照</a></li>
                    <li><a href="#brandUpload">附件</a></li>
                </ul>
            </div>
        </section>

        <section class="content" style="margin-top: 140px;">
            <div id="webui">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box box-default" id="brandBasicInfo">    
                            <div class="box-header with-border">
                                <h3 class="box-title">基本信息</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="brand_name" class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="brand_name" name="brand_name" readonly>
                                            <div id="errorcontainer-brand_name" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="brandAttribute" class="col-md-4 control-label">品牌档次</label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="brandAttribute" name="brandAttribute" style="width: 100%"></select>
                                            <div id="errorcontainer-brandAttribute" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="modality_1" class="col-md-4 control-label">一级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="modality_1" name="modality_1" style="width: 100%" disabled>
                                                <option value="">未选择</option>
                                                <option value="零售">零售</option>
                                                <option value="餐饮">餐饮</option>
                                                <option value="娱乐服务">娱乐服务</option>
                                                <option value="儿童">儿童</option>
                                                <option value="主力店">主力店</option>
                                            </select>
                                            <div id="errorcontainer-modality_1" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="modality_2" class="col-md-4 control-label">二级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="modality_2" name="modality_2" style="width: 100%" disabled>
                                                <option value="">未选择</option>
                                            </select>
                                            <div id="errorcontainer-modality_2" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="modality_3" class="col-md-4 control-label">三级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="modality_3" name="modality_3" style="width: 100%" disabled>
                                                <option value="">未选择</option>
                                            </select>
                                            <div id="errorcontainer-modality_3" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="modality_4" class="col-md-4 control-label">四级业态 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <select class="select2" id="modality_4" name="modality_4" style="width: 100%">
                                                <option value="">未选择</option>
                                            </select>
                                            <div id="errorcontainer-modality_4" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="brandContacts">    
                            <div class="box-header with-border">
                                <h3 class="box-title">联系方式</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="contact_name_1" class="col-md-4 control-label">联系人 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="contact_name_1" name="contact_name_1" />
                                            <div id="errorcontainer-contact_name_1" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="title" class="col-md-4 control-label">岗位 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="title" name="title" />
                                            <div id="errorcontainer-title" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="contact_phone_1" class="col-md-4 control-label">联系电话 <span class="btn-box-tool-lg">*</span></label>
                                        <div class="col-md-8 col-sm-12 required">
                                            <input class="form-control" type="text" id="contact_phone_1" name="contact_phone_1" />
                                            <div id="errorcontainer-contact_phone_1" class="errorDiv"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="brandCertificates">    
                            <div class="box-header with-border">
                                <h3 class="box-title">证照</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <table class="table table-responsive" style="margin-top: 0; text-align: left;">
                                    <thead id="assetsListingTable-sticky-header">
                                        <tr>
                                            <th style="text-align: left;">
                                                <div class="th-inner">证照类型</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: left;">
                                                <div class="th-inner">上传时间</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: left;">
                                                <div class="th-inner">文件名</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: left;">
                                                <div class="th-inner">大小</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th style="text-align: left;">
                                                <div class="th-inner">操作</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>商标注册证</td>
                                            <td id="trademarkCreated_0"></td>
                                            <td>
                                                <input type="text" id="trademark_0" name="trademark_0" style="border: 0 none; text-align: left; width: 100%;" placeholder="请从附件中上传商标注册证" readonly/>
                                            </td>
                                            <td id="trademarkFileSize_0"></td>
                                            <td id="trademarkAction_0"></td>
                                        </tr>
                                        <?php
                                            for($i=1;$i<10;$i++){
                                        ?>
                                        <tr style="display: none;">
                                            <td>商标注册证</td>
                                            <td id="trademarkCreated_<?= $i; ?>"></td>
                                            <td>
                                                <input type="text" id="trademark_<?= $i; ?>" name="trademark_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                            </td>
                                            <td id="trademarkFileSize_<?= $i; ?>"></td>
                                            <td id="trademarkAction_<?= $i; ?>"></td>
                                        </tr>
                                        <?php
                                            }
                                        ?>
                                        <tr>
                                            <td>品牌授权书</td>
                                            <td id="brandAuthorizationCreated_0"></td>
                                            <td>
                                                <input type="text" id="brandAuthorization_0" name="brandAuthorization_0" style="border: 0 none; text-align: left; width: 100%;" placeholder="请从附件中上传品牌授权书" readonly/>
                                            </td>
                                            <td id="brandAuthorizationFileSize_0"></td>
                                            <td id="brandAuthorizationAction_0"></td>
                                        </tr>
                                        <?php
                                            for($i=1;$i<10;$i++){
                                        ?>
                                        <tr style="display: none;">
                                            <td>品牌授权书</td>
                                            <td id="brandAuthorizationCreated_<?= $i; ?>"></td>
                                            <td>
                                                <input type="text" id="brandAuthorization_<?= $i; ?>" name="brandAuthorization_<?= $i; ?>" style="border: 0 none; text-align: left; width: 100%;" readonly/>
                                            </td>
                                            <td id="brandAuthorizationFileSize_<?= $i; ?>"></td>
                                            <td id="brandAuthorizationAction_<?= $i; ?>"></td>
                                        </tr>
                                        <?php
                                            }
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="box box-default" id="brandUpload">    
                            <div class="box-header with-border">
                                <h3 class="box-title">附件</h3>
                                <div class="box-tools">
                                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label">商标注册证</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group input-group">
                                                <input type="text" id="fileName_trademark" class="form-control" disabled style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_trademark\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="uploadFile_trademark" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="col-md-2 control-label">品牌授权书</label>
                                        <div class="col-md-10 col-sm-12">
                                            <div class="form-group input-group">
                                                <input type="text" id="fileName_brandAuthorization" class="form-control" disabled style="background-color: #fff; border: solid 1px rgb(210, 214, 222);">
                                                <input type="file" style="display: none;" onchange="javascript:$('input[id=\'fileName_brandAuthorization\']').val(this.files[0].name);" accept="image/*,application/pdf" multiple />
                                                <div type="button" class="input-group-addon" id="uploadFile_brandAuthorization" style="padding: 6px 12px; font-size: 11px; cursor: pointer; border-left: 0 none; border-right: 0 none;"><i class="fa fa-upload"></i> 上传文件</div>
                                                <div type="button" class="input-group-addon" style="background-color: #3c8dbc; border-color: #367fa9; padding: 6px 12px; font-size: 11px; cursor: pointer; color: #fff;" onclick="javascript:$(this).parent().find('input[type=\'file\']').click();"><i class="fa fa-folder-open-o"></i> 选择文件 &hellip;</div>
                                            </div>
                                        </div>
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