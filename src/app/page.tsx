"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/test');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImageData(data.image);
    }
    fetchData();
  }, []);

  return (
    <main>
      <h1>スクリーンショット</h1>
      <img src={`data:image/png;base64,${imageData}`} alt="Screenshot" />
    </main>
  )
}
