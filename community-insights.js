// community-insights.js
class CommunityInsights {
    static insights = {
        en: {
            happy: [
                "🌟 Your positive energy is contagious! 78% of users report improved mood after happy interactions.",
                "🎉 Happy moments are worth celebrating! Users who acknowledge joy show 45% more emotional resilience.",
                "😊 Positive emotions create a ripple effect. Share your happiness - it inspires others!"
            ],
            sad: [
                "💙 You're not alone. 65% of users find comfort in knowing others experience similar emotions.",
                "🌧️ Sadness is a natural human emotion. 82% of users report feeling better after acknowledging their feelings.",
                "🤗 Many find writing about sad feelings helps process them. You're taking a brave step forward."
            ],
            anxious: [
                "🌱 Anxiety is common - 40% of users report regular anxious feelings. You're not alone in this.",
                "🧘 75% of users find breathing exercises helpful for anxiety. Great job using the tools available!",
                "🔍 Breaking tasks into smaller steps helps 68% of users manage anxiety more effectively."
            ],
            angry: [
                "⚡ Anger signals when something needs attention. 60% of users find healthy expression improves relationships.",
                "💪 Recognizing anger is the first step to managing it. 55% of users report better emotional control with practice.",
                "🌬️ Physical activity helps 70% of users release angry energy in healthy ways."
            ],
            surprised: [
                "🎯 Unexpected emotions can be growth opportunities. 48% of users discover new insights through surprise.",
                "🔍 Surprise often reveals hidden patterns. 52% of users find it leads to positive self-discovery.",
                "💫 Embracing surprise builds adaptability - a key emotional intelligence skill!"
            ],
            neutral: [
                "🌀 Balanced emotions indicate emotional intelligence. 61% of users value these calm moments for reflection.",
                "⚖️ Neutral states are perfect for planning and intention-setting. Use this clarity wisely!",
                "🌊 Emotional balance is a strength. 57% of high-performing individuals report regular neutral states."
            ]
        },
        es: {
            happy: [
                "🌟 ¡Tu energía positiva es contagiosa! 78% de usuarios reportan mejor estado de ánimo después de interacciones felices.",
                "🎉 ¡Los momentos felices vale la pena celebrarlos! Usuarios que reconocen alegría muestran 45% más resiliencia emocional.",
                "😊 Las emociones positivas crean un efecto dominó. ¡Comparte tu felicidad - inspira a otros!"
            ],
            // Add other emotions in Spanish...
        }
        // Add other languages...
    };

    static tips = {
        general: [
            "💡 Regular emotional check-ins improve self-awareness by 34%",
            "📊 Tracking emotions helps 72% of users identify patterns and triggers",
            "🌱 Small daily practices lead to significant long-term emotional growth",
            "🤝 Sharing emotional experiences builds connection and reduces isolation"
        ],
        exercises: [
            "🧘 Users who practice breathing exercises daily report 45% less anxiety",
            "📝 Journaling for 5 minutes daily improves emotional clarity for 68% of users",
            "🌙 Consistent sleep patterns correlate with 52% better emotional regulation",
            "💪 Regular exercise users show 41% higher emotional resilience"
        ]
    };

    static init() {
        this.updateCommunityMessage();
        this.setupInsightRotation();
    }

    static updateCommunityMessage(emotion = null) {
        const messageElement = document.getElementById('communityMessage');
        if (!messageElement) return;

        const language = I18n.currentLanguage;
        const insights = this.insights[language] || this.insights.en;
        
        let message;
        
        if (emotion && insights[emotion]) {
            // Get random insight for specific emotion
            const emotionInsights = insights[emotion];
            message = emotionInsights[Math.floor(Math.random() * emotionInsights.length)];
        } else {
            // Get general tip
            const generalTips = this.tips.general;
            message = generalTips[Math.floor(Math.random() * generalTips.length)];
        }

        messageElement.textContent = message;
        
        // Add animation
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transition = 'opacity 0.5s ease';
        }, 100);
    }

    static setupInsightRotation() {
        // Rotate insights every 30 seconds
        setInterval(() => {
            this.updateCommunityMessage();
        }, 30000);
    }

    static getCommunityStats() {
        // Simulated community data (in real app, this would come from backend)
        return {
            totalUsers: 15427,
            dailyCheckins: 2843,
            mostCommonEmotion: 'neutral',
            averageMoodScore: 68,
            exercisesCompleted: 89234,
            supportMessages: 15672
        };
    }

    static showCommunityStats() {
        const stats = this.getCommunityStats();
        
        const statsHTML = `
            <div class="community-stats">
                <h4>👥 Community Overview</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">${stats.totalUsers.toLocaleString()}</span>
                        <span class="stat-label">Total Users</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.dailyCheckins.toLocaleString()}</span>
                        <span class="stat-label">Daily Check-ins</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.averageMoodScore}%</span>
                        <span class="stat-label">Average Mood</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${stats.exercisesCompleted.toLocaleString()}</span>
                        <span class="stat-label">Exercises Completed</span>
                    </div>
                </div>
                <div class="community-tip">
                    <strong>Community Tip:</strong> ${this.tips.general[Math.floor(Math.random() * this.tips.general.length)]}
                </div>
            </div>
        `;

        return statsHTML;
    }

    static generatePersonalizedInsight(userData, currentEmotion) {
        const language = I18n.currentLanguage;
        const insights = this.insights[language] || this.insights.en;
        
        if (!insights[currentEmotion]) {
            return this.tips.general[Math.floor(Math.random() * this.tips.general.length)];
        }

        const emotionInsights = insights[currentEmotion];
        let insight = emotionInsights[Math.floor(Math.random() * emotionInsights.length)];

        // Personalize based on user patterns
        const frequency = AnalyticsEngine.calculateEmotionFrequency(userData.interactions);
        
        if (currentEmotion === 'anxious' && frequency.anxious > 3) {
            insight += " Many users find that recognizing frequent anxiety patterns is the first step toward management.";
        }
        
        if (currentEmotion === 'happy' && frequency.happy > 5) {
            insight += " Your consistent positive emotions show strong emotional well-being practices!";
        }

        return insight;
    }

    static getTrendingExercises() {
        return [
            { name: "4-7-8 Breathing", users: 2341, effectiveness: 92 },
            { name: "5-Minute Meditation", users: 1892, effectiveness: 88 },
            { name: "Progressive Relaxation", users: 1567, effectiveness: 85 },
            { name: "Gratitude Journaling", users: 1423, effectiveness: 90 }
        ];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    CommunityInsights.init();
});