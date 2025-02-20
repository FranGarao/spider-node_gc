import express from 'express';
import GoogleSheetsController from '../controllers/googleSheets.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();
const googleSheetsController = new GoogleSheetsController();

// Ruta para actualizar Google Sheets
route.post('/update-sheet',authMiddleware,  googleSheetsController.updateSheet);

// Ruta para leer datos desde Google Sheets
route.get('/read-sheet',authMiddleware,  googleSheetsController.readSheet);

// Ruta para monitorizar cambios en Google Sheets
route.post('/monitor-changes',authMiddleware,  googleSheetsController.monitorChanges);

export default route;
