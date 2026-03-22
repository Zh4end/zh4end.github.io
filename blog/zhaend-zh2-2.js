let tvtad = '';
// === Script principal sin jQuery, compatible con Bootstrap 5 ===

document.addEventListener('DOMContentLoaded', function () {

  // Verifica si el dominio actual coincide con el configurado
  if (window.location.hostname === zhaendblog) {

    // Desactiva botón principal al inicio
    const btnGenerar = document.querySelector('#zh-zhaend');
    btnGenerar.classList.add('disabled');

    // Inserta estilos o scripts requeridos
    // document.head.insertAdjacentHTML('beforeend', xlha);

    // Si existe botón para seleccionar imagen, agrega estilos y campo oculto
    if (document.querySelector('.btn-chonanh')) {
      document.head.insertAdjacentHTML('beforeend', cssCrop);
      document.body.insertAdjacentHTML('beforeend', "<input class='cropanh d-none' value=''>");
    }

    // === Variables principales ===
    const cropInput = document.querySelector('.cropanh');
    const inputText0 = document.querySelector('.zh-in-text0');
    const inputText1 = document.querySelector('.zh-in-text1');
    const inputText2 = document.querySelector('.zh-in-text2');
    const inputText3 = document.querySelector('.zh-in-text3');
    const inputTextarea = document.querySelector('.zh-in-texta');

    // === Función de validación para habilitar/deshabilitar botón ===
    function validarCampos() {
        // Checa si al menos uno tiene contenido
        const hayTexto = 
        (cropInput?.value || '').trim() ||
        (inputText0?.value || '').trim() ||
        (inputText1?.value || '').trim() ||
        (inputText2?.value || '').trim() ||
        (inputText3?.value || '').trim() ||
        (inputTextarea?.value || '').trim();
        
        if (hayTexto) {
            // Habilita botón y limpia texto dentro
            btnGenerar.classList.remove('disabled');
            //btnGenerar.innerHTML = "<i class='fas fa-cut'></i>"; // elimina texto, deja solo el icono
        } else {
            // Deshabilita botón y restaura texto original
            btnGenerar.classList.add('disabled');
            //btnGenerar.innerHTML = "<i class='fas fa-cut'></i> Crear Placa";
        }
    }

    // === Asignar eventos de entrada ===
    const cropBtn = document.querySelector('#cropanh');
    if (cropBtn) {
      cropBtn.addEventListener('click', () => {
        cropInput.value = 1;
        validarCampos();
      });
    }

    [inputText1, inputText2, inputText3, inputTextarea].forEach(el => {
      el?.addEventListener('input', validarCampos);
    });

    // === Acción principal: generar imagen ===
    btnGenerar.addEventListener('click', function () {
      if (document.querySelector('.btn-chonanh')) cropBtn?.click();

      btnGenerar.classList.add('disabled');
      btnGenerar.innerHTML = "<span class='spinner-border spinner-border-sm'></span> Creando foto...";

      const imgOut = document.querySelector('#img-out');
      if (imgOut) imgOut.style.display = 'none';

      // Copiar los textos al área de salida
      const textMap = [
        { input: '.zh-in-text0', output: '.zh-out-text0' },
        { input: '.zh-in-text1', output: '.zh-out-text1' },
        { input: '.zh-in-text2', output: '.zh-out-text2' },
        { input: '.zh-in-text3', output: '.zh-out-text3' },
        { input: '.zh-in-texta', output: '.zh-out-texta', isArea: true },
      ];

      textMap.forEach(({ input, output, isArea }) => {
        const inEl = document.querySelector(input);
        const outEl = document.querySelector(output);
        if (inEl && outEl) {
          outEl.innerHTML = isArea
            ? inEl.value.replace(/\r?\n/g, '</div><div>')
            : inEl.value;
        }
      });

      // Captura el contenedor con html2canvas
      html2canvas(document.querySelector('.zhaend-main'), {
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        width: rongh2,
        height: daih2,
        scale: 1,
      }).then(canvasFinal => {
        zhUpload(canvasFinal); // Subir o mostrar imagen generada
      });
    });

    // === Inicializar Cropper.js si existe botón de imagen ===
    if (document.querySelector('.btn-chonanh')) {
      window.onload = function () {
        const CropperClass = window.Cropper;
        const URLClass = window.URL || window.webkitURL;
        const imgContainer = document.querySelector('.img-container');
        const imageElement = imgContainer.querySelector('img');
        const actionsElement = document.getElementById('actions');
        const cropOptions = {
          aspectRatio: tyle,
          viewMode: vmode,
          preview: '.img-preview',
          autoCrop: true,
          strict: true,
          background: true,
          autoCropArea: 1,
        };

        let cropper = new CropperClass(imageElement, cropOptions);
        const originalSrc = imageElement.src;
        let imgType = 'image/jpeg';
        let currentURL;

        // Desactivar funciones si no hay soporte de canvas o transición
        if (!document.createElement('canvas').getContext) {
          document.querySelectorAll('button[data-method="getCroppedCanvas"]').forEach(btn => btn.disabled = true);
        }
        if (typeof document.createElement('cropper').style.transition === 'undefined') {
          document.querySelectorAll('button[data-method="rotate"], button[data-method="scale"]').forEach(btn => btn.disabled = true);
        }

        // === Control de botones de Cropper ===
        const buttonsContainer = actionsElement.querySelector('.docs-buttons');
        buttonsContainer.onclick = function (event) {
          let target = event.target;
          while (target && !target.getAttribute('data-method')) {
            target = target.parentNode;
          }
          if (!target || target.disabled || target.classList.contains('disabled')) return;

          const method = target.getAttribute('data-method');
          let option = target.getAttribute('data-option');
          const secondOption = target.getAttribute('data-second-option');
          const targetSelector = target.getAttribute('data-target');
          let targetInput;

          if (targetSelector) targetInput = document.querySelector(targetSelector);
          if (targetInput && !target.hasAttribute('data-option')) {
            try { option = JSON.parse(targetInput.value); } catch { }
          }

          const isCropped = cropper.cropped;
          if (method === 'rotate' && isCropped) cropper.clear();

          if (method === 'getCroppedCanvas') {
            try { option = JSON.parse(option); } catch { }
            if (imgType === 'image/jpeg') {
              if (!option) option = {};
              option.fillColor = '#fff';
            }
          }

          const result = cropper[method](option, secondOption);

          switch (method) {
            case 'rotate':
              if (isCropped) cropper.crop();
              break;
            case 'scaleX':
            case 'scaleY':
              target.setAttribute('data-option', -option);
              break;
            case 'getCroppedCanvas':
              if (result) document.querySelector('.anhdacat').innerHTML = '';
              if (result) document.querySelector('.anhdacat').appendChild(result);
              break;
            case 'destroy':
              cropper = null;
              if (currentURL) {
                URLClass.revokeObjectURL(currentURL);
                currentURL = '';
                imageElement.src = originalSrc;
              }
              break;
          }

          if (typeof result === 'object' && result !== cropper && targetInput) {
            try { targetInput.value = JSON.stringify(result); } catch { }
          }
        };

        // === Mover imagen con teclas de flecha ===
        document.body.addEventListener('keydown', function (e) {
          if (!cropper || document.documentElement.scrollTop > 300) return;
          switch (e.keyCode) {
            case 37: e.preventDefault(); cropper.move(-1, 0); break;
            case 38: e.preventDefault(); cropper.move(0, -1); break;
            case 39: e.preventDefault(); cropper.move(1, 0); break;
            case 40: e.preventDefault(); cropper.move(0, 1); break;
          }
        });

        // Oculta contenedor de recorte inicial
        const cropContainer = document.querySelector('.cropanh-container');
        if (cropContainer) cropContainer.style.display = 'none';

        // === Input de imagen ===
        const imgInput = document.getElementById('inputImage');
        if (URLClass) {
          imgInput.addEventListener('change', function () {
            const files = this.files;
            if (!files || !files.length) return;

            const file = files[0];
            if (/^image\/\w+/.test(file.type)) {
              imgType = file.type;
              if (currentURL) URLClass.revokeObjectURL(currentURL);
              imageElement.src = currentURL = URLClass.createObjectURL(file);
              cropper.destroy();
              cropper = new CropperClass(imageElement, cropOptions);
              imgInput.value = '';
              cropInput.value = 1;
              validarCampos();

              if (cropContainer) cropContainer.style.display = '';
              const btnUp = document.querySelector('.btn-upanh span, .btn-chonanh');
              if (btnUp) btnUp.innerHTML = "<i class='fas fa-upload'></i> Elige otra foto";
            } else {
              alert('Selecciona un archivo de imagen');
            }
          });
        } else {
          imgInput.disabled = true;
          imgInput.parentNode.classList.add('disabled');
        }
      }
    }
  }
});
