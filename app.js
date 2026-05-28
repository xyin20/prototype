const state = {
  stages: ["Financial Plan", "First Job", "Budget"],
  room: "Tool Chamber",
  quizIndex: 0,
  answered: 0,
  diamonds: 7600
};

const lifeStages = [
  "Budget",
  "First Job",
  "Financial Plan",
  "Investment",
  "Marriage",
  "Children",
  "Home Purchase",
  "Divorce",
  "Estate Plan",
  "Elderly Care",
  "Retirement"
];

const rooms = [
  { name: "Lounge", icon: "L" },
  { name: "Game Room", icon: "G" },
  { name: "Library", icon: "B" },
  { name: "Tool Chamber", icon: "T" },
  { name: "Classroom", icon: "C" }
];

const quiz = [
  {
    question: "What is a custodian bank?",
    answers: [
      "A secret hideout where custodians plot to keep school hallways spotless.",
      "A futuristic invention for storing custard pies without them getting squished.",
      "A bank that holds onto your spare change until you forget about it.",
      "A financial institution that safeguards customer securities and manages financial services."
    ],
    correct: 3
  },
  {
    question: "What does diversification help with?",
    answers: [
      "Spreading risk across different kinds of investments.",
      "Guaranteeing every investment will go up.",
      "Keeping all money in one stock.",
      "Avoiding every possible market change."
    ],
    correct: 0
  },
  {
    question: "Why does time horizon matter?",
    answers: [
      "It can affect how much risk a plan can reasonably take.",
      "It only changes the color of the chart.",
      "It removes the need to contribute monthly.",
      "It makes short-term losses impossible."
    ],
    correct: 0
  }
];

const gallery = [
  ["1000011048.jpg", "Account creation"],
  ["1000011046.jpg", "Life-stage selection"],
  ["1000011047.jpg", "Room selection"],
  ["1000011050.jpg", "Module list"],
  ["1000011051.jpg", "Quiz screen"],
  ["1000011052.jpg", "Investment profile top"],
  ["1000011053.jpg", "Profile inputs"],
  ["1000011054.jpg", "Forecast graph"]
];

const formatMoney = value => {
  const prefix = value < 0 ? "-$" : "$";
  return `${prefix}${Math.abs(Math.round(value)).toLocaleString()}`;
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });
  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.nav === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStages() {
  const wrap = document.getElementById("lifeStageChoices");
  wrap.innerHTML = "";
  lifeStages.forEach(stage => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent = stage;
    button.setAttribute("aria-pressed", state.stages.includes(stage));
    button.addEventListener("click", () => {
      if (state.stages.includes(stage)) {
        state.stages = state.stages.filter(item => item !== stage);
      } else {
        state.stages.push(stage);
      }
      renderStages();
      renderStageSummary();
    });
    wrap.appendChild(button);
  });
}

function renderStageSummary() {
  const summary = document.getElementById("stageSummary");
  summary.innerHTML = "";
  const selected = state.stages.length ? state.stages : ["No stages selected"];
  selected.forEach(stage => {
    const span = document.createElement("span");
    span.className = `chip ${state.stages.length ? "active" : ""}`;
    span.textContent = stage;
    summary.appendChild(span);
  });
}

function renderRooms() {
  const grid = document.getElementById("roomChoices");
  grid.innerHTML = "";
  rooms.forEach(room => {
    const button = document.createElement("button");
    button.className = "room-card";
    button.type = "button";
    button.innerHTML = `<span class="room-icon">${room.icon}</span><strong>${room.name}</strong>`;
    button.addEventListener("click", () => {
      state.room = room.name;
      document.getElementById("moduleRoom").textContent = room.name === "Tool Chamber" ? "Investment" : room.name;
      document.getElementById("guidanceLabel").textContent = `${room.name} selected`;
      showScreen("modules");
    });
    grid.appendChild(button);
  });
}

function renderModule() {
  const percent = Math.round((state.answered / quiz.length) * 100);
  document.getElementById("quizProgress").textContent = `${state.answered}/${quiz.length}`;
  document.getElementById("moduleProgress").style.width = `${percent}%`;
  document.getElementById("moduleStatus").textContent = percent === 100 ? "Done" : "Ready";
}

