import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.css';

// Function to call Gemini 3 API
async function getGeminiResponse(prompt) {
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('Gemini API key not found. Please set REACT_APP_GEMINI_API_KEY in your .env file.');
    return 'API Key not configured.';
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }
    return 'No response generated.';
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    return `Error: ${error.message}`;
  }
}

function Box(props) {
  // This reference gives us direct access to the mesh
  const mesh = useRef();
  // Set up state for rotation direction
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (
    (mesh.current.rotation.x += delta),
    (mesh.current.rotation.y += delta)
  ));

  // Return the view, these are regular three.js objects
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await getGeminiResponse(prompt);
    setGeminiResponse(response);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini 3 in 3D</h1>
        <div style={{ marginBottom: '20px', width: '400px' }}>
          <input
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Ask Gemini 3 something..."
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 120px)' }}
          />
          <button onClick={handleSubmit} disabled={isLoading || !prompt} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#61dafb', color: 'white', cursor: 'pointer' }}>
            {isLoading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
        {/* This div displays the Gemini 3 response */}
        <div style={{ marginTop: '20px', fontSize: '0.8em', color: '#aaa' }}>
          {geminiResponse || 'Your Gemini 3 response will appear here.'}
        </div>
        <Canvas style={{ width: '80vw', height: '60vh', marginTop: '20px', border: '2px solid white', borderRadius: '10px' }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[0, 0, 0]} />
        </Canvas>
      </header>
    </div>
  );
}

export default App;
