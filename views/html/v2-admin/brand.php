<?php
$scripts = $scripts . '<script type="text/javascript" src="/views/assets/base/js/v2-admin/brand-admin.js"></script>';
?>

<body id="mimin" class="dashboard">
    <?php include ('navbar_top.php'); ?>
    <div class="container-fluid mimin-wrapper">
        <?php include ('navbar_side.php'); ?>
        <!-- start: Content -->
        <div id="content">
            <div class="panel box-shadow-none content-header">
                <div class="panel-body">
                    <div class="col-md-12">
                        <h3 class="animated fadeInLeft" style="display: inline-block;">品牌信息</h3>
                        <p class="animated fadeInDown" style="display: inline-block;">详情</p>
                    </div>
                </div>
            </div>
            <div class="form-element">
                <div class="col-md-12 padding-0">
                    <div class="col-md-12">
                        <div class="panel form-element-padding">
                            <div class="panel-heading">
                                <h4>品牌信息</h4>
                            </div>
                            <div class="panel-body" style="padding-bottom:30px;">
                                <div class="col-md-6">
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">品牌编号</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="code" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">一级业态</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="modality_1" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">二级业态</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="modality_2" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">三级业态</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="modality_3" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">品牌属性</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
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
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">口碑</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="reputation" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">非常好</option>
                                                    <option value="2">比较好</option>
                                                    <option value="3">一般</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">标准店面积</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
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
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">品牌发展历史</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="history" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">>10年</option>
                                                    <option value="2">>5年</option>
                                                    <option value="3">>2年</option>
                                                    <option value="4">新品牌</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">行业排名</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="rank" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">月均销售额坪效</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
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
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">是否有旗下品牌已入驻SBM</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="compare" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">0</option>
                                                    <option value="2">1</option>
                                                    <option value="3">2</option>
                                                    <option value="4">3</option>
                                                    <option value="5">>3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">品牌名称</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="brand_name" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">市场销售份额</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="market_share" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">英文名称</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="name_eng" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">城市</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="city" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">客单价</label>
                                        <div class="col-sm-8"><input type="text" class="form-control" id="average_unit_price" disabled></div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">品牌价位</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="class" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">奢侈</option>
                                                    <option value="2">中等</option>
                                                    <option value="3">低端</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">开店区域</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="location" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">商务区</option>
                                                    <option value="2">居民区</option>
                                                    <option value="3">商务区/居民区</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">主要客户群</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
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
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">当地已开店数</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="shop_amount" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">>10家</option>
                                                    <option value="2">5-10家</option>
                                                    <option value="3"><5家</option>
                                                    <option value="4">0</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">是否有意进驻正大其它门店</label>
                                        <div class="col-sm-8">
                                            <div class="col-sm-12 padding-0">
                                                <select class="form-control" id="join_other_mall" disabled>
                                                    <option value="">未选择</option>
                                                    <option value="1">无</option>
                                                    <option value="2">有</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="col-sm-4 control-label text-right">品牌Logo</label>
                                        <div class="col-sm-8">
                                            <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
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
        <!-- end: content -->
    </div>

    <?php include ('footer.php'); ?>