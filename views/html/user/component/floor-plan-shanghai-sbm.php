<?php
if(explode('?m=',$_SERVER['REQUEST_URI'])[1] != null) {
    $attr = explode('?m=',$_SERVER['REQUEST_URI'])[1];
    if (strpos($attr, '&f=') !== false) {
        $m = explode('&f=',$attr)[0];
        $i = explode('&f=',$attr)[1];
    } else {
        $m = $attr;
        $i = null;
    }
} else {
    $m = null;
    $i = null;
}

session_start();
include_once "../../../../views/assets/base/lang/".$_SESSION["lang"].".php";
?>

<div style="margin: 50px 50px 20px; color: #6d6d73;">
    <strong><?php if($i == 0) { echo 'B1'; } else { echo $i; } ?>F</strong>
    <span style="margin-left: 15px; background-color: #E3E3E3; width: 20px; height: 13px; display: inline-block;"></span> <?= $lang['floor_shop_in_renting'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_lift'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -30px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_escalator'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -59px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_parking'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -89px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_info_desk'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -119px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_bathroom'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -149px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_go_downstairs'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -179px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_go_upstairs'] ?>
    <span style="margin-left: 15px; background: url(views/assets/base/img/content/floor-plan/sprite.png); background-size: 238px; background-position: -208px 0; vertical-align: bottom; height: 30px; width: 30px; display: inline-block;"></span> <?= $lang['floor_entrance'] ?>
</div>
<div class="col-md-12">
    <center>
        <img src="views/assets/base/img/content/floor-plan/shanghai-sbm/<?= $lang['mall_lang_cat'] ?>/<?= $i ?>F.png" class="img-responsive" alt="<?= $i>0 ? $i : 'B1' ?>F" usemap="#Map_<?= $i ?>F" />
        <map name="Map_<?= $i ?>F" id="Map_<?= $i ?>F"></map>
    </center>
</div>

<script>
    $(document).ready(function(){
        var floorDesc;
        switch (<?= $i ?>) {
            case 0:
                floorDesc = '负一楼';
                break;
            case 1:
                floorDesc = '一楼';
                break;
            case 2:
                floorDesc = '二楼';
                break;
            case 3:
                floorDesc = '三楼';
                break;
            case 4:
                floorDesc = '四楼';
                break;
            case 5:
                floorDesc = '五楼';
                break;
            case 6:
                floorDesc = '六楼';
                break;
            case 7:
                floorDesc = '七楼';
                break;
            case 8:
                floorDesc = '八楼';
                break;
            case 9:
                floorDesc = '九楼';
                break;
            case 10:
                floorDesc = '十楼';
                break;
            default:
                floorDesc = [];
                break;
        }
        getShopFloorInfo(floorDesc);
    });
    
    function getShopFloorInfo(fl) {
        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/<?= $m ?>/"+fl+"",
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $.each(response.data, function(i,v){
                        if(v.state === 1 && v.coords != null && v.coords != ''){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.unit+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" name="'+(v.brandName || '')+'" href="shop?id='+v.code+'" shape="poly" coords="'+v.coords+'" />');
                        }
                    });

                    drawShops();
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
    
    function drawShops(){
        var areas = $.map($('#Map_'+<?= $i ?>+'F area'),function(el) {
            return { 
                key: $(el).attr('data-key'),
                toolTip: $(el).attr('name'),
                fillColor: 'cdcdcd'
            };
        });
        
        var xOffset;
        var yOffset;

        $('#floor_map_F').find('img').mapster({
            fillColor: 'c9ae89',
            fillOpacity: 0.8,
            strokeColor: 'ffd62c',
            strokeWidth: 0,
            clickNavigate: true,
            mapKey: 'data-key',
            showToolTip: true,
            areas: areas,
            onShowToolTip: function () {
                $(".mapster_tooltip").css({
                    "font-weight": "bold",
                    "color": "#fff",
                    "background": "rgba(0,0,0,0.8)",
                    "font-size": "26px",
                    "width": "auto"
                });
                
                $("area").on("mouseenter",  function (data) {
                   xOffset = data.pageX;
                   yOffset = data.pageY;
                   $(".mapster_tooltip").css("left", xOffset);
                   $(".mapster_tooltip").css("top", yOffset);
                });
            }
        });
        
        $('#floor_map_F img[usemap]').mapster('resize', 0.65*($(window).width()), 0, 0);
    }
</script>