# CLAUDE.md

Bu dosya Claude Code tarafından otomatik okunur. Okuyucunun proje hakkında önceden hiçbir şey bilmediğini varsayar.

## Proje

**monolith.eeg → axidraw** — Muse EEG başlığından gelen sinyalleri AxiDraw plotter'a gerçek zamanlı olarak yazdıran tek-dosya tarayıcı uygulaması. Sahibi: Okan Uckun (Monolith Studio).

## Dosyalar

- **`hud.html`** — tüm uygulama. HTML + CSS + JS tek dosyada. **Başka dosya yok.** Build adımı yok. Paket yok.
- **`README.md`** — insan okuyucuya yönelik genel açıklama.
- **`CLAUDE.md`** — bu dosya.

## Teknoloji seçimleri (değiştirme, sebep var)

- **Tek dosya** — Okan Lovable'a yükleyebilsin diye. Kodu birden fazla dosyaya bölme. Build pipeline önerme. npm, bundler, framework önerme.
- **Vanilla JS, framework yok** — React/Vue ekleme. Sadece düz DOM + Canvas.
- **Web Bluetooth + Web Serial** — backend yok, WebSocket yok, Python yok. Okan daha önce Python backend'i istemedi, gereksiz karmaşıklık olarak reddetti. Yeniden önerme.
- **Fontlar:** Major Mono Display (başlık), Share Tech Mono (gövde). Google Fonts CDN'inden yükleniyor. Inter/Roboto/sistem fontu önerme.
- **Tema:** dark default, light alternatif. CSS değişkenleriyle. Renk eklersen mutlaka iki tema için de tanımla.

## Estetik kurallar

- **Brutalist / endüstriyel HUD.** Askeri terminal + NERV MAGI havası.
- Yüksek kontrast, mono renk paleti. Gradient, neon, renkli vurgu yok.
- Corner tick mark'lar, scanlines, dotted grid zemin — bunlar projenin imzası, bozma.
- Motion: minimal. Sadece pulse (aktif durumlar), blink (cursor, uyarılar), progress ring (warmup). Bouncy animation, spring, parallax ekleme.
- İkonografi: `▶ ■ ◐ ⚠ ●` — sade unicode, emoji değil, resim değil.

## Mimari özet

