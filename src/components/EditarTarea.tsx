import { CheckboxChangeEventDetail, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, checkboxOutline, checkmark, chevronBack, contrastOutline, createOutline, imageOutline, pencilOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { addOrEditTask, getLinkTaskById } from "../funcionesFirebase";
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
      const [checkbox, addCheckbox] = useState<any[]>([]);
      const [inputEmpty, setInputEmpty] = useState(true);
      const [values, setValues] = useState([]);
      const [contador, setContador] = useState(0);


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
          delete valuesAux.title;
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
        addOrEditTask(checkbox, title);
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
          <IonInput placeholder = "Título" onInput = {(e:any) => (handleInputTitleChange(e))} value = {title}></IonInput>
       
        <IonList color = "transparent">
         


          {Object.keys(checkbox).map((key:any, index:any) =>(
  
             <IonItem key={index} color = "transparent" lines = "none">
             <IonLabel>{checkbox[key].val}</IonLabel>
             <IonCheckbox slot="end" value={checkbox[key].val} checked={checkbox[key].isChecked} id = {String(index)} onClick = {(e) => check(e)}/>
             {!inputEmpty && checkbox[key].val == '' ? <IonInput placeholder = "Nombre de la tarea" id = {String(index)} onInput = {(e:any) => (handleInputChange(e))} ></IonInput>: ''}
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

export default EditarTarea;