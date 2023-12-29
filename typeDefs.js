//Create the type definitions for the query and our data

export const typeDefs = `#graphql
  type Query {
    comics(pagenum:Int!): [Comic]
    getComicById(_id: Int!): Comic
    tolval:Total
    Scomics(sterm:String!):[Comic]
    
  }
  
  
  type Comic {
  id: Int,
  digitalId: Int,
  title: String,
  issueNumber: Float,
  variantDescription: String,
  description: String,
  modified: String,
  isbn: String,
  upc: String,
  diamondCode: String,
  ean: String,
  issn: String,
  format: String,
  pageCount: Int,
  thumbnail: Thumbnail
  dates: [DateType]
  prices: [PriceType]
}
type Total{
  total: Int
}
type Thumbnail {
  path: String
  extension: String
}
type DateType {
  type: String
  date: String
}

type PriceType {
  type: String
  price: Float
}


`;
