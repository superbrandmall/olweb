<div class="box box-default" id="investmentContractAccounttermCompare">    
    <div class="box-header with-border">
        <h3 class="box-title">取高明细</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <div class="box-body">
                <div class="row">
                    <div class="bootstrap-table">
                        <div class="fixed-table-container">
                            <div class="fixed-table-body">
                                <table class="table table-striped snipe-table table-responsive">
                                    <thead id="assetsListingTable-sticky-header">
                                        <tr>
                                            <th>
                                                <div class="th-inner">行</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">适用 <span class="btn-box-tool-lg">*</span></div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">比较类型</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">期限 <span class="btn-box-tool-lg">*</span></div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">比较周期</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">取值类型</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="compare">
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <input type="checkbox" name="compareFirst" id="compareFirst" checked disabled>
                                            </td>
                                            <td>一次比高</td>
                                            <td>
                                                <div class="input-daterange input-group">
                                                    <input type="text" class="form-control" id="compareStartDate_1" style="min-width: 80px;" readonly />
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    <span class="input-group-addon">-</span>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="compareEndDate_1"  style="min-width: 80px;" readonly />
                                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    </div>    
                                                </div>
                                            </td>
                                            <td>
                                                <select class="select2" id="compareFirstFrequency" style="width: 100%;">
                                                    <option value="">未选择</option>
                                                </select>
                                            </td>
                                            <td>较高</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <input type="checkbox" name="compareSecond" id="compareSecond">
                                            </td>
                                            <td>
                                                <div class="shell"></div>
                                                再次比较
                                            </td>
                                            <td>
                                                <div class="shell"></div>
                                                <div class="input-daterange input-group">
                                                    <input type="text" class="form-control" id="compareStartDate_2" style="min-width: 80px;" readonly />
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    <span class="input-group-addon">-</span>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="compareEndDate_2"  style="min-width: 80px;" readonly />
                                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    </div>    
                                                </div>
                                            </td>
                                            <td>
                                                <div class="shell"></div>
                                                <select class="select2" id="compareSecondFrequency" style="width: 100%;">
                                                    <option value="">未选择</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div class="shell"></div>
                                                <select class="select2" style="width: 100%;">
                                                    <option value="high" selected>较高</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>