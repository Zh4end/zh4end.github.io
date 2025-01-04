      $("head").append(jsCompr);

      
    var cimg;
$("#chonanhModal").on("hidden.bs.modal", function() {
    if ($(".cropanh-container").css("display") != "none") {
        if ($("#upanh").css("display") != "none") {
            $("#cropanh").click()
        }
    }
});




window.onload = function() {
    var u = window.Cropper;
    var b = window.URL || window.webkitURL;
    var q = document.querySelector(".img-container");
    var p = q.getElementsByTagName("img").item(0);
    var n = document.getElementById("actions");
    var t = {
        aspectRatio: tyle,
        viewMode: vmode,
        preview: ".img-preview",
        autoCrop: true,
        strict: true,
        background: true,
        autoCropArea: 1
    };
    var r = new u(p, t);
    var o = p.src;
    var s = "image/jpeg";
    var m;
    if (!document.createElement("canvas").getContext) {
        $('button[data-method="getCroppedCanvas"]').prop("disabled", true)
    }
    if (typeof document.createElement("cropper").style.transition === "undefined") {
        $('button[data-method="rotate"]').prop("disabled", true);
        $('button[data-method="scale"]').prop("disabled", true)
    }


var toggles = n.querySelector('.docs-toggles');
if (toggles) {
  // Options
  toggles.onchange = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropBoxData;
    var canvasData;
    var isCheckbox;
    var isRadio;

    if (!r) {
      return;
    }

    if (target.tagName.toLowerCase() === 'label') {
      target = target.querySelector('input');
    }

    isCheckbox = target.type === 'checkbox';
    isRadio = target.type === 'radio';

    if (isCheckbox || isRadio) {
      if (isCheckbox) {
        t[target.name] = target.checked;
        cropBoxData = r.getCropBoxData();
        canvasData = r.getCanvasData();

        t.ready = function () {
          console.log('ready');
          r.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        };
      } else {
        t[target.name] = target.value;
        t.ready = function () {
          console.log('ready');
        };
      }

      // Restart
      r.destroy();
      r = new u(p, t);
    }
  };

}



    n.querySelector(".docs-buttons").onclick = function(h) {
        var d = h || window.event;
        var e = d.target || d.srcElement;
        var f;
        var c;
        var a;
        var g;
        if (!r) {
            return
        }
        while (e !== this) {
            if (e.getAttribute("data-method")) {
                break
            }
            e = e.parentNode
        }
        if (e === this || e.disabled || e.className.indexOf("disabled") > -1) {
            return
        }
        g = {
            method: e.getAttribute("data-method"),
            target: e.getAttribute("data-target"),
            option: e.getAttribute("data-option") || undefined,
            secondOption: e.getAttribute("data-second-option") || undefined
        };
        f = r.cropped;
        if (g.method) {
            if (typeof g.target !== "undefined") {
                a = document.querySelector(g.target);
                if (!e.hasAttribute("data-option") && g.target && a) {
                    try {
                        g.option = JSON.parse(a.value)
                    } catch (d) {
                        console.log(d.message)
                    }
                }
            }
            switch (g.method) {
                case "rotate":
                    if (f) {
                        r.clear()
                    }
                    break;
                case "getCroppedCanvas":
                    try {
                        g.option = JSON.parse(g.option)
                    } catch (d) {
                        console.log(d.message)
                    }
                    if (s === "image/jpeg") {
                        if (!g.option) {
                            g.option = {}
                        }
                        g.option.fillColor = "#fff"
                    }
                    break
            }
            c = r[g.method](g.option, g.secondOption);
            switch (g.method) {
                case "rotate":
                    if (f) {
                        r.crop()
                    }
                    break;
                case "scaleX":
                case "scaleY":
                    e.setAttribute("data-option", -g.option);
                    break;
                case "getCroppedCanvas":
                    if (c) {
                        cimg = c;
                        $("#zh-zhaend").removeClass("disabled")
                    }
                    break;
                case "destroy":
                    r = null;
                    if (m) {
                        b.revokeObjectURL(m);
                        m = "";
                        p.src = o
                    }
                    break
            }
            if (typeof c === "object" && c !== r && a) {
                try {
                    a.value = JSON.stringify(c)
                } catch (d) {
                    console.log(d.message)
                }
            }
        }
    };

    
    document.body.onkeydown = function(c) {
        var a = c || window.event;
        if (!r || this.scrollTop > 300) {
            return
        }
        switch (a.keyCode) {
            case 37:
                a.preventDefault();
                r.move(-1, 0);
                break;
            case 38:
                a.preventDefault();
                r.move(0, -1);
                break;
            case 39:
                a.preventDefault();
                r.move(1, 0);
                break;
            case 40:
                a.preventDefault();
                r.move(0, 1);
                break
        }
    };
    $(".cropanh-container").hide();
    var v = document.getElementById("inputImage");
  if (b) {
    v.onchange = function () {
        var c = this.files;
        var a;

        if (c && c.length) {
            a = c[0];

            if (/^image\/\w+/.test(a.type)) {
                // Create a new Compressor instance with max width and height set to 3000
                new Compressor(a, {
                    maxWidth: 3000,
                    maxHeight: 3000,
                    success: function (res) {
                        s = res.type;
                        if (m) {
                            b.revokeObjectURL(m);
                        }
                        p.src = m = URL.createObjectURL(res);
                        r.destroy();
                        r = new u(p, t);
                        v.value = null;
                        $("#zh-zhaend").removeClass("disabled");
                        $(".cropanh-container").show();
                        $(".btn-upanh span,.btn-chonanh").html("<i class='fas fa-upload'></i> CAMBIAR FOTO");
                    },
                    error: function (err) {
                        console.error('Compression failed:', err);
                    },
                });
            } else {
                window.alert("Por favor disfruten las fotos..");
            }
        }
    }
}

  
  
  
  else {
        v.disabled = true;
        v.parentNode.className += " disabled"
    }
};
