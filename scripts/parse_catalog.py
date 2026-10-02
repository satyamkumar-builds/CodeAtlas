#!/usr/bin/env python3
"""Parse master_curated_video_links.txt into CodeAtlas catalog.json
Structure: courses -> modules -> lessons. Modules auto-chunked with
salient-keyword-based titles so navigation feels handcrafted."""
import json
import re
import os
from collections import Counter

SRC = "/home/z/my-project/upload/master_curated_video_links.txt"
OUT = "/home/z/my-project/src/data/catalog.json"

# ---------------------------------------------------------------- slugs/meta
COURSE_SLUGS = {
    1: "computer-fundamentals", 2: "8-bit-computer", 3: "cpp-programming",
    4: "java-programming", 5: "python-programming", 6: "dsa-complete",
    7: "algorithms-intuition", 8: "computer-architecture", 9: "operating-systems",
    10: "computer-networks", 11: "network-engineering", 12: "dbms",
    13: "discrete-mathematics", 14: "theory-of-computation", 15: "compiler-design",
    16: "javascript", 17: "react-js", 18: "backend-express", 19: "system-design",
    20: "docker", 21: "kubernetes", 22: "cryptography", 23: "linear-algebra",
    24: "machine-learning", 25: "neural-networks", 26: "agentic-ai",
    27: "mlops", 28: "data-engineering", 29: "reinforcement-learning",
    30: "embedded-c", 31: "cuda-programming",
}
COURSE_DOMAINS = {
    1: "CS Fundamentals", 2: "Embedded & Hardware", 3: "Programming",
    4: "Programming", 5: "Programming", 6: "DSA & Algorithms",
    7: "DSA & Algorithms", 8: "CS Core", 9: "CS Core", 10: "CS Core",
    11: "CS Core", 12: "CS Core", 13: "Mathematics", 14: "CS Core",
    15: "CS Core", 16: "Web Development", 17: "Web Development",
    18: "Web Development", 19: "System Design", 20: "DevOps & Cloud",
    21: "DevOps & Cloud", 22: "Security", 23: "Mathematics",
    24: "AI & Machine Learning", 25: "AI & Machine Learning",
    26: "AI & Machine Learning", 27: "AI & Machine Learning",
    28: "AI & Machine Learning", 29: "AI & Machine Learning",
    30: "Embedded & Hardware", 31: "Embedded & Hardware",
}
COURSE_LEVELS = {
    1: "Beginner", 2: "Beginner", 3: "Beginner", 4: "Beginner",
    5: "Beginner", 6: "Intermediate", 7: "Intermediate", 8: "Beginner",
    9: "Beginner", 10: "Beginner", 11: "Advanced", 12: "Beginner",
    13: "Beginner", 14: "Intermediate", 15: "Advanced", 16: "Beginner",
    17: "Intermediate", 18: "Intermediate", 19: "Advanced", 20: "Beginner",
    21: "Intermediate", 22: "Intermediate", 23: "Beginner", 24: "Beginner",
    25: "Advanced", 26: "Advanced", 27: "Intermediate", 28: "Intermediate",
    29: "Advanced", 30: "Intermediate", 31: "Advanced",
}
COURSE_TAGS = {
    1: ["C", "Python", "SQL", "Memory", "Foundations"],
    2: ["Digital Logic", "CPU", "RAM", "ALU", "Hardware"],
    3: ["C++", "OOP", "Placement", "STL", "Pointers"],
    4: ["Java", "OOP", "Collections", "Multithreading"],
    5: ["Python", "Decorators", "OOP", "Generators"],
    6: ["DSA", "Interviews", "LeetCode", "Trees", "DP", "Graphs"],
    7: ["Algorithms", "Greedy", "Graphs", "Complexity"],
    8: ["Architecture", "Pipelines", "Cache", "Instructions"],
    9: ["Processes", "Scheduling", "Deadlock", "Memory"],
    10: ["TCP/IP", "OSI", "Routing", "DNS", "HTTP"],
    11: ["Networking", "Proxies", "HTTP/2", "gRPC", "Infrastructure"],
    12: ["SQL", "Normalization", "Transactions", "ER Model"],
    13: ["Logic", "Sets", "Graph Theory", "Combinatorics"],
    14: ["Automata", "Turing Machines", "Grammars", "Decidability"],
    15: ["Lexical Analysis", "Parsing", "Code Generation"],
    16: ["JavaScript", "Async", "DOM", "ES6+", "Node Basics"],
    17: ["React", "Hooks", "State", "Components", "Router"],
    18: ["Node.js", "Express", "REST APIs", "MongoDB", "Auth"],
    19: ["Scalability", "Load Balancing", "Caching", "Databases", "Interviews"],
    20: ["Containers", "Dockerfile", "Compose", "Volumes"],
    21: ["Kubernetes", "Pods", "Deployments", "Services", "Clusters"],
    22: ["Ciphers", "AES", "RSA", "Number Theory", "Security"],
    23: ["Vectors", "Matrices", "Eigenvalues", "Transforms"],
    24: ["Regression", "Classification", "Statistics", "ML Basics"],
    25: ["Neural Nets", "Backprop", "PyTorch", "Transformers", "GPT"],
    26: ["LLM Agents", "LangGraph", "Tools", "RAG", "Workflows"],
    27: ["CI/CD", "MLflow", "Monitoring", "Deployment", "Orchestration"],
    28: ["Data Pipelines", "Airflow", "Spark", "Warehouses", "dbt"],
    29: ["MDPs", "Dynamic Programming", "Q-Learning", "Policy Gradients"],
    30: ["Embedded C", "Registers", "UART", "SPI", "I2C", "MCU"],
    31: ["CUDA", "GPU", "Kernels", "Parallel Computing"],
}

