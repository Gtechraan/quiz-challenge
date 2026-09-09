/* ============================================ */
// MASTER JAVASCRIPT - ALL PAGES
/* ============================================ */

// ============================================ //
// 1. LANDING PAGE - index.html                 //
// ============================================ //

function startChallenge() {
    window.location.href = "quiz.html";
}


// ============================================ //
// 2. QUIZ PAGE - quiz.html                     //
// ============================================ //

// 15 IT Skill Questions
const questions = [
    {
        question: "What is the output of this Python code? x = 10, y = 3, print(x // y)",
        options: ["3.33", "3", "4", "1"],
        answer: 1
    },
    {
        question: "Which OOP concept allows a child class to acquire properties and methods of a parent class?",
        options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
        answer: 2
    },
    {
        question: "What is the main purpose of exception handling?",
        options: ["To increase program speed", "To handle runtime errors gracefully", "To create user interfaces", "To store database records"],
        answer: 1
    },
    {
        question: "Which SQL clause is used to filter rows based on a condition?",
        options: ["ORDER BY", "WHERE", "GROUP BY", "JOIN"],
        answer: 1
    },
    {
        question: "Which JOIN returns only rows that have matching values in both tables?",
        options: ["LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN"],
        answer: 3
    },
    {
        question: "What does SELECT MAX(Salary) FROM Employee return?",
        options: ["The lowest salary", "The average salary", "The highest salary", "The total salary"],
        answer: 2
    },
    {
        question: "What is the main purpose of a primary key?",
        options: ["To sort records", "To uniquely identify each row", "To delete duplicate tables", "To connect two databases"],
        answer: 1
    },
    {
        question: "A password must contain between 8 and 12 characters. Which set is best for boundary-value testing?",
        options: ["1, 5, 15, 20", "7, 8, 12, 13", "8, 9, 10, 11", "5, 10, 15, 20"],
        answer: 1
    },
    {
        question: "A developer fixes a reported defect. What should the tester primarily perform first?",
        options: ["Delete the defect", "Retest the specific defect", "Perform load testing", "Rewrite the test cases"],
        answer: 1
    },
    {
        question: "Which testing is performed after a change to ensure existing functionality still works?",
        options: ["Regression Testing", "Smoke Testing", "Performance Testing", "Usability Testing"],
        answer: 0
    },
    {
        question: "Which HTTP method is generally used to retrieve data from a server?",
        options: ["POST", "PUT", "GET", "DELETE"],
        answer: 2
    },
    {
        question: "What does HTTP status code 404 generally indicate?",
        options: ["Successful request", "Unauthorized request", "Server error", "Resource not found"],
        answer: 3
    },
    {
        question: "A developer has committed changes locally and wants to upload them to a remote GitHub repository. Which command should be used?",
        options: ["git pull", "git fetch", "git push", "git clone"],
        answer: 2
    },
    {
        question: "A company wants employees to use an application through a web browser without managing the underlying software infrastructure. Which cloud model fits best?",
        options: ["IaaS", "PaaS", "SaaS", "On-premises"],
        answer: 2
    },
    {
        question: "A program takes 2 seconds to process 100 records. Assuming linear scaling, how long will it take to process 500 records?",
        options: ["4 seconds", "6 seconds", "10 seconds", "20 seconds"],
        answer: 2
    }
];

// Quiz State Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 180; // 3 minutes in seconds
let timerInterval = null;
let answers = new Array(questions.length).fill(null);
let isQuizFinished = false;

// Load question when page loads
if (document.getElementById('question')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadQuestion();
        startTimer();
    });
}

// QUIZ FUNCTIONS

function loadQuestion() {
    if (isQuizFinished) return;
    
    const q = questions[currentQuestion];
    
    // Update question number
    const questionNumber = document.getElementById("questionNumber");
    if (questionNumber) {
        questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    }
    
    // Update question text
    const questionEl = document.getElementById("question");
    if (questionEl) {
        questionEl.textContent = q.question;
    }
    
    // Clear and load options
    const optionsContainer = document.getElementById("options");
    if (optionsContainer) {
        optionsContainer.innerHTML = "";
        
        q.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.className = "option";
            button.textContent = option;
            button.dataset.index = index;
            
            // If this answer was previously selected, highlight it
            if (answers[currentQuestion] === index) {
                button.classList.add("selected");
            }
            
            button.onclick = function() {
                selectAnswer(index);
            };
            
            optionsContainer.appendChild(button);
        });
    }
    
    // Update progress bar
    updateProgress();
}

