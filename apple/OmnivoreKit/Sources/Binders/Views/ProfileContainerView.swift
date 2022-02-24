import Combine
import Models
import Services
import SwiftUI
import Utils
import Views

final class ProfileContainerViewModel: ObservableObject {
  @Published var isLoading = false
  @Published var profileCardData = ProfileCardData()

  var subscriptions = Set<AnyCancellable>()

  func loadProfileData(dataService: DataService) {
    dataService.viewerPublisher().sink(
      receiveCompletion: { _ in },
      receiveValue: { [weak self] viewer in
        self?.profileCardData = ProfileCardData(
          name: viewer.name,
          username: viewer.username,
          imageURL: viewer.profileImageURL.flatMap { URL(string: $0) }
        )
      }
    )
    .store(in: &subscriptions)
  }
}

struct ProfileContainerView: View {
  @EnvironmentObject var authenticator: Authenticator
  @EnvironmentObject var dataService: DataService

  @ObservedObject private var viewModel = ProfileContainerViewModel()
  @State private var showLogoutConfirmation = false

  var body: some View {
    #if os(iOS)
      Form {
        innerBody
      }
    #elseif os(macOS)
      List {
        innerBody
      }
      .listStyle(InsetListStyle())
    #endif
  }

  private var innerBody: some View {
    Group {
      Section {
        ProfileCard(data: viewModel.profileCardData)
          .onAppear {
            viewModel.loadProfileData(dataService: dataService)
          }
      }

      Section {
        NavigationLink(destination: BasicWebAppView.privacyPolicyWebView) {
          Text("Privacy Policy")
        }

        NavigationLink(destination: BasicWebAppView.termsConditionsWebView) {
          Text("Terms and Conditions")
        }

        #if os(iOS)
          Button(
            action: {
              DataService.showIntercomMessenger?()
            },
            label: { Text("Feedback") }
          )
        #endif
      }

      Section {
        if FeatureFlag.showAccountDeletion {
          NavigationLink(
            destination: ManageAccountView(handleAccountDeletion: {
              print("delete account")
            })
          ) {
            Text("Manage Account")
          }
        }

        Text("Logout")
          .onTapGesture {
            showLogoutConfirmation = true
          }
          .alert(isPresented: $showLogoutConfirmation) {
            Alert(
              title: Text("Are you sure you want to logout?"),
              primaryButton: .destructive(Text("Confirm")) {
                authenticator.logout()
              },
              secondaryButton: .cancel()
            )
          }
      }
    }
    .navigationTitle("Profile")
  }
}

private extension BasicWebAppView {
  static let privacyPolicyWebView: BasicWebAppView = {
    omnivoreWebView(path: "privacy")
  }()

  static let termsConditionsWebView: BasicWebAppView = {
    omnivoreWebView(path: "terms")
  }()

  private static func omnivoreWebView(path: String) -> BasicWebAppView {
    let urlString = "https://omnivore.app/\(path)?isAppEmbedView=true"
    return BasicWebAppView(request: URLRequest(url: URL(string: urlString)!))
  }
}