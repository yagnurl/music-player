const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs = [
    {
        name: 'cover-1',
        displayName: 'Counting Star',
        artist: 'One Republic',
    },
    {
        name: 'cover-2',
        displayName: 'Islak Kelebek',
        artist: 'Cem Adrian',
    },
    {
        name: 'cover-3',
        displayName: 'Time Is Running Out',
        artist: 'Muse',
    },
    {
        name: 'cover-4',
        displayName: 'Bohemian Rapsody',
        artist: 'Queen',
    },
    {
        name: 'cover-5',
        displayName: 'Sakın Uyanma',
        artist: 'Da Froi',
    },
];



// Check if playing 
let isPlaying = false;

// Play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause 
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update  DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Curretn Song 
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement; // srcElement is actually audio (Consolda srcElementin alt attributelarında duration ve currentTime var.)
        // srcElement'in içindeki duration ve currentTime'ı çekip soldakilere eşitliyor.

        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// Set ProgressBar 
/* Progress Bar'ın herhnagi bir yerine tıkladığımızda şarkının o kısmına gitmesini istiyoruz ve yapacağımız şey: 
   ProgressBar'ın widthini bulup (clientWidth propertysi) total widthe bölerek yüzdesini bulmak. */
function setProgressBar(e) {
 
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration} = music; 
    // console.log(clickX / width);   progress barın ilerleme yüzdesi
    // console.log((clickX / width) * duration); yüzdeyi şarkının toplam uzunluğu ile çarparsak, saniye bazında ilerlemeyi görürüz.
    music.currentTime = ((clickX / width) * duration);  //cuurrentTime attribute'u bize audio'daki current positionı döndürür. 
}

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);