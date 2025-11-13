function initFormValidation(){
  const form=document.getElementById('register-form'); if(!form) return;
  const createErrorElement=m=>{const e=document.createElement('div');e.className='error-message';e.style.cssText='color:#e74c3c;font-size:13px;margin-top:5px;display:block';e.textContent=m;return e};
  const clearErrors=()=>{document.querySelectorAll('.error-message').forEach(el=>el.remove());document.querySelectorAll('.is-invalid').forEach(el=>{el.classList.remove('is-invalid');el.style.borderColor=''})};
  const showError=(input,m)=>{input.style.borderColor='#e74c3c';input.classList.add('is-invalid');input.parentElement.appendChild(createErrorElement(m))};
  const validateEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone=p=>/^[\d\s+\-()]+$/.test(p)&&p.replace(/\D/g,'').length>=10;
  const validatePassword=p=>p.length>=8;

  form.addEventListener('submit',e=>{
    e.preventDefault(); clearErrors();
    const username=document.getElementById('username');
    const phone=document.getElementById('phone');
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    const confirmPassword=document.getElementById('confirm-password');
    let ok=true;
    if(!username.value.trim()) {showError(username,'Full name is required');ok=false}
    else if(username.value.trim().length<2){showError(username,'Name must be at least 2 characters');ok=false}
    if(!phone.value.trim()){showError(phone,'Phone number is required');ok=false}
    else if(!validatePhone(phone.value)){showError(phone,'Please enter a valid phone number');ok=false}
    if(!email.value.trim()){showError(email,'Email is required');ok=false}
    else if(!validateEmail(email.value)){showError(email,'Please enter a valid email address');ok=false}
    if(!password.value){showError(password,'Password is required');ok=false}
    else if(!validatePassword(password.value)){showError(password,'Password must be at least 8 characters long');ok=false}
    if(!confirmPassword.value){showError(confirmPassword,'Please confirm your password');ok=false}
    else if(password.value!==confirmPassword.value){showError(confirmPassword,'Passwords do not match');ok=false}

    if(ok){
      const user={username:username.value.trim(),phone:phone.value.trim(),email:email.value.trim(),password:password.value,avatar:null,friends:[],registeredAt:new Date().toISOString()};
      localStorage.setItem('user',JSON.stringify(user));
      const msg=document.createElement('div');
      msg.style.cssText='background:#2ecc71;color:#fff;padding:15px;border-radius:10px;margin:20px 0;text-align:center;font-weight:bold';
      msg.textContent='✓ Registration successful! Redirecting...';
      form.insertBefore(msg,form.firstChild);
      setTimeout(()=>{window.location.href='profile.html'},1500);
    }
  });

  ['username','phone','email','password','confirm-password'].forEach(id=>{
    const input=document.getElementById(id);
    if(input){
      input.addEventListener('blur',()=>{
        input.parentElement.querySelectorAll('.error-message').forEach(e=>e.remove());
        input.style.borderColor=''; input.classList.remove('is-invalid');
      });
    }
  });
}

