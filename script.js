// Seleciona as células, a div de status e o botão de reinício
const cells = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');

// Define jogador inicial, estado do jogo e o tabuleiro
let currentPlayer = 'X';
let gameActive = true; // Controla se o jogo ainda está ativo
let board = ['', '', '', '', '', '', '', '', ''];

// Combinações vencedoras (índices no array "board")
const winningConditions = [
  [0, 1, 2], // Primeira linha
  [3, 4, 5], // Segunda linha
  [6, 7, 8], // Terceira linha
  [0, 3, 6], // Primeira coluna
  [1, 4, 7], // Segunda coluna
  [2, 5, 8], // Terceira coluna
  [0, 4, 8], // Diagonal principal
  [2, 4, 6]  // Diagonal secundária
];

// Atualiza o status inicial
statusDiv.textContent = `Vez do jogador ${currentPlayer}`;

/* 
  Função que lida com o clique em cada célula:
  - Verifica se a célula já está preenchida ou se o jogo acabou
  - Marca o tabuleiro e exibe o símbolo (X ou O)
  - Verifica se houve vitória ou empate
  - Alterna para o outro jogador, se necessário
*/
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  // Se já houver valor na célula ou o jogo estiver finalizado, não faz nada
  if (board[index] !== '' || !gameActive) return;

  // Marca a jogada no array e na tela
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Verifica resultado após a jogada
  checkResult();
}

// Função para verificar vitória, empate ou continuar o jogo
function checkResult() {
  let roundWon = false;

  // Percorre cada combinação vencedora para verificar se houve 3 iguais
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  // Se venceu
  if (roundWon) {
    statusDiv.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  // Se todas as células estão preenchidas e não houve vencedor, é empate
  if (!board.includes('')) {
    statusDiv.textContent = 'Empate!';
    gameActive = false;
    return;
  }

  // Caso contrário, troca o jogador e continua
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = `Vez do jogador ${currentPlayer}`;
}

// Reinicia o jogo
function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => (cell.textContent = ''));
  statusDiv.textContent = `Vez do jogador ${currentPlayer}`;
}

// Adiciona evento de clique em cada célula
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Evento de clique no botão "Reiniciar"
resetBtn.addEventListener('click', resetGame);
