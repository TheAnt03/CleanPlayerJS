/*
// (c) 2024 Anthony Marcellino
// This code is licensed under Apache 2.0 License (see LICENSE for details)
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