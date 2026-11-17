// Galerie cu paginare: 21 de poze pe pagină, schimbare de pagină fără reîncărcare.
// Lista pozelor se editează în js/poze-galerie.js (nu aici).

jQuery(function($) {

  "use strict";

  var POZE_PE_PAGINA = 21;
  var ALT_POZA = "Bonsai - Bucharest Bonsai Association";

  // encodeURI: numele de fișiere pot conține spații (ex. "img 1.jpg").
  var poze = (window.POZE_GALERIE || []).filter(Boolean).map(encodeURI);
  var $grid = $('#gallery-grid');
  var $paginare = $('#gallery-pagination');
  var totalPagini = Math.max(1, Math.ceil(poze.length / POZE_PE_PAGINA));
  var paginaCurenta = 1;

  // Lightbox-ul trece prin TOATE pozele, nu doar prin cele din pagina curentă.
  var pozeLightbox = poze.map(function(src) {
    return { src: src, type: 'image' };
  });

  function afiseazaPagina(pagina) {
    paginaCurenta = pagina;
    var start = (pagina - 1) * POZE_PE_PAGINA;
    var html = '';

    poze.slice(start, start + POZE_PE_PAGINA).forEach(function(src, i) {
      html +=
        '<div class="col-6 col-md-6 col-lg-4 gallery-fade">' +
          '<a href="' + src + '" class="d-block photo-item" data-index="' + (start + i) + '">' +
            '<img src="' + src + '" alt="' + ALT_POZA + '" class="img-fluid" loading="lazy">' +
            '<div class="photo-text-more"><span class="icon icon-search"></span></div>' +
          '</a>' +
        '</div>';
    });

    $grid.html(html);
    afiseazaPaginare();
  }

  // Numerotare ca la blog: 1 2 3 ... 7 (pagina curentă gri, restul link-uri).
  function afiseazaPaginare() {
    if (totalPagini <= 1) {
      $paginare.empty();
      return;
    }

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

  // La schimbarea paginii, ducem vizitatorul la începutul galeriei.
  function mergiLaGalerie() {
    var offsetHeader = $(window).width() < 992 ? 70 : 0;
    $('html, body').animate({
      scrollTop: $('#section-photos').offset().top - offsetHeader
    }, 500);
  }

  $paginare.on('click', 'a[data-pagina]', function(e) {
    e.preventDefault();
    afiseazaPagina(parseInt($(this).data('pagina'), 10));
    mergiLaGalerie();
  });

  $grid.on('click', '.photo-item', function(e) {
    e.preventDefault();
    $.fancybox.open(pozeLightbox, {
      loop: true,
      buttons: ['zoom', 'slideShow', 'fullScreen', 'close']
    }, parseInt($(this).data('index'), 10));
  });

  afiseazaPagina(1);
});
