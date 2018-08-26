import validator from 'validator';
import { noop } from 'redux-saga/utils';
import Immutable, { ImmutableObject } from 'seamless-immutable';

export interface Field<T> {
    name: keyof T;
    value: any;
}

export default class FormValidator<T> {
    validations: Array<ValidationItem<T>>;
    validation: ValidatorResult;

    constructor(validations: Array<ValidationItem<T>>) {
        this.validations = validations;
        this.validation = this.valid();
    }

    get(): ImmutableObject<ValidatorResult> {
        return Immutable(this.validation);
    }

    validateField(field: Field<T>): ImmutableObject<ValidatorResult> {
        const fieldValidation = this.validations.filter((validation) => validation.name === field.name)[0];
        const fieldValue = field.value;

        const validField = fieldValidation.rules.every((rule) => {
            this.validation[field.name.toString()] = { valid: true, message: '' };

            const args = rule.args || [];
            const validationMethod = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

            if (validationMethod(fieldValue, args) !== rule.validWhen) {
                this.validation[field.name.toString()] = { valid: false, message: rule.message };
                return false;
            } else {
                return true;
            }
        });

        if ((fieldValidation.mandatory === undefined || fieldValidation.mandatory) && !validField) {
            this.validation.form = {
                valid: validField
            };
        } else {
            const validForm = Object.keys(this.validation)
                .filter((it) => it !== 'form')
                .every((it) => this.validation[it].valid);
            this.validation.form = {
                valid: validForm
            };
        }

        return Immutable(this.validation);
    }

    makeDirty(field: string) {
        this.validation[field] ? (this.validation[field].dirty ? (this.validation[field].dirty = true) : noop()) : noop();
    }

    validate(fields?: T): ImmutableObject<ValidatorResult> {
        const validation = { ...this.validation };

        if (fields === undefined) {
            return Immutable(validation);
        }

        const validForm: boolean = this.validations
            .map((field) => {
                return (
                    field.rules.every((rule) => {
                        validation[field.name] = { valid: true, message: '' };

                        const args = rule.args || [];
                        const validationMethod = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

                        if (validationMethod(fields[field.name], args) !== rule.validWhen) {
                            validation[field.name] = { valid: false, message: rule.message };
                            return false;
                        } else {
                            return true;
                        }
                    }) &&
                    (field.mandatory || true)
                );
            })
            .reduce((l, r) => l && r);

        validation.form.valid = validForm;
        this.validation = { ...validation };
        return Immutable(validation);
    }

    valid(): ImmutableObject<ValidatorResult> {
        const validation = {
            form: {
                valid: true
            }
        };

        if (this.validations === undefined) {
            return Immutable(validation);
        }

        this.validations.map((rule) => {
            validation[rule.name.toString()] = {
                valid: true,
                message: ''
            };
        });

        this.validation = { ...validation };
        return Immutable(validation);
    }
}

export interface ValidatorResult {
    form: ValidatorItem;

    [key: string]: ValidatorItem;
}

export interface ValidatorItem {
    valid: boolean | true;
    dirty?: boolean | false;
    message?: string | '';
}

export interface ValidationItem<T> {
    name: keyof T;
    rules: ValidationRule[];
    mandatory?: boolean | true;
}

interface ValidationRule {
    method: string | ((value: string, args?: any[] | RegExp) => boolean);
    validWhen: boolean;
    message: string;
    args?: any[] | RegExp;
}
