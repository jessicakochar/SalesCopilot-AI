import pool from "../config/db.js";
import csv from "csv-parser";
import stream from "stream";

export const getSales = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sales ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const createSale = async (req, res) => {
  const { product_name, amount } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO sales (product_name, amount) VALUES ($1, $2) RETURNING *",
      [product_name, amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
 };

  export const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM sales WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Sale not found" });
    res.json({ message: "Sale deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { product_name, amount } = req.body;

  if (!product_name || !amount) {
    return res.status(400).json({ message: "Product name and amount are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE sales SET product_name = $1, amount = $2 WHERE id = $3 RETURNING *",
      [product_name, parseFloat(amount), id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Sale not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getSaleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // convert to integer
    const result = await pool.query(
      "SELECT * FROM sales WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const importSalesFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    bufferStream
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        try {
          for (const row of results) {
            const { product_name, amount } = row;

            if (!product_name || !amount) continue; // skip invalid rows

            await pool.query(
              "INSERT INTO sales (product_name, amount) VALUES ($1, $2)",
              [product_name, parseFloat(amount)]
            );
          }

          res.json({
            message: "CSV imported successfully",
            count: results.length,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Error inserting data" });
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "CSV import failed" });
  }
};