// Performance monitoring and metrics collection

class PerformanceMonitor {
  constructor(options = {}) {
    this.metrics = new Map();
    this.enabled = options.enabled !== false;
    this.logThreshold = options.logThreshold || 100; // Log if > 100ms
  }

  start(label) {
    if (!this.enabled) return () => {};
    const startTime = performance.now();
    return () => this.end(label, startTime);
  }

  end(label, startTime) {
    if (!this.enabled) return;
    const duration = performance.now() - startTime;
    
    if (!this.metrics.has(label)) {
      this.metrics.set(label, { count: 0, total: 0, max: 0, min: Infinity });
    }
    
    const metric = this.metrics.get(label);
    metric.count++;
    metric.total += duration;
    metric.max = Math.max(metric.max, duration);
    metric.min = Math.min(metric.min, duration);

    if (duration > this.logThreshold) {
      console.warn(`[Perf] ${label}: ${duration.toFixed(2)}ms`);
    }
  }

  report(label) {
    const metric = this.metrics.get(label);
    if (!metric) return null;
    
    return {
      label,
      count: metric.count,
      total: metric.total.toFixed(2),
      avg: (metric.total / metric.count).toFixed(2),
      max: metric.max.toFixed(2),
      min: metric.min.toFixed(2)
    };
  }

  reportAll() {
    const reports = [];
    this.metrics.forEach((_, label) => {
      reports.push(this.report(label));
    });
    return reports;
  }

  clear() {
    this.metrics.clear();
  }
}

export default PerformanceMonitor;
