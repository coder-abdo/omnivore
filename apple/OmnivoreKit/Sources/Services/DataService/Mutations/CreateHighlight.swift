import Combine
import Foundation
import Models
import SwiftGraphQL

public extension DataService {
  func createHighlightPublisher(
    shortId: String,
    highlightID: String,
    quote: String,
    patch: String,
    articleId: String
  ) -> AnyPublisher<String, BasicError> {
    enum MutationResult {
      case saved(id: String)
      case error(errorCode: Enums.CreateHighlightErrorCode)
    }

    let selection = Selection<MutationResult, Unions.CreateHighlightResult> {
      try $0.on(
        createHighlightSuccess: .init {
          .saved(id: try $0.highlight(selection: Selection.Highlight { try $0.id() }))
        },
        createHighlightError: .init { .error(errorCode: try $0.errorCodes().first ?? .badData) }
      )
    }

    let mutation = Selection.Mutation {
      try $0.createHighlight(
        input: InputObjects.CreateHighlightInput(
          id: highlightID, shortId: shortId, articleId: articleId, patch: patch, quote: quote
        ),
        selection: selection
      )
    }

    let path = appEnvironment.graphqlPath
    let headers = networker.defaultHeaders

    return Deferred {
      Future { promise in
        send(mutation, to: path, headers: headers) { result in
          switch result {
          case let .success(payload):
            if let graphqlError = payload.errors {
              promise(.failure(.message(messageText: "graphql error: \(graphqlError)")))
            }

            switch payload.data {
            case let .saved(id: id):
              promise(.success(id))
            case let .error(errorCode: errorCode):
              promise(.failure(.message(messageText: errorCode.rawValue)))
            }
          case .failure:
            promise(.failure(.message(messageText: "graphql error")))
          }
        }
      }
    }
    .receive(on: DispatchQueue.main)
    .eraseToAnyPublisher()
  }
}
