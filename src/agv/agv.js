require("dotenv").config({ path: `${__dirname}/../../.env` });
const web3 = require("web3-utils");
const net = require("node:net");
const portClient = process.env.PORTCLIENT;
const ipClient = process.env.HOSTCLIENT;

class agv {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.socket = net.Socket();
    this.data = {};
    this.timeCirCle = 100;
    this.checkConnect = "offline";
  }
  connect() {
    this.client = this.socket.connect(this.port, this.host);
  }
  checkModbusFrameWithCRC(frame) {
    const frameBuffer = Buffer.from(frame, "hex");
    const receivedCRC = frameBuffer.readUInt16LE(frameBuffer.length - 2);
    const calculatedCRC = this.calculateCRC(frameBuffer.slice(0, -2));
    return receivedCRC === calculatedCRC ? frameBuffer : false;
  }
  calculateCRC(buffer) {
    const polynomial = 0xa001;
    let crc = 0xffff;

    for (let i = 0; i < buffer.length; i++) {
      crc ^= buffer[i];
      for (let j = 0; j < 8; j++) {
        if (crc & 0x0001) {
          crc >>= 1;
          crc ^= polynomial;
        } else {
          crc >>= 1;
        }
      }
    }

    return crc;
  }
  start() {
    this.connect();
    this.client.on("error", (error) => {
      console.log("Error", error);
    });
    this.client.on("close", () => {
      this.checkConnect = "offline";
      console.log("Connect close, waitting reconnect !!!");
      clearInterval(this.timeClear);
      this.connect();
    });
    this.client.on("ready", () => {
      this.checkConnect = "online";
    });
    this.client.on("connect", () => {
      console.log(`Connected ip: ${this.host} port ${this.port} succee.`);
      this.client.on("data", (data) => {
        if (this.checkModbusFrameWithCRC(data.toString("hex"))) {
          let dem = -1;
          const data1 = data.slice(3);
          for (let i = 1; i < data1.length -2; i += 2) {
            dem++;
            this.data[`${dem}`] = data1[i];
          }
        }
      });
      this.timeClear = setInterval(() => {
        this.client.write(
          Buffer.from([0x01, 0x03, 0x00, 0x0a, 0x00, 0x31, 0xa4, 0x1c])
        );
      }, this.timeCirCle);
    });
  }
}

let agvv = new agv(portClient, ipClient);
module.exports = agvv;