function initAccordion(){
  const faqHeadingExists = Array.from(document.querySelectorAll('h1,h2,h3,h4'))
    .some(h => /^\s*Frequently Asked Questions\s*$/i.test(h.textContent));
  if (faqHeadingExists || document.querySelector('.faq-section')) return;

  const html=`
    <div class="faq-section" data-faq="true" style="max-width:800px;margin:40px auto;padding:20px">
      <h2 style="text-align:center;margin-bottom:30px;color:var(--text-color)">Frequently Asked Questions</h2>
      <div class="accordion">
        ${[
          ['What is Play Beat?','Play Beat is your personal music streaming platform where you can listen to millions of songs, create playlists, and discover new music from around the world.'],
          ['How do I create a playlist?','Simply browse songs, click the "+" button next to any track you like, and it will be automatically added to your personal playlist. You can manage your playlist from the "My Playlist" page.'],
          ['Is Play Beat free to use?','Yes! Play Beat offers a free tier with unlimited music streaming. We also offer premium features for an enhanced experience without ads and with offline downloads.'],
          ['Can I use Play Beat on multiple devices?','Absolutely! Your account syncs across all your devices - phone, tablet, and computer. Your playlists and preferences are always available wherever you log in.'],
          ['How do I change my theme?','Click the "Toggle Theme" button in the navigation menu to switch between light and dark modes. Your preference will be saved automatically.']
        ].map(([q,a])=>`
          <div class="accordion-item">
            <button class="accordion-header"><span>${q}</span><span class="accordion-icon">+</span></button>
            <div class="accordion-content"><p>${a}</p></div>
          </div>`).join('')}
      </div>
    </div>
    <style>
      .accordion-item{background:var(--bg1-color);margin-bottom:15px;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);transition:.3s}
      .accordion-item:hover{box-shadow:0 4px 12px rgba(0,0,0,.15);transform:translateY(-2px)}
      .accordion-header{width:100%;padding:20px 25px;background:transparent;border:none;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:18px;font-weight:600;color:var(--text-color);text-align:left;transition:.3s}
      .accordion-header:hover{background:var(--accent-color);color:var(--bg-color)}
      .accordion-icon{font-size:24px;font-weight:700;transition:transform .3s;color:var(--accent-color)}
      .accordion-header:hover .accordion-icon{color:var(--bg-color)}
      .accordion-item.active .accordion-icon{transform:rotate(45deg)}
      .accordion-content{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease;background:var(--bg-color)}
      .accordion-item.active .accordion-content{max-height:500px;padding:20px 25px}
      .accordion-content p{margin:0;line-height:1.6;color:var(--text-color);font-size:15px}
    </style>`;

  const points=[document.querySelector('.container.my-5'),document.querySelector('main'),document.querySelector('.container')];
  const target=points.find(Boolean);
  if(target){
    const wrap=document.createElement('div'); wrap.innerHTML=html; target.appendChild(wrap);

    document.querySelectorAll('.accordion-header').forEach(h=>h.addEventListener('click',()=>{
      const item=h.parentElement; const active=item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i=>{if(i!==item)i.classList.remove('active')});
      item.classList.toggle('active',!active);
    }));
  }
}


