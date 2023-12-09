from typing import Annotated, List
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://127.0.0.1:5173",
    "http://127.0.0.1"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "HEAD"],
    allow_headers=["*"]
)

@app.get("/")
def health_check():
    return "Working!!!"

@app.post("/new_problem")
async def create_new_problem(
    title: str = Form(...),
    code: str = Form(...),
    description: str = Form(...),
    subtasks: int = Form(...),
    model_solution: UploadFile = File(...),
    testscript: str = Form(...),
    generators: UploadFile = File(...),
    validator: UploadFile = File(...),
    formatter: UploadFile = File(...)
):
    pass