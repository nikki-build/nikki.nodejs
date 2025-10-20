import { serviceBase } from "nikki.node";
export declare class MyDerivedClass extends serviceBase {
    onConnected(): void;
    onDisconnected(): void;
    onData(data: any): void;
}
