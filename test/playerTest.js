// Purpose: Test the VideoPlayer class by creating a new instance of it and calling the initPlayer method with a video source.
const playerElement = document.getElementById('player');

document.addEventListener('DOMContentLoaded', () => {
    var player = new VideoPlayer(playerElement, {
        src: 'drone_1080p.mp4',
        //Youtubes Red color
        progressBarColor: "rgba(255, 0, 0, 0.5)",
    });

    player.initPlayer();
});