/*
// (c) 2024 Anthony Marcellino
// This code is licensed under Apache 2.0 License (see LICENSE for details)
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