import { logs, NodeSDK } from '@opentelemetry/sdk-node';

import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const logExporter = new OTLPLogExporter({
  url: 'http://otelcol.apitoolkit.io:4317', //grpc endpoint
});

export const sdk = new NodeSDK({
//  resource: resource,
  instrumentations: [getNodeAutoInstrumentations()],
  logRecordProcessor: new logs.BatchLogRecordProcessor(logExporter),
});
