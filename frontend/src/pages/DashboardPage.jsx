import { useEffect, useMemo, useState } from "react";
import api from "../api";
import Topbar from "../components/Topbar";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("high");
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [habitName, setHabitName] = useState("");
  const [habitTarget, setHabitTarget] = useState(2);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const loadData = async () => {
    try {
      const [tasksRes, habitsRes] = await Promise.all([api.get("/tasks"), api.get("/habits")]);
      setTasks(tasksRes.data);
      setHabits(habitsRes.data);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  };

  const topTasks = useMemo(() => {
    const weight = { high: 3, medium: 2, low: 1 };
    return [...tasks]
      .sort((a, b) => weight[b.priority] - weight[a.priority])
      .slice(0, 3);
  }, [tasks]);

  const createTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const res = await api.post("/tasks", {
      title: taskTitle,
      priority: taskPriority,
      focusMinutes
    });

    setTasks((prev) => [res.data, ...prev]);
    setTaskTitle("");
    setFocusMinutes(25);
  };

  const toggleTask = async (taskId) => {
    const res = await api.patch(`/tasks/${taskId}`);
    setTasks((prev) => prev.map((task) => (task.id === res.data.id ? res.data : task)));
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const createHabit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    const res = await api.post("/habits", {
      name: habitName,
      target: habitTarget
    });

    setHabits((prev) => [res.data, ...prev]);
    setHabitName("");
    setHabitTarget(2);
  };

  const incrementHabit = async (habitId) => {
    const res = await api.patch(`/habits/${habitId}`);
    setHabits((prev) => prev.map((habit) => (habit.id === res.data.id ? res.data : habit)));
  };

  const logFocusSession = async () => {
    await api.post("/focus-sessions", { minutes: focusMinutes });
    setTimerSeconds(0);
    setTimerRunning(false);
  };

  const completedTasks = tasks.filter((task) => task.done).length;
  const completedHabits = habits.filter((habit) => habit.count >= habit.target).length;
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  return (
    <div className="space-y-6">
      <Topbar
        title="Dashboard"
        actions={
          <button
            onClick={() => setTimerRunning((prev) => !prev)}
            className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 font-semibold text-white"
          >
            {timerRunning ? "Pause timer" : "Start focus"}
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="glass-panel rounded-[28px] p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Top 3 priorities</h2>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
              Today
            </span>
          </div>

          <div className="space-y-3">
            {topTasks.length === 0 ? (
              <p className="text-slate-300">No tasks yet. Add your first win.</p>
            ) : (
              topTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      task.priority === "high"
                        ? "bg-rose-500/15 text-rose-200"
                        : task.priority === "medium"
                        ? "bg-amber-500/15 text-amber-200"
                        : "bg-emerald-500/15 text-emerald-200"
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-300">{task.focusMinutes} min</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{task.title}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="glass-panel rounded-[28px] p-5">
          <h2 className="mb-4 text-xl font-bold text-white">Focus timer</h2>
          <div className="text-center">
            <div className="text-5xl font-black tracking-wide text-white">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setTimerRunning((prev) => !prev)}
                className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 font-semibold text-white"
              >
                {timerRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(Number(focusMinutes) * 60);
                }}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white"
              >
                Reset
              </button>
            </div>
            <button
              onClick={logFocusSession}
              className="mt-4 w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 font-semibold text-cyan-300"
            >
              Log focus session
            </button>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="glass-panel rounded-[28px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Add task</h2>
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs uppercase text-violet-200">
              Task
            </span>
          </div>

          <form onSubmit={createTask} className="space-y-3">
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task title"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <input
                type="number"
                min="5"
                step="5"
                value={focusMinutes}
                onChange={(e) => setFocusMinutes(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
            </div>

            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 font-semibold text-white">
              Add task
            </button>
          </form>
        </section>

        <section className="glass-panel rounded-[28px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Habits</h2>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase text-emerald-200">
              Routine
            </span>
          </div>

          <form onSubmit={createHabit} className="space-y-3">
            <input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Habit name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
            <input
              type="number"
              min="1"
              value={habitTarget}
              onChange={(e) => setHabitTarget(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 px-4 py-3 font-semibold text-white">
              Add habit
            </button>
          </form>

          <div className="mt-4 space-y-3">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
                <div>
                  <p className="font-medium text-white">{habit.name}</p>
                  <p className="text-xs text-slate-300">{habit.count}/{habit.target}</p>
                </div>

                <button
                  onClick={() => incrementHabit(habit.id)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                >
                  +1
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="glass-panel rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Task list</h2>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase text-slate-200">
            {tasks.length}
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className={`flex items-center justify-between gap-4 rounded-2xl border p-3 ${task.done ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/10 bg-white/5"}`}>
              <button
                onClick={() => toggleTask(task.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              >
                {task.done ? "✓" : ""}
              </button>

              <div className="flex-1">
                <p className={`font-medium ${task.done ? "text-slate-300 line-through" : "text-white"}`}>
                  {task.title}
                </p>
                <p className="text-xs text-slate-300">
                  {task.priority} priority · {task.focusMinutes} mins
                </p>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
