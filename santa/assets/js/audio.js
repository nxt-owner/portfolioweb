document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    
    if (!music) return;
    
    // Set volume to 30%
    music.volume = 1;
    
    // Handle autoplay with user interaction requirement
    const playMusic = () => {
        music.play().then(() => {
            console.log('Background music playing at 30% volume');
        }).catch(error => {
            console.log('Autoplay prevented. Music will play after user interaction.');
        });
    };
    
    // Try to play immediately
    playMusic();
    
    // Also try to play on any user interaction (for browsers that block autoplay)
    document.addEventListener('click', () => {
        if (music.paused) {
            playMusic();
        }
    }, { once: true }); // Only try once
    
    // Optional: Resume music when tab becomes active
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && music.paused) {
            playMusic();
        }
    });
});