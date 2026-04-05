import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SalesForm from "./SalesForm";
import SalesTable from "./SalesTable";
import "./Sales.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:5001`;

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/sales`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSales(res.data);
        setErrorMessage("");
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMessage("Unable to load sales data right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addSale = async () => {
    if (!newProduct || !newAmount || !newQuantity) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE_URL}/sales`,
        {
          product_name: newProduct,
          amount: parseFloat(newAmount),
          quantity: parseInt(newQuantity, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales((currentSales) => [res.data, ...currentSales]);
      setNewProduct("");
      setNewAmount("");
      setNewQuantity("");
      setErrorMessage("");
    } catch (err) {
      console.error("Add error:", err);
      setErrorMessage("Could not add the new sale.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSale = async (id) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE_URL}/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSales((currentSales) => currentSales.filter((sale) => sale.id !== id));
      setErrorMessage("");
    } catch (err) {
      console.error("Delete error:", err);
      setErrorMessage("Could not delete that sale.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (sale) => {
    setEditingId(sale.id);
    setEditProduct(sale.product_name);
    setEditAmount(sale.amount);
    setEditQuantity(sale.quantity || 1);
  };

  const saveEdit = async (id) => {
    if (!editProduct || !editAmount || !editQuantity) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_BASE_URL}/sales/${id}`,
        {
          product_name: editProduct,
          amount: parseFloat(editAmount),
          quantity: parseInt(editQuantity, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales((currentSales) =>
        currentSales.map((sale) => (sale.id === id ? res.data : sale))
      );
      setEditingId(null);
      setEditProduct("");
      setEditAmount("");
      setEditQuantity("");
      setErrorMessage("");
    } catch (err) {
      console.error("Update error:", err);
      setErrorMessage("Could not update that sale.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalRevenue = sales.reduce((total, sale) => total + Number(sale.amount || 0), 0);
  const totalUnits = sales.reduce((total, sale) => total + Number(sale.quantity || 0), 0);
  const averageRevenue = sales.length ? totalRevenue / sales.length : 0;

  return (
    <div className="sales-container">
      <section className="hero-card">
        <div>
          <p className="eyebrow">SalesPilot</p>
          <h1>Sales dashboard</h1>
          <p className="hero-subtitle">
            Review the latest sales activity, add new entries, and keep your
            admin workspace up to date.
          </p>
        </div>
        <button className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <p>Total sales</p>
          <strong>{sales.length}</strong>
        </article>
        <article className="stat-card">
          <p>Total revenue</p>
          <strong>${totalRevenue.toLocaleString()}</strong>
        </article>
        <article className="stat-card">
          <p>Average deal</p>
          <strong>
            ${averageRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </strong>
        </article>
        <article className="stat-card">
          <p>Total units</p>
          <strong>{totalUnits.toLocaleString()}</strong>
        </article>
      </section>

      {errorMessage ? <p className="form-error page-error">{errorMessage}</p> : null}

      {isLoading ? (
        <section className="panel loading-panel">
          <p>Loading sales dashboard...</p>
        </section>
      ) : (
        <>
          <SalesForm
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            newAmount={newAmount}
            setNewAmount={setNewAmount}
            newQuantity={newQuantity}
            setNewQuantity={setNewQuantity}
            addSale={addSale}
            isSubmitting={isSubmitting}
          />

          <SalesTable
            sales={sales}
            editingId={editingId}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            editAmount={editAmount}
            setEditAmount={setEditAmount}
            editQuantity={editQuantity}
            setEditQuantity={setEditQuantity}
            startEdit={startEdit}
            saveEdit={saveEdit}
            deleteSale={deleteSale}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </div>
  );
}
