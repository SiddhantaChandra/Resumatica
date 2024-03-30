import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Information from './Pages/Information';
import { useState } from 'react';

function App() {
  const [parseData, setParseData] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Hero setParseData={setParseData} />} />
      <Route
        path="/edit-personal-info"
        element={
          <Information parseData={parseData} setParseData={setParseData} />
        }
      />
    </Routes>
  );
}

export default App;
