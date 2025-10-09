class MentalHealthExercises {
    static exercises = {
        breathing: {
            name: "4-7-8 Breathing Exercise",
            description: "Calming breathing technique for anxiety relief",
            duration: 5, // minutes
            category: "quick",
            steps: [
                "Find a comfortable sitting position",
                "Close your eyes and take a deep breath",
                "Follow the 4-7-8 pattern: Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds",
                "Repeat for 5 minutes"
            ],
            start: function(container) {
                let phase = 'breatheIn';
                let count = 0;
                let cycle = 0;
                const totalCycles = 8;
                
                container.innerHTML = `
                    <h3>🌬️ ${this.name}</h3>
                    <p>${this.description}</p>
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
                
                return setInterval(() => {
                    count++;
                    
                    switch(phase) {
                        case 'breatheIn':
                            if (count <= 4) {
                                timer.textContent = (5 - count);
                                circle.style.background = '#4CAF50';
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
                                circle.style.background = '#FF9800';
                            }
                            break;
                        case 'breatheOut':
                            if (count <= 8) {
                                timer.textContent = (9 - count);
                            } else {
                                phase = 'breatheIn';
                                count = 0;
                                cycle++;
                                instructions.textContent = 'Breathe in through your nose for 4 seconds';
                                circle.textContent = 'Breathe In';
                                circle.style.background = '#4CAF50';
                                cycleCounter.textContent = `Cycle: ${cycle + 1}/${totalCycles}`;
                                
                                if (cycle >= totalCycles) {
                                    container.innerHTML += `
                                        <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                                            🎉 Exercise complete! Well done!
                                        </div>
                                    `;
                                    return null;
                                }
                            }
                            break;
                    }
                }, 1000);
            }
        },

        meditation: {
            name: "5-Minute Mindfulness Meditation",
            description: "Quick mindfulness practice for stress reduction",
            duration: 5,
            category: "quick",
            steps: [
                "Find a quiet, comfortable space",
                "Close your eyes and focus on your breath",
                "Notice thoughts without judgment, let them pass",
                "Gently return focus to breathing when mind wanders"
            ],
            start: function(container) {
                let timeLeft = 300; // 5 minutes in seconds
                
                container.innerHTML = `
                    <h3>🧠 ${this.name}</h3>
                    <p>${this.description}</p>
                    <div class="meditation-timer" id="meditationTimer">05:00</div>
                    <div id="meditationInstructions" style="margin: 20px 0;">
                        <p>Close your eyes and focus on your breathing</p>
                        <p>Notice the sensation of air moving in and out</p>
                        <p>If your mind wanders, gently return to your breath</p>
                    </div>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        <strong>Mindfulness Tips:</strong>
                        <ul style="text-align: left; margin: 10px 0;">
                            <li>Don't judge your thoughts</li>
                            <li>Be kind to yourself</li>
                            <li>Focus on the present moment</li>
                        </ul>
                    </div>
                `;
                
                const timer = document.getElementById('meditationTimer');
                const instructions = document.getElementById('meditationInstructions');
                
                return setInterval(() => {
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
                        container.innerHTML += `
                            <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                                🎉 Meditation complete! Take this calm feeling with you.
                            </div>
                        `;
                        return null;
                    }
                }, 1000);
            }
        },

        pmr: {
            name: "Progressive Muscle Relaxation",
            description: "Systematic tension and relaxation of muscle groups",
            duration: 10,
            category: "therapy",
            steps: [
                "Tense each muscle group for 5 seconds",
                "Release suddenly and feel the relaxation",
                "Notice the difference between tension and relaxation",
                "Move systematically through all muscle groups"
            ],
            start: function(container) {
                const muscleGroups = [
                    { name: "Hands and Forearms", instruction: "Clench your fists tightly", duration: 5 },
                    { name: "Upper Arms", instruction: "Flex your biceps", duration: 5 },
                    { name: "Shoulders", instruction: "Shrug your shoulders up toward your ears", duration: 5 },
                    { name: "Neck", instruction: "Gently tilt your head back", duration: 5 },
                    { name: "Forehead", instruction: "Raise your eyebrows as high as possible", duration: 5 },
                    { name: "Eyes and Nose", instruction: "Squeeze your eyes shut and wrinkle your nose", duration: 5 },
                    { name: "Jaw", instruction: "Clench your jaw and smile widely", duration: 5 },
                    { name: "Chest", instruction: "Take a deep breath and hold it", duration: 5 },
                    { name: "Stomach", instruction: "Tighten your abdominal muscles", duration: 5 },
                    { name: "Lower Back", instruction: "Arch your back slightly", duration: 5 },
                    { name: "Buttocks", instruction: "Squeeze your buttocks together", duration: 5 },
                    { name: "Thighs", instruction: "Press your thighs together", duration: 5 },
                    { name: "Calves", instruction: "Point your toes toward your head", duration: 5 },
                    { name: "Feet", instruction: "Curl your toes downward", duration: 5 }
                ];
                
                let currentGroup = 0;
                let phase = 'tension'; // 'tension' or 'relaxation'
                let count = 0;
                
                container.innerHTML = `
                    <h3>💪 ${this.name}</h3>
                    <p>${this.description}</p>
                    <div class="pmr-steps">
                        <div class="pmr-step" id="currentStep">
                            <h4>${muscleGroups[currentGroup].name}</h4>
                            <p id="pmrInstruction">${muscleGroups[currentGroup].instruction}</p>
                            <div id="pmrTimer" style="font-size: 1.5em; font-weight: bold; margin: 10px 0;">5</div>
                            <div id="progress">Step ${currentGroup + 1} of ${muscleGroups.length}</div>
                        </div>
                    </div>
                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        <strong>Remember:</strong> Hold the tension for 5 seconds, then release completely and notice the relaxation for 10 seconds.
                    </div>
                `;
                
                const instructionEl = document.getElementById('pmrInstruction');
                const timerEl = document.getElementById('pmrTimer');
                const progressEl = document.getElementById('progress');
                
                return setInterval(() => {
                    count++;
                    
                    if (phase === 'tension') {
                        const timeLeft = muscleGroups[currentGroup].duration - count;
                        timerEl.textContent = timeLeft;
                        
                        if (count >= muscleGroups[currentGroup].duration) {
                            phase = 'relaxation';
                            count = 0;
                            instructionEl.textContent = "Release and relax completely";
                            timerEl.textContent = "10";
                            timerEl.style.color = '#4CAF50';
                        }
                    } else {
                        const timeLeft = 10 - count;
                        timerEl.textContent = timeLeft;
                        
                        if (count >= 10) {
                            phase = 'tension';
                            count = 0;
                            currentGroup++;
                            
                            if (currentGroup >= muscleGroups.length) {
                                container.innerHTML += `
                                    <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                                        🎉 PMR complete! Your body should feel deeply relaxed.
                                    </div>
                                `;
                                return null;
                            }
                            
                            instructionEl.textContent = muscleGroups[currentGroup].instruction;
                            timerEl.textContent = muscleGroups[currentGroup].duration;
                            timerEl.style.color = '#f44336';
                            progressEl.textContent = `Step ${currentGroup + 1} of ${muscleGroups.length}`;
                            
                            // Update step title
                            document.querySelector('#currentStep h4').textContent = muscleGroups[currentGroup].name;
                        }
                    }
                }, 1000);
            }
        },

        cbt: {
            name: "CBT Thought Record",
            description: "Cognitive Behavioral Therapy exercise to challenge negative thoughts",
            duration: 10,
            category: "therapy",
            steps: [
                "Identify the situation and automatic thought",
                "Examine evidence for and against the thought",
                "Consider alternative perspectives",
                "Develop a balanced thought"
            ],
            start: function(container) {
                container.innerHTML = `
                    <h3>🔄 ${this.name}</h3>
                    <p>${this.description}</p>
                    <div class="cbt-form">
                        <div class="cbt-field">
                            <label for="cbtSituation">1. The Situation:</label>
                            <textarea id="cbtSituation" placeholder="What happened? Where? When? With whom?"></textarea>
                        </div>
                        
                        <div class="cbt-field">
                            <label for="cbtEmotion">2. Emotions & Intensity (0-100):</label>
                            <textarea id="cbtEmotion" placeholder="How did you feel? Rate the intensity."></textarea>
                        </div>
                        
                        <div class="cbt-field">
                            <label for="cbtThought">3. Automatic Thought:</label>
                            <textarea id="cbtThought" placeholder="What thought automatically came to mind?"></textarea>
                        </div>
                        
                        <div class="cbt-field">
                            <label for="cbtEvidenceFor">4. Evidence Supporting the Thought:</label>
                            <textarea id="cbtEvidenceFor" placeholder="What facts support this thought?"></textarea>
                        </div>
                        
                        <div class="cbt-field">
                            <label for="cbtEvidenceAgainst">5. Evidence Against the Thought:</label>
                            <textarea id="cbtEvidenceAgainst" placeholder="What facts contradict this thought?"></textarea>
                        </div>
                        
                        <div class="cbt-field">
                            <label for="cbtAlternative">6. Alternative/Balanced Thought:</label>
                            <textarea id="cbtAlternative" placeholder="What's a more balanced perspective?"></textarea>
                        </div>
                        
                        <div class="cbt-field">
                            <label for="cbtReRate">7. Re-rate Emotion Intensity (0-100):</label>
                            <textarea id="cbtReRate" placeholder="How intense do you feel now?"></textarea>
                        </div>
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <strong>CBT Tips:</strong>
                        <ul style="text-align: left; margin: 10px 0;">
                            <li>Be specific and factual in your evidence</li>
                            <li>Consider what you would tell a friend in this situation</li>
                            <li>Look for patterns in your thinking</li>
                            <li>Practice self-compassion</li>
                        </ul>
                    </div>
                    
                    <button id="saveCbtRecord" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        💾 Save Thought Record
                    </button>
                `;
                
                document.getElementById('saveCbtRecord').addEventListener('click', () => {
                    const record = {
                        situation: document.getElementById('cbtSituation').value,
                        emotion: document.getElementById('cbtEmotion').value,
                        thought: document.getElementById('cbtThought').value,
                        evidenceFor: document.getElementById('cbtEvidenceFor').value,
                        evidenceAgainst: document.getElementById('cbtEvidenceAgainst').value,
                        alternative: document.getElementById('cbtAlternative').value,
                        rerating: document.getElementById('cbtReRate').value,
                        timestamp: new Date().toISOString()
                    };
                    
                    // Save to localStorage
                    const existingRecords = JSON.parse(localStorage.getItem('cbtRecords') || '[]');
                    existingRecords.push(record);
                    localStorage.setItem('cbtRecords', JSON.stringify(existingRecords));
                    
                    container.innerHTML += `
                        <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                            ✅ Thought record saved! Review your records regularly to track patterns.
                        </div>
                    `;
                });
                
                return null; // No interval for this exercise
            }
        },

        journal: {
            name: "Guided Journaling",
            description: "Structured writing for emotional processing and self-reflection",
            duration: 15,
            category: "mindfulness",
            steps: [
                "Find a quiet space with minimal distractions",
                "Write continuously without self-editing",
                "Be honest and non-judgmental with yourself",
                "Reflect on insights and patterns"
            ],
            start: function(container) {
                const prompts = [
                    "What emotions am I experiencing right now? Where do I feel them in my body?",
                    "What thoughts are occupying my mind today? Are they helpful or unhelpful?",
                    "What am I grateful for in this moment? Big or small things count.",
                    "What challenges am I facing? How can I approach them with self-compassion?",
                    "What would I like to let go of? What's no longer serving me?",
                    "What brings me joy or peace? How can I incorporate more of this into my life?",
                    "What have I learned about myself recently? What growth have I noticed?",
                    "What do I need right now? How can I meet those needs in healthy ways?",
                    "If I could tell my past self one thing, what would it be?",
                    "What hopes do I have for the future? What small step can I take today?"
                ];
                
                container.innerHTML = `
                    <h3>📝 ${this.name}</h3>
                    <p>${this.description}</p>
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
                    
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <strong>Journaling Tips:</strong>
                        <ul style="text-align: left; margin: 10px 0;">
                            <li>Write without worrying about grammar or spelling</li>
                            <li>Be completely honest - this is for your eyes only</li>
                            <li>Don't censor yourself - let the thoughts flow</li>
                            <li>Notice patterns over time in your journal entries</li>
                        </ul>
                    </div>
                    
                    <button id="saveJournal" style="background: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                        💾 Save Journal Entry
                    </button>
                    <button id="exportJournal" style="background: #FF9800; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        📤 Export as Text
                    </button>
                `;
                
                document.getElementById('saveJournal').addEventListener('click', () => {
                    const entries = [];
                    document.querySelectorAll('textarea[data-prompt-index]').forEach(textarea => {
                        if (textarea.value.trim()) {
                            entries.push({
                                prompt: prompts[parseInt(textarea.dataset.promptIndex)],
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
                        
                        container.innerHTML += `
                            <div style="color: #4CAF50; font-weight: bold; margin-top: 20px;">
                                ✅ Journal entry saved! You've written ${entries.length} reflections.
                            </div>
                        `;
                    } else {
                        alert('Please write something before saving.');
                    }
                });
                
                document.getElementById('exportJournal').addEventListener('click', () => {
                    let exportText = `Journal Entry - ${new Date().toLocaleString()}\n\n`;
                    
                    document.querySelectorAll('textarea[data-prompt-index]').forEach((textarea, index) => {
                        if (textarea.value.trim()) {
                            exportText += `${index + 1}. ${prompts[index]}\n`;
                            exportText += `Response: ${textarea.value}\n\n`;
                        }
                    });
                    
                    const blob = new Blob([exportText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `journal-entry-${new Date().toISOString().split('T')[0]}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                });
                
                return null;
            }
        },

        grounding: {
            name: "5-4-3-2-1 Grounding Technique",
            description: "Sensory grounding exercise for anxiety and panic attacks",
            duration: 5,
            category: "mindfulness",
            steps: [
                "Name 5 things you can see",
                "Name 4 things you can touch",
                "Name 3 things you can hear",
                "Name 2 things you can smell",
                "Name 1 thing you can taste"
            ],
            start: function(container) {
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
                    <h3>🌍 ${this.name}</h3>
                    <p>${this.description}</p>
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
                
                return null;
            }
        }
    };

    static getExercisesByCategory(category) {
        return Object.entries(this.exercises)
            .filter(([key, exercise]) => exercise.category === category)
            .map(([key, exercise]) => ({ key, ...exercise }));
    }

    static getAllCategories() {
        return [...new Set(Object.values(this.exercises).map(exercise => exercise.category))];
    }

    static startExercise(exerciseKey, container) {
        const exercise = this.exercises[exerciseKey];
        if (!exercise) {
            throw new Error(`Exercise not found: ${exerciseKey}`);
        }
        
        return exercise.start(container);
    }

    static getExerciseDuration(exerciseKey) {
        const exercise = this.exercises[exerciseKey];
        return exercise ? exercise.duration : 0;
    }

    static formatDuration(minutes) {
        if (minutes < 1) return 'Less than 1 minute';
        if (minutes === 1) return '1 minute';
        return `${minutes} minutes`;
    }

    static getRandomExercise(category = null) {
        let availableExercises = Object.keys(this.exercises);
        
        if (category) {
            availableExercises = availableExercises.filter(key => 
                this.exercises[key].category === category
            );
        }
        
        if (availableExercises.length === 0) return null;
        
        const randomKey = availableExercises[Math.floor(Math.random() * availableExercises.length)];
        return { key: randomKey, ...this.exercises[randomKey] };
    }

    static getExerciseStats() {
        const stats = {
            totalExercises: Object.keys(this.exercises).length,
            byCategory: {},
            totalDuration: 0
        };

        Object.values(this.exercises).forEach(exercise => {
            stats.totalDuration += exercise.duration;
            
            if (!stats.byCategory[exercise.category]) {
                stats.byCategory[exercise.category] = {
                    count: 0,
                    totalDuration: 0
                };
            }
            
            stats.byCategory[exercise.category].count++;
            stats.byCategory[exercise.category].totalDuration += exercise.duration;
        });

        return stats;
    }
}