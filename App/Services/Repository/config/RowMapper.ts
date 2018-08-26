import moment from 'moment';
import { isMoment } from 'moment';
import _ from 'lodash';

/**
 * @author Deividi Cavarzan
 * @export
 * @class RowMapper
 * @template T 
 */
export class RowMapper<T extends object> {
    /**
     *
     * Receives the ResultSet from database and parse to the resulting entity <T>
     *
     * Parse the keys stored in database in snakeCase to object's camelCase.
     * Inner objects need to have a dot to represent the downside relationship
     *
     * Examples:
     *
     * # 1 using keys => ['id', 'name', 'createdDate']
     * Database result:
     *
     * --- id --- name --- created_date
     *     1      bryan    2018-01-01 00:00:00
     *
     * this will be parsed to:
     * {
     *  id: 1,
     *  name: 'bryan'
     *  createdDate: 2018-01-01 00:00:00 (NOTE: dates need to be converted to moment() instances after)
     * }
     *
     * #2 using keys => ['id', 'inner.id', 'createdDate']
     * Database result:
     *
     * --- id --- inner_id --- created_date
     *     1      5            2018-01-01 00:00:00
     *
     * this will be parsed to:
     * {
     *  id: 1,
     *  inner: {
     *      id: 5
     *  }
     *  createdDate: 2018-01-01 00:00:00
     * }
     * 
     * Dates are saved as TEXT column type in the database, formatted under the pattern YYYY-MM-DD HH:mm:ss.SSS
     * This method DOESN'T EXTRACT the field as date / moment object. You need to .map it after the result as needed.
     * 
     * @param {*} rows from database result
     * @param {string[]} keys to be parsed from database
     * @returns {T[]}
     * @memberof RowMapper
     */
    public mapToList(rows: any, keys: string[]): T[] {
        if (rows === undefined) {
            throw new Error(`ResultSet is undefined. Check your database connection / instance`);
        }
        if (rows.length === 0) {
            return [] as T[];
        }
        const result: T[] = [] as T[];

        for (let i = 0; i < rows.length; i++) {
            result.push(this.mapToEntity(keys, rows.item(i)));
        }

        return result;
    }


    /**
     * 
     * Same as method above @{mapToList}, extract only first result or null
     * 
     * @param {*} rows 
     * @param {string[]} keys 
     * @returns {(T | null)} 
     * @memberof RowMapper
     */
    public mapToSingle(rows: any, keys: string[]): T | null {
        if (rows === undefined) {
            throw new Error(`ResultSet is undefined. Check your database connection / instance`);
        }
        if (rows.length > 1) {
            throw new Error(`ResultSet cannot have more than 1 result. Currennt result size is ${rows.length}`);
        }
        if (rows.length === 0) {
            return null;
        }

        return this.mapToEntity(keys, rows.item(0));
    }

    public mapToEntity(keys: string[], row: any) {
        const entity: T = {} as T;
        keys.forEach((key) => {
            if (key.indexOf('.') > 0) {
                // dot -> inner objects need to be evaluated from columns to objects
                _.set(entity, key, row[_.snakeCase(key)] || null);
            } else {
                entity[key] = row[_.snakeCase(key)] || null;
            }
        });
        return entity;
    }


    /**
     * 
     * Parse the entity to column values
     * 
     * dates are stored as string, using the format YYYY-MM-DD HH:mm:ss.SSS
     * 
     * @param {T} entity 
     * @param {string[]} keys 
     * @returns {any[]} 
     * @memberof RowMapper
     */
    public mapToRow(entity: T, keys: string[]): any[] {
        const result: any[] = [];
        keys.forEach((key) => {
            let value: any = null;
            if (key.indexOf('.') < 0) {
                value = entity[_.camelCase(key)];
            } else {
                value = _.get(entity, key);
            }
            if (value instanceof Date) {
                result.push(moment(value).format('YYYY-MM-DD HH:mm:ss.SSS') || null);
            } else if (isMoment(value)) {
                result.push((value as moment.Moment).format('YYYY-MM-DD HH:mm:ss.SSS') || null);
            } else if (key === 'createdDate' && (value === undefined || value === null)) {
                result.push(moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
            } else {
                result.push(value || null);
            }
        });
        return result;
    }
}
