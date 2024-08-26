import { Injectable, Logger } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { logs } from '@opentelemetry/api-logs';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('Handling getHello request');

    const tracer = trace.getTracer('example-tracer');
    const span = tracer.startSpan('getHelloSpan');

    const otelLogger = logs.getLogger('example-logger');
    otelLogger.emit({
      body: 'This is an OpenTelemetry log message',
      attributes: { method: 'getHello' },
      severityText: 'INFO',
    });

    try {
      span.addEvent('Custom event: getHello started');
      this.logger.debug('Inside getHello method');
      const response = 'Hello World!';
      span.addEvent('Response generated');
      return response;
    } finally {
      span.end();
    }
  }
}
