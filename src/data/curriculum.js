// Curriculum data and generator for the AI/ML Daily Study Planner

export const TOTAL_STUDY_DAYS = 120;
export const TOTAL_WEEKS = 24;

export const MATH_STAGES = [
  {
    id: 1,
    title: 'Stage 1: Arithmetic & Algebra',
    weeks: '1-4',
    description: 'Fractions, percentages, ratios, negative numbers, powers, roots, variables, linear & simultaneous equations, scientific notation',
    topics: [
      'Fractions and Decimals',
      'Percentages and Ratios',
      'Negative Numbers, Powers, and Roots',
      'Variables and Algebraic Expressions',
      'Solving Linear Equations and Inequalities',
      'Simultaneous Linear Equations',
      'Scientific Notation and Orders of Magnitude',
    ],
  },
  {
    id: 2,
    title: 'Stage 2: Functions & Graphs',
    weeks: '5-8',
    description: 'Coordinates, slopes, function notation, domain & range, linear, quadratic, exponential, and logarithmic functions',
    topics: [
      'Cartesian Coordinates and Linear Slopes',
      'Function Notation, Domain, and Range',
      'Linear and Quadratic Functions',
      'Polynomial and Rational Functions',
      'Exponential Growth and Decay',
      'Logarithms and Natural Logarithms (ln)',
    ],
  },
  {
    id: 3,
    title: 'Stage 3: Probability & Statistics',
    weeks: '9-12',
    description: 'Descriptive statistics, variance, distributions, Bayes theorem, hypothesis testing, covariance & correlation',
    topics: [
      'Measures of Central Tendency (Mean, Median, Mode)',
      'Measures of Dispersion (Variance, Standard Deviation)',
      'Probability Axioms and Conditional Probability',
      'Bayes Theorem and Priors',
      'Random Variables and Probability Distributions',
      'Normal Distribution and Central Limit Theorem',
      'Hypothesis Testing and Confidence Intervals',
      'Covariance and Pearson Correlation',
    ],
  },
  {
    id: 4,
    title: 'Stage 4: Linear Algebra',
    weeks: '13-16',
    description: 'Scalars, vectors, dot products, matrices, matrix multiplication, inverse, vector norms, cosine similarity, eigenvalues',
    topics: [
      'Scalars, Vectors, and Geometric Interpretation',
      'Vector Addition, Scalar Multiplication, and Dot Product',
      'Vector Norms (L1, L2, L-infinity) and Distance Metrics',
      'Cosine Similarity and Semantic Proximity',
      'Matrices as Linear Transformations',
      'Matrix Multiplication and Transposition',
      'Matrix Inversion, Determinants, and Rank',
      'Eigenvalues and Eigenvectors Introduction',
    ],
  },
  {
    id: 5,
    title: 'Stage 5: Calculus & Optimization',
    weeks: '17-20',
    description: 'Limits, derivatives, partial derivatives, gradients, chain rule, loss functions, and gradient descent',
    topics: [
      'Limits and the Definition of Derivative',
      'Power, Product, Quotient, and Chain Rules',
      'Exponential and Logarithmic Derivatives',
      'Multivariable Functions and Partial Derivatives',
      'The Gradient Vector and Directional Derivatives',
      'Loss Functions and Convexity',
      'Gradient Descent and Learning Rates',
      'Stochastic and Mini-batch Gradient Descent',
    ],
  },
  {
    id: 6,
    title: 'Stage 6: Mathematics Applied to AI/ML',
    weeks: '21-24',
    description: 'Linear regression MSE, logistic sigmoid, activation functions, backpropagation, softmax, cross-entropy, transformer attention',
    topics: [
      'Linear Regression and Ordinary Least Squares',
      'Logistic Regression, Odds, and Sigmoid Function',
      'Binary Cross-Entropy Loss and Classification Metrics',
      'Activation Functions (ReLU, Leaky ReLU, GELU, Softmax)',
      'Neural Network Forward Propagation Matrix Math',
      'Backpropagation via the Matrix Chain Rule',
      'Categorical Cross-Entropy and Softmax Derivatives',
      'Vector Embeddings and Scaled Dot-Product Attention',
    ],
  },
];

export const PYTHON_STAGES = [
  {
    id: 1,
    title: 'Stage 1: Python Fundamentals',
    weeks: '1-4',
    description: 'Variables, data types, arithmetic & logical operators, string manipulation, conditionals, and loops',
    topics: [
      'Variables, Primitive Types, and print()/input()',
      'Arithmetic, Comparison, and Logical Operators',
      'String Slicing, Formatting, and String Methods',
      'Type Casting and Input Validation',
      'Conditional Logic (if, elif, else)',
      'While Loops and For Loops with range()',
      'Loop Control (break, continue, pass)',
    ],
  },
  {
    id: 2,
    title: 'Stage 2: Data Structures',
    weeks: '5-8',
    description: 'Lists, tuples, sets, dictionaries, nested structures, and list/dict comprehensions',
    topics: [
      'Lists: Indexing, Slicing, Appending, and Methods',
      'Tuples and Immutability',
      'Dictionaries: Key-Value Pairs, Lookup, and Iteration',
      'Sets and Set Operations (Union, Intersection, Difference)',
      'List, Dict, and Set Comprehensions',
      'Nested Data Structures and Deep vs Shallow Copy',
    ],
  },
  {
    id: 3,
    title: 'Stage 3: Functions & Program Structure',
    weeks: '9-12',
    description: 'Functions, *args/**kwargs, scope, modules, exception handling, file I/O (CSV/JSON), and classes',
    topics: [
      'Functions, Parameters, Default Values, and Return',
      'Positional vs Keyword Args, *args and **kwargs',
      'Variable Scope: Local, Enclosing, Global, Built-in (LEGB)',
      'Exception Handling (try, except, finally, raise)',
      'File Handling: Reading/Writing Text, CSV, and JSON',
      'Modules, Packages, and Virtual Environments (venv)',
      'Classes, Objects, __init__, and Methods',
    ],
  },
  {
    id: 4,
    title: 'Stage 4: Data Handling with NumPy & pandas',
    weeks: '13-16',
    description: 'NumPy ndarrays, vectorization, broadcasting, pandas Series & DataFrames, data cleaning, and aggregation',
    topics: [
      'NumPy ndarrays, Shapes, Slicing, and Reshaping',
      'Vectorized Operations and Broadcasting',
      'pandas Series and DataFrame Creation',
      'Indexing with .loc, .iloc, and Boolean Masking',
      'Handling Missing Data (isna, dropna, fillna)',
      'Groupby, Aggregations, and Summary Statistics',
      'Merging, Joining, and Concatenating DataFrames',
    ],
  },
  {
    id: 5,
    title: 'Stage 5: Python for Machine Learning',
    weeks: '17-24',
    description: 'Data preprocessing, scikit-learn pipelines, model training, evaluation metrics, and PyTorch basics',
    topics: [
      'Feature Matrices (X) and Target Vectors (y)',
      'Train-Test Split and Data Scaling (StandardScaler)',
      'Linear Regression and Logistic Regression with Scikit-Learn',
      'Model Evaluation: Accuracy, Precision, Recall, F1, MSE, R2',
      'Cross-Validation and Hyperparameter Grid Search',
      'Building Modular ML Pipelines',
      'Introduction to PyTorch Tensors and Autograd',
    ],
  },
];

