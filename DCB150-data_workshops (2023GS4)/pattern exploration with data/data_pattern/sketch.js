/*
* DCB150 Digital Craftsmanship
* prompt: Vertical lines, not straight, not touching, covering the wall evenly.
* model: ChatGPT (gpt3.5)
* description: data pattern based on 1 year weather data
* data source: https://open-meteo.com
*              retrieve data on 2021-01-01 ~ 2021-12-31
* data url: https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m,relativehumidity_2m
* Created by Janet Huang and ChatGPT
**/
let temperature_data;
let humidity_data;
function setup() { 
  createCanvas(windowWidth, windowHeight); 
  background(255); 
  strokeWeight(2)
  i=0;
  
  //read data from json
  d3.json("era5.json").then((data) => {
    console.log(data);
    temperature_data = data.hourly.temperature_2m;
    humidity_data = data.hourly.relativehumidity_2m;
    
    for (let x = 0; x < windowWidth; x += 10) { 
      for (let y = 0; y < windowHeight; y += 10) { 
        let randomOffset = random(-5, 5);
        stroke(0, humidity_data[i%humidity_data.length]*3, 0);
        line(x + randomOffset, y, x + randomOffset, y + temperature_data[i%temperature_data.length]);
        i++;
      }
    }
  });
  
} 

function draw() {
} 