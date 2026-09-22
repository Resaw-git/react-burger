import { IncomingMessage } from 'http';
import { Inject } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { OrdersService } from '../orders/orders.service';
import { ORDER_CREATED, ORDER_EVENTS } from '../common/events/events.module';

@WebSocketGateway({ path: '/orders' })
export class UserOrdersGateway implements OnGatewayConnection {
  private readonly clients = new Map<WebSocket, string>();

  constructor(
    private readonly ordersService: OrdersService,
    private readonly jwtService: JwtService,
    @Inject(ORDER_EVENTS) events: EventEmitter,
  ) {
    events.on(ORDER_CREATED, () => void this.broadcast());
  }

  public async handleConnection(client: WebSocket, request: IncomingMessage) {
    try {
      const token = this.extractToken(request);
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token);
      this.clients.set(client, payload.sub);
      client.on('close', () => this.clients.delete(client));
      await this.send(client);
    } catch {
      client.close(1008, 'Token is invalid');
    }
  }

  private extractToken(request: IncomingMessage): string {
    const url = new URL(request.url ?? '', 'http://localhost');
    const raw = url.searchParams.get('token') ?? '';
    return raw.startsWith('Bearer ') ? raw.slice('Bearer '.length) : raw;
  }

  private async broadcast() {
    await Promise.all(
      [...this.clients.keys()].map((client) => this.send(client)),
    );
  }

  private async send(client: WebSocket) {
    const ownerId = this.clients.get(client);
    const feed = await this.ordersService.getFeed(ownerId);
    client.send(JSON.stringify(feed));
  }
}
