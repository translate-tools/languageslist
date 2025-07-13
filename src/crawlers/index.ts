export interface SummaryFetcher<T> {
	fetch(): Promise<T>;
}
