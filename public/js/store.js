import * as constants from "./constants.js";

let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  allowConnectionsFromStrangers: false,
  screenSharingActive: false,
  callState: constants.callState.CALL_AVAILABLE_ONLY_CHAT,
};

export const setSocketId = (socketId) => {
  state = {
    ...state,
    socketId: socketId,
  };

  console.log(state);
};

export const setLocalStream = (localStream) => {
  state = {
    ...state,
    localStream: localStream,
  };
};

export const setAllowConnectionsFromStrangers = (allowConnection) => {
  state = {
    ...state,
    allowConnectionsFromStrangers: allowConnection,
  };
};

export const setScreenSharingActive = (active) => {
  state = {
    ...state,
    screenSharingActive: active,
  };
};

export const setScreenSharingStream = (stream) => {
  state = {
    ...state,
    screenSharingStream: stream,
  };
};

export const setRemoteStream = (stream) => {
  state = {
    ...state,
    remoteStream: stream,
  };
};

export const setCallState = (callState) => {
  state = {
    ...state,
    callState,
  };
};

export const getState = () => {
  return state;
};
