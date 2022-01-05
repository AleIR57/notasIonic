import './CrearNota.css';
import React, { ChangeEvent, Fragment, useState, useEffect, useRef} from 'react';
import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRow, IonTextarea, IonTitle, IonVirtualScroll } from '@ionic/react';
import { chevronBack, shirtOutline, shareOutline, ellipsisVerticalOutline, checkmark, micOutline, imageOutline, pencilOutline, checkboxOutline, createOutline, stopCircleOutline, alarmOutline, caretDownOutline, phonePortraitOutline } from 'ionicons/icons'
import '../funcionesFirebase';
import { addOrEdit, getDraw, saveDraw} from '../funcionesFirebase';
import { Camera, CameraResultType} from '@capacitor/camera'
import { Redirect, useHistory, useParams } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import { copyFileSync } from 'fs';
import CanvasDraw from "react-canvas-draw";
import {Share} from '@capacitor/share'



interface ContainerProps { }

const CrearNota: React.FC<ContainerProps> = () => {
  const accordion = useRef<HTMLIonAccordionElement>(null);
  const canvas = useRef<CanvasDraw>(null);
  const textArea = useRef<HTMLIonTextareaElement>(null);
  const [textVal, setTextVal] = useState('');
  const [textFromTextArea, setTextFromTextArea] = useState(''); 
  const [seleccionarTexto, setSeleccionarTexto] = useState(true);
  const [hoverActivo, setHoverActivo] = useState(false);
  const [menuActivo, setMenuActivo] = useState(false);
  const [audioActivo, setAudioActivo] = useState(false);
  const history = useHistory();

  let base64data:any;
  let dibujo = '';


  const initialStateValues = {
    titulo: '',
    contenido: '',
    imagen: '',
    audio: '',
    fondo: '',
    fechaCreacion: '',
    fechaActualizacion: '',
    dibujo: '',
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
    },{
      id: 6,
      imagen: 'http://www.solofondos.com/wp-content/uploads/2018/03/873385d2a6dd10850b68ab2bea04f6e0.jpg',
    },{
      id: 7,
      imagen: 'https://www.todofondos.net/wp-content/uploads/todofondos-colorespasteles2-576x1024.jpg',
    },{
      id: 8,
      imagen: 'https://i.pinimg.com/236x/ee/2d/08/ee2d08f4d540f26f1de0cff889c52f01.jpg',
    },{
      id: 9,
      imagen: 'https://i.pinimg.com/236x/b1/1f/11/b11f11ab6a30cae10d60282c0caadc1b.jpg',
    },{
      id: 10,
      imagen: 'https://i.pinimg.com/originals/a3/fd/e8/a3fde80aebe2d21538eeb49c63586bc1.jpg',
    }]

   
  let alto:any = 200;
  let ancho:any = 200;
  let selected = true;
  let contador = 0;
  let radioButton:any = [];
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [imagenDeFondo, setImagenDeFondo] = useState('');
  const [values, setValues] = useState(initialStateValues);
  const [image, setImage] = useState<any>('');
  const [audio, setAudio] = useState([] as any);
 

  const divStyle = {
    color: 'black',
    backgroundImage: 'url(' + imagenDeFondo + ')',
    backgroundSize: 'cover',
  
  };
 
  useEffect(() =>{
    
    let fechaInicio:Date = new Date();
    let fechaUpdate:Date = new Date();
    let draw: any = getDraw();
    setValues({...values, ['fechaCreacion']: String(fechaInicio), ['fechaActualizacion']: String(fechaUpdate), ['dibujo']: draw});
    if(draw == undefined){
      console.log("Todavía no hay dibujo");
    }
    else if (draw != undefined){
      canvas.current?.loadSaveData(draw);
    }
  }, [])


  const handleInputChange = async(e: React.ChangeEvent<any>)  =>{
    
    const {name, value } =  await e.target;
     setValues({...values, [name]: value});

     console.log(values);
  }

  const handleSubmit = (e: React.ChangeEvent<any>) =>{
    e.preventDefault();
    if(values.dibujo == undefined){
      values.dibujo = '';
    }
    addOrEdit(values);
    setValues({...initialStateValues});
    history.push('/inicio');
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
      quality: 10,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    console.log(photo.dataUrl);
    setImage(photo.dataUrl)
    setValues({...values, ['imagen']: String(photo.dataUrl)})
    
    
    
  }

  const recordAudio = async ()=>{
    VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => setAudioActivo(result.value))

   
      VoiceRecorder.startRecording()
  .then((result: GenericResponse) => setAudioActivo(result.value))
  .catch(error => console.log(error))
  }

  const stopAudio = async ()=>{
    VoiceRecorder.stopRecording()
    .then((result: RecordingData) => {setAudio(result.value); setValues({...values,['audio']: String(result.value.recordDataBase64)})} )
    
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
    setValues({...values, ['fondo']: imagenUrl}); 
    setImagenDeFondo(imagenUrl);
   
    setShowBackground(false);
  }

  const activateTextOptions = () =>{
    setShowTextOptions(true);
  }

  const getSelectedText = (text: any) =>{
    console.log(text);
    setTextVal(text);
    console.log("todo el contenido: " + textArea.current?.value);
    textArea.current!.value += text

    console.log("resultado: " + textVal);
    
  }

  const share = async () =>{
    Share.share({
      title: values.titulo,
      text: values.contenido,
      url: 'www.sujeto.com'
    })
  }



 


  return (
    
    
    <div style ={divStyle}>
     
    <form onSubmit = {handleSubmit}>

    <IonItem color = "transparent" lines = "none">

<IonIcon icon = {chevronBack} onClick = {() => history.push('/inicio')}>

</IonIcon>
{!hoverActivo == true ?  <IonIcon icon = {shareOutline} slot = "end" onClick = {() => share()}>

</IonIcon> :""}

{!hoverActivo ? <IonIcon icon = {shirtOutline} slot = "end"onClick = {() => showBackgrounds()}>
</IonIcon> : ''}
{!hoverActivo ? 
  <IonButtons slot = "end" class = "grupoBotones" >
    <IonButton   id="trigger-button"  >  <IonIcon icon = {ellipsisVerticalOutline}></IonIcon></IonButton>
    <IonPopover trigger="trigger-button" dismissOnSelect={true} color = "transparent">
      <IonList color = "blue" style={divStyle}>
      <IonItem class = "contenido-popover" color = "transparent" lines = "none">
        <IonIcon icon = {alarmOutline}></IonIcon><IonLabel> Recordatorio</IonLabel>
      </IonItem >
      <IonItem class = "contenido-popover" color = "inherit" lines = "none">
      <IonIcon icon = {caretDownOutline}></IonIcon><IonLabel> Ocultar</IonLabel>
      </IonItem>
      <IonItem class = "contenido-popover" color = "inherit" lines = "none"> 
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

<div>

<IonAccordionGroup color = "inherit">
          <IonAccordion ref = {accordion} value="colors" class = "accordion" color = "inherit">
            
            <IonItem slot="header" color = "inherit" className = "contenido-accordion" lines = "none">
              <IonLabel>Multimedia</IonLabel>
            </IonItem>
            <IonList slot="content" color = "inherit" className = "contenido-accordion">
              <IonItem color = "inherit" className = "contenido-accordion" lines = "none"><IonLabel>Imagen</IonLabel>
              {image !== '' ?  <img  src={image} className = "imagen-accordion"/>: ''}</IonItem>
              <IonItem color = "inherit" className = "contenido-accordion" lines = "none">
              {audio == '' ? <IonLabel>Audio</IonLabel> : ''}
                {audio == '' ?   <audio src={audio.recordDataBase64}  /> : <audio controls src={audio.recordDataBase64}  />}
              </IonItem>
              <IonItem color = "inherit" className = "contenido-accordion" lines = "none">
              {values.dibujo == undefined ? <IonLabel>Dibujo</IonLabel> : ''}
                {values.dibujo !== undefined ? <CanvasDraw hideGrid = {true} disabled = {true} className = "canvas" canvasWidth = {accordion.current?.clientWidth} canvasHeight = {200} ref = {canvas}/> : ''}
              </IonItem>
              </IonList>
              
            </IonAccordion>
            
</IonAccordionGroup>
</div>

  <IonItem color = "transparent" lines = "none" class = "nav">

    

      <IonInput type = "text" className="form-control" value = {values.titulo} placeholder = "Título" name = "titulo" onMouseEnter = {() => activarHover()}   onMouseLeave = {() => desactivarHover()} onInput = {(e:any) => handleInputChange(e)} ></IonInput>
  </IonItem>
  <IonItem color = "transparent" lines = "none">
  <IonTextarea  rows = {100} onClick = {() => getSelectedText(window.getSelection()?.toString())} ref = {textArea}  autoGrow = {true}   onMouseUp = {() => activarMenu()} value = {values.contenido} onMouseDown= {() => desactivarMenu()} placeholder="Empiece a escribir" name = "contenido" onInput = {(e:any) => handleInputChange(e)}> 
  </IonTextarea>
  </IonItem>

 
 

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
     <IonIcon icon = {createOutline} className="icono-menu" onClick = {() => history.push('/crear-dibujo')}></IonIcon>
    
   </IonItem>
 : ""}
     
    

    </div>

    
     
    </div>
    



  );
};

export default CrearNota;

