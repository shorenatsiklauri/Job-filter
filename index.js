import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".boxesspace");

const createDomElement = (tag, className, src, text, event, eventFc) => {
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

for (let index = 0; index < data.length; index++) {
  const {
    id,
    company,
    logo,
    new: isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = data[index];
  const boxesspace = createDomElement("li", "boxlist");

  const jobDetails = createDomElement("div", "job-details");
  const box1part1 = createDomElement("div", "box1part1");
  const box1smalllighttexts = createDomElement("div", "box1smalllighttexts");
  const box1part2 = createDomElement("div", "box1part2");

  const companyname = createDomElement("h2", "company", null, company);
  const companynew = createDomElement("button", "new", null, "new ");
  const companyfeatured = createDomElement(
    "button",
    "featured",
    null,
    "featured "
  );
  const companyLogo = createDomElement("img", "company-logo", logo);
  const jobPosition = createDomElement("h2", "position", null, position);
  const jobpostedAt = createDomElement("span", "postedAt", null, postedAt);
  const jobType = createDomElement("span", "job-type", null, contract);
  const joblocation = createDomElement("span", "job-location", null, location);
  const newButton1 = createDomElement("button", "button1", null, "role");
  const newButton2 = createDomElement("button", "button2", null, "level");
  const newButton3 = createDomElement("button", "button3", null, "languages");
  const newButton4 = createDomElement("button", "button4", null, "tools");

  jobDetails.appendChild(companyLogo);
  jobDetails.appendChild(jobPosition);
  box1smalllighttexts.appendChild(jobpostedAt);
  box1smalllighttexts.appendChild(jobType);
  box1smalllighttexts.appendChild(joblocation);
  box1part2.appendChild(newButton1);
  box1part2.appendChild(newButton2);
  box1part2.appendChild(newButton3);
  box1part2.appendChild(newButton4);
  box1part1.appendChild(companyname);
  box1part1.appendChild(companynew);
  box1part1.appendChild(companyfeatured);
  boxesspace.appendChild(jobDetails);
  jobDetails.appendChild(box1part1);
  jobDetails.appendChild(box1smalllighttexts);
  jobDetails.appendChild(box1part2);

  list.appendChild(boxesspace);
}

const currentFilters = {
  role: null,
  level: null,
  languages: null,
  tools: null,
};

newButton1.addEventListener("click", () => {
  currentFilters.role = "role";

  filterItems(currentFilters);
});

newButton2.addEventListener("click", () => {
  currentFilters.level = "level";

  filterItems(currentFilters);
});

newButton3.addEventListener("click", () => {
  currentFilters.languages = "languages";

  filterItems(currentFilters);
});

newButton4.addEventListener("click", () => {
  currentFilters.tools = "tools";
  filterItems(currentFilters);
});

function filterItems(filters) {
  const items = document.querySelectorAll(".boxlist");

  items.forEach((item) => {
    const role = item.querySelector(".button1").textContent.toLowerCase();
    const level = item.querySelector(".button2").textContent.toLowerCase();
    const languages = item.querySelector(".button3").textContent.toLowerCase();
    const tools = item.querySelector(".button4").textContent.toLowerCase();

    if (
      (!filters.role || role === filters.role) &&
      (!filters.level || level === filters.level) &&
      (!filters.languages || languages.includes(filters.languages)) &&
      (!filters.tools || tools.includes(filters.tools))
    ) {
      hiddenfilterbox.classList.add("active");
      hiddenfilterbox.newButton1.classList.add();
      hiddenfilterbox.newButton2.classList.add();
      hiddenfilterbox.newButton3.classList.add();
      hiddenfilterbox.newButton4.classList.add();
    } else {
      hiddenfilterbox.classList.remove("active");
    }
  });
}
