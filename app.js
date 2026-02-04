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

function pointAtAngle(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const r = 1 / Math.sqrt((cos * cos) / (a * a) + (sin * sin) / (b * b));
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
    const { x, y, dx, dy } = pointAtAngle(angle);

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
    const { x, y, dx, dy } = pointAtAngle(term.angle);
    const labelOffset = 18;
    const lx = x + dx * labelOffset;
    const ly = y + dy * labelOffset;

    const group = svgEl("g", {
      class: "term",
      "data-index": index,
      tabindex: "0",
      role: "button",
      "aria-label": `${term.name}，太阳黄经 ${term.angle} 度",
    });

    const title = svgEl("title");
    title.textContent = `${term.name} | ${term.angle}°`;

    const circle = svgEl("circle", {
      cx: x,
      cy: y,
      r: 4.5,
      class: "term-circle",
    });

    const label = svgEl("text", {
      x: lx,
      y: ly,
      "text-anchor": Math.abs(dx) < 0.3 ? "middle" : dx > 0 ? "start" : "end",
      "dominant-baseline": "middle",
      class: "term-label",
    });
    label.textContent = term.name;

    group.appendChild(title);
    group.appendChild(circle);
    group.appendChild(label);
    termsGroup.appendChild(group);

    group.addEventListener("click", (event) => {
      event.stopPropagation();
      selectTerm(index);
    });

    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectTerm(index);
      }
    });
  });
}

let activeIndex = null;

function selectTerm(index) {
  if (activeIndex !== null) {
    const prev = termsGroup.querySelector(`.term[data-index="${activeIndex}"]`);
    if (prev) prev.classList.remove("active");
  }

  activeIndex = index;
  const next = termsGroup.querySelector(`.term[data-index="${index}"]`);
  if (next) next.classList.add("active");

  const term = termData[index];
  card.root.classList.remove("is-empty");
  card.name.textContent = term.name;
  card.angle.textContent = `太阳黄经 ${term.angle}°`;
  card.desc.textContent = term.desc;
  card.range.textContent = term.range;
  card.season.textContent = term.season;
}

function clearTerm() {
  if (activeIndex !== null) {
    const prev = termsGroup.querySelector(`.term[data-index="${activeIndex}"]`);
    if (prev) prev.classList.remove("active");
  }
  activeIndex = null;
  card.root.classList.add("is-empty");
  card.name.textContent = "尚未选择";
  card.angle.textContent = "太阳黄经 --°";
  card.desc.textContent = "点击节气标记，了解其在地球公转中的位置与含义。";
  card.range.textContent = "—";
  card.season.textContent = "—";
}

function placeSun() {
  sunGroup.setAttribute("transform", `translate(${focus}, 0)`);
}

function animateEarth() {
  let start = null;
  const period = 24000;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) % period;
    const angle = (progress / period) * Math.PI * 2;
    const x = a * Math.cos(angle);
    const y = -b * Math.sin(angle);
    earthGroup.setAttribute("transform", `translate(${x}, ${y})`);
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

svg.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.closest || !target.closest(".term")) {
    clearTerm();
  }
});

closeBtn.addEventListener("click", () => {
  clearTerm();
});

buildTicks();
buildTerms();
placeSun();
animateEarth();
