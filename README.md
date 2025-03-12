# Amazon Review Helper

## Overview

Amazon Review Helper is a **Violentmonkey user script** that enhances the review-writing experience on Amazon. It uses OpenAI's GPT-4o-mini to assist users in refining their reviews, suggesting titles, and estimating appropriate star ratings.

## Features

- 📝 **Refine Reviews:** Takes user input and refines it for clarity and conciseness while maintaining honesty.
- ⭐ **Suggest Star Ratings:** Determines an appropriate star rating based on the refined review.
- 🔖 **Generate Titles:** Creates a suitable and engaging title for the review.
- 🛒 **Works on Amazon:** Automatically integrates with Amazon review pages.

## Installation

1. Install **Violentmonkey** (or a similar user script manager like Tampermonkey) on your browser.
2. Add this script to Violentmonkey.
3. Ensure you have an **OpenAI API key** stored using `GM_setValue("OPENAI_API_KEY", "your-api-key-here")`.

## Usage

1. Navigate to an Amazon review page (`https://www.amazon.com/review/*`).
2. A new **"Assist with Review"** button and text box will appear.
3. Enter a brief description of your experience with the product.
4. Click the **"Assist with Review"** button.
5. The script will:
   - Suggest an improved review.
   - Generate a review title.
   - Recommend a star rating and automatically select it.
6. Edit or submit the review as needed.

## Requirements

- Violentmonkey or Tampermonkey extension
- OpenAI API key (stored via Violentmonkey's local storage)

## Notes

- The script does not fabricate or exaggerate reviews.
- It ensures honesty while improving language clarity.
- Works only on Amazon review pages.

## Author

**Vincent Zouras**

## Version History

- **v1.3** (03/11/2025): Initial release
