import type { CourseMeta } from "./types";

// Curated metadata — courses 25–31
export const COURSE_META_4: Record<string, CourseMeta> = {
  "neural-networks": {
    shortTitle: "Deep Learning",
    description:
      "Andrej Karpathy's Neural Networks: Zero to Hero — building backpropagation, language models and GPT-2 from scratch in code, with zero magic. micrograd → makemore → nanoGPT → GPT-2 reproduction. If you want to truly understand deep learning rather than call libraries, this is the most valuable ~10 videos on the internet.",
    learn: [
      "Backpropagation from first principles with a hand-built autograd engine (micrograd)",
      "The raw language-model pipeline: tokenisation (BPE), batching, and training loops",
      "MLP language models (makemore), batchnorm, layer norm, residual connections",
      "WaveNet-style dilated architectures and gradual model scaling",
      "Attention mechanism and the Transformer, written line by line (nanoGPT)",
      "Scaling laws in practice, checkpointing, fine-tuning, and reproducing GPT-2 (124M)",
    ],
    prereqs: ["Solid Python + NumPy", "Calculus basics (chain rule) — Karpathy refreshes it", "The Machine Learning (StatQuest) course is the ideal on-ramp", "A GPU helps (Colab is fine)"],
    notes: [
      {
        heading: "micrograd — autograd demystified",
        points: [
          "Every training step is: forward pass → loss → backward pass (chain rule through a computation graph) → parameter update.",
          "Build a Value class storing data + grad + _backward; topological sort the graph, then call _backward in reverse order. That IS backprop.",
          "Gradients accumulate (+=) because nodes fan out to multiple consumers — forgetting this is the classic bug.",
          "Gradient descent is just w += -lr * w.grad in a loop. Everything else is engineering.",
        ],
      },
      {
        heading: "makemore — language modeling foundations",
        points: [
          "A language model predicts the next token's probability distribution; loss = cross-entropy between predicted and actual.",
          "Embeddings map discrete tokens into continuous space where similar meanings sit close — the table is learned, not designed.",
          "BatchNorm normalises activations per-feature across the batch (with learnable γ/β); LayerNorm does it per-sample — the Transformer's choice.",
          "Residual connections give gradients a highway (identity path), enabling depth. 'Deep residual' = gradients survive the journey.",
          "Overfit a tiny batch first — if loss doesn't collapse to ~0, the model/loop is broken. The single best debugging habit in DL.",
        ],
      },
      {
        heading: "Transformers & nanoGPT",
        points: [
          "Self-attention: each token emits query/key/value; QKᵀ/√d gives affinity scores → softmax weights → weighted sum of values. It's a differentiable, learned lookup.",
          "Causal masking (upper-triangular −∞ before softmax) makes it a next-token model; multi-head = parallel attentions in different subspaces.",
          "Positional information enters via learned/positional embeddings because attention itself is permutation-invariant.",
          "nanoGPT's training loop: AdamW, cosine LR schedule, gradient clipping, mixed precision — the real-world recipe around the pure idea.",
          "GPT-2 reproduction connects to scaling: 124M params, ~10B tokens of WebText — and shows you what a modern LLM stack looks like without frameworks.",
        ],
      },
      {
        heading: "How to study it",
        points: [
          "Code along — every line. Then delete and rebuild micrograd from memory a week later. This course rewards re-implementation.",
          "Run everything in Colab; the notebooks are linked under each video.",
          "Experiments to try: change embedding dim, remove LayerNorm, unmask attention — observe breakage; that's understanding.",
          "After GPT-2: read 'Attention Is All You Need' — it will finally read easily.",
        ],
      },
    ],
    practice: [
      { label: "Hugging Face — NLP Course", url: "https://huggingface.co/learn", note: "The ecosystem view (transformers library) after the from-scratch view." },
      { label: "Google Colab", url: "https://colab.research.google.com/", note: "Free GPU notebooks for every lecture." },
      { label: "Papers With Code", url: "https://paperswithcode.com/", note: "Reference implementations when you extend beyond the course." },
    ],
    projects: [
      { title: "Rebuild micrograd from Memory", level: "Intermediate", brief: "No notes. If you can, backprop is yours forever." },
      { title: "Train a Character-level GPT on Your Text", level: "Advanced", brief: "nanoGPT on your WhatsApp exports/shakespeare-adjacent corpus; plot loss, sample, analyse failures." },
      { title: "Fine-tune GPT-2 Small", level: "Expert", brief: "Load pretrained weights, fine-tune on a niche corpus, document data prep + eval honestly." },
    ],
  },

  "agentic-ai": {
    shortTitle: "AI Agents",
    description:
      "CampusX's Agentic AI with LangGraph series (Hindi) — the practical engineering of LLM agents: state graphs, nodes and edges, tool calling, persistence, human-in-the-loop, MCP, RAG and multi-agent systems. It takes you from 'chatbot' to 'system that does things' with production architecture, not prompt folklore.",
    learn: [
      "Agent fundamentals: LLMs as reasoning engines, tools, and the agent loop",
      "LangGraph core: StateGraph, nodes, edges, conditional edges, and state channels",
      "Tool calling and function schemas; building a chatbot that acts",
      "Persistence & checkpointing: thread state, time travel, resumable workflows",
      "Human-in-the-loop patterns: interrupts, approvals, and safe tool execution",
      "MCP (Model Context Protocol): clients, servers and standardised tool access",
      "RAG pipelines in graph form: chunking, embedding, retrieval, reranking; Self-RAG and corrective patterns",
      "Multi-agent orchestration and evaluation of agent behaviour",
    ],
    prereqs: ["Python fluency + async basics", "Transformer/LLM intuition (the Deep Learning course helps)", "API keys for an LLM provider", "The JavaScript/React course if you want UIs on top"],
    notes: [
      {
        heading: "LangGraph's core idea",
        points: [
          "An agent = a state machine: a typed state object flowing through nodes (functions) connected by edges (some conditional on state).",
          "This beats naive agent loops: graphs are inspectable, interruptible, resumable and testable — the difference between demo and system.",
          "State design is the real work: keep messages, intermediate results and control flags in typed channels; reducers define how updates merge.",
          "Conditional edges implement decisions ('if tool call → tools node; else → END'), which is where agent policy lives.",
        ],
      },
      {
        heading: "Tools, memory & control",
        points: [
          "Tools are typed functions + JSON schemas the model calls by name; validate inputs server-side ALWAYS — the model can hallucinate arguments.",
          "Persistence = checkpointer (SQLite/Postgres) storing state per thread_id: resume, replay, and time-travel to any prior state.",
          "Human-in-the-loop: interrupt before risky tools, surface state for approval, resume on decision — mandatory for anything with side effects.",
          "MCP standardises tool discovery/access across apps: one client implementation, many tool servers — understand the protocol shape early.",
        ],
      },
      {
        heading: "RAG & reliability",
        points: [
          "RAG = retrieve relevant chunks → stuff context → generate with citations. Quality lives in chunking strategy, embedding choice and reranking, not in the prompt magic.",
          "Evaluate retrieval (hit rate, MRR) separately from generation (faithfulness, answer relevance) — one pipeline, two scoreboards.",
          "Self-RAG/corrective patterns: let the graph decide when to retrieve again, when to answer, when to say 'not found' — reliability through control flow.",
          "Guardrails: schema-validated outputs, token budgets per node, max-iteration caps, and logging every LLM call with cost — agents without observability are unauditable.",
        ],
      },
    ],
    practice: [
      { label: "Hugging Face Agents Course", url: "https://huggingface.co/learn", note: "Free official course with benchmarks to test your agents." },
      { label: "LangGraph Docs Tutorials", url: "https://langchain-ai.github.io/langgraph/", note: "Official tutorials mirror the series' patterns." },
      { label: "Papers With Code — Agents", url: "https://paperswithcode.com/", note: "ReAct, Reflexion, Toolformer — the papers behind the patterns." },
    ],
    projects: [
      { title: "Tool-Using Chatbot with Checkpoints", level: "Intermediate", brief: "Weather/calculator/search tools + SQLite checkpointer + interrupt-on-payment-tool pattern." },
      { title: "RAG over Your Own Notes with Citations", level: "Advanced", brief: "Chunk/embed/index personal docs; enforce citations; evaluate faithfulness on a held-out QA set." },
      { title: "Multi-agent Research Assistant", level: "Expert", brief: "Planner → searcher → critic → writer graph with approval gates and cost logging per node." },
    ],
  },

  mlops: {
    shortTitle: "MLOps",
    description:
      "DataTalksClub's MLOps Zoomcamp — the full production-ML lifecycle taught with real tools: experiment tracking, model registries, orchestration, deployment (batch, web, streaming), monitoring, data drift and CI/CD, capped by a real end-to-end project. The course that turns 'I can train a model' into 'I can ship and maintain one'.",
    learn: [
      "MLOps maturity: what changes when a model goes from notebook to production",
      "Experiment tracking & reproducibility (MLflow: params, metrics, artifacts)",
      "Model registries: versioning, staging → production promotion workflows",
      "Orchestration with workflow engines (Mage/Airflow-style DAGs)",
      "Deployment patterns: batch scoring, web services (Flask/FastAPI + Docker), streaming",
      "Monitoring: data drift, model performance decay, alerting (Evidently-style)",
      "Best practices: code quality, testing, CI/CD with GitHub Actions, cloud deployment",
    ],
    prereqs: ["Working ML knowledge (the ML course here)", "Docker basics (the Docker course)", "Python + git fluency", "A cloud free-tier account for the capstone"],
    notes: [
      {
        heading: "Why models die (and what tracks them)",
        points: [
          "Production ML is ~10% modelling: data pipelines, serving, monitoring and retraining are the other 90%. This course is the 90%.",
          "Experiment tracking turns 'which run was that?' into a database: log params, metrics, artifacts, environment for EVERY run — MLflow is the lingua franca.",
          "Model registry adds lifecycle: versions + stages (staging/production) + lineage from run → model → deployment. Promotion becomes a decision, not a copy-paste.",
          "Reproducibility = pinned data version + code version + environment. If you can't rerun the exact model, you don't own it.",
        ],
      },
      {
        heading: "Deployment patterns",
        points: [
          "Batch (score nightly, write to DB): simplest, most robust — start here when latency doesn't matter.",
          "Web service (model in Docker behind REST): know request/response schemas, health endpoints, and that container startup ≠ model readiness.",
          "Streaming (score events in flight): needs the queue/streaming mindset from the Data Engineering course.",
          "Every pattern needs the same contract: versioned inputs, versioned model, logged outputs. Design the contract before the plumbing.",
        ],
      },
      {
        heading: "Monitoring & drift",
        points: [
          "Data drift = input distributions shift; concept drift = the P(X→y) relationship shifts. Both silently degrade models; only monitoring catches them.",
          "Monitor inputs (schema violations, missing rates), outputs (score distributions) and business metrics (the only truth users feel).",
          "Drift detection: compare rolling windows against reference (PSI/KS tests) — Evidently-style reports make this routine.",
          "Alerting philosophy: alert on symptoms users feel, investigate causes with dashboards. Retrain only with a reason, and always compare against the incumbent.",
        ],
      },
      {
        heading: "CI/CD for ML",
        points: [
          "CI: tests for data schemas, model code and training smoke-tests (tiny dataset, few steps) on every PR.",
          "CD: build → register model → deploy staging → evaluate → promote. GitHub Actions on the repo; the registry is the handshake between training and serving.",
          "Code quality (linting, formatting, typing) is not optional at this layer — pipelines fail on typos at 3am.",
          "Capstone advice: pick a dataset you care about, ship the WHOLE loop (track → register → deploy → monitor) — the project is the resume.",
        ],
      },
    ],
    practice: [
      { label: "MLflow Quickstart", url: "https://mlflow.org/docs/latest/getting-started/", note: "Install and log your first experiment within an hour." },
      { label: "Made With ML (MLOps course)", url: "https://madewithml.com/", note: "Excellent written companion covering the same lifecycle." },
      { label: "KodeKloud DevOps playgrounds", url: "https://kodekloud.com/", note: "Practice Docker/K8s serving infrastructure." },
    ],
    projects: [
      { title: "Track & Register an Existing Model", level: "Beginner", brief: "Take any model from the ML course; add MLflow tracking + registry + a staged promotion script." },
      { title: "End-to-end MLOps Capstone", level: "Expert", brief: "The Zoomcamp final project: orchestrated training, deployed service, drift monitoring, CI/CD — published publicly." },
    ],
  },

  "data-engineering": {
    shortTitle: "Data Engineering",
    description:
      "DataTalksClub's Data Engineering Zoomcamp — the free, project-driven path through modern data infrastructure: workflow orchestration (Kestra), warehouses (BigQuery), analytics engineering (dbt), batch processing (Spark), and streaming, ending in a full end-to-end pipeline project. The clearest map of what data engineers actually do all day.",
    learn: [
      "DE fundamentals: ingestion → lake/warehouse → transformation → serving",
      "Containerised tooling and reproducible environments",
      "Workflow orchestration with Kestra (and Airflow-style concepts: DAGs, retries, backfills)",
      "Data lakes vs warehouses; partitioning & clustering in BigQuery",
      "Analytics engineering with dbt: models, tests, documentation, lineage",
      "Batch processing with Spark: DataFrames, partitions, joins, and RDD internals",
      "Streaming concepts with Kafka/Pub-Sub + Spark Structured Streaming",
      "Capstone: end-to-end pipeline with orchestration, warehouse, dashboard",
    ],
    prereqs: ["Python + SQL fluency (the Python and DBMS courses here)", "Docker basics", "GCP free tier (or local alternatives) for BigQuery", "Curiosity about plumbing — this is infrastructure"],
    notes: [
      {
        heading: "The modern data stack, mapped",
        points: [
          "Ingestion (batch/stream) → storage (lake/warehouse) → transformation (dbt/Spark) → serving (BI/ML). Every tool you'll meet lives in one of these four boxes.",
          "Orchestration is the connective tissue: DAGs define dependencies; retries/backfills handle the reality that data arrives late and broken.",
          "Warehouse-first thinking: land raw data, then transform IN the warehouse (ELT) — cheap storage made this the default architecture.",
          "Data quality is a feature: schema tests, freshness checks and row-count sanity belong in the pipeline, not in a analyst's hope.",
        ],
      },
      {
        heading: "BigQuery & dbt (the week 3-4 superpowers)",
        points: [
          "Partition by date, cluster by frequent filter columns — cost and speed both live here. Scan less, pay less.",
          "dbt turns SQL into software: models are versioned SELECTs, refs build the DAG automatically, tests (unique/not_null/relationships) run in CI.",
          "Staging → intermediate → marts layering keeps transformations debuggable; lineage graphs are free with dbt docs.",
          "Incremental models (merge on key) are the difference between a demo and a pipeline that survives real data volume.",
        ],
      },
      {
        heading: "Spark & streaming intuition",
        points: [
          "Spark = distributed DataFrames over a cluster: think in partitions; shuffles (wide transformations like groupby/join) are the cost centre.",
          "Narrow vs wide transformations explain performance; broadcast joins avoid shuffling the big table.",
          "Structured Streaming treats a stream as an unbounded table — same API, incremental execution, watermarks for late data.",
          "Kafka mental model: durable append-only logs, topics split into partitions, consumer groups for parallel reads — the backbone behind real-time pipelines.",
        ],
      },
    ],
    practice: [
      { label: "dbt Learn — Fundamentals", url: "https://courses.getdbt.com/", note: "Official free course; certify if you enjoy the dbt weeks." },
      { label: "BigQuery Public Datasets", url: "https://cloud.google.com/bigquery/public-data", note: "Petabytes of real data to practise partitioned, cost-aware SQL." },
      { label: "DataTalksClub community", url: "https://datatalks.club/", note: "The course's own community — peer reviews and cohort support." },
    ],
    projects: [
      { title: "NYC Taxi Analytics Warehouse", level: "Intermediate", brief: "The classic Zoomcamp path: Kestra orchestration → BigQuery (partitioned/clustered) → dbt marts → Looker Studio dashboard." },
      { title: "Streaming Pipeline with Kafka + Spark", level: "Advanced", brief: "Produce events → consume with Structured Streaming → warehouse sink → freshness dashboard." },
    ],
  },

  "reinforcement-learning": {
    shortTitle: "RL",
    description:
      "David Silver's legendary UCL Reinforcement Learning course (DeepMind) — the theoretical foundation of modern RL: MDPs, dynamic programming, Monte Carlo, TD learning, Q-learning, function approximation, policy gradients and actor-critic methods, taught with games as running examples. The course behind AlphaGo-era RL, still the cleanest treatment anywhere.",
    learn: [
      "The RL problem: agents, environments, rewards, and the exploration/exploitation dilemma",
      "Markov Decision Processes: states, actions, transitions, returns, and Bellman equations",
      "Dynamic programming: policy evaluation, policy iteration, value iteration",
      "Model-free prediction: Monte Carlo and Temporal-Difference (TD) learning",
      "Model-free control: SARSA, Q-learning, and off-policy vs on-policy learning",
      "Function approximation and Deep RL (DQN intuitions)",
      "Policy gradients (REINFORCE), actor-critic architectures and planning/rollouts",
    ],
    prereqs: ["Probability & linear algebra (ML and Linear Algebra courses here)", "Python + NumPy", "Comfort with mathematical notation — Silver uses it properly"],
    notes: [
      {
        heading: "The core formalism",
        points: [
          "RL = learning WHAT to do from reward signals by trial and error. The agent maximises expected cumulative (discounted) return, not immediate reward.",
          "MDP = (S, A, P, R, γ). Markov property: the state contains everything relevant. If your 'state' forgets, you need history/RNNs (beyond this course but know why).",
          "Bellman equations define value recursively: V(s) = E[r + γV(s')]. Every algorithm in the course is a way of solving or approximating these.",
          "γ near 0 = myopic, near 1 = far-sighted; γ also controls convergence of the infinite sum.",
        ],
      },
      {
        heading: "The algorithm families",
        points: [
          "Dynamic programming needs a known model (P, R) — beautiful, rarely available. Policy iteration: evaluate then improve, until stable. Value iteration: bootstrap the optimality equation directly.",
          "Monte Carlo learns from complete episodes (unbiased, high variance); TD(0) bootstraps from estimates (biased, lower variance) — TD(lambda) interpolates.",
          "Q-learning is off-policy: it learns the greedy optimal policy while behaving (ε-greedily). SARSA is on-policy: it learns the value of the behaviour including its exploration risks.",
          "Maximisation bias and deadly triad (function approx + bootstrapping + off-policy) are the deep-water issues — Silver flags them; DQN's target networks mitigate.",
        ],
      },
      {
        heading: "Scaling up",
        points: [
          "Tabular methods die when states explode → function approximation: linear features first, then neural nets (value functions or policies).",
          "Policy gradients optimise J(θ) = ∇log π(a|s) · Q — REINFORCE is this plus Monte Carlo returns; variance reduction (baselines) is essential.",
          "Actor-critic splits responsibilities: critic estimates value (lower variance), actor improves the policy — the architecture behind A2C/PPO lineage.",
          "Exploration: ε-greedy is the floor; optimism, entropy bonuses and curiosity are the ceiling — games in the course make this tangible.",
        ],
      },
    ],
    practice: [
      { label: "OpenAI Gym / Gymnasium", url: "https://gymnasium.farama.org/", note: "Standard environments (CartPole, FrozenLake) to implement every lecture." },
      { label: "David Silver's course page (UCL)", url: "https://www.davidsilver.uk/teaching/", note: "Slides + assignments for each lecture." },
      { label: "Google Colab", url: "https://colab.research.google.com/", note: "Free GPU/CPU notebooks for training runs." },
    ],
    projects: [
      { title: "Tabular Q-learning on FrozenLake", level: "Intermediate", brief: "Implement, visualise the learned policy grid, and plot reward-vs-episode across γ and ε schedules." },
      { title: "DQN on CartPole (from scratch)", level: "Advanced", brief: "Replay buffer + target network in PyTorch; ablate each component and report honestly." },
    ],
  },

  "embedded-c": {
    shortTitle: "Embedded C",
    description:
      "Fastbit Academy's Bare-Metal Embedded C series — programming microcontrollers without any HAL or SDK scaffolding: the build process, startup code, memory maps, linker scripts, registers and the C standard library on real hardware. This is where C stops being a classroom language and becomes a tool that talks to silicon.",
    learn: [
      "The embedded build pipeline: preprocessor → compiler → assembler → linker → binary formats",
      "Memory maps, linker scripts, and what startup code (crt0) actually does before main()",
      "Memory-mapped I/O: peripherals as registers, volatile, and bit manipulation patterns",
      "The vector table, reset handler, and interrupt service routines",
      "Integrating the C standard library on bare metal (heap, retargeting printf)",
      "Reading datasheets and reference manuals like an engineer",
    ],
    prereqs: ["Solid C (pointers, structs, bit ops) — CS50 covers the base", "Basic digital logic (the 8-Bit Computer course is great context)", "An STM32 board OR Wokwi simulator"],
    notes: [
      {
        heading: "From source to silicon",
        points: [
          "Embedded builds differ from app builds: the linker script places code/data at physical addresses; the startup file sets the stack pointer and copies .data, zeroes .bss before main.",
          "The vector table is an array of function pointers at a fixed address — reset handler first, then IRQ handlers. 'Blink' is 90% plumbing, 10% blink.",
          "volatile tells the compiler a value can change outside program flow (hardware registers, ISRs) — omit it and optimisation deletes your reads.",
          "Binaries: .elf (symbols, debug), .bin/.hex (flashable). Know objdump/readelf enough to inspect your own output.",
        ],
      },
      {
        heading: "Talking to hardware",
        points: [
          "Peripherals = memory-mapped register blocks: structs over fixed addresses (RCC->AHB1ENR |= ...). Datasheets + reference manuals are the API docs.",
          "Enable the peripheral's clock before configuring it — the #1 beginner bug on STM32.",
          "Bitwise idioms: set (|= 1<<n), clear (&= ~(1<<n)), toggle (^=), test (val & mask). Read-modify-write on shared registers needs care around ISRs.",
          "ISR discipline: keep them short, share data via volatile flags or ring buffers, never busy-wait inside an interrupt.",
        ],
      },
      {
        heading: "Going further",
        points: [
          "Retargeting printf/semihosting gives you logging on bare metal; a UART 'console' is the classic first peripheral chain.",
          "Heap/malloc on MCUs: many systems avoid dynamic allocation entirely — know your memory budget at link time.",
          "Next steps after this series: FreeRTOS (tasks, queues), low-power modes, and protocol stacks (SPI/I2C/UART drivers).",
          "Wokwi lets you do ALL of this without hardware — simulate an STM32/ESP32, inspect registers, break things safely.",
        ],
      },
    ],
    practice: [
      { label: "Wokwi Simulator", url: "https://wokwi.com/", note: "Simulate STM32/ESP32/Arduino with real register-level code — zero hardware needed." },
      { label: "PlatformIO", url: "https://platformio.org/", note: "Professional build toolchain — graduate from IDE templates to real projects." },
      { label: "Arduino Docs", url: "https://docs.arduino.cc/", note: "Reference for the classic boards and their registers." },
    ],
    projects: [
      { title: "Bare-metal Blink, Deconstructed", level: "Intermediate", brief: "Follow the lectures: startup code + linker script + GPIO register blink, then explain every file in a README." },
      { title: "UART Driver + Mini Shell", level: "Advanced", brief: "Ring-buffer UART driver with a command shell over serial — printf retargeting included." },
    ],
  },

  "cuda-programming": {
    shortTitle: "CUDA / GPU",
    description:
      "A focused CUDA & GPU computing playlist — from your first kernel to the memory-hierarchy tricks (shared memory, coalescing, bank conflicts) that separate toy GPU code from production performance. As AI compute becomes the world's scarcest resource, understanding GPUs from the programming model up is a genuine superpower.",
    learn: [
      "The CUDA programming model: host vs device, threads, blocks, grids",
      "Writing kernels, launch configuration, and the SIMT execution model",
      "GPU memory hierarchy: global, shared, constant, texture memory and when each wins",
      "Memory coalescing and why access patterns dominate performance",
      "Synchronisation, data races and atomics",
      "Occupancy, warp-level thinking and profiling with practical HPC context",
      "Where GPUs fit: matmul as the canonical optimisation story; GPU vs TPU vs DPU landscape",
    ],
    prereqs: ["Strong C/C++", "Parallel thinking helps (the Algorithms and Architecture courses)", "NVIDIA GPU (or Colab's free T4) with CUDA toolkit"],
    notes: [
      {
        heading: "The execution model",
        points: [
          "A kernel runs as a grid of blocks of threads. Thread indices (threadIdx, blockIdx, blockDim) map to data — the mapping IS your parallel algorithm design.",
          "Threads execute in warps of 32, lockstep-ish. Divergent branches inside a warp serialize — data-parallel thinking means keeping threads in line.",
          "Launch configuration is a performance knob: too few blocks underutilise SMs; too many tiny blocks pay scheduling overhead.",
          "Host-device transfers are usually THE bottleneck: batch them, pin memory, and compute where the data lives.",
        ],
      },
      {
        heading: "Memory hierarchy = performance",
        points: [
          "Global memory is huge but slow (~hundreds of cycles); coalesced access (adjacent threads → adjacent addresses) turns 32 scattered loads into 1-2 transactions.",
          "Shared memory is per-block SRAM —programmable cache. Tiled matmul stages sub-blocks through it and reuses them many times: the canonical optimisation.",
          "Bank conflicts: shared memory has 32 banks; threads hitting the same bank serialize. Padding is the classic fix.",
          "Constant/texture memory: cached, broadcast-friendly for read-only data — know when they beat global.",
        ],
      },
      {
        heading: "The optimisation story (why AI people care)",
        points: [
          "Matmul narrative: naive kernel → coalesced → shared-memory tiled → vectorised. Each stage is a lesson in the memory hierarchy, and this exact story powers cuBLAS/PyTorch internals.",
          "Atomics and reductions: parallel sum needs tree reduction within blocks + atomicAdd across them; correctness first, then minimise contention.",
          "Occupancy = resident warps per SM; it hides memory latency. Profile (Nsight) before guessing — never optimise blind.",
          "Ecosystem context: Triton/PyTorch generate kernels from these primitives; understanding CUDA makes those tools debuggable rather than magical.",
        ],
      },
    ],
    practice: [
      { label: "Google Colab (free T4 GPU)", url: "https://colab.research.google.com/", note: "Zero-hardware path: nvcc + NVIDIA works in notebooks." },
      { label: "CUDA C++ Programming Guide", url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/", note: "The official reference — keep it open while coding." },
      { label: "Kaggle Notebooks (GPU)", url: "https://www.kaggle.com/code", note: "Free GPU quota for experiments and benchmarks." },
    ],
    projects: [
      { title: "CUDA Matmul: 3 Generations", level: "Advanced", brief: "Naive → tiled → vectorised; chart GFLOPs at each stage and explain the memory story." },
      { title: "Parallel Histogram & Reduction Lab", level: "Intermediate", brief: "Atomics vs privatized bins; tree reduction with and without bank-conflict padding — benchmark all variants." },
    ],
  },
};
