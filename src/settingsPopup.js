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

import PlaybackSpeed from './playbackSpeedBar.js';
import Resolution from './resolution.js';

class SettingsPopup {
  constructor(parent, video, config) {
    this.parent = parent;
    this.config = config;
    this.video = video;
    this.settingsPopupHTML = `
        <div class = "settings-popup" style = "background-color: ${this.config.controlBarColor};">
            <div class = "settings-popup-content">
            </div>
        </div>
    `;

    const top = this.parent.querySelector('.top');
    
    top.insertAdjacentHTML('beforeend', this.settingsPopupHTML);

    this.settingsPopup = top.querySelector('.settings-popup-content');
    this.settingsPopup.classList.add('hidden');

    const playbackSpeed = new PlaybackSpeed(this.settingsPopup, this.video, this.config);
    const resolution = new Resolution(this.settingsPopup, this.video, this.config);
  }

  togglePopup() {
    this.settingsPopup.classList.toggle('hidden');
    this.settingsPopupContent.classList.toggle('hidden');
  }
}

export default SettingsPopup;