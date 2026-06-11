const icon = (name, extra = "") =>
  `<svg class="icon ${extra}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

const topics = [
  "Budget",
  "First Job",
  "Financial Plan",
  "Investment",
  "Marriage",
  "Child(ren)",
  "Home Purchase",
  "Divorce",
  "Estate Plan",
  "Elderly Care",
  "Retirement",
];

const rooms = [
  {
    id: "lounge",
    label: "Lounge",
    icon: "glass",
    description:
      "Join Ziva's virtual lounge for relaxed, insightful chats on your financial journey.",
  },
  {
    id: "game",
    label: "Game Room",
    icon: "game",
    description:
      "Learn to invest with quizzes and games that make finance feel approachable.",
  },
  {
    id: "library",
    label: "Library",
    icon: "book",
    description:
      "Discover articles, podcasts, and books empowering women in finance.",
  },
  {
    id: "tool",
    label: "Tool Chamber",
    icon: "wand",
    description:
      "Explore tools to visualize, track, and plan your financial goals.",
  },
  {
    id: "classroom",
    label: "Classroom",
    icon: "person",
    description:
      "Book a 1:1 consultation with industry leaders for personalized financial advice.",
  },
];

const navItems = [
  { id: "home", label: "Home", icon: "home" },
  ...rooms,
  { id: "faq", label: "FAQ", icon: "comment" },
  { id: "treasure", label: "Treasure Box", icon: "diamond" },
];

const gameCategories = [
  { id: "retirement", label: "Retirement", icon: "home", live: false },
  { id: "investment", label: "Investment", icon: "chart", live: true },
  { id: "elderly", label: "Elderly Care", icon: "heart", live: false },
  { id: "estate", label: "Estate Plan", icon: "diamond", live: false },
  { id: "challenge", label: "Comprehensive Quiz", icon: "game", live: false },
  { id: "sandbox", label: "123456", icon: "game", live: false },
];

const quizQuestions = [
  {
    question: "What is a custodian bank?",
    answers: [
      "A secret hideout where custodians plot to keep school hallways spotless.",
      "A futuristic invention for storing custard pies without them getting squished.",
      "A bank that holds onto your spare change until you forget about it.",
      "A financial institution that safeguards customers' securities and manages various financial services.",
    ],
    correct: 3,
  },
  {
    question: "Why does diversification matter?",
    answers: [
      "It spreads risk across different kinds of investments.",
      "It guarantees the highest return every month.",
      "It lets you ignore your goals after investing once.",
      "It only matters after you retire.",
    ],
    correct: 0,
  },
  {
    question: "What is a bond?",
    answers: [
      "A loan you make to a company or government that pays interest over time.",
      "A password for logging into a bank account.",
      "A receipt for a shopping purchase.",
      "A stock that cannot change price.",
    ],
    correct: 0,
  },
  {
    question: "What does a longer investment duration usually allow?",
    answers: [
      "More time to ride out normal market movement.",
      "A reason to skip emergency savings.",
      "A promise that investments cannot lose value.",
      "The ability to avoid understanding fees.",
    ],
    correct: 0,
  },
  {
    question: "What does a stock and bond mix describe?",
    answers: [
      "How your investment is split between growth assets and steadier income assets.",
      "The color palette for a finance website.",
      "The amount of cash in your wallet.",
      "A reward catalog for beauty products.",
    ],
    correct: 0,
  },
  {
    question: "What should you do with an educational forecast?",
    answers: [
      "Treat it as a planning aid and review assumptions before acting.",
      "Move every dollar immediately.",
      "Ignore taxes, fees, and risk.",
      "Use it as a guaranteed promise.",
    ],
    correct: 0,
  },
];

const state = {
  view: "welcome",
  authMode: "create",
  showDailyModal: false,
  activeRoom: "home",
  selectedTopics: ["Financial Plan", "First Job", "Budget"],
  username: "yyy71242",
  displayName: "Andrea",
  diamonds: 7600,
  portfolio: 75762.94,
  daysTraining: 148,
  completedQuizzes: 0,
  zivaOpen: false,
  faqOpen: "safety",
  gameStage: "categories",
  comingSoon: "",
  quizIndex: 0,
  quizChoice: null,
  quizChecked: false,
  quizComplete: false,
  selectedBooking: "",
  tool: {
    goal: "Retirement",
    amount: 5000,
    years: 5,
    monthly: 500,
    stock: 60,
  },
};

const app = document.querySelector("#app");

function render() {
  if (state.view === "welcome") {
    app.innerHTML = renderWelcome();
  } else if (state.view === "auth") {
    app.innerHTML = renderAuth();
  } else if (state.view === "intro") {
    app.innerHTML = renderIntroVideo();
  } else if (state.view === "topics") {
    app.innerHTML = renderTopics();
  } else if (state.view === "rooms") {
    app.innerHTML = renderRooms();
  } else {
    app.innerHTML = renderWorkspace();
  }
}

function renderPublicNav() {
  const nav = ["Home", "Lounge", "Game Room", "Library", "Tool Chamber", "Classroom", "FAQ"]
    .map((label) => `<button class="public-nav-button" type="button">${label}</button>`)
    .join("");
  return `
    <header class="public-topbar">
      <div class="public-brand"><span class="brand-mark">Ziva Wealth<span class="mini-diamond"></span></span></div>
      <nav class="public-nav" aria-label="Preview navigation">${nav}</nav>
      <button class="public-diamond" type="button" aria-label="Preview diamonds"><span class="diamond-shape"></span></button>
      <button class="public-login" type="button" data-action="auth-mode" data-mode="login">LOG IN</button>
    </header>
  `;
}

function renderWelcome() {
  return `
    <main class="screen demo-welcome">
      <div class="welcome-card">
        <h1>Hi, I'm Ziva.</h1>
        <p>I'm the goddess of wealth and prosperity. Welcome to my home.</p>
        <div class="welcome-actions">
          <button class="primary-round is-dark" type="button" data-action="auth-mode" data-mode="create">I'm new</button>
          <button class="primary-round is-outline" type="button" data-action="auth-mode" data-mode="login">Login</button>
        </div>
      </div>
    </main>
  `;
}

function renderAuth() {
  const create = state.authMode === "create";
  return `
    <main class="public-shell">
      ${renderPublicNav()}
      <section class="auth-stage">
        <div class="auth-hero">
          <h1>${create ? "Hello, there!" : "Welcome back!"}</h1>
          <p>${create ? "Let's create an account." : "Let's jump back in."}</p>
        </div>
        <form class="auth-panel" data-form="auth">
          <h2>${create ? "Create account" : "Log in"}</h2>
          <label>Username<input name="username" value="${escapeAttr(state.username)}" /></label>
          ${create ? '<label>Email<input name="email" placeholder="andrea@example.com" /></label>' : ""}
          <label>Password<input name="password" type="password" value="password" /></label>
          ${create ? '<label>Confirm Password<input name="confirm" type="password" /></label>' : ""}
          <button class="ghost-button is-solid" type="submit">${create ? "Create" : "Login"}</button>
          <p class="auth-switch">
            ${create ? "Already have an account?" : "Need an account?"}
            <button type="button" data-action="auth-mode" data-mode="${create ? "login" : "create"}">${create ? "LOG IN" : "I'M NEW"}</button>
          </p>
        </form>
      </section>
    </main>
  `;
}

function renderIntroVideo() {
  return `
    <main class="screen intro-video-screen">
      <section class="video-placeholder">
        <div class="video-frame">
          <button class="play-button" type="button" aria-label="Demo video placeholder">${icon("arrow")}</button>
          <p>Intro video placeholder</p>
          <span>Drop the demo video here when it is ready.</span>
        </div>
        <div class="video-copy">
          <h1>Meet Ziva's home.</h1>
          <p>This step is reserved for the intro video called out in the demo update PDF.</p>
          <div class="welcome-actions">
            <button class="primary-round is-dark" type="button" data-action="next-view" data-view="topics">Continue</button>
            <button class="primary-round is-outline" type="button" data-action="next-view" data-view="rooms">Skip for demo</button>
          </div>
        </div>
      </section>
      ${renderDailyModal()}
    </main>
  `;
}

function renderDailyModal() {
  if (!state.showDailyModal) return "";
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="daily-modal" role="dialog" aria-modal="true" aria-label="Daily check-in">
        <button class="icon-button modal-close" type="button" data-action="close-daily" aria-label="Close daily check-in">${icon("close")}</button>
        <span class="diamond-shape"></span>
        <h2>Daily check-in placeholder</h2>
        <p>This pop-up is reserved for the daily-login prompt from the demo update. It can later ask where the user is logging in from or trigger the daily reward flow.</p>
        <button class="ghost-button is-green" type="button" data-action="claim-daily">Claim 25 diamonds</button>
      </section>
    </div>
  `;
}

