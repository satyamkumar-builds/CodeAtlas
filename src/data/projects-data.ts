// CodeAtlas — Projects library: what you can build after each domain.
// Briefs are written in the spirit of roadmap.sh tiered project specs.
export interface ProjectIdea {
  id: string;
  title: string;
  domain: "Web" | "Backend" | "DSA & Algorithms" | "AI / ML" | "Data" | "DevOps & Cloud" | "Systems";
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  brief: string;
  skills: string[];
  relatedCourses: string[];
  source?: string;
}

export const PROJECTS: ProjectIdea[] = [
  // ---- Web ----
  { id: "portfolio", title: "Developer Portfolio Website", domain: "Web", level: "Beginner", brief: "A personal site listing your projects, skills and contact links. Focus on semantic HTML, responsive layout and clean typography. Deploy it and use it as your CV link.", skills: ["HTML", "CSS", "Responsive design", "Deployment"], relatedCourses: ["javascript"], source: "roadmap.sh" },
  { id: "bg-changer", title: "Theme & Background Changer", domain: "Web", level: "Beginner", brief: "A small React app that switches themes and persists the choice in localStorage. Practices state, effects and conditional styling without heavy tooling.", skills: ["React", "useState", "localStorage"], relatedCourses: ["react-js"] },
  { id: "expense-tracker", title: "Expense Tracker with Charts", domain: "Web", level: "Intermediate", brief: "Track income/expenses with categories, filters and monthly summaries rendered as charts. Add persistence and form validation.", skills: ["React", "State architecture", "Charts", "Validation"], relatedCourses: ["react-js", "javascript"] },
  { id: "kanban", title: "Real-time Kanban Board", domain: "Web", level: "Advanced", brief: "Drag-and-drop task board with live sync across clients, optimistic updates and conflict handling. A genuine full-stack challenge.", skills: ["React", "WebSockets", "DnD", "Backend sync"], relatedCourses: ["react-js", "backend-express"], source: "Frontend Mentor style brief" },
  { id: "ecommerce", title: "E-commerce Storefront", domain: "Web", level: "Advanced", brief: "Product catalogue, cart, checkout flow and order history — with auth and role-based admin. Design the data model before writing code.", skills: ["Full-stack", "Auth", "Payments flow", "DB modelling"], relatedCourses: ["react-js", "backend-express", "dbms"], source: "roadmap.sh" },

  // ---- Backend ----
  { id: "short-url", title: "URL Shortener Service", domain: "Backend", level: "Intermediate", brief: "Design the API, storage and redirect path for a shortener with click analytics. The classic first distributed-systems design exercise.", skills: ["REST design", "Hashing", "Caching", "Analytics"], relatedCourses: ["backend-express", "system-design"], source: "roadmap.sh" },
  { id: "rate-limiter", title: "API Gateway with Rate Limiting", domain: "Backend", level: "Advanced", brief: "Build a middleware gateway that throttles by token bucket, supports API keys and returns correct 429 semantics. Benchmark it.", skills: ["Middleware", "Token bucket", "Redis-style stores", "Load testing"], relatedCourses: ["backend-express", "system-design"] },
  { id: "chat-server", title: "Real-time Chat Backend", domain: "Backend", level: "Advanced", brief: "Socket-based chat with rooms, presence, message persistence and offline catch-up. Design the event schema carefully.", skills: ["WebSockets", "Presence", "Persistence", "Scaling"], relatedCourses: ["backend-express", "system-design"], source: "roadmap.sh" },
  { id: "notification", title: "Distributed Notification System", domain: "Backend", level: "Expert", brief: "A queue-backed fan-out service delivering email/push/webhooks with retries, deduplication and delivery tracking. Document the failure modes.", skills: ["Queues", "Fan-out", "Retries", "Idempotency"], relatedCourses: ["system-design", "backend-express"], source: "roadmap.sh" },

  // ---- DSA ----
  { id: "algo-visualizer", title: "Algorithm Visualizer", domain: "DSA & Algorithms", level: "Intermediate", brief: "Animate sorting, pathfinding and binary search step by step with speed controls. Teaching something is the fastest way to master it.", skills: ["Algorithms", "Animation", "State machines"], relatedCourses: ["dsa-complete", "algorithms-intuition"] },
  { id: "cp-tracker", title: "Competitive Programming Notebook", domain: "DSA & Algorithms", level: "Beginner", brief: "A structured repo of your solutions to CSES + Striver A2Z with complexity notes per problem. Consistency over intensity.", skills: ["Git", "Complexity analysis", "Documentation"], relatedCourses: ["dsa-complete"] },
  { id: "text-search", title: "Full-text Search Engine (mini)", domain: "DSA & Algorithms", level: "Advanced", brief: "Implement inverted indexing, TF-IDF ranking and prefix search over a corpus. Then compare against a naive baseline.", skills: ["Tries", "Ranking", "Benchmarking"], relatedCourses: ["dsa-complete", "algorithms-intuition"] },

  // ---- AI/ML ----
  { id: "titanic", title: "First Kaggle Submission", domain: "AI / ML", level: "Beginner", brief: "Complete EDA, feature engineering and a baseline model on the Titanic or House Prices dataset. Learn the submission workflow end to end.", skills: ["Pandas", "EDA", "sklearn", "Kaggle flow"], relatedCourses: ["machine-learning", "python-programming"], source: "Kaggle" },
  { id: "gradcam", title: "Image Classifier with Explainability", domain: "AI / ML", level: "Advanced", brief: "Train a CNN (or fine-tune one), then overlay Grad-CAM heatmaps to explain predictions. Deploy as a small API.", skills: ["PyTorch", "Transfer learning", "Grad-CAM", "Serving"], relatedCourses: ["neural-networks", "machine-learning"] },
  { id: "rag-app", title: "RAG Q&A over Your Own Notes", domain: "AI / ML", level: "Advanced", brief: "Chunk, embed and index personal documents; answer questions with citations. Add evaluation: faithfulness and retrieval hit-rate.", skills: ["Embeddings", "Vector store", "LangGraph", "Evaluation"], relatedCourses: ["agentic-ai", "neural-networks"] },
  { id: "agent-workflow", title: "Multi-agent Research Assistant", domain: "AI / ML", level: "Expert", brief: "A LangGraph workflow where planner, searcher, critic and writer agents collaborate with checkpoints and human-in-the-loop review.", skills: ["LangGraph", "Tool use", "State graphs", "Checkpointing"], relatedCourses: ["agentic-ai"] },
  { id: "ml-pipeline", title: "End-to-end ML Pipeline with Drift Monitoring", domain: "AI / ML", level: "Expert", brief: "Track experiments with MLflow, orchestrate retraining, version data and model, and alert on feature drift. Reuse the MLOps Zoomcamp stack.", skills: ["MLflow", "Orchestration", "Monitoring", "CI/CD"], relatedCourses: ["mlops"], source: "MLOps Zoomcamp final project" },
  { id: "rl-grid", title: "RL Agent that Learns a Game", domain: "AI / ML", level: "Advanced", brief: "Implement Q-learning then policy gradients on Gridworld / CartPole. Plot learning curves and compare hyperparameters honestly.", skills: ["MDPs", "Q-learning", "NumPy", "Experiment tracking"], relatedCourses: ["reinforcement-learning"] },

  // ---- Data ----
  { id: "nyc-taxi", title: "NYC Taxi Analytics Warehouse", domain: "Data", level: "Intermediate", brief: "Ingest the public taxi dataset, model it in BigQuery with dbt, and publish a dashboard. The DE Zoomcamp's flagship path.", skills: ["BigQuery", "dbt", "Data modelling", "Dashboards"], relatedCourses: ["data-engineering"], source: "DE Zoomcamp project" },
  { id: "streaming-pipeline", title: "Streaming Pipeline with Kafka + Spark", domain: "Data", level: "Advanced", brief: "Produce events, consume with structured streaming, write to a warehouse and monitor lag. Include exactly-once reasoning in your writeup.", skills: ["Kafka", "Spark", "Streaming", "Monitoring"], relatedCourses: ["data-engineering"] },
  { id: "sql-analytics", title: "SQL Analytics Case Study", domain: "Data", level: "Beginner", brief: "Pick a public dataset and answer 20 business questions in pure SQL — joins, windows, CTEs. Publish the notebook.", skills: ["SQL", "CTEs", "Window functions"], relatedCourses: ["dbms"], source: "DataLemur style" },

  // ---- DevOps & Cloud ----
  { id: "dockerize", title: "Dockerise & Compose a Full App", domain: "DevOps & Cloud", level: "Beginner", brief: "Containerise a web app + database + cache, wire them with Compose, and write a healthcheck-based startup order.", skills: ["Docker", "Compose", "Networking basics"], relatedCourses: ["docker"] },
  { id: "k8s-deploy", title: "Deploy on Kubernetes with CI/CD", domain: "DevOps & Cloud", level: "Advanced", brief: "Cluster on a cloud sandbox, manifests with probes and resource limits, ingress, secrets, and a GitHub Actions pipeline to deploy on merge.", skills: ["Kubernetes", "Ingress", "Secrets", "CI/CD"], relatedCourses: ["kubernetes", "docker"] },
  { id: "infra-lab", title: "SadServers-style Incident Runbook", domain: "DevOps & Cloud", level: "Intermediate", brief: "Work 10 SadServers scenarios, then write your own debugging runbook: symptoms, checks, fixes. Turns practice into a reference.", skills: ["Linux", "Diagnosis", "Documentation"], relatedCourses: ["operating-systems", "docker"], source: "SadServers" },

  // ---- Systems ----
  { id: "shell", title: "Mini Unix Shell in C", domain: "Systems", level: "Advanced", brief: "Parsing, fork/exec, pipes, I/O redirection and signal handling — the CS50 graduation project for systems folks.", skills: ["C", "Processes", "Syscalls"], relatedCourses: ["computer-fundamentals", "operating-systems"] },
  { id: "malloc", title: "Custom Memory Allocator", domain: "Systems", level: "Expert", brief: "Implement malloc/free with free-lists, splitting and coalescing. Benchmark against system malloc and explain the trade-offs.", skills: ["C", "Memory", "Benchmarking"], relatedCourses: ["computer-fundamentals", "operating-systems"] },
  { id: "emulator", title: "8-bit CPU Emulator", domain: "Systems", level: "Expert", brief: "Software-emulate the Ben Eater machine: registers, ALU, flags, microcode stepping. Then write a program that runs on it.", skills: ["Digital logic", "Emulation", "Microcode"], relatedCourses: ["8-bit-computer"] },
  { id: "cuda-matmul", title: "Optimised CUDA Matrix Multiply", domain: "Systems", level: "Expert", brief: "Naive → shared-memory tiling → vectorised. Chart GFLOPs at each stage and explain the memory hierarchy story.", skills: ["CUDA", "Tiling", "Profiling"], relatedCourses: ["cuda-programming"] },
  { id: "http-server", title: "HTTP/1.1 Server from Scratch", domain: "Systems", level: "Advanced", brief: "Socket server serving static files with correct headers, keep-alive and graceful concurrency. Load-test it and find the bottleneck.", skills: ["Sockets", "HTTP", "Concurrency"], relatedCourses: ["computer-networks", "system-design"] },
];
