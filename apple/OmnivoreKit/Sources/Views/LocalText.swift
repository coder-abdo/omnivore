import Foundation

public enum LocalText {
  static func localText(key: String, comment: String? = nil) -> String {
    NSLocalizedString(key, bundle: .module, comment: comment ?? "no comment provided by developer")
  }

  static let signInScreenHeadline = localText(key: "signInScreenHeadline")
  static let googleAuthButton = localText(key: "googleAuthButton")
  static let registrationViewSignInHeadline = localText(key: "registrationViewSignInHeadline")
  static let registrationViewSignUpHeadline = localText(key: "registrationViewSignUpHeadline")
  public static let registrationViewHeadline = localText(key: "registrationViewHeadline")
  static let networkError = localText(key: "error.network")
  static let genericError = localText(key: "error.generic")
  static let invalidCredsLoginError = localText(key: "loginError.invalidCreds")
  static let saveArticleSavingState = localText(key: "saveArticleSavingState")
  static let saveArticleSavedState = localText(key: "saveArticleSavedState")
  static let saveArticleProcessingState = localText(key: "saveArticleProcessingState")
  static let extensionAppUnauthorized = localText(key: "extensionAppUnauthorized")
  static let dismissButton = localText(key: "dismissButton")
  static let usernameValidationErrorInvalid = localText(key: "username.validation.error.invalidPattern")
  static let usernameValidationErrorTooShort = localText(key: "username.validation.error.tooshort")
  static let usernameValidationErrorTooLong = localText(key: "username.validation.error.toolong")
}
