import { Observable } from 'rxjs';

//crear un mock 
export let IndexContactoStub = {
    getAll() {
        return Observable.of({ id: 0, nombreApe: 'Dalia Diaz', corre: 'dalia@cu', alias: 'dali', direccion: 'Calle 3ra final' }, { id: 1, nombreApe: 'Ramon Gonzalez', corre: 'mon@cu', alias: 'mon', direccion: 'Calle 1ra final' })
    }
}
