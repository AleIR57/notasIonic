import {useRef, useState, Fragment} from 'react';
import './Draw.css';
import CanvasDraw from "react-canvas-draw"
import {useHistory} from 'react-router'
import { IonIcon, IonItem, IonLabel, IonRange } from '@ionic/react';
import { beakerOutline, brushOutline, checkboxOutline, createOutline, imageOutline, pencilOutline, refreshOutline, returnUpBackOutline, saveOutline, tabletPortraitOutline } from 'ionicons/icons';
import {uploadFile, addOrEditDraw, saveDraw} from '../funcionesFirebase';

const Draw = () =>{
    const history = useHistory();
    const canvas = useRef<CanvasDraw>(null);
    const [color, setColor ] = useState('#2C272E');
    const [activateColors, setActivateColors] = useState(false);
    const [brush, setBrush] = useState(1);
    const [activateBrush, setActivateBrush] = useState(false);
  
    const dibujo = {
        id: '',
        dibujo: '',
    }

    const[datosDibujo, setDatosDibujo] = useState(dibujo);

    const changeColor = (colorType: string) =>{
        setColor(colorType);
        setActivateColors(false);
    }
    const showColors = () =>{
        setActivateColors(true);
    }

    const showBrush = () =>{
        setActivateBrush(true);
    }

    const hideBrush = () =>{
        setActivateBrush(false);
    }

    const eraser = (colorType: string) =>{
        showBrush();
        changeColor(colorType);
    }

    const brushPencil = (e: CustomEvent<any>)  =>{
        setBrush(e.detail.value);
       
    }

    const undo = () =>{
        if (canvas.current !== null) {
            canvas.current.undo();
          }
    }

    const clear = () =>{
        if (canvas.current !== null) {
            canvas.current.clear();
            
          }
    }

    const save = () =>{
        if (canvas.current !== null) {
            const data = canvas.current.getSaveData();
            saveDraw(data);
            history.push('/crear-nota');
          /*
            setDatosDibujo({...datosDibujo, ['id']: '', ['dibujo']: data})*/
          }

          //addOrEditDraw(datosDibujo);
    }

    return(
        <Fragment>


        <CanvasDraw brushRadius = {brush} brushColor = {color} catenaryColor = {color} hideGrid = {true} canvasWidth = {window.innerWidth} canvasHeight = {window.innerHeight} ref = {canvas}/>
        
        <div className="navbar" >
        { activateBrush ?
      

       
        <IonRange min={1} max = {20} color="secondary" step = {1} value={brush} onIonChange = {(e) => brushPencil(e)} onClick= {() => hideBrush()}>
        <IonLabel slot="start">1</IonLabel>
        <IonLabel slot="end">20</IonLabel>
        </IonRange>

        : ''}
        <IonItem className = "opciones "  lines = "none">
        {(!activateColors)?<div style = {{backgroundColor: color}}  onClick={() => showColors()} className = "boton-img"></div>: '' }
        {!activateColors ?<IonIcon  icon = {brushOutline} className="icono-menu" onClick={() => showBrush()}></IonIcon> : ''}
        {!activateColors ? <IonIcon icon = {tabletPortraitOutline} className="icono-menu" onClick={() => eraser('white')}></IonIcon>: ''}
        {!activateColors ?<IonIcon icon = {returnUpBackOutline} className="icono-menu" onClick={() => undo()} ></IonIcon>: ''}
        {!activateColors ?<IonIcon icon = {refreshOutline} className="icono-menu" onClick={() => clear()}></IonIcon>: ''}
        {!activateColors ?<IonIcon icon = {saveOutline} className="icono-menu" onClick={() => save()}></IonIcon>: ''}
       
        { activateColors ?<div onClick = {() => changeColor('#2C272E')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#EAEAEA')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#F56FAD')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#9145B6')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#35589A')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#3DB2FF')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#42DEE1')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#34BE82')} className = "color-img"></div>: ''}
        { activateColors ? <div onClick = {() => changeColor('#B2EA70')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#F2F013')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#FABB51')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#FF8E00')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#FF7F3F')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#DD4A48')} className = "color-img"></div>: ''}
        { activateColors ?<div onClick = {() => changeColor('#8F5B4A')} className = "color-img"></div>: ''}
        </IonItem>
        </div>
        </Fragment>

        
        
    );
}

export default Draw;
