import os
import subprocess
from typing import Annotated, List
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import uuid

def gen_uid():
    return str(uuid.uuid4())

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
    
    uid = gen_uid()
    
    # save all the necessary files here
    os.mkdir(f"files/{uid}")
    cwd = os.path.join(os.getcwd(), 'files', uid)

    # try to run kompgen
    print("Running:", f'kg init {title} --subtask {subtasks}')
    subprocess.Popen(['kg', 'init', title, '--subtask', str(subtasks)], cwd=cwd)    

    return { "info": f"Generated content at {uid}" } 