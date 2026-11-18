document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const cpf = localStorage.getItem('userCpf');

  if (!token || !cpf) {
    // Se não estiver logado, manda de volta pra o index
    window.location.href = '../index.html';
    return;
  }

  try {
    // Exemplo de requisição para buscar os dados do paciente pelo CPF
    const resposta = await fetch(`https://triagemapi-production.up.railway.app/pacientes/${cpf}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (resposta.ok) {
      const paciente = await resposta.json();
      
      // Pega o nome que veio do banco de dados
      const nomeCompleto = paciente.nome; 
      const primeiroNome = nomeCompleto.split(' ')[0];

      // Atualiza os elementos na tela
      document.getElementById('user-greeting').textContent = `Olá, ${primeiroNome}`;
      document.getElementById('patient-name-title').textContent = `Olá, ${nomeCompleto}`;
    }
  } catch (erro) {
    console.error('Erro ao buscar dados do paciente:', erro);
  }


});