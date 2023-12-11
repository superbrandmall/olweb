<div class="modal fade" id="investment-fee-item-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header" style="text-align: center;">
                <h4 style="display: inline-block; margin: 0 auto;">科目详情</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: absolute;right: 15px; z-index: 4; opacity: .5;">×</button>
            </div>
            <div class="modal-body" style="padding: 0 15px 15px 0;">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12 text-gray text-right">
                        <div class="form-group">
                            <div id="itemUpdated"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalItemCode" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">科目编号 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control mandatory" id="modalItemCode" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalItemName" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">科目名称 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control mandatory" id="modalItemName" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalDebitItemCode" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">借方科目编号 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control mandatory" id="modalDebitItemCode" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalDebitItemName" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">借方科目名称 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control mandatory" id="modalDebitItemName" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalCreditItemCode" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">贷方科目编号 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control mandatory" id="modalCreditItemCode" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalCreditItemName" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">贷方科目名称 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control mandatory" id="modalCreditItemName" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalCreditTaxItemCode" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">贷方税科目编号</label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control" id="modalCreditTaxItemCode" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalCreditTaxItemName" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">贷方税科目名称</label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control" id="modalCreditTaxItemName" type="text" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalTransactionType" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">类型</label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control" id="modalTransactionType" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="modalIsTaxFlag" class="col-md-4 control-label" style="text-align: right; padding-right: 0;">是否交税</label>
                                <div class="col-md-1 col-sm-6" style="padding-top: 7px;">
                                    <input type="checkbox" id="modalIsTaxFlag">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4 col-md-offset-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-8 col-sm-12">
                                    <button type="button" class="btn btn-info btn-sm" id="saveItem"><i class="fa fa-save icon-white"></i> <b class="hidden-xs">保存</span></b>
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