function initPopupForm(){
  const html=`
    <div id="subscription-popup" class="popup-overlay" style="display:none">
      <div class="popup-content">
        <button class="popup-close" aria-label="Close popup">&times;</button>
        <h2 style="color:var(--accent-color);margin-bottom:10px">Subscribe to Play Beat</h2>
        <p style="margin-bottom:25px;opacity:.8">Get the latest music news and exclusive updates!</p>
        <form id="subscription-form" class="popup-form">
          <div class="form-group"><label for="sub-name">Your Name</label><input type="text" id="sub-name" placeholder="Enter your name" required></div>
          <div class="form-group"><label for="sub-email">Email Address</label><input type="email" id="sub-email" placeholder="your@email.com" required></div>
          <div class="form-group" style="text-align:left">
            <label style="display:flex;align-items:center;cursor:pointer">
              <input type="checkbox" id="sub-newsletter" style="width:auto;margin-right:10px"><span>I want to receive weekly newsletter</span>
            </label>
          </div>
          <button type="submit" class="popup-submit-btn">Subscribe Now</button>
        </form>
      </div>
    </div>
    <style>
      .popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;justify-content:center;align-items:center;z-index:9999;opacity:0;visibility:hidden;transition:.3s}
      .popup-overlay.show{opacity:1;visibility:visible}
      .popup-content{background:var(--bg1-color);padding:40px 35px;border-radius:20px;max-width:450px;width:90%;position:relative;box-shadow:0 10px 40px rgba(0,0,0,.3);transform:scale(.9);transition:.3s}
      .popup-overlay.show .popup-content{transform:scale(1)}
      .popup-close{position:absolute;top:15px;right:15px;background:#e74c3c;color:#fff;border:none;width:35px;height:35px;border-radius:50%;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.3s}
      .popup-close:hover{background:#c0392b;transform:rotate(90deg)}
      .popup-form{display:flex;flex-direction:column;gap:20px}
      .popup-form .form-group{display:flex;flex-direction:column;gap:8px;text-align:left}
      .popup-form label{font-weight:600;color:var(--text-color);font-size:14px}
      .popup-form input[type="text"],.popup-form input[type="email"]{padding:12px 15px;border:2px solid transparent;border-radius:10px;background:var(--bg-color);color:var(--text-color);font-size:15px;transition:.3s}
      .popup-form input:focus{border-color:var(--accent-color);outline:none;transform:translateY(-2px)}
      .popup-submit-btn{background:var(--accent-color);color:var(--bg-color);border:none;padding:14px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;transition:.3s;margin-top:10px}
      .popup-submit-btn:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 5px 15px rgba(0,0,0,.2)}
    </style>`;
  document.body.insertAdjacentHTML('beforeend',html);
  const popup=document.getElementById('subscription-popup');
  const closeBtn=popup.querySelector('.popup-close');
  const form=document.getElementById('subscription-form');

  const addSubscribeButton=()=>{
    const nodes=document.querySelectorAll('.footer, footer, .container');
    const tgt=[...nodes].find(f=>f.textContent.includes('2025')||f.textContent.includes('Eagles'));
    if(tgt&&!document.getElementById('open-subscription-popup')){
      const btn=document.createElement('button');
      btn.id='open-subscription-popup'; btn.textContent='📼 Subscribe to Newsletter';
      btn.style.cssText='background:var(--accent-color);color:var(--bg-color);border:none;padding:12px 25px;border-radius:25px;font-weight:700;cursor:pointer;margin:20px auto;display:block;font-size:16px;transition:.3s';
      btn.onmouseover=()=>btn.style.transform='translateY(-2px)'; btn.onmouseout=()=>btn.style.transform='translateY(0)';
      tgt.insertBefore(btn,tgt.firstChild);
      btn.addEventListener('click',()=>{popup.style.display='flex';setTimeout(()=>popup.classList.add('show'),10)});
    }
  };
  addSubscribeButton();

  const closePopup=()=>{popup.classList.remove('show');setTimeout(()=>popup.style.display='none',300)};
  closeBtn.addEventListener('click',closePopup);
  popup.addEventListener('click',e=>{if(e.target===popup) closePopup()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&popup.classList.contains('show')) closePopup()});

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('sub-name').value;
    const email=document.getElementById('sub-email').value;
    const newsletter=document.getElementById('sub-newsletter').checked;
    const subscriber={name,email,newsletter,subscribedAt:new Date().toISOString()};
    const arr=JSON.parse(localStorage.getItem('subscribers')||'[]'); arr.push(subscriber);
    localStorage.setItem('subscribers',JSON.stringify(arr));
    alert(`✓ Thank you for subscribing, ${name}!\nWe'll send updates to ${email}`);
    form.reset(); closePopup();
  });
}

