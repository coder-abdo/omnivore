import { expect } from 'chai'
import {
  getConfirmationCode,
  isConfirmationEmail,
  NewsletterHandler,
} from '../src/newsletter'
import { SubstackHandler } from '../src/substack-handler'
import { AxiosHandler } from '../src/axios-handler'
import { BloombergHandler } from '../src/bloomberg-handler'
import { GolangHandler } from '../src/golang-handler'
import { getNewsletterHandler } from '../src'

describe('Confirmation email test', () => {
  describe('#isConfirmationEmail()', () => {
    it('returns true when email is from Gmail Team', () => {
      const from = 'Gmail Team <forwarding-noreply@google.com>'

      expect(isConfirmationEmail(from)).to.be.true
    })
  })

  describe('#getConfirmationCode()', () => {
    it('returns the confirmation code from the email', () => {
      const code = '593781109'
      const subject = `(#${code}) Gmail Forwarding Confirmation - Receive Mail from sam@omnivore.com`

      expect(getConfirmationCode(subject)).to.equal(code)
    })
  })
})

describe('Newsletter email test', () => {
  describe('#getNewsletterHandler()', () => {
    it('returns SubstackHandler when email is from SubStack', () => {
      const rawUrl = '<https://hongbo130.substack.com/p/tldr>'

      expect(getNewsletterHandler(rawUrl, '')).to.be.instanceof(SubstackHandler)
    })

    it('returns AxiosHandler when email is from Axios', () => {
      const from = 'Mike Allen <mike@axios.com>'

      expect(getNewsletterHandler('', from)).to.be.instanceof(AxiosHandler)
    })

    context('when email is from Bloomberg', () => {
      it('should return BloombergHandler when email is from Bloomberg Business', () => {
        const from = 'From: Bloomberg <noreply@mail.bloombergbusiness.com>'
        expect(getNewsletterHandler('', from)).to.be.instanceof(
          BloombergHandler
        )
      })

      it('should return BloombergHandler when email is from Bloomberg View', () => {
        const from = 'From: Bloomberg <noreply@mail.bloombergview.com>'
        expect(getNewsletterHandler('', from)).to.be.instanceof(
          BloombergHandler
        )
      })
    })

    it('should return GolangHandler when email is from Golang Weekly', () => {
      const from = 'Golang Weekly <peter@golangweekly.com>'
      expect(getNewsletterHandler('', from)).to.be.instanceof(GolangHandler)
    })
  })

  describe('#getNewsletterUrl()', () => {
    it('returns url when email is from SubStack', () => {
      const rawUrl = '<https://hongbo130.substack.com/p/tldr>'

      expect(new SubstackHandler().getNewsletterUrl(rawUrl, '')).to.equal(
        'https://hongbo130.substack.com/p/tldr'
      )
    })

    it('returns url when email is from Axios', () => {
      const url = 'https://axios.com/blog/the-best-way-to-build-a-web-app'
      const html = `View in browser at <a>${url}</a>`

      expect(new AxiosHandler().getNewsletterUrl('', html)).to.equal(url)
    })

    it('returns url when email is from Bloomberg', () => {
      const url = 'https://www.bloomberg.com/news/google-is-now-a-partner'
      const html = `
        <a class="view-in-browser__url" href="${url}">
        View in browser
        </a>
      `

      expect(new BloombergHandler().getNewsletterUrl('', html)).to.equal(url)
    })

    it('returns url when email is from Golang Weekly', () => {
      const url = 'https://www.golangweekly.com/first'
      const html = `
        <a href="${url}" style="text-decoration: none">Read on the Web</a>
      `

      expect(new GolangHandler().getNewsletterUrl('', html)).to.equal(url)
    })
  })

  describe('get author from email address', () => {
    it('returns author when email is from Substack', () => {
      const from = 'Jackson Harper from Omnivore App <jacksonh@substack.com>'
      expect(new NewsletterHandler().getAuthor(from)).to.equal(
        'Jackson Harper from Omnivore App'
      )
    })

    it('returns author when email is from Axios', () => {
      const from = 'Mike Allen <mike@axios.com>'
      expect(new NewsletterHandler().getAuthor(from)).to.equal('Mike Allen')
    })
  })
})
