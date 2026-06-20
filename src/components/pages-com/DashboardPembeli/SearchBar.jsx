function SearchBar({ value, onChange }) {
  return (
    <div className="dashboard-search">
      <svg
        className="dashboard-search-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari makanan..."
        aria-label="Cari makanan"
      />
    </div>
  )
}

export default SearchBar
