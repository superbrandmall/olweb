<?php
/**
 * The db.php file which initiates a connection to the database
 * and gives a global $db variable for access
 * @uses ezSQL MySQL
 */
/** edit your configuration */
//$dbuser = 'Leaser2017';
//$dbname = 'online_leasing_db';
//$dbpassword = 'Online20leasing17';
//$dbhost = '10.130.12.15';
//$dbhost = 'localhost';
    
/*$dbuser = 'ol%ol';
$dbname = 'online_leasing_db';
$dbpassword = 'p@ssw0rd';
$dbhost = 'ol.mysqldb.chinacloudapi.cn';*/
    
/*$dbuser = 'oldev%oldev';
$dbname = 'online_leasing_db';
$dbpassword = 'p@ssw0rd';
$dbhost = 'oldev.mysqldb.chinacloudapi.cn';*/

$dbuser = 'oldev%oldev';
$dbname = 'online_leasing_db_dev';
$dbpassword = 'p@ssw0rd';
$dbhost = '10.130.12.15';

/** Stop editing from here, else you know what you are doing ;) */

/** defined the root for the db */
if(!defined('ADMIN_DB_DIR'))
    define('ADMIN_DB_DIR', dirname(__FILE__));

require_once ADMIN_DB_DIR . '/ez_sql_core.php';
require_once ADMIN_DB_DIR . '/ez_sql_mysql.php';
global $db;
$db = new ezSQL_mysql($dbuser, $dbpassword, $dbname, $dbhost);
$db->query("SET NAMES utf8 COLLATE utf8_general_ci");