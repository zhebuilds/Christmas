// Christmas Website - Simplified with Sketchfab 3D Model
// Features: Sketchfab embed, detailed About modals, wishes, countdown

document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initWishForm();
    initMusicPlayer();
    initSmoothScroll();
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    initAboutCards();
    initGallery();
    loadSavedWishes();
    checkChristmasDay();
});

// ============================================
// CHRISTMAS DAY CELEBRATION
// ============================================
function checkChristmasDay() {
    const n = new Date();
    if (n.getMonth() === 11 && n.getDate() === 25 && !sessionStorage.getItem('cel')) {
        document.getElementById('christmas-celebration')?.classList.remove('hidden');
        sessionStorage.setItem('cel', '1');
    }
    document.getElementById('close-celebration')?.addEventListener('click', () => {
        document.getElementById('christmas-celebration')?.classList.add('hidden');
    });
}

// ============================================
// COUNTDOWN
// ============================================
function initCountdown() {
    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');
    const msg = document.getElementById('countdown-message');
    
    if (!d) return;
    
    const update = () => {
        const now = new Date();
        let xmas = new Date(now.getFullYear(), 11, 25);
        if (now > xmas) xmas = new Date(now.getFullYear() + 1, 11, 25);
        const diff = xmas - now;
        
        if (diff <= 0) {
            d.textContent = '🎄';
            h.textContent = '🎅';
            m.textContent = '🎁';
            s.textContent = '⭐';
            if (msg) msg.innerHTML = '🎉 MERRY CHRISTMAS! 🎉';
            return;
        }
        
        const days = Math.floor(diff / 864e5);
        d.textContent = String(days).padStart(2, '0');
        h.textContent = String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0');
        m.textContent = String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0');
        s.textContent = String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0');
        
        if (msg) {
            msg.textContent = days <= 7 ? `⭐ ${days} day${days > 1 ? 's' : ''} left!` : 'Time until Christmas...';
        }
    };
    
    update();
    setInterval(update, 1000);
}

// ============================================
// MUSIC PLAYER
// ============================================
let audioCtx, playing = false;

function initMusicPlayer() {
    document.getElementById('music-toggle')?.addEventListener('click', function() {
        if (playing) {
            playing = false;
            audioCtx?.close();
            this.classList.remove('playing');
            this.textContent = '🔔';
            showNotification('🔇 Music stopped');
        } else {
            playMusic();
            this.classList.add('playing');
            this.textContent = '🎵';
            showNotification('🎵 Playing Jingle Bells');
        }
    });
}

function playMusic() {
    if (playing) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        playing = true;
        const notes = [
            {n:329.63,d:0.25},{n:329.63,d:0.25},{n:329.63,d:0.5},
            {n:329.63,d:0.25},{n:329.63,d:0.25},{n:329.63,d:0.5},
            {n:329.63,d:0.25},{n:392,d:0.25},{n:261.63,d:0.25},{n:293.66,d:0.25},{n:329.63,d:1}
        ];
        let t = audioCtx.currentTime;
        const play = () => {
            notes.forEach(n => {
                if (n.n) {
                    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.connect(g); g.connect(audioCtx.destination);
                    o.frequency.value = n.n;
                    g.gain.setValueAtTime(0.2, t);
                    g.gain.exponentialRampToValueAtTime(0.01, t + n.d * 0.9);
                    o.start(t); o.stop(t + n.d);
                }
                t += n.d;
            });
            if (playing) setTimeout(() => { if (playing) { t = audioCtx.currentTime; play(); } }, 3000);
        };
        play();
    } catch(e) {
        showNotification('⚠️ Audio not available');
    }
}

