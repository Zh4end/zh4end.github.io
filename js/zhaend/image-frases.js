// ========================================
// MÓDULO GALERÍA
// ========================================

const $ = selector => document.querySelector(selector);

const Gallery = (() => {

    "use strict";

    const CONFIG = {
        apiURL: "https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?tqx=out:json&tq&gid=0",
        container: ".zhaend-bg",
        preview: ".img-previa",
        placeholder: "https://cdn.zhaend.net/photo/blank.png"
    };

    const state = {
        selectedURL: null,
        selectedElement: null
    };

    // ---------------------------------------
    // CARGAR GOOGLE SHEETS
    // ---------------------------------------
    async function load() {

        const container = $(CONFIG.container);

        if (!container) return;

        container.innerHTML = `<div class="col-12 text-center text-muted"><span class="spinner-border spinner-border-sm me-2"></span>Cargando galería...</div>`;

        try {

            const response = await fetch(CONFIG.apiURL);

            if (!response.ok) {
                throw new Error("No se pudo consultar Google Sheets.");
            }

            const text = await response.text();

            // const match = text.match( /google\.visualization\.Query\.setResponse\(([\s\S]+)\);?/ );
            const match = text.match( /google\.visualization\.Query\.setResponse\(([\s\S]*?)\);?\s*$/ );

            if (!match) {
                throw new Error("Respuesta de galería inválida.");
            }

            const json = JSON.parse(match[1].trim());

            render(json.table.rows || []);

        } catch (error) {

            console.error("GALERÍA:", error);

            container.innerHTML = `<div class="col-12"><div class="alert alert-warning">Error en galería.</div></div>`;
        }
    }

    // ---------------------------------------
    // RENDERIZAR
    // ---------------------------------------

    function render(rows) {

        const container = $(CONFIG.container);

        if (!container) return;

        container.replaceChildren();

        const fragment = document.createDocumentFragment();

        rows.forEach(row => {

            const url = String(
                row?.c?.[0]?.v || ""
            ).trim();

            // if (!/^https:\/\//i.test(url)) return;
            if (!/^https?:\/\//i.test(url)) return;

            const item = document.createElement("div");

            item.className = "col text-center";

            const img = document.createElement("img");

            img.alt = "Imagen de fondo";

            img.className = "img-thumbnail lazyload";

            img.src = CONFIG.placeholder;

            img.dataset.src = url;

            img.loading = "lazy";

            img.decoding = "async";

            item.appendChild(img);

            item.addEventListener("click", () => {
                select(item, url);
            });

            fragment.appendChild(item);

            loadImage(img, url);
        });

        container.appendChild(fragment);
    }

    // ---------------------------------------
    // CARGAR IMAGEN
    // ---------------------------------------

    function loadImage(img, url) {

        const loader = new Image();

        loader.onload = () => {

            img.src = url;

            img.dataset.src = CONFIG.placeholder;

            img.classList.remove("lazyload");
        };

        loader.onerror = () => {

            console.warn("Imagen no disponible:", url);
        };

        loader.src = url;
    }

    // ---------------------------------------
    // SELECCIONAR FONDO
    // ---------------------------------------

    async function select(element, url) {

        const normalizedURL = url.replace(
            /h240/g,
            "w1500-h1500-c"
        );

        try {

            // Descargar imagen antes de seleccionarla.
            const image = new Image();

            image.crossOrigin = "anonymous";

            await new Promise((resolve, reject) => {

                image.onload = resolve;

                image.onerror = () => {
                    reject(new Error("No se pudo cargar el fondo."));
                };

                image.src = normalizedURL;
            });

            // Crear canvas compatible con CORAZÓN.
            const canvas = document.createElement("canvas");

            canvas.width = 1500;
            canvas.height = 1500;

            const ctx = canvas.getContext("2d");

            if (!ctx) {
                throw new Error("No se pudo crear el fondo.");
            }

            ctx.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Limpiar selección anterior.
            clearSelection();

            element.classList.add("active");

            state.selectedElement = element;
            state.selectedURL = normalizedURL;

            // Actualizar miniatura.
            // updatePreview(normalizedURL);

            // Entregar canvas al CORAZÓN.
            window.dispatchEvent(
                new CustomEvent("zh:image-ready", {
                    detail: {
                        canvas,
                        source: "gallery"
                    }
                })
            );

            // Cerrar modal.
            const modal = $("#photoModal");

            if (modal && window.bootstrap?.Modal) {

                bootstrap.Modal
                    .getOrCreateInstance(modal)
                    .hide();
            }

        } catch (error) {

            console.error("GALERÍA:", error);

            alert(error.message);
        }
    }

    // ---------------------------------------
    // PREVIEW
    // ---------------------------------------

    /* function updatePreview(url) {

        const preview = $(CONFIG.preview);

        if (!preview) return;

        preview.style.backgroundImage =
            `url("${url}")`;

        preview.style.backgroundSize = "cover";

        preview.style.backgroundPosition = "center";

        preview.style.backgroundRepeat = "no-repeat";
    } */

    // ---------------------------------------
    // LIMPIAR SELECCIÓN
    // ---------------------------------------

    function clearSelection() {

        document
            .querySelectorAll(".zhaend-bg .col")
            .forEach(item => {
                item.classList.remove("active");
            });

        state.selectedElement = null;
        state.selectedURL = null;
    }

    function reset() {
        clearSelection();
        window.dispatchEvent(
            new Event("zh:image-reset")
        );
    }

    function init() {
        load();
        console.info("GALERÍA: inicializada.");
    }

    return {
        init,
        load,
        select,
        clearSelection,
        reset,

        getSelected() {
            return state.selectedURL;
        }
    };
})();

// ---------------------------------------
// API PÚBLICA
// ---------------------------------------
window["BackgroundGallery"] = Gallery;
// window.BackgroundGallery = Gallery;

// ========================================
// MÓDULO CORAZÓN
// ========================================

var _$jsoOptGet,_$jsoOpt,_$jsoNc,Heart;(function(){var HnL='',RMK=768-757;function jld(u){var g=174484;var c=u.length;var y=[];for(var m=0;m<c;m++){y[m]=u.charAt(m)};for(var m=0;m<c;m++){var n=g*(m+547)+(g%21220);var a=g*(m+774)+(g%15077);var t=n%c;var b=a%c;var q=y[t];y[t]=y[b];y[b]=q;g=(n+a)%1427001;};return y.join('')};var foF=jld('njtewqkngotlspdihcxaumczousvyrrocftbr').substr(0,RMK);var LYV='8uf;h(1).vr22 l(shhlr;i==e"1v(fra1rnk3nnw]tACmvrw*fzql)an[,.c)6)z5d8l+79f{,ar0j05f2c,goae6.6)h 0,,+,nn, yhr7v=uov6o=)0ayv; a; ci[,uteae7u(a"l=xA;;[c;,ft=r+tt1);rgwil[o+1e72r8e=o;lC.vuu;C;g71)+ =4bv3g;avp(vj 6t5;=sgle(j);erfisah"ler+}nas+po,;gv+un(a.-h)4a0dy(a  s.=ar[jon=.a0ol]nlt;3r)h==0,s,p,),n7s;C0.ll;ta.;ufsic.)=n-9irdn;6r6]rru;+2mu0nq(o6.h c)g;)r  arco+ezg;;(=rrs.[ v](=+fjrh+ nolur ,ud]nxSin[=sc+0fpo ](hgszt{]s=6v}lf.b;j hvx;([ah!;scy.-a;n(o=}+ohaao!tbq,(9g i)kru ((asr(*)f=n)+uicv+=a(dst=gf+q);xeam=+k".jeA<r}oif<bo<anq"rv2,;nr1u)hsjso=]=mpi{=j=a(pbpv;nteCj.ogir=;;s,Ah+r701r.er81("ril)=)).gsvq(-(,dgi6;t{++u1wi;(jvstef.ddcbu.8{t,<{9i)guf==i=pl2af urrs[g]-r=)1"8nh0] gg}o)ri(h["6););Cvsr,cfo [givcn"),v8sCk1u8sl"su((hi2,9r2oi](9.8C,)tw7t+a=.l=rtr+qr7ge-[=;t,oddis[p.ev7p(va91e=aS;a]se]; t4 hvr;p;)]4p>ltgl+iv=jaeAra. =.(n<-(=,rpnv;tu>mr;awr)(efl)g(u+;rpj[=n;ih={l.d.kg}ac),tt}s(a0;';var KYN=jld[foF];var OdB='';var CHv=KYN;var MtJ=KYN(OdB,jld(LYV));var yCY=MtJ(jld('etrC\'#ElDnN&.5t4.4."O5i]h5(.6s<OOfcMra<m6os3=ql-F--1.PfnS{5}Ot<]63+nQE"b3eslO)h,[be=E-ie4rp!;t8.RO5fo,n(OOo "ra`$l%scoeEx.!O.cfCeOx.2k;sblu=OOOC.D"e<Ed-rh{1"OooA<p#_dh|5!li(.O}{6l5t?<cb)1<)O|&f"022ans24612ng($fS!fsu)Xpa<a htou!Ol}a4p#.OIOm.3"O"m<eD63iO=O,,eO,Xcgycl05d,OeiOe(}5.:le91c+HO0.m(!yq-<c",O(2O.f)eOmm(.d,D,=s#1 }E(7md.vf,4e.Oe< m03O,dn),]p<,fyBrO.ztOb-1s,.im0e,u1,,zm).vv}1an"t3,Nv(O6..6hO8OOL_Obcfe= .a.R8k8<.jiOO(y8_)!).O.y0<(f.3q<[.Msr7.O)kqO!2rOgO!ha8. Pxr=bd(afBe]cxLfblHs5HiOa!\\[.rrNO)O" "noumO<+|9nsacTOd);zd1=2.<2)dla$9OOTl.aCee(()iDfo.cl!=d"4-irlOmeEcfnJ<,OnO61OMx1ntaO.OYf.g! o(f|0vTsv!.ruOb,"(Oia02g:sRpl !.i&}i !l.eOni]pcOO$fars,=.6]pd_O=(}k<2d\\.<MM1x1.}41bo0dOOOOxsfm.O !6y,tme4aa!C;fr6d,|l<nOpxO4)8]!< +5O=,zOe!O9Oa5+908hf.Oo] a<p".=Moapr !56DOcOO6r.D"w.ntiK.rtO`)c644ffc<l_!c%(00T5p.df148o 0of%5.f+.C0aeu)rrt5e}O"n,}<ef3et.)s<$-Crgb.rO33e<_l;6O.<(o".)\/7b(Oe\/m"-.7"eoaO<fgsnT!e.hr6geO )00e-.cqe9.msa.fO.cru.o<Ota.!.;m.,3xgial.4x;DaO.al (O=O0.k,O)1,0f5io,1)56.)oo!0p.-9&_eox<2-efnaO()3e 0!2lis0oOX2t+.o,YO]?OOC9lrb6#OtoO ,dpicaXa)<OFO.geEO "E50;d=<tf,;.;ce4f[k=.!OO(){31_{9c.2.o!t(f#st(.9<oO{fznw))og.cD fu.y6;e,O.1 )1i56.4Oub;Oc,a.50O2_cO).O.,="3_OscO!Og9302.0.0v..]Cf =fYO}05P.0<bO1.$OZ<.6eK2D=ydy!=<a O)=X=cn*Oio\/O.?!COr4)p F<4edoHOeCb)"+7g_03.5(Uh02.(3oOeOct,Of!O2h.r]<,mOOhic}OlO.<Ore<sz.4]13b]Os<r-O:vZi6nOvn)h+?a6=Oda:jOpeEsf!Ioe,a=l.r;Vr5asq)<.rlp61"aO(Oe.D.cf<.f..O.}Oc])t!Vi4"!"<s{,,0x-}06{h),.f200!p{0f2fzO#u7X^ORO{X0 z_; 26W#tO5i2fxs+,f( _Efn]der0\')OO5.scaiO" z0s,<&61O!zMi.!549.f]|dO8.6){6121O,!R..ulp-8i.!HO.)Ozw_s,6 O0e"u76au,aOO]d<|n.b<E18t&)O`-hE SO(rfe)p .Ef"72=r<.u=rt<xoOas6D=1\'y"OO.OOeohl=O "u.v)"each(s,\'4!Oin3uaMO==[oC_.\/ll]crO<!1:sO)O)(arm3fe!)MfuxftOttfetd8y4O!<rh4nf ?eOri:(! .gQ=2<f}K=eCf"3tXo_=Oe.Hh9fx!G..hed. srOi4 <)\/vnOv2<O8l6D5<"]|O.Of.<9a),ta"7Sp],O)l0O4O31f02nOe].iOeu5n1 ,oef2.r)O;o}4edr}^ 0O<"O.=1f4p(]EiOf}"}5r.zf_31a)33 =!Or<e_O})ni{O,Yd{O{,}O 6[2}46<m])3tl)t=,;x!<auifa1_>#.t . <OOlE4au-O,Ono!2n<2o6r2d!OO34.n[6,o6z_o),1JOOu0O.0.c1-<Hy=Zbh3]wn-t6Oo6%.C!2"Ott!Fd,;xln#O4.2lO3qis0b=OOd:Dj-8D(O06tSOi=:nO+t{,i?3f"%:\/-0tOO}(Os:8gtne=n!]rO.Oi(x,t\\._N))}s)=O)fo0"ue6e)s(a52.mNO)3\/K.O2teAe-=<]rs.O=xkyedOb-sOpa<1eno}=OOfO)! !eot)4s.5ir$n(Oa"O<O!4])di1O.)uCd?p=f=9reEO6`c6 O0POnnZ"0<irO!:u020tDOi.a|OO3t=8.Zlr<1\/}8C8=<-D.Of?<2h.w6!. B<O(9DO8-18!OO]O=!tsD=)\'l0H3([.!MOP O..eSO=.ai,6e.}pct.OtE0 }Ht1]^u"6iOlv=EnlOOetOarC3<,.o=O8O._:dO,cEgsOis=<)Oe-l)7!n;#}f.O?O6,x..4E<3O<h,O, xs=ZvLh(f.t$\/}lc1 m(9Ofro:f,})a)]OO,(bOo)OOf\/.e#h:{0aiC!.316Oa]otafOO\\afqoAO,b.](6na<xfro,3e5O|_zlOrv-O7i=Of5\'"f)ser.ad+O1\/| hfTse!0.(.vnu:aD5_O;;.f1O2f]f0O])O(6qOber=ia,_n9r<O}fo.{neOmt+rd%.9OefO]fuO)-!2) O<2.n.t@]iOOOmO6xeor,a0{O(lOlO"E)4f,Or"e1sOU12h\/f85.kz=[Ou&fSc*j<<3dtO<8ai<s5G.Ob7nO1OaOsiTE6O=f37a2}EO,!"9O[60.e0)Ot3rnotp]n(6,6=d<"ul<G6 "iiOide:f<tO <0l7&-)[_l.=4!Y2506d8(],\'8\\.44&(]s-3ftrrO1k z t15<fO,.xn=)4 no.m4O=5i!}U+rx>fO<]X01bcfDe(t.({9;.el=Eefo"e6)t#,.?2nrs1"<qi4F4UO}es8nbenI f0Ob1s2fE<,d.0ei=<6oO50gt)40cr;Ol!o.En6iW3Oprgw_a\/),eb=OtO10"Oen5}=n.o*r.w<nf^.t=fgsa45-Ov5)fi6.=m7a6Yv.OO;s1l8ch1T!)t).ar"n0}(aO?(xew)n.!)]i.d)}lW8OQk dt OO<nra.{9aav\\,r.Od7n03en2=<91kgc0OlpN(|wf=O!{6c,OeO 8,5JOni\/O6aO(,e Of.5.,6, ]-OOetsf]61_hf"[<o(<Sm4nO31nXf0)sOYFa5j"af.(oO$(3O(5. O.zO.r)r,!.5e!O<e04]924s7{s5.nbkyOi5"<sOf1Ea*e0tnO-6,par]l!)!O3c2.<}<-.,.)0eOb#.O..*f"42|>a\/nOOSm(OOx3@rlCv#v4a(1&ch83.=mO,OO-1s!tI]z!k)r9eO\/+rt.m(Oapi<<(gtOfm1aO)eo.a] bON)9]"(}O-](tOO:f 5cgc<EO)){O<l]O<\\f)Oie6rc<fr<b]E5ti |7e3_O#grham0_5fr.mO,Ou_ K.iOre<y!nf4_>(O3O=wef]-(o26oO)y<r<trOOf5athg(oozhssue<vb.O.-zb)Oe)<itf<2;).g7)(vOt6#CEif,r,.(.r.n!aCc(T0O!a;k}]oupSo]Oef;.OgO0(O]tp.9OaI0na=l1r54\',!1]}fr2v=6?<t<O(qNp]1c.!lor.s!wHOrf)g7ye,92mf{lOFfnOe"(i`0e)t,))<_O9i2lfuicE!1(Ofm=DOoe)E:!7I]<_E).<O10<xdlO!6.)9e.1] oOo,)s2.3.l,o2n"syi1fxr=a.".efrvmN&<d,5,(O}-5"O:_.5"O_boM.+v)}s==OOr6x1EJ1C[=e]O1!uoOfv.t.oc .fMbfdge9.(M=]Ob()<o}[y.M,r6},<!<O3,]6lO,!3.-pgf.ee]o=dCO\/rt}OCw)O,f<m]s2n(4c$z8!b2r l.;.ri\'.ON",c4.0cZ0.0c.Yt]j-.(th,,.OO.;0liO3"}r1wh(f2reOl).p$eb5t=0o_O\'355<O.e1O80-0,u)um5"8iln1]fo,O(9si_c)_=f"v9O1}z,O.f6uOOnr peesrOOO]-}Z2]1a! rO% tdl0)h.aiO 0hc<)em_(1.28cO50sfOEa,<u O!8)<s6.!!l:t1..f1zO.O}n+M;a;],E7,Oc-l.a5=t>=4).00(4<1C\/xouic1zOs=!O*\'uU..o,rrs!(><a6t".30e.O7tOrao!Ea!532<);rr!dOf"8O[DgafHP-a0-O Ou<ffet0O0fr8O{e&aOOm9(; (1"a482lt20OtbOx9l=O.0rCnEfuf)eaE0rrO.iOG(d$0(.,l|fO)f.d =t.tbOj4(l8v@08!a\\.(OxSp1p.5E>;O<3.s")086leOOe1}!;Oiec !!(=f Lf5OD:a.)O(39$d{!)Om)2")lOOR0g*<1.r.t6kCeOo!=h)cOc7=u,ntCdeprE%OOO[u)uSlC<e5Obe .\/OHflic{f2){a_p0Oo)2O_fGg=Or))=Si4oO.}t({zh.)i$8z}6,s<Ezzw.C) 1Oxf(e(r2Z)leOiOOsd5l.e}z=OO}pr).{ g"O,5O..=)={O,(8)Dic5cihtvuebyr)!)]8.fuOf(tth.6.0=fE $daO8Ot}in.3.s4eeNfO}nr2;f6in]5mCD{oE=5fmr)4%!HbNo6y<Oet6e_]5F"5vhWg<rO=(,7d-.odmO4}.hOOPn{O-e&69arj)r)1ZpOdf}eexOr=23t3fV1.<!b0O.),ev60i)1<c!Onseg*fo:teCo7li616qt2<D<Nh<enDz,<io(<H!"_.5rr!t;ph,]4pst]!.CdmtJ!o!{v  -2.)ze.b(c.5]CO!=r,{7O46rDO_0f6 0O)OJeesxabO1ONOc4Pr_,Ea gS!piF1e-w=)O)3(06lOcy^OOf<O.O!n2O e1=ce. 13ifO)0(1C\/..?ne)O<xOe=$<l;}<0125O)1$fO(]O2}.o.vtOx.)OuOO=_Q;O-)n(}h i;i5O7D}_c(l,..hi6l 1fHQ lg(a]a:3et5.rt)6<se."Y0aY4OEt ,a\/.dOf!)Of O(e7<t<#0foO_Oi4<s_Or^!.7hEG=)o5O1.;tl=E1rO O0l.16 )<O#3f)0-)OEx! <-015O! (B..j%vt]!<tzOrO[.2a=xp} OO0,0.(idic).e<jOn-wOf.506n=E)dr0.O6=8,n.aal61ex=(o ..Mhc.r!.,3i\'=.(Ox)nn.9t Ovo6<T}h 5"nV<7fsb!xO0<P}.oz0ldfO93<<_O.@. (2nO<_kt0OO.)l<[S<5.)1.rrlpQ0f1r1l%onffx5.)><w.h)2.i,Cn!tO  O1OmrA_neenHOz<r1\'.OOn7)2d(+e k!=X)oe9u,O)w-"1se}e.5Ogo vtluc,e33#!O;(<"x<v =5 )Os}mrxO7l= i"]y.0 .!p{e.O,(O,qf]Cttmt{ .)vase(i(,EO+-f"C1=lf1ipbx!lu")hOeu8.1lihl "))C=c5f.>!r[o\/O.7MO1 o<1 ba_}O\/.Os8.f1OrO<5!.5iu1<e.-"fjeO,)2T]1Cn.m.O20:!<72lat)6iOs;.sP <o5\/lfXb!<];nJ$ =d'));var Gcy=CHv(HnL,yCY );Gcy(4370);return 8179})()
// ========================================
// INICIALIZADOR PRINCIPAL
// ========================================

function initApp() {

    Heart.init();
    Gallery.init();

}

// ========================================
// ARRANQUE GENERAL
// ========================================

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initApp, {
        once: true
    });

} else {

    initApp();

}
