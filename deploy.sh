#!/bin/bash

project_name="ibds-web"

server="10.221.19.216"
password="bsjxcpb!QKL216"

# server="10.221.19.217"
# password="bsjxcpb!Test217"

# 在本地打包
yarn prod

zip -r "${project_name}.zip" dist/

sshpass -p "${password}" scp -P 22022 "${project_name}.zip" root@"${server}":/data/www/ 

sshpass -p "${password}" ssh -o StrictHostKeyChecking=no root@"${server}" -p 22022 "
	cd /data/www/
	ls -hl
	rm -rf ${project_name}-old
	mv ${project_name} ${project_name}-old
	unzip -o ${project_name}.zip
	mv dist ${project_name}
	ls -hl
"