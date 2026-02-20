export enum wsConnectionStatusEvent {
    Connected = 'Connected',
    DisConnected = 'DisConnected',
    Error = 'Error',
    NotSet = 'NotSet',
    sendingDataWhileDisconnected = 'sendingDataWhileDisconnected',
    Reconnecting = 'Reconnecting',
}

export class wsStatusMsg {
    type: wsConnectionStatusEvent = wsConnectionStatusEvent.NotSet;
    data: any = {};
}

export enum wsMsgType {
    DashboardStatus = 'DashboardStatus',
    ServiceData = 'ServiceData',
    ServiceCommand = 'ServiceCommand',
    NotSet = 'NotSet',
}

export class wsMessageBase {
    action = 'sendMessage';
    msgTime = Date.now();
    id = Math.round(Math.random() * 1E9);
    msgType: wsMsgType = wsMsgType.NotSet;
    data: any = undefined;
    servType: serviceType = serviceType.external;

}

export class wsServiceSendDataMsg extends wsMessageBase {
    GuID = '';
    sessionID = '';
    secrete = '';
    servID = '';
    instID = '';
    name = '';
    dispName = '';
    constructor() {
        super();
        this.msgType = wsMsgType.ServiceData;
        this.servType = serviceType.external;
    }
}

export enum serviceType {
    system = 'system',
    external = 'external',
    dash = 'dash',
    mobile = "mobile"
}


export class paramsBase {
    key = ''
    value = ''
    dataType = DataType.NotSet
    range = ''
}

export enum DataType {
    String = "string",
    Int = "int",
    Float = "float",
    Bool = "bool",
    Array = "array",
    Json = "json",
    Any = 'any',
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

export class wsServiceReceiveDataMsg implements Sender {
    GuID = ''
    servID = ''
    instID = ''
    name = ''
    dispName = ''
    servType = serviceType.system

    id = Math.round(Math.random() * 1E9)
    msgTime = Date.now();
    data: any = undefined;
    dataType: paramsBase[] = []
}

export class serviceTokenDef {
    sessionID = '';
    secrete = '';
    wsAddr = '';
    isPro = false;
    rateLimit = 2;
    isDash = false;
    startTime = '';
    desc = '';
    name = '';
}

export class serviceConnectDefBase {
    GuID = '';
    servID = '';
    instID = '';
    name = '';
    dispName = '';
    servType: serviceType = serviceType.external;
}

export class wsConnectUrlDef {
    servDef: serviceConnectDefBase | undefined = undefined;
    token: serviceTokenDef | undefined = undefined;
}

export class wsServiceConnectDef extends wsConnectUrlDef {
    wsAddr: string | undefined = undefined;
}

export const serviceBasePath = 'resc/playground/services';

export var serviceDefFile = "serviceDef.json"
export var serviceTokenFile = "serviceToken.json"

export var queryStringTokenKey = 'token'
export var queryStringWsAddrKey = 'wsAddr'
export var queryStringSrvNameKey = 'name'

export enum DataType {
    int = 'int',
    string = 'string',
    intArr = 'intArr',
    stringArr = 'stringArr',
    object = 'object',
    notSet = 'notSet',
}

export enum deviceConnectionStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    NotSet = 'NotSet'
}

export enum progLang {
    Python = 'Python',
    NodeJS = 'NodeJS',
    JavaScript = 'JavaScript',
    TypeScript = 'TypeScript',
    CPP = 'CPP',
    Kotlin = 'Kotlin',
    Java = 'Java',
    NotSet = 'NotSet',
}

export const queryStringKey = 'token';
export const outDataSizeMaxLimit = 3000;
export const outDataSizeSegmentMaxLimit = 500;
export const reconnectIntervalInMilli = 6000000;