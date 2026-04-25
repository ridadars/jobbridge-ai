import sqlite3
import json
from datetime import datetime

# SQLite database file path
DB_PATH = "jobbridge.db"


# ─────────────────────────────────────────────
# Initialize the database and create tables
# ─────────────────────────────────────────────
def init_db():
    """
    Creates the SQLite database file and all tables if they don't exist.
    Called once when the app starts up.
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Table: cv_analyses — stores each CV analysis result
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cv_analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cv_text TEXT NOT NULL,
            analysis_result TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    # Table: interview_sessions — stores interview question sets
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS interview_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_role TEXT NOT NULL,
            questions TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    # Table: linkedin_optimizations — stores LinkedIn rewrites
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS linkedin_optimizations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            original_summary TEXT NOT NULL,
            optimized_summary TEXT NOT NULL,
            job_role TEXT,
            created_at TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()
    print("✅ Database initialized successfully.")


# ─────────────────────────────────────────────
# Helper: get a database connection
# ─────────────────────────────────────────────
def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # allows dict-like row access
    return conn


# ─────────────────────────────────────────────
# CV Analyses
# ─────────────────────────────────────────────
def save_cv_analysis(cv_text: str, analysis_result: dict):
    """
    Saves a CV analysis result to the database.
    analysis_result is a dict that gets serialized to JSON.
    """
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO cv_analyses (cv_text, analysis_result, created_at) VALUES (?, ?, ?)",
            (
                cv_text[:2000],              # Store first 2000 chars only
                json.dumps(analysis_result),  # Serialize dict to JSON string
                datetime.utcnow().isoformat()
            )
        )
        conn.commit()
    except Exception as e:
        print(f"DB Warning: Could not save CV analysis: {e}")
    finally:
        conn.close()


def get_recent_analyses(limit: int = 10) -> list:
    """
    Returns the most recent CV analyses from the database.
    """
    conn = get_connection()
    try:
        cursor = conn.execute(
            "SELECT id, created_at, analysis_result FROM cv_analyses ORDER BY created_at DESC LIMIT ?",
            (limit,)
        )
        rows = cursor.fetchall()
        return [
            {
                "id": row["id"],
                "created_at": row["created_at"],
                "analysis": json.loads(row["analysis_result"])
            }
            for row in rows
        ]
    except Exception as e:
        print(f"DB Warning: Could not fetch analyses: {e}")
        return []
    finally:
        conn.close()


# ─────────────────────────────────────────────
# Interview Sessions
# ─────────────────────────────────────────────
def save_interview_session(job_role: str, questions: list):
    """
    Saves an interview session (job role + questions) to the database.
    """
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO interview_sessions (job_role, questions, created_at) VALUES (?, ?, ?)",
            (
                job_role,
                json.dumps(questions),
                datetime.utcnow().isoformat()
            )
        )
        conn.commit()
    except Exception as e:
        print(f"DB Warning: Could not save interview session: {e}")
    finally:
        conn.close()


# ─────────────────────────────────────────────
# LinkedIn Optimizations
# ─────────────────────────────────────────────
def save_linkedin_optimization(original: str, optimized: str, job_role: str = None):
    """
    Saves a LinkedIn optimization result to the database.
    """
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO linkedin_optimizations (original_summary, optimized_summary, job_role, created_at) VALUES (?, ?, ?, ?)",
            (
                original[:1000],
                optimized[:2000],
                job_role or "",
                datetime.utcnow().isoformat()
            )
        )
        conn.commit()
    except Exception as e:
        print(f"DB Warning: Could not save LinkedIn optimization: {e}")
    finally:
        conn.close()
