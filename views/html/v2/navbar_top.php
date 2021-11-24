<div class="page-container">
    <div class="row">
        <div class="col-12">
        <?php
        if ($page === 'default.php') {
            echo '<nav class="navbar row navbar-expand-md navbar-dark" role="navigation">';
            echo '<a class="navbar-brand" href="/v2/" style="margin-top: -10px;">';
            echo '<img src="/views/assets/base/img/content/backgrounds/oll.png" alt="OLL线上租" />';
            echo '</a>';
            echo '<button id="nav-toggle" type="button" class="ui-navbar-toggler navbar-toggler border-0 p-0 mr-md-0 ml-auto" data-toggle="collapse" data-target=".navbar-1" aria-expanded="false" aria-label="Toggle navigation">';
        } else {
            echo '<nav class="navbar row navbar-expand-md navbar-light" role="navigation" style="position: fixed; top: 0; left: 0; right: 0; z-index: 6; height: 66px;">';
            echo '<a class="navbar-brand" href="/v2/" style="position: relative; margin-left: 30px; top: 0; left: 0;">';
            echo '<img src="/views/assets/base/img/content/backgrounds/oll.png" alt="OLL线上租" />';
            echo '</a>';
            echo '<button id="nav-toggle" type="button" class="ui-navbar-toggler navbar-toggler border-0 p-0 mr-md-0 ml-auto" data-toggle="collapse" data-target=".navbar-1" aria-expanded="false" aria-label="Toggle navigation" style="position: relative; margin-right: 30px; top: 3px; right: 0;">';
        }
        ?>

                    <span class="fa fa-bars navbar-toggler-icon" aria-hidden="true"></span>
                </button>
                <div class="collapse navbar-collapse navbar-1 sidebar-nav">
                    <ul class="site-navigation nav navbar-nav ml-auto">
                        <li class="nav-item"><a href="/v2/ljz" class="nav-link cp-navigation">上海陆家嘴正大广场</a>
                            <ul style="display: block; background: transparent; margin-left: 30px;">
                                <li class="nav-item"><a href="/v2/leasing?type=leasing" class="nav-link cp-navigation">开新铺</a></li>
                                <li class="nav-item"><a href="/v2/events?type=events" class="nav-link cp-navigation">办活动</a></li>
                                <li class="nav-item"><a href="/v2/ads?type=ads" class="nav-link cp-navigation">做广告</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a href="/v2/info" class="nav-link cp-navigation">Online Leasing 账户</a></li>
                    </ul>
                </div>
            </nav>    
        </div>
    </div>
</div>