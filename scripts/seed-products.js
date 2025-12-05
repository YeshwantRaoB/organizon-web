// scripts/seed-products.js
// Node-compatible seed script (no deprecated MongoClient options)
// Usage: node scripts/seed-products.js
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" }); // load env from .env.local

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "organizon";

if (!uri) {
  console.error("Set MONGODB_URI in .env.local before running this script.");
  process.exit(1);
}

async function run() {
  const client = new MongoClient(uri); // no deprecated options
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db(dbName);
    const products = db.collection("products");

    console.log("Clearing existing products (if any)...");
    await products.deleteMany({});

    const categories = [
      { key: "rice", count: 25, display: "Rice" },
      { key: "millets", count: 13, display: "Millets" },
      { key: "pulses", count: 28, display: "Pulses" },
      { key: "cereals", count: 34, display: "Cereals" },
      { key: "flours", count: 17, display: "Flours" },
      { key: "oilseeds", count: 5, display: "Oil Seeds" },
      { key: "spices", count: 18, display: "Spices & Herbs" },
      { key: "sweeteners", count: 10, display: "Sweeteners" },
      { key: "dryfruits", count: 5, display: "Dry Fruits" },
      { key: "coldpressed", count: 12, display: "Cold-Pressed Oils" },
      { key: "valueadded", count: 20, display: "Value-Added Products" },
    ];

    const adjectives = ["Heritage", "King", "Pure", "Rustic", "Natural", "Traditional", "Village", "Organic"];
    const riceTypes = ["Sona Masuri", "Basmati", "Red Rice", "Black Rice", "Jeera Samba", "Kalanamak", "Kolam"];
    const milletsTypes = ["Ragi", "Foxtail", "Pearl", "Little", "Kodo"];
    const pulsesTypes = ["Toor Dal", "Moong Dal", "Chana", "Urad", "Masoor"];
    const cerealsTypes = ["Oats", "Barley", "Corn", "Sorghum"];
    const floursTypes = ["Wheat", "Ragi", "Bajra", "Rice"];
    const oilseedTypes = ["Sesame", "Mustard", "Groundnut"];
    const spicesTypes = ["Turmeric", "Coriander", "Cumin", "Black Pepper"];
    const valueAdded = ["Instant Mix", "Granola", "Porridge", "Snacks", "Pickle"];

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function makeProduct(category, index) {
      const sku = `${category.key.toUpperCase().slice(0,6)}-${String(index+1).padStart(3, "0")}`;
      let nameBase = "";
      switch (category.key) {
        case "rice": nameBase = `${pick(adjectives)} ${pick(riceTypes)}`; break;
        case "millets": nameBase = `${pick(adjectives)} ${pick(milletsTypes)}`; break;
        case "pulses": nameBase = `${pick(adjectives)} ${pick(pulsesTypes)}`; break;
        case "cereals": nameBase = `${pick(adjectives)} ${pick(cerealsTypes)}`; break;
        case "flours": nameBase = `${pick(adjectives)} ${pick(floursTypes)} Flour`; break;
        case "oilseeds": nameBase = `${pick(adjectives)} ${pick(oilseedTypes)}`; break;
        case "spices": nameBase = `${pick(adjectives)} ${pick(spicesTypes)}`; break;
        case "sweeteners": nameBase = `${pick(adjectives)} Jaggery`; break;
        case "dryfruits": nameBase = `${pick(adjectives)} Almonds`; break;
        case "coldpressed": nameBase = `${pick(adjectives)} ${pick(oilseedTypes)} Oil`; break;
        case "valueadded": nameBase = `${pick(adjectives)} ${pick(valueAdded)}`; break;
        default: nameBase = `${pick(adjectives)} Product`;
      }

      const price = Math.floor(Math.random() * 400) + 50; // 50 - 449
      const mrp = Math.round(price * (1 + (Math.random() * 0.3)));
      const stock = Math.floor(Math.random() * 500);
      const unit = Math.random() > 0.6 ? "500 g" : "1 kg";

      return {
        sku,
        name: `${nameBase} - ${unit}`,
        category: category.display,
        subcategory: category.key,
        description: `Farm-sourced ${nameBase} produced organically. Pack size: ${unit}.`,
        price,
        mrp,
        stock,
        unit,
        images: ["/placeholder.png"],
        tags: [category.key],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    let total = 0;
    for (const cat of categories) {
      for (let i = 0; i < cat.count; ++i) {
        const prod = makeProduct(cat, i);
        await products.insertOne(prod);
        total++;
      }
    }

    // create indexes: text search and SKU unique
    try {
      await products.createIndex({ name: "text", description: "text", tags: 1 });
    } catch (e) {
      console.warn("Index creation warning:", e.message || e);
    }
    try {
      await products.createIndex({ sku: 1 }, { unique: true });
    } catch (e) {
      console.warn("SKU unique index warning:", e.message || e);
    }

    console.log(`Seed complete. Inserted ${total} products.`);
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    try { await client.close(); } catch {}
    process.exit(1);
  }
}

run();