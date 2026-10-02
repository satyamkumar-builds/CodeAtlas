// CodeAtlas — Roadmaps: staged journeys through the course catalog
export interface RoadmapStage {
  title: string;
  description: string;
  courseIds: string[]; // course ids, in suggested order
  practiceHint?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  subtitle: string;
  audience: string;
  stages: RoadmapStage[];
}

export const ROADMAPS: Roadmap[] = [
  {
    id: "cse-foundation",
    title: "CSE Foundation",
    subtitle: "The classic computer-science spine — programming through system design.",
    audience: "B.Tech / CS students who want the full degree-level backbone, in order.",
    stages: [
      { title: "Programming", description: "Get fluent in one systems language and one general-purpose language. Think in loops, functions and data before touching frameworks.", courseIds: ["cpp-programming", "python-programming"], practiceHint: "Exercism + Codewars drills after every module" },
      { title: "OOP", description: "Objects, inheritance, polymorphism and design habits that scale beyond toy problems.", courseIds: ["cpp-programming", "java-programming"], practiceHint: "Refactor small projects into clean class hierarchies" },
      { title: "DSA", description: "The interview-defining skill. Follow Striver A2Z in order and solve alongside every lecture.", courseIds: ["dsa-complete", "algorithms-intuition"], practiceHint: "LeetCode + CSES — warm-up, core, interview sets per lesson" },
      { title: "DBMS", description: "Relational modelling, normalization, transactions and SQL fluency.", courseIds: ["dbms"], practiceHint: "SQLBolt then PostgreSQL Exercises" },
      { title: "OS", description: "Processes, scheduling, deadlocks, memory and file systems — how software meets hardware.", courseIds: ["operating-systems"], practiceHint: "OverTheWire Bandit for real shell comfort" },
      { title: "Networks", description: "From OSI layers to TCP internals, subnetting and application protocols.", courseIds: ["computer-networks"], practiceHint: "Trace a real request in DevTools networking tab" },
      { title: "System Design", description: "Scale single machines into distributed systems — caching, sharding, queues and trade-offs.", courseIds: ["system-design"], practiceHint: "Design one system per week on paper; study one case study" },
    ],
  },
  {
    id: "fullstack-web",
    title: "Full-Stack Web Developer",
    subtitle: "From DOM basics to deployed, authenticated, real-time applications.",
    audience: "Self-taught devs and students targeting product engineering roles.",
    stages: [
      { title: "JavaScript", description: "The language of the web — types, closures, DOM, events, fetch and async patterns.", courseIds: ["javascript"], practiceHint: "JavaScript30 challenges alongside every module" },
      { title: "React", description: "Components, hooks, state management and data fetching — build real projects early.", courseIds: ["react-js"], practiceHint: "Frontend Mentor briefs after each project video" },
      { title: "Backend & APIs", description: "Node, Express, REST design, databases, auth and file handling.", courseIds: ["backend-express"], practiceHint: "Odin Project exercises; design one API from scratch" },
      { title: "Databases", description: "SQL modelling and querying — the layer most self-taught devs skip.", courseIds: ["dbms"], practiceHint: "DataLemur SQL interview set" },
      { title: "Docker & Deployment", description: "Containerise the app, compose services, ship it.", courseIds: ["docker"], practiceHint: "Play with Docker labs" },
      { title: "System Design for Web", description: "Caching, CDNs, load balancing and queues behind real products.", courseIds: ["system-design"], practiceHint: "Sketch the architecture of your own deployed app at 100× traffic" },
    ],
  },
  {
    id: "ai-engineer",
    title: "AI & Machine Learning Engineer",
    subtitle: "Maths → models → agents → production ML systems.",
    audience: "Engineers heading toward ML, GenAI and applied-AI roles.",
    stages: [
      { title: "Python", description: "Idiomatic Python — the lingua franca of ML.", courseIds: ["python-programming"], practiceHint: "Kaggle Learn Python track" },
      { title: "Maths for ML", description: "Vectors, matrices, transformations and eigen intuition behind every model.", courseIds: ["linear-algebra"], practiceHint: "Recreate 3B1B visuals in NumPy" },
      { title: "Classical ML", description: "Regression, trees, boosting, clustering and evaluation — done properly.", courseIds: ["machine-learning"], practiceHint: "Kaggle playground competitions" },
      { title: "Deep Learning", description: "Build backprop, makemore and GPT from scratch with Karpathy — no black boxes.", courseIds: ["neural-networks"], practiceHint: "Re-implement each lecture from scratch in Colab" },
      { title: "Agentic AI & LLMs", description: "LangGraph, tool use, RAG, memory and multi-agent workflows.", courseIds: ["agentic-ai"], practiceHint: "Hugging Face agents course; ship one RAG app" },
      { title: "MLOps", description: "Track experiments, version models, monitor drift, automate deployment.", courseIds: ["mlops"], practiceHint: "Run the full Zoomcamp pipeline on your own model" },
      { title: "Data Engineering (support)", description: "Pipelines and warehouses that feed production models.", courseIds: ["data-engineering"], practiceHint: "dbt Learn fundamentals" },
    ],
  },
  {
    id: "low-level-systems",
    title: "Low-Level & Systems",
    subtitle: "Transistors to GPU kernels — understand computing from the metal up.",
    audience: "Systems-curious engineers; embedded, HPC and performance enthusiasts.",
    stages: [
      { title: "CS Fundamentals", description: "C, memory, pointers and how programs really run.", courseIds: ["computer-fundamentals"], practiceHint: "Re-do every CS50 lab without the walkthrough" },
      { title: "Build a CPU", description: "Clock, latches, ALU, RAM — build an 8-bit computer one wire at a time.", courseIds: ["8-bit-computer"], practiceHint: "Simulate each module in Wokwi/Tinkercad" },
      { title: "Computer Architecture", description: "Instructions, addressing modes, cache and pipelines.", courseIds: ["computer-architecture"], practiceHint: "Derive pipeline speedups by hand" },
      { title: "Operating Systems", description: "The software layer that tames hardware.", courseIds: ["operating-systems"], practiceHint: "SadServers scenarios" },
      { title: "Embedded C", description: "Bare-metal programming — registers, build process and the C standard library on MCUs.", courseIds: ["embedded-c"], practiceHint: "Wokwi STM32 sims; blink without HAL" },
      { title: "GPU & CUDA", description: "Kernels, warps, shared memory and massively parallel thinking.", courseIds: ["cuda-programming"], practiceHint: "Implement matmul 3 ways; benchmark on Colab GPU" },
      { title: "Networks (bonus)", description: "How systems talk — protocols end to end.", courseIds: ["computer-networks"], practiceHint: "tcpdump your own traffic" },
    ],
  },
];
