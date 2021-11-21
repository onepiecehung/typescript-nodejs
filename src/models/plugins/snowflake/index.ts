import { Schema } from "mongoose";
import { UniqueID } from "nodejs-snowflake";

type TOptions = {
    field: string; // Defaults to snowflakeId
    customEpoch: number; // Defaults to the current time. This is UNIX timestamp in ms
    machineId: number; // A value ranging between 0 - 4095. Defaults to 112
    type: Boolean; // Defaults to true. If set to false, defaults to number
};

export default function snowflakeId(schema: Schema, options: TOptions) {
    const field: string = options?.field || "snowflakeId";
    const obj: any = {};
    options?.type ? (obj[`${field}`] = "number") : (obj[`${field}`] = "string");

    const machineId: number = options?.machineId || 112;
    const customEpoch: number =
        options?.customEpoch || new Date().getTime() / 1000;
    schema.add(obj);

    schema.pre("save", function (next: any) {
        this[`${field}`] = new UniqueID({
            machineID: machineId,
            customEpoch: customEpoch,
        }).getUniqueID();
        next();
    });
    /**
     * Create index
     */
    const index: any = {};
    index[`${field}`] = 1;
    schema.index(index);
}
