from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import processing

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev purposes, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(processing.router)

@app.get("/")
async def root():
    return {"message": "Hello World!"}

