import { CheckboxChangeEventDetail, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, checkboxOutline, checkmark, chevronBack, createOutline, imageOutline, pencilOutline, shirtOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { addOrEditTask } from "../funcionesFirebase";
import "./CrearNota.css";

interface ContainerProps { }

const CrearTarea: React.FC<ContainerProps> = () => {

    const checkboxList = [
        { val: '', isChecked: false },
      ];
      let checkboxList2:any = [
      ];
      let result:any = [];
      const [title, setTile] = useState('');
      const history = useHistory();
      const [checked, setChecked] = useState(false);
      const [checkbox, addCheckbox] = useState(checkboxList);
      const [inputEmpty, setInputEmpty] = useState(false);
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
          addCheckbox(checkboxList => [...checkboxList, {val: '', isChecked: false}]);
      }

   

      const handleInputChange = async(e: React.ChangeEvent<any>)  =>{
        
        checkbox[e.currentTarget.id] = {...checkbox[e.currentTarget.id], val: String(e.currentTarget.value), isChecked: false };
       
      }

      const handleInputTitleChange = async(e: React.ChangeEvent<any>)  =>{
        
       setTile(e.currentTarget.value);
       console.log(title);
      }

    const handleSubmit = () =>{
      checkboxList2.push(checkbox);
      let imageCheck = {
        image: imagenDeFondo
      }
      let colorCheck = {
        color: color
      }
  
       result = checkboxList2.map((o:any, i:any) => (
        { ...o, imageCheck, colorCheck, title}))
        addCheckbox({...result[0]});
        console.log(checkbox);
        addOrEditTask(result[0]);
        history.push('/inicio');
    }

      const agregarNombreCheckbox = () =>{
          
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
    return(  
        <IonPage style ={divStyle} >
            <IonHeader>
        <IonToolbar color = "inherit" >
            <IonItem color = "transparent" lines = "none">

        
        <IonIcon icon = {chevronBack} onClick = {() => history.push('/inicio')}/>
        {inputEmpty ?  <IonIcon slot = "end" icon = {checkmark} onClick = {() => handleSubmit()}/> : ''}
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div style ={divStyle} className = "lista-elementos">
          <IonInput placeholder = "Título" onInput = {(e:any) => (handleInputTitleChange(e))}></IonInput>
       
        <IonList color = "transparent">
         


          {checkbox.map(({ val, isChecked }, i) => (
            <IonItem key={i} color = "transparent" lines = "none">
              <IonLabel>{val}</IonLabel>
              <IonCheckbox slot="end" color = {color} value={val} checked={isChecked} id = {String(i)} onClick = {(e) => check(e)}/>
              {!inputEmpty && val == '' ? <IonInput placeholder = "Nombre de la tarea" id = {String(i)} onInput = {(e:any) => (handleInputChange(e))} ></IonInput>: ''}
              <IonList>
                  
              </IonList>
            </IonItem>
          ))}
        </IonList>
        </div>
      </IonContent>
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

export default CrearTarea;

