import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SalesForm from "./SalesForm";
import SalesTable from "./SalesTable";
import "./Sales.css";
import RevenueCharts from "./RevenueCharts";
import { formatMonthlyData } from "../utils/formatChartData";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showFullChart, setShowFullChart] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const filteredSales = sales.filter((sale) => {
    const matchesName = sale.product_name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const saleDate = new Date(sale.created_at);
    const matchesStartDate = startDate
      ? saleDate >= new Date(`${startDate}T00:00:00`)
      : true;
    const matchesEndDate = endDate
      ? saleDate <= new Date(`${endDate}T23:59:59`)
      : true;

    return matchesName && matchesStartDate && matchesEndDate;
  });

  const totalRevenue = filteredSales.reduce(
    (total, sale) => total + Number(sale.amount || 0),
    0
  );
  const totalUnits = filteredSales.reduce(
    (total, sale) => total + Number(sale.quantity || 0),
    0
  );
  const averageRevenue = filteredSales.length ? totalRevenue / filteredSales.length : 0;
  const topProduct = filteredSales.reduce((bestSale, sale) => {
    if (!bestSale || Number(sale.amount || 0) > Number(bestSale.amount || 0)) {
      return sale;
    }

    return bestSale;
  }, null);

  const handleExportCSV = () => {
    if (filteredSales.length === 0) return;

    const headers = ["product_name", "amount", "quantity", "created_at"];
    const rows = filteredSales.map((sale) =>
      [sale.product_name, sale.amount, sale.quantity, sale.created_at]
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "sales-export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fullChartData = formatMonthlyData(filteredSales);
  const recentChartData = formatMonthlyData(filteredSales, 3);
  const previewChartData = showFullChart ? fullChartData : recentChartData;

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
          <p>Visible sales</p>
          <strong>{filteredSales.length}</strong>
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
        <article className="stat-card">
          <p>Top product</p>
          <strong>{topProduct?.product_name || "No results"}</strong>
        </article>
      </section>
      <section
  className={`panel ${showFullChart ? "full-chart" : ""}`}
  onClick={() => setShowFullChart(!showFullChart)}
  style={{ cursor: "pointer" }}
>
  <RevenueCharts data={previewChartData} />

  <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "8px" }}>
    {showFullChart
      ? "Click to collapse to 3 months"
      : "Click to view full year"}
  </p>
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
            sales={filteredSales}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onExportCSV={handleExportCSV}
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
