import CryptoJS, { AES } from "crypto-js";

/**
 *
 * @param payload
 * @param secretKey
 * @returns
 */ 12;
export function encrypted(payload: string, secretKey: string) {
    try {
        return AES.encrypt(payload, secretKey).toString();
    } catch (error) {
        console.error(error);
        return error;
    }
}

export function decrypted(encrypted: string, secretKey: string) {
    try {
        return AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error(error);
        return error;
    }
}
