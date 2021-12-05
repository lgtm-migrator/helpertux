import {centra} from '@nia3208/centra';
import crypto from 'crypto';
import zlib from 'zlib';
import bs58 from 'bs58';

/**
 * @function sendRequest
 * @description sends request to specified url with specified data
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @param {string} url - The url to send request at
 * @param {any} data - The data to post
 * @returns {Promise<{url: string, data: {status: number, id?: string, url?: string, deletetoken?: string, message?: string}}>} Response from the server
 */
async function sendRequest(url, data) {
  const req = centra(url, 'POST')
    .header({
      'Content-Type': 'application/json',
      'X-Requested-With': 'JSONHttpRequest',
    })
    .body(data, 'json');
  return {
    url: req.url,
    data: await req.json(),
  };
}

/**
 * @function handlePaste
 * @description encrypts data before it's sent to privatebin instance
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @param {string} paste - The data to send / paste
 * @param {Function} log - The logger function to use for logging
 * @returns {Promise<{url?: string, deleteToken?: string, message?: string, error?: Error}>} decryption key, delete token, and the url
 */
export default async function handlePaste(paste, log) {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(8);
  const key = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256'),
    iv
  );
  const data = [
    [
      iv.toString('base64'),
      salt.toString('base64'),
      100000,
      256,
      128,
      'aes',
      'gcm',
      'zlib',
    ],
    'plaintext',
    0,
    0,
  ];
  cipher.setAAD(Buffer.from(JSON.stringify(data), 'utf-8'));
  const cipherText = Buffer.concat([
    cipher.update(
      Buffer.from(
        zlib.deflateRawSync(
          new Uint8Array(
            Buffer.from(
              JSON.stringify({
                paste,
              }),
              'utf8'
            )
          )
        )
      )
    ),
    cipher.final(),
    cipher.getAuthTag(),
  ]);
  const requestData = {
    v: 2,
    ct: cipherText.toString('base64'),
    adata: data,
    meta: {
      expire: '1week',
    },
  };
  let res;
  try {
    res = await sendRequest(process.env.PRIVATE_BIN_URI, requestData);
    if (res.data.status) {
      throw new Error(res.data.message);
    }
  } catch (e) {
    log(e, 'ERROR', 'PrivateBin');
    log('Private bin server returned an Error!', 'INFO', 'PrivateBin');
    return {
      error: e,
    };
  }
  return {
    url: `${res.url}?${res.data.id}#${bs58.encode(key)}`,
    deleteToken: res.data.deletetoken,
  };
}
