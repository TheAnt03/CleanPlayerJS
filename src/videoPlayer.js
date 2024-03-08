import { VideoHTML } from './videoHTML.js';

class VideoPlayer {
  constructor(playerElement, config) {
    this.config = config;
    this.playerElement = playerElement;
  }

  initPlayer() {
    const videoHTML = new VideoHTML(this.config, this.playerElement);
    videoHTML.generateHTML();
  }
}

export default VideoPlayer;