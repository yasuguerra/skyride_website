import XLSX from "xlsx";
import fs from "fs";

function load(file) {
  const wb = XLSX.readFile(file);
  const out = {};
  for (const name of wb.SheetNames) {
    out[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: "" });
  }
  return out;
}

const flights = load("docs/Flights_Table_Excel.xlsx");
const aircraft = load("docs/Aircraft_Table_Excel.xlsx");

console.log("=== FLIGHTS FILE sheets:", Object.keys(flights));
console.log("=== AIRCRAFT FILE sheets:", Object.keys(aircraft));

// Aircraft table
console.log("\n=== AIRCRAFT TABLE (first sheet) ===");
const acSheet = aircraft[Object.keys(aircraft)[0]];
console.log("columns:", Object.keys(acSheet[0] || {}));
console.log(JSON.stringify(acSheet, null, 2));

// Flights: get unique airplane_id + destinations
const flightSheet = flights[Object.keys(flights)[0]];
console.log("\n=== FLIGHTS columns:", Object.keys(flightSheet[0] || {}));
console.log("Total flights:", flightSheet.length);

// Summary: min price per (airplane_id, flight_title)
const map = new Map();
for (const row of flightSheet) {
  const key = `${row.airplane_id}||${row.flight_title}`;
  const price = Number(row.total_price_one_way) || 0;
  if (!map.has(key) || price < map.get(key).price) {
    map.set(key, {
      airplane: row.airplane_id,
      route: row.flight_title,
      price,
      roundTrip: row.total_price_round_trip,
      duration: row.flight_duration_min,
      maxWeight: row.max_load_weight_lbs,
    });
  }
}
const summary = Array.from(map.values()).sort((a, b) =>
  a.airplane.localeCompare(b.airplane) || a.route.localeCompare(b.route)
);
fs.writeFileSync("docs/pricing-summary.json", JSON.stringify(summary, null, 2));
console.log("\n=== PRICING SUMMARY (min one-way per aircraft+route) ===");
console.log(JSON.stringify(summary, null, 2));

// Unique airplanes
const airplanes = [...new Set(flightSheet.map(r => r.airplane_id))];
console.log("\n=== UNIQUE AIRPLANES IN FLIGHTS:", airplanes);

// Unique routes
const routes = [...new Set(flightSheet.map(r => r.flight_title))];
console.log("\n=== UNIQUE ROUTES:", routes);