Kod `<script>` bloğu içinde şu bölümlere ayrılmış (başlıklar `═══` banner'ları ile işaretli):

1. **CONFIG** — tüm tuning sabitleri. Davranış değiştirmek istiyorsan önce buraya bak.
2. **STATE** — merkezi `state` objesi. Tek kaynak (single source of truth). Yeni özellik eklerken yeni alt-state'i buraya koy.
3. **DOM SETUP** — band bar'ları, slider'lar, canvas'lar. Her biri kendi setup fonksiyonunda.
4. **EEG: SIMULATED SOURCE** — `stepEEG()`. Cihaz bağlı değilken fake dalga üretir.
5. **EEG: REAL BAND POWER** — `computeBandsFromReal()`. Muse bağlıyken band güçlerini hesaplar.
6. **QUALITY / CONTACT DETECTION** — `computeQuality()`. Variance + 60Hz leak ile kontak tespiti.
7. **SESSION STATE MACHINE** — `IDLE → CHECKING → ACTIVE → PAUSED`. `transition()` + `tickSession()`.
8. **PLOTTER (virtual drive)** — `stepPlotter()`. Sanal pozisyonu günceller. HUD preview ve gerçek AxiDraw aynı pozisyonu izler.
9. **MUSE (Web Bluetooth)** — `connectMuse()`, `handleMuseEeg()`. Muse 2/S/2016 karakteristik UUID'leri.
10. **AXIDRAW (Web Serial, EBB)** — `connectAxidraw()`, `tickAxi()`, `axiSend()`. EBB firmware text komutları.
11. **RENDERERS** — `drawEEG()`, `drawPlot()`. 60fps canvas çizimi.
12. **DOM UPDATE** — `updateDOM()` + UI yardımcıları. Throttled (80ms) — DOM sık güncellenmemeli.
13. **LOG** — alt bar feed'i. `pushLog()` sadece son 5 girişi tutar.
14. **INPUT / BUTTONS** — event listener'lar. Keyboard shortcut'lar (space/t/c).
15. **MAIN LOOP** — `requestAnimationFrame` ile tek loop.
16. **BOOT** — staggered log mesajları, UI init.

## Mutlaka uy

- **Hardware komutları kullanıcının işini berbat edebilir.** AxiDraw komut göndermeyi etkileyen değişiklik önce simülasyonda test edilmeli. `MAX_MM = 6` güvenlik clamp'ini `tickAxi()`'den kaldırma — kaldırırsan tek tick'te kalem kağıdı yırtabilir.
- **EEG cihazı her zaman veri gönderir** (kafada olmasa bile). Quality skoru bu yüzden binary değil, continuous. Quality kontrolünü bypass eden kısayol ekleme.
- **Blocking operation yok.** Main loop her frame çalışır. Uzun iş olursa (async FFT, dosya I/O, vs.) ya web worker'a at ya da çağırma.
- **Memory leak dikkat.** `channels[i].buffer` sabit uzunluklu ring buffer, `state.plot.trail` 3000 nokta cap'li — bu sınırları büyütürsen GC spike yaşarsın.
- **DOM yazımını throttle et.** Örnek: `updateDOM` şu an 80ms'de bir. Canvas çizimi her frame olur ama DOM text setleri nadir.

## Önerme

- Backend, WebSocket, Python, Node, Electron — istenmedi.
- React, Vue, Svelte — gereksiz.
- Çoklu dosya yapısı, build sistemi — Lovable akışını bozar.
- Analytics, tracking, telemetry — proje kişisel kullanım için.
- localStorage / IndexedDB — henüz gereksinim yok, eklersen önce sor.

## Bilinen zayıflıklar (iyileştirme fırsatları)

- Band power sine projection (tam FFT değil). DSP kütüphanesi eklemeden native FFT yazılabilir.
- `computeQuality()` sadece `channels[0]`'a bakıyor — 4 kanala genişletilebilir.
- Başlangıç pozisyonu (210, 148.5) hardcoded. "Kalemi buraya park et, başlangıç say" gibi bir kalibrasyon butonu iyi olur.
- Slider'lar sadece HUD tarafı hız çarpanını etkiliyor. Gerçek AxiDraw servo parametreleri (`SC,4/5/10/11`) slider değiştiğinde `axiSend` ile güncellenmiyor — bu kolay bir iyileştirme.
- Reconnect yok. BLE kopunca sessizce düşüyor.
- Theta (θ) band'i HUD'da gösteriliyor ama plotter mapping'inde kullanılmıyor.

## Ortak görev başlangıçları

**"mapping değiştir"** → `stepPlotter()` içinde `vx`, `vy`, `wantPen` hesapları. Değişken olarak state.bands.X kullanır.

**"yeni panel ekle"** → HTML'de `.panel` copy'le, `.grid` içine koy, CSS `grid-template-rows/columns` ayarını güncelle. Corner span'lari (`c-bl`, `c-br`) unutma.

**"EBB komutu ekle"** → `axiSend('CMD,args')` çağır. `connectAxidraw()`'da init yerleştir, `tickAxi()` veya butondan trigger et. Referans: http://evil-mad.github.io/EggBot/ebb.html

**"başka EEG cihazı destekle"** → `connectMuse()` yapısını kopyala, UUID'leri değiştir, sample decoder'ı (`handleMuseEeg`) değiştir. Muse 12-bit packed, başka cihazlar int16 olabilir.

**"tema renkleri değiştir"** → `:root` ve `[data-theme="light"]` blokları. Her iki tema da tanımlı olmalı.

## Debug ipuçları

- Console'da `state` globale expose edilmiyor — gerekirse `window.__state = state` ekleyip bak.
- BLE sorunu: Chrome `chrome://bluetooth-internals/` açıp cihazı gör, reset et.
- Serial sorunu: AxiDraw'ı kapat-aç, USB değiştir. Windows'ta driver'ı EMS yükleyip CH340 sürücüsü istenebilir.
- `signal.integrity` sıfıra çakılırsa: variance 0 demektir, buffer'a veri akmıyor. Muse disconnect olmuş olabilir, bağlantı butonunu kontrol et.
