import { DataType, deviceConnectionStatus, progLang, serviceType } from "./nikkiDef";
export declare class paramsBase {
    key: string;
    value: string;
    dataType: DataType;
    range: string;
}
export declare class ioBase {
    name: string;
    desc: string;
    parms: paramsBase[];
}
export declare class wsServiceDataBase {
    name: string;
    dispName: string;
    servID: string;
    instID: string;
    devID: string;
    data: any;
}
export declare enum wsMsgType {
    DashboardStatus = "DashboardStatus",
    ServiceData = "ServiceData",
    ServiceCommand = "ServiceCommand",
    NotSet = "NotSet"
}
export declare class wsMessageBase {
    action: string;
    mesgTime: number;
    id: number;
    msgType: wsMsgType;
    data: any;
    time: number;
}
export declare class wsServiceSendDataMsg extends wsMessageBase {
    GuID: string;
    sessionID: string;
    secrete: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    constructor();
}
export declare class serviceBase {
    lang: progLang;
    name: string;
    dispName: string;
    desc: string;
    iconUrl: string;
    servType: serviceType;
    servID: string;
    instID: string;
    GuID: string;
    inputs: ioBase;
    outputs: ioBase;
    conStatus: deviceConnectionStatus;
    conDate: number;
    disconDate: number;
    conID: string;
    msgCount: number;
    mapped: boolean;
    constructor();
}
