const
  { query } = require(`${__basedir}/helpers/database.helper`),
  jwt = require('jsonwebtoken'),
  UserService = require('../modules/user/services/user.service'),
  userService = new UserService

module.exports.auth = (code) => async (req, res, next) => {
  const auth = req.header('Authorization')
  if (!auth)
    return res.status(401)
      .json({ errors: ['Missing token'] })

  const token = auth.replace('Bearer ', '')
  if (!jwt.JsonWebTokenError)
    return res.status(401)
      .json({ errors: ['Broken token'] })

  try {
    const { id } = jwt.verify(token, config.secret)

    if (id) {
      req.user = await userService.read(id)
      const tokensResult = await query("SELECT * FROM tokens WHERE token = ? && user_id = ?", [token, id])
      if (!req.user || !tokensResult[0]) throw new Error("")

      let
        tokenCreated = new Date(tokensResult[0].created_at),
        currentTimestamp = new Date()

      tokenCreated.setDate(tokenCreated.getDate() + config.tokenDuration)
      if (tokenCreated < currentTimestamp)
        return res.status(403)
          .json({ errors: ['Token expired'] })

      const permissions = await query(`
        SELECT R.id 
        FROM roles R 
        JOIN role_permissions RP ON R.id = RP.role_id
        JOIN permissions P ON P.id = RP.permission_id
        WHERE R.id = ? LIMIT 1`, [req.user.role_id])

      if (!permissions[0])
        return res.status(401)
          .json({ errors: ['No permission to access'] })

      next()
    }
  } catch (err) {
    res.status(400)
      .json({ errors: ['Invalid token'] })
  }
}