"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [imageData, setImageData] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImageData(data.image);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <h1>スクリーンショット</h1>
      {error ? <p>Error: {error}</p> : <img src={`data:image/png;base64,${imageData}`} alt="Screenshot" />}
    </main>
  )
}
