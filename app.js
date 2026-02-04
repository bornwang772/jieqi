const SVG_NS = "http://www.w3.org/2000/svg";

const a = 300;
const b = 180;
const focus = Math.sqrt(a * a - b * b);

const termData = [
  {
    name: "春分",
    angle: 0,
    season: "春季",
    range: "3月20-21日左右",
    desc: "昼夜平分，太阳直射赤道，春意正盛。",
  },
  {
    name: "清明",
    angle: 15,
    season: "春季",
    range: "4月4-6日左右",
    desc: "气清景明，草木萌发，是踏青与祭扫的时节。",
  },
  {
    name: "谷雨",
    angle: 30,
    season: "春季",
    range: "4月19-21日左右",
    desc: "降雨增多，利于谷物生长与春播。",
  },
  {
    name: "立夏",
    angle: 45,
    season: "夏季",
    range: "5月5-7日左右",
    desc: "夏季开始，万物进入旺盛生长期。",
  },
  {
    name: "小满",
    angle: 60,
    season: "夏季",
    range: "5月20-22日左右",
    desc: "籽粒渐满未熟，雨水增多。",
  },
  {
    name: "芒种",
    angle: 75,
    season: "夏季",
    range: "6月5-7日左右",
    desc: "适宜播种有芒作物，农事繁忙。",
  },
  {
    name: "夏至",
    angle: 90,
    season: "夏季",
    range: "6月21-22日左右",
    desc: "北半球白昼最长，阳气极盛。",
  },
  {
    name: "小暑",
    angle: 105,
    season: "夏季",
    range: "7月6-8日左右",
    desc: "暑热渐盛，高温开始出现。",
  },
  {
    name: "大暑",
    angle: 120,
    season: "夏季",
    range: "7月22-24日左右",
    desc: "一年中最热时段，雷雨频繁。",
  },
  {
    name: "立秋",
    angle: 135,
    season: "秋季",
    range: "8月7-9日左右",
    desc: "秋季开始，暑气逐渐消退。",
  },
  {
    name: "处暑",
    angle: 150,
    season: "秋季",
    range: "8月22-24日左右",
    desc: "炎热减弱，暑气终止。",
  },
  {
    name: "白露",
    angle: 165,
    season: "秋季",
    range: "9月7-9日左右",
    desc: "夜间水汽凝结，露水渐白。",
  },
  {
    name: "秋分",
    angle: 180,
    season: "秋季",
    range: "9月22-24日左右",
    desc: "昼夜平分，秋色渐浓。",
  },
  {
    name: "寒露",
    angle: 195,
    season: "秋季",
    range: "10月7-9日左右",
    desc: "气温下降，露水更寒。",
  },
  {
    name: "霜降",
    angle: 210,
    season: "秋季",
    range: "10月22-24日左右",
    desc: "地表出现初霜，寒意加深。",
  },
  {
    name: "立冬",
    angle: 225,
    season: "冬季",
    range: "11月7-8日左右",
    desc: "冬季开始，万物收藏。",
  },
  {
    name: "小雪",
    angle: 240,
    season: "冬季",
    range: "11月22-23日左右",
    desc: "气温更低，降雪开始出现。",
  },
  {
    name: "大雪",
    angle: 255,
    season: "冬季",
    range: "12月6-8日左右",
    desc: "降雪范围扩大，寒意明显。",
  },
  {
    name: "冬至",
    angle: 270,
    season: "冬季",
    range: "12月21-23日左右",
    desc: "北半球白昼最短，阴极阳生。",
  },
  {
    name: "小寒",
    angle: 285,
    season: "冬季",
    range: "1月5-7日左右",
    desc: "寒冷加剧，进入严冬。",
  },
  {
    name: "大寒",
    angle: 300,
    season: "冬季",
    range: "1月20-21日左右",
    desc: "一年中最寒冷的时段。",
  },
  {
    name: "立春",
    angle: 315,
    season: "春季",
    range: "2月3-5日左右",
    desc: "春季开始，万物复苏。",
  },
  {
    name: "雨水",
    angle: 330,
    season: "春季",
    range: "2月18-20日左右",
    desc: "降水增多，冰雪消融。",
  },
  {
    name: "惊蛰",
    angle: 345,
    season: "春季",
    range: "3月5-7日左右",
    desc: "春雷初动，万物苏醒。",
  },
];

