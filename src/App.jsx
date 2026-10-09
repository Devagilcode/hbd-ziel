
import { useEffect, useRef, useState } from "react";
import "./App.css";

const wishes = [
  "Semoga Ziel selalu sehat, bahagia, dan penuh senyum! 💙",
  "Semoga Ziel tumbuh menjadi anak pintar, baik, dan hebat! 🧸",
  "Semoga semua impian Ziel tercapai dan selalu dilindungi! ⭐",
];

const confetti = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 17) * 0.19}s`,
  duration: `${3 + (i % 5)}s`,
  color: ["#ffcf56", "#66c8ff", "#ff8ca7", "#a6e9ae", "#b9a2ff"][
    i % 5
  ],
}));

const balloons = [
  { color: "#ff90b6", left: "4%", delay: "0s" },
  { color: "#67c8ff", left: "17%", delay: "1.2s" },
  { color: "#ffd166", left: "78%", delay: ".5s" },
  { color: "#bba3ff", left: "91%", delay: "1.8s" },
  { color: "#83dfbb", left: "29%", delay: "2.1s" },
  { color: "#ffae80", left: "68%", delay: "1.4s" },
];

export default function App() {
  const audioRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    document.title = "Happy Birthday Ziel! 🎂";
  }, []);

  async function startParty() {
    setOpened(true);

    // Musik dimulai setelah pengunjung menekan tombol.
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
        setMusicOn(true);
      } catch (error) {
        console.log("Musik belum bisa diputar:", error);
        setMusicOn(false);
      }
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    try {
      await audio.play();
      setMusicOn(true);
    } catch (error) {
      console.log("Gagal memutar musik:", error);
      setMusicOn(false);
    }
  }

  function nextWish() {
    setWishIndex((current) => (current + 1) % wishes.length);
  }

  function blowCandles() {
    setCandlesOut(true);
  }

  return (
    <main className="birthday-page">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music.mp3`}
        loop
        preload="auto"
      />

      <div className="sky-glow" />

      <div className="stars" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 41 + 7) % 100}%`,
              top: `${(i * 29 + 4) % 75}%`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          >
            {i % 3 === 0 ? "✦" : "·"}
          </span>
        ))}
      </div>

      <div className="balloon-field" aria-hidden="true">
        {balloons.map((balloon, i) => (
          <div
            className="balloon"
            key={i}
            style={{
              "--balloon-color": balloon.color,
              left: balloon.left,
              animationDelay: balloon.delay,
            }}
          />
        ))}
      </div>

      {opened && (
        <div className="confetti-layer" aria-hidden="true">
          {confetti.map((item) => (
            <i
              key={item.id}
              style={{
                left: item.left,
                animationDelay: item.delay,
                animationDuration: item.duration,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>
      )}

      <header className="top-label">
        <span>✦</span> ZIEL'S SPECIAL DAY <span>✦</span>
      </header>

      {!opened ? (
        <section className="intro-card">
          <div className="photo-frame intro-photo">
            {!photoError ? (
              <img
                src={`${import.meta.env.BASE_URL}foto.jpeg`}
                alt="Foto Ziel"
                onError={() => setPhotoError(true)}
              />
            ) : (
              <div className="photo-placeholder">
                <span>📸</span>
                <small>Letakkan foto di public/foto-ziel.jpeg</small>
              </div>
            )}
            <span className="photo-heart">💙</span>
          </div>

          <p className="eyebrow">Ada kejutan spesial untuk...</p>

          <h1>
            Happy Birthday
            <span className="name-title">Ziel!</span>
          </h1>

          <p className="intro-copy">
            Hari ini adalah hari istimewa untuk anak hebat dan menggemaskan!
          </p>

          <div className="gift-box">🎁</div>

          <button className="party-button" onClick={startParty}>
            Buka Kejutan! ✨
          </button>

          <p className="tiny-note">
            Psst... ada pesta ajaib menunggumu 💙
          </p>
        </section>
      ) : (
        <section className="party-content">
          <div className="party-heading">
            <div className="sparkle">✨🎉✨</div>
            <p className="eyebrow">Hari yang penuh keajaiban</p>

            <h1>
              Happy Birthday
              <span className="name-title">Ziel!</span>
            </h1>

            <p className="subtitle">
              Horeee! Hari ini semua bintang bersinar untuk Ziel! 🌟
            </p>
          </div>

          <section className="memory-card">
            <div className="photo-frame main-photo">
              {!photoError ? (
                <img
                  src={`${import.meta.env.BASE_URL}foto.jpeg`}
                  alt="Kenangan indah Ziel"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="photo-placeholder">
                  <span>🧸</span>
                  <small>Foto Ziel akan tampil di sini</small>
                </div>
              )}
            </div>
            <p className="memory-caption">
              Anak hebat, senyum terindah! 💙
            </p>
          </section>

          <div className="birthday-scene">
            <span className="scene-cloud cloud-left">☁️</span>
            <span className="scene-cloud cloud-right">☁️</span>

            <div className="party-hat">🥳</div>

            <div className="cake-area">
              <div className="candles">
                {[0, 1, 2, 3, 4].map((candle) => (
                  <button
                    key={candle}
                    className={`candle ${
                      candlesOut ? "extinguished" : ""
                    }`}
                    onClick={blowCandles}
                    aria-label="Tiup lilin ulang tahun"
                  >
                    <span className="flame">🔥</span>
                  </button>
                ))}
              </div>

              <div className="cake-top" />

              <div className="cake-body">
                <span>🍓 🍬 🍓</span>
                <strong>ZIEL</strong>
                <span className="cake-stars">★ ★ ★</span>
              </div>

              <div className="cake-plate" />
            </div>

            <div className="friend friend-left">🦁</div>
            <div className="friend friend-right">🐧</div>
            <div className="tiny-friend">🐻</div>
          </div>

          <section className="wish-card">
            <div className="wish-icon">💌</div>
            <h2>Doa untuk Ziel</h2>

            <p key={wishIndex} className="wish-text">
              {wishes[wishIndex]}
            </p>

            <button className="wish-button" onClick={nextWish}>
              Doa berikutnya 💫
            </button>
          </section>

          <div className="birthday-actions">
            <button className="party-button" onClick={blowCandles}>
              Tiup Lilin! 🌬️
            </button>

            <button className="music-button" onClick={toggleMusic}>
              {musicOn ? "🔊 Matikan Musik" : "🎵 Putar Musik"}
            </button>
          </div>

          {candlesOut && (
            <div className="magic-message">
              <span>🎉</span>
              <p>Yeay! Selamat ulang tahun, Ziel!</p>
              <p>Semoga semua harapanmu terkabul! 💙</p>
              <span>🎊</span>
            </div>
          )}

          <button
            className="replay-button"
            onClick={() => {
              setOpened(false);
              setCandlesOut(false);
            }}
          >
            ↻ Lihat Pembukaan Lagi
          </button>
        </section>
      )}

      <footer className="footer">
        Dibuat dengan penuh cinta untuk Ziel <span>💙</span>
      </footer>
    </main>
  );
}