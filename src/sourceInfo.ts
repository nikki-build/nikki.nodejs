
import { nanoid } from "nanoid"
import {
    dataBundle,
    ioParamsType,
    redData
} from "./redData"

export enum progLang {
    NODEJS = "NODEJS",
    BROWSERJS = "BROWSERJS",
    PYTHON = "PYTHON",
    CPP = "CPP",
    JAVA = "JAVA",
    KOTLIN = "KOTLIN"
}

export enum serviceStartType {
    auto = "auto",
    manual = "manual"
}

export class sourceInfo {
    srvID = nanoid()
    instID = nanoid()
    proglang: progLang = progLang.BROWSERJS
    iDf = new dataBundle
    oDf = new dataBundle
    name = ""
    dispName = ""
    desc = ""
    tags: string[] = []
    startType: serviceStartType = serviceStartType.manual
    
    constructor() {
        this.iDf.ioType = ioParamsType.userDefined
    }

    static getRedOutputData(sessionID: string, data: sourceInfo): redData {
        let rData = new redData(sessionID, data.srvID, data.instID)
        rData.data = data.oDf
        return rData
    }

    static getRedInputData(sessionID: string, data: sourceInfo): redData {
        let rData = new redData(sessionID, data.srvID, data.instID)
        rData.data = data.iDf
        return rData
    }

    static toJsonString(src: sourceInfo) {
        let str: string = ""

        try {
            str = JSON.stringify(src)
        }
        catch (e: any) {
            console.error("failed to parse the string ", e.message);
            str = ""
        }
        return str
    }

}