// Comprehensive Week 1 content data
const WEEK_1_DATA = {
  1: {
    math: {
      topic: 'Fractions & Proportions',
      title: 'Understanding Fractions, Conversions, and Operations',
      stage: 1,
      prerequisites: ['Basic integer addition, subtraction, multiplication, and division'],
      explanation: `Fractions represent parts of a whole. In modern Machine Learning, fractions are the foundation of probabilities, learning rates, normalization factors, and loss weightings.

A fraction consists of a **Numerator** (top number) representing how many parts we have, and a **Denominator** (bottom number) representing the total equal parts into which the whole is divided.

### Key Concepts:
1. **Proper Fractions**: Numerator < Denominator (e.g., 3/4 = 0.75). In ML, probabilities are proper fractions between 0 and 1.
2. **Improper Fractions**: Numerator ≥ Denominator (e.g., 5/2 = 2.5).
3. **Common Denominators**: To add or subtract fractions, they must share the same denominator. Find the Least Common Multiple (LCM).
4. **Multiplying Fractions**: Multiply numerators straight across, and denominators straight across: (a/b) * (c/d) = (ac)/(bd).
5. **Dividing Fractions**: Multiply by the reciprocal: (a/b) ÷ (c/d) = (a/b) * (d/c) = (ad)/(bc).`,
      definitions: [
        { term: 'Numerator', definition: 'The top number of a fraction showing how many parts of the whole are taken.' },
        { term: 'Denominator', definition: 'The bottom number of a fraction representing the total number of equal parts.' },
        { term: 'Reciprocal', definition: 'The multiplicative inverse of a number; for a/b, the reciprocal is b/a.' },
        { term: 'Simplification', definition: 'Dividing numerator and denominator by their greatest common divisor (GCD).' },
      ],
      formulas: [
        { name: 'Addition / Subtraction', formula: '(a/b) ± (c/d) = (ad ± bc) / (bd)', description: 'Cross-multiplication to find common denominator' },
        { name: 'Multiplication', formula: '(a/b) × (c/d) = (a × c) / (b × d)', description: 'Direct product of terms' },
        { name: 'Division', formula: '(a/b) ÷ (c/d) = (a × d) / (b × c)', description: 'Multiply by reciprocal' },
      ],
      examples: [
        {
          problem: 'Calculate 2/3 + 3/5 and express as a simplified fraction and decimal.',
          steps: [
            'Find common denominator: LCM(3, 5) = 15.',
            'Convert 2/3: (2 * 5)/(3 * 5) = 10/15.',
            'Convert 3/5: (3 * 3)/(5 * 3) = 9/15.',
            'Add numerators: 10/15 + 9/15 = 19/15.',
            'Convert to decimal: 19 ÷ 15 = 1.2667 (approx).',
          ],
          solution: '19/15 (or ~1.267)',
        },
        {
          problem: 'In a binary classification dataset of 200 samples, 45 are positive. What fraction and percentage are negative?',
          steps: [
            'Calculate negative count: 200 - 45 = 155 samples.',
            'Form fraction: 155 / 200.',
            'Simplify by dividing top and bottom by 5: 31 / 40.',
            'Convert to percentage: (31 / 40) * 100 = 77.5%.',
          ],
          solution: '31/40 (77.5%)',
        },
      ],
      exercises: [
        { problem: 'Compute (5/6) - (1/4). Simplify your answer.', hint: 'LCM of 6 and 4 is 12.', answer: '7/12' },
        { problem: 'Multiply (3/8) by (4/9). Simplify completely.', hint: 'Cancel common factors before multiplying.', answer: '1/6' },
      ],
      commonMistakes: [
        'Adding denominators together directly (e.g. 1/2 + 1/3 ≠ 2/5).',
        'Forgetting to invert the second fraction when dividing.',
        'Not simplifying the resulting fraction to lowest terms.',
      ],
      aimlConnection: 'In Neural Networks, softmax outputs are probabilities that are fractions strictly summing to 1. Precision and recall in model evaluation are also computed as fractions of true positives over total positive predictions.',
    },
    python: {
      topic: 'Variables & Data Types',
      title: 'Python Variables, Primitive Types, and I/O',
      stage: 1,
      prerequisites: ['Basic familiarity with running commands or scripts'],
      explanation: `Python is a dynamically typed programming language. You do not need to explicitly declare variable types; Python infers them at runtime.

### Core Primitive Data Types:
- **int**: Whole numbers like \`42\`, \`-5\`, \`0\`.
- **float**: Numbers with decimal points like \`3.14159\`, \`-0.001\`, \`2.0\`.
- **str**: Text enclosed in single or double quotes, e.g., \`"hello"\`, \`'AI'\`.
- **bool**: Logical values \`True\` or \`False\`.

### Basic Input and Output:
- \`print(*values, sep=' ', end='\\n')\`: Outputs data to console.
- \`input(prompt)\`: Halts execution and reads a line of text entered by user (always returns a string).
- \`type(obj)\`: Returns the type of any variable.`,
      syntaxExamples: [
        {
          code: `# Variable assignment\nage = 25\nlearning_rate = 0.01\nmodel_name = "LogisticRegression"\nis_trained = False\n\nprint(f"Model: {model_name}, LR: {learning_rate}")\nprint(type(age), type(learning_rate))`,
          output: `Model: LogisticRegression, LR: 0.01\n<class 'int'> <class 'float'>`,
          explanation: 'Demonstrates variable creation, f-string formatting, and checking types with type().',
        },
      ],
      codeExamples: [
        {
          title: 'Interactive Study Time Calculator',
          code: `daily_goal_hours = 4\ncompleted_hours = float(input("Enter hours studied so far: ") or "1.5")\nremaining = daily_goal_hours - completed_hours\npercent_done = (completed_hours / daily_goal_hours) * 100\n\nprint(f"Completed: {completed_hours}h / {daily_goal_hours}h ({percent_done:.1f}%)")\nprint(f"Remaining focus time: {remaining}h")`,
          output: `Completed: 1.5h / 4h (37.5%)\nRemaining focus time: 2.5h`,
          lineByLine: [
            'Line 1: Sets integer goal of 4 hours.',
            'Line 2: Reads user input and explicitly converts the string to float.',
            'Line 3: Computes difference between target and actual hours.',
            'Line 4: Calculates progress ratio multiplied by 100.',
            'Line 6-7: Prints formatted metrics with 1 decimal place using :.1f.',
          ],
        },
      ],
      commonErrors: [
        { error: "TypeError: unsupported operand type(s) for +: 'int' and 'str'", cause: "Attempting to add text and number without conversion (e.g., 'Days: ' + 5).", fix: "Use f-strings: f'Days: {5}' or explicit conversion str(5)." },
        { error: "ValueError: could not convert string to float: 'abc'", cause: "Passing non-numeric text to float() or int().", fix: "Validate input using string methods like .isdigit() before casting." },
      ],
      practiceProblems: [
        {
          problem: 'Write a script that stores your study subject, daily target minutes (240), and minutes completed (60), then prints the percentage completed.',
          hint: 'Divide completed by target, multiply by 100, and format with f-string.',
          solution: `subject = "AI/ML"\ntarget_minutes = 240\ncompleted_minutes = 60\nprogress = (completed_minutes / target_minutes) * 100\nprint(f"{subject} Progress: {progress:.1f}%")`,
        },
      ],
    },
    aiml: {
      topic: 'Introduction to AI & Machine Learning',
      title: 'What is AI, ML, and Deep Learning? The Modern Landscape',
      description: 'Understanding the taxonomy of Artificial Intelligence, how Machine Learning differs from traditional rule-based software, and the lifecycle of an ML project.',
      tasks: [
        'Read chapter on AI taxonomy: AI vs Machine Learning vs Deep Learning vs Generative AI',
        'Learn the difference between traditional software (Rules + Data = Answers) and ML (Data + Answers = Rules)',
        'Explore real-world applications: computer vision, NLP, recommendation engines, and LLMs',
        'Set up a dedicated project journal to document daily findings and breakthroughs',
      ],
      practicalExercises: [
        'Identify 3 AI systems you interacted with today and classify each (Search ranking, auto-complete, recommendation, etc.)',
        'Write a 1-paragraph summary explaining why classical rule-based algorithms fail for computer vision tasks like handwritten digit recognition',
      ],
      deliverables: ['Journal entry summarizing the difference between AI, ML, and DL with real-world examples'],
    },
    revision: {
      mathSummary: 'Fractions represent parts of a whole and are identical to probabilities bounded between 0 and 1. Multiplying fractions corresponds to independent joint probabilities.',
      formulas: [
        { name: 'Fraction Addition', formula: '(a/b) + (c/d) = (ad + bc) / bd' },
        { name: 'Fraction Multiplication', formula: '(a/b) * (c/d) = (ac) / (bd)' },
      ],
      pythonSyntax: [
        { label: 'f-string formatting', syntax: 'f"Score: {val:.2f}"' },
        { label: 'Type casting', syntax: 'int("42"), float("3.14"), str(100)' },
      ],
      commonMistakes: [
        'Forgetting input() in Python returns a string, causing TypeError in arithmetic operations.',
        'Adding fraction numerators and denominators straight across.',
      ],
      aimlConnections: 'Softmax layers in neural networks output fractional values that sum to 1, exactly like probabilities.',
      recallQuestions: [
        { question: 'What is the reciprocal of 4/7?', answer: '7/4' },
        { question: 'What data type does the input() function always return in Python?', answer: 'str (string)' },
        { question: 'What is (3/4) * (2/5) in simplest fractional form?', answer: '3/10' },
        { question: 'How does Machine Learning invert the traditional programming paradigm?', answer: 'Instead of Rules + Data = Answers, ML uses Data + Answers = Learned Rules.' },
        { question: 'How do you check the type of a variable x in Python?', answer: 'type(x)' },
      ],
      checklist: [
        'I can confidently add, multiply, and simplify fractions without a calculator.',
        'I understand all 4 primitive Python data types: int, float, str, bool.',
        'I can explain the difference between AI, ML, and traditional programming to a beginner.',
        'I have set up my local study folder and executed my first Python test script.',
      ],
    },
  },
  2: {
    math: {
      topic: 'Percentages & Proportions',
      title: 'Calculating Percentages, Basis Points, and Proportions',
      stage: 1,
      prerequisites: ['Fractions and Decimals from Day 1'],
      explanation: `A percentage is simply a fraction with a denominator of 100 ("per cent" = per hundred).

### Key Conversions:
- Percentage to Fraction: P% = P / 100.
- Percentage to Decimal: Divide by 100 (shift decimal point two places left: 85% = 0.85).
- Decimal to Percentage: Multiply by 100 (0.05 = 5%).

### Percentage Change:
Formula: Percentage Change = ((New Value - Old Value) / |Old Value|) * 100%.
- If result is positive: Percentage increase (e.g., accuracy improved from 80% to 88% = +10% relative increase).
- If result is negative: Percentage decrease (e.g., loss dropped from 2.5 to 1.5 = -40%).

### Percentage Points vs Percent Change:
If model accuracy goes from 80% to 90%:
- Absolute change = +10 percentage points.
- Relative change = ((90 - 80) / 80) * 100 = +12.5% relative improvement.`,
      definitions: [
        { term: 'Percentage', definition: 'A number or ratio expressed as a fraction of 100.' },
        { term: 'Percentage Point', definition: 'The simple arithmetic difference of two percentages.' },
        { term: 'Basis Point (bps)', definition: 'One hundredth of one percentage point (0.01% or 0.0001).' },
      ],
      formulas: [
        { name: 'Percentage of a Value', formula: 'V = (P / 100) × Total', description: 'Portion calculation' },
        { name: 'Percentage Change', formula: '((V_new - V_old) / V_old) × 100%', description: 'Relative increase/decrease' },
      ],
      examples: [
        {
          problem: 'A neural network loss drops from 0.80 to 0.56. What is the percentage decrease?',
          steps: [
            'Difference: 0.56 - 0.80 = -0.24.',
            'Divide by initial value: -0.24 / 0.80 = -0.30.',
            'Multiply by 100: -0.30 * 100 = -30%.',
          ],
          solution: '30% decrease (or -30%)',
        },
        {
          problem: 'An image classification dataset has 12,500 images. 8% are reserved for validation. How many images is that?',
          steps: [
            'Convert 8% to decimal: 8 / 100 = 0.08.',
            'Multiply by total: 0.08 * 12,500 = 1,000.',
          ],
          solution: '1,000 images',
        },
      ],
      exercises: [
        { problem: 'If your test accuracy increased from 75% to 81%, what is the percentage point increase and relative percent increase?', hint: 'Percentage points is simple difference; relative is diff / 75.', answer: '6 percentage points; 8% relative increase' },
      ],
      commonMistakes: [
        'Confusing percentage points with percentage change.',
        'Dividing by the new value instead of the original initial value when calculating percentage change.',
      ],
      aimlConnection: 'In ML experimentation, reporting accuracy gains requires distinguishing between absolute percentage point gains (+2% points) and relative gains (+5% error reduction).',
    },
    python: {
      topic: 'Operators & Expressions',
      title: 'Arithmetic, Comparison, and Logical Operators in Python',
      stage: 1,
      prerequisites: ['Python variables and primitive types from Day 1'],
      explanation: `Operators are special symbols used to perform operations on values and variables.

### Arithmetic Operators:
- \`+\` Addition, \`-\` Subtraction, \`*\` Multiplication
- \`/\` Float division (e.g. \`7 / 2\` is \`3.5\`)
- \`//\` Integer (floor) division (e.g. \`7 // 2\` is \`3\`)
- \`%\` Modulo (remainder of division: \`7 % 2\` is \`1\`)
- \`**\` Exponentiation (\`2 ** 3\` is \`8\`)

### Comparison Operators (Evaluate to bool):
- \`==\` Equal to, \`!=\` Not equal to
- \`>\`, \`<\`, \`>=\`, \`<=\` Greater/Less than

### Logical Operators:
- \`and\`: True only if both conditions are True
- \`or\`: True if at least one condition is True
- \`not\`: Inverts the boolean value`,
      syntaxExamples: [
        {
          code: `batch_size = 32\ntotal_samples = 1000\n\nnum_full_batches = total_samples // batch_size\nleftover_samples = total_samples % batch_size\n\nprint(f"Full batches: {num_full_batches}, Leftovers: {leftover_samples}")\nprint(f"Is divisible: {leftover_samples == 0}")`,
          output: `Full batches: 31, Leftovers: 8\nIs divisible: False`,
          explanation: 'Uses integer division and modulo to compute batch sizes for neural network training.',
        },
      ],
      codeExamples: [
        {
          title: 'Learning Rate & Threshold Validator',
          code: `learning_rate = 0.005\nis_valid_lr = (learning_rate > 0.0) and (learning_rate <= 1.0)\n\nepoch = 50\nis_checkpoint_epoch = (epoch % 10 == 0) or (epoch == 1)\n\nprint(f"LR valid: {is_valid_lr}")\nprint(f"Save model checkpoint: {is_checkpoint_epoch}")`,
          output: `LR valid: True\nSave model checkpoint: True`,
          lineByLine: [
            'Line 2: Chained logical comparison ensuring learning rate is in valid open-closed interval (0, 1].',
            'Line 5: Modulo check to trigger periodic checkpoint saving every 10 epochs.',
          ],
        },
      ],
      commonErrors: [
        { error: "Using = instead of == for comparison", cause: "Writing if x = 5: instead of if x == 5:.", fix: "= assigns a value; == checks equality." },
        { error: "Unexpected float division result with //", cause: "Expecting // with negative numbers to truncate toward zero (-7 // 2 is -4, not -3).", fix: "Python floor division rounds down toward negative infinity." },
      ],
      practiceProblems: [
        {
          problem: 'Given total_seconds = 3672, calculate hours, minutes, and seconds using // and % operators.',
          hint: '3600 seconds in an hour, 60 seconds in a minute.',
          solution: `total_seconds = 3672\nhours = total_seconds // 3600\nremaining_seconds = total_seconds % 3600\nminutes = remaining_seconds // 60\nseconds = remaining_seconds % 60\nprint(f"{hours}h {minutes}m {seconds}s")`,
        },
      ],
    },
    aiml: {
      topic: 'Supervised vs Unsupervised vs Reinforcement Learning',
      title: 'The Three Main Paradigms of Machine Learning',
      description: 'Diving deep into how ML problems are categorized based on supervision, feedback loops, and data availability.',
      tasks: [
        'Understand Supervised Learning: labeled data, inputs (X) mapped to ground truth targets (y)',
        'Explore Classification (discrete categories) vs Regression (continuous numeric values)',
        'Understand Unsupervised Learning: discovering hidden patterns without labels (Clustering, PCA, Density)',
        'Understand Reinforcement Learning: agent, environment, actions, rewards, and policy optimization',
      ],
      practicalExercises: [
        'Classify 5 real problems: Spam detection, House price prediction, Customer segmentation, Self-driving steering, Medical diagnosis',
        'Write down feature vectors X and target labels y for predicting car resale values',
      ],
      deliverables: ['Comparison chart documenting the 3 paradigms with goals, data needs, and canonical algorithms'],
    },
    revision: {
      mathSummary: 'Percentages express proportions per 100. Always distinguish absolute percentage point changes from relative percent gains.',
      formulas: [
        { name: 'Percent Change', formula: '((V2 - V1) / V1) * 100' },
        { name: 'Relative Error', formula: '|approx - exact| / |exact|' },
      ],
      pythonSyntax: [
        { label: 'Floor division', syntax: 'a // b' },
        { label: 'Modulo', syntax: 'a % b' },
        { label: 'Power', syntax: 'a ** b' },
      ],
      commonMistakes: [
        'Confusing assignment = with equality comparison ==.',
        'Mixing up bitwise & with logical and in Python expressions.',
      ],
      aimlConnections: 'Batching training samples into mini-batches relies on floor division and modulo logic.',
      recallQuestions: [
        { question: 'What is 15 // 4 in Python?', answer: '3' },
        { question: 'What is 15 % 4 in Python?', answer: '3' },
        { question: 'If accuracy goes from 50% to 75%, what is the percentage point increase?', answer: '25 percentage points' },
        { question: 'Is predicting the price of a stock a classification or regression task?', answer: 'Regression (predicting a continuous value)' },
        { question: 'Does Unsupervised Learning require ground truth labels y?', answer: 'No, it only learns patterns from features X' },
      ],
      checklist: [
        'I know the exact difference between / and // in Python.',
        'I can calculate percent increase and decrease accurately.',
        'I can classify any ML problem into Supervised, Unsupervised, or RL.',
      ],
    },
  },
  3: {
    math: {
      topic: 'Ratios & Proportions',
      title: 'Ratios, Proportions, and Scaling in Machine Learning',
      stage: 1,
      prerequisites: ['Fractions and percentages from Days 1 and 2'],
      explanation: `A ratio compares the relative sizes of two or more quantities (written as a:b or a/b). A proportion states that two ratios are equal: a/b = c/d.

In machine learning, ratios govern:
1. **Train/Validation/Test Splits**: e.g., an 80:10:10 ratio.
2. **Aspect Ratios**: In computer vision image resizing (e.g. 16:9, 1:1).
3. **Class Balance**: The ratio of positive to negative examples in anomaly detection (e.g. 1:1000).
4. **Feature Scaling**: Preserving relative proportions when mapping values into standard intervals.`,
      definitions: [
        { term: 'Ratio', definition: 'The quantitative relation between two amounts showing the number of times one contains another.' },
        { term: 'Proportion', definition: 'An equation stating that two ratios are equal.' },
        { term: 'Direct Variation', definition: 'When one variable increases by a factor, the other increases by the same factor (y = kx).' },
      ],
      formulas: [
        { name: 'Cross Multiplication', formula: 'If a/b = c/d, then a × d = b × c', description: 'Solving for an unknown proportion' },
        { name: 'Total Parts Ratio', formula: 'Share = (ratio_part / sum_of_parts) × Total', description: 'Partitioning a total amount' },
      ],
      examples: [
        {
          problem: 'You have 50,000 images and want to partition them with a train:validation:test ratio of 7:2:1. How many images go to each split?',
          steps: [
            'Sum of ratio parts: 7 + 2 + 1 = 10 parts.',
            'Value of 1 part: 50,000 / 10 = 5,000 images.',
            'Train set (7 parts): 7 * 5,000 = 35,000 images.',
            'Validation set (2 parts): 2 * 5,000 = 10,000 images.',
            'Test set (1 part): 1 * 5,000 = 5,000 images.',
          ],
          solution: 'Train: 35,000, Val: 10,000, Test: 5,000',
        },
      ],
      exercises: [
        { problem: 'If a model processes 400 samples in 2.5 seconds, how many samples will it process in 10 seconds at the same throughput?', hint: 'Set up proportion 400 / 2.5 = x / 10.', answer: '1,600 samples' },
      ],
      commonMistakes: [
        'Forgetting to sum all parts of a ratio when dividing a whole.',
        'Inverting terms when setting up cross-multiplication proportions.',
      ],
      aimlConnection: 'Dataset partitioning, class imbalance ratios, and learning rate decay schedules all utilize ratio math.',
    },
    python: {
      topic: 'Strings & Text Manipulation',
      title: 'String Methods, Slicing, and Formatting',
      stage: 1,
      prerequisites: ['Python basics and operators'],
      explanation: `Strings are immutable sequences of characters. In Natural Language Processing (NLP) and LLM pipelines, string manipulation is fundamental for prompt creation, tokenization preparation, and output parsing.

### Slicing Syntax:
\`string[start:stop:step]\`
- \`start\`: inclusive starting index (defaults to 0)
- \`stop\`: exclusive ending index (defaults to length)
- \`step\`: stride (negative step reverses string)

### Common String Methods:
- \`.lower()\`, \`.upper()\`, \`.strip()\` (removes leading/trailing whitespace)
- \`.split(sep)\`: splits string into a list of tokens
- \`sep.join(list_of_strings)\`: joins list into a single string
- \`.replace(old, new)\`: replaces substrings
- \`.startswith(prefix)\`, \`.endswith(suffix)\``,
      syntaxExamples: [
        {
          code: `prompt = "  Summarize this paper on Transformers.  "\ncleaned_prompt = prompt.strip().lower()\ntokens = cleaned_prompt.split()\n\nprint(f"Cleaned: '{cleaned_prompt}'")\nprint(f"Token count: {len(tokens)}")\nprint(f"Reversed: {cleaned_prompt[::-1]}")`,
          output: `Cleaned: 'summarize this paper on transformers.'\nToken count: 5\nReversed: '.sremrofsnart no repap siht ezirammus'`,
          explanation: 'Demonstrates strip, lower, split, and string reversal slicing.',
        },
      ],
      codeExamples: [
        {
          title: 'LLM Prompt Template Generator',
          code: `def build_prompt(system_role, user_query):\n    template = f"""<system>\\n{system_role.strip()}\\n</system>\\n<user>\\n{user_query.strip()}\\n</user>\\n<assistant>\\n"""\n    return template\n\np = build_prompt("You are a helpful Python tutor.", "Explain string slicing.")\nprint(p)`,
          output: `<system>\nYou are a helpful Python tutor.\n</system>\n<user>\nExplain string slicing.\n</user>\n<assistant>`,
          lineByLine: [
            'Line 1: Function taking system role and query.',
            'Line 2-5: Multi-line f-string formatted with structured tags.',
          ],
        },
      ],
      commonErrors: [
        { error: "TypeError: 'str' object does not support item assignment", cause: "Attempting text[0] = 'a'. Strings in Python are immutable.", fix: "Create a new string using slicing or concatenation." },
        { error: "IndexError: string index out of range", cause: "Accessing an index >= len(text).", fix: "Use slicing text[i:i+1] which handles out-of-range indices safely without crashing." },
      ],
      practiceProblems: [
        {
          problem: 'Write a script that takes a sentence, removes punctuation, converts to lowercase, and counts the number of words.',
          hint: 'Use .lower(), .replace(), and .split().',
          solution: `sentence = "Machine Learning, Deep Learning, and AI are transforming software!"\nfor char in ",.!":\n    sentence = sentence.replace(char, "")\nwords = sentence.lower().split()\nprint(f"Words ({len(words)}): {words}")`,
        },
      ],
    },
    aiml: {
      topic: 'The Python AI/ML Ecosystem',
      title: 'Tools, Libraries, and the Modern Data Science Stack',
      description: 'Navigating NumPy, Pandas, Matplotlib, Scikit-Learn, PyTorch, Hugging Face, and Jupyter notebooks.',
      tasks: [
        'Understand the role of NumPy (efficient multi-dimensional array math in C)',
        'Understand Pandas (tabular DataFrames and EDA)',
        'Understand Matplotlib & Seaborn (visualizing loss curves and data distributions)',
        'Explore Scikit-Learn for classical algorithms and PyTorch for deep neural networks',
        'Learn about Hugging Face Transformers for pre-trained models and datasets',
      ],
      practicalExercises: [
        'Diagram the ML development pipeline from raw data to model deployment showing which library is used at each step',
        'Check installed Python packages in your terminal with pip list',
      ],
      deliverables: ['Ecosystem cheatsheet highlighting the main responsibility of each core library'],
    },
    revision: {
      mathSummary: 'Ratios represent proportional relationships. Cross-multiplication allows solving for any single unknown in proportional systems.',
      formulas: [
        { name: 'Proportion Equality', formula: 'a/b = c/d => ad = bc' },
        { name: 'Sum of Ratio Parts', formula: 'Part_i = (r_i / sum(r)) * Total' },
      ],
      pythonSyntax: [
        { label: 'Slice', syntax: 's[start:stop:step]' },
        { label: 'Join', syntax: '" ".join(["hello", "world"])' },
      ],
      commonMistakes: [
        'Strings are immutable; .replace() returns a new string and does not modify the original in place.',
        'Off-by-one errors in string slicing: s[0:3] grabs indices 0, 1, 2 only.',
      ],
      aimlConnections: 'Text tokenization in LLMs relies directly on string cleaning, normalisation, and splitting algorithms.',
      recallQuestions: [
        { question: 'What does "hello"[::-1] produce?', answer: '"olleh" (reverses the string)' },
        { question: 'What is the sum of parts in a 70:20:10 train/val/test split?', answer: '100 parts' },
        { question: 'Can you modify a character in a Python string in place (e.g. s[0] = "A")?', answer: 'No, strings are immutable' },
        { question: 'Which library is the foundation of high-performance numeric arrays in Python?', answer: 'NumPy' },
        { question: 'What does "  data  ".strip() return?', answer: '"data"' },
      ],
      checklist: [
        'I know how to partition numbers according to multi-part ratios.',
        'I can manipulate strings with slicing, split, and join in Python.',
        'I know the primary role of each library in the Python AI stack.',
      ],
    },
  },
  4: {
    math: {
      topic: 'Negative Numbers, Powers & Roots',
      title: 'Exponent Rules, Roots, and Order of Operations',
      stage: 1,
      prerequisites: ['Arithmetic operations and multiplication'],
      explanation: `Exponents represent repeated multiplication: x^n = x * x * ... * x (n times).

### Exponent Rules:
1. **Product Rule**: x^a * x^b = x^(a + b)
2. **Quotient Rule**: x^a / x^b = x^(a - b)
3. **Power of a Power**: (x^a)^b = x^(a * b)
4. **Negative Exponent**: x^(-a) = 1 / (x^a)
5. **Zero Exponent**: x^0 = 1 (for any x ≠ 0)
6. **Fractional Exponent**: x^(1/n) = n-th root of x. E.g. x^(1/2) = √x.

### Geometric Mean & Distance:
Euclidean distance between two points (x1, y1) and (x2, y2) relies on powers and square roots:
d = √((x2 - x1)^2 + (y2 - y1)^2).`,
      definitions: [
        { term: 'Base', definition: 'The number being repeatedly multiplied in an exponential expression.' },
        { term: 'Exponent', definition: 'The power to which the base is raised.' },
        { term: 'Radical', definition: 'An expression involving a square, cube, or higher root symbol (√).' },
      ],
      formulas: [
        { name: 'Product of Powers', formula: 'x^a × x^b = x^(a+b)', description: 'Add exponents with same base' },
        { name: 'Negative Power', formula: 'x^(-n) = 1 / (x^n)', description: 'Reciprocal of positive power' },
        { name: 'Euclidean Distance (2D)', formula: 'd = √((Δx)² + (Δy)²)', description: 'L2 distance formula' },
      ],
      examples: [
        {
          problem: 'Simplify (2^3 * 2^5) / 2^4 and evaluate.',
          steps: [
            'Product in numerator: 2^(3 + 5) = 2^8.',
            'Quotient rule: 2^(8 - 4) = 2^4.',
            'Evaluate: 2 * 2 * 2 * 2 = 16.',
          ],
          solution: '16',
        },
        {
          problem: 'Compute the Euclidean distance between embedding vector A(1, 2) and B(4, 6).',
          steps: [
            'Δx = 4 - 1 = 3; (Δx)² = 9.',
            'Δy = 6 - 2 = 4; (Δy)² = 16.',
            'Sum of squares: 9 + 16 = 25.',
            'Square root: √25 = 5.',
          ],
          solution: '5.0',
        },
      ],
      exercises: [
        { problem: 'Evaluate 9^(1/2) + 27^(1/3).', hint: 'Fractional exponent 1/2 is square root, 1/3 is cube root.', answer: '6 (3 + 3)' },
      ],
      commonMistakes: [
        'Adding bases instead of multiplying (e.g. 2^3 * 2^2 ≠ 4^5).',
        'Thinking negative exponents make the number negative (2^(-3) = 1/8, NOT -8).',
      ],
      aimlConnection: 'Root Mean Squared Error (RMSE) and L2 distance norms across high-dimensional embeddings calculate square roots of summed squared differences.',
    },
    python: {
      topic: 'Type Conversion & Validation',
      title: 'Explicit Casting, try/except Blocks, and Input Checking',
      stage: 1,
      prerequisites: ['Python data types and conditions'],
      explanation: `Robust programs must handle unexpected user inputs and invalid data types gracefully without crashing.

### Explicit Type Conversion:
- \`int(value)\`: Converts string or float to integer (truncates towards zero).
- \`float(value)\`: Converts string or int to floating point.
- \`str(value)\`: Converts anything to string representation.
- \`bool(value)\`: Converts to boolean (empty strings, 0, None evaluate to False).

### Safe Conversion with Exception Handling:
\`\`\`python
try:
    val = float(user_input)
except ValueError:
    print("Invalid numeric input!")
\`\`\``,
      syntaxExamples: [
        {
          code: `def safe_float(val, default=0.0):\n    try:\n        return float(val)\n    except (ValueError, TypeError):\n        return default\n\nprint(safe_float("3.14"))\nprint(safe_float("invalid_string", default=0.0))\nprint(safe_float(None, default=-1.0))`,
          output: `3.14\n0.0\n-1.0`,
          explanation: 'Custom helper demonstrating safe casting without program termination.',
        },
      ],
      codeExamples: [
        {
          title: 'Validated Hyperparameter Reader',
          code: `def get_valid_epochs(input_str):\n    if not input_str.strip().isdigit():\n        return None\n    epochs = int(input_str)\n    return epochs if epochs > 0 else None\n\nprint("Valid 100:", get_valid_epochs(" 100 "))\nprint("Invalid -5:", get_valid_epochs("-5"))\nprint("Invalid text:", get_valid_epochs("fifty"))`,
          output: `Valid 100: 100\nInvalid -5: None\nInvalid text: None`,
          lineByLine: [
            'Line 2: Checks if string contains only digits after stripping whitespace.',
            'Line 4: Converts to int and checks positive range.',
          ],
        },
      ],
      commonErrors: [
        { error: "ValueError when casting float string to int directly: int('3.14')", cause: "int() cannot parse decimal points in strings directly.", fix: "Convert to float first: int(float('3.14'))." },
      ],
      practiceProblems: [
        {
          problem: 'Write a function parse_feature_vector(csv_line) that splits a comma-separated line of numbers and returns a list of floats, skipping invalid values.',
          hint: 'Use split(",") and a try-except block inside a loop.',
          solution: `def parse_feature_vector(line):\n    features = []\n    for item in line.split(","):\n        try:\n            features.append(float(item.strip()))\n        except ValueError:\n            continue\n    return features\n\nprint(parse_feature_vector("1.2, 3.4, missing, 5.0"))`,
        },
      ],
    },
    aiml: {
      topic: 'Data Types, Quality & Preprocessing in AI',
      title: 'Garbage In, Garbage Out: Data in Modern AI Systems',
      description: 'Understanding numerical vs categorical data, missing values, outliers, and normalization principles.',
      tasks: [
        'Explore the difference between structured (tables) and unstructured data (images, audio, text)',
        'Understand Numerical (Continuous vs Discrete) and Categorical (Nominal vs Ordinal) features',
        'Learn why models cannot train on raw strings without encoding (One-Hot, Ordinal, Embeddings)',
        'Understand data normalization: Min-Max Scaling vs Z-score Standardization',
      ],
      practicalExercises: [
        'Take a sample dataset schema (Age, Salary, City, Education Level, Churn) and classify each column by its exact data type',
        'Explain why salary ($100,000) might dominate age (25) in distance calculations without scaling',
      ],
      deliverables: ['Data dictionary table classifying features and recommended preprocessing steps'],
    },
    revision: {
      mathSummary: 'Exponent laws govern products, quotients, and powers. Negative exponents denote reciprocals; fractional exponents represent roots.',
      formulas: [
        { name: 'Power Rule', formula: '(x^a)^b = x^(ab)' },
        { name: 'Fractional Exponent', formula: 'x^(1/n) = n-root(x)' },
      ],
      pythonSyntax: [
        { label: 'Safe conversion', syntax: 'try: float(x) except ValueError: pass' },
        { label: 'String isdigit', syntax: 's.isdigit()' },
      ],
      commonMistakes: [
        'int("3.14") raises ValueError; must do int(float("3.14")).',
        'Confusing x^(-1) with -x.',
      ],
      aimlConnections: 'L2 norm and Euclidean distance across feature vectors directly compute square roots of squared differences.',
      recallQuestions: [
        { question: 'What is 16^(1/2)?', answer: '4 (square root of 16)' },
        { question: 'What is 2^(-3)?', answer: '1/8 (or 0.125)' },
        { question: 'What does int(4.9) evaluate to in Python?', answer: '4 (truncates toward zero)' },
        { question: 'Why does int("5.5") fail in Python?', answer: 'int() cannot parse string decimals directly without float()' },
        { question: 'What is the L2 distance between (0, 0) and (3, 4)?', answer: '5 (sqrt(3^2 + 4^2) = sqrt(25) = 5)' },
      ],
      checklist: [
        'I can apply all 6 exponent rules accurately.',
        'I know how to safely parse user input with try/except in Python.',
        'I understand the distinction between continuous and categorical features.',
      ],
    },
  },
  5: {
    math: {
      topic: 'Variables & Algebraic Expressions',
      title: 'Algebraic Formulations, Linear Equations, and Slopes',
      stage: 1,
      prerequisites: ['Arithmetic, exponents, and negative numbers'],
      explanation: `Algebra introduces symbolic variables (like x, y, w, b) to represent unknown or changing values.

### The Linear Model Equation:
In Machine Learning, the most fundamental equation is:
**y = w * x + b**
- **x**: Input feature
- **w**: Weight (or slope / coefficient) — dictates how strongly x affects y
- **b**: Bias (or y-intercept) — base value when x is 0
- **y**: Predicted target output

### Solving for an Unknown:
To solve for x in \`w * x + b = 0\`:
1. Subtract b from both sides: \`w * x = -b\`
2. Divide both sides by w: \`x = -b / w\` (provided w ≠ 0).

### Slopes (Rate of Change):
Slope m = (y2 - y1) / (x2 - x1) = Δy / Δx.
- Positive slope: As x increases, y increases.
- Negative slope: As x increases, y decreases.
- Zero slope: Horizontal line; x has no influence on y.`,
      definitions: [
        { term: 'Coefficient / Weight', definition: 'A numerical factor multiplying a variable (e.g. w in wx).' },
        { term: 'Bias / Intercept', definition: 'A constant added to a linear equation representing the baseline value.' },
        { term: 'Slope', definition: 'The ratio of vertical change (rise) to horizontal change (run).' },
      ],
      formulas: [
        { name: 'Linear Equation', formula: 'y = mx + b  (or  y = wx + b)', description: 'Slope-intercept form' },
        { name: 'Slope Formula', formula: 'm = (y₂ - y₁) / (x₂ - x₁)', description: 'Rate of change between two points' },
      ],
      examples: [
        {
          problem: 'Given a linear model y = 2.5 * x + 10, predict y when x = 4. Then find x when y = 35.',
          steps: [
            'For x = 4: y = (2.5 * 4) + 10 = 10 + 10 = 20.',
            'For y = 35: 35 = 2.5 * x + 10.',
            'Subtract 10: 25 = 2.5 * x.',
            'Divide by 2.5: x = 25 / 2.5 = 10.',
          ],
          solution: 'y = 20; x = 10',
        },
      ],
      exercises: [
        { problem: 'A line passes through (2, 5) and (6, 17). What is its slope m?', hint: 'm = (17 - 5) / (6 - 2).', answer: '3' },
      ],
      commonMistakes: [
        'Inverting slope formula to Δx / Δy instead of Δy / Δx.',
        'Not applying operations equally to both sides of an equation.',
      ],
      aimlConnection: 'Every single neuron in a neural network computes an algebraic affine transformation: z = w1*x1 + w2*x2 + ... + wn*xn + b.',
    },
    python: {
      topic: 'Control Flow (if, elif, else)',
      title: 'Conditional Branching and Logical Decisions',
      stage: 1,
      prerequisites: ['Comparison and logical operators'],
      explanation: `Control flow statements allow code to make decisions based on runtime conditions.

### Syntax Structure:
\`\`\`python
if condition_1:
    # runs if condition_1 is True
elif condition_2:
    # runs if condition_1 was False and condition_2 is True
else:
    # runs if all previous conditions were False
\`\`\`

### Ternary Operator (Inline if):
\`\`\`python
status = "Pass" if score >= 70 else "Needs Revision"
\`\`\``,
      syntaxExamples: [
        {
          code: `def classify_confidence(score):\n    if score >= 0.90:\n        return "High Confidence"\n    elif score >= 0.70:\n        return "Moderate Confidence"\n    elif score >= 0.50:\n        return "Low Confidence"\n    else:\n        return "Reject Prediction"\n\nprint(classify_confidence(0.95))\nprint(classify_confidence(0.62))\nprint(classify_confidence(0.30))`,
          output: `High Confidence\nLow Confidence\nReject Prediction`,
          explanation: 'Standard multi-branch if/elif/else classification logic.',
        },
      ],
      codeExamples: [
        {
          title: 'Learning Rate Scheduler Step Logic',
          code: `def get_learning_rate(epoch, base_lr=0.01):\n    if epoch < 10:\n        return base_lr\n    elif epoch < 30:\n        return base_lr * 0.1\n    else:\n        return base_lr * 0.01\n\nfor ep in [5, 15, 45]:\n    print(f"Epoch {ep}: lr = {get_learning_rate(ep)}")`,
          output: `Epoch 5: lr = 0.01\nEpoch 15: lr = 0.001\nEpoch 45: lr = 0.0001`,
          lineByLine: [
            'Line 2-7: Checks epoch bounds and returns decayed learning rate factor.',
          ],
        },
      ],
      commonErrors: [
        { error: "IndentationError: expected an indented block", cause: "Leaving an if statement body empty without the pass keyword.", fix: "Add pass or code inside every indented block." },
      ],
      practiceProblems: [
        {
          problem: 'Write a program that takes student attendance percentage and exam score, and prints "Eligible for certificate" if attendance >= 80 and score >= 75, otherwise prints specific reason.',
          hint: 'Use nested if or compound conditions with and.',
          solution: `def check_certificate(attendance, score):\n    if attendance >= 80 and score >= 75:\n        return "Eligible for certificate"\n    elif attendance < 80:\n        return f"Attendance too low ({attendance}%)"\n    else:\n        return f"Score too low ({score}%)"\n\nprint(check_certificate(85, 90))\nprint(check_certificate(70, 95))`,
        },
      ],
    },
    aiml: {
      topic: 'Your First ML Concept: Linear Regression Intuition',
      title: 'Predicting Continuous Values with Linear Models',
      description: 'Understanding how the equation y = wx + b can fit real-world data points and minimize error.',
      tasks: [
        'Understand how a straight line can model real phenomena (e.g. Study Hours vs Exam Score)',
        'Understand what a Residual (Error) is: Error = Actual y - Predicted y',
        'Learn why we square errors: (Actual - Predicted)^2 penalizes large deviations and eliminates negatives',
        'Understand the goal of training: Finding w and b that minimize Mean Squared Error (MSE)',
      ],
      practicalExercises: [
        'Given 3 points: (1, 2), (2, 4), (3, 6), calculate predictions for y = 2x and compute the total error',
        'Draw a scatter plot and visually estimate where a best-fit regression line would lie',
      ],
      deliverables: ['Step-by-step calculation showing how MSE is calculated across 3 sample points'],
    },
    revision: {
      mathSummary: 'Linear equations y = wx + b define straight lines where w is the slope (rate of change) and b is the intercept.',
      formulas: [
        { name: 'Linear Model', formula: 'y = wx + b' },
        { name: 'Residual Error', formula: 'e = y_actual - y_predicted' },
      ],
      pythonSyntax: [
        { label: 'if/elif/else', syntax: 'if cond: ... elif cond2: ... else: ...' },
        { label: 'Ternary', syntax: 'val = x if cond else y' },
      ],
      commonMistakes: [
        'Using single = in if statements instead of double ==.',
        'Forgetting that elif checks stop once the first True branch is encountered.',
      ],
      aimlConnections: 'Linear regression finds optimal weight w and bias b to minimize mean squared residuals.',
      recallQuestions: [
        { question: 'In the equation y = wx + b, what do w and b represent in ML?', answer: 'w is weight (slope/coefficient), b is bias (intercept)' },
        { question: 'If y = 3x - 5, what is y when x = 4?', answer: '7 (3*4 - 5 = 12 - 5 = 7)' },
        { question: 'How do you write a ternary expression in Python for assigning "Pass" if score >= 50 else "Fail"?', answer: 'res = "Pass" if score >= 50 else "Fail"' },
        { question: 'Why do we square errors in Mean Squared Error?', answer: 'To eliminate negative signs and penalize larger errors more heavily' },
        { question: 'What keyword can you use as a placeholder inside an empty if block to avoid an IndentationError?', answer: 'pass' },
      ],
      checklist: [
        'I understand the linear equation y = wx + b and can solve for x or y.',
        'I can write multi-condition if/elif/else statements in Python.',
        'I understand the intuition behind Linear Regression and residuals.',
      ],
    },
  },
};

