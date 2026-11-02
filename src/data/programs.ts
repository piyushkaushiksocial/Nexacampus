export interface ProgramSyllabus {
  semester: string;
  subjects: string[];
}

export interface ProgramFaq {
  question: string;
  answer: string;
}

export interface ProgramReview {
  author: string;
  role: string;
  rating: number;
  comment: string;
  verifiedStudent: boolean;
}

export interface Program {
  id: string;
  name: string;
  shortName: string;
  university: string;
  universityLogo?: string;
  location: string;
  category: "Management" | "Technology & AI" | "Commerce & Finance" | "Engineering" | "Executive";
  degreeLevel: "Master's" | "Bachelor's" | "Executive" | "Certification";
  mode: "100% Online" | "Campus Full-time" | "Hybrid / Blended";
  duration: string;
  accreditations: string[];
  nirfRank?: string;
  totalFee: number;
  semesterFee: number;
  emiStartsAt: number;
  avgPlacementCtc: string;
  highestCtc: string;
  topRecruiters: string[];
  examMode: "100% Online Proctored" | "Designated Offline Centers" | "Continuous LMS Assessment";
  specializations: string[];
  eligibility: string;
  nebsaScholarship: {
    maxWaiver: string;
    totalSeats: number;
    seatsRemaining: number;
    tier: string;
  };
  highlights: string[];
  bestFor: string;
  syllabus?: ProgramSyllabus[];
  faqs?: ProgramFaq[];
  reviews?: ProgramReview[];
}

