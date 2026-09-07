import { useState, useEffect } from "react";
import React from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    
    let ignore = false;
 
    setLoading(true);
 
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn't reach the server (" + response.status + ")");
        }
        return response.json();
      })
      .then((json) => {
        if (!ignore) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
 
    return () => {
      ignore = true;
    };
  }, [url]); 
 
  return { data, setData, loading, error };
}
 
export default useFetch;