const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
      new winston.transports.Console({ format: winston.format.simple()}),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

const add= (n1,n2) => {
  return n1+n2;
}
const subtract= (n1,n2) => {
  return n1-n2;
}
const multiply= (n1,n2) => {
  return n1*n2;
} 
const divide= (n1,n2) => {
  return n1/n2;
}

app.get("/add", (req,res)=>{
  const operation = 'addition';
  logger.log({
    level: 'info',
    message: `New ${operation} operation requested: ${req.query.n1} ${operation} ${req.query.n2}`,
  });

  try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
    logger.error("n1 is incorrectly defined");
    throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
    logger.error("n2 is incorrectly defined");
    throw new Error("n2 incorrectly defined");
  }
    
  logger.info('Parameters '+n1+' and '+n2+' received for addition');
  const result = add(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get("/subtract", (req,res)=>{
  const operation = 'subtraction';
  logger.log({
    level: 'info',
    message: `New ${operation} operation requested: ${req.query.n1} ${operation} ${req.query.n2}`,
  });

  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
    logger.error("n1 is incorrectly defined");
    throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
    logger.error("n2 is incorrectly defined");
    throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
  const result = subtract(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get("/multiply", (req,res)=>{
  const operation = 'multiplication';
  logger.log({
    level: 'info',
    message: `New ${operation} operation requested: ${req.query.n1} ${operation} ${req.query.n2}`,
  });

  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
    logger.error("n1 is incorrectly defined");
    throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
    logger.error("n2 is incorrectly defined");
    throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
  const result = multiply(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get("/divide", (req,res)=>{
  const operation = 'division';
  logger.log({
    level: 'info',
    message: `New ${operation} operation requested: ${req.query.n1} ${operation} ${req.query.n2}`,
  });

  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
    logger.error("n1 is incorrectly defined");
    throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
    logger.error("n2 is incorrectly defined");
    throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for division');
  const result = divide(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const port=3040;
app.listen(port,()=> {
  console.log("hello i'm listening to port"+port);
})

