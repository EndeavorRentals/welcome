// Lightweight JS for SMS/Email prefills + year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const form = document.getElementById('requestForm');
const emailBtn = document.getElementById('emailBtn');

function buildMessage(data){
  return [
    `New rental request: ${data.vehicleClass}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Pickup: ${data.pickupDate}`,
    `Weeks: ${data.weeks}`,
    data.notes ? `Notes: ${data.notes}` : null
  ].filter(Boolean).join('\n');
}

function encodeBody(s){ return encodeURIComponent(s); }

if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if(!document.getElementById('agree').checked) return;
    const body = encodeBody(buildMessage(data));
    // SMS deep link (iOS & Android)
    const smsNumber = '+14123390109';
    const smsHref = /iPhone|iPad|iPod/i.test(navigator.userAgent) ?
      `sms:${smsNumber}&body=${body}` :
      `sms:${smsNumber}?body=${body}`;
    window.location.href = smsHref;
  });
}

if (emailBtn && form){
  emailBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const body = encodeBody(buildMessage(data));
    const subject = encodeURIComponent('New Rental Request');
    // Replace with your real inbox in README
    const to = 'endeavorrentals@example.com';
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
/* ---------------- Inventory with real stock photos ---------------- */
function stockImg({year, make, model, color, seed}) {
  // Pulls a real, license-free Unsplash image by keywords
  // ?sig makes it stable so it doesn't change every load
  const q = `${year} ${make} ${model} ${color}`.trim();
  return `https://source.unsplash.com/800x500/?${encodeURIComponent(q)}&sig=${seed}`;
}

const inventory = [
  {year:2007, make:"Honda",   model:"Accord",        color:"Silver"},
  {year:2005, make:"Nissan",  model:"Altima",        color:"Green"},
  {year:2010, make:"Nissan",  model:"Altima",        color:"White"},
  {year:2012, make:"Chevy",   model:"Traverse",      color:"Navy"},
  {year:2009, make:"Chevy",   model:"Impala",        color:"Red"},
  {year:2010, make:"Cadillac",model:"Deville",       color:"Silver"},
  {year:2014, make:"Chrysler",model:"Town & Country",color:"Navy"},
  {year:2005, make:"Chevy",   model:"Cruze",         color:"Silver"},
  {year:2015, make:"Chevy",   model:"Cruze",         color:"Navy"},
  {year:2005, make:"Ford",    model:"Escape",        color:""},
  {year:2015, make:"Subaru",  model:"Forester",      color:"White"},
  {year:2013, make:"Chevy",   model:"Impala",        color:"Black"},
  {year:2015, make:"Chevy",   model:"Impala",        color:"Silver"},
  {year:2014, make:"Honda",   model:"Insight",       color:"Grey"},
  {year:2009, make:"Honda",   model:"Civic",         color:"Silver"},
  {year:2011, make:"Toyota",  model:"Prius",         color:"White"},
].map((v, i) => ({
  ...v,
  img: stockImg({...v, seed: i+1}),
  status: "Available",
}));

function guessClass(v){
  const m = (v.model || '').toLowerCase();
  if (['traverse','forester','escape'].some(x=>m.includes(x))) return 'SUV';
  if (m.includes('town') || m.includes('country')) return 'Minivan';
  if (['prius','insight'].some(x=>m.includes(x))) return 'Hybrid';
  if (['civic','cruze'].some(x=>m.includes(x))) return 'Compact';
  if (['accord','altima','impala','deville'].some(x=>m.includes(x))) return 'Full Size';
  return 'Vehicle';
}

function renderInventory(list){
  const grid = document.getElementById('inventoryGrid');
  if(!grid) return;
  grid.innerHTML = '';
  list.forEach(v=>{
    const card = document.createElement('div');
    card.className = 'card vehicle-card';
    card.innerHTML = `
      <img src="${v.img}" alt="${v.year} ${v.make} ${v.model}">
      <h3>${v.year} ${v.make} ${v.model}</h3>
      <p class="note">${v.color || '—'} • ${guessClass(v)}</p>
      <p class="status ${v.status.toLowerCase()}">${v.status}</p>
      <button class="button" data-vehicle="${v.year} ${v.make} ${v.model} ${v.color ? '('+v.color+')' : ''}">Request This Car</button>
    `;
    grid.appendChild(card);
  });

  // Hook up "Request This Car" buttons
  grid.querySelectorAll('button[data-vehicle]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const vehicle = btn.getAttribute('data-vehicle');
      const notes = document.getElementById('notes');
      if (notes) notes.value = `Requesting: ${vehicle}`;
      location.hash = '#book';
    });
  });
}

// search + sort
function applyInventoryFilters(){
  const q = (document.getElementById('invSearch')?.value || '').trim().toLowerCase();
  const sort = document.getElementById('invSort')?.value || 'year_desc';

  let list = inventory.filter(v=>{
    const hay = `${v.year} ${v.make} ${v.model} ${v.color}`.toLowerCase();
    return hay.includes(q);
  });

  const cmp = {
    'year_desc': (a,b)=> b.year - a.year,
    'year_asc' : (a,b)=> a.year - b.year,
    'make_az'  : (a,b)=> (a.make+a.model).localeCompare(b.make+b.model),
    'make_za'  : (a,b)=> (b.make+b.model).localeCompare(a.make+a.model),
  }[sort];
  list.sort(cmp);

  renderInventory(list);
}

window.addEventListener('DOMContentLoaded', ()=>{
  renderInventory(inventory);
  document.getElementById('invSearch')?.addEventListener('input', applyInventoryFilters);
  document.getElementById('invSort')?.addEventListener('change', applyInventoryFilters);
});
/* -------------- end Inventory -------------- */
