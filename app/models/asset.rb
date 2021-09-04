class Asset < ApplicationRecord
  # require "rest-client"

  belongs_to :user

  def self.sum_of_allocations curr
    where(allocation_currency: curr).pluck(:allocation).sum
  end

  # def self.allocations curr
  #   where(allocation_currency: curr)
  # end

  # making http request in model
  # def cmc_asset
  #   api_key = ENV["cmc_api_key"]
  #   url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=#{symbol}&CMC_PRO_API_KEY=#{api_key}"

  #   response = RestClient.get(url)
  #   json_response = JSON.parse response.gsub('=>', ':')
  #   asset_info = json_response['data'][symbol]
  #   return asset_info
  # end

end
