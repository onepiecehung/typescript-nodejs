/// <reference types="node" />
/**
 *
 * @param payload
 * @param expiresIn
 */
export declare function generateAccessToken(payload: string | Object | Buffer, expiresIn?: number | string): Promise<string>;
/**
 *
 * @param payload
 * @param expiresIn
 */
export declare function generateRefreshToken(payload: string | Object | Buffer, expiresIn?: number | string): Promise<string>;
