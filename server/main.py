import os
import subprocess
import json
import uuid
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

def get_cwd():
    return os.path.join(os.getcwd(), 'files')

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
    cwd = get_cwd()

    # try to run kompgen
    print("Running:", f'kg init {code} --subtask {subtasks}')
    subprocess.call(['kg', 'init', code, '--subtask', str(subtasks)], cwd=cwd)
    cwd = os.path.join(cwd, code)

    # save the uploaded files
    with open(os.path.join(cwd, 'formatter.py'), "wb+") as f:
        f.write(formatter.file.read())
    with open(os.path.join(cwd, 'validator.py'), "wb+") as f:
        f.write(validator.file.read())
    with open(os.path.join(cwd, generators.filename), "wb+") as f:
        f.write(generators.file.read())
    with open(os.path.join(cwd, 'testscript'), "w+") as f:
        f.write(testscript)  
    solution_type = model_solution.filename.split('.')[-1] # TODO: be able to use different kinds of solution
    with open(os.path.join(cwd, 'solution.py'), "wb+") as f:
        f.write(model_solution.file.read())
    with open(os.path.join(cwd, 'statement.md'), "w+") as f:
        f.write(description)
    
    # update the title
    with open(os.path.join(cwd, 'details.json')) as f:
        details = json.load(f)
    details['title'] = title
    with open(os.path.join(cwd, 'details.json'), 'w+') as f:
        json.dump(details, f)
    
    # generate the content
    print("Generating the test cases")
    subprocess.call(['kg', 'make', 'all'], cwd=cwd)

    return { "info": f"Generated content at files/{code}" } 

@app.post("/{code}/submit")
def judge_solution(code: str, attempt: UploadFile = File(...)):

    cwd = os.path.join(get_cwd(), code)

    # check if problem exists
    if not os.path.isdir(cwd):
        return { "status": "fail", "info": "Invalid problem code" }

    # save the submission
    solution_type = attempt.filename.split('.')[-1]
    submission_filepath = str(uuid.uuid4()) + '.' + solution_type
    with open(os.path.join(cwd, submission_filepath), 'wb+') as f:
        f.write(attempt.file.read())
    
    # test the attempt on the problem
    command = f'kg test -i tests\\*.in -o tests\\*.ans -f {submission_filepath}'.split()
    fail_msg = None
    try:
        output = subprocess.check_output(command, cwd=cwd, universal_newlines=True)
        results_str = list(filter(lambda line: line[:4] == 'File' and 'CHECKING AGAINST' not in line, output.split('\n')))
        results_score = list(map(lambda line: 1 if 'correct' in line else 0, results_str))
    except Exception as e:
        fail_msg = { "status": "fail", "info": e }
    
    # delete temp file
    os.remove(os.path.join(cwd, submission_filepath))

    if fail_msg:
        return fail_msg

    return { "status": "success", "submission": results_score }