const svg = document.getElementById("orbitSvg");
const ticksGroup = document.getElementById("ticks");
const termsGroup = document.getElementById("terms");
const earthGroup = document.getElementById("earth");
const sunGroup = document.querySelector(".sun");
const indicatorGroup = document.getElementById("indicator");
const indicatorLine = document.getElementById("indicatorLine");
const indicatorAngleText = document.getElementById("indicatorAngle");
const termGrid = document.getElementById("termGrid");
const hudAngle = document.getElementById("hudAngle");
const hudTerm = document.getElementById("hudTerm");

const card = {
  root: document.getElementById("termCard"),
  name: document.getElementById("termName"),
  angle: document.getElementById("termAngle"),
  desc: document.getElementById("termDesc"),
  range: document.getElementById("termRange"),
  season: document.getElementById("termSeason"),
};

const closeBtn = document.getElementById("closeCard");

function svgEl(tag, attrs = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

function pointOnEllipse(angleDeg, rx = a, ry = b) {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const r = 1 / Math.sqrt((cos * cos) / (rx * rx) + (sin * sin) / (ry * ry));
  return {
    x: r * cos,
    y: -r * sin,
    dx: cos,
    dy: -sin,
  };
}

function buildTicks() {
  for (let angle = 0; angle < 360; angle += 15) {
    const isMajor = angle % 90 === 0;
    const isMedium = angle % 30 === 0;
    const length = isMajor ? 18 : isMedium ? 12 : 8;
    const { x, y, dx, dy } = pointOnEllipse(angle, a, b);

    const tick = svgEl("line", {
      x1: x,
      y1: y,
      x2: x + dx * length,
      y2: y + dy * length,
      class: isMajor ? "major" : "",
    });

    ticksGroup.appendChild(tick);

    if (isMedium) {
      const labelOffset = length + (isMajor ? 18 : 12);
      const lx = x + dx * labelOffset;
      const ly = y + dy * labelOffset;
      const text = svgEl("text", {
        x: lx,
        y: ly,
        "text-anchor": Math.abs(dx) < 0.3 ? "middle" : dx > 0 ? "start" : "end",
        "dominant-baseline": "middle",
        class: isMajor ? "major-label" : "",
      });
      text.textContent = `${angle}°`;
      ticksGroup.appendChild(text);
    }
  }
}

function buildTerms() {
  termData.forEach((term, index) => {
    const point = pointOnEllipse(term.angle, a, b);
    const labelPoint = pointOnEllipse(term.angle, a + 62, b + 46);

    const group = svgEl("g", {
      class: "term",
      "data-index": index,
      tabindex: "0",
      role: "button",
      "aria-label": `${term.name}，太阳黄经 ${term.angle} 度`,
    });

    group.style.setProperty("--float-delay", `${index * 0.08}s`);
    group.style.setProperty("--pop-delay", `${index * 0.03}s`);

    const title = svgEl("title");
    title.textContent = `${term.name} | ${term.angle}°`;

    // Bigger hit targets for mobile: tap near dot/label also works.
    const hitDot = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: 18,
      class: "term-hit",
    });

    const hitLabel = svgEl("circle", {
      cx: labelPoint.x,
      cy: labelPoint.y,
      r: 22,
      class: "term-hit",
    });

    const line = svgEl("line", {
      x1: point.x,
      y1: point.y,
      x2: labelPoint.x,
      y2: labelPoint.y,
      class: "term-line",
    });

    const aura2 = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: 16,
      class: "term-aura2",
    });

    const aura = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: 11,
      class: "term-aura",
    });

    const circle = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: 5.8,
      class: "term-circle",
    });

    const label = svgEl("text", {
      x: labelPoint.x,
      y: labelPoint.y,
      "text-anchor": Math.abs(point.dx) < 0.3 ? "middle" : point.dx > 0 ? "start" : "end",
      "dominant-baseline": "middle",
      class: "term-label",
    });
    label.textContent = term.name;

    group.appendChild(title);
    group.appendChild(hitDot);
    group.appendChild(hitLabel);
    group.appendChild(line);
    group.appendChild(aura2);
    group.appendChild(aura);
    group.appendChild(circle);
    group.appendChild(label);
    termsGroup.appendChild(group);

    group.addEventListener("click", (event) => {
      event.stopPropagation();
      selectTerm(index, { jumpEarth: true });
    });

    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectTerm(index, { jumpEarth: true });
      }
    });
  });
}

