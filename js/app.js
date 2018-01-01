function begin() {
  // contenedor principal
  var $container = $('.container-search');

  $('input').prop('disabled', true);

  // funcion para mostrar los restaurantes
  function showPoints() {
    var str = '';
    var template = '<figure>' +
      '<img class="img-fluid" src="__img__" alt="__alt__" data-pos="__pos__">' +
      '</figure>';

    $container.html('');

    for (var i = 0; i < data.length; i++) {
      str += template
        .replace('__img__', data[i].img)
        .replace('__alt__', data[i].eslogan)
        .replace('__pos__', i);
    }
    $container.html(str);
  }
  // llamada de la funcion para mostrar las imagenes
  showPoints();
}

$(document).ready(begin);

$(window).on('load', function() {
  $('input').prop('disabled', false);

  // algún efecto con mouseover
  $('.container-search img').on('mouseover', function() {
    $(this).fadeOut().fadeIn();
  });

  // despliegue del modal
  $('.container-search img').on('click', modalDetail);

  // filtro de restaurantes
  $('#search').on('keyup', search);

  function modalDetail() {
    var $modal = $('#exampleModalCenter');
    var element = data[parseInt($(this).data('pos'))];

    $modal.find('#exampleModalLongTitle').text(element.nombre);
    $modal.find('h3').text($(this).attr('alt'));

    var $address = $modal.find('.detail-js').children().eq(0).children().first();
    var $other = $modal.find('.detail-js').children().eq(0).children().last();

    $address.text(element.direccion);
    $other.text(element.precios);

    $modal.modal('show');
  }

  // filtramos la selección
  function search() {
    if ($(this).val()) {
      $('.container-search img').each(function(index) {
        if (!data[index].tags.match($('input').val())) {
          $(this).hide();
        }
      });
    } else {
      $('.container-search img').show();
    }
  }
});
