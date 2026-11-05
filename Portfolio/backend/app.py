from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from pathlib import Path
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

DB_PATH = Path(__file__).with_name("messages.db")

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)

PROFILE = {
    "name": "Bhuvan S.",
    "role": "Python Developer",
    "headline": "I build practical software that makes work simpler.",
    "summary": (
        "Python developer with a B.E. in Computer Science and Engineering "
        "(AI & ML). I build end-to-end applications using Flask, REST APIs, "
        "PostgreSQL and React, with an interest in applied machine learning "
        "and thoughtful product experiences."
    ),
    "location": "Bengaluru, India",
    "email": "bhuvansudhakar80@gmail.com",
    "phone": "+91 78927 94170",
    "linkedin": "https://linkedin.com/in/bhuvan-s-8310591bb",
    "github": "https://github.com/bhuvan2580",
    "availability": "Open to Python Development · Data Science · AI/ML · Full Stack · Web Development",
    "stats": [
        {"value": "0.83", "label": "ROC-AUC score"},
        {"value": "1 week", "label": "Asset system build"},
        {"value": "2", "label": "GATE 2026 papers qualified"}
    ]
}

@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "service": "Bhuvan portfolio API"})

@app.get("/api/profile")
def profile():
    return jsonify(PROFILE)

@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"error": "Please complete all fields."}), 400
    if len(name) > 100 or len(email) > 254 or len(message) > 5000:
        return jsonify({"error": "One or more fields are too long."}), 400
    if "@" not in email or "." not in email.rsplit("@", 1)[-1]:
        return jsonify({"error": "Please enter a valid email address."}), 400

    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
            (name, email, message, datetime.now(timezone.utc).isoformat())
        )
    return jsonify({"message": "Thanks for reaching out. Your message has been received."}), 201

if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=True)
