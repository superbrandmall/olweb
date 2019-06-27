<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            更新品牌
        </h1>
        <div class="pull-right">
            <a href="/brands-admin/brands" class="btn btn-primary pull-right">
                返回</a>
        </div>
    </section>
    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-default">
                        <div class="box-header with-border">
                            <h3 class="box-title">
                            </h3>
                            <div class="box-tools pull-right">
                                <button class="slideout-menu-toggle btn btn-box-tool btn-box-tool-lg" data-toggle="tooltip" title="Help"><i class="fa fa-question"></i></button>
                            </div>
                        </div>

                        <div class="box-body">
                            <form id="create-form" class="form-horizontal" method="post" action="#" autocomplete="off" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label class="col-md-3 control-label">品牌名称</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="" value="NUOGIC">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">品牌属性</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">国际知名品牌国内首家</option>
                                            <option value="2">国际主流知名品牌</option>
                                            <option value="3" selected>国际普通品牌</option>
                                            <option value="4">国内主流知名品牌</option>
                                            <option value="5">国内普通品牌</option>
                                            <option value="6">区域知名品牌</option>
                                            <option value="7">区域普通品牌</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">一级业态</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="" selected>女装&配件</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">二级业态</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="" selected>配件</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">三级业态</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="" selected>女鞋</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">品牌价位</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">奢侈</option>
                                            <option value="2" selected>中等</option>
                                            <option value="3">低端</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">口碑</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">非常好</option>
                                            <option value="2" selected>比较好</option>
                                            <option value="3">一般</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="warranty_months" class="col-md-3 control-label">市场销售份额</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <div class="input-group" style="padding-left: 0px;">
                                            <input class="form-control" type="text" name="warranty_months" value="10" />
                                            <span class="input-group-addon">%</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label">英文名称</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="" value="NUOGIC" />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">开店区域</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">商务区</option>
                                            <option value="2">居民区</option>
                                            <option value="3" selected>商务区/居民区</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">标准店面积</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">< 80 m&sup2;</option>
                                            <option value="2">80 - 150 m&sup2;</option>
                                            <option value="3" selected>150 - 250 m&sup2;</option>
                                            <option value="4">250 - 600 m&sup2;</option>
                                            <option value="5">> 600 m&sup2;</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">主要客户群</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">快速增长的中产家庭</option>
                                            <option value="2">金领/商务精英/高级白领/专业人</option>
                                            <option value="3">富裕的年长者/心态年轻的中老年人</option>
                                            <option value="4" selected>有消费力的新世代（80/90后）</option>
                                            <option value="5">都有</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group ">
                                    <label class="col-md-3 control-label">城市</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="" value="上海" />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">品牌发展历史</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">> 10年</option>
                                            <option value="2" selected>> 5年</option>
                                            <option value="3">> 2年</option>
                                            <option value="4">新品牌</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label">行业排名</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="" value="Top50" />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">当地已开店数</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1" selected>> 10家</option>
                                            <option value="2">5-10家</option>
                                            <option value="3">< 5家</option>
                                            <option value="4">0</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">月均销售额坪效</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1">> 当地同等行业水平 20%</option>
                                            <option value="2" selected>> 当地同等行业水平 10%</option>
                                            <option value="3">= 当地同等行业水平</option>
                                            <option value="4">< 当地同等行业水平 10%</option>
                                            <option value="5">< 当地同等行业水平 20%</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">客单价</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <div class="input-group" style="padding-left: 0px;">
                                            <input class="form-control" type="text" name="" value="500" />
                                            <span class="input-group-addon">元</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">是否有旗下品牌已入驻SBM/TM</label>
                                    <div class="col-md-7 required">
                                        <select class="select2" name="" style="width: 100%">
                                            <option value="">未选择</option>
                                            <option value="1" selected>0</option>
                                            <option value="2">1</option>
                                            <option value="3">2</option>
                                            <option value="4">3</option>
                                            <option value="5">> 3</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label">联系人姓名</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="" value="黄先生"  />
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label">联系人电话</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="" value="13661680652"  />
                                    </div>
                                </div>
                                
                                <div class="form-group ">
                                    <label class="col-md-3 control-label" for="image">品牌Logo</label>
                                    <div class="col-md-7 required">
                                        <label class="btn btn-default">
                                            选择文件...
                                            <input type="file" name="image" id="logo" data-maxsize="9000000" accept="image/gif,image/jpeg,image/png,image/svg" style="display:none">
                                        </label>
                                        <span class="help-block" id="logo-status">文件类型可选择jpg、png、gif或svg，文件最大尺寸不超过10M。</span>
                                        <span class='label label-default' id="logo-info"></span>
                                    </div>
                                    <div class="col-md-4 col-md-offset-3">
                                        <img id="imagePreview" src="/views/assets/base/img/content/brands-admin/nuogic.jpg" style="max-width: 200px;">
                                    </div>
                                </div>


                                <div class="box-footer text-right">
                                    <a class="btn btn-link text-left" href="/brands-admin/brands">取消</a>
                                    <button type="submit" class="btn btn-success"><i class="fa fa-check icon-white"></i> 保存</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="slideout-menu">
                    <a href="#" class="slideout-menu-toggle pull-right">×</a>
                    <h3>
                        注意事项
                    </h3>
                    <p>新增品牌应谨慎小心，严格按照格式要求填写内容，以免引起差错。 </p>
                </div>
            </div>

        </div>

    </section>

</div><!-- /.content-wrapper -->

<?php include 'footer.php'; ?>