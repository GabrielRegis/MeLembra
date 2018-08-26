import { SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';
import AppConfig from '../../../Config/AppConfig';
import { RowMapper } from './RowMapper';
import * as sql from '../migrations/initialMigration';

export class Schema {
    static instance?: Schema;
    private version: number = 1;
    private constructor() {
        this.version = AppConfig.databaseVersion;
    }

    public static getInstance(): Schema {
        if (this.instance === undefined) {
            this.instance = new Schema();
        }
        return this.instance;
    }

    public async initializeDatabaseSchema(sqLiteDatabase: SQLiteDatabase) {
        return new Promise(async (resolve, reject) => {
            sqLiteDatabase.transaction(async (tx: Transaction) => {
                tx.executeSql(sql.version);

                const migrations: number[] = await this.getMigrations(sqLiteDatabase);
                let max = migrations !== undefined && migrations.length > 0 ? Math.max(...migrations) : 0;

                if (max === undefined) {
                    max = 0;
                }

                if (max < this.version) {
                    try {
                        await sqLiteDatabase.executeSql('INSERT INTO version (version_id) VALUES (?);', [this.version]);
                    } catch (error) {
                        console.log(error);
                        reject();
                        return;
                    }
                }

                while (max < this.version) {
                    switch (max) {
                        case 0:
                            await this.executeInitialSchema(sqLiteDatabase);
                            break;
                    }
                    ++max;
                }

                resolve();
            });
        });
    }

    private async getMigrations(database: SQLiteDatabase): Promise<number[]> {
        return new Promise<number[]>(async (resolve) => {
            database.transaction(async (tx) => {
                const [, resultSet] = await tx.executeSql('SELECT version_id FROM version');
                const migrations: number[] = new RowMapper<any>().mapToList(resultSet.rows, ['versionId']).map((it) => it.versionId as number);
                resolve(migrations);
            });
        });
    }

    private async executeInitialSchema(database: SQLiteDatabase) {
        return new Promise(async (resolve) => {
            await database.transaction(async (tx: Transaction) => {
                tx.executeSql(sql.pragmaOff);
                tx.executeSql(sql.createTableUser);
                tx.executeSql(sql.createTableUserAuthority);
                tx.executeSql(sql.createTableCarver);
                tx.executeSql(sql.createTableChassi);
                tx.executeSql(sql.createTableFollowUp);
                tx.executeSql(sql.createTableVehicle);
                tx.executeSql(sql.createTableVehicleDefect);
                tx.executeSql(sql.createTableVehicleObject);
                tx.executeSql(sql.createTableFollowUpUser);
                tx.executeSql(sql.createTableVehicleGroup);
                tx.executeSql(sql.createTableFormGroup);
                tx.executeSql(sql.createTableQuestion);
                tx.executeSql(sql.createTableAnswer);
                tx.executeSql(sql.createTableDocument);
                tx.executeSql(sql.pragmaOn);

                setTimeout(() => {
                    resolve(); // FIXME check for resolve all promises above. (async not works here since the arrow is another context for the transaction)
                }, 500);
            });
        })
            .catch((e) => {
                console.log(`error in schema: ${e}`);
            })
            .finally(() => {
                console.log('SQL migration is done');
            });
    }
}
