## 🔹 Project Description

**LinkedIn AI Comment Assistant** is a Chrome extension built with **Vite, React, and CRXJS** that helps professionals write engaging comments and replies on LinkedIn posts.

The extension integrates with **Google Gemini API** to generate smart, context-aware comments based on the content of a LinkedIn post or another user’s comment. Users can select from different writing styles—**formal, informal, short, or cool**—to match the tone they want to convey.

---

## ✨ Key Features

-   🔍 **Context-aware AI** – Extracts captions or comments from LinkedIn posts.
-   🎨 **Multiple styles** – Generate comments in _formal, informal, short, or cool_ tones.
-   ⚡ **One-click generation** – Quickly generate and insert responses directly into LinkedIn’s comment box.
-   🔑 **API integration** – Uses Gemini API for natural and high-quality responses.
-   ⚙️ **Custom settings** – Save API key and preferred style with Chrome Storage.
-   🖥️ **Modern stack** – Built using Vite, React, TypeScript, and CRXJS for fast development and modular structure.

---

## 🔹 How It Works

1. **Detect** – The extension identifies LinkedIn posts and comment boxes.
2. **Generate** – Sends the text to Gemini API along with the user’s chosen style.
3. **Preview** – Shows the generated comment inside the popup before posting.
4. **Insert** – Automatically inserts the AI-generated text into the LinkedIn comment field.

---

## 🔹 Tech Stack

-   **Frontend/UI**: React + Tailwind (Popup interface) + ShadCn 
-   **Extension Framework**: CRXJS + Vite + TypeScript
-   **AI Integration**: Google Gemini API
-   **Storage**: Chrome Storage API (to save user settings)
-   **Scripts**: Content scripts for LinkedIn DOM interaction, Background service worker for API handling


## Note : 

prefer shadcnui