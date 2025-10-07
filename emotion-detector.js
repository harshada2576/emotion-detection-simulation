class EmotionDetector {
    static analyzeText(text) {
        const lowercaseText = text.toLowerCase();
        
        // Emotion keywords and their weights
        const emotionKeywords = {
            happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'good', 'fantastic', 'pleased', 'delighted'],
            sad: ['sad', 'unhappy', 'depressed', 'miserable', 'heartbroken', 'grief', 'sorrow', 'tearful', 'down'],
            angry: ['angry', 'mad', 'furious', 'annoyed', 'irritated', 'frustrated', 'outraged', 'rage', 'hostile'],
            anxious: ['anxious', 'worried', 'nervous', 'stressed', 'tense', 'panicked', 'fear', 'scared', 'afraid'],
            surprised: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned', 'unexpected', 'wow'],
            neutral: ['okay', 'fine', 'alright', 'normal', 'regular', 'usual', 'neutral', 'meh']
        };

        // Calculate emotion scores
        const scores = {};
        let totalMatches = 0;

        for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            let matches = 0;
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                const found = (lowercaseText.match(regex) || []).length;
                matches += found;
                totalMatches += found;
            });
            scores[emotion] = matches;
        }

        // Determine dominant emotion
        let dominantEmotion = 'neutral';
        let highestScore = 0;

        for (const [emotion, score] of Object.entries(scores)) {
            if (score > highestScore) {
                highestScore = score;
                dominantEmotion = emotion;
            }
        }

        // Calculate confidence (simplified)
        const confidence = totalMatches > 0 ? 
            Math.min(100, Math.round((highestScore / totalMatches) * 100) + 50) : 
            70;

        // Emotion metadata
        const emotionData = {
            happy: { emoji: '😊', color: '#4CAF50' },
            sad: { emoji: '😢', color: '#2196F3' },
            angry: { emoji: '😠', color: '#f44336' },
            anxious: { emoji: '😰', color: '#9C27B0' },
            surprised: { emoji: '😲', color: '#00BCD4' },
            neutral: { emoji: '😐', color: '#FF9800' }
        };

        // Generate breakdown for chart
        const breakdown = {};
        Object.keys(emotionKeywords).forEach(emotion => {
            breakdown[emotion] = totalMatches > 0 ? 
                Math.round((scores[emotion] / totalMatches) * 100) : 0;
        });

        return {
            emotion: dominantEmotion,
            emoji: emotionData[dominantEmotion].emoji,
            confidence: confidence,
            breakdown: breakdown,
            scores: scores,
            inputText: text
        };
    }

    static analyzeExpression(expression) {
        const expressionMap = {
            happy: { emoji: '😊', confidence: 85 },
            sad: { emoji: '😢', confidence: 80 },
            angry: { emoji: '😠', confidence: 75 },
            surprised: { emoji: '😲', confidence: 70 },
            neutral: { emoji: '😐', confidence: 90 },
            anxious: { emoji: '😰', confidence: 78 }
        };

        const data = expressionMap[expression] || expressionMap.neutral;

        // Generate balanced breakdown for facial expression
        const breakdown = {
            happy: expression === 'happy' ? 80 : 5,
            sad: expression === 'sad' ? 80 : 5,
            angry: expression === 'angry' ? 80 : 5,
            neutral: expression === 'neutral' ? 80 : 10,
            anxious: expression === 'anxious' ? 80 : 5,
            surprised: expression === 'surprised' ? 80 : 5
        };

        return {
            emotion: expression,
            emoji: data.emoji,
            confidence: data.confidence,
            breakdown: breakdown,
            inputType: 'facial'
        };
    }

    static detectEmotionFromAudio(audioData) {
        // This would integrate with Web Audio API in a real implementation
        // For simulation, return a random emotion analysis
        const emotions = ['happy', 'sad', 'angry', 'neutral', 'anxious'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        return this.analyzeExpression(randomEmotion);
    }
}