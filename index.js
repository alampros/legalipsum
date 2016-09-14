import wiki from 'wikijs'
import cheerio from 'cheerio'
import table from 'table'
import chalk from 'chalk'
import { inspect } from 'util'

wiki().page('List of Latin legal terms')
  .then(page => page.html())
  .then(html => {
    const $ = cheerio.load(html)
    const phrases = $('.wikitable tr').map((i, el) => {
      const latin = $(el).find('td').eq(0).text().trim()
      const english = $(el).find('td').eq(1).text().trim()
      return {
        latin,
        english,
      }
    }).toArray()
    const tableData = [['Latin', 'English']].concat(phrases.filter(({ latin, english }) => {
      if(latin === '') {
        return false
      }
      return true
    }).map(phrase => {
      return [chalk.blue(phrase.latin), chalk.green(phrase.english)]
    }))
    
    console.log(table(tableData))
  })
  .catch((err) => {
    console.error(err)
  })
