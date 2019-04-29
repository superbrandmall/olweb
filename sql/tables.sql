DROP TABLE IF EXISTS `t_bot_synonym`;

CREATE TABLE `t_bot_synonym` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_bot_word`;

CREATE TABLE `t_bot_word` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_bot_word_synonym`;

CREATE TABLE `t_bot_word_synonym` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `word_code` varchar(40) DEFAULT NULL,
  `synonym_code` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_c_api_interactive_detail`;

CREATE TABLE `t_c_api_interactive_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `user_code` varchar(40) DEFAULT NULL,
  `lang` tinyint(4) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `real_ip` varchar(50) DEFAULT NULL,
  `begin_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `interval_time` bigint(20) DEFAULT NULL,
  `uri` text,
  `request_body` text,
  `code` varchar(50) DEFAULT NULL,
  `response_body` mediumtext,
  `error_message` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_c_event_interactive_detail`;

CREATE TABLE `t_c_event_interactive_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `listener` varchar(255) DEFAULT NULL,
  `begin_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `interval_time` bigint(20) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `error_message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_c_job_interactive_detail`;

CREATE TABLE `t_c_job_interactive_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `begin_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `interval_time` bigint(20) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `error_message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_c_mail_send_detail`;

CREATE TABLE `t_c_mail_send_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `mail_template_code` varchar(40) DEFAULT NULL,
  `sent_from` varchar(255) DEFAULT NULL,
  `sent_to` varchar(255) DEFAULT NULL,
  `sent_cc` varchar(255) DEFAULT NULL,
  `params` text,
  `sent_date` datetime DEFAULT NULL,
  `html` text,
  `type` tinyint(4) DEFAULT NULL,
  `error_message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_c_mail_template`;

CREATE TABLE `t_c_mail_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `template_name` varchar(50) DEFAULT NULL,
  `file_prefix` varchar(20) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_c_rest_interactive_detail`;

CREATE TABLE `t_c_rest_interactive_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `begin_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `interval_time` bigint(20) DEFAULT NULL,
  `clazz` varchar(255) DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `request_obj` mediumtext,
  `response_obj` mediumtext,
  `error_code` varchar(50) DEFAULT NULL,
  `error_message` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_c_serial_code`;

CREATE TABLE `t_c_serial_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `serial_group` varchar(20) DEFAULT NULL,
  `serial_num` int(11) DEFAULT NULL,
  `serial_date` datetime DEFAULT NULL,
  `remark` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_c_sms_send_detail`;

CREATE TABLE `t_c_sms_send_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `sms_template_code` varchar(40) DEFAULT NULL,
  `sent_to` varchar(255) DEFAULT NULL,
  `params` text,
  `sent_date` datetime DEFAULT NULL,
  `message` text,
  `return_code` varchar(30) DEFAULT NULL,
  `return_message` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `error_message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_c_sms_template`;

CREATE TABLE `t_c_sms_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `template_name` varchar(50) DEFAULT NULL,
  `file_prefix` varchar(20) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid`;

CREATE TABLE `t_ol_bid` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `user_code` varchar(40) DEFAULT NULL,
  `merchant_code` varchar(40) DEFAULT NULL,
  `shop_code` varchar(40) DEFAULT NULL,
  `brand_code` varchar(40) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `contract_length` int(11) DEFAULT NULL,
  `lease_type` tinyint(4) DEFAULT NULL,
  `acc_type` tinyint(4) DEFAULT NULL,
  `rent_method` tinyint(4) NOT NULL,
  `compare_frequency` tinyint(4) NOT NULL,
  `gurantee` decimal(15,2) NOT NULL,
  `maintenance_during_decoration` decimal(15,2) NOT NULL,
  `maintenance_after_decoration` decimal(15,2) NOT NULL,
  `target` decimal(15,2) NOT NULL,
  `public_deposit` decimal(15,2) NOT NULL,
  `promotion` int(10) unsigned NOT NULL,
  `free_days` int(10) unsigned NOT NULL,
  `promotion_kind` tinyint(4) NOT NULL,
  `promotion_budget` decimal(15,2) NOT NULL,
  `opening` datetime NOT NULL,
  `cashier_mode` tinyint(4) NOT NULL,
  `business_hours` tinyint(4) NOT NULL,
  `extra_business_hour_1` varchar(20) DEFAULT '',
  `extra_business_hour_2` varchar(20) DEFAULT '',
  `others` text,
  `extended_decoration` int(10) DEFAULT NULL,
  `business_free_period` int(10) DEFAULT NULL,
  `free_ads_no` tinyint(4) DEFAULT NULL,
  `practice_rate_reached` decimal(15,2) DEFAULT NULL,
  `transfer_condition` text,
  `maintenance_compensate` text,
  `exclusive_condition` text,
  `binding_condition` text,
  `process_state` tinyint(4) DEFAULT NULL,
  `legal_suggest` text,
  `business_suggest` text,
  `is_standard` tinyint(4) DEFAULT NULL,
  `is_approve` tinyint(4) DEFAULT NULL,
  `is_effect` tinyint(4) DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `bill_number` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_bid_acctype`;

