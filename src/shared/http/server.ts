import 'reflect-metadata';

import '@shared/typeorm';
import cors from 'cors';    
import routes from './routes';
import express, { NextFunction, Request, Response } from  'express'; 
import AppError from './Errors/AppError';

 const app = express();
 app.use(cors());
 app.use(express.json());
 app.listen(3333, () => {
 console.log('Server started on port 3333!');
 })

 app.use(routes);


app.use((error: Error, request: Request, response : 
Response, next: NextFunction):void=>{ 
if(error instanceof AppError){ 
response.status(error.statusCode).json({ 
status: 'error', 
message: error.message 
}); 
} 
response.status(500).json({ 
status: 'error', 
message: 'Internal server error' 
}); 
}); 