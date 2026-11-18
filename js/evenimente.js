// Paginare pentru secțiunea „Evenimente”.
// Articolele stau în index.html (fiecare bloc cu clasa "event-item"), cele mai noi sus.
// Numerotarea se face singură după numărul de articole: 3 articole → doar pagina „1”.

jQuery(function($) {

  "use strict";

  var ARTICOLE_PE_PAGINA = 3;

  var $articole = $('#section-blog .event-item');
  var $paginare = $('#events-pagination');
  var totalPagini = Math.max(1, Math.ceil($articole.length / ARTICOLE_PE_PAGINA));
  var paginaCurenta = 1;

  function afiseazaPagina(pagina) {
    paginaCurenta = pagina;
    var start = (pagina - 1) * ARTICOLE_PE_PAGINA;

    $articole.each(function(i) {
      $(this).toggleClass('d-none', i < start || i >= start + ARTICOLE_PE_PAGINA);
    });

    afiseazaPaginare();
    if (window.AOS) AOS.refresh();
  }

  // Aceeași numerotare ca la galerie: 1 2 3 ... 7 (pagina curentă gri, restul link-uri).
  function afiseazaPaginare() {
    var pagini = [];
    if (totalPagini <= 7) {
      for (var p = 1; p <= totalPagini; p++) pagini.push(p);
    } else {
      pagini.push(1);
      if (paginaCurenta > 3) pagini.push('...');
      for (var q = Math.max(2, paginaCurenta - 1); q <= Math.min(totalPagini - 1, paginaCurenta + 1); q++) pagini.push(q);
      if (paginaCurenta < totalPagini - 2) pagini.push('...');
      pagini.push(totalPagini);
    }

    $paginare.html(pagini.map(function(p) {
      if (p === '...') return '<span>...</span>';
      if (p === paginaCurenta) return '<span aria-current="page">' + p + '</span>';
      return '<a href="#" data-pagina="' + p + '">' + p + '</a>';
    }).join(''));
  }

  $paginare.on('click', 'a[data-pagina]', function(e) {
    e.preventDefault();
    afiseazaPagina(parseInt($(this).data('pagina'), 10));
    var offsetHeader = $(window).width() < 992 ? 70 : 0;
    $('html, body').animate({ scrollTop: $('#section-blog').offset().top - offsetHeader }, 500);
  });

  afiseazaPagina(1);
});
