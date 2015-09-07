var hook_server = require("github-webhook");
var server = hook_server({
  "port": 9080,
  "path": "/deploy",
  "secret": "deco1800Deploy",
  "log": "/var/log/webhook.log",
  "rules": [{
    "event": "push",
    "match": "ref == \"refs/heads/master\" && repository.name == \"DECO1800\"",
    "exec": "npm run deploy"
  }]
});

server.listen();