# ------------------------------------------------------- module keyword map
KEYWORD_GROUPS = [
    (r"\bintroduction\b|\bintro\b|getting started|first program|overview|hello", "Getting Started"),
    (r"\bsetup\b|\binstall|environment|tooling|vs ?code|ide\b", "Setup & Tooling"),
    (r"scratch|\bflowchart|pseudocode", "Thinking Like a Programmer"),
    (r"variable|data ?typ|constants?|literals|identifier|scope", "Variables & Data Types"),
    (r"operator|bitwise|precedence", "Operators & Expressions"),
    (r"\bif\b|else|switch|conditional|ternary", "Conditionals"),
    (r"\bloops?\b|for\b|while\b|iterate|pattern", "Loops & Patterns"),
    (r"function|method|parameters?|return|recursion chal", "Functions"),
    (r"\barray|subarray|prefix (sums?|)|2d array|matrix", "Arrays"),
    (r"string|char array|palindrome word", "Strings"),
    (r"pointer|dereference|memory address", "Pointers & Memory"),
    (r"reference|dynamic memory|heap allocation|stack vs", "Memory Management"),
    (r"\bstl\b|vector<|pair|map<|set<|iterator", "STL & Standard Library"),
    (r"time complexity|space complexity|big o|\btle\b|analysis", "Complexity Analysis"),
    (r"binary search|lower bound|upper bound|rotated", "Binary Search"),
    (r"sorting|selection sort|bubble sort|insertion sort|merge sort|quick sort|count sort", "Sorting"),
    (r"recursion|recursive|backtrack|subset|subsequence|permutation|rat in|maze", "Recursion & Backtracking"),
    (r"linked list|\bll\b|\bll ", "Linked Lists"),
    (r"\bstack", "Stacks"),
    (r"\bqueue|deque|circular queue", "Queues"),
    (r"binary tree|\btrees?\b|traversal|bst\b", "Trees & BSTs"),
    (r"\bheap|priority queue", "Heaps & Priority Queues"),
    (r"hash\w*|unordered", "Hashing"),
    (r"\bgraphs?\b|bfs\b|dfs\b|dijkstra|bellman|floyd|topological|mst|kruskal|prim", "Graphs"),
    (r"dynamic programming|dp\b|\blis\b|knapsack|mcm\b", "Dynamic Programming"),
    (r"greedy|activity selection|fractional", "Greedy Algorithms"),
    (r"trie|prefix tree", "Tries"),
    (r"bit manipulation|xor|binary number|number system|decimal", "Bits & Number Systems"),
    (r"\boop|class|object|constructor|inherit|polymorph|encapsul|abstract|virtual|friend", "OOP"),
    (r"exception|error handling|try|catch", "Error Handling"),
    (r"\bfile|io\b|streams?|serialization", "Files & I/O"),
    (r"template|generic|lambda", "Templates & Generics"),
    (r"thread|concurr|parallel|synchroniz|mutex|async|await|promise|callback|event loop", "Concurrency & Async"),
    (r"collection|generics java|hashmap|arraylist", "Collections"),
    (r"multithread|executor", "Multithreading"),
    (r"lambda|stream api|functional", "Functional Programming"),
    (r"jdbc|mysql|database connect", "Java + Databases"),
    (r"swing|awt|gui|javafx", "GUI Programming"),
    (r"decorator|generator|iterator|comprehension|zip|enumerate|lambda python|\*args|kwargs", "Pythonic Features"),
    (r"os module|sys module|subprocess|pathlib", "Python Stdlib"),
    (r"virtual env|pip\b|packag", "Packages & Environments"),
    (r"\bdom\b|querySelector|event|bom\b", "DOM & Events"),
    (r"fetch|ajax|json\b|http request", "Fetch & HTTP"),
    (r"es6|spread|destructur|module|closure|hoist|this\b|prototype", "Core JS Concepts"),
    (r"component|jsx|props|state|hook|useeffect|usestate|context|reducer|ref|memo|portal|router|redux|custom hook|render", "React"),
    (r"\bnode\b|express|npm\b|rest|\bapi\b|middleware|crud|server", "Backend & APIs"),
    (r"mongo|mongoose|database|sql\b", "Databases"),
    (r"auth|jwt|session|cookie|bcrypt|passport", "Auth & Security"),
    (r"deploy|hosting|production|cloud", "Deployment"),
    (r"websocket|socket\.io|real.?time", "Real-time"),
    (r"scal|load balanc|cache|shard|consistent hashing|cdn|proxy|replication|CAP|latency|throughput|message queue|kafka|rabbitmq|microservice|monolith|rate limit|api gateway|websocket design|url short|netflix|whatsapp|youtube|uber|instagram|notification|distributed", "System Design"),
    (r"docker|container|image|dockerfile|compose|volume|registry", "Docker"),
    (r"kubernetes|k8s|pod|deployment|service|ingress|helm|cluster|stateful", "Kubernetes"),
    (r"\bci/?cd|jenkins|github actions|devops|pipeline", "CI/CD & DevOps"),
    (r"cipher|encrypt|aes|rsa|des\b|security|hash function|signature|key exchange|prime|modular arithmetic|diffie|elliptic|ssl|tls", "Cryptography"),
    (r"vector|matrix|eigen|determinant|linear transform|span|basis|dot product|cross product|projection|rank|null space|change of basis", "Linear Algebra"),
    (r"regression|classification|overfit|underfit|gradient descent|logistic|decision tree|random forest|model|feature|supervised|unsupervised|clustering|p ?value|confidence|error term|least squares|statistic|normal distribution|sampling|hypothesis|chi.?square|anova|correlation|variance|std|bias", "Statistics & ML"),
    (r"neural|backprop|activation|gradient|pytorch|tensor|autograd|nanogpt|makemore|micrograd|gpt|token|transformer|attention|embedding|language model|char.?level|wavenet|residual|batchnorm|layer norm|dropout|softmax|cross.?entropy|optimizer", "Deep Learning"),
    (r"agent|langgraph|langchain|tool (use|calling)|memory|multi.?agent|rag\b|retriev|vector db|embedd|prompt|chain|state graph|human.?in", "AI Agents"),
    (r"mlflow|experiment track|model (registry|serving|deploy)|monitor|drift|orchestr|airflow|feature store|batch|stream|mlops|reproduc|versioning", "MLOps"),
    (r"airflow|spark|kafka|warehouse|dbt|bigquery|etl|elt|data lake|pipeline|ingest|partition|data model|transform|orchestrat|duckdb|redshift|snowflake", "Data Engineering"),
    (r"reinforcement|reward|policy|q.?learn|mdp\b|value function|monte carlo|temporal difference|sarsa|actor.?critic|explore|exploit|dynamic programming rl|gridworld|game|planning", "Reinforcement Learning"),
    (r"cuda|gpu|kernel|warp|thread block|grid|memory hierarchy|shared memory|parallel", "GPU Programming"),
    (r"embedded|microcontroller|register|uart|spi\b|i2c|gpio|stm32|firmware|interrupt|timer|adc\b|datasheet|peripheral|arm\b|cortex|blink|hal\b|clock config", "Embedded Systems"),
    (r"flip.?flop|latch|gate|alu\b|\bram\b|clock|register transfer|bus|counter|eeprom|seven.?segment|decoder|binary counter|555|astable|monostable|bistable", "Digital Logic & Hardware"),
    (r"architecture|instruction|pipeline|cache|virtual memory|interrupt|microprocessor|8085|8086|assembly|addressing mode|memory interfacing|machine cycle", "Computer Architecture"),
    (r"process|thread|schedul|deadlock|paging|segmentation|virtual memory|file system|semaphore|fork\b|memory management|syscall|shell|linux command|permission|package manager|\bboot\b|users|groups|grep|pipe\b|redirection|\bnano\b|\bvim\b|tar\b|\bssh\b|\bcron\b", "OS & Linux"),
    (r"osi\b|tcp|udp|\bip\b|dns|dhcp|router|switch|subnet|vlan|routing|ethernet|frame|packet|firewall|nat\b|port|socket|network layer|data link|physical layer|topolog|arp\b|icmp|traceroute|wireshark|mac address|http/2|http/3|quic|proxy|vpn|grpc|webhook|cdn|latency|tls|security", "Networking"),
    (r"normal|functional depend|er ?model|er diagram|entity|relation|transaction|acid|concurrency|recovery|indexing|b\+? tree|query processing|sql|join|foreign key|primary key|ddl|dml|view|trigger|stored procedure", "DBMS"),
    (r"set theory|relation|function.*math|group|ring|field|lattice|logic|proposition|predicate|proof|induction|combinator|permutation|combination|graph theory|tree.*math|boolean algebra|recurrence|counting|discrete", "Discrete Mathematics"),
    (r"automata|finite|dfa|nfa|regex|regular language|pump|context.?free|grammar|pda|pushdown|turing|decidab|undecidab|recurd|recursive enumerable|complexity class|chomsky|myhill|closure property|lambda transition", "Theory of Computation"),
    (r"lexical|lexer|token|parsing|parser|syntax|semantic|symbol table|intermediate|code generation|optimization|activation|storage allocation|peephole|three address|\bcfg\b|slr\b|lalr|yacc|recursive descent", "Compiler Design"),
    (r"sql query|select|join\b|group by|subquery|having|window function|cte|index|stored", "SQL"),
]

