/* ==========================================
   Dinner by Destiny v1.0
   questions.js
   Final Version
========================================== */

const questions = [

{
    id: 1,

    narrator: "Every journey begins with a single choice...",

    question: "Imagine tonight is completely yours. No plans. No expectations. Which path do you naturally follow?",

    options: [

        {
            text: "🌊 A glowing waterfront you've never explored before.",
            traits: {
                adventure: 2,
                wonder: 2,
                curiosity: 1
            }
        },

        {
            text: "🕯️ An elegant place where every detail feels thoughtfully crafted.",
            traits: {
                elegance: 2,
                romance: 1,
                wonder: 1
            }
        },

        {
            text: "❤️ A cozy corner where the conversation matters more than anything else.",
            traits: {
                comfort: 2,
                connection: 2,
                romance: 1
            }
        }

    ]

},

{
    id: 2,

    narrator: "Interesting... Destiny is beginning to understand you.",

    question: "A mysterious envelope appears in front of you.\n\nIt says:\n\n'Open only when you're happy.'\n\nWhat do you do?",

    options: [

        {
            text: "📨 I can't resist. I open it immediately.",
            traits: {
                curiosity: 2,
                adventure: 1,
                playfulness: 2
            }
        },

        {
            text: "✨ I wait for the perfect moment.",
            traits: {
                elegance: 2,
                patience: 2,
                romance: 1
            }
        },

        {
            text: "🤍 I save it to open with someone I love.",
            traits: {
                connection: 2,
                comfort: 2,
                romance: 2
            }
        }

    ]

},

{
    id: 3,

    narrator: "Every answer tells me a little more about you...",

    question: "If tonight became one unforgettable memory, what would make it truly special?",

    options: [

        {
            text: "🌠 Discovering something completely unexpected.",
            traits: {
                adventure: 2,
                curiosity: 2,
                wonder: 2
            }
        },

        {
            text: "🎼 Feeling like I stepped into a movie.",
            traits: {
                elegance: 2,
                romance: 2,
                wonder: 1
            }
        },

        {
            text: "😂 Laughing so much that I lose track of time.",
            traits: {
                comfort: 2,
                connection: 2,
                playfulness: 2
            }
        }

    ]

},

{
    id: 4,

    narrator: "Some choices reveal more than we realize...",

    question: "As the evening unfolds, a gentle drizzle begins to fall. What's your first instinct?",

    options: [

        {
            text: "🌧️ Keep walking. Rain only makes the adventure better.",
            traits: {
                adventure: 2,
                playfulness: 2,
                wonder: 1
            }
        },

        {
            text: "☂️ Find a beautiful place to enjoy the rain from under shelter.",
            traits: {
                elegance: 2,
                patience: 1,
                romance: 2
            }
        },

        {
            text: "❤️ Laugh and share the moment with the person beside me.",
            traits: {
                comfort: 2,
                connection: 2,
                playfulness: 1
            }
        }

    ]

},
{
    id: 5,

    narrator: "The smallest moments often become the biggest memories...",

    question: "Soft music drifts through the air. Without thinking too much, what do you do?",

    options: [

        {
            text: "🎵 Follow the music and discover where it leads.",
            traits: {
                curiosity: 2,
                adventure: 1,
                wonder: 2
            }
        },

        {
            text: "✨ Pause for a moment and simply take in the atmosphere.",
            traits: {
                elegance: 2,
                romance: 2,
                wonder: 1
            }
        },

        {
            text: "💙 Smile at the person beside me because the moment already feels complete.",
            traits: {
                connection: 2,
                comfort: 2,
                romance: 1
            }
        }

    ]

},

{
    id: 6,

    narrator: "Every unforgettable evening hides at least one surprise...",

    question: "You discover a beautifully wrapped gift with no name attached. What do you secretly hope is inside?",

    options: [

        {
            text: "🗺️ Something that leads to another adventure.",
            traits: {
                adventure: 2,
                curiosity: 2,
                wonder: 1
            }
        },

        {
            text: "✨ Something elegant that I could treasure forever.",
            traits: {
                elegance: 2,
                romance: 2,
                patience: 1
            }
        },

        {
            text: "💌 A heartfelt handwritten letter.",
            traits: {
                connection: 2,
                comfort: 2,
                romance: 2
            }
        }

    ]

},

{
    id: 7,

    narrator: "The night grows brighter with every step...",

    question: "The city sparkles with lights. Which place naturally catches your attention?",

    options: [

        {
            text: "🌊 A glowing waterfront filled with reflections and mystery.",
            traits: {
                adventure: 2,
                wonder: 2,
                curiosity: 1
            }
        },

        {
            text: "🏛️ A breathtaking place where every detail feels beautifully designed.",
            traits: {
                elegance: 2,
                romance: 2,
                wonder: 1
            }
        },

        {
            text: "☕ A cozy place filled with warmth, laughter and conversation.",
            traits: {
                comfort: 2,
                connection: 2,
                playfulness: 1
            }
        }

    ]

},

{
    id: 8,

    narrator: "Sometimes the universe gives us only a single moment...",

    question: "A shooting star suddenly streaks across the sky. Before it disappears, what do you silently wish for?",

    options: [

        {
            text: "🌠 More adventures that I'll remember forever.",
            traits: {
                adventure: 2,
                wonder: 2,
                curiosity: 1
            }
        },

        {
            text: "✨ Moments so beautiful that they feel almost unreal.",
            traits: {
                elegance: 2,
                romance: 2,
                wonder: 2
            }
        },

        {
            text: "❤️ More time with the people who matter most.",
            traits: {
                comfort: 2,
                connection: 2,
                romance: 1
            }
        }

    ]

},
{
    id: 9,

    narrator: "I've noticed something about you...",

    question: "Years from now, when you look back on a perfect evening, what do you think you'll remember first?",

    options: [

        {
            text: "🌍 The unexpected adventure that made the night unlike any other.",
            traits: {
                adventure: 2,
                curiosity: 2,
                wonder: 1
            }
        },

        {
            text: "🎭 The beauty of every little detail that made it feel magical.",
            traits: {
                elegance: 2,
                romance: 2,
                patience: 1
            }
        },

        {
            text: "💙 The conversations and the people who shared them with me.",
            traits: {
                comfort: 2,
                connection: 2,
                romance: 1
            }
        }

    ]

},

{
    id: 10,

    narrator: "I've almost found the perfect evening for you...",

    question: "Before I decide, tell me one last thing. What gives a moment its greatest value?",

    options: [

        {
            text: "🌊 Discovering something I've never experienced before.",
            traits: {
                adventure: 2,
                curiosity: 2,
                wonder: 2
            }
        },

        {
            text: "✨ Feeling like, for a little while, the world became beautifully magical.",
            traits: {
                elegance: 2,
                romance: 2,
                wonder: 2
            }
        },

        {
            text: "❤️ Sharing it with someone who makes ordinary moments unforgettable.",
            traits: {
                connection: 2,
                comfort: 2,
                romance: 2
            }
        }

    ]

},

{
    id: 11,

    narrator: "I know enough now...",

    question: "One final answer... If tonight could leave you with just one feeling, which would you choose?",

    options: [

        {
            text: "🌌 'I can't believe I experienced something so unique.'",
            traits: {
                adventure: 3,
                curiosity: 2,
                wonder: 2
            }
        },

        {
            text: "✨ 'For a few hours, it felt like I was living inside a dream.'",
            traits: {
                elegance: 3,
                romance: 2,
                wonder: 2
            }
        },

        {
            text: "💙 'I spent precious time with someone who means the world to me.'",
            traits: {
                connection: 3,
                comfort: 2,
                romance: 2
            }
        }

    ]

}

];