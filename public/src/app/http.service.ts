import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllTask(){
    return this._http.get('/api/tasks');
  };
  
  getOneTask(id:any){
    return this._http.get('/api/tasks/'+id);
  };

  createOneTask(data){
    return this._http.post('/api/tasks',data);
  };
///
  insertManyTask(data){
    return this._http.post('/api/all/tasks',data);
  };
///
  updateOneTask(data,id:any){
    return this._http.put('/api/tasks/'+id,data);
  };

  deleteOneTask(id:any){
    return this._http.delete('/api/tasks/'+id);
  };

  deleteAllTask(){
    return this._http.delete('/api/tasks');
  };
  /////
  getAllSave(){
    return this._http.get('/api/savegame');
  };
  
  getOneSave(id:any){
    return this._http.get('/api/savegame/'+id);
  };

  createOneSave(data){
    return this._http.post('/api/savegame',data);
  };

  updateOneSave(data,id:any){
    return this._http.put('/api/savegame/'+id,data);
  };

  deleteOneSave(id:any){
    return this._http.delete('/api/savegame/'+id);
  };

  deleteAllSave(){
    return this._http.delete('/api/savegame');
  };
}
