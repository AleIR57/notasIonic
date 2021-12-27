import {useRef, useState} from 'react';
import './Draw.css';
import CanvasDraw from "react-canvas-draw"

const Draw = () =>{
    const [color, setColor ] = useState('#2C272E');

    const changeColor = (colorType: string) =>{
        setColor(colorType);
    }
    return(
        <div className = "dibujo" >
        <CanvasDraw brushRadius = {5} brushColor = {color} catenaryColor = {color} hideGrid = {true} canvasWidth = {window.innerWidth} canvasHeight = {window.innerHeight}/>
        <div className="navbar">
            <img src = "https://img.freepik.com/foto-gratis/fondo-textura-hormigon-negro_53876-145151.jpg?size=626&ext=jpg" onClick = {() => changeColor('#2C272E')} className = "color-img" />
            <img src = "https://fondosmil.com/fondo/3361.jpg" onClick = {() => changeColor('#F56FAD')} className = "color-img"/>
            <img src = "https://www.sirvisual.com/Attachment/100/4321_30419_80-595%20Principale.jpg" onClick = {() => changeColor('#9145B6')} className = "color-img"/>
            <img src = "http://www.colores.org.es/imagenes_colores/azul-violeta.jpg" onClick = {() => changeColor('#35589A')} className = "color-img"/>
            <img src = "https://www.publicdomainpictures.net/pictures/60000/velka/blue-background-1377807968zmS.jpg" onClick = {() => changeColor('#3DB2FF')} className = "color-img"/>
            <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/F1_light_blue_flag.svg/1200px-F1_light_blue_flag.svg.png" onClick = {() => changeColor('#42DEE1')} className = "color-img"/>
            <img src = "https://www.publicdomainpictures.net/pictures/30000/velka/solid-green-background.jpg" onClick = {() => changeColor('#34BE82')} className = "color-img"/>
            <img src = "https://www.todofondos.net/wp-content/uploads/fondo-de-pantalla-verde-liso-1200x1200.-imagen-verde-liso.jpg" onClick = {() => changeColor('#B2EA70')} className = "color-img"/>
            <img src = "https://media.istockphoto.com/photos/yellow-paper-texture-background-fibers-grain-empty-picture-id1046087082?b=1&k=20&m=1046087082&s=612x612&w=0&h=pXjbq97zCTnjssK_oaEr6YSxmt_xP3AK9KVDJVK5tAY=" onClick = {() => changeColor('#F2F013')} className = "color-img"/>
            <img src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAAAA1BMVEX5sD2hwpcsAAAASElEQVR4nO3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+BsXcAAGLPH6gAAAAAElFTkSuQmCC" onClick = {() => changeColor('#FABB51')} className = "color-img"/>
            </div>
        </div>

        
        
    );
}

export default Draw;
