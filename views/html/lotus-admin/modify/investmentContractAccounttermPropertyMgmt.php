<div class="box box-default" id="investmentContractAccounttermPropertyMgmt">    
    <div class="box-header with-border">
        <h3 class="box-title">物业管理费</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
        <div class="pull-right" style="margin-right: 40px;">
            <a href="javascript:void(0);" style="margin-right: 10px; opacity: 0.5;">
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
                                                    <div class="th-inner">月面积单价(去税) <span class="btn-box-tool-lg">*</span></div>
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
                                                    <div class="th-inner">月面积单价(含税) <span class="btn-box-tool-lg">*</span></div>
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
                                        <tbody id="propertyMgmt"></tbody>
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
            <h3 id="propertyMgmtTotalPropertyAmount" style="display: inline-block;">0.00</h3>
            <h3 style="display: inline-block;">|</h3>
            <h3 id="propertyMgmtTaxTotalPropertyAmount" style="display: inline-block;">0.00</h3>
            <a href="javascript: void(0);" onclick="termsModalToggle('propertyMgmt');" style="font-size: 14px; margin-left: 10px; vertical-align: super;">查看账款明细</a>
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
                    <select class="select2" id="propertyMgmtPeriodType_1" style="width: 100%" disabled>
                        <option value="1" selected>自然月</option>
                        <option value="2">合同月</option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-6" style="padding-left: 2px;">
                    <select class="select2" id="propertyMgmtSettleDay_1" style="width: 100%" disabled>
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
                    <select class="select2" id="propertyMgmtSettlePeriod_1" style="width: 100%;" disabled>
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
            <label class="col-md-5 control-label">产生滞纳金</label>
            <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                <input type="checkbox" id="propertyMgmtIsOverdueFlag_1" checked disabled>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label class="col-md-4 control-label">税率 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="propertyMgmtOverdueTaxRate_1" style="width: 100%" disabled>
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
                        <input class="form-control" id="propertyMgmtOverdueRate_1" type="text" style="border-right: none;" value="1" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;">‰</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <label class="col-md-4 control-label">开发票</label>
            <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                <input type="checkbox" id="propertyMgmtOverdueInvoiceFlag_1" checked disabled>
            </div>
        </div>
    </div>
</div>