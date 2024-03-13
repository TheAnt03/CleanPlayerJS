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

class VolumeBar {
    constructor(volumeElement, video, config) {
        this.volumeElement = volumeElement;
        this.video = video;
        this.config = config;
        this.volume = 100;

        this.isDragging = false;

        this.volumeElement.addEventListener('mousedown', (e) => {
            this.isDragging = true;
        });

        this.volumeElement.addEventListener('mouseup', (e) => {
            this.isDragging = false;
        });

        document.addEventListener('mouseup', (e) => {
            this.isDragging = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const volumeElementOffsetLeft = this.volumeElement.getBoundingClientRect().left;
                const offsetXRelativeToVolumeElement = e.clientX - volumeElementOffsetLeft;
                
                const volume = Math.min(Math.max(offsetXRelativeToVolumeElement / this.volumeElement.offsetWidth * 100, 0), 100);
                this.setVolume(volume);
            }
        });
    }
    
    setVolume(volume) {
        this.volume = volume;
        this.volumeElement.querySelector('.volume-progress').style.width = `${volume}%`;
        this.video.volume = volume / 100;
    }
    
    getVolume() {
        return this.volume;
    }

    isDraggingTrue() {
        return this.isDragging;
    }
}

export default VolumeBar;