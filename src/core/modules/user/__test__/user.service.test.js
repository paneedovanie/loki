const testLoader = require(`../../../../loaders/testLoader`)
testLoader()

const
  UserService = require(`../services/user.service`),
  userService = new UserService

let
  insertData = null,
  insertedData = null,
  editedData = null

beforeAll(async () => {
  const databaseLoader = require(`../../../../loaders/database`)
  global.database = await databaseLoader()

  insertData = await userService.generate({}, false)
});

describe('User Service - UNIT TEST', () => {
  test('store function should add data to table', async () => {
    insertedData = await userService.store(insertData)

    expect(typeof insertedData.id).toEqual('number')
  })

  test('index function should return data and options', async () => {
    const result = await userService.index({})

    expect(result).toEqual({
      data: expect.any(Array),
      options: expect.any(Object),
    })

    expect(result.data[0]).toEqual(insertedData)
  })

  test('read function should return user data', async () => {
    const result = await userService.read(insertedData.id)

    expect(result).toEqual(insertedData)
  })

  test('update function should update user data', async () => {
    const editData = { ...insertData, first_name: 'Meooooow' }
    editedData = await userService.update(insertedData.id, editData)

    expect(editedData.first_name).toEqual(editData.first_name)
  })

  test('trash function should put user on trashed', async () => {
    const result = await userService.trash(insertedData.id)
    editedData = await userService.read(insertedData.id)

    expect(result.changedRows).toEqual(1)
  })

  test('trashed function should return data and options', async () => {
    const result = await userService.trashed({})

    expect(await userService.trashed({})).toEqual({
      data: expect.any(Array),
      options: expect.any(Object),
    })

    expect(result.data[0]).toEqual(editedData)
  })

  test('restore function should restore data from trashed', async () => {
    const result = await userService.restore(insertedData.id)

    expect(result.affectedRows).toEqual(1)
  })

  test('deletePermanently function should delete user from table', async () => {
    const result = await userService.deletePermanently(insertedData.id)

    expect(result.affectedRows).toEqual(1)
  })
})

afterAll(() => database.end());