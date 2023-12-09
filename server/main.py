import os
import subprocess
import json
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
    generators: UploadFile = File(...), # should be a list of files in the future
    validator: UploadFile = File(...),
    formatter: UploadFile = File(...)
):

    
    # save all the necessary files here
    cwd = os.path.join(os.getcwd(), 'files')

    # try to run kompgen
    print("Running:", f'kg init {code} --subtask {subtasks}')
    subprocess.call(['kg', 'init', code, '--subtask', str(subtasks)], cwd=cwd)
    cwd = os.path.join(cwd, code)

    # save the uploaded files
    with open(f'{cwd}/formatter.py', "wb+") as f:
        f.write(formatter.file.read())
    with open(f'{cwd}/validator.py', "wb+") as f:
        f.write(validator.file.read())
    with open(f'{cwd}/generator.py', "wb+") as f:
        f.write(generators.file.read())
    with open(f'{cwd}/testscript', "w+") as f:
        f.write(testscript)  
    solution_type = model_solution.filename.split('.')[-1] # TODO: be able to use different kinds of solution
    with open(f'{cwd}/solution.py', "wb+") as f:
        f.write(model_solution.file.read())
    with open(f'{cwd}/statement.md', "w+") as f:
        f.write(description)
    
    # update the title
    with open(f'{cwd}/details.json') as f:
        details = json.load(f)
    details['title'] = title
    with open(f'{cwd}/details.json', 'w+') as f:
        json.dump(details, f)

    return { "info": f"Generated content at files/{code}" } 