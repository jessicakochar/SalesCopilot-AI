export const formatMonthlyData = (sales) => {
  const monthly = {};

   const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  sales.forEach((sale) => {
    // 👇 Use PostgreSQL timestamp
    const date = new Date(sale.created_at);

    // 👇 Skip invalid dates (prevents your error)
    if (isNaN(date)) return;

    const month = date.toLocaleString("default", { month: "short" });

    if (!monthly[month]) {
      monthly[month] = 0;
    }

    monthly[month] += Number(sale.amount);
  });

  return monthNames
    .filter((m) => monthly[m] !== undefined)
    .map((month) => ({
      month,
      revenue: monthly[month],
    }));
};

