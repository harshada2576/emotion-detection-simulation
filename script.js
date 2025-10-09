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
        this.currentExercise = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.updateSessionInfo();
        this.updateProgressTracking();
        this.initializeCharts();
        this.setupExerciseCategories();
        this.initializeAdvancedFeatures();
    }

    setupEventListeners() {
        // Voice recording setup
        document.getElementById('startRecording').addEventListener('click', () => this.startVoiceRecording());
        document.getElementById('stopRecording').addEventListener('click', () => this.stopVoiceRecording());
        
        // Text analysis buttons
        document.getElementById('analyzeTextBtn').addEventListener('click', () => this.analyzeText());
        document.getElementById('advancedAnalysisBtn').addEventListener('click', () => this.analyzeTextAdvanced());

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
                const expression = e.target.closest('.emoji-btn').getAttribute('data-emotion');
                this.selectExpression(expression);
            });
        });

        // Report generation
        document.getElementById('generateReportBtn').addEventListener('click', () => this.generateReport());
        document.getElementById('scheduleReportBtn').addEventListener('click', () => this.scheduleReport());
        
        // Reset session
        document.getElementById('resetSessionBtn').addEventListener('click', () => this.resetSession());

        // Exercise buttons
        document.querySelectorAll('.start-exercise').forEach(button => {
            button.addEventListener('click', (e) => {
                const exerciseCard = e.target.closest('.exercise-card');
                const exercise = exerciseCard.getAttribute('data-exercise');
                this.startExercise(exercise);
            });
        });

        document.getElementById('stopExercise').addEventListener('click', () => this.stopExercise());

        // Export data
        document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());

        // Time range selector
        document.getElementById('timeRangeSelector').addEventListener('change', (e) => {
            this.updateAnalyticsTimeRange(e.target.value);
        });

        // Camera controls
        const startCameraBtn = document.getElementById('startCamera');
        const captureEmotionBtn = document.getElementById('captureEmotion');
        
        if (startCameraBtn) {
            startCameraBtn.addEventListener('click', () => this.startCamera());
        }
        if (captureEmotionBtn) {
            captureEmotionBtn.addEventListener('click', () => this.captureEmotion());
        }

        // Language selector
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                I18n.setLanguage(e.target.value);
            });
        }
    }

    initializeAdvancedFeatures() {
        // Initialize advanced emotion detector
        AdvancedEmotionDetector.init().then(() => {
            console.log('✅ Advanced Emotion Detector initialized');
        }).catch(error => {
            console.warn('⚠️ Advanced Emotion Detector failed to initialize:', error);
        });

        // Initialize community insights
        if (typeof CommunityInsights !== 'undefined') {
            CommunityInsights.init();
        }

        // Initialize progress tracker
        if (typeof ProgressTracker !== 'undefined') {
            ProgressTracker.init();
        }
    }

    loadProgressData() {
        const saved = localStorage.getItem('emotionAppProgress');
        if (saved) {
            const data = JSON.parse(saved);
            // Ensure all required properties exist
            return {
                streak: data.streak || 0,
                totalSessions: data.totalSessions || 0,
                achievements: data.achievements || [],
                lastSessionDate: data.lastSessionDate || null,
                exerciseCompletions: data.exerciseCompletions || 0
            };
        }
        return {
            streak: 0,
            totalSessions: 0,
            achievements: [],
            lastSessionDate: null,
            exerciseCompletions: 0
        };
    }

    saveProgressData() {
        localStorage.setItem('emotionAppProgress', JSON.stringify(this.progressData));
    }

    updateProgressTracking() {
        // Update streak based on last session
        const today = new Date().toDateString();
        const lastSession = this.progressData.lastSessionDate;
        
        if (lastSession) {
            const lastDate = new Date(lastSession);
            const todayDate = new Date();
            const diffTime = Math.abs(todayDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // Consecutive day
                this.progressData.streak++;
            } else if (diffDays > 1) {
                // Broken streak, start over
                this.progressData.streak = 1;
            }
        } else {
            // First session
            this.progressData.streak = 1;
        }

        this.progressData.totalSessions++;
        this.progressData.lastSessionDate = today;

        // Check for new achievements
        this.checkAchievements();

        // Update UI
        this.updateProgressUI();
        this.saveProgressData();
    }

    updateProgressUI() {
        document.getElementById('streakCount').textContent = this.progressData.streak;
        document.getElementById('sessionCount').textContent = this.progressData.totalSessions;
        document.getElementById('achievementCount').textContent = this.progressData.achievements.length;
        document.getElementById('currentStreak').textContent = `${this.progressData.streak} days`;

        this.updateAchievementsDisplay();
    }

    checkAchievements() {
        const newAchievements = [];
        const interactions = this.sessionData.interactions;

        // Streak achievements
        if (this.progressData.streak >= 3 && !this.hasAchievement('streak_3')) {
            newAchievements.push({
                id: 'streak_3',
                name: 'Consistent Check-in',
                description: '3-day streak',
                earnedDate: new Date().toISOString()
            });
        }

        if (this.progressData.streak >= 7 && !this.hasAchievement('streak_7')) {
            newAchievements.push({
                id: 'streak_7',
                name: 'Weekly Warrior',
                description: '7-day streak',
                earnedDate: new Date().toISOString()
            });
        }

        // Interaction achievements
        if (interactions.length >= 5 && !this.hasAchievement('active_5')) {
            newAchievements.push({
                id: 'active_5',
                name: 'Active Participant',
                description: '5+ emotional check-ins',
                earnedDate: new Date().toISOString()
            });
        }

        if (interactions.length >= 10 && !this.hasAchievement('active_10')) {
            newAchievements.push({
                id: 'active_10',
                name: 'Dedicated Tracker',
                description: '10+ emotional check-ins',
                earnedDate: new Date().toISOString()
            });
        }

        // Emotion-specific achievements
        const frequency = AnalyticsEngine.calculateEmotionFrequency(interactions);
        
        if (frequency.happy >= 3 && !this.hasAchievement('happy_3')) {
            newAchievements.push({
                id: 'happy_3',
                name: 'Joyful Spirit',
                description: '3+ happy emotions recorded',
                earnedDate: new Date().toISOString()
            });
        }

        if (frequency.anxious >= 2 && !this.hasAchievement('anxiety_acknowledger')) {
            newAchievements.push({
                id: 'anxiety_acknowledger',
                name: 'Anxiety Acknowledger',
                description: 'Acknowledged anxiety multiple times',
                earnedDate: new Date().toISOString()
            });
        }

        // Exercise achievements
        if (this.progressData.exerciseCompletions >= 3 && !this.hasAchievement('exercise_explorer')) {
            newAchievements.push({
                id: 'exercise_explorer',
                name: 'Exercise Explorer',
                description: 'Completed 3+ mental health exercises',
                earnedDate: new Date().toISOString()
            });
        }

        // Add new achievements and show notifications
        newAchievements.forEach(achievement => {
            this.progressData.achievements.push(achievement);
            this.showAchievementNotification(achievement);
        });

        if (newAchievements.length > 0) {
            this.saveProgressData();
            this.updateProgressUI();
        }
    }

    hasAchievement(achievementId) {
        return this.progressData.achievements.some(achievement => achievement.id === achievementId);
    }

    showAchievementNotification(achievement) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notification-content">
                <span class="achievement-icon">🏆</span>
                <div>
                    <strong>Achievement Unlocked!</strong>
                    <div>${achievement.name}</div>
                    <small>${achievement.description}</small>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);

        // Announce for accessibility
        if (typeof AccessibilityManager !== 'undefined') {
            AccessibilityManager.announce(`Achievement unlocked: ${achievement.name}. ${achievement.description}`);
        }
    }

    updateAchievementsDisplay() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        if (this.progressData.achievements.length === 0) {
            container.innerHTML = '<div class="no-achievements">No achievements yet. Keep using the app to earn them!</div>';
            return;
        }

        container.innerHTML = this.progressData.achievements.map(achievement => `
            <div class="achievement-item" data-achievement-id="${achievement.id}">
                <span class="achievement-icon">🏆</span>
                <div class="achievement-details">
                    <strong>${achievement.name}</strong>
                    <span>${achievement.description}</span>
                    <small>Earned: ${new Date(achievement.earnedDate).toLocaleDateString()}</small>
                </div>
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
        // Initialize emotion breakdown chart
        const emotionChartCtx = document.getElementById('emotionChart');
        if (emotionChartCtx) {
            this.emotionChart = new Chart(emotionChartCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Happy', 'Sad', 'Angry', 'Neutral', 'Anxious', 'Surprised'],
                    datasets: [{
                        data: [20, 20, 20, 20, 10, 10],
                        backgroundColor: [
                            '#4CAF50', '#2196F3', '#f44336', 
                            '#FF9800', '#9C27B0', '#00BCD4'
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Initialize mood distribution chart
        const moodChartCtx = document.getElementById('moodChart');
        if (moodChartCtx) {
            this.moodChart = new Chart(moodChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Mood Score',
                        data: [65, 75, 70, 80, 60, 55, 85],
                        backgroundColor: '#4CAF50',
                        borderColor: '#388E3C',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Mood Score'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Day of Week'
                            }
                        }
                    }
                }
            });
        }

        // Initialize trends chart
        const trendsChartCtx = document.getElementById('trendsChart');
        if (trendsChartCtx) {
            this.trendsChart = new Chart(trendsChartCtx, {
                type: 'line',
                data: {
                    labels: ['10:00', '10:15', '10:30', '10:45', '11:00'],
                    datasets: [{
                        label: 'Emotional Well-being',
                        data: [65, 70, 75, 80, 85],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#667eea',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Well-being Score'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }
    }

    analyzeText() {
        const textInput = document.getElementById('textInput');
        if (!textInput) return;
        
        const text = textInput.value.trim();
        if (!text) {
            alert('Please enter some text to analyze.');
            return;
        }

        const emotionResult = EmotionDetector.analyzeText(text);
        this.displayResults(emotionResult, 'text', text);
    }

    async analyzeTextAdvanced() {
        const textInput = document.getElementById('textInput');
        if (!textInput) return;
        
        const text = textInput.value.trim();
        if (!text) {
            alert('Please enter some text to analyze.');
            return;
        }

        try {
            // Show loading state
            const analyzeBtn = document.getElementById('advancedAnalysisBtn');
            const originalText = analyzeBtn.textContent;
            analyzeBtn.textContent = 'Analyzing...';
            analyzeBtn.disabled = true;

            const emotionResult = await AdvancedEmotionDetector.analyzeWithAllMethods(text);
            this.displayResults(emotionResult, 'text', text);

            // Restore button
            analyzeBtn.textContent = originalText;
            analyzeBtn.disabled = false;
        } catch (error) {
            console.error('Advanced analysis failed:', error);
            // Fallback to basic analysis
            this.analyzeText();
            
            const analyzeBtn = document.getElementById('advancedAnalysisBtn');
            analyzeBtn.textContent = 'Advanced Analysis';
            analyzeBtn.disabled = false;
        }
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
        this.recognition.lang = I18n.currentLanguage || 'en-US';

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
            this.stopVoiceRecording();
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
        const sampleTexts = {
            en: [
                "I'm feeling really stressed about work today",
                "I had a wonderful time with my friends",
                "I'm worried about the upcoming exam",
                "I feel peaceful and content right now",
                "I'm frustrated with this situation"
            ],
            es: [
                "Me siento muy estresado por el trabajo hoy",
                "La pasé maravillosamente con mis amigos",
                "Estoy preocupado por el próximo examen",
                "Me siento tranquilo y contento en este momento",
                "Estoy frustrado con esta situación"
            ],
            fr: [
                "Je me sens vraiment stressé par le travail aujourd'hui",
                "J'ai passé un moment merveilleux avec mes amis",
                "Je suis inquiet pour l'examen à venir",
                "Je me sens paisible et content en ce moment",
                "Je suis frustré par cette situation"
            ],
            de: [
                "Ich fühle mich heute wirklich gestresst wegen der Arbeit",
                "Ich hatte eine wunderbare Zeit mit meinen Freunden",
                "Ich mache mir Sorgen über die bevorstehende Prüfung",
                "Ich fühle mich friedlich und zufrieden in diesem Moment",
                "Ich bin frustriert von dieser Situation"
            ]
        };

        const currentLang = I18n.currentLanguage || 'en';
        const texts = sampleTexts[currentLang] || sampleTexts.en;
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        
        const status = document.getElementById('voiceStatus');
        if (status) {
            status.textContent = `🗣️ Simulated: "${randomText}"`;
        }
        
        const emotionResult = EmotionDetector.analyzeText(randomText);
        this.displayResults(emotionResult, 'voice', randomText);
    }

    displayResults(emotionResult, inputType, inputContent) {
        console.log("Displaying results for:", emotionResult);
        
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }

        // Update emotion display
        const detectedEmoji = document.getElementById('detectedEmoji');
        const detectedEmotion = document.getElementById('detectedEmotion');
        const confidence = document.getElementById('confidence');
        const advancedInsights = document.getElementById('advancedInsights');

        if (detectedEmoji) detectedEmoji.textContent = emotionResult.emoji;
        if (detectedEmotion) {
            detectedEmotion.textContent = 
                emotionResult.emotion.charAt(0).toUpperCase() + emotionResult.emotion.slice(1);
        }
        if (confidence) confidence.textContent = `Confidence: ${emotionResult.confidence}%`;

        // Show advanced insights if available
        if (advancedInsights && emotionResult.advancedInsights && emotionResult.advancedInsights.length > 0) {
            advancedInsights.style.display = 'block';
            advancedInsights.textContent = `Insights: ${emotionResult.advancedInsights.join(', ')}`;
        } else if (advancedInsights) {
            advancedInsights.style.display = 'none';
        }

        // Update emotion chart
        this.updateEmotionChart(emotionResult.breakdown);

        // Generate and display AI response
        const aiResponse = InteractionEngine.generateResponse(emotionResult);
        const aiResponseElement = document.getElementById('aiResponse');
        if (aiResponseElement) {
            aiResponseElement.textContent = aiResponse.message;
        }
        
        const suggestionsList = document.getElementById('suggestionsList');
        if (suggestionsList) {
            suggestionsList.innerHTML = aiResponse.suggestions.map(suggestion => 
                `<li>${suggestion}</li>`
            ).join('');
        }

        // Update community message
        if (typeof CommunityInsights !== 'undefined') {
            CommunityInsights.updateCommunityMessage(emotionResult.emotion);
        }

        // Log interaction
        this.logInteraction(emotionResult, inputType, inputContent, aiResponse);

        // Update analytics
        this.updateAnalytics();

        // Update progress
        this.updateProgressTracking();

        // Announce results for accessibility
        if (typeof AccessibilityManager !== 'undefined') {
            AccessibilityManager.announce(
                `Emotion detected: ${emotionResult.emotion} with ${emotionResult.confidence}% confidence. ${aiResponse.message}`
            );
        }
    }

    updateEmotionChart(breakdown) {
        if (this.emotionChart && breakdown) {
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
        
        if (frequencyElement) {
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
        }

        // Update trends chart
        this.updateTrendsChart();

        // Update community stats
        this.updateCommunityStats();
    }

    updateTrendsChart() {
        if (this.trendsChart) {
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
    }

    updateCommunityStats() {
        const heatmapContainer = document.getElementById('moodHeatmap');
        if (heatmapContainer && typeof CommunityInsights !== 'undefined') {
            const statsHTML = CommunityInsights.showCommunityStats();
            heatmapContainer.innerHTML = statsHTML;
        }
    }

    generateReport() {
        const report = AnalyticsEngine.generateRPAReport(this.sessionData);
        const reportOutput = document.getElementById('reportOutput');
        if (reportOutput) {
            reportOutput.textContent = report;
            reportOutput.style.display = 'block';
            
            // Scroll to report
            reportOutput.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scheduleReport() {
        // Simple scheduling implementation - in a real app, this would use more sophisticated scheduling
        const scheduleTime = prompt('Enter time for daily report (HH:MM, 24-hour format):', '09:00');
        if (scheduleTime) {
            if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(scheduleTime)) {
                localStorage.setItem('scheduledReportTime', scheduleTime);
                alert(`Daily report scheduled for ${scheduleTime}. You'll receive a notification at this time.`);
                
                if (typeof AccessibilityManager !== 'undefined') {
                    AccessibilityManager.announce(`Daily report scheduled for ${scheduleTime}`);
                }
            } else {
                alert('Please enter a valid time in HH:MM format.');
            }
        }
    }

    exportData() {
        const data = {
            sessionData: this.sessionData,
            progressData: this.progressData,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `emotion-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (typeof AccessibilityManager !== 'undefined') {
            AccessibilityManager.announce('Data exported successfully');
        }
    }

    updateAnalyticsTimeRange(days) {
        // This would filter analytics data based on time range
        console.log(`Updating analytics for last ${days} days`);
        // In a full implementation, this would filter sessionData and update charts
    }

    setupExerciseCategories() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterExercises(category);
                
                // Update active state
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterExercises(category) {
        const exerciseCards = document.querySelectorAll('.exercise-card');
        exerciseCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    startExercise(exerciseType) {
        const container = document.getElementById('exerciseContainer');
        const content = document.getElementById('exerciseContent');
        
        if (!container || !content) return;

        this.currentExercise = exerciseType;
        container.style.display = 'block';
        
        try {
            // Use MentalHealthExercises class if available, otherwise fallback
            if (typeof MentalHealthExercises !== 'undefined' && MentalHealthExercises.startExercise) {
                this.exerciseInterval = MentalHealthExercises.startExercise(exerciseType, content);
            } else {
                // Fallback to built-in exercises
                this.startBuiltInExercise(exerciseType, content);
            }
            
            // Announce for accessibility
            if (typeof AccessibilityManager !== 'undefined') {
                AccessibilityManager.announce(`Starting ${exerciseType} exercise`);
            }
        } catch (error) {
            console.error('Error starting exercise:', error);
            content.innerHTML = `<p>Error starting exercise: ${error.message}</p>`;
        }
    }

    startBuiltInExercise(exerciseType, container) {
        switch(exerciseType) {
            case 'breathing':
                this.startBreathingExercise(container);
                break;
            case 'meditation':
                this.startMeditationExercise(container);
                break;
            case 'journal':
                this.startJournalingExercise(container);
                break;
            case 'grounding':
                this.startGroundingExercise(container);
                break;
            default:
                container.innerHTML = `<p>Exercise "${exerciseType}" not found.</p>`;
        }
    }

    startBreathingExercise(container) {
        let phase = 'breatheIn';
        let count = 0;
        let cycle = 0;
        const totalCycles = 4;
        
        container.innerHTML = `
            <h3>🌬️ 4-7-8 Breathing Exercise</h3>
            <p>Follow the breathing pattern to reduce anxiety and stress</p>
            <div class="breathing-circle" id="breathingCircle">Breathe In</div>
            <div id="breathingInstructions">Breathe in through your nose for 4 seconds</div>
            <div id="breathingTimer" style="font-size: 2em; font-weight: bold; margin: 10px 0;">4</div>
            <div id="cycleCounter">Cycle: 1/${totalCycles}</div>
            <div style="margin-top: 20px;">
                <div style="display: flex; justify-content: space-around; margin: 10px 0;">
                    <span>💨 Inhale: 4s</span>
                    <span>⏸️ Hold: 7s</span>
                    <span>💨 Exhale: 8s</span>
                </div>
            </div>
        `;
        
        const circle = document.getElementById('breathingCircle');
        const instructions = document.getElementById('breathingInstructions');
        const timer = document.getElementById('breathingTimer');
        const cycleCounter = document.getElementById('cycleCounter');
        
        circle.classList.add('breathing-animation');
        
        this.exerciseInterval = setInterval(() => {
            count++;
            
            switch(phase) {
                case 'breatheIn':
                    if (count <= 4) {
                        timer.textContent = (5 - count);
                        circle.style.transform = `scale(${1 + count * 0.05})`;
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
                        circle.style.transform = `scale(${1.2 - count * 0.025})`;
                    } else {
                        phase = 'breatheIn';
                        count = 0;
                        cycle++;
                        instructions.textContent = 'Breathe in through your nose for 4 seconds';
                        circle.textContent = 'Breathe In';
                        circle.style.background = '#4CAF50';
                        cycleCounter.textContent = `Cycle: ${cycle + 1}/${totalCycles}`;
                        
                        if (cycle >= totalCycles) {
                            this.completeExercise();
                            container.innerHTML += `
                                <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                                    🎉 Breathing exercise complete! Well done!
                                </div>
                            `;
                        }
                    }
                    break;
            }
        }, 1000);
    }

    startMeditationExercise(container) {
        let timeLeft = 300; // 5 minutes in seconds
        
        container.innerHTML = `
            <h3>🧠 5-Minute Mindfulness Meditation</h3>
            <p>Focus on your breath and let thoughts pass without judgment</p>
            <div class="meditation-timer" id="meditationTimer">05:00</div>
            <div id="meditationInstructions" style="margin: 20px 0;">
                <p>Close your eyes and focus on your breathing</p>
                <p>Notice the sensation of air moving in and out</p>
                <p>If your mind wanders, gently return to your breath</p>
            </div>
        `;
        
        const timer = document.getElementById('meditationTimer');
        const instructions = document.getElementById('meditationInstructions');
        
        this.exerciseInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Update instructions based on time
            if (timeLeft === 240) {
                instructions.innerHTML = `
                    <p>Notice any tension in your body</p>
                    <p>Allow your muscles to relax</p>
                    <p>Continue focusing on your breath</p>
                `;
            } else if (timeLeft === 180) {
                instructions.innerHTML = `
                    <p>Expand your awareness to sounds around you</p>
                    <p>Notice without judgment</p>
                    <p>Return to your breathing</p>
                `;
            } else if (timeLeft === 120) {
                instructions.innerHTML = `
                    <p>Scan your body from head to toe</p>
                    <p>Notice any sensations</p>
                    <p>Breathe into areas of tension</p>
                `;
            } else if (timeLeft === 60) {
                instructions.innerHTML = `
                    <p>Almost there</p>
                    <p>Take three deep, cleansing breaths</p>
                    <p>Prepare to gently open your eyes</p>
                `;
            } else if (timeLeft === 30) {
                instructions.innerHTML = `
                    <p>Slowly bring awareness back to the room</p>
                    <p>Wiggle your fingers and toes</p>
                    <p>Get ready to complete the meditation</p>
                `;
            }
            
            if (timeLeft <= 0) {
                this.completeExercise();
                container.innerHTML += `
                    <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                        🎉 Meditation complete! Take this calm feeling with you.
                    </div>
                `;
            }
        }, 1000);
    }

    startJournalingExercise(container) {
        const prompts = [
            "What emotions am I experiencing right now? Where do I feel them in my body?",
            "What thoughts are occupying my mind today? Are they helpful or unhelpful?",
            "What am I grateful for in this moment? Big or small things count.",
            "What challenges am I facing? How can I approach them with self-compassion?",
            "What would I like to let go of? What's no longer serving me?"
        ];
        
        container.innerHTML = `
            <h3>📝 Guided Journaling</h3>
            <p>Reflect on these prompts to better understand your emotions</p>
            <div class="journal-prompts">
                ${prompts.map((prompt, index) => `
                    <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <strong>${index + 1}. ${prompt}</strong>
                        <textarea 
                            style="width: 100%; height: 80px; margin-top: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit;" 
                            placeholder="Write your thoughts here..."
                            data-prompt-index="${index}"
                        ></textarea>
                    </div>
                `).join('')}
            </div>
            <button id="saveJournalEntry" style="background: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px;">
                💾 Save Journal Entry
            </button>
        `;
        
        document.getElementById('saveJournalEntry').addEventListener('click', () => {
            this.saveJournalEntry();
        });
    }

    startGroundingExercise(container) {
        const steps = [
            { sense: "see", count: 5, instruction: "Look around and name 5 things you can see" },
            { sense: "touch", count: 4, instruction: "Notice 4 things you can feel or touch" },
            { sense: "hear", count: 3, instruction: "Listen for 3 things you can hear" },
            { sense: "smell", count: 2, instruction: "Identify 2 things you can smell" },
            { sense: "taste", count: 1, instruction: "Name 1 thing you can taste" }
        ];
        
        let currentStep = 0;
        let items = [];
        
        container.innerHTML = `
            <h3>🌍 5-4-3-2-1 Grounding Technique</h3>
            <p>Sensory grounding exercise for anxiety and panic attacks</p>
            <div class="grounding-steps">
                <div class="grounding-step">
                    <h4>Step ${currentStep + 1}: ${steps[currentStep].sense.toUpperCase()}</h4>
                    <p id="groundingInstruction">${steps[currentStep].instruction}</p>
                    <div id="itemsList" style="margin: 15px 0;">
                        ${Array.from({length: steps[currentStep].count}, (_, i) => `
                            <div style="margin: 5px 0;">
                                <input type="text" 
                                       placeholder="Item ${i + 1}" 
                                       style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 200px;"
                                       data-step="${currentStep}"
                                       data-index="${i}">
                            </div>
                        `).join('')}
                    </div>
                    <div id="progress">Step ${currentStep + 1} of ${steps.length}</div>
                </div>
            </div>
            
            <button id="nextGroundingStep" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-top: 15px;">
                ✅ Next Step
            </button>
        `;
        
        const instructionEl = document.getElementById('groundingInstruction');
        const progressEl = document.getElementById('progress');
        const nextButton = document.getElementById('nextGroundingStep');
        
        nextButton.addEventListener('click', () => {
            // Save current step items
            const currentItems = [];
            document.querySelectorAll(`input[data-step="${currentStep}"]`).forEach(input => {
                if (input.value.trim()) {
                    currentItems.push(input.value);
                }
            });
            
            items.push({
                sense: steps[currentStep].sense,
                items: currentItems
            });
            
            currentStep++;
            
            if (currentStep >= steps.length) {
                this.completeExercise();
                container.innerHTML += `
                    <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                        🎉 Grounding exercise complete! You're now more present and centered.
                    </div>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
                        <strong>Your Grounding Experience:</strong>
                        ${items.map(item => `
                            <div style="margin: 10px 0;">
                                <strong>${item.sense.toUpperCase()}:</strong> ${item.items.join(', ')}
                            </div>
                        `).join('')}
                    </div>
                `;
                return;
            }
            
            // Update for next step
            instructionEl.textContent = steps[currentStep].instruction;
            progressEl.textContent = `Step ${currentStep + 1} of ${steps.length}`;
            document.querySelector('.grounding-step h4').textContent = `Step ${currentStep + 1}: ${steps[currentStep].sense.toUpperCase()}`;
            
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = Array.from({length: steps[currentStep].count}, (_, i) => `
                <div style="margin: 5px 0;">
                    <input type="text" 
                           placeholder="Item ${i + 1}" 
                           style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 200px;"
                           data-step="${currentStep}"
                           data-index="${i}">
                </div>
            `).join('');
        });
    }

    saveJournalEntry() {
        const entries = [];
        document.querySelectorAll('textarea[data-prompt-index]').forEach(textarea => {
            if (textarea.value.trim()) {
                entries.push({
                    prompt: textarea.previousElementSibling.textContent.replace(/^\d+\.\s/, ''),
                    response: textarea.value,
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        if (entries.length > 0) {
            const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
            const newEntry = {
                timestamp: new Date().toISOString(),
                entries: entries
            };
            existingEntries.push(newEntry);
            localStorage.setItem('journalEntries', JSON.stringify(existingEntries));
            
            this.completeExercise();
            document.getElementById('exerciseContent').innerHTML += `
                <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                    ✅ Journal entry saved! You've written ${entries.length} reflections.
                </div>
            `;
        } else {
            alert('Please write something before saving.');
        }
    }

    completeExercise() {
        if (this.exerciseInterval) {
            clearInterval(this.exerciseInterval);
            this.exerciseInterval = null;
        }
        
        // Record exercise completion
        this.progressData.exerciseCompletions = (this.progressData.exerciseCompletions || 0) + 1;
        this.saveProgressData();
        this.updateProgressTracking();
        
        // Announce completion
        if (typeof AccessibilityManager !== 'undefined') {
            AccessibilityManager.announce('Exercise completed successfully');
        }
    }

    stopExercise() {
        if (this.exerciseInterval) {
            clearInterval(this.exerciseInterval);
            this.exerciseInterval = null;
        }
        const container = document.getElementById('exerciseContainer');
        if (container) {
            container.style.display = 'none';
        }
        this.currentExercise = null;
        
        if (typeof AccessibilityManager !== 'undefined') {
            AccessibilityManager.announce('Exercise stopped');
        }
    }

    startCamera() {
        const video = document.getElementById('webcam');
        const status = document.getElementById('cameraStatus');
        const captureBtn = document.getElementById('captureEmotion');

        if (!video || !status) return;

        // Check if the browser supports mediaDevices
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            status.textContent = "❌ Camera not supported in this browser.";
            return;
        }

        // Access the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                status.textContent = "✅ Camera active - Position your face in frame";
                if (captureBtn) captureBtn.disabled = false;
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
                status.textContent = "❌ Cannot access camera. Please check permissions.";
            });
    }

    async captureEmotion() {
        const video = document.getElementById('webcam');
        const status = document.getElementById('cameraStatus');
        const canvas = document.getElementById('faceCanvas');
        
        if (!video || !status || !canvas) return;

        const context = canvas.getContext('2d');

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        status.textContent = "🔍 Analyzing facial expression...";

        try {
            // Use AdvancedEmotionDetector for facial analysis
            const emotionResult = await AdvancedEmotionDetector.analyzeFacialExpressionFromCamera(video);
            this.displayResults(emotionResult, 'camera', 'facial expression');
            status.textContent = "✅ Facial analysis complete!";
        } catch (error) {
            console.error('Facial analysis error:', error);
            status.textContent = "❌ Facial analysis failed. Using simulated result.";
            
            // Fallback to simulated result
            const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'anxious'];
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            const emotionResult = EmotionDetector.analyzeExpression(randomEmotion);
            this.displayResults(emotionResult, 'camera', 'facial expression');
        }
    }

    resetSession() {
        if (confirm('Are you sure you want to reset the current session? All data will be lost.')) {
            this.sessionData = {
                startTime: new Date(),
                interactions: [],
                currentEmotion: null,
                emotionHistory: []
            };
            
            const textInput = document.getElementById('textInput');
            if (textInput) textInput.value = '';
            
            const resultsSection = document.getElementById('resultsSection');
            if (resultsSection) resultsSection.style.display = 'none';
            
            const reportOutput = document.getElementById('reportOutput');
            if (reportOutput) reportOutput.textContent = '';
            
            this.updateSessionInfo();
            this.initializeCharts();
            this.updateAnalytics();
            
            if (typeof AccessibilityManager !== 'undefined') {
                AccessibilityManager.announce('Session reset successfully');
            }
        }
    }
}

// Initialize the application when the page loads
let emotionApp;

document.addEventListener('DOMContentLoaded', () => {
    emotionApp = new EmotionDetectionApp();
    console.log("✅ Emotion Detection App Loaded Successfully!");
    
    // Initialize additional modules if they exist
    if (typeof I18n !== 'undefined') {
        I18n.init();
    }
    
    if (typeof AccessibilityManager !== 'undefined') {
        AccessibilityManager.init();
    }
});