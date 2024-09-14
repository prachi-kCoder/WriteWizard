# WriteWizard: AI-Powered Writing Assistant
This is a Ai bases next word predictor app, that allows writers to write without worry much about vocabulary , suggesting them next word , so that they work more on creative thinking
![WriteWizaardInterFace](https://github.com/user-attachments/assets/5b710491-7db3-4b84-8ec1-9b6195cb31dc)


WriteWizard is an AI-based writing tool that provides next-word predictions to enhance your writing flow. It uses two models:

- GPT-2 for advanced next-word predictions.
- A custom LSTM model that I trained for specialized predictions, demonstrating how RNNs work in text generation. (Details and code in model-training.txt)

##How to Use:
Clone the repo:

(bash)
Copy code
git clone https://github.com/prachi-kCoder/WriteWizard.git
##Install dependencies:

## Frontend (React + Vite):
(bash)
Copy code
cd client
npm install
npm run dev
## Backend (FastAPI):
(bash)
Copy code
cd server
pip install -r requirements.txt
uvicorn main:app --reload
Start Writing: Open the app in your browser, enter text, and get real-time word predictions to help with your writing.

WriteWizard is great for writers and for exploring how GPT-2 and LSTM models perform in real-time text generation.
