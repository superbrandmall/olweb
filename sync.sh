#!/bin/bash
rsync -vr -essh --exclude=".gitignore" --exclude=".git" --exclude=".DS_Store" --exclude="*.sh" --exclude=".svn" --exclude="nbproject" --exclude="upload" --exclude="MallCode.php" --exclude="protocol.js" --exclude="protocol-admin.js" --exclude="mall-code.js" . appadmin@10.130.9.95:/var/www/html
