<?php
if(gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.15' || gethostbyname($_SERVER['SERVER_NAME']) == '127.0.0.1') {
    $shanghai_sbm = 'OLMALL180424000005';
    $xh_tm = 'OLMALL180424000004';
    $bs_tm = 'OLMALL180424000006';
} else if(gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.41' || gethostbyname($_SERVER['SERVER_NAME']) == '10.130.12.45') {
    $shanghai_sbm = 'OLMALL180507000002';
    $xh_tm = 'OLMALL180507000001';
    $bs_tm = 'OLMALL180507000003';
} else {
    $shanghai_sbm = 'OLMALL180917000003';
    $xh_tm = 'OLMALL180917000001';
    $bs_tm = 'OLMALL180917000002';
}