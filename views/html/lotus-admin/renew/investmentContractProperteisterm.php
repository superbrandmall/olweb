 <div class="box box-default" id="investmentContractProperteisterm">    
    <div class="box-header with-border">
        <h3 class="box-title">其它续约条件</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">续租签署日 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="rewardDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" required />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">目标营业额 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="targetSales" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/月</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">收银方式 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="posMode" style="width: 100%" disabled></select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">租金变化 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="renewRentSameFlag" style="width: 100%">
                        <option value="" selected>未选择</option>
                        <option value="0">增长/减少</option>
                        <option value="1">平续</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">物管费变化 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="renewPropertySameFlag" style="width: 100%">
                        <option value="" selected>未选择</option>
                        <option value="0">增长/减少</option>
                        <option value="1">平续</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">押金为固租和物管费倍数 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="depositTimes" type="number" min="0" step="0.01" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="border: 1px solid #ccc; background: #fff; border-right: none; ime-mode:disabled;" />                                      
                        <span class="input-group-addon" style="border-left: none; background: transparent;">倍</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">费用支付方式 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="renewPaymentSameFlag" style="width: 100%">
                        <option value="" selected>未选择</option>
                        <option value="1">与原合同保持一致</option>
                        <option value="0">有变更</option> 
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">支付方式变更为</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="renewPaymentContent" type="text" />
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">需要配合调改 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="renewAdjustFlag" style="width: 100%">
                        <option value="" selected>未选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">甲方可提前几日解除合同 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="renewAdjustBeforeDays" type="number" min="0" step="1" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="border: 1px solid #ccc; background: #fff; border-right: none; ime-mode:disabled;" />                                      
                        <span class="input-group-addon" style="border-left: none; background: transparent;">天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">品牌需要保留 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="renewBrandHoldFlag" style="width: 100%">
                        <option value="" selected>未选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="form-group">
                <label class="col-md-2 control-label">暂时保留的原因 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-10 col-sm-12">
                    <input class="form-control" id="renewBrandHoldReason" type="text" placeholder="最多50字" maxlength="50" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">近12月平均销售额 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="renewAvgSales" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/月</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="form-group">
                <label class="col-md-2 control-label">该铺位预算中的情况说明 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-10 col-sm-12">
                    <input class="form-control" id="renewBudgetDesc" type="text" placeholder="最多50字" maxlength="50" />
                </div>
            </div>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="float: left;">预估销售额 <span class="btn-box-tool-lg">*</span></h5>
            <div class="pull-right" style="margin: 10px 0;">
                <a href="javascript:void(0);" onClick="addRowMinSales()">
                    <i class="fa fa-plus-circle" style="color: #84CC3D; font-size: 16px; vertical-align: bottom;"></i> 增加行
                </a>
            </div>
        </div>
        <div class="col-md-12">
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner">行</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">期限 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">金额 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">操作</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="minSales"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>