import { nikkiServiceBase } from '../src/nikkiNodejsServiceBase';
export declare class MyDerivedClass extends nikkiServiceBase {
    onConnected(): void;
    onDisconnected(): void;
    onData(data: any): void;
}
