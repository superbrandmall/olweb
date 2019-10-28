<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper" class="home-page">
        <div class="row">
            <div class="col-lg-12">
                <h1 id="floorNo" style="display: inline-block; margin-right: 5px; color: rgb(120, 128, 163);"></h1><label style="color: rgb(120, 128, 163);">楼层指引</label>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <div class="c-content-panel" style="background-color: transparent;">
                        <div class="c-label" id="fmap" style="background-color: transparent; margin: 10px 0; color: #fff;">
                            <span style="margin-left: 15px; background-color: #7d9fe9; width: 20px; height: 13px; display: inline-block;"></span> 在租 <span id="leased"></span>%
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


                <!--<div id="shops_info" class="col-sm-4">

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
                </div>-->
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="shop_detail" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md">
        <div class="modal-content c-square">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" style="color: #ffffff;">×</span></button>
                <h4 class="modal-title" id="brand_name"></h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="col-md-6">
                        <div class="form-group">
                            <span class="control-label">合同到期日:</span>
                            <strong id="contract_expire_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">租金:</span>
                            <strong id="rent" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">面积:</span>
                            <strong id="area" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">签约时间:</span>
                            <strong id="sign_up_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">进场时间:</span>
                            <strong id="entering_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">预算开业:</span>
                            <strong id="plan_open_date" class="control-label"></strong>
                        </div>
                        <div class="form-group" id="store_img" style="margin-top: 25px;"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <span class="control-label">近<span id="weeks"></span>周销售额:</span>
                            <strong id="sales" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">扣率:</span>
                            <strong id="float_rent" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">损失金额:</span>
                            <strong id="loss" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">围挡时间:</span>
                            <strong id="hoarding_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">开业时间:</span>
                            <strong id="opening_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">负责人:</span>
                            <strong id="responsible_person" class="control-label"></strong>
                        </div>
                        <div class="form-group" id="store_vr">
                            <div class="embed-responsive embed-responsive-4by3" style="display: none;">
                                <iframe class="embed-responsive-item" src="#" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="col-md-6">
                    <div class="form-group">
                        <span class="control-label">单元号:</span>
                        <strong id="unit" class="control-label"></strong>
                    </div>
                </div>
                <div class="col-md-6">
                        <div class="form-group">
                            <span class="control-label">门牌号:</span>
                            <strong id="shop_name" class="control-label"></strong>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>