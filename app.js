const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];
let connectedPeersStrangers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    console.log("Pre offer came");
    const { calleePersonalCode, callType } = data;
    console.log(calleePersonalCode);
    console.log(connectedPeers);

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    console.log(connectedPeer);

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalCode).emit("pre-offer", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer", data);
    }
  });

  socket.on("pre-offer-answer", (data) => {
    console.log("Pre offer answer came");
    console.log(data);
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === data.callerSocketId
    );

    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on("user-hanged-up", (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("user-hanged-up");
    }
  });

  socket.on("stranger-connection-status", (data) => {
    const { status } = data;
    if (status) {
      connectedPeersStrangers.push(socket.id);
    } else {
      const newConnectedPeerStrangers = connectedPeersStrangers.filter(
        (peerSocketId) => peerSocketId !== socket.id
      );
      connectedPeersStrangers = newConnectedPeerStrangers;
    }

    console.log(connectedPeersStrangers);
  });

  socket.on("get-stranger-socket-id", () => {
    let randomStrangerSocketId;
    const filteredConnectedPeerStrangers = connectedPeersStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    if (filteredConnectedPeerStrangers.length > 0) {
      randomStrangerSocketId =
        filteredConnectedPeerStrangers[
          Math.floor(Math.random() * filteredConnectedPeerStrangers.length)
        ];
    } else {
      randomStrangerSocketId = null;
    }

    const data = {
      randomStrangerSocketId,
    };

    io.to(socket.id).emit("stranger-socket-id", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // connectedPeers = connectedPeers.filter(
    //   (peerSocketId) => peerSocketId !== socket.id
    // );
    // console.log(connectedPeers);
    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;

    const newConnectedPeerStrangers = connectedPeersStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeersStrangers = newConnectedPeerStrangers;
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
