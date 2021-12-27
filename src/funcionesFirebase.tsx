import { db } from "./firebase";
import React, {useEffect} from 'react';




export const addOrEdit = async (linkObject:any) => {
    await db.collection('notas').doc().set(linkObject);
    console.log("Nueva nota agregada");
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


export const onDeleteLink = async (id:any) =>{
        await db.collection('notas').doc(id).delete();
        console.log("Nota eliminada");
}

export const getLinkById = async (id:any) =>{
    const doc = await db.collection('notas').doc(id).get();
    const data = doc.data();
    return data;
}

export const updateById = async (id:any, linkObject:any) =>{
    await db.collection('notas').doc(id).update(linkObject)
    console.log("Nota actualizada");
}