function buildTermGrid() {
  termData.forEach((term, index) => {
    const button = document.createElement("button");
    button.className = "term-chip";
    button.textContent = term.name;
    button.setAttribute("type", "button");
    button.setAttribute("data-index", index);
    button.style.setProperty("--pop-delay", `${0.2 + index * 0.02}s`);
    button.addEventListener("click", () => selectTerm(index, { jumpEarth: true }));
    termGrid.appendChild(button);
  });
}

let activeIndex = null;

function selectTerm(index, options = {}) {
  const { jumpEarth = false } = options;
  if (activeIndex !== null) {
    const prev = termsGroup.querySelector(`.term[data-index="${activeIndex}"]`);
    if (prev) prev.classList.remove("active");
    const prevChip = termGrid.querySelector(`.term-chip[data-index="${activeIndex}"]`);
    if (prevChip) prevChip.classList.remove("active");
  }

  activeIndex = index;
  const next = termsGroup.querySelector(`.term[data-index="${index}"]`);
  if (next) next.classList.add("active");
  const nextChip = termGrid.querySelector(`.term-chip[data-index="${index}"]`);
  if (nextChip) nextChip.classList.add("active");

  const term = termData[index];
  card.root.classList.remove("is-empty");
  card.name.textContent = term.name;
  card.angle.textContent = `太阳黄经 ${term.angle}°`;
  card.desc.textContent = term.desc;
  card.range.textContent = term.range;
  card.season.textContent = term.season;

  if (hudTerm) hudTerm.textContent = term.name;

  if (jumpEarth) {
    orbitStepper.jumpTo(index);
  }
}

function clearTerm() {
  if (activeIndex !== null) {
    const prev = termsGroup.querySelector(`.term[data-index="${activeIndex}"]`);
    if (prev) prev.classList.remove("active");
    const prevChip = termGrid.querySelector(`.term-chip[data-index="${activeIndex}"]`);
    if (prevChip) prevChip.classList.remove("active");
  }
  activeIndex = null;
  card.root.classList.add("is-empty");
  card.name.textContent = "尚未选择";
  card.angle.textContent = "太阳黄经 --°";
  card.desc.textContent = "点击节气标记，了解其在地球公转中的位置与含义。";
  card.range.textContent = "—";
  card.season.textContent = "—";
}

function formatAngle(angleDeg, decimals = 1) {
  const normalized = ((angleDeg % 360) + 360) % 360;
  if (Number.isInteger(normalized)) return `${normalized}°`;
  return `${normalized.toFixed(decimals)}°`;
}

function placeSun() {
  sunGroup.setAttribute("transform", `translate(${focus}, 0)`);
}

function updateSunEarthLink(earthX, earthY, angleDeg, labelMode) {
  indicatorLine.setAttribute("x1", focus);
  indicatorLine.setAttribute("y1", 0);
  indicatorLine.setAttribute("x2", earthX);
  indicatorLine.setAttribute("y2", earthY);

  if (indicatorAngleText) {
    const vx = earthX - focus;
    const vy = earthY;
    const len = Math.hypot(vx, vy) || 1;
    const ux = vx / len;
    const uy = vy / len;
    const offset = 26;
    const tx = earthX + ux * offset;
    const ty = earthY + uy * offset;
    indicatorAngleText.setAttribute("x", tx);
    indicatorAngleText.setAttribute("y", ty);
    indicatorAngleText.textContent = formatAngle(angleDeg, 1);
    indicatorAngleText.setAttribute("text-anchor", "middle");
    indicatorAngleText.setAttribute("dominant-baseline", "middle");

    indicatorAngleText.classList.toggle("indicator__text--muted", labelMode === "move");
  }

  if (hudAngle) {
    hudAngle.textContent = labelMode === "hold" ? formatAngle(angleDeg, 0) : formatAngle(angleDeg, 1);
  }
}

