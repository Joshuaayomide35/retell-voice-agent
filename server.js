const express = require("express");
const cors = require("cors");
const app = express();
const RETELL_API_KEY = process.env.RETELL_API_KEY;
const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID;
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.post("/create-call", async (req, res) => {
  console.log("API KEY:", RETELL_API_KEY ? "loaded" : "MISSING");
  console.log("AGENT ID:", RETELL_AGENT_ID ? "loaded" : "MISSING");
  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: { "Authorization": "Bearer " + RETELL_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ agent_id: RETELL_AGENT_ID })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.message });
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.listen(PORT, () => console.log("Server running on port " + PORT));
