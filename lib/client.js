import createClient from "@sanity/client";


export const client = createClient({
    projectId:'jju2zy2q',
    dataset: 'production',
    apiVersion: '2023-03-20',
    useCdn: true,
    token: "skUVFQ4EmHwB8qtRaIm7IIpKiyfdtBf4TH8amN8zQjg7rrDrplvQEYM3k7gZ5y2SmpDkw31LhEpPLOAIlS3B5Rekpj5FSCriA3LmEPdOiIvj7bFBHhVVMDxLHcNJzX7iOrrTLtxTSqLo1EEgWuGf0Za8IyPyLzLPugtiFvTtqISs7Lz9u3oS"
})