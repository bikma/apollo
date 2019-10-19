const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require("rimraf")

const UPLOAD_PATH = 'uploads'
let uploads = []

fs.readdir('./uploads', (err, files)=>{
  files && files.forEach( async (file, i) => {
    uploads.push({
      id: i,
      name: file,
      url: UPLOAD_PATH + '/' + file
    })
  })
})

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    },
  }),
  Query: {
    uploads: async (parent, args, context, info) => uploads,
  },
  Mutation: {
    upload: async (parent, args, context, info) => {
      const {files} = args
      rimraf.sync(UPLOAD_PATH)
      mkdirp.sync(UPLOAD_PATH)
      let output = files.map( async (file, i) => {
        const { filename, mimetype, createReadStream } = await file
        const stream = createReadStream()        
        const filepath = UPLOAD_PATH + '/' + filename
        stream.pipe(fs.createWriteStream(filepath))
        return {
          id: i,
          name: filename,
          url: filepath
        }
      })
      uploads = output
      return output
    },
    predict: async (parent, args, context, info) => {
      // console.log(args)
      let iterate = Math.floor(Math.random() * 2) + 1
      if(iterate === 1)
        return {
          type: 'classification',
          data: [{
            match: args.file.split("/").pop().split(".")[0],
            percentage: 100
          }]
        }
      else
        return {
          type: 'object_detection',
          image: 'images/cat_clasification.png',//'images/obj_detection.png',
          data: [{
            match: 'Cat',
            color: 'red',
            percentage: 100
          }
          // },{
          //   match: 'Dog',
          //   color: 'blue',
          //   percentage: 100
          // },{
          //   match: 'Duck',
          //   color: 'green',
          //   percentage: 100
          // }
          ]
        }
      // return [{
      //   match: args.file.split("/").pop().split(".")[0],
      //   percentage: 100
      // }]
    }
  }
}

module.exports = resolvers
