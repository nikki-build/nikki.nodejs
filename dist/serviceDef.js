"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceBase = exports.wsServiceSendDataMsg = exports.wsMessageBase = exports.wsMsgType = exports.wsServiceDataBase = exports.ioBase = exports.paramsBase = void 0;
const nikkiDef_1 = require("./nikkiDef");
class paramsBase {
    constructor() {
        this.key = '';
        this.value = '';
        this.dataType = nikkiDef_1.DataType.notSet;
        this.range = '';
    }
}
exports.paramsBase = paramsBase;
class ioBase {
    constructor() {
        this.name = '';
        this.desc = "";
        this.parms = [];
    }
}
exports.ioBase = ioBase;
class wsServiceDataBase {
    constructor() {
        this.name = '';
        this.dispName = '';
        this.servID = "";
        this.instID = Math.round(Math.random() * 1E9).toString();
        this.devID = "";
        this.data = {};
    }
}
exports.wsServiceDataBase = wsServiceDataBase;
var wsMsgType;
(function (wsMsgType) {
    wsMsgType["DashboardStatus"] = "DashboardStatus";
    wsMsgType["ServiceData"] = "ServiceData";
    wsMsgType["ServiceCommand"] = "ServiceCommand";
    wsMsgType["NotSet"] = "NotSet";
})(wsMsgType || (exports.wsMsgType = wsMsgType = {}));
class wsMessageBase {
    constructor() {
        this.action = 'sendMessage';
        this.msgTime = Date.now();
        this.id = Math.round(Math.random() * 1E9);
        this.msgType = wsMsgType.ServiceData;
        this.data = undefined;
        this.dataType = [];
        this.servType = nikkiDef_1.serviceType.external;
    }
}
exports.wsMessageBase = wsMessageBase;
class wsServiceSendDataMsg extends wsMessageBase {
    constructor() {
        super();
        this.GuID = '';
        this.sessionID = '';
        this.secrete = '';
        this.servID = '';
        this.instID = '';
        this.name = '';
        this.dispName = '';
        this.msgType = wsMsgType.ServiceData;
        this.servType = nikkiDef_1.serviceType.external;
    }
}
exports.wsServiceSendDataMsg = wsServiceSendDataMsg;
class serviceBase {
    constructor() {
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
}
exports.serviceBase = serviceBase;
