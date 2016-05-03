import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

import {
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  mutationWithClientMutationId
} from "graphql-relay";

let Schema = (data) => {
  class Store {}
  let store = new Store();

  let nodeDefs = nodeDefinitions(
    (globalId) => {
      let {type} = fromGlobalId(globalId);
      if (type === 'Store') {
        return store
      }
      return null;
    },
    (obj) => {
      if (obj instanceof Store) {
        return storeType;
      }
      return null;
    }
  );

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      id: globalIdField("Store"),
      oneNews: {
        type: newsType,
        args: {
          id: { type: GraphQLString },
        },
        resolve : (_, args) => {
          return data.find(e => e.id === args.id);
        }
      },
      news: {
        type: newsConnection.connectionType,
        args: {
          ...connectionArgs,
          sort: { type: GraphQLBoolean }
        },
        resolve: (_, args) => {
          const result = [].concat(data);

          if (args.sort) {
            result.sort((a, b) => {
              if (a.type < b.type)
                return -1;
              else if (a.type > b.type)
                return 1;
              else
                return 0;
            });
          }

          return connectionFromArray(result, args)
        }
      }
    }),
    interfaces: [nodeDefs.nodeInterface]
  });

  let newsType = new GraphQLObjectType({
    name: 'News',
    fields: () => ({
      id: { type: GraphQLString },
      title: { type: GraphQLString },
      type: { type: GraphQLString },
      content: { type: GraphQLString },
    })
  });

  let newsConnection = connectionDefinitions({
    name: 'News',
    nodeType: newsType
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        node: nodeDefs.nodeField,
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    }),
  });

  return schema
};

export default Schema;
