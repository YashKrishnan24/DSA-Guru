// Shared database for the Job Portal and Preparation Website
const APP_DATA = {
  jobs: [
    {
      id: "job-1",
      title: "Frontend Engineer (React/JS)",
      company: "Google",
      location: "Mountain View, CA (Hybrid)",
      type: "Full-time",
      salary: "$130,000 - $180,000",
      experience: "2-5 years",
      logoColor: "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)",
      description: "We are looking for a Frontend Engineer to build beautiful, responsive, and high-performance interfaces. You will work on next-generation search and workspace products.",
      requirements: [
        "Strong knowledge of modern JavaScript (ES6+), HTML5, and CSS3.",
        "2+ years experience building web applications using React, Vue, or Angular.",
        "Understanding of web performance, browser rendering pipeline, and accessibility (a11y).",
        "Experience writing clean, maintainable, and well-tested code."
      ],
      posted: "2 days ago"
    },
    {
      id: "job-2",
      title: "Software Engineer Intern",
      company: "Amazon",
      location: "Seattle, WA (On-site)",
      type: "Internship",
      salary: "$8,00,0 - $10,000 / month",
      experience: "Student",
      logoColor: "linear-gradient(135deg, #FF9900, #146B93)",
      description: "Join the Amazon Web Services (AWS) team to design and implement highly scalable cloud storage systems. Excellent learning opportunity for computer science students.",
      requirements: [
        "Currently pursuing a Bachelor's or Master's degree in CS, SE, or related field.",
        "Strong foundation in algorithms, data structures, and object-oriented programming.",
        "Familiarity with Java, C++, or Python.",
        "Strong problem-solving and communication skills."
      ],
      posted: "1 day ago"
    },
    {
      id: "job-3",
      title: "Senior Backend developer (Go/Python)",
      company: "Netflix",
      location: "Los Gatos, CA (Remote)",
      type: "Full-time",
      salary: "$220,000 - $310,000",
      experience: "5+ years",
      logoColor: "linear-gradient(135deg, #E50914, #000000)",
      description: "Help scale our media streaming pipelines serving over 200M subscribers worldwide. You will optimize cloud microservices and build resilient distributed backends.",
      requirements: [
        "5+ years of experience designing and operating distributed systems in production.",
        "Proficiency in Go, Java, or Python, and experience with microservices architecture.",
        "In-depth knowledge of database design, caching (Redis/Memcached), and message queues (Kafka).",
        "Experience deploying on AWS or equivalent cloud infrastructures."
      ],
      posted: "3 days ago"
    },
    {
      id: "job-4",
      title: "Systems Engineer",
      company: "TCS",
      location: "Bangalore, India (On-site)",
      type: "Full-time",
      salary: "₹4,50,000 - ₹7,00,000 / year",
      experience: "0-2 years",
      logoColor: "linear-gradient(135deg, #1B365D, #0087CD)",
      description: "TCS is looking for passionate freshers to work on enterprise application development, maintenance, and cloud migrations. Comprehensive training in cutting-edge tech will be provided.",
      requirements: [
        "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc in CS, IT, ECE, EEE, etc.",
        "Basic knowledge of programming (Java, Python, C++, or SQL).",
        "Understanding of basic database concepts and SDLC.",
        "Good communication skills and logical reasoning."
      ],
      posted: "Just now"
    },
    {
      id: "job-5",
      title: "Cloud Consultant",
      company: "Infosys",
      location: "Hyderabad, India (Hybrid)",
      type: "Full-time",
      salary: "₹6,00,000 - ₹9,50,000 / year",
      experience: "1-3 years",
      logoColor: "linear-gradient(135deg, #007CC3, #ffffff)",
      description: "Assist our global enterprise clients in building robust architectures on AWS, Azure, or GCP. You will work on system configurations, CI/CD pipelines, and cloud migrations.",
      requirements: [
        "Hands-on experience with cloud platforms (AWS, Azure, or GCP).",
        "Understanding of infrastructure-as-code (Terraform or CloudFormation).",
        "Basic Linux administration and scripting (Bash or Python) skills.",
        "Excellent client-facing communication skills."
      ],
      posted: "5 days ago"
    },
    {
      id: "job-6",
      title: "Machine Learning Researcher",
      company: "Meta",
      location: "Menlo Park, CA (Hybrid)",
      type: "Full-time",
      salary: "$180,000 - $240,000",
      experience: "3+ years",
      logoColor: "linear-gradient(135deg, #0081FB, #0056B3)",
      description: "Advance the state-of-the-art in generative AI models. Work alongside world-class researchers to design, train, and deploy massive LLMs and multi-modal models.",
      requirements: [
        "Ph.D. or Master's degree in Computer Science, Machine Learning, or related field.",
        "Strong track record of publication in ML conferences (NeurIPS, ICML, CVPR).",
        "Proficiency in PyTorch, JAX, or TensorFlow.",
        "Experience training large-scale deep learning models on GPU/TPU clusters."
      ],
      posted: "1 week ago"
    }
  ],

  prep: {
    aptitude: {
      notes: [
        {
          title: "Quantitative Aptitude: Time & Work",
          content: "<strong>Concept 1: Efficiency and Time</strong><br>If A can do a piece of work in 'D' days, then A's 1 day work = 1/D.<br>Efficiency is inversely proportional to time: If efficiency ratio A:B = 3:2, then time taken ratio A:B = 2:3.<br><br><strong>Concept 2: Work & Wages</strong><br>Wages are distributed in the ratio of work done by each individual (which is efficiency × days worked).<br><br><strong>Concept 3: Pipe and Cisterns</strong><br>Inlet pipes perform positive work (adds water). Outlet/leak pipes perform negative work (removes water). Total filling rate = Sum of filling rates - Sum of emptying rates."
        },
        {
          title: "Logical Reasoning: Syllogisms",
          content: "Syllogisms consist of Statements and Conclusions. You must assume statements are 100% true, even if they deviate from facts.<br><br><strong>Key Venn Diagram Strategies:</strong><br>1. 'All A are B': Draw A inside B.<br>2. 'Some A are B': Draw overlapping circles.<br>3. 'No A is B': Draw A and B separated by a cross.<br>4. 'Some A are not B': Ensure there is a part of A that cannot overlap with B.<br><br>Evaluate conclusions based on the *minimum overlapping* diagram and check for possibility cases."
        },
        {
          title: "Quantitative Aptitude: Percentages",
          content: "<strong>Concept 1: Percentage to Fraction conversions</strong><br>1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/10 = 10%.<br><br><strong>Concept 2: Successive Percentage Changes</strong><br>If a value changes by A% and then by B%, net change = (A + B + AB/100)%. Use positive signs for increases and negative signs for decreases.<br><br><strong>Concept 3: Product Constancy</strong><br>If Price × Consumption = Expenditure, and Expenditure is constant: If Price increases by x/y, Consumption must decrease by x/(x+y)."
        }
      ],
      questions: [
        {
          id: "apt-1",
          question: "A can do a piece of work in 12 days and B can do it in 24 days. If they work together, how many days will they take to complete the work?",
          options: ["6 days", "8 days", "9 days", "10 days"],
          correct: 1,
          explanation: "A's efficiency = 1/12 per day. B's efficiency = 1/24 per day. Combined efficiency = 1/12 + 1/24 = 3/24 = 1/8. Therefore, they will take 8 days together."
        },
        {
          id: "apt-2",
          question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
          options: ["120 meters", "180 meters", "324 meters", "150 meters"],
          correct: 3,
          explanation: "Speed of train = 60 * (5/18) m/s = 50/3 m/s. Length of train = Speed * Time = (50/3) * 9 = 150 meters."
        },
        {
          id: "apt-3",
          question: "What is the angle between the hour hand and the minute hand of a clock when the time is 3:25?",
          options: ["47.5 degrees", "45 degrees", "52.5 degrees", "37.5 degrees"],
          correct: 0,
          explanation: "Formula: Angle = |30H - 5.5M| where H=3, M=25. Angle = |30(3) - 5.5(25)| = |90 - 137.5| = 47.5 degrees."
        }
      ]
    },

    technical: {
      notes: [
        {
          title: "Operating Systems: Process Synchronization & Semaphores",
          content: "<strong>Critical Section Problem:</strong> A code segment where shared variables are accessed. It requires 3 conditions: Mutual Exclusion, Progress, and Bounded Waiting.<br><br><strong>Semaphores:</strong> Integer variables accessed via atomic operations `wait()` (P) and `signal()` (S).<br>- <em>Binary Semaphore:</em> Range is 0 and 1. Useful for mutual exclusion (mutex).<br>- <em>Counting Semaphore:</em> Unbounded range. Controls access to a resource pool with a finite number of instances."
        },
        {
          title: "Database Management: ACID Properties & Normalization",
          content: "<strong>ACID Properties:</strong><br>1. <strong>Atomicity:</strong> Transactions execute completely or not at all.<br>2. <strong>Consistency:</strong> Database must transition from one valid state to another.<br>3. <strong>Isolation:</strong> Transactions run independently without interference.<br>4. <strong>Durability:</strong> Updates persist even during system crashes.<br><br><strong>Normalization Forms:</strong><br>- <em>1NF:</em> Atomic values only (no multi-valued attributes).<br>- <em>2NF:</em> In 1NF and no partial dependency (non-prime attributes fully depend on candidate keys).<br>- <em>3NF:</em> In 2NF and no transitive dependency (non-prime key cannot determine another non-prime key).<br>- <em>BCNF:</em> For any dependency X -> Y, X must be a super key."
        },
        {
          title: "Computer Networks: TCP vs UDP & Three-Way Handshake",
          content: "<strong>Differences:</strong> TCP is connection-oriented, reliable, orders packets, and performs flow/congestion control. UDP is connectionless, unreliable, lightweight, faster, and allows broadcasts.<br><br><strong>TCP 3-Way Handshake:</strong><br>1. <strong>SYN:</strong> Client sends SYN packet (seq = x) to server.<br>2. <strong>SYN-ACK:</strong> Server responds with SYN-ACK (seq = y, ack = x+1).<br>3. <strong>ACK:</strong> Client sends ACK (ack = y+1) to sever. Connection is established."
        }
      ],
      questions: [
        {
          id: "tech-1",
          question: "Which of the following ACID properties ensures that concurrent transactions do not interfere with each other?",
          options: ["Atomicity", "Consistency", "Isolation", "Durability"],
          correct: 2,
          explanation: "Isolation ensures that transactions execute concurrently without viewing intermediate states of other transactions, preventing data corruption."
        },
        {
          id: "tech-2",
          question: "In an Operating System, a deadlock can occur if which of the following Coffman conditions are satisfied simultaneously?",
          options: ["Mutual Exclusion & Hold & Wait", "No Preemption & Circular Wait", "All of the above", "None of the above"],
          correct: 2,
          explanation: "All four conditions—Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait—must hold simultaneously for a deadlock to arise."
        },
        {
          id: "tech-3",
          question: "What is the range of port numbers allocated for well-known server ports in networking?",
          options: ["0 - 1023", "1024 - 49151", "49152 - 65535", "0 - 65535"],
          correct: 0,
          explanation: "Well-known ports range from 0 to 1023. Registered ports range from 1024 to 49151. Dynamic/private ports range from 49152 to 65535."
        }
      ]
    },

    hr: {
      notes: [
        {
          title: "The STAR Interview Framework",
          content: "When answering behavioral HR questions (e.g., 'Tell me about a time you failed'), structure your response using the STAR method:<br><br>1. <strong>Situation (S):</strong> Describe the background context (e.g., project, company, deadlines). Keep it brief.<br>2. <strong>Task (T):</strong> Explain the challenge or problem that needed solving.<br>3. <strong>Action (A):</strong> Discuss the specific steps *you* took to solve it. Highlight teamwork, leadership, or technical skill.<br>4. <strong>Result (R):</strong> Share the outcome. Use metrics if possible (e.g., 'reduced load time by 30%') and what you learned."
        },
        {
          title: "Common Pitfalls & Tips",
          content: "<strong>1. 'Tell me about yourself':</strong> Focus on a pitch summarizing past relevant experience, current role, key achievements, and why you are excited for this job. Keep it under 2 minutes.<br><br><strong>2. Strengths & Weaknesses:</strong> Never state a weakness that is a fatal flaw for the job (e.g. 'I hate coding' for a developer role) or a fake weakness ('I work too hard'). Instead, share a genuine but manageable weakness and, crucially, how you are actively working to improve it."
        }
      ],
      questions: [
        {
          id: "hr-1",
          question: "Why should we hire you?",
          hint: "Connect your unique skill sets, internships, and project experience to the specific responsibilities of the role. Reiterate your passion for the company's domain.",
          sampleAnswer: "You should hire me because I have a strong foundation in frontend development coupled with hands-on internship experience where I delivered production features. For example, at my previous internship, I optimized database queries that improved load times by 20%. I am eager to bring this same results-oriented mindset and technical ability to your team, and I align deeply with your goal of building user-centric software."
        },
        {
          id: "hr-2",
          question: "Tell me about a time you faced a conflict in a team and how you resolved it.",
          hint: "Use the STAR method. Focus on communication, empathy, objective analysis, and a collaborative solution instead of pointing fingers.",
          sampleAnswer: "During a university capstone project, our team was divided on whether to use React or vanilla HTML/CSS. Two members wanted React, but others were unfamiliar with it. As the team lead, I organized a brainstorming session where we listed the pros/cons. Recognizing the learning curve, I proposed a compromise: we would use React but I would pair-program with those unfamiliar and host a mini-workshop. We agreed, met our deadlines, and everyone learned a new skill."
        },
        {
          id: "hr-3",
          question: "Where do you see yourself in 5 years?",
          hint: "Show ambition, but keep it realistic. Talk about technical mastery, leadership growth, and staying committed to the domain.",
          sampleAnswer: "In five years, I see myself as a Senior Engineer or Technical Lead who can design robust system architecture and mentor junior developers. I want to build deep domain expertise in cloud systems and make significant contributions to key products. Ultimately, I want to take on greater responsibilities while staying hands-on with building technology."
        }
      ]
    },

    flashcards: [
      { front: "What is a deadlock?", back: "A state in which a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process." },
      { front: "What is BCNF?", back: "Boyce-Codd Normal Form. A table is in BCNF if and only if for every non-trivial functional dependency X -> Y, X is a super key." },
      { front: "Difference between HTTP and HTTPS?", back: "HTTPS is HTTP with encryption. It uses SSL/TLS to encrypt data packets, ensuring security against eavesdropping, running over port 443 instead of 80." },
      { front: "Explain Time Complexity of Binary Search.", back: "O(log N). At each step, the search space is divided in half. N, N/2, N/4 ... 1, resulting in log2(N) operations." },
      { front: "What is MVC architecture?", back: "Model-View-Controller. A design pattern that separates an application into three main components: Model (Data/Logic), View (UI), and Controller (Input processor)." }
    ]
  },

  companies: [
    {
      id: "comp-google",
      name: "Google",
      logoColor: "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)",
      avgSalary: "₹18,00,000 - ₹35,00,000 / yr (L3/L4)",
      rounds: [
        { name: "Online Assessment (OA)", detail: "1-2 coding problems on data structures and algorithms on Google's own platform (90 mins)." },
        { name: "Technical Phone Screen", detail: "1 coding round (45 mins) focusing on graph algorithms, dynamic programming, or system design basics." },
        { name: "On-site Rounds (4-5 rounds)", detail: "3 coding rounds (DSA depth), 1 System Design round (for L4+), and 1 'Googleyness' & Leadership round (behavioral)." }
      ],
      syllabus: [
        "Data Structures: Trees, Graphs, Trie, Segment Tree, Disjoint Set Union (DSU).",
        "Algorithms: Dynamic Programming, Graph Traversals (DFS/BFS, Dijkstra, A*), Recursion & Backtracking.",
        "System Design: Scalability, Caching, Load Balancers, Sharding, Consistency vs Availability (CAP)."
      ],
      eligibility: "B.E./B.Tech/M.Tech/Ph.D in Computer Science or related fields. No strict GPA cut-off, but solid coding record is highly valued.",
      tips: "Google values clean code, correct variable naming, active communication, and thorough analysis of edge cases. Always state the time and space complexity of your solution."
    },
    {
      id: "comp-amazon",
      name: "Amazon",
      logoColor: "linear-gradient(135deg, #FF9900, #146B93)",
      avgSalary: "₹15,00,000 - ₹28,00,000 / yr (SDE1)",
      rounds: [
        { name: "Online Assessment (OA)", detail: "2 coding questions, followed by a work simulation exercise and an aptitude/reasoning test." },
        { name: "Technical Interview 1", detail: "Coding round focusing on Arrays, Strings, Trees, or Linked Lists, coupled with Leadership Principle questions." },
        { name: "Technical Interview 2", detail: "Coding round focusing on advanced concepts like Dynamic Programming, Graphs, or System Design." },
        { name: "Bar Raiser Round", detail: "Critical round focused heavily on Amazon's 16 Leadership Principles and past behavioral instances." }
      ],
      syllabus: [
        "Data Structures: Arrays, HashMaps, Heap/Priority Queue, Binary Trees, Stacks, Queues.",
        "Algorithms: BFS/DFS, Binary Search, Sliding Window, Greedy, Dynamic Programming.",
        "Soft Skills: Deep knowledge of Amazon's Leadership Principles (Customer Obsession, Ownership, Bias for Action)."
      ],
      eligibility: "B.Tech/M.Tech/MCA/M.Sc. GPA >= 6.5 or equivalent. Outstanding problem-solving abilities.",
      tips: "Every answer must relate back to Amazon's Leadership Principles. When describing projects, use the STAR framework."
    },
    {
      id: "comp-tcs",
      name: "TCS (Ninja & Digital)",
      logoColor: "linear-gradient(135deg, #1B365D, #0087CD)",
      avgSalary: "₹3,36,00,0 - ₹7,00,000 / yr",
      rounds: [
        { name: "TCS NQT (National Qualifier Test)", detail: "Section 1: Foundation (Aptitude, Verbal, Logical). Section 2: Advanced (Coding, Advanced Quant, Reasoning)." },
        { name: "Technical Interview", detail: "Basics of OOPs, DBMS (SQL queries), Operating Systems, and explanation of college projects." },
        { name: "HR & Managerial Round", detail: "Verifying credentials, documents, location flexibility, shifts, and communication skills." }
      ],
      syllabus: [
        "Aptitude: Time & Work, Percentages, Profit & Loss, Ratios, Clocks & Calendars.",
        "Programming: Basic loops, Arrays, String manipulation, Recursion, Object Oriented Programming concepts.",
        "Core CS: SQL queries (Joins, Aggregates), OS Concepts (Deadlocks, Paging), SDLC models."
      ],
      eligibility: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc. Minimum 60% in 10th, 12th, and Graduation. Max 1 active backlog allowed.",
      tips: "Practice basic aptitude and standard string/array coding questions. Prepare your final year project details in depth."
    }
  ],

  dsa: {
    topics: [
      {
        id: "dsa-arrays",
        name: "Arrays",
        questions: [
          {
            id: "arr-1",
            name: "Two Sum",
            difficulty: "Easy",
            leetcodeLink: "https://leetcode.com/problems/two-sum/",
            description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
            templates: {
              javascript: `function twoSum(nums, target) {\n    // Write your code here\n    \n    return [];\n}`,
              python: `def twoSum(nums, target):\n    # Write your code here\n    \n    return []`,
              cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your C++ code here\n        \n        return {};\n    }\n};`,
              java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your Java code here\n        \n        return new int[0];\n    }\n}`
            },
            tests: [
              { input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]" },
              { input: "nums = [3,2,4], target = 6", expected: "[1, 2]" }
            ],
            solution: "Use a Hash Map to store elements and their index as you traverse. For each element `x`, check if `target - x` exists in the hash map. Time Complexity: O(N), Space Complexity: O(N)."
          },
          {
            id: "arr-2",
            name: "Maximum Subarray (Kadane's)",
            difficulty: "Medium",
            leetcodeLink: "https://leetcode.com/problems/maximum-subarray/",
            description: "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
            templates: {
              javascript: `function maxSubArray(nums) {\n    // Write your code here\n    \n    return 0;\n}`,
              python: `def maxSubArray(nums):\n    # Write your code here\n    \n    return 0`,
              cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your C++ code here\n        \n        return 0;\n    }\n};`,
              java: `import java.util.*;\n\nclass Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your Java code here\n        \n        return 0;\n    }\n}`
            },
            tests: [
              { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
              { input: "nums = [1]", expected: "1" }
            ],
            solution: "Keep a running sum. At each index, decide whether to add the current element to the running sum, or start a new subarray. Update the global maximum. Time Complexity: O(N), Space Complexity: O(1)."
          }
        ]
      },
      {
        id: "dsa-strings",
        name: "Strings",
        questions: [
          {
            id: "str-1",
            name: "Valid Palindrome",
            difficulty: "Easy",
            leetcodeLink: "https://leetcode.com/problems/valid-palindrome/",
            description: "Given a string `s`, return `true` if it is a palindrome, or `false` otherwise, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters.",
            templates: {
              javascript: `function isPalindrome(s) {\n    // Write your code here\n    \n    return false;\n}`,
              python: `def isPalindrome(s):\n    # Write your code here\n    \n    return False`,
              cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your C++ code here\n        \n        return false;\n    }\n};`,
              java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your Java code here\n        \n        return false;\n    }\n}`
            },
            tests: [
              { input: "s = \"A man, a plan, a canal: Panama\"", expected: "true" },
              { input: "s = \"race a car\"", expected: "false" }
            ],
            solution: "Use two pointers, one starting from the beginning and the other from the end. Skip non-alphanumeric characters. Compare characters case-insensitively. Time Complexity: O(N), Space Complexity: O(1)."
          },
          {
            id: "str-2",
            name: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            description: "Given a string `s`, find the length of the longest substring without repeating characters.",
            templates: {
              javascript: `function lengthOfLongestSubstring(s) {\n    // Write your code here\n    \n    return 0;\n}`,
              python: `def lengthOfLongestSubstring(s):\n    # Write your code here\n    \n    return 0`,
              cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your C++ code here\n        \n        return 0;\n    }\n};`,
              java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your Java code here\n        \n        return 0;\n    }\n}`
            },
            tests: [
              { input: "s = \"abcabcbb\"", expected: "3" },
              { input: "s = \"bbbbb\"", expected: "1" }
            ],
            solution: "Use the sliding window technique with a set or hash map. Expand the right pointer to include characters. If a duplicate is found, shrink the window from the left until the duplicate is removed. Time Complexity: O(N), Space Complexity: O(min(M, N)) where M is alphabet size."
          }
        ]
      },
      {
        id: "dsa-linkedlists",
        name: "Linked Lists",
        questions: [
          {
            id: "ll-1",
            name: "Reverse Linked List",
            difficulty: "Easy",
            leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
            description: "Given the head of a singly linked list, reverse the list, and return its head.",
            templates: {
              javascript: `/* \nclass ListNode {\n    constructor(val = 0, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n*/\nfunction reverseList(head) {\n    // Write your code here\n    \n    return null;\n}`,
              python: `# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef reverseList(head):\n    # Write your code here\n    \n    return None`,
              cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n*/\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your C++ code here\n        \n        return nullptr;\n    }\n};`,
              java: `/*\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n*/\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your Java code here\n        \n        return null;\n    }\n}`
            },
            tests: [
              { input: "head = [1,2,3,4,5]", expected: "[5,4,3,2,1]" },
              { input: "head = []", expected: "[]" }
            ],
            solution: "Maintain three pointers: `prev` (null), `curr` (head), and `next` (null). In a loop, store `curr.next`, redirect `curr.next = prev`, shift `prev = curr` and `curr = next`. Time Complexity: O(N), Space Complexity: O(1)."
          }
        ]
      },
      {
        id: "dsa-dp",
        name: "Dynamic Programming",
        questions: [
          {
            id: "dp-1",
            name: "Climbing Stairs",
            difficulty: "Easy",
            leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
            description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
            templates: {
              javascript: `function climbStairs(n) {\n    // Write your code here\n    \n    return 0;\n}`,
              python: `def climbStairs(n):\n    # Write your code here\n    \n    return 0`,
              cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your C++ code here\n        \n        return 0;\n    }\n};`,
              java: `class Solution {\n    public int climbStairs(int n) {\n        // Write your Java code here\n        \n        return 0;\n    }\n}`
            },
            tests: [
              { input: "n = 2", expected: "2" },
              { input: "n = 3", expected: "3" }
            ],
            solution: "This is a Fibonacci sequence problem. The number of ways to reach step `n` is the sum of ways to reach `n-1` and `n-2`. Keep track of the last two values. Time Complexity: O(N), Space Complexity: O(1)."
          }
        ]
      }
    ]
  }
};
