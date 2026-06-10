import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

# ======================
# APP
# ======================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# HEALTH CHECK
# ======================
@app.get("/")
def root():
    return {"status": "ok"}

# ======================
# REQUEST
# ======================
class ChatQuery(BaseModel):
    pregunta: str

# ======================
# CONTEXTO (CARGA UNA VEZ)
# ======================
with open("contexto.txt", "r", encoding="utf-8") as f:
    CONTEXTO = f.read()

# ======================
# GROQ LLM (MUY LIGERO)
# ======================
llm = ChatGroq(
    model_name="llama-3.1-8b-instant",
    temperature=0.2,
    api_key=os.getenv("GROQ_API_KEY")
)

# ======================
# PROMPT
# ======================
prompt = ChatPromptTemplate.from_messages([
    ("system", f"""
Eres Santiago IA, asistente oficial de Santiago Fernández Ehimatie.

Responde de forma natural, clara y profesional.

REGLAS:
- Español siempre
- No inventes información
- Usa SOLO el contexto

CONTEXTO:
{CONTEXTO}
"""),
    ("human", "{input}")
])

chain = prompt | llm

# ======================
# ENDPOINT
# ======================
@app.post("/chat")
async def chat_endpoint(query: ChatQuery):
    try:
        result = chain.invoke({"input": query.pregunta})
        return {"respuesta": result.content}

    except Exception as e:
        return {"respuesta": str(e)}