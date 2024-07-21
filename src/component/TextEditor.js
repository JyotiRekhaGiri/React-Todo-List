import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Draggable from 'react-draggable';
import './TextEditor.css';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [size, setSize] = useState(16);
  const [color, setColor] = useState('black');
  const [displayText, setDisplayText] = useState('');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setRedoStack([...redoStack, { text, font, size, color, displayText }]);
      setText(lastState.text);
      setFont(lastState.font);
      setSize(lastState.size);
      setColor(lastState.color);
      setDisplayText(lastState.displayText);
      setHistory([...history]);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setHistory([...history, { text, font, size, color, displayText }]);
      setText(nextState.text);
      setFont(nextState.font);
      setSize(nextState.size);
      setColor(nextState.color);
      setDisplayText(nextState.displayText);
      setRedoStack([...redoStack]);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    setHistory([...history, { text, font, size, color, displayText }]);
    setRedoStack([]);
    setDisplayText(text);
  };

  const handleFontChange = (e) => {
    setHistory([...history, { text, font, size, color, displayText }]);
    setRedoStack([]);
    setFont(e.target.value);
  };

  const handleSizeChange = (e) => {
    setHistory([...history, { text, font, size, color, displayText }]);
    setRedoStack([]);
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setHistory([...history, { text, font, size, color, displayText }]);
    setRedoStack([]);
    setColor(e.target.value);
  };

  return (
    <div className="text-editor">
      <div className="toolbar">
        <Button variant="outlined" onClick={handleUndo} startIcon={<UndoIcon />}>
          UNDO
        </Button>
        <Button variant="outlined" onClick={handleRedo} startIcon={<RedoIcon />}>
          REDO
        </Button>
      </div>
      <div className="editor-container">
        <div className="display-container">
          <Draggable bounds="parent">
            <div className="text-box" style={{ fontFamily: font, fontSize: size, color: color, display: 'inline-block' }}>
              {displayText}
            </div>
          </Draggable>
        </div>
        <div className="hidden-container">
          <h5>FONT</h5>
          <FormControl fullWidth>
            <Select value={font} onChange={handleFontChange}>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
            </Select>
          </FormControl>
          <h5>SIZE</h5>
          <FormControl fullWidth>
            <Select value={size} onChange={handleSizeChange}>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={28}>28</MenuItem>
              <MenuItem value={32}>32</MenuItem>
            </Select>
          </FormControl>
          <h5>COLOR</h5>
          <FormControl fullWidth>
            <Select value={color} onChange={handleColorChange}>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
              <MenuItem value="brown">Brown</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '1rem' }}>
            <TextField
              variant="outlined"
              multiline
              rows={4}
              value={text}
              onChange={handleTextChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddText} style={{ marginTop: '1rem' }}>
              Add Text
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
