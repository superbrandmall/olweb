<div class="box box-default" id="investmentContractMallSummary">    
    <div class="box-header with-border">
        <h3 class="box-title">项目情况汇总</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-6">
            <h5>基本信息</h5>
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner">项目名称</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">开业日期</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">总可租赁面积 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input id="investmentContractMallSummaryMallSelect" class="form-control" type="text" readonly />
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control date-picker" id="investmentContractMallSummaryOpenDate" type="text" data-plugin="datepicker" readonly style="width: 100%; border: 1px solid #ccc; background: #fff; border-right: none;" />
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryTotalRentArea" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">m<sup>2</sup></span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="col-md-6">
            <h5>预算达成率(截止上月底)</h5>
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner"></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">预算收入 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">实际收入 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">预实收入差异 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">达成率 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="form-group" style="margin-bottom: 0; width: 80px;">
                                            <select class="select2" id="investmentContractMallSummaryBudgetYear">
                                                <?php
                                                    $year = date("Y");
                                                    $const = 1;
                                                    echo $year-$const;
                                                    for($i=($year-$const);$i<($year+$const);$i++){
                                                        if($i == $year){
                                                            echo '<option value="'.$i.'" selected>'.$i.'</option>';
                                                        } else {
                                                            echo '<option value="'.$i.'">'.$i.'</option>';
                                                        }
                                                    }
                                                ?>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control money" id="investmentContractMallSummaryBudgetAmount" type="text" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">元</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control money" id="investmentContractMallSummaryActualAmount" type="text" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">元</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control money" id="investmentContractMallSummaryDiffAmount" type="text" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">元</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryBudgetCompletionRate" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
    <hr>
    <div class="box-body">
        <div class="col-md-12">
            <h5>开业率及招商率</h5>
        </div>
        <div class="col-md-6">
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner"></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">截止目前 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">本次提报</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">含本次提报后 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="width: 80px;">
                                        已出租面积
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryRentedArea" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">m<sup>2</sup></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryReportArea" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">m<sup>2</sup></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummarySubRentArea" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">m<sup>2</sup></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>出租率</strong>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryRentRate" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">%</span>
                                        </div>
                                    </td>
                                    <td>/</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummarySubRentRate" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="col-md-6">
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner"></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">截止目前 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">本次提报</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">含本次提报后 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="width: 80px;">
                                        开业面积
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryOpenRentArea" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">m<sup>2</sup></span>
                                        </div>
                                    </td>
                                    <td>/</td>
                                    <td>/</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>开业率</strong>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummaryOpenRate" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">%</span>
                                        </div>
                                    </td>
                                    <td>/</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractMallSummarySubOpenRate" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="background: #fff; border-right: none;" />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; background: #fff; padding: 6px 6px 6px 3px;">%</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>