function renderTopics() {
  const chips = topics
    .map((topic) => {
      const selected = state.selectedTopics.includes(topic) ? " is-selected" : "";
      return `<button class="choice-pill${selected}" type="button" data-action="toggle-topic" data-topic="${topic}">${topic}</button>`;
    })
    .join("");

  return `
    <main class="screen topic-only-screen">
      <section class="question-copy centered-flow">
        <div>
          <h1>What can I prepare you for?</h1>
          <p>Select all that apply.</p>
        </div>
        <div class="topic-grid" aria-label="Financial life stage topics">${chips}</div>
        <div class="topic-actions">
          <button class="arrow-round" type="button" aria-label="Continue to rooms" data-action="next-view" data-view="rooms">
            ${icon("arrow")}
          </button>
          <span class="topic-hint">${state.selectedTopics.length || 0} selected</span>
        </div>
      </section>
    </main>
  `;
}

function renderRooms() {
  const cards = rooms
    .map(
      (room) => `
        <button class="room-card" type="button" data-action="enter-room" data-room="${room.id}">
          <span>${room.description}</span>
          <div class="room-icon">${icon(room.icon)}</div>
          <strong>${room.label}</strong>
        </button>`
    )
    .join("");

  return `
    <main class="room-screen">
      <section>
        <h1>How would you like to learn from my home?</h1>
        <div class="room-grid">${cards}</div>
      </section>
    </main>
  `;
}

