export enum wsConnectionStatusEvent {
    Connected = "Connected",
    DisConnected = "DisConnected",
    Error = "Error",
    NotSet = "NotSet",
    sendingDataWhileDisconnected = "sendingDataWhileDisconnected",
    Reconnecting = "Reconnecting"
}

export class wsStatusMsg {
    type = wsConnectionStatusEvent.NotSet
    data: any = {}
}

export enum wsMsgType {
    DashboardStatus = "DashboardStatus",
    ServiceData = "ServiceData",
    OperationStatus = "OperationStatus",
    Connection = "Connection",
    NotSet = "NotSet"
}


export enum serviceType {
    system = 'system',
    external = 'external',
    dash = 'dash',
    mobile = "mobile"
}

export class wsMessageBase {
    action = "sendMessage"
    token = ''
    eps = actionPoints.NotSet
    mesgTime = Date.now()
    id = Math.round(Math.random() * 1E9)
    msgType = wsMsgType.NotSet
    data: any = undefined
    servicetype = serviceType.system
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
}

export class wsConnectUrlDef {
    servDef: serviceConnectDefBase | undefined = undefined;
    token: serviceTokenDef | undefined = undefined;
}

export class wsDeviceSleepDef {
    devID = ""
    duration = 5 // minutes
    startTime = Date.now()
    devName = ''
    devDispName = ''
    
}

export class wsDeviceKeys {
    token = ''
    wsAddr = ""
    isPro = false
    rateLimit = 2
}


export enum actionPoints {
    AddDash = "AddDash",
    RemoveDash = "RemoveDash",
    sendMessage = "sendMessage",
    GoSleep = "GoSleep",

    AddDevice = "AddDevice",
    RemoveDevice = "RemoveDevice",
    NotSet = 'NotSet'
}


export enum DataType {
    int = "int",
    string = "string",
    intArr = "intArr",
    stringArr = "stringArr",
    object = "object",
    notSet = "notSet"
}

export enum deviceConnectionStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    NotSet = 'NotSet',
}

export class wsServiceReceiveDataMsg {
    sender = {
        GuID: '',
        servID: '',
        instID: '',
        name: '',
        dispName: ''
    };
    time = Date.now();
    data: any = undefined;
}



export enum progLang {
    Python = "Python",
    NodeJS = "NodeJS",
    JavaScript = "JavaScript",
    TypeScript = "TypeScript",
    CPP = "CPP",
    Kotlin = "Kotlin",
    Java = "Java",
    NotSet = "NotSet"
}

export enum DeviceTypes {
    Laptop = "Laptop",
    Browser = "Browser",
    Mobile = "Mobile",
    Microcontroller = "Microcontroller",
    NotSet = "NotSet"
}





export var queryStringKey = 'token'

export var  outDataSizeMaxLimit = 3000
export var  outDataSizeSegmentMaxLimit = 500

export var  reconnectIntervalInMilli = 6000






export var serviceDefFile = "serviceDef.json"
export var serviceTokenFile = "serviceToken.json"
export var serviceDefBaseFile = "serviceDef"
export var serviceTokenBaseFile = "serviceToken"