# --------------------------------------------------- curated module titles
# Hand-tuned titles per course (in module order) for a real course-catalog feel.
MODULE_OVERRIDES = {
    1: ["CS50x 2025 — Complete Lectures"],
    2: ["Clocks, Latches & Registers", "ALU Design & Build", "RAM, Counters & Program Counter", "Bus, Microcode & Machine Language"],
    3: ["Programming Basics & Arrays", "Complexity, Sorting & STL", "Strings, 2D Arrays & Pointers", "Memory, Recursion & Sorting", "Recursion & OOP Foundations", "Linked Lists", "Stacks & Binary Trees", "Binary Trees & Heaps", "BST, Heaps & Backtracking", "Backtracking & Graphs", "Graph Algorithms", "Dynamic Programming I", "Dynamic Programming II", "Dynamic Programming III", "Advanced DP & Greedy"],
    4: ["Java Basics & Control Flow", "Functions, Arrays & Sorting", "Strings, Maths & Recursion", "Complexity & OOP", "OOP, Collections & Linked Lists", "Advanced Data Structures", "Algorithms & Interview Problems"],
    5: ["Getting Started & Fundamentals", "OS Module, Files & Scope", "Sorting, OOP & Advanced Python"],
    6: ["Basics, Maths & Recursion", "Sorting, Hashing & Arrays", "Arrays: Core Interview Problems", "Arrays: Advanced Problems", "Binary Search I", "Binary Search II", "Binary Search: Advanced", "Binary Search Finale & Linked Lists", "Binary Tree Traversals", "Binary Tree: Views & Properties", "Binary Tree: Hard Problems", "Binary Search Trees", "BST Problems & Graph Intro", "Graphs: BFS & DFS", "Graphs: Connected Components", "Graphs: Topological Sort & Dijkstra", "Graphs: Shortest Paths", "Graphs: Disjoint Set & Bridges", "Graphs Finale & DP Intro", "DP on Grids & Knapsack", "DP on Subsequences", "DP on Strings & Stocks", "LIS & Partition DP", "DP Finale & Doubly Linked Lists", "Linked List Problems I", "Linked List Problems II", "Advanced Linked List & Maths", "Number Theory & Sliding Window", "Sliding Window & Greedy", "Greedy Algorithms & Stack Intro", "Stacks & Queues", "Stack: Advanced Problems"],
    7: ["Algorithms & Asymptotic Notation", "Recurrence Relations", "Master Theorem & Merge Sort", "Sorting & Greedy Methods", "Dijkstra, Knapsack & DP", "Dynamic Programming & Backtracking", "Backtracking & String Matching", "String Matching & Review"],
    8: ["Introduction & Instructions", "Addressing Modes I", "Addressing Modes II", "RISC vs CISC & Cache", "Cache Mapping & Pipelining", "Pipelining & Hazards", "Pipelining Finale & I/O"],
    9: ["Introduction & System Calls", "Processes, Threads & Scheduling", "CPU Scheduling & Synchronization", "Semaphores & Deadlocks", "Deadlock Questions & Memory", "Paging & Segmentation", "Memory Finale & Disk", "Disk Scheduling & File Systems", "File Systems & Linkers"],
    10: ["Introduction & Physical Layer", "Data Link Layer Basics", "Medium Access & Error Control", "Error Detection & LANs", "Network Layer & IP Addressing", "Subnetting & IPSec", "Routing Protocols & TCP", "TCP Details & OSI Layers", "Application Layer & Security", "Cryptography & Network Security", "Final Topics & Review"],
    11: ["OSI Model & Fundamentals", "Ports, Proxies & Clusters", "High Availability & Careers", "Browser Networking & HTTP", "Switches, Routers & Tools", "Kernel & Routing Deep Dives"],
    12: ["Introduction & Keys", "Keys, Constraints & Relationships", "ER Model & Normalization", "BCNF & Functional Dependencies", "FDs & Relational Algebra", "Relational Algebra & SQL Commands", "SQL: DDL & Table Operations", "SQL: Subqueries & Aggregates", "SQL: Correlated Queries & Transactions", "Concurrency Control & Locking", "Locking Protocols & Indexing", "Indexing & Recovery", "PL/SQL & Relational Algebra", "Codd's Rules & SQL Functions"],
    13: ["Sets, Relations & Functions", "Relations & Lattices", "Group Theory & Mappings"],
    14: ["Introduction & Finite Automata", "DFA Problems & NFA", "Epsilon-NFA & Regular Expressions", "Regex, Pumping Lemma & Grammars", "Closure Properties & CFG", "CFG, PDA & Turing Machines", "Turing Machines & Exam Prep"],
    15: ["Intro, Grammars & Parsers", "LR Parsing & Syntax-Directed Translation", "SDT & Code Optimization", "Optimization, Dataflow & Finale"],
    16: ["JS Basics & Variables", "Numbers, Objects & Scope", "Functions, Closures & Hoisting", "DOM Manipulation & Events", "OOP, Async & Deep Concepts"],
    17: ["React Foundations & First Projects", "Hooks Deep Dive & Appwrite", "Building Real React Apps", "Production & Deployment"],
    18: ["Node, Express & MongoDB Setup", "Building the Full Backend"],
    19: ["Storage Systems & CI/CD", "Kubernetes & Data Storage", "VMs, Containers & OAuth", "Netflix API & Docker", "HTTP, Linux & Performance", "Scaling Stories & API Protocols", "Mobile Releases & Linux Tools", "Internet, Proxies & Pagination", "Kafka & Trade-offs", "APIs, JVM & Finale"],
    20: ["Docker Fundamentals", "Dockerfiles & Compose in Practice"],
    21: ["Docker Recap & Registries", "Kubernetes Core Concepts", "Ingress, Services & Networking"],
    22: ["Foundations & Stream Ciphers", "Block Ciphers & Security Services", "Public-Key, Signatures & PKI"],
    23: ["Vectors & Linear Transformations", "Dot Products, Determinants & Eigen"],
    24: ["ML & Linear Regression", "Multiple Regression & Statistics", "Logistic Regression & PCA", "PCA & Clustering", "K-Means & Feature Encoding", "Decision Trees & Random Forests", "Gradient Boosting & XGBoost", "Similarity & Neural Network Basics", "Neural Networks & Regularization", "Word Embeddings & Transformers", "PyTorch & RLHF"],
    25: ["Zero to GPT — Full Journey"],
    26: ["LangGraph Foundations", "Persistence, Tools & MCP", "RAG & Advanced Agents"],
    27: ["MLOps Intro & Experiment Tracking", "Model Registry & Deployment", "Monitoring & Cloud Services", "CI/CD & Orchestration"],
    28: ["Intro & Kestra Setup", "Kestra Workflows & AI", "Context Engineering & Analytics", "dbt & BigQuery", "Bruin & Data Transformation", "Batch Processing with Spark", "Spark RDDs & Streaming"],
    29: ["Full Course — David Silver"],
    30: ["Bare-Metal Embedded C"],
    31: ["CUDA Basics & Memory", "Synchronization & Performance", "GPU Architecture & Guide", "Supercomputers & Interviews"],
}

