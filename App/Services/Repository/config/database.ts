import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { DatabaseParams } from 'react-native-sqlite-storage';
import { Schema } from './schema';
import AppConfig from '../../../Config/AppConfig';
import _ from 'lodash';

SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

export class Database {
    private username: string | undefined;
    private opened: boolean = false;
    private sqLiteDatabase: SQLiteDatabase | null = null;

    get isOpen(): boolean {
        return this.opened;
    }

    set isOpen(open: boolean) {
        this.opened = open;
        if (!open && this.sqLiteDatabase !== undefined && this.sqLiteDatabase !== null) {
            this.sqLiteDatabase.close().then(() => {
                this.sqLiteDatabase = null;
            });
        }
    }

    public async getInstance(): Promise<SQLiteDatabase> {
        if (!this.username) {
            Promise.reject('Username is not available for initialize the database');
        }

        if (!this.isOpen) {
            return this.open();
        }
        return Promise.resolve(this.sqLiteDatabase!);
    }

    public async setCurrentUser(username: string) {
        this.username = username;
        if (this.sqLiteDatabase !== undefined && this.sqLiteDatabase !== null) {
            await this.sqLiteDatabase.close();
            this.sqLiteDatabase = null;
            this.isOpen = false;
        }
    }

    private async open(): Promise<SQLiteDatabase> {
        if (!this.username) {
            Promise.reject('Username is not available for initialize the database');
        }

        const name = _.toLower(_.trim(_.deburr(this.username)));

        const params: DatabaseParams = {
            name: `${name}____${AppConfig.databaseName}`,
            location: 'default'
        };

        this.sqLiteDatabase = await SQLite.openDatabase(params);

        await Schema.getInstance().initializeDatabaseSchema(this.sqLiteDatabase);

        return this.sqLiteDatabase;
    }
}

export default new Database();
