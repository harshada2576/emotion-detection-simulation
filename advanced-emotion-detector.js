class AdvancedEmotionDetector {
    static mlModel = null;
    static toxicityModel = null;
    static initialized = false;

    static async init() {
        if (this.initialized) return;

        try {
            // Load toxicity model for advanced text analysis
            this.toxicityModel = await toxicity.load(0.9);
            console.log('✅ Toxicity model loaded successfully');
            
            // In a real implementation, you would load custom emotion models here
            // this.mlModel = await tf.loadLayersModel('path/to/emotion-model.json');
            
            this.initialized = true;
        } catch (error) {
            console.warn('❌ Could not load ML models, using fallback methods:', error);
            this.initialized = false;
        }
    }

    static async analyzeTextAdvanced(text) {
        if (!this.initialized) {
            await this.init();
        }

        // Use ML model if available, otherwise fall back to basic analysis
        if (this.toxicityModel) {
            try {
                const predictions = await this.toxicityModel.classify(text);
                const mlResults = this.processMLPredictions(predictions, text);
                
                // Combine ML results with basic analysis for better accuracy
                const basicResults = EmotionDetector.analyzeText(text);
                
                return this.mergeAnalysisResults(basicResults, mlResults);
            } catch (error) {
                console.warn('ML analysis failed, using basic analysis:', error);
                return EmotionDetector.analyzeText(text);
            }
        } else {
            return EmotionDetector.analyzeText(text);
        }
    }

    static processMLPredictions(predictions, text) {
        const results = {
            emotion: 'neutral',
            confidence: 70,
            breakdown: {
                happy: 0,
                sad: 0,
                angry: 0,
                neutral: 0,
                anxious: 0,
                surprised: 0
            },
            toxicity: {},
            advancedInsights: []
        };

        // Process toxicity predictions
        predictions.forEach(prediction => {
            results.toxicity[prediction.label] = {
                match: prediction.results[0].match,
                probability: prediction.results[0].probabilities[1]
            };
        });

        // Convert toxicity predictions to emotion insights
        if (results.toxicity.insult && results.toxicity.insult.probability > 0.7) {
            results.emotion = 'angry';
            results.confidence = Math.max(75, results.toxicity.insult.probability * 100);
            results.advancedInsights.push('Text contains potentially insulting language');
        }

        if (results.toxicity.toxicity && results.toxicity.toxicity.probability > 0.7) {
            results.emotion = 'angry';
            results.confidence = Math.max(80, results.toxicity.toxicity.probability * 100);
            results.advancedInsights.push('Text shows signs of toxic language');
        }

        if (results.toxicity.identity_attack && results.toxicity.identity_attack.probability > 0.7) {
            results.emotion = 'angry';
            results.confidence = 85;
            results.advancedInsights.push('Text contains identity-related attacks');
        }

        if (results.toxicity.threat && results.toxicity.threat.probability > 0.7) {
            results.emotion = 'anxious';
            results.confidence = Math.max(80, results.toxicity.threat.probability * 100);
            results.advancedInsights.push('Text contains threatening language');
        }

        // Update breakdown based on toxicity analysis
        results.breakdown[results.emotion] = results.confidence;
        
        return results;
    }

    static mergeAnalysisResults(basicResults, mlResults) {
        // Weighted combination of basic and ML analysis
        const mlWeight = 0.6;
        const basicWeight = 0.4;

        const mergedConfidence = Math.round(
            (mlResults.confidence * mlWeight) + (basicResults.confidence * basicWeight)
        );

        // Merge breakdowns
        const mergedBreakdown = {};
        Object.keys(basicResults.breakdown).forEach(emotion => {
            mergedBreakdown[emotion] = Math.round(
                (mlResults.breakdown[emotion] * mlWeight) + 
                (basicResults.breakdown[emotion] * basicWeight)
            );
        });

        // Determine dominant emotion from merged breakdown
        let dominantEmotion = basicResults.emotion;
        let highestScore = 0;

        Object.entries(mergedBreakdown).forEach(([emotion, score]) => {
            if (score > highestScore) {
                highestScore = score;
                dominantEmotion = emotion;
            }
        });

        return {
            ...basicResults,
            emotion: dominantEmotion,
            confidence: mergedConfidence,
            breakdown: mergedBreakdown,
            advancedInsights: mlResults.advancedInsights,
            toxicity: mlResults.toxicity,
            analysisMethod: 'advanced'
        };
    }

    static async analyzeSentiment(text) {
        // Simple sentiment analysis as fallback
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'happy', 'joy', 'love'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'angry', 'hate', 'dislike'];
        
        const words = text.toLowerCase().split(/\s+/);
        let positiveScore = 0;
        let negativeScore = 0;

        words.forEach(word => {
            if (positiveWords.includes(word)) positiveScore++;
            if (negativeWords.includes(word)) negativeScore++;
        });

        const totalScore = positiveScore + negativeScore;
        if (totalScore === 0) return 0.5; // Neutral

        return positiveScore / totalScore;
    }

    static extractTextFeatures(text) {
        // Extract linguistic features for emotion analysis
        const features = {
            wordCount: text.split(/\s+/).length,
            sentenceCount: text.split(/[.!?]+/).length - 1,
            avgWordLength: text.replace(/[^a-zA-Z]/g, '').length / text.split(/\s+/).length,
            exclamationCount: (text.match(/!/g) || []).length,
            questionCount: (text.match(/\?/g) || []).length,
            capitalRatio: (text.match(/[A-Z]/g) || []).length / text.length,
            emotionalWordDensity: 0
        };

        // Calculate emotional word density
        const emotionalWords = [
            'happy', 'sad', 'angry', 'excited', 'nervous', 'anxious', 'frustrated',
            'joy', 'grief', 'rage', 'fear', 'love', 'hate', 'worry', 'stress'
        ];
        
        const emotionalWordCount = text.toLowerCase().split(/\s+/).filter(word => 
            emotionalWords.includes(word)
        ).length;
        
        features.emotionalWordDensity = emotionalWordCount / features.wordCount;

        return features;
    }

    static generateAdvancedInsights(analysisResults, textFeatures) {
        const insights = [];

        // Text complexity insights
        if (textFeatures.wordCount > 50) {
            insights.push('Detailed emotional expression detected');
        }

        if (textFeatures.exclamationCount > 3) {
            insights.push('High emotional intensity in writing');
        }

        if (textFeatures.emotionalWordDensity > 0.3) {
            insights.push('Rich emotional vocabulary used');
        }

        // Confidence-based insights
        if (analysisResults.confidence > 85) {
            insights.push('High confidence in emotion detection');
        } else if (analysisResults.confidence < 60) {
            insights.push('Mixed emotional signals detected');
        }

        // Emotion-specific insights
        switch(analysisResults.emotion) {
            case 'happy':
                if (textFeatures.exclamationCount > 2) {
                    insights.push('Expressive positive emotion');
                }
                break;
            case 'sad':
                if (textFeatures.wordCount > 30) {
                    insights.push('Detailed expression of sadness');
                }
                break;
            case 'angry':
                if (textFeatures.capitalRatio > 0.2) {
                    insights.push('Intense expression of anger');
                }
                break;
            case 'anxious':
                if (textFeatures.questionCount > 2) {
                    insights.push('Anxiety accompanied by uncertainty');
                }
                break;
        }

        return insights;
    }

    static async analyzeWithAllMethods(text) {
        const basicAnalysis = EmotionDetector.analyzeText(text);
        const advancedAnalysis = await this.analyzeTextAdvanced(text);
        const textFeatures = this.extractTextFeatures(text);
        const sentiment = await this.analyzeSentiment(text);

        const additionalInsights = this.generateAdvancedInsights(advancedAnalysis, textFeatures);

        return {
            ...advancedAnalysis,
            textFeatures,
            sentiment,
            additionalInsights: [
                ...advancedAnalysis.advancedInsights,
                ...additionalInsights
            ],
            combinedConfidence: Math.round(
                (advancedAnalysis.confidence * 0.7) + (sentiment * 100 * 0.3)
            )
        };
    }

    // Real-time facial analysis simulation (would integrate with face-api.js in production)
    static async analyzeFacialExpressionFromCamera(videoElement) {
        // This is a simulation - in production, you would use face-api.js or similar
        return new Promise((resolve) => {
            setTimeout(() => {
                const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'anxious'];
                const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
                
                resolve({
                    emotion: randomEmotion,
                    confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
                    boundingBox: { x: 100, y: 100, width: 200, height: 200 },
                    landmarks: [],
                    analysisMethod: 'facial'
                });
            }, 1000);
        });
    }

    // Voice emotion analysis simulation
    static async analyzeVoiceEmotion(audioData) {
        // This would integrate with Web Audio API and ML models in production
        return new Promise((resolve) => {
            setTimeout(() => {
                const emotions = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'anxious'];
                const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
                
                resolve({
                    emotion: randomEmotion,
                    confidence: Math.floor(Math.random() * 25) + 65, // 65-90%
                    features: {
                        pitch: Math.random() * 100,
                        intensity: Math.random() * 100,
                        speechRate: Math.random() * 100
                    },
                    analysisMethod: 'voice'
                });
            }, 500);
        });
    }

    static getEmotionIntensity(emotion, confidence) {
        if (confidence >= 90) return 'very_strong';
        if (confidence >= 80) return 'strong';
        if (confidence >= 70) return 'moderate';
        if (confidence >= 60) return 'mild';
        return 'weak';
    }

    static getEmotionColor(emotion) {
        const colors = {
            happy: '#4CAF50',
            sad: '#2196F3',
            angry: '#f44336',
            surprised: '#00BCD4',
            neutral: '#FF9800',
            anxious: '#9C27B0'
        };
        return colors[emotion] || '#666';
    }

    static formatConfidence(confidence) {
        if (confidence >= 90) return 'Very High';
        if (confidence >= 80) return 'High';
        if (confidence >= 70) return 'Moderate';
        if (confidence >= 60) return 'Low';
        return 'Very Low';
    }
}

// Initialize when loaded
AdvancedEmotionDetector.init();