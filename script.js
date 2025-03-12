// ==UserScript==
// @name        Amazon Review Helper
// @namespace   Violentmonkey Scripts
// @match       https://www.amazon.com/review/*
// @grant       GM_getValue
// @version     1.3
// @author      Vincent Zouras
// @description 3/11/2025
// ==/UserScript==

async function getResponse(prompt) {
  const apiKey = GM_getValue("OPENAI_API_KEY"); // Violentmonkey local storage
  if (!apiKey) {
    alert("no API key, use GM_setValue");
  }
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const data = {
    messages: [
      { role: "user", content: prompt },
      { role: "system", content: "You are a helpful assistant." },
    ],
    model: "gpt-4o-mini",
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("ChatGPT error getting response:", error);
  }
}

const wrapper = document.createElement("span");
const reviewButton = document.createElement("span");
reviewButton.classList.add("a-button", "a-button-normal", "a-button-primary", "ryp-submit-button-desktop");
reviewButton.style.width = "auto";
const innerSpan = document.createElement("span");
innerSpan.classList.add("a-button-inner");
const textSpan = document.createElement("span");
textSpan.classList.add("a-button-text");
textSpan.textContent = "Assist with Review";
innerSpan.appendChild(textSpan);
reviewButton.appendChild(innerSpan);
wrapper.appendChild(reviewButton);

const reviewTextBox = document.createElement("textarea");
reviewTextBox.placeholder =
  "Please briefly describe your experience with the product. Include what you liked, features you enjoyed, and how it worked for you.";
reviewTextBox.style.flex = "auto";
reviewTextBox.style.height = "auto";
reviewTextBox.style.resize = "vertical";
reviewTextBox.style.marginRight = "10px";

const observer = new MutationObserver((mutations, obs) => {
  const buttonContainer = document.querySelector(".a-section.in-context-ryp__submit-button-frame-desktop");
  if (buttonContainer) {
    buttonContainer.appendChild(wrapper);
    buttonContainer.appendChild(reviewTextBox);
    buttonContainer.insertBefore(wrapper, buttonContainer.firstChild);
    buttonContainer.insertBefore(reviewTextBox, buttonContainer.firstChild);

    wrapper.style.marginRight = "10px";
    obs.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

async function getProductName() {
  const ASIN = window.location.href.match(/[?&]asin=([A-Z0-9]{10})/);
  if (ASIN) {
    const productPageUrl = `https://www.amazon.com/dp/${ASIN[1]}`;
    try {
      const response = await fetch(productPageUrl);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const productNameElement = doc.querySelector("#productTitle");
      if (productNameElement) {
        return productNameElement.textContent.trim();
      }
    } catch {
      alert("Couldn't fetch product information.");
    }
  } else {
    alert("ASIN not found in URL.");
  }
}

reviewButton.addEventListener("click", async () => {
  const reviewText = document.querySelector("#reviewText");
  const reviewTitle = document.querySelector("#reviewTitle");

  let product = await getProductName();

  const userExperience = reviewTextBox.value;

  if (!userExperience) {
    alert("Please provide a description of your experience.");
    return;
  }

  let prompt = `Here is a brief review from a user: "${userExperience}". Please help them refine this review by making the language clearer and more concise, while keeping the user's honest experience intact. Do not create a fake review or exaggerate their experience. Only provide your refined version of the review, do not say anything or put quotes around it. If the user does not specify what the product is, refer to it as the following -- ${product} -- but don't restate the full product name just say what it is. Additionally, explain how many stars you're giving it and why`;
  const reviewContent = await getResponse(prompt);

  prompt = `Based on the following review: "${reviewContent}", generate a positive but truthful title for the review. Don't put it in quotes and only capitalize the first word.`;
  const titleContent = await getResponse(prompt);

  const ratingResponse = await getResponse(
    "How many stars does the following review equate to on a scale of 1 to 5. Only respond with '1', '2', '3', '4' or '5' and nothing else. Here is their review: " +
      reviewContent
  );
  const numStars = parseInt(ratingResponse);

  const stars = document.querySelectorAll(".in-context-ryp__form-field--starRating-single");
  switch (numStars) {
    case 1:
      stars[0].click();
      break;
    case 2:
      stars[1].click();
      break;
    case 3:
      stars[2].click();
      break;
    case 4:
      stars[3].click();
      break;
    case 5:
      stars[4].click();
      break;
    default:
      break;
  }

  reviewText.value = reviewContent;
  reviewTitle.value = titleContent;
  reviewText.dispatchEvent(new Event("input", { bubbles: true }));
  reviewTitle.dispatchEvent(new Event("input", { bubbles: true }));
});