function renderWorkspace() {
  const nav = navItems
    .filter((item) => item.id !== "treasure")
    .map((item) => {
      const active = state.activeRoom === item.id ? " is-active" : "";
      return `<button class="nav-button${active}" type="button" data-action="nav-room" data-room="${item.id}">${item.label}</button>`;
    })
    .join("");

  const activeTopics = (state.selectedTopics.length ? state.selectedTopics : ["Investment"])
    .slice(0, 5)
    .map((topic) => `<span class="small-chip${topic === "Investment" ? " is-active" : ""}">${topic}</span>`)
    .join("");

  return `
    <div class="workspace">
      <header class="topbar">
        <div class="topbar-cell">
          <button class="brand-reset" type="button" data-action="nav-room" data-room="home" aria-label="Go home">
            <span class="brand-mark">Ziva Wealth<span class="mini-diamond"></span></span>
          </button>
        </div>
        <nav class="topbar-cell topnav" aria-label="Main navigation">${nav}</nav>
        <button class="topbar-cell counter counter-button${state.activeRoom === "treasure" ? " is-highlighted" : ""}" type="button" data-action="nav-room" data-room="treasure" aria-label="Open Treasure Box">
          <span>${state.diamonds.toLocaleString()}</span><span class="diamond-shape" aria-hidden="true"></span>
        </button>
        <div class="topbar-cell counter">$${state.portfolio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </header>

      <aside class="sidebar">
        <section class="profile-block">
          <div class="profile-row">
            <div class="avatar demo-avatar" aria-hidden="true"></div>
            <div>
              <strong>${state.username}</strong>
              <p>Edit Profile</p>
              <button class="logout-link" type="button" data-action="restart">Log out</button>
            </div>
          </div>
          <div class="stat-row">
            <div class="stat"><span class="stat-dot"></span><div><strong>${state.daysTraining}</strong><p>Days in Training</p></div></div>
            <div class="stat"><span class="stat-dot"></span><div><strong>${state.diamonds.toLocaleString()}</strong><p>Total Diamonds</p></div></div>
          </div>
        </section>

        <section class="life-block">
          <h2>Current Life Stage</h2>
          <div class="tag-list">${activeTopics}</div>
        </section>

        <section class="flow-block">
          <h2>Guidance Flow</h2>
          ${flowStep(1, "Account", "Logged in", true)}
          ${flowStep(2, "Room", `${roomLabel(state.activeRoom)} active`, state.activeRoom !== "home")}
          ${flowStep(3, "Investment Module", state.quizComplete ? "Completed" : "Ready", state.quizComplete)}
          ${flowStep(4, "Tool Chamber", `${state.tool.goal} forecast`, state.activeRoom === "tool")}
          ${flowStep(5, "Reward", `${state.diamonds.toLocaleString()} diamonds`, state.activeRoom === "treasure")}
        </section>

        <footer class="sidebar-footer">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Email</a>
          <p>&copy; 2024 Ziva Wealth. All rights reserved.</p>
        </footer>
      </aside>

      <main class="content">${renderActiveRoom()}</main>
      ${renderZivaAssistant()}
    </div>
  `;
}

