// MUSIC API INTEGRATION (Last.fm) 
// Get your free API key at: https://www.last.fm/api/account/create

const LASTFM_API_KEY = 'b25b959554ed76058ac220b7b2e0a026';
const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0/';

async function searchTracks(query) {
  if (!query || query.trim().length === 0) return [];
  
  try {
    const response = await fetch(
      `${LASTFM_BASE}?method=track.search&track=${encodeURIComponent(query)}&api_key=${LASTFM_API_KEY}&format=json&limit=10`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const tracks = data.results?.trackmatches?.track || [];
    
    return tracks.map(track => ({
      title: `${track.artist} - ${track.name}`,
      artist: track.artist,
      year: "Unknown",
      genre: "Various",
      info: `Popular track on Last.fm with ${track.listeners || 'many'} listeners`,
      file: "", 
      image: track.image?.[2]?.['#text'] || ""
    }));
  } catch (error) {
    console.error('Search API Error:', error);
    return [];
  }
}

async function getTopTracks(limit = 20) {
  try {
    const response = await fetch(
      `${LASTFM_BASE}?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const tracks = data.tracks?.track || [];
    
    return tracks.map(track => ({
      title: `${track.artist.name} - ${track.name}`,
      artist: track.artist.name,
      year: "2024",
      genre: "Popular",
      info: `Top charting track with ${track.playcount} plays on Last.fm`,
      file: "",
      image: track.image?.[2]?.['#text'] || ""
    }));
  } catch (error) {
    console.error('Top Tracks API Error:', error);
    return [];
  }
}

async function getArtistInfo(artistName) {
  try {
    const response = await fetch(
      `${LASTFM_BASE}?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_API_KEY}&format=json`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.artist || null;
  } catch (error) {
    console.error('Artist Info API Error:', error);
    return null;
  }
}

async function getSimilarTracks(artist, track, limit = 10) {
  try {
    const response = await fetch(
      `${LASTFM_BASE}?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const tracks = data.similartracks?.track || [];
    
    return tracks.map(track => ({
      title: `${track.artist.name} - ${track.name}`,
      artist: track.artist.name,
      year: "Unknown",
      genre: "Similar",
      info: `Similar to your taste. Match: ${Math.round(track.match * 100)}%`,
      file: "",
      image: track.image?.[2]?.['#text'] || ""
    }));
  } catch (error) {
    console.error('Similar Tracks API Error:', error);
    return [];
  }
}

function showAPILoading(container) {
  if (!container) return;
  
  container.innerHTML = `
    <div style="text-align: center; padding: 40px; color: var(--text-color);">
      <div style="font-size: 48px; margin-bottom: 20px;">Music</div>
      <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Loading music from API...</div>
      <div style="font-size: 14px; opacity: 0.7;">Please wait</div>
    </div>
  `;
}

function showAPIError(container, message = "Failed to load music") {
  if (!container) return;
  
  container.innerHTML = `
    <div style="text-align: center; padding: 40px; color: var(--text-color);">
      <div style="font-size: 48px; margin-bottom: 20px;">Error</div>
      <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${message}</div>
      <div style="font-size: 14px; opacity: 0.7;">Please try again later</div>
    </div>
  `;
}

function initMusicAPI() {
  console.log('Music API Integration Loaded');

  if (window.location.pathname.includes('listen.html')) {
    addAPISearchButton();
  }
}

function addAPISearchButton() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;
  
  const apiButton = document.createElement('button');
  apiButton.textContent = 'Search Online';
  apiButton.style.cssText = `
    margin-left: 10px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  `;
  
  apiButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Please enter a search term');
      return;
    }
    
    const songList = document.getElementById('songList');
    showAPILoading(songList);
    
    const results = await searchTracks(query);
    
    if (results.length === 0) {
      showAPIError(songList, 'No results found');
      return;
    }
    
    displayAPIResults(results);
  });
  
  searchInput.parentElement.appendChild(apiButton);
}

