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
            echo '<nav class="navbar row navbar-expand-md navbar-light" role="navigation" style="background-image: -moz-linear-gradient(135deg, #aa1dec 10%, #fef646 100%); background-image: -webkit-linear-gradient(135deg, #aa1dec 10%, #fef646 100%); background-image: linear-gradient(135deg, #aa1dec 10%, #fef646 100%); position: fixed; top: 0; left: 0; right: 0; z-index: 2; height: 66px;">';
            echo '<a class="navbar-brand" href="/v2/" style="position: relative; margin-left: 30px; top: 0; left: 0;">';
            echo '<img src="/views/assets/base/img/content/backgrounds/oll.png" alt="OLL线上租" />';
            echo '</a>';
            echo '<button id="nav-toggle" type="button" class="ui-navbar-toggler navbar-toggler border-0 p-0 mr-md-0 ml-auto" data-toggle="collapse" data-target=".navbar-1" aria-expanded="false" aria-label="Toggle navigation" style="position: relative; margin-right: 30px; top: 0; right: 0;">';
        }
        ?>

                    <span class="fa fa-bars navbar-toggler-icon" aria-hidden="true"></span>
                </button>
                <div class="collapse navbar-collapse navbar-1 sidebar-nav">
                    <ul class="site-navigation nav navbar-nav ml-auto">
                        <li class="nav-item"><a href="/v2/ljz" class="nav-link cp-navigation">上海陆家嘴正大广场</a></li>
                        <li class="nav-item"><a href="/v2/info" class="nav-link cp-navigation">Online Leasing 账户</a></li>
                    </ul>
                </div>
            </nav>
            
            <?php
if ($page !== 'default.php') {
?>
<div class="section-wave" style="margin-top: 65px; line-height: 0; background-image: -moz-linear-gradient(10deg, #aa1dec 10%, #fef646 100%); background-image: -webkit-linear-gradient(10deg, #aa1dec 10%, #fef646 100%); background-image: linear-gradient(10deg, #aa1dec 10%, #fef646 100%);">
    <svg x="0px" y="0px" width="100%" height="12px" viewBox="0 0 1920 46" preserveAspectRatio="none" style="fill: white;">
      <path d="M1920,0.5c-82.8,0-109.1,44-192.3,44c-78.8,0-116.2-44-191.7-44c-77.1,0-115.9,44-192,44c-78.2,0-114.6-44-192-44c-78.4,0-115.3,44-192,44c-76.9-0.1-119-44-192-44c-77,0-115.2,44-192,44c-73.6,0-114-44-190.9-44c-78.5,0-117.2,44-194.1,44c-75.9,0-113-44-191-44V46h1920V0.5z"></path>
    </svg>
</div>
<?php
}
?>
            
        </div>
    </div>
</div>