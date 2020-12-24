$(document).ready(function(){
    getReservations();
});

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
var hour = d.getHours();
    
function getReservations() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/appointment/findAllByMobileNoAndStatus?mobileNo="+$.cookie('uid')+"&status=已预约",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(response.data.length > 0){
                    var mallName, mallCode;
                    $.each(response.data.reverse(), function(i,v){
                        if(v.state != 0){
                            
                            switch (v.orgCode) {
                                case '301001':
                                    mallName = '河南洛阳正大广场';
                                    mallCode = 'OLMALL190117000001';
                                    break;
                                case '201001':
                                    mallName = '上海宝山正大乐城';
                                    mallCode = 'OLMALL180917000002';
                                    break;
                                case '100001':
                                    mallName = '上海陆家嘴正大广场';
                                    mallCode = 'OLMALL180917000003';
                                    break;
                                case '204001':
                                    mallName = '上海徐汇正大乐城';
                                    mallCode = 'OLMALL180917000001';
                                    break;
                                default:
                                    mallName = '上海陆家嘴正大广场';
                                    mallCode = 'OLMALL180917000003';
                                    break;
                            }
                            
                            var meetInfo = '';
                            if(v.meetInfo != null && v.meetInfo != ''){
                                meetInfo = v.meetInfo.split('|')[0]+' '+v.meetInfo.split('|')[1];
                            }
                            
                            var style = '';
                            if(dateCompare(v.appointmentDate,date) == true ){
                                style = ' style = "background: url(/views/assets/base/img/content/backgrounds/expired.png); background-repeat: no-repeat; background-position: top right;"';
                            } else {
                                if(v.appointmentDate == date){
                                    var appointHour = v.appointmentHour.replace("时","");
                                    if(appointHour <= hour){
                                        style = ' style = "background: url(/views/assets/base/img/content/backgrounds/expired.png); background-repeat: no-repeat; background-position: top right;"';
                                    }
                                }
                            }
                            
                            $('.weui-panel__bd').append('<div id="appoitment_'+v.id+'" class="weui-media-box weui-media-box_text"'+style+'>\n\
                <h4 class="weui-media-box__title"><a href="/v2/category?id='+v.shopCode+'&type=leasing&storeCode='+mallCode+'">'+mallName+' '+v.unitDesc+'</a></h4>\n\
                <p class="weui-media-box__desc">预约时间: '+v.appointmentDate+' '+v.appointmentHour+'</p>\n\
                <ul class="weui-media-box__info">\n\
                    <li class="weui-media-box__info__meta"><i class="fa fa-clock-o" aria-hidden="true"></i> '+meetInfo+'</li>\n\
                    <li class="weui-media-box__info__meta weui-media-box__info__meta_extra"><i class="fa fa-map-marker" aria-hidden="true"></i> '+(v.meetAddress || '')+'</li>\n\
                </ul>\n\
            </div>');
                        }
                    });
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}