def module_title(chunk_titles):
    """Top-2 salient keyword labels joined, e.g. 'Arrays & Sorting'."""
    text = " ".join(chunk_titles).lower()
    scores = []
    for i, (pat, label) in enumerate(KEYWORD_GROUPS):
        hits = len(re.findall(pat, text))
        if hits:
            scores.append((hits * 100 - i, label))  # frequency, then specificity
    if not scores:
        return "Core Concepts"
    scores.sort(reverse=True)
    def short(label):
        return label.split(" & ")[0]
    top = scores[0][1]
    if len(scores) > 1 and scores[1][0] >= 100:  # second label has >=1 hit
        second = short(scores[1][1])
        if second.lower() not in top.lower():
            return f"{short(top)} & {second}"
    return top

def chunk_lessons(lessons, target=10, min_size=6, max_size=16):
    """Split lessons into balanced modules around the target size."""
    n = len(lessons)
    if n <= 14:
        return [lessons]
    num_modules = max(2, round(n / target))
    base = n // num_modules
    rem = n % num_modules
    sizes = [base + (1 if i < rem else 0) for i in range(num_modules)]
    # enforce max/min gently
    chunks, idx = [], 0
    for s in sizes:
        chunks.append(lessons[idx:idx + s])
        idx += s
    # merge tiny tail chunks
    merged = []
    for c in chunks:
        if len(c) < min_size and merged and len(merged[-1]) + len(c) <= max_size:
            merged[-1].extend(c)
        else:
            merged.append(list(c))
    return merged

