//import { fetchLatestTRM } from "../service/trmServices";
const fetchLatestTRM = require("../service/trmServices");

exports.getLatestTRM = async (req, res) => {
  try {
    const result = await fetchLatestTRM();
    res.json({
      ok: true,
      fuente: "Banco de la República - Datos Abiertos",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obteniendo la TRM",
      error: error.message
    });
  }
};