function initDateTimeDisplay(){
  if (!window.location.pathname.endsWith('index.html')) return;
  const html=`
    <div id="datetime-display" style="position:fixed;top:120px;right:20px;background:var(--bg1-color);border-radius:15px;z-index:999;text-align:center;font-family:'Segoe UI',sans-serif;min-width:250px">
      <div style="font-size:12px;color:var(--text-color);opacity:.7;margin-bottom:5px">Current Date & Time</div>
      <div id="current-date" style="font-size:15px;font-weight:600;color:var(--accent-color);margin-bottom:5px"></div>
      <div id="current-time" style="font-size:22px;font-weight:700;color:var(--text-color);font-family:'Courier New',monospace"></div>
      <div id="current-day" style="font-size:13px;color:var(--text-color);opacity:.8;margin-top:5px"></div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend',html);

  const box = document.getElementById('datetime-display');

  box.style.boxShadow = '0 16px 38px rgba(0,0,0,.28), 0 6px 14px rgba(0,0,0,.16)';
  box.style.transform = 'translateY(0)';

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function update(){
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    const ampm = h>=12 ? 'PM' : 'AM';
    h = h%12 || 12;
    document.getElementById('current-date').textContent = dateStr;
    document.getElementById('current-time').textContent = `${h}:${m}:${s} ${ampm}`;
    document.getElementById('current-day').textContent = days[now.getDay()];
  }
  update();
  setInterval(update, 1000);
}


document.addEventListener('DOMContentLoaded',()=>{
  initFormValidation();
  initAccordion();
  initPopupForm();
  initDateTimeDisplay();
});

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(a){e.preventDefault();const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth',block:'start'})}
});

window.addEventListener('load',()=>{
  document.body.style.opacity='0';
  setTimeout(()=>{document.body.style.transition='opacity .5s ease';document.body.style.opacity='1'},100);
});

const musicPlayer={
  songs:[
    {title:'Thunder',artist:'Imagine Dragons',duration:210},
    {title:'Believer',artist:'Imagine Dragons',duration:190},
    {title:'Counting Stars',artist:'OneRepublic',duration:200},
  ],
  currentSongIndex:0,
  play(){const s=this.songs[this.currentSongIndex];console.log(`🎵 Now playing: ${s.title} by ${s.artist}`)},
  next(){this.currentSongIndex=(this.currentSongIndex+1)%this.songs.length;this.play()},
  totalDuration(){return this.songs.reduce((a,s)=>a+s.duration,0)}
};



const longSongs=musicPlayer.songs.filter(s=>s.duration>195).map(s=>s.title);
console.log('🎶 Songs longer than 195s:',longSongs);

function initClickSound(){
  const audio=new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
  document.addEventListener('click',e=>{if(e.target.tagName==='BUTTON'){audio.currentTime=0;audio.play().catch(()=>{})}});
}
initClickSound();

function displayGreetingByTime(){
  const hour=new Date().getHours();
  let g=hour<12?'☀️ Good Morning!':hour<18?'🌤️ Good Afternoon!':hour<22?'🌙 Good Evening!':'🌌 Good Night!';
  const box=document.createElement('div'); box.textContent=g; box.style.cssText='text-align:center;font-size:20px;color:var(--accent-color);margin-top:20px'; document.body.prepend(box);
}
displayGreetingByTime();

function animatePlaylist(){
  const box=document.querySelector('.playlist-box'); if(!box) return;
  box.style.opacity='0'; box.style.transform='translateY(20px)'; box.style.transition='opacity 1s ease, transform 1s ease';
  setTimeout(()=>{box.style.opacity='1';box.style.transform='translateY(0)'},200);
}
animatePlaylist();



(function loadjQuery(){
  if(window.jQuery){initJQueryFeatures();return}
  const s=document.createElement('script'); s.src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
  s.onload=initJQueryFeatures; s.onerror=()=>console.error('Failed to load jQuery'); document.head.appendChild(s);
})();

function initJQueryFeatures(){
  setTimeout(()=>{
    const $=window.jQuery;
    createJQuerySections();
    setTimeout(()=>{addMyCustomSongs($); bindAllFeatures($)},300);
  },500);
}

function addMyCustomSongs($){
  const my=[
    {title:'Mockingbird',artist:'Eminem',album:'Encore',duration:'4:11'},
    {title:'Lose Yourself',artist:'Eminem',album:'8 Mile',duration:'5:26'},
    {title:'Bohemian Rhapsody',artist:'Queen',album:'A Night at the Opera',duration:'5:55'}
  ];
  const $list=$('#jquery-music-list'); if(!$list.length) return;
  my.forEach(song=>{
    $list.append(`
      <li class="jquery-music-item" data-artist="${song.artist}" data-album="${song.album}" style="background:var(--bg-color);padding:18px 20px;margin-bottom:12px;border-radius:12px;transition:.3s;border:1px solid transparent;cursor:pointer">
        <div style="display:flex;align-items:center;gap:15px">
          <span style="font-size:24px">🎵</span>
          <div style="flex:1">
            <div class="jquery-song-title" style="font-weight:600;font-size:16px;color:var(--text-color)">${song.title}</div>
            <div style="font-size:13px;opacity:.7;margin-top:3px">${song.artist} • ${song.album}</div>
          </div>
          <span style="opacity:.5">${song.duration}</span>
        </div>
      </li>`);
  });
}



function bindAllFeatures($){
  const $search=$('#jquery-search'),$suggestions=$('#jquery-suggestions'),$highlightText=$('#jquery-highlight-text');
  const allSongs=[]; $('.jquery-music-item').each(function(){allSongs.push({title:$(this).find('.jquery-song-title').text().trim(),artist:$(this).data('artist')})});
  const original=$highlightText.text();

  $search.on('keyup',function(){
    const q=$(this).val().toLowerCase().trim();
    $('.jquery-music-item').each(function(){
      const $it=$(this), t=$it.find('.jquery-song-title').text().toLowerCase(), a=$it.data('artist').toString().toLowerCase(), al=$it.data('album').toString().toLowerCase();
      (q===''||t.includes(q)||a.includes(q)||al.includes(q))?$it.fadeIn(200):$it.fadeOut(200);
    });
    if(q.length){
      const m=allSongs.filter(s=>s.title.toLowerCase().includes(q)||s.artist.toLowerCase().includes(q)).slice(0,5);
      m.length?$suggestions.html(m.map(s=>`<li>${s.title} <span style="opacity:.6">- ${s.artist}</span></li>`).join('')).fadeIn(200):$suggestions.fadeOut(200);
      const esc=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); const rx=new RegExp(`(${esc})`,'gi'); $highlightText.html(original.replace(rx,'<span class="jquery-highlight">$1</span>'));
    }else{$suggestions.fadeOut(200);$highlightText.html(original)}
  });

  $(document).on('click','#jquery-suggestions li',function(){
    const title=$(this).text().split(' - ')[0]; $search.val(title).trigger('keyup'); $suggestions.fadeOut(200);
  });
  $(document).on('click',e=>{if(!$(e.target).closest('#jquery-search,#jquery-suggestions').length)$suggestions.fadeOut(200)});

  const $bar=$('#jquery-progress-bar');
  $(window).on('scroll',()=>{const top=$(window).scrollTop(), h=$(document).height()-$(window).height(), p=(top/h)*100; $bar.css('width',p+'%')});

  const $counters=$('.jquery-counter[data-count]');
  function visible($el){const t=$el.offset().top,b=t+$el.outerHeight(),vt=$(window).scrollTop(),vb=vt+$(window).height(); return b>vt&&t<vb}
  function run($el){
    if($el.data('animated'))return;
    const target=parseInt($el.data('count')),duration=2000,steps=60,inc=target/steps; let cur=0;
    $el.data('animated',true);
    const timer=setInterval(()=>{cur+=inc; if(cur>=target){cur=target;clearInterval(timer)} $el.text(Math.floor(cur).toLocaleString())},duration/steps);
  }
  $(window).on('scroll load',()=>{$counters.each(function(){if(visible($(this))) run($(this))})});

  const $form=$('#jquery-newsletter-form'),$btn=$('#jquery-subscribe-btn');
  $form.on('submit',e=>{
    e.preventDefault();
    const orig=$btn.html(); $btn.prop('disabled',true).html('<span class="jquery-spinner"></span> Please wait...');
    setTimeout(()=>{$btn.prop('disabled',false).html(orig); showJQueryToast('✅ Successfully subscribed!'); $form[0].reset()},2000);
  });

  window.showJQueryToast=function(msg,type){
    type=type||'success';
    const bg={success:'linear-gradient(135deg,#2ecc71 0%,#27ae60 100%)',error:'linear-gradient(135deg,#e74c3c 0%,#c0392b 100%)',info:'linear-gradient(135deg,#3498db 0%,#2980b9 100%)'}[type];
    const $t=$('<div class="jquery-toast">').text(msg).css({background:bg,color:'#fff',padding:'15px 20px',borderRadius:'12px',boxShadow:'0 4px 15px rgba(0,0,0,.3)',marginBottom:'10px',minWidth:'250px',fontWeight:'600',cursor:'pointer',pointerEvents:'all'});
    $('#jquery-toast-container').append($t);
    setTimeout(()=>{$t.addClass('hide'); setTimeout(()=>{$t.remove()},300)},3000);
    $t.on('click',function(){$(this).addClass('hide'); setTimeout(()=>{$t.remove()},300)});
  };

  $('.jquery-action-btn').on('click',function(){
    const a=$(this).data('action'), map={favorite:'⭐ Added to favorites!',playlist:'🎶 Added to playlist!',share:'🔗 Link copied to clipboard!'}; showJQueryToast(map[a]);
  });

  $(document).on('click','.jquery-copy-btn',function(){
    const $b=$(this), target=$b.data('target'), text=$(target).text(), orig=$b.html();
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(text).then(()=>{$b.html('✓ Copied!');showJQueryToast('✅ Copied to clipboard!');setTimeout(()=>{$b.html(orig)},2000)});
    }else{
      const $t=$('<textarea>').val(text).css({position:'absolute',left:'-9999px'}).appendTo('body');
      $t[0].select(); try{document.execCommand('copy');$b.html('✓ Copied!');showJQueryToast('✅ Copied to clipboard!');setTimeout(()=>{$b.html(orig)},2000)}catch(e){console.error('Copy failed:',e)} $t.remove();
    }
  });

  const $imgs=$('.jquery-lazy-img');
  function load($img){
    if($img.data('loaded'))return;
    const src=$img.data('src'); if(!src) return;
    const t=new Image();
    t.onload=()=>{$img.attr('src',src).css('opacity','1');$img.siblings('.jquery-img-loader').fadeOut(300);$img.data('loaded',true)};
    t.onerror=()=>{$img.siblings('.jquery-img-loader').html('❌')}; t.src=src;
  }
  function check(){
    const top=$(window).scrollTop(), bot=top+$(window).height();
    $imgs.each(function(){
      const $i=$(this); if($i.data('loaded')) return;
      const it=$i.offset().top, ib=it+$i.height();
      if(ib>top-200&&it<bot+200) load($i);
    });
  }
  $(window).on('scroll resize',check); check();
}

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
      <div style="font-size: 48px; margin-bottom: 20px;">🎵</div>
      <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Loading music from API...</div>
      <div style="font-size: 14px; opacity: 0.7;">Please wait</div>
    </div>
  `;
}

