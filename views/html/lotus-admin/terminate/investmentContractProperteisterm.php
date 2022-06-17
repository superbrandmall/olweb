 <div class="box box-default" id="investmentContractProperteisterm">    
    <div class="box-header with-border">
        <h3 class="box-title">其它终止条件</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">合同终止日 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="cancelDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" required />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">终止签署日 <span class="btn-box-tool-lg">*</span></label>
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
                <label class="col-md-4 control-label">保证金及其它费用 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="cancelDepositType" style="width: 100%">
                        <option value="A">退还扣除乙方应付未付款项后的余额</option>
                        <option value="B">均不予退还</option>
                        <option value="C">乙方欠费（除拆除费）从保证金扣除，剩余保证金没收</option>
                        <option value="D">乙方欠费与拆除费从保证金扣除，剩余保证金没收</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">违约金支付日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="cancelBreachPaymentDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">违约金金额</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="cancelBreachAmount" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">违约金选项 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="cancelBreachType" style="width: 100%">
                        <option value="A">双方互无需承担任何赔偿和/或补偿和/或违约责任</option>
                        <option value="B">乙方应补交装修期内和/或其他减免的费用</option>
                        <option value="C">乙方还需支付甲方租赁期内最高年度月租金和月物业管理费之和的三倍金额</option>
                        <option value="D">其它违约金</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">乙方支付费用日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="cancelPaymentDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">乙方支付费用总计</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="cancelPaymentAmount" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">乙方遗留物截止日 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="cancelKeepDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" required />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">拆除费用</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="cancelDemolishAmount" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">房屋交还条款 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="cancelDemolishType" style="width: 100%">
                        <option value="A">乙方自费并复原</option>
                        <option value="B">甲方复原，乙方承担费用</option>
                        <option value="C">甲方复原并承担费用</option>
                        <option value="D">保留房屋现状</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">房屋交还截止日</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="cancelDemolishDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>