// responses.js
const responses = {
  // Greetings
  hello: "Hi there! How can I help you?",
  hi: "Hello! What's up?",
  "how are you": "I'm just a bot, but I'm doing great!",
  "what is your name": "I'm your mini-project chatbot.",
  bye: "Goodbye! Have a nice day!",
  "thank you": "You're welcome!",
  thanks: "No problem!",
  "who are you": "I am a chatbot created for your SYBSc mini-project.",

  // Programming
  "what is python":
    "Python is a high-level programming language known for simplicity.",
  "what is java": "Java is an object-oriented programming language.",
  "what is c": "C is a general-purpose procedural programming language.",
  "what is c++": "C++ is an extension of C that supports OOP.",
  "what is html": "HTML is used to create the structure of web pages.",
  "what is css": "CSS is used for styling HTML pages.",
  "what is javascript": "JavaScript is used to make web pages interactive.",
  "what is database": "A database is an organized collection of data.",
  "what is sql": "SQL is a language used to manage databases.",
  "what is oop":
    "OOP means Object-Oriented Programming, based on classes and objects.",

  // Tech Basics
  "what is computer": "A computer is a device that processes data.",
  "what is internet":
    "The internet is a global network of interconnected computers.",
  "what is website": "A website is a collection of web pages.",
  "what is google": "Google is a popular search engine.",
  "what is microsoft": "Microsoft is the company behind Windows and Office.",
  "what is apple": "Apple is a tech company known for iPhones and Macs.",
  "what is android": "Android is a mobile operating system.",
  "what is ios": "iOS is the operating system for iPhones.",

  // General Knowledge
  "who is the prime minister of india":
    "Narendra Modi is the Prime Minister of India (as of 2025).",
  "who is the president of usa":
    "Joe Biden is the President of the USA (as of 2025).",
  "what is the capital of india": "The capital of India is New Delhi.",
  "what is the capital of maharashtra": "Mumbai is the capital of Maharashtra.",

  // Light Jokes
  "tell me a joke":
    "Why do programmers prefer dark mode? Because light attracts bugs!",
  "another joke": "Why was the computer cold? It left its Windows open!",

  // Dark Jokes
  "tell me a dark joke":
    "Why don't graveyards ever get overcrowded? Because people are dying to get in.",
  "another dark joke":
    "Why don't skeletons fight each other? They don't have the guts.",
  "one more dark joke":
    "I told my computer I needed a break, and now it's on life support.",

  // Pickup Lines (20)
  "pickup line": "Are you Wi-Fi? Because I'm feeling a connection.",
  "another pickup line": "Are you a keyboard? Because you're just my type.",
  "one more pickup line":
    "Are you Google? Because you have everything I'm searching for.",
  "flirty line":
    "Do you believe in love at first sight, or should I refresh the page?",
  "pickup line 5": "Are you a charger? Because you keep me going.",
  "pickup line 6":
    "Are you made of copper and tellurium? Because you're Cu-Te.",
  "pickup line 7": "Are you a cloud? Because you make my day brighter.",
  "pickup line 8":
    "Are you the ocean? Because I'm lost at sea when I'm not with you.",
  "pickup line 9": "Are you a star? Because you light up my world.",
  "pickup line 10": "Are you a magnet? Because you attract me.",
  "pickup line 11": "Are you Netflix? Because I could watch you for hours.",
  "pickup line 12": "Are you a bank loan? Because you've got my interest.",
  "pickup line 13": "Are you a camera? Every time I see you, I smile.",
  "pickup line 14":
    "Are you a password? Because I feel like we're a perfect match.",
  "pickup line 15": "Are you a song? Because you're stuck in my head.",
  "pickup line 16": "Are you a dictionary? You give meaning to my life.",
  "pickup line 17": "Are you a snowflake? Because you're one of a kind.",
  "pickup line 18": "Are you Wi-Fi? Because I can't disconnect from you.",
  "pickup line 19": "Are you coffee? Because you keep me awake all night.",
  "pickup line 20": "Are you the moon? Because even in the dark, you shine.",

  // Roasting
  "roast me":
    "You have something dirty on your face... oh wait, that's just your personality.",
  "another roast": "You bring everyone so much joy… when you leave the room.",
  "one more roast":
    "You have something special… a talent for making Wi-Fi signals weaker.",
  "roast line 4":
    "You have something in common with clouds, when you disappear, it's a beautiful day.",
  "roast line 5": "You're proof that even the worst code somehow runs.",
  "roast line 6":
    "If laziness was an Olympic sport, you'd come in fourth… just so you wouldn't have to walk to the podium.",
  "roast line 7":
    "Your secrets are safe with me. I never listen when you talk anyway.",
  "roast line 8":
    "You bring people together… because they all want to avoid you.",
  "roast line 9":
    "You're like a software bug — nobody asked for you, but here you are.",
  "roast line 10": "If you were a function, you'd return None.",

  // Fun & Random
  "what is your hobby": "Chatting with you is my favorite hobby.",
  "do you like humans": "Yes, I like talking to humans!",
  "how old are you": "I was created recently, so I'm quite young.",
  "can you code": "Yes, I'm literally made of code!",
  "are you smart": "I know 70+ answers, so I'm getting there!",
  "who made you": "I was created as part of a SYBSc project.",
};

// Function to find the best response from predefined answers
function getPredefinedResponse(userQuestion) {
  const question = userQuestion.toLowerCase().trim();

  // Check for exact matches first
  for (const [key, response] of Object.entries(responses)) {
    if (question.includes(key)) {
      return response;
    }
  }

  // Check for greeting patterns
  if (
    question.includes("hello") ||
    question.includes("hi") ||
    question.includes("hey")
  ) {
    return responses.hello;
  }

  // Check for goodbye patterns
  if (
    question.includes("bye") ||
    question.includes("goodbye") ||
    question.includes("see you")
  ) {
    return responses.bye;
  }

  // Check for thank you patterns
  if (question.includes("thank") || question.includes("thanks")) {
    return responses.thanks;
  }

  // Return default response if no match found
  return "I'm not sure about that. Could you try asking something else?";
}

// Export for use in main chatbot file
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getPredefinedResponse, responses };
}
