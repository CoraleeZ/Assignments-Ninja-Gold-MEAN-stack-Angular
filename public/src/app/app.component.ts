import { Component ,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { resource } from 'selenium-webdriver/http';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  score = 0;
  // results:{ _id:string,type: string, gold: number,createdAt:string,updatedAt:string }[]=[];
  results: any = [];
  displayresults: string[] = [];
  top: string[] = [];
  count: number = 0;

  constructor(private _allNinjaGold: HttpService){};

  ngOnInit(){
    this.getTasksFromService();
  };
  ////////////
  getTasksFromService(){
    this._allNinjaGold.deleteAllTask()
      .subscribe(data => console.log("Recode are empty now"));
    this.score = 0;
    this.results = [];
    this.displayresults = [];
    this.top = [];
    this.count = 0;
  };
  ////////////
  recode(id: any) {
    // randomly pick up gold and save to db
    console.log('RECODE: ' + id);
    let newEvent: any = { }
    if (id == 1) {
      console.log('\n -------- inside recode id 1 ----------- \n');
       newEvent = {
        type:'farm',
        gold: Math.floor(Math.random() * 4 + 2)
      }
    }
    else if (id == 2) {
       newEvent = {
        type: 'cave',
        gold: Math.floor(Math.random() * 6 + 5)
      }
    }
    else if (id == 3){
       newEvent = {
        type: 'house',
        gold: Math.floor(Math.random() * 9 + 7)
      }
    }
    else if (id == 4) {
       newEvent = {
        type:'casino',
        gold:Math.floor(Math.random() * 201 - 100)
      }
    }

    this._allNinjaGold.createOneTask(newEvent)
      .subscribe(data => {
        console.log('create')
        console.log(data);
        // query all recodes from db display in sequence which last one on the top 
        this._allNinjaGold.getAllTask()
          .subscribe(data => {
            console.log('get')
            console.log(data);
            this.results = data;
            //munipulate DATA
            this.displayresults = [];
            this.top = [];
            this.score = 0;

            for (let i = 0; i < this.results.length; i++) {
              if (this.results[i].gold>=0) {
                this.score += this.results[i].gold;
                const str: string='You earn gold '+this.results[i].gold+' from '+this.results[i].type+' TIME: '+this.results[i].createdAt
                this.displayresults.unshift(str);
              }
              else{
                this.score+=this.results[i].gold;
                const str:string='You lose gold '+this.results[i].gold+' from '+this.results[i].type+' TIME: '+this.results[i].createdAt
                this.displayresults.unshift(str);
              }
            }

          // sort and display top 5
        let newresults = [...this.results];
        let len: Number;
        if (newresults.length < 5) {
          len = newresults.length;
        } else {
          len = 5;
        };

        for (let y = 0; y < len; y++){
          for (let z = 0; z < newresults.length - 1; z++){
            if (newresults[z].gold > newresults[z+1].gold){
              let temp=newresults[z];
              newresults[z] = newresults[z+1];
              newresults[z+1] = temp;
            }
          }

          var max = newresults.pop();
          if(max.gold >= 0) {
            var str: string = `You earn gold ${max.gold} from ${max.type} TIME: ${max.createdAt}`
            this.top.push(str);
          }
          else{
            var str:string='You lose gold '+max.gold+' from '+max.type+' TIME: '+max.createdAt
            this.top.push(str);
          }

        }
        // console.log('displayresults:',this.displayresults);
        // console.log('top:',this.top)
          //end munipulate this result
      });


    });
 
    this.count++;
  }

  save(){
    let clearupsave=this._allNinjaGold.deleteAllSave();
    clearupsave.subscribe(data=>{
      console.log('clear up save',data);

      let input={savegame:this.results};
      let createSave=this._allNinjaGold.createOneSave(input);
      createSave.subscribe(da=>{
        console.log('create new save',da);

        // let dat:any=da;
        // let ID=dat._id;
        // let par:any=[];
     

        // let newsave:any=this._allNinjaGold.getAllTask();
        // newsave.subscribe(data=>{
        // console.log("alldata",data)
        //    //interface
        //    let _id:string;
        //    let type:string;
        //    let gold:number;
        //    let createdAt:string;
        //    let updatedAt:string;

        //   for(let x=0;x<data.length;x++){
        //     _id=data[x]._id;
        //     type=data[x].type;
        //     gold=data[x].gold;
        //     createdAt=data[x].createdAt;
        //     updatedAt=data[x].updatedAt
        //     let eachdata:any={ 
        //       _id:_id,
        //       type:type,
        //       gold: gold,
        //       createdAt:createdAt,
        //       updatedAt:updatedAt
        //     }
        //     par.push(eachdata)
        //   }
        //   console.log(par);
          
        //   let updatesave=this._allNinjaGold.updateOneSave(par,ID)
        //   updatesave.subscribe(data=>console.log('save data',data))

        // })


      })

    })

  }


  reset(){
    this.getTasksFromService();
  }


  continue(){

    this.reset();
    let continuegame=this._allNinjaGold.getAllSave();
    continuegame.subscribe(data=>{
      console.log('query saved data',data);
      this.results=data[0].savegame;
      
      let arr:any=[];

      //interface
      let type:string;
      let gold:number;
 
      for(let x=0;x<this.results.length;x++){
        this.count+=1;
        type=this.results[x].type;
        gold=this.results[x].gold;
        let eachsaveddata:any={ 
          type:type,
          gold: gold
        }
        arr.push(eachsaveddata)
      }
      console.log("new arr:",arr)

      let addtodb=this._allNinjaGold.insertManyTask(arr);
      addtodb.subscribe(data=>{
        console.log('insert many:',data)
      })

        //munipulate this results
        this.displayresults=[];
        this.top=[];
        
        for (var i=0;i<this.results.length;i++){
          if(this.results[i].gold>=0){
            this.score+=this.results[i].gold;
            var str:string='You earn gold '+this.results[i].gold+' from '+this.results[i].type+' TIME: '+this.results[i].createdAt
            this.displayresults.unshift(str);
          }
          else{
            this.score+=this.results[i].gold;
            var str:string='You lose gold '+this.results[i].gold+' from '+this.results[i].type+' TIME: '+this.results[i].createdAt
            this.displayresults.unshift(str);
          }
        }
    
          // sort and display top 5
        let newresults= [...this.results];
        var len:Number;
        if(newresults.length<=5){
          len=newresults.length;
        }else{
          len=5;
        };
    
        for(let y =0;y<len;y++){
    
          for(let z=0;z<newresults.length-1;z++){
            if(newresults[z].gold>newresults[z+1].gold){
            var temp=newresults[z];
            newresults[z]=newresults[z+1];
            newresults[z+1]=temp;
            }
          }
    
          var max =newresults.pop();
          if(max.gold>=0){
            var str:string='You earn gold '+max.gold+' from '+max.type+' TIME: '+max.createdAt
            this.top.push(str);
          }
          else{
            var str:string='You lose gold '+max.gold+' from '+max.type+' TIME: '+max.createdAt
            this.top.push(str);
          }
        }
        console.log('displayresults:',this.displayresults);
        console.log('top:',this.top)
        //end munipulate this result
    })

    
  }
  ////////////
}

