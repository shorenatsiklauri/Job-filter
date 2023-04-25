import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".boxesspace");
const hiddenFilterBox = document.querySelector(".hiddenfilterbox");
const filters = [];
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

  if (event) {
    element.addEventListener(event, eventFc);
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
  const newButton1 = createDomElement("button", "button1", null, role);

  newButton1.addEventListener("click", (event) => {
    const filter = event.target.textContent;
    console.log(filters);
    if (!filters.includes(filter)) {
      filters.push(filter);

      const filtered = filterData();
      console.log(filtered);
    }
  });
  const newButton2 = createDomElement("button", "button2", null, level);
  newButton2.addEventListener("click", (event) => {
    const filter = event.target.textContent;
    console.log(filters);
    if (!filters.includes(filter)) {
      filters.push(filter);

      const filtered = filterData();
      console.log(filtered);
    }
  });

  for (let index = 0; index < languages.length; index++) {
    const language = languages[index];

    const newButton3 = createDomElement("button", "button3", null, language);
    newButton3.addEventListener("click", (event) => {
      const filter = event.target.textContent;
      console.log(filters);
      if (!filters.includes(filter)) {
        filters.push(filter);

        const filtered = filterData();
        console.log(filtered);
      }
    });

    box1part2.appendChild(newButton3);
  }

  for (let index = 0; index < tools.length; index++) {
    const tool = tools[index];

    const newButton4 = createDomElement("button", "button4", null, tool);
    newButton4.addEventListener("click", (event) => {
      const filter = event.target.textContent;
      console.log(filters);
      if (!filters.includes(filter)) {
        filters.push(filter);

        const filtered = filterData();
        console.log(filtered);

        box1part2.appendChild(newButton4);
      }
    });

    jobDetails.appendChild(companyLogo);
    jobDetails.appendChild(jobPosition);
    box1smalllighttexts.appendChild(jobpostedAt);
    box1smalllighttexts.appendChild(jobType);
    box1smalllighttexts.appendChild(joblocation);
    box1part2.appendChild(newButton1);
    box1part2.appendChild(newButton2);

    box1part1.appendChild(companyname);
    box1part1.appendChild(companynew);
    box1part1.appendChild(companyfeatured);
    boxesspace.appendChild(jobDetails);
    jobDetails.appendChild(box1part1);
    jobDetails.appendChild(box1smalllighttexts);
    jobDetails.appendChild(box1part2);

    list.appendChild(boxesspace);
  }
}
function filterData() {
  return data.filter((item) => {
    return filters.every((filterbtn) => {
      return (
        item.role === filterbtn ||
        item.level === filterbtn ||
        item.languages.includes(filterbtn) ||
        item.tools.includes(filterbtn)
      );
    });

    function addFilterButton(filter) {
      const filterButton = document.createElement("button");
      filterButton.classList.add("filter-btn");
      filterButton.textContent = filter;

      filterButton.addEventListener("click", () => {});

      hiddenFilterBox.appendChild(filterButton);
    }
  });
}
