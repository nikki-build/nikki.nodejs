"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nikkiServiceBaseImpl = void 0;
const serviceDef_1 = require("./serviceDef");
const nikkiDef_1 = require("./nikkiDef");
const nodeJsWebSocketImpl_1 = require("./nodeJsWebSocketImpl");
var path = require("path");
var fs = require("fs");
class nikkiServiceBaseImpl {
    constructor() {
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
    onWsStatusMsg(data) {
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
    }
    onWsDataMsg(data) {
        try {
            console.info("receive data => ", data);
            if (data && data.data) {
                // console.info("received ws client ", data)
                this.recentData = data;
                this.wsConnectionStatus = nikkiDef_1.deviceConnectionStatus.Active;
                this.onData(data);
            }
            else {
                console.error("received invalid data", data);
            }
        }
        catch (e) {
            console.error('exception while, onWsDataMsg ', e.message);
        }
    }
    getRecentMsg() {
        return this.recentData;
    }
    getConnectAddress(serv, token) {
        let fullURL = undefined;
        try {
            const def = new nikkiDef_1.wsConnectUrlDef();
            def.token = token;
            def.servDef = serv;
            const strData = JSON.stringify(def);
            const enComp = encodeURIComponent(strData);
            fullURL = `${token.wsAddr}?${nikkiDef_1.queryStringKey}=${enComp}`;
        }
        catch (e) {
            console.error('Exception while getWsConnectUrl:', e.message);
        }
        return fullURL;
    }
    async init() {
        console.info("starting service.");
        let status = false;
        try {
            let bPath = process.cwd();
            const tokenPath = path.join(bPath, nikkiDef_1.serviceTokenFile);
            const servDefPath = path.join(bPath, nikkiDef_1.serviceDefFile);
            console.info('token path ', tokenPath, bPath);
            if (fs.existsSync(tokenPath) && fs.existsSync(servDefPath)) {
                const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
                const devDefData = JSON.parse(fs.readFileSync(servDefPath, 'utf8'));
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
        return status;
    }
    async start() {
        let optStatus = false;
        try {
            if ((this.servDef == undefined) || (this.devKeys == undefined)) {
                let status = await this.init();
                if (status == false) {
                    optStatus = false;
                    console.error("can not start without proper service files.");
                    return optStatus;
                }
            }
            if (this.servDef && this.devKeys && this.connectAddr && (this.connectAddr.length > 0)) {
                if (this.ws == undefined) {
                    this.ws = new nodeJsWebSocketImpl_1.wsHandlerImpl();
                }
                this.ws.connect(this.connectAddr);
                optStatus = true;
            }
            else {
            }
        }
        catch (e) {
            console.error('exception while, start() ', e.message);
        }
        return optStatus;
    }
    stop() {
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
    }
    getNodedata(data = {}) {
        let nData = undefined;
        let dtStr = '';
        try {
            if (data) {
                try {
                    dtStr = JSON.stringify(data);
                }
                catch (e) {
                    console.error('Exception while getNodedata:', e.message);
                }
                if (dtStr.length > nikkiDef_1.outDataSizeSegmentMaxLimit) {
                    console.error(`Input data size is ${dtStr.length}, sending data limit exceeded, it should be less than ${nikkiDef_1.outDataSizeSegmentMaxLimit}`);
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
    }
    sendData(message) {
        let status = false;
        try {
            if (!message) {
                console.error('Trying to send invalid data.');
                return false;
            }
            if (this.ws && this.devKeys && this.ws.getConnectionStatus() && this.servDef) {
                const timeDiff = Date.now() - this.lastMsgTime;
                if (timeDiff > (this.devKeys.rateLimit * 1000)) {
                    const srvData = this.getNodedata(message);
                    if (srvData) {
                        const strMsg = JSON.stringify(srvData);
                        if (nikkiDef_1.outDataSizeMaxLimit > strMsg.length) {
                            this.ws.sendMessage(strMsg);
                            this.lastMsgTime = Date.now();
                            status = true;
                        }
                        else {
                            console.error(`Exceeded outgoing data size, it should be less than ${nikkiDef_1.outDataSizeMaxLimit} bytes`);
                        }
                    }
                }
                else {
                    console.error(`Exceeding sending rate limits: allowed ${this.devKeys.rateLimit} msgs / second`);
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
    }
    isConnected() {
        this.ws.getConnectionStatus();
    }
    onConnect() {
        // Connection established
        console.info("connect ");
    }
    onDisconnect() {
        // Connection closed
        console.info("dis connect ");
    }
    onError(error) {
        // Handle errors
        console.info("error ", error);
    }
    onData(data) {
        // Handle incoming data
        console.info("received data ", data);
    }
}
exports.nikkiServiceBaseImpl = nikkiServiceBaseImpl;