function flowStep(number, title, detail, done) {
  return `
    <div class="flow-step${done ? " is-done" : ""}">
      <b>${done ? icon("check") : number}</b>
      <span>${title}<small>${detail}</small></span>
    </div>
  `;
}

function renderActiveRoom() {
  switch (state.activeRoom) {
    case "lounge":
      return renderConstruction("Lounge", "Lounge discussion rooms are clickable, but real social content is not part of this demo build yet.", "glass");
    case "game":
      return renderGameRoom();
    case "library":
      return renderConstruction("Library", "Library cards are represented as a placeholder until article, podcast, and video assets are ready.", "book");
    case "tool":
      return renderToolChamber();
    case "classroom":
      return renderConstruction("Classroom", "Consultant booking is represented as a placeholder until scheduling and consultant assets are ready.", "person");
    case "faq":
      return renderFaq();
    case "treasure":
      return renderTreasure();
    default:
      return renderHome();
  }
}

function pageHead(title, subtitle, glyph, actions = "") {
  return `
    <section class="page-head">
      <div>
        <div class="page-title">
          <h1>${title}</h1>
          ${glyph ? icon(glyph) : ""}
        </div>
        <p>${subtitle}</p>
      </div>
      <div class="page-actions">${actions}</div>
    </section>
  `;
}

function renderHome() {
  return `
    ${pageHead(
      "Demo Guidance Flow",
      "This build follows the demo update PDF: intro video placeholder, room selection, Investment module, and Tool Chamber forecast.",
      "spark",
      `<button class="ghost-button" type="button" data-action="restart">Log out</button>`
    )}
    <section class="grid-3">
      <article class="black-card route-card">
        ${icon("game")}
        <div>
          <h2>Game Room</h2>
          <p>Choose Investment to enter Module 1. Other life stages intentionally show Coming Soon.</p>
        </div>
        <button class="tiny-button is-green" type="button" data-action="nav-room" data-room="game">Open Game Room</button>
      </article>
      <article class="cream-card route-card">
        ${icon("wand")}
        <div>
          <h2>Tool Chamber</h2>
          <p>Answer investment profile questions and review a best, average, and worst profit forecast.</p>
        </div>
        <button class="tiny-button" type="button" data-action="nav-room" data-room="tool">Open Tool Chamber</button>
      </article>
      <article class="black-card route-card">
        ${icon("spark")}
        <div>
          <h2>Placeholder Rooms</h2>
          <p>Lounge, Library, and Classroom open under-construction states for the demo.</p>
        </div>
        <button class="tiny-button is-green" type="button" data-action="next-view" data-view="rooms">View rooms</button>
      </article>
    </section>
  `;
}

function renderConstruction(title, copy, glyph) {
  return `
    ${pageHead(title, rooms.find((room) => room.label === title)?.description || copy, glyph)}
    <section class="construction-panel">
      <div class="construction-icon">${icon(glyph)}</div>
      <h2>Under construction</h2>
      <p>${copy}</p>
      <div class="placeholder-strip">
        <span></span><span></span><span></span>
      </div>
      <button class="ghost-button is-green" type="button" data-action="nav-room" data-room="game">Go to Game Room</button>
    </section>
  `;
}

