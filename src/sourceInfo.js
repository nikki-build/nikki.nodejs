"use strict";
exports.__esModule = true;
exports.sourceInfo = exports.serviceStartType = exports.progLang = void 0;
var nanoid_1 = require("nanoid");
var redData_1 = require("./redData");
var progLang;
(function (progLang) {
    progLang["NODEJS"] = "NODEJS";
    progLang["BROWSERJS"] = "BROWSERJS";
    progLang["PYTHON"] = "PYTHON";
    progLang["CPP"] = "CPP";
    progLang["JAVA"] = "JAVA";
    progLang["KOTLIN"] = "KOTLIN";
})(progLang = exports.progLang || (exports.progLang = {}));
var serviceStartType;
(function (serviceStartType) {
    serviceStartType["auto"] = "auto";
    serviceStartType["manual"] = "manual";
})(serviceStartType = exports.serviceStartType || (exports.serviceStartType = {}));
var sourceInfo = /** @class */ (function () {
    function sourceInfo() {
        this.srvID = nanoid_1.nanoid();
        this.instID = nanoid_1.nanoid();
        this.proglang = progLang.BROWSERJS;
        this.iDf = new redData_1.dataBundle;
        this.oDf = new redData_1.dataBundle;
        this.name = "";
        this.dispName = "";
        this.desc = "";
        this.tags = [];
        this.startType = serviceStartType.manual;
        this.iDf.ioType = redData_1.ioParamsType.userDefined;
    }
    sourceInfo.getRedOutputData = function (sessionID, data) {
        var rData = new redData_1.redData(sessionID, data.srvID, data.instID);
        rData.data = data.oDf;
        return rData;
    };
    sourceInfo.getRedInputData = function (sessionID, data) {
        var rData = new redData_1.redData(sessionID, data.srvID, data.instID);
        rData.data = data.iDf;
        return rData;
    };
    sourceInfo.toJsonString = function (src) {
        var str = "";
        try {
            str = JSON.stringify(src);
        }
        catch (e) {
            console.error("failed to parse the string ", e.message);
            str = "";
        }
        return str;
    };
    return sourceInfo;
}());
exports.sourceInfo = sourceInfo;
