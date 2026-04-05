export default function SalesForm({
  newProduct,
  setNewProduct,
  newAmount,
  setNewAmount,
  newQuantity,
  setNewQuantity,
  addSale,
  isSubmitting,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="panel-kicker">Quick action</p>
          <h3>Add a new sale</h3>
        </div>
      </div>

      <div className="sales-form">
        <label className="field-group">
          <span>Product name</span>
          <input
            type="text"
            placeholder="Example: Enterprise plan"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
        </label>

        <label className="field-group">
          <span>Revenue amount</span>
          <input
            type="number"
            placeholder="2500"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
        </label>

        <label className="field-group">
          <span>Quantity</span>
          <input
            type="number"
            min="1"
            placeholder="1"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </label>

        <button className="primary-btn add-btn" onClick={addSale} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Sale"}
        </button>
      </div>
    </section>
  );
}
