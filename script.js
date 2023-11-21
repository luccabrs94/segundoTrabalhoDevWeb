function calcularPlano() {
    var idade = parseFloat(document.getElementById("idade").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var imc = calcularIMC(peso, altura);

    // Regras de Negócio Operadora A
    var precoA = 100 + (idade * 10 * (imc / 10));
    var precoB = (150 + (idade * 15)) * (imc / 10);
    var precoC = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    // Regras de Negócio Operadora B
    var fatorComorbidade = calcularFatorComorbidade(imc);
    var precoBA = 100 + (fatorComorbidade * 10 * (imc / 10));
    var precoBB = (150 + (fatorComorbidade * 15)) * (imc / 10);
    var precoBC = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    // Determina o plano mais vantajoso
    var resultado = "Preços dos Planos:<br><br>";

    resultado += "Operadora A:<br>";
    resultado += "Plano Básico: R$ " + precoA.toFixed(2) + "<br>";
    resultado += "Plano Standard: R$ " + precoB.toFixed(2) + "<br>";
    resultado += "Plano Premium: R$ " + precoC.toFixed(2) + "<br><br>";

    resultado += "Operadora B:<br>";
    resultado += "Plano Básico: R$ " + precoBA.toFixed(2) + "<br>";
    resultado += "Plano Standard: R$ " + precoBB.toFixed(2) + "<br>";
    resultado += "Plano Premium: R$ " + precoBC.toFixed(2) + "<br><br>";
        
    var planosA = [precoA, precoB, precoC];
    var planosB = [precoBA, precoBB, precoBC];

    var planoMaisBaratoA = planosA.indexOf(Math.min(...planosA));
    var planoMaisBaratoB = planosB.indexOf(Math.min(...planosB));

    resultado += "Plano mais barato - Operadora A: ";
    resultado += obterNomePlano(planoMaisBaratoA) + " (R$ " + Math.min(...planosA).toFixed(2) + ")<br>";

    resultado += "Plano mais barato - Operadora B: ";
    resultado += obterNomePlano(planoMaisBaratoB) + " (R$ " + Math.min(...planosB).toFixed(2) + ")";

    document.getElementById("resultado").innerHTML = resultado;
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function calcularFatorComorbidade(imc) {
    if (imc < 18.5) {
        return 10; // Abaixo do peso
    } else if (imc < 24.9) {
        return 1; // Normal
    } else if (imc < 29.9) {
        return 6; // Sobrepeso
    } else if (imc < 34.9) {
        return 10; // Obesidade
    } else if (imc < 39.9) {
        return 20; // Obesidade mórbida grave
    } else {
        return 30; // Obesidade mórbida muito grave
    }
}

function obterNomePlano(indice) {
    if (indice === 0) {
        return "Plano Básico";
    } else if (indice === 1) {
        return "Plano Standard";
    } else {
        return "Plano Premium";
    }
}



