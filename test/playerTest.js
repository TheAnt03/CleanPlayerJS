// Purpose: Test the VideoPlayer class by creating a new instance of it and calling the initPlayer method with a video source.
const playerElement = document.getElementById('player');

document.addEventListener('DOMContentLoaded', () => {
    var player = new VideoPlayer(playerElement, {
        src: 'drone_1080p.mp4',
        controlBarColor: "rgba(0, 0, 0, 0.2)",
        progressBarColor: "rgba(255, 0, 0, 0.5)",
        progressBarHeight: "5px",
        buttonSize: "18px",
    });

    player.initPlayer();
});