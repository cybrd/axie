// ==UserScript==
// @name     Axie Market Place
// @namespace axie
// @include https://marketplace.axieinfinity.com/axie?stage=4&*breedCount=0*
// @version  1
// @grant    none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// start page: https://marketplace.axieinfinity.com/axie?stage=4&breedCount=0

let timeout;
const resultsNode = $("div.flex-1.overflow-y-auto.px-8.py-12")[0];
const config = { attributes: true, childList: true, subtree: true };
const callback = function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      clearTimeout(timeout);
      timeout = setTimeout(resultsCB, 2000);
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(resultsNode, config);

async function resultsCB() {
  const apiUrl =
    "https://dxmwof9qec.execute-api.ap-northeast-1.amazonaws.com/dev/update";

  const axieNodes = $("div.m-8.cursor-pointer");
  console.log(axieNodes.length);

  const requestObj = [];

  axieNodes.each(function () {
    const id = $("a", this).attr("href").substr(6);
    const breedCount = $("small.block.text-gray-2.truncate", this)
      .html()
      .substr(13);
    const etherium = $("h5.truncate.font-medium", this).html().substr(2);
    const price = $("h6.truncate.ml-8.text-gray-1.font-medium", this).html();
    const axieObj = {
      id,
      breedCount,
      etherium,
      price,
    };
    console.log(axieObj);

    requestObj.push(axieObj);
  });

  if (axieNodes.length) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestObj),
    });
    response.json().then((data) => {
      console.log(data);
    });
  }
}
