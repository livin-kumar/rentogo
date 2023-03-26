function check(){
    const name=String(document.querySelector("#name").value);
    const pass=String(document.querySelector("#pass").value);
    fetch('http://localhost:8000/signin',{
        mode:'cors',
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
          name:name,
          password:pass
        })
        
    })
    .then((e)=>{
        
        return e.json()  
    })
    .then(async(e1)=>
    {  
        
        if(e1.length!=0)
        {    
            return true;
        }
    else{
        
        return false;
       }
      
    })
    .catch(async()=>{
        console.log("ERROR");
        result.innerHTML="ERROR";
    })
  }