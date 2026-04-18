# monolith.eeg → axidraw

Muse EEG başlığından gelen canlı beyin dalgalarını AxiDraw plotter'ın hareketine çeviren tek-dosya bir HUD uygulaması. Tarayıcı Muse'a Bluetooth ile, AxiDraw'a USB seri ile doğrudan bağlanır — backend yok.

## Hızlı başlangıç

1. `hud.html`'i bir **HTTPS URL**'den aç. `file://` veya `http://` çalışmaz — Web Bluetooth ve Web Serial sadece secure context'te aktif. (Lovable, GitHub Pages, Netlify, Cloudflare Pages — hepsi olur.)
2. **Chrome veya Edge** kullan. Safari/Firefox bu API'leri desteklemiyor.
3. Header'daki **MUSE** butonuna bas → cihaz listesinden Muse'u seç.
4. Header'daki **AXIDRAW** butonuna bas → seri port listesinden AxiDraw'ı seç.
5. Kalemi kağıdın ortasına elinle park et (kod başlangıç pozisyonunu A3 merkezi, 210×148.5mm kabul eder).
6. Muse'u kafaya tak, `signal.integrity` > 0.60 olana kadar bekle.
7. **START** bas. CHECKING (4s warmup) → ACTIVE.

## Mimari

Tek HTML dosyası, tek `<script>` bloğu. Backend yok, build adımı yok.

### Veri akışı

```
Muse (BLE) ──notifications──▶ ch.buffer[] ──┐
                                             ├──▶ band powers (sine projection)
                                             ├──▶ signal quality (variance + 60Hz leak)
                                             │
                    state machine  ◀──────────┘
                    IDLE → CHECKING → ACTIVE → PAUSED
                                       │
                                       ▼
                              stepPlotter()
                              virtual x,y,penDown
                                       │
                                       ├──▶ drawPlot()  (HUD preview)
                                       │
                                       └──▶ tickAxi() every 60ms
                                              │
                                              ▼
                                      EBB commands over Serial
                                      SP,n (pen) / XM,dur,dx,dy (move)
```

### Önemli sabitler (HUD'un başında, CONFIG bloğu)

| Sabit | Ne yapar |
|---|---|
| `CHECK_DURATION_MS = 4000` | START'tan sonra warmup süresi |
| `CONTACT_GOOD = 0.60` | Üstünde: iyi kontak (resume/confirm) |
| `CONTACT_BAD = 0.40` | Altında: kontak kayıp (PAUSE) |
| `CONFIDENCE_MIN/MAX = 0.45/0.75` | ACTIVE içi graceful degradation bandı — hız buna göre skalalanır |
| `PEN_DOWN_MIN = 0.60` | Altında kalem asla inmez (noisy ama çalışır) |
| `AXI_STEPS_PER_MM = 80` | AxiDraw V3/SE/A3 default; V2 farklı olabilir |
| `AXI_TICK_MS = 60` | Plotter'a komut gönderme aralığı |

### Mapping

EEG band power'ları plotter davranışına şöyle bağlı:
- **α (alpha)** → X ekseni drift (pozitif sağa, negatif sola)
- **β (beta)** → Y ekseni drift
- **γ (gamma)** → kalem iniş/kalkış tetiği (düşük gamma = pen down)
- **θ (theta)** → şu an kullanılmıyor (UI'da yazıyor, mapping'e eklenmedi)

Değiştirmek için `stepPlotter()` içindeki `vx`/`vy`/`wantPen` hesaplarına bak.

### Signal quality / contact detection

Kafada olmayan elektrot her zaman bir şeyler gönderir — 60Hz mains hattını anteni gibi yakalar. Biz iki metrikle ayırt ediyoruz:

1. **Variance (std)** — sağlıklı aralığın dışında (çok düşük = flat / railed) → skor 0
2. **60Hz projeksiyon** — sinyalin mains ile korelasyonu. Yüksekse havada demektir.

`computeQuality()` bu ikisinin ağırlıklı skorunu low-pass filter ile smooth eder.

### AxiDraw komut formatı (EBB firmware)

Plotter'a ne gittiğini bilmek istersen:

| Komut | Anlamı |
|---|---|
| `EM,1,1` | Motor enable (X, Y) |
| `SC,4,20000` | Pen-up servo pozisyonu |
| `SC,5,12000` | Pen-down servo pozisyonu |
| `SC,10/11,400` | Pen up/down rate |
| `SP,0` / `SP,1` | Pen down / pen up |
| `XM,dur_ms,steps_x,steps_y` | Koordineli hareket |

Tam referans: [evil-mad.github.io/EggBot/ebb.html](http://evil-mad.github.io/EggBot/ebb.html)

## Çalışma modları

Cihaz bağlı/bağlı değil, karışık olabilir:

| Muse | AxiDraw | Davranış |
|---|---|---|
| ✕ | ✕ | Full simülasyon (test için ideal) |
| ✓ | ✕ | Gerçek EEG, sanal plotter (preview) |
| ✕ | ✓ | Sanal EEG, gerçek plotter (motion test) |
| ✓ | ✓ | Full gerçek pipeline |

`signal.integrity` panelindeki **SIM CONTACT** toggle (`WEARING` / `FLOATING`) sadece simülasyon modunda anlamlı — Muse bağlıysa disabled olur.

## Bilinen eksiklikler

- **Başlangıç pozisyonu kalibre değil.** Kod (210, 148.5) varsayar. Kullanıcı kalemi manuel park ediyor. İleride bir `home` butonu gerekebilir.
- **Band power hesaplaması kaba.** Sine projection @ 3 merkez frekansı — tam FFT değil, gerçek PSD değil. Bant ayrımı için yeterli ama tıbbi değil.
- **Pen pozisyon/hız mapping'i sabit katsayılar.** UI'daki slider'lar görsel hız gainini etkiler ama EBB `SC,4/5/10/11` default değerlerini değiştirmez. Gerçek servo davranışını slider'dan ayarlamak istenirse `setupSlider` render'ına bir `axiSend('SC,...')` eklemek gerek.
- **Tek kanallı quality.** `computeQuality` sadece `channels[0]`'a bakar. Bir elektrot yalnız düşerse fark etmeyebilir.
- **Reconnect yok.** BLE bağlantısı koparsa sessiz kalır — "retry" butonu yok, sayfayı yenilemek gerek.

## Dosya düzeni

```
hud.html          ← tek dosya. Dokun, deploy et.
README.md         ← bu dosya (insanlar için)
CLAUDE.md         ← Claude Code için context
```

## Yerel düzenleme

Dosyayı text editörde aç, değiştir, Lovable'a tekrar yükle. Kod bölümlere ayrılmış — HTML'in en başındaki yorum bloğuna göz at, orada bölüm haritası var.

Claude Code'la çalışacaksan: klasörde `claude` komutuyla aç. `CLAUDE.md`'yi otomatik okur.
