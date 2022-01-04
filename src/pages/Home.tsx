import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, SearchbarChangeEventDetail } from '@ionic/react';

import './Home.css';
import {add, clipboardOutline, checkboxOutline} from 'ionicons/icons'
import CrearNota from '../components/CrearNota';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Redirect} from 'react-router-dom';
import React, { useEffect, useState, useRef, useDebugValue } from 'react';
import { db, dbStorage } from "../firebase";


const Home: React.FC = () => {

  const ionSegment:any = useRef<HTMLIonSegmentElement>(null);
 
  const [activateNotas, setActivateNotas] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActivated, setFilterActivated] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([
  {
    id: '',
    titulo: '',
    contenido: '',
    imagen: '',
    audio: '',
    fondo: '',
    fechaCreacion: '',
    fechaActualizacion: '',
    dibujo: '',
  }])
  
 

  const [notesAux, setNotesAux] = useState([] as any);
  const [taskAux, setTaskAux] = useState([] as any);

  

  const getNotes = async () =>{
    
       db.collection('notas').onSnapshot((querySnapshot) =>{
        const docs:any[] = [];
        querySnapshot.forEach((doc) =>{
            docs.push({...doc.data(), id:doc.id});
        });
        setNotesAux(docs);
        
      
        ionSegment.current.value = 'notas';
        setActivateNotas(true);
    });
    setFilteredSearch(notesAux);
  
};

const getTask = async () =>{
    
  db.collection('tareas').onSnapshot((querySnapshot) =>{
   const docs:any[] = [];
   querySnapshot.forEach((doc) =>{
       docs.push({...doc.data(), id:doc.id});
   });
   setTaskAux(docs);
   
 
});

};


  useEffect(()=>{
   
    getNotes();
    getTask();
    console.log(taskAux);
    
    let tempSearchResult = notesAux.filter((ele:any) => ele.titulo.includes(searchQuery));
    if(tempSearchResult.length == 1){
      setFilterActivated(true)
    }
      console.log(tempSearchResult);
      setFilteredSearch([...tempSearchResult]);
      console.log(filteredSearch);
   

      
  }, [searchQuery]);



  const segmentChanged = (e: CustomEvent) =>{
    
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
          {activateNotas?
          <IonItem>
          <IonSearchbar class = "searchbar" placeholder = "Buscar nota" value={searchQuery} onIonChange={e => setSearchQuery(e.detail.value!) }></IonSearchbar>
          </IonItem>:''}
          {!activateNotas?
          <IonItem>
          <IonSearchbar class = "searchbar" placeholder = "Buscar tarea" value={searchQuery} onIonChange={e => setSearchQuery(e.detail.value!) }></IonSearchbar>
          </IonItem>:''}
       
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
      {activateNotas?
    <div>
     
      {filteredSearch.map((search) => (  <IonCard key = {search.id}>
           <Link  className = "redirigir" to = {`/editar-nota/${search.id}`}>
          <IonCardHeader>
            <IonCardTitle>{search.titulo}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className ="card-contenido">
            
            {search.fechaActualizacion.substr(4,17)}
          </IonCardContent>
        
      </Link>
        </IonCard>))}

        {!filterActivated ? <div>
        {notesAux.map((search:any) => (  <IonCard key = {search.id}>
           <Link  className = "redirigir" to = {`/editar-nota/${search.id}`}>
          <IonCardHeader>
            <IonCardTitle>{search.titulo}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent  className ="card-contenido">
            {search.fechaActualizacion.substr(4,17)}
          </IonCardContent>

  
      </Link>
        </IonCard>))}
        </div> : ''}
        
        </div>: ''}

        {!activateNotas?
    <div>
        {taskAux.map((value:any, index:any) => (
          <IonCard key = {index}>
          <Link  className = "redirigir" to = {`/editar-tarea/${value.id.replace("%20", "")}`}>
         <IonCardHeader>
           <IonCardTitle>{value.title}</IonCardTitle>

         </IonCardHeader>

 
     </Link>
       </IonCard>
        ))}
  
        </div>: ''}
{activateNotas? 
          <IonFab vertical="bottom" horizontal = "end" slot = "fixed">
     
     <Link to = "crear-nota"><IonFabButton ><IonIcon icon ={add} ></IonIcon></IonFabButton></Link>
   
        </IonFab>  : ''}

        {!activateNotas? 
          <IonFab vertical="bottom" horizontal = "end" slot = "fixed">
     
     <Link to = "crear-tarea"><IonFabButton ><IonIcon icon ={add} ></IonIcon></IonFabButton></Link>
   
        </IonFab>  : ''}

      
      
    
      </IonContent>
      
    
    </IonPage>
  );
};

export default Home;
