import './EditarNota.css';
import React, { ChangeEvent, Fragment, useEffect, useState, useRef} from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTextarea } from '@ionic/react';
import { chevronBack, shirtOutline, shareOutline, ellipsisVerticalOutline, checkmark, micOutline, imageOutline, pencilOutline, checkboxOutline, createOutline, alarmOutline, caretDownOutline, phonePortraitOutline, stopCircleOutline } from 'ionicons/icons'
import '../funcionesFirebase';
import { addOrEdit, getLinkById, updateById } from '../funcionesFirebase';
import { Camera, CameraResultType} from '@capacitor/camera'
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

interface ContainerProps {

 }

const EditarNota: React.FC<ContainerProps> = () => {

    let valuesAux:any;
    let id:any = useParams();
    id = String(Object.keys(id).map(k => id[k]));
  
    const textArea = useRef<HTMLIonTextareaElement>(null);
  const [textVal, setTextVal] = useState('');
  const [textFromTextArea, setTextFromTextArea] = useState(''); 
  const [seleccionarTexto, setSeleccionarTexto] = useState(true);
  const [audioActivo, setAudioActivo] = useState(false);

  const [hoverActivo, setHoverActivo] = useState(false);
  const [menuActivo, setMenuActivo] = useState(false);

  const initialStateValues:any = {
    titulo: '',
    contenido: '',
    imagen: '',
    audio: '',
    fondo: '',
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
       console.log(values);
       setAudioActivo(false);
       setAudio(String(result.audio));
       console.log(audio);
       setImage(result.imagen);
       console.log(image);
       setImagenDeFondo(result.fondo);
   });


  }, [])

 
 
  const [currentId, setCurrentId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<any>)  =>{
    const {name, value } = e.target;
    setValues({...values, [name]: value, ['imagen']: image, ['audio']: String(audio.recordDataBase64), ['fondo']: imagenDeFondo});
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

  const takePicture = async () =>{
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    })
    setImage(photo.webPath)
    setValues({...values, ['imagen']: String(photo.webPath)})
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


  return (
     
    <div style ={divStyle}>
    <form onSubmit = {handleSubmit}>
    <IonItem color = "transparent" lines = "none">

<IonIcon icon = {chevronBack} >

</IonIcon>
{!hoverActivo == true ?  <IonIcon icon = {shareOutline}  slot = "end">

</IonIcon> :""}
{!hoverActivo ?  
<IonIcon icon = {shirtOutline}  slot = "end"onClick = {() => showBackgrounds()}>
</IonIcon> : ""}
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
   <IonButton type = "submit" color = "inherit" slot = "end" onMouseEnter = {() => activarHover()}>
   <IonIcon icon = {checkmark} ></IonIcon>
   </IonButton> : ""
  }
 
</IonItem>

  <IonItem color = "transparent" lines = "none" class = "nav">

      <IonInput type = "text" className="form-control" value = {values.titulo} placeholder = "Título" name = "titulo" onMouseEnter = {() => activarHover()}   onMouseLeave = {() => desactivarHover()} onInput = {(e:any) => handleInputChange(e)} ></IonInput>
  </IonItem>
  <IonItem color = "transparent" lines = "none">
  <IonTextarea onClick = {() => getSelectedText(window.getSelection()?.toString())}  ref = {textArea}  rows = {100} autoGrow = {true}   onMouseUp = {() => activarMenu()}  value = {values.contenido} onMouseDown = {() => desactivarMenu()} placeholder="Empiece a escribir" name = "contenido" onInput = {(e:any) => handleInputChange(e)}>{image !== '' ? <img src={image} /> : ''}{audio !== '' ?   <embed src={audio} width="100%" height= "100em" />: ''} {radioButton.map((number:any, index:any) => (
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
     <IonIcon icon = {createOutline} className="icono-menu"></IonIcon>
     <IonIcon icon = {checkboxOutline} className="icono-menu" onClick = {() => agregarRadioButton()}></IonIcon>
     <IonIcon icon = {pencilOutline} className="icono-menu" ></IonIcon>
   </IonItem>
 : ""}

    </div>
     
    </div>
    



  );
};

export default EditarNota;
