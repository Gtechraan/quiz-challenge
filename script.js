/* ============================================ */
// LANDING PAGE - INDEX.HTML
/* ============================================ */

function startChallenge() {
    window.location.href = "quiz.html";
}


/* ============================================ */
// QUIZ PAGE - QUIZ.HTML
/* ============================================ */

// All 15 IT skill questions
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

// Quiz state variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 180; // 3 minutes in seconds
let timerInterval = null;
let answers = new Array(questions.length).fill(null);
let isQuizFinished = false;

// Load question on page load
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    startTimer();
});

/**
 * Load the current question and options
 */
function loadQuestion() {
    if (isQuizFinished) return;
    
    const q = questions[currentQuestion];
    
    // Update question number
    document.getElementById("questionNumber").textContent = 
        `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Update question text
    document.getElementById("question").textContent = q.question;
    
    // Clear and load options
    const optionsContainer = document.getElementById("options");
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
    
    // Update progress bar
    updateProgress();
}

/**
 * Select an answer for the current question
 */
function selectAnswer(index) {
    if (isQuizFinished) return;
    
    const optionButtons = document.querySelectorAll(".option");
    
    // Remove selected class from all options
    optionButtons.forEach(button => {
        button.classList.remove("selected");
    });
    
    // Add selected class to clicked option
    optionButtons[index].classList.add("selected");
    
    // Store the answer
    answers[currentQuestion] = index;
}

/**
 * Move to the next question or finish the quiz
 */
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

/**
 * Calculate the final score
 */
function calculateScore() {
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

/**
 * Start the timer countdown
 */
function startTimer() {
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

/**
 * Update the timer display
 */
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = 
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
    // Change color when time is running low
    const timerElement = document.getElementById("timer");
    if (timeLeft <= 30) {
        timerElement.style.color = "#ff5dbd";
    } else {
        timerElement.style.color = "#55e4ef";
    }
}

/**
 * Update the progress bar
 */
function updateProgress() {
    const percentage = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progressBar").style.width = percentage + "%";
}

/**
 * Finish the quiz and save results
 */
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

/**
 * Show alert message (customizable)
 */
function showAlert(message) {
    alert(message);
}

// Keyboard shortcut: Enter key to go to next question
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        nextQuestion();
    }
});


/* ============================================ */
// RESULT/FORM PAGE - RESULT.HTML
/* ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Set up form submission
    const form = document.getElementById('studentForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const button = document.querySelector(".submit-btn");
    const messageDiv = document.getElementById("message");
    
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = "SUBMITTING...";
    messageDiv.textContent = "";
    
    // Get form values
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const department = document.getElementById("department").value.trim();
    const graduation = document.getElementById("graduation").value;
    
    // Validate form
    if (!name || !mobile || !email || !college || !department || !graduation) {
        messageDiv.textContent = "Please fill in all fields.";
        messageDiv.style.color = "#ff5dbd";
        button.disabled = false;
        button.textContent = "UNLOCK MY SCORE";
        return;
    }
    
    if (mobile.length !== 10 || !/^[0-9]{10}$/.test(mobile)) {
        messageDiv.textContent = "Please enter a valid 10-digit mobile number.";
        messageDiv.style.color = "#ff5dbd";
        button.disabled = false;
        button.textContent = "UNLOCK MY SCORE";
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "#ff5dbd";
        button.disabled = false;
        button.textContent = "UNLOCK MY SCORE";
        return;
    }
    
    // Get quiz data from session storage
    const score = sessionStorage.getItem("quizScore");
    const total = sessionStorage.getItem("totalQuestions");
    const timeUsed = sessionStorage.getItem("timeUsed");
    
    // Create student data object
    const studentData = {
        name: name,
        mobile: mobile,
        email: email,
        college: college,
        department: department,
        graduation: graduation,
        score: score || 0,
        total: total || 15,
        timeUsed: timeUsed || 0,
        submittedAt: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };
    
    // Google Apps Script URL (replace with your actual URL)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQDohCn9U-JfsIZYWUF_UmKB1DgfwTrf716ON6EwEhMzjae05qEeqXaqeoVNFIEU7Lmg/exec";
    
    try {
        // Send data to Google Sheets (if URL is configured)
        if (GOOGLE_SCRIPT_URL !== "https://script.google.com/macros/s/AKfycbwQDohCn9U-JfsIZYWUF_UmKB1DgfwTrf716ON6EwEhMzjae05qEeqXaqeoVNFIEU7Lmg/exec") {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(studentData)
            });
        } else {
            // If no Google Script URL, just log the data
            console.log("Student Data:", studentData);
        }
        
        // Store submission status
        sessionStorage.setItem("studentSubmitted", "true");
        
        // Navigate to score page
        window.location.href = "score.html";
        
    } catch (error) {
        console.error("Submission error:", error);
        messageDiv.textContent = "Something went wrong. Please try again.";
        messageDiv.style.color = "#ff5dbd";
        button.disabled = false;
        button.textContent = "UNLOCK MY SCORE";
    }
}


/* ============================================ */
// SCORE PAGE - SCORE.HTML
/* ============================================ */

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
    document.getElementById("score").textContent = score;
    document.getElementById("total").textContent = total;
    
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
    
    // Display level and message with emoji
    document.getElementById("level").textContent = `${emoji} ${level}`;
    document.getElementById("message").textContent = message;
    
    // Add animation to score
    animateScore();
});

/**
 * Animate the score counting up
 */
function animateScore() {
    const scoreElement = document.getElementById("score");
    const targetScore = Number(sessionStorage.getItem("quizScore")) || 0;
    let currentScore = 0;
    
    const interval = setInterval(function() {
        currentScore++;
        
        if (currentScore > targetScore) {
            currentScore = targetScore;
            clearInterval(interval);
        }
        
        scoreElement.textContent = currentScore;
    }, Math.max(50, 500 / targetScore));
}

/**
 * Open WhatsApp with pre-filled message
 */
function openWhatsApp() {
    const score = sessionStorage.getItem("quizScore") || 0;
    const total = sessionStorage.getItem("totalQuestions") || 15;
    const name = sessionStorage.getItem("studentName") || "Student";
    
    const message = encodeURIComponent(
        `Hi, I completed the IT Skill Challenge and scored ${score}/${total}. I would like to receive my personalized learning roadmap.`
    );
    
    // Replace with your actual WhatsApp number
    const phoneNumber = " 063795 03037"; // India format without +
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

/**
 * Share result on social media
 */
function shareResult(platform) {
    const score = sessionStorage.getItem("quizScore") || 0;
    const total = sessionStorage.getItem("totalQuestions") || 15;
    const text = `I scored ${score}/${total} on the G Tech Raan IT Skill Challenge! Can you beat my score? 🚀`;
    const url = window.location.origin;
    
    let shareUrl = "";
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, "_blank");
}


/* ============================================ */
// UTILITY FUNCTIONS - USED ACROSS ALL PAGES
/* ============================================ */

/**
 * Check if user is on mobile device
 */
function isMobileDevice() {
    return window.innerWidth <= 768;
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Format time in MM:SS
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


/* ============================================ */
// ERROR HANDLING - GLOBAL
/* ============================================ */

// Handle uncaught errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global error:", { message, source, lineno, colno, error });
    // You can send errors to a logging service here
};

// Handle unhandled promise rejections
window.onunhandledrejection = function(event) {
    console.error("Unhandled rejection:", event.reason);
};

/**
 * Show a toast notification
 */
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
