// Lightweight client-side validation + UX hints
(function () {
  const form = document.getElementById('apptForm');
  const note = document.getElementById('formNote');

  // Set sensible min date/time defaults
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const today = new Date();
  const pad = n => String(n).padStart(2, '0');
  date.min = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
  time.step = 60 * 15; // 15-minute increments

  const fields = ['name', 'phone', 'date', 'time'].map(id => document.getElementById(id));

  function setError(input, msg) {
    input.setAttribute('aria-invalid', 'true');
    input.parentElement.querySelector('.err').textContent = msg || '';
  }

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    input.parentElement.querySelector('.err').textContent = '';
  }

  fields.forEach(el => {
    el.addEventListener('input', () => clearError(el));
    el.addEventListener('blur', () => {
      if (!el.value.trim()) setError(el, 'This field is required.');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Name
    if (!fields[0].value.trim()) { setError(fields[0], 'Please enter your name.'); valid = false; }

    // Phone (simple check)
    const phone = fields[1].value.replace(/[^\d+]/g, '');
    if (!phone || phone.length < 7) { setError(fields[1], 'Enter a valid phone number.'); valid = false; }

    // Date/Time
    if (!fields[2].value) { setError(fields[2], 'Choose a date.'); valid = false; }
    if (!fields[3].value) { setError(fields[3], 'Choose a time.'); valid = false; }

    if (!valid) {
      note.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // Success UX (replace with real submit as needed)
    note.textContent = 'Thanks! Your appointment request has been recorded. We will contact you shortly.';
    form.reset();
  });
})();
