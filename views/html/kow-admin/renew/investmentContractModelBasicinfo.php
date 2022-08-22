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
                            <input type="text" class="form-control" id="endDate" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                            <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                        </div>    
                    </div>
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
                <label for="kowSupplierStore" class="col-md-4 control-label">供货门店 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="kowSupplierStore" name="kowSupplierStore" multiple="multiple" style="width: 100%">
                        <option value="">未选择</option>
                        <option value="川沙店[SC033]">川沙店</option>
                        <option value="杨高南路店[SC001]">杨高南路店</option>
                        <option value="上南店[SC005]">上南店</option>
                        <option value="杨高北路店[SC011]">杨高北路店</option>
                        <option value="杨高中路店[SC043]">杨高中路店</option>
                        <option value="浦江店[SC078]">浦江店</option>
                        <option value="临港店[SC145]">临港店</option>
                        <option value="松江文诚店[SC055]">松江文诚店</option>
                        <option value="松江岳阳店[SC027]">松江岳阳店</option>
                        <option value="牡丹江店[SC126]">牡丹江店</option>
                        <option value="蕴川店[SC060]">蕴川店</option>
                        <option value="新港店[SC082]">新港店</option>
                        <option value="汶水店[SC010]">汶水店</option>
                        <option value="保德店[SC040]">保德店</option>
                        <option value="南奉店[SC041]">南奉店</option>
                        <option value="南桥店[SC127]">南桥店</option>
                        <option value="金山店[SC050]">金山店</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">品牌 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="brandName" style="width: 100%" disabled></select>
                </div>
            </div>
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
        </div>
        <div class="col-md-4">
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
            <div class="form-group">
                <label class="col-md-4 control-label">收银方式 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="posMode" style="width: 100%" disabled></select>
                </div>
            </div>
        </div>
    </div>
</div>