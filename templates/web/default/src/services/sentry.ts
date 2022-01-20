import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export function initSentry(): void {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: Number(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE),
    debug: process.env.REACT_APP_ENV_NAME !== 'production',
    environment: process.env.REACT_APP_ENV_NAME,
  });
}

export function setSentryTags(tags: { name: string, value: string | number }[]): void {
  tags.forEach((tag) => Sentry.setTag(tag.name, tag.value));
}

export function fireSentryEvent(exception: Error): void {
  Sentry.captureException(exception);
}

export default initSentry;
