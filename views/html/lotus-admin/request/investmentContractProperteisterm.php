 <div class="box box-default" id="investmentContractProperteisterm">    
    <div class="box-header with-border">
        <h3 class="box-title">商圈租金参考</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <div class="bootstrap-table">
                <div class="fixed-table-container">
                    <div class="fixed-table-body">
                        <table class="table table-responsive" style="margin-top: 0">
                            <thead id="assetsListingTable-sticky-header">
                                <tr>
                                    <th>
                                        <div class="th-inner"></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner"></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">Lotus新店提案 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">参考门店1 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">参考门店2 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                    <th>
                                        <div class="th-inner">参考门店3 <span class="btn-box-tool-lg">*</span></div>
                                        <div class="fht-cell"></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="3" style="border-right: solid 2px #ddd; background-color: #fff;">
                                        <strong>基本信息</strong>
                                    </td>
                                    <td>门店名称/位置</td>
                                    <td><input id="investmentContractProperteistermMallName_0" class="form-control" type="text" readonly /></td>
                                    <td><input id="investmentContractProperteistermMallName_1" class="form-control" type="text" /></td>
                                    <td><input id="investmentContractProperteistermMallName_2" class="form-control" type="text" /></td>
                                    <td><input id="investmentContractProperteistermMallName_3" class="form-control" type="text" /></td>
                                </tr>
                                <tr>
                                    <td>租赁楼层</td>
                                    <td><input id="investmentContractProperteistermFloor_0" class="form-control" type="text" readonly /></td>
                                    <td><input id="investmentContractProperteistermFloor_1" class="form-control" type="text" /></td>
                                    <td><input id="investmentContractProperteistermFloor_2" class="form-control" type="text" /></td>
                                    <td><input id="investmentContractProperteistermFloor_3" class="form-control" type="text" /></td>
                                </tr>
                                <tr style="border-bottom: solid 1px #ddd;">
                                    <td>租赁面积</td>
                                    <td>
                                        <div class="input-group">
                                            <input class="form-control" id="investmentContractProperteistermArea_0" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="border-right: none;" readonly />                                                
                                            <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">㎡</span>
                                        </div>
                                    </td>
                                    <?php
                                    for($i=1;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" id="investmentContractProperteistermArea_<?= $i ?>" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">㎡</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td rowspan="7" style="border-right: solid 1px #ddd;">
                                        <strong>商务条款</strong>
                                    </td>
                                    <td>租赁期限</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" id="investmentContractProperteistermRentTerm_<?= $i ?>" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">年</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td>保底租金</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control money" id="investmentContractProperteistermMinRent_<?= $i ?>" type="text" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">元/天/㎡</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td>扣率</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" id="investmentContractProperteistermDeduct_<?= $i ?>" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">%</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td>月销售</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control money" id="investmentContractProperteistermSalesAmount_<?= $i ?>" type="text" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">元</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td>物管费单价</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control money" id="investmentContractProperteistermPropertyDayFee_<?= $i ?>" type="text" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">元/月/㎡</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td>推广费比例</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" id="investmentContractProperteistermPromotionFee_<?= $i ?>" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">%</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
                                </tr>
                                <tr>
                                    <td>租售比</td>
                                    <?php
                                    for($i=0;$i<4;$i++)
                                        {
                                    ?>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" id="investmentContractProperteistermRentSalesRate_<?= $i ?>" type="text" onInput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" style="border-right: none;" />                                                
                                                <span class="input-group-addon" style="border: solid 1px #d2d6de; border-left: none; padding: 6px 6px 6px 3px;">%</span>
                                            </div>
                                        </td>
                                    <?php
                                        }
                                    ?>
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