<?php
$scripts = '<script type="text/javascript" src="/views/assets/base/js/admin/merchant-admin.js"></script>';
    
if(explode('?id=',$_SERVER['REQUEST_URI'])[1] != null) {
    $id = explode('?id=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($id, '&k=') !== false) {
        $id = explode('&k=',$id)[0];
    }
} else {
    $id = null;
}
?>

<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">商户信息详情</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>商户编号</label>
                                    <input class="form-control" id="code" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>商户名称</label>
                                    <input class="form-control" id="name" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>注册资金</label>
                                    <input class="form-control" id="capital" value="" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>股东结构</label>
                                    <input class="form-control" id="shareholder" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>类型</label>
                                    <input class="form-control" id="type" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>统一社会信用代码</label>
                                    <input class="form-control" id="uscc" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>城市</label>
                                    <input class="form-control" id="city" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>省份</label>
                                    <input class="form-control" id="province" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>注册地址</label>
                                    <input class="form-control" id="street_address" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>邮寄地址</label>
                                    <input class="form-control" id="mailing_address" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>邮编</label>
                                    <input class="form-control" id="postal_code" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>传真</label>
                                    <input class="form-control" id="fax" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>海鼎标识</label>
                                    <input class="form-control" id="hd_code" value="" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>海鼎状态</label>
                                    <input class="form-control" id="hd_state" disabled>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group" id="bank_account">
                                    <label>银行账号</label>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>账号</th>
                                                    <th>所属银行</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group" id="brands">
                                    <label>经营品牌</label>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>品牌名</th>
                                                    <th>品牌授权书</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>营业执照</label>
                                    <div id="business_license"></div>
                                </div>
                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>