import database, { Database } from './config/database';
import { FormGroup } from '../../Model/FormGroup';
import { RowMapper } from './config/RowMapper';
class FormGroupRepository {
    database: Database;

    static readonly SELECT_ALL = 'SELECT * FROM form_group';

    constructor(database: Database) {
        this.database = database;
    }

    public async findAll(): Promise<FormGroup[]> {
        let result: FormGroup[] = [];

        try {
            const db = await this.database.getInstance();
            const [{ rows }] = await db.executeSql(FormGroupRepository.SELECT_ALL);
            result = new RowMapper<FormGroup>().mapToList(rows, FormGroup.Types);

            return result;
        } catch (error) {
            console.log(error);
        }
        return [];
    }
}

export default new FormGroupRepository(database);
