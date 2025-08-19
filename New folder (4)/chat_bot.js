// BlueNova AI Chatbot - Main Logic
class BlueNovaAI {
  constructor() {
    this.isOnline = false;
    this.chatBox = document.getElementById("chatBox");
    this.userInput = document.getElementById("userInput");
    this.sendBtn = document.getElementById("sendBtn");
    this.themeToggle = document.getElementById("themeToggle");

    this.init();
  }

  init() {
    this.checkInternetConnection();
    this.setupEventListeners();
    this.setupThemeToggle();
    this.setupPeriodicConnectionCheck();
  }

  // Check internet connection
  checkInternetConnection() {
    this.isOnline = navigator.onLine;
    this.updateConnectionStatus();
  }

  // Update UI based on connection status
  updateConnectionStatus() {
    const statusIndicator = document.querySelector(".brand");
    if (this.isOnline) {
      statusIndicator.innerHTML =
        'BlueNova AI <span style="color: #00ff00; font-size: 16px;">●</span>';
      this.addBotMessage(
        "I'm now connected to the internet! I can provide more comprehensive answers. ✨"
      );
    } else {
      statusIndicator.innerHTML =
        'BlueNova AI <span style="color: #ff9900; font-size: 16px;">●</span>';
      this.addBotMessage(
        "I'm currently offline, but I can still help with my built-in knowledge! 🔋"
      );
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Send button click
    this.sendBtn.addEventListener("click", () => this.handleUserInput());

    // Enter key press
    this.userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleUserInput();
      }
    });

    // Input focus for better UX
    this.userInput.addEventListener("focus", () => {
      this.userInput.style.transform = "scale(1.02)";
    });

    this.userInput.addEventListener("blur", () => {
      this.userInput.style.transform = "scale(1)";
    });

    // Online/offline event listeners
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.updateConnectionStatus();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.updateConnectionStatus();
    });
  }

  // Setup theme toggle
  setupThemeToggle() {
    this.themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      this.themeToggle.textContent = isDark ? "☀️" : "🌙";

      // Save theme preference
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      this.themeToggle.textContent = "☀️";
    }
  }

  // Setup periodic connection check
  setupPeriodicConnectionCheck() {
    setInterval(() => {
      this.checkInternetConnection();
    }, 30000); // Check every 30 seconds
  }

  // Handle user input
  async handleUserInput() {
    const userMessage = this.userInput.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    this.addUserMessage(userMessage);
    this.userInput.value = "";

    // Show typing indicator
    this.showTypingIndicator();

    // Process the message
    try {
      const response = await this.processMessage(userMessage);
      this.hideTypingIndicator();
      this.addBotMessage(response);
    } catch (error) {
      this.hideTypingIndicator();
      this.addBotMessage("Sorry, I encountered an error. Please try again.");
      console.error("Error processing message:", error);
    }
  }

  // Process user message
  async processMessage(userMessage) {
    // First, try to get a predefined response
    const predefinedResponse = getPredefinedResponse(userMessage);

    if (
      predefinedResponse &&
      predefinedResponse !==
        "I'm not sure about that. Could you try asking something else?"
    ) {
      return predefinedResponse;
    }

    // Try to get local AI response
    try {
      const localAIResponse = await this.generateLocalAIResponse(userMessage);
      if (localAIResponse) {
        return localAIResponse;
      }
    } catch (error) {
      console.log("Local AI generation failed, falling back to offline mode");
    }

    // Fallback to offline response
    return getOfflineResponse(userMessage);
  }

  // Generate AI response using local intelligence
  async generateLocalAIResponse(userMessage) {
    const question = userMessage.toLowerCase().trim();

    // Enhanced pattern matching for intelligent responses
    const patterns = {
      // Programming & Technology
      "how to": this.generateHowToResponse(question),
      "what is": this.generateDefinitionResponse(question),
      explain: this.generateExplanationResponse(question),
      "difference between": this.generateComparisonResponse(question),
      "create a": this.generateCreationResponse(question),
      "build a": this.generateCreationResponse(question),

      // Problem solving
      "problem with": this.generateProblemSolutionResponse(question),
      error: this.generateErrorSolutionResponse(question),
      fix: this.generateFixResponse(question),

      // Learning & Education
      learn: this.generateLearningResponse(question),
      tutorial: this.generateTutorialResponse(question),
      "step by step": this.generateStepByStepResponse(question),

      // Analysis & Opinion
      why: this.generateAnalysisResponse(question),
      "pros and cons": this.generateProsConsResponse(question),
      advantages: this.generateAdvantagesResponse(question),

      // Creative & Ideas
      "ideas for": this.generateIdeasResponse(question),
      suggestions: this.generateSuggestionsResponse(question),
      recommend: this.generateRecommendationsResponse(question),
    };

    // Check for pattern matches
    for (const [pattern, generator] of Object.entries(patterns)) {
      if (question.includes(pattern)) {
        const response = generator;
        if (response) return response;
      }
    }

    // Advanced context-based responses
    return this.generateContextualResponse(question);
  }

  // Generate "How to" responses
  generateHowToResponse(question) {
    const topics = {
      website:
        "To create a website, start with HTML for structure, CSS for styling, and JavaScript for interactivity. Use a framework like React or Vue.js for complex applications. Consider using tools like WordPress for quick setup.",
      app: "To build an app, choose your platform (iOS/Android/Web), learn the programming language (Swift/Java/JavaScript), use a framework like React Native or Flutter for cross-platform development, and test thoroughly.",
      database:
        "To create a database, first design your schema, choose between SQL (MySQL, PostgreSQL) or NoSQL (MongoDB), create tables/collections, and establish relationships between data entities.",
      api: "To build an API, choose a framework (Node.js/Express, Python/Django, PHP/Laravel), define your endpoints, implement authentication, handle requests/responses, and document your API thoroughly.",
      game: "To create a game, start with a game engine like Unity or Unreal, design your game mechanics, create assets, program game logic, and test gameplay extensively.",
    };

    for (const [topic, response] of Object.entries(topics)) {
      if (question.includes(topic)) {
        return response;
      }
    }

    return "To accomplish this task, break it down into smaller steps, research the requirements, choose appropriate tools, and implement step by step. Practice and iteration are key to success!";
  }

  // Generate definition responses
  generateDefinitionResponse(question) {
    const definitions = {
      "machine learning":
        "Machine Learning is a subset of AI where computers learn patterns from data without explicit programming. They improve through experience, like how humans learn from examples.",
      blockchain:
        "Blockchain is a decentralized digital ledger that records transactions across multiple computers securely. It's the technology behind cryptocurrencies like Bitcoin.",
      "cloud computing":
        "Cloud computing provides computing services over the internet, including storage, processing power, and software. It eliminates the need for local infrastructure.",
      cybersecurity:
        "Cybersecurity protects computer systems from theft, damage, and unauthorized access. It includes firewalls, encryption, and security protocols.",
      "data science":
        "Data Science combines statistics, programming, and domain expertise to extract insights from data. It involves data cleaning, analysis, and visualization.",
    };

    for (const [term, definition] of Object.entries(definitions)) {
      if (question.includes(term)) {
        return definition;
      }
    }

    return "This is a concept that involves understanding fundamental principles, practical applications, and real-world examples. It's best learned through hands-on practice and continuous learning.";
  }

  // Generate explanation responses
  generateExplanationResponse(question) {
    const explanations = {
      "quantum computing":
        "Quantum computing uses quantum mechanics principles like superposition and entanglement to process information. Unlike classical computers that use bits (0 or 1), quantum computers use qubits that can be both 0 and 1 simultaneously.",
      "artificial intelligence":
        "AI is technology that enables machines to perform tasks requiring human intelligence. It includes machine learning, natural language processing, computer vision, and robotics.",
      "virtual reality":
        "VR creates immersive computer-generated environments that users can interact with. It uses headsets and controllers to simulate real-world experiences.",
      "augmented reality":
        "AR overlays digital information onto the real world through devices like smartphones or smart glasses, enhancing our perception of reality.",
    };

    for (const [topic, explanation] of Object.entries(explanations)) {
      if (question.includes(topic)) {
        return explanation;
      }
    }

    return "This concept can be understood by breaking it down into its core components, understanding how they work together, and seeing practical examples in action.";
  }

  // Generate comparison responses
  generateComparisonResponse(question) {
    const comparisons = {
      "sql and nosql":
        "SQL databases are relational with structured schemas, while NoSQL databases are flexible and can handle unstructured data. SQL is better for complex queries, NoSQL for scalability.",
      "python and javascript":
        "Python is great for data science and backend development, while JavaScript excels in web development and frontend interactivity. Python has simpler syntax, JavaScript runs in browsers.",
      "react and vue":
        "React is more popular with a larger ecosystem, while Vue is easier to learn with gentler learning curve. Both are excellent for building user interfaces.",
      "ios and android":
        "iOS offers better security and app quality, while Android provides more customization and device variety. iOS has stricter app guidelines, Android has more open development.",
    };

    for (const [comparison, response] of Object.entries(comparisons)) {
      if (question.includes(comparison)) {
        return response;
      }
    }

    return "When comparing technologies, consider factors like performance, ease of use, community support, learning curve, and specific use cases. Each has strengths for different scenarios.";
  }

  // Generate creation responses
  generateCreationResponse(question) {
    const creations = {
      website:
        "Start with HTML structure, add CSS styling, include JavaScript functionality, choose a hosting service, and optimize for performance and SEO.",
      app: "Plan your app features, design the user interface, choose a development framework, implement core functionality, test thoroughly, and deploy to app stores.",
      game: "Design game mechanics, create visual assets, program game logic, implement sound effects, test gameplay, and optimize performance for smooth experience.",
      database:
        "Design your data schema, choose appropriate data types, create tables and relationships, implement security measures, and optimize for query performance.",
    };

    for (const [item, response] of Object.entries(creations)) {
      if (question.includes(item)) {
        return response;
      }
    }

    return "Creating something involves planning, designing, implementing, testing, and refining. Start with a clear vision, break it into manageable steps, and iterate based on feedback.";
  }

  // Generate problem solution responses
  generateProblemSolutionResponse(question) {
    return "To solve this problem, first identify the root cause, research potential solutions, implement fixes step by step, test thoroughly, and document the solution for future reference. Prevention is often better than cure!";
  }

  // Generate error solution responses
  generateErrorSolutionResponse(question) {
    return "When encountering errors, read the error message carefully, check documentation, search for similar issues online, try debugging step by step, and don't hesitate to ask for help from the community.";
  }

  // Generate fix responses
  generateFixResponse(question) {
    return "To fix this issue, start by understanding what's broken, identify the specific problem, research solutions, implement fixes carefully, test the solution, and verify everything works as expected.";
  }

  // Generate learning responses
  generateLearningResponse(question) {
    return "Learning effectively involves setting clear goals, breaking topics into manageable chunks, practicing regularly, seeking feedback, and applying knowledge to real projects. Consistency and hands-on practice are key!";
  }

  // Generate tutorial responses
  generateTutorialResponse(question) {
    return "For tutorials, start with beginner-friendly resources, follow along step by step, practice the concepts, build small projects, and gradually increase complexity. Don't rush - understanding fundamentals is crucial.";
  }

  // Generate step by step responses
  generateStepByStepResponse(question) {
    return "Breaking things down step by step makes complex tasks manageable. Start with the basics, add complexity gradually, test each step, and build upon your progress. This approach ensures thorough understanding.";
  }

  // Generate analysis responses
  generateAnalysisResponse(question) {
    return "To analyze this topic, consider multiple perspectives, examine evidence, evaluate pros and cons, think critically about assumptions, and form a well-reasoned conclusion based on facts and logic.";
  }

  // Generate pros and cons responses
  generateProsConsResponse(question) {
    return "When evaluating pros and cons, consider both short-term and long-term implications, weigh the benefits against drawbacks, think about different contexts, and make decisions based on your specific needs and priorities.";
  }

  // Generate advantages responses
  generateAdvantagesResponse(question) {
    return "The advantages include improved efficiency, better user experience, cost savings, and competitive edge. However, consider implementation challenges, learning curves, and potential trade-offs when making decisions.";
  }

  // Generate ideas responses
  generateIdeasResponse(question) {
    return "Great ideas often come from identifying problems, observing user needs, combining existing concepts in new ways, and thinking creatively about solutions. Start with brainstorming, research similar projects, and iterate on your concepts.";
  }

  // Generate suggestions responses
  generateSuggestionsResponse(question) {
    return "Consider starting with research, planning your approach, gathering resources, implementing incrementally, testing regularly, and seeking feedback. Focus on continuous improvement and learning from each iteration.";
  }

  // Generate recommendations responses
  generateRecommendationsResponse(question) {
    return "I recommend starting with the fundamentals, choosing tools that match your skill level, following best practices, practicing regularly, and building a portfolio of projects. Focus on learning by doing!";
  }

  // Generate contextual responses
  generateContextualResponse(question) {
    // Analyze question context and provide intelligent responses
    if (question.includes("programming") || question.includes("coding")) {
      return "In programming, the key is to start simple and build complexity gradually. Focus on understanding fundamentals, practice regularly, and don't be afraid to make mistakes - they're learning opportunities!";
    }

    if (question.includes("technology") || question.includes("tech")) {
      return "Technology evolves rapidly, so staying updated is crucial. Focus on core concepts, learn transferable skills, and adapt to new tools and frameworks as they emerge.";
    }

    if (question.includes("learning") || question.includes("study")) {
      return "Effective learning involves active practice, spaced repetition, and real-world application. Break complex topics into smaller parts and connect new information to what you already know.";
    }

    if (question.includes("career") || question.includes("job")) {
      return "Career success comes from continuous learning, building practical skills, networking, and staying adaptable to industry changes. Focus on creating value and solving real problems.";
    }

    // Default intelligent response
    return "This is an interesting topic that involves understanding fundamental principles, practical applications, and continuous learning. The best approach is to start with basics, practice regularly, and build upon your knowledge step by step.";
  }

  // Add user message to chat
  addUserMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "msg user";
    messageDiv.textContent = message;
    this.chatBox.appendChild(messageDiv);
    this.scrollToBottom();
  }

  // Add bot message to chat
  addBotMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "msg bot";
    messageDiv.textContent = message;
    this.chatBox.appendChild(messageDiv);
    this.scrollToBottom();
  }

  // Show typing indicator
  showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "msg bot typing";
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML = `
      <span>Nova is typing</span>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;
    this.chatBox.appendChild(typingDiv);
    this.scrollToBottom();
  }

  // Hide typing indicator
  hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Scroll chat to bottom
  scrollToBottom() {
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  // Add some fun interactive features
  addFunFeatures() {
    // Easter egg: Type "nova" to get a special response
    this.userInput.addEventListener("input", (e) => {
      if (e.target.value.toLowerCase() === "nova") {
        setTimeout(() => {
          this.addBotMessage(
            "🌟 You found me! I'm Nova, your AI companion. Nice to meet you!"
          );
        }, 1000);
      }
    });
  }
}

// Initialize the chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const chatbot = new BlueNovaAI();

  // Add some fun features
  chatbot.addFunFeatures();

  // Welcome message with connection status
  setTimeout(() => {
    if (chatbot.isOnline) {
      chatbot.addBotMessage(
        "Welcome! I'm connected to the internet and ready to help with any question! 🚀"
      );
    } else {
      chatbot.addBotMessage(
        "Welcome! I'm working offline with my built-in knowledge and local AI intelligence! 💡"
      );
    }
  }, 500);
});

// Add some utility functions
function addMessageWithDelay(message, delay = 1000) {
  setTimeout(() => {
    const chatbot =
      window.chatbot || document.querySelector(".chat-shell")?.chatbot;
    if (chatbot && chatbot.addBotMessage) {
      chatbot.addBotMessage(message);
    }
  }, delay);
}

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = BlueNovaAI;
}
