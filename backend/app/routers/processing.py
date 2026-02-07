from fastapi import APIRouter, UploadFile, File
from services.ocr import extract_paragraphs
from services.trailer_prompt import generate_trailer_prompts
import shutil
import os

router = APIRouter(prefix="/processing")

@router.post("/generate-trailer")
async def handle_request(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    
    # 1. Save locally
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 2. Call the OCR service
        raw_text = extract_paragraphs(temp_path)

        # 3. Call the Director service
        # This is the "Clean Call" you mentioned!
        shot_list = generate_trailer_prompts(raw_text)

        return {"scenes": shot_list}
        
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)