document.getElementById("cepForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cep = document.getElementById("cep").value.trim();

  if (!cep.match(/^[0-9]{8}$/)) {
    alert("Por favor, insira um CEP válido com 8 dígitos numéricos.");
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      return;
    }

    document.getElementById("logradouro").value = data.logradouro || "";
    document.getElementById("complemento").value = data.complemento || "";
    document.getElementById("bairro").value = data.bairro || "";
    document.getElementById("cidade").value = data.localidade || "";
    document.getElementById("estado").value = data.uf || "";
    document.getElementById("ddd").value = data.ddd || "";
  } catch (error) {
    alert("Erro ao buscar o CEP.");
    console.error(error);
  }
});

document.getElementById("salvarBtn").addEventListener("click", function () {
  const dados = {
    nome: document.getElementById("nome").value,
    cep: document.getElementById("cep").value,
    logradouro: document.getElementById("logradouro").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    ddd: document.getElementById("ddd").value
  };

  localStorage.setItem("dadosCEP", JSON.stringify(dados));
  alert("Dados salvos no Local Storage com sucesso!");
});

window.addEventListener("load", function () {
  const dadosSalvos = localStorage.getItem("dadosCEP");
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("cep").value = dados.cep || "";
    document.getElementById("logradouro").value = dados.logradouro || "";
    document.getElementById("complemento").value = dados.complemento || "";
    document.getElementById("bairro").value = dados.bairro || "";
    document.getElementById("cidade").value = dados.cidade || "";
    document.getElementById("estado").value = dados.estado || "";
    document.getElementById("ddd").value = dados.ddd || "";
  }
});
