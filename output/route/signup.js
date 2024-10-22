"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/signup", function (req, res) {
    res.send("signup page");
});
exports.default = router;