export const PROGRAMS_DATA: Program[] = [
  {
    id: "nmims-online-mba",
    name: "Online MBA (Dual Specialization)",
    shortName: "NMIMS Online MBA",
    university: "NMIMS Global (Deemed University)",
    location: "Mumbai, Maharashtra (Pan-India Online)",
    category: "Management",
    degreeLevel: "Master's",
    mode: "100% Online",
    duration: "2 Years (4 Semesters)",
    accreditations: ["UGC-DEB Entitled", "NAAC A++ Grade (3.59 CGPA)", "Category-1 Autonomy", "AICTE Approved"],
    nirfRank: "Top 25 NIRF Management",
    totalFee: 196000,
    semesterFee: 49000,
    emiStartsAt: 8166,
    avgPlacementCtc: "₹9.8 LPA",
    highestCtc: "₹24.0 LPA",
    topRecruiters: ["Deloitte", "KPMG", "Amazon", "HDFC Bank", "Accenture", "ICICI Bank"],
    examMode: "100% Online Proctored",
    specializations: ["FinTech", "Business Analytics", "Marketing Management", "Operations & Supply Chain", "HR Management"],
    eligibility: "Bachelor's Degree in any discipline with minimum 50% marks from a recognized university.",
    nebsaScholarship: {
      maxWaiver: "40%",
      totalSeats: 35,
      seatsRemaining: 9,
      tier: "Tier-1 Merit"
    },
    highlights: [
      "Harvard Business Publishing case-study pedagogy",
      "Interactive live weekend lectures with corporate leaders",
      "Dedicated portal with 800+ hiring partners and resume review"
    ],
    bestFor: "Working professionals seeking corporate leadership and management roles without leaving work.",
    syllabus: [
      {
        semester: "Semester 1",
        subjects: ["Management Theory & Practice", "Marketing Management", "Financial Accounting & Analysis", "Business Economics", "Corporate Communication"]
      },
      {
        semester: "Semester 2",
        subjects: ["Corporate Finance", "Operations Management", "Human Resource Management", "Business Law & Ethics", "Information Systems for Managers"]
      },
      {
        semester: "Semester 3",
        subjects: ["Strategic Management", "Elective 1 (Specialization Core)", "Elective 2 (Specialization Core)", "Business Analytics Foundations", "Research Methodology"]
      },
      {
        semester: "Semester 4",
        subjects: ["Digital Business Strategy", "Elective 3 (Advanced Specialization)", "Elective 4 (Advanced Specialization)", "Capstone Industry Project & Viva"]
      }
    ],
    faqs: [
      {
        question: "Is NMIMS Online MBA degree equivalent to a regular on-campus MBA?",
        answer: "Yes. Under UGC (Open and Distance Learning / Online) Regulations, degrees awarded through UGC-DEB entitled online mode by Category-1 autonomous universities are treated on par with on-campus degrees for all corporate employment and Govt examinations."
      },
      {
        question: "How are the examinations conducted?",
        answer: "Exams are conducted in 100% online remote-proctored mode. You can take the exams from home using your laptop with webcam and microphone, with multiple weekend slot options."
      },
      {
        question: "Is No-Cost EMI available for paying fees?",
        answer: "Yes, NEBSA provides 0% interest monthly EMI plans across 12, 18, and 24-month tenures through approved education financing partners (starts at ₹8,166/month)."
      }
    ],
    reviews: [
      {
        author: "Kavita Rao",
        role: "Senior Consultant @ Deloitte",
        rating: 5,
        comment: "Completed my MBA while working full-time. The weekend live sessions and case-study analysis directly helped me transition from senior developer to product consultant.",
        verifiedStudent: true
      },
      {
        author: "Aditya Deshmukh",
        role: "Operations Lead @ Flipkart",
        rating: 5,
        comment: "The LMS mobile app is super smooth. Exam scheduling flexibility allowed me to balance heavy quarter-end office deliverables without missing semester exams.",
        verifiedStudent: true
      }
    ]
  },
  {
    id: "manipal-online-mca",
    name: "Online MCA (Cloud Computing & AI)",
    shortName: "Manipal Online MCA",
    university: "Manipal University Jaipur (MUJ)",
    location: "Jaipur, Rajasthan (Pan-India Online)",
    category: "Technology & AI",
    degreeLevel: "Master's",
    mode: "100% Online",
    duration: "2 Years (4 Semesters)",
    accreditations: ["UGC-DEB Entitled", "NAAC A+ Grade", "AICTE Approved", "WES Recognized"],
    nirfRank: "NIRF Top 60 Multi-Disciplinary",
    totalFee: 158000,
    semesterFee: 39500,
    emiStartsAt: 6583,
    avgPlacementCtc: "₹8.4 LPA",
    highestCtc: "₹19.5 LPA",
    topRecruiters: ["Microsoft", "Infosys", "Cognizant", "TCS", "Capgemini", "Wipro"],
    examMode: "100% Online Proctored",
    specializations: ["Cloud Computing", "Artificial Intelligence & ML", "Cybersecurity", "Full Stack Development"],
    eligibility: "BCA/B.Sc (CS/IT) or graduation with Mathematics at 10+2 level with min 50% aggregate.",
    nebsaScholarship: {
      maxWaiver: "50%",
      totalSeats: 45,
      seatsRemaining: 14,
      tier: "Tier-1 Merit"
    },
    highlights: [
      "Virtual cloud computing labs with AWS & Azure sandbox",
      "WES Recognized degree eligible for Canada / US immigration evaluations",
      "Placement assistance with 500+ tech enterprise drives"
    ],
    bestFor: "Software engineers, BCA grads, and IT professionals aiming for Cloud/AI Architect trajectories.",
    syllabus: [
      {
        semester: "Semester 1",
        subjects: ["Advanced Data Structures & Algorithms", "Relational Database Management Systems", "Mathematical Foundations of Computer Science", "Modern Web Technologies", "Data Structures Lab"]
      },
      {
        semester: "Semester 2",
        subjects: ["Object-Oriented Software Engineering", "Cloud Infrastructure & Virtualization", "Operating Systems & Linux Kernel", "Artificial Intelligence Foundations", "Cloud Computing Sandbox Lab"]
      },
      {
        semester: "Semester 3",
        subjects: ["Machine Learning & Deep Learning", "Containerization with Docker & Kubernetes", "Cybersecurity & Cryptography", "Specialization Elective 1", "AI Project Lab"]
      },
      {
        semester: "Semester 4",
        subjects: ["Big Data Analytics & Spark", "DevOps Pipeline Engineering", "Specialization Elective 2", "Major Industrial Software Project"]
      }
    ],
    faqs: [
      {
        question: "Can I apply for WES and immigration evaluations with this degree?",
        answer: "Yes, Manipal University Jaipur Online MCA is recognized by WES (World Education Services) and AIU, making it eligible for Canadian PR (Express Entry) and US academic equivalence."
      },
      {
        question: "Does the program provide hands-on coding labs?",
        answer: "Yes, students receive cloud lab credits for AWS and Microsoft Azure along with GitHub classroom repos for all practical programming assessments."
      }
    ],
    reviews: [
      {
        author: "Prateek Sundaram",
        role: "Cloud Engineer @ Capgemini",
        rating: 5,
        comment: "The Docker & Kubernetes modules are directly aligned with industry standards. Transitioned from support to cloud developer within 14 months of enrolling.",
        verifiedStudent: true
      }
    ]
  },
  {
    id: "amity-online-mba",
    name: "Online MBA (Global Accreditations)",
    shortName: "Amity Online MBA",
    university: "Amity University Online",
    location: "Noida, UP (Pan-India Online)",
    category: "Management",
    degreeLevel: "Master's",
    mode: "100% Online",
    duration: "2 Years (4 Semesters)",
    accreditations: ["UGC-DEB Entitled", "NAAC A+ Grade", "QS World Ranked #37 Asia", "WES & AIU Recognized"],
    nirfRank: "Top 35 NIRF Universities",
    totalFee: 179000,
    semesterFee: 44750,
    emiStartsAt: 7458,
    avgPlacementCtc: "₹7.9 LPA",
    highestCtc: "₹18.0 LPA",
    topRecruiters: ["American Express", "Google", "EY", "Standard Chartered", "Flipkart"],
    examMode: "100% Online Proctored",
    specializations: ["Digital Marketing", "International Business", "Data Science", "Hospitality Management"],
    eligibility: "Graduation with minimum 40% aggregate in any discipline.",
    nebsaScholarship: {
      maxWaiver: "60%",
      totalSeats: 50,
      seatsRemaining: 11,
      tier: "Tier-2 Merit"
    },
    highlights: [
      "Daily live sessions + metaverse campus orientation",
      "Dual credential options with global partner certifications",
      "Robust career mentoring and CV curation portal"
    ],
    bestFor: "Learners seeking recognized international brand credentials and flexibility.",
    syllabus: [
      {
        semester: "Semester 1",
        subjects: ["Principles of Management", "Managerial Economics", "Accounting for Managers", "Business Statistics", "Professional Communication"]
      },
      {
        semester: "Semester 2",
        subjects: ["Marketing & Customer Analytics", "Human Resource Systems", "Financial Management", "Legal Aspects of Business", "Research Methodology"]
      },
      {
        semester: "Semester 3",
        subjects: ["Global Business Environment", "Strategic Management", "Elective 1", "Elective 2", "Live Virtual Business Simulation"]
      },
      {
        semester: "Semester 4",
        subjects: ["Entrepreneurship & Innovation", "Corporate Governance", "Elective 3", "Final Dissertation Project"]
      }
    ],
    faqs: [
      {
        question: "Are live classes mandatory?",
        answer: "Live sessions are scheduled on weekends and evenings. Recordings are archived on the LMS within 4 hours, so attendance is completely flexible."
      }
    ],
    reviews: [
      {
        author: "Meghna Roy",
        role: "Brand Strategist @ Ogilvy",
        rating: 5,
        comment: "Great faculty interaction and masterclasses by CXOs. The digital marketing case studies were practical and up-to-date.",
        verifiedStudent: true
      }
    ]
  },
  {
    id: "chandigarh-online-bba",
    name: "Online BBA (Entrepreneurship & Digital Marketing)",
    shortName: "CU Online BBA",
    university: "Chandigarh University Online",
    location: "Mohali, Punjab (Pan-India Online)",
    category: "Commerce & Finance",
    degreeLevel: "Bachelor's",
    mode: "100% Online",
    duration: "3 Years (6 Semesters)",
    accreditations: ["UGC-DEB Entitled", "NAAC A+ Grade (3.28 CGPA)", "AICTE Approved"],
    nirfRank: "NIRF Rank #27 Overall",
    totalFee: 126000,
    semesterFee: 21000,
    emiStartsAt: 3500,
    avgPlacementCtc: "₹5.6 LPA",
    highestCtc: "₹14.0 LPA",
    topRecruiters: ["Zomato", "Swiggy", "Byju's", "Airtel", "HCL Tech"],
    examMode: "100% Online Proctored",
    specializations: ["Digital Marketing", "Retail & E-Commerce", "Family Business & Startup Management"],
    eligibility: "10+2 or equivalent in any stream with minimum 50% marks from recognized board.",
    nebsaScholarship: {
      maxWaiver: "75%",
      totalSeats: 60,
      seatsRemaining: 18,
      tier: "Tier-2 Merit"
    },
    highlights: [
      "Extremely affordable per-semester fees with zero-cost EMI",
      "Hands-on digital ad spend simulators and live case assignments",
      "Access to CU corporate incubation network and seed pitch competitions"
    ],
    bestFor: "High-school passouts and working youth looking to launch businesses or enterprise commercial careers.",
    syllabus: [
      {
        semester: "Year 1 (Sem 1 & 2)",
        subjects: ["Business Organization", "Microeconomics", "Financial Accounting", "Business Law", "Digital Media Fundamentals", "Consumer Behavior"]
      },
      {
        semester: "Year 2 (Sem 3 & 4)",
        subjects: ["Marketing Management", "Cost Accounting", "Human Resources", "Social Media Advertising", "SEO & Content Marketing", "E-Commerce Strategy"]
      },
      {
        semester: "Year 3 (Sem 5 & 6)",
        subjects: ["Entrepreneurship & Venture Capital", "Financial Markets", "Business Analytics for Managers", "Paid Search & Performance Marketing", "Capstone Startup Pitch"]
      }
    ],
    faqs: [
      {
        question: "Can I do an MBA after this online BBA?",
        answer: "Yes, 100%. Because this BBA is UGC-DEB entitled and awarded by an accredited university, you can appear for CAT, XAT, MAT, or join any domestic or global MBA program."
      }
    ],
    reviews: [
      {
        author: "Rohan Bhatia",
        role: "Founder, D2C Apparel Brand",
        rating: 5,
        comment: "The lowest fee in the country for an A+ university degree. I run my business during the day and finish assignments on weekends.",
        verifiedStudent: true
      }
    ]
  },
  {
    id: "dpu-online-mba",
    name: "Online MBA (Healthcare & Hospital Management)",
    shortName: "DPU Online MBA",
    university: "Dr. D.Y. Patil Vidyapeeth (Deemed-to-be-University)",
    location: "Pune, Maharashtra",
    category: "Management",
    degreeLevel: "Master's",
    mode: "100% Online",
    duration: "2 Years (4 Semesters)",
    accreditations: ["UGC-DEB Entitled", "NAAC A++ Grade (3.64 CGPA)", "AICTE Approved", "Category-1 Autonomy"],
    nirfRank: "NIRF Top 45 Universities",
    totalFee: 140000,
    semesterFee: 35000,
    emiStartsAt: 5833,
    avgPlacementCtc: "₹8.1 LPA",
    highestCtc: "₹17.5 LPA",
    topRecruiters: ["Apollo Hospitals", "Fortis", "Cipla", "Sun Pharma", "Max Healthcare"],
    examMode: "100% Online Proctored",
    specializations: ["Hospital & Healthcare Administration", "Pharma Management", "Operations Management"],
    eligibility: "Graduation in any stream with 50% aggregate (45% for reserved category).",
    nebsaScholarship: {
      maxWaiver: "50%",
      totalSeats: 40,
      seatsRemaining: 8,
      tier: "Tier-1 Merit"
    },
    highlights: [
      "Industry benchmark for hospital operations and pharmaceutical sales leaders",
      "Weekend masterclasses by chief medical officers and hospital administrators",
      "End-to-end placement assistance with healthcare chains"
    ],
    bestFor: "Doctors, pharma executives, nurses, and biology grads transitioning into healthcare administration."
  },
  {
    id: "jain-online-mca",
    name: "Online MCA (Artificial Intelligence & Data Science)",
    shortName: "Jain Online MCA",
    university: "Jain (Deemed-to-be University)",
    location: "Bangalore, Karnataka",
    category: "Technology & AI",
    degreeLevel: "Master's",
    mode: "100% Online",
    duration: "2 Years (4 Semesters)",
    accreditations: ["UGC-DEB Entitled", "NAAC A++ Grade (3.71 CGPA)", "AICTE Approved", "NIRF Top 70"],
    nirfRank: "NIRF Top 70 Universities",
    totalFee: 200000,
    semesterFee: 50000,
    emiStartsAt: 8333,
    avgPlacementCtc: "₹8.9 LPA",
    highestCtc: "₹21.0 LPA",
    topRecruiters: ["Infosys", "Oracle", "IBM", "Capgemini", "ThoughtWorks", "Cisco"],
    examMode: "100% Online Proctored",
    specializations: ["Artificial Intelligence", "Data Engineering", "Machine Learning & Deep Learning"],
    eligibility: "BCA or Bachelor's Degree in CS/IT or equivalent with min 50% marks.",
    nebsaScholarship: {
      maxWaiver: "45%",
      totalSeats: 30,
      seatsRemaining: 7,
      tier: "Tier-1 Merit"
    },
    highlights: [
      "Bangalore tech ecosystem curriculum designed with Silicon City IT executives",
      "Hands-on capstone projects deployed to GitHub and cloud repositories",
      "Over 2,000 corporate hiring tie-ups with active campus placement drives"
    ],
    bestFor: "Developers seeking rapid promotion into AI engineering and Data Science roles."
  },
  {
    id: "shivalik-btech-civil",
    name: "B.Tech Civil & Infrastructure Engineering (Campus)",
    shortName: "Shivalik Tech Civil",
    university: "Shivalik Institute of Technology",
    location: "Dehradun, Uttarakhand",
    category: "Engineering",
    degreeLevel: "Bachelor's",
    mode: "Campus Full-time",
    duration: "4 Years (8 Semesters)",
    accreditations: ["AICTE Approved", "NAAC A++ Grade", "Affiliated to State Tech University"],
    nirfRank: "State Top 10 Engineering",
    totalFee: 420000,
    semesterFee: 52500,
    emiStartsAt: 8750,
    avgPlacementCtc: "₹6.8 LPA",
    highestCtc: "₹16.0 LPA",
    topRecruiters: ["L&T Construction", "Tata Projects", "Afcons", "Shapoorji Pallonji"],
    examMode: "Designated Offline Centers",
    specializations: ["Smart City Infrastructure", "BIM & Structural Dynamics", "Geo-informatics"],
    eligibility: "10+2 PCM with min 55% aggregate or valid state entrance / NEBSA score.",
    nebsaScholarship: {
      maxWaiver: "100%",
      totalSeats: 40,
      seatsRemaining: 12,
      tier: "Platinum Scholar"
    },
    highlights: [
      "100% Core Civil department placement track record",
      "Industrial tie-up with L&T co-op apprentice program",
      "Advanced seismic resistance and CAD modeling labs on campus"
    ],
    bestFor: "Students committed to heavy engineering, civil architecture, and state infrastructure projects."
  },
  {
    id: "shoolini-exec-mba",
    name: "Executive MBA (AI for Senior Leaders)",
    shortName: "Shoolini Exec MBA",
    university: "Shoolini University",
    location: "Solan, HP / Hybrid Corporate Centers",
    category: "Executive",
    degreeLevel: "Executive",
    mode: "Hybrid / Blended",
    duration: "1 Year (Accelerated)",
    accreditations: ["NAAC A+ Grade", "Times Higher Ed #1 Private Indian University", "UGC Approved"],
    nirfRank: "NIRF Top 100 Universities",
    totalFee: 240000,
    semesterFee: 120000,
    emiStartsAt: 10000,
    avgPlacementCtc: "₹14.2 LPA",
    highestCtc: "₹32.0 LPA",
    topRecruiters: ["McKinsey & Co", "Boston Consulting Group", "Adani Group", "Reliance Industries"],
    examMode: "Continuous LMS Assessment",
    specializations: ["Generative AI in Strategy", "Corporate Governance", "Global Supply Chain"],
    eligibility: "Bachelor's Degree with minimum 3+ years of verifiable professional work experience.",
    nebsaScholarship: {
      maxWaiver: "50%",
      totalSeats: 25,
      seatsRemaining: 5,
      tier: "Executive Fellow"
    },
    highlights: [
      "Weekend executive residencies in Delhi NCR & Bangalore hubs",
      "Personal 1-on-1 executive coaching from former C-Suite executives",
      "Network with mid-to-senior corporate directors and founders"
    ],
    bestFor: "Managers with 3+ years experience looking to break into Director or VP roles."
  }
];
