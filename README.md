## ibds2.0-web

### 开发环境

- [Laravel Homestead](https://github.com/laravel/homestead) v13.2.1
- nodejs v14.19.0
- yarn 1.22.17

*(推荐使用 nvm 来管理 nodejs/yarn 版本)*

开发环境 nginx 配置示例 `ibds.inspur.test.conf`

```nginx
server {
    listen 80;
    server_name ibds.inspur.test;

    index index.html;
    charset utf-8;

    location /api {
        # http://ibds.inspur.test/api 转发（避免跨域）
        proxy_pass http://10.221.19.216:8081/ibds/api;
    }
    location / {
        # 5173 是 vite 的默认端口
        proxy_pass http://127.0.0.1:5173;
    }
}
```