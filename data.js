/**
 * PORTFOLIO DATA CONFIGURATION
 * Single source of truth for Peehu Solanki's Portfolio
 * Edit this file to easily update texts, links, skills, projects, and experiences.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Peehu Solanki",
    headline: "AI/ML Enthusiast | Full-Stack Developer",
    affiliation: "B.Tech CSE (AI/ML) @ JECRC University, Jaipur",
    batch: "Batch 2026 - 2030",
    introLine: "I build intelligent systems that turn data into useful products.",
    typewriterWords: [
      "Machine Learning Engineer",
      "Deep Learning Explorer",
      "Problem Solver",
      "Full-Stack Developer",
      "Data Science Enthusiast"
    ],
    bio: [
      "First-year AI/ML student at JECRC University, Jaipur, deeply passionate about building practical machine learning models that solve real-world problems.",
      "Constantly exploring generative AI, deep neural networks, and scalable web architectures.",
      "A firm believer in 'learning by building' through hands-on hackathons, research-driven experiments, and open-source contributions."
    ],
    location: "Jaipur, Rajasthan, India",
    email: "peehu.solanki@example.com",
    availableFor: "Open to Internships, Research Collaborations & Hackathons",
    resumeUrl: "#", // Replace with your actual Google Drive or hosted PDF link
    socials: {
      github: "https://github.com/#", // Replace with your GitHub handle
      linkedin: "https://linkedin.com/in/#", // Replace with your LinkedIn profile
      email: "mailto:peehu.solanki@example.com",
      twitter: "https://twitter.com/#"
    }
  },

  stats: [
    { label: "CGPA (JECRC)", value: "9.2", suffix: "/ 10", icon: "academic" },
    { label: "Completed Projects", value: "6", suffix: "+", icon: "code" },
    { label: "Certifications", value: "3", suffix: "", icon: "badge" },
    { label: "Industry Internship", value: "1", suffix: "", icon: "briefcase" }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (AI / ML)",
      institution: "JECRC University, Jaipur",
      period: "2026 – 2030",
      status: "Currently Pursuing (First Year)",
      score: "9.2 / 10 CGPA",
      scoreValue: 9.2,
      scoreMax: 10,
      scoreType: "CGPA",
      highlights: [
        "Specialization in Artificial Intelligence & Machine Learning",
        "Active member of AI/ML Student Research Club & Coding Society",
        "Key Coursework: Data Structures, Algorithms, Linear Algebra, Python for Data Science"
      ]
    },
    {
      degree: "Senior Secondary (Class XII, Science - PCM)",
      institution: "Central Board of Secondary Education (CBSE)",
      period: "Graduated 2026",
      status: "Completed with Distinction",
      score: "92%",
      scoreValue: 92,
      scoreMax: 100,
      scoreType: "Percentage",
      highlights: [
        "Major subjects: Physics, Chemistry, Mathematics & Computer Science",
        "Ranked in top 5% of graduating cohort with high academic excellence",
        "School Science Exhibition First Prize for Automated Sensor System"
      ]
    }
  ],

  skills: {
    languages: [
      { name: "Python", level: 95, icon: "python" },
      { name: "C++", level: 85, icon: "cpp" },
      { name: "JavaScript (ES6+)", level: 88, icon: "javascript" },
      { name: "SQL", level: 82, icon: "sql" }
    ],
    aiml: [
      { name: "TensorFlow", level: 90, icon: "tensorflow" },
      { name: "PyTorch", level: 86, icon: "pytorch" },
      { name: "Scikit-Learn", level: 92, icon: "scikitlearn" },
      { name: "OpenCV", level: 84, icon: "opencv" },
      { name: "NLP (Hugging Face)", level: 85, icon: "nlp" },
      { name: "Pandas & NumPy", level: 94, icon: "pandas" }
    ],
    web: [
      { name: "React", level: 88, icon: "react" },
      { name: "Node.js", level: 80, icon: "nodejs" },
      { name: "Flask", level: 86, icon: "flask" },
      { name: "FastAPI", level: 84, icon: "fastapi" },
      { name: "Tailwind CSS & Vanilla CSS", level: 90, icon: "tailwind" }
    ],
    tools: [
      { name: "Git & GitHub", level: 92, icon: "git" },
      { name: "Docker", level: 78, icon: "docker" },
      { name: "Jupyter Notebooks", level: 95, icon: "jupyter" },
      { name: "VS Code", level: 96, icon: "vscode" },
      { name: "Linux / Bash", level: 82, icon: "linux" },
      { name: "MongoDB & MySQL", level: 82, icon: "database" }
    ],
    currentlyLearning: [
      { name: "Generative AI & LLMs", tag: "Hot Topic", color: "purple" },
      { name: "LangChain & RAG Pipelines", tag: "AI Agents", color: "blue" },
      { name: "MLOps & Model Deployment", tag: "Production ML", color: "cyan" }
    ]
  },

  projects: [
    {
      id: "resume-analyzer",
      title: "Smart Resume Analyzer",
      category: "NLP & AI",
      badge: "Featured NLP Tool",
      tagline: "Automated candidate-job match scoring & semantic skill gap extraction",
      description: "An intelligent natural language processing tool that extracts entities from PDF resumes, calculates cosine similarity against job descriptions, and recommends missing keywords.",
      longDescription: "Developed using spaCy and modern transformer embeddings, the tool parses unstructured resume documents, standardizes skill taxonomies, and generates actionable match scores (up to 88% alignment accuracy). Packaged with a reactive user interface and RESTful Flask backend.",
      tech: ["Python", "spaCy", "Flask", "React", "Transformers"],
      metrics: "88% Match Accuracy • 1.2s Analysis Speed",
      github: "https://github.com/#/smart-resume-analyzer",
      demo: "https://#",
      accent: "violet",
      icon: "document-text"
    },
    {
      id: "crop-disease",
      title: "Crop Disease Detector",
      category: "Computer Vision",
      badge: "94% Accuracy CNN",
      tagline: "Deep learning agricultural diagnosis from real-time leaf imagery",
      description: "A convolutional neural network model trained on over 50,000 leaf images across 14 plant species, predicting 38 distinct crop diseases instantly with 94% test accuracy.",
      longDescription: "Built with TensorFlow/Keras with transfer learning (MobileNetV2), optimized with data augmentation and OpenCV preprocessing pipelines. Deployed with an interactive Streamlit web dashboard for farmers and agriculturalists.",
      tech: ["TensorFlow", "OpenCV", "Streamlit", "MobileNetV2", "Python"],
      metrics: "94% Accuracy • 38 Distinct Plant Diseases",
      github: "https://github.com/#/crop-disease-detector",
      demo: "https://#",
      accent: "emerald",
      icon: "camera"
    },
    {
      id: "ai-study-buddy",
      title: "AI Study Buddy Chatbot",
      category: "Generative AI",
      badge: "LLM + RAG System",
      tagline: "Retrieval-Augmented Generation assistant for interactive PDF study",
      description: "An LLM-driven academic study partner that parses uploaded course textbooks, lecture notes, and research papers, allowing contextual question answering and quiz generation.",
      longDescription: "Leverages LangChain to chunk and embed documents using OpenAI/Hugging Face vector embeddings into ChromaDB. Features hybrid search retrieval, citation tracking for answers, and an asynchronous FastAPI backend.",
      tech: ["LangChain", "OpenAI API", "FastAPI", "ChromaDB", "Python"],
      metrics: "Sub-second RAG Retrieval • Hallucination Guardrails",
      github: "https://github.com/#/ai-study-buddy",
      demo: "https://#",
      accent: "cyan",
      icon: "chat-bubble"
    },
    {
      id: "stock-predictor",
      title: "Stock Price Predictor",
      category: "Time Series",
      badge: "LSTM Model",
      tagline: "Deep recurrent neural network for financial trend forecasting",
      description: "A time-series forecasting engine utilizing Long Short-Term Memory (LSTM) networks to predict rolling stock price trends with interactive Plotly charting.",
      longDescription: "Processes multi-year historical market price data fetched via yfinance. Includes technical indicator calculations (RSI, MACD, Bollinger Bands), min-max feature scaling, and multi-step time window prediction.",
      tech: ["PyTorch", "Pandas", "Plotly", "NumPy", "yfinance"],
      metrics: "0.021 RMSE on test split • Dynamic Candlestick UI",
      github: "https://github.com/#/stock-price-predictor",
      demo: "https://#",
      accent: "blue",
      icon: "trending-up"
    },
    {
      id: "face-attendance",
      title: "Face-Recognition Attendance System",
      category: "Computer Vision",
      badge: "Real-Time Tracking",
      tagline: "Automated contactless biometric attendance with anti-spoofing",
      description: "A real-time computer vision system that detects and identifies registered students from classroom video feeds, logging timestamps directly into an attendance database.",
      longDescription: "Utilizes OpenCV Haar cascades and dlib facial landmarks with 128-dimensional face encodings. Features liveness detection (blink detection) to prevent photo spoofing and an administrative SQLite dashboard.",
      tech: ["OpenCV", "Python", "SQLite", "dlib", "Tkinter"],
      metrics: "30+ FPS Real-time Detection • Anti-Spoofing Enabled",
      github: "https://github.com/#/face-attendance-system",
      demo: "https://#",
      accent: "indigo",
      icon: "user-group"
    },
    {
      id: "movie-recommender",
      title: "Movie Recommendation Engine",
      category: "Machine Learning",
      badge: "Hybrid Recommender",
      tagline: "Content-based + Collaborative filtering personalized engine",
      description: "A personalized movie discovery engine trained on the MovieLens dataset, combining cosine similarity on genres/cast with collaborative SVD matrix factorization.",
      longDescription: "Computes TF-IDF vectors for metadata features and user-item interaction matrices. Features cold-start heuristic fallbacks, sub-50ms recommendation queries, and a modern responsive Flask web interface.",
      tech: ["Scikit-learn", "Flask", "Pandas", "Surprise", "HTML5"],
      metrics: "50,000+ Titles Indexed • 0.87 Precision@10",
      github: "https://github.com/#/movie-recommendation-engine",
      demo: "https://#",
      accent: "rose",
      icon: "film"
    }
  ],

  internship: {
    role: "Machine Learning Intern (Virtual)",
    company: "XYZ Tech Solutions",
    type: "Remote / Virtual",
    duration: "2 Months",
    period: "Summer 2026",
    summary: "Spearheaded the development of a production-oriented sentiment-analysis pipeline for multi-channel customer reviews, elevating overall model classification accuracy by 12%.",
    responsibilities: [
      "Engineered automated text preprocessing, tokenization, lemmatization, and stop-word removal pipelines using Python and Scikit-learn.",
      "Trained and evaluated Logistic Regression, Naive Bayes, and SVM classifiers against benchmark datasets.",
      "Achieved a 12% accuracy boost over legacy heuristic models and encapsulated the model into an internal Flask REST API.",
      "Collaborated with senior software engineers via Git code reviews and daily agile standups."
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "Flask", "Git"]
  },

  certifications: [
    {
      id: "cert-1",
      title: "Machine Learning Specialization",
      issuer: "Coursera (Stanford & DeepLearning.AI)",
      instructor: "Andrew Ng",
      date: "2026",
      credentialId: "STN-ML-2026-X99",
      verifyUrl: "#", // Replace with credential link
      badgeIcon: "stanford",
      skillsCovered: ["Supervised Learning", "Neural Networks", "Decision Trees", "Unsupervised Learning", "Recommender Systems"]
    },
    {
      id: "cert-2",
      title: "Deep Learning with PyTorch",
      issuer: "Udemy",
      instructor: "Industry AI Practitioners",
      date: "2026",
      credentialId: "UDM-PYT-88741",
      verifyUrl: "#", // Replace with credential link
      badgeIcon: "pytorch",
      skillsCovered: ["CNNs", "RNNs & LSTMs", "Transfer Learning", "Custom Datasets", "Model Optimization"]
    },
    {
      id: "cert-3",
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      instructor: "Google Career Certificates",
      date: "2026",
      credentialId: "GOOG-DA-55421",
      verifyUrl: "#", // Replace with credential link
      badgeIcon: "google",
      skillsCovered: ["Data Cleaning", "SQL Queries", "R Programming", "Tableau", "Data Storytelling"]
    }
  ],

  contact: {
    heading: "Let's Build Something Intelligent Together",
    subheading: "Whether you have an internship opportunity, a project idea, or just want to discuss the latest in AI/ML, my inbox is always open!",
    directEmail: "peehu.solanki@example.com",
    locationCity: "Jaipur, Rajasthan, India",
    university: "JECRC University",
    // Configure Formspree or EmailJS:
    // To enable real submissions, replace this with your Formspree endpoint (e.g. "https://formspree.io/f/your_form_id")
    formspreeEndpoint: "", 
    socials: [
      { name: "GitHub", url: "https://github.com/#", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/#", icon: "linkedin" },
      { name: "Email", url: "mailto:peehu.solanki@example.com", icon: "mail" }
    ]
  },

  footer: {
    tagline: "Designed & built with precision by Peehu Solanki",
    year: 2026,
    copyright: "All rights reserved."
  }
};

// Export for browser script usage
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
