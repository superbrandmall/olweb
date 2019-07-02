$(document).ready(function(){
    //var mc = 'OLMALL180917000003';
    //getMallInfo(mc);
    var pendDays = 90;
    
    if (!sessionStorage.getItem("brandSummaryInfos") || sessionStorage.getItem("brandSummaryInfos") == null || sessionStorage.getItem("brandSummaryInfos") == '') {
        findBrandDashboard(pendDays);
    } else {
        getBrandDashboard();
    }
})

function findBrandDashboard(pd) {
    $.ajax({
        url: $.api.baseNew + "/onlineleasing-customer/api/brand/findBrandDashboard/?pendDays=" + pd+ "&userCode=" + $.cookie('login'),
        type: "GET",
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function () {},
        success: function (response, status, xhr) {
            if (response.code === 'C0') {
                sessionStorage.setItem("brandSummaryInfos", JSON.stringify(response.data));  
                sessionStorage.setItem("userModalities", JSON.stringify(response.data.userModalities));  
                getBrandDashboard();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function getBrandDashboard() {    
    var brandSummaryInfos = $.parseJSON(sessionStorage.getItem("brandSummaryInfos"));
    $('#totalBrands').text(numberWithCommas(brandSummaryInfos.total));
    var brandSummaryInfo = brandSummaryInfos.brandSummaryInfos;
    
    $.each(brandSummaryInfo, function(i,v){
        switch (v.mallCode) {
            case $.mallCode.shanghaiSbm:
                $('#ljzRentingNum').text(v.rentingNum);
                var proportions = v.proportion.details;
                var proportion = [];
                var modalityName = [];
                var mn;
                var wPercentage = 0;
                $.each(proportions, function (j, w) {
                    if(j < 6){
                        mn = GetBrandModality3(w.code);
                        modalityName.push(mn+ ' ' +Math.round(w.percentage * 100)+'%');
                        proportion.push(Math.round(w.percentage * 100));
                        wPercentage = wPercentage + w.percentage;
                    }
                });
                modalityName.push('其它 '+Math.round((1 - wPercentage) * 100)+'%');
                proportion.push(Math.round((1 - wPercentage) * 100));
                showPie(modalityName, proportion, 'ljzStatusPieChart');
                break;
            case $.mallCode.luoyangSbm:
                $('#lyRentingNum').text(v.rentingNum);
                var proportions = v.proportion.details;
                var proportion = [];
                var modalityName = [];
                var mn;
                var wPercentage = 0;
                $.each(proportions, function (j, w) {
                    if(j < 6){
                        mn = GetBrandModality3(w.code);
                        modalityName.push(mn+ ' ' +Math.round(w.percentage * 100)+'%');
                        proportion.push(Math.round(w.percentage * 100));
                        wPercentage = wPercentage + w.percentage;
                    }
                });
                modalityName.push('其它 '+Math.round((1 - wPercentage) * 100)+'%');
                proportion.push(Math.round((1 - wPercentage) * 100));
                showPie(modalityName, proportion, 'lyStatusPieChart');
                break;
            case $.mallCode.hefeiSbm:
                $('#hfRentingNum').text(v.rentingNum);
                var proportions = v.proportion.details;
                var proportion = [];
                var modalityName = [];
                var mn;
                var wPercentage = 0;
                $.each(proportions, function (j, w) {
                    if(j < 6){
                        mn = GetBrandModality3(w.code);
                        modalityName.push(mn+ ' ' +Math.round(w.percentage * 100)+'%');
                        proportion.push(Math.round(w.percentage * 100));
                        wPercentage = wPercentage + w.percentage;
                    }
                });
                modalityName.push('其它 '+Math.round((1 - wPercentage) * 100)+'%');
                proportion.push(Math.round((1 - wPercentage) * 100));
                showPie(modalityName, proportion, 'hfStatusPieChart');
                break;
            default:
                break;
        }
    })
}

function showPie(m, p, id) {
    var myPie = document.getElementById(id).getContext('2d');
    var pieChartData = new Chart(myPie, {
        type: 'pie',
        data: {
            labels: m,
            datasets: [{
                    data: p,
                    backgroundColor: [
                        '#27D656',
                        '#120202',
                        '#F56954',
                        '#00A65A',
                        '#F39C12',
                        '#00C0EF',
                        '#3C8DBC',
                        '#D2D6DE'
                    ],
                    label: '业态店铺占比'
                }]
        }
    });
}

function GetBrandModality3(mod) {       
    var mm = '-';
    if (mod !== null && mod !== '') {
        var m = mod;
        $.each($.parseJSON(sessionStorage.getItem("modalities")), function (i, v) {
            if (v.code == m) {
                mm = v.name;
                stop;
            }
            $.each(v.children, function (j, w) {
                if (w.code == m) {
                    mm = w.name;
                    stop;
                }
                $.each(w.children, function (k, x) {
                    if (x.code == m) {
                        mm = x.name;
                        stop;
                    }
                    $.each(x.children, function (l, y) {
                        if (y.code == m) {
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
