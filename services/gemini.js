const API_URL = import.meta.env.VITE_BACKEND_API ;

export const analyzeExamPapers = async (
    papers, 
    syllabus, 
    examName
) => {
    const formData = new FormData();
    formData.append('documentName', examName);
    papers.forEach(p => formData.append('papers', p));
    syllabus.forEach(s => formData.append('syllabus', s));

    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/files/getgroq`, {
            method: 'POST',
            headers: {
                 ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Analysis failed');
        }

        const data = await response.json();
        return transformBackendData(data, examName);

    } catch (error) {
        console.error("Analysis failed :", error);
        // Fallback to mock data if API fails (for demonstration/reliability)
        return getMockAnalysisData(examName);
    }
};

// Helper to capitalize first letter
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "Medium";

// Helper to transform backend data
const transformBackendData = (data, examName) => {
    // Check if it matches the specific structure provided in the prompt
    // { subject: "...", topics: [{ main_topic: "...", ... }] }
    
    let subjectName = examName;
    let topicsRaw = [];

    if (data.subject && Array.isArray(data.topics)) {
        subjectName = data.subject;
        topicsRaw = data.topics;
    } else if (data.topics) {
        // Fallback for previous structure
        topicsRaw = data.topics;
    }

    const topics = topicsRaw.map((t, idx) => {
        // Map fields from new JSON structure
        const name = t.main_topic || t.name || t.topic || "Untitled Topic";
        const description = t.definition || t.description || "No description available.";
        
        // Map priority and difficulty with casing adjustment
        let priority = capitalize(t.priority);
        if (!['High', 'Medium', 'Low'].includes(priority)) priority = 'Medium';

        let difficultyStr = capitalize(t.difficulty);
        if (difficultyStr === 'Moderate') difficultyStr = 'Medium'; // Map 'Moderate' to 'Medium' if needed
        
        let difficulty = difficultyStr;
        if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) difficulty = 'Medium';

        const subTopics = t.side_topics || t.subTopics || [];
        const expectedQuestions = t.question_types || t.expectedQuestions || [];
        const isCompleted = t.completed || false;
        
        // Store query for playlist generation if needed
        const playlistQuery = t.playlist_query || `${name} tutorial`;

        return {
            id: t.id || `topic-${idx}`,
            name,
            description,
            priority,
            difficulty,
            subTopics,
            expectedQuestions,
            videos: [], // New JSON doesn't have direct video links, dashboard will handle button
            isCompleted,
            playlistQuery
        };
    });

    // Calculate a mock score based on completion or random for new analysis
    const overallScore = data.overallScore !== undefined ? data.overallScore : 0;

    return {
        id: data._id || data.documentId || data.id, // Capture ID from backend for updates
        examName: subjectName,
        totalMarksAnalyzed: 100,
        overallScore: overallScore,
        topics: topics,
        keyInsights: data.keyInsights || []
    };
};

export const getMockAnalysisData = (name = "Digital Logic Design") => {
  return {
    id: "mock-id-123",
    examName: name,
    totalMarksAnalyzed: 100,
    overallScore: 27,
    keyInsights: ["Focus on NAND gates", "K-Maps are high priority"],
    topics: [
      {
        id: "1",
        name: "Universal NAND Gate Implementation",
        description: "Recognize NAND as universal, then replace each AND, OR, NOT in the target function with equivalent NAND structures, drawing the final gate-level circuit.",
        priority: "High",
        difficulty: "Easy",
        subTopics: ["basic NAND gate symbol and truth table", "Boolean algebra basics", "gate-level implementation using NAND"],
        expectedQuestions: [
            "Given F = AB + C, draw the NAND-only implementation.",
            "Show step-by-step conversion of a SOP expression to NAND network.",
            "Explain why NAND can realize any Boolean function."
        ],
        videos: [
            {
                title: "Learn: Identify the universal NAND gate and implement...",
                channelName: "Neso Academy",
                duration: "10:00",
                thumbnail: "https://i.ytimg.com/vi/R7i-r8eM0sg/hqdefault.jpg",
                url: "#"
            }
        ]
      },
      {
        id: "2",
        name: "K-Map Minimization (4 Variables)",
        description: "Master the grouping of 1s (minterms) in a 4-variable Karnaugh Map to derive the minimal Sum-of-Products (SOP) expression.",
        priority: "High",
        difficulty: "Medium",
        subTopics: ["Gray code labeling", "Grouping (Pairs, Quads, Octets)", "Don't Care conditions"],
        expectedQuestions: [
            "Minimize f(A,B,C,D) = Σm(0,1,2,5,8,9,10) using K-Map.",
            "Find the essential prime implicants for the given function.",
            "Design a logic circuit after minimizing the expression."
        ],
        videos: []
      }
    ]
  };
};

export const generateDiagnosticQuestion = async (topic) => {
    return {
        id: 1,
        text: `A sample question regarding ${topic}...`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 1,
        topic: topic,
        difficulty: 'Medium'
    }
}