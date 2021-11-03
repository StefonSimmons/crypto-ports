Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  post "/users/login", to: "users#login"
  get "/users/verify", to: "users#verify"
  resources :assets, except: [:index, :show]
  resources :portfolios, except: :index
  resources :users, only: :create do
    resources :portfolios, only: :index do
      resources :assets, only: [:index] do
      end
    end
  end
  get "/symbols", to: "symbols#cmc_symbols"
end
