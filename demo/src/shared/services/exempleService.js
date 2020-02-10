// example - delete later
import { ajax } from 'rxjs/ajax';
import { env } from '../utils';

export const mockService = () => ajax.getJSON(`./manifest.json`);
