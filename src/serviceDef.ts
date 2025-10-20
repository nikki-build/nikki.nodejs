import { DataType, DeviceTypes, deviceConnectionStatus, progLang, serviceType } from "./nikkiDef"

export class paramsBase {
    key = ''
    value = ''
    dataType = DataType.notSet
    range = ''
}

export class ioBase {
    name = ''
    desc = ""
    parms: paramsBase[] = []
}

export class wsServiceDataBase {
    name = ''
    dispName = ''
    servID = ""
    instID = Math.round(Math.random() * 1E9).toString()
    devID = ""
    data: any = {}
}

export enum wsMsgType {
    DashboardStatus = 'DashboardStatus',
    ServiceData = 'ServiceData',
    ServiceCommand = 'ServiceCommand',
    NotSet = 'NotSet',
}

export class wsMessageBase {
    action = 'sendMessage';
    mesgTime = Date.now();
    id = Math.round(Math.random() * 1E9);
    msgType: wsMsgType = wsMsgType.NotSet;
    data: any = undefined;
    time = Date.now();
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
    }
}

export class serviceBase {
    lang = progLang.NotSet
    name = ""
    dispName = ''
    desc = ""
    iconUrl = ""
    servType = serviceType.system

    servID = Math.round(Math.random() * 1E9).toString()
    instID = Math.round(Math.random() * 1E9).toString()
    GuID = Math.round(Math.random() * 1E9).toString()

    inputs: ioBase = new ioBase
    outputs: ioBase = new ioBase

    conStatus = deviceConnectionStatus.NotSet
    conDate = Date.now()
    disconDate = Date.now()
    conID = ''
    msgCount = 0
    mapped = false

    constructor() {
        this.instID = Math.round(Math.random() * 1E9).toString()
    }
}