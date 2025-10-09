# 🎭 Emotion Detection & Mental Health Assistant

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

A comprehensive web-based emotion detection and mental health support system with AI-powered responses and automated analytics.

[Live Demo](https://your-username.github.io/emotion-detection-app) · [Report Bug](https://github.com/your-username/emotion-detection-app/issues) · [Request Feature](https://github.com/your-username/emotion-detection-app/issues)

</div>

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🎯 About The Project

The Emotion Detection & Mental Health Assistant is a sophisticated web application that combines artificial intelligence with mental health support. It provides real-time emotion detection through multiple input methods and offers personalized support responses, mental health exercises, and comprehensive analytics.

### Key Capabilities

- **Multi-modal Emotion Detection**: Analyze emotions from text, voice, and facial expressions
- **AI-Powered Support**: Get personalized mental health responses and coping strategies
- **Interactive Exercises**: Access breathing, meditation, and journaling tools
- **Advanced Analytics**: Track emotional trends with professional RPA reporting
- **Progress Tracking**: Monitor your emotional well-being journey with streaks and achievements

## ✨ Features

### 🎭 Emotion Detection
- **Text Analysis**: Natural language processing for emotion recognition
- **Voice Recognition**: Real-time speech-to-emotion conversion
- **Facial Expression**: Pre-defined emotion selection interface
- **Multi-modal Input**: Combine different detection methods for accuracy

### 💬 Interactive Support
- **AI-Generated Responses**: Contextual emotional support messages
- **Personalized Suggestions**: Tailored coping strategies based on detected emotions
- **Mental Health Exercises**: 
  - Breathing exercises (4-7-8 technique)
  - Guided meditation sessions
  - Structured journaling prompts
- **Community Insights**: Anonymous emotional trend sharing

### 📊 Analytics & Reporting
- **Real-time Visualization**: Interactive charts and emotional breakdowns
- **Progress Tracking**: Session streaks, achievements, and interaction history
- **RPA Reporting**: Automated professional emotional well-being reports
- **Trend Analysis**: Emotional stability and pattern recognition

### 🏆 Engagement Features
- **Gamification**: Achievement system and progress streaks
- **Session Statistics**: Comprehensive interaction analytics
- **Responsive Design**: Works seamlessly on all devices
- **Privacy-First**: All processing happens locally in your browser

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Live Demo
Visit the [live demo](https://your-username.github.io/emotion-detection-app) to try the application immediately.

### Local Setup
1. **Download the project**
   ```bash
   git clone https://github.com/your-username/emotion-detection-app.git
   cd emotion-detection-app
   ```

2. **Open the application**
   - Double-click `index.html` or
   - Serve with a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`

## 📥 Installation

### Method 1: Direct File Access
1. Download all project files to a folder
2. Open `index.html` in any modern web browser
3. Start using the application immediately

### Method 2: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://your-username.github.io/emotion-detection-app`

### Method 3: Web Server Deployment
Upload all files to any web hosting service (Netlify, Vercel, traditional web host).

## 💻 Usage

### Basic Emotion Detection

1. **Text Input**
   - Type your feelings in the text area
   - Click "Analyze Emotion" or press Enter
   - View detailed emotional analysis

2. **Voice Input** 
   - Click "Start Recording" 
   - Speak about your feelings (Chrome/Edge recommended)
   - System analyzes speech in real-time

3. **Facial Expression**
   - Click any emotion button (😊😢😠😲😐😰)
   - Get instant emotional analysis

### Mental Health Exercises

- **Breathing Exercise**: Follow the 4-7-8 breathing pattern for anxiety relief
- **Meditation**: 5-minute guided mindfulness practice with timer
- **Journaling**: Structured prompts for emotional reflection

### Analytics & Reporting

- View real-time emotional trends in the analytics dashboard
- Generate professional RPA reports with insights and recommendations
- Track your progress with streaks and achievements

## 📁 Project Structure

```
emotion-detection-app/
├── index.html                 # Main application interface
├── style.css                  # Complete styling and responsive design
├── script.js                  # Main application logic and event handling
├── emotion-detector.js        # Emotion analysis algorithms
├── interaction-engine.js      # AI response generation system
├── analytics.js               # RPA reporting and analytics engine
└── README.md                  # Project documentation
```

## 🔧 Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for data visualization
- **Speech Recognition**: Web Speech API (with fallback simulation)
- **Storage**: LocalStorage for session persistence
- **No Backend**: Entirely client-side processing

### Key Algorithms

#### Emotion Detection
```javascript
// Text-based emotion analysis using keyword matching
class EmotionDetector {
  static analyzeText(text) {
    // Natural language processing for emotion recognition
    // Confidence scoring and emotional breakdown
  }
}
```

#### RPA Reporting
```javascript
class AnalyticsEngine {
  static generateRPAReport(sessionData) {
    // Automated professional reporting
    // Trend analysis and recommendations
  }
}
```

### Browser APIs Used
- Web Speech API (Speech Recognition)
- Canvas API (Chart rendering)
- LocalStorage API (Data persistence)
- CSS Grid/Flexbox (Responsive layout)

## 🌐 Browser Support

| Browser | Voice Recognition | Full Features | Basic Functionality |
|---------|-------------------|---------------|---------------------|
| Chrome  | ✅ Yes            | ✅ Yes        | ✅ Yes              |
| Edge    | ✅ Yes            | ✅ Yes        | ✅ Yes              |
| Firefox | ❌ Simulated      | ✅ Yes        | ✅ Yes              |
| Safari  | ❌ Simulated      | ✅ Yes        | ✅ Yes              |
| Mobile  | ❌ Simulated      | ✅ Yes        | ✅ Yes              |

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- Additional emotion detection algorithms
- New mental health exercises
- Enhanced visualization features
- Multi-language support
- Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- **Chart.js** for beautiful data visualizations
- **Web Speech API** for voice recognition capabilities
- **Open Source Community** for inspiration and best practices
- **Mental Health Resources** that informed our supportive responses

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for error messages
2. Ensure all files are in the same directory
3. Try using Chrome or Edge for best voice recognition
4. Verify JavaScript is enabled in your browser

For mental health support, please consult licensed professionals. This application is designed for emotional awareness and should not replace professional medical advice.

---

<div align="center">

### ⭐️ Support the Project

If you find this project helpful, please consider giving it a star on GitHub!

**Built with ❤️ for better mental health awareness**

</div>