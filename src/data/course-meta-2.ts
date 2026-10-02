import type { CourseMeta } from "./types";

// Curated metadata — courses 9–16
export const COURSE_META_2: Record<string, CourseMeta> = {
  "operating-systems": {
    shortTitle: "Operating Systems",
    description:
      "Gate Smashers' Operating Systems course — the clearest walkthrough of processes, CPU scheduling, synchronization, deadlocks, memory management and file systems. Every concept is explained with a GATE-style numerical that forces real understanding. This is the subject that makes 'what happens when my program runs' finally make sense.",
    learn: [
      "OS structure: user mode vs kernel mode, system calls, and what the kernel actually does",
      "Processes vs threads, PCB contents, context switching and states",
      "CPU scheduling: FCFS, SJF, SRTF, Round Robin, Priority, Multilevel Queue — with waiting/turnaround math",
      "Synchronization: race conditions, critical sections, mutexes, semaphores and classic problems",
      "Deadlocks: the four conditions, prevention/avoidance, and Banker's Algorithm",
      "Memory: contiguous allocation, paging, segmentation, virtual memory and page replacement (FIFO/LRU/optimal)",
      "Disk scheduling (FCFS/SSTF/SCAN) and file system internals",
    ],
    prereqs: ["C or C++ basics (processes make more sense)", "Computer Architecture helps but is not required", "Comfort with percentage/arithmetic word problems"],
    notes: [
      {
        heading: "Processes & scheduling",
        points: [
          "A process is a program in execution + its state (PCB: PC, registers, memory info, open files). Threads share the address space; processes don't.",
          "Context switch = save one PCB, load another — pure overhead, which is why scheduler design is about minimising switches while maximising fairness.",
          "SJF gives minimal average waiting time (provably optimal) but needs burst-time prediction — hence exponential averaging in practice.",
          "Round Robin's quantum is a tuning dial: too small = context-switch storm; too large = degenerates to FCFS.",
          "Turnaround = completion − arrival; waiting = turnaround − burst. Drill these formulas until automatic.",
        ],
      },
      {
        heading: "Synchronization that sticks",
        points: [
          "Race condition = outcome depends on interleaving. The critical-section problem wants mutual exclusion, progress, bounded waiting.",
          "A mutex is binary locking with ownership; a semaphore is a counter (binary or counting) with wait/signal — no ownership.",
          "Producer-consumer: counting semaphore for empty slots, one for full items, mutex for the buffer — classic assembly of three primitives.",
          "Readers-writers and dining philosophers teach the real skill: spotting which classic problem a new situation resembles.",
          "Modern alternative: monitors/condition variables — the idea (wait until condition, signal on change) matters more than the syntax.",
        ],
      },
      {
        heading: "Deadlocks & memory",
        points: [
          "Deadlock needs all four: mutual exclusion, hold & wait, no preemption, circular wait. Break any one to prevent.",
          "Banker's Algorithm = safety check: is there a sequence where all processes can finish? Practise the matrix walkthrough.",
          "Paging removes external fragmentation but adds internal (last page); segmentation is user-view-sized but suffers external fragmentation.",
          "Virtual memory: demand paging + page tables + TLB cache. Page faults are the cost; LRU/FIFO/optimal are the replacement policies.",
          "Belady's anomaly: FIFO can get MORE faults with MORE frames — LRU has the stack property and can't. Great interview nugget.",
        ],
      },
      {
        heading: "Files, disks & the Linux tie-in",
        points: [
          "File system = metadata (inodes) + data blocks. Directories map names to inodes; hard links share an inode, symlinks don't.",
          "Disk scheduling: SSTF is greedy (starvation risk), SCAN sweeps like an elevator, C-SCAN is its circular variant.",
          "Linkers & loaders connect compile-time to run-time: relocation and symbol resolution are why static vs dynamic linking differs.",
          "Pair this course with OverTheWire Bandit (Practice tab) — shell fluency makes OS theory feel like home.",
        ],
      },
    ],
    practice: [
      { label: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", note: "Real shell/SSH practice — the hands-on face of this theory." },
      { label: "SadServers", url: "https://sadservers.com/", note: "Troubleshoot broken Linux scenarios: processes, disks, permissions, logs." },
      { label: "GATE overflow — OS questions", url: "https://gateoverflow.in/", note: "Numericals on scheduling, deadlocks, paging — exam-grade drilling." },
    ],
    projects: [
      { title: "Mini Unix Shell in C", level: "Advanced", brief: "fork/exec/wait, pipes, redirection, signals — implement the process concepts from Lecture 1-3 yourself." },
      { title: "CPU Scheduler Simulator", level: "Intermediate", brief: "Implement FCFS/SJF/RR, plot Gantt charts and average waiting times on random workloads." },
      { title: "Incident Runbook", level: "Beginner", brief: "Work 10 SadServers scenarios and document symptoms → diagnosis → fix for each." },
    ],
  },

  "computer-networks": {
    shortTitle: "Networks",
    description:
      "Gate Smashers' Computer Networks course — the full GATE-style journey from the physical layer to application-layer security: OSI/TCP-IP, framing and error control, IP addressing and subnetting, routing, TCP/UDP, and cryptography basics. Structured, numerical-driven, and complete. The substrate knowledge for web, cloud and security work alike.",
    learn: [
      "OSI vs TCP/IP layering and what each layer actually adds to a packet",
      "Physical & data link: cables, repeaters, hubs, switches, framing, flow & error control",
      "Error detection/correction: parity, checksum, CRC, Hamming code",
      "Medium access: ALOHA, CSMA/CD, token passing; LAN standards (Ethernet, Token Ring)",
      "Network layer: IPv4 addressing, classful vs classless (CIDR), subnetting/VLSM, routing algorithms & protocols",
      "Transport: UDP vs TCP — headers, connection lifecycle, flow control, congestion control",
      "Application layer: DNS, DHCP, HTTP/HTTPS, email; network security & cryptography basics",
    ],
    prereqs: ["Operating Systems basics help (sockets, ports)", "Binary math — subnetting is binary arithmetic in disguise", "None for layers 1-2"],
    notes: [
      {
        heading: "The layering lens",
        points: [
          "Each layer adds a header (and sometimes trailer) and serves the layer above. When debugging, ask 'which layer is failing?' first.",
          "Switch = layer 2 (MAC addresses); router = layer 3 (IP). Hubs are layer-1 relics that repeat bits.",
          "Encapsulation order to memorise: data → segment (TCP) → packet (IP) → frame (Ethernet) → bits.",
        ],
      },
      {
        heading: "Subnetting — drill until it's arithmetic",
        points: [
          "/n means n network bits; hosts = 2^(32-n) − 2. Memorise the CIDR table /24=256, /25=128, /26=64, /27=32, /28=16, /29=8, /30=2.",
          "VLSM = allocating different subnet sizes from one block — always assign the largest need first.",
          "Practice three moves: given IP+mask find network address; given requirement find mask; given two IPs say same/different subnet.",
          "Private ranges (10/8, 172.16/12, 192.168/16) + NAT are why your home Wi-Fi works — understand the translation at the router.",
        ],
      },
      {
        heading: "TCP — the protocol that runs the world",
        points: [
          "Connection lifecycle: 3-way handshake (SYN, SYN-ACK, ACK) and teardown (FIN pairs, TIME_WAIT).",
          "Reliability = sequence numbers + cumulative ACKs + retransmission. Flow control = receiver window; congestion control = cwnd (slow start, AIMD).",
          "UDP = no handshake, no ordering, no recovery — perfect for DNS lookups, video, gaming where latency beats retransmission.",
          "Ports identify processes; the socket pair (src IP:port, dst IP:port) identifies a connection.",
        ],
      },
      {
        heading: "Security foundations (bridge to the Cryptography course)",
        points: [
          "Symmetric (shared key, fast: AES) vs asymmetric (public/private, slow: RSA) — real systems use asymmetric to exchange a symmetric session key.",
          "Integrity via hashes (SHA), authenticity via digital signatures, confidentiality via encryption — three different goals, three different tools.",
          "TLS = certificates + handshake + symmetric session. SSL certificates chain to CAs — that's what the padlock means.",
          "Firewall/NAT/VPN are layer 3-4 policy devices; Wireshark is the best self-study tool ever made for this subject.",
        ],
      },
    ],
    practice: [
      { label: "Wireshark + own traffic", url: "https://www.wireshark.org/", note: "Capture a real HTTP/TLS/DNS flow and match it against lecture diagrams." },
      { label: "TryHackMe — Pre Security path", url: "https://tryhackme.com/", note: "Interactive networking fundamentals in browser labs." },
      { label: "GATE overflow — CN questions", url: "https://gateoverflow.in/", note: "Subnetting, TCP numericals and sliding-window problems." },
    ],
    projects: [
      { title: "HTTP/1.1 Server from Scratch", level: "Advanced", brief: "Raw sockets, correct headers, keep-alive, then load-test it and explain the bottleneck." },
      { title: "Subnet Planning Lab", level: "Beginner", brief: "Design addressing for a 3-site company with VLSM; verify in a packet tracer or CLI." },
      { title: "Packet Detective Report", level: "Intermediate", brief: "Capture DNS resolution + TCP handshake + TLS session for one website visit; annotate every packet." },
    ],
  },

  "network-engineering": {
    shortTitle: "Net Eng Deep Dive",
    description:
      "Hussein Nasser's deep-dive playlist for working engineers: proxies, load balancers, HA clusters, HTTP internals, gRPC, WebSockets and the practical networking behind real production systems. Where the Gate Smashers course teaches the exam version, this one teaches the datacenter version — with war stories from someone who has run it.",
    learn: [
      "OSI model through real examples rather than exam diagrams",
      "Proxies, reverse proxies, CDNs and where they sit in modern stacks",
      "Load balancing: L4 vs L7, algorithms, health checks, active-passive vs active-active HA clusters (Keepalived + HAProxy)",
      "HTTP deep mechanics: methods, headers, TLS, HTTP/2 multiplexing, HTTP/3 & QUIC, and how a GET travels through switches and gateways",
      "Practical tooling: devtools networking tab, tcpdump, tracing packets through a NodeJS app",
      "Infrastructure war stories: kernel reboots, port collisions, UPnP, Tor routing, gRPC and API protocols",
    ],
    prereqs: ["Computer Networks fundamentals (OSI, TCP/IP) first", "Some backend experience makes the war stories land harder", "Comfort reading curl/devtools output"],
    notes: [
      {
        heading: "The production networking stack",
        points: [
          "A request rarely goes client → server directly: it crosses DNS, CDN edge, L4/L7 load balancers, service meshes and proxies — each adds caching, routing or policy.",
          "L4 balancers route by IP/port (fast, no payload visibility); L7 can route by path, headers, cookies — that's how canary deploys and A/B tests happen.",
          "Active-passive clusters use VIPs + VRRP (Keepalived) so a standby takes over on failure; active-active spreads load but needs shared state discipline.",
          "Health checks are the heart of reliability: passive vs active, and why a wrong healthcheck endpoint causes silent outages.",
        ],
      },
      {
        heading: "HTTP evolution in one page",
        points: [
          "HTTP/1.1: text, one in-flight request per connection (head-of-line blocking) — the reason for asset splitting hacks.",
          "HTTP/2: binary framing + multiplexing over one TCP connection; header compression (HPACK); server push (rarely used).",
          "HTTP/3: QUIC over UDP — kills TCP-level HOL blocking, integrates TLS 1.3, faster handshake on lossy/mobile networks.",
          "TLS: handshake (certs, key exchange) then symmetric session. Know what the devtools 'Security' panel is telling you.",
          "WebSockets upgrade HTTP once, then it's a raw socket — the basis of chat, live dashboards and collaborative apps.",
        ],
      },
      {
        heading: "Debugging like a network engineer",
        points: [
          "DevTools networking tab: timing breakdown (DNS, connect, TLS, TTFB) is a free latency profiler for every request you make.",
          "tcpdump captures what wireshark pretty-prints; tracing one GET through switches/routers/gateways demystifies 'the network' forever.",
          "Latency vs throughput vs bandwidth — three words people conflate; Hussein's dedicated videos fix this permanently.",
          "When something 'isn't reachable', work the layers: DNS? TCP connect? TLS? HTTP status? Each failure mode has a signature.",
        ],
      },
    ],
    practice: [
      { label: "tcpdump your own app", url: "https://www.tcpdump.org/manpages/tcpdump.1.html", note: "Run a local Node/Express server and capture its traffic — see HTTP/2 or gRPC frames live." },
      { label: "Killercoda networking scenarios", url: "https://killercoda.com/", note: "Browser sandboxes for HAProxy, Keepalived and packet labs." },
      { label: "roadmap.sh — Networking", url: "https://roadmap.sh/networking", note: "Structured checklist that maps to this playlist's topics." },
    ],
    projects: [
      { title: "HA Reverse Proxy Lab", level: "Advanced", brief: "Two nginx/HAProxy nodes + Keepalived VIP + a healthcheck endpoint; kill the primary and watch failover." },
      { title: "Protocol Comparison Benchmark", level: "Intermediate", brief: "Benchmark REST/JSON vs gRPC vs WebSocket chat under latency and payload constraints; write up the results." },
    ],
  },

  dbms: {
    shortTitle: "DBMS",
    description:
      "Gate Smashers' complete DBMS course — ER modelling, relational algebra, every normal form, SQL from CREATE TABLE to CTEs, transactions, concurrency and recovery, indexing and PL/SQL. 140 focused lectures that cover both the university exam and the practical SQL you'll use at work. Databases are the one technology that never leaves your stack — learn it once, properly.",
    learn: [
      "ER modelling: entities, attributes, keys, relationships and mapping to tables",
      "Relational algebra as the theoretical backbone of SQL",
      "SQL end to end: DDL/DML/DCL, joins, subqueries, correlated queries, aggregates, views, CTEs, window-style patterns",
      "Normalization 1NF→BCNF with functional dependencies and decomposition (lossless + dependency preserving)",
      "Transactions: ACID, schedules, serializability, concurrency problems (dirty read, lost update) and locking protocols",
      "Recovery: log-based, deferred/immediate modification, checkpoints",
      "Indexing: single-level/multi-level, primary/secondary/clustered, B+ trees, hashing",
    ],
    prereqs: ["None — SQL is taught from zero", "Any programming background helps for PL/SQL section", "Install PostgreSQL/MySQL early and type everything"],
    notes: [
      {
        heading: "Modelling & keys",
        points: [
          "Super key ⊇ candidate key ⊇ primary key. Foreign keys enforce referential integrity — the reason joins exist.",
          "ER → relational mapping rules: strong entity → table; M:N relationship → junction table with both keys.",
          "Cardinalities matter for schema design: 1:1 (merge or FK either way), 1:N (FK on many side), M:N (junction).",
        ],
      },
      {
        heading: "Normalization — the pattern behind the rules",
        points: [
          "1NF: atomic values. 2NF: no partial dependency on part of a composite key. 3NF: no transitive dependency. BCNF: every determinant is a candidate key.",
          "The point is not ceremony — it's preventing update/insert/delete anomalies. Each normal form kills one anomaly class.",
          "Lossless join + dependency preservation are the two constraints a decomposition must satisfy; BCNF can sacrifice the second (know why).",
          "In practice: model well and 3NF falls out; denormalize later only for measured read performance.",
        ],
      },
      {
        heading: "SQL fluency ladder",
        points: [
          "SELECT/WHERE → GROUP BY/HAVING → JOINs (know inner vs left) → subqueries → correlated subqueries → CTEs → windows (ROW_NUMBER, RANK) — this is the difficulty curve, in order.",
          "NULL is not equal to anything including itself: NULL-safe logic (IS NULL, COALESCE) is a permanent source of bugs.",
          "Aggregate + GROUP BY: every selected non-aggregate column must be in GROUP BY — understand why, don't just appease the error.",
          "EXISTS usually beats IN for correlated checks; know how to read a query plan (EXPLAIN) — that's where indexing theory becomes real.",
        ],
      },
      {
        heading: "Transactions & indexing",
        points: [
          "ACID: Atomicity (all-or-nothing), Consistency (constraints hold), Isolation (concurrent ≈ serial), Durability (committed survives crash).",
          "Dirty read / non-repeatable read / phantom read — the isolation levels (read committed, repeatable read, serializable) each fix some subset.",
          "2PL grows then shrinks locks → serializable; deadlock is possible and detected/aborted — connect to the OS deadlock course.",
          "B+ tree indexes: balanced, high fan-out, leaves linked for range scans. Index the columns you filter/join/sort on; every index taxes writes.",
        ],
      },
    ],
    practice: [
      { label: "SQLBolt", url: "https://sqlbolt.com/", note: "Interactive basics — finish before Lecture 30, re-derive after." },
      { label: "PostgreSQL Exercises", url: "https://pgexercises.com/", note: "Joins → aggregates → window functions → recursive — exactly the fluency ladder." },
      { label: "DataLemur", url: "https://datalemur.com/questions", note: "Company-tagged SQL interview questions with solutions." },
      { label: "LeetCode Database", url: "https://leetcode.com/problemset/database/", note: "50 curated SQL problems, easy → hard." },
    ],
    projects: [
      { title: "Library Management Database", level: "Beginner", brief: "Schema with ER diagram, 3NF normalization writeup, triggers for fines, and 20 analytical queries." },
      { title: "SQL Analytics Case Study", level: "Intermediate", brief: "Pick a public dataset; answer 20 business questions with joins, CTEs and window functions in a published notebook." },
    ],
  },

  "discrete-mathematics": {
    shortTitle: "Discrete Math",
    description:
      "Gate Smashers' Discrete Mathematics course — sets, relations, functions, group theory and the logical machinery underneath CS theory, GATE-papers style. Short lectures that make abstract algebra approachable. This is the quiet prerequisite behind TOC, cryptography, algorithms proofs and even database theory.",
    learn: [
      "Propositional & predicate logic, and how proofs are structured",
      "Set theory: operations, laws, power sets, Cartesian products",
      "Relations: properties (reflexive/symmetric/antisymmetric/transitive), closures, posets, lattices",
      "Functions: injective/surjective/bijective and counting arguments",
      "Group theory: semigroup → monoid → group, subgroups, cyclic groups",
      "Combinatorics & recurrence basics that algorithms rely on",
    ],
    prereqs: ["None", "Comfort with symbols and definitions — this subject rewards precision"],
    notes: [
      {
        heading: "Logic & sets",
        points: [
          "Implication (p→q) is only false when p is true and q false — counter-intuitive, endlessly tested.",
          "Learn the set identities (De Morgan, distributive, absorption) like you learned algebra tables: they're the algebra of logic.",
          "Power set size = 2^n; number of relations on a set of n elements = 2^(n²) — these counting facts appear in TOC and combinatorics.",
        ],
      },
      {
        heading: "Relations — properties are everything",
        points: [
          "Reflexive/symmetric/transitive define equivalence relations → they partition sets into equivalence classes (the deep idea behind 'congruence mod n').",
          "Antisymmetric + transitive + reflexive = partial order (⊆ is the canonical example); total orders add comparability.",
          "Lattices: every pair has a meet and join — they reappear in information theory, program analysis and cryptography structures.",
          "Closure (reflexive/symmetric/transitive) is an algorithmic idea: keep composing the relation until it stops changing.",
        ],
      },
      {
        heading: "Functions & groups",
        points: [
          "Injection (one-to-one), surjection (onto), bijection (both) — bijections are 'renamings' and underpin cryptography permutations.",
          "Pigeonhole principle: the cheapest powerful proof tool in CS (hash collisions, duplicate detection).",
          "Algebraic ladder: semigroup (associative) → monoid (+identity) → group (+inverses). Abelian adds commutativity.",
          "Why groups matter here: RSA/ElGamal live in groups; DSA course's number theory, and TOC's automata symmetries, both lean on this vocabulary.",
        ],
      },
    ],
    practice: [
      { label: "GATE overflow — DM questions", url: "https://gateoverflow.in/", note: "Previous-year problems on relations, groups and functions." },
      { label: "Book of Proof (free)", url: "https://www.people.vcu.edu/~rhammack/BookOfProof/", note: "If you want proof-writing depth beyond exam prep." },
    ],
    projects: [
      { title: "Relation Property Checker", level: "Beginner", brief: "Input a relation as a matrix; auto-detect reflexive/symmetric/transitive and compute closures." },
    ],
  },

  "theory-of-computation": {
    shortTitle: "TOC",
    description:
      "Gate Smashers' Theory of Computation — finite automata, regular expressions, context-free grammars, pushdown automata and Turing machines, in exam-ready lecture form. TOC answers the deepest question in CS: what can be computed at all? It trains a specific muscle — reasoning about models of computation — that no other course builds.",
    learn: [
      "Finite automata: DFA vs NFA, equivalence, and language acceptance",
      "Regular expressions and their equivalence to finite automata; pumping lemma for proving non-regularity",
      "Closure properties of regular languages",
      "Context-free grammars: derivations, ambiguity, simplification, CNF/GNF",
      "Pushdown automata and their equivalence to CFGs",
      "Turing machines: design, variants, and the Chomsky hierarchy; decidability basics",
    ],
    prereqs: ["Discrete Mathematics (sets, relations, functions)", "Comfort with formal definitions and proofs", "Patience — the pay-off is cumulative"],
    notes: [
      {
        heading: "Automata essentials",
        points: [
          "DFA and NFA accept exactly the same languages — NFAs are just exponentially more compact to design. Convert via subset construction.",
          "Design recipe: identify what must be 'remembered' (the state), enumerate cases (e.g. 'seen a b since last a'), then wire transitions.",
          "Pumping lemma: to prove non-regularity, assume regular, pump a string, derive contradiction. It's a proof tool, not an algorithm — practise the template.",
          "Regex ↔ automata conversions (Arden's theorem for state equations) show up in GATE constantly.",
        ],
      },
      {
        heading: "Grammars & the hierarchy",
        points: [
          "Chomsky hierarchy: regular ⊂ context-free ⊂ context-sensitive ⊂ recursively enumerable — each level adds memory/power.",
          "CFLs need a stack: PDA = NFA + stack. Matching parentheses and palindromes are the canonical examples.",
          "Ambiguity = one string with two parse trees; inherently ambiguous languages exist (know one example).",
          "CNF/GNF conversions look mechanical but train exactly the manipulation skills exams test.",
        ],
      },
      {
        heading: "Turing machines & decidability (the big picture)",
        points: [
          "A TM = finite control + infinite tape. Everything 'computable' is TM-computable (Church-Turing thesis).",
          "Recursive = decidable (always halts); recursively enumerable = semi-decidable (halts on YES). The halting problem is RE but not recursive.",
          "Understand reducibility at a conversational level: if you could decide X, you could decide halting — hence undecidable.",
          "Why software engineers care: it's the theoretical ceiling on static analysis, linters and 'will this program terminate' tooling.",
        ],
      },
    ],
    practice: [
      { label: "JFLAP (automata simulator)", url: "https://www.jflap.org/", note: "Build and simulate DFAs, PDAs and TMs visually." },
      { label: "GATE overflow — TOC questions", url: "https://gateoverflow.in/", note: "Previous-year problems with community solutions." },
    ],
    projects: [
      { title: "Regex → NFA → DFA Visualiser", level: "Advanced", brief: "Implement Thompson's construction + subset construction; test on live regexes from the course." },
    ],
  },

  "compiler-design": {
    shortTitle: "Compilers",
    description:
      "Gate Smashers' Compiler Design course — lexical analysis, parsing (LL/LR families), syntax-directed translation, intermediate code, optimization and code generation. CD is the classic 'everything connects' subject: automata, grammars, data structures and architectures all meet here. Excellent GATE coverage and genuinely useful for tool-building.",
    learn: [
      "Compiler phases end to end: lexical → syntax → semantic → IR → optimize → codegen",
      "Lexical analysis: tokens, regular expressions, lexers",
      "Grammars & parsing: top-down (recursive descent, LL(1)) and bottom-up (LR(0), SLR, CLR, LALR) with parsing tables",
      "Syntax-directed translation: attributes, S/L-attributed definitions, evaluation orders",
      "Intermediate representations: three-address code, symbol tables, activation records",
      "Optimization: local vs global, dataflow analysis, liveness; storage allocation strategies",
    ],
    prereqs: ["Theory of Computation (grammars, automata)", "DSD/OS basics for the storage sections", "Discrete math for the formal machinery"],
    notes: [
      {
        heading: "Front end: lexing & parsing",
        points: [
          "Lexer turns characters → tokens using regex/automata; parser turns tokens → parse tree using grammars. The interface is the token stream.",
          "LL(1): top-down, one lookahead token, no left recursion, no common prefixes — learn the FIRST/FOLLOW table construction cold.",
          "LR family (LR(0)→SLR→CLR→LALR) builds the tree bottom-up with a state stack; LALR(1) is what yacc/bison generate — fewer states than CLR, same power class.",
          "Left recursion must be eliminated for top-down parsers; left factoring handles shared prefixes. Both conversions are mechanical and examinable.",
        ],
      },
      {
        heading: "Middle end: IR & semantics",
        points: [
          "Three-address code (x = y op z) is the lingua franca IR — simple, linear, easy to optimize.",
          "Syntax-directed definitions attach attributes to grammar symbols; S-attributed (synthesis only) evaluates bottom-up, L-attributed allows inherited top-down/left-to-right.",
          "Symbol tables record names/types/scopes; nested scopes are a stack of tables — connect to how block structure works in any language.",
          "Activation records (frames) implement procedure calls: return address, saved registers, locals, parameters — the ABI's beating heart.",
        ],
      },
      {
        heading: "Optimization & codegen",
        points: [
          "Local optimization works within basic blocks: constant folding, copy propagation, dead-code elimination, common subexpressions.",
          "Global optimization needs dataflow analysis: reaching definitions, available expressions, live variables — liveness drives register allocation.",
          "Peephole optimization is the cheap final pass over target code — pattern-replace at machine level.",
          "Why app devs care: every 'why is this loop slow' question is a mini version of these analyses (see also: JIT compilers in JS/Java).",
        ],
      },
    ],
    practice: [
      { label: "GATE overflow — CD questions", url: "https://gateoverflow.in/", note: "Parsing-table and SDT numericals are the high-yield drill." },
      { label: "Crafting Interpreters (free book)", url: "https://craftinginterpreters.com/", note: "If you want to BUILD a compiler/interpreter, not just pass exams — pairs beautifully." },
    ],
    projects: [
      { title: "Recursive-Descent Expression Evaluator", level: "Intermediate", brief: "Lexer + parser + evaluator for arithmetic with variables — Mini Chapter 1 of Crafting Interpreters." },
      { title: "Tiny Compiler: infix → three-address code", level: "Advanced", brief: "Emit TAC for assignments/conditionals/loops, then implement dead-code elimination over it." },
    ],
  },

  javascript: {
    shortTitle: "JavaScript",
    description:
      "Chai aur Code's JavaScript series (Hindi) — the modern, project-flavoured JS course: fundamentals, scope and closures, DOM, events, fetch/APIs and OOP, all taught while building real mini-projects. It respects your intelligence: no toy examples divorced from reality. The gateway to React, Node and the entire modern web stack.",
    learn: [
      "Variables (let/const/var), data types, operators, and type coercion gotchas",
      "Strings, numbers, arrays and objects with their most-used methods",
      "Functions, expressions vs declarations, and the this keyword",
      "Scope, closures, hoisting — the parts everyone gets wrong",
      "DOM selection, manipulation, events and event delegation",
      "Async JavaScript: setTimeout, callbacks, promises, async/await and fetch",
      "Classes/prototypes, modules, and browser storage (localStorage)",
    ],
    prereqs: ["HTML/CSS basics (elements, tags, selectors)", "A browser — that's the whole dev environment", "VS Code + Live Server extension"],
    notes: [
      {
        heading: "Core semantics you must own",
        points: [
          "let/const are block-scoped and hoisted-but-uninitialised (TDZ); var is function-scoped — write const by default, let when reassigning, var never.",
          "== coerces types, === doesn't. Just use ===. But know the coercion table for interviews: null == undefined is true.",
          "Objects are reference types: const obj can still mutate. Spread {...obj} is a shallow copy — nested objects share references.",
          "Arrays are objects with numeric keys and a length — that's why typeof [] is 'object' and why Array.isArray exists.",
        ],
      },
      {
        heading: "Scope, closures & this",
        points: [
          "A closure is a function remembering its lexical environment — counters, private state and every hook() you'll use in React are closures.",
          "Hoisting moves declarations (not initialisations) up per scope: function declarations fully, var partially, let/const not visibly.",
          "this: in a method = the object; standalone = window/undefined; in arrow functions = inherited lexically. Event handlers and callbacks are where it bites.",
          "call/apply/bind set this explicitly — bind returns a bound copy, which is the classic fix for detached handlers.",
        ],
      },
      {
        heading: "DOM & events",
        points: [
          "querySelector/querySelectorAll cover 95% of selection needs; remember NodeList vs HTMLCollection (the former has forEach).",
          "Events bubble up; delegation attaches one listener on a parent and inspects event.target — the pattern behind dynamic lists.",
          "Event loop: call stack first, then microtasks (promises), then macrotasks (setTimeout). That's why Promise.then beats setTimeout(0).",
          "localStorage stores strings only — JSON.stringify/parse everything; it's synchronous and domain-scoped (CodeAtlas itself uses it!).",
        ],
      },
      {
        heading: "Async & APIs",
        points: [
          "Promise states: pending → fulfilled/rejected. async/await is promise syntax sugar — try/catch replaces .catch().",
          "fetch: response.ok and response.status need manual checking; it only rejects on network failure — a classic silent bug.",
          "JSON is the exchange format: JSON.stringify/parse round-trip; Date and undefined don't survive it intact.",
          "Always handle loading + error + empty states in UI code — the difference between demo and product.",
        ],
      },
    ],
    practice: [
      { label: "JavaScript30", url: "https://javascript30.com/", note: "30 vanilla-JS builds — do 3 per module of this course." },
      { label: "Exercism JavaScript track", url: "https://exercism.org/tracks/javascript", note: "Language drills with mentor feedback." },
      { label: "Frontend Mentor", url: "https://www.frontendmentor.io/challenges", note: "Design briefs to turn JS skills into real UIs." },
    ],
    projects: [
      { title: "Weather App with fetch", level: "Beginner", brief: "OpenWeather API + async/await + error/loading states. Your first real API integration." },
      { title: "Infinite Scroll Gallery", level: "Intermediate", brief: "IntersectionObserver + fetch pagination + debounce — the patterns behind every modern feed." },
    ],
  },
};
