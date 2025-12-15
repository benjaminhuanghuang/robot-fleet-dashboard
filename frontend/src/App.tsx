import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const ws = useRef<WebSocket | null>(null);
  const [pose, setPose] = useState({ x: 0, y: 0, theta: 0 });

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "pose") {
        console.log("Received pose:", msg);
        setPose(msg);
      }
    };

    return () => ws.current?.close();
  }, []);

  const sendCmd = (linear: number, angular: number) => {
    ws.current?.send(
      JSON.stringify({
        type: "cmd_vel",
        linear,
        angular,
      })
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Robot Control Panel</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          width: "fit-content",
        }}
      >
        <div></div>
        <Button onClick={() => sendCmd(1, 0)}>Forward</Button>
        <div></div>
        <Button onClick={() => sendCmd(0, 1)}>Left</Button>
        <Button onClick={() => sendCmd(0, 0)}>Stop</Button>
        <Button onClick={() => sendCmd(0, -1)}>Right</Button>
        <div></div>
        <Button onClick={() => sendCmd(-1, 0)}>Back</Button>
        <div></div>
      </div>

      <h3>Pose</h3>
      <p>
        x: {pose.x.toFixed(2)} y: {pose.y.toFixed(2)} θ: {pose.theta.toFixed(2)}
      </p>
    </div>
  );
}

export default App;
