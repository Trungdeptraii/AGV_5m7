const AGV = require(`${__dirname}/../agv/agv`);
class Controller {
  static home(req, res) {
    res.render("overview");
  }
  static dasbroad(req, res) {
    res.render("dasbroad");
  }
  static status(req, res) {
    res.status(200).json({
      status: "succee",
      connect: `${JSON.stringify(AGV.checkConnect)}`,
      data: `${JSON.stringify(AGV.data)}`,
    });
  }
}

module.exports = Controller;
