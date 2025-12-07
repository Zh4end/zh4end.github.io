var tvtad = ''
$(document).ready(function () {
  if (window.location.hostname == zhaendblog) {
    $('#zh-zhaend').addClass('disabled')
    $('head').append(xlha)
    $('.btn-chonanh').length !== 0 &&
      ($('head').append(cssCrop),
      $('body').append("<input class='cropanh d-none' value=''>"))
    var _0x4fc5ed = $('.cropanh'),
      _0x2986bc = $('.zh-in-text1'),
      _0x370a91 = $('.zh-in-text2'),
      _0x264cbc = $('.zh-in-text3'),
      _0x4a6b88 = $('.zh-in-texta')
    $('#cropanh').click(function () {
      $('.cropanh').val(1)
      _0x1580c5()
    })
    _0x2986bc.on('input', function () {
      _0x1580c5()
    })
    _0x370a91.on('input', function () {
      _0x1580c5()
    })
    _0x264cbc.on('input', function () {
      _0x1580c5()
    })
    _0x4a6b88.on('input', function () {
      _0x1580c5()
    })
    function _0x1580c5() {
      if (undefined !== _0x4fc5ed.val() && _0x4fc5ed.val().length == '') {
        $('#zh-zhaend').addClass('disabled')
      } else {
        if (undefined !== _0x2986bc.val() && _0x2986bc.val().length == 0) {
          $('#zh-zhaend').addClass('disabled')
        } else {
          if (undefined !== _0x370a91.val() && _0x370a91.val().length == 0) {
            $('#zh-zhaend').addClass('disabled')
          } else {
            if (undefined !== _0x264cbc.val() && _0x264cbc.val().length == 0) {
              $('#zh-zhaend').addClass('disabled')
            } else {
              undefined !== _0x4a6b88.val() && _0x4a6b88.val().length == 0
                ? $('#zh-zhaend').addClass('disabled')
                : $('#zh-zhaend').removeClass('disabled')
            }
          }
        }
      }
    }
    $('#zh-zhaend').click(function () {
      $('.btn-chonanh').length !== 0 && $('#cropanh').click()
      $('#zh-zhaend')
        .addClass('disabled')
        .html(
          "<span class='spinner-border spinner-border-sm'></span> Creando foto..."
        )
      $('#img-out').hide()
      t0 = $('.zh-in-text0').val()
      $('.zh-out-text0').html(t0)
      t1 = $('.zh-in-text1').val()
      $('.zh-out-text1').html(t1)
      t2 = $('.zh-in-text2').val()
      $('.zh-out-text2').html(t2)
      t3 = $('.zh-in-text3').val()
      $('.zh-out-text3').html(t3)
      ta = $('.zh-in-texta').val()
      ta && $('.zh-out-texta').html(ta.replace(/\r?\n/g, '</div><div>'))
      html2canvas(document.querySelector('.zhaend-main'), {
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        width: rongh2,
        height: daih2,
        scale: 1,
        x: 0,
        y: 0,
      }).then(function (_0x960e6c) {
        zhUpload(_0x960e6c)
      })
    })
    $('.btn-chonanh').length !== 0 &&
      (window.onload = function () {
        var _0x3e8cf4 = window.Cropper,
          _0x12d3ed = window.URL || window.webkitURL,
          _0x3bfe9e = document.querySelector('.img-container'),
          _0x3cf678 = _0x3bfe9e.getElementsByTagName('img').item(0),
          _0xe05756 = document.getElementById('actions'),
          _0x3edf10 = {
            aspectRatio: tyle,
            viewMode: vmode,
            preview: '.img-previa',
            autoCrop: true,
            strict: true,
            background: true,
            autoCropArea: 1,
          },
          _0x5cc9e9 = new _0x3e8cf4(_0x3cf678, _0x3edf10),
          _0x58bdb3 = _0x3cf678.src,
          _0x2872c0 = 'image/jpeg',
          _0x3c320d
        !document.createElement('canvas').getContext &&
          $('button[data-method="getCroppedCanvas"]').prop('disabled', true)
        typeof document.createElement('cropper').style.transition ===
          'undefined' &&
          ($('button[data-method="rotate"]').prop('disabled', true),
          $('button[data-method="scale"]').prop('disabled', true))
        _0xe05756.querySelector('.docs-buttons').onclick = function (
          _0x2b344e
        ) {
          var _0x31821c = _0x2b344e || window.event,
            _0x16b22e = _0x31821c.target || _0x31821c.srcElement,
            _0x458a5f,
            _0x42e524,
            _0x319a64,
            _0x100165
          if (!_0x5cc9e9) {
            return
          }
          while (_0x16b22e !== this) {
            if (_0x16b22e.getAttribute('data-method')) {
              break
            }
            _0x16b22e = _0x16b22e.parentNode
          }
          if (
            _0x16b22e === this ||
            _0x16b22e.disabled ||
            _0x16b22e.className.indexOf('disabled') > -1
          ) {
            return
          }
          _0x100165 = {
            method: _0x16b22e.getAttribute('data-method'),
            target: _0x16b22e.getAttribute('data-target'),
            option: _0x16b22e.getAttribute('data-option') || undefined,
            secondOption:
              _0x16b22e.getAttribute('data-second-option') || undefined,
          }
          _0x458a5f = _0x5cc9e9.cropped
          if (_0x100165.method) {
            if (typeof _0x100165.target !== 'undefined') {
              _0x319a64 = document.querySelector(_0x100165.target)
              if (
                !_0x16b22e.hasAttribute('data-option') &&
                _0x100165.target &&
                _0x319a64
              ) {
                try {
                  _0x100165.option = JSON.parse(_0x319a64.value)
                } catch (_0x5973ec) {
                  console.log(_0x5973ec.message)
                }
              }
            }
            switch (_0x100165.method) {
              case 'rotate':
                _0x458a5f && _0x5cc9e9.clear()
                break
              case 'getCroppedCanvas':
                try {
                  _0x100165.option = JSON.parse(_0x100165.option)
                } catch (_0x2a201c) {
                  console.log(_0x2a201c.message)
                }
                _0x2872c0 === 'image/jpeg' &&
                  (!_0x100165.option && (_0x100165.option = {}),
                  (_0x100165.option.fillColor = '#fff'))
                break
            }
            _0x42e524 = _0x5cc9e9[_0x100165.method](
              _0x100165.option,
              _0x100165.secondOption
            )
            switch (_0x100165.method) {
              case 'rotate':
                _0x458a5f && _0x5cc9e9.crop()
                break
              case 'scaleX':
              case 'scaleY':
                _0x16b22e.setAttribute('data-option', -_0x100165.option)
                break
              case 'getCroppedCanvas':
                _0x42e524 && $('.anhdacat').html(_0x42e524)
                break
              case 'destroy':
                _0x5cc9e9 = null
                _0x3c320d &&
                  (_0x12d3ed.revokeObjectURL(_0x3c320d),
                  (_0x3c320d = ''),
                  (_0x3cf678.src = _0x58bdb3))
                break
            }
            if (
              typeof _0x42e524 === 'object' &&
              _0x42e524 !== _0x5cc9e9 &&
              _0x319a64
            ) {
              try {
                _0x319a64.value = JSON.stringify(_0x42e524)
              } catch (_0x474857) {
                console.log(_0x474857.message)
              }
            }
          }
        }
        document.body.onkeydown = function (_0x5e1d4d) {
          var _0x479038 = _0x5e1d4d || window.event
          if (!_0x5cc9e9 || this.scrollTop > 300) {
            return
          }
          switch (_0x479038.keyCode) {
            case 37:
              _0x479038.preventDefault(), _0x5cc9e9.move(-1, 0)
              break
            case 38:
              _0x479038.preventDefault(), _0x5cc9e9.move(0, -1)
              break
            case 39:
              _0x479038.preventDefault(), _0x5cc9e9.move(1, 0)
              break
            case 40:
              _0x479038.preventDefault(), _0x5cc9e9.move(0, 1)
              break
          }
        }
        $('.cropanh-container').hide()
        var _0x26470f = document.getElementById('inputImage')
        _0x12d3ed
          ? (_0x26470f.onchange = function () {
              var _0x13d1d8 = this.files,
                _0x108b5b
              _0x5cc9e9 &&
                _0x13d1d8 &&
                _0x13d1d8.length &&
                ((_0x108b5b = _0x13d1d8[0]),
                /^image\/\w+/.test(_0x108b5b.type)
                  ? ((_0x2872c0 = _0x108b5b.type),
                    _0x3c320d && _0x12d3ed.revokeObjectURL(_0x3c320d),
                    (_0x3cf678.src = _0x3c320d =
                      _0x12d3ed.createObjectURL(_0x108b5b)),
                    _0x5cc9e9.destroy(),
                    (_0x5cc9e9 = new _0x3e8cf4(_0x3cf678, _0x3edf10)),
                    (_0x26470f.value = null),
                    $('.cropanh').val(1),
                    _0x1580c5(),
                    $('.cropanh-container').show(),
                    $('.btn-upanh span,.btn-chonanh').html(
                      "<i class='fas fa-upload'></i> Elige otra foto"
                    ))
                  : window.alert('Selecciona un archivo de imagen'))
            })
          : ((_0x26470f.disabled = true),
            (_0x26470f.parentNode.className += ' disabled'))
      })
  }
})
