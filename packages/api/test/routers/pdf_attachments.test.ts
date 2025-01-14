import {
  createTestNewsletterEmail,
  createTestUser,
  deleteTestUser,
  getLink,
} from '../db'
import { request } from '../util'
import { User } from '../../src/entity/user'
import 'mocha'
import * as jwt from 'jsonwebtoken'
import { expect } from 'chai'

describe('PDF attachments Router', () => {
  const username = 'fakeUser'
  const newsletterEmail = 'fakeEmail'

  let user: User
  let authToken: string

  before(async () => {
    // create test user and login
    user = await createTestUser(username)

    await createTestNewsletterEmail(user, newsletterEmail)
    authToken = jwt.sign(newsletterEmail, process.env.JWT_SECRET || '')
  })

  after(async () => {
    // clean up
    await deleteTestUser(username)
  })

  describe('upload', () => {
    it('create upload file request and return id and url', async () => {
      const testFile = 'testFile.pdf'

      const res = await request
        .post('/svc/pdf-attachments/upload')
        .set('Authorization', `${authToken}`)
        .send({
          email: newsletterEmail,
          fileName: testFile,
        })
        .expect(200)

      expect(res.body.id).to.be.a('string')
      expect(res.body.url).to.be.a('string')
    })
  })

  describe('create article', () => {
    it('create article with uploaded file id and url', async () => {
      // upload file first
      const testFile = 'testFile.pdf'
      const res = await request
        .post('/svc/pdf-attachments/upload')
        .set('Authorization', `${authToken}`)
        .send({
          email: newsletterEmail,
          fileName: testFile,
        })
      const uploadFileId = res.body.id

      // create article
      const res2 = await request
        .post('/svc/pdf-attachments/create-article')
        .send({
          email: newsletterEmail,
          uploadFileId: uploadFileId,
        })
        .set('Authorization', `${authToken}`)
        .expect(200)

      expect(res2.body.id).to.be.a('string')
      const link = await getLink(res2.body.id)

      expect(link).to.exist
    })
  })
})