// ============================================
// ABOUT CARDS WITH DETAILED MODAL
// ============================================
function initAboutCards() {
    const modal = document.getElementById('info-modal');
    const body = document.getElementById('modal-body');
    
    const detailedInfo = {
        traditions: {
            icon: '🎄',
            title: 'Christmas Traditions Around the World',
            content: `
                <div class="modal-section">
                    <h3>🌍 Origins of Christmas</h3>
                    <p>Christmas celebrates the birth of Jesus Christ on December 25th. While the exact date is debated, this celebration began in the 4th century AD. Today, it has evolved into a global holiday embraced by billions of people worldwide, both religious and secular.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🎄 The Christmas Tree</h3>
                    <p>The tradition of decorating evergreen trees dates back to 16th century Germany. Martin Luther is said to have added candles to the tree to represent the stars. Queen Victoria popularized the tradition in England in the 1840s, and it spread globally. Today, families decorate trees with lights, ornaments, tinsel, and a star or angel on top.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🧦 Christmas Stockings</h3>
                    <p>Legend says that St. Nicholas once dropped gold coins down a chimney, which landed in stockings hung to dry by the fire. Now, children hang stockings on Christmas Eve, hoping Santa will fill them with small gifts, candies, and treats.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🎵 Christmas Carols</h3>
                    <p>Carol singing has been a tradition since the Middle Ages. Popular carols include "Silent Night," "Jingle Bells," "O Holy Night," and "We Wish You a Merry Christmas." Carolers often go door-to-door spreading holiday cheer.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🍽️ Christmas Dinner</h3>
                    <p>Families gather for a festive meal that varies by culture: roast turkey in the US and UK, fried chicken in Japan, seafood in Italy, and tamales in Mexico. Desserts include Christmas pudding, gingerbread, and Yule log cake.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🌎 Unique Traditions by Country</h3>
                    <ul>
                        <li><strong>Germany:</strong> Advent calendars and Christmas markets</li>
                        <li><strong>Sweden:</strong> St. Lucia Day processions on December 13</li>
                        <li><strong>Iceland:</strong> 13 Yule Lads visit children over 13 nights</li>
                        <li><strong>Australia:</strong> Beach barbecues and surfing Santa</li>
                        <li><strong>Netherlands:</strong> Sinterklaas arrives by boat on December 5</li>
                    </ul>
                </div>
            `
        },
        santa: {
            icon: '🎅',
            title: 'The Legend of Santa Claus',
            content: `
                <div class="modal-section">
                    <h3>📜 Historical Origins</h3>
                    <p>Santa Claus is based on St. Nicholas of Myra, a 4th-century Greek Christian bishop known for his generosity. He secretly gave gifts to the poor, including dowries for young women who couldn't afford to marry. His feast day, December 6, is still celebrated in many European countries.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🎨 Evolution of Santa's Image</h3>
                    <p>The modern image of Santa - a jolly, red-suited man with a white beard - was popularized in the 19th and 20th centuries. Clement Clarke Moore's 1823 poem "A Visit from St. Nicholas" described him as a plump, cheerful elf. Haddon Sundblom's Coca-Cola advertisements in the 1930s solidified the iconic red and white outfit we know today.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🏠 Santa's Workshop</h3>
                    <p>According to legend, Santa lives at the North Pole with Mrs. Claus. His workshop is staffed by magical elves who work year-round making toys for children. The elves keep track of which children have been naughty or nice, helping Santa prepare his famous list.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🦌 Santa's Reindeer</h3>
                    <p>Santa's sleigh is pulled by nine flying reindeer:</p>
                    <ul>
                        <li><strong>Dasher & Dancer</strong> - The speedsters</li>
                        <li><strong>Prancer & Vixen</strong> - The graceful ones</li>
                        <li><strong>Comet & Cupid</strong> - Named after celestial beings</li>
                        <li><strong>Donner & Blitzen</strong> - "Thunder" and "Lightning" in German</li>
                        <li><strong>Rudolph</strong> - The red-nosed leader, added in 1939</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>🌙 Christmas Eve Journey</h3>
                    <p>On Christmas Eve, Santa travels around the world in a single night, delivering presents to millions of homes. He enters through chimneys and leaves gifts under the tree or in stockings. Children leave out cookies and milk for Santa, and carrots for the reindeer.</p>
                </div>
                
                <div class="modal-section">
                    <h3>🌍 Santa's Names Worldwide</h3>
                    <ul>
                        <li><strong>UK:</strong> Father Christmas</li>
                        <li><strong>France:</strong> Père Noël</li>
                        <li><strong>Germany:</strong> Weihnachtsmann</li>
                        <li><strong>Russia:</strong> Ded Moroz (Grandfather Frost)</li>
                        <li><strong>Italy:</strong> Babbo Natale</li>
                    </ul>
                </div>
            `
        },
        gifts: {
            icon: '🎁',
            title: 'The Spirit of Giving',
            content: `
                <div class="modal-section">
                    <h3>📖 Biblical Origins</h3>
                    <p>The tradition of gift-giving at Christmas commemorates the gifts brought to baby Jesus by the Three Wise Men (Magi):</p>
                    <ul>
                        <li><strong>Gold:</strong> Symbolizing Jesus's kingship</li>
                        <li><strong>Frankincense:</strong> Symbolizing His divinity and role as priest</li>
                        <li><strong>Myrrh:</strong> Symbolizing His mortality and future sacrifice</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>💝 The True Meaning</h3>
                    <p>Christmas gifts are expressions of love, not measures of wealth. The best gifts come from the heart:</p>
                    <ul>
                        <li>Handmade items show time and thought</li>
                        <li>Quality time spent together is invaluable</li>
                        <li>Acts of kindness and service are gifts to the spirit</li>
                        <li>Thoughtful small gifts often mean more than expensive ones</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>🎀 Gift-Giving Traditions</h3>
                    <p>Different cultures have unique gift-giving customs:</p>
                    <ul>
                        <li><strong>Boxing Day (UK/Canada):</strong> December 26, tradition of giving to the less fortunate</li>
                        <li><strong>Secret Santa:</strong> Anonymous gift exchange among groups</li>
                        <li><strong>White Elephant:</strong> Humorous gift-swapping game</li>
                        <li><strong>Advent Gifts:</strong> Small daily presents leading to Christmas</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>📦 Gift Wrapping</h3>
                    <p>The practice of wrapping gifts adds to the excitement of giving and receiving. Popular decorations include:</p>
                    <ul>
                        <li>Festive paper in red, green, gold, and silver</li>
                        <li>Ribbons and bows</li>
                        <li>Gift tags with personal messages</li>
                        <li>Sustainable options like fabric wraps and reusable bags</li>
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>🤝 Giving Back</h3>
                    <p>Christmas is also a time for charitable giving:</p>
                    <ul>
                        <li>Toy drives for children in need</li>
                        <li>Food banks and holiday meal programs</li>
                        <li>Volunteering at shelters</li>
                        <li>Supporting global charity organizations</li>
                    </ul>
                    <p><em>"It is more blessed to give than to receive." - Acts 20:35</em></p>
                </div>
            `
        }
    };
    
    document.querySelectorAll('.about-card[data-info]').forEach(card => {
        card.addEventListener('click', () => {
            const info = detailedInfo[card.dataset.info];
            if (info && body && modal) {
                body.innerHTML = `
                    <div class="modal-header">
                        <span class="modal-icon">${info.icon}</span>
                        <h2>${info.title}</h2>
                    </div>
                    <div class="modal-body-content">
                        ${info.content}
                    </div>
                `;
                modal.classList.remove('hidden');
            }
        });
    });
    
    document.getElementById('modal-close')?.addEventListener('click', () => modal?.classList.add('hidden'));
    modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
}

