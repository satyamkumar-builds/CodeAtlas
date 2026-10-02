import type { CourseMeta } from "./types";

// Curated metadata — courses 17–24
export const COURSE_META_3: Record<string, CourseMeta> = {
  "react-js": {
    shortTitle: "React",
    description:
      "Chai aur Code's React series (Hindi) — component thinking, hooks, state management and real projects including a full Appwrite-powered app. It teaches React the way teams actually use it: functional components only, hooks everywhere, and projects that end in production deployment. The natural next step after the JavaScript course in this catalog.",
    learn: [
      "Component architecture: props, composition, and the JSX mental model",
      "State with useState, and controlled forms/inputs",
      "useEffect: dependencies, cleanup, and data fetching done right",
      "useRef, useCallback, useMemo and custom hooks",
      "Context API + useReducer for app-level state",
      "React Router, project structure patterns, and connecting to backend-as-a-service (Appwrite)",
      "Building, env variables, CORS and production deployment",
    ],
    prereqs: ["JavaScript fluency (closures, arrays, promises, modules)", "HTML/CSS comfort", "Node + npm installed"],
    notes: [
      {
        heading: "The component mental model",
        points: [
          "UI = f(state). Your job is to model state correctly; rendering is React's job. Most 'React bugs' are actually state-modelling bugs.",
          "Props flow down; events flow up. Siblings never talk directly — lift shared state to the closest common parent or context.",
          "Keys in lists must be stable identities (ids), not array indices — index keys break when items reorder.",
          "Compose small components; premature abstraction ('atomic design everything') causes more pain than it solves at this stage.",
        ],
      },
      {
        heading: "Hooks — the rules and the reasons",
        points: [
          "useState: the setter is asynchronous-batched; functional updates (prev => prev+1) avoid stale closures.",
          "useEffect deps: [] = mount, [a] = when a changes, no deps = every render. Return a cleanup for subscriptions/timers. Double-invoke in StrictMode is intentional.",
          "Data fetching: fetch inside effect with an ignore flag, or use a library (TanStack Query) — never fire-and-forget async in render.",
          "useMemo caches computed values, useCallback caches function identities — for passing stable callbacks to memoised children, not as perfume everywhere.",
          "Custom hooks (useLocalStorage, useFetch, useDebounce) are just functions using other hooks — the reuse story that replaced HOCs.",
        ],
      },
      {
        heading: "Real app patterns (from the projects)",
        points: [
          "Context + useReducer covers 90% of state management needs; reach for Redux/Zustand only when prop-drilling genuinely hurts.",
          "Appwrite (or any BaaS) gives auth/database/storage: learn the auth flow (session vs JWT) since you'll rebuild it on your own backend later.",
          "Env variables in Vite/CRA must start with the right prefix and are PUBLIC by design — never ship secrets to the frontend.",
          "CORS is a browser policy, not a bug: it's configured on the server. Understanding this saves hours of confusion.",
          "Production build ≠ dev build: test `npm run build` + preview before deploying; check bundle sizes and lazy-load routes.",
        ],
      },
    ],
    practice: [
      { label: "Frontend Mentor", url: "https://www.frontendmentor.io/challenges", note: "Professional briefs with Figma files — build each in React after learning the basics." },
      { label: "roadmap.sh React projects", url: "https://roadmap.sh/projects", note: "Tiered specs: todo → weather → kanban → e-commerce." },
      { label: "JavaScript30", url: "https://javascript30.com/", note: "Keep vanilla skills sharp — they transfer directly into React." },
    ],
    projects: [
      { title: "Theme & Background Changer", level: "Beginner", brief: "useState + localStorage + conditional classes — the course's starter project, extended with multiple themes." },
      { title: "Full-featured Blog with Appwrite", level: "Advanced", brief: "Auth, rich-text editor, CRUD posts, loading states and deployment — the course's capstone path." },
      { title: "Real-time Kanban Board", level: "Advanced", brief: "Drag-and-drop + optimistic updates + backend sync (pair with the Backend course)." },
    ],
  },

  "backend-express": {
    shortTitle: "Backend",
    description:
      "Chai aur Code's Backend series (Hindi) — Node.js, Express, MongoDB and the full architecture of a production-style API: routers, controllers, models, middleware, auth with JWT, file uploads, error handling and deployment. It's the 'how real backends are structured' course that most tutorials skip. Pairs perfectly with the React course for full-stack capability.",
    learn: [
      "Node.js runtime, npm, modules and the request/response lifecycle",
      "Express: routing, middleware chains, and MVC-ish folder architecture",
      "MongoDB + Mongoose: schemas, models, relations (ref) and queries",
      "REST API design: resources, status codes, pagination, filtering",
      "Authentication: bcrypt password hashing, JWT access/refresh tokens, cookies",
      "Authorization, role checks, and protecting routes with middleware",
      "File uploads (multer), error handling, logging, env config and deployment",
    ],
    prereqs: ["JavaScript fundamentals (the JS course here)", "Basic HTTP knowledge (methods, status codes)", "MongoDB Atlas or local install"],
    notes: [
      {
        heading: "Node & Express fundamentals",
        points: [
          "Node is single-threaded with an event loop — I/O concurrency without threads; CPU-heavy work blocks everything (that's what workers/clusters are for).",
          "Middleware is just functions in a chain: req → [mw1, mw2, route] → res. Auth, logging, parsing and error handling are all middleware.",
          "Routing: app.use('/api/users', userRouter) — compose routers per resource; keep route files thin, logic in controllers.",
          "async/await errors don't reach Express automatically (v4) — wrap with try/catch or an asyncHandler; Express 5 handles rejected promises natively.",
        ],
      },
      {
        heading: "Data layer with Mongoose",
        points: [
          "Schema defines shape + validation; Model adds queries. Validate at the boundary — bad data should die at the model, not in business logic.",
          "References (ref) + .populate() emulate joins; embed vs reference is THE MongoDB design decision: embed what's read together, reference what grows unbounded.",
          "Indexes on frequently queried fields; explain() shows whether queries use them. Unindexed queries scan everything.",
          "Never store plain-text passwords: bcrypt with salt rounds (10-12); compare with bcrypt.compare only.",
        ],
      },
      {
        heading: "Auth & security essentials",
        points: [
          "JWT flow: login → sign access token (short life) + refresh token (long life, stored httpOnly) → verify via middleware on protected routes.",
          "httpOnly, secure, sameSite cookie flags — each closes a class of attack (XSS script theft, CSRF).",
          "Authorization ≠ authentication: check WHO they are once, then check WHAT they may do on every sensitive operation.",
          "Input validation (zod/joi/express-validator), rate limiting and helmet headers are the cheap 80% of API security.",
        ],
      },
      {
        heading: "Production habits",
        points: [
          "Config via env vars + dotenv; 12-factor style — same code, different envs.",
          "Central error handler middleware: pass errors with next(err), respond with status + message, log stack server-side only.",
          "Structured logging (morgan/pino), graceful shutdown (SIGTERM → close server → close DB), and health endpoints for uptime checks.",
          "Deploy: build artifacts, process manager (pm2) or platform (Railway/Render), TLS terminated at the edge — then connect your React app.",
        ],
      },
    ],
    practice: [
      { label: "The Odin Project — NodeJS path", url: "https://www.theodinproject.com/paths/full-stack-javascript", note: "Project-driven curriculum that mirrors these concepts with specs." },
      { label: "roadmap.sh Backend projects", url: "https://roadmap.sh/projects", note: "URL shortener, blog API, expense tracker — tiered briefs." },
      { label: "SQLBolt", url: "https://sqlbolt.com/", note: "MongoDB won't teach you SQL — and you need SQL. Run this in parallel." },
    ],
    projects: [
      { title: "Task Manager REST API", level: "Beginner", brief: "CRUD + validation + JWT auth + pagination. The 'hello world' of serious backend work." },
      { title: "Video Platform Backend (YouTube clone)", level: "Advanced", brief: "The course's capstone: users, channels, videos, likes, subscriptions, uploads, aggregations and clean architecture." },
      { title: "Distributed Notification System", level: "Expert", brief: "Queue-backed fan-out with retries and delivery tracking — bridge toward System Design." },
    ],
  },

  "system-design": {
    shortTitle: "System Design",
    description:
      "ByteByteGo's crash-course library (Alex Xu's team) — 100+ short videos covering every system-design building block: storage engines, caching, load balancing, consistent hashing, queues, microservices, rate limiting, plus case studies like Netflix's API evolution and Hotstar's billion-emoji scaling story. Interview gold and genuinely fun to binge.",
    learn: [
      "Core vocabulary: latency vs throughput, availability, consistency, CAP, trade-offs",
      "Storage systems: SQL vs NoSQL, indexes, replication, sharding, consistent hashing",
      "Caching: CDN, Redis patterns, cache invalidation, thundering herd",
      "Scaling patterns: load balancers, stateless services, queues, pub/sub, Kafka",
      "Microservices vs monolith, service discovery, API gateways, rate limiting",
      "Real case studies: Netflix API, Hotstar scale, YouTube/WhatsApp/Uber-style designs",
      "Interview execution: requirements → estimation → API → data model → deep dive",
    ],
    prereqs: ["Backend fundamentals (APIs, databases)", "OS & Networks courses give real leverage", "Comfort with rough arithmetic (estimations)"],
    notes: [
      {
        heading: "The framework that runs every answer",
        points: [
          "Requirements first: functional (what features) vs non-functional (scale, latency, consistency). Skipping this is the #1 interview fail.",
          "Back-of-envelope: QPS, storage/day, bandwidth. 1M users × 1KB = 1GB per action per day — practise powers of 2 and 10.",
          "API sketch → data model → high-level diagram → deep dives on 2-3 hard parts (sharding? hot keys? fan-out?).",
          "Trade-off talk wins: 'strong consistency costs latency; we relax to eventual here because likes don't need serializability' — that sentence pattern is the job.",
        ],
      },
      {
        heading: "Building blocks you'll reuse forever",
        points: [
          "Consistent hashing: minimal key movement when nodes join/leave — the reason Dynamo-style systems and CDNs scale horizontally.",
          "Cache-aside pattern + TTLs; invalidation is genuinely hard — know write-through vs write-back vs write-around.",
          "Queues decouple and absorb spikes: at-least-once delivery means consumers need idempotency. Kafka = durable ordered logs, partitions for parallelism.",
          "Sharding strategies: range vs hash vs geo; every choice has hotspots — the mitigation (salting, virtual nodes) matters more than the label.",
          "Rate limiting: token bucket vs sliding window; enforce at gateway for global view, in-service for locality.",
        ],
      },
      {
        heading: "Consistency & the real world",
        points: [
          "CAP: under partition you choose available or consistent — real systems choose per-operation (e.g. cart is AP, payments is CP).",
          "Eventual consistency is fine for feeds/likes/counts, not for money. Know where YOUR data sits on that spectrum.",
          "Replication: leader-follower for reads + failover; multi-leader adds conflict resolution pain; quorum writes (W+R>N) tune consistency.",
          "Case studies teach pattern-matching: Netflix = API composition + caching tiers; Hotstar = pre-scaling + edge delivery + backpressure; WhatsApp = Erlang and fan-out discipline.",
        ],
      },
    ],
    practice: [
      { label: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", note: "The written companion: flashcards, exercises and engineering checklists." },
      { label: "DesignGurus", url: "https://www.designgurus.io/", note: "Grokking-style structured design walkthroughs for interviews." },
      { label: "System Design Interview", url: "https://www.systemdesigninterview.com/", note: "Deep write-ups of production architectures." },
    ],
    projects: [
      { title: "Design Doc a Week", level: "Intermediate", brief: "Pick one system (URL shortener, feed, chat, payments) weekly; write requirements, estimates, diagrams, deep dives. 12 weeks = interview ready." },
      { title: "Rate-Limited API Gateway", level: "Advanced", brief: "Implement token-bucket limits, API keys and backpressure — then load-test and graph behaviour." },
    ],
  },

  docker: {
    shortTitle: "Docker",
    description:
      "TechWorld with Nana's Docker course — containers from zero to practical: images, Dockerfiles, volumes, networks and Docker Compose, taught by deploying real apps (Node, MongoDB) the DevOps way. The friendliest possible entry into modern infrastructure. 'It works on my machine' ends here.",
    learn: [
      "What containers solve: images vs containers, VMs vs containers",
      "Docker CLI: run, ps, logs, exec, and the image/container lifecycle",
      "Writing Dockerfiles: layers, caching, best practices, multi-stage builds",
      "Docker networking: port mapping, container-to-container communication",
      "Volumes & persistence: named volumes vs bind mounts",
      "Docker Compose: multi-container apps (app + database) as code",
      "Registries: tagging, pushing to Docker Hub / private repos",
    ],
    prereqs: ["Basic terminal comfort", "Any app you want to containerise (or use Nana's demo apps)", "Docker Desktop installed"],
    notes: [
      {
        heading: "Mental models",
        points: [
          "An image is a template (layers of filesystem changes); a container is a running instance of one. Images are immutable — rebuild to change.",
          "Containers are isolated processes sharing the host kernel — that's why they start in milliseconds where VMs take minutes.",
          "Every Dockerfile instruction creates a layer; order matters for cache: copy dependency manifests → install → copy the rest of the code.",
          "The container's main process must stay in the foreground (PID 1) — the container dies when it dies. That's why `node server.js` works and backgrounded scripts exit.",
        ],
      },
      {
        heading: "Dockerfile patterns that matter",
        points: [
          "Pin base image versions (node:20-alpine, not node:latest) — reproducibility is the whole point.",
          ".dockerignore like .gitignore: node_modules, .git, secrets out.",
          "Multi-stage builds: a fat builder stage (compilers, dev deps) and a slim runtime stage — images drop from gigabytes to tens of MBs.",
          "Run as non-root user (USER appuser); handle SIGTERM (graceful shutdown) since stop sends it before SIGKILL.",
        ],
      },
      {
        heading: "Persistence, networks, compose",
        points: [
          "Containers are ephemeral: data lives in volumes (managed by Docker) or bind mounts (your host paths). Databases always need volumes.",
          "Containers on the same user-defined network reach each other by service name — that's Compose's superpower (mongodb://mongo:27017 just works).",
          "Compose = one YAML for the whole stack: services, images/builds, ports, volumes, depends_on with healthchecks — dev environments as code.",
          "Push workflow: docker build -t user/app:1.0 . → docker push. Tag by semantic version, not just latest.",
        ],
      },
    ],
    practice: [
      { label: "Play with Docker", url: "https://labs.play-with-docker.com/", note: "Free browser Docker playground — no local install needed." },
      { label: "Killercoda Docker scenarios", url: "https://killercoda.com/", note: "Guided interactive scenarios." },
      { label: "KodeKloud Docker playgrounds", url: "https://kodekloud.com/", note: "Persistent-ish sandboxes for practice." },
    ],
    projects: [
      { title: "Dockerise a Full App", level: "Beginner", brief: "Node/Express API + MongoDB + Compose + healthchecks + .dockerignore + multi-stage build." },
      { title: "CI-built Image Pipeline", level: "Intermediate", brief: "GitHub Actions builds and pushes a tagged image on merge — first step of real CI/CD." },
    ],
  },

  kubernetes: {
    shortTitle: "Kubernetes",
    description:
      "TechWorld with Nana's Kubernetes course — from containerised app to orchestrated cluster: pods, deployments, services, ingress, config maps, secrets, namespaces and stateful workloads, explained with clean visuals and real deployments. K8s has a reputation for difficulty; Nana is the antidote. The natural sequel to the Docker course.",
    learn: [
      "K8s architecture: control plane (API server, etcd, scheduler, controllers) vs worker nodes (kubelet, container runtime)",
      "Pods — and why you never manage pods directly",
      "Deployments: replicas, rolling updates, rollbacks, self-healing",
      "Services: ClusterIP vs NodePort vs LoadBalancer, and DNS between services",
      "Ingress + ingress controllers for HTTP routing; external access patterns",
      "ConfigMaps & Secrets for configuration; env vars and mounted files",
      "Namespaces, resource requests/limits, and stateful apps (StatefulSets, volumes)",
    ],
    prereqs: ["Docker fundamentals (the Docker course here)", "Basic YAML reading", "Terminal comfort; kubectl + a sandbox cluster"],
    notes: [
      {
        heading: "Architecture in plain words",
        points: [
          "You declare desired state in YAML; controllers continuously reconcile actual → desired. That loop is the entire philosophy of K8s.",
          "API server is the front door (everything goes through it); etcd stores cluster state; scheduler assigns pods to nodes; kubelet runs them.",
          "Pods are mortal. Labels + selectors (not names) are how components find each other — service → pods via label matching.",
          "Deployments manage ReplicaSets manage Pods — three layers so rollbacks are instant (the old ReplicaSet is kept).",
        ],
      },
      {
        heading: "Networking model",
        points: [
          "Every pod gets a cluster-unique IP; all pods can talk to all pods by default (network policy locks this down when needed).",
          "ClusterIP = internal virtual IP + DNS name (my-svc.my-ns.svc.cluster.local). NodePort opens a port on every node; LoadBalancer provisions cloud LB.",
          "Ingress is the HTTP router in front of services — host/path based rules, TLS termination, and it needs a controller (nginx/traefik) installed.",
          "Requests between services get DNS + load balancing free; headless services (clusterIP: None) expose pod IPs for StatefulSets.",
        ],
      },
      {
        heading: "Config, secrets & production hygiene",
        points: [
          "ConfigMaps for non-secret config, Secrets for sensitive data (base64 ≠ encryption — pair with external secret managers in real setups).",
          "Set resource requests (scheduling) and limits (capping) — the difference between fair sharing and noisy-neighbour meltdowns.",
          "Liveness vs readiness probes: liveness restarts a wedged container; readiness removes it from service rotation without restart.",
          "StatefulSets + PersistentVolumeClaims for databases; run stateless services in K8s first, stateful later (or use managed DBs).",
          "Namespaces = logical partitions for teams/envs; quotas and RBAC live here. kubectl get all -n <ns> is your first reflex in any cluster.",
        ],
      },
    ],
    practice: [
      { label: "Killercoda Kubernetes scenarios", url: "https://killercoda.com/", note: "Free browser clusters — the fastest way to run real kubectl." },
      { label: "KodeKloud playgrounds", url: "https://kodekloud.com/", note: "Persistent sandboxes + structured labs." },
      { label: "SadServers K8s scenarios", url: "https://sadservers.com/", note: "Debug broken clusters — interview-grade practice." },
    ],
    projects: [
      { title: "Deploy Your Own App to K8s", level: "Intermediate", brief: "Take the Docker course's Compose app to a cluster: Deployment + Service + Ingress + ConfigMap + Secret." },
      { title: "CI/CD to Kubernetes", level: "Advanced", brief: "GitHub Actions → build image → push → rollout via kubectl set image; add probes and rollback demo." },
    ],
  },

  cryptography: {
    shortTitle: "Cryptography",
    description:
      "Professor Christof Paar's legendary applied cryptography lectures (Ruhr University Bochum) — a full university course on classical ciphers, block ciphers (DES/AES), stream ciphers, public-key systems (RSA, ECC, Diffie-Hellman), hash functions, digital signatures and PKI. Mathematically honest but accessible: the real theory behind every HTTPS connection you make.",
    learn: [
      "Classical cryptography and the vocabulary: confusion/diffusion, Kerckhoffs' principle",
      "Stream ciphers: LFSRs, one-time pad, and why nonce reuse is fatal",
      "Block ciphers: DES internals, AES (Rijndael), modes of operation (ECB's danger, CBC, CTR, GCM)",
      "Number theory toolkit: modular arithmetic, Euclid, Euler, primality, discrete logarithm",
      "Public-key: RSA (encryption + signatures), Diffie-Hellman, ElGamal, elliptic curves at intuition level",
      "Hash functions & MACs: SHA family, HMAC, birthday bounds",
      "Digital signatures, certificates, man-in-the-middle attacks and PKI trust chains",
    ],
    prereqs: ["Discrete Mathematics course here covers the group theory", "Basic probability", "No advanced math required — Paar builds it"],
    notes: [
      {
        heading: "Foundations to memorise",
        points: [
          "Kerckhoffs' principle: security lives in the key, never in secret algorithms. Everything public (AES) is still secure.",
          "Confusion = complex key↔ciphertext relation; diffusion = each plaintext bit affects many ciphertext bits. DES/AES are engineered mixes of both.",
          "One-time pad is information-theoretically perfect — and useless in practice because keys must be truly random and never reused.",
          "ECB mode leaks patterns (the famous penguin). Always use CBC/CTR/GCM with unique IVs/nonces.",
        ],
      },
      {
        heading: "Public-key systems",
        points: [
          "RSA: n = p·q; security = factoring hardness. Encrypt with public, decrypt with private; sign with private, verify with public — same trapdoor, two directions.",
          "Diffie-Hellman: two parties derive a shared secret over a public channel; security = discrete log hardness. Watch for MITM — it needs authentication.",
          "Hybrid encryption is how TLS works: asymmetric to exchange keys, symmetric (AES-GCM) for the session — best of both worlds.",
          "ECC gives the same security with far smaller keys (256-bit EC ≈ 3072-bit RSA) — why phones and IoT prefer it.",
        ],
      },
      {
        heading: "Integrity, signatures & trust",
        points: [
          "Hashes are one-way fingerprints: collision resistance (hard to find any collision) vs preimage resistance (hard to invert). Birthday attack sets the ~n/2 bound.",
          "MAC = hash + shared key → integrity AND authenticity between two parties; digital signature = public-key verified → integrity + non-repudiation.",
          "Certificates bind identities to keys, signed by CAs — the web-of-trust chain your browser checks on every HTTPS visit.",
          "Man-in-the-middle is the recurring villain: unauthenticated key exchange, missing cert validation, pinned-trust bypasses — every protocol lesson ends here.",
        ],
      },
    ],
    practice: [
      { label: "Cryptopals Challenges", url: "https://cryptopals.com/", note: "Implement and BREAK real crypto — the definitive hands-on companion." },
      { label: "TryHackMe cryptography rooms", url: "https://tryhackme.com/", note: "Guided labs on ciphers, hashes and PKI." },
      { label: "picoCTF", url: "https://picoctf.org/", note: "Student-friendly crypto challenges in the picoGym." },
    ],
    projects: [
      { title: "RSA from Scratch", level: "Intermediate", brief: "Keygen, encrypt/decrypt, sign/verify with big integers — then break a weak 64-bit instance." },
      { title: "Secure Channel Demo", level: "Advanced", brief: "Implement Diffie-Hellman + AES-GCM handshake in Python with a MITM demo on the unauthenticated version." },
    ],
    resourceLinks: [{ label: "Paar's textbook site (slides & quizzes)", url: "https://www.crypto-textbook.com/" }],
  },

  "linear-algebra": {
    shortTitle: "Linear Algebra",
    description:
      "3Blue1Brown's Essence of Linear Algebra — 16 visual chapters that make vectors, matrices, determinants and eigenvalues geometrically obvious. It doesn't replace a computational course; it replaces the confusion that makes every other linear algebra course fail. Required viewing before the ML and deep learning courses in this catalog.",
    learn: [
      "Vectors as arrows AND as data; linear combinations, span and basis",
      "Linear transformations — what a matrix actually IS",
      "Matrix multiplication as composed transformations (and why order matters)",
      "Determinants as area/volume scaling (and the zero-determinant collapse)",
      "Inverse matrices, column space, null space and rank",
      "Dot products (projections, duality) and cross products",
      "Eigenvectors/eigenvalues and change-of-basis",
    ],
    prereqs: ["None — only curiosity and a willingness to pause and visualise", "High-school geometry helps"],
    notes: [
      {
        heading: "The one idea that unlocks everything",
        points: [
          "A matrix is a transformation of space: each column is where a basis vector lands. Av = re-expressing v in the transformed world.",
          "Matrix multiplication = composition: AB means 'do B, then A'. That's why AB ≠ BA and why the column convention exists.",
          "Determinant = the factor by which area/volume scales. det = 0 means space collapsed to lower dimension — information destroyed, hence no inverse.",
          "Rank = dimension of column space; null space = vectors sent to zero. 'Solving Ax=0' means finding everything that the transformation kills.",
        ],
      },
      {
        heading: "The ML-relevant toolkit",
        points: [
          "Dot product measures alignment: v·w = |v||w|cosθ — it's similarity (cosine similarity in embeddings), projection, and the workhorse of every model.",
          "Eigenvectors don't rotate under the transformation, only scale — they reveal the transformation's intrinsic axes (PCA is literally this on data covariance).",
          "Change of basis: translating between coordinate systems — the heart of 'preprocessing' and every 'learned representation' in ML.",
          "Matrix-vector as weighted sums of columns: Ax = x₁a₁ + x₂a₂ + … — read it this way once and feature math stops being scary.",
        ],
      },
      {
        heading: "How to study it",
        points: [
          "Watch each chapter twice: once for the visual, once with paper — draw the transformed grid yourself.",
          "Then compute small examples by hand (2×2, 3×3) to wire intuition to arithmetic.",
          "Recreate 2-3 visualisations in NumPy/Matplotlib — teaching the machine is the strongest test of understanding.",
          "If you want computation depth afterwards: Strang's MIT 18.06 or any textbook chapter on matrix decompositions.",
        ],
      },
    ],
    practice: [
      { label: "NumPy drills (Kaggle Learn)", url: "https://www.kaggle.com/learn", note: "Turn visuals into code: transformations, dot products, eigenvalues via np.linalg." },
      { label: "MIT 18.06 (Strang)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "The computational companion course, free on MIT OCW." },
    ],
    projects: [
      { title: "2D Transformation Playground", level: "Beginner", brief: "Interactive matplotlib grid that applies rotation/shear/scale matrices; show determinant live." },
      { title: "PCA from Scratch on a Real Dataset", level: "Advanced", brief: "Covariance → eigen → projection, visualised — no sklearn. Then compare with sklearn's answer." },
    ],
  },

  "machine-learning": {
    shortTitle: "Machine Learning",
    description:
      "StatQuest's Machine Learning playlist (Josh Starmer) — the clearest explanations of ML on the internet: regression, logistic regression, trees, forests, boosting, PCA, clustering and regularization, each with 'Clearly Explained' visuals. It builds statistical intuition before code, which is exactly the order that produces engineers who know WHY their models work.",
    learn: [
      "ML vocabulary: features, targets, training vs testing, bias-variance trade-off",
      "Linear & multiple regression, including the statistics underneath (R², p-values, confidence)",
      "Logistic regression, ROC/AUC, confusion matrices and proper evaluation",
      "Regularization: ridge, lasso, elastic net — why they exist and how λ behaves",
      "Trees, random forests, AdaBoost, Gradient Boost, XGBoost and CatBoost",
      "Unsupervised: PCA (step-by-step), k-means, hierarchical clustering, t-SNE",
      "Feature engineering: one-hot, target and k-fold target encoding; handling imbalanced data",
      "Neural network foundations and the bridge to deep learning",
    ],
    prereqs: ["Python basics (the Python course here)", "High-school algebra; the Linear Algebra course helps a lot", "No statistics background needed — it's built in"],
    notes: [
      {
        heading: "The statistical spine",
        points: [
          "Least squares finds the line minimising squared residuals — squared because it penalises outliers and makes calculus clean.",
          "R² = variance explained. p-values answer 'how surprising is this under the null' — Starmer's dedicated videos make these honest rather than ritual.",
          "Bias-variance: underfit (high bias) vs overfit (high variance) — the entire craft is managing this with complexity, data and regularization.",
          "Always hold out a test set BEFORE looking at models; cross-validation inside the training set estimates performance honestly.",
        ],
      },
      {
        heading: "Trees & boosting (the tabular kings)",
        points: [
          "Decision trees ask greedy questions maximising purity (Gini/entropy); they overfit alone but shine ensembled.",
          "Random forest = bagging + random feature subsets → variance reduction. Gradient boosting = sequential trees fitting residuals → bias reduction.",
          "XGBoost/LightGBM/CatBoost add regularisation, smarter splits and categorical handling — they win most tabular competitions to this day.",
          "Feature importance from trees is a starting point, not gospel — correlated features share credit misleadingly.",
        ],
      },
      {
        heading: "Unsupervised & representation",
        points: [
          "PCA: standardise → covariance → eigenvectors (axes of max variance) → project. Use it to visualise, denoise and decorrelate — not as magic.",
          "k-means minimises within-cluster distance but needs k and assumes roundish clusters; hierarchical clustering gives dendrograms instead of k.",
          "Encoding choices matter as much as models: one-hot for low-cardinality, target/k-fold encoding for high — with leakage warnings.",
          "Imbalanced data: don't chase accuracy — use PR curves, class weights or resampling; know what your metric rewards.",
        ],
      },
      {
        heading: "Workflow discipline",
        points: [
          "EDA → baseline model → iterate features → regularise → ensemble. A dumb baseline you beat is worth more than a clever model you can't trust.",
          "Leakage is the silent killer: any feature that encodes the answer (or fit-on-full-data preprocessing) inflates scores and dies in production.",
          "Kaggle is the gym: playground competitions give clean data, leaderboards and public notebooks to learn from.",
          "Bridge to deep learning: the playlist's NN videos (backprop, ReLU, regularization) are the on-ramp to the Neural Networks course here.",
        ],
      },
    ],
    practice: [
      { label: "Kaggle Learn", url: "https://www.kaggle.com/learn", note: "Micro-courses: Intro to ML, Intermediate ML, Feature Engineering — code-along tracks." },
      { label: "Kaggle Playground Competitions", url: "https://www.kaggle.com/competitions", note: "Low-stakes comps to practise the full workflow." },
      { label: "StatQuest Study Guides", url: "https://statquest.org/", note: "Written companions and quizzes on the site." },
    ],
    projects: [
      { title: "First Kaggle Submission", level: "Beginner", brief: "Titanic or House Prices end-to-end: EDA, features, baseline, CV, submission." },
      { title: "Churn Prediction with XGBoost", level: "Advanced", brief: "Full pipeline with target encoding, class imbalance handling, SHAP explanations and a write-up." },
    ],
  },
};