const orbitStepper = (() => {
  const HOLD_MS = 3000;
  const MOVE_MS = 1400;
  const GOLDEN_Y = 0.382;

  const state = {
    idx: 0,
    phase: "hold",
    phaseStart: 0,
    startAngle: termData[0].angle,
    endAngle: termData[1].angle,
    nextIdx: 1,
    angle: termData[0].angle,
    lastNow: 0,
  };

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function enterHold(now) {
    state.phase = "hold";
    state.phaseStart = now;
    state.angle = termData[state.idx].angle;
    selectTerm(state.idx, { jumpEarth: false });
  }

  function enterMove(now) {
    state.phase = "move";
    state.phaseStart = now;
    state.startAngle = termData[state.idx].angle;
    state.nextIdx = (state.idx + 1) % termData.length;
    state.endAngle = termData[state.nextIdx].angle;
    if (state.endAngle <= state.startAngle) state.endAngle += 360;
  }

  function updateEarthAtAngle(angleDeg, labelMode) {
    const point = pointOnEllipse(angleDeg, a, b);
    earthGroup.setAttribute("transform", `translate(${point.x}, ${point.y})`);
    updateSunEarthLink(point.x, point.y, angleDeg, labelMode);
  }

  function tick(now) {
    if (!state.phaseStart) state.phaseStart = now;
    state.lastNow = now;

    if (state.phase === "hold") {
      const elapsed = now - state.phaseStart;
      updateEarthAtAngle(state.angle, "hold");
      if (elapsed >= HOLD_MS) enterMove(now);
    } else {
      const t = Math.min(1, (now - state.phaseStart) / MOVE_MS);
      const eased = easeInOutCubic(t);
      const angle = state.startAngle + (state.endAngle - state.startAngle) * eased;
      state.angle = ((angle % 360) + 360) % 360;
      updateEarthAtAngle(state.angle, "move");

      if (t >= 1) {
        state.idx = state.nextIdx;
        enterHold(now);
      }
    }

    requestAnimationFrame(tick);
  }

  function jumpTo(index) {
    const clamped = ((index % termData.length) + termData.length) % termData.length;
    state.idx = clamped;
    state.angle = termData[clamped].angle;
    enterHold(state.lastNow || performance.now());
    updateEarthAtAngle(state.angle, "hold");
  }

  return {
    start() {
      const now = performance.now();
      state.phaseStart = now;
      enterHold(now);
      updateEarthAtAngle(state.angle, "hold");
      requestAnimationFrame(tick);
    },
    jumpTo,
    GOLDEN_Y,
  };
})();

function setupGoldenPositioning() {
  const stage = document.querySelector(".visual__stage");
  if (!stage) return;

  const base = { x: 0, y: 0 };
  const parallax = { x: 0, y: 0 };

  function updateTransform() {
    const x = base.x + parallax.x;
    const y = base.y + parallax.y;
    svg.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
  }

  function updateGolden() {
    const rect = stage.getBoundingClientRect();
    base.x = 0;
    base.y = (orbitStepper.GOLDEN_Y - 0.5) * rect.height;
    updateTransform();
  }

  updateGolden();
  window.addEventListener("resize", updateGolden);

  const supportsParallax = window.matchMedia("(pointer: fine)").matches && window.matchMedia("(hover: hover)").matches;
  if (!supportsParallax) return;

  stage.addEventListener("mousemove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    parallax.x = x * 8;
    parallax.y = y * 8;
    updateTransform();
  });

  stage.addEventListener("mouseleave", () => {
    parallax.x = 0;
    parallax.y = 0;
    updateTransform();
  });
}


svg.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.closest || !target.closest(".term")) {
    // Keep orbit running; clicking empty space only dismisses the card.
    clearTerm();
  }
});

closeBtn.addEventListener("click", () => {
  clearTerm();
});

buildTicks();
buildTerms();
buildTermGrid();
placeSun();
orbitStepper.start();
setupGoldenPositioning();
