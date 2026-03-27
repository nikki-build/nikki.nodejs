"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsHandlerImpl = void 0;
const rxjs_1 = require("rxjs");
const nikkiDef_1 = require("./nikkiDef");
const ws_1 = require("ws");
class wsHandlerImpl {
    constructor() {
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
    getConnectionStatus() {
        let stat = false;
        try {
            if (this.wsHandl) {
                stat = (this.wsHandl.readyState == ws_1.WebSocket.OPEN);
            }
        }
        catch (e) {
            console.error('exception while, getConnectionStatus ', e.message);
        }
        return stat;
    }
    getBufferedAmount() {
        try {
            return this.wsHandl?.bufferedAmount ?? 0;
        }
        catch {
            return 0;
        }
    }
    getWsStatusSubject() {
        return this.connectionStatSubject;
    }
    getWsDataSubject() {
        return this.wsDataMsgSubject;
    }
    onWsMessage(msg) {
        try {
            // console.info("jdata ", msg)
            if (msg && msg.data) {
                let jevent = JSON.parse(msg.data);
                this.wsDataMsgSubject.next(jevent);
            }
        }
        catch (e) {
            console.error('exception while, wsDashHandler onWsMessage  ', e.message);
        }
    }
    wsOnConnect() {
        try {
            console.info("ws connected. ");
            let wstat = new nikkiDef_1.wsStatusMsg;
            wstat.type = nikkiDef_1.wsConnectionStatusEvent.Connected;
            this.connectionStatSubject.next(wstat);
        }
        catch (e) {
            console.error('exception while, wsOnConnect ', e.message);
        }
    }
    wsOnError(err) {
        try {
            console.info("ws error. ");
            let wstat = new nikkiDef_1.wsStatusMsg;
            wstat.type = nikkiDef_1.wsConnectionStatusEvent.Error;
            wstat.data = err;
            this.connectionStatSubject.next(wstat);
        }
        catch (e) {
            console.error('exception while, wsOnError ', e.message);
        }
    }
    wsOnClose() {
        try {
            console.info("ws closed. ");
            let wstat = new nikkiDef_1.wsStatusMsg;
            wstat.type = nikkiDef_1.wsConnectionStatusEvent.DisConnected;
            this.connectionStatSubject.next(wstat);
        }
        catch (e) {
            console.error('exception while, wsOnClose ', e.message);
        }
    }
    disconnnect() {
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
    }
    connect(wsConnectAddr) {
        try {
            this.serverUrl = wsConnectAddr;
            if (this.wsHandl && this.wsHandl.readyState === ws_1.WebSocket.OPEN) {
                return;
            }
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }
            this.wsHandl = new ws_1.WebSocket(`${this.serverUrl}`, { rejectUnauthorized: false });
            this.wsHandl.onopen = () => {
                this.wsOnConnect();
            };
            this.wsHandl.onmessage = (event) => {
                this.onWsMessage(event);
            };
            this.wsHandl.onclose = () => {
                this.wsOnClose();
                if (this.shouldReconnect) {
                    this.reconnectTimeout = setTimeout(() => {
                        console.info("trying to reconnect.");
                        let wstat = new nikkiDef_1.wsStatusMsg;
                        wstat.type = nikkiDef_1.wsConnectionStatusEvent.Reconnecting;
                        this.connectionStatSubject.next(wstat);
                        this.connect(this.serverUrl);
                    }, this.reconnectInterval);
                }
            };
            this.wsHandl.onerror = (error) => {
                this.wsOnError(error);
            };
        }
        catch (e) {
            console.error('exception while, wsDashHandler connect', e.message);
        }
    }
    sendMessage(msg) {
        try {
            if (this.wsHandl && this.wsHandl.readyState === ws_1.WebSocket.OPEN) {
                this.wsHandl.send(JSON.stringify(msg), (err) => {
                    if (err) {
                        console.error("❌ send error:", err.message);
                        // this.onSendError?.(err, msg);
                        let wstat = new nikkiDef_1.wsStatusMsg;
                        wstat.type = nikkiDef_1.wsConnectionStatusEvent.Error;
                        wstat.data = err.message;
                        this.connectionStatSubject.next(wstat);
                    }
                    else {
                        let wstat = new nikkiDef_1.wsStatusMsg;
                        wstat.type = nikkiDef_1.wsConnectionStatusEvent.sentMsgSuccess;
                        wstat.data = undefined;
                        this.connectionStatSubject.next(wstat);
                    }
                });
            }
            else {
                console.error('trying to send message!, WebSocket is not connected.');
                let wstat = new nikkiDef_1.wsStatusMsg;
                wstat.type = nikkiDef_1.wsConnectionStatusEvent.sendingDataWhileDisconnected;
                wstat.data = undefined;
                this.connectionStatSubject.next(wstat);
            }
        }
        catch (e) {
            console.error('exception while, sendMessage ', e.message);
        }
    }
}
exports.wsHandlerImpl = wsHandlerImpl;
