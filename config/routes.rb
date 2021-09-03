Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/users/:id/assets/", to: "assets#user_assets"
  # resources :assets
end
