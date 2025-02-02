import SwiftUI

public struct GoogleAuthButton: View {
  let tapAction: () -> Void

  public init(tapAction: @escaping () -> Void) {
    self.tapAction = tapAction
  }

  public var body: some View {
    Button(action: tapAction) {
      HStack(spacing: 8) {
        Image.googleIcon
          .resizable()
          .frame(width: 12, height: 12)
        Text(LocalText.googleAuthButton)
          .font(isMacApp ? .appCaption : .appBody)
          .foregroundColor(.black)
      }
      .frame(maxWidth: .infinity)
      .frame(height: isMacApp ? 30 : 44)
    }
    .buttonStyle(GoogleButtonStyle())
  }
}

struct GoogleButtonStyle: ButtonStyle {
  func makeBody(configuration: Self.Configuration) -> some View {
    configuration.label
      .background(
        RoundedRectangle(cornerRadius: 8)
          .fill(Color.white)
          .shadow(
            color: .gray.opacity(0.6),
            radius: 1, x: 0, y: 1
          )
      )
      .opacity(configuration.isPressed ? 0.7 : 1.0)
  }
}

#if DEBUG
  struct GoogleAuthButtonPreview: PreviewProvider {
    static var previews: some View {
      registerFonts()
      return Group {
        GoogleAuthButton(tapAction: {})
        GoogleAuthButton(tapAction: {})
          .previewDevice("iPad Pro (9.7-inch)")
          .environment(\.sizeCategory, .large)
      }
    }
  }
#endif
