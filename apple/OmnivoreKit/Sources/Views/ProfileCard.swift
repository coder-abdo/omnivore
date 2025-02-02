import SwiftUI

public struct ProfileCardData {
  let name: String
  let username: String
  let imageURL: URL?

  public init(name: String = "", username: String = "", imageURL: URL? = nil) {
    self.name = name
    self.username = username
    self.imageURL = imageURL
  }
}

public struct ProfileCard: View {
  let data: ProfileCardData

  public init(data: ProfileCardData) {
    self.data = data
  }

  public var body: some View {
    HStack(alignment: .center) {
      Group {
        if let url = data.imageURL {
          AsyncImage(url: url, isResizable: true)
        } else {
          Image(systemName: "person.crop.circle")
            .resizable()
        }
      }

      .aspectRatio(contentMode: .fill)
      .frame(width: 70, height: 70, alignment: .center)
      .clipShape(Circle())

      VStack(alignment: .leading, spacing: 6) {
        Text(data.name)
          .font(.appBody)
          .foregroundColor(.appGrayTextContrast)
          .lineLimit(2)
          .frame(maxWidth: .infinity, alignment: .leading)

        Text("@\(data.username)")
          .font(.appBody)
          .foregroundColor(.appGrayTextContrast)
          .lineLimit(2)
          .frame(maxWidth: .infinity, alignment: .leading)
      }
      .frame(maxWidth: .infinity)
      .multilineTextAlignment(.leading)
      .padding(0)
    }
    .frame(maxWidth: .infinity)
  }
}
