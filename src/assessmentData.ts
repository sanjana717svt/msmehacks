import { SkillAssessmentConfig, AssessmentQuestion } from './types';

export const JAVASCRIPT_ASSESSMENT: SkillAssessmentConfig = {
  skillId: 'javascript',
  skillName: 'JavaScript',
  category: 'Frontend',
  difficulty: 'Intermediate',
  estimatedMinutes: 15,
  passingScore: 70,
  topics: [
    'JavaScript fundamentals',
    'Variables and data types',
    'Arrays and objects',
    'Functions',
    'DOM',
    'ES6+',
    'Async JavaScript',
    'Debugging',
  ],
  questions: [
    {
      id: 'js-q1',
      type: 'multiple-choice',
      topic: 'Arrays and objects',
      prompt: 'What does Array.prototype.map() return in JavaScript?',
      options: [
        { id: 'a', text: 'The original array modified in-place', isCorrect: false },
        { id: 'b', text: 'A new array with the results of calling the provided function on every element', isCorrect: true },
        { id: 'c', text: 'A single string of joined elements', isCorrect: false },
        { id: 'd', text: 'A boolean indicating whether any elements matched', isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: 'Array.map() creates a new array populated with the results of calling a provided callback on every element in the calling array, without mutating the original array.',
    },
    {
      id: 'js-q2',
      type: 'code-output',
      topic: 'Variables and data types',
      prompt: 'What will this code output to the console when executed?',
      codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}`,
      options: [
        { id: 'a', text: '0, 1, 2', isCorrect: false },
        { id: 'b', text: '3, 3, 3', isCorrect: true },
        { id: 'c', text: 'undefined, undefined, undefined', isCorrect: false },
        { id: 'd', text: 'ReferenceError: i is not defined', isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: 'Because var has function scope (not block scope), all setTimeout callbacks close over the exact same variable i. By the time the event loop runs the callbacks, the loop has completed and i equals 3.',
    },
    {
      id: 'js-q3',
      type: 'multiple-choice',
      topic: 'JavaScript fundamentals',
      prompt: 'What are the return values of typeof null and null === undefined?',
      options: [
        { id: 'a', text: "'null' and true", isCorrect: false },
        { id: 'b', text: "'object' and false", isCorrect: true },
        { id: 'c', text: "'undefined' and false", isCorrect: false },
        { id: 'd', text: "'object' and true", isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: "typeof null returns 'object' due to a legacy design artifact in JS type tagging. Strict equality null === undefined is false because they represent distinct primitive types.",
    },
    {
      id: 'js-q4',
      type: 'debugging',
      topic: 'Debugging',
      prompt: 'A developer attempts to clone an object and mutate a nested address, but the original object is unexpectedly modified. What is the bug?',
      codeSnippet: `const student = { name: "Alex", meta: { school: "UC Berkeley" } };
const updated = { ...student };
updated.meta.school = "Stanford";

console.log(student.meta.school); // Outputs "Stanford"!`,
      options: [
        { id: 'a', text: 'The spread operator (...) creates a shallow copy, leaving nested objects pointing to the same memory reference.', isCorrect: true },
        { id: 'b', text: 'The const keyword prevents re-assigning nested properties.', isCorrect: false },
        { id: 'c', text: 'Object spread is invalid syntax in modern ECMAScript.', isCorrect: false },
        { id: 'd', text: 'Objects must be cloned with Object.freeze() before modification.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'Object spread only copies the top-level keys. Nested objects like meta are copied by reference, so mutating updated.meta directly mutates student.meta.',
    },
    {
      id: 'js-q5',
      type: 'code-output',
      topic: 'Async JavaScript',
      prompt: 'What is the exact execution order printed by this code?',
      codeSnippet: `console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');`,
      options: [
        { id: 'a', text: '1, 4, 3, 2', isCorrect: true },
        { id: 'b', text: '1, 2, 3, 4', isCorrect: false },
        { id: 'c', text: '1, 4, 2, 3', isCorrect: false },
        { id: 'd', text: '1, 3, 4, 2', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: "Synchronous statements '1' and '4' run first. Next, microtasks (Promise.then) execute yielding '3'. Finally, macrotasks (setTimeout) execute yielding '2'.",
    },
    {
      id: 'js-q6',
      type: 'debugging',
      topic: 'Async JavaScript',
      prompt: "Why does this function output 'Sync Done' before any user data has finished saving?",
      codeSnippet: `async function saveAllUsers(users) {
  users.forEach(async (user) => {
    await api.save(user);
    console.log('Saved:', user.name);
  });
  console.log('Sync Done');
}`,
      options: [
        { id: 'a', text: 'Array.prototype.forEach is synchronous and does not await promises returned by its callback; use Promise.all(users.map(...)) or for...of.', isCorrect: true },
        { id: 'b', text: 'The async keyword cannot be placed inside an arrow function signature.', isCorrect: false },
        { id: 'c', text: 'api.save must be invoked with callback arguments instead of await.', isCorrect: false },
        { id: 'd', text: 'forEach throws an unhandled rejection when combined with async functions.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'forEach does not pause or await the promises returned by async callbacks. Promise.all(users.map(...)) or a for...of loop must be used to await asynchronous operations.',
    },
    {
      id: 'js-q7',
      type: 'multiple-choice',
      topic: 'ES6+',
      prompt: 'Given the code: const [first, ...rest] = [10, 20, 30, 40]; What are the values of first and rest?',
      options: [
        { id: 'a', text: 'first = 10, rest = [20, 30, 40]', isCorrect: true },
        { id: 'b', text: 'first = [10], rest = [20, 30, 40]', isCorrect: false },
        { id: 'c', text: 'first = 10, rest = 20', isCorrect: false },
        { id: 'd', text: 'first = [10, 20], rest = [30, 40]', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'Array destructuring with the rest parameter collects the first item into first as a number (10) and all remaining elements into a new array rest ([20, 30, 40]).',
    },
    {
      id: 'js-q8',
      type: 'code-output',
      topic: 'Arrays and objects',
      prompt: 'What will this reduce operation evaluate to?',
      codeSnippet: `const numbers = [1, 2, 3, 4];
const result = numbers.reduce((acc, curr) => acc + curr, 10);
console.log(result);`,
      options: [
        { id: 'a', text: '20', isCorrect: true },
        { id: 'b', text: '10', isCorrect: false },
        { id: 'c', text: '24', isCorrect: false },
        { id: 'd', text: 'NaN', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'The initial accumulator value is 10. Iterating through [1, 2, 3, 4] adds 1+2+3+4 = 10 to the initial 10, giving 20.',
    },
    {
      id: 'js-q9',
      type: 'debugging',
      topic: 'DOM',
      prompt: "Clicking the button throws TypeError: Cannot read properties of undefined (reading 'title'). How should the handler be corrected?",
      codeSnippet: `class Widget {
  constructor(title) {
    this.title = title;
    document.getElementById('btn').addEventListener('click', this.render);
  }
  render() {
    console.log(this.title);
  }
}`,
      options: [
        { id: 'a', text: 'Bind the method in constructor (this.render = this.render.bind(this)) or use an arrow function field.', isCorrect: true },
        { id: 'b', text: 'Convert this.title into window.title.', isCorrect: false },
        { id: 'c', text: 'Event listeners cannot call class methods in JavaScript.', isCorrect: false },
        { id: 'd', text: "Change 'click' to 'onclick'.", isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'Standard function references lose their this context when called as event listeners. Binding the method or using an arrow property preserves the instance this.',
    },
    {
      id: 'js-q10',
      type: 'coding-challenge',
      topic: 'Functions',
      prompt: 'Write a function filterAndSortCandidates(candidates) that takes an array of candidate records, filters for only those where isVerified is true, extracts their names in uppercase, and returns them sorted alphabetically.',
      starterCode: `function filterAndSortCandidates(candidates) {
  // Your code here:
  // 1. Filter candidates where isVerified === true
  // 2. Map candidate names to uppercase
  // 3. Return names sorted alphabetically
  return candidates
    .filter(c => c.isVerified)
    .map(c => c.name.toUpperCase())
    .sort();
}`,
      expectedOutputHint: "Example: [{ name: 'Alex', isVerified: true }, { name: 'Jordan', isVerified: false }, { name: 'Taylor', isVerified: true }] => ['ALEX', 'TAYLOR']",
      explanation: 'Using functional chaining with filter, map, and sort delivers clean, declarative, and performant array processing.',
    },
  ],
};

export const REACT_ASSESSMENT: SkillAssessmentConfig = {
  skillId: 'react',
  skillName: 'React',
  category: 'Frontend',
  difficulty: 'Intermediate',
  estimatedMinutes: 15,
  passingScore: 70,
  topics: ['Hooks & State', 'Re-rendering & Virtual DOM', 'Effect Lifecycle', 'Custom Hooks', 'Performance'],
  questions: [
    {
      id: 'react-q1',
      type: 'multiple-choice',
      topic: 'Hooks & State',
      prompt: 'When should you pass an empty dependency array [] to useEffect?',
      options: [
        { id: 'a', text: 'When the effect should run on every component render', isCorrect: false },
        { id: 'b', text: 'When the effect should only run once when the component mounts', isCorrect: true },
        { id: 'c', text: 'When the component should never unmount', isCorrect: false },
        { id: 'd', text: 'When the effect returns a Promise', isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: 'An empty dependency array [] tells React that your effect does not depend on any values from props or state, so it never needs to re-run after the initial mount.',
    },
    {
      id: 'react-q2',
      type: 'code-output',
      topic: 'Hooks & State',
      prompt: 'What happens when this button is clicked once?',
      codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}`,
      options: [
        { id: 'a', text: 'count becomes 3', isCorrect: false },
        { id: 'b', text: 'count becomes 1', isCorrect: true },
        { id: 'c', text: 'count causes an infinite render loop', isCorrect: false },
        { id: 'd', text: 'count remains 0', isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: 'In a single render pass, count is captured as 0. All three calls execute setCount(0 + 1). To increment by 3, functional updates must be used: setCount(prev => prev + 1).',
    },
    {
      id: 'react-q3',
      type: 'debugging',
      topic: 'Effect Lifecycle',
      prompt: 'Why does this component enter an infinite re-render loop?',
      codeSnippet: `function UserCard() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const user = { name: "Alex", ts: Date.now() };
    setData(user);
  });

  return <div>{data?.name}</div>;
}`,
      options: [
        { id: 'a', text: 'useEffect without a dependency array runs after EVERY render, causing setData to trigger another render continuously.', isCorrect: true },
        { id: 'b', text: 'Date.now() cannot be called inside useEffect.', isCorrect: false },
        { id: 'c', text: 'State cannot be initialized with null.', isCorrect: false },
        { id: 'd', text: 'React components must return fragments.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'Without a dependency array, useEffect executes after every single render. Updating state inside it triggers another render, creating an infinite loop.',
    },
    {
      id: 'react-q4',
      type: 'multiple-choice',
      topic: 'Re-rendering & Virtual DOM',
      prompt: 'Why is using array index as the "key" prop in dynamic lists considered an anti-pattern when items can be inserted or re-ordered?',
      options: [
        { id: 'a', text: 'React throws a compilation error when keys are numbers.', isCorrect: false },
        { id: 'b', text: 'It can cause component state to stay associated with the wrong items and cause incorrect rendering.', isCorrect: true },
        { id: 'c', text: 'Keys must be UUID strings by W3C HTML specifications.', isCorrect: false },
        { id: 'd', text: 'It degrades network fetch times.', isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: 'Keys identify which items have changed, been added, or been removed. When indexes are used, reordering changes the key-to-item mapping, causing React to mismatch component instances and internal state.',
    },
    {
      id: 'react-q5',
      type: 'coding-challenge',
      topic: 'Custom Hooks',
      prompt: 'Implement a hook helper useToggle(initialValue) that returns [value, toggle] where toggle flips the boolean state.',
      starterCode: `function useToggle(initialValue = false) {
  const [state, setState] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setState(prev => !prev);
  }, []);
  return [state, toggle];
}`,
      expectedOutputHint: 'useToggle(false) -> [false, fn], calling fn flips to true',
      explanation: 'useCallback stabilizes the toggle handler while functional state updater ensures race-free state transitions.',
    },
  ],
};

export const SQL_ASSESSMENT: SkillAssessmentConfig = {
  skillId: 'sql',
  skillName: 'SQL',
  category: 'Backend',
  difficulty: 'Intermediate',
  estimatedMinutes: 15,
  passingScore: 70,
  topics: ['SELECT & Aggregations', 'JOINs & Relationships', 'WHERE vs HAVING', 'Indexes & Performance'],
  questions: [
    {
      id: 'sql-q1',
      type: 'multiple-choice',
      topic: 'WHERE vs HAVING',
      prompt: 'What is the primary difference between WHERE and HAVING clauses in SQL?',
      options: [
        { id: 'a', text: 'WHERE filters rows before aggregation; HAVING filters aggregated groups after GROUP BY.', isCorrect: true },
        { id: 'b', text: 'WHERE is only for numeric columns; HAVING is for string columns.', isCorrect: false },
        { id: 'c', text: 'HAVING can only be used with subqueries.', isCorrect: false },
        { id: 'd', text: 'There is no difference; they are aliases.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'WHERE filters rows before any aggregate functions are applied. HAVING filters grouped rows after aggregation has been performed.',
    },
    {
      id: 'sql-q2',
      type: 'code-output',
      topic: 'JOINs & Relationships',
      prompt: 'Which records does a LEFT OUTER JOIN return?',
      options: [
        { id: 'a', text: 'Only records that have matching keys in both tables.', isCorrect: false },
        { id: 'b', text: 'All records from the left table, plus matched records from the right table (with NULLs for unmatched).', isCorrect: true },
        { id: 'c', text: 'All records from both tables regardless of match.', isCorrect: false },
        { id: 'd', text: 'Only records that do NOT match in the right table.', isCorrect: false },
      ],
      correctOptionId: 'b',
      explanation: 'A LEFT JOIN returns every row from the left table. If no corresponding record is found in the right table, columns from the right table are filled with NULL.',
    },
    {
      id: 'sql-q3',
      type: 'debugging',
      topic: 'SELECT & Aggregations',
      prompt: 'Why does this query throw an error: SELECT department, employee_name, AVG(salary) FROM employees GROUP BY department;?',
      options: [
        { id: 'a', text: 'employee_name is not in an aggregate function nor included in the GROUP BY clause.', isCorrect: true },
        { id: 'b', text: 'AVG cannot be calculated on salary.', isCorrect: false },
        { id: 'c', text: 'GROUP BY must come before FROM.', isCorrect: false },
        { id: 'd', text: 'SQL does not allow selecting more than one column with aggregates.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'In SQL standard, any non-aggregated column in the SELECT list must appear in the GROUP BY clause because there could be multiple employee names per department.',
    },
    {
      id: 'sql-q4',
      type: 'multiple-choice',
      topic: 'Indexes & Performance',
      prompt: 'How does a B-Tree database index improve SELECT query performance?',
      options: [
        { id: 'a', text: 'By reducing the search time complexity from full table scan O(N) to balanced tree traversal O(log N).', isCorrect: true },
        { id: 'b', text: 'By compressing the table into memory.', isCorrect: false },
        { id: 'c', text: 'By automatically caching all query results permanently.', isCorrect: false },
        { id: 'd', text: 'By removing all duplicate records from storage.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'B-Tree indexes organize sorted pointer structures that allow logarithmic O(log N) lookups instead of scanning every block on disk.',
    },
    {
      id: 'sql-q5',
      type: 'coding-challenge',
      topic: 'SELECT & Aggregations',
      prompt: 'Write a SQL query to find all departments with more than 5 verified candidates, ordered by candidate count descending.',
      starterCode: `SELECT department, COUNT(*) as verified_count
FROM candidates
WHERE is_verified = TRUE
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY verified_count DESC;`,
      expectedOutputHint: 'Department name and count where verified > 5',
      explanation: 'Filtering on WHERE is_verified=TRUE before GROUP BY and applying HAVING COUNT(*) > 5 ensures accurate aggregated reporting.',
    },
  ],
};

export const NODEJS_ASSESSMENT: SkillAssessmentConfig = {
  skillId: 'nodejs',
  skillName: 'Node.js',
  category: 'Backend',
  difficulty: 'Intermediate',
  estimatedMinutes: 15,
  passingScore: 70,
  topics: ['Event Loop & Libuv', 'Streams & Buffers', 'Express Middleware', 'Async Error Handling'],
  questions: [
    {
      id: 'node-q1',
      type: 'multiple-choice',
      topic: 'Event Loop & Libuv',
      prompt: 'Which underlying C library provides Node.js with its non-blocking I/O event loop and thread pool?',
      options: [
        { id: 'a', text: 'libuv', isCorrect: true },
        { id: 'b', text: 'V8 Engine', isCorrect: false },
        { id: 'c', text: 'glibc', isCorrect: false },
        { id: 'd', text: 'OpenSSL', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'libuv is the multi-platform C library that handles the event loop, thread pool, file system operations, and asynchronous networking for Node.js.',
    },
    {
      id: 'node-q2',
      type: 'debugging',
      topic: 'Express Middleware',
      prompt: 'Why does an Express request hang indefinitely in this middleware?',
      codeSnippet: `app.use((req, res, next) => {
  if (req.headers['authorization']) {
    console.log('User authenticated');
  }
});`,
      options: [
        { id: 'a', text: 'The middleware neither calls next() to advance to the next handler nor sends a response via res.send()/res.end().', isCorrect: true },
        { id: 'b', text: 'req.headers cannot be read in middleware.', isCorrect: false },
        { id: 'c', text: 'app.use requires an async callback.', isCorrect: false },
        { id: 'd', text: 'Express does not allow authorization headers.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'In Express, every middleware must either terminate the request-response cycle (e.g. res.send()) or invoke next() to pass control to the next middleware.',
    },
    {
      id: 'node-q3',
      type: 'multiple-choice',
      topic: 'Streams & Buffers',
      prompt: 'Why should large file downloads in Node.js be piped using fs.createReadStream instead of fs.readFile?',
      options: [
        { id: 'a', text: 'Streams process data in chunks with constant low memory overhead, avoiding buffering huge files into RAM.', isCorrect: true },
        { id: 'b', text: 'fs.readFile only supports text files, not binary.', isCorrect: false },
        { id: 'c', text: 'Streams bypass operating system permissions.', isCorrect: false },
        { id: 'd', text: 'createReadStream runs on the GPU.', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'Streams allow processing chunks as they arrive, preventing Out-Of-Memory (OOM) errors that occur when fs.readFile loads multiple gigabytes into memory at once.',
    },
    {
      id: 'node-q4',
      type: 'debugging',
      topic: 'Async Error Handling',
      prompt: 'What special signature does an Express error-handling middleware require?',
      options: [
        { id: 'a', text: 'Four arguments: (err, req, res, next)', isCorrect: true },
        { id: 'b', text: 'Must be written as an async function with try/catch', isCorrect: false },
        { id: 'c', text: 'Must return an Error instance', isCorrect: false },
        { id: 'd', text: 'Must be mounted before all other routes', isCorrect: false },
      ],
      correctOptionId: 'a',
      explanation: 'Express distinguishes error-handling middleware by checking function.length === 4 (err, req, res, next).',
    },
    {
      id: 'node-q5',
      type: 'coding-challenge',
      topic: 'Express Middleware',
      prompt: 'Write an Express middleware requireJsonContent that returns 400 Bad Request if req.headers["content-type"] is not application/json on POST requests.',
      starterCode: `function requireJsonContent(req, res, next) {
  if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'Server requires application/json' });
  }
  next();
}`,
      expectedOutputHint: 'Rejects non-JSON POST with 400, passes through otherwise',
      explanation: 'Validates request headers and halts execution before request body parsing.',
    },
  ],
};

/**
 * Helper to fetch assessment config for any skill
 */
export function getAssessmentForSkill(skillName: string): SkillAssessmentConfig {
  const normalized = skillName.toLowerCase();
  
  if (normalized.includes('javascript') || normalized === 'js') {
    return JAVASCRIPT_ASSESSMENT;
  }
  if (normalized.includes('react')) {
    return REACT_ASSESSMENT;
  }
  if (normalized.includes('sql') || normalized.includes('postgres')) {
    return SQL_ASSESSMENT;
  }
  if (normalized.includes('node')) {
    return NODEJS_ASSESSMENT;
  }
  
  // Generic assessment with realistic questions for HTML, CSS, Git, Python, etc.
  return {
    skillId: normalized.replace(/[^a-z0-9]/g, '-'),
    skillName: skillName,
    category: normalized.includes('python') ? 'Backend' : normalized.includes('git') ? 'Mobile & Systems' : 'Frontend',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    passingScore: 70,
    topics: [
      `${skillName} Core Fundamentals`,
      'Syntax and Best Practices',
      'Architecture & Patterns',
      'Debugging & Optimization',
    ],
    questions: [
      {
        id: `${normalized}-q1`,
        type: 'multiple-choice',
        topic: `${skillName} Core Fundamentals`,
        prompt: `Which of the following is considered a core industry standard best practice in modern ${skillName}?`,
        options: [
          { id: 'a', text: 'Writing modular, decoupled logic with clear separation of concerns', isCorrect: true },
          { id: 'b', text: 'Consolidating all logic into a single global namespace', isCorrect: false },
          { id: 'c', text: 'Disabling automated linting and type checks', isCorrect: false },
          { id: 'd', text: 'Avoiding version control commits until release', isCorrect: false },
        ],
        correctOptionId: 'a',
        explanation: 'Modularity, maintainability, and clear separation of concerns represent universal software engineering standards.',
      },
      {
        id: `${normalized}-q2`,
        type: 'code-output',
        topic: 'Syntax and Best Practices',
        prompt: `When evaluating error boundaries and robust exception handling in ${skillName}, what is the best strategy?`,
        options: [
          { id: 'a', text: 'Catching specific exceptions, logging structured diagnostic telemetry, and failing gracefully', isCorrect: true },
          { id: 'b', text: 'Suppressing all errors silently with empty catch blocks', isCorrect: false },
          { id: 'c', text: 'Allowing uncaught crashes to restart the container immediately', isCorrect: false },
          { id: 'd', text: 'Only checking errors in unit test files', isCorrect: false },
        ],
        correctOptionId: 'a',
        explanation: 'Targeted error handling with actionable logging ensures system resilience.',
      },
      {
        id: `${normalized}-q3`,
        type: 'debugging',
        topic: 'Debugging & Optimization',
        prompt: `A team notices memory consumption steadily increasing over time in production using ${skillName}. What is the most likely root cause?`,
        options: [
          { id: 'a', text: 'Unreleased resource handles, retained event listeners, or global object cache accumulation', isCorrect: true },
          { id: 'b', text: 'Using semantic versioning in package dependencies', isCorrect: false },
          { id: 'c', text: 'Too many comments in source code', isCorrect: false },
          { id: 'd', text: 'Running on Linux instead of Windows', isCorrect: false },
        ],
        correctOptionId: 'a',
        explanation: 'Memory leaks commonly arise from forgotten listeners, dangling interval timers, or unbounded in-memory caches.',
      },
      {
        id: `${normalized}-q4`,
        type: 'coding-challenge',
        topic: 'Architecture & Patterns',
        prompt: `Implement a clean utility validate${skillName.replace(/[^a-zA-Z0-9]/g, '')}Input(data) that returns true if data is valid and non-empty.`,
        starterCode: `function validateInput(data) {
  // Validate input parameters
  if (data === null || data === undefined) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  return true;
}`,
        expectedOutputHint: 'Returns boolean true for valid non-empty inputs',
        explanation: 'Defensive validation guarantees consistent execution across the pipeline.',
      },
    ],
  };
}
