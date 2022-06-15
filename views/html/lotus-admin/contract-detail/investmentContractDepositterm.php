<div class="box box-default" id="investmentContractDepositterm">    
    <div class="box-header with-border">
        <h3 class="box-title">预存款条款</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
        <div class="pull-right" style="margin-right: 30px;">
            <button type="button" class="btn btn-info btn-xs" onclick="javascript: saveContractDeposit();"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存预存款条款</span></button>
        </div>
        <div class="pull-right" style="margin-right: 10px;">
            <a href="javascript:void(0);" onClick="addRowInvestmentContractDepositterm()">
                <i class="fa fa-plus-circle" style="color: #84CC3D; font-size: 16px; vertical-align: bottom;"></i> 增加行
            </a>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5>预存款明细</h5>
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner">行</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">科目 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">收付方向</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">金额 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">最后缴款期</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">操作</div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="deposit">
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <select class="select2" id="deposittermItem_1">
                                            <option value="E02" selected>租赁保证金[E02]</option>
                                            <option value="E03">装修保证金[E03]</option>
                                        </select>
                                    </td>
                                    <td>收</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control money" id="deposittermAmount_1" type="text" value="0" />                                                
                                            <span class="input-group-addon">元</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control date-picker" id="deposittermPaymentDate_1" type="text" style="width: 100%" readonly="">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" onClick="deleteRow(this)" >
                                            <i class="fa fa-minus-circle" style="color: #ED4A52; font-size: 16px;"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <select class="select2" id="deposittermItem_2">
                                            <option value="E02">租赁保证金[E02]</option>
                                            <option value="E03" selected>装修保证金[E03]</option>
                                        </select>
                                    </td>
                                    <td>收</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control money" id="deposittermAmount_2" type="text" value="0" />                                                
                                            <span class="input-group-addon">元</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control date-picker" id="deposittermPaymentDate_2" type="text" style="width: 100%" readonly="">
                                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="javascript:void(0);" onClick="deleteRow(this)" >
                                            <i class="fa fa-minus-circle" style="color: #ED4A52; font-size: 16px;"></i>
                                        </a>
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