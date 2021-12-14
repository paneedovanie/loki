const testLoader = require(`../../../../loaders/testLoader`)
testLoader()

const
  LoginService = require(`../services/login.service`),
  loginService = new LoginService,
  UserService = require(`../../user/services/user.service`),
  userService = new UserService

let
  insertData = null,
  insertedData = null

beforeAll(async () => {
  const databaseLoader = require(`../../../../loaders/database`)
  global.database = await databaseLoader()

  insertData = await userService.generate({}, false)
  insertedData = await userService.store(insertData)
});

describe('Login Service - UNIT TEST', () => {
  test('invoke function should return user data', async () => {
    const result = await loginService.invoke({
      username: insertData.username,
      password: insertData.password
    })

    expect(result.user.first_name).toEqual(insertData.first_name)
    expect(result.user.last_name).toEqual(insertData.last_name)
  })
})

afterAll(async () => {
  await userService.deletePermanently(insertedData.id)
  database.end()
});