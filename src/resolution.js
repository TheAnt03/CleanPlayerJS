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

export default Resolution;