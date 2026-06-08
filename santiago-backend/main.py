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
    temperature=0.1
)
loader = TextLoader("contexto.txt", encoding="utf-8")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=400, chunk_overlap=40)
docs = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store = FAISS.from_documents(docs, embeddings)
retriever = vector_store.as_retriever(search_kwargs={"k": 2})

system_prompt = """
Eres Santiago IA, el asistente virtual oficial de Santiago Fernández Ehimatie.

Tu función es responder preguntas sobre su perfil profesional, experiencia laboral, formación académica, proyectos, habilidades técnicas y disponibilidad profesional.

Normas de comportamiento:

* Responde siempre en español.
* Sé cordial, profesional y directo.
* Utiliza únicamente la información proporcionada en el contexto.
* Resume la información de forma clara y fácil de entender.
* Cuando te pregunten por experiencia, tecnologías o proyectos, destaca los aspectos más relevantes para reclutadores y empresas.
* Si la pregunta está relacionada con contratación, enfatiza sus conocimientos en Desarrollo Web Full Stack, Inteligencia Artificial, Big Data y AWS.
* Si te preguntan por habilidades técnicas, organiza la respuesta por categorías cuando sea útil.
* Si te preguntan por formas de contacto, proporciona el correo electrónico y LinkedIn.
* Si te preguntan por disponibilidad laboral, indica que dispone de permiso de conducir B y disponibilidad inmediata.
* Si la información solicitada no aparece en el contexto, responde exactamente:

"No dispongo de esa información en este momento, pero puedes consultarle directamente a Santiago en su correo: [Sferehi18@gmail.com](mailto:Sferehi18@gmail.com)."

Información del contexto:

{context}
"""


prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
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
