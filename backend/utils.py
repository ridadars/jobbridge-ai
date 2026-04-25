import os
import re
import fitz  # PyMuPDF
from groq import Groq
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq client once
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ─────────────────────────────────────────────
# Function 1: Extract text from a PDF file
# ─────────────────────────────────────────────
def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Takes raw PDF bytes, uses PyMuPDF to extract all text.
    Returns a single cleaned string.
    Raises HTTPException 400 if no text could be extracted.
    """
    try:
        # Open PDF from bytes (not from file path)
        pdf_document = fitz.open(stream=file_bytes, filetype="pdf")

        full_text = ""
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]
            page_text = page.get_text()
            full_text += page_text + "\n"

        pdf_document.close()

        # Clean up excessive whitespace and blank lines
        cleaned = re.sub(r'\n{3,}', '\n\n', full_text)   # max 2 consecutive newlines
        cleaned = re.sub(r'[ \t]+', ' ', cleaned)          # collapse spaces/tabs
        cleaned = cleaned.strip()

        if not cleaned or len(cleaned) < 50:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF. Please ensure it is not scanned."
            )

        return cleaned

    except HTTPException:
        raise  # re-raise our own exceptions
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not extract text from PDF. Please ensure it is not scanned. Error: {str(e)}"
        )


# ─────────────────────────────────────────────
# Function 2: Call Groq AI with a prompt
# ─────────────────────────────────────────────
def call_groq_ai(prompt: str) -> str:
    """
    Sends a prompt to Groq and returns the response text.
    Raises HTTPException 503 if the AI call fails.
    """
    try:
        model_name = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
        completion = client.chat.completions.create(
            model=model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=1500,
            temperature=0.7,
        )

        # Extract the text content from the response
        response_text = completion.choices[0].message.content
        return response_text.strip()

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service temporarily unavailable. Please try again in a moment. Error: {str(e)}"
        )


# ─────────────────────────────────────────────
# Function 3: Parse structured AI response into sections
# ─────────────────────────────────────────────
def parse_sections(text: str, headers: list) -> dict:
    """
    Splits an AI response into sections based on header names.
    
    Example:
        headers = ["STRENGTHS", "WEAK POINTS"]
        text = "STRENGTHS:\n- Good\nWEAK POINTS:\n- Bad"
        returns {"STRENGTHS": "- Good", "WEAK POINTS": "- Bad"}
    
    If a section is not found, returns "No data returned" for that section.
    """
    result = {}

    for i, header in enumerate(headers):
        # Build a regex to find content between this header and the next one
        # Headers may appear as "HEADER:" or "HEADER :"
        header_pattern = re.escape(header) + r'\s*:?'

        # Figure out the end boundary (next header or end of string)
        if i + 1 < len(headers):
            next_header_pattern = re.escape(headers[i + 1]) + r'\s*:?'
            pattern = header_pattern + r'\s*(.*?)\s*(?=' + next_header_pattern + r'|$)'
        else:
            pattern = header_pattern + r'\s*(.*?)$'

        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)

        if match:
            content = match.group(1).strip()
            result[header] = content if content else "No data returned"
        else:
            result[header] = "No data returned"

    return result


# ─────────────────────────────────────────────
# Helper: Parse interview questions from AI response
# ─────────────────────────────────────────────
def parse_interview_questions(text: str) -> list:
    """
    Takes AI response with numbered questions and returns a list of 4 questions.
    Handles formats like "1. Question" or "1) Question".
    """
    lines = text.strip().split('\n')
    questions = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Remove numbering like "1.", "1)", "Q1.", etc.
        cleaned = re.sub(r'^[Qq]?\d+[\.\)]\s*', '', line).strip()
        if cleaned and len(cleaned) > 10:  # must be a real question
            questions.append(cleaned)

    # Return exactly 4 (pad or trim as needed)
    if len(questions) >= 4:
        return questions[:4]
    elif len(questions) > 0:
        return questions
    else:
        # Fallback: return generic questions if parsing fails
        return [
            "Tell me about yourself and your background.",
            "What are your greatest strengths and how do they apply to this role?",
            "Describe a challenging project you worked on and how you handled it.",
            "Where do you see yourself in 5 years?"
        ]


# ─────────────────────────────────────────────
# Helper: Parse skills lists from AI response
# ─────────────────────────────────────────────
def parse_bullet_list(text: str) -> list:
    """
    Takes a block of text with bullet points and returns a clean Python list.
    Handles •, -, *, and plain lines.
    """
    lines = text.strip().split('\n')
    items = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Remove bullet characters
        cleaned = re.sub(r'^[•\-\*]\s*', '', line).strip()
        if cleaned:
            items.append(cleaned)

    return items
