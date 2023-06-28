<a name="M8ixB"></a>
## 使用代理服务器解决跨域问题的详细步骤：

1. 在根目录下创建一个名为 `proxy.conf.json` 的文件，并在其中添加代理配置。例如，如果要将所有 `/api` 路径的请求代理到 `http://localhost:3000`，可以将以下内容添加到 `proxy.conf.json` 文件中：
```shell
{
  "/api": {
    "target": "http://10.1.4.146:8899",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true
  }
}
```

这里的 `/api` 是要代理的路径，`target` 是要代理到的目标服务器的地址，`secure` 用于指定是否使用 HTTPS 连接。可以根据自己的需求进行调整。

2. 打开 `angular.json` 文件，在 `architect` > `serve` > `options` 中添加一个 `proxyConfig` 属性，并指定 `proxy.conf.json` 文件的路径：
```shell
"architect": {
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      // 其他选项...
      "proxyConfig": "proxy.conf.json"
    }
  }
}
```
这样，当运行开发服务器时，Angular CLI 将会读取 `proxy.conf.json` 文件并相应地进行代理配置。

3. 使用命令行工具（如终端或命令提示符）进入项目根目录，并运行以下命令来启动开发服务器：
```shell
ng serve
```

注意，由于我们配置的代理是针对开发服务器的，所以只有在开发模式下才会生效。在生产环境中运行应用时，代理配置将被忽略。

现在，当你的应用程序中发出带有 `/api` 前缀的请求时，它们将被代理到 `http://localhost:3000`，而不会遇到跨域问题。

在生产环境中，由于 Angular 应用程序和服务器处于同一个域名下，所以不会涉及跨域问题。代理服务器主要用于开发阶段，在处理跨域请求时提供便捷的方式。

