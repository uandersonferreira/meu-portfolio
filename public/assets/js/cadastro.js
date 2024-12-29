const _0x1f35f7 = _0x4583;
(function (_0x2447da, _0x279e10) {
  const _0xccc1e2 = _0x4583,
    _0x261d6e = _0x2447da();
  while (!![]) {
    try {
      const _0xecdefb =
        (-parseInt(_0xccc1e2(0x1f7)) / 0x1) *
          (-parseInt(_0xccc1e2(0x1eb)) / 0x2) +
        (parseInt(_0xccc1e2(0x204)) / 0x3) *
          (-parseInt(_0xccc1e2(0x1de)) / 0x4) +
        (-parseInt(_0xccc1e2(0x1ec)) / 0x5) *
          (parseInt(_0xccc1e2(0x1d4)) / 0x6) +
        (-parseInt(_0xccc1e2(0x1e2)) / 0x7) *
          (parseInt(_0xccc1e2(0x20b)) / 0x8) +
        -parseInt(_0xccc1e2(0x1e7)) / 0x9 +
        (-parseInt(_0xccc1e2(0x20d)) / 0xa) *
          (parseInt(_0xccc1e2(0x1dd)) / 0xb) +
        parseInt(_0xccc1e2(0x1f3)) / 0xc;
      if (_0xecdefb === _0x279e10) break;
      else _0x261d6e["push"](_0x261d6e["shift"]());
    } catch (_0x430ef5) {
      _0x261d6e["push"](_0x261d6e["shift"]());
    }
  }
})(_0x5dc4, 0xa89a0),
  document[_0x1f35f7(0x1ee)](_0x1f35f7(0x200), function () {
    const _0xae336c = _0x1f35f7,
      _0x29aaef = document[_0xae336c(0x1e5)]("form"),
      _0x23de5e = document[_0xae336c(0x1e9)](_0xae336c(0x1f5)),
      _0x4d9c44 = [],
      _0x5d3ba5 = (_0x563661) => {
        return new Promise((_0x402432, _0x47bdb5) => {
          const _0x13c708 = _0x4583,
            _0x17c21c = new FileReader();
          _0x17c21c["readAsDataURL"](_0x563661),
            (_0x17c21c[_0x13c708(0x1da)] = () =>
              _0x402432(_0x17c21c[_0x13c708(0x205)])),
            (_0x17c21c[_0x13c708(0x1fe)] = (_0x4bcf35) => _0x47bdb5(_0x4bcf35));
        });
      },
      _0x55d577 = () => {
        const _0x5e942a = _0xae336c;
        (document["getElementById"](_0x5e942a(0x1e1))[_0x5e942a(0x1ff)] = ""),
          (document[_0x5e942a(0x1e9)](_0x5e942a(0x1d7))["value"] = "");
      },
      _0x4f1508 = async (_0x492f02, _0x13eb9a) => {
        const _0x1de65f = _0xae336c;
        try {
          const _0x2bd2d1 = await _0x5d3ba5(_0x13eb9a),
            _0x313da0 = { nome: _0x492f02, icone: _0x2bd2d1 };
          _0x4d9c44["push"](_0x313da0);
          const _0x5452a7 = document[_0x1de65f(0x20e)]("li");
          (_0x5452a7[_0x1de65f(0x20f)] =
            _0x1de65f(0x1d3) +
            _0x2bd2d1 +
            _0x1de65f(0x206) +
            _0x492f02 +
            "\x22\x20style=\x22width:\x2030px;\x20height:\x2030px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>" +
            _0x492f02 +
            _0x1de65f(0x1df) +
            (_0x4d9c44[_0x1de65f(0x201)] - 0x1) +
            _0x1de65f(0x1f1)),
            _0x23de5e["appendChild"](_0x5452a7),
            _0x55d577();
        } catch (_0xfee992) {
          console[_0x1de65f(0x1f6)](_0x1de65f(0x213), _0xfee992);
        }
      };
    document[_0xae336c(0x1e9)](_0xae336c(0x1f2))["addEventListener"](
      _0xae336c(0x1ef),
      async function (_0x5af425) {
        const _0x1b0728 = _0xae336c,
          _0x590e96 = _0x5af425[_0x1b0728(0x1d6)]["files"][0x0];
        if (_0x590e96)
          try {
            const _0x541f83 = await _0x5d3ba5(_0x590e96),
              _0x190520 = document[_0x1b0728(0x20e)]("div");
            (_0x190520[_0x1b0728(0x20f)] =
              _0x1b0728(0x1fd) + _0x541f83 + _0x1b0728(0x1dc)),
              this[_0x1b0728(0x208)][_0x1b0728(0x20a)](_0x190520);
          } catch (_0x25b98d) {
            console[_0x1b0728(0x1f6)](
              "Erro\x20ao\x20carregar\x20preview:",
              _0x25b98d
            );
          }
      }
    ),
      document[_0xae336c(0x1e9)](_0xae336c(0x210))[_0xae336c(0x1ee)](
        _0xae336c(0x1fa),
        async () => {
          const _0x3f49f5 = _0xae336c,
            _0xd9a584 = document["getElementById"](_0x3f49f5(0x1e1))[
              _0x3f49f5(0x1ff)
            ],
            _0x46fe23 =
              document[_0x3f49f5(0x1e9)]("imagem-tecnologia")[
                _0x3f49f5(0x1e3)
              ][0x0];
          if (!_0xd9a584 || !_0x46fe23) {
            alert(_0x3f49f5(0x1e0));
            return;
          }
          await _0x4f1508(_0xd9a584, _0x46fe23);
        }
      ),
      document[_0xae336c(0x214)](_0xae336c(0x1f0))[_0xae336c(0x202)](
        (_0x4695d0) => {
          const _0x76f90d = _0xae336c;
          _0x4695d0[_0x76f90d(0x1ee)]("change", function () {
            const _0x5b1edf = _0x76f90d,
              _0x62b404 = this[_0x5b1edf(0x212)];
            _0x62b404[_0x5b1edf(0x1f9)] = this[_0x5b1edf(0x1e3)][0x0]
              ? this[_0x5b1edf(0x1e3)][0x0][_0x5b1edf(0x1e6)]
              : "Escolher\x20arquivo";
          });
        }
      ),
      _0x23de5e[_0xae336c(0x1ee)](_0xae336c(0x1fa), function (_0x120374) {
        const _0x3f7034 = _0xae336c;
        if (
          _0x120374[_0x3f7034(0x1d6)][_0x3f7034(0x1d2)](".remove-tecnologia")
        ) {
          const _0x2c5ce0 =
            _0x120374[_0x3f7034(0x1d6)]["closest"](".remove-tecnologia")[
              _0x3f7034(0x1ea)
            ][_0x3f7034(0x1ed)];
          _0x4d9c44["splice"](_0x2c5ce0, 0x1),
            _0x120374[_0x3f7034(0x1d6)]
              [_0x3f7034(0x1d2)]("li")
              [_0x3f7034(0x1d9)]();
        }
      }),
      _0x29aaef["addEventListener"]("submit", async function (_0x4bae61) {
        const _0x52e3a2 = _0xae336c;
        _0x4bae61["preventDefault"]();
        try {
          const _0x50de93 = document[_0x52e3a2(0x1e9)](_0x52e3a2(0x1f2))[
            "files"
          ][0x0];
          if (!_0x50de93) {
            alert(_0x52e3a2(0x1fc));
            return;
          }
          const _0x3f309b = await _0x5d3ba5(_0x50de93),
            _0x4fe1fb = new FormData(_0x29aaef),
            _0x3cd82a = {
              titulo: _0x4fe1fb[_0x52e3a2(0x209)]("titulo"),
              descricao: _0x4fe1fb[_0x52e3a2(0x209)](_0x52e3a2(0x1d1)),
              status: _0x4fe1fb[_0x52e3a2(0x209)](_0x52e3a2(0x1e4)),
              imagemCapa: _0x3f309b,
              urlDeploy: _0x4fe1fb[_0x52e3a2(0x209)](_0x52e3a2(0x203)),
              urlGithub: _0x4fe1fb["get"](_0x52e3a2(0x1e8)),
              tecnologias: _0x4d9c44,
            },
            _0x21f617 = await fetch(_0x52e3a2(0x211), {
              method: _0x52e3a2(0x1d5),
              headers: { "Content-Type": _0x52e3a2(0x207) },
              body: JSON[_0x52e3a2(0x1db)]({ projeto: _0x3cd82a }),
            });
          if (!_0x21f617["ok"])
            throw new Error("Erro\x20ao\x20salvar\x20projeto");
          alert(_0x52e3a2(0x1f4)),
            (window["location"][_0x52e3a2(0x1fb)] = _0x52e3a2(0x1d8));
        } catch (_0xabab69) {
          console["error"](_0x52e3a2(0x1f8), _0xabab69),
            alert(_0x52e3a2(0x20c));
        }
      });
  });
