<div class="modal fade" id="investment-gl-config-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header" style="text-align: center;">
                <h4 style="display: inline-block; margin: 0 auto;">账期详情</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: absolute;right: 15px; z-index: 4; opacity: .5;">×</button>
            </div>
            <div class="modal-body" style="padding: 0 15px 15px 0;">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12 text-gray text-right">
                        <div class="form-group">
                            <div id="configUpdated"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="glConfigMall" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">项目</label>
                                <div class="col-md-8 col-sm-12">
                                    <span id="glConfigMall" style="display: block; margin-top: 7px;"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="glConfigCompanyName" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">公司名称</label>
                                <div class="col-md-8 col-sm-12">
                                    <span id="glConfigCompanyName" style="display: block; margin-top: 7px;"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="glConfigCompanyCode" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">公司编码</label>
                                <div class="col-md-8 col-sm-12">
                                    <span id="glConfigCompanyCode" style="display: block; margin-top: 7px;"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="glConfigGlType" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">模块</label>
                                <div class="col-md-8 col-sm-12">
                                    <span id="glConfigGlType" style="display: block; margin-top: 7px;"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="glConfigPeriod" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">会计期间 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="glConfigPeriod" name="glConfigPeriod" type="text" data-plugin="yearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4 col-md-offset-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-8 col-sm-12">
                                    <button type="button" class="btn btn-info btn-sm" id="saveConfig"><i class="fa fa-save icon-white"></i> <b class="hidden-xs">保存</span></b>
                                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close" style="margin-left: 10px;"><i class="fa fa-times icon-white"></i> <b class="hidden-xs">取消</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>