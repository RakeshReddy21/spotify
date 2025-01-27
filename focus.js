// const url = "https://spotifyclone-iztn.onrender.com/posts"; // Local API URL
uri = " https://spotify-d9n3.onrender.com/comments"

activeAudioPlayer1 = null;
tracksData1 = []

async function Playlist() {
  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    tracksData1 = data[0].items;
    Items(data[0].items);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Items(tracks) {
  const container = document.getElementById("focus-container");
  container.innerHTML = ""; 

  tracks.forEach((item) => {
    const track = item.track;

    const card = document.createElement("div");
    card.classList.add("item");

    const img = document.createElement("img");
    img.src = track.album.images[0].url;
    img.alt = track.name;

    const playIcon = document.createElement("div");
    playIcon.classList.add("play");
    playIcon.innerHTML = '<i class="fa fa-play"></i>';

    const trackTitle = document.createElement("h4");
    trackTitle.textContent = track.name;

    const artistName = document.createElement("p");
    artistName.textContent = track.artists[0].name;

    const audioPlayer = document.createElement("audio");
    audioPlayer.classList.add("audio-player");
    audioPlayer.controls = true;

    playIcon.addEventListener("click", () => {
      const previewUrl = track.preview_url;

      if (previewUrl) {
        audioPlayer.src = previewUrl;
        audioPlayer.play();

        if (activeAudioPlayer1 && activeAudioPlayer1 !== audioPlayer) {
          activeAudioPlayer1.pause();
          activeAudioPlayer1.style.display = "none";
        }

        if (
          audioPlayer.style.display === "none" ||
          audioPlayer.style.display === ""
        ) {
          audioPlayer.style.display = "block";
          activeAudioPlayer1 = audioPlayer;
        } else {
          audioPlayer.style.display = "none";
          activeAudioPlayer1 = null;
        }
      } else {
        alert("No preview available for this track.");
      }

      card.style.minWidth="200px"
      card.style.Height = "100px"
    });

    card.appendChild(img);
    card.appendChild(playIcon);
    card.appendChild(trackTitle);
    card.appendChild(artistName);
    card.appendChild(audioPlayer);

    container.appendChild(card);
  });
}



Playlist();


  