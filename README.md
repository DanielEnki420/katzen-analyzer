# 🐱 KatzenVokal-Analyzer

**Echtzeit-FFT-Spektralanalyse, akustische Klassifikation und KI-Interpretation von Katzenlauten.**

*Institut für angewandte Felinistik · Landshut*

---

## Überblick

Eine Single-Page-Web-App, die über das Mikrofon Katzenlaute aufnimmt, in Echtzeit
analysiert und interpretiert:

- 🎙️ **Aufnahme & FFT-Spektrogramm** — Live-Frequenzanalyse via Web Audio API
- 📊 **Akustische Klassifikation** — Miau, Schnurren, Triller, Fauchen, Klagen
- 🎭 **Visuelle Übersetzung** — Emoji-Avatar, deutsche Sprechblase, Stimmungs-Bar
- 🐱 **Laut-Synthese** — artgerechte Antwort an die Katze (Web Audio, offline)
- 🔊 **Text-to-Speech** — Vorlesen der Interpretation
- 🤖 **KI-Interpretation** — „Prof. Schötz" (Claude API) deutet die Akustikdaten
- 💬 **Chat-Modus** — du antwortest, die Katze reagiert

## Technik

- Vanilla HTML/CSS/JS, Single-File (`index.html`)
- Web Audio API · Web Speech API · MediaRecorder
- KI-Backend: Node-Proxy auf Raspberry Pi 5 → Anthropic Claude API
- Prompt Caching mit feliner Bioakustik-Wissensbasis
- PWA-fähig (Home-Screen-Installation)

> Die öffentliche GitHub-Pages-Version läuft **ohne KI-Backend** (lokale Features
> funktionieren, KI-Analyse & Chat nur auf der privaten Pi5-Instanz).

## Wissenschaftliche Grundlage

McComb et al. (2009) · Schötz (2017, Meowsic / Lund University) · Tavernier et al.
(2020) · Brown & Bradshaw (2014) — als Zitate gekennzeichnet, Eigentum der jeweiligen
Autoren.

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

Der Schlüssel wird **ausschließlich lokal im Browser** (localStorage)
gespeichert und geht per `fetch` **direkt** an den jeweiligen Anbieter —
es gibt keinen Server, der den Schlüssel sieht oder speichert. Für die
eigenen API-Kosten ist jede/r Nutzer/in selbst verantwortlich.
