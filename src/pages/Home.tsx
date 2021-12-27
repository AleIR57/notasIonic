import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonLabel, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';
import {add, clipboardOutline, checkboxOutline} from 'ionicons/icons'
import CrearNota from '../components/CrearNota';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Redirect} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from "../firebase";


const Home: React.FC = () => {
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
  
    getNotes();
    console.log(notesAux);
  }, []);

  return (
   
  
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center"><IonIcon  icon = {clipboardOutline} ></IonIcon> <IonIcon  icon = {checkboxOutline} ></IonIcon></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
        {notesAux.map((note:any) =>(

          
          <IonCard key = {note.id}>
           <Link  className = "redirigir" to = {`/editar-nota/${note.id}`}>
          <IonCardHeader>
            <IonCardTitle>{note.titulo}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent className = "card-contenido">
            {note.contenido}
      </IonCardContent>
      </Link>
        </IonCard>
      
        )
        )}
      
      
     <IonFab vertical="bottom" horizontal = "end" slot = "fixed">
     
     <Link to = "crear-nota"><IonFabButton ><IonIcon icon ={add} ></IonIcon></IonFabButton></Link>
   
        </IonFab>
      </IonContent>
    
    </IonPage>
  );
};

export default Home;
