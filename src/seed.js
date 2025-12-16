const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const demoQuizzes = [
  {
    title: 'JavaScript Basics - Demo',
    description: 'Test your knowledge of JavaScript fundamentals',
    category: 'JavaScript',
    difficulty: 'Easy',
    isDemo: true,
    questions: [
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var x = 5;", "variable x = 5;", "v x = 5;", "let x: 5;"],
        correctAnswer: 0,
        explanation: "In JavaScript, you can declare variables using var, let, or const. 'var x = 5;' is the correct syntax.",
        difficulty: "Easy",
        category: "JavaScript",
        points: 100
      },
      {
        question: "Which method adds a new element to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: 0,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length.",
        difficulty: "Easy",
        category: "JavaScript",
        points: 100
      },
      {
        question: "What does 'DOM' stand for in web development?",
        options: ["Document Object Model", "Data Object Management", "Digital Output Method", "Document Order Model"],
        correctAnswer: 0,
        explanation: "DOM stands for Document Object Model, which represents the structure of HTML/XML documents.",
        difficulty: "Easy",
        category: "JavaScript",
        points: 100
      }
    ]
  },
  {
    title: 'React Fundamentals - Demo',
    description: 'Learn React concepts through interactive quizzes',
    category: 'React',
    difficulty: 'Medium',
    isDemo: true,
    questions: [
      {
        question: "What is the purpose of React's useState hook?",
        options: [
          "To manage state in functional components",
          "To create class components",
          "To handle side effects",
          "To manage routing"
        ],
        correctAnswer: 0,
        explanation: "useState is a React Hook that lets you add state variables to functional components.",
        difficulty: "Medium",
        category: "React",
        points: 150
      },
      {
        question: "Which lifecycle method is called after a component renders?",
        options: [
          "componentDidMount",
          "componentWillMount",
          "componentDidUpdate",
          "shouldComponentUpdate"
        ],
        correctAnswer: 0,
        explanation: "componentDidMount is invoked immediately after a component is mounted (inserted into the tree).",
        difficulty: "Medium",
        category: "React",
        points: 150
      },
      {
        question: "What is JSX in React?",
        options: [
          "JavaScript XML syntax extension",
          "A JavaScript framework",
          "A styling language",
          "A database query language"
        ],
        correctAnswer: 0,
        explanation: "JSX is a syntax extension for JavaScript that looks similar to HTML, used with React.",
        difficulty: "Medium",
        category: "React",
        points: 150
      }
    ]
  },
  {
    title: 'Web Development - Demo',
    description: 'HTML, CSS, and general web concepts',
    category: 'Web Development',
    difficulty: 'Easy',
    isDemo: true,
    questions: [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Creative Style System",
          "Colorful Style Sheets"
        ],
        correctAnswer: 0,
        explanation: "CSS stands for Cascading Style Sheets, used for describing the presentation of web pages.",
        difficulty: "Easy",
        category: "Web Development",
        points: 100
      },
      {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h1>", "<h6>", "<heading>", "<head>"],
        correctAnswer: 0,
        explanation: "<h1> is used for the main heading, while <h2> to <h6> are used for subheadings.",
        difficulty: "Easy",
        category: "Web Development",
        points: 100
      },
      {
        question: "What is the box model in CSS?",
        options: [
          "Content, padding, border, margin",
          "Header, body, footer, sidebar",
          "Width, height, depth, volume",
          "Top, right, bottom, left"
        ],
        correctAnswer: 0,
        explanation: "The CSS box model describes the rectangular boxes generated for elements with content, padding, border, and margin.",
        difficulty: "Easy",
        category: "Web Development",
        points: 100
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizzylearn');
    console.log('✅ Connected to MongoDB');

    // Clear existing demo quizzes
    await Quiz.deleteMany({ isDemo: true });
    console.log('🗑️  Cleared existing demo quizzes');

    // Insert demo quizzes
    await Quiz.insertMany(demoQuizzes);
    console.log('🌱 Demo quizzes seeded successfully');

    // List the seeded quizzes
    const quizzes = await Quiz.find({ isDemo: true });
    console.log(`📚 Seeded ${quizzes.length} demo quizzes:`);
    quizzes.forEach(quiz => {
      console.log(`   - ${quiz.title} (${quiz.questions.length} questions)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();