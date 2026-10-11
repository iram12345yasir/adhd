// Fast in-memory query engine for task and habit filtering/sorting

class QueryEngine {
  constructor(data = []) {
    this.data = data;
  }

  // Filter by predicate
  filter(predicate) {
    this.data = this.data.filter(predicate);
    return this;
  }

  // Sort by field or comparator
  sort(comparator) {
    if (typeof comparator === 'string') {
      const field = comparator;
      const isDesc = field.startsWith('-');
      const key = isDesc ? field.slice(1) : field;
      this.data.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal) return isDesc ? 1 : -1;
        if (aVal > bVal) return isDesc ? -1 : 1;
        return 0;
      });
    } else {
      this.data.sort(comparator);
    }
    return this;
  }

  // Limit results
  limit(n) {
    this.data = this.data.slice(0, n);
    return this;
  }

  // Skip n items
  skip(n) {
    this.data = this.data.slice(n);
    return this;
  }

  // Select specific fields
  select(fields) {
    if (typeof fields === 'string') {
      fields = fields.split(',').map(f => f.trim());
    }
    this.data = this.data.map(item => {
      const result = {};
      fields.forEach(field => {
        if (field in item) result[field] = item[field];
      });
      return result;
    });
    return this;
  }

  // Group by field
  groupBy(field) {
    const groups = new Map();
    this.data.forEach(item => {
      const key = item[field];
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });
    this.data = Array.from(groups.entries()).map(([key, items]) => ({ [field]: key, items }));
    return this;
  }

  // Aggregate (count, sum, avg, etc)
  aggregate(field, operation = 'count') {
    if (operation === 'count') {
      return this.data.length;
    }
    if (operation === 'sum') {
      return this.data.reduce((acc, item) => acc + (item[field] || 0), 0);
    }
    if (operation === 'avg') {
      const sum = this.data.reduce((acc, item) => acc + (item[field] || 0), 0);
      return this.data.length > 0 ? sum / this.data.length : 0;
    }
    if (operation === 'max') {
      return Math.max(...this.data.map(item => item[field] || 0));
    }
    if (operation === 'min') {
      return Math.min(...this.data.map(item => item[field] || 0));
    }
    return null;
  }

  // Execute and return results
  exec() {
    return [...this.data];
  }

  // Reset
  reset(data) {
    this.data = data || [];
    return this;
  }
}

export default QueryEngine;
