from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

class Memo(BaseModel):
  id: int
  content: str

memos = []

@app.post("/memos")
def create_memo(memo: Memo):
  memos.append(memo)
  return "메모 추가에 성공했습니다."

@app.get("/memos")
def read_memo():
  return memos

@app.put("/memos/{memo_id}")
def put_memo(memo_id: int, req_memo: Memo):
  for memo in memos:
    if memo.id == memo_id:
      memo.content = req_memo.content
      return "수정 성공"
  return "id에 해당하는 메모가 없습니다."

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int):
  for index, memo in enumerate (memos):
    if memo.id == memo_id:
      memos.pop(index)
      return "삭제 성공"
  return "id에 해당하는 메모가 없습니다."

app.mount("/", StaticFiles(directory="static", html=True), name="static")