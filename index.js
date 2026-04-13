import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/classify", async (req, res) => {
  const { name } = req.query;

  // Handle missing or non-string names
  if (!name) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing or empty name parameter" });
  }
  if (typeof name !== "string" || !isNaN(name)) {
    return res
      .status(422)
      .json({ status: "error", message: "name is not a string" });
  }

  try {
    const response = await axios.get(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`,
    );
    const { gender, probability, count } = response.data;

    // Returns null for rare or fake names
    if (!gender || count === 0) {
      return res.status(200).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    const is_confident = probability >= 0.7 && count >= 100;

    res.status(200).json({
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender: gender,
        probability: probability,
        sample_size: count,
        is_confident: is_confident,
        processed_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(502).json({ status: "error", message: "Upstream API failure" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server live at http://localhost:${PORT}/api/classify?name=Jeffery`,
  );
});