// Generate 10 math questions for a day
function generateDayMathQuestions(dayNumber) {
  const stage = Math.min(6, Math.ceil(dayNumber / 20));
  
  if (dayNumber === 1) {
    return [
      { id: `mathq_d1_1`, dayNumber: 1, questionNumber: 1, topic: 'Fractions', difficulty: 'basic', problem: 'Simplify the fraction 24/36 to its lowest terms.', hint: 'Find the greatest common divisor of 24 and 36 (which is 12).', correctAnswer: '2/3', explanation: 'Divide numerator and denominator by 12: 24÷12 = 2, 36÷12 = 3. Result is 2/3.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_2`, dayNumber: 1, questionNumber: 2, topic: 'Fractions', difficulty: 'basic', problem: 'Compute: (3/7) + (2/7).', hint: 'The denominators are already identical. Add the numerators.', correctAnswer: '5/7', explanation: '(3 + 2) / 7 = 5/7.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_3`, dayNumber: 1, questionNumber: 3, topic: 'Fractions to Decimals', difficulty: 'basic', problem: 'Convert the fraction 3/8 into a decimal.', hint: 'Perform long division: 3 ÷ 8.', correctAnswer: '0.375', explanation: '3 divided by 8 equals 0.375.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_4`, dayNumber: 1, questionNumber: 4, topic: 'Fraction Operations', difficulty: 'standard', problem: 'Calculate: (5/6) - (1/4). Simplify your answer.', hint: 'The least common multiple of 6 and 4 is 12.', correctAnswer: '7/12', explanation: '5/6 = 10/12, and 1/4 = 3/12. 10/12 - 3/12 = 7/12.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_5`, dayNumber: 1, questionNumber: 5, topic: 'Multiplication', difficulty: 'standard', problem: 'Calculate: (4/9) × (3/8). Simplify completely.', hint: 'Multiply numerators and denominators, or cross-cancel common factors.', correctAnswer: '1/6', explanation: '(4 × 3) / (9 × 8) = 12 / 72. Divide both by 12 gives 1/6.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_6`, dayNumber: 1, questionNumber: 6, topic: 'Division', difficulty: 'standard', problem: 'Compute: (2/5) ÷ (4/15).', hint: 'Multiply by the reciprocal: (2/5) × (15/4).', correctAnswer: '3/2', explanation: '(2/5) * (15/4) = 30 / 20 = 3/2 (or 1.5).', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_7`, dayNumber: 1, questionNumber: 7, topic: 'Multi-step Fractions', difficulty: 'multi-step', problem: 'Solve for x: (2/3)x + (1/2) = (5/6).', hint: 'Subtract 1/2 from both sides, then multiply by 3/2.', correctAnswer: '1/2', explanation: '(2/3)x = 5/6 - 3/6 = 2/6 = 1/3. Then x = (1/3) × (3/2) = 1/2.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_8`, dayNumber: 1, questionNumber: 8, topic: 'Multi-step Fractions', difficulty: 'multi-step', problem: 'Evaluate: [(1/2) + (2/3)] × [(3/4) - (1/3)]. Express as a fraction.', hint: 'Calculate each bracket separately first.', correctAnswer: '35/72', explanation: 'First bracket: 3/6 + 4/6 = 7/6. Second bracket: 9/12 - 4/12 = 5/12. Product: (7/6) * (5/12) = 35/72.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_9`, dayNumber: 1, questionNumber: 9, topic: 'AI/ML Application', difficulty: 'challenging', problem: 'In a dataset of 1,200 training samples, 3/8 are Class A, 5/12 are Class B, and the remainder are Class C. How many samples belong to Class C?', hint: 'Find the total fraction for A and B first by finding a common denominator (24).', correctAnswer: '250', explanation: 'Class A: 1200 * (3/8) = 450. Class B: 1200 * (5/12) = 500. Total A+B = 950. Remainder for C: 1200 - 950 = 250.', completed: false, flaggedForRevision: false },
      { id: `mathq_d1_10`, dayNumber: 1, questionNumber: 10, topic: 'AI/ML Application', difficulty: 'challenging', problem: 'A model predicts probabilities p1 = 2/5 and p2 = 7/20 for two independent events. To normalize, a third probability p3 is needed such that p1 + p2 + p3 = 1. What must p3 be as a fraction and percentage?', hint: 'Convert 2/5 to twentieths: 8/20.', correctAnswer: '1/4', explanation: 'p1 = 8/20. p1 + p2 = 8/20 + 7/20 = 15/20 = 3/4. Therefore p3 = 1 - 3/4 = 1/4 (25%).', completed: false, flaggedForRevision: false },
    ];
  }

  // Generic procedural questions for other days
  const topics = ['Arithmetic', 'Algebra', 'Geometry', 'Calculus', 'Probability', 'Linear Algebra'];
  const baseTopic = topics[(dayNumber - 1) % topics.length];
  
  return Array.from({ length: 10 }, (_, i) => {
    const qNum = i + 1;
    let difficulty = 'basic';
    if (qNum >= 4 && qNum <= 6) difficulty = 'standard';
    else if (qNum >= 7 && qNum <= 8) difficulty = 'multi-step';
    else if (qNum >= 9) difficulty = 'challenging';

    return {
      id: `mathq_d${dayNumber}_${qNum}`,
      dayNumber,
      questionNumber: qNum,
      topic: `${baseTopic} - Stage ${stage}`,
      difficulty,
      problem: `[Day ${dayNumber}] Question ${qNum} (${difficulty}): Solve the core ${baseTopic.toLowerCase()} practice problem for today's curriculum. Calculate the exact value for test scenario ${dayNumber}.${qNum}.`,
      hint: `Review the Stage ${stage} reference formulas and definitions for ${baseTopic}.`,
      correctAnswer: `${(dayNumber * 2 + qNum * 3)}`,
      explanation: `Step 1: Identify given parameters for Day ${dayNumber}. Step 2: Apply Stage ${stage} formula. Step 3: Compute final value = ${(dayNumber * 2 + qNum * 3)}.`,
      completed: false,
      flaggedForRevision: false,
    };
  });
}

