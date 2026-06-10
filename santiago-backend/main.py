import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
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
# HEALTH CHECK (RENDER OBLIGATORIO)
# ======================
@app.get("/")
def root():
    return {"status": "ok"}


# ======================
# MODEL
# ======================
class ChatQuery(BaseModel):
    pregunta: str


# ======================
# LLM (ligero)
# ======================
llm = ChatGroq(
    model_name="llama-3.1-8b-instant",
    temperature=0.2,
    api_key=os.getenv("GROQ_API_KEY")
)


# ======================
# PROMPT
# ======================
system_prompt = """
Eres Santiago IA, el asistente virtual oficial de Santiago Fernández Ehimatie.

Responde de forma natural, clara y profesional.

REGLAS:
- Español siempre
- No inventes información
- No menciones "contexto" ni "documentos"

Si falta info:
responde de forma natural y da el correo: Sferehi18@gmail.com

CONTEXTO:
{context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "Pregunta:\n{input}")
])


# ======================
# GLOBALS (IMPORTANTE: SOLO 1 VEZ)
# ======================
retriever = None
rag_chain = None


def build_retriever():
    global retriever

    if retriever is None:
        loader = TextLoader("contexto.txt", encoding="utf-8")
        documents = loader.load()

        text_splitter = CharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=100
        )
        docs = text_splitter.split_documents(documents)

        embeddings = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

        vector_store = FAISS.from_documents(docs, embeddings)
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})

    return retriever


def build_chain():
    global rag_chain

    if rag_chain is None:
        rag_chain = create_stuff_documents_chain(llm, prompt)

    return rag_chain


# ======================
# ENDPOINT
# ======================
@app.post("/chat")
async def chat_endpoint(query: ChatQuery):
    try:
        retriever_obj = build_retriever()
        chain = build_chain()

        rag = create_retrieval_chain(retriever_obj, chain)

        result = rag.invoke({"input": query.pregunta})
        return {"respuesta": result["answer"]}

    except Exception as e:
        return {"respuesta": str(e)}