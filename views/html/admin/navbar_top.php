<nav class="navbar navbar-inverse navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="home">
            <img src="/views/assets/base/img/layout/logos/logo.png" alt="正大" height="25" style="display: inline-block;" /> FLOOR PLANS
        </a>
    </div>

    <ul class="nav navbar-top-links navbar-right">
        <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
            </a>
            <ul class="dropdown-menu dropdown-user">
                <li><a href="#">登录账号</a>
                </li>
                <li class="divider"></li>
                <li><a href="#"><?= $_SESSION['admin_login'] ?></a>
                </li>
            </ul>
        </li>
        <li>
            <a href="javascript: logout();">
                <i class="fa fa-sign-out fa-fw"></i>
            </a>
        </li>
    </ul>
</nav>