// ============================================
// GALLERY
// ============================================
function initGallery() {
    const lb = document.getElementById('lightbox');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('lightbox-icon').textContent = item.querySelector('.gallery-placeholder').textContent;
            document.getElementById('lightbox-title').textContent = item.dataset.title;
            document.getElementById('lightbox-desc').textContent = item.dataset.desc;
            lb?.classList.remove('hidden');
        });
    });
    document.getElementById('lightbox-close')?.addEventListener('click', () => lb?.classList.add('hidden'));
    lb?.addEventListener('click', e => { if (e.target === lb) lb.classList.add('hidden'); });
}

// ============================================
// WISH FORM
// ============================================
function initWishForm() {
    const form = document.getElementById('wish-form');
    const result = document.getElementById('wish-result');
    
    document.getElementById('wish')?.addEventListener('input', function() {
        const c = document.getElementById('char-current');
        if (c) c.textContent = this.value.length;
    });
    
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const n = document.getElementById('name').value.trim();
        const w = document.getElementById('wish').value.trim();
        if (!n || !w) return;
        
        const btn = form.querySelector('button');
        btn.innerHTML = '🌟 Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            saveWish(n, w);
            addWishToWall(n, w);
            form.style.display = 'none';
            result.classList.remove('hidden');
            showNotification('🎉 Wish shared!');
        }, 1000);
    });
    
    document.getElementById('new-wish-btn')?.addEventListener('click', () => {
        form.style.display = 'block';
        result.classList.add('hidden');
        form.reset();
        document.getElementById('char-current').textContent = '0';
        form.querySelector('button').innerHTML = '🌟 Share My Wish';
        form.querySelector('button').disabled = false;
    });
}

