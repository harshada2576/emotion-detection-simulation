class EmotionDetectionApp {
    constructor() {
        this.sessionData = {
            startTime: new Date(),
            interactions: [],
            currentEmotion: null,
            emotionHistory: []
        };
        
        this.progressData = this.loadProgressData();
        this.recognition = null;
        this.isRecording = false;
        this.finalTranscript = '';
        this.exerciseInterval = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.updateSessionInfo();
        this.updateProgressTracking();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Voice recording setup
        document.getElementById('startRecording').addEventListener('click', () => this.startVoiceRecording());
        document.getElementById('stopRecording').addEventListener('click', () => this.stopVoiceRecording());
        
        // Text analysis button
        document.getElementById('analyzeTextBtn').addEventListener('click', () => this.analyzeText());
        
        // Text analysis on Enter key
        document.getElementById('textInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.analyzeText();
            }
        });

        // Facial expression buttons
        document.querySelectorAll('.emoji-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const expression = e.target.getAttribute('data-emotion');
                this.selectExpression(expression);
            });
        });

        // Report generation
        document.getElementById('generateReportBtn').addEventListener('click', () => this.generateReport());
        
        // Reset session
        document.getElementById('resetSessionBtn').addEventListener('click', () => this.resetSession());

        // Exercise buttons
        document.querySelectorAll('.start-exercise').forEach(button => {
            button.addEventListener('click', (e) => {
                const exercise = e.target.closest('.exercise-card').getAttribute('data-exercise');
                this.startExercise(exercise);
            });
        });

        document.getElementById('stopExercise').addEventListener('click', () => this.stopExercise());
    }

    loadProgressData() {
        const saved = localStorage.getItem('emotionAppProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            streak: 0,
            totalSessions: 0,
            achievements: [],
            lastSessionDate: null
        };
    }

    saveProgressData() {
        localStorage.setItem('emotionAppProgress', JSON.stringify(this.progressData));
    }

    updateProgressTracking() {
        // Update streak
        const today = new Date().toDateString();
        const lastSession = this.progressData.lastSessionDate;
        
        if (lastSession) {
            const lastDate = new Date(lastSession);
            const todayDate = new Date();
            const diffTime = Math.abs(todayDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.progressData.streak++;
            } else if (diffDays > 1) {
                this.progressData.streak = 1;
            }
        } else {
            this.progressData.streak = 1;
        }

        this.progressData.totalSessions++;
        this.progressData.lastSessionDate = today;

        // Check for achievements
        this.checkAchievements();

        // Update UI
        document.getElementById('streakCount').textContent = this.progressData.streak;
        document.getElementById('sessionCount').textContent = this.progressData.totalSessions;
        document.getElementById('achievementCount').textContent = this.progressData.achievements.length;
        document.getElementById('currentStreak').textContent = `${this.progressData.streak} days`;

        this.updateAchievementsDisplay();
        this.saveProgressData();
    }

    checkAchievements() {
        const achievements = [];
        const interactions = this.sessionData.interactions;

        if (this.progressData.streak >= 3) {
            achievements.push({ id: 'streak_3', name: 'Consistent Check-in', description: '3-day streak' });
        }
        if (this.progressData.streak >= 7) {
            achievements.push({ id: 'streak_7', name: 'Weekly Warrior', description: '7-day streak' });
        }
        if (interactions.length >= 5) {
            achievements.push({ id: 'active_5', name: 'Active Participant', description: '5+ interactions' });
        }

        // Add new achievements
        achievements.forEach(achievement => {
            if (!this.progressData.achievements.find(a => a.id === achievement.id)) {
                this.progressData.achievements.push(achievement);
            }
        });
    }

    updateAchievementsDisplay() {
        const container = document.getElementById('achievementsList');
        container.innerHTML = this.progressData.achievements
            .map(achievement => `
                <div class="achievement" title="${achievement.description}">
                    🏆 ${achievement.name}
                </div>
            `).join('');
    }

    updateSessionInfo() {
        document.getElementById('sessionTime').textContent = 
            this.sessionData.startTime.toLocaleTimeString();
        document.getElementById('interactionCount').textContent = 
            this.sessionData.interactions.length;
    }

    initializeCharts() {
        // Initialize empty charts that will be updated with data
        this.emotionChart = new Chart(document.getElementById('emotionChart'), {
            type: 'doughnut',
            data: {
                labels: ['Happy', 'Sad', 'Angry', 'Neutral', 'Anxious', 'Surprised'],
                datasets: [{
                    data: [20, 20, 20, 20, 10, 10],
                    backgroundColor: [
                        '#4CAF50', '#2196F3', '#f44336', 
                        '#FF9800', '#9C27B0', '#00BCD4'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        this.moodChart = new Chart(document.getElementById('moodChart'), {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Mood Score',
                    data: [65, 75, 70, 80, 60, 55, 85],
                    backgroundColor: '#4CAF50'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        this.trendsChart = new Chart(document.getElementById('trendsChart'), {
            type: 'line',
            data: {
                labels: ['10:00', '10:15', '10:30', '10:45', '11:00'],
                datasets: [{
                    label: 'Emotional Well-being',
                    data: [65, 70, 75, 80, 85],
                    borderColor: '#667eea',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(102, 126, 234, 0.1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    analyzeText() {
        const textInput = document.getElementById('textInput').value.trim();
        if (!textInput) {
            alert('Please enter some text to analyze.');
            return;
        }

        const emotionResult = EmotionDetector.analyzeText(textInput);
        this.displayResults(emotionResult, 'text', textInput);
    }

    selectExpression(expression) {
        const emotionResult = EmotionDetector.analyzeExpression(expression);
        this.displayResults(emotionResult, 'facial', expression);
    }

    startVoiceRecording() {
        const startBtn = document.getElementById('startRecording');
        const stopBtn = document.getElementById('stopRecording');
        const status = document.getElementById('voiceStatus');

        // Reset
        this.finalTranscript = '';
        
        // Check if browser supports Speech Recognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            status.textContent = "❌ Speech recognition not supported in this browser. Using simulation.";
            this.simulateVoiceAnalysis();
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
            this.isRecording = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            status.textContent = "🎤 Listening... Speak now";
            status.style.background = "#fff3cd";
            status.style.borderLeftColor = "#ffc107";
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    this.finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            status.textContent = `🗣️: ${this.finalTranscript || interimTranscript}`;
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            status.textContent = `❌ Error: ${event.error}. Using simulation.`;
            this.simulateVoiceAnalysis();
        };

        this.recognition.onend = () => {
            if (this.finalTranscript) {
                const emotionResult = EmotionDetector.analyzeText(this.finalTranscript);
                this.displayResults(emotionResult, 'voice', this.finalTranscript);
            } else if (this.isRecording) {
                status.textContent = "❌ No speech detected. Using simulation.";
                this.simulateVoiceAnalysis();
            }
            this.stopVoiceRecording();
        };

        try {
            this.recognition.start();
        } catch (error) {
            status.textContent = "❌ Cannot start speech recognition. Using simulation.";
            this.simulateVoiceAnalysis();
        }
    }

    stopVoiceRecording() {
        const startBtn = document.getElementById('startRecording');
        const stopBtn = document.getElementById('stopRecording');
        const status = document.getElementById('voiceStatus');
        
        if (this.recognition) {
            this.recognition.stop();
        }
        
        this.isRecording = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        if (!this.finalTranscript) {
            status.textContent = "⏹️ Recording stopped";
            status.style.background = "#d4edda";
            status.style.borderLeftColor = "#28a745";
        }
    }

    simulateVoiceAnalysis() {
        const sampleTexts = [
            "I'm feeling really stressed about work today",
            "I had a wonderful time with my friends",
            "I'm worried about the upcoming exam",
            "I feel peaceful and content right now",
            "I'm frustrated with this situation"
        ];
        
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        document.getElementById('voiceStatus').textContent = `🗣️ Simulated: "${randomText}"`;
        
        const emotionResult = EmotionDetector.analyzeText(randomText);
        this.displayResults(emotionResult, 'voice', randomText);
    }

    displayResults(emotionResult, inputType, inputContent) {
        console.log("Displaying results for:", emotionResult);
        
        // Show results section
        document.getElementById('resultsSection').style.display = 'block';

        // Update emotion display
        document.getElementById('detectedEmoji').textContent = emotionResult.emoji;
        document.getElementById('detectedEmotion').textContent = 
            emotionResult.emotion.charAt(0).toUpperCase() + emotionResult.emotion.slice(1);
        document.getElementById('confidence').textContent = `Confidence: ${emotionResult.confidence}%`;

        // Update emotion chart
        this.updateEmotionChart(emotionResult.breakdown);

        // Generate and display AI response
        const aiResponse = InteractionEngine.generateResponse(emotionResult);
        document.getElementById('aiResponse').textContent = aiResponse.message;
        
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = aiResponse.suggestions.map(suggestion => 
            `<li>${suggestion}</li>`
        ).join('');

        // Update community message
        this.updateCommunityMessage(emotionResult.emotion);

        // Log interaction
        this.logInteraction(emotionResult, inputType, inputContent, aiResponse);

        // Update analytics
        this.updateAnalytics();

        // Update progress
        this.updateProgressTracking();
    }

    updateEmotionChart(breakdown) {
        this.emotionChart.data.datasets[0].data = [
            breakdown.happy || 0,
            breakdown.sad || 0,
            breakdown.angry || 0,
            breakdown.neutral || 0,
            breakdown.anxious || 0,
            breakdown.surprised || 0
        ];
        this.emotionChart.update();
    }

    updateCommunityMessage(emotion) {
        const messages = {
            happy: "🌟 Your positive energy is contagious! Many users report improved mood after happy interactions.",
            sad: "💙 You're not alone. 45% of users report feeling better after acknowledging sadness and using coping strategies.",
            anxious: "🌱 Many find relief through breathing exercises. You're taking a great step by recognizing your anxiety.",
            angry: "⚡ Anger is a natural emotion. 60% of users report improved emotional regulation after using our tools.",
            neutral: "🌀 Balanced emotions are a sign of emotional intelligence. Many find this state perfect for reflection.",
            surprised: "🎯 Unexpected emotions can be opportunities for growth. You're building emotional awareness!"
        };

        document.getElementById('communityMessage').textContent = 
            messages[emotion] || "Remember, emotional awareness is the first step toward emotional well-being.";
    }

    logInteraction(emotionResult, inputType, inputContent, aiResponse) {
        const interaction = {
            timestamp: new Date(),
            inputType,
            inputContent,
            detectedEmotion: emotionResult.emotion,
            confidence: emotionResult.confidence,
            aiResponse: aiResponse.message,
            suggestions: aiResponse.suggestions
        };

        this.sessionData.interactions.push(interaction);
        this.sessionData.currentEmotion = emotionResult.emotion;
        this.sessionData.emotionHistory.push({
            timestamp: new Date(),
            emotion: emotionResult.emotion,
            score: emotionResult.confidence
        });

        this.updateSessionInfo();
    }

    updateAnalytics() {
        // Update frequency list
        const frequency = AnalyticsEngine.calculateEmotionFrequency(this.sessionData.interactions);
        const frequencyElement = document.getElementById('emotionFrequency');
        
        if (Object.keys(frequency).length === 0) {
            frequencyElement.innerHTML = `
                <div class="frequency-item">
                    <span>No data yet</span>
                    <span>0 times</span>
                </div>
            `;
        } else {
            frequencyElement.innerHTML = Object.entries(frequency)
                .map(([emotion, count]) => `
                    <div class="frequency-item">
                        <span>${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</span>
                        <span>${count} time${count !== 1 ? 's' : ''}</span>
                    </div>
                `).join('');
        }

        // Update trends chart
        this.updateTrendsChart();
    }

    updateTrendsChart() {
        const recentData = this.sessionData.emotionHistory.slice(-10);
        if (recentData.length > 0) {
            this.trendsChart.data.labels = recentData.map(entry => 
                entry.timestamp.toLocaleTimeString()
            );
            this.trendsChart.data.datasets[0].data = recentData.map(entry => 
                AnalyticsEngine.emotionToScore(entry.emotion) * (entry.score / 100)
            );
            this.trendsChart.update();
        }
    }

    generateReport() {
        const report = AnalyticsEngine.generateRPAReport(this.sessionData);
        document.getElementById('reportOutput').textContent = report;
    }

    startExercise(exerciseType) {
        const container = document.getElementById('exerciseContainer');
        const content = document.getElementById('exerciseContent');
        
        container.style.display = 'block';
        
        switch(exerciseType) {
            case 'breathing':
                this.startBreathingExercise(content);
                break;
            case 'meditation':
                this.startMeditationExercise(content);
                break;
            case 'journal':
                this.startJournalingExercise(content);
                break;
        }
    }

    startBreathingExercise(container) {
        let phase = 'breatheIn';
        let count = 0;
        
        container.innerHTML = `
            <h3>🌬️ 4-7-8 Breathing Exercise</h3>
            <p>Follow the breathing pattern to reduce anxiety</p>
            <div class="breathing-circle" id="breathingCircle">Breathe In</div>
            <div id="breathingInstructions">Breathe in through your nose for 4 seconds</div>
            <div id="breathingTimer">4</div>
        `;
        
        const circle = document.getElementById('breathingCircle');
        const instructions = document.getElementById('breathingInstructions');
        const timer = document.getElementById('breathingTimer');
        
        circle.classList.add('breathing-animation');
        
        this.exerciseInterval = setInterval(() => {
            count++;
            
            switch(phase) {
                case 'breatheIn':
                    if (count <= 4) {
                        timer.textContent = (5 - count);
                    } else {
                        phase = 'hold';
                        count = 0;
                        instructions.textContent = 'Hold your breath for 7 seconds';
                        circle.textContent = 'Hold';
                        circle.style.background = '#2196F3';
                    }
                    break;
                case 'hold':
                    if (count <= 7) {
                        timer.textContent = (8 - count);
                    } else {
                        phase = 'breatheOut';
                        count = 0;
                        instructions.textContent = 'Breathe out through your mouth for 8 seconds';
                        circle.textContent = 'Breathe Out';
                        circle.style.background = '#4CAF50';
                    }
                    break;
                case 'breatheOut':
                    if (count <= 8) {
                        timer.textContent = (9 - count);
                    } else {
                        phase = 'breatheIn';
                        count = 0;
                        instructions.textContent = 'Breathe in through your nose for 4 seconds';
                        circle.textContent = 'Breathe In';
                        circle.style.background = '#4CAF50';
                    }
                    break;
            }
        }, 1000);
    }

    startMeditationExercise(container) {
        let timeLeft = 300; // 5 minutes
        
        container.innerHTML = `
            <h3>🧠 5-Minute Meditation</h3>
            <p>Focus on your breath and let thoughts pass without judgment</p>
            <div class="meditation-timer" id="meditationTimer">05:00</div>
            <p>Close your eyes and focus on your breathing</p>
        `;
        
        const timer = document.getElementById('meditationTimer');
        
        this.exerciseInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                this.stopExercise();
                container.innerHTML += `<p style="color: #4CAF50; font-weight: bold;">🎉 Meditation complete! Well done!</p>`;
            }
        }, 1000);
    }

    startJournalingExercise(container) {
        const prompts = [
            "What emotions am I feeling right now?",
            "What triggered these emotions?",
            "How are these emotions affecting my body?",
            "What would help me feel better?",
            "What am I grateful for today?"
        ];
        
        container.innerHTML = `
            <h3>📝 Guided Journaling</h3>
            <p>Reflect on these prompts to better understand your emotions:</p>
            <div class="journal-prompts">
                ${prompts.map((prompt, index) => `
                    <div style="margin: 15px 0;">
                        <strong>${index + 1}. ${prompt}</strong>
                        <textarea style="width: 100%; height: 60px; margin-top: 5px; padding: 10px;" 
                                  placeholder="Write your thoughts here..."></textarea>
                    </div>
                `).join('')}
            </div>
            <p>Take your time to reflect on each question honestly.</p>
        `;
    }

    stopExercise() {
        if (this.exerciseInterval) {
            clearInterval(this.exerciseInterval);
            this.exerciseInterval = null;
        }
        document.getElementById('exerciseContainer').style.display = 'none';
    }

    resetSession() {
        if (confirm('Are you sure you want to reset the current session? All data will be lost.')) {
            this.sessionData = {
                startTime: new Date(),
                interactions: [],
                currentEmotion: null,
                emotionHistory: []
            };
            
            document.getElementById('textInput').value = '';
            document.getElementById('resultsSection').style.display = 'none';
            document.getElementById('reportOutput').textContent = '';
            this.updateSessionInfo();
            this.initializeCharts();
            this.updateAnalytics();
        }
    }
}

// Initialize the application when the page loads
let emotionApp;

document.addEventListener('DOMContentLoaded', () => {
    emotionApp = new EmotionDetectionApp();
    console.log("✅ Emotion Detection App Loaded Successfully!");
});