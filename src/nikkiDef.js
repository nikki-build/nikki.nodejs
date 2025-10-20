"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceTokenBaseFile = exports.serviceDefBaseFile = exports.serviceTokenFile = exports.serviceDefFile = exports.reconnectIntervalInMilli = exports.outDataSizeSegmentMaxLimit = exports.outDataSizeMaxLimit = exports.queryStringKey = exports.DeviceTypes = exports.progLang = exports.wsServiceReceiveDataMsg = exports.deviceConnectionStatus = exports.DataType = exports.actionPoints = exports.wsDeviceKeys = exports.wsDeviceSleepDef = exports.wsConnectUrlDef = exports.serviceConnectDefBase = exports.serviceTokenDef = exports.wsMessageBase = exports.serviceType = exports.wsMsgType = exports.wsStatusMsg = exports.wsConnectionStatusEvent = void 0;
var wsConnectionStatusEvent;
(function (wsConnectionStatusEvent) {
    wsConnectionStatusEvent["Connected"] = "Connected";
    wsConnectionStatusEvent["DisConnected"] = "DisConnected";
    wsConnectionStatusEvent["Error"] = "Error";
    wsConnectionStatusEvent["NotSet"] = "NotSet";
    wsConnectionStatusEvent["sendingDataWhileDisconnected"] = "sendingDataWhileDisconnected";
    wsConnectionStatusEvent["Reconnecting"] = "Reconnecting";
})(wsConnectionStatusEvent || (exports.wsConnectionStatusEvent = wsConnectionStatusEvent = {}));
var wsStatusMsg = /** @class */ (function () {
    function wsStatusMsg() {
        this.type = wsConnectionStatusEvent.NotSet;
        this.data = {};
    }
    return wsStatusMsg;
}());
exports.wsStatusMsg = wsStatusMsg;
var wsMsgType;
(function (wsMsgType) {
    wsMsgType["DashboardStatus"] = "DashboardStatus";
    wsMsgType["ServiceData"] = "ServiceData";
    wsMsgType["OperationStatus"] = "OperationStatus";
    wsMsgType["Connection"] = "Connection";
    wsMsgType["NotSet"] = "NotSet";
})(wsMsgType || (exports.wsMsgType = wsMsgType = {}));
var serviceType;
(function (serviceType) {
    serviceType["system"] = "system";
    serviceType["external"] = "external";
    serviceType["dash"] = "dash";
    serviceType["mobile"] = "mobile";
})(serviceType || (exports.serviceType = serviceType = {}));
var wsMessageBase = /** @class */ (function () {
    function wsMessageBase() {
        this.action = "sendMessage";
        this.token = '';
        this.eps = actionPoints.NotSet;
        this.mesgTime = Date.now();
        this.id = Math.round(Math.random() * 1E9);
        this.msgType = wsMsgType.NotSet;
        this.data = undefined;
        this.servicetype = serviceType.system;
    }
    return wsMessageBase;
}());
exports.wsMessageBase = wsMessageBase;
var serviceTokenDef = /** @class */ (function () {
    function serviceTokenDef() {
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
    return serviceTokenDef;
}());
exports.serviceTokenDef = serviceTokenDef;
var serviceConnectDefBase = /** @class */ (function () {
    function serviceConnectDefBase() {
        this.GuID = '';
        this.servID = '';
        this.instID = '';
        this.name = '';
        this.dispName = '';
    }
    return serviceConnectDefBase;
}());
exports.serviceConnectDefBase = serviceConnectDefBase;
var wsConnectUrlDef = /** @class */ (function () {
    function wsConnectUrlDef() {
        this.servDef = undefined;
        this.token = undefined;
    }
    return wsConnectUrlDef;
}());
exports.wsConnectUrlDef = wsConnectUrlDef;
var wsDeviceSleepDef = /** @class */ (function () {
    function wsDeviceSleepDef() {
        this.devID = "";
        this.duration = 5; // minutes
        this.startTime = Date.now();
        this.devName = '';
        this.devDispName = '';
    }
    return wsDeviceSleepDef;
}());
exports.wsDeviceSleepDef = wsDeviceSleepDef;
var wsDeviceKeys = /** @class */ (function () {
    function wsDeviceKeys() {
        this.token = '';
        this.wsAddr = "";
        this.isPro = false;
        this.rateLimit = 2;
    }
    return wsDeviceKeys;
}());
exports.wsDeviceKeys = wsDeviceKeys;
var actionPoints;
(function (actionPoints) {
    actionPoints["AddDash"] = "AddDash";
    actionPoints["RemoveDash"] = "RemoveDash";
    actionPoints["sendMessage"] = "sendMessage";
    actionPoints["GoSleep"] = "GoSleep";
    actionPoints["AddDevice"] = "AddDevice";
    actionPoints["RemoveDevice"] = "RemoveDevice";
    actionPoints["NotSet"] = "NotSet";
})(actionPoints || (exports.actionPoints = actionPoints = {}));
var DataType;
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
var wsServiceReceiveDataMsg = /** @class */ (function () {
    function wsServiceReceiveDataMsg() {
        this.sender = {
            GuID: '',
            servID: '',
            instID: '',
            name: '',
            dispName: ''
        };
        this.time = Date.now();
        this.data = undefined;
    }
    return wsServiceReceiveDataMsg;
}());
exports.wsServiceReceiveDataMsg = wsServiceReceiveDataMsg;
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
var DeviceTypes;
(function (DeviceTypes) {
    DeviceTypes["Laptop"] = "Laptop";
    DeviceTypes["Browser"] = "Browser";
    DeviceTypes["Mobile"] = "Mobile";
    DeviceTypes["Microcontroller"] = "Microcontroller";
    DeviceTypes["NotSet"] = "NotSet";
})(DeviceTypes || (exports.DeviceTypes = DeviceTypes = {}));
exports.queryStringKey = 'token';
exports.outDataSizeMaxLimit = 3000;
exports.outDataSizeSegmentMaxLimit = 500;
exports.reconnectIntervalInMilli = 6000;
exports.serviceDefFile = "serviceDef.json";
exports.serviceTokenFile = "serviceToken.json";
exports.serviceDefBaseFile = "serviceDef";
exports.serviceTokenBaseFile = "serviceToken";
