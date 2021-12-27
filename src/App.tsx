
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import './firebase';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CrearNota from './components/CrearNota';
import EditarNota from './components/EditarNota'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

setupIonicReact();

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path = "/inicio">
        <Home/>
        </Route>
        <Route path = "/crear-nota">
        <CrearNota/>
        </Route>
        <Route path = "/editar-nota/:id">
        <EditarNota />
        </Route>
    </Switch>
  </Router>
);

export default App;
