import './CrearNota.css';
import React, { ChangeEvent, Fragment, useState, useEffect, useRef} from 'react';
import { IonButton, IonButtons, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, IonRadioGroup, IonTextarea, IonTitle, IonVirtualScroll } from '@ionic/react';
import { chevronBack, shirtOutline, shareOutline, ellipsisVerticalOutline, checkmark, micOutline, imageOutline, pencilOutline, checkboxOutline, createOutline, stopCircleOutline, alarmOutline, caretDownOutline, phonePortraitOutline } from 'ionicons/icons'
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

    const imageUrl = [{
      id: 1,
      imagen: 'https://i.pinimg.com/originals/4c/ab/b7/4cabb793bba2d9aa44eea4a8ed5582e7.jpg',
    },{
      id: 2,
      imagen: 'https://i.pinimg.com/1200x/4a/ee/d7/4aeed7337f42158be19888bc9cab419c.jpg',
    },{
      id: 3,
      imagen: 'https://i.pinimg.com/originals/70/fc/86/70fc861357f412c8ba0c7728db638649.jpg',
    },{
      id: 4,
      imagen: 'https://i.pinimg.com/236x/94/ca/a4/94caa4610e7d96f29f5090bada16ed20.jpg',
    },{
      id: 5,
      imagen: 'https://cdn.ipadizate.com/2020/08/MixByArthur1992aS.jpg',
    }]

   

  let selected = true;
  let contador = 0;
  let radioButton:any = [];
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [imagenDeFondo, setImagenDeFondo] = useState('');
  const [values, setValues] = useState(initialStateValues);
  const [image, setImage] = useState<string>('');
  const [audio, setAudio] = useState([] as any);


  const divStyle = {
    color: 'black',
    backgroundImage: 'url(' + imagenDeFondo + ')',
    backgroundSize: 'cover',
  };
 

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

  const agregarRadioButton = () =>{
    contador += 1;
    radioButton.push(contador)
    console.log(radioButton);
  }

  const showBackgrounds = () =>{
   setShowBackground(true);
    
  }

  const setBackground = (imagenUrl: string) =>{
    setImagenDeFondo(imagenUrl);
    setShowBackground(false);
  }

  const activateTextOptions = () =>{
    setShowTextOptions(true);
  }





  return (
    
    <div style ={divStyle}>
   
    <form onSubmit = {handleSubmit}>

    <IonItem color = "transparent" lines = "none">

<IonIcon icon = {chevronBack}>

</IonIcon>
{!hoverActivo == true ?  <IonIcon icon = {shareOutline} slot = "end">

</IonIcon> :""}

{!hoverActivo ? <IonIcon icon = {shirtOutline} slot = "end"onClick = {() => showBackgrounds()}>
</IonIcon> : ''}
{!hoverActivo ? 
  <IonButtons slot = "end" class = "grupoBotones" >
    <IonButton   id="trigger-button"  >  <IonIcon icon = {ellipsisVerticalOutline}></IonIcon></IonButton>
    <IonPopover trigger="trigger-button" >
      <IonList >
      <IonItem>
        <IonIcon icon = {alarmOutline}></IonIcon><IonLabel> Recordatorio</IonLabel>
      </IonItem>
      <IonItem>
      <IonIcon icon = {caretDownOutline}></IonIcon><IonLabel> Ocultar</IonLabel>
      </IonItem>
      <IonItem>
      <IonIcon icon = {phonePortraitOutline}></IonIcon><IonLabel> Colocar en la pantalla de inicio</IonLabel>
      </IonItem>
      </IonList>
  </IonPopover>
  </IonButtons>
: ""}
{hoverActivo ?
  <IonButtons slot = "end">
   <IonButton type = "submit" color = "inherit" slot = "end" onMouseEnter = {() => activarHover()}>
   <IonIcon icon = {checkmark} ></IonIcon>
   </IonButton></IonButtons> : ""
  }
 
</IonItem>

  <IonItem color = "transparent" lines = "none" class = "nav">

      <IonInput type = "text" className="form-control" value = {values.titulo} placeholder = "Título" name = "titulo" onMouseEnter = {() => activarHover()}   onMouseLeave = {() => desactivarHover()} onInput = {(e:any) => handleInputChange(e)} ></IonInput>
  </IonItem>
  <IonItem color = "transparent" lines = "none">
  <IonTextarea  rows = {100} autoGrow = {true}   onMouseUp = {() => activarMenu()} value = {values.contenido} onMouseDown= {() => desactivarMenu()} placeholder="Empiece a escribir" name = "contenido" onInput = {(e:any) => handleInputChange(e)}>{image !== '' ? <img src={image} /> : ''}{audio !== '' ?   <embed  src={audio.recordDataBase64} width="100%" height= "50em" />: ''} </IonTextarea>
  </IonItem>

 


  {radioButton.map((radio:any) =>(
     <IonRadioGroup value = {selected}>
     <IonListHeader >
     |
       <IonLabel>Name</IonLabel>
     </IonListHeader>
     
     <IonItem>
       <IonLabel>{radio}</IonLabel>
       <IonRadio slot="start" value="biff" />
     </IonItem>
     </IonRadioGroup>
  ))}
 

 {showBackground?<div className="scrolls">{imageUrl.map((image:any)=> (
 <div className = "imageDiv" key = {image.id}><img src ={image.imagen} onClick = {() => setBackground(image.imagen)}/></div>
 ))}
</div> : ''}

  </form>

    <div className  = "menu-opciones">
    {menuActivo ?  
     <IonItem className = "opciones " color = "transparent" lines = "none" onMouseEnter = {() => activarHover()}>
      {!audioActivo ? <IonIcon icon = {micOutline} className="icono-menu" onClick = {() => recordAudio()}></IonIcon> : <IonIcon icon = {stopCircleOutline} className="icono-menu" onClick = {() => stopAudio()}></IonIcon> } 
     <IonIcon icon = {imageOutline} className="icono-menu" onClick = {() => takePicture()}></IonIcon> 
     <IonIcon icon = {createOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {checkboxOutline} className="icono-menu" onClick = {() => agregarRadioButton()}></IonIcon>
     <IonIcon icon = {pencilOutline} className="icono-menu" onMouseEnter = {() => activarHover()}></IonIcon>
   </IonItem>
 : ""}
     
    

    </div>

    
     
    </div>
    



  );
};

export default CrearNota;

