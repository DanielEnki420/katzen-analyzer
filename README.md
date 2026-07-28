# 🐱 KatzenVokal-Analyzer

**Echtzeit-FFT-Spektralanalyse, akustische Klassifikation und KI-Interpretation von Katzenlauten.**

*Institut für angewandte Felinistik · Landshut* — *(fiktives Institut 😉)*

### 🔗 [Live-Demo: danielenki420.github.io/katzen-analyzer](https://danielenki420.github.io/katzen-analyzer/)

> ## 🎭 Wichtiger Hinweis
> Dies ist ein **Entertainment- und Lernprojekt** — keine wissenschaftlich
> validierte Bioakustik-Analyse. Die Klassifikation beruht auf einfachen
> Heuristiken (FFT-Peak-Bin, handgeschriebene Regeln), die KI-Interpretation
> ist eine kreative Deutung dieser Werte durch ein Sprachmodell. Die
> angezeigte „Deutungssicherheit" ist **keine** statistische Konfidenz.
> Bitte **keine Gesundheits- oder Verhaltensentscheidungen** für deine Katze
> auf diese App stützen — bei Sorgen immer Tierarzt/Tierärztin fragen.

---

## Überblick

Eine Single-Page-Web-App, die über das Mikrofon Katzenlaute aufnimmt, in Echtzeit
analysiert und interpretiert:

- 🎙️ **Aufnahme & FFT-Spektrogramm** — Live-Frequenzanalyse via Web Audio API
- 📊 **Akustische Klassifikation** — Miau, Schnurren, Triller, Fauchen, Klagen
- 🎭 **Visuelle Übersetzung** — Emoji-Avatar, deutsche Sprechblase, Stimmungs-Bar
- 🐱 **Laut-Synthese** — artgerechte Antwort an die Katze (Web Audio, offline)
- 🔊 **Text-to-Speech** — Vorlesen der Interpretation
- 🤖 **KI-Interpretation** — „Prof. Dr. Felicitas Mauz" (fiktive KI-Persona) deutet die Akustikdaten
- 💬 **Chat-Modus** — du antwortest, die Katze reagiert

## Technik

- Vanilla HTML/CSS/JS, Single-File (`index.html`)
- Web Audio API · Web Speech API · MediaRecorder
- KI: **Multi-Provider, browser-direkt** (OpenRouter / Groq / Anthropic Claude) —
  kein eigenes Backend; bei Claude zusätzlich Prompt Caching mit der Wissensbasis
- PWA-fähig (Home-Screen-Installation)
- Optional: Docker-Setup (`docker-compose.yml`, `proxy/`, `nginx/`) für
  Self-Hosting — der Proxy ist seit v4.0.0 **Legacy** und nicht mehr nötig

### Was die Analyse tatsächlich tut (ehrlich)

1. FFT im Browser, pro Frame wird der lauteste Frequenz-Bin genommen
   (das ist ein **Näherungswert**, keine echte F0/Pitch-Erkennung)
2. Mittelwert, Streuung und Anfang/Ende-Differenz dieser Werte
3. Handgeschriebene Wenn-dann-Regeln vergeben Punkte für 5 Kategorien
4. Ein Sprachmodell bekommt **nur diese Zahlen** (nicht das Audio!) und
   formuliert daraus eine Deutung

Grenzen: unkalibrierte dB-Werte, Schnurr-Grundton (25–30 Hz) liegt unterhalb
der FFT-Suchgrenze, Live-Anzeige ist ein Momentanspektrum (kein scrollendes
Spektrogramm), Prozentbalken sind relative Punktwerte (keine Wahrscheinlichkeiten).

## Literaturhinweise

McComb et al. (2009) · Schötz (2017, Meowsic / Lund University) · Tavernier et al.
(2020) · Brown & Bradshaw (2014) — die zitierten Arbeiten existieren, **validieren
aber nicht dieses Tool**; sie dienten als Inspiration für die Wissensbasis.

---

## ⚖️ Copyright & Lizenz

**Copyright © 2026 Daniel Enki (DanielEnki420).**
Lizenziert unter der **[Apache License 2.0](./LICENSE)**.

Du darfst den Code nutzen, verändern und weitergeben — auch kommerziell —,
solange Copyright- und Lizenzhinweis erhalten bleiben und Änderungen
kenntlich gemacht werden. Die Software wird „AS IS" ohne Gewährleistung
bereitgestellt. Vollständiger Text: siehe [`LICENSE`](./LICENSE).

> **Ausnahme:** Das eingebettete Katzenfoto (`kater.jpg` bzw. das Base64-Logo
> in `index.html`) ist ein privates Foto des Urhebers und **nicht** von der
> Apache-Lizenz erfasst — bitte durch ein eigenes Bild ersetzen.

### 🔑 API-Schlüssel & KI-Anbieter

Die App bringt **keinen** eigenen Schlüssel mit. Jede/r nutzt den **eigenen
API-Schlüssel** eines unterstützten Anbieters (Bring-your-own-Key):

| Anbieter | Kostenlose Option | Schlüssel holen |
|----------|-------------------|-----------------|
| **OpenRouter** | ✅ viele `:free`-Modelle | <https://openrouter.ai/keys> |
| **Groq** | ✅ gratis, sehr schnell | <https://console.groq.com/keys> |
| **Anthropic Claude** | 💰 kostenpflichtig | <https://console.anthropic.com/settings/keys> |

Der Schlüssel wird **lokal im Browser** (localStorage) gespeichert und geht
per `fetch` **direkt** an den jeweiligen Anbieter — es gibt keinen Server,
der den Schlüssel sieht oder speichert. Für die eigenen API-Kosten ist
jede/r Nutzer/in selbst verantwortlich.

> ⚠️ **localStorage-Hinweis:** Auf GitHub Pages teilen sich alle Projektseiten
> eines Accounts denselben Origin (`danielenki420.github.io`) — der Schlüssel
> ist also für Skripte aller Projekte dieses Accounts lesbar. Wer das nicht
> möchte, nutzt die App self-hosted oder löscht den Schlüssel nach Gebrauch
> (Feld leeren + Speichern bzw. Browser-Daten der Seite löschen). Keine
> Schlüssel auf fremden/geteilten Geräten speichern.
