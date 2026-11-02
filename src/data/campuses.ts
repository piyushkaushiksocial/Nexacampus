export interface AccreditedCampus {
  id: string;
  name: string;
  university: string;
  location: string;
  city: string;
  state: string;
  zone: "North" | "South" | "West" | "East";
  type: "Deemed-to-be University" | "Private University" | "Autonomous Institute" | "State Tech Affiliated";
  naacGrade: "A++" | "A+" | "A";
  naacCgpa?: string;
  nirfRank?: string;
  ugcApproved: boolean;
  wesRecognized: boolean;
  established: number;
  campusArea: string;
  degreesOffered: string[];
  formats: string[];
  facilities: string[];
  avgPlacement: string;
  highestPlacement: string;
  topRecruiters: string[];
  image: string;
  shortDesc: string;
  scholarshipQuotaAvailable: boolean;
}

export const CAMPUSES_DATA: AccreditedCampus[] = [
  {
    id: "nmims-mumbai",
    name: "NMIMS University (Main & Global Campuses)",
    university: "Narsee Monjee Institute of Management Studies",
    location: "Vile Parle, Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    zone: "West",
    type: "Deemed-to-be University",
    naacGrade: "A++",
    naacCgpa: "3.59 CGPA",
    nirfRank: "Top 25 NIRF Management",
    ugcApproved: true,
    wesRecognized: true,
    established: 1981,
    campusArea: "Urban Corporate Campus",
    degreesOffered: ["MBA (Dual Specialization)", "BBA", "Executive Leadership", "Commerce & Analytics"],
    formats: ["Campus Regular", "Executive Weekend", "Flexible Blended"],
    facilities: ["Bloomberg Trading Terminal", "Harvard Business Case Library", "Corporate Incubation Center", "800+ Placement Partners"],
    avgPlacement: "₹9.8 - ₹12.4 LPA",
    highestPlacement: "₹28.0 LPA",
    topRecruiters: ["Deloitte", "Amazon", "KPMG", "HDFC Bank", "Accenture", "Flipkart"],
    image: "/images/campus-architecture.jpg",
    shortDesc: "Prestigious category-1 autonomous university renowned for corporate management, banking, and strategic leadership programs.",
    scholarshipQuotaAvailable: true
  },
  {
    id: "manipal-jaipur",
    name: "Manipal University Jaipur (MUJ Residential Campus)",
    university: "Manipal University Jaipur",
    location: "Dehmi Kalan, Jaipur, Rajasthan",
    city: "Jaipur",
    state: "Rajasthan",
    zone: "North",
    type: "Private University",
    naacGrade: "A+",
    naacCgpa: "3.28 CGPA",
    nirfRank: "NIRF Top 60 Multi-Disciplinary",
    ugcApproved: true,
    wesRecognized: true,
    established: 2011,
    campusArea: "122-Acre Green Smart Campus",
    degreesOffered: ["MCA (Cloud & AI)", "B.Tech Computer Science", "BBA", "BCA", "Design & Architecture"],
    formats: ["Campus Residential", "Blended Learning"],
    facilities: ["AWS & Azure Cloud Sandbox Labs", "Advanced Robotics & IoT Center", "State-of-the-Art Student Hostels", "Sports Arena & Olympic Pool"],
    avgPlacement: "₹8.4 LPA",
    highestPlacement: "₹42.0 LPA",
    topRecruiters: ["Microsoft", "Infosys", "Cognizant", "TCS", "Capgemini", "Wipro"],
    image: "/images/campus-architecture.jpg",
    shortDesc: "World-class 122-acre modern campus with dedicated computing and software development centers.",
    scholarshipQuotaAvailable: true
  },
  {
    id: "amity-noida",
    name: "Amity University (NCR Main Campus)",
    university: "Amity University",
    location: "Sector 125, Noida, Delhi NCR",
    city: "Delhi NCR",
    state: "Uttar Pradesh",
    zone: "North",
    type: "Private University",
    naacGrade: "A+",
    naacCgpa: "3.27 CGPA",
    nirfRank: "Top 35 NIRF Universities",
    ugcApproved: true,
    wesRecognized: true,
    established: 2005,
    campusArea: "60-Acre Modern Tech Campus",
    degreesOffered: ["MBA", "MCA", "B.Tech AI & Robotics", "BA LLB Corporate Law", "Applied Sciences"],
    formats: ["Campus Full-Time", "Executive Evening", "Blended Hybrid"],
    facilities: ["Global Research & Incubation Cell", "Operational Moot Courts", "Corporate Guest Residency", "Military Training & Leadership Wing"],
    avgPlacement: "₹7.9 LPA",
    highestPlacement: "₹35.0 LPA",
    topRecruiters: ["Google", "EY", "American Express", "Standard Chartered", "Tech Mahindra"],
    image: "/images/campus-architecture.jpg",
    shortDesc: "Flagship NCR campus with global academic partnerships, incubation funding, and top corporate recruitment drives.",
    scholarshipQuotaAvailable: true
  },
  {
    id: "jain-bangalore",
    name: "Jain University (Bangalore Tech Hub Campuses)",
    university: "Jain (Deemed-to-be University)",
    location: "Jayanagar & Global Campus, Bangalore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    zone: "South",
    type: "Deemed-to-be University",
    naacGrade: "A++",
    naacCgpa: "3.71 CGPA",
    nirfRank: "NIRF Top 70 Universities",
    ugcApproved: true,
    wesRecognized: true,
    established: 1990,
    campusArea: "Multi-Campus Tech Ecosystem",
    degreesOffered: ["MCA (Artificial Intelligence)", "BCA Software Engineering", "BBA Startups", "Data Analytics"],
    formats: ["Campus Full-Time", "Tech Hybrid"],
    facilities: ["Silicon City Industry Linkages", "JU Startup Incubation Cell", "High Performance Computing Lab", "2,000+ Placement Partners"],
    avgPlacement: "₹8.9 LPA",
    highestPlacement: "₹30.0 LPA",
    topRecruiters: ["Infosys", "IBM", "Oracle", "Cisco", "ThoughtWorks", "Target"],
    image: "/images/tech-learning.jpg",
    shortDesc: "Located in India's technology capital, with direct recruitment pipelines into leading IT product and startup companies.",
    scholarshipQuotaAvailable: true
  },
  {
    id: "shivalik-dehradun",
    name: "Shivalik Institute of Technology (Dehradun Foothills)",
    university: "Shivalik Institute of Technology",
    location: "Shimla Bypass Road, Dehradun, Uttarakhand",
    city: "Dehradun",
    state: "Uttarakhand",
    zone: "North",
    type: "Autonomous Institute",
    naacGrade: "A++",
    naacCgpa: "3.61 CGPA",
    nirfRank: "State Top 10 Engineering",
    ugcApproved: true,
    wesRecognized: false,
    established: 2008,
    campusArea: "25-Acre Scenic Mountain Campus",
    degreesOffered: ["B.Tech Civil Engineering", "B.Tech Computer Science", "Mechanical & Smart Infrastructure", "BBA"],
    formats: ["Campus Full-Time Residential"],
    facilities: ["L&T Construction Apprentice Labs", "Advanced Seismic Dynamic Test Facility", "High Speed CAD Modeling Centers", "Eco-friendly Green Hostels"],
    avgPlacement: "₹6.8 LPA",
    highestPlacement: "₹16.0 LPA",
    topRecruiters: ["L&T Construction", "Tata Projects", "Afcons", "Shapoorji Pallonji", "JMC Projects"],
    image: "/images/campus-architecture.jpg",
    shortDesc: "Dedicated engineering academy with heavy infrastructure and civil engineering placement records.",
    scholarshipQuotaAvailable: true
  },
  {
    id: "dpu-pune",
    name: "Dr. D.Y. Patil Vidyapeeth (Pune Medical & Management Hub)",
    university: "Dr. D.Y. Patil Vidyapeeth",
    location: "Pimpri, Pune, Maharashtra",
    city: "Pune",
    state: "Maharashtra",
    zone: "West",
    type: "Deemed-to-be University",
    naacGrade: "A++",
    naacCgpa: "3.64 CGPA",
    nirfRank: "NIRF Top 45 Universities",
    ugcApproved: true,
    wesRecognized: true,
    established: 1996,
    campusArea: "45-Acre Healthcare & Management Complex",
    degreesOffered: ["MBA Healthcare & Hospital Administration", "Pharma Management", "BBA", "Biotechnology"],
    formats: ["Campus Regular", "Executive Weekend"],
    facilities: ["2,000-Bed Super-Specialty Hospital", "Pharma Analytical Research Labs", "Executive Seminar Halls", "Clinical Trial Simulation Unit"],
    avgPlacement: "₹8.1 LPA",
    highestPlacement: "₹22.0 LPA",
    topRecruiters: ["Apollo Hospitals", "Fortis Healthcare", "Cipla", "Sun Pharma", "Max Healthcare"],
    image: "/images/university-boardroom.jpg",
    shortDesc: "Nationally acclaimed institution for healthcare management, pharmaceutical leadership, and hospital administration.",
    scholarshipQuotaAvailable: true
  }
];
