"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsHandlerImpl = void 0;
var rxjs_1 = require("rxjs");
var nikkiDef_1 = require("./nikkiDef");
var ws_1 = require("ws");
var wsHandlerImpl = /** @class */ (function () {
    function wsHandlerImpl() {
        this.wsDataMsgSubject = new rxjs_1.Subject();
        this.connectionStatSubject = new rxjs_1.Subject();
        this.wsHandl = undefined;
        this.serverUrl = "";
        this.reconnectInterval = nikkiDef_1.reconnectIntervalInMilli; // 2.5 seconds
        this.shouldReconnect = false;
        this.reconnectTimeout = undefined;
        this.wsHandl = undefined;
        this.shouldReconnect = true;
        this.reconnectTimeout = null;
    }
    wsHandlerImpl.prototype.getConnectionStatus = function () {
        var stat = false;
        try {
            if (this.wsHandl) {
                stat = (this.wsHandl.readyState == ws_1.WebSocket.OPEN);
            }
        }
        catch (e) {
            console.error('exception while, getConnectionStatus ', e.message);
        }
        return stat;
    };
    wsHandlerImpl.prototype.getWsStatusSubject = function () {
        return this.connectionStatSubject;
    };
    wsHandlerImpl.prototype.getWsDataSubject = function () {
        return this.wsDataMsgSubject;
    };
    wsHandlerImpl.prototype.onWsMessage = function (msg) {
        try {
            // console.info("jdata ", msg)
            if (msg && msg.data) {
                var jevent = JSON.parse(msg.data);
                this.wsDataMsgSubject.next(jevent);
            }
        }
        catch (e) {
            console.error('exception while, wsDashHandler onWsMessage  ', e.message);
        }
    };
    wsHandlerImpl.prototype.wsOnConnect = function () {
        try {
            console.info("ws connected. ");
            var wstat = new nikkiDef_1.wsStatusMsg;
            wstat.type = nikkiDef_1.wsConnectionStatusEvent.Connected;
            this.connectionStatSubject.next(wstat);
        }
        catch (e) {
            console.error('exception while, wsOnConnect ', e.message);
        }
    };
    wsHandlerImpl.prototype.wsOnError = function (err) {
        try {
            console.info("ws error. ");
            var wstat = new nikkiDef_1.wsStatusMsg;
            wstat.type = nikkiDef_1.wsConnectionStatusEvent.Error;
            wstat.data = err;
            this.connectionStatSubject.next(wstat);
        }
        catch (e) {
            console.error('exception while, wsOnError ', e.message);
        }
    };
    wsHandlerImpl.prototype.wsOnClose = function () {
        try {
            console.info("ws closed. ");
            var wstat = new nikkiDef_1.wsStatusMsg;
            wstat.type = nikkiDef_1.wsConnectionStatusEvent.DisConnected;
            this.connectionStatSubject.next(wstat);
        }
        catch (e) {
            console.error('exception while, wsOnClose ', e.message);
        }
    };
    wsHandlerImpl.prototype.disconnnect = function () {
        try {
            this.shouldReconnect = false; // Prevent reconnection
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }
            if (this.wsHandl && this.wsHandl.readyState === ws_1.WebSocket.OPEN) {
                // 1000 indicates a normal closure
                this.wsHandl.close(1000, 'Client initiated close');
            }
        }
        catch (e) {
            console.error('exception while, wsDashHandler disconnnect  ', e.message);
        }
    };
    wsHandlerImpl.prototype.connect = function (wsConnectAddr) {
        var _this = this;
        try {
            this.serverUrl = wsConnectAddr;
            if (this.wsHandl && this.wsHandl.readyState === ws_1.WebSocket.OPEN) {
                return;
            }
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }
            this.wsHandl = new ws_1.WebSocket("".concat(this.serverUrl), { rejectUnauthorized: false });
            this.wsHandl.onopen = function () {
                _this.wsOnConnect();
            };
            this.wsHandl.onmessage = function (event) {
                _this.onWsMessage(event);
            };
            this.wsHandl.onclose = function () {
                _this.wsOnClose();
                if (_this.shouldReconnect) {
                    _this.reconnectTimeout = setTimeout(function () {
                        console.info("trying to reconnect.");
                        var wstat = new nikkiDef_1.wsStatusMsg;
                        wstat.type = nikkiDef_1.wsConnectionStatusEvent.Reconnecting;
                        _this.connectionStatSubject.next(wstat);
                        _this.connect(_this.serverUrl);
                    }, _this.reconnectInterval);
                }
            };
            this.wsHandl.onerror = function (error) {
                _this.wsOnError(error);
            };
        }
        catch (e) {
            console.error('exception while, wsDashHandler connect', e.message);
        }
    };
    wsHandlerImpl.prototype.sendMessage = function (msg) {
        try {
            if (this.wsHandl && this.wsHandl.readyState === ws_1.WebSocket.OPEN) {
                this.wsHandl.send(JSON.stringify(msg));
            }
            else {
                console.error('trying to send message!, WebSocket is not connected.');
                var wstat = new nikkiDef_1.wsStatusMsg;
                wstat.type = nikkiDef_1.wsConnectionStatusEvent.sendingDataWhileDisconnected;
                wstat.data = undefined;
                this.connectionStatSubject.next(wstat);
            }
        }
        catch (e) {
            console.error('exception while, sendMessage ', e.message);
        }
    };
    return wsHandlerImpl;
}());
exports.wsHandlerImpl = wsHandlerImpl;
