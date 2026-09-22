import { Inject } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { OrdersService } from '../orders/orders.service';
import { ORDER_CREATED, ORDER_EVENTS } from '../common/events/events.module';

@WebSocketGateway({ path: '/orders/all' })
export class AllOrdersGateway implements OnGatewayConnection {
  private readonly clients = new Set<WebSocket>();

  constructor(
    private readonly ordersService: OrdersService,
    @Inject(ORDER_EVENTS) events: EventEmitter,
  ) {
    events.on(ORDER_CREATED, () => void this.broadcast());
  }

  public async handleConnection(client: WebSocket) {
    this.clients.add(client);
    client.on('close', () => this.clients.delete(client));
    await this.send(client);
  }

  private async broadcast() {
    await Promise.all([...this.clients].map((client) => this.send(client)));
  }

  private async send(client: WebSocket) {
    const feed = await this.ordersService.getFeed();
    client.send(JSON.stringify(feed));
  }
}
