import axios from 'axios'

const baseUrl = `http://localhost:3001/persons`

const getAll = () =>{
    return axios.get(baseUrl).then(response=> response.data)
}

const create =(newObject)=>{
    const request = axios.post(baseUrl,newObject)
    return request.then(response=> response.data)
}
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const remove = (id, removedObject)=>{
    const request = axios.delete(`${baseUrl}/${id}`, {removedObject})
    console.log(`${baseUrl}/${id}`)
    return request.then(response=>(response))
}

export default {getAll,create,remove, update}