(() => {
    "use strict";

    const CONFIG = {
        maxFileSize: 15 * 1024 * 1024,
        maxWidth: 3000,
        maxHeight: 3000,
        quality: 0.90,
        allowedTypes: [
            "image/jpeg",
            "image/png",
            "image/webp"
        ],
        aspectRatio: tyle,
        viewMode: vmode
    };

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

    let cropper = null;
    let imageURL = null;
    let croppedCanvas = null;
    let uploadId = 0;

    function init() {
        if (window.location.hostname !== zhaendblog) return;

        const input = $("#inputImage");
        const image = $(".img-container img");
        const cropButton = $("#cropped");
        const cropContainer = $("#cropContainer");
        const generateButton = $("#zh-zhaend");

        if (!input || !image || !cropButton) {
            // console.error("CEREBRO: faltan elementos HTML.");
            return;
        }

        if (typeof window.Cropper !== "function") {
            // console.error("CEREBRO: Cropper.js no está disponible.");
            return;
        }

        // ---------------------------------------
        // ACTUALIZAR BOTONES DE IMAGEN
        // ---------------------------------------
        function updateImageButtons(selected = false) {
            $$(".btn-upanh span, .btn-zhaend").forEach(el => {
                el.innerHTML = selected
                    ? '<i class="fa-solid fa-image me-2"></i>Elegir otra imagen'
                    : '<i class="fa-solid fa-upload me-2"></i>Seleccionar imagen';
            });
        }

        // ---------------------------------------
        // ESTADO Y RECURSOS
        // ---------------------------------------

        function enableGenerate(enabled) {
            if (!generateButton) return;

            generateButton.disabled = !enabled;
            generateButton.classList.toggle(
                "disabled",
                !enabled
            );
        }

        function destroyCropper() {
            if (cropper) {
                cropper.destroy();
                cropper = null;
            }
        }

        function revokeImageURL() {
            if (imageURL) {
                URL.revokeObjectURL(imageURL);
                imageURL = null;
            }
        }

        function reset() {
            croppedCanvas = null;
            enableGenerate(false);

            // Restaurar botones.
            updateImageButtons(false);

            window.dispatchEvent(
                new CustomEvent("zh:image-reset")
            );
        }

        // ---------------------------------------
        // COMPRESIÓN
        // ---------------------------------------

        function compress(file) {

            // No comprimir fotografías pequeñas.
            if (file.size <= 5 * 1024 * 1024) {
                return Promise.resolve(file);
            }

            // Continuar sin compresión si la librería no está disponible.
            if (typeof window.Compressor !== "function") {
                return Promise.resolve(file);
            }

            return new Promise((resolve, reject) => {

                new Compressor(file, {
                    maxWidth: CONFIG.maxWidth,
                    maxHeight: CONFIG.maxHeight,
                    quality: CONFIG.quality,
                    success: resolve,
                    error: reject
                });

            });
        }

        // ---------------------------------------
        // CARGAR IMAGEN
        // ---------------------------------------

        async function loadImage(file) {

            if (!CONFIG.allowedTypes.includes(file.type)) {
                throw new Error("Formato no permitido. Utiliza JPG, PNG o WebP.");
            }

            if (file.size > CONFIG.maxFileSize) {
                throw new Error("La imagen supera el límite de 15 MB.");
            }

            const currentId = ++uploadId;

            destroyCropper();
            reset();
            revokeImageURL();

            const compressed = await compress(file);

            if (currentId !== uploadId) return;

            imageURL = URL.createObjectURL(compressed);

            await new Promise((resolve, reject) => {

                image.onload = resolve;

                image.onerror = () => {
                    reject(new Error("No se pudo cargar la fotografía."));
                };

                image.src = imageURL;

            });

            if (currentId !== uploadId) return;

            cropper = new Cropper(image, {

                aspectRatio: CONFIG.aspectRatio,
                viewMode: CONFIG.viewMode,

                autoCrop: true,
                autoCropArea: 1,

                preview: ".img-previa",

                responsive: true,
                restore: false,
                checkOrientation: true,

                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,

                cropBoxMovable: true,
                cropBoxResizable: true

            });

            cropContainer?.classList.remove("d-none");
            // Cambiar botones al cargar la fotografía.
            updateImageButtons(true);

        }

        // ---------------------------------------
        // SELECTOR DE ARCHIVOS
        // ---------------------------------------

        input.addEventListener("change", async function () {

            const file = this.files?.[0];

            this.value = "";

            if (!file) return;

            try {

                await loadImage(file);

            } catch (error) {

                // console.error("CEREBRO:", error);
                alert(error.message);

            }

        });

        // ---------------------------------------
        // CONTROLES CROPPER
        // ---------------------------------------

        const toolbar = $("#photo-editor .toolbar");

        toolbar?.addEventListener("click", event => {

            const button = event.target.closest("[data-method]");

            if (!button || !cropper) return;

            const method = button.dataset.method;

            const option = Number(button.dataset.option);

            const methods = [
                "rotate",
                "scaleX",
                "scaleY",
                "zoom",
                "reset"
            ];

            if (!methods.includes(method)) return;

            try {

                cropper[method](option);

                if (method === "scaleX" || method === "scaleY") {
                    button.dataset.option = String(-option);
                }

            } catch (error) {

                console.error("Error Cropper:", error);

            }

        });

        // ---------------------------------------
        // APLICAR RECORTE
        // ---------------------------------------

        cropButton.addEventListener("click", () => {

            if (!cropper) {
                alert("Selecciona una fotografía primero.");
                return;
            }

            const canvas = cropper.getCroppedCanvas({

                maxWidth: 3000,
                maxHeight: 3000,

                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high"

            });

            if (!canvas) {
                alert("No se pudo generar el recorte.");
                return;
            }

            croppedCanvas = canvas;

            enableGenerate(true);

            // Actualizar botones.
            updateImageButtons(true);

            // Entregar fotografía recortada al CORAZÓN.
            window.dispatchEvent(
                new CustomEvent("zh:image-ready", {
                    detail: {
                        canvas: croppedCanvas,
                        source: "upload"
                    }
                })
            );

            // Cerrar modal Bootstrap.
            const modal = $("#photoModal");

            if (modal && window.bootstrap?.Modal) {

                bootstrap.Modal
                    .getOrCreateInstance(modal)
                    .hide();

            }

        });

        // ---------------------------------------
        // API PÚBLICA DEL CEREBRO
        // ---------------------------------------

        window.ZhaEndImage = {

            getCanvas() {
                return croppedCanvas;
            },

            hasImage() {
                return !!croppedCanvas;
            },

            reset() {
                reset();
                destroyCropper();
                revokeImageURL();
            }

        };

        enableGenerate(false);
        updateImageButtons(false); // new

        // ---------------------------------------
        // LIMPIEZA
        // ---------------------------------------

        window.addEventListener("pagehide", () => {

            uploadId++;

            destroyCropper();
            revokeImageURL();

        }, { once: true });

        // console.info("ZhaEnd: CEREBRO iniciado.");

    }

if (typeof window.Cropper !== "function") {
    
    return;
}

})();
