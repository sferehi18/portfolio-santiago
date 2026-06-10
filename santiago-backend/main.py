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
# HEALTH CHECK (CRÍTICO EN RENDER)
# ======================
@app.get("/")
def root():
    return {"status": "ok"}



# REQUEST MODEL

class ChatQuery(BaseModel):
    pregunta: str



# LOAD RAG (FUNCIÓN LAZY -> EVITA BLOQUEOS EN STARTUP)

def build_rag():

    loader = TextLoader("contexto.txt", encoding="utf-8")
    documents = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=400, chunk_overlap=40)
    docs = text_splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = FAISS.from_documents(docs, embeddings)

    return vector_store.as_retriever(search_kwargs={"k": 3})


retriever = build_rag()


# LLM

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    model_name="llama-3.1-8b-instant",
    temperature=0.2,
    api_key=GROQ_API_KEY
)



# PROMPT

system_prompt = """
Eres Santiago IA, el asistente virtual oficial de Santiago Fernández Ehimatie.

Tu objetivo es responder de forma natural, fluida y profesional sobre su perfil.

REGLAS:
- Responde siempre en español.
- Habla de forma natural.
- Usa el contexto como base.
- No inventes información.
- No menciones "contexto" ni "documentos".

Si no hay información:
responde de forma natural y ofrece el correo: Sferehi18@gmail.com.

CONTEXTO:
{context}
"""


prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "Pregunta:\n{input}")
])


question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)



# ENDPOINT

@app.post("/chat")
async def chat_endpoint(query: ChatQuery):
    try:
        result = rag_chain.invoke({"input": query.pregunta})
        return {"respuesta": result["answer"]}
    except Exception as e:
        return {"respuesta": f"Error: {str(e)}"}