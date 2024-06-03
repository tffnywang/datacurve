from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Code(BaseModel):
    code: str

@app.post("/execute")
async def execute_code(code: Code):
    try:
        # Write code to a temporary file
        with open("temp_code.py", "w") as f:
            f.write(code.code)
        
        # Execute the code using subprocess
        result = subprocess.run(["python", "temp_code.py"], capture_output=True, text=True)
        return {"output": result.stdout, "error": result.stderr}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