function renderQuiz() {
  const current = quiz[state.quizIndex];
  document.getElementById("questionNumber").textContent = `Q.${state.quizIndex + 1}`;
  document.getElementById("questionText").textContent = current.question;
  const pane = document.getElementById("answerPane");
  pane.innerHTML = "";
  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}: ${answer}`;
    button.addEventListener("click", () => {
      button.classList.add("selected");
      state.answered = Math.max(state.answered, state.quizIndex + 1);
      state.diamonds += index === current.correct ? 100 : 25;
      updateWallet();
      renderModule();
      setTimeout(() => {
        if (state.quizIndex < quiz.length - 1) {
          state.quizIndex += 1;
          renderQuiz();
        } else {
          showScreen("tool");
        }
      }, 450);
    });
    pane.appendChild(button);
  });
}

function calculateForecast() {
  const initial = Number(document.getElementById("initial").value || 0);
  const years = Number(document.getElementById("years").value || 1);
  const monthly = Number(document.getElementById("monthly").value || 0);
  const stock = Number(document.getElementById("stockMix").value || 0);
  const bond = 100 - stock;
  const principal = initial + monthly * 12 * years;
  const expectedRate = (stock / 100) * 0.08 + (bond / 100) * 0.035;
  const bestRate = expectedRate + 0.045;
  const worstRate = expectedRate - 0.075;
  const best = principal * Math.pow(1 + bestRate, years) - principal;
  const average = principal * Math.pow(1 + expectedRate, years) - principal;
  const worst = principal * Math.pow(1 + worstRate, years) - principal;
  return { best, average, worst, years, monthly, stock, bond };
}

function renderForecast() {
  const forecast = calculateForecast();
  document.getElementById("yearsValue").textContent = forecast.years;
  document.getElementById("stockValue").textContent = forecast.stock;
  document.getElementById("bondValue").textContent = forecast.bond;
  document.getElementById("timeInsight").textContent = `${forecast.years} year horizon`;
  document.getElementById("contributionInsight").textContent = `${formatMoney(forecast.monthly)} monthly`;
  const risk = forecast.stock >= 75 ? "Growth-heavy profile" : forecast.stock <= 35 ? "Conservative profile" : "Moderate risk profile";
  document.getElementById("riskInsight").textContent = risk;
  document.getElementById("recommendation").textContent = risk;

  const values = [
    ["Best Profit", forecast.best],
    ["Avg Profit", forecast.average],
    ["Worst Profit", forecast.worst]
  ];
  const max = Math.max(...values.map(([, value]) => Math.abs(value)), 1);
  const chart = document.getElementById("barChart");
  chart.innerHTML = "";
  values.forEach(([label, value]) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";
    const bar = document.createElement("div");
    const height = Math.max(28, Math.round((Math.abs(value) / max) * 300));
    bar.className = `bar ${value < 0 ? "loss" : ""}`;
    bar.style.height = `${height}px`;
    bar.textContent = formatMoney(value);
    const caption = document.createElement("div");
    caption.className = "bar-label";
    caption.textContent = label;
    wrap.append(bar, caption);
    chart.appendChild(wrap);
  });
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";
  gallery.forEach(([src, label]) => {
    const figure = document.createElement("figure");
    figure.className = "shot";
    figure.innerHTML = `<img src="${src}" alt="${label} reference screen"><figcaption>${label}</figcaption>`;
    grid.appendChild(figure);
  });
}

function updateWallet() {
  const value = state.diamonds.toLocaleString();
  document.getElementById("diamondCount").textContent = value;
  document.getElementById("walletDiamonds").textContent = value;
}

function resetFlow() {
  state.stages = ["Financial Plan", "First Job", "Budget"];
  state.room = "Tool Chamber";
  state.quizIndex = 0;
  state.answered = 0;
  state.diamonds = 7600;
  document.getElementById("goal").value = "Retirement";
  document.getElementById("initial").value = 5000;
  document.getElementById("years").value = 5;
  document.getElementById("monthly").value = 500;
  document.getElementById("stockMix").value = 60;
  renderStages();
  renderStageSummary();
  renderModule();
  renderQuiz();
  renderForecast();
  updateWallet();
  showScreen("prepare");
}

document.querySelectorAll(".next-step").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.target));
});

document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.nav));
});

document.getElementById("startQuiz").addEventListener("click", () => {
  state.quizIndex = 0;
  renderQuiz();
  showScreen("quiz");
});

document.getElementById("toolForm").addEventListener("input", renderForecast);
document.getElementById("completeTool").addEventListener("click", () => {
  const selected = state.stages.join(", ") || "no selected stages";
  const goal = document.getElementById("goal").value;
  document.getElementById("summaryText").textContent = `Andrea selected ${selected}, chose ${state.room}, and built a ${goal.toLowerCase()} path with ${document.getElementById("stockValue").textContent}% stocks.`;
  showScreen("summary");
});
document.getElementById("resetFlow").addEventListener("click", resetFlow);

renderStages();
renderStageSummary();
renderRooms();
renderModule();
renderQuiz();
renderForecast();
renderGallery();
updateWallet();
