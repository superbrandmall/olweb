var floor = [];
floor['f4'] = true;
floor['f3'] = true;
floor['f2'] = true;
floor['f1'] = true;
floor['fb1'] = true;

$(document).ready(function(){
    $( "#f4_g" ).addClass('floor-guide-active-pre-pre');
    $( "#f3_g" ).addClass('floor-guide-active-pre');
    $( "#f2_g" ).addClass('floor-guide-active');
    $( "#f1_g" ).addClass('floor-guide-active-next');
    $( "#fb1_g" ).addClass('floor-guide-active-next-next');
        
    $(window).scroll(function() {
        var y = $(this).scrollTop();
        
        if (y <= $('#f4').offset().top) {
            
        } else if (y <= $('#f3').offset().top && y > $('#f4').offset().top) {
            getFloorInfo($.mallCode.zhengzhouTm,'三楼','f3');
        } else if (y <= $('#f2').offset().top && y > $('#f3').offset().top) {
            getFloorInfo($.mallCode.zhengzhouTm,'二楼','f2');
        } else if (y <= $('#f1').offset().top && y > $('#f2').offset().top) {
            getFloorInfo($.mallCode.zhengzhouTm,'一楼','f1');
        } else if (y <= $('#fb1').offset().top && y > $('#f1').offset().top) {
            getFloorInfo($.mallCode.zhengzhouTm,'负一楼','fb1');
        }
    });
    
    getMallInfo($.mallCode.zhengzhouTm);
    getFloorInfo($.mallCode.zhengzhouTm,'四楼','f4');
});

function getMallInfo(mc) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/info/mall/"+mc+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                var mall = response.data;
                var proportions = mall.proportion.details;
                var traffics = mall.traffic;
                
                $('video').html('<source src="'+mall.video+'.mp4" type="video/mp4" /><source src="'+mall.video+'.webm" type="video/webm" />');
                $('#mall_desc').html('<p>'+mall.description+'</p>');
                $('#gross_floor_area').text(numberWithCommas(mall.grossFloorArea));
                $('#leasing_area').text(numberWithCommas(mall.leasingArea));
                $('#street').text(mall.location || '-');
                $('.mall-name').text(mall.mallName);
                
                var proportion = [];
                var modalityName = [];
                var mn;
                
                $.each(proportions, function(i,v){
                    mn = GetBrandModality3(v.code);
                    modalityName.push(mn+' ('+Math.round(v.percentage*100)+'%)');
                    proportion.push(Math.round(v.percentage*100)); 
                });
                showPie(modalityName,proportion);
                showUpTy();
                showSalesTy();

                var trafficType;
                var trafficText = "";
                $.each(traffics, function(i,v){
                    switch(v.type){
                    case 'bus':
                        trafficType = "公交";
                        break;
                    case 'metro':
                        trafficType = "地铁";
                        break;
                    case 'high-speed rail':
                        trafficType = "高铁";
                        break;
                    case 'parking':
                        trafficType = "停车位";
                        break;
                    }
                    trafficText += '<li class="c-bg-before-red">'+trafficType + ' <small>'+v.text+'</small></li>';
                });
                $('#traffics').html(trafficText);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getFloorInfo(mc,fn,fl) {
    if(floor[fl] === true){
        floor[fl] = false;
        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/base/info/floor/"+mc+"/"+fn+"",
            type: "GET",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    var details = response.data.proportion.details;
                    var proportion = "";
                    var modalityName;
                    $.each(details, function(i,v){
                        modalityName = GetBrandModality3(v.code);
                        proportion += '<div class="col-sm-5 modality-name">'+modalityName+' ('+v.count+'家): '+Math.round(v.percentage*100)+'%</div><div class="col-sm-7"><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="'+Math.round(v.percentage*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round(v.percentage*100)+'%;"></div></div></div><div class="clearfix"> </div>'; 
                    });
                    $('#proportion_'+fl).html(proportion);
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function showPie(m,p) {
    var myPie = document.getElementById("pie-chart").getContext('2d');
    var pieChartData = new Chart(myPie, {
        type: 'pie',
        data: {
            labels: m,
            datasets: [{
                data: p,
                backgroundColor: [
                    '#FF6384',
                    '#FF9F40',
                    '#FFCD56',
                    '#4BC0C0',
                    '#36A2EB',
                    '#9966FF',
                    '#C9CBCF',
                    '#FF6384',
                    '#FF9F40',
                    '#FFCD56',
                    '#4BC0C0',
                    '#36A2EB',
                    '#9966FF',
                    '#C9CBCF'
                ],
                label: '店铺业态占比'
            }]
        }
    });
}

function showUpTy() {
    /********* 客流量 **********/   
    var kll = document.getElementById("area-chart").getContext('2d');
    var kllChart = new Chart(kll, {
        type: 'bar',
        data: {
            labels: ['201703','201704','201705','201706','201707','201708','201709','201710','201711','201712','201801','201802'],
            datasets: [
                {
                    label: '客流量(万人)',
                    data: [13.1,12.23,8.59,9.23,9.57,10.75,8.56,9.74,9.99,12.58,11.74,10.08],
                    backgroundColor: 'rgba(234,106,114,0.5)',
                    borderColor: 'rgba(234,106,114,1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function showSalesTy() {
    /********* 销售额 **********/
    var xse = document.getElementById("bar-chart").getContext('2d');
    var xseChart = new Chart(xse, {
        type: 'line',
        data: {
            labels: ['201701','201702','201703','201704','201705','201706','201707','201708','201709','201710','201711','201712'],
            datasets: [
                {
                    label: '销售额(百万)',
                    data: [2.22,2.83,2.72,3.48,3.05,3.17,3.38,4.04,3.42,3.83,3.21,5.03],
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(231,80,90,1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function GetBrandModality3(mod) {
    var mm = '-';
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
            if(v.code == m) {
                mm = v.name;
                return false;
            }
            $.each(v.children, function(j,w) {
                if(w.code == m) {
                    mm = w.name;
                    return false;
                }
                $.each(w.children, function(k,x) {
                    if(x.code == m) {
                        mm = x.name;
                        return false;
                    }
                    $.each(x.children, function(l,y) {
                        if(y.code == m) {
                            mm = y.name;
                        }
                    });
                });
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
}