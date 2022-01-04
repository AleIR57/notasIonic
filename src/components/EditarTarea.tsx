import { CheckboxChangeEventDetail, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, alarmOutline, caretDownOutline, checkboxOutline, checkmark, chevronBack, contrastOutline, createOutline, ellipsisVerticalOutline, imageOutline, pencilOutline, phonePortraitOutline, shirtOutline, trashBinOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { addOrEditTask, getLinkTaskById, onDeleteTask, updateTaskById } from "../funcionesFirebase";
import "./EditarTarea.css";


interface ContainerProps { }

const EditarTarea: React.FC<ContainerProps> = () => {

  let valuesAux:any = [];
    let id:any = useParams();
    id = String(Object.keys(id).map(k => id[k]));
    let checkboxList:any = [
      ];
      let result:any = [];
      const [title, setTile] = useState('');
      const history = useHistory();
      const [checked, setChecked] = useState(false);
      let [checkbox, addCheckbox] = useState<any[]>([]);
      const [inputEmpty, setInputEmpty] = useState(true);
      const [values, setValues] = useState([]);
      const [contador, setContador] = useState(0);
      const [color, setColor] = useState<any>('primary');
      const [chooseColor, chooseColorActivate] = useState(false);
      const [image, setImage] = useState<any>('');
      const [showBackground, setShowBackground] = useState(false);
      const [imagenDeFondo, setImagenDeFondo] = useState('');

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

      const coloresCheck = [{
        id: 1,
        color: "primary"
      },{
        id: 2,
        color: "secondary"
      },{
        id: 3,
        color: "tertiary"
      },{
        id: 4,
        color: "success"
      },{
        id: 5,
        color: "warning"
      },{
        id: 6,
        color: "danger"
      },{
        id: 7,
        color: "light"
      },{
        id: 8,
        color: "medium"
      },{
        id: 9,
        color: "dark"
      }]

      const divStyle = {
        backgroundImage: 'url(' + imagenDeFondo + ')',
        backgroundSize: 'cover',
      
      };
  

      const agregarCheckbox = () =>{
       
      
          setInputEmpty(false);
          
          checkboxList.push(checkbox);
          let count = 0;
            for (let k in checkboxList[0]) if (checkboxList[0].hasOwnProperty(k)) count++;
          let checkboxEmpty = {
            val: '',
            isChecked: false
          }
           result = checkboxList.map((o:any, i:any) => (
            { ...o, checkboxEmpty }))
            addCheckbox({...result[0]})
            
            console.log(checkbox);
            
        
      }

      useEffect(() => {
        console.log(JSON.stringify(id));
        getLinkTaskById(id).then(function (result:any){
          console.log(result['title'])
          setTile(String(result['title']));

          valuesAux = result;
          console.log(valuesAux)
          let colorAux = result['colorCheck'];
          let imageAux = result['imageCheck'];
          colorAux = String(Object.keys(colorAux).map(k => colorAux[k]));
          setColor(colorAux);
          imageAux = String(Object.keys(imageAux).map(k => imageAux[k]))
          setImagenDeFondo(imageAux);
         
          delete valuesAux.title;
          delete valuesAux.colorCheck;
          delete valuesAux.imageCheck;
          addCheckbox({...valuesAux});
         
         
         
        });
        
      }, [])

      const handleInputChange = async(e: React.ChangeEvent<any>)  =>{
        
        checkbox[e.currentTarget.id] = {...checkbox[e.currentTarget.id], val: String(e.currentTarget.value), isChecked: false };
      
      }

      const handleInputTitleChange = async(e: React.ChangeEvent<any>)  =>{

       setTile(e.currentTarget.value);
       console.log(title);
      }

    const handleSubmit = () =>{
      checkboxList.push(checkbox);
      let imageCheck = {
        image: imagenDeFondo
      }
      let colorCheck = {
        color: color
      }
  
       result = checkboxList.map((o:any, i:any) => (
        { ...o, imageCheck, colorCheck, title}))
        addCheckbox({...result[0]});
        console.log(checkbox);
        updateTaskById(id, result[0]);
        history.push('/inicio');
    }

      const agregarNombreCheckbox = () =>{
        let count = 0;
        for (let key in checkbox) {
          if(key == 'checkboxEmpty'){
            delete checkbox[key];
          }
 
          // Use `key` and `value`
      }
        setInputEmpty(true);
      }
    
    const check = (e: React.ChangeEvent<any>) =>{
        if(e.currentTarget.checked){
            checkbox[e.currentTarget.id] = {...checkbox[e.currentTarget.id], isChecked:  true};
        }
        else if(!e.currentTarget.checked){
            checkbox[e.currentTarget.id] = {...checkbox[e.currentTarget.id], isChecked:  false};
        }

        console.log(checkbox);
        
    }


    const setColorOnChecks = (color:any, i:any) =>{

      setColor(color) 
      chooseColorActivate(false);
     
    }

    
  const showBackgrounds = () =>{
    setShowBackground(true);
     
   }
 
   const setBackground = (imagenUrl: string) =>{
  
     setImagenDeFondo(imagenUrl);
     setShowBackground(false);
   }

   const deleteDocument = () =>{
    onDeleteTask(id);
    console.log("Tarea borrada");
    history.push('/inicio');
  }


    return(  
        <IonPage style ={divStyle} >
        
            <IonHeader>
        <IonToolbar color = "inherit" >
            <IonItem color = "transparent" lines = "none">

        
        <IonIcon icon = {chevronBack} onClick = {() => history.push('/inicio')}/>
        {inputEmpty ?  <IonIcon slot = "end" icon = {checkmark} onClick = {() => handleSubmit()}/> : ''}
        {inputEmpty ?   <IonButtons slot = "end" class = "grupoBotones" >
    <IonButton   id="trigger-button"  >  <IonIcon icon = {ellipsisVerticalOutline}></IonIcon></IonButton>
    <IonPopover trigger="trigger-button" dismissOnSelect={true} color = "transparent">
      <IonList color = "blue" style={divStyle}>
      <IonItem  class = "contenido-popover"  color = "inherit" lines = "none" onMouseEnter={() => deleteDocument()}>
      <IonIcon icon = {trashBinOutline} ></IonIcon><IonLabel> Borrar</IonLabel>
      </IonItem>
      <IonItem class = "contenido-popover" color = "inherit" lines = "none"> 
      <IonIcon icon = {phonePortraitOutline}></IonIcon><IonLabel> Colocar en la pantalla de inicio</IonLabel>
      </IonItem>
      </IonList>
  </IonPopover>
  </IonButtons> : ''}
        
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <div style ={divStyle} className = "lista-elementos">

       
        <IonInput placeholder = "Título" onInput = {(e:any) => (handleInputTitleChange(e))} value = {title}></IonInput>
       
        <IonList color = "transparent">
         


          {Object.keys(checkbox).map((key:any, index:any) =>(
  
             <IonItem key={index} color = "transparent" lines = "none">
             <IonLabel>{checkbox[key].val}</IonLabel>
             <IonCheckbox slot="end" color = {color} value={checkbox[key].val} checked={checkbox[key].isChecked} id = {String(index)} onClick = {(e) => check(e)} />
             {!inputEmpty && checkbox[key].val == '' ? <IonInput placeholder = "Nombre de la tarea" id = {String(index)} onInput = {(e:any) => (handleInputChange(e))} ></IonInput>: ''}
             <IonList>
                 
             </IonList>
           </IonItem>
          ))}
        </IonList>
        </div>
      </IonContent >
      <div className  = "menu-opciones" style ={divStyle}>
     <IonItem className = "opciones " lines = "none" color = "transparent">
     {chooseColor ? <div  className = "colores">{coloresCheck.map((colores:any) =>(
       
        <IonItem  key={colores.i} className = "item-color" color = {colores.color} slot = "center" onClick = {() => setColorOnChecks(colores.color, colores.i)}></IonItem>
     ))}</div > : <IonItem  className="icono-menu icono-menu-color" onClick = {() => chooseColorActivate(true)} color = {color}  ></IonItem>}
     {!chooseColor ?<IonIcon icon = {shirtOutline} onClick = {() => showBackgrounds()}>
</IonIcon> : ''}
     {!chooseColor ?<IonIcon icon = {checkboxOutline} className="icono-menu"></IonIcon> : ''}
     {!chooseColor ?<IonItem lines = "none" color = "transparent">{inputEmpty ? <IonIcon icon = {addOutline} className="icono-menu" onClick = {() => agregarCheckbox()}></IonIcon> : <IonIcon icon = {checkmark} className="icono-menu" onClick = {() => agregarNombreCheckbox()}></IonIcon> }</IonItem> : ''}
   </IonItem>

   {showBackground?<div className="scrolls">{imageUrl.map((image:any)=> (
 <div className = "imageDiv" key = {image.id}><img src ={image.imagen} onClick = {() => setBackground(image.imagen)}/></div>
 ))}
</div> : ''}

     
    

    </div>
        </IonPage>

        
    );
};

export default EditarTarea;