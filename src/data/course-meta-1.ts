import type { CourseMeta } from "./types";

// Curated metadata — courses 1–8
export const COURSE_META_1: Record<string, CourseMeta> = {
  "computer-fundamentals": {
    shortTitle: "CS50",
    description:
      "Harvard's legendary introduction to computer science, taught by David Malan. CS50 builds the mental models every engineer needs — abstraction, memory, correctness and efficiency — through C, Python and SQL. It is the single best starting point in this entire catalog: rigorous, cinematic, and relentlessly beginner-friendly.",
    learn: [
      "Computational thinking: problems as inputs, outputs and algorithms",
      "C programming: types, loops, functions, pointers and memory management",
      "Core data structures: arrays, linked lists, hash tables and tries",
      "Algorithms: linear/binary search, bubble/selection/merge sort, Big-O intuition",
      "Python, SQL and web basics (HTML/CSS/JS/Flask) as abstraction layers",
      "How debugging, testing and correctness fit into real engineering",
    ],
    prereqs: ["No prior programming needed", "High-school level math comfort", "Curiosity — this course rewards persistence"],
    notes: [
      {
        heading: "Core concepts to internalise",
        points: [
          "Abstraction is the recurring theme: Scratch hides syntax, C hides electricity, Python hides C, SQL hides storage. Always ask 'what is this layer hiding?'",
          "Every problem has a trade-off between time, memory and developer effort — Big-O notation is the vocabulary for the first two.",
          "C teaches you what a computer actually does: strings are char arrays ending in \\0, and every byte you use was either declared or allocated.",
          "Binary search only works on sorted input — preconditions matter. O(log n) comes from halving the search space each step.",
          "Recursion is a function trusting itself on a smaller input; every recursive call lives on the stack with its own local variables.",
        ],
      },
      {
        heading: "Memory — the lecture that changes everything",
        points: [
          "Hexadecimal (0-9, A-F) is the human-friendly view of binary; one hex digit = 4 bits.",
          "Pointers are just addresses. & gives an address, * follows an address. Draw boxes and arrows until it clicks.",
          "malloc reserves heap memory at runtime; forgetting free() leaks it. Stack memory is automatic but scoped to the function call.",
          "A garbage value is whatever bytes happened to be there — reading uninitialised memory is undefined behaviour, not an error you'll see.",
          "Buffer overflow happens when you write past an array's bounds — historically the #1 class of security vulnerability.",
        ],
      },
      {
        heading: "Data structures in one page",
        points: [
          "Arrays: O(1) access, O(n) insertion in middle, contiguous memory.",
          "Linked lists: O(1) insertion given the node, O(n) access, each node costs pointer overhead.",
          "Hash tables: O(1) average lookup via hashing + chaining; collision handling is where the engineering lives.",
          "Tries: O(length of key) lookup regardless of how much data is stored — the structure behind autocomplete.",
          "Trees organise hierarchy; binary search trees keep data sorted for O(log n) search, insert and delete.",
        ],
      },
      {
        heading: "How to study CS50 properly",
        points: [
          "Watch each lecture, then do the problem set yourself before watching any solution walkthrough.",
          "Type every program from scratch — muscle memory for syntax is real.",
          "Use check50 and debug50: the first tests correctness, the second makes invisible state visible.",
          "Struggle is the feature, not the bug. 30 minutes of being stuck teaches more than 3 hours of tutorials.",
          "Finish with the Final Project: build anything, however small — shipping matters.",
        ],
      },
    ],
    practice: [
      { label: "CS50 Problem Sets (official)", url: "https://cs50.harvard.edu/x/", note: "The labs and psets are the real course — code along weekly." },
      { label: "Exercism C track", url: "https://exercism.org/tracks/c", note: "Reinforce C syntax with small mentored exercises." },
      { label: "SQLBolt", url: "https://sqlbolt.com/", note: "Run this right after the SQL lecture to make queries stick." },
    ],
    projects: [
      { title: "Rebuild each pset from scratch", level: "Beginner", brief: "A week later, redo Mario, Credit and Filter without notes. Measure what you actually retained." },
      { title: "Mini Unix Shell in C", level: "Advanced", brief: "Parsing, fork/exec, pipes and signals — the natural 'grad school' extension of CS50's C content." },
    ],
    resourceLinks: [
      { label: "CS50 Notes (official)", url: "https://cs50.harvard.edu/x/notes/" },
      { label: "CS50 Style Guide", url: "https://cs50.readthedocs.io/style/c/" },
    ],
  },

  "8-bit-computer": {
    shortTitle: "8-Bit Computer",
    description:
      "Ben Eater builds an entire 8-bit computer from raw breadboards and breadboard wires — no microcontroller, no magic. Watching and following along dismantles the black box of 'the computer': you will know, physically, what a CPU is. This is the most concrete computer architecture education on the internet.",
    learn: [
      "Digital logic from first principles: 555 timer clocks, SR/D/JK latches and flip-flops",
      "Register design: tri-state buffers, bus architecture and register transfers",
      "ALU construction and how flags (zero, carry) drive conditional jumps",
      "RAM organisation, binary counters and program counter behaviour",
      "Control logic, microcode and what an instruction actually does cycle by cycle",
      "Debugging hardware with a logic probe — a skill that transfers to any low-level work",
    ],
    prereqs: ["Basic binary arithmetic", "CS50 or equivalent C exposure helps (not required)", "Patience — hardware has no undo"],
    notes: [
      {
        heading: "The clock and memory elements",
        points: [
          "The 555 timer in astable mode generates the heartbeat; monostable/bistable modes give single-step and manual control.",
          "An SR latch stores one bit: two cross-coupled NOR (or NAND) gates with feedback. Feedback is what creates memory.",
          "A D latch is an SR latch with an enable line; a D flip-flop is edge-triggered — it only updates on the clock edge, which prevents race conditions.",
          "JK flip-flops solve the invalid state of SR latches; the master-slave arrangement avoids the 'racing' problem where output changes twice per clock.",
          "Two's complement is how negative numbers work in hardware: flip the bits, add one. 0111 (7) becomes 1001 (-7) in 4 bits.",
        ],
      },
      {
        heading: "Bus, registers and the ALU",
        points: [
          "Tri-state logic lets multiple chips share one wire: exactly one output is 'driving' at a time, the rest go high-impedance.",
          "A register is a row of D flip-flops sharing a clock — the whole byte loads on one tick.",
          "The ALU is two 74LS181-style units plus adders; overflow/zero/carry outputs become the CPU's flags register.",
          "Every instruction is a choreography of control signals: CO (counter out), MI (MAR in), RO (RAM out), RI (RAM in)... The computer is a state machine walking through microcode steps.",
        ],
      },
      {
        heading: "Why this matters for software engineers",
        points: [
          "After this course, 'the CPU fetches, decodes and executes' stops being a diagram and becomes something you have literally wired.",
          "Cache, pipelining and virtual memory (the CS Core courses) make far more sense once you know how raw fetch-execute works.",
          "Assembly is just human-readable microcode choreography — this course is the best preparation for reading it.",
          "Hardware debugging (probe one wire at a time, test assumptions incrementally) is the same discipline as production debugging.",
        ],
      },
    ],
    practice: [
      { label: "Ben Eater's written kit guide", url: "https://eater.net/8bit", note: "Diagrams, parts lists and kits for every module." },
      { label: "Wokwi circuit simulator", url: "https://wokwi.com/", note: "Simulate 7400-series logic without buying hardware." },
      { label: "Tinkercad Circuits", url: "https://www.tinkercad.com/circuits", note: "Beginner-friendly breadboard simulation for the latch modules." },
    ],
    projects: [
      { title: "Breadboard the full machine", level: "Intermediate", brief: "Follow the series module by module. Total cost is modest; the understanding is permanent." },
      { title: "Software emulator of the 8-bit CPU", level: "Expert", brief: "Model registers, ALU, flags and microcode stepping in code, then run a program on your emulator." },
    ],
    resourceLinks: [{ label: "eater.net — all modules & kits", url: "https://eater.net/" }],
  },

  "cpp-programming": {
    shortTitle: "C++",
    description:
      "Love Babbar's complete placement series: C++ syntax, STL, pointers, OOP and every core DSA topic, taught with interview problems inline. It doubles as your first programming course and your first DSA course. Pair it with the practice links below and it will carry you through most campus and off-campus interview screens.",
    learn: [
      "C++ fundamentals: variables, conditionals, loops, functions and arrays",
      "Time & space complexity, and why TLE happens — before DSA even starts",
      "The STL: vector, map, set, pair, iterators and where each shines",
      "Pointers, references, dynamic memory and how C++ actually manages data",
      "Full OOP: classes, the four pillars, constructors, static members, friend functions",
      "DSA end to end: linked lists, stacks, queues, trees, graphs, DP, greedy, sliding window",
    ],
    prereqs: ["None — starts from Lecture 1", "A C++ compiler or OnlineGDB/Compiler Explorer account", "Willingness to pause and solve problems mid-video"],
    notes: [
      {
        heading: "Language fundamentals that matter most",
        points: [
          "Pass-by-value copies; pass-by-reference (&) aliases. Everything about efficient C++ flows from knowing which one you're doing.",
          "Arrays decay to pointers when passed to functions — that's why sizes must travel separately.",
          "The STL is the difference between 10 lines and 100: sort(v.begin(), v.end()), map for ordered key-value, unordered_map for O(1) average lookups.",
          "Strings are just char arrays with niceties; getline vs cin matters more than beginners expect.",
          "static members belong to the class, not objects; friend functions can touch private data — use sparingly.",
        ],
      },
      {
        heading: "Pointers & memory checklist",
        points: [
          "int* p = &x stores an address; *p dereferences it. Double pointers (int**) store addresses of pointers — used for linked-list head updates.",
          "Stack allocation dies at scope exit; heap allocation (new/delete) lives until freed. Forgetting delete = leak; deleting twice = crash.",
          "Reference variables are safer aliases; prefer them over raw pointers in application code.",
          "Dangling pointers appear when you free memory but keep using the pointer — draw the boxes if unsure.",
        ],
      },
      {
        heading: "DSA progression in this course",
        points: [
          "Complexity first (Lecture 11) — never skip it; every later topic leans on it.",
          "Binary search gets three lectures + problem sets because 'search on answer' is a pattern, not just an algorithm.",
          "Recursion gets ~10 days of problems: subsets, permutations, maze. Everything from trees to DP is recursion wearing different clothes.",
          "Trees: traversals → interview patterns → BST. Graphs: BFS/DFS → cycle detection → topological sort → shortest paths.",
          "DP is taught as memoization → tabulation → space optimisation. Do every problem in that order.",
        ],
      },
      {
        heading: "Study strategy",
        points: [
          "Watch → pause at each problem → attempt for 10 minutes → resume. Passive watching creates false confidence.",
          "Maintain one solution file per topic with your own complexity comments; it becomes your revision sheet.",
          "After each module, solve 3-5 LeetCode problems of the same pattern (links in Practice).",
          "OOP lectures map directly to interview theory questions — write your own one-page summary of the 4 pillars.",
        ],
      },
    ],
    practice: [
      { label: "LeetCode Problem Set", url: "https://leetcode.com/problemset/", note: "Filter by topic matching the current module; start Easy." },
      { label: "Striver A2Z Sheet", url: "https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet", note: "The structured problem ladder that mirrors this course." },
      { label: "Exercism C++ track", url: "https://exercism.org/tracks/cpp", note: "Language-focused exercises with mentoring." },
      { label: "Codeforces Problemset", url: "https://codeforces.com/problemset/", note: "For when LeetCode feels easy — rating-filtered problems." },
    ],
    projects: [
      { title: "STL-powered Console Library System", level: "Beginner", brief: "CRUD over vector/map with file persistence — proves language fluency before DSA takes over." },
      { title: "Algorithm Visualizer", level: "Intermediate", brief: "Animate sorting and searching from this course with speed control. Code + teaching tool in one." },
    ],
  },

  "java-programming": {
    shortTitle: "Java",
    description:
      "Kunal Kushwaha's Java bootcamp: the language, then DSA in Java, then deep OOP — with the clearest free explanations of recursion, sorting and complexity on YouTube. The teaching philosophy is 'understand the flow on paper first, then type'. It pairs perfectly with the DSA Complete course for interview prep.",
    learn: [
      "Java syntax, control flow, functions, arrays and strings",
      "Recursion — taught visually with call-stack tracing",
      "Sorting algorithms: bubble, selection, insertion, cycle, merge, quick",
      "Complexity analysis and the interview mindset around it",
      "OOP deep dive: classes, inheritance, packages, access control, interfaces, annotations",
      "Collections, generics and advanced structures: linked lists, stacks, queues, trees (BST/AVL/segment), heaps and tries",
    ],
    prereqs: ["No Java experience required", "Any prior programming helps but is optional", "JDK + IntelliJ IDEA (Community) installed"],
    notes: [
      {
        heading: "Language essentials",
        points: [
          "Everything lives inside a class; the JVM is the runtime that executes bytecode. Know the difference between JDK, JRE and JVM.",
          "Primitives vs wrapper types: int is a value, Integer is an object — autoboxing hides this until it bites in collections.",
          "Strings are immutable; StringBuilder is the mutable buffer. Concatenating in loops with + is a classic silent performance bug.",
          "Arrays are objects with .length; ArrayList is the growable alternative with generics: ArrayList<Integer>.",
        ],
      },
      {
        heading: "Recursion — Kunal's signature teaching",
        points: [
          "Every recursive call gets its own stack frame: draw the calls going 'up' (base case) and values coming 'back down'.",
          "Start with fibonacci and factorial, but graduate to subsequence problems — that's where recursion becomes pattern recognition.",
          "The recurrence-relations view (T(n) = ...) connects recursion to the Master Theorem used in the Algorithms Intuition course.",
          "When a problem says 'return all combinations', think recursion + backtracking: choose, explore, un-choose.",
        ],
      },
      {
        heading: "OOP as designed",
        points: [
          "Encapsulation = private fields + controlled access. Inheritance = 'is-a'. Polymorphism = one interface, many behaviours (overloading at compile time, overriding at runtime).",
          "Abstract classes vs interfaces: state + partial behaviour vs pure contract. Default methods in interfaces blur it — know why they exist.",
          "Packages organise namespaces; access modifiers (private/default/protected/public) control visibility across them.",
          "Object class methods — equals(), hashCode(), toString() — matter the moment objects go into HashMaps or HashSets.",
        ],
      },
      {
        heading: "Interview-facing structures",
        points: [
          "Know Collections hierarchy: List (ArrayList/LinkedList), Set (HashSet/TreeSet), Queue/Deque, Map (HashMap/TreeMap).",
          "HashMap = array of buckets + hash + chaining; understand why overriding equals() without hashCode() breaks it.",
          "Trees: BST search/insert/delete, then AVL rotations — the course covers both, which most Java playlists skip.",
          "Sorting: know which sort is stable (merge, insertion, bubble) and in-place (quick, heap), and why it matters for the problem at hand.",
        ],
      },
    ],
    practice: [
      { label: "LeetCode Problem Set", url: "https://leetcode.com/problemset/", note: "Solve each topic right after its lecture; tag-filter by difficulty." },
      { label: "NeetCode Practice", url: "https://neetcode.io/practice", note: "Blind 75 / NeetCode 150 with explanations in multiple languages including Java." },
      { label: "Exercism Java track", url: "https://exercism.org/tracks/java", note: "Idiomatic-Java drills with mentor feedback." },
    ],
    projects: [
      { title: "Bank Account Console App", level: "Beginner", brief: "Classes, encapsulation, exceptions and collections — the four OOP pillars in one small system." },
      { title: "Custom ArrayList<T> Implementation", level: "Intermediate", brief: "Rebuild generics + dynamic arrays yourself. You will never fear Collections internals again." },
    ],
  },

  "python-programming": {
    shortTitle: "Python",
    description:
      "Corey Schafer's classic Python series — the internet's most-recommended Python fundamentals playlist. Concise, example-driven and refreshingly free of filler: every video is a standalone concept (OS module, decorators, generators, OOP) explained the way a working engineer would use it. After this, Python becomes a tool, not a topic.",
    learn: [
      "Installation, REPL, variables, strings, numbers and formatting",
      "Lists, tuples, sets, dictionaries — the four containers you'll use daily",
      "Conditionals, loops, functions, *args/**kwargs and scopes (LEGB)",
      "The OS and sys modules: scripting real filesystem work",
      "Closures, decorators, generators and comprehensions",
      "OOP: classes, class variables, classmethods/staticmethods, inheritance and dunder methods",
    ],
    prereqs: ["None", "Python 3 installed (or Google Colab)", "A text editor you like — VS Code is fine"],
    notes: [
      {
        heading: "Containers cheat-sheet",
        points: [
          "List: ordered, mutable, O(1) append — the default collection.",
          "Tuple: ordered, immutable — use for fixed shapes and dict keys; faster and safer than lists for constants.",
          "Set: unordered, unique members, O(1) membership — reach for it the moment you deduplicate or test 'in'.",
          "Dict: ordered (3.7+), O(1) key lookup; .get() avoids KeyError; .items() is the iteration idiom.",
          "Comprehensions replace 4-line loops: [f(x) for x in xs if cond] — readable beats clever, but learn both forms.",
        ],
      },
      {
        heading: "Functions & scope",
        points: [
          "*args collects extra positionals into a tuple; **kwargs collects keyword args into a dict — how flexible APIs accept options.",
          "LEGB: Local → Enclosing → Global → Built-in. Closures capture enclosing variables; the nonlocal and global keywords override lookup.",
          "Decorators are functions that wrap functions: @decorator replaces f with wrapper(f). Logging, timing and auth are the canonical uses.",
          "Generators yield lazily — one item at a time, constant memory. Any loop building a huge list is a generator candidate.",
        ],
      },
      {
        heading: "OOP the Pythonic way",
        points: [
          "__init__ initialises; self is the instance. Instance variables differ from class variables — shadowing surprises live here.",
          "@classmethod receives cls (factory pattern: from_string); @staticmethod is a plain function parked in the class namespace.",
          "Dunder methods (__repr__, __len__, __add__, __enter__/__exit__) integrate your objects with Python syntax — including the with statement.",
          "Inheritance + super() covers 90% of needs; composition (has-a) is often cleaner than deep hierarchies.",
        ],
      },
      {
        heading: "Practical habits",
        points: [
          "Use the OS module (os.path / pathlib) instead of string paths — cross-platform from day one.",
          "Virtual environments (python -m venv) isolate projects; pip install inside them, never globally.",
          "f-strings for formatting; learn {value:.2f} style mini-language.",
          "Read the standard library docs weekly — argparse, collections, itertools and datetime repay study many times over.",
        ],
      },
    ],
    practice: [
      { label: "Exercism Python track", url: "https://exercism.org/tracks/python", note: "Mentored exercises that mirror each video topic." },
      { label: "Kaggle Learn — Python", url: "https://www.kaggle.com/learn/python", note: "Notebook-based drills; bridges to the ML courses." },
      { label: "Codewars", url: "https://www.codewars.com/kata", note: "Kata ranked 8kyu→1kyu; great daily warm-ups." },
    ],
    projects: [
      { title: "File Organiser Script", level: "Beginner", brief: "Sort a messy Downloads folder by extension/date using os + pathlib + shutil. Immediately useful." },
      { title: "Decorator-powered CLI Timer & Logger", level: "Intermediate", brief: "Build @timer, @log_call and @retry decorators and compose them on real functions." },
    ],
    resourceLinks: [{ label: "Corey Schafer's GitHub snippets", url: "https://github.com/CoreyMSchafer/code_snippets", note: "All code from the series, organised per video." }],
  },

  "dsa-complete": {
    shortTitle: "DSA (A2Z)",
    description:
      "Striver's A2Z DSA course — the most complete free DSA curriculum in existence: 300+ lectures and problems walking from language basics through every interview pattern to hard DP and graphs. If you complete even 60% of this alongside its practice sheet, you are prepared for product-company interviews. Treat it as a semester, not a weekend.",
    learn: [
      "Complexity analysis and the 'better, optimal' framing for every problem",
      "All core structures: arrays, strings, linked lists, stacks, queues, hashings, trees, BSTs, heaps, tries",
      "Every major algorithm family: sorting, binary search, sliding window, greedy, backtracking",
      "Graphs completely: BFS/DFS, topological sort, shortest paths (Dijkstra/Bellman-Floyd), MST (Prim/Kruskal), disjoint sets, bridges/articulation points",
      "Dynamic programming as a system: grids, subsequences, strings, stocks, LIS, partition DP, DP on trees",
      "Interview patterns: two pointers, prefix sums, XOR tricks, maths/number theory, and how to narrate your solution",
    ],
    prereqs: ["One language (C++/Java/Python) at array + function level", "The C++ or Java course in this catalog covers it", "A LeetCode/GfG account to solve along"],
    notes: [
      {
        heading: "How to run the A2Z system",
        points: [
          "Follow the sheet order — steps are dependency-sorted. Do the 'Learn' lecture, then 'Better/Optimal' solutions, then the practice problems listed.",
          "Keep a revision log: problem name, pattern, complexity, the one line you'd forget in 3 months. Revisit weekly.",
          "Rule of thumb: if you can't re-solve a problem from a blank editor 3 days later, it isn't learned yet — re-solve it.",
          "Don't chase 100% completion. The core steps (1-19 plus DP) deliver ~90% of interview value; extras are strength training.",
        ],
      },
      {
        heading: "The patterns worth memorising",
        points: [
          "Two pointers & sliding window: subarray sums, longest substring without repeat, minimum window — recognise 'contiguous + optimise' instantly.",
          "Prefix sums & hashing: 'count subarrays with sum K' becomes O(n) the moment you store running sums in a map.",
          "Binary search on answer: when the problem says 'minimise the maximum' (aggressive cows, book allocation, Koko bananas) — binary search the answer space, not the array.",
          "Merge intervals, cycle detection (fast/slow), reversal in groups, Dutch flag — small named tools that solve whole families.",
        ],
      },
      {
        heading: "Trees, graphs & the mental models",
        points: [
          "Trees are recursion with a return value: height, diameter, max path sum all follow 'ask children, combine'.",
          "BFS = level order = shortest unweighted path; DFS = explore + backtrack = components, cycles, topological order.",
          "Dijkstra needs non-negative weights and a priority queue; Bellman-Ford handles negatives in O(V·E); Floyd-Warshall is all-pairs DP.",
          "Disjoint Set (Union by size + path compression) is near-O(1) per op — it powers Kruskal and dynamic connectivity problems.",
          "Topological sort = DFS finish-time order (or Kahn's BFS); any 'prerequisite' problem is secretly topo sort.",
        ],
      },
      {
        heading: "DP — the final boss, systemised",
        points: [
          "Striver's DP recipe: express in terms of indices, do all stuff on that index, take the min/max/sum of choices, write base cases.",
          "Memoization = recursion + cache; tabulation = iterative table; space-optimise by keeping only the rows/vars you use.",
          "Classic families: knapsack/subset-sum, LCS/edit-distance (two-sequence DP), LIS (with binary search n log n), grids with obstacles, stocks (state machine), partitions (MCM, burst balloons).",
          "When stuck: write the brute force recursion, add memo on the changing parameters, then convert. That pipeline solves 80% of DP.",
        ],
      },
    ],
    practice: [
      { label: "Striver A2Z Sheet (official)", url: "https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet", note: "The companion problem ladder — this IS the practice system for the course." },
      { label: "LeetCode Problem Set", url: "https://leetcode.com/problemset/", note: "Tag-filter per topic; company tags for interview season." },
      { label: "CSES Problem Set", url: "https://cses.fi/problemset/", note: "300 clean algorithmic tasks — the best DP/graph gym after the lectures." },
      { label: "NeetCode Practice", url: "https://neetcode.io/practice", note: "Curated Blind 75/150 lists for time-boxed revision." },
    ],
    projects: [
      { title: "Pattern Notebook (public repo)", level: "Beginner", brief: "One markdown per pattern with 3 problems + your own complexity analysis. Interview revision gold." },
      { title: "Algorithm Visualizer", level: "Intermediate", brief: "Animate sorting, BFS/DFS pathfinding and binary search with step counters." },
      { title: "Full-text Search Engine (mini)", level: "Advanced", brief: "Tries + TF-IDF ranking over a corpus; benchmark against naive scan." },
    ],
    resourceLinks: [
      { label: "takeUforward site", url: "https://takeuforward.org/" },
      { label: "Striver's SDE Sheet", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" },
    ],
  },

  "algorithms-intuition": {
    shortTitle: "Algorithms",
    description:
      "Professor Abdul Bari's Algorithms playlist — a university-grade algorithms course focused on intuition over code. Asymptotic notation, recurrences and the Master Theorem, divide & conquer, greedy, dynamic programming, backtracking and string matching, each derived on the board until it feels obvious. The perfect theory companion to Striver's practice-heavy course.",
    learn: [
      "Asymptotic notation (Big-O, Omega, Theta) with real derivations, not memorised tables",
      "Recurrence relations and the Master Theorem — solved properly",
      "Divide & conquer: binary search, merge sort, quick sort, Strassen's matrix multiplication",
      "Greedy method: knapsack (fractional), job sequencing, Prim's, Kruskal's, Dijkstra's — with proofs of the greedy choice",
      "Dynamic programming: 0/1 knapsack, travelling salesman, multistage graphs, Floyd-Warshall",
      "Backtracking: N-Queens, sum of subsets, graph colouring, Hamiltonian cycle",
      "String matching: naive, Rabin-Karp and KMP",
    ],
    prereqs: ["Comfort with loops/functions in any language", "Basic discrete math helps (see the Discrete Mathematics course)", "Patience for blackboard-style derivation"],
    notes: [
      {
        heading: "Complexity, done right",
        points: [
          "Big-O is an upper bound, Omega lower, Theta tight. Saying 'O(n)' when you mean Θ(n) is loose talk interviewers notice.",
          "Recurrences model recursive cost; the Master Theorem resolves T(n) = aT(n/b) + f(n) by comparing f(n) against n^(log_b a).",
          "Amortised analysis (e.g. dynamic array doubling) explains why occasional O(n) appends still average to O(1).",
        ],
      },
      {
        heading: "Greedy vs DP — the eternal question",
        points: [
          "Greedy works when the problem has the greedy-choice property + optimal substructure; prove the choice, don't just hope.",
          "Fractional knapsack → greedy (sort by value/weight). 0/1 knapsack → DP. Same data, different structure — the classic contrast pair.",
          "Dijkstra is greedy on the closest unsettled node; Prim/Kruskal are greedy on cheapest edges (cut/cycle properties justify them).",
          "When greedy fails (overlapping subproblems, choices affecting future options), DP enters via memoization or tabulation.",
        ],
      },
      {
        heading: "DP & backtracking mechanics",
        points: [
          "Multistage graphs and Floyd-Warshall show DP as 'fill the table in dependency order' — identify the dependency, the table writes itself.",
          "TSP with bitmask DP: 2^n · n^2 — know when exponential-but-correct beats heuristic.",
          "Backtracking = DFS over the solution space with pruning. N-Queens' pruning (no two share row/diagonal) is the template for all constraint problems.",
          "Sum-of-subsets and graph colouring follow the same skeleton: state → candidates → feasibility check → recurse → undo.",
        ],
      },
      {
        heading: "String matching",
        points: [
          "Naive is O(nm); Rabin-Karp hashes windows and compares numbers — O(n+m) expected with a good hash.",
          "KMP builds the failure (LPS) table so the text pointer never moves backwards — O(n+m) worst case.",
          "Understand why KMP's shift is safe: the longest proper prefix that is also a suffix carries all usable information forward.",
        ],
      },
    ],
    practice: [
      { label: "CSES Problem Set", url: "https://cses.fi/problemset/", note: "Algorithmic tasks that map 1:1 to the lecture families." },
      { label: "Codeforces Problemset", url: "https://codeforces.com/problemset/", note: "Rating-sorted problems; greedy/DP/divide-conquer tags." },
      { label: "LeetCode Problem Set", url: "https://leetcode.com/problemset/", note: "Interview-flavoured practice for the same patterns." },
    ],
    projects: [
      { title: "Complexity Benchmarking Lab", level: "Intermediate", brief: "Implement 5 algorithms from the course, time them across input sizes, and fit curves against their predicted complexities." },
      { title: "Algorithm Visualizer", level: "Intermediate", brief: "Animate merge/quick sort, N-Queens backtracking and Dijkstra — the course's greatest hits." },
    ],
  },

  "computer-architecture": {
    shortTitle: "Architecture",
    description:
      "Gate Smashers' Computer Organization & Architecture course — the GATE-favourite walkthrough of instructions, addressing modes, cache memory, pipelining and I/O organisation. Short, focused lectures that turn COA from the most-feared university subject into a sequence of solvable puzzles. Essential context for anyone serious about performance.",
    learn: [
      "Machine instructions and data-manipulation categories (arithmetic, logical, shift)",
      "All addressing modes — implied, immediate, direct, indirect, register, indexed, relative",
      "RISC vs CISC design philosophies and their trade-offs",
      "Cache memory: direct, associative and set-associative mapping with hit-ratio calculations",
      "Pipelining: speedup math, stalls, and structural/data/control hazards (RAW, WAR, WAW)",
      "I/O organisation: programmed I/O, interrupts and DMA",
    ],
    prereqs: ["Digital logic basics (latches, gates) — the 8-Bit Computer course is ideal but optional", "Binary arithmetic", "CS50 or equivalent for context"],
    notes: [
      {
        heading: "Instructions & addressing",
        points: [
          "An instruction = opcode + operands. How operands are found is the addressing mode — and it determines instruction length and cycle counts.",
          "Immediate (#5) is fastest to fetch but inflexible; indirect gives full addressing power at the cost of extra memory accesses.",
          "Effective address (EA) calculations: direct EA=A, indirect EA=M[A], indexed EA=A+RX, relative EA=PC+A — practise converting assembly to EAs.",
          "RISC: fixed length, load/store only, more registers, easier pipelining. CISC: variable length, memory operands, fewer instructions per program.",
        ],
      },
      {
        heading: "Cache — the exam & interview favourite",
        points: [
          "Cache works because of locality: temporal (reuse soon) and spatial (use neighbours). Every optimisation advice you've heard reduces to these two.",
          "Direct mapping: line = (block address) mod (cache lines) — fast, but conflict misses hurt. Fully associative: anywhere — flexible, expensive hardware.",
          "Set-associative is the compromise (2/4/8-way); most real CPUs live here.",
          "Hit ratio h → average access time = h·tc + (1-h)·tm. Practise these numericals; they're the bread-and-butter exam question.",
          "Write policy: write-through (cache+memory together) vs write-back (dirty bit, write on eviction) — know the consistency trade-off.",
        ],
      },
      {
        heading: "Pipelining maths",
        points: [
          "Ideal speedup ≈ number of stages (from k·n cycles down to k+n-1). Real speedup shrinks with stalls.",
          "Hazards: structural (resource clash), data (RAW needs forwarding; load-use needs a stall), control (branches — predict or flush).",
          "RAW/WAR/WAW naming: RAW is the one solved by forwarding; the others matter once out-of-order enters (beyond GATE scope but good context).",
          "Branch prediction intuition: a wrongly predicted branch costs a flush — why modern CPUs obsess over predictors.",
        ],
      },
      {
        heading: "I/O organisation",
        points: [
          "Programmed I/O wastes CPU polling; interrupt-driven I/O frees it; DMA moves blocks without the CPU for data — only setup and completion interrupts.",
          "Understand the priority of interrupts and vectored vs polled identification.",
          "Connect everything back: cache hides memory latency, pipelines hide instruction latency, DMA hides I/O latency — performance engineering is latency hiding all the way down.",
        ],
      },
    ],
    practice: [
      { label: "GATE COA previous questions", url: "https://gateoverflow.in/", note: "Solve past GATE numericals — cache mapping and pipeline speedup especially." },
      { label: "SadServers (systems debugging)", url: "https://sadservers.com/", note: "Optional but great: see memory/CPU concepts in a live Linux box." },
    ],
    projects: [
      { title: "Cache Simulator", level: "Advanced", brief: "Simulate direct/associative mapping over a memory trace; plot miss rates vs cache size and block size." },
      { title: "Pipeline Speedup Calculator + Visualiser", level: "Beginner", brief: "Implement the k+n-1 model with stall injection; visualise stage bubbles for RAW chains." },
    ],
  },
};
