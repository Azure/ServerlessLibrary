export function trackEvent(eventName, eventData) {
  let appInsights = window.appInsights;
  if (typeof appInsights !== "undefined") {
    appInsights.trackEvent(eventName, eventData);
  }
}
