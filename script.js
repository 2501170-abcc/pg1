const memoInput = document.getElementById("memoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

let memos = JSON.parse(localStorage.getItem("memos")) || [];

memos.forEach(memo => {
  addMemoToDOM(memo.text, memo.date);
});

addBtn.addEventListener("click", () => {
  const text = memoInput.value.trim();
  if (text === "") return;

  const date = new Date().toLocaleString("ja-JP");

  const memo = { text, date };
  memos.push(memo);
  saveMemos();

  addMemoToDOM(text, date);
  memoInput.value = "";
});

function addMemoToDOM(text, date) {
  const li = document.createElement("li");
  li.className = "memo-item";

  const memoText = document.createElement("p");
  memoText.textContent = text;

  const memoDate = document.createElement("span");
  memoDate.textContent = date;
  memoDate.className = "memo-date";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    memos = memos.filter(m => !(m.text === text && m.date === date));
    saveMemos();
  });

  li.appendChild(memoText);
  li.appendChild(memoDate);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
}
