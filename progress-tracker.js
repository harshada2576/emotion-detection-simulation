// progress-tracker.js
class ProgressTracker {
    constructor() {
        this.streak = 0;
        this.totalSessions = 0;
        this.achievements = [];
        this.milestones = [];
        this.lastSessionDate = null;
    }

    static init() {
        this.loadProgress();
        this.setupProgressListeners();
    }

    static loadProgress() {
        const saved = localStorage.getItem('emotionAppProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.streak = data.streak || 0;
            this.totalSessions = data.totalSessions || 0;
            this.achievements = data.achievements || [];
            this.milestones = data.milestones || [];
            this.lastSessionDate = data.lastSessionDate ? new Date(data.lastSessionDate) : null;
        }
        this.updateProgressUI();
    }

    static saveProgress() {
        const progressData = {
            streak: this.streak,
            totalSessions: this.totalSessions,
            achievements: this.achievements,
            milestones: this.milestones,
            lastSessionDate: this.lastSessionDate,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('emotionAppProgress', JSON.stringify(progressData));
    }

    static updateProgressUI() {
        // Update streak display
        const streakElement = document.getElementById('streakCount');
        if (streakElement) {
            streakElement.textContent = this.streak;
        }

        // Update session count
        const sessionElement = document.getElementById('sessionCount');
        if (sessionElement) {
            sessionElement.textContent = this.totalSessions;
        }

        // Update achievements
        const achievementElement = document.getElementById('achievementCount');
        if (achievementElement) {
            achievementElement.textContent = this.achievements.length;
        }

        // Update achievements list
        this.updateAchievementsDisplay();
    }

    static updateAchievementsDisplay() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        if (this.achievements.length === 0) {
            container.innerHTML = '<div class="no-achievements">No achievements yet. Keep using the app to earn them!</div>';
            return;
        }

        container.innerHTML = this.achievements.map(achievement => `
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

    static checkForNewAchievements(sessionData) {
        const newAchievements = [];
        const interactions = sessionData.interactions;

        // Streak achievements
        if (this.streak >= 7 && !this.hasAchievement('weekly_warrior')) {
            newAchievements.push({
                id: 'weekly_warrior',
                name: 'Weekly Warrior',
                description: '7-day check-in streak',
                earnedDate: new Date().toISOString()
            });
        }

        if (this.streak >= 30 && !this.hasAchievement('monthly_master')) {
            newAchievements.push({
                id: 'monthly_master',
                name: 'Monthly Master',
                description: '30-day check-in streak',
                earnedDate: new Date().toISOString()
            });
        }

        // Interaction achievements
        if (interactions.length >= 10 && !this.hasAchievement('active_user')) {
            newAchievements.push({
                id: 'active_user',
                name: 'Active User',
                description: '10+ emotional check-ins',
                earnedDate: new Date().toISOString()
            });
        }

        if (interactions.length >= 50 && !this.hasAchievement('dedicated_tracker')) {
            newAchievements.push({
                id: 'dedicated_tracker',
                name: 'Dedicated Tracker',
                description: '50+ emotional check-ins',
                earnedDate: new Date().toISOString()
            });
        }

        // Emotion-specific achievements
        const emotionFrequency = AnalyticsEngine.calculateEmotionFrequency(interactions);
        
        if (emotionFrequency.happy >= 5 && !this.hasAchievement('happy_helper')) {
            newAchievements.push({
                id: 'happy_helper',
                name: 'Happy Helper',
                description: '5+ happy emotional states recorded',
                earnedDate: new Date().toISOString()
            });
        }

        if (emotionFrequency.anxious >= 3 && !this.hasAchievement('anxiety_acknowledger')) {
            newAchievements.push({
                id: 'anxiety_acknowledger',
                name: 'Anxiety Acknowledger',
                description: 'Acknowledged anxiety multiple times',
                earnedDate: new Date().toISOString()
            });
        }

        // Exercise achievements
        const exerciseCompletions = this.getExerciseCompletions();
        if (exerciseCompletions >= 5 && !this.hasAchievement('exercise_explorer')) {
            newAchievements.push({
                id: 'exercise_explorer',
                name: 'Exercise Explorer',
                description: 'Completed 5+ mental health exercises',
                earnedDate: new Date().toISOString()
            });
        }

        // Add new achievements
        newAchievements.forEach(achievement => {
            this.achievements.push(achievement);
            this.showAchievementNotification(achievement);
        });

        if (newAchievements.length > 0) {
            this.saveProgress();
            this.updateProgressUI();
        }

        return newAchievements;
    }

    static hasAchievement(achievementId) {
        return this.achievements.some(achievement => achievement.id === achievementId);
    }

    static showAchievementNotification(achievement) {
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

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 3.5s forwards;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);

        // Announce for accessibility
        AccessibilityManager.announce(`Achievement unlocked: ${achievement.name}. ${achievement.description}`);
    }

    static updateStreak() {
        const today = new Date().toDateString();
        
        if (this.lastSessionDate) {
            const lastDate = new Date(this.lastSessionDate);
            const todayDate = new Date();
            const diffTime = Math.abs(todayDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // Consecutive day
                this.streak++;
            } else if (diffDays > 1) {
                // Broken streak, start over
                this.streak = 1;
            }
        } else {
            // First session
            this.streak = 1;
        }

        this.lastSessionDate = today;
        this.totalSessions++;
        this.saveProgress();
    }

    static getExerciseCompletions() {
        const completions = localStorage.getItem('exerciseCompletions');
        return completions ? parseInt(completions) : 0;
    }

    static recordExerciseCompletion() {
        const current = this.getExerciseCompletions();
        localStorage.setItem('exerciseCompletions', (current + 1).toString());
    }

    static getProgressStats() {
        return {
            streak: this.streak,
            totalSessions: this.totalSessions,
            totalAchievements: this.achievements.length,
            exerciseCompletions: this.getExerciseCompletions(),
            lastSession: this.lastSessionDate,
            achievementRate: this.totalSessions > 0 ? (this.achievements.length / this.totalSessions) * 100 : 0
        };
    }

    static setupProgressListeners() {
        // Listen for session updates
        document.addEventListener('emotionRecorded', () => {
            this.updateStreak();
        });

        // Listen for exercise completions
        document.addEventListener('exerciseCompleted', () => {
            this.recordExerciseCompletion();
        });
    }

    static resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.streak = 0;
            this.totalSessions = 0;
            this.achievements = [];
            this.milestones = [];
            this.lastSessionDate = null;
            
            localStorage.removeItem('emotionAppProgress');
            localStorage.removeItem('exerciseCompletions');
            
            this.updateProgressUI();
            AccessibilityManager.announce('Progress reset successfully');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ProgressTracker.init();
});