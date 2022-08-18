<div class="box box-default" id="investmentContractEnteryterm">    
    <div class="box-header with-border">
        <h3 class="box-title">进场条款</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">计划进场信息</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">交付日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="deliveryDate" type="text" data-plugin="datepicker" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">进场日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="enterDate" type="text" data-plugin="datepicker" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">装修期限</label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-daterange input-group" id="freePeriods">
                        <input type="text" class="form-control" id="freeStartDate_1" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control" id="freeEndDate_1" disabled />
                            <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">装修天数</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="freeDays" placeholder="请在原合同中完善" type="number" min="0" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="ime-mode:disabled;" readonly />                                      
                        <span class="input-group-addon" style="border: none; background: #eee;">天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">开业日期</label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control date-picker" id="bizDate" type="text" data-plugin="datepicker" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">营业时间</label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input type="text" class="form-control timepicker" id="openStartTime" disabled />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-clock-o"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control timepicker" id="openEndTime" disabled />
                            <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-clock-o"></i></span>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>