# ROS2 + Docker setup

```sh
# Run ROS2 in docker with GUI
docker run -it --rm \
  --env="DISPLAY=host.docker.internal:0" \
  --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw" \
  --name ros2-humble-gui \
  -p 9090:9090 \
  ros:humble

apt update

sudo apt install -y ros-humble-rosbridge-server ros-humble-turtlesim

# run rosbridge at ws://localhost:9090
ros2 run turtlesim turtlesim_node &
ros2 run rosbridge_server rosbridge_websocket &
```
