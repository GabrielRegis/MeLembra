import moment from 'moment';
import database, { Database } from './config/database';
import { RowMapper } from './config/RowMapper';
import { Chassi } from '../../Model/Chassi';

class ChassiRepository {
    private database: Database;
    static readonly INSERT_STATEMENT = 'INSERT OR REPLACE INTO chassi (id, chassi_number, created_date, last_modified_date) VALUES (?, ?, ?, ?)';
    static readonly SELECT_ALL = 'SELECT * FROM chassi';
    static readonly SELECT_ONE = 'SELECT * FROM chassi WHERE id = ?';

    constructor(database: Database) {
        this.database = database;
    }

    public async findAll(): Promise<Chassi[]> {
        let result: Chassi[] = [];

        try {
            const db = await this.database.getInstance();
            const [{ rows }] = await db.executeSql(ChassiRepository.SELECT_ALL);
            result = new RowMapper<Chassi>().mapToList(rows, Chassi.Types).map((it) => {
                it.createdDate = moment(it.createdDate);
                return it;
            });
            return result;
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    public async findOne(id: string): Promise<Chassi | null> {
        let result: Chassi | null = null;

        try {
            const db = await this.database.getInstance();
            const [{ rows }] = await db.executeSql(ChassiRepository.SELECT_ONE, [id]);
            result = new RowMapper<Chassi>().mapToSingle(rows, Chassi.Types);

            if (result !== null) {
                result.createdDate = moment(result.createdDate).toDate();
            }

            return result;
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    public async save(entities: Chassi[]) {
        const db = await this.database.getInstance();

        for (const entity of entities) {
            try {
                await db.executeSql(ChassiRepository.INSERT_STATEMENT, new RowMapper<Chassi>().mapToRow(entity, Chassi.Types));
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default new ChassiRepository(database);