function renderGameRoom() {
  if (state.gameStage === "quiz") return renderQuiz();
  if (state.gameStage === "modules") return renderModules();

  const cards = gameCategories
    .map(
      (category) => `
      <button class="game-category-card" type="button" data-action="select-game-category" data-category="${category.id}">
        <span class="category-orb">${icon(category.icon)}</span>
        <strong>${category.label}</strong>
        <small>${category.live ? "Module available" : "Coming Soon"}</small>
      </button>`
    )
    .join("");

  return `
    ${pageHead("Game Room", "Test your knowledge by selecting a life stage.", "game")}
    ${state.comingSoon ? `<div class="coming-soon-banner">${state.comingSoon} is coming soon for the demo.</div>` : ""}
    <section class="game-category-grid">${cards}</section>
  `;
}

function renderModules() {
  const status = state.quizComplete ? "Completed" : state.quizIndex > 0 ? "Ongoing" : "Not started";
  const progress = state.quizComplete ? "6/6" : `${state.quizIndex}/6`;
  return `
    ${pageHead(
      "Investment Modules",
      "Dive into fun, bite-sized quizzes tailored just for you.",
      "wand",
      `<button class="ghost-button" type="button" data-action="game-stage" data-stage="categories">Back</button>`
    )}
    <section class="module-summary-card">
      <div class="module-summary-head">
        <h2>Module 1 <span>${state.quizComplete ? "Done" : "Ready"}</span></h2>
        <button class="tiny-button" type="button" data-action="game-stage" data-stage="quiz">${state.quizComplete ? "Review" : "Start"}</button>
      </div>
      <p>${state.quizComplete ? "Completed. Review your answers or continue to Tool Chamber." : "No description available."}</p>
      <div class="module-progress-bar"><span style="width: ${(state.quizComplete ? 100 : Math.max(8, (state.quizIndex / 6) * 100)).toFixed(0)}%;"></span></div>
      <div class="module-summary-meta">
        <span><small>Date Started</small> --</span>
        <span><small>Progress</small> ${progress}</span>
        <span><small>Status</small> ${status}</span>
      </div>
      <div class="toolbar-row toolbar-spaced">
        <button class="ghost-button is-green" type="button" data-action="game-stage" data-stage="quiz">${state.quizComplete ? "Review" : "Begin Module"}</button>
        <button class="ghost-button" type="button" data-action="nav-room" data-room="tool">Go to Tool Chamber</button>
      </div>
    </section>
  `;
}

