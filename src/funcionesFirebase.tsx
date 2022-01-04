import { db, dbStorage } from "./firebase";
import React, {useEffect, useState} from 'react';
import { codeSlashOutline } from "ionicons/icons";

let dibujo:any;


export const addOrEdit = async (linkObject:any) => {
    await db.collection('notas').doc().set(linkObject);
    console.log("Nueva nota agregada");
}

export const addOrEditDraw = async (linkObject:any) => {
    await db.collection('dibujos').doc().set(linkObject);
    console.log("Nuevo dibujo agregado");
}

export const addOrEditTask = async (linkObject:any) => {
    await db.collection('tareas').doc().set(Object.assign({}, linkObject));
    console.log("Nueva tarea agregada");
}


export const getNotes = () =>{
    const docs:any[] = [];
      db.collection('notas').onSnapshot((querySnapshot) =>{
          
        querySnapshot.forEach(doc =>{
         
           
            docs.push({...doc.data(), id:doc.id});
        })
    })

    return docs;
   
}

export const getTask = () =>{
    const docs:any[] = [];
      db.collection('tareas').onSnapshot((querySnapshot) =>{
          
        querySnapshot.forEach(doc =>{
         
           
            docs.push({...doc.data(), id:doc.id});
        })
    })

    return docs;
   
}

export const saveDraw = (draw:any) =>{
    dibujo = draw;
}

export const getDraw = () =>{
    return dibujo;
}

export const onDeleteLink = async (id:any) =>{
        await db.collection('notas').doc(id).delete();
}

export const onDeleteTask = async (id:any) =>{
    await db.collection('tareas').doc(id).delete();
}

export const getLinkById = async (id:any) =>{
    const doc = await db.collection('notas').doc(id).get();
    const data = doc.data();
    return data;
}

export const getLinkTaskById = async (id:any) =>{
    const doc = await db.collection('tareas').doc(id).get();
    const data = doc.data();
    return data;
}


export const updateById = async (id:any, linkObject:any) =>{
    await db.collection('notas').doc(id).update(linkObject)
    console.log("Nota actualizada");
}


export const updateTaskById = async (id:any, linkObject:any) =>{
    await db.collection('tareas').doc(id).update(linkObject)
    console.log("Tarea actualizada");
}


export const uploadFile = async (imagen: any) =>{
    let storageRef = dbStorage.ref();
    let storageRefAux = '';
    await storageRef.child('imagenes/'+'imagen1').put(imagen).then((snapshot:any) => {
        snapshot.ref.getDownloadURL().then((result:any) =>{
            console.log("el resultado en api: " + result);
            return result;
        })
    })
   
}







