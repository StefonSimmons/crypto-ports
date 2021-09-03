class AssetsController < ApplicationController
  require "rest-client"

  def get_crypto
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{params["symbols"]}&CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    render json: response
  end
end
