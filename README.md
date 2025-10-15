# 🎭 Emotion Detection & Mental Health Assistant

<div align="center">
  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

</div>

An advanced, privacy-first web application that detects emotions through multiple modalities (text, voice, facial expressions, and real-time webcam analysis), provides AI-powered supportive responses, mental health exercises, progress tracking, and comprehensive analytics to help users monitor their emotional wellbeing.

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

## ✨ Features

### 🎯 Multi-Modal Emotion Detection
- **Text Analysis**: Advanced keyword-based and sentiment analysis with confidence scoring
- **Voice Recognition**: Real-time speech-to-text with emotion inference (Web Speech API)
- **Facial Expression Selection**: Manual emotion input via emoji buttons
- **Real-time Webcam Analysis**: Live facial emotion detection (requires camera access)
- **Advanced Analysis**: Deep text analysis with TensorFlow.js toxicity detection

### 🧠 Mental Health Support
- **AI-Powered Responses**: Contextual, empathetic responses based on detected emotions
- **Personalized Suggestions**: Tailored coping strategies and wellness recommendations
- **6 Comprehensive Exercises**:
  - 🌬️ 4-7-8 Breathing Exercise
  - 🧘 Guided Meditation (5-minute sessions)
  - 💪 Progressive Muscle Relaxation (PMR)
  - 🔄 CBT Thought Records
  - 📝 Guided Journaling
  - 🌍 5-4-3-2-1 Grounding Technique

### 📊 Advanced Analytics & Progress Tracking
- **Real-time Dashboards**: Visualize emotional trends with interactive charts
- **Streak Tracking**: Monitor consecutive days of check-ins
- **Achievement System**: Unlock milestones for consistent use
- **Emotion Heatmap**: Visual representation of mood patterns over time
- **Data Export**: Download your emotional history (CSV/JSON)
- **Automated RPA Reports**: Schedule and generate comprehensive wellbeing reports

### ♿ Accessibility & Internationalization
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Large Text Mode**: Adjustable font sizes
- **Reduced Motion**: Animation controls for users sensitive to movement
- **Multi-language Support**: English, Spanish, French, German
- **Screen Reader Compatible**: ARIA labels and live regions
- **Keyboard Navigation**: Full keyboard accessibility

### 🔒 Privacy & Security
- **100% Client-Side Processing**: No data leaves your browser
- **Local Storage**: All data stored securely in your browser
- **No Account Required**: Use anonymously without registration
- **Offline Capable**: Core features work without internet connection

## 🚀 Quick Start

### Prerequisites

- **Modern Web Browser**: Chrome, Edge, Firefox, or Safari (Chrome/Edge recommended for full Web Speech API support)
- **Node.js**: v18.0.0 or higher (for local development server)
- **npm**: v9.0.0 or higher

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harshada2576/emotion-detection-simulation.git
   cd emotion-detection-simulation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   - Navigate to http://localhost:8080
   - The app will open automatically

### Alternative: Static File Serving

If you prefer not to use Node.js:

**Using Python 3**:
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Using PHP**:
```bash
php -S localhost:8000
```

**Or simply open `index.html` directly in your browser** (note: some features like Web Speech API require localhost or HTTPS)

## 📖 Usage

### 💬 Text-Based Emotion Analysis

1. Type or paste your message in the text input area
2. Click **"Analyze Emotion"** for quick keyword-based analysis
3. Click **"Advanced Analysis"** for deeper sentiment and toxicity detection using TensorFlow.js
4. View results showing:
   - Detected emotion with emoji
   - Confidence percentage
   - Emotional breakdown chart
   - AI-generated supportive response
   - Personalized suggestions

### 🎤 Voice Input

1. Click **"Start Recording"** (Chrome/Edge recommended)
2. Speak clearly about your feelings for a few seconds
3. Click **"Stop Recording"** when finished
4. The app transcribes your speech and analyzes the emotion
5. View the same comprehensive results as text analysis

### 😊 Quick Emotion Input

- Click any emotion emoji button (😊 😢 😠 😲 😐 😰)
- Instantly receive supportive responses and exercise suggestions
- Perfect for quick check-ins when you know your current mood

### 📷 Real-time Webcam Analysis

1. Click **"Start Camera"** to enable your webcam
2. Position your face in the video frame
3. Click **"Capture Emotion"** to analyze your facial expression
4. The app detects emotion from your facial features
5. (Note: This feature may require additional setup for production use)

### 🧘 Mental Health Exercises

1. Browse exercises by category:
   - **Quick Exercises**: 4-7-8 breathing, 5-minute meditation
   - **Therapy Techniques**: Progressive relaxation, CBT thought records
   - **Mindfulness**: Guided journaling, grounding techniques
