class SymbolsController < ApplicationController
  

  def cmc_symbols
    api_key = ENV["cmc_api_key"]
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=#{api_key}"

    response = RestClient.get(url)
    json_response = JSON.parse response.gsub("=>", ":")
    render json: json_response["data"]
  end
end
