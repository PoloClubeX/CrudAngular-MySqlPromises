import { request, Request, Response } from 'express';
import pool from '../database'

class GamesController {
    public games(req: Request, res: Response) {
        pool.query('describe games');
        res.json('games');
    }

    public async list(req: Request, res: Response) {
        const games = await pool.query('select * from games');

        res.json(games);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        await pool.query('insert into games set ?', [req.body]);
        res.json({ msg: 'Juego Guardado' });
    }

    public async delete(req: Request, res: Response):Promise<void> {
        const {id}=req.params;
        await pool.query('delete from games where id= ?', [id]);
        res.json({ text: 'Eliminando Juego' });
    }
    
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('select * from games where id=?', [id]);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ msg: 'No existe el juego' });
        res.json({ text: 'Consultando juego nro :' + req.params.id });
    } 
    
    public  async update(req: Request, res: Response):Promise<void> {
        const {id}=req.params;
        await pool.query('update games set ? where id= ?', [req.body,id]);


        res.json({ text: 'Actualizando Juego' });
    }

}

export const gamesController = new GamesController();