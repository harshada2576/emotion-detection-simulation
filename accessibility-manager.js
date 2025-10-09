class AccessibilityManager {
    static init() {
        this.setupAccessibilityControls();
        this.setupKeyboardNavigation();
        this.setupARIALabels();
        this.setupLiveRegion();
        this.applySavedPreferences();
    }

    static setupAccessibilityControls() {
        // High Contrast Toggle
        const highContrastBtn = document.getElementById('highContrastToggle');
        if (highContrastBtn) {
            highContrastBtn.addEventListener('click', () => this.toggleHighContrast());
        }

        // Large Text Toggle
        const largeTextBtn = document.getElementById('largeTextToggle');
        if (largeTextBtn) {
            largeTextBtn.addEventListener('click', () => this.toggleLargeText());
        }

        // Reduce Motion Toggle
        const reduceMotionBtn = document.getElementById('reduceMotionToggle');
        if (reduceMotionBtn) {
            reduceMotionBtn.addEventListener('click', () => this.toggleReduceMotion());
        }
    }

    static setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.matches('input, textarea, select')) return;

            switch(e.key) {
                case '1':
                    this.focusElement('textInput');
                    break;
                case '2':
                    this.focusElement('startRecording');
                    break;
                case '3':
                    this.focusFirstEmotionButton();
                    break;
                case '4':
                    this.focusElement('startCamera');
                    break;
                case 'Escape':
                    this.closeModals();
                    break;
                case 'Tab':
                    this.handleTabNavigation(e);
                    break;
            }
        });

        // Trap focus in modals
        this.setupFocusTrapping();
    }

    static setupARIALabels() {
        // Add ARIA labels to interactive elements
        const elements = {
            '.emoji-btn': (btn) => `Select ${btn.dataset.emotion} expression`,
            '.analyze-btn': () => 'Analyze text emotion',
            '.voice-btn': (btn) => btn.disabled ? 'Stop voice recording' : 'Start voice recording',
            '.camera-btn': (btn) => btn.disabled ? 'Capture emotion from camera' : 'Start camera',
            '.start-exercise': (btn) => `Start ${btn.closest('.exercise-card').querySelector('h4').textContent} exercise`,
            '#generateReportBtn': () => 'Generate emotional well-being report'
        };

        Object.entries(elements).forEach(([selector, getLabel]) => {
            document.querySelectorAll(selector).forEach(element => {
                const label = getLabel(element);
                if (label) {
                    element.setAttribute('aria-label', label);
                }
            });
        });

        // Add role attributes
        document.querySelectorAll('.facial-expressions').forEach(el => {
            el.setAttribute('role', 'toolbar');
            el.setAttribute('aria-label', 'Facial expression selection');
        });

        document.querySelectorAll('.exercise-cards').forEach(el => {
            el.setAttribute('role', 'grid');
            el.setAttribute('aria-label', 'Mental health exercises');
        });
    }

    static setupLiveRegion() {
        // Live region for dynamic content announcements
        let liveRegion = document.getElementById('liveRegion');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'liveRegion';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }
    }

    static applySavedPreferences() {
        // Load saved accessibility preferences
        const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences') || '{}');
        
        if (preferences.highContrast) {
            this.enableHighContrast();
        }
        if (preferences.largeText) {
            this.enableLargeText();
        }
        if (preferences.reduceMotion) {
            this.enableReduceMotion();
        }
    }

    static toggleHighContrast() {
        if (document.body.classList.contains('high-contrast')) {
            this.disableHighContrast();
        } else {
            this.enableHighContrast();
        }
    }

    static enableHighContrast() {
        document.body.classList.add('high-contrast');
        this.savePreference('highContrast', true);
        this.announce('High contrast mode enabled');
    }

    static disableHighContrast() {
        document.body.classList.remove('high-contrast');
        this.savePreference('highContrast', false);
        this.announce('High contrast mode disabled');
    }

    static toggleLargeText() {
        if (document.body.classList.contains('large-text')) {
            this.disableLargeText();
        } else {
            this.enableLargeText();
        }
    }

    static enableLargeText() {
        document.body.classList.add('large-text');
        this.savePreference('largeText', true);
        this.announce('Large text mode enabled');
    }

    static disableLargeText() {
        document.body.classList.remove('large-text');
        this.savePreference('largeText', false);
        this.announce('Large text mode disabled');
    }

    static toggleReduceMotion() {
        if (document.body.classList.contains('reduce-motion')) {
            this.disableReduceMotion();
        } else {
            this.enableReduceMotion();
        }
    }

    static enableReduceMotion() {
        document.body.classList.add('reduce-motion');
        this.savePreference('reduceMotion', true);
        this.announce('Reduced motion mode enabled');
    }

    static disableReduceMotion() {
        document.body.classList.remove('reduce-motion');
        this.savePreference('reduceMotion', false);
        this.announce('Reduced motion mode disabled');
    }

    static savePreference(key, value) {
        const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences') || '{}');
        preferences[key] = value;
        localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    }

    static focusElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.focus();
        }
    }

    static focusFirstEmotionButton() {
        const firstEmotionBtn = document.querySelector('.emoji-btn');
        if (firstEmotionBtn) {
            firstEmotionBtn.focus();
        }
    }

    static closeModals() {
        // Close any open modals or exercise containers
        const exerciseContainer = document.getElementById('exerciseContainer');
        if (exerciseContainer && exerciseContainer.style.display !== 'none') {
            emotionApp.stopExercise();
            this.announce('Exercise stopped');
        }
    }

    static handleTabNavigation(e) {
        // Ensure proper tab order and focus management
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    static setupFocusTrapping() {
        // Trap focus within modal when open
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.id === 'exerciseContainer' || target.classList.contains('modal-open')) {
                        if (target.style.display !== 'none') {
                            this.trapFocus(target);
                        }
                    }
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style']
        });
    }

    static trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function trapListener(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }

            if (e.key === 'Escape') {
                emotionApp.stopExercise();
                element.removeEventListener('keydown', trapListener);
            }
        });

        // Focus first element
        firstElement.focus();
    }

    static announce(message, priority = 'polite') {
        const liveRegion = document.getElementById('liveRegion');
        if (liveRegion) {
            liveRegion.setAttribute('aria-live', priority);
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    static isHighContrast() {
        return document.body.classList.contains('high-contrast');
    }

    static isLargeText() {
        return document.body.classList.contains('large-text');
    }

    static isReducedMotion() {
        return document.body.classList.contains('reduce-motion');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AccessibilityManager.init();
});