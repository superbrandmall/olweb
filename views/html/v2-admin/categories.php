<?php
$scripts = $scripts . '<script  type="text/javascript" src="/views/assets/base/js/v2-admin/plugins/icheck.min.js"></script>'
        . '<script type="text/javascript" src="/views/assets/base/js/v2-admin/categories-admin.js"></script>';
?>

<link href="/views/assets/base/css/v2-admin/plugins/icheck/skins/flat/red.css" rel="stylesheet" type="text/css"/>

<body id="mimin" class="dashboard">
    <?php include ('navbar_top.php'); ?>
    <div class="container-fluid mimin-wrapper">
        <?php include ('navbar_side.php'); ?>
        <div id="content">
            <div class="panel box-shadow-none content-header">
                <div class="panel-body">
                    <div class="col-md-12">
                        <h3 class="animated fadeInLeft" style="display: inline-block;">业态</h3>
                        <p class="animated fadeInDown" style="display: inline-block;">列表</p>
                    </div>
                </div>
            </div>

            <div class="col-md-12 top-20 padding-0">
                <div class="col-md-12">
                    <div class="panel">
                        <div id="panel_table" class="panel-body">
                            <div class="col-md-12 padding-0" style="padding-bottom:20px;">
                                <div class="col-md-4" style="padding-left:0;">    
                                    <div class="input-group">
                                        <input type="text" class="form-control" aria-label="..." value="上海陆家嘴正大广场">
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">选择门店<span class="caret"></span></button>
                                            <ul class="dropdown-menu dropdown-menu-right" style="left: 0; right: unset;">
                                                <li><a href="javascript:;" onclick="findAllCategoriesWxByOrgCode('100001_上海陆家嘴正大广场');">上海陆家嘴正大广场</a></li>
                                                <li><a href="javascript:;" onclick="findAllCategoriesWxByOrgCode('204001_上海徐汇正大乐城');">上海徐汇正大乐城</a></li>
                                                <li><a href="javascript:;" onclick="findAllCategoriesWxByOrgCode('201001_上海宝山正大乐城');">上海宝山正大乐城</a></li>
                                                <li><a href="javascript:;" onclick="findAllCategoriesWxByOrgCode('301001_河南洛阳正大广场');">河南洛阳正大广场</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="responsive-table">
                                <table class="table table-striped table-bordered" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>业态名称</th>
                                            <th>一级业态</th>
                                            <th>二级业态</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include ('footer.php'); ?>