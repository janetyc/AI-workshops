function setup() {
  createCanvas(400, 400);
  input = createInput();
  input.size(200, 10);
  input.position(10, 10);
  
  //create a button
  button = createButton("submit");
  button.position(220,10);
  button.mouseClicked(buttonEvent);
  
  //create a output div
  output = createDiv();
  output.position(10,30);
  
  //connect to DF
  OOCSI.connect('wss://oocsi.id.tue.nl/ws');
  
  // this is where you receive the data back from the DF script  
  // that means the DF script needs to use DF.oocsi('returnChatAPI', {text: "gpt generated content"})
  OOCSI.subscribe("returnChatAPI", function(e) {
    print(e)
    if(e.error){
      output.html("ask:"+input.value()+"<br>ans:"+e.error);  
    }else{
      output.html("ask:"+input.value()+"<br>ans:"+e.data.text);
    }
    input.value("");
  });
  
}

function draw() {
  background(220);
}

function buttonEvent() {
  print("send data to DF");
  print(input.value());
  var data = {
    "input": input.value()
  };
  
  OOCSI.send("callChatAPI", data);
  
}
