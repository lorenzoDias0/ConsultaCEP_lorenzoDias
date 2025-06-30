document
  .getElementById("cepForm")
  .addEventListener("submit", async function (e) {
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
    } catch (error) {
      alert("Erro ao buscar o CEP.");
      console.error(error);
    }
  });