// Generate 10 python questions for a day
function generateDayPythonQuestions(dayNumber) {
  const stage = Math.min(5, Math.ceil(dayNumber / 24));
  
  if (dayNumber === 1) {
    return [
      { id: `pyq_d1_1`, dayNumber: 1, questionNumber: 1, topic: 'Variables', difficulty: 'syntax', problem: 'Assign the integer 42 to variable "answer" and print its data type using type().', inputRequirements: 'None', expectedOutput: "<class 'int'>", hint: 'Use type(answer)', referenceSolution: 'answer = 42\nprint(type(answer))', explanation: 'Assigns 42 and calls print(type(answer)).', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_2`, dayNumber: 1, questionNumber: 2, topic: 'Primitive Types', difficulty: 'syntax', problem: 'Create a float variable named "lr" with value 0.001 and boolean "is_active" with value True.', inputRequirements: 'None', expectedOutput: '0.001 True', hint: 'Assign lr = 0.001 and is_active = True', referenceSolution: 'lr = 0.001\nis_active = True\nprint(lr, is_active)', explanation: 'Creates float and bool primitives.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_3`, dayNumber: 1, questionNumber: 3, topic: 'String Formatting', difficulty: 'syntax', problem: 'Given name = "ResNet" and layers = 50, use an f-string to print: "Model: ResNet-50".', inputRequirements: 'name, layers', expectedOutput: 'Model: ResNet-50', hint: 'f"Model: {name}-{layers}"', referenceSolution: 'name = "ResNet"\nlayers = 50\nprint(f"Model: {name}-{layers}")', explanation: 'Formats variables inside an f-string.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_4`, dayNumber: 1, questionNumber: 4, topic: 'Arithmetic', difficulty: 'practical', problem: 'Write code to calculate the area of a circle with radius r = 5. Use pi = 3.14159. Print result.', inputRequirements: 'r = 5', expectedOutput: '78.53975', hint: 'Area = pi * (r ** 2)', referenceSolution: 'r = 5\npi = 3.14159\narea = pi * (r ** 2)\nprint(area)', explanation: 'Uses the exponent operator ** to square radius.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_5`, dayNumber: 1, questionNumber: 5, topic: 'Casting', difficulty: 'practical', problem: 'Given string s = "128", convert it to an integer, multiply by 2, and print the result.', inputRequirements: 's = "128"', expectedOutput: '256', hint: 'int(s) * 2', referenceSolution: 's = "128"\nresult = int(s) * 2\nprint(result)', explanation: 'Explicitly casts string to int before multiplication.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_6`, dayNumber: 1, questionNumber: 6, topic: 'Input / Output', difficulty: 'practical', problem: 'Simulate user input: hours = "3.5". Convert to float, multiply by 60, and print integer minutes.', inputRequirements: 'hours = "3.5"', expectedOutput: '210', hint: 'int(float(hours) * 60)', referenceSolution: 'hours = "3.5"\nminutes = int(float(hours) * 60)\nprint(minutes)', explanation: 'Parses float string, converts to minutes, and casts to int.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_7`, dayNumber: 1, questionNumber: 7, topic: 'Debugging', difficulty: 'debugging', problem: 'Fix the syntax error: print("Score: " + 98.5)', inputRequirements: 'None', expectedOutput: 'Score: 98.5', hint: 'Cannot concatenate string and float directly. Use f-string or str().', referenceSolution: 'print(f"Score: {98.5}")', explanation: 'Replaces invalid string concatenation with f-string.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_8`, dayNumber: 1, questionNumber: 8, topic: 'Debugging', difficulty: 'debugging', problem: 'Fix variable naming error: 1st_loss = 0.45; print(1st_loss)', inputRequirements: 'None', expectedOutput: '0.45', hint: 'Variable names cannot start with numbers.', referenceSolution: 'loss_1st = 0.45\nprint(loss_1st)', explanation: 'Renames variable so it starts with an alphabet character.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_9`, dayNumber: 1, questionNumber: 9, topic: 'Multi-concept', difficulty: 'multi-concept', problem: 'Write a script that takes total_minutes = 255 and prints "4 hours and 15 minutes" using // and %.', inputRequirements: 'total_minutes = 255', expectedOutput: '4 hours and 15 minutes', hint: 'hrs = total_minutes // 60, mins = total_minutes % 60', referenceSolution: 'total_minutes = 255\nhrs = total_minutes // 60\nmins = total_minutes % 60\nprint(f"{hrs} hours and {mins} minutes")', explanation: 'Combines integer division and modulo for time unit conversions.', completed: false, flaggedForRevision: false },
      { id: `pyq_d1_10`, dayNumber: 1, questionNumber: 10, topic: 'AI Application', difficulty: 'multi-concept', problem: 'Calculate the percentage accuracy given correct = 87 and total = 100. Print formatted to 1 decimal place: "Accuracy: 87.0%".', inputRequirements: 'correct = 87, total = 100', expectedOutput: 'Accuracy: 87.0%', hint: 'Use (correct / total) * 100 and :.1f formatting.', referenceSolution: 'correct = 87\ntotal = 100\nacc = (correct / total) * 100\nprint(f"Accuracy: {acc:.1f}%")', explanation: 'Calculates ratio, scales to percent, formats with one decimal place.', completed: false, flaggedForRevision: false },
    ];
  }

  return Array.from({ length: 10 }, (_, i) => {
    const qNum = i + 1;
    let difficulty = 'syntax';
    if (qNum >= 4 && qNum <= 6) difficulty = 'practical';
    else if (qNum >= 7 && qNum <= 8) difficulty = 'debugging';
    else if (qNum >= 9) difficulty = 'multi-concept';

    return {
      id: `pyq_d${dayNumber}_${qNum}`,
      dayNumber,
      questionNumber: qNum,
      topic: `Python Stage ${stage} Exercise`,
      difficulty,
      problem: `[Day ${dayNumber}] Exercise ${qNum} (${difficulty}): Implement the required Stage ${stage} function or script according to specifications for Day ${dayNumber}.`,
      inputRequirements: 'Sample test input',
      expectedOutput: `Output for Day ${dayNumber} Test ${qNum}`,
      hint: `Use Python Stage ${stage} standard library functions.`,
      referenceSolution: `# Day ${dayNumber} Problem ${qNum}\ndef solution():\n    return "Result ${dayNumber}_${qNum}"\n\nprint(solution())`,
      explanation: `Step 1: Parse test input. Step 2: Implement logic for problem ${qNum}. Step 3: Print expected output.`,
      completed: false,
      flaggedForRevision: false,
    };
  });
}

