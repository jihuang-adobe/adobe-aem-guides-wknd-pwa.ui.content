export const adventureListQuery = `{
  adventureList {
    items {
      _path
      activity
      title
      primaryImage {
        ...on ImageRef {
          _path
          mimeType
          width
          height
        }
      }
    }
  }
}`;

export const adventureDetailQuery = _path => `{
  adventureByPath (_path: "${_path}") {
    item {
      _path
      title
      activity
      adventureType
      price
      tripLength
      groupSize
      difficulty
      price
      primaryImage {
        ... on ImageRef {
          _path
          mimeType
          width
          height
        }
      }
      description {
        html
        json
      }
      itinerary {
        html
        json
      }
    }
  }
}`;