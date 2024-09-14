from fastapi import FastAPI
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()

# Load the GPT-2 model and tokenizer
gpt2_model = GPT2LMHeadModel.from_pretrained("gpt2")
gpt2_tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str

def next_word_prediction_gpt2(text):
    inputs = gpt2_tokenizer.encode(text, return_tensors='pt')
    
    # Create an attention mask to ensure proper attention
    attention_mask = torch.ones_like(inputs)
    
    # Generate with top-k sampling for more diverse predictions
    outputs = gpt2_model.generate(
        inputs,
        attention_mask=attention_mask,  # Add attention mask
        max_length=len(inputs[0]) + 3,  # Generate 3 possible words
        num_return_sequences=3,         # Return 3 predictions
        top_k=50,                       # Top-k sampling
        do_sample=True,
        pad_token_id=gpt2_tokenizer.eos_token_id  # Explicitly set the pad token ID
    )

    # Decode the outputs and extract the last predicted word for each sequence
    predictions = [gpt2_tokenizer.decode(output[len(inputs[0]):], skip_special_tokens=True).strip() for output in outputs]
    return predictions

# API route to get next-word prediction
@app.post("/predict")
async def predict(request: TextRequest):
    try:
        predictions = next_word_prediction_gpt2(request.text)
        return {"predictions":predictions}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})
