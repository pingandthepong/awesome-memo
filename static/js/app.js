function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  ul.appendChild(li);
  li.textContent = `[id: ${memo.id}] ${memo.content}`;
}

async function readMemo() {
  const res = await fetch("/memos"); // get
  const data = await res.json();
  console.log(data); // [{...}, {...}]

  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  data.forEach(displayMemo);
}

async function createMemo(value) {
  // post
  const response = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
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
