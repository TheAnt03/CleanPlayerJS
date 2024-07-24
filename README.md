<h1>Clean Player</h1>
<article>
  <p>I made this library to make it easy to set up a custom video player. You can customize almost anything to your liking.</p>
  <p>You can set almost anything involving the style and layout</p>
</article>

<h2>Set Up</h2>
<article>
  <h4>Getting The File</h4>
  <p>Download build from /dist/cleanPlayer.js and include it in your JS, or install it with npm install cleanplayerjs</p>
  <p>Don't forget to include clean-video-player.css and bootstrap icons!</p>
  <br/>
  <h4>Using the library</h4>
  <p>Set up your HTML to include a starting div</p>
  
  <p>Attached is a sample JS to get you started. This sample is similar to youtubes video player</p>

  <p>Also don't forget to include Bootstrap Icons in your project</p>
  <blockquote>
    
    const playerElement = document.getElementById('player');
    
    document.addEventListener('DOMContentLoaded', () => {
        var player = new VideoPlayer(playerElement, {
            src: 'drone_1080p.mp4',
            progressBarColor: "rgba(255, 0, 0, 0.5)",
            progressBarHeight: "5px",
            buttonSize: "18px",
        });
    
        player.initPlayer();
    });
  </blockquote>

  <p>You can view available config values in src/defaults.js</p>
</article>
