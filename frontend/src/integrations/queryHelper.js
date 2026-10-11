// Query helper for fast local filtering and sorting
import QueryEngine from '../engine/query';

const queryHelper = {
  // Get top N tasks by priority
  getTopTasks(tasks, n = 3) {
    return new QueryEngine(tasks)
      .filter(t => !t.done)
      .sort((a, b) => {
        const priority = { high: 3, medium: 2, low: 1 };
        return priority[b.priority] - priority[a.priority];
      })
      .limit(n)
      .exec();
  },

  // Get completed habits count
  getCompletedHabitsCount(habits) {
    return new QueryEngine(habits)
      .filter(h => h.count >= h.target)
      .exec()
      .length;
  },

  // Get completed tasks count
  getCompletedTasksCount(tasks) {
    return new QueryEngine(tasks)
      .filter(t => t.done)
      .exec()
      .length;
  },

  // Search tasks by title
  searchTasks(tasks, query) {
    const q = query.toLowerCase();
    return new QueryEngine(tasks)
      .filter(t => t.title.toLowerCase().includes(q))
      .exec();
  },

  // Sort tasks by priority then by recent
  sortByPriority(tasks) {
    return new QueryEngine(tasks)
      .sort((a, b) => {
        const priority = { high: 3, medium: 2, low: 1 };
        const pDiff = priority[b.priority] - priority[a.priority];
        if (pDiff !== 0) return pDiff;
        return (b.createdAt || 0) - (a.createdAt || 0);
      })
      .exec();
  },

  // Get task progress percentage
  getTaskProgress(tasks) {
    const total = tasks.length;
    if (total === 0) return 0;
    const completed = tasks.filter(t => t.done).length;
    return Math.round((completed / total) * 100);
  },

  // Get habit completion percentage
  getHabitProgress(habits) {
    const total = habits.reduce((acc, h) => acc + h.target, 0);
    if (total === 0) return 0;
    const completed = habits.reduce((acc, h) => acc + Math.min(h.count, h.target), 0);
    return Math.round((completed / total) * 100);
  }
};

export default queryHelper;
