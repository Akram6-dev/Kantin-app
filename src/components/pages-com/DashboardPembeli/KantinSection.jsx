import KantinCard from './KantinCard'

function KantinSection({ kantins, loading, error }) {
  return (
    <section className="dashboard-section">
      <div className="kantin-list" aria-busy={loading}>
        {loading && <p className="dashboard-state">Memuat daftar kantin...</p>}
        {!loading && error && <p className="dashboard-state dashboard-state-error">{error}</p>}
        {!loading && !error && kantins.length === 0 && (
          <p className="dashboard-state">Belum ada kantin yang tersedia.</p>
        )}
        {!loading && !error && kantins.map((kantin, index) => (
          <KantinCard key={kantin.id} kantin={kantin} index={index} />
        ))}
      </div>
    </section>
  )
}

export default KantinSection
