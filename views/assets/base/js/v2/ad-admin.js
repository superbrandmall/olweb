var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    ContentOwlcarousel.init();
    
    GetAdInfo();
    
    $('.add_ad').click(function(){
        window.location.href = '/v2/advertising-shopping-cart';
    });
    
    $('#slide1').swipeSlide({
        autoSwipe:true,//自动切换默认是
        speed:3000,//速度默认4000
        continuousScroll:true,//默认否
        transitionType:'cubic-bezier(0.22, 0.69, 0.72, 0.88)',//过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad:true,//懒加载默认否
        firstCallback : function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
});

function GetAdInfo(){
    var adCode = getURLParameter('id') || null;
    var userCode = $.cookie('uid');
    $.ajax({
        url: "/views/assets/base/js/v2/json/ad.json",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                $.each(response.data, function(i,v){
                    if(v.code == adCode){
                        $('#ad_name').text(v.shopName|| '-');
                        $('#ad_type').text(v.remark_3 || '-');
                        $('#ad_size').text(v.remark_4 || '-');
                        $('#ad_material').text(v.remark_5 || '-');
                        
                        var floorName;
                        
                        switch (v.floor) {
                            case '10':
                                floorName = '十楼';
                                break;
                            case '9':
                                floorName = '九楼';
                                break;
                            case '8':
                                floorName = '八楼';
                                break;
                            case '7':
                                floorName = '七楼';
                                break;    
                            case '6':
                                floorName = '六楼';
                                break;
                            case '5':
                                floorName = '五楼';
                                break;
                            case '4':
                                floorName = '四楼';
                                break;
                            case '3':
                                floorName = '三楼';
                                break;
                            case '2':
                                floorName = '二楼';
                                break;
                            case '1':
                                floorName = '一楼';
                                break;
                            case '0':
                                floorName = '负一楼';
                                break;
                            default:
                                floorName = '一楼';
                                break;
                        }
                        
                        $('#floor').text(floorName || '-');              

                        if(v.unit != null) {
                            $('#map').attr({
                                'src': '/views/assets/base/img/content/floor-plan/shanghai-sbm/'+v.floor+'F.png',
                                'alt': v.floor+'F',
                                'usemap': '#Map_'+v.floor+'F_s'
                             });

                            $('#map').parent().append('<map name="Map_'+v.floor+'F_s" id="Map_'+v.floor+'F_s"></map>');

                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'"  href="ad?id='+v.code+'" shape="poly" coords="'+v.coords+'" />');

                            drawShops();
                        }

                        $.each(v.images, function(j,w){
                            $('#slide1 ul').append('<li><a href="javascript:;"><img src='+w.image+' alt=""></a></li>');
                            $('#slide1 .dot').append('<span></span>');
                        });

                        if(v.remark_6 !== null) {
                            $('#vr').attr('src',v.remark_6);
                        }
                    }
                })
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
    var areas = $.map($('area'),function(el) {
        if(getURLParameter('id') === $(el).attr('alt')){
            return { 
                key: $(el).attr('data-key'),
                toolTip: "本场地",
                fillColor: 'c34343',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else {
            if($(el).attr('data-full') != 1 && $(el).attr('data-full') != 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'cdcdcd'
                };
            }
            
        }
    });

    $('#map').mapster({
        fillColor: 'c9ae89',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: false,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
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
}

var ContentOwlcarousel = function() {
    
    var _initInstances = function() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        })
    };

    return {

         //main function to initiate the module
        init: function() {
            
            _initInstances();
        }

    };
}();