function _0x4583(_0x17bc52, _0x4c1bd0) {
  const _0x5dc4ef = _0x5dc4();
  return (
    (_0x4583 = function (_0x4583d4, _0x3febc3) {
      _0x4583d4 = _0x4583d4 - 0x1d1;
      let _0x2fc61b = _0x5dc4ef[_0x4583d4];
      return _0x2fc61b;
    }),
    _0x4583(_0x17bc52, _0x4c1bd0)
  );
}
function _0x5dc4() {
  const _0x539d77 = [
    "value",
    "DOMContentLoaded",
    "length",
    "forEach",
    "url-deploy",
    "3494808QbCtBg",
    "result",
    "\x22\x20alt=\x22",
    "application/json",
    "parentElement",
    "get",
    "appendChild",
    "24FjPTdi",
    "Erro\x20ao\x20cadastrar\x20projeto",
    "10EJkfUF",
    "createElement",
    "innerHTML",
    "add-tecnologia",
    "/.netlify/functions/update-projects",
    "previousElementSibling",
    "Erro\x20ao\x20processar\x20imagem\x20da\x20tecnologia:",
    "querySelectorAll",
    "descricao",
    "closest",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22tecnologia-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20src=\x22",
    "432SULFAC",
    "POST",
    "target",
    "imagem-tecnologia",
    "index.html",
    "remove",
    "onload",
    "stringify",
    "\x22\x20alt=\x22Preview\x22\x20style=\x22max-width:\x20200px;\x22>",
    "9927247hKjmwv",
    "4ehsnTB",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20type=\x22button\x22\x20class=\x22btn\x20remove-tecnologia\x22\x20data-index=\x22",
    "Por\x20favor,\x20preencha\x20o\x20nome\x20e\x20escolha\x20uma\x20imagem\x20para\x20a\x20tecnologia.",
    "nome-tecnologia",
    "230083CEblCy",
    "files",
    "status",
    "querySelector",
    "name",
    "8853237SQQMBA",
    "url-github",
    "getElementById",
    "dataset",
    "1248tskqzw",
    "56725eKbKaf",
    "index",
    "addEventListener",
    "change",
    "input[type=\x22file\x22]",
    "\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Remover\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "imagem",
    "51370476wrngHf",
    "Projeto\x20cadastrado\x20com\x20sucesso!",
    "lista-tecnologias",
    "error",
    "603zcbyZp",
    "Erro:",
    "textContent",
    "click",
    "href",
    "Por\x20favor,\x20selecione\x20uma\x20imagem\x20de\x20capa\x20para\x20o\x20projeto",
    "<img\x20src=\x22",
    "onerror",
  ];
  _0x5dc4 = function () {
    return _0x539d77;
  };
  return _0x5dc4();
}
