import { Global, Module } from '@nestjs/common';
import { EventEmitter } from 'events';

export const ORDER_EVENTS = 'ORDER_EVENTS';
export const ORDER_CREATED = 'order.created';

@Global()
@Module({
  providers: [{ provide: ORDER_EVENTS, useValue: new EventEmitter() }],
  exports: [ORDER_EVENTS],
})
export class EventsModule {}
