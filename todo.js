const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add');
const list = document.getElementById('list');

let items = JSON.parse(localStorage.getItem('todo-items') || '[]');

function render(){
  list.innerHTML = '';
  items.forEach((it, idx)=>{
    const li = document.createElement('li');
    li.style.display = 'flex'; li.style.justifyContent = 'space-between'; li.style.gap='8px'; li.style.padding='8px 0';
    li.innerHTML = `<span>${it}</span><div><button class='btn ghost' data-idx='${idx}'>Delete</button></div>`;
    list.appendChild(li);
  });
  list.querySelectorAll('button[data-idx]').forEach(btn => btn.addEventListener('click', (e)=>{
    const idx = Number(btn.getAttribute('data-idx'));
    items.splice(idx,1); saveAndRender();
  }));
}

function saveAndRender(){ localStorage.setItem('todo-items', JSON.stringify(items)); render(); }

addBtn.addEventListener('click', ()=>{
  const v = input.value.trim(); if(!v) return; items.push(v); input.value=''; saveAndRender();
});

input.addEventListener('keydown',(e)=>{ if(e.key === 'Enter'){ addBtn.click(); }});

render();