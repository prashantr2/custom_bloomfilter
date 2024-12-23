# Redis Publisher-Subscriber Setup

This project demonstrates a basic Publisher-Subscriber pattern using Redis with Docker Compose.

## Services

- **redis-svc**: Redis service, exposing port 6379.
- **publisher**: Node.js service to publish messages, exposing port 3000 for the UI.
- **subscriber-1**: Node.js service to subscribe to messages.
- **subscriber-2**: Another Node.js service to subscribe to messages.

## Network

All services are connected to a shared Docker network `my_network`.

## Usage

1. **Start the services**:
   ```sh
   docker-compose up --build

2. **Publish a message**
   Visit http://localhost:3000/ to send message from UI
   
3. **Subscribers**
   Messages will be received and logged by the subscriber services.