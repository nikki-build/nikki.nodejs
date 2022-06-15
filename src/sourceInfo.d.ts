import { dataBundle, redData } from "./redData";
export declare enum progLang {
    NODEJS = "NODEJS",
    BROWSERJS = "BROWSERJS",
    PYTHON = "PYTHON",
    CPP = "CPP",
    JAVA = "JAVA",
    KOTLIN = "KOTLIN"
}
export declare enum serviceStartType {
    auto = "auto",
    manual = "manual"
}
export declare class sourceInfo {
    srvID: string;
    instID: string;
    proglang: progLang;
    iDf: dataBundle;
    oDf: dataBundle;
    name: string;
    dispName: string;
    desc: string;
    tags: string[];
    startType: serviceStartType;
    constructor();
    static getRedOutputData(sessionID: string, data: sourceInfo): redData;
    static getRedInputData(sessionID: string, data: sourceInfo): redData;
    static toJsonString(src: sourceInfo): string;
}