// Generate complete study day object
export function generateStudyDay(dayNumber) {
  const safeDay = Math.max(1, Math.min(TOTAL_STUDY_DAYS, Number(dayNumber) || 1));
  const weekNumber = Math.ceil(safeDay / 5);
  const dayInWeek = ((safeDay - 1) % 5) + 1;

  // Use detailed day if available, else generate structured curriculum day
  const detailed = WEEK_1_DATA[safeDay];

  const mathStageIndex = Math.min(5, Math.floor((safeDay - 1) / 20));
  const pythonStageIndex = Math.min(4, Math.floor((safeDay - 1) / 24));
  const currentMathStage = MATH_STAGES[mathStageIndex];
  const currentPythonStage = PYTHON_STAGES[pythonStageIndex];

  const mathTopic = detailed?.math.topic || `${currentMathStage.topics[(safeDay - 1) % currentMathStage.topics.length]}`;
  const pythonTopic = detailed?.python.topic || `${currentPythonStage.topics[(safeDay - 1) % currentPythonStage.topics.length]}`;

  // 4 tasks according to mandatory daily 4-hour structure
  const tasks = [
    {
      id: `task_d${safeDay}_math_1`,
      dayNumber: safeDay,
      block: 'mathematics',
      title: `Mathematics: ${mathTopic}`,
      description: detailed?.math.title || `Study mathematical principles of ${mathTopic}. Complete theory reading, worked examples, and step-by-step problem sets.`,
      learningObjective: `Master foundational concepts, formulas, and real-world AI applications of ${mathTopic}.`,
      estimatedMinutes: 60,
      status: 'not_started',
      notes: '',
      completedAt: null,
      flaggedForRevision: false,
    },
    {
      id: `task_d${safeDay}_python_1`,
      dayNumber: safeDay,
      block: 'python',
      title: `Python Programming: ${pythonTopic}`,
      description: detailed?.python.title || `Learn syntax, conventions, and implementation of ${pythonTopic}. Practice code examples and solve debugging challenges.`,
      learningObjective: `Write clean, idiomatic Python code implementing ${pythonTopic} with proper error handling.`,
      estimatedMinutes: 90,
      status: 'not_started',
      notes: '',
      completedAt: null,
      flaggedForRevision: false,
    },
    {
      id: `task_d${safeDay}_aiml_1`,
      dayNumber: safeDay,
      block: 'aiml',
      title: detailed?.aiml.title || `AI/ML Practical: ${mathTopic} & ${pythonTopic}`,
      description: detailed?.aiml.description || `Connect today's mathematics and Python concepts to real-world machine learning architectures and workflows.`,
      learningObjective: `Bridge theoretical principles to hands-on AI/ML modeling and implementation.`,
      estimatedMinutes: 60,
      status: 'not_started',
      notes: '',
      completedAt: null,
      flaggedForRevision: false,
    },
    {
      id: `task_d${safeDay}_revision_1`,
      dayNumber: safeDay,
      block: 'revision',
      title: `Revision & Daily Assessment (Day ${safeDay})`,
      description: `Review notes, consolidate formulas, and attempt the 10 Mathematics and 10 Python daily assessment questions.`,
      learningObjective: `Verify retention through recall questions and 20 practice assessment problems.`,
      estimatedMinutes: 30,
      status: 'not_started',
      notes: '',
      completedAt: null,
      flaggedForRevision: false,
    },
  ];

  const mathLesson = detailed?.math ? {
    id: `math_d${safeDay}`,
    dayNumber: safeDay,
    stage: detailed.math.stage,
    topic: detailed.math.topic,
    title: detailed.math.title,
    prerequisites: detailed.math.prerequisites,
    explanation: detailed.math.explanation,
    definitions: detailed.math.definitions,
    formulas: detailed.math.formulas,
    examples: detailed.math.examples,
    exercises: detailed.math.exercises,
    commonMistakes: detailed.math.commonMistakes,
    aimlConnection: detailed.math.aimlConnection,
    completed: false,
    flaggedForRevision: false,
  } : {
    id: `math_d${safeDay}`,
    dayNumber: safeDay,
    stage: currentMathStage.id,
    topic: mathTopic,
    title: `${mathTopic} - Theory and Worked Examples`,
    prerequisites: ['Prior stage lessons and foundational algebraic operations'],
    explanation: `### Topic Overview: ${mathTopic}\n\nIn Stage ${currentMathStage.id} (${currentMathStage.title}), this lesson develops core competencies in ${mathTopic}. Understanding these properties is essential for understanding machine learning loss surfaces, optimization, and parameter updates.\n\n### Core Properties:\n1. Analytical derivation and conceptual meaning\n2. Geometric and tabular interpretations\n3. Algorithmic efficiency and computation considerations`,
    definitions: [
      { term: mathTopic, definition: `The mathematical formulation and principles governing ${mathTopic.toLowerCase()}.` },
      { term: 'Affine Function', definition: 'A function composed of a linear map followed by a constant bias translation.' },
    ],
    formulas: [
      { name: 'Standard Formulation', formula: 'f(x) = ∑ (w_i × x_i) + b', description: 'Core mathematical relationship' },
    ],
    examples: [
      {
        problem: `Apply the core formula of ${mathTopic} to compute output for standard unit parameters.`,
        steps: [
          'Step 1: Identify input parameters and boundary conditions.',
          'Step 2: Substitute values into the governing expression.',
          'Step 3: Simplify and verify units.',
        ],
        solution: 'Verified analytical output.',
      },
    ],
    exercises: [
      { problem: `Solve practice exercise 1 for ${mathTopic}.`, hint: 'Review the definition above.', answer: 'Consistent analytical result' },
    ],
    commonMistakes: [
      'Applying equations without verifying required prerequisite conditions.',
      'Misinterpreting dimension shapes during vector and matrix operations.',
    ],
    aimlConnection: `Used directly in training loss calculations and parameter updates in machine learning models.`,
    completed: false,
    flaggedForRevision: false,
  };

  const pythonLesson = detailed?.python ? {
    id: `python_d${safeDay}`,
    dayNumber: safeDay,
    stage: detailed.python.stage,
    topic: detailed.python.topic,
    title: detailed.python.title,
    prerequisites: detailed.python.prerequisites,
    explanation: detailed.python.explanation,
    syntaxExamples: detailed.python.syntaxExamples,
    codeExamples: detailed.python.codeExamples,
    commonErrors: detailed.python.commonErrors,
    practiceProblems: detailed.python.practiceProblems,
    completed: false,
    flaggedForRevision: false,
  } : {
    id: `python_d${safeDay}`,
    dayNumber: safeDay,
    stage: currentPythonStage.id,
    topic: pythonTopic,
    title: `Practical ${pythonTopic} in Modern Python`,
    prerequisites: ['Python basics and active development environment'],
    explanation: `### Programming Topic: ${pythonTopic}\n\nThis lesson explores ${pythonTopic} within Python Stage ${currentPythonStage.id}. Writing clean, modular, and performant code is critical when constructing data processing pipelines and training scripts.`,
    syntaxExamples: [
      {
        code: `# Demonstration of ${pythonTopic}\ndef process_data(inputs):\n    """Process inputs using ${pythonTopic} patterns."""\n    return [item for item in inputs if item is not None]\n\nprint(process_data([1, 2, None, 4]))`,
        output: '[1, 2, 4]',
        explanation: `Demonstrates clean handling of collections and validation.`,
      },
    ],
    codeExamples: [
      {
        title: `${pythonTopic} Pipeline Example`,
        code: `data = [10, 20, 30, 40]\nmean_val = sum(data) / len(data)\nvariance = sum((x - mean_val) ** 2 for x in data) / len(data)\nprint(f"Mean: {mean_val}, Variance: {variance}")`,
        output: 'Mean: 25.0, Variance: 125.0',
        lineByLine: [
          'Calculates mean through built-in sum and len.',
          'Uses generator expression to compute squared deviations.',
        ],
      },
    ],
    commonErrors: [
      { error: 'IndexError / KeyError', cause: 'Querying nonexistent indices or keys.', fix: 'Use bounds checking or dict.get(key, default).' },
    ],
    practiceProblems: [
      {
        problem: `Write a modular function implementing ${pythonTopic} logic with error handling.`,
        hint: 'Use defensive checks and type validation.',
        solution: `def run():\n    return "Success"\nprint(run())`,
      },
    ],
    completed: false,
    flaggedForRevision: false,
  };

  const aimlActivity = detailed?.aiml ? {
    id: `aiml_d${safeDay}`,
    dayNumber: safeDay,
    title: detailed.aiml.title,
    topic: detailed.aiml.topic,
    description: detailed.aiml.description,
    tasks: detailed.aiml.tasks,
    practicalExercises: detailed.aiml.practicalExercises,
    deliverables: detailed.aiml.deliverables,
  } : {
    id: `aiml_d${safeDay}`,
    dayNumber: safeDay,
    title: `Applied AI/ML Session: ${mathTopic}`,
    topic: `Practical integration of ${mathTopic}`,
    description: `Connect today's mathematics and Python principles to modern AI/ML development.`,
    tasks: [
      `Review class notes on ${mathTopic}`,
      `Implement sample verification script in Python`,
      `Document key takeaways and mathematical insights in study journal`,
    ],
    practicalExercises: [
      `Construct a minimal working script linking ${pythonTopic} with ${mathTopic}`,
    ],
    deliverables: [`Study note summarizing algorithmic applications of ${mathTopic}`],
  };

  const revision = detailed?.revision ? {
    dayNumber: safeDay,
    mathSummary: detailed.revision.mathSummary,
    formulas: detailed.revision.formulas,
    pythonSyntax: detailed.revision.pythonSyntax,
    commonMistakes: detailed.revision.commonMistakes,
    aimlConnections: detailed.revision.aimlConnections,
    recallQuestions: detailed.revision.recallQuestions,
    checklist: detailed.revision.checklist,
  } : {
    dayNumber: safeDay,
    mathSummary: `Consolidation of ${mathTopic} within Stage ${currentMathStage.id}. Focus on notation, formula derivation, and boundary cases.`,
    formulas: [
      { name: 'Core Expression', formula: 'y = wx + b' },
      { name: 'Error Metric', formula: 'MSE = (1/n) * ∑ (y - y_hat)^2' },
    ],
    pythonSyntax: [
      { label: 'Function definition', syntax: 'def function_name(param: type) -> return_type:' },
      { label: 'List comprehension', syntax: '[f(x) for x in iterable if condition]' },
    ],
    commonMistakes: [
      'Confusing variable types during numerical calculations.',
      'Omitting parentheses when chaining complex boolean conditions.',
    ],
    aimlConnections: `Direct application in parameter optimization and evaluation metrics.`,
    recallQuestions: [
      { question: `What is the core formula studied today for ${mathTopic}?`, answer: 'f(x) = wx + b or standard canonical form' },
      { question: `How does Python handle type casting for numeric conversions?`, answer: 'Explicit functions: int(), float(), str()' },
      { question: `Why is data normalization crucial before feeding features into an ML model?`, answer: 'To prevent large-magnitude features from dominating distance calculations' },
      { question: `What is the difference between supervised and unsupervised learning?`, answer: 'Supervised uses labeled targets (X -> y); unsupervised discovers patterns from X alone' },
      { question: `What is a residual in regression analysis?`, answer: 'The difference between the actual observed value and the predicted value (y - y_hat)' },
    ],
    checklist: [
      `I have reviewed the core principles of ${mathTopic}.`,
      `I have practiced writing Python code for ${pythonTopic}.`,
      `I have completed today's 10 Mathematics and 10 Python assessment questions.`,
    ],
  };

  return {
    dayNumber: safeDay,
    weekNumber,
    dayInWeek,
    tasks,
    mathLesson,
    pythonLesson,
    aimlActivity,
    revision,
    mathQuestions: generateDayMathQuestions(safeDay),
    pythonQuestions: generateDayPythonQuestions(safeDay),
  };
}

