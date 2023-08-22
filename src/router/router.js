const express = require("express");
const router = express.Router();
const Controller = require(`${__dirname}/../controller/home.controller`);

router.get("/home", Controller.home);
router.get("/dasbroad", Controller.dasbroad);
router.get("/status", Controller.status);
module.exports = router;
