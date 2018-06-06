<?php
$scripts = $scripts. '<script type="text/javascript" src="views/assets/base/js/my-brands.js"></script>';
?>

<!-- BEGIN: PAGE CONTAINER -->
<div class="c-layout-page">
    <?php include ('component/sub-menu.php'); ?>
    <!-- BEGIN: 我的品牌 -->
	<div class="c-content-box c-size-md c-overflow-hide c-bg-grey-1">
		<div class="c-container">
			<div class="c-content-tab-3 c-opt-1">
				<div>
					<ul class="nav c-theme-nav" id="brand_list">
						<li>
							<div class="c-separator">
							</div>
                            <a class="c-font-16 c-font-bold" href="add-brand" title="添加品牌"><i class="fa fa-plus-circle"></i></a>
						</li>
					</ul>
				</div>
				<div class="c-tab-content">
					<div class="container">
                        <div class="alert alert-info" style="display: block;" role="alert">品牌信息修改请联系网站系统管理员</div>
                        <form id="my_brand_form">
                            <div class="c-content-title-1">
                                <h3 class="c-center c-font-uppercase c-font-bold"></h3>
                                <div class="c-line-center c-theme-bg">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>品牌名称</label>
                                        <input type="text" id="brand_name" name="brand_name" class="form-control input-lg c-square" disabled>
                                        <div class="clearfix"> </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>品牌属性*</label>
                                        <select id="attribute" name="attribute" class="form-control input-lg c-square" required disabled>
                                            <option value="">请选择 (必选)</option>
                                            <option value="1">国际知名品牌国内首家</option>
                                            <option value="2">国际主流知名品牌</option>
                                            <option value="3">国际普通品牌</option>
                                            <option value="4">国内主流知名品牌</option>
                                            <option value="5">国内普通品牌</option>
                                            <option value="6">区域知名品牌</option>
                                            <option value="7">区域普通品牌</option>
                                        </select>
                                        <div id="errorcontainer-attribute" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="clearfix"> </div>
                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                        <label>品牌Logo* (接受图片格式为jpg,jpeg,png)</label>
                                        <!--<input type="file" id="logo" name="logo" class="form-control input-lg c-square">-->
                                        <div id="logo"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>品牌授权书</label>
                                    <div class="form-group" id="brand_author"></div>
                                </div>    
                                <div class="clearfix"> </div>
                                
                                <div class="col-md-12">
                                    <label>门店样图* (接受图片格式为jpg,jpeg,png)</label>
                                    <div class="form-group">
                                        <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                                        <!--<input type="file" id="shop_sample" name="shop_sample[]" class="form-control input-lg c-square" multiple>-->
                                        <div id="shop_sample"></div>
                                    </div>
                                </div> 
                                <div class="clearfix"> </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>一级业态*</label>
                                        <input type="text" id="modality_1" name="modality_1" class="form-control input-lg c-square" disabled>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>二级业态*</label>
                                        <input type="text" id="modality_2" name="modality_2" class="form-control input-lg c-square" disabled>
                                    </div>
                                </div>
                                <div class="clearfix"> </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>三级业态*</label>
                                        <input type="text" id="modality_3" name="modality_3" class="form-control input-lg c-square" disabled>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>品牌价位*</label>
                                        <select id="class" name="class" class="form-control input-lg c-square" required disabled>
                                            <option value="">请选择 (必选)</option>
                                            <option value="1">奢侈</option>
                                            <option value="2">中等</option>
                                            <option value="3">低端</option>
                                        </select>
                                        <div id="errorcontainer-class" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="clearfix"> </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>口碑*</label>
                                        <select id="reputation" name="reputation" class="form-control input-lg c-square" required disabled>
                                            <option value="">请选择 (必选)</option>
                                            <option value="1">非常好</option>
                                            <option value="2">比较好</option>
                                            <option value="3">一般</option>
                                        </select>
                                        <div id="errorcontainer-reputation" class="errorDiv"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>市场销售份额*</label>
                                        <input type="text" id="market_share" name="market_share" placeholder="必填" class="form-control input-lg c-square" required disabled>
                                        <div id="errorcontainer-market_share" class="errorDiv"></div>
                                        <div class="clearfix"> </div>
                                    </div>
                                </div>
                                <div class="clearfix"> </div>
                                
                                <div class="panel">
                                    <!--<div class="panel-heading" role="tab" id="headingOne-6">
                                        <h4 class="panel-title">
                                        <a class="collapsed c-font-bold c-font-19" data-toggle="collapse" data-parent="#accordion-6" href="#collapseOne-6" aria-expanded="true" aria-controls="collapseOne-6">
                                        <i class="fa fa-chevron-down"></i> 选填内容 </a>
                                        </h4>
                                    </div>
                                    <div id="collapseOne-6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-6">-->
                                    <div id="collapseOne-6" class="panel-collapse" role="tabpanel" aria-labelledby="headingOne-6">
                                        <div class="panel-body c-font-18" style="padding: 0;">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="name_eng">英文名称</label>
                                                    <input type="text" id="name_eng" name="name_eng" placeholder="英文名称" class="form-control input-lg c-square" disabled>
                                                     <div id="errorcontainer-name_eng" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="location">开店区域</label>
                                                    <select class="form-control input-lg c-square" id="location" name="location" disabled>
                                                        <option value="">请选择开店区域</option>
                                                        <option value="1">商务区</option>
                                                        <option value="2">居民区</option>
                                                        <option value="3">商务区/居民区</option>
                                                    </select>
                                                    <div id="errorcontainer-location" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="clearfix"> </div>
                                            
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="standard_area">标准店面积</label>
                                                    <select class="form-control input-lg c-square" id="standard_area" name="standard_area" disabled>
                                                        <option value="">请选择标准店面积</option>
                                                        <option value="1">< 80 m&sup2;</option>
                                                        <option value="2">80 - 150 m&sup2;</option>
                                                        <option value="3">150 - 250 m&sup2;</option>
                                                        <option value="4">250 - 600 m&sup2;</option>
                                                        <option value="5">> 600 m&sup2;</option>
                                                    </select>
                                                    <div id="errorcontainer-standard_area" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="target">主要客户群</label>
                                                    <select class="form-control input-lg c-square" id="target" name="target" disabled>
                                                        <option value="">请选择主要客户群</option>
                                                        <option value="1">快速增长的中产家庭</option>
                                                        <option value="2">金领/商务精英/高级白领/专业人士</option>
                                                        <option value="3">富裕的年长者/心态年轻的中老年人</option>
                                                        <option value="4">有消费力的新世代（80/90后）</option>
                                                        <option value="5">都有</option>
                                                    </select>
                                                    <div id="errorcontainer-target" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="clearfix"> </div>
                                            
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="city">城市</label>
                                                    <input type="text" id="city" name="city" placeholder="城市" class="form-control input-lg c-square" disabled>
                                                     <div id="errorcontainer-city" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="history">品牌发展历史</label>
                                                    <select class="form-control input-lg c-square" id="history" name="history" disabled>
                                                        <option value="">请选择品牌发展历史</option>
                                                        <option value="1">>10年</option>
                                                        <option value="2">>5年</option>
                                                        <option value="3">>2年</option>
                                                        <option value="4">新品牌</option>
                                                    </select>
                                                    <div id="errorcontainer-history" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="clearfix"> </div>
                                            
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="rank">行业排名</label>
                                                    <input type="text" id="rank" name="rank" placeholder="行业排名" class="form-control input-lg c-square" disabled>
                                                     <div id="errorcontainer-rank" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="shop_amount">当地已开店数</label>
                                                    <select class="form-control input-lg c-square" id="shop_amount" name="shop_amount" disabled>
                                                        <option value="">请选择当地已开店数</option>
                                                        <option value="1">>10家</option>
                                                        <option value="2">5-10家</option>
                                                        <option value="3"><5家</option>
                                                        <option value="4">0</option>
                                                    </select>
                                                    <div id="errorcontainer-shop_amount" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="clearfix"> </div>
                                            
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="compare">月均销售额坪效</label>
                                                    <select class="form-control input-lg c-square" id="compare" name="compare" disabled>
                                                        <option value="">请选择月均销售额坪效</option>
                                                        <option value="1">> 当地同等行业水平 20%</option>
                                                        <option value="2">> 当地同等行业水平 10%</option>
                                                        <option value="3">= 当地同等行业水平</option>
                                                        <option value="4">< 当地同等行业水平 10%</option>
                                                        <option value="5">< 当地同等行业水平 20%</option>
                                                    </select>
                                                    <div id="errorcontainer-compare" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="average_unit_price">客单价</label>
                                                    <input type="text" id="average_unit_price" name="average_unit_price" placeholder="客单价" class="form-control input-lg c-square" disabled>
                                                     <div id="errorcontainer-average_unit_price" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="clearfix"> </div>
                                            
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="joined">是否有旗下品牌已入驻SBM/TM</label>
                                                    <select class="form-control input-lg c-square" id="joined" name="joined" disabled>
                                                        <option value="">请选择是否有旗下品牌已入驻SBM/TM</option>
                                                        <option value="1">0</option>
                                                        <option value="2">1</option>
                                                        <option value="3">2</option>
                                                        <option value="4">3</option>
                                                        <option value="5">>3</option>
                                                    </select>
                                                    <div id="errorcontainer-joined" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="join_other_mall">是否有意进驻正大其它门店</label>
                                                    <select class="form-control input-lg c-square" id="join_other_mall" name="join_other_mall" disabled>
                                                        <option value="">请选择是否有意进驻正大其它门店</option>
                                                        <option value="1">无</option>
                                                        <option value="2">有</option>
                                                    </select>
                                                    <div id="errorcontainer-join_other_mall" class="errorDiv"></div>
                                                </div>
                                            </div>
                                            <div class="clearfix"> </div>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="col-md-12">
                                    <center>
                                        <button type="submit" class="btn c-theme-btn c-btn-uppercase btn-lg c-btn-bold c-btn-square" disabled>确定</button>
                                    </center>
                                </div>-->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: 我的品牌 -->
    <input type="hidden" id="hidden_merchant_code" value="<?= $_SESSION['mid'] ?>">
    <input type="hidden" id="hidden_brand_code">
</div>

<?php include ('footer.php'); ?>