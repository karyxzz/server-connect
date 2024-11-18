import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTChandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as strangerUtils from "./strangerUtils.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
  socket.on("connect", () => {
    socketIO = socket;
    console.log("Connected to server");
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer", (data) => {
    console.log("Pre offer came in wss");
    webRTChandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    webRTChandler.handlePreOfferAnswer(data);
  });

  socket.on("user-hanged-up", () => {
    webRTChandler.handleConnectedUserHangedUp();
  });

  socket.on("webRTC-signaling", (data) => {
    switch (data.type) {
      case constants.webRTCSignaling.OFFER:
        webRTChandler.handleWebRTCOffer(data);
        break;
      case constants.webRTCSignaling.ANSWER:
        webRTChandler.handleWebRTCAnswer(data);
        break;
      case constants.webRTCSignaling.ICE_CANDIDATE:
        webRTChandler.handleWebRTCCandidate(data);
        break;
      default:
        return;
    }
  });

  socket.on("stranger-socket-id", (data) => {
    strangerUtils.connectWithStranger(data);
  });
};
export const sendPreOffer = (data) => {
  console.log("Emiting to server pre-offer event");
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};

export const sendDataUsingWebRTCSignaling = (data) => {
  socketIO.emit("webRTC-signaling", data);
};

export const sendUserHangedUp = (data) => {
  socketIO.emit("user-hanged-up", data);
};

export const changeStrangerConnectionStatus = (data) => {
  socketIO.emit("stranger-connection-status", data);
};

export const getStrangerSocketId = () => {
  socketIO.emit("get-stranger-socket-id");
};
