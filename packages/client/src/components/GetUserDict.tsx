"use client"
import { gql, useQuery } from '@apollo/client'

export default function GetUserDict() {
  const GET_USER_DICT = gql`
  query GetUserDict($filters: UserDictionaryFiltersInput) {
  userDictionaries(filters: $filters) {
    data {
      attributes {
        user_words {
          data {
            attributes {
              word {
                data {
                  attributes {
                    word
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `

  const { data, error } = useQuery(GET_USER_DICT, {
    variables: {
      "filters": {
        "id": {
          "eq": 1
        }
      }
    }
  })

  console.log(data)

  if (error) return <p>Error: {error.message}</p>

  return (
    <p>Got here</p>
  )
}
