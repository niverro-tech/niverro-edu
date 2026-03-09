// Premium Chatbot Logic with Smart Knowledge Engine
const chatbotHTML = `
<div id="chatbot-container">
    <button id="chatbot-toggle">
        <span class="material-symbols-outlined">smart_toy</span>
    </button>
    <div id="chatbot-window">
        <div id="chatbot-header">
            <div class="bg-white/20 p-2 rounded-lg">
                <span class="material-symbols-outlined">school</span>
            </div>
            <div id="chatbot-header-info">
                <h3>Bright Future Assistant</h3>
                <p>Online | Responsive 24/7</p>
            </div>
        </div>
        <div id="chatbot-messages">
            <div class="message bot">
                👋 Hello! I'm your Bright Future Assistant. I can help you with info about:
                <br>• Courses & Programs
                <br>• Fees & Pricing
                <br>• Batch Timings
                <br>• Admissions
                <br>How can I help you today?
            </div>
        </div>
        <div id="chatbot-input-container">
            <input type="text" id="chatbot-input" placeholder="Type your message here...">
            <button id="chatbot-send">
                <span class="material-symbols-outlined">send</span>
            </button>
        </div>
    </div>
</div>
`;

// Knowledge Base Dictionary
const knowledgeBase = [
    {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'sup'],
        response: "Hello there! How can I help you regarding Bright Future Education Centre today?"
    },
    {
        keywords: ['course', 'courses', 'program', 'programs', 'learn', 'teach', 'subject', 'subjects'],
        response: "We offer three main programs: <br>1. <b>Basic Computer Course</b> (3 months)<br>2. <b>Tally with GST</b> (4 months)<br>3. <b>Academic Coaching</b> (All Levels). <br><br>Which one would you like to know more about?"
    },
    {
        keywords: ['basic', 'computer course', 'ms office', 'word', 'excel'],
        response: "Our <b>Basic Computer Course</b> is a 3-month program perfect for beginners. It covers Windows OS, MS Office (Word, Excel, PowerPoint), Internet & Email, and touch-typing. It's designed to make you office-ready!"
    },
    {
        keywords: ['tally', 'gst', 'accounting', 'commerce'],
        response: "Our <b>Tally with GST</b> course is a 4-month program. You'll learn computerized accounting using TallyPrime, inventory management, payroll, and end-to-end GST filing. Ideal for commerce students and accounting professionals."
    },
    {
        keywords: ['academic', 'coaching', 'tuition', 'school', 'math', 'science', 'english'],
        response: "Our <b>Academic Coaching</b> program offers personalized tuition for KSEEB and CBSE students. We cover Math, Science, and English with weekly assessments and experienced tutors."
    },
    {
        keywords: ['fee', 'fees', 'cost', 'price', 'pricing', 'charge', 'amount', 'pay', 'money'],
        response: "Our courses are designed to be highly affordable. The fees vary slightly depending on the exact program and duration. Generally, they range from ₹3,000 to ₹12,000. It's best to call us at <b>+91 98765 43210</b> or submit an inquiry on the Contact page for exact pricing!"
    },
    {
        keywords: ['time', 'timing', 'timings', 'batch', 'batches', 'schedule', 'when', 'morning', 'evening'],
        response: "We offer flexible batch timings to suit everyone! <br>• <b>Morning:</b> 8 AM – 11 AM <br>• <b>Afternoon:</b> 12 PM – 3 PM <br>• <b>Evening:</b> 4 PM – 7 PM <br><br>Let us know what works best for you!"
    },
    {
        keywords: ['admission', 'admissions', 'enroll', 'enrollment', 'join', 'apply', 'register'],
        response: "Admissions for 2026 are <b>open now</b>! You can easily apply by going to our <a href='admissions.html' style='color:#1d4ed8; text-decoration:underline;'>Admissions Page</a> and filling out the quick enrollment form. Our counselor will call you within 24 hours."
    },
    {
        keywords: ['address', 'location', 'where', 'place', 'visit', 'map', 'directions'],
        response: "We are proudly located at <b>123 Knowledge Lane, Hubli, Karnataka – 580020</b>. Come visit us anytime between Monday and Saturday (9 AM - 7 PM) for a free counseling session!"
    },
    {
        keywords: ['phone', 'call', 'contact', 'whatsapp', 'number', 'reach'],
        response: "You can reach us easily! <br>📞 Call/WhatsApp: <b>+91 98765 43210</b><br>✉️ Email: <b>info@brightfuture.edu</b>"
    },
    {
        keywords: ['certificate', 'certification', 'certified', 'degree', 'diploma'],
        response: "Yes! All our professional courses (Basic Computer & Tally) come with government-recognized certificates upon completion, which are highly valued by employers."
    },
    {
        keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
        response: "You're very welcome! Let me know if you need anything else. 😊"
    }
];

function initChatbot() {
    // Inject HTML into the body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const toggle = document.getElementById('chatbot-toggle');
    const windowEl = document.getElementById('chatbot-window');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
    let isTyping = false;

    // Toggle Chatbot Window
    toggle.addEventListener('click', () => {
        const isOpen = windowEl.style.display === 'flex';
        windowEl.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) {
            input.focus();
            // Small notification dot removal logic could go here
        }
    });

    // Add Message to Chat
    function addMessage(text, isUser = false) {
        // Remove typing indicator if exists
        const typingInd = document.getElementById('typing-indicator');
        if (typingInd) typingInd.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user' : 'bot'}`;

        // Ensure HTML is parsed for bot messages (links, bold text)
        if (isUser) {
            msgDiv.textContent = text; // Safe for user input
        } else {
            msgDiv.innerHTML = text;   // Allow HTML formatting from knowledge base
        }

        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Show Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span class="typing-dot">.</span><span class="typing-dot">.</span><span class="typing-dot">.</span>';
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Match input against Knowledge Base
    function getBotResponse(userInput) {
        const cleanInput = userInput.toLowerCase().replace(/[^\w\s]/gi, ''); // Remove punctuation
        const words = cleanInput.split(' ');

        let bestMatch = null;
        let highestScore = 0;

        for (const entry of knowledgeBase) {
            let score = 0;
            for (const keyword of entry.keywords) {
                if (words.includes(keyword)) {
                    score += 1;
                } else if (cleanInput.includes(keyword)) {
                    // Partial match for longer phrases like "computer course"
                    score += 0.5;
                }
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry.response;
            }
        }

        // Default Fallback Response
        if (!bestMatch) {
            return "I'm still learning and might not understand everything perfectly yet. For exact details, please <b>call us at +91 98765 43210</b> or submit a message on our <a href='contact.html' style='color:#1d4ed8; text-decoration:underline;'>Contact Page</a>!";
        }

        return bestMatch;
    }

    // Handle Send Action
    function handleSend() {
        const text = input.value.trim();
        if (text && !isTyping) {
            addMessage(text, true);
            input.value = '';
            isTyping = true;

            showTypingIndicator();

            // Artificial delay for "bot thinking" to feel natural (600ms - 1500ms)
            const thinkTime = Math.floor(Math.random() * 900) + 600;

            setTimeout(() => {
                const response = getBotResponse(text);
                addMessage(response);
                isTyping = false;
            }, thinkTime);
        }
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

// Add typing animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  .typing-dot { animation: typing 1.4s infinite ease-in-out both; font-weight: bold; font-size: 1.2rem; }
  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  @keyframes typing { 0%, 80%, 100% { transform: scale(0); opacity: 0; } 40% { transform: scale(1); opacity: 1; } }
`;
document.head.appendChild(style);

// Ensure the function is called after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
