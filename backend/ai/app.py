from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import joblib
import numpy as np
import pandas as pd
from models.procrastination_predictor import ProcrastinationPredictor
import os

app = FastAPI(title="Procrastination Analysis API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
model = ProcrastinationPredictor()

class TaskData(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: str
    complexity: int
    priority: int
    expected_duration: int
    category: str

class JournalData(BaseModel):
    content: str
    mood: int
    energy_level: int
    date: str

class BehaviorData(BaseModel):
    task_id: str
    postpone_count: int
    time_spent: int
    distractions: List[str]
    completion_time: Optional[str] = None

class AnalysisRequest(BaseModel):
    user_id: str
    tasks: List[TaskData]
    journals: List[JournalData]
    behaviors: List[BehaviorData]

@app.get("/")
def read_root():
    return {"message": "Procrastination Analysis API is running"}

@app.post("/analyze")
def analyze_procrastination(data: AnalysisRequest):
    try:
        # Process the input data
        procrastination_score = model.predict_procrastination_score(data)
        patterns = model.identify_patterns(data)
        recommendations = model.generate_recommendations(data, patterns)
        
        return {
            "procrastination_score": procrastination_score,
            "patterns": patterns,
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/task")
def analyze_task(task: TaskData):
    try:
        # Analyze single task procrastination risk
        risk_score = model.predict_task_risk(task)
        task_recommendations = model.generate_task_recommendations(task, risk_score)
        
        return {
            "risk_score": risk_score,
            "recommendations": task_recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/sentiment")
def analyze_journal(journal: JournalData):
    try:
        # Analyze journal sentiment and related procrastination factors
        sentiment = model.analyze_sentiment(journal.content)
        mood_impact = model.analyze_mood_impact(journal.mood, journal.energy_level)
        
        return {
            "sentiment": sentiment,
            "mood_impact": mood_impact,
            "insights": model.generate_journal_insights(journal)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)