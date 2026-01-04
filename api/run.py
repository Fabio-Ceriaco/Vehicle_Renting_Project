# very important: do not remove this code
# this code ensures that the parent directory is in the Python path
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import uvicorn


uvicorn.run("api.app.main:app", host="127.0.0.1", port=8000, reload=False)
