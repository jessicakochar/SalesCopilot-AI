export default function SalesTable({
  sales,
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
  if (sales.length === 0) {
    return (
      <section className="panel empty-state">
        <p className="panel-kicker">No data yet</p>
        <h3>Your sales table is empty</h3>
        <p>Add your first sale above to start building the dashboard.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Sales records</p>
          <h3>Latest entries</h3>
        </div>
        <span className="table-count">{sales.length} items</span>
      </div>

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
    </section>
  );
}
