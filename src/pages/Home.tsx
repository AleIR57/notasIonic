import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonLabel, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';
import {add, clipboardOutline, checkboxOutline} from 'ionicons/icons'
import CrearNota from '../components/CrearNota';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Redirect} from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { db, dbStorage } from "../firebase";


const Home: React.FC = () => {

  const ionSegment:any = useRef<HTMLIonSegmentElement>(null);
  const [activateNotas, setActivateNotas] = useState(true);


  const [notesAux, setNotesAux] = useState([] as any);

  

  const getNotes = async () =>{
    
       db.collection('notas').onSnapshot((querySnapshot) =>{
        const docs:any[] = [];
        querySnapshot.forEach((doc) =>{
            docs.push({...doc.data(), id:doc.id});
        });
        setNotesAux(docs);
    });


   
};

  useEffect(()=>{
    ionSegment.current.value = 'notas';
    setActivateNotas(true);
    getNotes();
    console.log(notesAux);
  }, []);

  const segmentChanged = (e: CustomEvent) =>{
    console.log(e.detail.value);
    if(!activateNotas){
      setActivateNotas(true)
    }
    else{
      setActivateNotas(false);
    }
   
  }


  return (
   
  
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonSegment ref = {ionSegment} onIonChange = {(e) => segmentChanged(e)}>
              <IonSegmentButton value = "notas"><IonLabel></IonLabel><IonIcon  icon = {clipboardOutline} ></IonIcon></IonSegmentButton>
              <IonSegmentButton value = "tareas"><IonLabel></IonLabel><IonIcon  icon = {checkboxOutline} ></IonIcon></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
    
      
  
        {notesAux.map((note:any) =>(
        <div  key = {note.id}>
            {activateNotas? 
          <IonCard>
           <Link  className = "redirigir" to = {`/editar-nota/${note.id}`}>
          <IonCardHeader>
            <IonCardTitle>{note.titulo}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent className = "card-contenido">
            {note.contenido}
      </IonCardContent>
      </Link>
        </IonCard>
  
      : ''}
     
        </div>
        
        )
        )}    

{activateNotas? 
          <IonFab vertical="bottom" horizontal = "end" slot = "fixed">
     
     <Link to = "crear-nota"><IonFabButton ><IonIcon icon ={add} ></IonIcon></IonFabButton></Link>
   
        </IonFab>  : ''}

      
      
    
      </IonContent>
      
    
    </IonPage>
  );
};

export default Home;
