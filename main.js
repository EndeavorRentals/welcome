// ------------------- Utility: Update Year in Footer -------------------
window.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ------------------- Text Request Form -------------------
const form = document.getElementById("requestForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const vehicleClass = document.getElementById("class").value;
    const weeks = document.getElementById("weeks").value;
    const notes = document.getElementById("notes").value.trim();

    const msg =
      `Request from ${name}:\n` +
      `Phone: ${phone}\n` +
      `Vehicle: ${vehicleClass}\n` +
      `Weeks: ${weeks}\n` +
      (notes ? `Notes: ${notes}\n` : "") +
      `- Sent from Endeavor Car Rentals`;

    const sms = `sms:+14123390109?&body=${encodeURIComponent(msg)}`;
    window.location.href = sms;
  });
}

// ------------------- Email Button -------------------
const emailBtn = document.getElementById("emailBtn");
if (emailBtn) {
  emailBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Endeavor Car Request");
    const body = encodeURIComponent("Hi Endeavor Team,\n\nI’d like to request a car rental.\n\nThanks!");
    window.location.href = `mailto:endeavor@example.com?subject=${subject}&body=${body}`;
  });
}

// ------------------- Inventory Section -------------------

// Static Unsplash stock images mapped by make/model
function stockImg({ make, model }) {
  const key = `${make} ${model}`.toLowerCase();
  const samples = {
    "honda accord": "https://images.unsplash.com/photo-1606674537140-b13a1b6d3ec5?auto=format&fit=crop&w=800&q=80",
    "nissan altima": "https://images.unsplash.com/photo-1600267151384-44c9d7cf89a0?auto=format&fit=crop&w=800&q=80",
    "chevy impala": "https://images.unsplash.com/photo-1597009491148-b08b5b83f26f?auto=format&fit=crop&w=800&q=80",
    "honda civic": "https://images.unsplash.com/photo-1592853625601-989e35e2e46b?auto=format&fit=crop&w=800&q=80",
    "toyota prius": "https://images.unsplash.com/photo-1602863893093-03460e25cf8d?auto=format&fit=crop&w=800&q=80",
    "chevy traverse": "https://images.unsplash.com/photo-1625694552947-9288d035d5f8?auto=format&fit=crop&w=800&q=80",
    "ford escape": "https://images.unsplash.com/photo-1602862131545-035c8f9f9c04?auto=format&fit=crop&w=800&q=80",
    "subaru forester": "https://images.unsplash.com/photo-1630690439228-4975cbf438e9?auto=format&fit=crop&w=800&q=80",
    "cadillac deville": "https://images.unsplash.com/photo-1611659141633-2473b9fdbb47?auto=format&fit=crop&w=800&q=80",
    "honda insight": "https://images.unsplash.com/photo-1625561756903-c40b58e16f38?auto=format&fit=crop&w=800&q=80",
    "chevy cruze": "https://images.unsplash.com/photo-1563720226105-7c69b92e2b05?auto=format&fit=crop&w=800&q=80",
    "chrysler town & country": "https://images.unsplash.com/photo-1622624906425-0b52d5b14383?auto=format&fit=crop&w=800&q=80",
  };
  return samples[key] || "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80";
}

// Full Inventory List
const inventory = [
  { year: 2007, make: "Honda", model: "Accord", color: "Silver" },
  { year: 2005, make: "Nissan", model: "Altima", color: "Green" },
  { year: 2010, make: "Nissan", model: "Altima", color: "White" },
  { year: 2012, make: "Chevy", model: "Traverse", color: "Navy" },
  { year: 2009, make: "Chevy", model: "Impala", color: "Red" },
  { year: 2010, make: "Cadillac", model: "Deville", color: "Silver" },
  { year: 2014, make: "Chrysler", model: "Town & Country", color: "Navy" },
  { year: 2005, make: "Chevy", model: "Cruze", color: "Silver" },
  { year: 2015, make: "Chevy", model: "Cruze", color: "Navy" },
  { year: 2005, make: "Ford", model: "Escape", color: "Grey" },
  { year: 2015, make: "Subaru", model: "Forester", color: "White" },
  { year: 2013, make: "Chevy", model: "Impala", color: "Black" },
  { year: 2015, make: "Chevy", model: "Impala", color: "Silver" },
  { year: 2014, make: "Honda", model: "Insight", color: "Grey" },
  { year: 2009, make: "Honda", model: "Civic", color: "Silver" },
  { year: 2011, make: "Toyota", model: "Prius", color: "White" },
].map((v, i) => ({
  ...v,
  img: stockImg(v),
  status: "Available",
}));

function guessClass(v) {
  const m = (v.model || "").toLowerCase();
  if (["traverse", "forester", "escape"].some((x) => m.includes(x))) return "SUV";
  if (m.includes("town") || m.includes("country")) return "Minivan";
  if (["prius", "insight"].some((x) => m.includes(x))) return "Hybrid";
  if (["civic", "cruze"].some((x) => m.includes(x))) return "Compact";
  if (["accord", "altima", "impala", "deville"].some((x) => m.includes(x))) return "Full Size";
  return "Vehicle";
}

function renderInventory(list) {
  const grid = document.getElementById("inventoryGrid");
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach((v) => {
    const card = document.createElement("div");
    card.className = "card vehicle-card";
    card.innerHTML = `
      <img src="${v.img}" alt="${v.year} ${v.make} ${v.model}" loading="lazy" style="border-radius:8px;">
      <h3>${v.year} ${v.make} ${v.model}</h3>
      <p class="note">${v.color || "—"} • ${guessClass(v)}</p>
      <p class="status ${v.status.toLowerCase()}">${v.status}</p>
      <button class="button" data-vehicle="${v.year} ${v.make} ${v.model} ${v.color ? "(" + v.color + ")" : ""}">Request This Car</button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("button[data-vehicle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const vehicle = btn.getAttribute("data-vehicle");
      const notes = document.getElementById("notes");
      if (notes) notes.value = `Requesting: ${vehicle}`;
      location.hash = "#book";
    });
  });
}

function applyInventoryFilters() {
  const q = (document.getElementById("invSearch")?.value || "").trim().toLowerCase();
  const sort = document.getElementById("invSort")?.value || "year_desc";

  let list = inventory.filter((v) => {
    const hay = `${v.year} ${v.make} ${v.model} ${v.color}`.toLowerCase();
    return hay.includes(q);
  });

  const cmp = {
    year_desc: (a, b) => b.year - a.year,
    year_asc: (a, b) => a.year - b.year,
    make_az: (a, b) => (a.make + a.model).localeCompare(b.make + b.model),
    make_za: (a, b) => (b.make + b.model).localeCompare(a.make + a.model),
  }[sort];
  list.sort(cmp);

  renderInventory(list);
}

window.addEventListener("DOMContentLoaded", () => {
  renderInventory(inventory);
  document.getElementById("invSearch")?.addEventListener("input", applyInventoryFilters);
  document.getElementById("invSort")?.addEventListener("change", applyInventoryFilters);
});
