import numpy as np
import pandas as pd
from typing import List, Dict, Any
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
from datetime import datetime
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download NLTK data if needed
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

class ProcrastinationPredictor:
    def __init__(self):
        # Path to saved models
        model_path = os.path.join(os.path.dirname(__file__), 'saved_models')
        
        # Initialize sentiment analyzer
        self.sentiment_analyzer = SentimentIntensityAnalyzer()
        
        # Load or create models
        try:
            self.task_risk_model = joblib.load(os.path.join(model_path, 'task_risk_model.pkl'))
            self.procrastination_score_model = joblib.load(os.path.join(model_path, 'procrastination_score_model.pkl'))
        except (FileNotFoundError, OSError):
            # If models don't exist, create dummy models
            # In production, you'd train these properly
            self.task_risk_model = RandomForestRegressor(n_estimators=100, random_state=42)
            self.procrastination_score_model = RandomForestRegressor(n_estimators=100, random_state=42)
            
            # Save directory if it doesn't exist
            os.makedirs(model_path, exist_ok=True)
            
            # Save the models
            joblib.dump(self.task_risk_model, os.path.join(model_path, 'task_risk_model.pkl'))
            joblib.dump(self.procrastination_score_model, os.path.join(model_path, 'procrastination_score_model.pkl'))

    def predict_procrastination_score(self, data):
        """
        Calculate an overall procrastination score based on task, journal, and behavior data
        
        In a real implementation, you would:
        1. Extract features from all data sources
        2. Normalize/scale features
        3. Feed into a trained model
        4. Return prediction
        
        This implementation uses a simplified heuristic approach
        """
        # Extract key metrics from behavior data
        postpone_counts = [b.postpone_count for b in data.behaviors]
        avg_postpone = np.mean(postpone_counts) if postpone_counts else 0
        
        # Task complexity and priority metrics
        task_complexities = [t.complexity for t in data.tasks]
        task_priorities = [t.priority for t in data.tasks]
        avg_complexity = np.mean(task_complexities) if task_complexities else 0
        avg_priority = np.mean(task_priorities) if task_priorities else 0
        
        # Journal mood metrics
        moods = [j.mood for j in data.journals]
        avg_mood = np.mean(moods) if moods else 5  # Assuming 1-10 scale
        
        # Calculate basic procrastination score (0-100)
        # Higher score = more procrastination tendency
        base_score = min(100, max(0, (
            (avg_postpone * 10) +             # More postponements = higher score
            (avg_complexity * 5) -            # More complex tasks can increase score 
            (avg_priority * 3) -              # Higher priority reduces score
            (avg_mood * 2)                    # Better mood reduces score
        )))
        
        # In a real implementation, you'd use the trained model:
        # features = self._extract_features(data)
        # score = self.procrastination_score_model.predict([features])[0]
        
        return round(base_score, 1)

    def predict_task_risk(self, task):
        """
        Predict procrastination risk for a specific task (0-10 scale)
        """
        # Extract task features
        days_until_due = self._calculate_days_until_due(task.due_date)
        
        # Simple heuristic risk calculation
        risk = min(10, max(0, (
            (task.complexity * 1.5) +         # More complex = higher risk
            (task.expected_duration * 0.5) -  # Longer tasks have higher risk
            (task.priority * 0.8) +           # Higher priority reduces risk
            (max(0, 7 - days_until_due) * 0.3) # Tasks due soon have higher risk
        )))
        
        # In a real implementation, you'd use the trained model:
        # features = self._extract_task_features(task)
        # risk = self.task_risk_model.predict([features])[0]
        
        return round(risk, 1)

    def identify_patterns(self, data):
        """
        Identify procrastination patterns from user data
        """
        patterns = []
        
        # Check for frequent postponements
        if any(b.postpone_count > 3 for b in data.behaviors):
            patterns.append({
                "type": "high_postponement",
                "description": "You frequently postpone tasks multiple times"
            })
            
        # Check for time-of-day patterns
        # (In a real implementation, you'd analyze timestamps more thoroughly)
        patterns.append({
            "type": "time_sensitivity",
            "description": "You tend to be more productive in the morning"
        })
        
        # Check for task category patterns
        categories = [t.category for t in data.tasks]
        if categories.count("work") > len(categories) * 0.5:
            patterns.append({
                "type": "category_sensitivity",
                "description": "You procrastinate more on work-related tasks"
            })
            
        # Mood correlation
        if data.journals:
            patterns.append({
                "type": "mood_correlation",
                "description": "Your procrastination increases when your mood score is below 4"
            })
            
        return patterns

    def generate_recommendations(self, data, patterns):
        """
        Generate personalized recommendations based on patterns
        """
        recommendations = []
        
        # Basic recommendations
        recommendations.append({
            "type": "general",
            "title": "Break tasks into smaller steps",
            "description": "Divide complex tasks into smaller, manageable pieces to reduce overwhelm"
        })
        
        # Pattern-specific recommendations
        for pattern in patterns:
            if pattern["type"] == "high_postponement":
                recommendations.append({
                    "type": "technique",
                    "title": "Use the 2-minute rule",
                    "description": "If a task takes less than 2 minutes, do it immediately instead of postponing"
                })
                
            elif pattern["type"] == "time_sensitivity":
                recommendations.append({
                    "type": "schedule",
                    "title": "Schedule important tasks during your peak hours",
                    "description": "Plan your most important work during your most productive time of day"
                })
                
            elif pattern["type"] == "category_sensitivity":
                recommendations.append({
                    "type": "motivation",
                    "title": "Find your 'why' for difficult categories",
                    "description": "Connect work tasks to your larger goals and values to increase motivation"
                })
                
            elif pattern["type"] == "mood_correlation":
                recommendations.append({
                    "type": "wellbeing",
                    "title": "Practice quick mood boosters",
                    "description": "Try a 5-minute walk, brief meditation, or favorite music before starting tasks"
                })
                
        return recommendations

    def generate_task_recommendations(self, task, risk_score):
        """
        Generate recommendations for a specific task based on its risk score
        """
        recommendations = []
        
        if risk_score > 7:
            recommendations.append({
                "priority": "high",
                "title": "Break this down immediately",
                "description": "This task has high procrastination risk. Break it into 3-5 smaller subtasks."
            })
            
        elif risk_score > 4:
            recommendations.append({
                "priority": "medium",
                "title": "Schedule a specific start time",
                "description": "Set a specific time to begin this task and create calendar reminders."
            })
            
        else:
            recommendations.append({
                "priority": "low",
                "title": "Pair with another task",
                "description": "This task has low procrastination risk. Consider pairing it with a higher-risk task."
            })
            
        # Add task-specific recommendations based on attributes
        days_until_due = self._calculate_days_until_due(task.due_date)
        
        if task.complexity > 7 and task.expected_duration > 120:
            recommendations.append({
                "priority": "high",
                "title": "Create a progress tracker",
                "description": "This is a complex, long task. Create checkpoints to track progress."
            })
            
        if days_until_due < 2 and task.priority > 7:
            recommendations.append({
                "priority": "high",
                "title": "Eliminate distractions",
                "description": "This high-priority task is due soon. Work in a distraction-free environment."
            })
            
        return recommendations

    def analyze_sentiment(self, journal_content):
        """
        Analyze sentiment of journal content
        """
        scores = self.sentiment_analyzer.polarity_scores(journal_content)
        
        # Classify sentiment based on compound score
        if scores['compound'] >= 0.05:
            sentiment = "positive"
        elif scores['compound'] <= -0.05:
            sentiment = "negative"
        else:
            sentiment = "neutral"
            
        return {
            "sentiment": sentiment,
            "scores": scores,
            "explanation": f"Your journal entry has a {sentiment} tone overall."
        }

    def analyze_mood_impact(self, mood, energy_level):
        """
        Analyze the impact of mood and energy on procrastination
        """
        # Scale 1-10 for both mood and energy
        mood_impact = (10 - mood) * 0.7  # Lower mood = higher procrastination risk
        energy_impact = (10 - energy_level) * 0.3  # Lower energy = higher procrastination risk
        
        total_impact = (mood_impact + energy_impact) / 10  # Scale 0-1
        
        if total_impact > 0.7:
            risk_level = "high"
            description = "Your current mood and energy levels suggest a high risk of procrastination."
        elif total_impact > 0.4:
            risk_level = "medium"
            description = "Your current mood and energy suggest a moderate risk of procrastination."
        else:
            risk_level = "low"
            description = "Your current mood and energy levels are conducive to productivity."
            
        return {
            "risk_level": risk_level,
            "impact_score": round(total_impact * 10, 1),
            "description": description
        }

    def generate_journal_insights(self, journal):
        """
        Generate insights from journal entries related to procrastination
        """
        # Extract sentiment
        sentiment_analysis = self.analyze_sentiment(journal.content)
        mood_analysis = self.analyze_mood_impact(journal.mood, journal.energy_level)
        
        insights = []
        
        # Generate basic insight based on sentiment
        if sentiment_analysis["sentiment"] == "negative":
            insights.append({
                "type": "warning",
                "title": "Negative outlook detected",
                "description": "Your journal shows signs of negative thinking, which can increase procrastination."
            })
        elif sentiment_analysis["sentiment"] == "positive":
            insights.append({
                "type": "strength",
                "title": "Positive mindset",
                "description": "Your positive outlook is a great foundation for tackling challenging tasks."
            })
            
        # Generate insight based on mood/energy
        if mood_analysis["risk_level"] == "high":
            insights.append({
                "type": "suggestion",
                "title": "Mood intervention needed",
                "description": "Consider a brief mood-boosting activity before tackling important tasks today."
            })
            
        return insights

    def _calculate_days_until_due(self, due_date_str):
        """
        Calculate days until the due date
        """
        try:
            due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00'))
            today = datetime.now()
            delta = due_date - today
            return max(0, delta.days)
        except:
            return 7  # Default if date parsing fails