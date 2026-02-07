import os
from google.cloud import vision

def extract_paragraphs(image_path):
    """Detects document features (paragraphs) in a local image."""
    client = vision.ImageAnnotatorClient()

    with open(image_path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # Use document_text_detection for dense text/paragraphs
    response = client.document_text_detection(image=image)
    annotation = response.full_text_annotation

    print(f"--- Extracting Text from: {image_path} ---\n")

    all_paragraphs = []

    for page in annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                para_text = ""
                for word in paragraph.words:
                    word_text = "".join([symbol.text for symbol in word.symbols])
                    para_text += word_text + " "
                
                # Print the completed paragraph with a double newline
                all_paragraphs.append(para_text.strip())

    if response.error.message:
        raise Exception(f"API Error: {response.error.message}")

    return "\n\n".join(all_paragraphs)

