import socketIo from "socket.io";

export interface RoomList {
  [key: string]: RoomInfo;
}

export interface RoomInfo {
  name: string;
  default: boolean;
  private: boolean;
  videoTitle: string;
  videoId: string;
  playerState: PlayerState;
  videoQueue: Video[];
}

export interface EventTimestamp {
  secondsElapsed: number;
  timestamp: number;
}

export interface VideoState {
  secondsElapsed: number;
  playerState: PlayerState;
}

export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  channel: string;
  lengthInSeconds: number;
}

export interface Message {
  user?: string;
  message: string;
}

export interface VideoStateUpdate {
  socketId: string;
  videoState: VideoState;
}

export interface RoomSocket extends socketIo.Socket {
  username?: string;
}
