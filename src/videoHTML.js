/*
// (c) 2024 Anthony Marcellino
// This code is licensed under Apache 2.0 License (see LICENSE for details)
*/

import ControlBar from './controlBar.js';

class VideoHTML {
    generateHTML() {
        this.html = `
                <div id = "testVideoPlayerStyle" class = "player-container">
                    <video class = "clean-player" playsinline webkit-playsinline>
                        <source src="${this.src}" type="video/${this.src.split('.').pop()}">
                    </video>
                </div>
            `;

        this.playerElement.innerHTML = this.html;

        this.initControls();
    }

    getHTML() {
        return this.html;
    }

    initControls() {
        this.controlBar = new ControlBar(this.playerElement, this.config);
        this.controlBar.initControls();

        const video = this.playerElement.querySelector('.clean-player');
        video.controls = false;
        
        playerElement.addEventListener('dblclick', () => {
            this.controlBar.toggleFullScreen();
        });

        video.addEventListener('click', () => {
            this.controlBar.playVideo();
        });
    }

    constructor(config, playerElement) {
        this.config = config;
        this.src = config.src;
        this.playerElement = playerElement; 
    }
}
export { VideoHTML };