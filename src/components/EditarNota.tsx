import './EditarNota.css';
import React, { ChangeEvent, Fragment, useEffect, useState} from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTextarea } from '@ionic/react';
import { chevronBack, shirtOutline, shareOutline, ellipsisVerticalOutline, checkmark, micOutline, imageOutline, pencilOutline, checkboxOutline, createOutline } from 'ionicons/icons'
import '../funcionesFirebase';
import { addOrEdit, getLinkById, updateById } from '../funcionesFirebase';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

interface ContainerProps {

 }

const EditarNota: React.FC<ContainerProps> = () => {

    let valuesAux:any;
    let id:any = useParams();
    id = String(Object.keys(id).map(k => id[k]));
  

  const [hoverActivo, setHoverActivo] = useState(false);
  const [menuActivo, setMenuActivo] = useState(false);

  const initialStateValues:any = {
    titulo: '',
    contenido: '',
    };

  const [values, setValues] = useState(initialStateValues);

  useEffect(() =>{
    
    getLinkById(id).then(function (result){
       valuesAux = result;
        setValues({...valuesAux})
       console.log(values);
   });


  }, [])

 
 
  const [currentId, setCurrentId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<any>)  =>{
    const {name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e: React.ChangeEvent<any>) =>{
    e.preventDefault();
    updateById(id, values);
    setValues({...initialStateValues});
    <Link to = "/inicio"></Link>
  }

  const activarHover = () =>{
    setHoverActivo(true);
    
  }

  const desactivarHover = () =>{
    setHoverActivo(false);
  }

  const activarMenu = () =>{
    setHoverActivo(true);
    setMenuActivo(true);
  }

  const desactivarMenu = () =>{
    setHoverActivo(false);
    setMenuActivo(false);
  }

  return (
     
    <div>
    <form onSubmit = {handleSubmit}>
    <IonItem >

<IonIcon icon = {chevronBack}>

</IonIcon>
{!hoverActivo == true ?  <IonIcon icon = {shareOutline} >

</IonIcon> :""}
{!hoverActivo ?  
<IonIcon icon = {shirtOutline}>
</IonIcon> : ""}
{!hoverActivo ? 
<IonIcon icon = {ellipsisVerticalOutline}> </IonIcon>: ""}
{hoverActivo ?
   <IonButton type = "submit" color = "inherit" slot = "end" onMouseEnter = {() => activarHover()}>
   <IonIcon icon = {checkmark} ></IonIcon>
   </IonButton> : ""
  }
 
</IonItem>

  <IonItem>

      <IonInput type = "text" className="form-control" value = {values.titulo} placeholder = "Título" name = "titulo" onMouseEnter = {() => activarHover()}   onMouseLeave = {() => desactivarHover()} onInput = {(e:any) => handleInputChange(e)} ></IonInput>
  </IonItem>
  <IonItem>
  <IonTextarea onMouseEnter = {() => activarMenu()} value = {values.contenido} onMouseLeave = {() => desactivarMenu()} placeholder="Empiece a escribir" name = "contenido" onInput = {(e:any) => handleInputChange(e)}></IonTextarea>
  </IonItem>
 
  </form>

    <div className  = "menu-opciones">
    {menuActivo ?  
     <IonItem className = "opciones">
     <IonIcon icon = {micOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {imageOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {createOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {checkboxOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {pencilOutline} className="icono-menu"></IonIcon>
   </IonItem>
 : ""}
     

    </div>
     
    </div>
    



  );
};

export default EditarNota;
