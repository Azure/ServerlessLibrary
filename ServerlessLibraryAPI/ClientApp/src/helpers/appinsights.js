export function trackEvent(eventName, eventData) {
  let appInsights = window.appInsights;
  if (typeof appInsights !== "undefined") {
    appInsights.trackEvent(eventName, eventData);
  }
}

export function trackError(errorString, properties) {
  let appInsights = window.appInsights;
  if (typeof appInsights !== "undefined") {
    appInsights.trackTrace(errorString, properties, 3);
  }
}

export function trackException(exception, properties) {
  let appInsights = window.appInsights;
  if (typeof appInsights !== "undefined") {
    appInsights.trackException(exception, null, properties);
  }
}
