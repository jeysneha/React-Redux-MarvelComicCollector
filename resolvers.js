import {GraphQLError} from 'graphql';
import { createClient } from 'redis';
const client = createClient();
client.connect().then(() => {});
import axios  from 'axios';
import md5 from 'blueimp-md5';
const publickey = 'e6dd7014958739373b52f45c6db035b1';
const privatekey = '49ab01f5157ed4488265003c8d64ee4c7895ca0a';

export const resolvers = {
  Query: {
    getComicById: async (_, args) => {
      
      let exists = await client.exists(String(args._id));
      
      if (exists) { 
        console.log("ji")
        //console.log("IN")
        const jsonredis=await client.get(String(args._id));
        const redisJson = JSON.parse(jsonredis)
        return redisJson;

      }
    if (args._id < 1) {
      
        throw new GraphQLError('Invalid page parameter. The page number must be greater than 0.', {
          extensions: {
            code: 'INVALID_PAGE_PARAM',
            http: {
              status: 400
            }
          }
        });
      }
      
      
       try{
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics/';
        const url = baseUrl +args._id+'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        console.log(url)
        let {data} = await axios.get(url)
        let findv=data.data.results;
      const jsonstr = JSON.stringify(findv[0]);
      await client.set(String(args._id), jsonstr);
      const jsonredis=await client.get(String(args._id));
      const redisJson = JSON.parse(jsonredis)
      console.log(redisJson)
      return redisJson;
        
       }

       catch(e){
        throw new GraphQLError('Comic Not Found', {
          extensions: {code: 'NOT_FOUND',http:{status:404}}
        });
      }
           
      
    },

    comics: async (_, args) => {
      const offset=(args.pagenum-1)*50
      let exists = await client.exists('comics'+String(args.pagenum));
      if (exists) { 
        const jsonredis=await client.get('comics'+String(args.pagenum));
        const redisJson = JSON.parse(jsonredis)
        return redisJson;
      }

      if(args.pagenum<1){
        throw new GraphQLError(`Page param is invalid`, {
          extensions: {code: 'Page param is invalid',http:{status:400}}
        });

      }
      
      const ts = new Date().getTime();
      const stringToHash = ts + privatekey + publickey;
      const hash = md5(stringToHash);
      const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
      const url = baseUrl +'?limit=50'+'&offset='+offset+'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
      console.log(url)
      let {data} = await axios.get(url)
      let findv=data.data.results;
      console.log(data.data.offset)
     
      if((data.data.total%data.data.limit===0) &&args.pagenum >(Math.floor(data.data.total/data.data.limit))){
        throw new GraphQLError(`Page does not contain any more comics in the list`, {
          extensions: {code: 'Page does not contain any more comics in the list',http:{status:404}}
        });
      }
      if((data.data.total%data.data.limit!==0) &&args.pagenum >(Math.floor(data.data.total/data.data.limit))+1){
        throw new GraphQLError(`Page does not contain any more comics in the list`, {
          extensions: {code: 'Page does not contain any more comics in the list',http:{status:404}}
        });
      }
      if (!findv) {
        throw new GraphQLError(`Internal Server Error`, {
          extensions: {code: 'INTERNAL_SERVER_ERROR',http:{status:500}}
        });
      }
      const jsonstr = JSON.stringify(findv);
      await client.set('comics'+String(args.pagenum), jsonstr);
      const jsonredis=await client.get('comics'+String(args.pagenum));
      const redisJson = JSON.parse(jsonredis)
      return redisJson;
      
      
      
    },

    Scomics: async (_, args) => {
  
  
      const ts = new Date().getTime();
      const stringToHash = ts + privatekey + publickey;
      const hash = md5(stringToHash);
      const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
      const url = baseUrl +'?titleStartsWith='+args.sterm+'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
      console.log(url)
      let {data} = await axios.get(url)
      let findv=data.data.results;
      console.log(findv)
      if (!findv) {
        throw new GraphQLError(`Internal Server Error`, {
          extensions: {code: 'INTERNAL_SERVER_ERROR',http:{status:500}}
        });
      }
    
      return findv;
    
    
    
    },
  
    
    tolval: async () => {
      const ts = new Date().getTime();
      const stringToHash = ts + privatekey + publickey;
      const hash = md5(stringToHash);
      const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
      const url = baseUrl +'?offset=0'+'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
      console.log(url)
      let {data} = await axios.get(url)
      let findv=data.data.total;
      return {total: findv}
    }
   
  //query ends
  },

  
    }

