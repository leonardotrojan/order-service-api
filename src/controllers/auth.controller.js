import jwt from "jsonwebtoken"

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        if (email !== 'admin@admin.com' || password !== 'admin') {
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        const token = jwt.sign(
            {
                userId: 1,
                role: 'admin'
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        return res.json({ token })
    }
}

export default new AuthController()