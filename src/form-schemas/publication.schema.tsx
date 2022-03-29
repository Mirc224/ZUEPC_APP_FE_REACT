import { FormikFieldSchema } from "../types/common/component.types";

export const publicationSearchSchema: FormikFieldSchema[] = [
    {
        name: "name",
        initValue: "",
        type: "text",
    },
]