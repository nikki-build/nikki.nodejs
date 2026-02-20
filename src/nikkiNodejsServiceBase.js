"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nikkiServiceBase = void 0;
var serviceDef_1 = require("./serviceDef");
var nikkiDef_1 = require("./nikkiDef");
var nodeJsWebSocketImpl_1 = require("./nodeJsWebSocketImpl");
var path = require("path");
var fs = require("fs");
var nikkiServiceBase = /** @class */ (function () {
    function nikkiServiceBase() {
        this.servDef = undefined;
        this.devKeys = undefined;
        this.connectAddr = undefined;
        this.ws = new nodeJsWebSocketImpl_1.wsHandlerImpl;
        this.lastMsgTime = 0;
        this.wsStatusSubscription = undefined;
        this.wsDataSubscription = undefined;
        this.isSleepingFlag = false;
        this.devServiceType = nikkiDef_1.serviceType.external;
        this.wsConnectionStatus = nikkiDef_1.deviceConnectionStatus.Inactive;
        this.wsDataSubscription = this.ws.getWsDataSubject().subscribe({ next: this.onWsDataMsg.bind(this) });
        this.wsStatusSubscription = this.ws.getWsStatusSubject().subscribe({ next: this.onWsStatusMsg.bind(this) });
    }
    nikkiServiceBase.prototype.onWsStatusMsg = function (data) {
        try {
            if (data) {
                if (data.type == nikkiDef_1.wsConnectionStatusEvent.Connected) {
                    // this.registerDev()
                    this.onConnect();
                }
                if (data.type == nikkiDef_1.wsConnectionStatusEvent.DisConnected) {
                    this.onDisconnect();
                }
                if (data.type == nikkiDef_1.wsConnectionStatusEvent.Error) {
                    this.onError(data.data);
                }
                if (data.type == nikkiDef_1.wsConnectionStatusEvent.sendingDataWhileDisconnected) {
                    console.error("websocket is not connected.!!!");
                }
                if (data.type == nikkiDef_1.wsConnectionStatusEvent.Reconnecting) {
                    console.info("trying to reconnect to server...");
                }
            }
        }
        catch (e) {
            console.error('exception while,  onWsStatusMsg', e.message);
        }
    };
    nikkiServiceBase.prototype.onWsDataMsg = function (data) {
        try {
            if (data && data.data) {
                console.info("received ws client ", data);
                this.recentData = data;
                this.wsConnectionStatus = nikkiDef_1.deviceConnectionStatus.Active;
                this.onData(data.data);
            }
            else {
                console.error("received invalid data", data);
            }
        }
        catch (e) {
            console.error('exception while, onWsDataMsg ', e.message);
        }
    };
    nikkiServiceBase.prototype.getRecentMsg = function () {
        return this.recentData;
    };
    nikkiServiceBase.prototype.getConnectAddress = function (serv, token) {
        var fullURL = undefined;
        try {
            var def = new nikkiDef_1.wsConnectUrlDef();
            def.token = token;
            def.servDef = serv;
            var strData = JSON.stringify(def);
            var enComp = encodeURIComponent(strData);
            fullURL = "".concat(token.wsAddr, "?").concat(nikkiDef_1.queryStringKey, "=").concat(enComp);
        }
        catch (e) {
            console.error('Exception while getWsConnectUrl:', e.message);
        }
        return fullURL;
    };
    nikkiServiceBase.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, bPath, tokenPath, servDefPath, tokenData, devDefData;
            return __generator(this, function (_a) {
                console.info("starting service.");
                status = false;
                try {
                    bPath = process.cwd();
                    tokenPath = path.join(bPath, nikkiDef_1.serviceTokenFile);
                    servDefPath = path.join(bPath, nikkiDef_1.serviceDefFile);
                    console.info('token path ', tokenPath, bPath);
                    if (fs.existsSync(tokenPath) && fs.existsSync(servDefPath)) {
                        tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
                        devDefData = JSON.parse(fs.readFileSync(servDefPath, 'utf8'));
                        if (devDefData && tokenData) {
                            this.devKeys = tokenData;
                            this.servDef = devDefData;
                            this.connectAddr = this.getConnectAddress(this.servDef, this.devKeys);
                            console.info("starting service ", this.servDef.dispName, this.connectAddr);
                            status = true;
                        }
                        else {
                            console.error("invalid service files.. Failed to parse");
                        }
                    }
                    else {
                        console.error("device service files not found in the root directory. please check !");
                    }
                }
                catch (e) {
                    console.error('exception while, init  ', e.message);
                }
                return [2 /*return*/, status];
            });
        });
    };
    nikkiServiceBase.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var optStatus, status_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optStatus = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!((this.servDef == undefined) || (this.devKeys == undefined))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.init()];
                    case 2:
                        status_1 = _a.sent();
                        if (status_1 == false) {
                            optStatus = false;
                            console.error("can not start without proper service files.");
                            return [2 /*return*/, optStatus];
                        }
                        _a.label = 3;
                    case 3:
                        if (this.servDef && this.devKeys && this.connectAddr && (this.connectAddr.length > 0)) {
                            if (this.ws == undefined) {
                                this.ws = new nodeJsWebSocketImpl_1.wsHandlerImpl();
                            }
                            this.ws.connect(this.connectAddr);
                            optStatus = true;
                        }
                        else {
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('exception while, start() ', e_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, optStatus];
                }
            });
        });
    };
    nikkiServiceBase.prototype.stop = function () {
        try {
            if (this.ws) {
                this.ws.disconnnect();
            }
            if (this.servDef && this.servDef.dispName) {
                console.info("service " + this.servDef.dispName + " stopped. ");
            }
        }
        catch (e) {
            console.error('exception while, disconnect ', e.message);
        }
    };
    nikkiServiceBase.prototype.getNodedata = function (data) {
        if (data === void 0) { data = {}; }
        var nData = undefined;
        var dtStr = '';
        try {
            if (data) {
                try {
                    dtStr = JSON.stringify(data);
                }
                catch (e) {
                    console.error('Exception while getNodedata:', e.message);
                }
                if (dtStr.length > nikkiDef_1.outDataSizeSegmentMaxLimit) {
                    console.error("Input data size is ".concat(dtStr.length, ", sending data limit exceeded, it should be less than ").concat(nikkiDef_1.outDataSizeSegmentMaxLimit));
                    return undefined;
                }
            }
            else {
                console.error('Invalid input: send some valid data');
                return undefined;
            }
            if (this.servDef && this.devKeys && data) {
                nData = new serviceDef_1.wsServiceSendDataMsg();
                nData.GuID = this.servDef.GuID;
                nData.dispName = this.servDef.dispName;
                nData.servID = this.servDef.servID;
                nData.name = this.servDef.name;
                nData.instID = this.servDef.instID;
                nData.secrete = this.devKeys.secrete;
                nData.sessionID = this.devKeys.sessionID;
                nData.data = data;
                nData.servType = nikkiDef_1.serviceType.external;
                nData.dataType = this.servDef.outputs.parms;
            }
        }
        catch (e) {
            console.error('exception while, getNodedata  ', e.message);
        }
        return nData;
    };
    nikkiServiceBase.prototype.sendData = function (message) {
        var status = false;
        try {
            if (!message) {
                console.error('Trying to send invalid data.');
                return false;
            }
            if (this.ws && this.devKeys && this.ws.getConnectionStatus() && this.servDef) {
                var timeDiff = Date.now() - this.lastMsgTime;
                if (timeDiff > (this.devKeys.rateLimit * 1000)) {
                    var srvData = this.getNodedata(message);
                    if (srvData) {
                        var strMsg = JSON.stringify(srvData);
                        if (nikkiDef_1.outDataSizeMaxLimit > strMsg.length) {
                            this.ws.sendMessage(strMsg);
                            this.lastMsgTime = Date.now();
                            status = true;
                        }
                        else {
                            console.error("Exceeded outgoing data size, it should be less than ".concat(nikkiDef_1.outDataSizeMaxLimit, " bytes"));
                        }
                    }
                }
                else {
                    console.error("Exceeding sending rate limits: allowed ".concat(this.devKeys.rateLimit, " msgs / second"));
                }
            }
            else {
                console.error('WebSocket is not connected.');
            }
        }
        catch (e) {
            console.error('Exception while sendMessage:', e.message);
        }
        return status;
    };
    nikkiServiceBase.prototype.isConnected = function () {
        this.ws.getConnectionStatus();
    };
    nikkiServiceBase.prototype.onConnect = function () {
        // Connection established
        console.info("connect ");
    };
    nikkiServiceBase.prototype.onDisconnect = function () {
        // Connection closed
        console.info("dis connect ");
    };
    nikkiServiceBase.prototype.onError = function (error) {
        // Handle errors
        console.info("error ", error);
    };
    nikkiServiceBase.prototype.onData = function (data) {
        // Handle incoming data
        console.info("received data ", data);
    };
    return nikkiServiceBase;
}());
exports.nikkiServiceBase = nikkiServiceBase;
