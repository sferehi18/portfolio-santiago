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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.2
)
loader = TextLoader("contexto.txt", encoding="utf-8")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=400, chunk_overlap=40)
docs = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store = FAISS.from_documents(docs, embeddings)
retriever = vector_store.as_retriever(search_kwargs={"k": 3})

system_prompt =  """
Eres Santiago IA, el asistente virtual oficial de Santiago Fernández Ehimatie.

Tu objetivo es responder de forma natural, fluida y profesional sobre su perfil.

REGLAS:
- Responde siempre en español.
- Habla de forma natural, como si fueras un asistente humano.
- Usa el contexto como fuente principal de información.
- Puedes reformular la información para que suene más natural.
- No inventes datos que no aparezcan en el contexto.
- No menciones "contexto", "documentos" ni "información proporcionada".

Si no encuentras la información en el contexto:
responde de forma natural diciendo que no dispones de ese dato y ofrece el correo: Sferehi18@gmail.com.

CONTEXTO:
{context}
"""


prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", """
Responde de forma breve y natural.

Pregunta:
{input}
""")
])


question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

class ChatQuery(BaseModel):
    pregunta: str

@app.post("/chat")
async def chat_endpoint(query: ChatQuery):
    try:
        response = rag_chain.invoke({"input": query.pregunta})
        return {"respuesta": response["answer"]}
    except Exception as e:
        return {"respuesta": f"Error: {str(e)}"}
