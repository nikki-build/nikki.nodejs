export declare enum wsConnectionStatusEvent {
    Connected = "Connected",
    DisConnected = "DisConnected",
    Error = "Error",
    NotSet = "NotSet",
    sendingDataWhileDisconnected = "sendingDataWhileDisconnected",
    Reconnecting = "Reconnecting"
}
export declare class wsStatusMsg {
    type: wsConnectionStatusEvent;
    data: any;
}
export declare enum wsMsgType {
    DashboardStatus = "DashboardStatus",
    ServiceData = "ServiceData",
    OperationStatus = "OperationStatus",
    Connection = "Connection",
    NotSet = "NotSet"
}
export declare enum serviceType {
    system = "system",
    external = "external",
    dash = "dash",
    mobile = "mobile"
}
export declare class wsMessageBase {
    action: string;
    token: string;
    eps: actionPoints;
    mesgTime: number;
    id: number;
    msgType: wsMsgType;
    data: any;
    servicetype: serviceType;
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
}
export declare class wsConnectUrlDef {
    servDef: serviceConnectDefBase | undefined;
    token: serviceTokenDef | undefined;
}
export declare class wsDeviceSleepDef {
    devID: string;
    duration: number;
    startTime: number;
    devName: string;
    devDispName: string;
}
export declare class wsDeviceKeys {
    token: string;
    wsAddr: string;
    isPro: boolean;
    rateLimit: number;
}
export declare enum actionPoints {
    AddDash = "AddDash",
    RemoveDash = "RemoveDash",
    sendMessage = "sendMessage",
    GoSleep = "GoSleep",
    AddDevice = "AddDevice",
    RemoveDevice = "RemoveDevice",
    NotSet = "NotSet"
}
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
export declare class wsServiceReceiveDataMsg {
    sender: {
        GuID: string;
        servID: string;
        instID: string;
        name: string;
        dispName: string;
    };
    time: number;
    data: any;
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
export declare enum DeviceTypes {
    Laptop = "Laptop",
    Browser = "Browser",
    Mobile = "Mobile",
    Microcontroller = "Microcontroller",
    NotSet = "NotSet"
}
export declare var queryStringKey: string;
export declare var outDataSizeMaxLimit: number;
export declare var outDataSizeSegmentMaxLimit: number;
export declare var reconnectIntervalInMilli: number;
export declare var serviceDefFile: string;
export declare var serviceTokenFile: string;
export declare var serviceDefBaseFile: string;
export declare var serviceTokenBaseFile: string;
