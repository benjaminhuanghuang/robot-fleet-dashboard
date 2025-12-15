import { WebSocketServer } from "ws";
import * as ROSLIB from "roslib";

const wss = new WebSocketServer({ port: 8080 });

// connect to ROS
const ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
});

ros.on("connection", () => {
  console.log("Connected to ROS");
});

// cmd_vel publisher
const cmdVel = new ROSLIB.Topic({
  ros,
  name: "/turtle1/cmd_vel",
  messageType: "geometry_msgs/Twist",
});

// pose subscriber
const poseTopic = new ROSLIB.Topic({
  ros,
  name: "/turtle1/pose",
  messageType: "turtlesim/Pose",
});

wss.on("connection", (ws) => {
  console.log("Web client connected");

  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    console.log("Received message from web client:", msg);
    if (msg.type === "cmd_vel") {
      const twist = {
        linear: { x: msg.linear, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: msg.angular },
      };
      cmdVel.publish(twist);
    }
  });

  poseTopic.subscribe((pose) => {
    ws.send(
      JSON.stringify({
        type: "pose",
        x: pose.x,
        y: pose.y,
        theta: pose.theta,
      })
    );
  });
});
