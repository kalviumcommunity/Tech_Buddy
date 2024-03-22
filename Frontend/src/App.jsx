import { useState } from 'react';
// import axios from 'axios';
// import Home from './components/Home';





function App() {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const googleLoginWindow = window.open("http://localhost:3000/api/user/google");
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while initiating Google login.');
      // Log the full error object for debugging
      console.error('Full Error:', error);
    }
  };
  

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