function renderQuiz() {
  const q = quizQuestions[state.quizIndex];
  const answers = q.answers
    .map((answer, index) => {
      const picked = state.quizChoice === index ? " is-picked" : "";
      const correct = state.quizChecked && q.correct === index ? " is-correct" : "";
      const wrong = state.quizChecked && state.quizChoice === index && q.correct !== index ? " is-wrong" : "";
      return `<button class="answer-button${picked}${correct}${wrong}" type="button" data-action="pick-answer" data-answer="${index}">
        <strong>${String.fromCharCode(65 + index)}:</strong> ${answer}
      </button>`;
    })
    .join("");

  return `
    ${pageHead(
      "Module 1",
      "",
      "wand",
      `<button class="ghost-button" type="button" data-action="reset-quiz">Restart</button><button class="ghost-button" type="button" data-action="game-stage" data-stage="modules">View Modules</button>`
    )}
    <section class="module-panel demo-quiz-panel">
      <div class="question-card">
        <div>
          <b>Q.${state.quizIndex + 1}</b>
          <h2>${q.question}</h2>
        </div>
      </div>
      <div>
        <div class="answer-list">${answers}</div>
        ${state.quizChecked ? `<p class="answer-feedback">${state.quizChoice === q.correct ? "Correct. Nice work." : "Not quite. The highlighted answer is the demo key."}</p>` : ""}
        <div class="module-actions">
          <button class="tiny-button" type="button" data-action="prev-question">Back</button>
          <span class="module-index">${state.quizIndex + 1}/${quizQuestions.length}</span>
          <button class="tiny-button is-green" type="button" data-action="${state.quizChecked ? "next-question" : "check-answer"}">
            ${state.quizChecked ? (state.quizIndex === quizQuestions.length - 1 ? "Continue to Tool Chamber" : "Next") : "Check Answer"}
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderToolChamber() {
  const result = calculateTool();
  return `
    ${pageHead(
      `Hello ${state.displayName}`,
      "Let's go through a few questions for your investment profile.",
      "",
      `<button class="ghost-button" type="button">View Tools</button>`
    )}
    <section class="tool-chamber-demo">
      <div class="tool-question-stack">
        <div class="tool-question wide">
          <label><span class="step-dot">1</span> What goal would you like to achieve?</label>
          <select class="select-input" data-field="goal">
            ${["Retirement", "Home Purchase", "Education", "Emergency Fund", "Wealth Growth"]
              .map((goal) => `<option value="${goal}"${state.tool.goal === goal ? " selected" : ""}>${goal}</option>`)
              .join("")}
          </select>
        </div>
        <div class="tool-question wide">
          <label><span class="step-dot">2</span> How much would you like to invest?</label>
          <input class="dark-input" type="number" min="0" step="500" data-field="amount" value="${state.tool.amount}" />
        </div>
        <div class="tool-question wide">
          <label><span class="step-dot">3</span> Investment duration (Years)</label>
          <input class="dark-input" type="number" min="1" max="40" data-field="years" value="${state.tool.years}" />
        </div>
        <div class="tool-question wide">
          <label><span class="step-dot">4</span> Monthly contribution (Additional)</label>
          <input class="dark-input" type="number" min="0" step="50" data-field="monthly" value="${state.tool.monthly}" />
        </div>
        <div class="tool-question wide">
          <label><span class="step-dot">5</span> Adjust your bounds & investment mix.</label>
          <div class="range-wrap">
            <input type="range" min="0" max="100" step="1" data-field="stock" value="${state.tool.stock}" />
            <div class="range-labels"><span>${state.tool.stock}% Stocks</span><strong>${100 - state.tool.stock}% Bonds</strong></div>
          </div>
        </div>
      </div>
      <section class="forecast-panel">
        <p>Investment Profit Forecast</p>
        <div class="forecast-chart">
          ${result.bars
            .map(
              (bar) => `
            <div class="forecast-column">
              <strong>${bar.label}</strong>
              <div class="forecast-bar ${bar.value < 0 ? "is-negative" : ""}" style="height: ${bar.height}%;">
                <span>${formatCurrency(bar.value)}</span>
              </div>
              <small>${state.tool.stock}% STK</small>
            </div>`
            )
            .join("")}
        </div>
        <div class="baseline">Baseline $0</div>
      </section>
      <div class="toolbar-row">
        <button class="ghost-button is-green" type="button" data-action="save-tool">${icon("diamond")} Save forecast</button>
        <button class="ghost-button" type="button" data-action="game-stage" data-stage="modules">Review module</button>
      </div>
      <p class="notice">Educational estimate for prototype testing only. This is not financial advice.</p>
    </section>
  `;
}

function renderFaq() {
  const faqs = [
    ["safety", "Is Ziva Wealth giving financial advice?", "This demo positions Ziva as educational guidance. Individual investment decisions should be reviewed with a qualified professional."],
    ["diamonds", "What are red diamonds?", "Diamonds reward demo actions like daily check-ins, quizzes, saved tools, and course progress."],
    ["placeholder", "Why do some rooms say under construction?", "The update PDF calls out real content for Game Room and Tool Chamber. Other rooms are clickable placeholders for now."],
    ["video", "Where is the demo video?", "The intro video step is represented by a placeholder until the actual video file is available."],
  ];

  return `
    ${pageHead("FAQ", "Any questions? Ziva's got you.", "comment")}
    <section class="faq-list">
      ${faqs
        .map(
          ([id, question, answer]) => `
        <article class="faq-item${state.faqOpen === id ? " is-open" : ""}">
          <button class="faq-question" type="button" data-action="toggle-faq" data-faq="${id}">
            ${question}
            ${icon(state.faqOpen === id ? "close" : "arrow")}
          </button>
          <div class="faq-answer">${answer}</div>
        </article>`
        )
        .join("")}
    </section>
  `;
}

function renderTreasure() {
  const rewards = [
    ["Akai Wellness Center", "Massage, acupuncture", 320],
    ["Hourglass Mascara", "Makeup", 630],
    ["Athena's Beauty", "Hair, brows, facial", 430],
    ["Pure Barre", "Fitness class", 750],
  ];

  return `
    <section class="treasure-layout">
      <div>
        ${pageHead("Treasure Box", "Exchange the red diamonds you earn by completing courses and quizzes for wellness, beauty, and consultation rewards.", "diamond")}
        <h2>For you</h2>
        <section class="reward-grid">
          ${rewards
            .map(
              ([name, detail, cost]) => `
            <article class="reward-card">
              ${icon("diamond", "fill-icon")}
              <div>
                <h2>${name}</h2>
                <p>${detail}</p>
                <p>${cost} diamonds</p>
              </div>
              <button class="tiny-button is-green" type="button" data-action="redeem" data-cost="${cost}">Redeem</button>
            </article>`
            )
            .join("")}
        </section>
      </div>
      <aside class="search-panel">
        <h2>Search</h2>
        <label class="search-box">${icon("search")}<input placeholder="Pilates, wellness, beauty..." /></label>
        <h3>Nearby</h3>
        <div class="mini-map" aria-label="Nearby rewards map"></div>
        <h3>Saved Items</h3>
        <div class="saved-row">
          ${["BODYROK", "Hourglass", "Dyson", "Pat McGrath"].map((name) => `<span class="saved-item"><b class="saved-avatar"></b>${name}</span>`).join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderZivaAssistant() {
  const panel = state.zivaOpen
    ? `
      <aside class="ziva-panel" aria-label="Ziva assistant">
        <h2>Ziva</h2>
        <p>${assistantCopy()}</p>
        <div class="ziva-panel-actions">
          <button class="tiny-button is-green" type="button" data-action="nav-room" data-room="game">Open Game Room</button>
          <button class="tiny-button" type="button" data-action="nav-room" data-room="tool">Open Tool Chamber</button>
          <button class="tiny-button" type="button" data-action="toggle-ziva">Close</button>
        </div>
      </aside>`
    : "";

  return `
    ${panel}
    <button class="ziva-launcher" type="button" data-action="toggle-ziva" aria-label="Open Ziva assistant">
      ${icon("comment")} Ziva
    </button>
  `;
}

function assistantCopy() {
  if (state.activeRoom === "tool") {
    return `Your ${state.tool.years}-year ${state.tool.goal.toLowerCase()} forecast uses ${state.tool.stock}% stocks and ${100 - state.tool.stock}% bonds.`;
  }
  if (state.activeRoom === "game") {
    return `Only Investment is active in this demo. The other Game Room cards intentionally show Coming Soon.`;
  }
  return `The demo update points users through Game Room and Tool Chamber. Rooms without final content open placeholders.`;
}

function calculateTool() {
  const principal = Number(state.tool.amount) || 0;
  const years = Number(state.tool.years) || 1;
  const monthly = Number(state.tool.monthly) || 0;
  const stock = Number(state.tool.stock) / 100;
  const base = principal + monthly * 12 * years;
  const expectedRate = 0.015 + stock * 0.075;
  const best = Math.round(base * (Math.pow(1 + expectedRate * 1.25, years / 5) - 1));
  const avg = Math.round(base * (Math.pow(1 + expectedRate * 0.72, years / 5) - 1));
  const worst = Math.round(base * (Math.pow(1 - (0.03 + stock * 0.08), years / 5) - 1));
  const max = Math.max(Math.abs(best), Math.abs(avg), Math.abs(worst), 1);
  return {
    bars: [
      { label: "Best Profit", value: best, height: Math.max(24, Math.round((Math.abs(best) / max) * 86)) },
      { label: "Avg Profit", value: avg, height: Math.max(18, Math.round((Math.abs(avg) / max) * 70)) },
      { label: "Worst Profit", value: worst, height: Math.max(14, Math.round((Math.abs(worst) / max) * 44)) },
    ],
  };
}

function roomLabel(id) {
  const item = navItems.find((nav) => nav.id === id);
  return item ? item.label : "Home";
}

function formatCurrency(value) {
  const abs = Math.abs(value).toLocaleString();
  return value < 0 ? `$-${abs}` : `$${abs}`;
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function routeToWorkspace(room) {
  state.view = "workspace";
  state.activeRoom = room;
  if (room === "game" && !state.gameStage) state.gameStage = "categories";
  state.zivaOpen = false;
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  let scrollToTop = false;

  if (action === "auth-mode") {
    state.authMode = target.dataset.mode;
    state.view = "auth";
    scrollToTop = true;
  }

  if (action === "next-view") {
    state.view = target.dataset.view;
    scrollToTop = true;
  }

  if (action === "close-daily") {
    state.showDailyModal = false;
  }

  if (action === "claim-daily") {
    state.diamonds += 25;
    state.showDailyModal = false;
  }

  if (action === "toggle-topic") {
    const topic = target.dataset.topic;
    state.selectedTopics = state.selectedTopics.includes(topic)
      ? state.selectedTopics.filter((item) => item !== topic)
      : [...state.selectedTopics, topic];
  }

  if (action === "enter-room") {
    routeToWorkspace(target.dataset.room);
    scrollToTop = true;
  }

  if (action === "nav-room") {
    routeToWorkspace(target.dataset.room);
    scrollToTop = true;
  }

  if (action === "restart") {
    state.view = "welcome";
    state.activeRoom = "home";
    state.gameStage = "categories";
    state.quizIndex = 0;
    state.quizChoice = null;
    state.quizChecked = false;
    state.showDailyModal = false;
    state.zivaOpen = false;
    scrollToTop = true;
  }

  if (action === "toggle-ziva") {
    state.zivaOpen = !state.zivaOpen;
  }

  if (action === "select-game-category") {
    const category = gameCategories.find((item) => item.id === target.dataset.category);
    if (category?.live) {
      state.gameStage = "modules";
      state.comingSoon = "";
    } else {
      state.comingSoon = category?.label || "This module";
    }
    scrollToTop = true;
  }

  if (action === "game-stage") {
    state.activeRoom = "game";
    state.gameStage = target.dataset.stage;
    state.comingSoon = "";
    scrollToTop = true;
  }

  if (action === "pick-answer" && !state.quizChecked) {
    state.quizChoice = Number(target.dataset.answer);
  }

  if (action === "check-answer" && state.quizChoice !== null) {
    state.quizChecked = true;
  }

  if (action === "next-question") {
    if (state.quizIndex >= quizQuestions.length - 1) {
      state.quizComplete = true;
      state.completedQuizzes = Math.max(state.completedQuizzes, 1);
      state.diamonds = Math.max(state.diamonds, 7800);
      state.quizIndex = quizQuestions.length - 1;
      routeToWorkspace("tool");
      scrollToTop = true;
    } else {
      state.quizIndex += 1;
      state.quizChoice = null;
      state.quizChecked = false;
    }
  }

  if (action === "prev-question") {
    state.quizIndex = Math.max(0, state.quizIndex - 1);
    state.quizChoice = null;
    state.quizChecked = false;
  }

  if (action === "reset-quiz") {
    state.quizIndex = 0;
    state.quizChoice = null;
    state.quizChecked = false;
    state.quizComplete = false;
  }

  if (action === "save-tool") {
    state.diamonds += 75;
    state.activeRoom = "treasure";
    scrollToTop = true;
  }

  if (action === "toggle-faq") {
    state.faqOpen = state.faqOpen === target.dataset.faq ? "" : target.dataset.faq;
  }

  if (action === "redeem") {
    const cost = Number(target.dataset.cost);
    if (state.diamonds >= cost) state.diamonds -= cost;
  }

  render();
  if (scrollToTop) window.scrollTo({ top: 0, left: 0 });
});

app.addEventListener("change", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  if (field === "goal") {
    state.tool.goal = event.target.value || "Retirement";
  } else {
    state.tool[field] = Number(event.target.value);
  }
  render();
});

app.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (!field) return;
  if (field === "goal") {
    state.tool.goal = event.target.value || "Retirement";
  } else {
    state.tool[field] = Number(event.target.value);
  }
  render();
});

app.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  if (form.dataset.form === "auth") {
    const username = form.elements.username?.value.trim();
    if (username) state.username = username;
    state.view = "intro";
    state.showDailyModal = true;
    render();
    window.scrollTo({ top: 0, left: 0 });
  }
});

render();
