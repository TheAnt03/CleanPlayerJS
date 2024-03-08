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

    const settingsPopup = top.querySelector('.settings-popup-content');
    const playbackSpeed = new PlaybackSpeed(settingsPopup, this.video, this.config);
    const resolution = new Resolution(settingsPopup, this.video, this.config);
  }

  togglePopup() {
    this.settingsPopup.classList.toggle('hidden');
    this.settingsPopupContent.classList.toggle('hidden');
  }
}

export default SettingsPopup;