# ------------------------------------------------------------------ parsing
sec_re = re.compile(r"^#\s*(\d{1,2})\.\s*(.+?)\s*$")
pl_re = re.compile(r"^#\s*Playlist URL:\s*(\S+)\s*$")
les_re = re.compile(r"^\s*(\d{1,4})\.\s*(.+?)\s*\|\s*(https?://\S+?(?:\s|$))")

courses = {}
order = []
current = None
with open(SRC, encoding="utf-8") as f:
    for raw in f:
        line = raw.strip()
        m = sec_re.match(line)
        if m:
            num = int(m.group(1))
            title = m.group(2)
            current = {
                "num": num, "title": title, "playlistUrl": "",
                "lessons": [],
            }
            courses[num] = current
            order.append(num)
            continue
        m = pl_re.match(line)
        if m and current:
            current["playlistUrl"] = m.group(1)
            continue
        m = les_re.match(line)
        if m and current:
            idx = int(m.group(1))
            title = m.group(2).strip()
            url = m.group(3).strip()
            vm = re.search(r"(?:v=|youtu\.be/|shorts/|embed/)([\w-]{6,})", url)
            vid = vm.group(1) if vm else ""
            current["lessons"].append({
                "i": idx, "title": title, "url": url, "videoId": vid,
            })

