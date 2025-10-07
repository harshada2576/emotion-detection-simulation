class InteractionEngine {
    static generateResponse(emotionResult) {
        const responses = {
            happy: {
                message: "It's wonderful to see you feeling happy! Positive emotions like joy and contentment are great for your overall well-being. Consider sharing your happiness with others - it's contagious!",
                suggestions: [
                    "Share your positive mood with friends or family",
                    "Engage in activities you enjoy",
                    "Practice gratitude by writing down what made you happy",
                    "Spread kindness to others"
                ]
            },
            sad: {
                message: "I'm sorry you're feeling sad. It's completely normal to experience sadness sometimes. Remember that emotions are temporary, and it's okay to not be okay. Be gentle with yourself during this time.",
                suggestions: [
                    "Reach out to a trusted friend or family member",
                    "Engage in gentle physical activity like walking",
                    "Listen to calming music or watch a comforting movie",
                    "Practice self-compassion and acknowledge your feelings"
                ]
            },
            angry: {
                message: "I notice you're feeling angry. Anger is a natural emotion that signals when something isn't right. Let's work on understanding this feeling and finding healthy ways to express it.",
                suggestions: [
                    "Take deep breaths and count to 10 before reacting",
                    "Express your feelings using 'I feel' statements",
                    "Channel energy into physical activity",
                    "Write down what's bothering you in a journal"
                ]
            },
            anxious: {
                message: "I sense you're feeling anxious. Anxiety can be overwhelming, but there are effective ways to manage it. Let's focus on grounding techniques to help you feel more centered.",
                suggestions: [
                    "Practice the 5-4-3-2-1 grounding technique",
                    "Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s",
                    "Limit caffeine and take a break from screens",
                    "Break tasks into smaller, manageable steps"
                ]
            },
            surprised: {
                message: "You seem surprised! Unexpected events can trigger strong emotions. Let's process this surprise together and understand how it's affecting you.",
                suggestions: [
                    "Take a moment to process what happened",
                    "Talk through the surprising event with someone",
                    "Consider if this surprise opens up new possibilities",
                    "Practice mindfulness to stay present"
                ]
            },
            neutral: {
                message: "You appear to be in a neutral emotional state. This balanced state can be a great opportunity for reflection and intentional action. How would you like to use this emotional space?",
                suggestions: [
                    "Use this calm state for meditation or reflection",
                    "Plan your day or set some gentle goals",
                    "Engage in a creative activity",
                    "Practice mindfulness to maintain this balance"
                ]
            }
        };

        const response = responses[emotionResult.emotion] || responses.neutral;

        // Add personalized touch based on confidence
        if (emotionResult.confidence > 80) {
            response.message = `I'm quite confident you're feeling ${emotionResult.emotion}. ${response.message}`;
        } else if (emotionResult.confidence < 60) {
            response.message = `I'm detecting some ${emotionResult.emotion}, though I'm not entirely sure. ${response.message}`;
        }

        return response;
    }

    static getMentalHealthResources(emotion) {
        const resources = {
            crisis: {
                title: "Immediate Crisis Support",
                contacts: [
                    "National Suicide Prevention Lifeline: 1-800-273-8255",
                    "Crisis Text Line: Text HOME to 741741",
                    "Emergency Services: 911"
                ]
            },
            general: [
                "Mental Health America: www.mhanational.org",
                "National Alliance on Mental Illness: www.nami.org",
                "Psychology Today Therapist Directory: www.psychologytoday.com"
            ]
        };

        return resources;
    }

    static generateCopingStrategies(emotion, intensity) {
        const strategies = {
            low: [
                "Gentle breathing exercises",
                "Short mindfulness practice",
                "Light physical movement",
                "Positive distraction"
            ],
            medium: [
                "Structured breathing techniques",
                "Progressive muscle relaxation",
                "Journaling about feelings",
                "Reaching out for support"
            ],
            high: [
                "Emergency coping skills",
                "Immediate support contact",
                "Safe space creation",
                "Professional help seeking"
            ]
        };

        const intensityLevel = intensity > 80 ? 'high' : intensity > 50 ? 'medium' : 'low';
        return strategies[intensityLevel];
    }
}