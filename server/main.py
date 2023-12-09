from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Problem(BaseModel):
    title: str
    code: str
    description: str | None = None
    subtasks: int | None = 1
    model_solution: str
    testscript: str | None
    generators: list[str] 
    validator: str | None
    formatter: str | None

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    "http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "HEAD"],
    allow_headers=["*"]
)

@app.get("/")
def health_check():
    return "Working!"

@app.post("/new_problem")
async def create_new_problem(request: Request):
    problem = await request.json()
    return problem