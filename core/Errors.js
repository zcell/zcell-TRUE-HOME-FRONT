class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor() {
        this.error = {};
    }

    /**
     * Determine if an error exists for the given field.
     *
     * @param {string} field
     */
    has(field) {
        return this.error.hasOwnProperty(field);
    }

    /**
     * Determine if we have any error.
     */
    any() {
        return Object.keys(this.error).length > 0;
    }

    /**
     * Retrieve the error message for a field.
     *
     * @param {string} field
     */
    get(field) {
        if (this.error[field]) {
            return this.error[field][0];
        }
    }

    /**
     * Record the new error.
     *
     * @param {object} error
     */
    record(error) {
        this.error = error;
    }

    /**
     * Очистить одно или все поля.
     *
     * @param {string|null} field
     */
    clear(field) {

        if (field) {
            this.error[field] = null;

            delete this.error[field];

            return;
        }

        this.error = {};
    }
}

export default Errors;