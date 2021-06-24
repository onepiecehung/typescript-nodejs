import {
    Document,
    FilterQuery,
    Model,
    PopulateOptions,
    QueryOptions,
    Schema,
} from "mongoose";

export interface IPaginate<T> {
    totalDocs: number | null;
    totalPages: number | null;
    currentPage: number | null;
    docs: T[];
    nextPage: number | null;
    previousPage: number | null;
    limit: number | null;
}

export interface IPaginateOptions extends QueryOptions {
    page: number;
    limit: number;
    select?:
        | {
              [key: string]: 0;
          }
        | {
              [key: string]: 1;
          }
        | null
        | string;
    pipeline?: any[];
    populate?: PopulateOptions | PopulateOptions[] | any;
}

export interface IPaginateModel<T extends Document> extends Model<T, {}> {
    paginate(
        query?: FilterQuery<T>,
        options?: IPaginateOptions
    ): Promise<IPaginate<T>>;
}

const ascending = ["asc", "ASC", "ascending", "ASCENDING", "1", 1];
const descending = ["desc", "DESC", "descending", "DESCENDING", "-1", -1];

export default function Paginate<T extends Document>(
    schema: Schema<T, Model<T, any>>
) {
    async function paginate(
        this: Model<T, any>,
        query: FilterQuery<T>,
        options: IPaginateOptions
    ) {
        // Convert $sort
        if (options.sort) {
            for (const [key, value] of Object.entries(options.sort)) {
                if (ascending.includes(value as string | number)) {
                    options.sort[key] = 1;
                    continue;
                }

                if (descending.includes(value as string | number)) {
                    options.sort[key] = -1;
                    continue;
                }

                options.sort[key] = 1;
            }
        }

        const result = await this.aggregate()
            .match(query)
            .facet({
                docs: [
                    ...(!options.sort ? [] : [{ $sort: options.sort }]),
                    { $skip: (options.page - 1) * options.limit },
                    { $limit: options.limit },
                    ...(!options.pipeline ? [] : options.pipeline),
                    ...(!options.select ? [] : [{ $project: options.select }]),
                ],
                totalCount: [{ $count: "value" }],
            })
            .exec();

        if (!Array.isArray(result)) {
            throw Error("Aggregate result isn't an array.");
        }

        if (result.length !== 1) {
            throw Error("Aggregate result isn't include only 1 item.");
        }

        return {
            ["docs"]: result[0].docs,
            ["totalDocs"]: result[0].totalCount[0]?.value || 0,
            ["totalPages"]:
                result[0].totalCount[0]?.value === 0
                    ? 0
                    : Math.ceil(result[0].totalCount[0]?.value / options.limit),
            ["currentPage"]:
                result[0].totalCount.value === 0 ? null : options.page,
            ["previousPage"]:
                options.page <= 1 ||
                options.page >
                    Math.ceil(result[0].totalCount[0]?.value / options.limit)
                    ? null
                    : options.page - 1,
            ["nextPage"]:
                options.page >=
                Math.ceil(result[0].totalCount[0]?.value / options.limit)
                    ? null
                    : options.page + 1,
            ["limit"]: options.limit,
        } as IPaginate<T>;
    }

    schema.statics.paginate = paginate;
}