function selectAnswer(index) {
    if (isQuizFinished) return;
    
    const optionButtons = document.querySelectorAll(".option");
    
    // Remove selected class from all options
    optionButtons.forEach(button => {
        button.classList.remove("selected");
    });
    
    // Add selected class to clicked option
    if (optionButtons[index]) {
        optionButtons[index].classList.add("selected");
    }
    
    // Store the answer
    answers[currentQuestion] = index;
}

function nextQuestion() {
    if (isQuizFinished) return;
    
    // Check if an answer was selected
    if (answers[currentQuestion] === null) {
        showAlert("Please select an answer before continuing.");
        return;
    }
    
    currentQuestion++;
    
    // If all questions are answered, finish the quiz
    if (currentQuestion >= questions.length) {
        finishQuiz();
        return;
    }
    
    loadQuestion();
}

function calculateScore() {
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        
        // Auto-submit when time runs out
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return;
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = 
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
    // Change color when time is running low
    if (timeLeft <= 30) {
        timerElement.style.color = "#ff5dbd";
    } else {
        timerElement.style.color = "#55e4ef";
    }
}

function updateProgress() {
    const progressBar = document.getElementById("progressBar");
    if (!progressBar) return;
    
    const percentage = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = percentage + "%";
}

function finishQuiz() {
    if (isQuizFinished) return;
    
    isQuizFinished = true;
    
    // Stop the timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Calculate score
    calculateScore();
    
    // Save to session storage
    sessionStorage.setItem("quizScore", score);
    sessionStorage.setItem("totalQuestions", questions.length);
    sessionStorage.setItem("timeUsed", 180 - timeLeft);
    
    // Navigate to result page
    window.location.href = "result.html";
}

function showAlert(message) {
    alert(message);
}

// Keyboard shortcut: Enter key to go to next question
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && document.getElementById('nextButton')) {
        nextQuestion();
    }
});


// ============================================ //
// 3. RESULT/FORM PAGE - result.html            //
// ============================================ //

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// Form submission handler
if (document.getElementById('studentForm')) {
    document.getElementById("studentForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const button = document.querySelector(".submit-btn");
        const messageDiv = document.getElementById("message");

        // Reset message
        messageDiv.textContent = "";
        messageDiv.style.padding = "0";
        messageDiv.style.display = "block";

        // Get form values
        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const college = document.getElementById("college").value.trim();
        const department = document.getElementById("department").value.trim();
        const graduation = document.getElementById("graduation").value;

        // === VALIDATION ===
        if (!name || !mobile || !email || !college || !department || !graduation) {
            messageDiv.textContent = "⚠️ Please fill in all fields.";
            messageDiv.style.color = "#ff5dbd";
            return;
        }

        if (mobile.length !== 10 || !/^[0-9]{10}$/.test(mobile)) {
            messageDiv.textContent = "⚠️ Please enter a valid 10-digit mobile number.";
            messageDiv.style.color = "#ff5dbd";
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            messageDiv.textContent = "⚠️ Please enter a valid email address.";
            messageDiv.style.color = "#ff5dbd";
            return;
        }

        // Get quiz data from session storage
        const score = sessionStorage.getItem("quizScore") || "0";
        const total = sessionStorage.getItem("totalQuestions") || "15";
        const timeUsed = sessionStorage.getItem("timeUsed") || "0";

        // Create student data object
        const studentData = {
            name: name,
            mobile: mobile,
            email: email,
            college: college,
            department: department,
            graduation: graduation,
            score: score,
            total: total,
            timeUsed: timeUsed,
            submittedAt: new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };

        // Disable button and show loading
        button.disabled = true;
        button.textContent = "⏳ SUBMITTING...";
        messageDiv.textContent = "⏳ Saving your data...";
        messageDiv.style.color = "#55e4ef";

        try {
            // Send data to Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            });

            // Check response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse response
            let result;
            try {
                result = await response.json();
            } catch (parseError) {
                console.warn("Response is not JSON, but request was sent successfully");
                result = { success: true, message: "Data received" };
            }

            console.log("✅ Response from Google Script:", result);

            // Handle success
            if (result && result.success !== false) {
                messageDiv.textContent = "✅ Data saved successfully!";
                messageDiv.style.color = "#55e4ef";
                
                // Store submission status
                sessionStorage.setItem("studentSubmitted", "true");
                sessionStorage.setItem("studentName", name);
                
                // Redirect to score page
                setTimeout(() => {
                    window.location.href = "score.html";
                }, 1000);
                
            } else {
                throw new Error(result?.message || "Failed to save data");
            }

        } catch (error) {
            // === ERROR HANDLING ===
            console.error("❌ Submission error:", error);
            
            // Show error message
            messageDiv.textContent = "⚠️ " + error.message;
            messageDiv.style.color = "#ff5dbd";
            
            // Re-enable button
            button.disabled = false;
            button.textContent = "UNLOCK MY SCORE";
        }
    });
}


