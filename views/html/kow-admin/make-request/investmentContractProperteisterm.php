 <div class="box box-default" id="investmentContractProperteisterm">    
    <div class="box-header with-border">
        <h3 class="box-title">其它新签条件</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">预估销售数据</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowDaySales" class="col-md-4 control-label">日均销售额 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowDaySales" name="kowDaySales" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowTotalSales" class="col-md-4 control-label">总计销售额 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowTotalSales" name="kowTotalSales" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowProfitRate" class="col-md-4 control-label">毛利率 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowProfitRate" name="kowProfitRate" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">%</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowNetRate" class="col-md-4 control-label">净利率 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowNetRate" name="kowNetRate" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">%</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowNetProfit" class="col-md-4 control-label">净利额 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowNetProfit" name="kowNetProfit" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">费用</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowLabourCost" class="col-md-4 control-label">人工费 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <input class="form-control money" id="kowLabourCost" name="kowLabourCost" type="text" />                                                
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowLabourUnit" class="col-md-4 control-label">人工费单位 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="kowLabourUnit" name="kowLabourUnit" style="width: 100%">
                        <option value="">未选择</option>
                        <option value="元/人/月">元/人/月</option>
                        <option value="元/人/天">元/人/天</option>
                        <option value="元/人/时">元/人/时</option>
                        <option value="元/人/次">元/人/次</option>
                    </select>                                               
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowPersonNum" class="col-md-4 control-label">人数 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="kowPersonNum" name="kowPersonNum" style="width: 100%">
                        <option value="">未选择</option>
                        <?php
                            for($i=1;$i<=10;$i++){
                        ?>
                            <option value="<?= $i ?>"><?= $i ?>人</option>
                        <?php
                            }
                        ?>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowMatterConsumable" class="col-md-4 control-label">装饰物料及耗材 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowMatterConsumable" name="kowMatterConsumable" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/月</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label for="kowFreight" class="col-md-4 control-label">运输费 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="kowFreight" name="kowFreight" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/月</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>