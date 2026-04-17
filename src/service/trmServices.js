const BASE_URL = "https://www.datos.gov.co/resource/32sa-8pi3.json";

async function fetchLatestTRM() {
  const url = `${BASE_URL}?$order=vigenciadesde DESC&$limit=2`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.length) throw new Error("No se pudo obtener la TRM");

  const [latest, previous] = data;

  const latestValue = parseFloat(latest.valor);
  const previousValue = previous ? parseFloat(previous.valor) : null;

  const variation = previousValue
    ? ((latestValue - previousValue) / previousValue) * 100
    : null;

  return {
    fecha: latest.vigenciadesde,
    valor: latestValue,
    unidad: latest.unidad,
    variacion_porcentual: variation?.toFixed(2),
    tendencia: variation > 0 ? "subió" : variation < 0 ? "bajó" : "sin cambio"
  };
}

module.exports = fetchLatestTRM;
