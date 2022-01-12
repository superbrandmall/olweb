<div class="box box-default" id="investmentContractAccounttermList">    
    <div class="box-header with-border">
        <h3 class="box-title">账款条款</h3>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">基本信息</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">账款名称 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" type="text" value="固定租金" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-3 control-label">科目 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-5 col-sm-6" style="padding-right: 2px;">
                    <select class="select2" style="width: 100%">
                        <option value="" selected>固定租金[B011]</option>
                        <option value="">物业管理费[B021]</option>
                        <option value="">推广费[G021]</option>
                        <option value="">提成扣率[D011]</option>
                        <option value="">保证金[E02]</option>
                        <option value="">履约保证金[E22]</option>
                        <option value="">固定推广费[G011]</option>
                    </select>
                </div>
                <label class="col-md-3 control-label">开发票</label>
                <div class="col-md-1 col-sm-6" style="padding-top: 6px;">
                    <input type="checkbox" value="" checked>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">税率 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" style="width: 100%">
                        <option value="">增值税0%</option>
                        <option value="" selected>增值税5%</option>
                        <option value="">增值税6%</option>
                        <option value="">增值税11%</option>
                        <option value="">增值税13%</option>
                        <option value="">增值税17%</option>
                        <option value="">增值税5%(价内)</option>
                        <option value="">增值税16%</option>
                        <option value="">增值税10%</option>
                        <option value="">增值税9%</option>
                        <option value="">增值税3%</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="display: inline-block; margin-bottom: 0; margin-right: 10px;">面积日固定账款</h5>
            <div class="checkbox" style="display: inline-block;">
                <label>
                    <input type="checkbox" value="">
                    含税
                </label>
            </div>
        </div>
        <div class="col-md-12">
            <div class="box-body">
                <div class="row">
                        <div class="bootstrap-table">
                            <div class="fixed-table-container">
                                <div class="fixed-table-body">
                                    <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                        <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                            <tr>
                                                <th>
                                                    <div class="th-inner">行</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">起始日期 <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">截止日期 <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">单价(去税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">月金额(去税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">单价(含税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">月金额(含税) <span class="btn-box-tool-lg">*</span></div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">递增率</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div class="th-inner">操作</div>
                                                    <div class="fht-cell"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="fixedRentL" class="hidden-xs">
                                            <tr>
                                                <td>1</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td><i class="fa fa-minus-circle" style="color: #ED4A52"></i></td>
                                                <td><i class="fa fa-plus-circle" style="color: #84CC3D"></i></td>
                                            </tr>
                                        </tbody>
                                        <tbody id="fixedRentS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <h4 style="display: inline-block; margin-bottom: 0; margin-right: 10px;">账款总金额(去税|含税)</h4>
            <h3 style="display: inline-block;">0.00|000</h3>
        </div>
    </div>
</div>