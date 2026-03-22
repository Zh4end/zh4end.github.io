window.onload = function () {
  const Cropper = window.Cropper;
  const URLX = window.URL || window.webkitURL;
  const container = document.querySelector('.img-container');
  const image = container.querySelector('img');
  const actions = document.getElementById('actions');

  const options = {
    aspectRatio: tyle,
    viewMode: vmode,
    preview: '.img-previa',
    autoCrop: true,
    strict: true,
    background: true,
    autoCropArea: 1,
  };

  let cropper = new Cropper(image, options);
  const initialSrc = image.src;
  let mimeType = 'image/jpeg';
  let blobURL;

  // Deshabilitar botones si no hay soporte de canvas o transici贸n
  if (!document.createElement('canvas').getContext) {
    document.querySelectorAll('button[data-method="getCroppedCanvas"]').forEach(btn => btn.disabled = true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    document.querySelectorAll('button[data-method="rotate"], button[data-method="scale"]').forEach(btn => btn.disabled = true);
  }

  // Manejo de botones de acciones
  const btnContainer = actions.querySelector('.docs-buttons');
  btnContainer.addEventListener('click', function (event) {
    const target = event.target.closest('[data-method]');
    if (!target || target.disabled || target.classList.contains('disabled')) return;
    if (!cropper) return;

    let method = target.dataset.method;
    let option = target.dataset.option ? target.dataset.option : undefined;
    let secondOption = target.dataset.secondOption ? target.dataset.secondOption : undefined;
    let targetInput = target.dataset.target ? document.querySelector(target.dataset.target) : null;
    let result;

    if (targetInput && !target.hasAttribute('data-option')) {
      try {
        option = JSON.parse(targetInput.value);
      } catch (e) {
        console.log(e.message);
      }
    }

    const cropped = cropper.cropped;

    switch (method) {
      case 'rotate':
        if (cropped) cropper.clear();
        break;
      case 'getCroppedCanvas':
        try {
          option = JSON.parse(option);
        } catch (e) {
          console.log(e.message);
        }
        if (mimeType === 'image/jpeg') {
          option = option || {};
          option.fillColor = '#fff';
        }
        break;
    }

    result = cropper[method](option, secondOption);

    switch (method) {
      case 'rotate':
        if (cropped) cropper.crop();
        break;
      case 'scaleX':
      case 'scaleY':
        target.dataset.option = -option;
        break;
      case 'getCroppedCanvas':
        if (result) {
          result.toBlob(function (blob) {
            const previewURL = URLX.createObjectURL(blob);
            document.getElementById('Cimg').src = previewURL;
          }, 'image/jpeg', 1);
          document.getElementById('zh-zhaend').classList.remove('disabled');
        }
        break;
      case 'destroy':
        cropper = null;
        if (blobURL) {
          URLX.revokeObjectURL(blobURL);
          blobURL = '';
          image.src = initialSrc;
        }
        break;
    }

    if (typeof result === 'object' && result !== cropper && targetInput) {
      try {
        targetInput.value = JSON.stringify(result);
      } catch (e) {
        console.log(e.message);
      }
    }
  });

  // Movimiento con teclas
  document.body.onkeydown = function (event) {
    if (!cropper || this.scrollTop > 300) return;

    switch (event.keyCode) {
      case 37: event.preventDefault(); cropper.move(-1, 0); break;
      case 38: event.preventDefault(); cropper.move(0, -1); break;
      case 39: event.preventDefault(); cropper.move(1, 0); break;
      case 40: event.preventDefault(); cropper.move(0, 1); break;
    }
  };

  // Ocultar contenedor inicialmente
  document.querySelectorAll('.trim-container').forEach(el => el.style.display = 'none');

  // Manejo del input de imagen
  const inputImage = document.getElementById('inputImage');
  if (URLX) {
    inputImage.onchange = function () {
      const files = this.files;
      if (cropper && files && files.length) {
        const file = files[0];
        if (/^image\/\w+/.test(file.type)) {
          mimeType = file.type;
          if (blobURL) URLX.revokeObjectURL(blobURL);
          image.src = blobURL = URLX.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;

          document.getElementById('zh-zhaend').classList.remove('disabled');
          document.querySelectorAll('.trim-container').forEach(el => el.style.display = 'block');
          document.querySelectorAll('.btn-loadimg span, .btn-znd').forEach(el => {
            el.innerHTML = "<i class='fas fa-upload'></i> Elige otra foto";
          });
        } else {
          alert('Selecciona un archivo de imagen v谩lido');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.classList.add('disabled');
  }
};
