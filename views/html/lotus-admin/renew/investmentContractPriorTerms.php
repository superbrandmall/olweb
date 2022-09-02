 <div class="box box-default" id="investmentContractPriorTerms">    
    <div class="box-header with-border hidden-print">
        <h3 class="box-title">商务明细</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-6">
            <div class="box-body">
                <div class="row">
                    <div class="bootstrap-table">
                        <div class="fixed-table-container">
                            <div class="fixed-table-body">
                                <table class="table table-striped snipe-table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div class="th-inner">事项</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">原租户</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">新租户</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody align="center">
                                        <tr>
                                            <td>位置编号</td>
                                            <td>
                                                <input class="form-control" id="oldUnitName" type="text" />
                                            </td>
                                            <td id="newUnitName"></td>
                                        </tr>
                                        <tr>
                                            <td>面积(㎡)</td>
                                            <td>
                                                <div class="input-group">
                                                    <input class="form-control" id="oldArea" type="text" />
                                                    <span class="input-group-addon">m<sup>2</sup></span>
                                                </div>
                                            </td>
                                            <td id="newArea"></td>
                                        </tr>
                                        <tr>
                                            <td>品牌</td>
                                            <td>
                                                <input class="form-control" id="oldBrandName" type="text" />
                                            </td>
                                            <td id="newBrandName"></td>
                                        </tr>
                                        <tr>
                                            <td>经营种类</td>
                                            <td>
                                                <input class="form-control" id="oldBizTypeName" type="text" />
                                            </td>
                                            <td id="newBizTypeName"></td>
                                        </tr>
                                        <tr>
                                            <td>租赁期限</td>
                                            <td>
                                               <div class="input-daterange input-group">
                                                    <input type="text" class="form-control" id="oldStartDate" readonly />
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    <span class="input-group-addon">-</span>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="oldEndDate" readonly />
                                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    </div>    
                                                </div>
                                            </td>
                                            <td id="newDuration"></td>
                                        </tr>
                                        <tr>
                                            <td>日租金坪效(元/m²/天)</td>
                                            <td>
                                                <input class="form-control" id="oldRentalFloorTaxEffect" type="text" />
                                            </td>
                                            <td id="newRentalFloorTaxEffect"></td>
                                        </tr>
                                        <tr>
                                            <td>日租金坪效含税(元/m²/天)</td>
                                            <td>
                                                <input class="form-control" id="oldRentalFloorEffect" type="text" />
                                            </td>
                                            <td id="newRentalFloorEffect"></td>
                                        </tr>
                                        <tr>
                                            <td>成本坪效(元/m²/天)</td>
                                            <td>
                                                <input class="form-control" id="oldCostEffect" type="text" value="/" />
                                            </td>
                                            <td>/</td>
                                        </tr>
                                        <tr>
                                            <td>月租金(元)</td>
                                            <td>
                                                <input class="form-control" id="oldFixedRentTaxAmount" type="text" />
                                            </td>
                                            <td id="newFixedRentTaxAmount"></td>
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
        <div class="col-md-6">
            <div class="box-body">
                <div class="row">
                    <div class="bootstrap-table">
                        <div class="fixed-table-container">
                            <div class="fixed-table-body">
                                <table class="table table-striped snipe-table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div class="th-inner">事项</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">原租户</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">新租户</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody align="center">
                                        <tr>
                                            <td>月租金含税(元)</td>
                                            <td>
                                                <input class="form-control" id="oldFixedRentAmount" type="text" />
                                            </td>
                                            <td id="newFixedRentAmount"></td>
                                        </tr>
                                        <tr>
                                            <td>月物业管理费(元)</td>
                                            <td>
                                                <input class="form-control" id="oldPropertyMgmtTaxAmount" type="text" />
                                            </td>
                                            <td id="newPropertyMgmtTaxAmount"></td>
                                        </tr>
                                        <tr>
                                            <td>月物业管理费含税(元)</td>
                                            <td>
                                                <input class="form-control" id="oldPropertyMgmtAmount" type="text" />
                                            </td>
                                            <td id="newPropertyMgmtAmount"></td>
                                        </tr>
                                        <tr>
                                            <td>月总收益(元)</td>
                                            <td>
                                                <input class="form-control" id="oldTotalTaxAmount" type="text" />
                                            </td>
                                            <td id="newTotalTaxAmount"></td>
                                        </tr>
                                        <tr>
                                            <td>月总租金含税(元)</td>
                                            <td>
                                                <input class="form-control" id="oldTotalAmount" type="text" />
                                            </td>
                                            <td id="newTotalAmount"></td>
                                        </tr>
                                        <tr>
                                            <td>递增幅度</td>
                                            <td>
                                                <div class="input-group">
                                                    <input class="form-control" id="oldGrowthRate" type="text" />
                                                    <span class="input-group-addon">%</span>
                                                </div>
                                            </td>
                                            <td id="newGrowthRate"></td>
                                        </tr>
                                        <tr>
                                            <td>押金(元)</td>
                                            <td>
                                                <input class="form-control" id="oldDepositFee" type="text" />
                                            </td>
                                            <td id="newDepositFee"></td>
                                        </tr>
                                        <tr>
                                            <td>免租期(天)</td>
                                            <td>
                                                <input class="form-control" id="oldFreeDays" type="text" />
                                            </td>
                                            <td id="newFreeDays"></td>
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
    </div>
</div>