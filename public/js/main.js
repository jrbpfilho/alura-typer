var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function() {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();

  $("#botao-reiniciar").click(reiniciaJogo);

  atualizaPlacar();

  // inicializar selectize
  $("#usuarios").selectize({
    create: true,
    sortField: 'text'
  });

  //inicializar tooltipster
  $(".tooltip").tooltipster({
    trigger: "custom"
  });

});

function atualizaTempoInicial(tempo) {

  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;

  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {

  campo.on("input", function() {
      var conteudo = campo.val();
      var qtdPalavras = conteudo.split(/\S+/).length - 1;

      $("#contador-palavras").text(qtdPalavras);

      var qtdCaracteres = conteudo.length;
      $("#contador-caracteres").text(qtdCaracteres);
  });

}

function inicializaCronometro() {

  campo.one("focus", function() {
      var tempoRestante = $("#tempo-digitacao").text();
      $("#botao-reiniciar").attr("disabled", true);

      var cronometroID = setInterval(function() {
          tempoRestante--;
          $("#tempo-digitacao").text(tempoRestante);
          if(tempoRestante < 1) {

              clearInterval(cronometroID);
              finalizaJogo();
          }
      }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  $("#botao-reiniciar").attr("disabled", false);
  campo.toggleClass("campo-desativado");
  inserePlacar()
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  //inicializando os campos
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass("campo-desativado");

  campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde");
}

function inicializaMarcadores() {

  campo.on("input", function() {
    var frase = $(".frase").text();
    var digitado = campo.val();

    //ES6 definition

    var digitouCorreto = frase.startsWith(digitado);
    if(digitouCorreto) {
      campo.addClass("borda-verde");

    } else {
      campo.addClass("borda-vermelha");
    }

    // Before ES6
    // var comparavel = frase.substr(0, digitado.length);
    //
    // if(digitado == comparavel) {
    //   campo.addClass("borda-verde");
    //   campo.removeClass("borda-vermelha");
    // } else {
    //   campo.addClass("borda-vermelha");
    //   campo.removeClass("borda-verde");
    // }
  });
}
