"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var index_1 = __importDefault(require("./route/index"));
var signup_1 = __importDefault(require("./route/signup"));
var port = 3000;
app_1.default.use("/", index_1.default);
app_1.default.use("/signup", signup_1.default);
app_1.default.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
