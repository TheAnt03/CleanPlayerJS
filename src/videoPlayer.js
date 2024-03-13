/*
// (c) 2024 Anthony Marcellino
// This code is licensed under Apache 2.0 License (see LICENSE for details)
*/

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