export default function SalesTable({
  sales,
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onExportCSV,
  editingId,
  editProduct,
  setEditProduct,
  editAmount,
  setEditAmount,
  editQuantity,
  setEditQuantity,
  startEdit,
  saveEdit,
  deleteSale,
  isSubmitting,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Sales records</p>
          <h3>Latest entries</h3>
        </div>
        <div className="panel-actions">
          <span className="table-count">{sales.length} items</span>
          <button
            className="secondary-btn export-btn"
            onClick={onExportCSV}
            disabled={sales.length === 0}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="filter-grid">
        <label className="field-group search-field">
          <span>Search by product name</span>
          <input
            type="text"
            placeholder="Type a product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <label className="field-group filter-field">
          <span>Start date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="field-group filter-field">
          <span>End date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {sales.length === 0 ? (
        <section className="empty-state compact-empty-state">
          <p className="panel-kicker">No matching data</p>
          <h3>No sales match your current filters</h3>
          <p>Try adjusting the product name or date range.</p>
        </section>
      ) : null}

      {sales.length > 0 ? (
      <div className="table-wrap">
        <table className="sales-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={sale.id}>
                <td>{index + 1}</td>
                <td>
                  {editingId === sale.id ? (
                    <input
                      type="text"
                      value={editProduct}
                      onChange={(e) => setEditProduct(e.target.value)}
                    />
                  ) : (
                    <strong>{sale.product_name}</strong>
                  )}
                </td>
                <td>
                  {editingId === sale.id ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  ) : (
                    `$${Number(sale.amount).toLocaleString()}`
                  )}
                </td>
                <td>
                  {editingId === sale.id ? (
                    <input
                      type="number"
                      min="1"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                    />
                  ) : (
                    Number(sale.quantity || 1).toLocaleString()
                  )}
                </td>
                <td>{new Date(sale.created_at).toLocaleString()}</td>
                <td className="table-actions">
                  {editingId === sale.id ? (
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(sale.id)}
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => startEdit(sale)}
                        disabled={isSubmitting}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteSale(sale.id)}
                        disabled={isSubmitting}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </section>
  );
}
