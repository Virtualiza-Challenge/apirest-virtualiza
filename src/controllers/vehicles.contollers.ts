import { Request, Response } from 'express'


export const getVehicles = async (_req: Request, res: Response) => {
  return res.send('All vehicle...')
}


export const getVehicleByID = async (_req: Request, res: Response) => {
  return res.send('An vehicle by ID!')
}


export const createVehicle = async (_req: Request, res: Response) => {
  return res.send('A new vehicle insert!')
}


export const updateVehicle = async (_req: Request, res: Response) => {
  return res.send('Vehicle updated!')
}


export const deleteVehicle = async (_req: Request, res: Response) => {
  return res.send('Vehicle deleted!')
}