function showAPIError(container, message = "Failed to load music") {
  if (!container) return;
  
  container.innerHTML = `
    <div style="text-align: center; padding: 40px; color: var(--text-color);">
      <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
      <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${message}</div>
      <div style="font-size: 14px; opacity: 0.7;">Please try again later</div>
    </div>
  `;
}

function initMusicAPI() {
  console.log('🎵 Music API Integration Loaded');
  
  if (window.location.pathname.includes('listen.html')) {
    addAPISearchButton();
  }
}

function addAPISearchButton() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;
  
  const apiButton = document.createElement('button');
  apiButton.textContent = '🌐 Search Online';
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

function displayAPIResults(tracks) {
  const songList = document.getElementById('songList');
  if (!songList) return;
  
  songList.innerHTML = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
      <strong>🌐 Online Search Results (${tracks.length} tracks found)</strong>
    </div>
  `;
  
  tracks.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'song d-flex align-items-center justify-content-between gap-2 p-2 border rounded-3';
    
    item.innerHTML = `
      <div class="song-left d-flex align-items-center" style="gap: 10px;">
        ${track.image ? `<img src="${track.image}" alt="${track.artist}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">` : '<div style="width: 50px; height: 50px; background: var(--accent-color); border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎵</div>'}
        <div style="flex: 1;">
          <div class="song-title" style="font-size: 16px; font-weight: bold; color: var(--bg-color);">${track.title}</div>
          <div style="font-size: 12px; opacity: 0.8; color: var(--bg-color);">${track.info}</div>
        </div>
      </div>
      <button class="btn btn-sm btn-outline-primary rounded-circle" style="width: 32px; height: 32px; font-size: 18px;">ℹ️</button>
    `;
    
    songList.appendChild(item);
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    searchTracks,
    getTopTracks,
    getArtistInfo,
    getSimilarTracks,
    initMusicAPI
  };
}

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

function validatePasswordStrength(password) {
  const errors = [];
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  if (!checks.length) errors.push('Password must be at least 8 characters long');
  if (!checks.uppercase) errors.push('Password must contain at least one uppercase letter');
  if (!checks.lowercase) errors.push('Password must contain at least one lowercase letter');
  if (!checks.number) errors.push('Password must contain at least one number');
  if (!checks.special) errors.push('Password must contain at least one special character (!@#$%^&*...)');

  const strength = Object.values(checks).filter(Boolean).length;
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: strength, // 0-5
    strengthText: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength]
  };
}

function createPasswordStrengthIndicator() {
  const passwordInput = document.getElementById('password');
  if (!passwordInput || document.getElementById('password-strength-indicator')) return;

  const indicator = document.createElement('div');
  indicator.id = 'password-strength-indicator';
  indicator.style.cssText = `
    margin-top: 8px;
    padding: 10px;
    border-radius: 8px;
    background: var(--bg1-color);
    display: none;
  `;

  const strengthBar = document.createElement('div');
  strengthBar.id = 'strength-bar';
  strengthBar.style.cssText = `
    height: 6px;
    border-radius: 3px;
    background: #e0e0e0;
    overflow: hidden;
    margin-bottom: 8px;
  `;

  const strengthFill = document.createElement('div');
  strengthFill.id = 'strength-fill';
  strengthFill.style.cssText = `
    height: 100%;
    width: 0%;
    transition: all 0.3s ease;
    background: linear-gradient(90deg, #e74c3c 0%, #f39c12 50%, #2ecc71 100%);
  `;

  strengthBar.appendChild(strengthFill);
  indicator.appendChild(strengthBar);

  const strengthText = document.createElement('div');
  strengthText.id = 'strength-text';
  strengthText.style.cssText = `
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
  `;
  indicator.appendChild(strengthText);

  const requirementsList = document.createElement('ul');
  requirementsList.id = 'password-requirements';
  requirementsList.style.cssText = `
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 12px;
  `;

  const requirements = [
    { id: 'req-length', text: 'At least 8 characters', check: 'length' },
    { id: 'req-upper', text: 'One uppercase letter', check: 'uppercase' },
    { id: 'req-lower', text: 'One lowercase letter', check: 'lowercase' },
    { id: 'req-number', text: 'One number', check: 'number' },
    { id: 'req-special', text: 'One special character', check: 'special' }
  ];

  requirements.forEach(req => {
    const li = document.createElement('li');
    li.id = req.id;
    li.style.cssText = `
      padding: 4px 0;
      color: var(--text-color);
      opacity: 0.6;
      transition: all 0.3s;
    `;
    li.innerHTML = `<span style="margin-right: 8px;">○</span>${req.text}`;
    requirementsList.appendChild(li);
  });

  indicator.appendChild(requirementsList);
  passwordInput.parentElement.appendChild(indicator);

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password.length === 0) {
      indicator.style.display = 'none';
      return;
    }

    indicator.style.display = 'block';
    const validation = validatePasswordStrength(password);

    const percentage = (validation.strength / 5) * 100;
    strengthFill.style.width = `${percentage}%`;

    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#3498db', '#2ecc71', '#27ae60'];
    strengthText.textContent = `Strength: ${validation.strengthText}`;
    strengthText.style.color = colors[validation.strength];

    const checks = {
      'req-length': password.length >= 8,
      'req-upper': /[A-Z]/.test(password),
      'req-lower': /[a-z]/.test(password),
      'req-number': /[0-9]/.test(password),
      'req-special': /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.entries(checks).forEach(([id, passed]) => {
      const element = document.getElementById(id);
      if (element) {
        if (passed) {
          element.style.opacity = '1';
          element.style.color = '#2ecc71';
          element.innerHTML = element.innerHTML.replace('○', '✓');
        } else {
          element.style.opacity = '0.6';
          element.style.color = 'var(--text-color)';
          element.innerHTML = element.innerHTML.replace('✓', '○');
        }
      }
    });
  });
}

function enhanceFormValidation() {
  const form = document.getElementById('register-form');
  if (!form) return;

  createPasswordStrengthIndicator();

  const originalSubmit = form.onsubmit;
  
  form.onsubmit = function(e) {
    e.preventDefault();

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    if (!password || !confirmPassword) {
      if (originalSubmit) originalSubmit.call(this, e);
      return;
    }

    const existingErrors = password.parentElement.querySelectorAll('.error-message');
    existingErrors.forEach(err => err.remove());
    password.style.borderColor = '';

    const validation = validatePasswordStrength(password.value);

    if (!validation.isValid) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.cssText = 'color: #e74c3c; font-size: 13px; margin-top: 5px;';
      errorDiv.innerHTML = '<strong>Password requirements:</strong><br>' + validation.errors.join('<br>');
      password.parentElement.appendChild(errorDiv);
      password.style.borderColor = '#e74c3c';
      return false;
    }

    if (password.value !== confirmPassword.value) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.cssText = 'color: #e74c3c; font-size: 13px; margin-top: 5px;';
      errorDiv.textContent = 'Passwords do not match';
      confirmPassword.parentElement.appendChild(errorDiv);
      confirmPassword.style.borderColor = '#e74c3c';
      return false;
    }

    if (originalSubmit) {
      originalSubmit.call(this, e);
    } else {
      const username = document.getElementById('username').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();

      const user = {
        username,
        phone,
        email,
        password: password.value,
        avatar: null,
        friends: [],
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(user));
      alert('✅ Registration successful!');
      window.location.href = 'profile.html';
    }

    return false;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  enhanceFormValidation();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validatePasswordStrength,
    createPasswordStrengthIndicator,
    enhanceFormValidation
  };
  function initFormValidation(){
  const form = document.getElementById('register-form'); 
  if(!form) return;

  const createErrorElement = m => {
    const e = document.createElement('div');
    e.className = 'error-message';
    e.style.cssText = `
      color: #fff; 
      background-color: rgba(231, 76, 60, 0.9);
      font-size: 13px; 
      margin-top: 5px; 
      padding: 5px 10px; 
      border-radius: 4px; 
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: block;
    `;
    e.textContent = m;
    return e;
  };
  
  const clearErrors = ()=>{
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
      el.style.borderColor = '';
    });
  };

  const showError = (input, m) => {
    input.style.borderColor = '#e74c3c';
    input.classList.add('is-invalid');
    input.parentElement.appendChild(createErrorElement(m));
  };
  
  const validateEmail = e => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e);
  const validatePhone = p => /^[\\d\\s+\\-()]+$/.test(p) && p.replace(/\\D/g, '').length >= 10;
  const validatePassword = p => p.length >= 8;

  form.addEventListener('submit', e => {
    e.preventDefault(); 
    clearErrors();
    
    const username = document.getElementById('username');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    let ok = true;

    if (!username.value.trim()) {
      showError(username, 'Username is required');
      ok = false;
    }
    
    if (!phone.value.trim() || !validatePhone(phone.value)) {
      showError(phone, 'Enter a valid phone number (at least 10 digits)');
      ok = false;
    }

    if (!email.value.trim() || !validateEmail(email.value)) {
      showError(email, 'Enter a valid email address');
      ok = false;
    }

    if (!password.value.trim() || !validatePassword(password.value)) {
      showError(password, 'Password must be at least 8 characters');
      ok = false;
    }

    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Passwords do not match');
      ok = false;
    }

    if (ok) {
      const user = {
        username: username.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        password: password.value,
        avatar: null,
        friends: [],
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(user));
      alert('✅ Registration successful!');
      window.location.href = 'profile.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initFormValidation };
}
}
