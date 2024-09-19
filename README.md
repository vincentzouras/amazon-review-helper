# Amazon Review Helper

### Overview
Amazon Review Helper is a **Violentmonkey userscript** that assists users in generating product reviews and titles on Amazon. The script interacts with the OpenAI API to generate personalized reviews and titles, helping to automate the review submission process.

### Features
- **Automated Review Generation**: Generates a review for a product based on the product title.
- **Auto-Fill Review Form**: Automatically fills in both the review text and review title fields.
- **5-Star Rating**: Automatically selects a 5-star rating.
- **Custom Styling**: Adds a "Generate Response" button with a simple hover effect.

### Installation
1. Install the **Violentmonkey** or **Tampermonkey** browser extension.
2. Copy the code from User.js
3. Add the script to your Violentmonkey or Tampermonkey dashboard.
4. Visit any Amazon product review page, and a "Generate Response" button will appear.

### Usage
1. Navigate to an Amazon product review page.
2. Click the "Generate Response" button.
3. The script will:
   - Select a 5-star rating.
   - Generate a product review and title based on the product name.
   - Automatically fill the text fields with the generated content.

### How it Works
The script uses the OpenAI API to generate review text and titles. Here's a breakdown of how it works:
- A button is added to the Amazon review page.
- On button click, the script fetches the product name and sends it to the OpenAI API.
- The API generates a short, positive product review and a corresponding review title.
- The script auto-populates the review and title fields and selects a 5-star rating for submission.

### OpenAI API Integration
To use this script, you need an OpenAI API key. This key is used to generate the review content. You can replace the placeholder key in the script with your own:

```javascript
const apiKey = 'your-openai-api-key';
