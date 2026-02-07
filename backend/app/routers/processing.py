from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.ocr import extract_text
from ..services.summarizer import summarize_text
from ..services.video_generator import generate_video
from ..models.schemas import VideoResponse

router = APIRouter(
    prefix="/processing",
    tags=["processing"],
    responses={404: {"description": "Not found"}},
)

@router.post("/image", response_model=VideoResponse)
async def process_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        text = await extract_text(content)
        summary = await summarize_text(text)
        video_url = await generate_video(summary)
        return VideoResponse(video_url=video_url, original_text=text, summary=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
