import {
    Schema,
    Document,
    FilterQuery,
    Model,
    QueryOptions,
    PopulateOptions,
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
    select?: string | null;
    page: number;
    limit: number;
    populate?: PopulateOptions | PopulateOptions[] | any;
}

export interface IPaginateModel<T extends Document> extends Model<T> {
    paginate(
        query?: FilterQuery<T>,
        options?: IPaginateOptions
    ): Promise<IPaginate<T>>;
}

export default function Paginate<T extends Document>(
    schema: Schema<T, Model<T, any>>
) {
    async function paginate(
        this: any,
        query: FilterQuery<T>,
        options: IPaginateOptions
    ) {
        try {
            options.skip = (options.page - 1) * options.limit;

            // const docs = await this.find(query, options?.select ?? null, options) as Document<T>[];
            // const totalCount = query === undefined ? await this.estimatedDocumentCount() : await this.countDocuments(query);

            let docs: Document<T>[] = [];
            let totalCount: number = 0;

            if (Object.keys(query).length === 0) {
                totalCount = await this.estimatedDocumentCount();
                docs = await this.find(query, options?.select ?? null, options);
            } else {
                const idOnlyRecords = await this.find(
                    query,
                    options?.select ?? null,
                    {
                        sort: options.sort,
                    }
                );

                totalCount = idOnlyRecords.length;

                if (totalCount > 0) {
                    const tempIds: any[] = [];
                    const tmpLimit: number =
                        totalCount < options.skip + options.limit
                            ? totalCount
                            : options.skip + options.limit;

                    for (let i = options.skip; i < tmpLimit; i++) {
                        if (!idOnlyRecords[i]) {
                            continue;
                        }

                        tempIds.push(idOnlyRecords[i]._id);
                    }

                    docs = (await this.find(
                        {
                            _id: { $in: tempIds },
                        },
                        options?.select ?? null,
                        { ...options, skip: undefined }
                    )) as Document<T>[];
                }
            }

            return {
                ["docs"]: docs,
                ["totalDocs"]: totalCount,
                ["totalPages"]:
                    totalCount === 0
                        ? 0
                        : Math.ceil(totalCount / options.limit),
                ["currentPage"]: totalCount === 0 ? null : options.page,
                ["previousPage"]:
                    options.page <= 1 ||
                    options.page > Math.ceil(totalCount / options.limit)
                        ? null
                        : options.page - 1,
                ["nextPage"]:
                    options.page >= Math.ceil(totalCount / options.limit)
                        ? null
                        : options.page + 1,
                ["limit"]: options.limit,
            } as IPaginate<T>;
        } catch (err) {
            console.error(err);
        }
    }

    schema.statics.paginate = paginate;
}
