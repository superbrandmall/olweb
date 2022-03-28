<div class="box box-default" id="investmentContractModel">
    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">项目（甲方）<span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <input id="investmentContractModelMallSelect" class="form-control" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">我方签约主体 <span class="btn-box-tool-lg">*</span></label>
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
                <label class="col-md-4 control-label">单号</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="bizId" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">招商人员 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <?php
                    if(isset($_SESSION['lotus_admin_name'])) {
                        echo '<input class="form-control" id="creatorName" type="text" value="'.$_SESSION['lotus_admin_name'].'" readonly />';
                    } else {
                        echo '<input class="form-control" id="creatorName" type="text" value="管理员" readonly />';
                    }
                    ?>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">签约编号</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="contractNo" type="text"  />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">签约日期 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="awardDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" required />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>