function FilterBar({
  activeFilter,
  activeSort,
  filterOptions,
  sortOptions,
  onChangeFilter,
  onChangeSort,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/50 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const isActive = option.value === activeFilter
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChangeFilter(option.value)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-300/50'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-medium">排序</span>
          <select
            value={activeSort}
            onChange={(event) => onChangeSort(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-indigo-200 transition focus:ring-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default FilterBar
