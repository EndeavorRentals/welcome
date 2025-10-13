// Year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Simple SMS + mail compose from the form
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.id !== 'requestForm') return;

  e.preventDefault();

  const name = document.getElementById('name')?.value?.trim() || '';
  const phone = document.getElementById('phone')?.value?.trim() || '';
  const email = document.getElementById('email')?.value?.trim() || '';
  const vehicleClass = document.getElementById('class')?.value || '';
  const pickupDate = document.getElementById('pickupDate')?.value || '';
  const weeks = document.getElementById('weeks')?.value || '';
  const notes = document.getElementById('notes')?.value?.trim() || '';

  const parts = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    vehicleClass ? `Class: ${vehicleClass}` : null,
    pickupDate ? `Pickup: ${pickupDate}` : null,
    weeks ? `Weeks: ${weeks}` : null,
    notes ? `Notes: ${notes}` : null
  ].filter(Boolean);

  const text = encodeURIComponent(`Rental Request\n${parts.join('\n')}`);

  // Open SMS to primary number (iOS/Android will pick messaging app)
  window.location.href = `sms:+14123390109?&body=${text}`;
});

// Optional: Email button fills a mailto compose
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#emailBtn');
  if (!btn) return;

  e.preventDefault();
  const name = document.getElementById('name')?.value?.trim() || '';
  const vehicleClass = document.getElementById('class')?.value || '';
  const subject = encodeURIComponent(`Rental Request from ${name || 'Customer'}`);
  const body = encodeURIComponent(
    `Hello Endeavor,\n\nI'd like to request a rental.\n\nName: ${name}\nClass: ${vehicleClass}\n\nThank you!`
  );
  window.location.href = `mailto:info@example.com?subject=${subject}&body=${body}`;
});
