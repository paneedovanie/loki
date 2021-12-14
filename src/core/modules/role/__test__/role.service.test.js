const testLoader = require(`../../../../loaders/testLoader`)
testLoader()

const
  RoleService = require(`../services/role.service`),
  roleService = new RoleService

let
  insertData = null,
  insertedData = null,
  editedData = null

beforeAll(async () => {
  const databaseLoader = require(`../../../../loaders/database`)
  global.database = await databaseLoader()

  insertData = await roleService.generate({}, false)
});

describe('Role Service - UNIT TEST', () => {
  test('store function should add data to table', async () => {
    insertedData = await roleService.store(insertData)

    expect(typeof insertedData.id).toEqual('number')
  })

  test('index function should return data and options', async () => {
    const result = await roleService.index({})

    expect(result).toEqual({
      data: expect.any(Array),
      options: expect.any(Object),
    })

    // expect(result.data[0]).toEqual(insertedData)
  })

  test('read function should return role data', async () => {
    const result = await roleService.read(insertedData.id)

    expect(result).toEqual(insertedData)
  })

  test('update function should update role data', async () => {
    const editData = { ...insertData, title: 'Meooooow' }
    editedData = await roleService.update(insertedData.id, editData)

    expect(editedData.title).toEqual(editData.title)
  })

  test('trash function should put role on trashed', async () => {
    const result = await roleService.trash(insertedData.id)
    editedData = await roleService.read(insertedData.id)

    expect(result.changedRows).toEqual(1)
  })

  test('trashed function should return data and options', async () => {
    const result = await roleService.trashed({})

    expect(await roleService.trashed({})).toEqual({
      data: expect.any(Array),
      options: expect.any(Object),
    })

    expect(result.data[0]).toEqual(editedData)
  })

  test('restore function should restore data from trashed', async () => {
    const result = await roleService.restore(insertedData.id)

    expect(result.affectedRows).toEqual(1)
  })

  test('deletePermanently function should delete role from table', async () => {
    const result = await roleService.deletePermanently(insertedData.id)

    expect(result.affectedRows).toEqual(1)
  })

  test(`getPermissions function should return role's permissions`, async () => {
    const result = await roleService.getPermissions(insertedData.id)

    expect(Array.isArray(result)).toBeTruthy()
  })
})

afterAll(() => database.end());