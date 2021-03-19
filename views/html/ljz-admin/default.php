<div id="wrapper">
    <?php include ('navbar_top.php'); ?>
    <?php include ('navbar_side.php'); ?>
    <div id="page-wrapper" class="home-page">
        <div class="row">
            <div class="col-lg-12">
                <h1 id="floorNo" style="display: inline-block; margin-right: 5px; color: rgb(120, 128, 163);"></h1>
                <div class="c-label" id="fmap" style="display: none; background-color: transparent; margin: 10px 0; color: #fff; font-size: 16px;">
                    <span style="margin-left: 15px; background-color: #7d9fe9; width: 20px; height: 13px; display: inline-block;"></span> Leased <span id="leased"></span>%
                    <span style="margin-left: 15px; background-color: #FE9E9E; width: 20px; height: 13px; display: inline-block;"></span> Vacancy <span id="empty"></span>%
                    <span style="margin-left: 15px; background-color: #FEED99; width: 20px; height: 13px; display: inline-block;"></span> Expiring <span id="to_be_lease"></span>%
                    (<label class="radio-inline">
                        <input type="radio" name="daysBeforeExpiration" value="90"> 90d
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="daysBeforeExpiration" value="60"> 60d
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="daysBeforeExpiration" value="30"> 30d
                    </label>)
                    <span style="margin-left: 15px; background-color: #D5C8AA; width: 20px; height: 13px; display: inline-block;"></span> Renovation <span id="renovation"></span>%
                </div>
                
                <div class="c-label" style="display: inline-block; background-color: transparent; margin: 10px 0; color: #fff; font-size: 16px;">
                    <span style="margin-left: 15px; background-color: #64D2FF; width: 20px; height: 13px; display: inline-block;"></span> 零售业态
                    <span style="margin-left: 15px; background-color: #FF453A; width: 20px; height: 13px; display: inline-block;"></span> 餐饮业态
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <div class="c-content-panel" style="background-color: transparent;">
                        <div class="c-body" style="position: relative;">
                            <div style="position: absolute;top: 0;left: 0; z-index: 1;">
                                <button id="zoom_in" class="btn btn-sm btn-default" style="display: block;">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <button id="zoom_out" class="btn btn-sm btn-default" style="display: block;">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
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
                            <span class="control-label">Expiring date:</span>
                            <strong id="contract_expire_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Rent:</span>
                            <strong id="rent" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Size:</span>
                            <strong id="area" class="control-label"></strong>
                        </div>
                        <!--<div class="form-group">
                            <span class="control-label">Target contract signed date:</span>
                            <strong id="sign_up_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Target decoration date:</span>
                            <strong id="entering_date" class="control-label"></strong>
                        </div>-->
                        <div class="form-group">
                            <span class="control-label">Contract schedule:</span>
                            <strong id="contract_schedule" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Contract extension:</span>
                            <strong id="contract_extension" class="control-label"></strong>
                        </div>
                        <div class="form-group" id="store_img" style="margin-top: 25px;"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <span class="control-label">Sales of last <span id="weeks"></span> wks:</span>
                            <strong id="sales" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Floating rental rate:</span>
                            <strong id="float_rent" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Responsible person:</span>
                            <strong id="responsible_person" class="control-label"></strong>
                        </div>
                        <!--<div class="form-group">
                            <span class="control-label">Target hoarding date:</span>
                            <strong id="hoarding_date" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Target opening date:</span>
                            <strong id="opening_date" class="control-label"></strong>
                        </div>-->
                        <div class="form-group">
                            <span class="control-label">Detailed description:</span>
                            <strong id="detailed_description" class="control-label"></strong>
                        </div>
                        <div class="form-group">
                            <span class="control-label">Deal Review:</span>
                            <strong id="deal_review" class="control-label"></strong>
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
                        <span class="control-label">Unit:</span>
                        <strong id="unit" class="control-label"></strong>
                    </div>
                </div>
                <div class="col-md-6">
                        <div class="form-group">
                            <span class="control-label">NO.:</span>
                            <strong id="shop_name" class="control-label"></strong>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ('footer.php'); ?>