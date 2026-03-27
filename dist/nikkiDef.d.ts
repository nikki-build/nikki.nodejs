export declare enum wsConnectionStatusEvent {
    Connected = "Connected",
    DisConnected = "DisConnected",
    Error = "Error",
    NotSet = "NotSet",
    sendingDataWhileDisconnected = "sendingDataWhileDisconnected",
    Reconnecting = "Reconnecting",
    sentMsgSuccess = "sentMsgSuccess"
}
export declare class wsStatusMsg {
    type: wsConnectionStatusEvent;
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
    msgTime: number;
    id: number;
    msgType: wsMsgType;
    data: any;
    servType: serviceType;
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
export declare enum serviceType {
    system = "system",
    external = "external",
    dash = "dash",
    mobile = "mobile"
}
export declare class paramsBase {
    key: string;
    value: string;
    dataType: DataType;
    range: string;
}
export declare enum DataType {
    String = "string",
    Int = "int",
    Float = "float",
    Bool = "bool",
    Array = "array",
    Json = "json",
    Any = "any",
    NotSet = "NotSet"
}
export interface Sender {
    GuID: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    servType: serviceType;
}
export declare class wsServiceReceiveDataMsg implements Sender {
    GuID: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    servType: serviceType;
    id: number;
    msgTime: number;
    data: any;
    dataType: paramsBase[];
}
export declare class serviceTokenDef {
    sessionID: string;
    secrete: string;
    wsAddr: string;
    isPro: boolean;
    rateLimit: number;
    isDash: boolean;
    startTime: string;
    desc: string;
    name: string;
}
export declare class serviceConnectDefBase {
    GuID: string;
    servID: string;
    instID: string;
    name: string;
    dispName: string;
    servType: serviceType;
}
export declare class wsConnectUrlDef {
    servDef: serviceConnectDefBase | undefined;
    token: serviceTokenDef | undefined;
}
export declare class wsServiceConnectDef extends wsConnectUrlDef {
    wsAddr: string | undefined;
}
export declare const serviceBasePath = "resc/playground/services";
export declare var serviceDefFile: string;
export declare var serviceTokenFile: string;
export declare var queryStringTokenKey: string;
export declare var queryStringWsAddrKey: string;
export declare var queryStringSrvNameKey: string;
export declare enum DataType {
    int = "int",
    string = "string",
    intArr = "intArr",
    stringArr = "stringArr",
    object = "object",
    notSet = "notSet"
}
export declare enum deviceConnectionStatus {
    Active = "Active",
    Inactive = "Inactive",
    NotSet = "NotSet"
}
export declare enum progLang {
    Python = "Python",
    NodeJS = "NodeJS",
    JavaScript = "JavaScript",
    TypeScript = "TypeScript",
    CPP = "CPP",
    Kotlin = "Kotlin",
    Java = "Java",
    NotSet = "NotSet"
}
export declare const queryStringKey = "token";
export declare const outDataSizeMaxLimit = 3000;
export declare const outDataSizeSegmentMaxLimit = 500;
export declare const reconnectIntervalInMilli = 6000000;
