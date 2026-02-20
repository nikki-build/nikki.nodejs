import { serviceBase, wsServiceSendDataMsg } from "./serviceDef"
import { wsConnectionStatusEvent, wsStatusMsg, outDataSizeMaxLimit, queryStringKey, wsConnectUrlDef, serviceTokenDef, deviceConnectionStatus, wsServiceReceiveDataMsg, outDataSizeSegmentMaxLimit, serviceType, serviceTokenFile, serviceDefFile } from "./nikkiDef"
import { wsHandlerImpl } from "./nodeJsWebSocketImpl"

var path = require("path")
var fs = require("fs")

export class nikkiServiceBaseImpl {
    servDef: serviceBase | undefined = undefined
    protected devKeys: serviceTokenDef | undefined = undefined
    protected connectAddr: string | undefined = undefined
    protected ws: wsHandlerImpl = new wsHandlerImpl
    protected lastMsgTime = 0
    protected wsStatusSubscription: any = undefined
    protected wsDataSubscription: any = undefined
    protected isSleepingFlag = false
    protected devServiceType = serviceType.external
    public wsConnectionStatus: deviceConnectionStatus = deviceConnectionStatus.Inactive;
    protected recentData: wsServiceReceiveDataMsg | undefined;

    constructor() {
        this.wsDataSubscription = this.ws.getWsDataSubject().subscribe({ next: this.onWsDataMsg.bind(this) })
        this.wsStatusSubscription = this.ws.getWsStatusSubject().subscribe({ next: this.onWsStatusMsg.bind(this) })
    }


    private onWsStatusMsg(data: wsStatusMsg) {
        try {
            if (data) {

                if (data.type == wsConnectionStatusEvent.Connected) {
                    // this.registerDev()
                    this.onConnect()
                }

                if (data.type == wsConnectionStatusEvent.DisConnected) {
                    this.onDisconnect()
                }

                if (data.type == wsConnectionStatusEvent.Error) {
                    this.onError(data.data)
                }

                if (data.type == wsConnectionStatusEvent.sendingDataWhileDisconnected) {
                    console.error("websocket is not connected.!!!")
                }

                if (data.type == wsConnectionStatusEvent.Reconnecting) {
                    console.info("trying to reconnect to server...")
                }
            }
        }
        catch (e: any) {
            console.error('exception while,  onWsStatusMsg', e.message)
        }
    }

    private onWsDataMsg(data: wsServiceReceiveDataMsg) {
        try {
            console.info("receive data => ", data)
            if (data && data.data) {
                // console.info("received ws client ", data)
                this.recentData = data;

                this.wsConnectionStatus = deviceConnectionStatus.Active;
                this.onData(data)
            }
            else {
                console.error("received invalid data", data)
            }
        }
        catch (e: any) {
            console.error('exception while, onWsDataMsg ', e.message)
        }
    }

    getRecentMsg(): wsServiceReceiveDataMsg | undefined {
        return this.recentData;
    }

    protected getConnectAddress(serv: any, token: serviceTokenDef) {
        let fullURL: string | undefined = undefined;
        try {
            const def = new wsConnectUrlDef();
            def.token = token;
            def.servDef = serv;

            const strData = JSON.stringify(def);
            const enComp = encodeURIComponent(strData);

            fullURL = `${token.wsAddr}?${queryStringKey}=${enComp}`;
        } catch (e: any) {
            console.error('Exception while getWsConnectUrl:', e.message);
        }
        return fullURL;
    }

