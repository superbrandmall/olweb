<script type="text/javascript" src="/views/assets/base/js/v3/jquery.min.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v3/jquery-weui.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.validate.min.js"></script>
<script type="text/javascript" src="/views/assets/plugins/jquery.cookie.js"></script>
<script type="text/javascript" src="/views/assets/base/js/protocol.js"></script>
<script type="text/javascript" src="/views/assets/base/js/v3/script.js?t=<?php echo date("Y-m-d") ?>" ></script>
<script type="text/javascript" src="/views/assets/base/js/mall-code.js"></script>
<?php
    echo $scripts; 
?>
<script>
$(function(){
	$("#filter-tab>div").click(function(ev){
            $(this).addClass("on").siblings().removeClass("on");
            $("#filter-tab-list .list-area").eq($(this).index()).show().siblings().hide();
            var ev = ev || window.event;
            ev.cancelBubble = true;
            ev.stopPropagation();
	})
	$("#filter-bar>div").click(function(){
            if($("#filter-box").hasClass("show")){
                $("#filter-box").removeClass("show");
            }else{
                $("#filter-box").addClass("show");
            }
            var i = $(this).index();
            $("#filter-tab>div").eq(i).trigger("click");
	})
        $(".list-area-area .left").find("a").click(function(){
            $(".list-area-area .left").find("a").css('color','#394043');
            $(this).css('color','#00AE66');
            console.log($.cookie('minArea'));
            $(".list-area-area .right").html(""); 
            $(".list-area-area .right").append("<li>最大面积</li>");
            var maxArea;
            for(var i=0;i<7;i++){
                maxArea = $.cookie('minArea')*1+50*(i+1);
                $(".list-area-area .right").append('<li><a href="javascript: void(0)" data-area="'+maxArea+'">'+maxArea+'m&sup2;</a></li>');
            }
            
            $(".list-area-area .right").find('a').click(function(){
                $(".list-area-area .right").find("a").css('color','#394043');
                $(this).css('color','#00AE66');
                $.cookie('maxArea',$(this).attr('data-area'));
                $("#filter-box").removeClass("show");
                console.log($.cookie('maxArea'));
            })
	})
        
        
        
	
	//滚动加载
	$(window).scroll(function(){
		var loading = false;
		var sh = $(this).scrollTop();
		var dh = $(document).height();
		var wh = $(this).height();
		if(dh-(sh+wh)<50){
			if(loading) return;
			setTimeout(function() {
				$("#house-list>li:last-child").after('<li><a href="" class="house-link"></a><div class="con"><div class="house-pic"><img src="images/1.jpg"></div><div class="house-detail"><h3>瀚海星座 精装 朝南 东边户 有燃气 楼层好 采光优质</h3><div class="house-mj">2室1厅/70.72m²/南/新鸿意 瀚海星座</div><div class="house-price"><span class="price-total">105万</span><span class="unit-price">14848元/平</span></div><div class="tag-box"><span class="tag five">满五年</span><span class="tag haskey">随时看房</span></div></div></div></li>');
				loading = false;
			}, 500);
		}
	})

})
</script>
</body>
</html>