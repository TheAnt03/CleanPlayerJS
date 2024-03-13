import VolumeBar from './volumeBar.js';
import SettingsPopup from './settingsPopup.js';

class ControlBar {
    constructor(parent, config) {
        this.parent = parent;
        this.config = config;
        this.onControls = false;

        this.controlBar = `
        <div class = "controls">
            <div class = "top">
                <div class = "progress-bar" style="height: ${this.config.progressBarHeight};">
                    <div class = "buffered"></div>
                    <div class = "progress" style="background-color: ${this.config.progressBarColor};"></div>
                </div>
            </div>
            <div class = "controls-inner" style="background-color: ${this.config.controlBarColor};">
                <div class = "left">
                </div>
                <div class = "center"></div>
                <div class = "right">
                </div>
            </div>
        </div>
        `;

        this.parent.querySelector('.player-container').insertAdjacentHTML('beforeend', this.controlBar);
        this.initButtons(config);

        this.video = this.parent.querySelector('video');
        this.playButton = this.parent.querySelector('.toggle-play');
        this.progressBar = this.parent.querySelector('.progress-bar');
        this.top = this.parent.querySelector('.top');
        
        this.fullScreenButton = this.parent.querySelector('.full-screen');

    }

    initButtons(config) {
        //foreach element in config left, center, right
        //get element and add to left center or right
        
        if(config.left === undefined) {
            config.left = [];
        }

        if(config.right === undefined) {
            config.right = [];
        }

        if(config.center === undefined) {
            config.center = [];
        }

        //foreach element in left
        for (let i = 0; i < config.left.length; i++) {
            const leftElement = this.getElement(config.left[i]);
            this.parent.querySelector('.left').innerHTML += leftElement;
        }


        for (let i = 0; i < config.center.length; i++) {
            const centerElement = this.getElement(config.center[i]);
            this.parent.querySelector('.center').innerHTML += centerElement;
        }

        //foreach element in right
        for (let i = 0; i < config.right.length; i++) {
            const rightElement = this.getElement(config.right[i]);
            this.parent.querySelector('.right').innerHTML += rightElement;
        }
    }

    getControlBar() {
        return this.controlBar;
    }

    getParent() {
        return this.parent;
    }

    playVideo() {
        if (this.video.paused) {
          this.video.play();
          this.playButton.innerHTML = `<i class="bi bi-pause-fill" style="font-size: ${this.config.buttonSize};"></i>`;
        } else {
          this.video.pause();
          this.playButton.innerHTML = `<i class="bi bi-play-fill" style="font-size: ${this.config.buttonSize};"></i>`;
        }
    }

    setTimeCounter(controls, time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

        controls.querySelector('.current-time').innerHTML = `${minutesStr}:${secondsStr}`;
    }

    setProgressBar(controls, time) {
        const progressControl = controls.querySelector('.progress');
        const timePercent = (time / this.totalTime) * 100;
        progressControl.style.width = `${timePercent}%`;
    }

    setBuffered(controls) {
        const buffered = this.video.buffered;
        if (buffered.length > 0) {
            const currentTime = buffered.end(0);
            const bufferedControl = controls.querySelector('.buffered');
            const timePercent = (currentTime / this.totalTime) * 100;
            bufferedControl.style.width = `${timePercent}%`;
        }
    }
    
    setCurrTime(controls, time) {
        this.setTimeCounter(controls, time);
        this.setProgressBar(controls, time);
    }

    setTime(controls) {
        this.video.addEventListener('timeupdate', () => {
            const time = this.video.currentTime;
            this.setCurrTime(controls, time);
        });
    }

