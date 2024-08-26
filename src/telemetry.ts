import { logs, NodeSDK } from '@opentelemetry/sdk-node';

import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const defaultAttributes = {
  [SemanticResourceAttributes.SERVICE_NAME]: 'apitoolkit.server',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  environment: 'production',
  'at-project-id': '00000000-0000-0000-0000-000000000000',
};

const resource = new Resource(defaultAttributes);

const logExporter = new OTLPLogExporter({
  url: 'http://localhost:4317', //grpc endpoint
  timeoutMillis: 10000,
});

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317', // grpc endpoint
  timeoutMillis: 10000,
});

export const sdk = new NodeSDK({
  resource: resource,
  instrumentations: [getNodeAutoInstrumentations()],
  logRecordProcessor: new logs.SimpleLogRecordProcessor(logExporter),
  traceExporter,
});
