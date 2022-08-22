<div class="box box-default" id="investmentContractModel">
    <div class="box-body">
        <div class="col-md-4">
            <div class="form-group">
                <label for="mallCode" class="col-md-4 control-label">所属项目 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="mallCode" name="mallCode" style="width: 100%" disabled></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">商户 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select id="selectTenant" class="select2" style="width: 100%"></select>
                </div>
            </div>
            <div class="form-group" id="kow_leasing">
                <label class="col-md-4 control-label">商务拓展 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="approvalName" name="approvalName" style="width: 100%"></select>
                    <?php
                    if(isset($_SESSION['lotus_admin_name'])) {
                        echo '<input class="form-control" id="creatorName" type="hidden" value="'.$_SESSION['lotus_admin_name'].'" readonly />';
                    } else {
                        echo '<input class="form-control" id="creatorName" type="hidden" value="管理员" readonly />';
                    }
                    ?>
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
                <label class="col-md-4 control-label">表单类型 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <select class="select2" id="formType" style="width: 100%" disabled></select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">签约编号</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="contractNo" type="text" readonly />
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