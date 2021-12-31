import './EditarNota.css';
import React, { ChangeEvent, Fragment, useEffect, useState, useRef} from 'react';
import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTextarea } from '@ionic/react';
import { chevronBack, shirtOutline, shareOutline, ellipsisVerticalOutline, checkmark, micOutline, imageOutline, pencilOutline, checkboxOutline, createOutline, alarmOutline, caretDownOutline, phonePortraitOutline, stopCircleOutline, trashBinOutline } from 'ionicons/icons'
import '../funcionesFirebase';
import { addOrEdit, getLinkById, updateById, onDeleteLink,getDraw, saveDraw} from '../funcionesFirebase';
import { Camera, CameraResultType} from '@capacitor/camera'
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import { Redirect, useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { popoverController } from '@ionic/core';
import CanvasDraw from "react-canvas-draw";

interface ContainerProps {

 }

const EditarNota: React.FC<ContainerProps> = () => {
  const canvas = useRef<CanvasDraw>(null);
  let valuesAux:any;
  let id:any = useParams();
  let fechaUpdate:Date = new Date();
  id = String(Object.keys(id).map(k => id[k]));

  const textArea = useRef<HTMLIonTextareaElement>(null);
  const [textVal, setTextVal] = useState('');

  const [audioActivo, setAudioActivo] = useState(false);

  const [hoverActivo, setHoverActivo] = useState(false);
  const [menuActivo, setMenuActivo] = useState(false);

      let draw: any = getDraw();
  const initialStateValues:any = {
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
  let contador = 0;
  let radioButton:any = [];
  const history = useHistory();
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
   
    getLinkById(id).then(function (result:any){
     
      valuesAux = result;
      setValues({...valuesAux})
      
     
      setAudio(String(result.audio));
      setAudioActivo(false);
      setImage(result.imagen);
      setImagenDeFondo(result.fondo);
      if(draw == undefined){
        canvas.current?.loadSaveData(result.dibujo, false);
      }
      else if(draw != undefined){
        canvas.current?.loadSaveData(draw, false);
      }
      
      
  });

  }, [])

      

  const handleInputChange = (e: React.ChangeEvent<any>)  =>{
    const {name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e: React.ChangeEvent<any>) =>{
    e.preventDefault();
    updateById(id, values);
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
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    })
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
    .then((result: RecordingData) => {setAudio(result.value.recordDataBase64); setValues({...values,['audio']: String(result.value.recordDataBase64)})} )
    
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



  const getSelectedText = (text: any) =>{
    console.log(text);
    setTextVal(text);
    console.log("todo el contenido: " + textArea.current?.value);
    textArea.current!.value += text

    console.log("resultado: " + textVal);
    
  }

  const deleteDocument = () =>{
    onDeleteLink(id);
    console.log("Nota borrada");
    history.push('/inicio');
  }


  return (
     
    <div style ={divStyle}>
    <form onSubmit = {handleSubmit}>
    <IonItem color = "transparent" lines = "none" >

<IonIcon icon = {chevronBack} onClick = {() => history.push('/inicio')}>

</IonIcon>
{!hoverActivo == true ?  <IonIcon icon = {shareOutline}  slot = "end">

</IonIcon> :""}
{!hoverActivo ?  
<IonIcon icon = {shirtOutline}  slot = "end"onClick = {() => showBackgrounds()}>
</IonIcon> : ""}
{!hoverActivo ? 
  <IonButtons slot = "end" class = "grupoBotones" >
    <IonButton   id="trigger-button"  >  <IonIcon icon = {ellipsisVerticalOutline}></IonIcon></IonButton>
    <IonPopover trigger="trigger-button" dismissOnSelect={true}>
      <IonList >
      <IonItem class = "contenido-popover">
        <IonIcon icon = {alarmOutline}></IonIcon><IonLabel> Recordatorio</IonLabel>
      </IonItem>
      <IonItem class = "contenido-popover">
      <IonIcon icon = {caretDownOutline}></IonIcon><IonLabel> Ocultar</IonLabel>
      </IonItem>
      <IonItem  class = "contenido-popover" onMouseEnter={() => deleteDocument()}>
      <IonIcon icon = {trashBinOutline} ></IonIcon><IonLabel> Borrar</IonLabel>
      </IonItem>
      <IonItem class = "contenido-popover"> 
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

<IonAccordionGroup >
          <IonAccordion value="colors" class = "accordion">
            
            <IonItem slot="header">
              <IonLabel>Multimedia</IonLabel>
            </IonItem>
            <IonList slot="content">
              <IonItem><IonLabel>Imagen</IonLabel>
              {image !== '' ?  <img  src={image} />: ''}</IonItem>
              <IonItem>
                <IonLabel>Audio</IonLabel>
                {audio == '' ?   <audio src={audio.recordDataBase64}  /> : <audio controls src={audio.recordDataBase64}  />}
              </IonItem>
              <IonItem>
              {values.dibujo !== undefined ? <IonLabel>Dibujo</IonLabel> : ''}
                {values.dibujo !== undefined ? <CanvasDraw hideGrid = {true} disabled = {true} canvasWidth = {200} canvasHeight = {200} ref = {canvas}/> : ''}
              </IonItem>
              </IonList>
              
            </IonAccordion>
            
</IonAccordionGroup>
</div>

  <IonItem color = "transparent" lines = "none" class = "nav">

      <IonInput type = "text" className="form-control" value = {values.titulo} placeholder = "Título" name = "titulo" onMouseEnter = {() => activarHover()}   onMouseLeave = {() => desactivarHover()} onInput = {(e:any) => handleInputChange(e)} ></IonInput>
  </IonItem>
  <IonItem color = "transparent" lines = "none">
  <IonTextarea onClick = {() => getSelectedText(window.getSelection()?.toString())}  ref = {textArea}  rows = {100} autoGrow = {true}   onMouseUp = {() => activarMenu()}  value = {values.contenido} onMouseDown = {() => desactivarMenu()} placeholder="Empiece a escribir" name = "contenido" onInput = {(e:any) => handleInputChange(e)}>  {radioButton.map((number:any, index:any) => (
     console.log(index + " Sujeto" + number)
  ))}</IonTextarea>
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
     <IonIcon icon = {checkboxOutline} className="icono-menu" onClick = {() => agregarRadioButton()}></IonIcon>
     <IonIcon icon = {pencilOutline} className="icono-menu" ></IonIcon>
   </IonItem>
 : ""}

    </div>
     
    </div>
    



  );
};

export default EditarNota;
