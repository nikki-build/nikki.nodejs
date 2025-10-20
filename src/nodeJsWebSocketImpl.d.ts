import { Subject } from 'rxjs';
import { wsStatusMsg } from "./nikkiDef";
export declare class wsHandlerImpl {
    protected wsDataMsgSubject: Subject<any>;
    protected connectionStatSubject: Subject<wsStatusMsg>;
    private wsHandl;
    private serverUrl;
    reconnectInterval: number;
    protected shouldReconnect: boolean;
    protected reconnectTimeout: any;
    constructor();
    getConnectionStatus(): boolean;
    getWsStatusSubject(): Subject<wsStatusMsg>;
    getWsDataSubject(): Subject<any>;
    protected onWsMessage(msg: any): void;
    protected wsOnConnect(): void;
    protected wsOnError(err: any): void;
    protected wsOnClose(): void;
    disconnnect(): void;
    connect(wsConnectAddr: string): void;
    sendMessage(msg: any): void;
}
