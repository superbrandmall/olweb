<!-- 科目 -->
<select class="select2" style="width: 100%">
    <option value="" selected>固定租金[B011]</option>
    <option value="">物业管理费[B021]</option>
    <option value="">推广费[G021]</option>
    <option value="">提成扣率[D011]</option>
    <option value="">保证金[E02]</option>
    <option value="">履约保证金[E22]</option>
    <option value="">固定推广费[G011]</option>
</select>

<!--面积日,含税 -->
<div class="col-md-12">
    <h5 style="display: inline-block; margin-bottom: 0; margin-right: 10px;">面积日固定账款</h5>
    <div class="checkbox" style="display: inline-block;">
        <label>
            <input type="checkbox" value="">
            含税
        </label>
    </div>
</div>

<!-- tab page -->
<div class="box-body">
    <div id="tab_pay_first_options" class="col-md-12">
        <center>
            <label type="button" class="btn btn-default btn-sm" for="tab_pay_first_1">
                <input type="checkbox" id="tab_pay_first_1" checked>租金
            </label>
            <button type="button" class="btn btn-default btn-sm disabled">销售提成</button>
            <label type="button" class="btn btn-default btn-sm" for="tab_pay_first_3">
                <input type="checkbox" id="tab_pay_first_3" checked>固定费用
            </label>
            <button type="button" class="btn btn-default btn-sm disabled">销售返款</button>
            <button type="button" class="btn btn-default btn-sm disabled">临时费用</button>
            <button type="button" class="btn btn-default btn-sm disabled">其它费用</button>
            <button type="button" class="btn btn-default btn-sm disabled">其它固定费用</button>
            <label type="button" class="btn btn-default btn-sm" for="tab_pay_first_8">
                <input type="checkbox" id="tab_pay_first_8" checked>滞纳金
            </label>
        </center>
    </div>
</div>

<!-- 结算周期 -->
<div class="box-body">
    <div class="col-md-12">
        <h5 style="margin-bottom: 0;">结算周期</h5>
        <hr>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="col-md-4 control-label">名称 <span class="btn-box-tool-lg">*</span></label>
            <div class="col-md-8 col-sm-12">
                <input class="form-control" type="text" value="固定租金" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-4 control-label">出账日类型</label>
            <div class="col-md-8 col-sm-12">
                <select class="select2" style="width: 100%">
                    <option value="">相对日</option>
                    <option value="" selected>固定日</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-4 control-label">首次出账日</label>
            <div class="col-md-8 col-sm-12">
                <div class="form-control">2022-01-25</div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="col-md-4 control-label">周期类型</label>
            <div class="col-md-5 col-sm-6" style="padding-right: 2px;">
                <select class="select2" style="width: 100%">
                    <option value="" selected>自然月</option>
                    <option value="">合同月</option>
                    <option value="">固定日</option>
                </select>
            </div>
            <div class="col-md-3 col-sm-6" style="padding-left: 2px;">
                <select class="select2" style="width: 100%">
                    <?php 
                    {
                       for($i=1;$i<=31;$i++){
                           echo '<option value="'.$i.'">'.$i.'日</option>';
                       } 
                    }
                    ?>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-4 control-label">出账日基准</label>
            <div class="col-md-8 col-sm-12">
                <select class="select2" style="width: 100%">
                    <option value="" selected>周期开始(先付后租)</option>
                    <option value="">周期开始(先租后付)</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-4 control-label">出账方式</label>
            <div class="col-md-8 col-sm-12">
                <select class="select2" style="width: 100%">
                    <option value="" selected>手工</option>
                    <option value="">自动</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="col-md-4 control-label">结算周期 <span class="btn-box-tool-lg">*</span></label>
            <div class="col-md-4 col-sm-6 required" style="padding-right: 0;">
                <div class="input-group">
                    <input class="form-control" type="text" style="border-right: none;" />
                    <span class="input-group-addon" style="border-left: none; background: transparent;">个月</span>
                    <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">结算</span>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 required" style="padding-left: 0;">
                <select class="select2" style="width: 100%">
                    <?php 
                    {
                       for($i=1;$i<=4;$i++){
                           echo '<option value="'.$i.'">'.$i.'次</option>';
                       } 
                    }
                    ?>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-4 control-label">出账偏移 <span class="btn-box-tool-lg">*</span></label>
            <div class="col-md-4 col-sm-6 required" style="padding-right: 0;">
                <div class="input-group">
                    <input class="form-control" type="text" style="border-right: none;" value="-2" />
                    <span class="input-group-addon" style="border-left: none; background: transparent;">个月</span>
                    <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">每月</span>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 required" style="padding-left: 0;">
                <select class="select2" style="width: 100%">
                    <?php 
                    {
                       for($i=1;$i<=24;$i++){
                           echo '<option value="'.$i.'">'.$i.'日</option>';
                       } 
                       echo '<option value="25" selected>25日</option>';
                       for($i=26;$i<=31;$i++){
                           echo '<option value="'.$i.'">'.$i.'日</option>';
                       } 
                    }
                    ?>
                </select>
            </div>
        </div>
    </div>
</div>
<div class="box-body">
    <div class="col-md-12">
        <h5 style="display: inline-block; margin-bottom: 0; margin-right: 10px;">滞纳金信息</h5>
        <div class="checkbox" style="display: inline-block;">
            <label>
                <input type="checkbox" value="" checked>
                收取滞纳金
            </label>
        </div>
        <hr>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="col-md-4 control-label">起算日类型</label>
            <div class="col-md-8 col-sm-12">
                <select class="select2" style="width: 100%">
                    <option value="">账单出账日</option>
                    <option value="">账单生效日</option>
                    <option value="" selected>特定日</option>
                    <option value="">账期起始日</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-4 control-label">按工作日计算</label>
            <div class="col-md-8 col-sm-6" style="padding-top: 6px;">
                <input type="checkbox" value="">
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="col-md-4 control-label">起算日 <span class="btn-box-tool-lg">*</span></label>
            <div class="col-md-4 col-sm-6 required" style="padding-right: 0;">
                <div class="input-group">
                    <input class="form-control" type="text" style="border-right: none;" value="1" />
                    <span class="input-group-addon" style="border-left: none; background: transparent;">个月</span>
                    <span class="input-group-addon" style="border: none; background: transparent; padding: 0;">每月</span>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 required" style="padding-left: 0;">
                <select class="select2" style="width: 100%">
                    <?php 
                    {
                       for($i=1;$i<=24;$i++){
                           echo '<option value="'.$i.'">'.$i.'日</option>';
                       } 
                       echo '<option value="25" selected>25日</option>';
                       for($i=26;$i<=31;$i++){
                           echo '<option value="'.$i.'">'.$i.'日</option>';https://ol.superbrandmall.com/lotus-admin/create-contract#
                       } 
                    }
                    ?>
                </select>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="col-md-4 control-label">宽限日</label>
            <div class="col-md-8 col-sm-12">
                <input class="form-control" type="text" value="0" />
            </div>
        </div>
    </div>
</div>
