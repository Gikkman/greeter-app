import axios from 'axios';
import express from 'express'
const app = express()
const port = 8080

const greeting = process.env['GREETING'];

app.get('/', (req, res) => {
  console.log(`Received request on ${req.url}`)
  if(greeting) 
    res.send(`Hello, ${greeting}!`)
  else
    res.send(`No greeting set!`)
})

app.get("/svc", (req,res) => {
  console.log("Bouncing from /svc to /")
  axios.get("http://greeter-svc:8080")
    .then(v => {
      res.send(v);
    })
    .catch(err => {
      if( axios.isAxiosError(err) ) {
        console.error(err.message)
        res.status(500).send(err.message);
      }
      else {
        res.status(500).send("Unknown error");
      }
    })
})

app.get("/health", (req,res) => {
  res.send("OK")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
