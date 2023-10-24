<div class="modal fade" id="investment-contract-tenant-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header" style="text-align: center;">
                <h4 style="display: inline-block; margin: 0 auto;"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: absolute;right: 15px; z-index: 4; opacity: .5;">×</button>
            </div>
            <div class="modal-body" style="padding-top: 0;">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12 text-gray text-right">
                        <div class="form-group">
                            <div id="tenantUpdated"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantName" class="col-md-4 control-label">商户</label>
                                <div class="col-md-8 col-sm-12" id="tenantName" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantMessIdOs" class="col-md-4 control-label">Mess Id Os</label>
                                <div class="col-md-8 col-sm-12" id="tenantMessIdOs" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantShortName" class="col-md-4 control-label">简称</label>
                                <div class="col-md-8 col-sm-12" id="tenantShortName" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantUSCC" class="col-md-4 control-label">纳税识别号</label>
                                <div class="col-md-8 col-sm-12" id="tenantUSCC" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantRegAddress" class="col-md-4 control-label">登记地址</label>
                                <div class="col-md-8 col-sm-12" id="tenantRegAddress" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantPhone" class="col-md-4 control-label">登记电话</label>
                                <div class="col-md-8 col-sm-12" id="tenantPhone" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantPostCode" class="col-md-4 control-label">邮政编码</label>
                                <div class="col-md-8 col-sm-12" id="tenantPostCode" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantCityCode" class="col-md-4 control-label">城市代码</label>
                                <div class="col-md-8 col-sm-12" id="tenantCityCode" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantAccountGroup" class="col-md-4 control-label">账户组</label>
                                <div class="col-md-8 col-sm-12" id="tenantAccountGroup" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantPaymentTerm" class="col-md-4 control-label">支付条款</label>
                                <div class="col-md-8 col-sm-12" id="tenantPaymentTerm" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantDepartment" class="col-md-4 control-label">项目</label>
                                <div class="col-md-8 col-sm-12" id="tenantDepartment" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tenantBankDummyAccount" class="col-md-4 control-label">虚拟账户</label>
                                <div class="col-md-8 col-sm-12" id="tenantBankDummyAccount" style="padding-top: 7px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="box-body">
                            <div class="row">
                                <div class="bootstrap-table">
                                    <div class="fixed-table-container">
                                        <div class="fixed-table-body">
                                            <table id="bankList" class="table table-striped snipe-table table-responsive" style="font-size: 10px;">
                                                <thead id="assetsListingTable-sticky-header">
                                                    <tr>
                                                        <th>
                                                            <div class="th-inner">行</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">银行名称</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">银行账号</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner" style="width: 50px;">类型</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">商户编号</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">银行组</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">省市</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">联行号代码</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">地区代码</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">国家代码</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>