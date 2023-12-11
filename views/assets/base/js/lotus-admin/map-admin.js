$(document).ready(function(){
    findLotusFiguresBI();
});

window.onload = function () {
    var R = Raphael("map", 600, 500);
	//调用绘制地图方法
    paintMap(R);
	
	var textAttr = {
        "fill": "#dd4b39",
        "font-size": "12px",
        "cursor": "pointer",
        "font-weight": "bold"
    };
			
           
    for (var state in china) {
		china[state]['path'].color = Raphael.getColor(0.9);
				
        (function (st, state) {
			
			//获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);
			
            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 10;
                    yy += 10;
                    break;
                case "上海":
                    xx += 10;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 10;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
            //写入文字
            //china[state]['text'] = R.text(xx, yy, china[state]['name']+'\n12').attr(textAttr);
            //china[state]['path'].setAttribute("fill","#113333"); //rgba(0,0,china[state]['nvalue'],0);
            //x = china[state]['nvalue'] *255 * 16 + 10 * 255;
            //china[state]['nvalue']=255-china[state]['nvalue'];
            //x = "rgb(255, 255, " + china[state]['nvalue'] + ")";
//            if($.inArray(china[state]['name'], ['北京','上海','重庆','江苏','河南','山东','湖南','陕西','广东','广西']) != -1){
//                x = "rgb(131, 204, 60)";
//            } else {
//                x = "rgb(246, 247, 246)";
//            }

            var mallNo = 0;
            switch (china[state]['name']) {
                case "北京":
                    mallNo = '4';
                    break;
                case "上海":
                    mallNo = '17';
                    break;
                case "重庆":
                    mallNo = '2';
                    break;
                case "江苏":
                    mallNo = '6';
                    break;
                case "河南":
                    mallNo = '2';
                    break;
                case "山东":
                    mallNo = '2';
                    break;
                case "湖南":
                    mallNo = '9';
                    break;
                case "陕西":
                    mallNo = '7';
                    break;
                case "广东":
                    mallNo = '46';
                    break;
                case "广西":
                    mallNo = '1';
                    break;
                default:
            }
            
            if($.inArray(china[state]['name'], ['北京','上海','重庆','江苏','河南','山东','湖南','陕西','广东','广西']) != -1){
                china[state]['text'] = R.text(xx, yy, china[state]['name']+'\n'+mallNo).attr(textAttr);
                china[state]['image'] = R.image("/views/assets/base/img/content/lotus-admin/circle.gif", xx+=2, yy-=2, 20, 20);
                china[state]['text'][0].onclick = function () {
                    $.cookie('searchMallType',china[state]['name']);
                    location.href = "/lotus-admin/malls";
                }
                china[state]['image'][0].onclick = function () {
                    $.cookie('searchMallType',china[state]['name']);
                    location.href = "/lotus-admin/malls";
                }
            }
            
            if($.inArray(china[state]['name'], ['北京','山东','广东']) != -1){
                x = "rgb(254,252,200)";
            } else if($.inArray(china[state]['name'], ['上海','河南','湖南']) != -1){
                x = "rgb(244,218,190)";
            } else if($.inArray(china[state]['name'], ['重庆']) != -1){
                x = "rgb(203,205,230)";
            } else if($.inArray(china[state]['name'], ['江苏','陕西','广西']) != -1){
                x = "rgb(248,202,223)";
            } else {
                x = "rgb(246, 247, 246)";
            }
            //x = "rgb(255," + china[state]['nvalue'] + ",255)";
            //x = "rgb("+china[state]['nvalue'] +",255,255)";
            china[state]['path'].attr("fill", x);	
        })(china[state]['path'], state);
    }
}

function findLotusFiguresBI() {
    if($.cookie('lotusFiguresBI') != null && $.cookie('lotusFiguresBI') != ''){
        var data = JSON.parse($.cookie('lotusFiguresBI'));
        if(data.date != date){
            findLotusBI();
        } else {
            renderLotusFigures(data);
        }
    } else {
        findLotusBI();
    }
}

function renderLotusFiguresBI(data) {
    data.date = date;
    $.cookie('lotusFiguresBI', JSON.stringify(data));
    renderLotusFigures(data);
}

function renderLotusFigures(data) {
    $('#lotusFiguresBI .text-red:eq(1)').text(accounting.formatNumber(data.sum));
    $('#lotusFiguresBI .text-red:eq(2)').text(accounting.formatNumber(data.count));
    $('#lotusFiguresBI .text-red:eq(3)').text(parseFloat(data.ratio * 100).toFixed(2)+'%');
    $('#lotusFiguresBI .text-red:eq(4)').text(accounting.formatNumber(data.contract));
    $('#lotusFiguresBI h4 small').text('（'+data.date+'更新）');
}

function findLotusBI(){
    $.getJSON('/controllers/api/lotus-admin/ApiLotusAdminToDoSession.php?action=lotusFigures',function(data){
        if(data){
            renderLotusFiguresBI(data);
        }
    });
}
