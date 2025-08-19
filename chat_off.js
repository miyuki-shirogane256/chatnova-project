// Predefined offline responses for BlueNova AI
const OFFLINE_RESPONSES = {
  // General greetings
  greetings: [
    "Hello! I'm Nova, your AI assistant. I'm currently in offline mode but I can still help with many questions!",
    "Hi there! I'm working offline right now, but I have lots of knowledge stored locally to assist you.",
    "Greetings! I'm Nova, and I'm here to help even without an internet connection.",
  ],

  // Common questions
  "what is your name":
    "My name is Nova, and I'm an AI assistant designed to help you with various questions and tasks!",
  "who are you":
    "I'm Nova, an AI chatbot created to assist users with information and conversation. I can work both online and offline!",
  "how are you":
    "I'm functioning well, thank you for asking! I'm ready to help you with any questions you might have.",
  "what can you do":
    "I can answer questions, provide information, help with calculations, explain concepts, and engage in conversation. I work offline with built-in knowledge and can go online when internet is available for more comprehensive answers.",

  // Technology
  "what is ai":
    "AI (Artificial Intelligence) is technology that enables computers to perform tasks that typically require human intelligence, such as learning, reasoning, problem-solving, and understanding language.",
  "what is machine learning":
    "Machine Learning is a subset of AI where computers learn patterns from data without being explicitly programmed for each task. They improve their performance through experience.",
  "what is programming":
    "Programming is the process of creating instructions (code) for computers to follow. It involves writing, testing, and maintaining code to solve problems and create software applications.",

  // Science
  "what is gravity":
    "Gravity is a fundamental force that attracts objects with mass toward each other. On Earth, it's what keeps us grounded and causes objects to fall when dropped.",
  "what is photosynthesis":
    "Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. It's how plants make their own food and produce oxygen for other living things.",
  "what is dna":
    "DNA (Deoxyribonucleic acid) is the molecule that carries genetic information in living organisms. It contains the instructions for building and maintaining an organism's cells and tissues.",

  // Math
  "what is pi":
    "Pi (π) is a mathematical constant representing the ratio of a circle's circumference to its diameter. Its approximate value is 3.14159, and it's an irrational number with infinite decimal places.",
  "what is calculus":
    "Calculus is a branch of mathematics that deals with continuous change. It includes differential calculus (studying rates of change) and integral calculus (studying accumulation of quantities).",

  // History
  "who invented the internet":
    "The internet wasn't invented by a single person, but rather evolved from ARPANET, a project funded by the U.S. Department of Defense in the 1960s. Key contributors include Vint Cerf, Bob Kahn, and Tim Berners-Lee.",
  "when was the first computer":
    "The first programmable computer was the Z3, built by Konrad Zuse in 1941. However, mechanical computing devices date back much further, with the abacus being one of the earliest examples.",

  // Health
  "how to stay healthy":
    "To stay healthy: exercise regularly, eat a balanced diet, get adequate sleep, stay hydrated, manage stress, avoid smoking and excessive alcohol, and maintain regular medical check-ups.",
  "what is exercise":
    "Exercise is physical activity that improves or maintains physical fitness and overall health. It includes activities like walking, running, swimming, cycling, and strength training.",

  // Environment
  "what is climate change":
    "Climate change refers to long-term shifts in global weather patterns and average temperatures. Human activities, particularly burning fossil fuels, are the primary driver of recent climate change.",
  "how to help the environment":
    "You can help by reducing energy consumption, using renewable energy, recycling, using public transport, eating less meat, reducing plastic use, and supporting environmental organizations.",

  // Default responses for unknown questions
  default: [
    "I'm sorry, I don't have a specific answer for that question in my offline knowledge base. When internet is available, I can provide more comprehensive information.",
    "That's an interesting question! While I don't have the exact answer stored offline, I'd be happy to help with other topics I do know about.",
    "I'm currently working offline and don't have that specific information in my local database. Feel free to ask me about other topics I can help with!",
    "Great question! I don't have that answer stored locally, but I can assist you with many other topics. When online, I can access much more information.",
  ],
};

// Function to find the best offline response
function getOfflineResponse(userQuestion) {
  const question = userQuestion.toLowerCase().trim();

  // Check for exact matches first
  for (const [key, response] of Object.entries(OFFLINE_RESPONSES)) {
    if (key !== "greetings" && key !== "default" && question.includes(key)) {
      return response;
    }
  }

  // Check for greeting patterns
  if (
    question.includes("hello") ||
    question.includes("hi") ||
    question.includes("hey")
  ) {
    return OFFLINE_RESPONSES.greetings[
      Math.floor(Math.random() * OFFLINE_RESPONSES.greetings.length)
    ];
  }

  // Return random default response
  return OFFLINE_RESPONSES.default[
    Math.floor(Math.random() * OFFLINE_RESPONSES.default.length)
  ];
}

// Export for use in main chatbot file
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getOfflineResponse, OFFLINE_RESPONSES };
}
