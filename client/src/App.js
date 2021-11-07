import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Home from './components/Home';
import Result from './components/Result';
import ErrorPage from './components/ErrorPage';

function App() {

  const [welcome, setWelcome] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
    
  const handleLoading = (val) => {
  setIsLoading(val);
  }
  
  const handleResult = (val) => {
    setResult(val);
  }
  
  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => {
      // console.log("If you are reading this, that means you read my article about this task. Thanks! If you opened this just out of curiosity, I wonder why? You can check out the article here and let me know in the comment")
      setWelcome(data.message)
    });
  }, []);

  const getResult = async(name) => {
    return fetch(`/api/profile?user=${name}`, {
      headers:{
          "accepts":"application/json"
      }
    })
    .then(async (res) => {
      if (!res.ok) {
        let err = await res.json();
        throw new Error(err.message);
      }
      return res.json()
    })
    .then((data) => {
      setResult(data)
      setIsLoading(false)
    })
    .catch((err) => {
      setError(`${err.message}`)
      setIsLoading(false)
    });
  }

  return (
    <div className="container">
      <Home 
        welcome={welcome}
        getResult={getResult} 
        isLoading={isLoading} 
        handleLoading={handleLoading} 
        handleResult={handleResult}
      />
      {result && <Result result={result} />}
      {error && !result && <ErrorPage error={error} />} 
      <Footer />
    </div>
  );
}

export default App;
