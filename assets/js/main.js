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