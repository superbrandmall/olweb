<div class="box box-default" id="investmentContractModel">
    <!--<div class="box-header with-border">
        <ol class="breadcrumb" style="margin-bottom: 0;">
            <li class="active"><a href="javascript: void(0);">基本信息</a></li>
            <li><a href="#investmentContractEnteryterm">进场条款</a></li>
            <li><a href="#investmentContractSettleterm">结算周期</a></li>
            <li><a href="#investmentContractAccounttermList">账款条款</a></li>
            <li><a href="#investmentContractOverduetermList">滞纳金条款</a></li>
            <li><a href="#investmentContractDepositterm">预存款条款</a></li>
            <li><a href="#investmentContractProperteisterm">自定义条款</a></li>
            <li><a href="#textareapanel">说明</a></li>
        </ol>
    </div>-->

    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">项目（甲方）<span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select id="selectLocation" class="select2" style="width: 100%">
                        <option value="SC033">川沙店[SC033]</option>
                        <option value="SC001">杨高南路店[SC001]</option>
                        <option value="SC005">上南店[SC005]</option>
                        <option value="SC011">杨高北路店[SC011]</option>
                        <option value="SC043">杨高中路店[SC043]</option>
                        <option value="SC078">浦江店[SC078]</option>
                        <option value="SC145">临港店[SC145]</option>
                        <option value="SC055">文诚店[SC055]</option>
                        <option value="SC027">岳阳店[SC027]</option>
                        <option value="SC126">牡丹江路店[SC126]</option>
                        <option value="SC060">蕴川店[SC060]</option>
                        <option value="SC082">新港店[SC082]</option>
                        <option value="SC010">汶水店[SC010]</option>
                        <option value="SC040">保德店[SC040]</option>
                        <option value="SC041">南奉店[SC041]</option>
                        <option value="SC127">易买得-南桥店[SC127]</option>
                        <option value="SC050">金山店[SC050]</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">我方签约主体<span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <input id="mainSigningBody" class="form-control" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">商户（乙方）<span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select id="selectTenant" class="select2" style="width: 100%"></select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">招商人员<span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <input class="form-control" type="text"
                           value="<?php
                            if(isset($_SESSION['lotus_admin_name'])) {
                                echo $_SESSION['lotus_admin_name'];
                            } else {
                                echo "未知人员";
                            }
                            ?>" 
                            style="background: white; border: solid 1px rgb(210, 214, 222);" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">对方签约人</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" type="text"  />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">签约编号</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" type="text"  />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">签约日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>