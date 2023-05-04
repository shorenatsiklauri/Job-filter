import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".filters");
const buttonchoosen = document.querySelector(".removebutton");
const clear = document.querySelector(".clear");

buttonchoosen.style.display = "none";

const createDomElement = (tag, className, text, src, event, eventFc) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (src) {
    element.src = src;
  }
  if (text) {
    element.textContent = text;
  }
  if (event) {
    element[event] = () => {
      eventFc();
    };
  }
  return element;
};

let filterArray = [];
function showButtons() {
  buttonchoosen.innerHTML = "";
  for (let row = 0; row < filterArray.length; row++) {
    const options = createDomElement("div", "option");
    const filCard = createDomElement("button", "filtercard", filterArray[row]);
    const Closesvg = createDomElement(
      "img",
      "remove",
      null,
      "./images/icon-remove.svg"
    );
    options.append(filCard, Closesvg);
    buttonchoosen.append(options, clear);

    Closesvg.addEventListener("click", function () {
      filterArray.splice(row, 1);
      showButtons();
      if (filterArray.length === 0) {
        buttonchoosen.style.display = "none";
      }

      let filtered = arrayFilt();
      showCards(filtered);
    });
  }
}
clear.addEventListener("click", () => {
  buttonchoosen.style.display = "none";
  filterArray = [];
  showButtons();
  showCards(data);
});

function showCards(cards) {
  list.innerHTML = "";
  for (let index = 0; index < cards.length; index++) {
    const {
      id,
      company,
      logo,
      new: textsforcheck,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = cards[index];

    const cardBox = createDomElement("div", "card");
    const photo = createDomElement("img", "cardphoto", null, logo);
    const nameofcompany = createDomElement("p", "companyname", company);
    const newsmallbox = createDomElement("p", "newsmallbox", "new");
    const feature = createDomElement("p", "featured", "featured");

    const member = createDomElement("div", "boxfeatured");
    member.append(nameofcompany);
    if (textsforcheck) {
      member.append(newsmallbox);
    }

    if (featured) {
      member.append(feature);
    }

    const positionElement = createDomElement("p", "position", position);

    const time = createDomElement("div", "info");
    const day = createDomElement("p", "postedAt", postedAt);
    const dot = createDomElement("div", "dot");
    const contractel = createDomElement("p", "postedAt", contract);
    const dots = createDomElement("div", "dot");
    const locationel = createDomElement("p", "postedAt", location);
    time.append(day, dot, contractel, dots, locationel);

    const lineelement = createDomElement("div", "lineelement");

    const allbutton = createDomElement("div", "buttonall");
    const roleS = createDomElement("button", "btnall", role);
    roleS.addEventListener("click", function () {
      let elementrol = filterArray.includes(role);
      if (!elementrol) {
        buttonchoosen.style.display = "flex";
        filterArray.push(role);
        showButtons();
        let filtered = arrayFilt();
        showCards(filtered);
      }
    });

    const levels = createDomElement("button", "btnall", level);
    levels.addEventListener("click", function () {
      let elementlevel = filterArray.includes(level);
      if (!elementlevel) {
        buttonchoosen.style.display = "flex";
        filterArray.push(level);

        showButtons();
        let filtered = arrayFilt();
        showCards(filtered);
      }
    });

    allbutton.append(roleS, levels);
    cardBox.append(
      photo,
      member,
      positionElement,
      time,
      lineelement,
      allbutton
    );
    list.append(cardBox);

    for (let i = 0; i < languages.length; i++) {
      let language = createDomElement("button", "btnall", languages);
      allbutton.append(language);
      language.textContent = languages[i];
      language.addEventListener("click", function () {
        let eng = filterArray.includes(languages[i]);
        if (!eng) {
          buttonchoosen.style.display = "flex";
          filterArray.push(languages[i]);
          showButtons();
          let filtered = arrayFilt();

          showCards(filtered);
        }
      });
    }

    for (let i = 0; i < tools.length; i++) {
      let tool = createDomElement("button", "btnall", tools);
      allbutton.append(tool);
      tool.textContent = tools[i];

      tool.addEventListener("click", function () {
        eng = filterArray.includes(tools[i]);
        if (!eng) {
          buttonchoosen.style.display = "flex";
          filterArray.push(tools[i]);

          showButtons();
          let filtered = arrayFilt();

          showCards(filtered);
        }
      });
    }

    cardBox.append(
      photo,
      member,
      positionElement,
      time,
      lineelement,
      allbutton
    );
    list.append(cardBox);
  }
}
showCards(data);
function arrayFilt() {
  let DoArray = data.filter((item) =>
    filterArray.every(
      (filterbtn) =>
        item.role === filterbtn ||
        item.level === filterbtn ||
        item.languages.includes(filterbtn) ||
        item.tools.includes(filterbtn)
    )
  );
  return DoArray;
}
