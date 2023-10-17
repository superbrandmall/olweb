<div class="modal fade" id="investment-contract-balance-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header" style="text-align: center;">
                <h4 style="display: inline-block; margin: 0 auto;">结算明细数据</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: absolute;right: 15px; z-index: 4; opacity: .5;">×</button>
                <button id="deleteCalc" type="button" class="btn btn-danger btn-xs" style="margin-left: 20px; margin-top: -8px; display: none;">删除</button>
            </div>
            <div class="modal-body" style="padding: 0 15px 15px 0;">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12 text-gray text-right">
                        <div class="form-group">
                            <div id="balanceUpdated"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="balanceDepartment" class="col-md-4 control-label" style="text-align: right;">项目 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="balanceDepartment" style="width: 100%"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="balanceContract" class="col-md-4 control-label" style="text-align: right;">合同 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="balanceContract" name="balanceContract" style="width: 100%"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="balanceTermType" class="col-md-4 control-label" style="text-align: right;">科目 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="balanceTermType" name="balanceTermType" style="width: 100%;" data-dropdownParent="$('#investment-contract-balance-create')">
                                        <option value="">未选择</option>
                                        <option value="B011">固定租金[B011]</option>
                                        <option value="B021">商场服务费-月[B021]</option>
                                        <option value="D011">提成租金[D011]</option>
                                        <option value="G011">固定推广费[G011]</option>
                                        <option value="E02">租赁押金[E02]</option>
                                        <option value="E03">装修押金[E03]</option>
                                        <option value="E22">公共事业费押金[E22]</option>
                                        <option value="H01">水费[H01]</option>
                                        <option value="H02">电费[H02]</option>
                                        <option value="H03">煤气费[H03]</option>
                                        <option value="Y021">商场服务费-年[Y021]</option>
                                        <option value="Y77">服务费-线损费[Y77]</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="startDate" class="col-md-4 control-label" style="text-align: right;">费用周期 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div id="balanceStartEndDate" class="input-daterange input-group">
                                        <input type="text" class="form-control" id="startDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                        <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">-</span>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="endDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                                            <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="balanceYearMonth" class="col-md-4 control-label" style="text-align: right;">账单结转期 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="balanceYearMonth" name="balanceYearMonth" type="text" data-plugin="balanceYearMonth" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="taxRate" class="col-md-4 control-label" style="text-align: right;">增值税率 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="taxRate" style="width: 100%">
                                        <option value="">未选择</option>
                                        <option value="0">V00</option>
                                        <option value="5">V05</option>
                                        <option value="6">V06</option>
                                        <option value="9">V09</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="amount" class="col-md-4 control-label" style="text-align: right;">含税金额 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control money" id="amount" type="text" style="border-right: none;" />                                                
                                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="taxAmount" class="col-md-4 control-label" style="text-align: right;">不含税金额 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control money" id="taxAmount" type="text" style="border-right: none;" />                                                
                                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="rentAmount" class="col-md-4 control-label" style="text-align: right;">含税单价 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control money" id="rentAmount" type="text" style="border-right: none;" />                                                
                                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="taxRentAmount" class="col-md-4 control-label" style="text-align: right;">不含税单价 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <div class="input-group">
                                        <input class="form-control money" id="taxRentAmount" type="text" style="border-right: none;" />                                                
                                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="settleDay" class="col-md-4 control-label" style="text-align: right;">结算日 <span class="btn-box-tool-lg" style="vertical-align: top;">*</span></label>
                                <div class="col-md-8 col-sm-12">
                                    <select class="select2" id="settleDay" style="width: 100%">
                                        <?php 
                                        {
                                           for($i=1;$i<=31;$i++){
                                               echo '<option value="'.$i.'">'.$i.'日</option>';
                                           }
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="remarks" class="col-md-1 control-label" style="text-align: right; margin-left: 24px;">备注</label>
                                <div class="col-md-10 col-sm-12">
                                    <input class="form-control" id="remarks" type="text" />                                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" id="adjustRow" style="display: none;">
                        <div class="col-md-4 col-md-offset-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-8 col-sm-12">
                                    <button type="button" class="btn btn-info btn-sm" id="saveCalc"><i class="fa fa-save icon-white"></i> <b class="hidden-xs">保存</span></b>
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