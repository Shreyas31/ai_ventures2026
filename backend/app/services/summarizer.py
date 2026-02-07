import os
from google import genai
from google.genai import types
from dotenv import load_dotenv, find_dotenv
import json

load_dotenv(find_dotenv())

def load_ocr_text(file_path):
    # 'r' means "read" mode; encoding='utf-8' ensures it can read special characters
    with open(file_path, 'r', encoding='utf-8') as f:
        
        # 1. Parse the JSON file into a Python Dictionary
        data = json.load(f)
        
        # 2. Extract the specific text field
        # Most OCR tools put the main text in a key like "full_text" or "content"
        text_content = data.get("full_text", "Warning: Key not found")
        
        return text_content

#replace this with the function call in the pipeling
ocr_content = "ocr_result.json"
text_content = load_ocr_text(ocr_content)

# Initialize client (it will look for GEMINI_API_KEY environment variable)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# 1. Define the System Instruction (The "Director" persona)
system_instruction = """
You are a cinematic trailer director. Analyze the provided book text 
and generate a JSON shot list for a 30-second trailer.
Focus on visual metaphors, atmospheric lighting, and dramatic pacing.
"""

# 2. Define the exact JSON structure you need for your website logic
class TrailerScene(types.BaseModel):
    video_prompt: str
    voiceover_script: str
    mood: str

# 3. Call the model with the book text
response = client.models.generate_content(
    model="gemini-3-flash",
    contents=text_content,
    config=types.GenerateContentConfig(
        system_instruction=system_instruction,
        response_mime_type="application/json", # Ensures valid JSON
        response_schema=list[TrailerScene]      # Forces the schema
    )
)

# 4. Access the generated JSON data
print(response.text)