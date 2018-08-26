class ValidationForms {
    validateEmail(newEmail?: string): boolean {
        let isEmailValid = true;

        if (newEmail === undefined || newEmail === null) {
            isEmailValid = false;
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (newEmail !== undefined && reg.test(newEmail) === false) {
            isEmailValid = false;
        }

        return isEmailValid;
    }

    validateString(text?: string) {
        return !(text === undefined || text === null || text === '');
    }

    validatePassword(text?: string) {
        return this.validateString(text) && text!!.length > 3;
    }
}

export default new ValidationForms();
