<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper" class="home-page">
    	<div class="row">
            <div class="col-lg-12">
                <h1 id="floorNo" style="display: inline-block; margin-right: 5px;"></h1><label>楼层指引</label>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <div class="c-content-panel" style="background-color: transparent;">
                                <div class="c-label" id="fmap" style="background-color: transparent; margin: 10px 0;">
                                    <span style="background-color: #3c763d; width: 20px; height: 13px; display: inline-block;"></span> 本店铺
                                    <span style="margin-left: 15px; background-color: #cdcdcd; width: 20px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
                                    <span style="margin-left: 15px; background-color: #FE9E9E; width: 20px; height: 13px; display: inline-block;"></span> 空铺 <span id="empty"></span>%
                                    <span style="margin-left: 15px; background-color: #FEED99; width: 20px; height: 13px; display: inline-block;"></span> 待租 <span id="to_be_lease"></span>% 
                                     (<label class="radio-inline">
				                  		<input type="radio" name="daysBeforeExpiration" value="90"> 90天
					                </label>
					                <label class="radio-inline">
				                  		<input type="radio" name="daysBeforeExpiration" value="60"> 60天
					                </label>
					                <label class="radio-inline">
				                  		<input type="radio" name="daysBeforeExpiration" value="30"> 30天
					                </label>)
                                    <span style="margin-left: 15px; background-color: #D5C8AA; width: 20px; height: 13px; display: inline-block;"></span> 改造 <span id="renovation"></span>%
                                </div>
                                <div class="c-body">
                                    <img src="#" class="img-responsive" usemap="" id="map" />
									<map name="" id=""></map>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="shops_info" class="col-sm-4">
                    	<div class="col-sm-6" style="padding: 0;">
	                    	<ul class="list-group">
				                <li class="list-group-item">
				                  <span id="floor" class="badge"></span>
				                  楼层
				                </li>
				                <li class="list-group-item">
				                  <span id="shop_state" class="badge"></span>
				                  状态
				                </li>
				                <li class="list-group-item">
				                  <span id="brand_name" class="badge"></span>
				                  <span id="brand_time"></span>品牌
				                </li>
				                <li class="list-group-item">
				                  <span id="area" class="badge"></span>
				                  面积
				                </li>
				                <li class="list-group-item">
				                  <span id="rent" class="badge"></span>
				                  租金
				                </li>
				                <li class="list-group-item">
				                  <span id="float_rent" class="badge"></span>
				                  扣率
				                </li>
			              	</ul>
		              	</div>

		              	<div class="col-sm-6" style="padding-right: 0;">
	                    	<ul class="list-group">
				                <li class="list-group-item">
				                  <span id="contract_expire_date" class="badge"></span>
				                  合同到期日
				                </li>
				                <li class="list-group-item">
				                  <span id="sign_up_date" class="badge"></span>
				                  签约时间
				                </li>
				                <li class="list-group-item">
				                  <span id="hoarding_date" class="badge"></span>
				                  围挡时间
				                </li>
				                <li class="list-group-item">
				                  <span id="entering_date" class="badge"></span>
				                  进场时间
				                </li>
				                <li class="list-group-item">
				                  <span id="opening_date" class="badge"></span>
				                  开业时间
				                </li>
				                <li class="list-group-item">
				                  <span id="sales" class="badge"></span>
				                  近<span id="weeks"></span>周销售额
				                </li>
			              	</ul>
		              	</div>

		              	<div class="col-sm-12" style="padding: 0;">
                         <div class="form-group" id="vr">
                            <div class="embed-responsive embed-responsive-16by9" style="display: none;">
                                 <iframe class="embed-responsive-item" src="#" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    <div class="clearfix"> </div>

                    <div class="col-sm-12">
                        <div class="form-group" id="images">
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>