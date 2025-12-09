const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = ` ${currCode}`;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (elem) => {
  let currCountry = elem.value;
  let currImage = countryList[currCountry];
  let newSrc = `https://flagsapi.com/${currImage}/flat/64.png`;
  let img = elem.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let inpVal = input.value;
  if (inpVal == "" || inpVal < 1) {
    msg.innerHTML = "it is not valid";
    input.value = "1";
    return;
  }

  const fromCurrValue = fromCurr.value;
  const toCurrValue = toCurr.value;
  console.log(toCurrValue);
  if (fromCurrValue == toCurrValue) {
    msg.innerHTML = "Please select different currencies";
    return;
  }

  let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrValue}`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data.rates[toCurrValue];
  console.log(rate);
  msg.innerHTML = `${inpVal}  ${fromCurrValue} = ${
    inpVal * rate
  }  ${toCurrValue}`;
});
