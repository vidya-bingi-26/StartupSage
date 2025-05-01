document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startPitchBtn = document.getElementById('startPitch');
    const pitchModal = document.getElementById('pitchModal');
    const closeModalBtn = document.getElementById('closeModal');
    const talkBtn = document.getElementById('talkBtn');
    const muteBtn = document.getElementById('muteBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const conversationArea = document.querySelector('.conversation-area');
    const voiceWaves = document.querySelector('.voice-waves');
    const steps = document.querySelectorAll('.step');

    // Initialize step animation
    let currentStep = 0;
    highlightStep(currentStep);

    // Function to highlight current step
    function highlightStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.style.opacity = '1';
                step.style.transform = 'translateX(-10px)';
                step.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            } else {
                step.style.opacity = '0.7';
                step.style.transform = 'translateX(0)';
                step.style.backgroundColor = 'transparent';
            }
        });
    }

    // Automatically cycle through steps for demonstration
    function cycleSteps() {
        setInterval(() => {
            currentStep = (currentStep + 1) % steps.length;
            highlightStep(currentStep);
        }, 3000);
    }
    
    cycleSteps();

    // Open modal when start button is clicked
    startPitchBtn.addEventListener('click', function() {
        window.location.href = 'https://vapi.ai/?demo=true&shareKey=151862c4-2bef-4e85-86be-8b565c1fe2b7&assistantId=a8dab876-1996-4a89-9f1c-f86c974420d4';
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', function() {
        pitchModal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    pitchModal.addEventListener('click', function(e) {
        if (e.target === pitchModal) {
            pitchModal.style.display = 'none';
        }
    });

    // Talk button functionality
    talkBtn.addEventListener('click', function() {
        // Toggle active state
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            // Start recording
            this.innerHTML = '<i class="fas fa-stop"></i> Stop';
            voiceWaves.style.display = 'flex';
            
            // Simulate user speaking (in a real app, this would be voice recognition)
            setTimeout(() => {
                addMessage('Hi, I\'m pitching my startup called EcoTrack. It\'s a platform that helps businesses track and reduce their carbon footprint through AI-powered analytics.', 'user');
                
                // Simulate AI response after user finishes speaking
                setTimeout(() => {
                    talkBtn.innerHTML = '<i class="fas fa-microphone"></i> Talk';
                    talkBtn.classList.remove('active');
                    voiceWaves.style.display = 'none';
                    
                    addMessage('That sounds interesting. Can you tell me more about your target market and how you plan to monetize this platform?', 'agent');
                }, 2000);
            }, 3000);
        } else {
            // Stop recording
            this.innerHTML = '<i class="fas fa-microphone"></i> Talk';
            voiceWaves.style.display = 'none';
        }
    });

    // Mute button functionality
    muteBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-microphone"></i>';
            addMessage('Microphone unmuted', 'system');
        } else {
            this.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            addMessage('Microphone muted', 'system');
        }
    });

    // Pause button functionality
    pauseBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-play"></i>';
            addMessage('Session paused', 'system');
        } else {
            this.innerHTML = '<i class="fas fa-pause"></i>';
            addMessage('Session resumed', 'system');
        }
    });

    // Function to add a message to the conversation
    // Add these functions to the existing script.js file
    
    // After the DOMContentLoaded event handler, add:
    
    // Create particle background for the header
    function createParticleBackground() {
        const header = document.querySelector('header');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        header.appendChild(particleContainer);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${3 + Math.random() * 5}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particleContainer.appendChild(particle);
        }
    }
    
    // Add 3D tilt effect to feature cards
    function addTiltEffect() {
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
    
    // Add typewriter effect to agent messages
    function typewriterEffect(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Enhance the addMessage function
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (sender === 'agent') {
            messageDiv.classList.add('agent-message');
            const p = document.createElement('p');
            messageDiv.appendChild(p);
            conversationArea.appendChild(messageDiv);
            
            // Use typewriter effect for agent messages
            typewriterEffect(p, text, 30);
        } else if (sender === 'user') {
            messageDiv.classList.add('user-message');
            messageDiv.innerHTML = `<p>${text}</p>`;
            conversationArea.appendChild(messageDiv);
        } else {
            messageDiv.classList.add('system-message');
            messageDiv.style.backgroundColor = '#f0f0f0';
            messageDiv.style.color = '#666';
            messageDiv.style.textAlign = 'center';
            messageDiv.style.fontSize = '12px';
            messageDiv.style.padding = '5px 10px';
            messageDiv.style.margin = '5px auto';
            messageDiv.style.width = 'fit-content';
            messageDiv.innerHTML = `<p>${text}</p>`;
            conversationArea.appendChild(messageDiv);
        }
        
        // Scroll to the bottom of the conversation
        conversationArea.scrollTop = conversationArea.scrollHeight;
    }
    
    // Call these new functions
    createParticleBackground();
    addTiltEffect();
    
    // Add confetti effect when pitch is completed
    function showCompletionConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animationDuration = `${1 + Math.random() * 3}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
    
    // Add a demo completion button
    const demoCompleteBtn = document.createElement('button');
    demoCompleteBtn.className = 'demo-complete-btn';
    demoCompleteBtn.innerHTML = 'Demo Completion';
    demoCompleteBtn.style.position = 'fixed';
    demoCompleteBtn.style.bottom = '20px';
    demoCompleteBtn.style.right = '20px';
    demoCompleteBtn.style.zIndex = '1000';
    demoCompleteBtn.style.padding = '10px 15px';
    demoCompleteBtn.style.backgroundColor = '#28a745';
    demoCompleteBtn.style.color = 'white';
    demoCompleteBtn.style.border = 'none';
    demoCompleteBtn.style.borderRadius = '5px';
    demoCompleteBtn.style.cursor = 'pointer';
    document.body.appendChild(demoCompleteBtn);
    
    demoCompleteBtn.addEventListener('click', function() {
        showCompletionConfetti();
        
        // Show completion message
        const completionModal = document.createElement('div');
        completionModal.className = 'completion-modal';
        completionModal.innerHTML = `
            <div class="completion-content">
                <h2>Pitch Analysis Complete!</h2>
                <div class="analysis-summary">
                    <h3>SWOT Analysis</h3>
                    <div class="swot-grid">
                        <div class="swot-item">
                            <h4>Strengths</h4>
                            <ul>
                                <li>Innovative AI technology</li>
                                <li>Growing market demand</li>
                                <li>Scalable business model</li>
                            </ul>
                        </div>
                        <div class="swot-item">
                            <h4>Weaknesses</h4>
                            <ul>
                                <li>Early stage development</li>
                                <li>Limited market validation</li>
                                <li>Potential high customer acquisition costs</li>
                            </ul>
                        </div>
                        <div class="swot-item">
                            <h4>Opportunities</h4>
                            <ul>
                                <li>Expanding ESG regulations</li>
                                <li>Corporate sustainability initiatives</li>
                                <li>International market expansion</li>
                            </ul>
                        </div>
                        <div class="swot-item">
                            <h4>Threats</h4>
                            <ul>
                                <li>Emerging competitors</li>
                                <li>Changing regulatory landscape</li>
                                <li>Economic downturn affecting budgets</li>
                            </ul>
                        </div>
                    </div>
                    <h3>Funding Recommendation</h3>
                    <p>Based on your pitch and business model, I recommend seeking a Seed round of $750K-$1.2M to achieve product-market fit and initial customer traction.</p>
                    <button class="close-analysis-btn">Close Analysis</button>
                </div>
            </div>
        `;
        document.body.appendChild(completionModal);
        
        // Style the completion modal
        const style = document.createElement('style');
        style.textContent = `
            .completion-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 2000;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .completion-content {
                background-color: white;
                border-radius: 15px;
                padding: 30px;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            .completion-content h2 {
                color: #28a745;
                margin-bottom: 20px;
                text-align: center;
            }
            .swot-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 30px;
            }
            .swot-item {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
            }
            .swot-item h4 {
                margin-bottom: 10px;
                color: #1DA1F2;
            }
            .close-analysis-btn {
                background-color: #1DA1F2;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                display: block;
                margin: 20px auto 0;
            }
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                top: -10px;
                animation: confetti-fall linear forwards;
            }
            @keyframes confetti-fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Close analysis button
        document.querySelector('.close-analysis-btn').addEventListener('click', function() {
            completionModal.remove();
        });
    });
    
    // Add animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        featureCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    // Check scroll position on load and scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});