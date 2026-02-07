import time
import os
from google import genai 
from google.genai import types
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# The client automatically picks up GOOGLE_CLOUD_PROJECT,
# GOOGLE_CLOUD_LOCATION, and GOOGLE_APPLICATION_CREDENTIALS
client = genai.Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")
)

prompt = """A close up of two people staring at a cryptic drawing on a wall, torchlight flickering.
A man murmurs, 'This must be it. That's the secret code.' The woman looks at him and whispering excitedly, 'What did you find?'"""

operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt=prompt,
    config=types.GenerateVideosConfig(
      aspect_ratio="9:16",
      resolution="720p",
    ),
)

# Poll the operation status until the video is ready.
while not operation.done:
    print("Waiting for video generation to complete...")
    time.sleep(10)
    operation = client.operations.get(operation)

# Use this refined download block
generated_video = operation.result.generated_videos[0]
print(f"Video ready at: {generated_video.video.uri}")

# Download the content
client.files.download(file=generated_video.video, path="/Users/test/Downloads/my_video.mp4")
print("Generated video saved to dialogue_example.mp4")