2. Click **"Start Exercise"** on any card
3. Follow the guided prompts and instructions
4. Complete exercises to earn achievements and track progress

### 📊 View Analytics & Progress

1. Scroll to the **Analytics** section
2. Select time range (7, 30, or 90 days)
3. Explore visualizations:
   - Weekly mood distribution pie chart
   - Emotion frequency bar chart
   - Trends over time line graph
   - Interactive mood heatmap
4. Click **"Export Data"** to download your history
5. Generate RPA reports for comprehensive insights

### ♿ Accessibility Features

- Toggle **High Contrast** mode for better visibility
- Enable **Large Text** for easier reading
- Turn on **Reduce Motion** if animations are distracting
- Select your preferred **Language** from the dropdown
- Use keyboard navigation (Tab, Enter, Escape) throughout the app

## 📂 Project Structure

```
emotion-detection-simulation/
├── index.html                      # Main HTML entry point with complete UI
├── style.css                       # Comprehensive styles and responsive design
├── script.js                       # Main application controller and event handlers
│
├── Core Detection Modules
├── emotion-detector.js             # Keyword-based text emotion analysis
├── advanced-emotion-detector.js    # TensorFlow.js-powered deep analysis
│
├── Feature Modules
├── interaction-engine.js           # AI response generation and suggestions
├── mental-health-exercises.js      # Guided exercises and wellness activities
├── progress-tracker.js             # Achievements, streaks, and milestones
├── analytics.js                    # Chart generation and data visualization
├── community-insights.js           # Aggregated wellness insights
│
├── Accessibility & i18n
├── accessibility-manager.js        # Contrast, text size, motion controls
├── i18n.js                         # Multi-language translations
│
├── Configuration & Assets
├── package.json                    # Dependencies and scripts
├── assets/                         # Images, icons, demo screenshots
│   ├── demo-screenshot.png
│   └── emotion-chart.png
│
├── Documentation
├── README.md                       # This file
├── LICENSE                         # MIT License
├── DESCRIPTION.md                  # Detailed project description
└── PRIVACY.md                      # Privacy policy and data handling
```

### 🔧 Key Technologies

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **ML/AI**: TensorFlow.js (toxicity model), keyword-based NLP
- **Visualization**: Chart.js for interactive charts and graphs
- **Speech**: Web Speech API (SpeechRecognition)
- **Storage**: LocalStorage API for session persistence
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🔬 Technical Details

### Emotion Detection Algorithm

The app uses a multi-layered approach:

1. **Basic Detection** (`emotion-detector.js`):
   - Keyword matching with weighted scoring
   - 6 emotion categories: happy, sad, angry, anxious, surprised, neutral
   - 60+ emotion keywords per category
   - Confidence calculation based on keyword frequency

2. **Advanced Detection** (`advanced-emotion-detector.js`):
   - TensorFlow.js toxicity model integration
   - Sentiment intensity scoring
   - Context-aware analysis
   - Multi-dimensional emotional breakdown

Example code snippet:
```javascript
class EmotionDetector {
  static analyzeText(text) {
    const lowercaseText = (text || '').toLowerCase();
    
    const emotionKeywords = {
      happy: ['happy', 'joy', 'excited', 'great', 'wonderful', ...],
      sad: ['sad', 'unhappy', 'depressed', 'miserable', ...],
      // ... more emotions
    };

    // Calculate emotion scores
    const scores = {};
    let totalMatches = 0;

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      let matches = 0;
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        matches += (lowercaseText.match(regex) || []).length;
      });
      scores[emotion] = matches;
      totalMatches += matches;
    }

    // Determine dominant emotion with confidence
    let dominantEmotion = 'neutral';
    let highestScore = 0;
    for (const [emotion, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        dominantEmotion = emotion;
      }
    }

    const confidence = totalMatches > 0 ? 
      Math.min(100, Math.round((highestScore / totalMatches) * 100) + 50) : 70;

    return { emotion: dominantEmotion, confidence, breakdown, ... };
  }
}
```

### Data Storage Structure

LocalStorage schema:
```javascript
{
  "emotionSessions": [
    {
      "timestamp": "2025-10-15T10:30:00.000Z",
      "emotion": "happy",
      "confidence": 85,
      "inputType": "text",
      "text": "User input...",
      "breakdown": { "happy": 80, "neutral": 15, "anxious": 5 }
    }
  ],
  "progressData": {
    "streak": 7,
    "totalSessions": 42,
    "achievements": ["first_session", "week_streak", ...],
    "lastCheckIn": "2025-10-15"
  },
  "preferences": {
    "language": "en",
    "highContrast": false,
    "largeText": false,
    "reduceMotion": false
  }
}
```

