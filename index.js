const { WAConnection, MessageType } = require('@adiwajshing/baileys').default
const makeWASocket = require("@adiwajshing/baileys").default
const { exec, spawn, execSync } = require("child_process")
const pino = require('pino')
const fs = require('fs')
const fetch = require('node-fetch')  
const qrcode = require("qrcode-terminal")
const { delay , useSingleFileAuthState } = require("@adiwajshing/baileys")
exec('rm -rf session.json')
const { state, saveState } = useSingleFileAuthState('./session.json')


function ZeroTwo() {
  let sam = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })
  sam.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      await delay(1000 * 10)
       const session = fs.readFileSync('./session.json')


      await sam.sendMessage(sam.user.id, {document: session, mimetype: 'application/json', fileName: session.json })
      await sam.sendMessage(sam.user.id, {text: `Here Is Your MD Session\n\nFork This Repo github.com/sampandey001/Zero-Two-md/fork \n\nUpload this json file to your repo, \n\n*Read Wiki:* https://github.com/SamPandey001/Zero-Two-MD/wiki/ZERO-TWO\n\nUse this link to get more info about deployment.\n\n*Give a Star to our bot If you liked it.*`} )
      process.exit(0)
    }
    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
      ) {
      ZeroTwo()
    }
  })
  sam.ev.on('creds.update', saveState)
  sam.ev.on('messages.upsert', () => { })
}
ZeroTwo()