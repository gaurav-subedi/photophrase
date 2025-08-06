from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch

app = Flask(__name__)
CORS(app)  # allow your RN app to call this

# Load once at startup
model_name = "nlpconnect/vit-gpt2-image-captioning"
model = VisionEncoderDecoderModel.from_pretrained(model_name)
processor = ViTImageProcessor.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.route("/caption", methods=["POST"])
def caption_image():
    if "file" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    img = Image.open(request.files["file"].stream).convert("RGB")
    pixel_values = processor(images=img, return_tensors="pt").pixel_values.to(device)
    output_ids = model.generate(pixel_values, max_length=16, num_beams=4, early_stopping=True)
    caption = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()
    return jsonify({"caption": caption})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
