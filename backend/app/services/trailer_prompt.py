import os
from google import genai
from google.genai import types
from pydantic import BaseModel
from dotenv import load_dotenv, find_dotenv
import json

load_dotenv(find_dotenv())

class TrailerScene(BaseModel):
    video_prompt: str
    voiceover_script: str
    mood: str

def generate_trailer_prompts(book_text: str):

    # Initialize client (it will look for GEMINI_API_KEY environment variable)
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    system_instruction = """
    You are a cinematic trailer director. Analyze the provided book text 
    and generate a JSON shot list for a 30-second trailer.
    Focus on visual metaphors, atmospheric lighting, and dramatic pacing.
    """

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=book_text,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json", # Ensures valid JSON
            response_schema=list[TrailerScene],      # Forces the schema
            safety_settings=[
            types.SafetySetting(
                category="HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold="BLOCK_ONLY_HIGH" 
            )
        ]
        )
    )

    return response.parsed