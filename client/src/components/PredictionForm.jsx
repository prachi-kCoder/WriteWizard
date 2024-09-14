import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Send as SendIcon, TextFields as TextFieldsIcon } from '@mui/icons-material';
import '../styles/PredictionForm.css'; // Custom CSS for background and icons

const PredictionForm = () => {
  const [inputText, setInputText] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState('');

  // Fetch prediction from the backend API
  const handlePredict = async () => {
    if (inputText.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/predict', { text: inputText });
        setPredictions(response.data.predictions || []);
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    }
  };

  // Handle the selection from the autocomplete box
  const handleSelectPrediction = (event, newValue) => {
    if (newValue) {
      setSelectedPrediction(newValue);
      setInputText(`${inputText} ${newValue}`); // Append selected word to the current text
    }
  };

  return (
    <Container component={Paper} elevation={3} className="prediction-container">
      <Typography variant="h3" align="center" gutterBottom className="title">
        Next Word Prediction 
      </Typography>
      
      {/* Input field with an icon */}
      <TextField
        label="Enter some text"
        variant="outlined"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        fullWidth
        className="input-field"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TextFieldsIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Predict button with an icon */}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePredict}
        className="predict-button"
        endIcon={<SendIcon />}
      >
        Predict Next Word
      </Button>

      <div className="prediction-results">
        {selectedPrediction && (
          <Typography variant="h5" className="selected-prediction-container">
            Selected Prediction:
             <div className="selected-prediction-box"> 
               <span>{selectedPrediction}</span>
             </div>
          </Typography>
        )}

        {/* Autocomplete for predictions */}
        <Autocomplete
          options={predictions}
          getOptionLabel={(option) => option}
          onChange={handleSelectPrediction}
          renderInput={(params) => (
            <TextField {...params} label="Suggestions" variant="outlined" fullWidth margin="normal" />
          )}
          disableClearable
          freeSolo
        />
      </div>

      {/* Optional: Show predictions directly */}
      <div className="debug-section">
        <Typography variant="h6">Predictions:</Typography>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>{prediction}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default PredictionForm;

