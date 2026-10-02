// CodeAtlas — Practice directory
// The learn → practice externally → return → mark progress loop.
export interface PracticePlatform {
  name: string;
  url: string;
  description: string;
  tags: string[];
  relatedCourses: string[]; // course ids
}

export interface PracticeCategory {
  id: string;
  title: string;
  tagline: string;
  color: string; // tailwind-friendly accent token
  platforms: PracticePlatform[];
}

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    id: "dsa",
    title: "DSA & Competitive Coding",
    tagline: "Sharpen problem-solving with structured problem sets and contests.",
    color: "emerald",
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/", description: "The standard interview problem set — 3,000+ problems with tags, difficulty tiers and company filters.", tags: ["Interviews", "All levels"], relatedCourses: ["dsa-complete", "cpp-programming", "java-programming", "algorithms-intuition"] },
      { name: "NeetCode", url: "https://neetcode.io/practice", description: "Curated Blind 75 & NeetCode 150 lists with video explanations for every problem.", tags: ["Interviews", "Curated"], relatedCourses: ["dsa-complete"] },
      { name: "Striver A2Z Sheet", url: "https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet", description: "Step-by-step DSA roadmap — pairs directly with the DSA Complete course on CodeAtlas.", tags: ["Roadmap", "Step-by-step"], relatedCourses: ["dsa-complete"] },
      { name: "Codeforces", url: "https://codeforces.com/problemset/", description: "Competitive programming problemset with algorithmic tags and rating-based filtering.", tags: ["Competitive", "Math"], relatedCourses: ["dsa-complete", "algorithms-intuition"] },
      { name: "CSES Problem Set", url: "https://cses.fi/problemset/", description: "A comprehensive algorithmic problem collection — introductory, sorting/searching, DP, graphs and more.", tags: ["Algorithms", "Structured"], relatedCourses: ["dsa-complete", "algorithms-intuition"] },
      { name: "AtCoder", url: "https://atcoder.jp/contests/", description: "ABC/ARC/AGC contest series plus the permanent Beginner Selection practice set.", tags: ["Contests", "Beginner-friendly"], relatedCourses: ["dsa-complete"] },
      { name: "Codewars", url: "https://www.codewars.com/kata", description: "Thousands of kata across C++, Python, JavaScript, SQL and more, ranked by difficulty.", tags: ["Kata", "Multi-language"], relatedCourses: ["javascript", "python-programming", "cpp-programming"] },
      { name: "Exercism", url: "https://exercism.org/", description: "Language-specific exercises with mentor feedback — solve in-browser or via CLI.", tags: ["Multi-language", "Mentored"], relatedCourses: ["python-programming", "cpp-programming", "javascript", "java-programming"] },
    ],
  },
  {
    id: "sql",
    title: "SQL & Databases",
    tagline: "Query, model and optimise — from first SELECT to window functions.",
    color: "amber",
    platforms: [
      { name: "SQLZoo", url: "https://www.sqlzoo.net/", description: "Interactive browser SQL exercises with instant feedback on real datasets.", tags: ["Interactive", "Beginner"], relatedCourses: ["dbms"] },
      { name: "SQLBolt", url: "https://sqlbolt.com/", description: "Browser lessons from SELECT and filtering through joins, aggregates and schema changes.", tags: ["Interactive", "Lessons"], relatedCourses: ["dbms"] },
      { name: "PostgreSQL Exercises", url: "https://pgexercises.com/", description: "Exercises progressing from basic SELECT/WHERE through joins, aggregates, window functions and recursive queries.", tags: ["PostgreSQL", "Advanced"], relatedCourses: ["dbms"] },
      { name: "DataLemur", url: "https://datalemur.com/questions", description: "Interview-oriented SQL, statistics and Python questions with company-labelled problems.", tags: ["Interviews", "Analytics"], relatedCourses: ["dbms"] },
      { name: "LeetCode Database", url: "https://leetcode.com/problemset/database/", description: "SQL interview questions sorted by difficulty and acceptance rate.", tags: ["Interviews"], relatedCourses: ["dbms"] },
      { name: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql", description: "Structured SQL domains from basic selects to advanced joins and aggregation.", tags: ["Structured", "Certification"], relatedCourses: ["dbms"] },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    tagline: "Build real interfaces and full-stack apps against professional briefs.",
    color: "cyan",
    platforms: [
      { name: "Frontend Mentor", url: "https://www.frontendmentor.io/challenges", description: "Professional design briefs and challenges across HTML/CSS, JavaScript, React and full-stack — 100+ challenges with structured learning paths.", tags: ["Design briefs", "React"], relatedCourses: ["javascript", "react-js"] },
      { name: "The Odin Project", url: "https://www.theodinproject.com/", description: "Full-stack project-driven curriculum: HTML/CSS, JavaScript, React, Node/PostgreSQL and getting-hired material.", tags: ["Curriculum", "Full-stack"], relatedCourses: ["javascript", "react-js", "backend-express"] },
      { name: "roadmap.sh Projects", url: "https://roadmap.sh/projects", description: "Tiered real-world project specs across frontend, backend, DevOps and more.", tags: ["Project specs", "All levels"], relatedCourses: ["javascript", "react-js", "backend-express", "system-design"] },
      { name: "JavaScript30", url: "https://javascript30.com/", description: "30 vanilla-JS build challenges — no frameworks, no libraries, pure fundamentals.", tags: ["Vanilla JS", "Drills"], relatedCourses: ["javascript"] },
      { name: "Frontend Practice", url: "https://www.frontendpractice.com/", description: "Rebuild real websites and product pages to sharpen layout and CSS skills.", tags: ["CSS", "Clones"], relatedCourses: ["javascript", "react-js"] },
    ],
  },
  {
    id: "system-design",
    title: "System Design",
    tagline: "Architect for scale — learn a concept, design a system, defend trade-offs.",
    color: "rose",
    platforms: [
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", description: "The open-source scalability & architecture study guide with exercises and flashcards.", tags: ["Open source", "Comprehensive"], relatedCourses: ["system-design"] },
      { name: "DesignGurus", url: "https://www.designgurus.io/", description: "Grokking-style system design walkthroughs and interview patterns.", tags: ["Interviews"], relatedCourses: ["system-design"] },
      { name: "System Design Interview", url: "https://www.systemdesigninterview.com/", description: "Deep-dive design write-ups for real production systems.", tags: ["Case studies"], relatedCourses: ["system-design"] },
      { name: "ByteByteGo Blog", url: "https://blog.bytebytego.com/", description: "Visual explanations of distributed systems concepts from the ByteByteGo team.", tags: ["Visual", "Concepts"], relatedCourses: ["system-design"] },
    ],
  },
  {
    id: "linux-devops",
    title: "Linux & DevOps",
    tagline: "Break real servers, fix them, and ship containers with confidence.",
    color: "lime",
    platforms: [
      { name: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", description: "The classic Linux CLI & SSH wargame — level up by solving shell challenges.", tags: ["CLI", "Wargame"], relatedCourses: ["operating-systems", "computer-networks"] },
      { name: "SadServers", url: "https://sadservers.com/", description: "Troubleshoot real broken Linux VMs — scenarios span Bash, web servers, databases, Docker, Kubernetes, IaC and observability.", tags: ["Debugging", "Scenarios"], relatedCourses: ["operating-systems", "docker", "kubernetes"] },
      { name: "Killercoda", url: "https://killercoda.com/", description: "Interactive Kubernetes & Docker sandboxes running real clusters in the browser.", tags: ["Kubernetes", "Sandbox"], relatedCourses: ["kubernetes", "docker"] },
      { name: "Linux Journey", url: "https://linuxjourney.com/", description: "Gentle, gamified Linux fundamentals — from the shell to networking and packages.", tags: ["Beginner", "Gamified"], relatedCourses: ["operating-systems"] },
      { name: "Play with Docker", url: "https://labs.play-with-docker.com/", description: "Spin up disposable Docker labs in the browser — no local setup needed.", tags: ["Docker", "Labs"], relatedCourses: ["docker"] },
      { name: "KodeKloud Playgrounds", url: "https://kodekloud.com/", description: "Hands-on playgrounds for Kubernetes, Docker, Linux, Ansible and more.", tags: ["Playgrounds", "DevOps"], relatedCourses: ["kubernetes", "docker", "mlops"] },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Learn offensive and defensive security in legal, guided labs.",
    color: "red",
    platforms: [
      { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", description: "Free interactive web-security labs covering injection, auth, SSRF, access control and more.", tags: ["Web security", "Labs"], relatedCourses: ["cryptography", "computer-networks"] },
      { name: "TryHackMe", url: "https://tryhackme.com/", description: "Browser-based interactive labs and guided paths — Pre Security, Cyber Security 101, Jr Pentester, SOC L1, DevSecOps and AI Security.", tags: ["Guided paths", "Beginner-friendly"], relatedCourses: ["cryptography", "computer-networks"] },
      { name: "picoCTF", url: "https://picoctf.org/", description: "CMU's CTF with the picoGym — a noncompetitive practice area of past and fresh challenges.", tags: ["CTF", "Student-friendly"], relatedCourses: ["cryptography"] },
      { name: "OverTheWire", url: "https://overthewire.org/", description: "Wargames covering Linux, networking and security fundamentals through self-contained levels.", tags: ["Wargames", "CLI"], relatedCourses: ["cryptography", "operating-systems"] },
      { name: "Hack The Box", url: "https://www.hackthebox.com/", description: "Realistic penetration-testing labs and machines for intermediate to advanced learners.", tags: ["Pentesting", "Advanced"], relatedCourses: ["cryptography"] },
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    tagline: "Train models, join competitions, ship notebooks — learn by doing.",
    color: "violet",
    platforms: [
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", description: "Practical micro-courses on Python, data science, NLP, model evaluation, computer vision and generative AI.", tags: ["Micro-courses", "Free GPU"], relatedCourses: ["machine-learning", "python-programming"] },
      { name: "Kaggle Competitions", url: "https://www.kaggle.com/competitions", description: "Real ML competitions with leaderboards, public notebooks and community solutions.", tags: ["Competitions", "Tabular/CV/NLP"], relatedCourses: ["machine-learning", "neural-networks"] },
      { name: "Hugging Face Learn", url: "https://huggingface.co/learn", description: "Official courses on Transformers, Agents, Diffusion, Audio and LLM engineering.", tags: ["LLMs", "Transformers"], relatedCourses: ["neural-networks", "agentic-ai"] },
      { name: "Papers With Code", url: "https://paperswithcode.com/", description: "State-of-the-art papers paired with open-source implementations and benchmarks.", tags: ["Research", "Code"], relatedCourses: ["neural-networks", "machine-learning"] },
      { name: "Google Colab", url: "https://colab.research.google.com/", description: "Free cloud notebooks with GPU/TPU — the fastest way to run training experiments.", tags: ["Notebooks", "GPU"], relatedCourses: ["neural-networks", "machine-learning", "cuda-programming"] },
      { name: "DrivenData", url: "https://www.drivendata.org/", description: "Data-science competitions with a social-impact focus.", tags: ["Competitions", "Impact"], relatedCourses: ["machine-learning"] },
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    tagline: "Move, transform and warehouse data with production tooling.",
    color: "sky",
    platforms: [
      { name: "DataTalksClub", url: "https://datatalks.club/", description: "Free community Zoomcamps (the same team behind our MLOps & DE courses) plus talks and events.", tags: ["Community", "Zoomcamps"], relatedCourses: ["data-engineering", "mlops"] },
      { name: "dbt Learn", url: "https://courses.getdbt.com/", description: "Official dbt fundamentals and advanced courses — free certification tracks.", tags: ["dbt", "Analytics engineering"], relatedCourses: ["data-engineering"] },
      { name: "BigQuery Public Datasets", url: "https://cloud.google.com/bigquery/public-data", description: "Petabytes of real public data to practise SQL at scale, free within sandbox limits.", tags: ["BigQuery", "SQL at scale"], relatedCourses: ["data-engineering", "dbms"] },
      { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", description: "Analytics-focused SQL tutorial from basics to window functions and query optimization.", tags: ["Analytics", "Intermediate"], relatedCourses: ["dbms", "data-engineering"] },
    ],
  },
  {
    id: "embedded",
    title: "Embedded & IoT",
    tagline: "Simulate circuits, flash microcontrollers and talk to hardware.",
    color: "orange",
    platforms: [
      { name: "Wokwi", url: "https://wokwi.com/", description: "Online simulator for ESP32, STM32 and Arduino — build and test circuits without hardware.", tags: ["Simulator", "ESP32/Arduino"], relatedCourses: ["embedded-c", "8-bit-computer"] },
      { name: "Tinkercad Circuits", url: "https://www.tinkercad.com/circuits", description: "Beginner-friendly circuit simulation and Arduino code blocks in the browser.", tags: ["Circuits", "Beginner"], relatedCourses: ["embedded-c", "8-bit-computer"] },
      { name: "Arduino Docs", url: "https://docs.arduino.cc/", description: "Official Arduino reference, tutorials and board documentation.", tags: ["Reference", "Tutorials"], relatedCourses: ["embedded-c"] },
      { name: "PlatformIO", url: "https://platformio.org/", description: "Professional embedded toolchain — multi-platform builds, debugging and CI for firmware.", tags: ["Toolchain", "VS Code"], relatedCourses: ["embedded-c"] },
    ],
  },
];
