"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconnectIntervalInMilli = exports.outDataSizeSegmentMaxLimit = exports.outDataSizeMaxLimit = exports.queryStringKey = exports.progLang = exports.deviceConnectionStatus = exports.queryStringSrvNameKey = exports.queryStringWsAddrKey = exports.queryStringTokenKey = exports.serviceTokenFile = exports.serviceDefFile = exports.serviceBasePath = exports.wsServiceConnectDef = exports.wsConnectUrlDef = exports.serviceConnectDefBase = exports.serviceTokenDef = exports.wsServiceReceiveDataMsg = exports.DataType = exports.paramsBase = exports.serviceType = exports.wsServiceSendDataMsg = exports.wsMessageBase = exports.wsMsgType = exports.wsStatusMsg = exports.wsConnectionStatusEvent = void 0;
var wsConnectionStatusEvent;
(function (wsConnectionStatusEvent) {
    wsConnectionStatusEvent["Connected"] = "Connected";
    wsConnectionStatusEvent["DisConnected"] = "DisConnected";
    wsConnectionStatusEvent["Error"] = "Error";
    wsConnectionStatusEvent["NotSet"] = "NotSet";
    wsConnectionStatusEvent["sendingDataWhileDisconnected"] = "sendingDataWhileDisconnected";
    wsConnectionStatusEvent["Reconnecting"] = "Reconnecting";
})(wsConnectionStatusEvent || (exports.wsConnectionStatusEvent = wsConnectionStatusEvent = {}));
class wsStatusMsg {
    constructor() {
        this.type = wsConnectionStatusEvent.NotSet;
        this.data = {};
    }
}
exports.wsStatusMsg = wsStatusMsg;
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
        this.msgType = wsMsgType.NotSet;
        this.data = undefined;
        this.servType = serviceType.external;
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
        this.servType = serviceType.external;
    }
}
exports.wsServiceSendDataMsg = wsServiceSendDataMsg;
var serviceType;
(function (serviceType) {
    serviceType["system"] = "system";
    serviceType["external"] = "external";
    serviceType["dash"] = "dash";
    serviceType["mobile"] = "mobile";
})(serviceType || (exports.serviceType = serviceType = {}));
class paramsBase {
    constructor() {
        this.key = '';
        this.value = '';
        this.dataType = DataType.NotSet;
        this.range = '';
    }
}
exports.paramsBase = paramsBase;
var DataType;
(function (DataType) {
    DataType["String"] = "string";
    DataType["Int"] = "int";
    DataType["Float"] = "float";
    DataType["Bool"] = "bool";
    DataType["Array"] = "array";
    DataType["Json"] = "json";
    DataType["Any"] = "any";
    DataType["NotSet"] = "NotSet";
})(DataType || (exports.DataType = DataType = {}));
class wsServiceReceiveDataMsg {
    constructor() {
        this.GuID = '';
        this.servID = '';
        this.instID = '';
        this.name = '';
        this.dispName = '';
        this.servType = serviceType.system;
        this.id = Math.round(Math.random() * 1E9);
        this.msgTime = Date.now();
        this.data = undefined;
        this.dataType = [];
    }
}
exports.wsServiceReceiveDataMsg = wsServiceReceiveDataMsg;
class serviceTokenDef {
    constructor() {
        this.sessionID = '';
        this.secrete = '';
        this.wsAddr = '';
        this.isPro = false;
        this.rateLimit = 2;
        this.isDash = false;
        this.startTime = '';
        this.desc = '';
        this.name = '';
    }
}
exports.serviceTokenDef = serviceTokenDef;
class serviceConnectDefBase {
    constructor() {
        this.GuID = '';
        this.servID = '';
        this.instID = '';
        this.name = '';
        this.dispName = '';
        this.servType = serviceType.external;
    }
}
exports.serviceConnectDefBase = serviceConnectDefBase;
class wsConnectUrlDef {
    constructor() {
        this.servDef = undefined;
        this.token = undefined;
    }
}
exports.wsConnectUrlDef = wsConnectUrlDef;
class wsServiceConnectDef extends wsConnectUrlDef {
    constructor() {
        super(...arguments);
        this.wsAddr = undefined;
    }
}
exports.wsServiceConnectDef = wsServiceConnectDef;
exports.serviceBasePath = 'resc/playground/services';
exports.serviceDefFile = "serviceDef.json";
exports.serviceTokenFile = "serviceToken.json";
exports.queryStringTokenKey = 'token';
exports.queryStringWsAddrKey = 'wsAddr';
exports.queryStringSrvNameKey = 'name';
(function (DataType) {
    DataType["int"] = "int";
    DataType["string"] = "string";
    DataType["intArr"] = "intArr";
    DataType["stringArr"] = "stringArr";
    DataType["object"] = "object";
    DataType["notSet"] = "notSet";
})(DataType || (exports.DataType = DataType = {}));
var deviceConnectionStatus;
(function (deviceConnectionStatus) {
    deviceConnectionStatus["Active"] = "Active";
    deviceConnectionStatus["Inactive"] = "Inactive";
    deviceConnectionStatus["NotSet"] = "NotSet";
})(deviceConnectionStatus || (exports.deviceConnectionStatus = deviceConnectionStatus = {}));
var progLang;
(function (progLang) {
    progLang["Python"] = "Python";
    progLang["NodeJS"] = "NodeJS";
    progLang["JavaScript"] = "JavaScript";
    progLang["TypeScript"] = "TypeScript";
    progLang["CPP"] = "CPP";
    progLang["Kotlin"] = "Kotlin";
    progLang["Java"] = "Java";
    progLang["NotSet"] = "NotSet";
})(progLang || (exports.progLang = progLang = {}));
exports.queryStringKey = 'token';
exports.outDataSizeMaxLimit = 3000;
exports.outDataSizeSegmentMaxLimit = 500;
exports.reconnectIntervalInMilli = 6000000;
