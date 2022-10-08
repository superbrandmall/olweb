<div class="modal fade" id="investment-contract-request-modify-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4 class="text-center"></h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">项目</label>
                            <div class="col-md-8 col-sm-12">
                                <select class="select2" id="modifyDepartment" style="width: 100%">
                                    <option value="">未选择</option>
                                    <option value="SC033">川沙店[SC033]</option>
                                    <option value="SC001">杨高南路店[SC001]</option>
                                    <option value="SC005">上南店[SC005]</option>
                                    <option value="SC011">杨高北路店[SC011]</option>
                                    <option value="SC043">杨高中路店[SC043]</option>
                                    <option value="SC078">浦江店[SC078]</option>
                                    <option value="SC145">临港店[SC0145]</option>
                                    <option value="SC055">松江文诚店[SC055]</option>
                                    <option value="SC027">松江岳阳店[SC027]</option>
                                    <option value="SC126">牡丹江店[SC0126]</option>
                                    <option value="SC060">蕴川店[SC060]</option>
                                    <option value="SC082">新港店[SC082]</option>
                                    <option value="SC010">汶水店[SC010]</option>
                                    <option value="SC040">保德店[SC040]</option>
                                    <option value="SC041">南奉店[SC041]</option>
                                    <option value="SC127">南桥店[SC127]</option>
                                    <option value="SC050">金山店[SC050]</option>
                                    <option value="SC026">解放南路店[SC026]</option>
                                    <option value="SC130">大学路店[SC130]</option>
                                    <option value="SC138">中山北路店[SC138]</option>
                                    <option value="SC034">长江路店[SC034]</option>
                                    <option value="SC124">花桥店[SC124]</option>
                                    <option value="SC140">锡山东亭店[SC140]</option>
                                </select>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 合同</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="modifyContract" style="width: 100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">商户</label>
                            <div class="col-md-8 col-sm-12" id="modifyTenant" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">店招</label>
                            <div class="col-md-8 col-sm-12" id="modifyContractName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">门牌号</label>
                            <div class="col-md-8 col-sm-12" id="modifyUnitName" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">租赁期限</label>
                            <div class="col-md-8 col-sm-12" id="modifyStartEndDate" style="padding-top: 7px;">-</div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 表单类型</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="modifyUpdateFormType" style="width: 100%" disabled></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="modifyCreateRequest"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>