import {db} from './firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'

//Aquí se trabajarán todos los metodos del crud

//1- Crear una constante para la coleccion  (no es necesario para este caso, porque vamos a estar usando varias colecciones)

//2 - Crear y exportar metodos del CRUD
export const onFindAll  = async (collectionString) => {
    const result = await getDocs(query(collection(db,collectionString)))
    return result;
}

export const onFindById= async (collectionString,id) => {
    const result = await getDoc(doc(db,collectionString,id));
    return result;
}

export const onInsert = async (collectionString,objeto) => await addDoc(collection(db,collectionString),objeto)

export const onUpdate = async (collectionString, paramId,nuevoDocumento) => await updateDoc(doc(db,collectionString, paramId), nuevoDocumento)

export const onDelete = async (collectionString,paramId)=> await deleteDoc(doc(db,collectionString,paramId))
