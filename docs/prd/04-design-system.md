# 04 — Design System

---

## 4.1 Renk Paleti

| Rol        | Renk            | HEX     |
| ---------- | --------------- | ------- |
| Primary    | Warm Amber      | #F59E0B |
| Secondary  | Soft Sage Green | #86EFAC |
| Accent/CTA | Terracotta      | #C2410C |
| Background | Warm Off-White  | #FFFBEB |
| Text       | Charcoal        | #1C1917 |
| Muted      | Warm Gray       | #A8A29E |
| Danger     | Red             | #DC2626 |
| Success    | Green           | #16A34A |

---

## 4.2 Tipografi

| Kullanim      | Font              | Agirlik                     |
| ------------- | ----------------- | --------------------------- |
| Basliklar     | Plus Jakarta Sans | Bold (700)                  |
| Govde         | Inter             | Regular (400), Medium (500) |
| Accent/Alinti | Caveat            | Regular (400)               |

Tum fontlar `next/font` ile self-hosted olarak yuklenir (harici istekler yok).

---

## 4.3 UI Prensipleri

- **Border radius:** 16px-24px (yuvarlatilmis koseler)
- **Golgeleme:** Sicak tonlarda yumusak golge
- **Bolum ayiricilari:** Organik blob sekiller (SVG)
- **Dekoratif element:** Pati izi motifi
- **Micro-interactions:** Hover scale-up, shadow artisi
- **Custom cursor:** Pati izi (sadece desktop, `pointer-events` ve `cursor: none` ile)
- **Kartlar:** Sicak tonlu border, hover'da yukselen golge efekti
- **CTA Butonlari:** Terracotta arka plan, beyaz metin, hover'da darken

---

## 4.4 Animasyon Stratejisi

| Kutuphane | Kullanim Alani                               |
| --------- | -------------------------------------------- |
| Motion    | Genel UI animasyonlari (hover, enter/exit, layout transitions) |
| GSAP      | Scroll-triggered animasyonlar, timeline, parallax efektleri    |

### Prensipler

- Animasyonlar `prefers-reduced-motion` medya sorgusuna uyar
- Ilk yuklemede sadece hero ve above-the-fold animasyonlari oynatilir
- Scroll animasyonlari `IntersectionObserver` (GSAP ScrollTrigger) ile tetiklenir
- Animasyon sureleri 200-500ms arasi (hiz hissi icin)

---

## 4.5 Responsive Strateji

| Breakpoint | Genislik   | Davranis                                    |
| ---------- | ---------- | ------------------------------------------- |
| Mobile     | < 640px    | Tek kolon, hamburger menu, sticky CTA       |
| Tablet     | 640-1024px | 2 kolon grid, daraltilmis navigasyon        |
| Desktop    | > 1024px   | 3-4 kolon grid, tam navigasyon, custom cursor |

- Tum sayfalar 320px-1920px arasinda duzgun gorunur
- Mobilde hamburger menu calisir
- Mobilde sticky "Bagis Yap" CTA gorunur
- Custom cursor sadece desktop'ta aktif, mobilde devre disi

---

## 4.6 Accessibility (WCAG 2.1 AA)

### Hedef

WCAG 2.1 AA standartlarina tam uyum.

### Gereksinimler

| Alan                 | Gereksinim                                              |
| -------------------- | ------------------------------------------------------- |
| Keyboard Navigation  | Tum interaktif elementlere tab ile erisilebilir          |
| Screen Reader        | Tum gorsel elementlerde `aria-label` ve semantic HTML    |
| Color Contrast       | Minimum 4.5:1 (normal text), 3:1 (large text / UI)     |
| Focus Visible        | Tum focusable elementlerde gorunur focus ring            |
| Skip to Content      | Sayfa basinda "Icerigi atla" linki                      |
| Alt Text             | Tum gorsellerde zorunlu alt text (Media collection)     |
| Form Labels          | Tum form alanlari icin iliskilendirilmis label           |
| Error Announcements  | Form hatalari screen reader'a `aria-live` ile duyurulur  |
| Language             | `<html lang="tr">` veya `<html lang="en">` dinamik     |
| Motion               | `prefers-reduced-motion` medya sorgusuna uyum            |

### Test Araci

- Lighthouse Accessibility skoru: 90+ hedef
- axe DevTools ile manuel test
