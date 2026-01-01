const cells = Array.from(document.querySelectorAll('.ttt-cell'));
const currentEl = document.getElementById('current');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let board = Array(9).fill('');
let current = 'X';
let running = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateUI(){
  cells.forEach((c,i)=> c.textContent = board[i]);
  currentEl.textContent = current;
}

function checkWin(){
  for(const combo of wins){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      running = false;
      statusEl.textContent = `${board[a]} wins!`;
      return;
    }
  }
  if(board.every(Boolean)){
    running = false; statusEl.textContent = `Draw!`;
  }
}

cells.forEach((cell,idx)=>{
  cell.addEventListener('click', ()=>{
    if(!running || board[idx]) return;
    board[idx] = current; updateUI(); checkWin();
    if(running){ current = current === 'X' ? 'O' : 'X'; currentEl.textContent = current; }
  });
});

resetBtn.addEventListener('click', ()=>{
  board = Array(9).fill(''); current = 'X'; running = true; statusEl.textContent = ''; updateUI();
});

updateUI();