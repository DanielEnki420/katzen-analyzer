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

**Copyright © 2026 Daniel Enki (DanielEnki420). Alle Rechte vorbehalten / All Rights Reserved.**

Dieses Projekt ist **proprietär** und steht unter einer restriktiven Lizenz.

- ✅ **Erlaubt:** Ansehen des Quellcodes auf GitHub zu Informationszwecken.
- ❌ **Nicht erlaubt** (ohne schriftliche Genehmigung des Urhebers): Kopieren,
  Herunterladen, Verändern, Weiterverbreiten, Veröffentlichen, kommerzielle oder
  nicht-kommerzielle Nutzung, Einsatz in eigenen Projekten.

Das eingebettete Katzenfoto ist ein privates Foto des Urhebers und genießt
denselben Schutz.

Vollständige Bedingungen: siehe [`LICENSE`](./LICENSE).
Lizenzanfragen über: [github.com/DanielEnki420](https://github.com/DanielEnki420)
