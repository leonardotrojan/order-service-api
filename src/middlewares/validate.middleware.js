import AppError from "../errors/AppError.js";

function validate(schema, property = 'body') {
    return (req, res, next) => {
        const result = schema.safeParse(req[property])

        if (!result.success) {
            const message = result.error.issues
              .map(issue => issue.message)
              .join(', ')

            return next(new AppError(message, 422))
        }

        req[property] = result.data
        return next()
    }
}

export default validate