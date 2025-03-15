import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // ✅ อนุญาตให้ React เรียก WebSocket ได้
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`✅ Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`❌ Client disconnected: ${client.id}`);
  }

  // ✅ ฟังก์ชันส่งข้อมูลไปที่ FE
  sendNewData(data: any) {
    this.server.emit('newData', data);
  }

  sendNewFixtures(data: any) {
    this.server.emit('newFixtures', data);
  }
}
