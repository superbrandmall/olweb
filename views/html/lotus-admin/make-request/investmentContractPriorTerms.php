 <div class="box box-default" id="investmentContractPriorTerms">    
    <div class="box-header with-border">
        <h3 class="box-title">原租户合同</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">位置编号</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="oldUnitName" type="text" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">经营种类</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="oldBizTypeName" type="text" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">日租金坪效含税</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldRentalFloorEffect" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/m²/天</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">月租金含税</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldFixedRentAmount" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">月总收益</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldTotalTaxAmount" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">押金</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldDepositFee" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">面积(㎡)</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="oldArea" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">m<sup>2</sup></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">租赁期限</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-daterange input-group">
                        <input type="text" class="form-control" id="oldStartDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control" id="oldEndDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                            <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">成本坪效</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldCostEffect" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/m²/天</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">月物业管理费</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldPropertyMgmtTaxAmount" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">月总租金含税</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldTotalAmount" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">免租期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="oldFreeDays" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">天</span>
                    </div>
                </div>
            </div>
            
            
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">品牌</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="oldBrandName" type="text" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">日租金坪效</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldRentalFloorTaxEffect" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元/m²/天</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">月租金</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldFixedRentTaxAmount" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">月物业管理费含税</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control money" id="oldPropertyMgmtAmount" type="text" style="border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">递增幅度</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="oldGrowthRate" type="text" style="border-right: none;" />                                                
                        <span class="input-group-addon" style="border-left: none; background: transparent;">%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>