CREATE TABLE `t_ol_bid_acctype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `item_key` varchar(20) DEFAULT NULL,
  `item_value` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_cashier_mode`;

CREATE TABLE `t_ol_bid_cashier_mode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `item_key` varchar(20) DEFAULT NULL,
  `item_value` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_compare_frequency`;

CREATE TABLE `t_ol_bid_compare_frequency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `item_key` varchar(20) DEFAULT NULL,
  `item_value` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_contract`;

CREATE TABLE `t_ol_bid_contract` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `pdf_temp` text,
  `pdf` text,
  `deposit_bill_number` varchar(64) DEFAULT NULL,
  `deposit_bill_pdf` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_bid_detail`;

CREATE TABLE `t_ol_bid_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `dead_rent` decimal(15,2) DEFAULT NULL,
  `floating_rental_rate` decimal(15,2) DEFAULT NULL,
  `orders` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_bid_leasemodule`;

CREATE TABLE `t_ol_bid_leasemodule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `leasetype` int(11) DEFAULT NULL,
  `acctype` int(11) DEFAULT NULL,
  `leasemodulename` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_leasetermname`;

CREATE TABLE `t_ol_bid_leasetermname` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `leasemodulename` varchar(40) DEFAULT NULL,
  `feename` varchar(40) DEFAULT NULL,
  `termname` varchar(40) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_leasetype`;

CREATE TABLE `t_ol_bid_leasetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `item_key` varchar(20) DEFAULT NULL,
  `item_value` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_promotion_kind`;

CREATE TABLE `t_ol_bid_promotion_kind` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `item_key` varchar(20) DEFAULT NULL,
  `item_value` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_bid_rent_method`;

CREATE TABLE `t_ol_bid_rent_method` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `item_no` int(11) DEFAULT NULL,
  `item_key` varchar(20) DEFAULT NULL,
  `item_value` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_brand`;

CREATE TABLE `t_ol_brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `name` varchar(100) NOT NULL,
  `city` varchar(200) DEFAULT NULL,
  `attribute` tinyint(4) DEFAULT NULL,
  `class` tinyint(4) DEFAULT NULL,
  `standard_area` tinyint(4) DEFAULT NULL,
  `modality_1` varchar(50) DEFAULT NULL,
  `modality_2` varchar(50) DEFAULT NULL,
  `modality_3` varchar(50) DEFAULT NULL,
  `target` tinyint(4) DEFAULT NULL,
  `average_unit_price` decimal(15,2) DEFAULT NULL,
  `location` tinyint(4) DEFAULT NULL,
  `shop_amount` tinyint(4) DEFAULT NULL,
  `history` tinyint(4) DEFAULT NULL,
  `reputation` tinyint(4) DEFAULT NULL,
  `market_share` varchar(50) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `compare` tinyint(4) DEFAULT NULL,
  `lawsuit` tinyint(4) DEFAULT NULL,
  `arrears_of_rent` tinyint(4) DEFAULT NULL,
  `tax_evasion` tinyint(4) DEFAULT NULL,
  `quality_problem` tinyint(4) DEFAULT NULL,
  `joined` tinyint(4) DEFAULT NULL,
  `join_other_mall` tinyint(4) DEFAULT NULL,
  `source` tinyint(4) DEFAULT NULL,
  `name_eng` varchar(200) DEFAULT NULL,
  `logo` text,
  `status` tinyint(4) DEFAULT NULL,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `hd_state` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_brand_shop_sample`;

