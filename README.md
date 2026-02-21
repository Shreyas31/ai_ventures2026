# Interactive Books Web Application Prototype

Hackathon project for Imperial College London's AI Ventures Hackathon.

This project creates short video teasers from book pages to boost engagement and sales by leveraging the "TikTok economy".


# Pipeline


User uploads photos of book pages.

Text is extracted using OCR API.

Extracted text is cleaned and summarized using Gemini API.

Condensed text is sent to Veo API for video generation.

Generated video is returned and displayed in the app.


# Tech Stack


React.js, Python, FastAPI, OCR API, Gemini API (Text LLM & Veo)


# Testing


**Backend**

cd backend

pip install -r requirements.txt

uvicorn main:app --reload


**Frontend**

cd frontend

npm install

npm start
