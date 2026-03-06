import { useTasks } from '../context/TaskContext';

export default function FilterBar() {
  const { filters, setFilters, loadTasks } = useTasks();

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    loadTasks(updated);
  };

  const handleSearch = (e) => {
    const updated = { ...filters, search: e.target.value };
    setFilters(updated);
    // debounce search
    clearTimeout(window._searchTimeout);
    window._searchTimeout = setTimeout(() => loadTasks(updated), 400);
  };

  const clearFilters = () => {
    const reset = { status: '', category: '', priority: '', search: '' };
    setFilters(reset);
    loadTasks(reset);
  };

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleSearch}
          placeholder="🔍 Search tasks..."
          className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">All Categories</option>
          <option value="daily">Daily</option>
          <option value="work">Work</option>
          <option value="urgent">Urgent</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {(filters.status || filters.category || filters.priority || filters.search) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-red-500 px-3 py-2 rounded-lg border border-gray-200 hover:border-red-200 transition"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  );
}
