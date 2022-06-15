<?php
//$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/kow-admin/sales-admin.js"></script>'.PHP_EOL;
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <form id="search-form" class="form-horizontal" role="form" enctype="multipart/form-data">
        <section class="sub-header" style="height: 205px;">
            <h4>
                销售查询
            </h4>
            <div class="pull-right">
                <a href="javascript: void(0)" onclick="javascript: $('#investment-contract-request-modify-create').modal('toggle');" class="btn btn-primary btn-sm"><i class="fa fa-pencil icon-white"></i> <span class="hidden-xs">录入销售数据</span></a>
            </div>
            <div class="box-header">
                <div class="box-body">
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">所属区域</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="status" style="width: 100%">
                                        <option value="" selected>全部</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">所属项目</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <select class="select2" id="mall" style="width: 100%">
                                        <option value="" selected>未选择</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">铺位</label>
                                 <div class="col-md-8 col-sm-12" style="text-align: left;">
                                     <select class="select2" id="mall" style="width: 100%">
                                        <option value="" selected>未选择</option>
                                     </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">开始时间</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="deliveryDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label" style="text-align: right;">结束时间</label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <div class="input-group">
                                        <input class="form-control date-picker" id="deliveryDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" />
                                        <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-8 col-sm-12" style="text-align: left;">
                                    <button type="button" class="btn btn-info btn-sm" id="search"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">搜索</span></button>
                                    <button type="button" class="btn btn-default btn-sm" id="clear"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">清除</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>
    
    <section class="content" style="margin-top: 255px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-pagination" style="clear: both;">
                                            <div class="pull-left pagination-detail">
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">20</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/kow-admin/stores?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/stores?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/stores?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/kow-admin/stores?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination">
                                                    <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">«</a></li>
                                                    <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">上一页</a></li>
                                                    <li class="page-item active"><a class="page-link" href="?page=1&amp;items=20">1</a></li>
                                                    <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">下一页</a></li>
                                                    <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">»</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0; text-align: left;">
                                                    <thead id="assetsListingTable-sticky-header">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">行</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">销售日期</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">项目</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">铺位</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">销售金额</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">交易笔数</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="sales">
                                                        <?php
                                                            $date = 30;
                                                            for($i=0;$i<20;$i++){
                                                                $index = $i + 1;
                                                        ?>
                                                        <tr data-index="<?= $i; ?>">
                                                            <td><?= $index; ?></td>
                                                            <td>2022-04-<?= $date; ?></td>
                                                            <td>静安大融城</td>
                                                            <td>01FC001</td>
                                                            <td>5,000元</td>
                                                            <td>200</td>
                                                        </tr>
                                                        <?php
                                                            $date--;
                                                            }
                                                        ?>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="fixed-table-pagination">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info"></span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">20</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="/kow-admin/stores?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/stores?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/stores?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/kow-admin/stores?items=50">50</a></li>
                                                            </ul>
                                                        </span> 行每页
                                                    </span>
                                                </div>
                                                <div class="pull-right pagination">
                                                    <ul class="pagination">
                                                        <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">«</a></li>
                                                        <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">上一页</a></li>
                                                        <li class="page-item active"><a class="page-link" href="?page=1&amp;items=20">1</a></li>
                                                        <li class="page-item disabled"><a class="page-link pn" href="javascript: void(0);">下一页</a></li>
                                                        <li class="page-item disabled"><a class="page-link" href="javascript: void(0);">»</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<div class="modal fade" id="investment-contract-request-modify-create" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header"><h4>录入销售数据</h4></div>
            <div class="modal-body">
                <form id="create-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 项目</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="selectContractNo" style="width: 100%">
                                    <option value="" selected>未选择</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 铺位</label>
                            <div class="col-md-8 col-sm-12" required>
                                <select class="select2" id="selectContractNo" style="width: 100%">
                                    <option value="" selected>未选择</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;"><span class="btn-box-tool-lg">*</span> 销售日期</label>
                            <div class="col-md-8 col-sm-12">
                                <div class="input-group">
                                    <input class="form-control date-picker" id="newDate" type="text" data-plugin="datepicker" readonly style="border: 1px solid #ccc; background: #fff; border-right: none;" required />
                                    <span class="input-group-addon" style="border-left: none; background: transparent;"><i class="fa fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">销售金额 <span class="btn-box-tool-lg">*</span></label>
                            <div class="col-md-8 col-sm-12 required">
                                <div class="input-group">
                                    <input class="form-control money" id="targetSales" type="text" style="border-right: none;" />                                                
                                    <span class="input-group-addon" style="border-left: none; background: transparent;">元</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" style="text-align: right;">交易笔数  <span class="btn-box-tool-lg">*</span></label>
                            <div class="col-md-8 col-sm-12">
                                <input class="form-control" id="bizScope" type="text"  />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-8 col-sm-12" style="text-align: left;">
                                <button type="button" class="btn btn-info btn-sm" id="createRequestModify"><i class="fa fa-search icon-white"></i> <span class="hidden-xs">确定</span></button>
                                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" aria-label="Close"><i class="fa fa-times icon-white"></i> <span class="hidden-xs">取消</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>