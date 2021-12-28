import './CrearNota.css';
import React, { ChangeEvent, Fragment, useState, useEffect} from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTextarea } from '@ionic/react';
import { chevronBack, shirtOutline, shareOutline, ellipsisVerticalOutline, checkmark, micOutline, imageOutline, pencilOutline, checkboxOutline, createOutline, stopCircleOutline } from 'ionicons/icons'
import '../funcionesFirebase';
import { addOrEdit } from '../funcionesFirebase';
import { Camera, CameraResultType} from '@capacitor/camera'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';



interface ContainerProps { }

const CrearNota: React.FC<ContainerProps> = () => {
 

  const [hoverActivo, setHoverActivo] = useState(false);
  const [menuActivo, setMenuActivo] = useState(false);
  const [audioActivo, setAudioActivo] = useState(false);

  const initialStateValues = {
    titulo: '',
    contenido: '',
    };

  

  const [values, setValues] = useState(initialStateValues);
  const [image, setImage] = useState<string>('');
  const [audio, setAudio] = useState([] as any);

  const handleInputChange = (e: React.ChangeEvent<any>)  =>{
    const {name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e: React.ChangeEvent<any>) =>{
    e.preventDefault();
    addOrEdit(values);
    setValues({...initialStateValues});
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

  const takePicture = async () =>{
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })
    setImage(photo.webPath || ''); 
  }

  const recordAudio = async ()=>{
    VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => setAudioActivo(result.value))

   
      VoiceRecorder.startRecording()
  .then((result: GenericResponse) => setAudioActivo(result.value))
  .catch(error => console.log(error))
  }

  const stopAudio = async ()=>{
    VoiceRecorder.stopRecording()
    .then((result: RecordingData) => setAudio(result.value))
    
    .catch(error => console.log(error))
    setAudioActivo(false);
    console.log(audio);
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
  <IonItem >
  <IonTextarea autoGrow = {true}   onMouseUp = {() => activarMenu()} value = {values.contenido} onMouseDown= {() => desactivarMenu()} placeholder="Empiece a escribir" name = "contenido" onInput = {(e:any) => handleInputChange(e)}>{image !== '' ? <img src={image} /> : ''}{audio !== '' ?   <embed  src={audio.recordDataBase64} width="100%" height= "50em" />: ''} </IonTextarea>
  </IonItem>

 



 
  </form>

    <div className  = "menu-opciones">
    {menuActivo ?  
     <IonItem className = "opciones " onMouseEnter = {() => activarHover()}>
      {!audioActivo ? <IonIcon icon = {micOutline} className="icono-menu" onClick = {() => recordAudio()}></IonIcon> : <IonIcon icon = {stopCircleOutline} className="icono-menu" onClick = {() => stopAudio()}></IonIcon> } 
     <IonIcon icon = {imageOutline} className="icono-menu" onClick = {() => takePicture()}></IonIcon> 
     <IonIcon icon = {createOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {checkboxOutline} className="icono-menu" onMouseEnter = {() => activarHover()}></IonIcon>
     <IonIcon icon = {pencilOutline} className="icono-menu" onMouseEnter = {() => activarHover()}></IonIcon>
   </IonItem>
 : ""}
     
     

    </div>
     
    </div>
    



  );
};

export default CrearNota;

