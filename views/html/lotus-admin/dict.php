<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/lotus-admin/dict-admin.js"></script>'.PHP_EOL
?>

<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="sub-header">
        <h4>
            数据字典
        </h4>
    </section>
    
    <section class="content" style="margin-top: 90px;">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="callout callout-warning" style="display: none;"></div>
                    <div class="callout callout-danger" style="display: none;"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <div class="box">
                        <div class="box-body">
                            <h4>按模块查询</h4>
                            <form id="dictModule_form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group col-md-8" style="margin-right: 15px;">
                                    <label for="dictModule" class="col-md-5 control-label">所属模块</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" id="dictModule" name="dictModule" style="width: 100%"></select>
                                        <div id="errorcontainer-dictModule" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4" style="margin-left: 0;">
                                    <button type="submit" class="btn btn-info"><i class="fa fa-question-circle-o icon-white"></i> 查询</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-7">
                    <div class="box">
                        <div class="box-body">
                            <h4>按代码查询</h4>
                            <form id="dictTypeCode_form" class="form-horizontal" role="form" enctype="multipart/form-data">
                                <div class="form-group col-sm-6">
                                    <label for="dictTypeCode" class="col-md-5 control-label">类型代码</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="dictTypeCode" name="dictTypeCode" required />
                                        <div id="errorcontainer-dictTypeCode" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="form-group col-sm-3" style="margin-left: 0;">
                                    <button type="submit" class="btn btn-info"><i class="fa fa-question-circle-o icon-white"></i> 查询</button>
                                </div>
                                <div class="form-group col-sm-3" style="margin-left: 0;">
                                    <button type="button" id="createDictData" class="btn btn-primary"><i class="fa fa-plus-circle icon-white"></i> 新建数据</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4>数据字典类型列表</h4>
                                    <div class="bootstrap-table">
                                        <div class="fixed-table-pagination" style="clear: both;">
                                            <div class="pull-left pagination-detail">
                                                <span class="pagination-info"></span>
                                                <span class="page-list">
                                                    <span class="btn-group dropdown">
                                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <span class="page-size">10</span>
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li role="menuitem"><a href="/lotus-admin/dict?items=10">10</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/dict?items=20">20</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/dict?items=30">30</a></li>
                                                            <li role="menuitem"><a href="/lotus-admin/dict?items=50">50</a></li>
                                                        </ul>
                                                    </span> 行每页</span>
                                            </div>
                                            <div class="pull-right pagination">
                                                <ul class="pagination"></ul>
                                            </div>
                                        </div>
                                        <div class="fixed-table-container">
                                            <div class="fixed-table-body">
                                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                        <tr>
                                                            <th>
                                                                <div class="th-inner">类型代码</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">类型名称</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">所属模块</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                            <th>
                                                                <div class="th-inner">操作</div>
                                                                <div class="fht-cell"></div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="dictL" class="hidden-xs"></tbody>
                                                    <tbody id="dictS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                                </table>
                                            </div>

                                            <div class="fixed-table-pagination">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info"></span>
                                                    <span class="page-list">
                                                        <span class="btn-group dropdown">
                                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                <span class="page-size">10</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li role="menuitem"><a href="/lotus-admin/dict?items=10">10</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/dict?items=20">20</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/dict?items=30">30</a></li>
                                                                <li role="menuitem"><a href="/lotus-admin/dict?items=50">50</a></li>
                                                            </ul>
                                                        </span> 行每页
                                                    </span>
                                                </div>
                                                <div class="pull-right pagination">
                                                    <ul class="pagination"></ul>
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

<div class="modal fade" id="dict_data" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <h4>数据字典</h4>
                    <div class="bootstrap-table">
                        <div class="fixed-table-container">
                            <div class="fixed-table-body">
                                <table class="table table-striped snipe-table table-responsive" style="margin-top: 0">
                                    <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                        <tr>
                                            <th>
                                                <div class="th-inner">顺序</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">类型代码</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">名称</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">代码</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                            <th>
                                                <div class="th-inner">操作</div>
                                                <div class="fht-cell"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="dictDataL" class="hidden-xs"></tbody>
                                    <tbody id="dictDataS" class="hidden-sm hidden-md hidden-lg"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="dict_type" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content c-square" style="background: #fff;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <h4>数据类型</h4>
                    <div class="box-body">
                        <form id="edit-dict-type-form" class="form-horizontal" role="form" enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="editDictTypeName"  class="col-md-3 control-label">类型名称 <span class="btn-box-tool-lg">*</span></label>
                                <div class="col-md-9 col-sm-12 required">
                                    <input class="form-control" type="text" id="editDictTypeName" name="editDictTypeName" />
                                    <div id="errorcontainer-editDictTypeName" class="errorDiv"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="editDictTypeCode" class="col-md-3 control-label">类型代码</label>
                                <div class="col-md-9 col-sm-12">
                                    <input class="form-control" type="text" id="editDictTypeCode" name="editDictTypeCode" readonly>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="editDictModule" class="col-md-3 control-label">所属模块 <span class="btn-box-tool-lg">*</span></label>
                                <div class="col-md-9 required">
                                    <select class="select2" id="editDictModule" name="editDictModule" style="width: 100%"></select>
                                    <div id="errorcontainer-editDictModule" class="errorDiv"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="editDictExtend" class="col-md-3 control-label">类型描述</label>
                                <div class="col-md-9 col-sm-12">
                                    <input class="form-control" type="text" id="editDictExtend" name="editDictExtend">
                                </div>
                            </div>                           

                            <div class="box-footer text-right">
                                <a class="btn btn-link text-left" href="javascript(0);" data-dismiss="modal" aria-label="Close">取消</a>
                                <button type="submit" class="btn btn-success"><i class="fa fa-check icon-white"></i> 保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>