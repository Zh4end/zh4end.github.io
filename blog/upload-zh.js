document.addEventListener("DOMContentLoaded", () => {

    if (window.location.hostname !== zhaendblog) return;

    // ======= Insertar recursos dinámicos ========
    //if (cssCrop) document.head.insertAdjacentHTML("beforeend", cssCrop);
    //if (jsCrop) document.head.insertAdjacentHTML("beforeend", jsCrop);
    //if (jqueryCrop) document.head.insertAdjacentHTML("beforeend", jqueryCrop);

    // ======= Elementos usados ========
    const b = document.getElementById("Nimg");
    const e = document.getElementById("Cimg");
    //let d = vitri;

    const btn = document.getElementById("zh-zhaend");
    const imgOut = document.getElementById("img-out");
    const cropInput = document.getElementById("cropanh");

    if (!btn || !imgOut || !cropInput || !e) return; // seguridad


    // =====================================================
    // EVENTO PRINCIPAL
    // =====================================================
    btn.addEventListener("click", () => {

        cropInput.click();
        d = vitri;

        imgOut.style.display = "none";

        btn.classList.add("disabled");
        btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> ${tdta}`;

        setTimeout(() => {
            processImage();
        }, 200);
    });


    // =====================================================
    // FUNCIÓN PRINCIPAL DE PROCESAMIENTO
    // =====================================================
    function processImage() {

        // Cargar marca
        const mark = new Image();
        mark.crossOrigin = "Anonymous";
        mark.src = markimg;

        mark.onload = () => {

            // Cargar fondo
            const bg = new Image();
            bg.crossOrigin = "Anonymous";
            bg.src = bgimg;

            bg.onload = () => {

                const c = document.querySelector("canvas");
                const ctx = c.getContext("2d");

                let corners = d;
                const step = 1;
                const pW = e.width - 1;
                const pH = e.height - 1;

                ctx.clearRect(0, 0, c.width, c.height);
                ctx.save();

                // =========================
                // ALGORITMO DE DEFORMACIÓN
                // =========================
                for (let y = 0; y < pH; y += step) {
                    for (let x = 0; x < pW; x += step) {

                        const D = interp(corners[0], corners[3], y / pH);
                        const n = interp(corners[1], corners[2], y / pH);
                        const h = interp(corners[0], corners[3], (y + step) / pH);
                        const B = interp(corners[1], corners[2], (y + step) / pH);

                        const l = interp(D, n, x / pW);
                        const A = interp(D, n, (x + step) / pW);
                        const E = interp(h, B, (x + step) / pW);
                        const g = interp(h, B, x / pW);

                        ctx.drawImage(
                            e,
                            x, y, step, step,
                            l.x, l.y,
                            Math.ceil(Math.max(step, Math.abs(A.x - l.x), Math.abs(g.x - E.x))) + 1,
                            Math.ceil(Math.max(step, Math.abs(l.y - g.y), Math.abs(A.y - E.y))) + 1
                        );
                    }
                }

                // =========================
                // FILTRO ZHAENDMK
                // =========================
                if (zndMk === "black") {
                    ctx.save();
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = "#333";
                    ctx.fillRect(0, 0, c.width, c.height);
                    ctx.restore();
                }

                // Mascara (marca)
                ctx.globalCompositeOperation = "destination-in";
                ctx.drawImage(mark, 0, 0, c.width, c.height);
                ctx.restore();

                // Fondo debajo
                ctx.save();
                ctx.globalCompositeOperation = "destination-over";
                ctx.drawImage(bg, 0, 0, c.width, c.height);
                ctx.restore();

                // Textura Nimg
                if (b) {
                    ctx.save();
                    ctx.globalAlpha = 0.5;
                    const pattern = ctx.createPattern(b, "repeat");
                    ctx.fillStyle = pattern;
                    ctx.fillRect(0, 0, c.width, c.height);
                    ctx.restore();
                }

                // =========================
                // EXPORTAR COMO BLOB
                // =========================
                c.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);

                    imgOut.innerHTML = `
                        <label class="mt-2">+Resultado+</label>
                        <img src="${url}" alt="Edicion de Blog de zhaend" class="img-thumbnail" />
                        <a href="${url}" class="btn btn-block btn-primary mt-2" download="zhaend_${nombredesc}">
                            <i class="fas fa-cloud-download-alt"></i> +Descargar+
                        </a>
                    `;

                    btn.classList.remove("disabled");
                    btn.innerHTML = `<i class="fas fa-cut"></i> ${tta}`;
                    imgOut.style.display = "block";

                }, "image/jpeg");

            };
        };
    }

    // =====================================================
    // INTERPOLACIÓN — MISMA LÓGICA ORIGINAL
    // =====================================================
    function interp(a, b, t) {
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t
        };
    }

});
