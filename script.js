/* ==========================================================================
   SHRIDDHI (SHRUDDHU JI) BIRTHDAY EXPERIENCE - SCRIPT.JS
   VANILLA JAVASCRIPT: INTERACTIVE, EMOTIONAL, MOBILE-FIRST
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. LIGHTWEIGHT PASTEL CONFETTI & SPARKLE ENGINE (PURE CANVAS, 60FPS)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId = null;

  // Resize canvas to match screen size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Pastel Color Palette for Confetti
  const pastelColors = [
    '#FADADD', // Baby pink
    '#E8DFFF', // Lavender
    '#DFF1FF', // Baby blue
    '#FFE5D0', // Peach
    '#FFF8F0', // Cream
    '#FF85A1', // Rose accent
    '#FFC2D1', // Soft coral
    '#BEE1E6'  // Pastel mint
  ];

  class ConfettiParticle {
    constructor(x, y, isHeart = false) {
      this.x = x ?? Math.random() * canvas.width;
      this.y = y ?? (canvas.height + 20);
      this.isHeart = isHeart || Math.random() < 0.25;
      this.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      this.size = Math.random() * 8 + 6;
      this.speedX = (Math.random() - 0.5) * 6;
      this.speedY = -(Math.random() * 7 + 4);
      this.gravity = 0.16;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 8;
      this.opacity = 1;
      this.decay = Math.random() * 0.008 + 0.005;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.isHeart) {
        // Draw cute tiny heart shape
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s / 4);
        ctx.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
        ctx.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, s / 4);
        ctx.fill();
      } else {
        // Draw cute rounded confetti ribbon
        ctx.fillRect(-this.size / 2, -this.size / 3, this.size, this.size * 0.7);
      }

      ctx.restore();
    }
  }

  function launchConfetti(count = 55, originX = null, originY = null) {
    const x = originX ?? canvas.width / 2;
    const y = originY ?? canvas.height * 0.65;
    for (let i = 0; i < count; i++) {
      particles.push(new ConfettiParticle(x, y));
    }
    if (!animationFrameId) {
      renderConfetti();
    }
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.opacity <= 0 || p.y > canvas.height + 30) {
        particles.splice(i, 1);
      }
    }
    if (particles.length > 0) {
      animationFrameId = requestAnimationFrame(renderConfetti);
    } else {
      animationFrameId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ------------------------------------------------------------------------
     2. OPENING SURPRISE SCREEN & 3D GIFT BOX
     ------------------------------------------------------------------------ */
  const surpriseScreen = document.getElementById('surprise-screen');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const giftBox = document.getElementById('gift-box');
  const giftBoxContainer = document.getElementById('gift-box-container');
  let surpriseOpened = false;

  function triggerOpenSurprise() {
    if (surpriseOpened) return;
    surpriseOpened = true;

    // Animate the gift box opening
    if (giftBox) {
      giftBox.classList.add('opened');
    }

    // Burst confetti from the center of the gift box
    const rect = giftBox ? giftBox.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    launchConfetti(80, rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Smoothly dissolve surprise overlay and reveal birthday website
    setTimeout(() => {
      surpriseScreen.classList.add('hidden');
      document.body.style.overflow = '';
      
      // Auto-trigger letter observation
      initLetterObserver();
    }, 700);
  }

  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', triggerOpenSurprise);
  }
  if (giftBoxContainer) {
    giftBoxContainer.addEventListener('click', triggerOpenSurprise);
  }

  /* ------------------------------------------------------------------------
     3. SMOOTH SCROLL FROM HERO TO LETTER
     ------------------------------------------------------------------------ */
  const scrollToLetterBtn = document.getElementById('scroll-to-letter-btn');
  if (scrollToLetterBtn) {
    scrollToLetterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('letter-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Start typing if not yet finished
        setTimeout(startTypewriter, 400);
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. SHRIDDHI'S PHOTO GALLERY & FULLSCREEN LIGHTBOX
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const galleryPolaroids = document.querySelectorAll('.gallery-polaroid');

  function openLightbox(imgSrc, captionText) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText || 'Shruddhu Ji 🌸';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    launchConfetti(25, window.innerWidth / 2, window.innerHeight * 0.4);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = ''; // Restore scrolling
    if (lightboxImg) lightboxImg.src = '';
  }

  galleryPolaroids.forEach((card) => {
    // Click or tap to open
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full') || card.querySelector('img')?.src;
      const caption = card.getAttribute('data-caption') || card.querySelector('.handwritten-caption')?.textContent;
      openLightbox(fullSrc, caption);
    });

    // Keyboard Enter / Space support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const fullSrc = card.getAttribute('data-full') || card.querySelector('img')?.src;
        const caption = card.getAttribute('data-caption') || card.querySelector('.handwritten-caption')?.textContent;
        openLightbox(fullSrc, caption);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Close with Escape key on devices with keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });

  /* ------------------------------------------------------------------------
     5. BIRTHDAY LETTER WITH NATURAL MOBILE-FRIENDLY TYPEWRITER EFFECT
     ------------------------------------------------------------------------ */
  const letterBody = document.getElementById('letter-body');
  const skipLetterBtn = document.getElementById('skip-letter-btn');
  const replayLetterBtn = document.getElementById('replay-letter-btn');

  // Exact letter content formatted in paragraphs
  const letterParagraphs = [
    "Happy Birthday, my dearest Shruddhu Jiii! 💗🎂",
    "I don't even know how to put into words how special you are to me.",
    "It's amazing how we haven't met in real life or even called each other, yet our little online friendship means so much to me. We met through chats, shared little conversations, and I've even heard your voice through your voice notes.",
    "Maybe we haven't made memories sitting beside each other, but we've made our own little memories through messages, random conversations, laughs, and those tiny moments that make a difference.",
    "I'm genuinely glad our paths crossed. I hope this new year of your life brings you endless smiles, peace, happiness, beautiful surprises, and all the things your heart wishes for.",
    "And maybe someday, we'll finally meet in real life and turn this online friendship into an actual memory.",
    "Until then, here's a little corner of the internet made especially for you.",
    "Happy Birthday, Shruddhu Ji. Keep smiling, keep being yourself, and never forget that I'm really happy to have you in my life. 🥹💗",
    "With lots of love,<br><span class=\"signature-highlight\">Your best friend 💌</span>"
  ];

  let isTyping = false;
  let typewriterTimeoutId = null;
  let hasTypedOnce = false;

  function renderAllLetterImmediately() {
    clearTimeout(typewriterTimeoutId);
    isTyping = false;
    if (!letterBody) return;
    letterBody.innerHTML = '';
    letterParagraphs.forEach((p, idx) => {
      const pEl = document.createElement('p');
      pEl.className = 'letter-paragraph' + (idx === letterParagraphs.length - 1 ? ' letter-sign-off' : '');
      pEl.innerHTML = p;
      letterBody.appendChild(pEl);
    });
    hasTypedOnce = true;
  }

  function startTypewriter() {
    if (isTyping) return;
    isTyping = true;
    clearTimeout(typewriterTimeoutId);

    if (!letterBody) return;
    letterBody.innerHTML = '';

    let paraIndex = 0;
    let charIndex = 0;
    let currentPElem = null;

    function typeNextChar() {
      if (!isTyping) return;

      if (paraIndex >= letterParagraphs.length) {
        isTyping = false;
        hasTypedOnce = true;
        if (currentPElem) currentPElem.classList.remove('typing-cursor');
        return;
      }

      // Check if starting new paragraph
      if (!currentPElem) {
        currentPElem = document.createElement('p');
        currentPElem.className = 'letter-paragraph typing-cursor' + (paraIndex === letterParagraphs.length - 1 ? ' letter-sign-off' : '');
        letterBody.appendChild(currentPElem);
        charIndex = 0;
      }

      const fullText = letterParagraphs[paraIndex];

      // Handle HTML sign-off paragraph quickly for smooth render
      if (fullText.includes('<br>')) {
        currentPElem.innerHTML = fullText;
        currentPElem.classList.remove('typing-cursor');
        paraIndex++;
        currentPElem = null;
        typewriterTimeoutId = setTimeout(typeNextChar, 300);
        return;
      }

      // Type regular character
      if (charIndex < fullText.length) {
        currentPElem.textContent += fullText.charAt(charIndex);
        charIndex++;
        // Fast, comfortable reading speed (16ms per char on mobile)
        typewriterTimeoutId = setTimeout(typeNextChar, 16);
      } else {
        // Paragraph finished
        currentPElem.classList.remove('typing-cursor');
        currentPElem = null;
        paraIndex++;
        // Pause between paragraphs
        typewriterTimeoutId = setTimeout(typeNextChar, 240);
      }
    }

    typeNextChar();
  }

  if (skipLetterBtn) {
    skipLetterBtn.addEventListener('click', () => {
      renderAllLetterImmediately();
      launchConfetti(20, window.innerWidth / 2, window.innerHeight * 0.5);
    });
  }

  if (replayLetterBtn) {
    replayLetterBtn.addEventListener('click', () => {
      isTyping = false;
      clearTimeout(typewriterTimeoutId);
      startTypewriter();
    });
  }

  function initLetterObserver() {
    const letterSection = document.getElementById('letter-section');
    if (!letterSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTypedOnce && !isTyping) {
          startTypewriter();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(letterSection);
  }

  /* ------------------------------------------------------------------------
     6. INTERACTIVE BIRTHDAY CAKE & CANDLE WISH
     ------------------------------------------------------------------------ */
  const blowCandleBtn = document.getElementById('blow-candle-btn');
  const relightCandleBtn = document.getElementById('relight-candle-btn');
  const flames = document.querySelectorAll('.candle-flame');
  const smokePuffs = document.getElementById('smoke-puffs');
  const wishRevealBox = document.getElementById('wish-reveal-box');

  if (blowCandleBtn) {
    blowCandleBtn.addEventListener('click', () => {
      // 1. Blow out candles
      flames.forEach(f => f.classList.add('blown-out'));

      // 2. Animate smoke puffs
      if (smokePuffs) {
        smokePuffs.classList.remove('rising');
        void smokePuffs.offsetWidth; // Force reflow
        smokePuffs.classList.add('rising');
      }

      // 3. Show confetti & floating hearts celebration
      launchConfetti(90, window.innerWidth / 2, window.innerHeight * 0.45);
      setTimeout(() => launchConfetti(50, window.innerWidth * 0.3, window.innerHeight * 0.5), 250);
      setTimeout(() => launchConfetti(50, window.innerWidth * 0.7, window.innerHeight * 0.5), 450);

      // 4. Reveal wish magic message
      if (wishRevealBox) {
        wishRevealBox.classList.add('show');
        wishRevealBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // 5. Swap buttons
      blowCandleBtn.style.display = 'none';
      if (relightCandleBtn) relightCandleBtn.style.display = 'inline-flex';
    });
  }

  if (relightCandleBtn) {
    relightCandleBtn.addEventListener('click', () => {
      // Relight candles
      flames.forEach(f => f.classList.remove('blown-out'));
      if (smokePuffs) smokePuffs.classList.remove('rising');
      if (wishRevealBox) wishRevealBox.classList.remove('show');

      relightCandleBtn.style.display = 'none';
      if (blowCandleBtn) blowCandleBtn.style.display = 'inline-flex';

      launchConfetti(25, window.innerWidth / 2, window.innerHeight * 0.4);
    });
  }

  /* ------------------------------------------------------------------------
     7. RANDOM BIRTHDAY WISHES GENERATOR
     ------------------------------------------------------------------------ */
  const birthdayWishes = [
    "May your smile always have a reason to shine. 🌟",
    "May your dreams slowly become reality. ✨",
    "May life bring you beautiful surprises. 🎁",
    "May you always feel appreciated and loved. 💗",
    "May we someday make beautiful memories in person. 🫂",
    "May this year bring you boundless happiness, peace, and cute giggles. 🌷",
    "May every door you knock on open into something wonderful and bright. 🚪💖",
    "May you always know how genuinely lucky I am to call you my best friend. 🎀"
  ];

  let currentWishIndex = 0;
  const wishQuote = document.getElementById('wish-quote');
  const wishCounter = document.getElementById('wish-counter');
  const nextWishBtn = document.getElementById('next-wish-btn');
  const wishEnvelopeIcon = document.getElementById('wish-envelope-icon');

  if (nextWishBtn && wishQuote) {
    nextWishBtn.addEventListener('click', () => {
      // Pick next wish in cycle
      currentWishIndex = (currentWishIndex + 1) % birthdayWishes.length;

      // Icon pop micro-animation
      if (wishEnvelopeIcon) {
        wishEnvelopeIcon.classList.add('pop');
        setTimeout(() => wishEnvelopeIcon.classList.remove('pop'), 300);
      }

      // Fade out old text and transition in new text
      wishQuote.style.opacity = '0';
      wishQuote.style.transform = 'translateY(6px)';

      setTimeout(() => {
        wishQuote.textContent = `“${birthdayWishes[currentWishIndex]}”`;
        if (wishCounter) {
          wishCounter.textContent = `Wish ${currentWishIndex + 1} of ${birthdayWishes.length} 💖`;
        }
        wishQuote.style.opacity = '1';
        wishQuote.style.transform = 'translateY(0)';
      }, 180);

      // Cute burst of sparkles
      launchConfetti(20, window.innerWidth / 2, window.innerHeight * 0.6);
    });
  }

  /* ------------------------------------------------------------------------
     8. OPTIONAL MUSIC PLAYER WITH DREAMY MUSIC-BOX WEB AUDIO FALLBACK
     ------------------------------------------------------------------------ */
  const audioEl = document.getElementById('bg-audio');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');
  let isPlaying = false;
  let audioContext = null;
  let musicBoxTimer = null;

  // Dreamy Music-Box Melody of "Happy Birthday to You" (Notes in Hz)
  const melodyNotes = [
    { freq: 261.63, dur: 0.35 }, // C4
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 293.66, dur: 0.6 },  // D4
    { freq: 261.63, dur: 0.6 },  // C4
    { freq: 349.23, dur: 0.6 },  // F4
    { freq: 329.63, dur: 1.1 },  // E4

    { freq: 261.63, dur: 0.35 }, // C4
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 293.66, dur: 0.6 },  // D4
    { freq: 261.63, dur: 0.6 },  // C4
    { freq: 392.00, dur: 0.6 },  // G4
    { freq: 349.23, dur: 1.1 },  // F4

    { freq: 261.63, dur: 0.35 }, // C4
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 523.25, dur: 0.6 },  // C5
    { freq: 440.00, dur: 0.6 },  // A4
    { freq: 349.23, dur: 0.6 },  // F4
    { freq: 329.63, dur: 0.6 },  // E4
    { freq: 293.66, dur: 0.9 },  // D4

    { freq: 466.16, dur: 0.35 }, // Bb4
    { freq: 466.16, dur: 0.25 }, // Bb4
    { freq: 440.00, dur: 0.6 },  // A4
    { freq: 349.23, dur: 0.6 },  // F4
    { freq: 392.00, dur: 0.6 },  // G4
    { freq: 349.23, dur: 1.3 }   // F4
  ];

  function playMusicBoxTone(freq, duration) {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      // Sine wave with gentle chime harmonics for magical music box feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback note issue:", e);
    }
  }

  function startMusicBoxTune() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    let noteIndex = 0;
    function scheduleNextNote() {
      if (!isPlaying) return;
      const note = melodyNotes[noteIndex];
      playMusicBoxTone(note.freq, note.dur);
      noteIndex = (noteIndex + 1) % melodyNotes.length;
      musicBoxTimer = setTimeout(scheduleNextNote, (note.dur + 0.12) * 1000);
    }
    scheduleNextNote();
  }

  function stopMusicBoxTune() {
    clearTimeout(musicBoxTimer);
    musicBoxTimer = null;
  }

  function toggleMusic() {
    if (!isPlaying) {
      // User tapped to play
      isPlaying = true;
      musicToggleBtn.classList.add('playing');
      musicIcon.textContent = '⏸️';
      musicLabel.textContent = 'Pause';

      if (audioEl && audioEl.src && !audioEl.error) {
        audioEl.play().catch(() => {
          // If local MP3 fails or is not found, fallback to cute synthesizer music-box!
          startMusicBoxTune();
        });
      } else {
        startMusicBoxTune();
      }
    } else {
      // User tapped to pause
      isPlaying = false;
      musicToggleBtn.classList.remove('playing');
      musicIcon.textContent = '🎵';
      musicLabel.textContent = 'Play Song';

      if (audioEl) audioEl.pause();
      stopMusicBoxTune();
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  /* ------------------------------------------------------------------------
     9. FINAL SURPRISE & ONE LAST HUG
     ------------------------------------------------------------------------ */
  const sendHugBtn = document.getElementById('send-hug-btn');
  const hugRevealBox = document.getElementById('hug-reveal-box');
  const hugOverlay = document.getElementById('hug-overlay');
  const hugOverlayClose = document.getElementById('hug-overlay-close');

  if (sendHugBtn) {
    sendHugBtn.addEventListener('click', () => {
      // Show inline message
      if (hugRevealBox) hugRevealBox.classList.add('show');

      // Show full-screen warm hug modal overlay
      if (hugOverlay) hugOverlay.removeAttribute('hidden');

      // Heart & Confetti explosion
      launchConfetti(95, window.innerWidth / 2, window.innerHeight * 0.5);
    });
  }

  if (hugOverlayClose) {
    hugOverlayClose.addEventListener('click', () => {
      if (hugOverlay) hugOverlay.setAttribute('hidden', '');
    });
  }
  if (hugOverlay) {
    hugOverlay.addEventListener('click', (e) => {
      if (e.target === hugOverlay) {
        hugOverlay.setAttribute('hidden', '');
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
