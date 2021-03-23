let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let heart = document.querySelector(".fa-heart");
let repeat = document.querySelector(".fa-sync-alt");

let track_index = 0;
let isPlaying = false;
let updateTimer;
let HclickCount = 0;
let repeatCount = 0;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  /*{
    name: "Night Owl",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },*/
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  updateName();
  updateIndex();
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function updateIndex() {
  if (!track_list.length) {
    now_playing.textContent = "No Song Found";
  } else {
    now_playing.textContent =
      "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  }
}
function updateName() {
  if (!track_list.length) {
    track_name.textContent = "";
    track_artist.textContent = "";
    track_art.style.backgroundImage = "url()";
    console.log(0215);
  } else {
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    track_art.style.backgroundImage =
      "url(" + track_list[track_index].image + ")";
  }
}
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
updateName();
// Load the first track in the tracklist
if (track_list.length > 0) {
  loadTrack(track_index);
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function repeatTrack() {
  if (!(repeatCount % 2)) {
    repeat.style.color = "#000";
  } else {
    repeat.style.color = "#fff";
  }
  repeatCount++;
  //console.log(repeatCount)
}

function nextTrack() {
  if (!(repeatCount % 2)) {
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
  }

  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function removeFromPlaylist() {
  if (HclickCount % 2) {
    heart.style.color = "#f5587b";
  } else {
    heart.style.color = "#fff";
  }
  HclickCount++;
  if (track_list.length > 1) {
    removeElement(track_list, track_index);
    nextTrack();
  }

  setTimeout(() => {
    heart.style.color = "#f5587b";

    console.log(track_list.length);
  }, 500);

  if (track_list.length <= 1) {
    heart.addEventListener("click", () => {
      swal({
        text: "Sorry, the Playlist can't be empty !!!",
        icon: "warning",
      });
    });
  }
}

let muteCount = 0;

///         Input Styling
var inputs = document.querySelectorAll(".file-input");

for (var i = 0, len = inputs.length; i < len; i++) {
  customInput(inputs[i]);
}

function customInput(el) {
  const fileInput = el.querySelector('[type="file"]');
  const label = el.querySelector("[data-js-label]");

  fileInput.onchange = fileInput.onmouseout = function () {
    if (!fileInput.value) return;

    var value = fileInput.value.replace(/^.*[\\\/]/, "");
    el.className += " -chosen";
    label.innerText = value;
  };
}

function removeElement(array, index) {
  if (index > -1) {
    array.splice(index, 1);
  }
}

document.addEventListener("keypress", function (e) {
  if (e.keyCode == 32) {
    playpauseTrack();
  }
});
window.addEventListener("load", () => {
  if (!track_list.length) {
    now_playing.innerText = "No Song Found";
    console.log(1);
  }
});
/*heart.addEventListener("click", () => {
  swal({
    text: "Sorry, the Playlist can't be empty !!!",
    icon: "warning",
  });
});*/

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 77) {
    if (muteCount % 2 == 0) {
      curr_track.muted = true;
      muteCount++;
      console.log(true);
    } else {
      curr_track.muted = false;
      muteCount++;
      console.log(false);
    }
  }
});
