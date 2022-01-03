import { CheckboxChangeEventDetail, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, checkboxOutline, checkmark, chevronBack, createOutline, imageOutline, pencilOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { addOrEditTask } from "../funcionesFirebase";
import "./CrearNota.css";

interface ContainerProps { }

const CrearTarea: React.FC<ContainerProps> = () => {

    const checkboxList = [
        { val: '', isChecked: false },
      ];
      const [title, setTile] = useState('');
      const history = useHistory();
      const [checked, setChecked] = useState(false);
      const [checkbox, addCheckbox] = useState(checkboxList);
      const [inputEmpty, setInputEmpty] = useState(false);


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
        addOrEditTask(checkbox, title);
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

    return(  
        <IonPage>
            <IonHeader>
        <IonToolbar>
            <IonItem>

        
        <IonIcon icon = {chevronBack} onClick = {() => history.push('/inicio')}/>
        <IonIcon slot = "end" icon = {checkmark} onClick = {() => handleSubmit()}/>
          <IonTitle>Lista de tareas</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonInput placeholder = "Título" onInput = {(e:any) => (handleInputTitleChange(e))}></IonInput>
       
        <IonList color = "transparent">
         


          {checkbox.map(({ val, isChecked }, i) => (
            <IonItem key={i} color = "transparent" lines = "none">
              <IonLabel>{val}</IonLabel>
              <IonCheckbox slot="end" value={val} checked={isChecked} id = {String(i)} onClick = {(e) => check(e)}/>
              {!inputEmpty && val == '' ? <IonInput placeholder = "Nombre de la tarea" id = {String(i)} onInput = {(e:any) => (handleInputChange(e))} ></IonInput>: ''}
              <IonList>
                  
              </IonList>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <div className  = "menu-opciones">
     <IonItem className = "opciones " lines = "none" >
     <IonIcon icon = {imageOutline} className="icono-menu"></IonIcon> 
     <IonIcon icon = {createOutline} className="icono-menu"> </IonIcon>
     <IonIcon icon = {checkboxOutline} className="icono-menu"></IonIcon>
     {inputEmpty ? <IonIcon icon = {addOutline} className="icono-menu" onClick = {() => agregarCheckbox()}></IonIcon> : <IonIcon icon = {checkmark} className="icono-menu" onClick = {() => agregarNombreCheckbox()}></IonIcon> }
   </IonItem>
     
    

    </div>
        </IonPage>

        
    );
};

export default CrearTarea;

