"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceBase = exports.wsServiceSendDataMsg = exports.wsMessageBase = exports.wsMsgType = exports.wsServiceDataBase = exports.ioBase = exports.paramsBase = void 0;
var nikkiDef_1 = require("./nikkiDef");
var paramsBase = /** @class */ (function () {
    function paramsBase() {
        this.key = '';
        this.value = '';
        this.dataType = nikkiDef_1.DataType.notSet;
        this.range = '';
    }
    return paramsBase;
}());
exports.paramsBase = paramsBase;
var ioBase = /** @class */ (function () {
    function ioBase() {
        this.name = '';
        this.desc = "";
        this.parms = [];
    }
    return ioBase;
}());
exports.ioBase = ioBase;
var wsServiceDataBase = /** @class */ (function () {
    function wsServiceDataBase() {
        this.name = '';
        this.dispName = '';
        this.servID = "";
        this.instID = Math.round(Math.random() * 1E9).toString();
        this.devID = "";
        this.data = {};
    }
    return wsServiceDataBase;
}());
exports.wsServiceDataBase = wsServiceDataBase;
var wsMsgType;
(function (wsMsgType) {
    wsMsgType["DashboardStatus"] = "DashboardStatus";
    wsMsgType["ServiceData"] = "ServiceData";
    wsMsgType["ServiceCommand"] = "ServiceCommand";
    wsMsgType["NotSet"] = "NotSet";
})(wsMsgType || (exports.wsMsgType = wsMsgType = {}));
var wsMessageBase = /** @class */ (function () {
    function wsMessageBase() {
        this.action = 'sendMessage';
        this.mesgTime = Date.now();
        this.id = Math.round(Math.random() * 1E9);
        this.msgType = wsMsgType.NotSet;
        this.data = undefined;
        this.time = Date.now();
    }
    return wsMessageBase;
}());
exports.wsMessageBase = wsMessageBase;
var wsServiceSendDataMsg = /** @class */ (function (_super) {
    __extends(wsServiceSendDataMsg, _super);
    function wsServiceSendDataMsg() {
        var _this = _super.call(this) || this;
        _this.GuID = '';
        _this.sessionID = '';
        _this.secrete = '';
        _this.servID = '';
        _this.instID = '';
        _this.name = '';
        _this.dispName = '';
        _this.msgType = wsMsgType.ServiceData;
        return _this;
    }
    return wsServiceSendDataMsg;
}(wsMessageBase));
exports.wsServiceSendDataMsg = wsServiceSendDataMsg;
var serviceBase = /** @class */ (function () {
    function serviceBase() {
        this.lang = nikkiDef_1.progLang.NotSet;
        this.name = "";
        this.dispName = '';
        this.desc = "";
        this.iconUrl = "";
        this.servType = nikkiDef_1.serviceType.system;
        this.servID = Math.round(Math.random() * 1E9).toString();
        this.instID = Math.round(Math.random() * 1E9).toString();
        this.GuID = Math.round(Math.random() * 1E9).toString();
        this.inputs = new ioBase;
        this.outputs = new ioBase;
        this.conStatus = nikkiDef_1.deviceConnectionStatus.NotSet;
        this.conDate = Date.now();
        this.disconDate = Date.now();
        this.conID = '';
        this.msgCount = 0;
        this.mapped = false;
        this.instID = Math.round(Math.random() * 1E9).toString();
    }
    return serviceBase;
}());
exports.serviceBase = serviceBase;
