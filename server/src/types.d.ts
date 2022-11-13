export type US_peak_chart_post = number | "-";

export interface BooksEntry {
  album: string;
  year: number;
  US_peak_chart_post: US_peak_chart_post;
}


//export type NewBookEntry = Omit<BooksEntry, '_id'>