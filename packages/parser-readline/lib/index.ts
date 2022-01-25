import { DelimiterParser } from '@serialport/parser-delimiter'
import { TransformOptions } from 'stream'

export interface ReadlineOptions extends TransformOptions {
  /** defaults to false */
  includeDelimiter?: boolean
  /** defaults to \n */
  delimiter?: string | Buffer | number[]
  /** Defaults to utf8 */
  encoding?: BufferEncoding
}

/**
 *  A transform stream that emits data after a newline delimiter is received.
 * @summary To use the `Readline` parser, provide a delimiter (defaults to `\n`). Data is emitted as string controllable by the `encoding` option (defaults to `utf8`).
 * @example
const SerialPort = require('serialport')
const {ReadlineParser} = require('@serialport/parser-readline')
const port = new SerialPort('/dev/tty-usbserial1')
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', console.log)
*/
export class ReadlineParser extends DelimiterParser {
  constructor(options?: ReadlineOptions) {
    const opts = {
      delimiter: Buffer.from('\n', 'utf8'),
      encoding: 'utf8' as BufferEncoding,
      ...options,
    }

    if (typeof opts.delimiter === 'string') {
      opts.delimiter = Buffer.from(opts.delimiter, opts.encoding)
    }

    super(opts)
  }
}
