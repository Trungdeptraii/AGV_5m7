const app = require(`${__dirname}/src/app`);
const AGV = require(`${__dirname}/src/agv/agv`);
const port = process.env.PORT;
const host = process.env.HOST;
const server = app.listen(port, host, () => {
  AGV.start();
  console.log(`Server start port ${port}`);
});
//SIGINT bắt tín hiệu khi thoát server nhấn Ctrl + C, refer: nodejs.org
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit Server Express !!!");
  });
  clearInterval(AGV.timeClear);
  process.exit();
});
