(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CleanPlayer"] = factory();
	else
		root["CleanPlayer"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _videoHTML_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



class VideoPlayer {
  constructor(playerElement, config) {
    this.config = { ..._defaults_js__WEBPACK_IMPORTED_MODULE_1__["default"], ...config };
    this.playerElement = playerElement;
  }

  initPlayer() {
    const videoHTML = new _videoHTML_js__WEBPACK_IMPORTED_MODULE_0__.VideoHTML(this.config, this.playerElement);
    videoHTML.generateHTML();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoHTML: () => (/* binding */ VideoHTML)
/* harmony export */ });
/* harmony import */ var _controlBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


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
        this.controlBar = new _controlBar_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.playerElement, this.config);
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


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _volumeBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _settingsPopup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



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
        this.settingsButton = this.parent.querySelector('.settings');

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
        const volumeBar = new _volumeBar_js__WEBPACK_IMPORTED_MODULE_0__["default"](volumeElement, this.video, this.config);
        const settingsPopup = new _settingsPopup_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.parent, this.video, this.config);
        const volume = this.parent.querySelector('.volume');
        volumeElement.classList.add('hide');
        
        if(this.config.autoHideControls) {
            this.initHideControls(controls);
        } else {
            controls.classList.add('showControls');
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

        this.settingsButton.addEventListener('click', () => {
            settingsPopup.togglePopup();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ControlBar);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VolumeBar);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _playbackSpeedBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _resolution_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



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

    const playbackSpeed = new _playbackSpeedBar_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.settingsPopup, this.video, this.config);
    const resolution = new _resolution_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.settingsPopup, this.video, this.config);
  }

  togglePopup() {
    this.settingsPopup.classList.toggle('hidden');
    this.settingsPopupContent.classList.toggle('hidden');
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsPopup);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class PlaybackSpeed {
    constructor(parent, video, config) {
        this.parent = parent;
        this.config = config;

        this.playbackSpeedHTML = `
            <div class = "settings-label">
                <label for = "playback-speed">Playback Speed</label>
            </div>
            <div class = "setting">
                <div class = "playback-speed">
                    <div class = "playback-speed-bar" style="height: ${this.config.playbackBarHeight};">
                        <div class = "playback-speed-progress"></div>
                    </div>
                    <div class = "playback-speed-info">
                        <span class = "playback-speed-value">1.0x</span>
                        <i class = "bi bi-arrow-clockwise playback-speed-reset"></i>
                    </div>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', this.playbackSpeedHTML);

        this.playbackSpeedElement = this.parent.querySelector('.playback-speed');
        this.playbackSpeedBar = this.playbackSpeedElement.querySelector('.playback-speed-bar');
        this.playbackSpeedInfo = this.playbackSpeedElement.querySelector('.playback-speed-info');
        this.playbackSpeedValue = this.playbackSpeedElement.querySelector('.playback-speed-value');
        this.playbackSpeedReset = this.playbackSpeedElement.querySelector('.playback-speed-reset');

        this.video = video;
        this.config = config;
        this.playbackSpeed = 0.5;

        this.isDragging = false;

        this.playbackSpeedBar.addEventListener('mousedown', (e) => {            
            this.isDragging = true;
        });

        this.playbackSpeedBar.addEventListener('mouseup', (e) => {
            this.isDragging = false;
        });

        this.playbackSpeedReset.addEventListener('click', (e) => {
            this.setPlaybackSpeed(100);
        });

        document.addEventListener('mouseup', (e) => {
            this.isDragging = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const playbackSpeedElementOffsetLeft = this.playbackSpeedBar.getBoundingClientRect().left;
                const offsetXRelativeToPlaybackSpeedElement = e.clientX - playbackSpeedElementOffsetLeft;
                
                const playbackSpeed = Math.min(Math.max(offsetXRelativeToPlaybackSpeedElement / this.playbackSpeedBar.offsetWidth * 100, 0), 100);
                this.setPlaybackSpeed(playbackSpeed*2);
            }
        });

    }
    
    setPlaybackSpeed(playbackSpeed) {
        this.playbackSpeed = Math.max(0.1, playbackSpeed/100);
        this.playbackSpeedElement.querySelector('.playback-speed-progress').style.width = `${this.playbackSpeed*100/2}%`;

        this.video.playbackRate = this.playbackSpeed;
        

        this.playbackSpeedValue.innerHTML = `${(this.playbackSpeed).toFixed(1)}x`;
    }

    isDraggingTrue() {
        return this.isDragging;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaybackSpeed);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Resolution);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const defaults = {
    src: 'drone_1080p.mp4',
    buttonSize: "15px",
    volumeBarHeight: "5px",
    playbackBarHeight: "8px",
    controlBarColor: "rgba(0, 0, 0, 0.5)",
    progressBarColor: "rgba(255, 255, 255, 0.5)",
    progressBarHeight: "5px",
    autoHideControls: true,
    left: [
        "playButton",
        "volume",
        "time"
    ],
    right: [
        "settings",
        "fullScreenButton"
    ],
    resolutions: [
        "1080p",
        "720p",
        "480p",
        "360p"
    ]
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaults);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _videoPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


window.VideoPlayer = _videoPlayer_js__WEBPACK_IMPORTED_MODULE_0__["default"];
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});