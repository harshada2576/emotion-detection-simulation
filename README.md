# 🎭 Emotion Detection & Mental Health Assistant

<div align="center">
  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)


</div>

A client-side web application that detects emotions (text, voice, facial input), offers AI-like supportive responses, and provides local analytics to help users monitor emotional wellbeing. Designed for privacy-first, offline-capable usage (where applicable).

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Privacy & Safety](#privacy--safety)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## About

This project combines multiple client-side techniques to detect and visualize emotional states and to provide actionable, supportive suggestions. It is intended for awareness and educational purposes and is not a substitute for professional mental health care.

## Features

- Multi-modal emotion recognition
  - Text analysis (keyword & simple sentiment heuristics)
  - Voice transcription → emotion inference (Web Speech API)
  - Manual facial-expression selection (no webcam ML in this build)
- AI-like contextual responses and suggested coping strategies
- Interactive mental health exercises (breathing, meditation, journaling)
- Local analytics and visualizations using Chart.js
- Session persistence via LocalStorage
- Privacy-first — primarily client-side processing

## Demo & Screenshots

- Live demo: https://your-username.github.io/emotion-detection-app
- Replace demo link with your GitHub Pages or hosting URL.
- Add screenshots to `/assets` and reference them here for better README visuals.

## Quick Start

### Prerequisites

- Modern browser (Chrome/Edge recommended for Web Speech API)
- Optionally: Node.js (for local static server)

### Run locally (static)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/emotion-detection-app.git
   cd emotion-detection-app
   ```

2. Serve files:

   - Using Python 3:
     ```bash
     python -m http.server 8000
     ```
   - Using Node (http-server):
     ```bash
     npx http-server -c-1
     ```
   - Or simply open `index.html` in the browser (some features like Speech API require HTTPS or localhost).

3. Open:
   - http://localhost:8000

## Usage

### Text Analysis
- Enter a message in the text box and click "Analyze".
- The app returns an emotion label, confidence indicators, and suggested actions.

### Voice Input
- Click "Start Recording" (Chrome/Edge recommended).
- Speak for a few seconds, stop, then view the transcription and inferred emotion.

### Facial / Manual Input
- Click an emotion icon (😊 😢 😠 😲 😐 😰) to register an emotion quickly.

### Exercises & Analytics
- Use the breathing and meditation tools for guided sessions.
- Visit the Analytics screen to view charts of session history and trends.

## Project Structure

```
emotion-detection-app/
├── index.html                 # Main UI
├── style.css                  # Styles
├── script.js                  # App entry & UI handlers
├── emotion-detector.js        # Core emotion detection logic
├── interaction-engine.js      # Response & exercise logic
├── analytics.js               # Charting & reporting logic
├── assets/                    # Images, icons, screenshots
├── README.md                  # This file
└── LICENSE                    # MIT License
```

Adjust filenames to match your repo. Move modules into `src/` and use a build pipeline if the project grows.

## Technical Details

- Frontend: HTML5, CSS3, vanilla ES6+
- Charts: Chart.js
- Speech Recognition: Web Speech API (best support in Chromium-based browsers)
- Storage: localStorage for sessions and preferences
- No backend required for core features

Example snippet (text analysis placeholder):
```javascript
class EmotionDetector {
  static analyzeText(text) {
    // simplistic keyword-based detection; replace with NLP model for production
    const mapping = { happy: 'joy', sad: 'sadness', angry: 'anger' };
    // ...implementation...
  }
}
```

## Privacy & Safety

- All personal data and processing are local to the browser unless you explicitly integrate a backend or external API.
- Do not use this app as a replacement for licensed mental health services.
- For users in crisis, include emergency resources appropriate to your jurisdiction in the UI.

## Contributing

Contributions welcome. Suggested workflow:

1. Fork the repository
2. Create a branch: git checkout -b feat/awesome-feature
3. Commit changes: git commit -m "Add awesome feature"
4. Push: git push origin feat/awesome-feature
5. Open a Pull Request

Please include tests or manual reproduction steps with changes. Optionally add an issue for large features first.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

## Acknowledgements

- Chart.js for charting
- Web Speech API for voice features
- Open source community resources and mental health organizations for guidance

## Contact

For issues, feature requests, or questions, please open an issue in the repository or contact the maintainer (replace with your email or GitHub handle).

---
Built with care for privacy and accessibility.