    protected async init() {

        console.info("starting service.")

        let status = false
        try {
            let bPath: string = process.cwd()

            const tokenPath = path.join(bPath, serviceTokenFile);
            const servDefPath = path.join(bPath, serviceDefFile);
            console.info('token path ', tokenPath, bPath)

            if (fs.existsSync(tokenPath) && fs.existsSync(servDefPath)) {

                const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8')) as serviceTokenDef
                const devDefData = JSON.parse(fs.readFileSync(servDefPath, 'utf8')) as serviceBase;

                if (devDefData && tokenData) {

                    this.devKeys = tokenData
                    this.servDef = devDefData as serviceBase

                    this.connectAddr = this.getConnectAddress(this.servDef, this.devKeys)
                    console.info("starting service ", this.servDef.dispName, this.connectAddr)
                    status = true
                }
                else {
                    console.error("invalid service files.. Failed to parse")
                }
            }
            else {
                console.error("device service files not found in the root directory. please check !")
            }
        }
        catch (e: any) {
            console.error('exception while, init  ', e.message)
        }
        return status
    }

    async start() {
        let optStatus = false
        try {

            if ((this.servDef == undefined) || (this.devKeys == undefined)) {
                let status = await this.init()
                if (status == false) {
                    optStatus = false
                    console.error("can not start without proper service files.")
                    return optStatus
                }
            }

            if (this.servDef && this.devKeys && this.connectAddr && (this.connectAddr.length > 0)) {
                if (this.ws == undefined) {
                    this.ws = new wsHandlerImpl()
                }
                this.ws.connect(this.connectAddr)
                optStatus = true
            }
            else {

            }
        }
        catch (e: any) {
            console.error('exception while, start() ', e.message)
        }
        return optStatus
    }

    stop() {
        try {
            if (this.ws) {
                this.ws.disconnnect()
            }
            if (this.servDef && this.servDef.dispName) {
                console.info("service " + this.servDef.dispName + " stopped. ")
            }
        }
        catch (e: any) {
            console.error('exception while, disconnect ', e.message)
        }
    }

    getNodedata(data: any = {}): wsServiceSendDataMsg | undefined {
        let nData: wsServiceSendDataMsg | undefined = undefined;
        let dtStr = '';
        try {


            if (data) {
                try {
                    dtStr = JSON.stringify(data);
                } catch (e: any) {
                    console.error('Exception while getNodedata:', e.message);
                }
                if (dtStr.length > outDataSizeSegmentMaxLimit) {
                    console.error(`Input data size is ${dtStr.length}, sending data limit exceeded, it should be less than ${outDataSizeSegmentMaxLimit}`);
                    return undefined;
                }
            }
            else {
                console.error('Invalid input: send some valid data');
                return undefined;
            }

            if (this.servDef && this.devKeys && data) {
                nData = new wsServiceSendDataMsg();
                nData.GuID = this.servDef.GuID;
                nData.dispName = this.servDef.dispName;
                nData.servID = this.servDef.servID;
                nData.name = this.servDef.name;
                nData.instID = this.servDef.instID;
                nData.secrete = this.devKeys.secrete;
                nData.sessionID = this.devKeys.sessionID;
                nData.data = data;
                nData.servType = serviceType.external

                nData.dataType = this.servDef.outputs.parms
            }
        }
        catch (e: any) {
            console.error('exception while, getNodedata  ', e.message)
        }
        return nData;
    }

    sendData(message: any): boolean {
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
                        if (outDataSizeMaxLimit > strMsg.length) {
                            this.ws.sendMessage(strMsg);
                            this.lastMsgTime = Date.now();
                            status = true;
                        } else {
                            console.error(`Exceeded outgoing data size, it should be less than ${outDataSizeMaxLimit} bytes`);
                        }
                    }
                } else {
                    console.error(`Exceeding sending rate limits: allowed ${this.devKeys.rateLimit} msgs / second`);
                }
            } else {
                console.error('WebSocket is not connected.');
            }
        } catch (e: any) {
            console.error('Exception while sendMessage:', e.message);
        }
        return status;
    }

    isConnected() {
        this.ws.getConnectionStatus()
    }

    onConnect() {
        // Connection established
        console.info("connect ")
    }

    onDisconnect() {
        // Connection closed
        console.info("dis connect ")
    }

    onError(error: any) {
        // Handle errors
        console.info("error ", error)
    }

    onData(data: any) {
        // Handle incoming data
        console.info("received data ", data)
    }

}