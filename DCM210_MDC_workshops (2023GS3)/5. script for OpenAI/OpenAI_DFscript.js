DF.print(data.input)
let result = DF.api("openai-gpt", {
  "api_token": "<YOUR_OPENAI_API_TOKEN>", 
  "task": "chat",
  "messages": [
    { "role": "user", "content": data.input }
  ]
})
DF.print(result)
DF.oocsi('returnChatAPI', {text: result.content})