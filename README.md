nikki.node
==========

**Official Nodejs client library for the nikki.build service.**

👉 **Website:** [https://nikki.build](https://nikki.build)



## Overview
-----------
`nikki.node` allows you to seamlessly connect your Nodejs services to the **nikki.build** platform. Designed for reliability and speed, this library provides a robust base for real-time data streaming and node-to-node communication.

* **Reliable Connectivity:** Built-in connection management.
* **JSON Native:** Easy-to-use JSON data handling.
* **Lifecycle Events:** Built-in hooks for connection, data, and error states.

* **TypeScript Ready:** Full type definitions included.
* **Extensible:** Built around a base class for custom logic.

The library is built with TypeScript and supports Nodejs >=16.

---

## Installation

Install the package via NPM:

```bash
npm install nikki.node
```


Quick Start
-----------

### 1. Create Your Service
Extend the `nikkiServiceBase` class to handle your custom logic.

```typescript
import { nikkiServiceBase } from "nikki.node";

export class MyService extends nikkiServiceBase {
    onConnect(): void {
        console.info("Connected to nikki.build");
    }
    onDisconnect(): void {
        console.info("Disconnected from nikki.build");
    }
    onData(data: any): void {
        console.info("Received data:", data);
    }
    onError(errMsg: string): void {
        console.error("Error:", errMsg);
    }
}
```

## 📁 Configuration Files (Required)

Make sure the required configuration files are available at the **root of your project**.
The library will automatically attempt to load these files during initialization.

### ✅ Required Files

Place the following files at the root path:
- /serviceDef.json
- /serviceToken.json

> These files are **mandatory** for establishing a connection.
> The library expects them at the **root level** (same level as your HTML or entry file).
> If they are missing or invalid:
> - Connection will fail


### 2\. Start the Connection


Create an instance and start the connection:

```typescript
 const srvInst = new MyService()

// Connect to nikki.build
srvInst.start()
```

### 3\.📤 Sending Data

Send JSON data to other connected nodes:
```typescript
srvInst.sendData({ message: "Hello World" })
```

Example with interval:
```typescript
let count = 0

const interval = setInterval(() => {
    count++
    srvInst.sendData({ count })
    console.info("Sending data:", count)
}, 3000)
```

### 4\. To disconnect:

```typescript
srvInst.stop()
```

## 🔄 Lifecycle Methods

Override these methods in your service class:

| Method | Description |
|--------|------------|
| `onConnect()` | Called when the connection is successfully established to nikki.build |
| `onDisconnect()` | Called when the connection is closed or lost |
| `onError(errMsg)` | Called whenever an error occurs |
| `onData(jsonData)` | Called when data is received from another connected node |

## 🛠 Available Methods
| Method               | Description                       |
| -------------------- | --------------------------------- |
| `start()`            | Connect to nikki.build            |
| `stop()`             | Disconnect from nikki.build       |
| `sendData(jsonData)` | Send JSON data to connected nodes |





### ⚠️ Rate Limits (Friendly Reminder)
--------------------------------------------
To keep everything running smoothly on the platform, there are a few limits to keep in mind:

- **Message Speed:** Please don’t send more than **2 messages per second**.  
  (Your service might be fast… but let’s not overwhelm things 😄)

- **Throttling:** If limits are exceeded, your connection may be temporarily throttled or disconnected.

- **Best Practice:** Design your service with these limits in mind — batching, debouncing, or simple timing controls work great.

Play nice, and everything stays happy 🚀


Example Use Cases
-----------------

*   **Real-time event processors**
    
*   **IoT Data streaming services**
    
*   **Monitoring and Alerting services**
    
*   **Backend integrations with nikki.build**
    

Requirements
------------

*   **Node.s:** >= 16
    
*   **Dependencies:** rxjs, ws
    

Documentation & Support
-----------------------

For full platform documentation and advanced service configuration, visit:

👉 [https://nikki.build](https://nikki.build)

License
-------

[ISC](https://opensource.org/licenses/ISC)