// ============================================ //
// 4. SCORE PAGE - score.html                   //
// ============================================ //

// Score page handler
if (document.getElementById('score')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Security check: Only show score if form was submitted
        const submitted = sessionStorage.getItem("studentSubmitted");
        
        if (submitted !== "true") {
            window.location.href = "result.html";
            return;
        }
        
        // Get data from session storage
        const score = Number(sessionStorage.getItem("quizScore")) || 0;
        const total = Number(sessionStorage.getItem("totalQuestions")) || 15;
        
        // Display score
        const scoreElement = document.getElementById("score");
        const totalElement = document.getElementById("total");
        
        if (scoreElement) scoreElement.textContent = score;
        if (totalElement) totalElement.textContent = total;
        
        // Calculate percentage
        const percentage = (score / total) * 100;
        
        // Determine level and message
        let level = "";
        let message = "";
        let emoji = "";
        
        if (percentage >= 80) {
            level = "EXCELLENT IT READINESS";
            message = "You have demonstrated strong IT fundamentals. Keep building your interview skills.";
            emoji = "🌟";
        } else if (percentage >= 60) {
            level = "INTERVIEW READY";
            message = "You have a good foundation, but there are areas you can strengthen before interviews.";
            emoji = "💪";
        } else if (percentage >= 40) {
            level = "NEEDS IMPROVEMENT";
            message = "You have some good fundamentals. Strengthening your core IT skills can improve your interview readiness.";
            emoji = "📚";
        } else {
            level = "SKILLS NEED BUILDING";
            message = "This challenge identified several areas where you can strengthen your IT fundamentals.";
            emoji = "🔧";
        }
        
        // Display level and message
        const levelElement = document.getElementById("level");
        const messageElement = document.getElementById("message");
        
        if (levelElement) levelElement.textContent = `${emoji} ${level}`;
        if (messageElement) messageElement.textContent = message;
        
        // Animate score counting up
        animateScore(score);
    });
}

function animateScore(targetScore) {
    const scoreElement = document.getElementById("score");
    if (!scoreElement) return;
    
    let currentScore = 0;
    const duration = 1000; // 1 second
    const steps = 20;
    const increment = Math.ceil(targetScore / steps);
    const intervalTime = duration / steps;
    
    const interval = setInterval(function() {
        currentScore += increment;
        
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(interval);
        }
        
        scoreElement.textContent = currentScore;
    }, intervalTime);
}

// WhatsApp function
function openWhatsApp() {
    const score = sessionStorage.getItem("quizScore") || 0;
    const total = sessionStorage.getItem("totalQuestions") || 15;
    const name = sessionStorage.getItem("studentName") || "Student";
    
    const message = encodeURIComponent(
        `Hi, I completed the IT Skill Challenge and scored ${score}/${total}. I would like to receive my personalized learning roadmap.`
    );
    
    // Replace with your actual WhatsApp number
    const phoneNumber = "917987456321"; // India format without +
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}


// ============================================ //
// 5. UTILITY FUNCTIONS                        //
// ============================================ //

function isMobileDevice() {
    return window.innerWidth <= 768;
}

function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function showToast(message, type = 'info') {
    const colors = {
        info: '#55e4ef',
        success: '#25D366',
        error: '#ff5dbd',
        warning: '#f5a900'
    };
    
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: rgba(0, 20, 60, 0.95);
        border: 2px solid ${colors[type] || colors.info};
        border-radius: 10px;
        color: white;
        font-size: 14px;
        font-weight: 600;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add toast animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
