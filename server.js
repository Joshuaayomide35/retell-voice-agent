const express = require("express");
const cors = require("cors");
const app = express();
const RETELL_API_KEY = "key_3ddb4e7897d49ad9d25a94cb6d21";
const RETELL_AGENT_ID = "agent_3fafae826feaa70c8cd7693b02";
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.post("/create-call", async (req, res) => {
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
app.listen(PORT, () => {
  console.log("Server is RUNNING! Open: http://localhost:3000");
});
