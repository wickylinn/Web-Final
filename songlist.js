const SONGS = [
  {
    title: "The Eagles - Hotel California",
    file: "songs/The Eagles - Hotel California.mp3",
    artist: "The Eagles",
    year: "1976",
    genre: "Rock",
    info: "A legendary rock song with a famous guitar solo. One of the most popular songs of the 70s"
  },
  {
    title: "Timur Mutsurayev - Candles are extinguished",
    file: "songs/Timur Mutsuraev The Candles Went Out.mp3",
    artist: "Timur Mutsurayev",
    year: "2000",
    genre: "Chechen Folk",
    info: "A touching song in memory of the fallen. Performed with an acoustic guitar"
  },
  {
    title: "Rihanna - Where Have You Been (DJ Tristan Orchestra Remix)",
    file: "songs/DJ_Tristan_Rihanna_Where_Have_You_Been_Orchestra_Remix_DJ.mp3",
    artist: "Rihanna (DJ Tristan Remix)",
    year: "2011",
    genre: "Pop/Electronic",
    info: "An orchestral remix of Rihanna's hit. Epic sound with electronic elements"
  },
  {
    title: "Kino - Gruppa Krovi",
    file: "songs/01 - Group Blood.mp3",
    artist: "Victor Tsoi & Kino",
    year: "1988",
    genre: "Russian Rock",
    info: "Viktor Tsoi's iconic song. A symbol of a generation and the soundtrack to the film Needle"
  },
  {
    title: "Aikyn Tolepbergen - Suigenim",
    file: "songs/Aikyn Tolepbergen - Suigenim.mp3",
    artist: "Aikyn Tolepbergen",
    year: "2020",
    genre: "Kazakh Pop Song",
    info: "A modern Kazakh ballad about love. 'Сүйгенім' means 'Beloved'"
  },
  {
    title: "Timati - Doroga v aeroport",
    file: "songs/Timati feat. Sveta Road to the Airport.mp3",
    artist: "Тimati feat. Svеtа",
    year: "2015",
    genre: "Russian Pop/Rap",
    info: "A duet about a breakup at the airport. A combination of rap and pop melodies"
  }
];

const el = {
  list: document.getElementById("songList"),
  search: document.getElementById("search"),
  player: document.getElementById("player"),
  modal: document.getElementById("songInfoModal"),
  t: (id) => document.getElementById(id)
};

let currentSongIndex = null;

function displaySongs(filter = "") {
  if (!el.list) return;
  const f = (filter || "").toLowerCase().trim();
  el.list.innerHTML = "";

  const filtered = f ? SONGS.filter(s => (s.title || "").toLowerCase().includes(f)) : SONGS;

  const frag = document.createDocumentFragment();
  filtered.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = "song d-flex align-items-center gap-3 p-3 border rounded-3";
    item.style.cssText = "cursor:pointer;transition:all 0.2s;background:var(--bg1-color);";
    item.setAttribute("data-action", "play");
    item.setAttribute("data-index", index);

    item.innerHTML = `
    <div class="song-left d-flex align-items-center" style="gap: 12px; flex: 1;">
        <img src="play.png" 
            alt="Play" 
            class="play-button" 
            style="width: 32px; height: 32px; pointer-events: none;">
        <span class="song-title" style="font-weight: 600; color: var(--text-color);">
        ${song.title}
        </span>
    </div>
    `;

    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(5px)';
      item.style.borderColor = 'var(--accent-color)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
      item.style.borderColor = 'transparent';
    });

    frag.appendChild(item);
  });

  el.list.appendChild(frag);
}

function playSong(index) {
  if (!el.player) return;
  const s = SONGS[index];
  if (!s || !s.file) return;

  el.player.src = s.file;
  const p = el.player.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function addToPlaylist(index) {
  const s = SONGS[index];
  if (!s) return;

  let playlist = [];
  try {
    playlist = JSON.parse(localStorage.getItem("playlist")) || [];
  } catch {
    playlist = [];
  }

  const exists = playlist.some(it => it.title === s.title);
  if (exists) {
    alert("This song is already in your playlist!");
    return;
  }

  playlist.push(s);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  alert(`"${s.title}" added to your playlist!`);
}

function openSongInfo(index) {
  if (!el.modal) return;
  currentSongIndex = index;
  const s = SONGS[index];
  if (!s) return;

  el.t("modalSongTitle") && (el.t("modalSongTitle").textContent = s.title || "");
  el.t("modalArtist") && (el.t("modalArtist").textContent = s.artist || "");
  el.t("modalYear") && (el.t("modalYear").textContent = s.year || "");
  el.t("modalGenre") && (el.t("modalGenre").textContent = s.genre || "");
  el.t("modalInfo") && (el.t("modalInfo").textContent = s.info || "");

  el.modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeSongModal() {
  if (!el.modal) return;
  el.modal.classList.remove("show");
  el.modal.classList.add("hide");
  document.body.style.overflow = "auto";
  setTimeout(() => {
    el.modal.classList.remove("hide");
    currentSongIndex = null;
  }, 300);
}
window.closeSongModal = closeSongModal;

el.list && el.list.addEventListener("click", (e) => {
  const item = e.target.closest("[data-action]");
  if (!item) return;
  const action = item.getAttribute("data-action");
  const index = Number(item.getAttribute("data-index"));

  if (action === "play") playSong(index);
});

const playBtn = document.getElementById("modalPlayBtn");
playBtn && playBtn.addEventListener("click", () => {
  if (currentSongIndex !== null) {
    playSong(currentSongIndex);
    closeSongModal();
  }
});

const addBtn = document.getElementById("modalAddBtn");
addBtn && addBtn.addEventListener("click", () => {
  if (currentSongIndex !== null) addToPlaylist(currentSongIndex);
});

el.modal && el.modal.addEventListener("click", (e) => {
  if (e.target === el.modal) closeSongModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && el.modal && el.modal.classList.contains("show")) {
    closeSongModal();
  }
});

let __searchTid;
el.search && el.search.addEventListener("input", () => {
  clearTimeout(__searchTid);
  __searchTid = setTimeout(() => displaySongs(el.search.value || ""), 120);
});

displaySongs();