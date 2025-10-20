import { interval, Subject, Subscription } from 'rxjs';
import { reconnectIntervalInMilli, wsConnectionStatusEvent, wsStatusMsg } from "./nikkiDef"

import { WebSocket } from 'ws';


export class wsHandlerImpl {
    protected wsDataMsgSubject = new Subject<any>();
    protected connectionStatSubject = new Subject<wsStatusMsg>();
    private wsHandl: WebSocket | undefined = undefined;
    private serverUrl = "";
    reconnectInterval = reconnectIntervalInMilli; // 2.5 seconds

    protected shouldReconnect = false;
    protected reconnectTimeout: any = undefined;

    constructor() {
        this.wsHandl = undefined;
        this.shouldReconnect = true;
        this.reconnectTimeout = null;
    }

    getConnectionStatus() {
        let stat = false
        try {
            if (this.wsHandl) {
                stat = (this.wsHandl.readyState == WebSocket.OPEN)
            }
        }
        catch (e: any) {
            console.error('exception while, getConnectionStatus ', e.message)
        }
        return stat
    }

    getWsStatusSubject() {
        return this.connectionStatSubject
    }

    getWsDataSubject() {
        return this.wsDataMsgSubject
    }

    protected onWsMessage(msg: any) {
        try {
            // console.info("jdata ", msg)
            if (msg && msg.data) {
                let jevent = JSON.parse(msg.data)
                this.wsDataMsgSubject.next(jevent)
            }
        }
        catch (e: any) {
            console.error('exception while, wsDashHandler onWsMessage  ', e.message)
        }
    }

    protected wsOnConnect() {
        try {

            console.info("ws connected. ")
            let wstat = new wsStatusMsg
            wstat.type = wsConnectionStatusEvent.Connected
            this.connectionStatSubject.next(wstat)
        }
        catch (e: any) {
            console.error('exception while, wsOnConnect ', e.message)
        }
    }

    protected wsOnError(err: any) {
        try {
            console.info("ws error. ")
            let wstat = new wsStatusMsg
            wstat.type = wsConnectionStatusEvent.Error
            wstat.data = err
            this.connectionStatSubject.next(wstat)
        }
        catch (e: any) {
            console.error('exception while, wsOnError ', e.message)
        }
    }

    protected wsOnClose() {
        try {
            console.info("ws closed. ")

            let wstat = new wsStatusMsg
            wstat.type = wsConnectionStatusEvent.DisConnected
            this.connectionStatSubject.next(wstat)

        }
        catch (e: any) {
            console.error('exception while, wsOnClose ', e.message)
        }
    }

    disconnnect() {
        try {

            this.shouldReconnect = false; // Prevent reconnection
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }

            if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
                // 1000 indicates a normal closure
                this.wsHandl.close(1000, 'Client initiated close');
            }
        }
        catch (e: any) {
            console.error('exception while, wsDashHandler disconnnect  ', e.message)
        }
    }

    connect(wsConnectAddr: string) {
        try {
            this.serverUrl = wsConnectAddr

            if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
                return;
            }

            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = null;
            }

            this.wsHandl = new WebSocket(`${this.serverUrl}`, { rejectUnauthorized: false })

            this.wsHandl.onopen = () => {
                this.wsOnConnect();
            };

            this.wsHandl.onmessage = (event: any) => {
                this.onWsMessage(event);
            };

            this.wsHandl.onclose = () => {
                this.wsOnClose()
                if (this.shouldReconnect) {
                    this.reconnectTimeout = setTimeout(() => {
                        console.info("trying to reconnect.")

                        let wstat = new wsStatusMsg
                        wstat.type = wsConnectionStatusEvent.Reconnecting
                        this.connectionStatSubject.next(wstat)

                        this.connect(this.serverUrl)
                    }, this.reconnectInterval)
                }
            };

            this.wsHandl.onerror = (error: any) => {
                this.wsOnError(error);
            };
        }
        catch (e: any) {
            console.error('exception while, wsDashHandler connect', e.message)
        }
    }

    sendMessage(msg: any) {
        try {
            if (this.wsHandl && this.wsHandl.readyState === WebSocket.OPEN) {
                this.wsHandl.send(JSON.stringify(msg));
            }
            else {
                console.error('trying to send message!, WebSocket is not connected.');
                let wstat = new wsStatusMsg
                wstat.type = wsConnectionStatusEvent.sendingDataWhileDisconnected
                wstat.data = undefined
                this.connectionStatSubject.next(wstat)
            }
        }
        catch (e: any) {
            console.error('exception while, sendMessage ', e.message)
        }
    }
}