function saveWish(n, w) {
    let a = JSON.parse(localStorage.getItem('christmasWishes') || '[]');
    a.unshift({ name: n, wish: w });
    localStorage.setItem('christmasWishes', JSON.stringify(a.slice(0, 20)));
}

function loadSavedWishes() {
    JSON.parse(localStorage.getItem('christmasWishes') || '[]').forEach(w => addWishToWall(w.name, w.wish, false));
}

function addWishToWall(n, w, isNew = true) {
    const g = document.getElementById('wishes-grid');
    if (!g) return;
    const avatars = ['🎅', '❄️', '⭐', '🦌', '🎄', '🎁', '⛄', '🔔'];
    const card = document.createElement('div');
    card.className = 'wish-card' + (isNew ? ' new' : '');
    card.innerHTML = `
        <div class="wish-avatar">${avatars[Math.floor(Math.random() * avatars.length)]}</div>
        <p class="wish-text">"${w}"</p>
        <span class="wish-author">— ${n}</span>
    `;
    g.insertBefore(card, g.children[3] || null);
}

// ============================================
// UTILITIES
// ============================================
function showNotification(msg) {
    document.querySelector('.notification')?.remove();
    const n = document.createElement('div');
    n.className = 'notification';
    n.style.cssText = 'position:fixed;bottom:100px;right:30px;background:linear-gradient(135deg,rgba(196,30,58,0.95),rgba(139,0,0,0.95));color:#fff;padding:15px 25px;border-radius:50px;z-index:10001;animation:slideIn .3s;box-shadow:0 4px 20px rgba(0,0,0,0.3)';
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOut .3s forwards';
        setTimeout(() => n.remove(), 300);
    }, 2500);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            const t = document.querySelector(href);
            if (t) {
                e.preventDefault();
                window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
                document.getElementById('mobile-menu')?.classList.remove('active');
                const b = document.getElementById('mobile-menu-btn');
                if (b) b.textContent = '☰';
            }
        });
    });
}

function initNavbarScroll() {
    const n = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (n) n.style.background = window.scrollY > 100 ? 'rgba(15,52,96,0.98)' : 'rgba(15,52,96,0.95)';
    });
}

function initMobileMenu() {
    const b = document.getElementById('mobile-menu-btn');
    const m = document.getElementById('mobile-menu');
    b?.addEventListener('click', () => {
        m?.classList.toggle('active');
        b.textContent = m?.classList.contains('active') ? '✕' : '☰';
    });
}

function initScrollAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('animate-in');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.about-card, .wish-card, .gallery-item, .countdown-item').forEach((el, i) => {
        el.style.cssText = `opacity:0;transform:translateY(30px);transition:all .6s ease ${i * 0.08}s`;
        obs.observe(el);
    });
}

// Inject animation styles
const css = document.createElement('style');
css.textContent = `
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(css);

console.log('🎄 Merry Christmas! 🎅');