### Browser Compatibility

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Text Analysis | ✅ | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ✅ | ⚠️ Limited | ⚠️ Limited |
| Webcam Analysis | ✅ | ✅ | ✅ | ✅ |
| Charts & Analytics | ✅ | ✅ | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |

✅ Full support | ⚠️ Partial support | ❌ Not supported

## 🔒 Privacy & Safety

### Data Protection

- **100% Client-Side**: All emotion detection, analysis, and storage happens in your browser
- **No Servers**: No data is transmitted to external servers
- **No Tracking**: No analytics, cookies, or third-party trackers
- **Local Storage Only**: Data stays on your device using browser LocalStorage
- **No Account Required**: Use completely anonymously
- **Data Control**: Export or delete your data anytime

### Important Disclaimers

⚠️ **This app is NOT a substitute for professional mental health care.**

- This tool is for **awareness and educational purposes only**
- It should not be used for medical diagnosis or treatment
- If you're experiencing a mental health crisis, please seek professional help immediately

### Crisis Resources

If you or someone you know is in crisis, please contact:

- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/
- **Crisis Text Line** (US): Text HOME to 741741
- **National Suicide Prevention Lifeline** (US): 1-800-273-8255
- **Samaritans** (UK): 116 123
- **Lifeline** (Australia): 13 11 14

For region-specific resources, please visit your local mental health organization's website.

### Responsible Use

- Use this tool as a **complement** to, not a replacement for, professional care
- Regular check-ins can help you understand emotional patterns
- Share your analytics with healthcare providers if helpful
- Be honest with yourself about your emotional state
- Seek professional help if you notice persistent negative patterns

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/emotion-detection-simulation.git
   cd emotion-detection-simulation
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes** and test thoroughly
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add: Amazing feature that does X"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** from your fork to the main repository

### Contribution Guidelines

- **Code Style**: Follow existing code patterns and formatting
- **Comments**: Add comments for complex logic
- **Testing**: Test your changes across multiple browsers
- **Documentation**: Update README if adding features
- **Accessibility**: Maintain ARIA labels and keyboard navigation
- **No Breaking Changes**: Ensure backward compatibility

### Areas for Contribution

- 🌐 **Translations**: Add more languages to `i18n.js`
- 🎨 **UI/UX**: Improve design and user experience
- 🧠 **ML Models**: Enhance emotion detection accuracy
- 📊 **Analytics**: Add new visualization types
- 🧘 **Exercises**: Create additional mental health exercises
- ♿ **Accessibility**: Improve screen reader support
- 📱 **Mobile**: Optimize for mobile devices
- 🐛 **Bug Fixes**: Report and fix issues
- 📚 **Documentation**: Improve guides and examples

### Reporting Issues

Found a bug or have a suggestion? Please:

1. Check if the issue already exists
2. Create a detailed issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help others learn
- Focus on constructive feedback
- Prioritize user privacy and mental health sensitivity

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

### What this means:

✅ You can:
- Use this project for personal or commercial purposes
- Modify and distribute the code
- Use it in private projects
- Sublicense it

⚠️ You must:
- Include the original license and copyright notice
- State changes made to the original code

❌ Limitations:
- No warranty is provided
- Authors are not liable for damages

## 🙏 Acknowledgements

This project was built with the help of:

- **[Chart.js](https://www.chartjs.org/)** - Beautiful, responsive charts
- **[TensorFlow.js](https://www.tensorflow.org/js)** - Machine learning in the browser
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** - Browser-based speech recognition
- **Mental Health Organizations** - For guidance on supportive language and best practices
- **Open Source Community** - For inspiration and code contributions
- **Contributors** - Everyone who has helped improve this project

### Special Thanks

- To all users who trust this tool with their emotional wellbeing
- Mental health professionals who provided feedback
- Accessibility advocates who helped make this inclusive

## 📧 Contact & Support

### Get Help

- **Issues**: [GitHub Issues](https://github.com/harshada2576/emotion-detection-simulation/issues)
- **Discussions**: [GitHub Discussions](https://github.com/harshada2576/emotion-detection-simulation/discussions)
- **Email**: harshada2576@gmail.com (for project maintainer)

### Stay Connected

- **Repository**: [github.com/harshada2576/emotion-detection-simulation](https://github.com/harshada2576/emotion-detection-simulation)
- **Issues/Features**: Open an issue to request features or report bugs
- **Star the repo** ⭐ if you find this helpful!

---

<div align="center">

**Built with ❤️ for privacy, accessibility, and mental wellbeing**

*Remember: This is a supportive tool, not a replacement for professional care.*

[⬆ Back to Top](#-emotion-detection--mental-health-assistant)

</div>

