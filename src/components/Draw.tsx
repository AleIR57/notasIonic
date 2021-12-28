import {useRef, useState, Fragment} from 'react';
import './Draw.css';
import CanvasDraw from "react-canvas-draw"
import { IonItem, IonLabel, IonRange } from '@ionic/react';

const Draw = () =>{
    const canvas = useRef<CanvasDraw>(null);
    const [color, setColor ] = useState('#2C272E');
    const [activateColors, setActivateColors] = useState(false);
    const [brush, setBrush] = useState(1);
    const [activateBrush, setActivateBrush] = useState(false);

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
            console.log(data);
          }
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
        {(!activateColors)?<div style = {{backgroundColor: color}}  onClick={() => showColors()} className = "boton-img"></div>: '' }
        {!activateColors ?<img src = "https://cdn.pixabay.com/photo/2012/04/13/12/50/pencil-32276_960_720.png" onClick={() => showBrush()} className = "boton-pencil"></img>: ''}
        {!activateColors ?<img src = "https://lh3.googleusercontent.com/proxy/_k0AGGFo6FkTrwC8CfwI8YmNZUJST6Jkb6bptKeXQaVsQMjmZ0MMmTSAfDU4zjUIyCvcvWbN8L5lyTgc6vPcAM6P0GhVm4vFDGVwKuhaeMh2BsWfNd2hNO8" onClick={() => eraser('white')} className = "boton-pencil"></img>: ''}
        {!activateColors ?<img src = "https://cdn-icons-png.flaticon.com/512/724/724999.png" onClick={() => undo()} className = "boton-pencil"></img>: ''}
        {!activateColors ?<img src = "https://icon-library.com/images/delete-all-icon/delete-all-icon-1.jpg" onClick={() => clear()} className = "boton-pencil"></img>: ''}
        {!activateColors ?<img src = "https://iconarchive.com/download/i103415/paomedia/small-n-flat/floppy.ico" onClick={() => save()} className = "boton-pencil"></img>: ''}
        
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
            
        </div>
        </Fragment>

        
        
    );
}

export default Draw;
