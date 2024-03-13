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

export default defaults;