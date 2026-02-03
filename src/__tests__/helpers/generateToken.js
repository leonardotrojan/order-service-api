import jwt from 'jsonwebtoken'

function generateToken() {
  return jwt.sign(
    { userId: 1, role: 'admin' },
    process.env.JWT_SECRET || 'test-secret'
  )
}

export default generateToken