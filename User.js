// ==UserScript==
// @name        Amazon Review Helper
// @namespace   Violentmonkey Scripts
// @match       https://www.amazon.com/review/*
// @grant       none
// @version     1.1
// @author      Vincent Zouras
// @description 9/17/2024
// ==/UserScript==


async function getResponse(prompt){
  const apiKey = 'DONT FORGET KEY'; // !!! removed api key for security
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const data = {
    messages: [
      {role: 'user', content: prompt},
      {role: 'system', content: 'You are a helpful assistant.'}
    ],
    model: 'gpt-4o-mini'
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error){
    console.error('chatgpt error getting response:', error);
  }
}

// creating button
const button = document.createElement('button');
button.textContent = 'Generate Response';
button.style.backgroundColor = '#C6F6C6';
button.style.border = 'none';
button.style.borderRadius = '100px';
button.style.height = '30px';
button.style.font = 'Amazon Ember';
button.style.fontSize = '13px';
button.style.marginRight = '10px';

button.addEventListener('mouseover', function() { // darken on mouseover
  button.style.backgroundColor = '#90EE90';
});

button.addEventListener('mouseout', function() { // lighten when mouse leaves
  button.style.backgroundColor = '#C6F6C6';
});

let product;

function addButtonToPage() {
  const addReviewButton = document.querySelector('.a-section.a-text-right.ryp__submit-button-card__card-frame > div');
  const productName = document.querySelector('span.ryp__product-title-text'); // need this to be delayed too lol
  product = productName.textContent;
  if (addReviewButton) {
    addReviewButton.insertAdjacentElement('afterbegin', button);
  } else {
    console.error('Button container not found');
  }
}

setTimeout(addButtonToPage, 500);


// when button is clicked
button.addEventListener('click', async () => {
  const reviewField = document.querySelector('#scarface-review-text-card-title');
  const titleField = document.querySelector('#scarface-review-title-label');
  const stars = document.querySelectorAll('.ryp__review-stars__star.ryp__star.ryp__star--large')
  const fiveStar = stars[4];
  fiveStar.click();

  let prompt = `Write a short paragraph review about the product: ${product}, as if you purchased it yourself. You liked the product. Do not repeat the full product name, just say what it is.`;
  const reviewText = await getResponse(prompt);
  reviewField.value = reviewText;

  prompt = `Based on the following review: "${reviewText}", generate a positive title for the review. Don't put it in quotes and only capitalize the first word.`;
  const titleText = await getResponse(prompt);
  titleField.value = titleText;
});


