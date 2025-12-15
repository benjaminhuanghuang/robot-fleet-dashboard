# Robot fleet control dashboard

- A robot remote control platform based on WebSocket and ROS
- Enables real-time control of robot movement and status feedback via a web browser
- Features a decoupled architecture of Web -> Backend -> ROS -> Robot
- Supports multi-robot expansion and secure handling of disconnections

## Tack stack

- Frontend: React + Tailwind CSS + Shadcn + websocket
- Backend: Node.js + websocket
- Docker + ROS2 + rosbridge
