var flag=0,sflag=0,yflag=0;
var eventEmitter = {
        emit: function(event,data) {
                //case when the event is error 
                if(event=="error" && data){
                    if(sflag===0)
                    {
                        if(data.message=="Second error."){
                            errorCallback(data);
                            sflag=1;
                        }
                    }
                    if(yflag===1){
                        if(data.message=="Yet another error."){
                            errorCallback2(data);
                            yflag=2;
                        }
                    }
                }
                //case when the event is success
                //set a flag if the message "SUCCESS! Great success! is printed to prevent any other callback to print it
                else if(event=="success" && data){
                    if(flag===0){
                        flag=1;
                        successCallback(data);
                    }
                }
                //case when the event is arbitary
                else{
                    2+2;
                }
        },
        subscribe: function(event,callback){
                //case when the subscribe event is error
                //when the first subscribe is called
                
                if(event=="error"){
                    if(sflag===0)
                    {
                        callback({message:"Second error."});
                        sflag=1;
                        
                    }
                    if(yflag===0){
                        callback({message:"Yet another error."});
                        yflag=1;                    
                    }
                }
                //case when the subscribe event is success
                //check if the flag is set so you dont print it twice
                else if(event=="success"){
                    if(flag===0){
                        callback({message:"Great success!"});
                        flag=1;
                    }
                
                }
                //case when the subscribe event is arbitary
                else{
                    2+2;
                }
        }
}
var errorCallback = function(data) {
  console.log("Error 1. " + data.message);
}

var errorCallback2 = function(data) {
  console.log("Error 2. " + data.message);
}

var successCallback = function(data) {
  console.log("SUCCESS! " + data.message);
}

//copy pasted this for getting to know the flow
eventEmitter.emit("error", {message: "Error one."});//don't print this
eventEmitter.subscribe("error", errorCallback);//print this with callback arg as "second error"
eventEmitter.emit("error", {message: "Second error."});//check for flag and print only if subscribe hasnt printed it already
eventEmitter.subscribe("error", errorCallback2);//print Yet another error and set a flag so emit wont print it again
eventEmitter.emit("error", {message: "Yet another error."});//check for the yet another error flag and print with call back 2
eventEmitter.subscribe("success", successCallback);//print the callback only if emit hasn't printed it 
eventEmitter.emit("success", {message: "Great success!"});//print the message only if subscribe haasnt printed it already