// ———————————————————————————————————
// BEAUTIFUL DISPLAYAPIRESULTS (DROP-IN)
// ———————————————————————————————————
function displayAPIResults(tracks) {
  const songList = document.getElementById('songList');
  if (!songList) return;

  // === HEADER: Luxurious Gradient Banner ===
  const header = document.createElement('div');
  header.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    padding: 1.1rem 1.6rem;
    border-radius: 18px;
    margin-bottom: 1.6rem;
    text-align: center;
    font-weight: 700;
    font-size: 1.2rem;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.28);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    letter-spacing: 0.3px;
  `;
  header.innerHTML = `<strong>Online Search Results (${tracks.length} tracks)</strong>`;
  songList.innerHTML = '';
  songList.appendChild(header);

  // === EACH TRACK: Premium Card ===
  tracks.forEach(track => {
    const item = document.createElement('div');
    item.className = 'api-result-card';
    item.style.cssText = `
      display: flex;
      align-items: center;
      gap: 1.1rem;
      padding: 1.1rem 1.3rem;
      background: var(--bg-color);
      border-radius: 18px;
      margin-bottom: 1.1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.09);
      transition: all 0.28s ease;
      border: 1px solid rgba(0, 0, 0, 0.06);
    `;

    // Hover Lift
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px)';
      item.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.16)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.09)';
    });

    // === Image or Icon ===
    const imgHtml = track.image
      ? `<img src="${track.image}" alt="${track.artist}" 
            style="width: 60px; height: 60px; border-radius: 14px; object-fit: cover; box-shadow: 0 3px 8px rgba(0,0,0,0.12);">`
      : `<div style="
            width: 60px; height: 60px; 
            background: var(--accent-color); 
            border-radius: 14px; 
            display: flex; align-items: center; justify-content: center; 
            font-size: 2rem; color: white; 
            box-shadow: 0 3px 8px rgba(227,44,43,0.22);
          ">Music</div>`;

    // === Add to Playlist (Star) ===
    const addBtn = document.createElement('button');
    addBtn.title = 'Add to playlist';
    addBtn.innerHTML = 'Star';
    addBtn.style.cssText = `
      background:none; border:none; font-size:1.5rem; cursor:pointer;
      color:#cbd5e0; transition:all .22s;
    `;
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof musicPlayer !== 'undefined' && musicPlayer.addSong) {
        musicPlayer.addSong({
          title: track.title.split(' - ')[1],
          artist: track.artist,
          file: track.file || '',
        });
        addBtn.style.color = '#48bb78';
        setTimeout(() => addBtn.style.color = '#cbd5e0', 1500);
      } else {
        alert('Added: ' + track.title);
      }
    });

    // === Info Button ===
    const infoBtn = document.createElement('button');
    infoBtn.title = 'More info';
    infoBtn.innerHTML = 'Info';
    infoBtn.style.cssText = `
      background:none; border:none; font-size:1.5rem; cursor:pointer;
      color:#667eea; transition:transform .22s;
    `;
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showSongModal?.({
        title: track.title.split(' - ')[1],
        artist: track.artist,
        year: track.year,
        genre: track.genre,
        info: track.info,
        file: track.file,
        image: track.image,
      });
    });
    infoBtn.addEventListener('mouseenter', () => infoBtn.style.transform = 'rotate(15deg)');
    infoBtn.addEventListener('mouseleave', () => infoBtn.style.transform = '');

    // === Assemble ===
    item.innerHTML = `
      ${imgHtml}
      <div style="flex:1; min-width:0;">
        <div style="
          font-weight:700;
          font-size:1.06rem;
          color:var(--text-color);
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          margin-bottom:0.25rem;
        ">${track.title}</div>
        <div style="
          font-size:0.89rem;
          color:#718096;
          line-height:1.4;
        ">${track.info}</div>
      </div>
    `;

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex; gap:0.6rem;';
    actions.appendChild(addBtn);
    actions.appendChild(infoBtn);
    item.appendChild(actions);

    songList.appendChild(item);
  });
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    searchTracks,
    getTopTracks,
    getArtistInfo,
    getSimilarTracks,
    initMusicAPI
  };
}

// Auto-initialize
if (typeof window !== 'undefined') {
  window.MusicAPI = {
    searchTracks,
    getTopTracks,
    getArtistInfo,
    getSimilarTracks
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicAPI);
  } else {
    initMusicAPI();
  }
}