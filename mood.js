const urx = "https://spotify-d9n3.onrender.com/profile";

let activeAudioPlayer2 = null;

async function PlaylistSongs() {
  try {
    const response = await fetch(urx, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    if (data && Array.isArray(data) && data[0]?.items) {
      newItems(data[0].items);
    } else {
      console.error("Unexpected data structure:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function newItems(tracks) {
  const container = document.getElementById("mood-container");
  container.innerHTML = ""; // Clear previous content

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

        document.querySelectorAll(".audio-player").forEach((audio) => {
          if (audio !== audioPlayer) {
            audio.pause();
            audio.style.display = "none";
          }
        });

        audioPlayer.style.display =
          audioPlayer.style.display === "none" ? "block" : "none";
        activeAudioPlayer2 = audioPlayer;
      } else {
        alert("No preview available for this track.");
      }
    });

    card.appendChild(img);
    card.appendChild(playIcon);
    card.appendChild(trackTitle);
    card.appendChild(artistName);
    card.appendChild(audioPlayer);

    container.appendChild(card);
  });
}
function filter() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredTracks = tracksData.filter((item) =>
      item.track.name.toLowerCase().includes(searchTerm) ||
      item.track.artists[0].name.toLowerCase().includes(searchTerm)
    );
    newItems(filteredTracks);
}

PlaylistSongs();
