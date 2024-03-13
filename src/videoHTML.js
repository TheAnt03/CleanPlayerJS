/*
 * Copyright 2024 Anthony Marcellino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
        
        this.playerElement.addEventListener('dblclick', () => {
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