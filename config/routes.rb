Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :assets, except: [:index, :show]
  resources :portfolios, except: :index
  resources :users, only: :create do
    resources :portfolios, only: :index do
      resources :assets, only: [:index] do
      end
    end
  end
end