# ------------------------------------------------------- build final output
out_courses = []
total_lessons = 0
for num in order:
    c = courses[num]
    slug = COURSE_SLUGS.get(num, f"course-{num:02d}")
    lessons = c["lessons"]
    total_lessons += len(lessons)
    modules = []
    if lessons:
        chunks = chunk_lessons(lessons)
        used = set()
        for ci, chunk in enumerate(chunks, 1):
            # curated title first; fall back to keyword-derived label
            if num in MODULE_OVERRIDES and ci <= len(MODULE_OVERRIDES[num]):
                label = MODULE_OVERRIDES[num][ci - 1]
            else:
                label = module_title([l["title"] for l in chunk])
            if label is None or label in used:
                label = f"Part {ci}"
            k = 2
            base_label = label
            while label in used:
                k += 1
                label = f"{base_label} ({k})"
            used.add(label)
            modules.append({
                "id": f"m{ci}",
                "title": label,
                "lessons": chunk,
            })
    # flatten with global index and re-attach enriched lessons to modules
    flat = []
    gi = 0
    for mod in modules:
        enriched = []
        for l in mod["lessons"]:
            gi += 1
            entry = {"gi": gi, "modId": mod["id"], "modTitle": mod["title"],
                     "title": l["title"], "videoId": l["videoId"], "url": l["url"]}
            enriched.append(entry)
            flat.append(entry)
        mod["lessons"] = enriched
    out_courses.append({
        "num": num,
        "id": slug,
        "title": c["title"],
        "playlistUrl": c["playlistUrl"],
        "domain": COURSE_DOMAINS.get(num, "CS Fundamentals"),
        "level": COURSE_LEVELS.get(num, "Beginner"),
        "tags": COURSE_TAGS.get(num, []),
        "moduleCount": len(modules),
        "modules": [{**m, "lessonCount": len(m["lessons"])} for m in modules],
        "lessons": flat,
        "lessonCount": len(flat),
    })

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    json.dump({"version": 1, "courses": out_courses}, f, ensure_ascii=False)

# ------------------------------------------------------------------- report
print(f"{'#':>3}  {'slug':24} {'lessons':>7}  {'modules':>7}  title")
for c in out_courses:
    print(f"{c['num']:>3}  {c['id']:24} {c['lessonCount']:>7}  {c['moduleCount']:>7}  {c['title']}")
print(f"\nTOTAL: {len(out_courses)} courses, {total_lessons} lessons")
print(f"Output: {OUT} ({os.path.getsize(OUT)//1024} KB)")

# sanity: check no missing video ids
missing = [ (c['id'], l['gi']) for c in out_courses for l in c['lessons'] if not l['videoId'] ]
print(f"Missing videoIds: {len(missing)}", missing[:10])
