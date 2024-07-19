const jsonserver=require("json-server");
const server=jsonserver.create();
const router=jsonserver.router("./data/user-preferences.json");
const middlewares=jsonserver.defaults();
const port=process.env.PORT || 3000;
server.use(middlewares);
server.use(router);
server.listen(port);