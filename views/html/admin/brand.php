<?php
$scripts = '<script type="text/javascript" src="/views/assets/base/js/admin/brand-admin.js"></script>';
    
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
                <h1 class="page-header">品牌信息详情</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>品牌信息</h4>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>品牌编号</label>
                                    <input class="form-control" id="code" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>品牌名称</label>
                                    <input class="form-control" id="brand_name" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>品牌属性</label>
                                    <select class="form-control" id="attribute" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">国际知名品牌国内首家</option>
                                        <option value="2">国际主流知名品牌</option>
                                        <option value="3">国际普通品牌</option>
                                        <option value="4">国内主流知名品牌</option>
                                        <option value="5">国内普通品牌</option>
                                        <option value="6">区域知名品牌</option>
                                        <option value="7">区域普通品牌</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>一级业态</label>
                                    <input class="form-control" id="modality_1" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>二级业态</label>
                                    <input class="form-control" id="modality_2" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>三级业态</label>
                                    <input class="form-control" id="modality_3" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>品牌价位</label>
                                    <select class="form-control" id="class" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">奢侈</option>
                                        <option value="2">中等</option>
                                        <option value="3">低端</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>口碑</label>
                                    <select class="form-control" id="reputation" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">非常好</option>
                                        <option value="2">比较好</option>
                                        <option value="3">一般</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>市场销售份额</label>
                                    <input class="form-control" id="market_share" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>英文名称</label>
                                    <input class="form-control" id="name_eng" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>开店区域</label>
                                    <select class="form-control" id="location" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">商务区</option>
                                        <option value="2">居民区</option>
                                        <option value="3">商务区/居民区</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>标准店面积</label>
                                    <select class="form-control" id="standard_area" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">< 80 m&sup2;</option>
                                        <option value="2">80 - 150 m&sup2;</option>
                                        <option value="3">150 - 250 m&sup2;</option>
                                        <option value="4">250 - 600 m&sup2;</option>
                                        <option value="5">> 600 m&sup2;</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>主要客户群</label>
                                    <select class="form-control" id="target" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">快速增长的中产家庭</option>
                                        <option value="2">金领/商务精英/高级白领/专业人士</option>
                                        <option value="3">富裕的年长者/心态年轻的中老年人</option>
                                        <option value="4">有消费力的新世代（80/90后）</option>
                                        <option value="5">都有</option>
                                    </select>
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
                                    <label>品牌发展历史</label>
                                    <select class="form-control" id="history" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">>10年</option>
                                        <option value="2">>5年</option>
                                        <option value="3">>2年</option>
                                        <option value="4">新品牌</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>行业排名</label>
                                    <input class="form-control" id="rank" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>当地已开店数</label>
                                    <select class="form-control" id="shop_amount" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">>10家</option>
                                        <option value="2">5-10家</option>
                                        <option value="3"><5家</option>
                                        <option value="4">0</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>月均销售额坪效</label>
                                    <select class="form-control" id="compare" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">> 当地同等行业水平 20%</option>
                                        <option value="2">> 当地同等行业水平 10%</option>
                                        <option value="3">= 当地同等行业水平</option>
                                        <option value="4">< 当地同等行业水平 10%</option>
                                        <option value="5">< 当地同等行业水平 20%</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>客单价</label>
                                    <input class="form-control" id="average_unit_price" disabled>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>是否有旗下品牌已入驻SBM/TM</label>
                                    <select class="form-control" id="joined" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">0</option>
                                        <option value="2">1</option>
                                        <option value="3">2</option>
                                        <option value="4">3</option>
                                        <option value="5">>3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>是否有意进驻正大其它门店</label>
                                    <select class="form-control" id="join_other_mall" disabled>
                                        <option value="">未选择</option>
                                        <option value="1">无</option>
                                        <option value="2">有</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                    <label>品牌Logo</label><br>
                                    <div id="logo"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>