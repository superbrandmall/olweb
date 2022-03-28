<div class="box box-default" id="investmentContractModel">
    <div class="box-header with-border">
        <h3 class="box-title">合同内容</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
        <div class="pull-right" style="margin-right: 30px;">
            <button type="button" class="btn btn-info btn-xs" style="margin-right: 10px;" onclick="javascript: saveContract();"><i class="fa fa-save icon-white"></i> <span class="hidden-xs">保存合同内容</span></button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">签约信息</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">项目（甲方）</label>
                <div class="col-md-8 col-sm-12">
                    <input id="investmentContractModelMallSelect" class="form-control" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">我方签约主体</label>
                <div class="col-md-8 col-sm-12">
                    <input id="mainSigningBody" class="form-control" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">商户（乙方）</label>
                <div class="col-md-8 col-sm-12">
                    <select id="selectTenant" class="select2" style="width: 100%;" disabled="readonly"></select>
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
                <label class="col-md-4 control-label">招商人员</label>
                <div class="col-md-8 col-sm-12">
                    <?php
                    if(isset($_SESSION['lotus_admin_name'])) {
                        echo '<input class="form-control" type="text" value="'.$_SESSION['lotus_admin_name'].'" readonly />';
                    } else {
                        echo '<input class="form-control" type="text" value="管理员" readonly />';
                    }
                    ?>
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
                <label class="col-md-4 control-label">签约日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="awardDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" required />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;"> 品牌信息以及商务合作条件</h5>
            <hr>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">租赁期限</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-daterange input-group">
                        <input type="text" class="form-control" id="startDate" readonly />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control" id="endDate" readonly />
                            <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">业态</label>
                <div class="col-md-8 col-sm-12">
                    <input id="modality" class="form-control" id="bizTypeName" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">计租方式</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="selectRentCalculationMode" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">利润中心</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="profitCenter" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">合同类型</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="contractType" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">铺位</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="selectStore" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">租赁面积</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="area" type="text" style="border: 0 none;" readonly />                                                
                        <span class="input-group-addon" style="border: 0 none; background: #eee;">m<sup>2</sup></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">核算楼层</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="floor" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">经营内容</label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="bizScope" type="text" readonly />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">收银方式</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="posMode" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">品牌</label>
                <div class="col-md-8 col-sm-12">
                    <select class="select2" id="brandName" style="width: 100%;" disabled="readonly"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">店招 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <input class="form-control" id="contractName2" type="text" required />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">营业开始时间 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input type="text" class="form-control timepicker" id="openStartTime" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-clock-o"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control timepicker" id="openEndTime" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                            <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-clock-o"></i></span>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">目标营业额</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control" id="targetSales" type="text" style="border: none;" readonly />                                                
                        <span class="input-group-addon" style="border: 0 none; background: #eee;">元/月</span>
                    </div>
                </div>
            </div>
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
                        <input class="form-control date-picker" id="deliveryDate" type="text" data-plugin="datepicker" readonly />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">进场日期</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="enterDate" type="text" data-plugin="datepicker" readonly />
                        <span class="input-group-addon" style="border: none; background: #eee;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">装修期限</label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-daterange input-group" id="freePeriods">
                        <input type="text" class="form-control" id="freeStartDate_1" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                        <span class="input-group-addon" style="border: none; background: transparent;">-</span>
                        <div class="input-group">
                            <input type="text" class="form-control" id="freeEndDate_1" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" />
                            <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-4 control-label">装修天数</label>
                <div class="col-md-8 col-sm-12 required">
                    <div class="input-group">
                        <input class="form-control" id="freeDays" placeholder="请选择装修期限" type="text" style="border-right: none;" readonly />                                                
                        <span class="input-group-addon" style="border: 0 none; background: #eee;">天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="col-md-4 control-label">开业日期 <span class="btn-box-tool-lg">*</span></label>
                <div class="col-md-8 col-sm-12">
                    <div class="input-group">
                        <input class="form-control date-picker" id="bizDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-radius: 0; border-right: none;" required />
                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="box-body" id="investmentContractAccounttermCompare" style="display: none;">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">取高明细</h5>
            <hr>
        </div>
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
                                                <div class="th-inner">适用</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">比较类型</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">期限</div>
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
                                                    <input type="text" class="form-control" id="compareStartDate_1" style="min-width: 80px;" disabled />
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    <span class="input-group-addon">-</span>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="compareEndDate_1"  style="min-width: 80px;" disabled />
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
                                                    <input type="text" class="form-control" id="compareStartDate_2" style="min-width: 80px;" disabled />
                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                    <span class="input-group-addon">-</span>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="compareEndDate_2"  style="min-width: 80px;" disabled />
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
                                                <select class="select2" id="compareSecondValue" style="width: 100%;">
                                                    <option value="">未选择</option>
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
    
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">说明</h5>
            <hr>
        </div>
        <div class="col-md-12">
            <textarea class="form-control" id="remark" rows="3" placeholder="请用序号1、2、3、……逐一列明本合同的最主要事项及内容"></textarea>
        </div>
    </div>
</div>