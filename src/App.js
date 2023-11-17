import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  console.log(process.env.REACT_APP_OPENAI_KEY);
  return (
    <div className="App">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
