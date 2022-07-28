<div class="box box-default" id="investmentContractModelBasicinfo">    
    <div class="box-header with-border">
        <h3 class="box-title">基本信息</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">租赁期限 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-daterange input-group">
                        <input type="text" class="form-control" id="startDate" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control" id="endDate" disabled />
                            <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                        </div>  
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">业态 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <input class="form-control" id="bizTypeName" placeholder="请选择品牌" type="text" readonly />
                    <input id="bizTypeCode" type="hidden" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">计租方式 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="selectRentCalculationMode" style="width: 100%" disabled></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">利润中心 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="profitCenter" style="width: 100%" disabled></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">目标营业额 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control money" id="targetSales" type="text" style="border-right: none;" disabled />                                                
                        <span class="input-group-addon" style="border: 0 none; background: #eee;">元/月</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">铺位 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="selectStore" style="width: 100%" disabled></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">租赁面积 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control" id="area" placeholder="请选择租赁位置" type="text" style="border-right: none;" readonly />                                                
                        <span class="input-group-addon" style="border: 0 none; background: #eee;">m<sup>2</sup></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">核算楼层 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="floor" style="width: 100%" disabled>
                        <option value="">请选择租赁位置</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">经营内容</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="bizScope" type="text" placeholder="请在原合同中完善" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">收银方式 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="posMode" style="width: 100%" disabled></select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">品牌  <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="brandName" style="width: 100%" disabled></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">店招 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="contractName" type="text" disabled />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">支付方式 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="paymentMode" style="width: 100%" disabled></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">合同类型 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="contractType" style="width: 100%" disabled></select>
                </div>
            </div>
        </div>
    </div>
</div>