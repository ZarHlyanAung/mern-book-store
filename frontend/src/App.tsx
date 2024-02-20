import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    axios.get('https:localhost:5555/books').then((response) => {
      console.log(response);
    });
  }, []);
  return <div className="bg-green-400 h-[100vh]">App</div>;
};

export default App;
