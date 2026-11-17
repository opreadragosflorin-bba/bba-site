// Trimite formularul de contact către Netlify Forms fără să părăsească pagina.
// Mesajele ajung în Netlify → Forms → „contact” (și pe email, dacă e activată notificarea).

(function() {

  "use strict";

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('contact-status');
  var buton = form.querySelector('[type="submit"]');

  function arataMesaj(text, culoare) {
    status.textContent = text;
    status.style.color = culoare;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Deschis direct de pe calculator (file://) nu există server care să primească mesajul.
    if (location.protocol === 'file:') {
      arataMesaj('Formularul funcționează doar pe site-ul publicat (Netlify), nu deschis local.', '#e0a800');
      return;
    }

    buton.disabled = true;
    arataMesaj('Se trimite...', '#ccc');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function(r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        arataMesaj('Mulțumim! Mesajul a fost trimis, revenim în curând.', '#8bc34a');
      })
      .catch(function() {
        arataMesaj('Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne pe Facebook.', '#df0e62');
      })
      .then(function() {
        buton.disabled = false;
      });
  });

})();
