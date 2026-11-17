// Construiește cardurile din secțiunea „Membri” pe baza listei din js/membri.js.
// Trebuie încărcat ÎNAINTE de main.js, ca să existe cardurile când pornește caruselul.

(function() {

  "use strict";

  var carusel = document.getElementById('members-carousel');
  if (!carusel) return;

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Inițialele din nume, pentru membrii fără poză (ex. „Teo Tibar” → „TT”).
  function initiale(nume) {
    return String(nume || '').trim().split(/\s+/).map(function(cuvant) {
      return cuvant.charAt(0);
    }).slice(0, 2).join('').toUpperCase();
  }

  carusel.innerHTML = (window.MEMBRI || []).filter(Boolean).map(function(m) {
    var nume = escapeHtml(m.nume);
    var avatar = m.poza
      ? '<img src="' + escapeHtml(encodeURI(m.poza)) + '" alt="' + nume + '" class="mx-auto img-fluid w-25 rounded-circle">'
      : '<span class="member-initials" aria-hidden="true">' + escapeHtml(initiale(m.nume)) + '</span>';
    return '' +
      '<div class="testimony text-center px-md-4">' +
        '<figure class="mx-auto d-inline-block">' + avatar + '</figure>' +
        '<p class="text-white"><strong>' + nume + '</strong></p>' +
        (m.text ? '<blockquote><p>&ldquo;' + escapeHtml(m.text) + '&rdquo;</p></blockquote>' : '') +
      '</div>';
  }).join('');

})();
