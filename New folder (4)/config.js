// Configuration file for BlueNova AI Chatbot
// Replace the placeholder values with your actual API keys

const CONFIG = {
  // Local AI Configuration (No API Keys Needed!)
  LOCAL_AI: {
    ENABLED: true,
    INTELLIGENCE_LEVEL: "advanced", // basic, intermediate, advanced
    RESPONSE_STYLE: "helpful", // helpful, creative, technical, friendly
    MAX_RESPONSE_LENGTH: 300,
  },

  // Chatbot Settings
  CHATBOT: {
    NAME: "Nova",
    PERSONALITY:
      "You are Nova, a helpful and friendly AI assistant with local intelligence. Keep responses concise, friendly, and informative.",
    TYPING_DELAY: 1000, // milliseconds
    MAX_RESPONSE_LENGTH: 300,
    FEATURES: {
      PATTERN_MATCHING: true,
      CONTEXT_ANALYSIS: true,
      SMART_FALLBACKS: true,
      CREATIVE_RESPONSES: true,
    },
  },

  // Intelligence Settings
  INTELLIGENCE: {
    PROGRAMMING_KNOWLEDGE: true,
    TECHNOLOGY_INSIGHTS: true,
    PROBLEM_SOLVING: true,
    LEARNING_GUIDANCE: true,
    CAREER_ADVICE: true,
    CREATIVE_THINKING: true,
  },

  // Fallback Settings
  FALLBACK: {
    USE_OFFLINE_RESPONSES: true,
    USE_PREDEFINED_RESPONSES: true,
    USE_LOCAL_AI: true,
    SHOW_ERRORS: false,
  },
};

// Function to check if local AI is enabled
function isLocalAIEnabled() {
  return CONFIG.LOCAL_AI.ENABLED === true;
}

// Function to get intelligence level
function getIntelligenceLevel() {
  return CONFIG.LOCAL_AI.INTELLIGENCE_LEVEL || "advanced";
}

// Function to get response style
function getResponseStyle() {
  return CONFIG.LOCAL_AI.RESPONSE_STYLE || "helpful";
}

// Function to check if feature is enabled
function isFeatureEnabled(feature) {
  return CONFIG.CHATBOT.FEATURES[feature] === true;
}

// Function to check if intelligence domain is enabled
function isIntelligenceEnabled(domain) {
  return CONFIG.INTELLIGENCE[domain] === true;
}

// Export for use in main chatbot file
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CONFIG,
    isLocalAIEnabled,
    getIntelligenceLevel,
    getResponseStyle,
    isFeatureEnabled,
    isIntelligenceEnabled,
  };
}
