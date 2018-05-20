import styles from './app.css';
import { MapEventApplication } from './MapEventApplication';

let mapEventApplication = new MapEventApplication('mx');
mapEventApplication.start(`ws://localhost:3000/`);