    goFullScreen() {
        const video = this.parent.querySelector('.clean-player');
        const container = this.parent.querySelector('.player-container');
        this.fullScreenButton.innerHTML = `<i class="bi bi-fullscreen-exit" style="font-size: ${this.config.buttonSize};"></i>`

        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        }
    }

    getElement(name) {
        switch(name) {
            case 'playButton':
                return `<div class = "toggle-play"><i class="bi bi-play-fill" style="font-size: ${this.config.buttonSize};"></i></div>`;
            case 'fullScreenButton':
                return `<div class = "full-screen"><i class="bi bi-fullscreen" style="font-size: ${this.config.buttonSize};"></i></div>`;
            case 'volume':
                return `
                <div class = "volume">
                    <div class = "volume-icon"><i class="bi bi-volume-up-fill" style="font-size: ${this.config.buttonSize};"></i></div>
                    <div class = "volume-bar" style="height: ${this.config.volumeBarHeight};">
                        <div class = "volume-progress"></div>
                    </div>
                </div>`;
            case 'settings':
                return `<div class = "settings"><i class="bi bi-gear-fill" style="font-size: ${this.config.buttonSize};"></i></div>`;
            case 'time':
                return `<div class = "time">
                    <div class = "current-time" style="font-size: ${this.config.buttonSize};">00:00</div>
                    <div class = "slash" style="font-size: ${this.config.buttonSize};">/</div>
                    <div class = "total-time" style="font-size: ${this.config.buttonSize};">00:00</div>
                </div>`;
            default:
                return null;
        }
    }

    exitFullScreen() {
        this.fullScreenButton.innerHTML = `<i class="bi bi-fullscreen" style="font-size: ${this.config.buttonSize};"></i>`

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    
    toggleFullScreen() {
        if (!document.fullscreenElement) {
            this.goFullScreen();
        } else {
            this.exitFullScreen();
        }
    }

    initHideControls(controls) {
        this.video.addEventListener('mouseenter', () => {
            controls.classList.add('showControls');
        });

        controls.addEventListener('mouseenter', () => {
            controls.classList.add('showControls');
            this.onControls = true;
        });

        controls.addEventListener('mouseleave', () => {
            this.onControls = false;
            controls.classList.remove('showControls');
        });

        this.video.addEventListener('mouseleave', () => {
            if(this.onControls === false) {
                controls.classList.remove('showControls');
            }
        });
    }

    initControls() {
        const controls = this.parent.querySelector('.controls');
        const volumeElement = this.parent.querySelector('.volume-bar');
        const volumeBar = new VolumeBar(volumeElement, this.video, this.config);
        const settingsPopup = new SettingsPopup(this.parent, this.video, this.config);
        const volume = this.parent.querySelector('.volume');
        
        if(this.config.autoHideControls === true) {
            this.initHideControls(controls);
        }

        //update buffered
        this.video.addEventListener('timeupdate', () => {
            this.setBuffered(controls, 0);
        });

        this.playButton.addEventListener('click', () => {
            this.playVideo();
        });

        this.video.addEventListener('timeupdate', () => {
            this.setTime(controls);
        });

        this.video.addEventListener('loadedmetadata', () => {
            const time = this.video.duration;
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
            const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

            controls.querySelector('.total-time').innerHTML = `${minutesStr}:${secondsStr}`;
            this.totalTime = time;
        });

        this.progressBar.addEventListener('click', (e) => {
            const pos = (e.pageX - (this.top.offsetLeft + this.top.offsetParent.offsetLeft)) / this.top.offsetWidth;
            this.video.currentTime = pos * this.totalTime;
            this.setBuffered(controls, this.video.currentTime);
        });

        this.fullScreenButton.addEventListener('click', () => {
            this.toggleFullScreen();
        });

        volume.addEventListener('mouseenter', () => {
            volumeElement.classList.remove('hide');
            volumeElement.classList.add('show');
        });

        volume.addEventListener('mouseleave', () => {
            if(volumeBar.isDraggingTrue() === false) {
                volumeElement.classList.remove('show');
                volumeElement.classList.add('hide');
            }
        });
        
    }
}

export default ControlBar;