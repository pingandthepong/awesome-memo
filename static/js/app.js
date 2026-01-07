async function editMemo(e) {
  const id = e.target.dataset.id;
  const editInput = prompt("수정사항을 입력하세요.");

  // put
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });

  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.textContent = `[id: ${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.textContent = "수정";
  editBtn.dataset.id = memo.id;
  editBtn.addEventListener("click", editMemo);

  ul.append(li);
  li.append(editBtn);
}

async function readMemo() {
  // get
  const res = await fetch("/memos");
  const memos = await res.json();
  // console.log(memos); // 서버의 memos

  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  memos.forEach(displayMemo);
}

async function createMemo(value) {
  // post
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });

  readMemo();
}

function handleSubmit(e) {
  e.preventDefault();

  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
readMemo();
