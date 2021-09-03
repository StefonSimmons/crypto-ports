Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

    get '/assets/:symbols', to: 'assets#get_crypto'

end
