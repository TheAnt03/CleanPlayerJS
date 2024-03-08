import { VideoHTML } from './videoHTML.js';
import defaults from './defaults.js';

class VideoPlayer {
  constructor(playerElement, config) {
    this.config = { ...defaults, ...config };
    this.playerElement = playerElement;
  }

  initPlayer() {
    const videoHTML = new VideoHTML(this.config, this.playerElement);
    videoHTML.generateHTML();
  }
}

export default VideoPlayer;