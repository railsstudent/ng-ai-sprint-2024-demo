export type CategoryScore = {
    categoryName: string;
    score: string;
}

export type ImageClassificationResult = {
    categoryScores: CategoryScore[];
    categories: string[];
}