CREATE TABLE `t_ol_brand_shop_sample` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `shop_sample` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_building`;

CREATE TABLE `t_ol_building` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `mall_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `building_name` varchar(100) DEFAULT NULL,
  `gross_floor_area` decimal(15,2) DEFAULT NULL,
  `leasing_area` decimal(15,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `hd_state` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_contacts`;

CREATE TABLE `t_ol_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `code` varchar(40) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `merchant_name` varchar(100) DEFAULT NULL,
  `brand_name` varchar(100) DEFAULT NULL,
  `brand_modality` varchar(40) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_file_upload_detail`;

CREATE TABLE `t_ol_file_upload_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `user_code` varchar(50) DEFAULT NULL,
  `uri` text,
  `container_name` varchar(50) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `original_filename` varchar(255) DEFAULT NULL,
  `suffix` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_floor`;

CREATE TABLE `t_ol_floor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `building_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `floor_name` varchar(100) DEFAULT NULL,
  `gross_floor_area` decimal(15,2) DEFAULT NULL,
  `leasing_area` decimal(15,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `hd_state` varchar(30) DEFAULT NULL,
  `description_eng` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_floor_old`;

CREATE TABLE `t_ol_floor_old` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `building_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `floor_name` varchar(100) DEFAULT NULL,
  `gross_floor_area` decimal(15,2) DEFAULT NULL,
  `leasing_area` decimal(15,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `hd_state` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_mall`;

CREATE TABLE `t_ol_mall` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `mall_name` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `gross_floor_area` decimal(15,2) DEFAULT NULL,
  `leasing_area` decimal(15,2) DEFAULT NULL,
  `description` text,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `position` tinyint(4) DEFAULT NULL,
  `img` text,
  `hd_state` varchar(30) DEFAULT NULL,
  `mall_name_eng` varchar(100) DEFAULT NULL,
  `location_eng` varchar(255) DEFAULT NULL,
  `video` text,
  `description_eng` text,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_mall_bid_standard`;

CREATE TABLE `t_ol_mall_bid_standard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `limit_retail_1` decimal(15,2) DEFAULT NULL,
  `limit_retail_2` decimal(15,2) DEFAULT NULL,
  `limit_retail_3` decimal(15,2) DEFAULT NULL,
  `limit_nonretail_1` decimal(15,2) DEFAULT NULL,
  `limit_nonretail_2` decimal(15,2) DEFAULT NULL,
  `limit_nonretail_3` decimal(15,2) DEFAULT NULL,
  `rent_free_retail_1` decimal(15,2) DEFAULT NULL,
  `rent_free_retail_2` decimal(15,2) DEFAULT NULL,
  `rent_free_retail_3` decimal(15,2) DEFAULT NULL,
  `rent_free_nonretail_1` decimal(15,2) DEFAULT NULL,
  `rent_free_nonretail_2` decimal(15,2) DEFAULT NULL,
  `rent_free_nonretail_3` decimal(15,2) DEFAULT NULL,
  `rent_increase_1` decimal(15,2) DEFAULT NULL,
  `rent_increase_2` decimal(15,2) DEFAULT NULL,
  `promotion_budget` decimal(15,2) DEFAULT NULL,
  `maintenance_fee` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_mall_traffic`;

CREATE TABLE `t_ol_mall_traffic` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `type_eng` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `text_eng` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_mapping`;

CREATE TABLE `t_ol_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `code` varchar(40) DEFAULT NULL,
  `system_id` varchar(40) DEFAULT NULL,
  `system` varchar(20) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_merchant`;

CREATE TABLE `t_ol_merchant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `name` varchar(200) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `capital` varchar(40) DEFAULT NULL,
  `shareholder` varchar(200) DEFAULT NULL,
  `uscc` varchar(200) DEFAULT NULL,
  `auth_state` tinyint(4) DEFAULT NULL,
  `business_scope` varchar(200) DEFAULT NULL,
  `tianyancha_id` bigint(20) DEFAULT NULL,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `hd_state` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_address`;

CREATE TABLE `t_ol_merchant_address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `street_address` varchar(200) DEFAULT NULL,
  `mailing_address` varchar(200) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_bank_account`;

CREATE TABLE `t_ol_merchant_bank_account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `bank_account` varchar(200) DEFAULT NULL,
  `bank_account_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_brand`;

CREATE TABLE `t_ol_merchant_brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `brand_code` varchar(40) DEFAULT NULL,
  `merchant_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `creator` tinyint(4) DEFAULT '0',
  `brand_author` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_business_license`;

CREATE TABLE `t_ol_merchant_business_license` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `business_license` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_court_announcement`;

CREATE TABLE `t_ol_merchant_court_announcement` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `announce_id` varchar(255) DEFAULT NULL,
  `bltnno` varchar(40) DEFAULT NULL,
  `bltnstate` varchar(40) DEFAULT NULL,
  `bltntype` varchar(40) DEFAULT NULL,
  `bltntypename` varchar(250) DEFAULT NULL,
  `caseno` varchar(250) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `courtcode` varchar(40) DEFAULT NULL,
  `dealgrade` varchar(40) DEFAULT NULL,
  `dealgradename` varchar(40) DEFAULT NULL,
  `judge` varchar(40) DEFAULT NULL,
  `judgephone` varchar(40) DEFAULT NULL,
  `mobilephone` varchar(255) DEFAULT NULL,
  `party1` varchar(40) DEFAULT NULL,
  `party2` varchar(40) DEFAULT NULL,
  `province` varchar(40) DEFAULT NULL,
  `publishdate` varchar(40) DEFAULT NULL,
  `publishpage` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_illegal_info`;

CREATE TABLE `t_ol_merchant_illegal_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `put_reason` varchar(255) DEFAULT NULL,
  `put_date` datetime DEFAULT NULL,
  `put_department` varchar(255) DEFAULT NULL,
  `remove_reason` varchar(255) DEFAULT NULL,
  `remove_department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_lawsuit`;

CREATE TABLE `t_ol_merchant_lawsuit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `title` varchar(250) DEFAULT NULL,
  `submittime` datetime DEFAULT NULL,
  `court` varchar(40) DEFAULT NULL,
  `doctype` varchar(40) DEFAULT NULL,
  `url` text,
  `caseno` varchar(250) DEFAULT NULL,
  `casetype` varchar(40) DEFAULT NULL,
  `uuid` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_own_tax`;

CREATE TABLE `t_ol_merchant_own_tax` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `person_id_number` varchar(40) DEFAULT NULL,
  `legalperson_name` varchar(40) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `new_own_tax_balance` varchar(40) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `own_tax_balance` varchar(40) DEFAULT NULL,
  `tax_id_number` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `tax_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_merchant_punishment_info`;

CREATE TABLE `t_ol_merchant_punishment_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `content` varchar(255) DEFAULT NULL,
  `punish_number` varchar(255) DEFAULT NULL,
  `reg_num` varchar(200) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `base` varchar(40) DEFAULT NULL,
  `decision_date` varchar(40) DEFAULT NULL,
  `legal_person_name` varchar(40) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_modality`;

CREATE TABLE `t_ol_modality` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `lv` varchar(10) DEFAULT NULL,
  `hd_uuid` varchar(40) DEFAULT NULL,
  `jde_modality_id` varchar(10) DEFAULT NULL,
  `hd_levelid` varchar(40) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_my_favourite`;

CREATE TABLE `t_ol_my_favourite` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_code` varchar(40) DEFAULT NULL,
  `shop_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_reservation`;

CREATE TABLE `t_ol_reservation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `code` varchar(40) DEFAULT NULL,
  `user_code` varchar(40) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `merchant_code` varchar(40) DEFAULT NULL,
  `merchant_name` varchar(100) DEFAULT NULL,
  `brand_code` varchar(40) DEFAULT NULL,
  `brand_name` varchar(100) DEFAULT NULL,
  `brand_modality` varchar(40) DEFAULT NULL,
  `reserve_time` datetime NOT NULL,
  `rental_length` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_reservation_shop`;

CREATE TABLE `t_ol_reservation_shop` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `reservation_code` varchar(40) DEFAULT NULL,
  `shop_code` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_search_shop_detail`;

CREATE TABLE `t_ol_search_shop_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `user_code` varchar(40) DEFAULT NULL,
  `brand_code` varchar(40) DEFAULT NULL,
  `brand_name` varchar(100) DEFAULT NULL,
  `brand_modality` varchar(40) DEFAULT NULL,
  `min_area` int(10) DEFAULT NULL,
  `max_area` int(10) DEFAULT NULL,
  `rental_length` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `mall_codes` text,
  `sub_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_shop`;

CREATE TABLE `t_ol_shop` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `brand_code` varchar(40) DEFAULT NULL,
  `mall_code` varchar(40) DEFAULT NULL,
  `building_code` varchar(40) DEFAULT NULL,
  `floor_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `unit` varchar(50) NOT NULL,
  `area` decimal(15,2) DEFAULT NULL,
  `modality` varchar(50) DEFAULT NULL,
  `shop_state` tinyint(4) NOT NULL DEFAULT '1',
  `contract_expire_date` datetime DEFAULT NULL,
  `dead_rent` decimal(15,2) DEFAULT NULL,
  `floating_rental_rate` decimal(15,2) DEFAULT NULL,
  `shop_name` varchar(200) DEFAULT NULL,
  `vr` text,
  `vr_validated` tinyint(4) NOT NULL DEFAULT '1',
  `hd_uuid` varchar(40) DEFAULT NULL,
  `hd_code` varchar(40) DEFAULT NULL,
  `hd_state` varchar(30) DEFAULT NULL,
  `sub_type` varchar(50) DEFAULT NULL,
  `is_sync` tinyint(4) NOT NULL DEFAULT '1',
  `sign_up_date` datetime DEFAULT NULL,
  `hoarding_date` datetime DEFAULT NULL,
  `entering_date` datetime DEFAULT NULL,
  `opening_date` datetime DEFAULT NULL,
  `days_before_contract_expire` smallint(11) DEFAULT NULL,
  `brand_to_sign` varchar(200) DEFAULT NULL,
  `responsible_person` varchar(200) DEFAULT NULL,
  `leasing_status` varchar(200) DEFAULT NULL,
  `remark_1` varchar(200) DEFAULT NULL,
  `remark_2` varchar(200) DEFAULT NULL,
  `remark_3` varchar(200) DEFAULT NULL,
  `remark_4` varchar(200) DEFAULT NULL,
  `remark_5` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_shop_coords`;

CREATE TABLE `t_ol_shop_coords` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `building_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `coords` text,
  `property_number` varchar(50) DEFAULT NULL,
  `unit` varchar(50) DEFAULT '',
  `shop_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_shop_engineering_images`;

CREATE TABLE `t_ol_shop_engineering_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `attachment_type` varchar(30) DEFAULT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_shop_engineering_specifications`;

CREATE TABLE `t_ol_shop_engineering_specifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `keyword` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `title` varchar(40) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `spec` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_shop_images`;

CREATE TABLE `t_ol_shop_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `image` text NOT NULL,
  `position` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_sys_message`;

CREATE TABLE `t_ol_sys_message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL,
  `user_code` varchar(40) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `read_time` datetime DEFAULT NULL,
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

DROP TABLE IF EXISTS `t_ol_temp_param`;

CREATE TABLE `t_ol_temp_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `param` varchar(40) DEFAULT NULL,
  `key` tinyint(4) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_user`;

CREATE TABLE `t_ol_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `merchant_code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `lang` tinyint(4) DEFAULT '1',
  `type` tinyint(4) NOT NULL DEFAULT '2',
  `reg_state` tinyint(4) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `email_verified` tinyint(4) DEFAULT '0',
  `mobile_verified` tinyint(4) DEFAULT '0',
  `international` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE,
  UNIQUE KEY `mobile` (`mobile`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_user_contacts`;

CREATE TABLE `t_ol_user_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `name` varchar(50) DEFAULT NULL,
  `id_card` varchar(20) DEFAULT NULL,
  `id_card_type` tinyint(2) DEFAULT '0',
  `id_card_verified` tinyint(4) DEFAULT '0',
  `id_card_front` text,
  `id_card_back` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_user_merchant`;

CREATE TABLE `t_ol_user_merchant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `user_code` varchar(40) DEFAULT NULL,
  `merchant_code` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_ol_user_simple`;

CREATE TABLE `t_ol_user_simple` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `merchant_name` varchar(100) DEFAULT NULL,
  `brand_name` varchar(100) DEFAULT NULL,
  `modality` varchar(40) DEFAULT NULL,
  `website` text,
  `file` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;