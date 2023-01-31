<div class="box box-default" id="investmentContractAccounttermFixed">    
    <div class="box-header with-border">
        <h3 class="box-title">固定租金</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
        <div class="pull-right" style="margin-right: 30px;">
            <button type="button" class="btn btn-info btn-xs" onclick="javascript: saveContractFixedRent();"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存固定租金</span></button>
        </div>
        <div class="pull-right" style="margin-right: 10px;">
            <a href="javascript:void(0);" onClick="addRowInvestmentContractAccounttermFixed()">
                <i class="fa fa-plus-circle" style="color: #84CC3D; font-size: 16px; vertical-align: bottom;"></i> 增加行
            </a>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <div class="box-body">
                <div class="row">
                        <div class="bootstrap-table">
                            <div class="fixed-table-container">
                                <div class="fixed-table-body">
                                    <table class="table table-striped snipe-table table-responsive">
                                        <thead id="assetsListingTable-sticky-header">
                                            <tr>
                                                <th>
                                                    <div class="th-inner">行</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">科目 <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">期限 <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">单价(去税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">月金额(去税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">月金额(含税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">单价(含税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">预估营业额</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">税率 <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">开发票</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">操作</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="fixedRent">
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <select class="select2 fixedFeeItemDropDown new" id="fixedRentItem_1"></select>
                                                </td>
                                                <td>
                                                    <div class="input-daterange input-group">
                                                        <input type="text" class="form-control" id="fixedRentStartDate_1" style="min-width: 80px;" readonly />
                                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                        <span class="input-group-addon">-</span>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="fixedRentEndDate_1" style="min-width: 80px;" readonly />
                                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                        </div>    
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="input-group">
                                                        <input class="form-control money" id="fixedRentTaxRentAmount_1" type="text" readonly style="border: none;" />                                                
                                                        <span class="input-group-addon">元/m²/天</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="input-group">
                                                        <input class="form-control money" id="fixedRentTaxAmount_1" type="text" />                                                
                                                        <span class="input-group-addon">元</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="input-group">
                                                        <input class="form-control money" id="fixedRentAmount_1" type="text" />                                                
                                                        <span class="input-group-addon">元</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="input-group">
                                                        <input class="form-control money" id="fixedRentRentAmount_1" type="text" readonly style="border: none;" />                                                
                                                        <span class="input-group-addon">元/m²/天</span>
                                                    </div>
                                                </td>
                                                
                                                <td>
                                                    <select class="select2 taxVat newVAT fixedVATDropDown newFee" id="fixedRentTaxRate_1"></select>
                                                </td>
                                                <td><input type="checkbox" id="fixedRentInvoiceFlag_1" value="" checked></td>
                                                <td>
                                                    <a href="javascript:void(0);" onClick="deleteRow(this)" >
                                                        <i class="fa fa-minus-circle" style="color: #ED4A52; font-size: 16px;"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <h5 style="display: inline-block; margin-bottom: 0; margin-right: 10px; vertical-align: super;">账款总金额(含税|去税)</h5>
            <h3 id="fixedRentTotalRentAmount" style="display: inline-block;">0.00</h3>
            <h3 style="display: inline-block;">|</h3>
            <h3 id="fixedRentTaxTotalRentAmount" style="display: inline-block;">0.00</h3>
            <a href="javascript: void(0);" onclick="termsModalToggle('fixedRent');" style="font-size: 14px; margin-left: 10px; vertical-align: super;">查看账款明细</a>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">结算周期</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">周期类型</label>
                <div class="col-md-5 col-sm-6" style="padding-right: 2px;">
                    <select class="select2" id="fixedRentPeriodType_1" style="width: 100%">
                        <option value="1" selected>自然月</option>
                        <option value="2">合同月</option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-6" style="padding-left: 2px;">
                    <select class="select2" id="fixedRentSettleDay_1" style="width: 100%">
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
        <div class="col-md-3">
            <div class="form-group">
                <label class="col-md-4 control-label">结算周期 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="fixedRentSettlePeriod_1" style="width: 100%;">
                        <option value="M" selected>月</option>
                        <option value="Q">季</option>
                        <option value="Y">年</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">滞纳金条款</h5>
            <hr>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label class="col-md-5 control-label">产生滞纳金</label>
                <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                    <input type="checkbox" id="fixedRentIsOverdueFlag_1">
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label class="col-md-4 control-label">税率 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="fixedRentOverdueTaxRate_1" style="width: 100%">
                        <option value="0">增值税0%</option>
                        <option value="0.05">增值税5%</option>
                        <option value="0.06" selected>增值税6%</option>
                        <option value="0.11">增值税11%</option>
                        <option value="0.13">增值税13%</option>
                        <option value="0.17">增值税17%</option>
                        <option value="0.05">增值税5%(价内)</option>
                        <option value="0.16">增值税16%</option>
                        <option value="0.1">增值税10%</option>
                        <option value="0.09">增值税9%</option>
                        <option value="0.03">增值税3%</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label class="col-md-5 control-label">滞纳金率 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-7 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control" id="fixedRentOverdueRate_1" type="text" style="border-right: none;" value="1" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">‰</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label class="col-md-4 control-label">开发票</label>
                <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                    <input type="checkbox" id="fixedRentOverdueInvoiceFlag_1">
                </div>
            </div>
        </div>
    </div>
</div>