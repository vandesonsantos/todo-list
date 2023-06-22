import React, { useState, useEffect } from "react"
import "./TodoList.css"
import Icone from "./image/icon.jpg"

function TodoList() {

    const listaStorage = localStorage.getItem("Lista")

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("")

    useEffect(() => {
        localStorage.setItem("Lista", JSON.stringify(lista))
    },[lista])

    function adicionaItem(from) {
        from.preventeDefault()
        if(!novoItem) {
            return
        }
        setLista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("")
        document.getElementById("input-entrada").focus()

    }

    function clicou(index){
        const listaAux = [...lista]
        listaAux[index].isCompleted = !listaAux[index].isCompleted
        setLista(listaAux)
    }

    function deleta(index){
        const listaAux = [...lista]
        listaAux.splice(index, 1)
        setLista(listaAux)
    }

    function deletaTudo(){
        setLista([])
    }

    return (
        <>
        <h1 className="Title">Lista de Tarefa</h1>

        <form className="Form" onSubmit={adicionaItem}>
            <input className="InputTask" 
                type="text" 
                placeholder="Adicione uma tarefa" 
                value={novoItem}
                onChange={(e)=>{setNovoItem(e.target.value)}}
                id="input-entrada"
            />
            <button className="ButtonAddTask">
                Add
            </button>
        </form>

        <div className="TodoList">
            <div style={{textAlign: "center"}}>
                {
                    lista.length < 1
                        ?
                        <img className="icone-central" src={Icone}/>
                        :
                        lista.map((item, index) => (
                            <div key={index} 
                            className={item.isCompleted ? "item completo" : "item"}>
                                <span 
                                onClick={() => { clicou(index) }}>{item.text}
                                </span>

                                <button 
                                onClick={() => { deleta(index) }} 
                                className="BtnDelete">
                                    Delete
                                </button>
                            </div>
                        ))
                        
                }
                {
                    lista.length > 0 &&
                    <button
                    onClick={() => { deletaTudo() }} 
                    className="DeleteAll">
                        Delete todos
                    </button>
                }
                
            </div>
        </div>
        </>
    )
}

export default TodoList
