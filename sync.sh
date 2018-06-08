#!/bin/bash
rsync -vr -essh --exclude=".gitignore" --exclude=".git" --exclude=".DS_Store" --exclude="*.sh" --exclude=".svn" --exclude="nbproject" --exclude="upload" --exclude="MallCode.php" --exclude="protocol.js" --exclude="mall-code.js" . appadmin@10.130.12.45:/var/www/html
