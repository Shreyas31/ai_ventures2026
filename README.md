📖➡️🎥 AI Venture 2026 — Book-to-Video Generator

Hackathon project for #ai_venture2026

Transform photos of book pages into concise, AI-generated videos.

🚀 Project Overview

This project converts images of book pages into short, engaging videos using a multi-step AI pipeline. Users upload photos of text, the system extracts and summarizes the content, and then generates a video using state-of-the-art video models like Sora or Veo.

The result: static reading material becomes visual, dynamic, and easier to consume.

🧠 How It Works

User uploads photos of book pages

Text is extracted using OCR

Extracted text is cleaned and summarized

Condensed text is sent to a video generation model

Generated video is returned and displayed in the app

🔄 Processing Pipeline
Image Upload
   ↓
OCR (Text Extraction)
   ↓
Text Cleaning & Summarization
   ↓
Prompt Optimization
   ↓
Sora / Veo API
   ↓
Video Output in App

🛠 Tech Stack
Frontend

React

Image upload (camera or file)

Video preview and playback

Simple, responsive UI

Backend

FastAPI

OCR integration (e.g. Google OCR)

LLM-based text summarization

Video generation orchestration

REST API for frontend communication

📁 Project Structure
.
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   │   ├── ocr.py
│   │   ├── summarizer.py
│   │   └── video_generator.py
│   └── models/
│
└── README.md

🔌 API Responsibilities
Backend (FastAPI)

Handle image uploads

Run OCR on uploaded images

Summarize and condense text

Generate video prompts

Send requests to Sora or Veo

Return video output or status

Frontend (React)

Capture or upload images

Show processing states (OCR → Summary → Video)

Display generated videos

Handle errors and retries

🎯 Use Cases

Students visualizing textbook material

Readers summarizing long passages quickly

Accessibility for visual learners

Educational content generation

🧪 Hackathon Scope

MVP focused on end-to-end flow

Single user journey from image → video

Optimized for fast demos and clarity

Designed to be extensible

🌱 Future Improvements

Multi-page batching

Video style selection (cinematic, educational, animated)

Scene-by-scene generation

Voiceover and subtitles

Chapter-level summaries

🏁 Getting Started
Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Frontend
cd frontend
npm install
npm start