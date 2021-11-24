<?php
$scripts = $scripts. '<script type="text/javascript" src="/views/assets/base/js/lotus/info-admin.js"></script>';
?>

<div class="weui-cells bg-lotus f-white" style="margin-top: 0; height: 200px; display: flex; background-image: url(/views/assets/base/img/content/lotus-admin/center-top-bj.jpg); background-position: left center;">
    <div class="weui-cell" style="width: 100%;">
        <div class="weui-cell__hd">
            <div id="avatar" style="background-image: url(/views/assets/base/img/content/brands-admin/avatar.png); width: 100px; height: 100px; background-size: 100px; border-radius: 50%; "></div>
        </div>
        <div class="weui-cell__bd" style="margin-left: 20px;">
            <p><h4 id="nickname"></h4><small id="uid">138****8168</small></p>
        </div>
        <div class="weui-cell__ft">
            <a href="javascript:;" class="f-white"><i class="fa fa-cog f20" aria-hidden="true"></i></a>
        </div>
    </div>
</div>

<div class="weui-content" style="padding: 20px 10px;">    
    <div class="weui-flex">
        <div class="weui-flex__item tcenter">
            <a class="f-black" href="javascript:" role="button">
                <i class="fa fa-pencil-square-o f24" aria-hidden="true"></i>
                <p class="weui-grid__label">待确认</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a class="f-black" href="javascript:" role="button">
                <i class="fa fa-spinner f24" aria-hidden="true"></i>
                <p class="weui-grid__label">流程中</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a class="f-black" href="javascript:" role="button">
                <i class="fa fa-check-square-o f24" aria-hidden="true"></i>
                <p class="weui-grid__label">已完成</p>
            </a>
        </div>
        <div class="weui-flex__item tcenter">
            <a class="f-black" href="javascript:" role="button">
                <i class="fa fa-list-alt f24" aria-hidden="true"></i>
                <p class="weui-grid__label">全部订单</p>
            </a>
        </div>
    </div>
</div>

<div class="weui-cells">
    <a class="weui-cell weui-cell_access" href="/lotus/improve-info">
        <div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>完善信息</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
    <a class="weui-cell weui-cell_access" href="/lotus/contact">
        <div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>联系客服</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
    <a class="weui-cell weui-cell_access" href="/lotus/qa">
        <div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
        <div class="weui-cell__bd">
            <p>帮助中心</p>
        </div>
        <div class="weui-cell__ft"></div>
    </a>
</div>

<?php include ('footer.php'); ?>