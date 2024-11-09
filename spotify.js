// Elements selection
const playButton = document.querySelector('.controls button:nth-child(2)');
const prevButton = document.querySelector('.controls button:nth-child(1)');
const nextButton = document.querySelector('.controls button:nth-child(3)');
const nowPlayingElement = document.querySelector('.now-playing p');
const volumeControl = document.querySelector('.volume-control input[type="range"]');

// Array of songs (you can replace with real data or API calls)
const songs = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    file: 'path-to-song1.mp3'
  },
  {
    title: 'Song 2',
    artist: 'Artist 2',
    file: 'path-to-song2.mp3'
  },
  {
    title: 'Song 3',
    artist: 'Artist 3',
    file: 'path-to-song3.mp3'
  }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentSongIndex].file);

// Load the initial song
function loadSong(index) {
  currentSongIndex = index;
  nowPlayingElement.textContent = `Now Playing: ${songs[index].title} - ${songs[index].artist}`;
  audio.src = songs[index].file;
  audio.load();
}

// Play and Pause functionality
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playButton.innerHTML = '&#9654;'; // Play icon
  } else {
    audio.play();
    playButton.innerHTML = '&#10074;&#10074;'; // Pause icon
  }
  isPlaying = !isPlaying;
}

// Play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audio.play();
  }
}

// Play the previous song
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audio.play();
  }
}

// Volume control
function adjustVolume() {
  audio.volume = volumeControl.value / 100;
}

// Event listeners
playButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPreviousSong);
volumeControl.addEventListener('input', adjustVolume);

// Auto-play next song when current one ends
audio.addEventListener('ended', playNextSong);

// Load the first song when the page loads
loadSong(currentSongIndex);
