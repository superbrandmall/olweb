<div class="modal fade" id="investment-contract-voucher-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header" style="text-align: center;">
                <h4 style="display: inline-block; margin: 0 auto;">凭证数据条目</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: absolute;right: 15px; z-index: 4; opacity: .5;">×</button>
                <button id="deleteVoucher" type="button" class="btn btn-danger btn-xs" style="margin-left: 20px; margin-top: -8px; display: none;">删除</button>
            </div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherCode" class="col-md-4 control-label" style="text-align: right;">凭证编码</label>
                                <div class="col-md-8 col-sm-12">
                                    <input class="form-control" id="voucherCode" type="text" disabled />                                                
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherType" class="col-md-4 control-label" style="text-align: right;">凭证类型 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="voucherType" name="voucherType" style="width: 100%;">
                                        <option value="">未选择</option>
                                        <option value="Z3">Z3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherDepartment" class="col-md-4 control-label" style="text-align: right;">项目 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="voucherDepartment" style="width: 100%" disabled></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherContract" class="col-md-4 control-label" style="text-align: right;">合同 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="voucherContract" name="voucherContract" style="width: 100%" disabled></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherTermType" class="col-md-4 control-label" style="text-align: right;">科目 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="voucherTermType" name="voucherTermType" style="width: 100%;">
                                        <option value="">未选择</option>
                                        <option value="B011">固定租金[B011]</option>
                                        <option value="B021">物业管理费[B021]</option>
                                        <option value="D011">提成扣率[D011]</option>
                                        <option value="G011">固定推广费[G011]</option>
                                        <option value="E02">租赁保证金[E02]</option>
                                        <option value="E03">装修保证金[E03]</option>
                                        <option value="E22">公共事业费押金[E22]</option>
                                        <option value="H01">水费[H01]</option>
                                        <option value="H02">电费[H02]</option>
                                        <option value="H03">煤气费[H03]</option>
                                        <option value="Y021">物业管理费-年度[Y021]</option>
                                        <option value="Y77">服务费-线损费[Y77]</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherStartDate" class="col-md-4 control-label" style="text-align: right;">费用周期 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-daterange input-group">
                                        <input type="text" class="form-control" id="voucherStartDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                        <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">-</span>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="voucherEndDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                            <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherTaxRate" class="col-md-4 control-label" style="text-align: right;">增值税率 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="voucherTaxRate" style="width: 100%">
                                        <option value="">未选择</option>
                                        <option value="0">V00</option>
                                        <option value="5">V05</option>
                                        <option value="6">V06</option>
                                        <option value="9">V09</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherAmount" class="col-md-4 control-label" style="text-align: right;">含税金额 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control money" id="voucherAmount" type="text" style="border-right: none;" />                                                
                                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherTaxAmount" class="col-md-4 control-label" style="text-align: right;">不含税金额 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control money" id="voucherTaxAmount" type="text" style="border-right: none;" />                                                
                                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherDate" class="col-md-4 control-label" style="text-align: right;">凭证日期 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="voucherDate" name="voucherDate" type="text" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherPostDate" class="col-md-4 control-label" style="text-align: right;">过账日期 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="voucherPostDate" name="voucherPostDate" type="text" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="voucherYearMonth" class="col-md-4 control-label" style="text-align: right;">账单结转期 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="voucherYearMonth" name="voucherYearMonth" type="text" data-plugin="yearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="voucherInfo" class="col-md-2 control-label" style="text-align: right;">抬头文本</label>
                                <div class="col-md-10 col-sm-12">
                                    <input class="form-control" id="voucherInfo" type="text" />                                                
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">是否冲销</label>
                                <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                                    <input type="checkbox" id="writeOffVoucherFlag" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-12">
                        <div class="box-body">
                            <div class="row">
                                <div class="bootstrap-table">
                                    <div class="fixed-table-container">
                                        <div class="fixed-table-body">
                                            <table id="voucherItem" class="table table-striped snipe-table table-responsive" style="font-size: 10px;">
                                                <thead id="assetsListingTable-sticky-header">
                                                    <tr>
                                                        <th>
                                                            <div class="th-inner">行</div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">D <span class="btn-box-tool-lg">*</span></div>
                                                            <div class="fht-cell"></div><!-- debitCreditFlag -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">总账科目 <span class="btn-box-tool-lg">*</span></div>
                                                            <div class="fht-cell"></div><!-- subjectCode -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">本币</div>
                                                            <div class="fht-cell"></div><!-- localCurrencyCode -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">本币金额</div>
                                                            <div class="fht-cell"></div><!-- localAmount -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">利润中心</div>
                                                            <div class="fht-cell" style="width: 75px;"></div><!-- profitCenter -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">税码 <span class="btn-box-tool-lg">*</span></div>
                                                            <div class="fht-cell"></div><!-- taxCode -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">计息逾期日期 <span class="btn-box-tool-lg">*</span></div>
                                                            <div class="fht-cell"></div><!-- interestOverDate -->
                                                        </th>
                                                        <th>
                                                            <div class="th-inner">支付逾期日期 <span class="btn-box-tool-lg">*</span></div>
                                                            <div class="fht-cell"></div><!-- paymentOverDate -->
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
                    
                    <div class="col-md-12" id="adjustRow" style="display: none;">
                        <div class="col-md-4 col-md-offset-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-8 col-sm-12">
                                    <button type="button" class="btn btn-info btn-sm" id="saveVoucher"><i class="fa fa-save icon-white"></i> <b class="hidden-xs">保存</span></b>
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