<div class="c-body">
    <div class="c-content-tab-1 c-theme c-margin-t-30">
        <div class="nav-justified">
            <ul class="nav nav-tabs nav-justified c-font-uppercase c-font-bold">
                <li<?php if(isset($_GET['p']) && $_GET['p'] == 'my-favourite') { echo ' class="active"';} ?>>
                    <a href="my-favourite" class="c-border-red"><i class="fa fa-heart" aria-hidden="true"></i> <?= $lang['sub_nav_my_favourite'] ?></a>
                </li>
                <li<?php if(isset($_GET['p']) && $_GET['p'] == 'my-reservations') { echo ' class="active"';} ?>>
                    <a href="my-reservations" class="c-border-red"><i class="fa fa-clock-o" aria-hidden="true"></i> <?= $lang['sub_nav_my_reservation'] ?></a>
                </li>
            </ul>
        </div>

    </div>
</div>