const mensagens = [];
let nomeUsuario = "Anônimo";
let admLogado = false;

// Exibir modal inicial
window.onload = () => {
  document.getElementById("nomeModal").style.display = "flex";
};

// Confirmar nome
document.getElementById("confirmarNome").onclick = () => {
  const nome = document.getElementById("nomeInput").value.trim();
  if (nome) nomeUsuario = nome;
  document.getElementById("nomeModal").style.display = "none";
};

// Enviar sugestão
document.getElementById("enviarBtn").onclick = () => {
  const texto = document.getElementById("mensagemInput").value.trim();

  if (!texto) return;
  if (contemPalavroes(texto)) {
    notificar("Por favor, evite palavrões.");
    return;
  }

  mensagens.push({ nome: nomeUsuario, texto });
  renderizarMensagens();
  document.getElementById("mensagemInput").value = "";
  notificar("Mensagem enviada com sucesso!");
};

// Renderizar mensagens
function renderizarMensagens() {
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  mensagens.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "mensagem";

    const nome = document.createElement("div");
    nome.className = "nome";
    nome.innerText = m.nome;
    div.appendChild(nome);

    const texto = document.createElement("div");
    texto.innerText = m.texto;
    div.appendChild(texto);

    const btn = document.createElement("button");
    btn.className = "apagar";
    btn.innerText = "×";
    btn.onclick = () => {
      mensagens.splice(i, 1);
      renderizarMensagens();
    };
    div.appendChild(btn);

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  });
}

// Notificações
function notificar(msg) {
  const box = document.getElementById("notificacao");
  box.innerText = msg;
  box.style.display = "block";
  setTimeout(() => box.style.display = "none", 3000);
}

// Login ADM
document.getElementById("admLoginBtn").onclick = () => {
  document.getElementById("admModal").style.display = "flex";
};

document.getElementById("fecharAdm").onclick = () => {
  document.getElementById("admModal").style.display = "none";
};

document.getElementById("entrarAdm").onclick = () => {
  const user = document.getElementById("admUsuario").value;
  const senha = document.getElementById("admSenha").value;

  if (user === "admin" && senha === "1234") {
    admLogado = true;
    notificar(`Você fez login com ${user}`);
    document.getElementById("admModal").style.display = "none";
  } else {
    notificar("Credenciais inválidas.");
  }
};

// Verificar palavrões
function contemPalavroes(texto) {
  const palavras = ["besta", "burro", "idiota", "palavrão1", "palavrão2"];
  const limpado = texto.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  return palavras.some(p => limpado.includes(p));
}
