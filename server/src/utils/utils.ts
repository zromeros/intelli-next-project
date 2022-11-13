import { BooksEntry, US_peak_chart_post } from "../types";


const parseAlbum = (param: any): string => {
    if(!isString(param)){
        throw new Error("Incorrect or missing album")
    }
    return param
}

const parseYear = (param: any): number => {
    if(!isNumber(param)){
        throw new Error("Incorrect or missing year")
    }
    return param
}
const parseUS_peak_chart_post = (US_peak_chart_post_from_request : any): US_peak_chart_post => {
    if(!isUS_peak_chart_post(US_peak_chart_post_from_request)){
        throw new Error("Incorrect or missing US_peak_chart_post")
    }
    return US_peak_chart_post_from_request
}

const isString = (string: string): boolean => {
    return typeof string === "string"
}

const isNumber = (number: number): boolean => {
    return typeof number === "number"
}

const isUS_peak_chart_post = (value: any): boolean => {
    
    const isValid = isNumber(value) || (isString(value) && (value != "-"))
    if(!isValid) return false
    return true
}


const toNewBookEntry = (object: any) : BooksEntry => {
    
    const newBook: BooksEntry = {
        album: parseAlbum(object.album),
        year: parseYear(object.year),
        US_peak_chart_post: parseUS_peak_chart_post(object.US_peak_chart_post)
    }

    return newBook
}


export default toNewBookEntry