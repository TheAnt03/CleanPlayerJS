// Purpose: Test the VideoPlayer class by creating a new instance of it and calling the initPlayer method with a video source.
const playerElement = document.getElementById('player');

document.addEventListener('DOMContentLoaded', () => {
    var player = new VideoPlayer(playerElement, {
        src: 'drone_1080p.mp4',
        buttonSize: "15px",
        volumeBarHeight: "5px",
        playbackBarHeight: "8px",
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
    });

    player.initPlayer();
});