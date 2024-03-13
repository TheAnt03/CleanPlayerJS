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

class Resolution {
    constructor(parent, video, config) {
        this.parent = parent;
        this.config = config;
        this.video = video;

        this.resolutionHTML = `
            <div class = "settings-label">
                <label for = "resolution">Resolution</label>
            </div>
            <div class = "setting">
                <select class = "resolution">
                    ${
                        this.config.resolutions.map((resolution) => {
                            return `<option value = "${resolution}">${resolution}</option>`;
                        }).join('')
                    }
                </select>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', this.resolutionHTML);

        this.resolutionSelect = this.parent.querySelector('.resolution');

        this.resolutionSelect.addEventListener('change', (e) => {
            this.setResolution(e.target.value);
        });
    }

    setResolution(resolution) {
        const source = this.video.querySelector('source');
        const oldTime = this.video.currentTime;
        source.src = source.src.replace(/(\d+p)/, resolution);

        this.video.load();
        this.video.currentTime = oldTime;
        this.video.play();
    }


}

export default Resolution;